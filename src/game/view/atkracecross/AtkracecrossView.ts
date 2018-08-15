class AtkracecrossView extends CommonView
{
	private _moreArrow:BaseBitmap = null;
	private bottom:BaseBitmap =null;
	private _isShowMore:boolean = false;
	private touchBoo:boolean =true;
	private moveContainer:BaseDisplayObjectContainer =null;
	private listconditions:BaseTextField = null;
	private describeTxt:BaseTextField =null;
	private _nameTxt:BaseTextField =null;
	private _currMaskBmp:BaseBitmap =null;
	private _touchBg:BaseBitmap =null;
	private moreBg:BaseBitmap =null;
	private isData:boolean =false;
	private _scrollList:ScrollList=null;
	private _atkraceInfoVoList:Array<any>=[];
	private _topBg:BaseBitmap = null;
	private _scoreTextTab:(BaseBitmapText|BaseTextField)[] = [];
	private _listconditions:BaseTextField = null;
	private _rewwardTime:BaseTextField =null;
	private _rewardCDTime:number = 0
	private _countDownTime:number = 0;
	private _infoContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	private _fightflag:boolean = null;
	private _topType:number = 0; // 顶部显示类型， 1:两个服， 2:多个服
	private _serverList:ScrollList=null;
	private _chatTxt :BaseTextField = null;

	private _isCanJoin:boolean = false;
	private _isFightEnd:boolean = false;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"atkracecross_bg2","atkracecross_award_text","atkracecross_award","atkracecross_loss","atkracecross_top","atkracecross_win",
 
		"atkrace_morale","rankinglist_rankbg",
		"arena_bottom","servant_mask","arena_visit","arena_visit_text","forpeople_bottom","arena_rank","arena_rank_text","arena_more","arena_arrow","arena_bottom_bg",
 
		"atkrace_morale","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
		"arena_bottom","servant_mask","arena_visit","arena_visit_text","forpeople_bottom","arena_rank","arena_rank_text","arena_more","arena_arrow"
 
		]);
	}

	// 规则说明内容
	// protected getRuleInfo():string
	// {
	// 	return "atkracecrossInfo";
	// }

	protected getBgName():string
	{
		return "atkracecross_bg2";
	}


	protected getTitleStr():string
	{
		return "atkracecross";
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeNumber2:number = 3600*24;
		if (crossVo.et - GameData.serverTime <= timeNumber2)
		{
			this._isFightEnd = true;
		}
		return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_INDEX,requestData:{activeId:crossVo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.data.data.fightflag == false) {
			this._fightflag= false;
		}
		else {
			this._fightflag= true;
		}
		Api.atkracecrossVoApi.zonerankinfos = data.data.data.zonerankinfos;
		// Api.atkracecrossVoApi.zonerankinfos = [{zid:1,point:99},{zid:3,point:992}];
		if (this._topType == 2 && this._serverList && Api.atkracecrossVoApi.zonerankinfos)
		{
			this._serverList.refreshData(Api.atkracecrossVoApi.zonerankinfos);
		}
		else if (this._topType == 1 && this._scoreTextTab.length>0 && Api.atkracecrossVoApi.zonerankinfos)
		{
			for (let i:number = 0; i<this._scoreTextTab.length ; i++)
			{	
				let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
				let myServerInfo:any;
				let otherSerInfo:any;
				if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
				{
					myServerInfo = zonerankinfos[0];
					otherSerInfo = zonerankinfos[1];
				}
				else 
				{
					myServerInfo = zonerankinfos[1];
					otherSerInfo = zonerankinfos[0];
				}
				this._scoreTextTab[0].text = String(myServerInfo.point);
				this._scoreTextTab[1].text = String(otherSerInfo.point);
			}
			this._scoreTextTab[1].setPosition(GameConfig.stageWidth - 110 - this._scoreTextTab[1].width, this._scoreTextTab[0].y);
		}

		if (data.data.data.iscanjoin == 0) {
			this._isCanJoin= false;
		}
		else {
			this._isCanJoin= true;
		}
		Api.atkracecrossVoApi.isCanJoin = this._isCanJoin;

		if (this._infoContainer) {
			this.resetInfo();
		}
	}

	public initView():void
	{	

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.fightendCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_KILL), this.challengeCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);

		this.initBottom();

		if (Api.atkracecrossVoApi.zonerankinfos.length > 2)
		{
			this.initTop2();
		}
		else {
			this.initTop1();
		}
		
		//检查有没有没有领取的奖励
		if (this._fightflag && this._isCanJoin && this._isFightEnd == false) {
			let rewardc:any = Api.atkracecrossVoApi.getRewardc()
			if (rewardc && rewardc.flag && rewardc.flag> 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW,{});
			} 
		}

		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_LIST, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);

		if (this._isCanJoin || this._isFightEnd) {
			this.resetInfo();
		}
		else {
			this.initCannotJoin();
		}

		let ruleBtn:BaseButton = ComponentManager.getButton("atkracecross_explain","",this.clickDetailBtnHandler,this);
		ruleBtn.x = 12;
		ruleBtn.y = 22;
		this.addChild(ruleBtn);
	}

		//重置信息
	private resetInfo():void
	{	
		this._countDownTime = 0;
		if (this._infoContainer) {
			this.removeChildFromContainer(this._infoContainer);
			this._infoContainer=null;
		}

		if (this._countDownText) {
			this._countDownText=null;
		}
		this._infoContainer = new BaseDisplayObjectContainer();
		this._infoContainer.y = GameConfig.stageHeigth-1136;
		this.addChildToContainer(this._infoContainer);

		//是否无法出战
		if (this._fightflag == false) {
			//对话框
			let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
			wordsBg.width = 260;
			wordsBg.height=78;
			wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250+1136-GameConfig.stageHeigth);
			this._infoContainer.addChild(wordsBg);
			

			let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
			wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
			wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
			this._infoContainer.addChild(wordsCornerBg);

			let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceNoServant"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			wordsText.width = 224;
			wordsText.lineSpacing = 6;
			wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
			this._infoContainer.addChild(wordsText);
		}
		else if (this._isFightEnd == false) {
			//检查是否已有门客
			let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		
			if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
				//有门客
				let sid:string = myAtkInfo.mesid.sid;
				let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
				servantFullImg.width = 405;
				servantFullImg.height = 467;
				servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2;
				servantFullImg.y = this.viewBg.height - 180 - servantFullImg.height;
				this._infoContainer.addChild(servantFullImg);
				servantFullImg.addTouchTap(this.clickServant,this);

				//对话框
				let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
				wordsBg.width = 260;
				wordsBg.height=78;
				wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,servantFullImg.y - 80);
				this._infoContainer.addChild(wordsBg);

				let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
				wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
				wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
				this._infoContainer.addChild(wordsCornerBg);

				let textStr:string;
				if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
					textStr	= LanguageManager.getlocal("arenaServantSpeak2");
				}
				else {
					textStr	= LanguageManager.getlocal("arenaServantSpeak1",[LanguageManager.getlocal("servant_name"+myAtkInfo.mesid.sid)]);
				}

				let wordsText:BaseTextField = ComponentManager.getTextField(textStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
				wordsText.width = 224;
				wordsText.lineSpacing = 6;
				wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
				this._infoContainer.addChild(wordsText);
			}
			else {
				//出战次数
				let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1);
				let maxCount:number = itemCfg.getDailyNum();
				let myInfo:AtkraceInfoVo = Api.atkracecrossVoApi.getMyInfo();

				//对话框
				let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
				wordsBg.width = 260;
				wordsBg.height=78;
				wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250+1136-GameConfig.stageHeigth);
				this._infoContainer.addChild(wordsBg);
				

				let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
				wordsCornerBg.x = wordsBg.x+wordsBg.width/2+20;
				wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
				this._infoContainer.addChild(wordsCornerBg);

				let myNum:number = myInfo.num;
				let textStr:string;
				if (myNum >= maxCount) {
					//次数已满
					let lv60plus:number = Api.servantVoApi.getServantCountLevel60Plus();
					let extraCoefficient:number =  Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1).getParameter1();
					let extraMax:number = Math.floor(lv60plus/extraCoefficient);

					if (myInfo.extranum >= extraMax) {
						//没次数了
						textStr = LanguageManager.getlocal("arenaMaxNum");
						wordsBg.addTouchTap(this.clickDialog2,this);
					}
					else {
						textStr = LanguageManager.getlocal("arenaAddNum",[myInfo.extranum.toString(),extraMax.toString()]);
						wordsBg.addTouchTap(this.clickDialog,this);
					}

					let wordsText:BaseTextField = ComponentManager.getTextField(textStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					wordsText.width = 224;
					wordsText.lineSpacing = 6;
					wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2);
					this._infoContainer.addChild(wordsText);

					
				}
				else {
					//倒计时
					this._countDownTime = myInfo.lasttime + Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1).getIntervalTime() -  GameData.serverTime;
					let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceCountDowning"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					wordsText.width = 224;
					wordsText.lineSpacing = 6;
					wordsText.setPosition(wordsBg.x + wordsBg.width/2 - wordsText.width/2, wordsBg.y + wordsBg.height/2 - wordsText.height/2 - 15);
					this._infoContainer.addChild(wordsText);

					this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_RED);
					this._countDownText.setPosition(wordsBg.x + wordsBg.width/2 - this._countDownText.width/2, wordsText.y + wordsText.height+7);
					this._infoContainer.addChild(this._countDownText);
				}
			}
		}
		else {
			this.initResult();
		}
	}

	private clickDialog2():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
	}

	private clickDialog():void
	{
		let itemId:string = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1).getFightAdd();
        let needNum:number = 1;
		let itemVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
		let numItem:number = 0;
		if (itemVo) {
			numItem = itemVo.num;
		}
		
		let message = LanguageManager.getlocal("atkRace_buyChallenge",[LanguageManager.getlocal("itemName_"+itemId)]);
		let mesObj = {
			 confirmCallback: this.buyChallenge, 
			 handler: this, 
			 icon:  "itemicon"+itemId,
			 iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg, 
			 num: numItem, 
             useNum:needNum,
			 msg: message ,
			 id : itemId,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
	}

	private buyChallenge():void
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_USEEXTRA,{activeId:crossVo.aidAndCode});
	}

	//点击门客 进入战斗
	private clickServant():void
	{
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW,{f:this.refreshServant,o:this});
		}
		else {
			let nameStr:string = myAtkInfo.getFName();
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid,f:this.refreshServant,o:this});
		}
	}

	//顶部
	private initTop1():void
	{	
		this._topType = 1;

		this._topBg = BaseBitmap.create("atkracecross_top");
		this._topBg.y = -16;
		this.addChildToContainer(this._topBg);

		let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
		let myServerInfo:any;
		let otherSerInfo:any;
		if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
		{
			myServerInfo = zonerankinfos[0];
			otherSerInfo = zonerankinfos[1];
		}
		else 
		{
			myServerInfo = zonerankinfos[1];
			otherSerInfo = zonerankinfos[0];
		}

		let server1name = Api.mergeServerVoApi.getAfterMergeSeverName(myServerInfo.zid);
		let serverId1:BaseTextField = ComponentManager.getTextField(server1name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverId1.setPosition(56 - serverId1.width/2, this._topBg.y + 46);
		this.addChildToContainer(serverId1);

		let server2name = Api.mergeServerVoApi.getAfterMergeSeverName(otherSerInfo.zid);
		let serverId2:BaseTextField = ComponentManager.getTextField(server2name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.textWidth/2, serverId1.y);
		this.addChildToContainer(serverId2);

		this._scoreTextTab.length = 0;

		let serverScore1:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(myServerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
		serverScore1.setPosition(114, this._topBg.y + 67);
		this.addChildToContainer(serverScore1);
		this._scoreTextTab.push(serverScore1);

		let serverScore2:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(otherSerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
		serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
		this.addChildToContainer(serverScore2);
		this._scoreTextTab.push(serverScore2);
	}
	private initTop2():void
	{
		this._topType = 2;

		this._topBg = BaseBitmap.create("atkracecross_rankbg");
		this._topBg.y = -16;
		this._topBg.height = 224;
		this.addChildToContainer(this._topBg);

		let serverText:BaseBitmap = BaseBitmap.create("atkracecross_rank");
		serverText.setPosition(GameConfig.stageWidth/2-serverText.width/2,this._topBg.y+8);
		this.addChildToContainer(serverText);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, this._topBg.y + 50);
		this.addChildToContainer(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		this.addChildToContainer(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		pointText.setPosition(GameConfig.stageWidth/2 + 155 - pointText.width/2, rankText.y);
		this.addChildToContainer(pointText);

		let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 134);
		this._serverList = ComponentManager.getScrollList(AtkracecrossServerItem, zonerankinfos, rect);
		this.addChildToContainer(this._serverList);
		this._serverList.y = this._topBg.y + 80;


	}

	private initCannotJoin()
	{
		let cannotJoinBg:BaseBitmap = BaseBitmap.create("public_9_downbg");
		cannotJoinBg.width = 410;
		cannotJoinBg.height = 125;
		cannotJoinBg.setPosition(GameConfig.stageWidth/2 - cannotJoinBg.width/2, GameConfig.stageHeigth/2 - 220);
		this.addChildToContainer(cannotJoinBg);


		let rcannotJoinDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossNotJoin"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rcannotJoinDesc.width = cannotJoinBg.width ;
		rcannotJoinDesc.setPosition(GameConfig.stageWidth/2 -rcannotJoinDesc.width/2, cannotJoinBg.y+40);
		rcannotJoinDesc.lineSpacing = 6;
		rcannotJoinDesc.textAlign = "center";
		this.addChildToContainer(rcannotJoinDesc);
	}
	
	private initResult():void
	{	
		if (this._topType == 1) 
		{	
			let resultIcon1:string ;
			let resultIcon2:string ;

			let zonerankinfos:any = Api.atkracecrossVoApi.zonerankinfos;
	
			if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
			{
				resultIcon1 = "atkracecross_win";
				resultIcon2 = "atkracecross_loss";
			}
			else 
			{
				resultIcon2 = "atkracecross_win";
				resultIcon1 = "atkracecross_loss";
			}

			let result1:BaseBitmap = BaseBitmap.create(resultIcon1);
			result1.setPosition(185, this._topBg.y+15);
			this.addChildToContainer(result1);

			let result2:BaseBitmap = BaseBitmap.create(resultIcon2);
			result2.setPosition(424, result1.y);
			this.addChildToContainer(result2);
		}

		let endCDBg:BaseBitmap = BaseBitmap.create("public_9_downbg");
		endCDBg.width = 410;
		endCDBg.height = 218;
		endCDBg.setPosition(GameConfig.stageWidth/2 - endCDBg.width/2, GameConfig.stageHeigth/2 - 220);
		this.addChildToContainer(endCDBg);

		let servername = Api.mergeServerVoApi.getAfterMergeSeverName(Api.atkracecrossVoApi.zonerankinfos[0].zid);
		let rewardDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossRewardDesc",[servername]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rewardDesc.width = endCDBg.width ;
		rewardDesc.setPosition(GameConfig.stageWidth/2 -rewardDesc.width/2, endCDBg.y+40);
		rewardDesc.lineSpacing = 6;
		rewardDesc.textAlign = "center";
		this.addChildToContainer(rewardDesc);
		
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this._rewardCDTime = crossVo.et - GameData.serverTime;
		this._rewwardTime = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossRewardTime",[this.getCountTimeStr2()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
		this._rewwardTime.setPosition(GameConfig.stageWidth/2 -this._rewwardTime .width/2, rewardDesc.y+rewardDesc.height + 30);
		this.addChildToContainer(this._rewwardTime);
	}

	private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private getCountTimeStr2():string
	{	
		let time:number = this._rewardCDTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public tick():void
	{	
		//领奖倒计时
		if (this._rewwardTime) {
			this._rewardCDTime--;
			this._rewwardTime.text = LanguageManager.getlocal("atkracecrossRewardTime",[this.getCountTimeStr2()]);

			if (this._rewardCDTime < 0) {
				this.refreshEnterBtn();
			}
		}

		//出战倒计时
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this.refreshServant();
			}
		}
		if(this._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				showStr=LanguageManager.getlocal('acCrossServeDes', [showStr.zoneid.toString()]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			this._chatTxt.text = showStr;
		}
	}

	private refreshEnterBtn():void
	{
		
	}

	//底部
	private initBottom():void
	{	
		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");

		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
		this.addChildAt(maskDown,this.getChildIndex(this.container)-1);
		let chatbg = null;
		if(1){
			//跨服聊天消息
			chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 35;
			chatbg.x = 0;
			chatbg.y = GameConfig.stageHeigth-bottom.height-chatbg.height-3;
			this.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);

			let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
			chatIcon.anchorOffsetX = chatIcon.width/2;
			chatIcon.anchorOffsetY = chatIcon.height/2;
			chatIcon.x =  chatIcon.width/2+10;
			chatIcon.y = chatbg.y + chatbg.height/2;
			this.addChild(chatIcon);
			egret.Tween.get(chatIcon, {
				loop: true,//设置循环播放
			}).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
			
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				showStr=LanguageManager.getlocal('acCrossServeDes', [showStr.zoneid.toString()]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._chatTxt.width = 480;
			this._chatTxt.height = 20;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
			this.addChild(this._chatTxt);
		}
		//来访消息
		let visitBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.visitHandle,this,null,0);
		visitBg.setPosition(24,GameConfig.stageHeigth - 200 - (chatbg ? chatbg.height : 0));
		this.addChild(visitBg);

		let visitIcon:BaseBitmap = BaseBitmap.create("arena_visit");
		visitIcon.setPosition(visitBg.width/2-visitIcon.width/2,visitBg.height/2-visitIcon.height/2-5);
		visitBg.addChild(visitIcon);

		let visitText:BaseBitmap = BaseBitmap.create("arena_visit_text");
		visitText.setPosition(visitBg.width/2-visitText.width/2,visitIcon.y + visitIcon.height -30);
		visitBg.addChild(visitText);

		//活动奖励
		let awardBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rewardHandle,this,null,0);
		awardBg.setPosition(24,visitBg.y - 115);
		this.addChild(awardBg);

		let awardIcon:BaseBitmap = BaseBitmap.create("atkracecross_award");
		awardIcon.setPosition(awardBg.width/2-awardIcon.width/2,awardBg.height/2-awardIcon.height/2-5);
		awardBg.addChild(awardIcon);

		let awardText:BaseBitmap = BaseBitmap.create("atkracecross_award_text");
		awardText.setPosition(awardBg.width/2-awardText.width/2,awardIcon.y + awardIcon.height -30);
		awardBg.addChild(awardText);

		if(!Api.switchVoApi.checkOpenShenhe())
		{
			//排行榜
			let rankBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rankHandle,this,null,0);
			rankBg.setPosition(GameConfig.stageWidth-rankBg.width-24,visitBg.y);
			this.addChild(rankBg);

			let rankIcon:BaseBitmap = BaseBitmap.create("arena_rank");
			rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
			rankBg.addChild(rankIcon);

			let rankText:BaseBitmap = BaseBitmap.create("arena_rank_text");
			rankText.setPosition(rankBg.width/2-visitText.width/2,rankIcon.y + rankIcon.height -30);
			rankBg.addChild(rankText);
		}
		

		bottom.y = GameConfig.stageHeigth - bottom.height;
		this.addChild(bottom);
		this.bottom = bottom;
	

		let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,GameConfig.stageHeigth - bottom.height/2  - showMore.height/2);
		this.addChild(showMore);

		this._moreArrow = BaseBitmap.create("arena_arrow");
		this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - bottom.height/2  - this._moreArrow.height/2);
		this.addChild(this._moreArrow);
	}

	private chatBgClickHandler():void{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : "crossServerAtkRace-1"});
	}
	 
	public useCallback(event: egret.Event): void  
	{
		if(event.data.ret)
		{
			if(event.data.data.data.atklist)
			{
				this._atkraceInfoVoList =event.data.data.data.atklist;
				this.showText();	
			} 
		
			if(this.listconditions)
			{
				this.listconditions.visible =false;
			} 
			
			if(this._atkraceInfoVoList.length>0)
			{
				this.isData =true;
			}
			else
			{
				this.isData =false;
			}
		}
		else
		{
			this.isData =false;
		}  
	}
	private showText():void
	{	
		if(this._nameTxt)
		{
			this.removeChild(this._nameTxt);
			this._nameTxt=null;
		}

		if(this._atkraceInfoVoList.length>0&&this._atkraceInfoVoList[0].info)
		{
			var  data:any =this._atkraceInfoVoList[0];
			//击败｜｜全歼
			let str = "";
			if(this.isData&&data.info.type==1){
				str =LanguageManager.getlocal("atkracebeat");
			}
			else
			{
				str =LanguageManager.getlocal("atkraceAnnihilation");
			} 
			let describeTxt = null ;
			describeTxt  =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			var currName =Config.ServantCfg.getServantItemById(data.info.sid).name;
				//追杀文字
			if(data.info.iskill&&data.info.iskill==1)
			{	
				if(data.info.type==1)
				{
					describeTxt.text =LanguageManager.getlocal("atkraceCrossIskilldes1",[currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
				}
				else 
				{
					describeTxt.text =LanguageManager.getlocal("atkraceCrossIskilldes2",[currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
				}
			}
			else if(data.info.streak&&data.info.streak>=3)
			{
				describeTxt.text =LanguageManager.getlocal("actrackStraight",[currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{
				describeTxt.text =LanguageManager.getlocal("actrackDescription",[currName,str,data.info.uname2,data.info.fightnum]);
			}
			describeTxt.width=450;
			describeTxt.x = 20;
			describeTxt.y =	 GameConfig.stageHeigth-40;
			this.describeTxt= describeTxt;
			this.addChild(describeTxt);
			
			let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
			
			let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.info.zid);
			let zidStr = LanguageManager.getlocal("atkraceCrossServeDes",[sidname]);
			nameTxt.text = zidStr+this._atkraceInfoVoList[0].info.name;
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-67;
			this.addChild(nameTxt);
			this._nameTxt =nameTxt;
		
		}
		
	}

	private rankHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSRANKLISTVIEW);
	}

	private visitHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVISITVIEW);
	}

	private rewardHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSACTIVITYREWARDVIEW);
	}

	private showMoreHandle():void
	{
		if(this.touchBoo)
		{
			this._isShowMore = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
				this._moreArrow.y += this._moreArrow.height;
				
					this.showList();
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
					this.closeList();
			}
		}
		
	}


	private showList():void
	{	
		
			this.moveContainer= new BaseDisplayObjectContainer();
			this.addChild(this.moveContainer);

			this.moreBg = BaseBitmap.create("arena_bottom_bg");
			this.moreBg.width = 640;
			this.moreBg.height =GameConfig.stageHeigth - 330;
			this.moveContainer.addChild(this.moreBg);

			this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
			this._currMaskBmp.width=GameConfig.stageWidth;
			this._currMaskBmp.height=GameConfig.stageHeigth;
			this._currMaskBmp.touchEnabled = true;
			this.addChild(this._currMaskBmp);
			this.setChildIndex(this._currMaskBmp,this.getChildIndex(this.bottom));


			// 增加 点击区域
			this._touchBg = BaseBitmap.create("public_9_bg25");  
			this._touchBg.width = 640;
			this._touchBg.height =260;
			this._touchBg.x=0;
			this._touchBg.y=-240;
			this._touchBg.alpha =0;
			this._touchBg.addTouchTap(this.showMoreHandle,this);
			this.moveContainer.addChild(this._touchBg);

			if(this.isData)
			{
				let rect = egret.Rectangle.create();
				rect.setTo(0, 10, 640, GameConfig.stageHeigth -340);
				this._scrollList = ComponentManager.getScrollList(ActrackCrossMoreItem, this._atkraceInfoVoList, rect);
				this.moveContainer.addChild(this._scrollList);
				this._scrollList.y =5;
			}
			else
			{
				let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
				atkracedes3.x =250;
				atkracedes3.y =300;
				this.moveContainer.addChild(atkracedes3);
			}	
			this.moveContainer.y =1150;
			this.touchBoo=false;
		

			//描述文字：击败门客20
		 	var num =Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1).getbeatNum();
			let listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions",[num+""]), 20);
			listconditions.x =100
			listconditions.y = GameConfig.stageHeigth - 50;
			this.addChild(listconditions);
			this.listconditions = listconditions;

			if(this.listconditions)
			{
				this.listconditions.visible =false;
			}
			if(this.describeTxt)
			{
				this.describeTxt.visible =false;
				this._nameTxt.visible =false;
			}
			
			egret.Tween.get(this.moveContainer).to({y:250},500).call(function()
			{
				egret.Tween.removeTweens(this.moveContainer);
				this.touchBoo =true;
				if(this.listconditions)
				{
					this.listconditions.visible =true;
				}
			},this);
	}

	private closeList():void
	{
		this.touchBoo=false;
		this.listconditions.visible =false;
		if(this.describeTxt)
		{
			this.describeTxt.visible =true;
			this._nameTxt.visible =true;
		}
		
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
			egret.Tween.removeTweens(this.moveContainer);
		
		},this);
		}

		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
		}
	}

	private battleCallback():void
	{
		this.resetInfo();

		if(this.describeTxt)
		{
			this.removeChild(this.describeTxt);
			this.describeTxt =null;
		}

		 NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_LIST, {});
		 App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);
	
	}

	private fightendCallback():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("atkracecrossFightEndTip"));
		this._isFightEnd = true;
		ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW);
		ViewController.getInstance().hideView(ViewConst.POPUP.CONFIRMPOPUPVIEW);
		ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG);
		ViewController.getInstance().hideView(ViewConst.BASE.BATTLEWIN);
		ViewController.getInstance().hideView(ViewConst.BASE.PROMPTVIEW);
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX,{activeId:crossVo.aidAndCode});
	}

	private challengeCallback(data:any):void
    {
        if(data.data.ret)
        {
			if(AtkraceCrossChallengeItem.data&&AtkraceChallengeItem.data.type==1)
			{
				 if(this.touchBoo)
				 {
					 this.moveContainer.y=1150;
					 this._currMaskBmp.visible =false;
				 }
			}
			 this.refreshServant();
			 ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
        	 this.clickServant();
        }
    }

	private refreshServant():void
	{	
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX,{activeId:crossVo.aidAndCode});
	}


	private clickDetailBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSDETAILPOPUPVIEW);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.fightendCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_KILL), this.challengeCallback, this);
 		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_LIST), this.useCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);


		this._moreArrow = null;
		this.bottom = null;
		this._isShowMore = false;
		this.touchBoo=true;
		this.moveContainer =null;
		this.listconditions =null;
		this.describeTxt =null;
		this._nameTxt =null;
		this._currMaskBmp  =null;
		this._touchBg =null;
		this.moreBg =null;
		this.isData = false;
		this._scrollList = null;
		this._atkraceInfoVoList.length = 0;
		this._topBg = null;
		this._scoreTextTab.length = 0;
		this._rewwardTime = null;
		this._countDownTime = 0;
		this._infoContainer = null;
		this._countDownText = null;
		this._fightflag = null;
		this._topType = 0;
		this._serverList = null;
		this._isCanJoin = false;
		this._rewardCDTime = 0;
		this._isFightEnd = false;
		this._chatTxt = null;
		super.dispose();
	}
}
class AtkraceView extends CommonView
{	
	private _moreArrow:BaseBitmap = null;
	private _isShowMore:boolean = false;

	private _curServant:BaseBitmap = null;

	private _infoContainer:BaseDisplayObjectContainer = null;
	/**
	 * 倒计时
	 */
	private _countDownTime:number = 0;
	private _countDownText:BaseTextField = null;
	private listconditions:BaseTextField = null;
	private _fightflag:boolean = null;

	private _scrollList: ScrollList;
	private _atkraceInfoVoList:Array<any>=[];
	private bottom:BaseBitmap =null;
	private _currMaskBmp:BaseBitmap =null;
	private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
	private isData:boolean =false;
	private _touchBg:BaseBitmap =null;
	private _nameTxt:BaseTextField =null;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"rankinglist_rankbg",
					"rankinglist_line",
					"arena_bg","forpeople_bottom","arena_bottom","atkrace_morale",
					"arena_arrow","arena_bottom_bg","arena_more_down","arena_more","arena_rank","arena_rank_text","arena_visit","arena_visit_text",
					"servant_mask",

					]);
	}

	// 规则说明内容
	protected getRuleInfo():string
	{
		return "atkraceInfo";
	}

	protected getBgName():string
	{
		return "arena_bg";
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
		return {requestType:NetRequestConst.REQUEST_ATKRACE_INDEX,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.data.data.fightflag == false) {
			this._fightflag= false;
		}
		else {
			this._fightflag= true;
		}
		if (this._infoContainer) {
			this.resetInfo();
		}
	}

	public initView():void
	{	
		Api.rookieVoApi.checkNextStep();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE,this.battleCallback,this);
	    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);

		this.initBottom();
		this.resetInfo();

		//检查有没有没有领取的奖励
		if (this._fightflag) {
			let rewardc:any = Api.atkraceVoApi.getRewardc()
			if (rewardc && rewardc.flag && rewardc.flag> 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW,{});
			} 
		}
		
		 NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
		 App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
		
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
			wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250);
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
		else {
			//检查是否已有门客
			let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		
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
				let maxCount:number = Config.AtkraceCfg.getDailyNum();
				let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();

				//对话框
				let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
				wordsBg.width = 260;
				wordsBg.height=78;
				wordsBg.setPosition(GameConfig.stageWidth/2 - wordsBg.width/2,250);
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
					let extraCoefficient:number =  Config.AtkraceCfg.getParameter1();
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
					this._countDownTime = myInfo.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime;
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
	}

	private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public tick():void
	{	
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this.refreshServant();
			}
		}
	}
	
	private refreshServant():void
	{
		this.request(NetRequestConst.REQUEST_ATKRACE_INDEX,{});
	}

	//底部
	private initBottom():void
	{	
		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottom.height = 94;
		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth; 
		 
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChild(maskDown);
		this.swapChildren(maskDown,this.container);
		
		//来访消息
		let visitBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.visitHandle,this,null,0);
		visitBg.setPosition(24,GameConfig.stageHeigth - 200);
		this.addChild(visitBg);

		let visitIcon:BaseBitmap = BaseBitmap.create("arena_visit");
		visitIcon.setPosition(visitBg.width/2-visitIcon.width/2,visitBg.height/2-visitIcon.height/2-5);
		visitBg.addChild(visitIcon);

		let visitText:BaseBitmap = BaseBitmap.create("arena_visit_text");
		visitText.setPosition(visitBg.width/2-visitText.width/2,visitIcon.y + visitIcon.height -30);
		visitBg.addChild(visitText);

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

	private visitHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
	}

	private rankHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACERANKLISTVIEW);
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

	//点击门客 进入战斗
	private clickServant():void
	{
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
		}
		else {
			let nameStr:string = myAtkInfo.getFName();
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid});
		}
	}

	private doGuide()
    {
       this.clickServant();
    }

	private battleCallback():void
	{
		this.resetInfo();

		if(this.describeTxt)
		{
			this.removeChild(this.describeTxt);
			this.describeTxt =null;
		}

		 NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
		 App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
	
	}

	private clickDialog2():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
	}

	private clickDialog():void
	{
		let itemId:string = Config.AtkraceCfg.getFightAdd();
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
			 id: itemId
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
	}

	private buyChallenge():void
	{
		this.request(NetRequestConst.REQUEST_ATKRACE_USEEXTRA,{});
	}

	public useCallback(event: egret.Event): void 
	{
		if(event.data.ret)
		{
			this._atkraceInfoVoList =event.data.data.data.atklist;	
			this.showText();
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
			if(data.info.streak&&data.info.streak>=3)
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
			nameTxt.text = this._atkraceInfoVoList[0].info.name;
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-67;
			this.addChild(nameTxt);
			this._nameTxt =nameTxt;
		
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
				
				this._scrollList = ComponentManager.getScrollList(ActrackMoreItem, this._atkraceInfoVoList, rect);
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
		 	var num =Config.AtkraceCfg.getbeatNum();
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

	 private challengeCallback(data:any):void
    {
        if(data.data.ret)
        {
			if(AtkraceChallengeItem.data&&AtkraceChallengeItem.data.type==1)
			{
				 if(this.touchBoo)
				 {
					 this.moveContainer.y=1150;
					 this._currMaskBmp.visible =false;
				 }
			}
			 this.refreshServant();
			 ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
        	 this.clickServant();
        }
    }

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE,this.battleCallback,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
    	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
       
 		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);

		this._moreArrow = null;
		this._isShowMore = false;
		this._curServant = null;
		this._infoContainer = null;
		this._countDownTime = 0;
		this._countDownText = null;
		this._fightflag = null;
		this._currMaskBmp  =null;
		this.moreBg =null;
		this.moveContainer =null;
		this.touchBoo=true;
		this.listconditions =null;
		this.describeTxt =null;
		this._touchBg =null;
		this._nameTxt =null;
		super.dispose();
	}

}
/**
 * 联盟
 * author dky
 * date 2017/11/28
 * @class AllianceView
 */
class AllianceView extends CommonView
{

	private _wordbg:BaseBitmap;
	private _wordbgCor:BaseBitmap;
	private _wordsText: BaseTextField;

	private _progressBar: ProgressBar;
	private _levelTF: BaseBitmapText|BaseTextField;
	private _expTF: BaseTextField;
	private _moneyTF: BaseTextField;
	private _memberTF: BaseTextField;
	private _messageTF: BaseTextField;
	private _bottomContiner:BaseDisplayObjectContainer;
	private _chatTxt:BaseTextField;
	private _chatTxtPoint:BaseTextField;
	private _allianceNameTF: BaseTextField;

	private _scrollList: ScrollList;
	private _moreArrow:BaseBitmap = null;
	private _isShowMore:boolean = false;
	private _currMaskBmp:BaseBitmap =null;
	private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private _atkraceInfoVoList:Array<any>=[];
	private bottom:BaseBitmap =null;

	private _bBg:BaseBitmap;

	private allianceVo:AllianceVo =null;
	private moveContainer:BaseDisplayObjectContainer =null;

	private nameTxt:BaseTextField =null;
	private _describeTxt:BaseTextField =null;

	private _applyRedDotSp:BaseBitmap = null;
	private _strTxt:BaseTextField =null;
	private _touchBg:BaseBitmap =null;
	private _bottomBtnCfg = [];
	private _btnNode:BaseDisplayObjectContainer = null;
	private _arrow_leftBtn:BaseButton;
	private _arrow_rightBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,requestData:{}};
	}
	public initView():void
	{

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE,this.checkData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_TRANSFER,this.refreshBottom,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.quitAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND,this.quitAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);

		this.initbtmCfg();
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		this.allianceVo =allianceVo;

		let bottomBg = BaseBitmap.create("alliance_bg1");
		bottomBg.setPosition(0,GameConfig.stageHeigth - bottomBg.height - 120);
		this.addChildToContainer(bottomBg);

		let npcPic = BaseBitmap.create("story_npc_8");
		npcPic.x = 0;
		npcPic.y = GameConfig.stageHeigth - this.container.y - 467 - 150;
		
		this.addChildToContainer(npcPic);

		this._wordbg = BaseBitmap.create("public_9_bg25");
		this._wordbg.x = 30;
		this._wordbg.y = npcPic.y - 100;
		this._wordbg.width = 260;
		this._wordbg.height = 78;
		this.addChildToContainer(this._wordbg);

		this._wordbgCor = BaseBitmap.create("public_9_bg25_tail");
		this._wordbgCor.x = 160;
		this._wordbgCor.y = this._wordbg.y + this._wordbg.height - 3;
		this.addChildToContainer(this._wordbgCor);

		this._wordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._wordsText.text = LanguageManager.getlocal("allianceBOSSTip1");
		this._wordsText.x = this._wordbg.x + 20;
		this._wordsText.y = this._wordbg.y + 20;
		this._wordsText.width = 220;
		this._wordsText.height = 80;
		this.addChildToContainer(this._wordsText);

		let titleBg = BaseBitmap.create("alliance_attbg");
		titleBg.width = 612;
		titleBg.x = 15;
		titleBg.y = -5;
		this.addChildToContainer(titleBg);


		this._progressBar = ComponentManager.getProgressBar("progress9", "progress9_bg", 499);
		this._progressBar.x = titleBg.x + 91;
		this._progressBar.y = titleBg.y + 71 ;
		this.addChildToContainer(this._progressBar);
		

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString())
		let expStr = allianceVo.exp + " / " + allianceCfg.exp;
		this._progressBar.setPercentage(allianceVo.exp / allianceCfg.exp);
		this._expTF =  ComponentManager.getTextField(expStr, 18, TextFieldConst.COLOR_WHITE);
		this._expTF.x = this._progressBar.x + this._progressBar.width/2 - this._expTF.width/2;
		this._expTF.y = this._progressBar.y + this._progressBar.height/2 - this._expTF.height/2;
		this.addChildToContainer(this._expTF);

		let infoBtn =  BaseBitmap.create("public_alphabg");
		infoBtn.width = 100;
		infoBtn.height = 100;
		infoBtn.x = 15;
		infoBtn.y = -5;
		this.addChildToContainer(infoBtn);
		infoBtn.addTouchTap(this.infoCilck, this);

		let levelBg = BaseBitmap.create("alliance_level");
		levelBg.x = titleBg.x + 13;
		levelBg.y = titleBg.y + 30;
		this.addChildToContainer(levelBg);

		this._levelTF = ComponentManager.getBitmapText(allianceVo.level.toString(), "recharge_fnt");
		// this._levelTF.setScale(0.8); 
		this._levelTF.x = levelBg.x + levelBg.width/2 - this._levelTF.width/2;
		this._levelTF.y = levelBg.y + levelBg.height + 5;
        this.addChildToContainer(this._levelTF);

		this._allianceNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
		this._allianceNameTF.text = allianceVo.name;
		this._allianceNameTF.x = titleBg.x + 120;
		this._allianceNameTF.y = titleBg.y + 20;
		this.addChildToContainer(this._allianceNameTF);

		let wealthStr = LanguageManager.getlocal("allianceWealthTitle",[allianceVo.wealth.toString()]);
		this._moneyTF =  ComponentManager.getTextField(wealthStr, 18, TextFieldConst.COLOR_WHITE);
		this._moneyTF.x = this._allianceNameTF.x;
		this._moneyTF.y = titleBg.y + 50;
		this.addChildToContainer(this._moneyTF);

		// 
		let memStr = LanguageManager.getlocal("allianceMemberTitle",[allianceVo.mn + "/" + allianceVo.maxmn])
		this._memberTF =  ComponentManager.getTextField(memStr, 18, TextFieldConst.COLOR_WHITE);
		this._memberTF.x = 300;
		this._memberTF.y = this._moneyTF.y;
		this.addChildToContainer(this._memberTF);

		let idStr = LanguageManager.getlocal("allianceIDTitle",[allianceVo.id.toString()]);
		let idTF =  ComponentManager.getTextField(idStr, 18, TextFieldConst.COLOR_WHITE);
		idTF.x = 450;
		idTF.y = this._moneyTF.y;
		this.addChildToContainer(idTF);

		//	公告
		let noticeBg = BaseBitmap.create("alliance_noticebg");
		noticeBg.x = 340;
		noticeBg.y = 200;
		this.addChildToContainer(noticeBg);

		//	公告
		let noticeBB = BaseBitmap.create("alliance_notice");
		noticeBB.x = noticeBg.x + noticeBg.width/2 - noticeBB.width/2;
		noticeBB.y = noticeBg.y + 20;
		this.addChildToContainer(noticeBB);

		let msgStr = allianceVo.message;
		if(msgStr == ""){
			msgStr = LanguageManager.getlocal("allianceMessageTip");
		}
		this._messageTF =  ComponentManager.getTextField(msgStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._messageTF.width = 220;
		this._messageTF.x = noticeBg.x + noticeBg.width/2 - this._messageTF.width/2;
		this._messageTF.y = noticeBg.y + 20 + 40;
		this.addChildToContainer(this._messageTF);

		this._bBg = BaseBitmap.create("arena_bottom");
		this._bBg.y = GameConfig.stageHeigth - this._bBg.height;
		this.addChild(this._bBg);
		this.bottom = this._bBg;

		// let buttonBg:BaseBitmap = BaseBitmap.create("public_9_alliancebtnbg");
		// buttonBg.width = GameConfig.stageWidth
		// buttonBg.y = bottom.y - buttonBg.height + 30;
		// this.addChild(buttonBg);

		this.initButtom();
		this.showAni();
		this.tick();
		this.checkRedPoint();
	}

	private showAni()
	{
		// let 
		if(!this.param){
			return;
		}
		ViewController.getInstance().openView(ViewConst.BASE.ALLIANCECREATEANIVIEW,{type:this.param.data.type});
	}
	private showAni2()
	{
		ViewController.getInstance().openView(ViewConst.BASE.ALLIANCECREATEANIVIEW,{type:2});
	}

	private initButtom():void
	{
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.info.joinFlag == 1)
		{
			this.showAni2();

		}

		this._bottomContiner=new BaseDisplayObjectContainer();
		//填内容
		
		this.addChild(this._bottomContiner);

				//聊天按钮相关
		let chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		chatbg.width = GameConfig.stageWidth;
		chatbg.height = 35;
		chatbg.x=0;
		chatbg.y= 0;
		this._bottomContiner.addChild(chatbg);

		// let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg"));
		// bottomBg.x=0;
		// bottomBg.y=-bottomBg.height;
		// this._bottomContiner.addChild(bottomBg);
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_alliancebtnbg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.name = "bottomBg";
		// bottomBg.y = bottom.y - bottomBg.height + 30;
		this._bottomContiner.addChild(bottomBg);
		this._bottomContiner.setPosition(0,this._bBg.y - bottomBg.height + 30);

		let arrow_leftBtn = ComponentManager.getButton("btn_leftpage","",this.switchHandler,this,["left"]);
		arrow_leftBtn.name = "arrow_leftBtn";
		arrow_leftBtn.setScale(0.6);
		arrow_leftBtn.x = bottomBg.x + 25;
		arrow_leftBtn.y = bottomBg.y +bottomBg.height/2 - arrow_leftBtn.height/2 * 0.6 +10;
		this._bottomContiner.addChild(arrow_leftBtn);
		this._arrow_leftBtn = arrow_leftBtn;

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpage","",this.switchHandler,this,["right"]);
		arrow_rightBtn.name = "arrow_rightBtn";
		arrow_rightBtn.scaleX = -1*0.6;
		arrow_rightBtn.scaleY = 0.6;
		arrow_rightBtn.x = bottomBg.x + bottomBg.width - arrow_rightBtn.width*0.6+10;
		arrow_rightBtn.y = arrow_leftBtn.y; 
		this._bottomContiner.addChild(arrow_rightBtn);
		this._arrow_rightBtn = arrow_rightBtn;

		// this.checkAchPoint();
		// this.checkAllRedPoint();
		this.initBotBtnList();

		chatbg.touchEnabled = true;
		chatbg.addTouchTap(this.chatBgClickHandler,this);

		let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
		chatIcon.anchorOffsetX = chatIcon.width/2;
		chatIcon.anchorOffsetY = chatIcon.height/2;
		chatIcon.x =  chatIcon.width/2+10;
		chatIcon.y = chatbg.y + chatbg.height/2;
		this._bottomContiner.addChild(chatIcon);
		egret.Tween.get(chatIcon, {
            loop: true,//设置循环播放
        }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
		
		let showStr:string=Api.chatVoApi.getLastMessage();
		if(!showStr)
		{
			showStr="1";
		}
		this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxt.x = chatIcon.x + 20;
		this._chatTxt.y = chatIcon.y - this._chatTxt.height/2;
		this._chatTxt.width = 480;
		this._chatTxt.height = 50;
		this._chatTxt.lineSpacing = 50;
		this._bottomContiner.addChild(this._chatTxt);
		

		this._chatTxtPoint = ComponentManager.getTextField("...",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxtPoint.x = 522;
		this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height/2 - 5;
		this._chatTxtPoint.visible = false;
		// this._chatTxtPoint.width = 450;
		// this._chatTxtPoint.height = 20;
		this._bottomContiner.addChild(this._chatTxtPoint);
		this.doRefreshChat();

		let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,GameConfig.stageHeigth - this.bottom.height/2  - showMore.height/2);
		this.addChild(showMore);

		this._moreArrow = BaseBitmap.create("arena_arrow");
		this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - this.bottom.height/2  - this._moreArrow.height/2);
		this.addChild(this._moreArrow);
		
		this._atkraceInfoVoList = this.allianceVo.log;
		this.showText();
	}

	private switchHandler(param:any)
	{
		let changeW = 505;
		 let btnScrollView = <ScrollView>this._bottomContiner.getChildByName("btnScrollView");
		 let scroL = btnScrollView.scrollLeft;
		if(param ==  "right"){
			if (scroL + changeW > btnScrollView.getMaxScrollLeft()){
				scroL = btnScrollView.getMaxScrollLeft() ;
			}else{
				scroL += changeW;
			}
		}
		if(param == "left"){
			if (scroL - changeW < 0){
				scroL =  0;
			}else{
				scroL -= changeW;
			}
		}

		btnScrollView.setScrollPosition(0,scroL);
		this.changeArrowBtnStatus();
	}
	protected changeArrowBtnStatus()
	{
		let btnScrollView = <ScrollView>this._bottomContiner.getChildByName("btnScrollView");
		let scroL = btnScrollView.scrollLeft;
		let maxSLeft = btnScrollView.getMaxScrollLeft();
		if(scroL <= 0)
		{
			this._arrow_leftBtn.setEnable(false);
			this._arrow_rightBtn.setEnable(true);
		}
		if (scroL >= maxSLeft)
		{
			this._arrow_leftBtn.setEnable(true);
			this._arrow_rightBtn.setEnable(false);
		}
		
		if(scroL > 0 && scroL < maxSLeft ){
			this._arrow_leftBtn.setEnable(true);
			this._arrow_rightBtn.setEnable(true);
		}
	}
	private initBotBtnList()
	{	
		let btnScrollView = <ScrollView>this._bottomContiner.getChildByName("btnScrollView") ;
		if( btnScrollView){
			this._bottomContiner.removeChild(btnScrollView)
		}
		if(this._btnNode){
			this._btnNode = null;
		}

		this.initbtmCfg();

		if(this._bottomBtnCfg.length <= 5)
		{
			this._arrow_rightBtn.setEnable(false);
			this._arrow_leftBtn.setEnable(false);
		}else{
			this._arrow_rightBtn.setEnable(true);
			this._arrow_leftBtn.setEnable(true);
		}
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		let bottomBg = this._bottomContiner.getChildByName("bottomBg");
		let PerWidth = 95;

		let curIdx = 0;
		this._btnNode = new BaseDisplayObjectContainer();
		for (let i = 0; i < this._bottomBtnCfg.length; i++)
		{
			let btncfg = this._bottomBtnCfg[i];
			let imgBg = BaseBitmap.create("alliance_iconbg");
			imgBg.x = 13 +PerWidth*curIdx ;
			imgBg.y = 60;
			imgBg.name = btncfg.btnName + "imgBg";
			this._btnNode.addChild(imgBg);
	
			let imgBtn = ComponentManager.getButton(btncfg.btnIconImg,"",this.bottomBtnClickHandler,this,[btncfg]);
			imgBtn.x = 8 +PerWidth*curIdx ;
			imgBtn.y = 50;
			imgBtn.name = btncfg.btnName;
			this._btnNode.addChild(imgBtn);

			let imgName = BaseBitmap.create(btncfg.btnNameImg);
			imgName.x = 5 +PerWidth*curIdx ;
			imgName.y = 120;
			this._btnNode.addChild(imgName);
			imgName.name = btncfg.btnName + "imgName";
			curIdx +=1 ;
			if(btncfg.btnName == "task" && !Api.allianceTaskVoApi.isAllianceTaskLVEnable() ){
				App.DisplayUtil.changeToGray(imgBg);
				App.DisplayUtil.changeToGray(imgBtn);
				App.DisplayUtil.changeToGray(imgName);
			}
		}

		this._btnNode.width += 40;
		let srowW = bottomBg.width-160;
		let scrRect = new egret.Rectangle(0,0,srowW,bottomBg.height);
		this._btnNode.width = srowW * Math.ceil(this._bottomBtnCfg.length/5 );
		btnScrollView = ComponentManager.getScrollView(this._btnNode,scrRect);
		btnScrollView.verticalScrollPolicy = "off";
		btnScrollView.horizontalScrollPolicy = "off";
		btnScrollView.bounces = false;
		btnScrollView.x = bottomBg.x+80;
		btnScrollView.y = bottomBg.y;
		btnScrollView.name = "btnScrollView";
		btnScrollView.touchEnabled = false;
		this._bottomContiner.addChild(btnScrollView);
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

		
			if(this.allianceVo.log&&this.allianceVo.log.length>0)
			{
				let rect = egret.Rectangle.create();
				rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
				this._scrollList = ComponentManager.getScrollList(AllianceMoreItem, this._atkraceInfoVoList, rect);
				this.moveContainer.addChild(this._scrollList);
				this._scrollList.y=5;
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
			egret.Tween.get(this.moveContainer).to({y:260},500).call(function()
			{
				egret.Tween.removeTweens(this.moveContainer);
				this.touchBoo =true;
			},this);
	}
	private showText():void
	{
		if(this._atkraceInfoVoList&&this._atkraceInfoVoList.length>0)
		{
			//名称  
			let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
			nameTxt.text = this._atkraceInfoVoList[0][2];
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-67;
			this.addChild(nameTxt);
			this.nameTxt =nameTxt;

			let strTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			strTxt.x=440;
			strTxt.y =GameConfig.stageHeigth-46;
			strTxt.text ="...";
			this.addChild(strTxt);
			strTxt.visible =false;
			this._strTxt =strTxt;

			let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			let str = Api.allianceVoApi.getStr(this._atkraceInfoVoList[0]);
			describeTxt.x = 20;
			describeTxt.y = GameConfig.stageHeigth-40;
			describeTxt.height=16;
			describeTxt.text =str;
			this._describeTxt =describeTxt
			if(describeTxt.width>=420)
			{	
				describeTxt.width =420;
				strTxt.visible =true;
			}
			else
			{
				strTxt.visible =false;
			}
			this.addChild(describeTxt);
		}
		
	}
	private refreshText():void
	{	
		
		if(this.nameTxt&&this._atkraceInfoVoList.length>1&&this._describeTxt)
		{
			this.nameTxt.text = this._atkraceInfoVoList[0][2];
			this._describeTxt.text =Api.allianceVoApi.getStr(this._atkraceInfoVoList[0]);
		
			if(this._describeTxt.width>=420)
			{
				this._describeTxt.width =420;
				this._strTxt.visible =true;
			}
			else
			{
				this._strTxt.visible =false;	
			}
		}
		
	}
		

	private closeList():void
	{
		this.touchBoo=false;
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

	private refreshBottom()
	{
		this.initBotBtnList();
	}

	private quitAlliance()
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("allianceMemberQuitSuccess"))
		this.hide();
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
		
	}

	private checkRedPoint()
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		if(allianceVo.apply[0])
		{
			if(this._applyRedDotSp == null &&this._btnNode.getChildByName("manage"))
			{
				this._applyRedDotSp = BaseBitmap.create("public_dot2");
				let achBtn = this._btnNode.getChildByName("manage");

				this._applyRedDotSp.x = achBtn.x + achBtn.width - this._applyRedDotSp.width + 5 ;
				this._applyRedDotSp.y = achBtn.y + 10;
				this._btnNode.addChild(this._applyRedDotSp);
			}
			else
			{
				if(this._applyRedDotSp)
				{
					this._applyRedDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._applyRedDotSp)
			{
				this._applyRedDotSp.visible = false;
			}
		}
	}
	protected bottomBtnClickHandler(param:any):void
	{
		
		// let isOPen= param.isOPen;
		// if(!isOPen)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		// 	return;
		// }
		let btnName = param.btnName;
		switch (btnName)
		{
			case "manage":
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEMANAGEPOPUPVIEW);
				// ViewController.getInstance().openView(ViewConst.COMMON.ACRANKACTIVEVIEW,"1");
				break;
			case "build":
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBUILDPOPUPVIEW);
				break;
			case "member":
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEMEMBERPOPUPVIEW);
				break;
			case "exchange":
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEEXPOPUPVIEW);
				break;
			case "boss":
				// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSPOPUPVIEW);
				break;
			case "rank": 
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCERANKPOPUPVIEW);
				break;
			case "task": 
				if(Api.allianceVoApi.getAllianceVo().level < Config.AlliancetaskCfg.getAllianceTaskNeedLv()){
					App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskOpenLvTip"));
				}else{
					ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKVIEW);
				}	
				
				break;
			default:
				break;
		}
	}
	protected chatBgClickHandler():void
	{
		// App.LogUtil.log("chatBgClickHandler >>>>> ");
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB1);
	}
	protected doRefreshChat()
	{
		this._chatTxt.text = Api.chatVoApi.getLastMessage();
		let chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(chatTxt.width >= 480){
			this._chatTxtPoint.visible = true;
		}
		else{
			this._chatTxtPoint.visible = false;
		}
	}
	private checkData()
	{
		let curCmd = NetManager.curReceiveCmd;
		if(Api.playerVoApi.getPlayerAllianceId() == 0 && curCmd != NetRequestConst.REQUEST_ALLIANCE_DISBAND&& curCmd != NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE){
			// App.CommonUtil.showTip(LanguageManager.getlocal("allianceBeKick"));
			ViewController.getInstance().hideAllView();
			Api.allianceVoApi.openMainView();
			return;
		}

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let wealthStr = LanguageManager.getlocal("allianceWealthTitle",[allianceVo.wealth.toString()]);
		let memStr = LanguageManager.getlocal("allianceMemberTitle",[allianceVo.mn + "/" + allianceVo.maxmn])
		this._allianceNameTF.text = allianceVo.name;
		let msgStr = allianceVo.message;
		if(msgStr == ""){
			msgStr = LanguageManager.getlocal("allianceMessageTip");
		}
		this._messageTF.text = msgStr;
		this._levelTF.text = allianceVo.level.toString();
		this._memberTF.text = memStr;
		this._moneyTF.text = wealthStr;

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString())
		let expStr = allianceVo.exp + " / " + allianceCfg.exp;
		this._expTF.text = expStr;
		this._progressBar.setPercentage(allianceVo.exp / allianceCfg.exp);
		
		//显示消息 
		this._atkraceInfoVoList = allianceVo.log;
		if(this._scrollList)
		{
			this._scrollList.refreshData(this._atkraceInfoVoList);
			this._scrollList.y=5;
		}
		this.refreshText();
		this.checkRedPoint();

	}
	private infoCilck()
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESHOWINFOPOPUPVIEW,{aid:allianceVo.id});
	}

	protected doQuickAlliance()
	{
		// this.hide();
		// App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
	}
	protected initbtmCfg(){

		this._bottomBtnCfg = [
			{
				id:2,
				btnName:"build",
				btnIconImg:"alliance_buildicon",
				btnNameImg:"alliance_build",
				// isOPen:true,
			},
			{
				id:3,
				btnName:"member",
				btnIconImg:"alliance_memicon",
				btnNameImg:"alliance_mem",
				// isOPen:true,
			},
			{
				id:4,
				btnName:"exchange",
				btnIconImg:"alliance_exicon",
				btnNameImg:"alliance_ex",
				// isOPen:true,
			},
			{
				id:5,
				btnName:"boss",
				btnIconImg:"alliance_bossicon",
				btnNameImg:"alliance_boss",
				// isOPen:true,
			},
		];
	
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.po <= 2){
			this._bottomBtnCfg.unshift({
				id:1,
				btnName:"manage",
				btnIconImg:"alliance_manageicon",
				btnNameImg:"alliance_manage",
				// isOPen:true,
			});
		}

		if(!Api.switchVoApi.checkOpenShenhe()){
			this._bottomBtnCfg.push({
				id:6,
				btnName:"rank",
				btnIconImg:"allianc_rankicon",
				btnNameImg:"alliance_rank",
				// isOPen:false,
			})
		}

		if(Api.switchVoApi.checkOpenAllianceTask()){
			this._bottomBtnCfg.push({
				id:7,
				btnName:"task",
				btnIconImg:"alliance_taskicon",
				btnNameImg:"alliance_task",
			})
		}

	}

	private createHander()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCECREATEPOPUPVIEW);
	}


	private doGetReward(event:egret.Event){
		// this._achId = event.data.achId;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:event.data.achId});
		
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		App.CommonUtil.playRewardFlyAction(rewardList);
	}
	public tick()
	{
		let aVo = Api.allianceVoApi.getAllianceVo();
		if(!aVo.isBossOpen())
		{
			this._wordbg.visible = false;
			this._wordbgCor.visible = false;
			this._wordsText.visible = false;
		}
		else{
			this._wordbg.visible = true;
			this._wordbgCor.visible = true;
			this._wordsText.visible = true;
		}
		if(this._btnNode)
		{
			let taskBtn = <BaseButton>this._btnNode.getChildByName("task");
			if(taskBtn){
				if(Api.allianceTaskVoApi.isShowRedForEntrance()){
					App.CommonUtil.addIconToBDOC(taskBtn);
					this.checkArrowBtnRed(true);
				}else{
					App.CommonUtil.removeIconFromBDOC(taskBtn);
					this.checkArrowBtnRed(false);
				}
			}
		}
	}
	
	protected checkArrowBtnRed(isRed:boolean)
	{
		// let btnScrollView = <ScrollView>this._bottomContiner.getChildByName("btnScrollView");
		// let scroL = btnScrollView.scrollLeft;
		// let maxSLeft = btnScrollView.getMaxScrollLeft();
		if(this._arrow_leftBtn.isEnable())
		{
			// App.CommonUtil.addIconToBDOC(this._arrow_leftBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._arrow_leftBtn);
		}

		if(this._arrow_rightBtn.isEnable()  && isRed)
		{
			App.CommonUtil.addIconToBDOC(this._arrow_rightBtn);
			let red = this._arrow_rightBtn.getChildByName("reddot");
			red.x = 5;
		}else{
			App.CommonUtil.removeIconFromBDOC(this._arrow_rightBtn);
		}

	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"alliance_bg1","alliance_attbg","alliance_level","alliance_noticebg","recharge_fnt",
					"alliance_notice","arena_bottom",
					"arena_arrow","arena_bottom_bg","arena_more_down","arena_more",
					"alliance_manageicon","alliance_manage","alliance_buildicon",
					"alliance_build","alliance_memicon","alliance_mem","alliance_exicon",
					"alliance_ex","alliance_bossicon","alliance_boss","allianc_rankicon","alliance_rank",
					"alliance_iconbg","dinner_rank_titlebg","dinner_line","progress9", "progress9_bg",
					"rankinglist_line","rankinglist_rankbg","story_npc_8","alliance_taskicon","alliance_task",
					"btn_leftpage","btn_leftpage_down",
					]);
	}




	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE,this.checkData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_TRANSFER,this.refreshBottom,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND,this.quitAlliance,this);

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		
		this._wordbg = null;
		this._wordbgCor = null;
		this._wordsText = null;
		this._progressBar = null;
		this._levelTF = null;
		this._expTF = null;
		this._moneyTF = null;
		this._memberTF = null;
		this._messageTF = null;
		this._bottomContiner = null;
		this._chatTxt = null;
		this._chatTxtPoint = null;
		this._allianceNameTF = null;

		this._scrollList = null;
		this._moreArrow = null;
		this._isShowMore = false;
		this._currMaskBmp = null;
		this.touchBoo =true;
		this.moreBg = null;
		this._atkraceInfoVoList=[];
		this.bottom = null;

		this._bBg = null;;

		this.allianceVo = null;
		this.moveContainer = null;
		this._describeTxt =null;
		this._strTxt =null;
		this._touchBg =null;
		this._bottomBtnCfg = null;
		this._btnNode = null;
		
		super.dispose();
	}
}
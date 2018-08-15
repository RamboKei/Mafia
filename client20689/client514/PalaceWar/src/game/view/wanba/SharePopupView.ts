class SharePopupView extends PopupView
{
	private _itemContainer:BaseDisplayObjectContainer;
	private _timeLabel:BaseTextField;

	private _handContainer:BaseDisplayObjectContainer;
	private _shareType:number = 0;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		// if(PlatformManager.checkIsWanbaSp()||PlatformManager.checkIsTWBSp() || PlatformManager.checkIs4399Sp()||PlatformManager.checkIsKRSp())
		// {
		// 	this.showWanbaInfo();
		// }
		// else
		// {
		// 	this.showFkylcInfo();
		// }
		this._shareType = PlatformManager.checkShare();
		if(this._shareType==2 || this._shareType==3)
		{
			this.showFkylcInfo();
		}
		else
		{
			this.showWanbaInfo();
		}
	}
	
	private showFkylcInfo():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS,this.sendShareSuccess,this);

		let getTxt = ComponentManager.getTextField(LanguageManager.getlocal(PlatformManager.checkIsAiweiyouSp()?"fkylcShareTip_aiweiyou":"fkylcShareTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		getTxt.x = this.viewBg.width/2 - getTxt.width/2
		getTxt.y = 20;
		this.addChildToContainer(getTxt);

		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 528;
		bottomBg.height = 614;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = 50;
		this.addChildToContainer(bottomBg);

		this.refreshView();

		let messageStr:string = LanguageManager.getlocal("fkylcGetCD",["00:00:00"]);
		this._timeLabel =  ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		this._timeLabel.setPosition(this.viewBg.width/2 - this._timeLabel.width/2,690);
		this.addChildToContainer(this._timeLabel);


		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,this.getTitleStr(),this.showHand,this);
		confirmBtn.setPosition(this.viewBg.width/2 - confirmBtn.width/2,this._timeLabel.y + this._timeLabel.height + 20);
		this.addChildToContainer(confirmBtn);

		this.tick();

		
		// for(let i:number=0;i<l;i++)
		// {
		// 	let rewardStr=rewards[keys[i]];
		// 	let icons = GameData.getRewardItemIcons(rewardStr);

		// 	let bg:BaseBitmap=BaseBitmap.create("public_9_bg14");
		// 	bg.width=517
		// 	bg.height=150;
		// 	bg.setPosition((this.viewBg.width-bg.width)/2,70+(bg.height+10)*i);
		// 	this.addChildToContainer(bg);
		// 	for(let ii:number=0;ii<icons.length;ii++)
		// 	{
		// 		icons[ii].setPosition(bg.x+20+(icons[ii].width+10)*ii,bg.y+15);
		// 		this.addChildToContainer(icons[ii]);
		// 	}

		// 	let lineImg = BaseBitmap.create("public_line1");
		// 	lineImg.x = this.width/2 - lineImg.width/2;
		// 	lineImg.y = 40;
		// 	this.addChildToContainer(lineImg);
		// }
	}

	private getFKYLCItem(reward:any,index:number,day:string):BaseDisplayObjectContainer
	{		
		let fkVo = Api.otherInfoVoApi.getFkShareInfo();

		let container = new BaseDisplayObjectContainer()
		
		let rewardStr=reward;
		let icons = GameData.getRewardItemIcons(rewardStr,true);

		let bg:BaseBitmap=BaseBitmap.create("public_9_bg14");
		bg.width=514
		bg.height=190;
		// bg.setPosition((this.viewBg.width-bg.width)/2,70+(bg.height+10)*i);
		container.addChild(bg);
		for(let ii:number=0;ii<icons.length;ii++)
		{
			icons[ii].setPosition(bg.x+20+(icons[ii].width+10)*ii,bg.y+15);
			container.addChild(icons[ii]);
		}

		let lineImg = BaseBitmap.create("public_line1");
		lineImg.x = container.width/2 - lineImg.width/2;
		lineImg.y = 127;
		container.addChild(lineImg);

		let getStr = LanguageManager.getlocal(PlatformManager.checkIsAiweiyouSp()?"fkylcShareNum_aiweiyou":"fkylcShareNum",[day]);

		 
		let getTxt = ComponentManager.getTextField(getStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		getTxt.x = 30;
		getTxt.y = 145;
		container.addChild(getTxt);

		
		let num = 0;
		if(fkVo)
		{
			num = fkVo.n;
		}
		let numStr
		let color = TextFieldConst.COLOR_WARN_RED;
		numStr =  "(" + num + "/" +  day + ")"
		if(num >= Number(day)){
			color = TextFieldConst.COLOR_WARN_GREEN2;
		}

		let mumTxt = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		mumTxt.x = 165;
		mumTxt.y = 145;
		mumTxt.textColor = color;
		container.addChild(mumTxt);

		//state 1 未领取 2已经领取 3未达成
		let state = 1;
		if(!fkVo){
			state = 3;
		}
		else{
			if(num >= Number(day))
			{
				if(fkVo.get[day] == 1)
				{
					state = 2;
				}
				else{
					state = 1;
				}
			}
			else{
				state = 3;
			}
		}
		if(state == 1){
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.getBtnCilck,this,[day]);
			getBtn.x = 350;
			getBtn.y = 134;
			container.addChild(getBtn);
			getBtn.setColor(TextFieldConst.COLOR_BLACK);
			getBtn.bindData = index;
		}
		else if(state == 3)
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.getBtnCilck,this,[day]);
			getBtn.x = 350;
			getBtn.y = 134;
			container.addChild(getBtn);
			getBtn.setColor(TextFieldConst.COLOR_BLACK);
			getBtn.bindData = index;
			getBtn.setEnable(false);
		}
		else{
			let stateIcon = BaseBitmap.create("achievement_state3");
			stateIcon.x = 378;
			stateIcon.y = 124;
			stateIcon.setScale(0.7);
			container.addChild(stateIcon);
		}


		return container;
	}

	private getBtnCilck(key:string){

		// let fkVo = Api.otherInfoVoApi.getFkShareInfo();
		// if(fkVo && fkVo.et && fkVo.et > GameData.serverTime)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("fkylcGetCDTip"));
		// 	return;
		// }

		this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD,{key:key});
		
	}

	private fkcwShareCallback():void
	{
		let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW)
		if(shareView && shareView.isInit())
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
		}
		else{
			NetManager.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE,null);
		}
	}

	private showHand()
	{
		if (this._shareType==3)
		{	
			PlatformManager.share(this.fkcwShareCallback,this);
			return;
		}

		if(!this._handContainer){
			this._handContainer = new BaseDisplayObjectContainer();
			this.addChild(this._handContainer)

			let maskBmp = BaseBitmap.create("public_9_viewmask");
			maskBmp.width=GameConfig.stageWidth;
			maskBmp.height=GameConfig.stageHeigth;
			maskBmp.touchEnabled = true;
			this._handContainer.addChild(maskBmp);
			maskBmp.addTouchTap(this.hideMask,this);

			let clickHand = BaseBitmap.create("guide_hand");
			clickHand.skewY = 180;
			clickHand.x = 590;
			clickHand.y = 10;
			this._handContainer.addChild(clickHand);

			egret.Tween.get(clickHand,{loop:true})
				.to({y:60}, 500)
				.to({y:10}, 500)

			let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
			getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
			getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
			getTxt.lineSpacing = 10;
			this._handContainer.addChild(getTxt);

			// egret.Tween.get(clickHand,{loop:true})
			// 		.to({scaleX: 0.9,scaleY:0.9}, 500)
			// 		.to({scaleX: 1,scaleY:1}, 500)

		}
		else{
			this._handContainer.visible = true;
		}
	}

	private hideMask()
	{
		if(this._handContainer){
			this._handContainer.visible = false;
		}
		// this.sendShareSuccess();
	}

	public tick()
	{
		// if(PlatformManager.checkIsFkylcSp){
			let fkVo = Api.otherInfoVoApi.getFkShareInfo();
			if(fkVo && fkVo.et && fkVo.et > GameData.serverTime)
			{
				let time = App.DateUtil.getFormatBySecond(fkVo.et -GameData.serverTime , 1)
				let messageStr:string = LanguageManager.getlocal("fkylcGetCD",[ time]);
	
				this._timeLabel.text = messageStr;
				this._timeLabel.visible = true;
			}
			else{
				if(this._timeLabel){
					this._timeLabel.visible = false;
				}
			}
			
		// }
		
	}

	private refreshView()
	{
		
		if(this._itemContainer)
		{
			this.removeChildFromContainer(this._itemContainer);
			this._itemContainer = null;
		}
		this._itemContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._itemContainer)

		let rewards = Config.GameprojectCfg.rewardFKYLC2;
		let keys=Object.keys(rewards);
		keys.sort(function(a,b){
			return Number(a)-Number(b);
		});
		let l:number=keys.length;
		for(let i:number=0;i<l;i++)
		{
			let item = this.getFKYLCItem(rewards[keys[i]],i,keys[i]);
			this._itemContainer.addChild(item)
			item.x = 30;
			item.y = 60 + (item.height+10)*i
		}


		
	}

	private showWanbaInfo():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.width=520;
		bg.height=184;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);

		let rewardTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("shareSuccessRewardDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		rewardTxt.setPosition(bg.x+10,bg.y+25);
		this.addChildToContainer(rewardTxt);

		let iconList:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB2,true);
		let l:number=iconList?iconList.length:0;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=iconList[i];
			icon.setPosition(bg.x+10+(icon.width+10)*i,rewardTxt.y+rewardTxt.height+5);
			this.addChildToContainer(icon);
		}

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sharePopupViewTitle",this.confirmHandler,this);
		confirmBtn.setPosition(bg.x+(bg.width-confirmBtn.width)/2,bg.y+bg.height+10);
		this.addChildToContainer(confirmBtn);
	}

	private confirmHandler():void
	{	
		
		PlatformManager.share(this.requestReward,this);
	}

	private sendShareSuccess():void
	{	
		this.hideMask();
		this.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE,{});

	}

	protected getTitleStr():string
	{
		if (PlatformManager.checkIsAiweiyouSp() == true)
		{
			return "sharePopupViewTitle_aiweiyou";
		}
		else 
		{
			return "sharePopupViewTitle";
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"achievement_state3","guide_hand"
					]);
	}

	private requestReward():void
	{
		this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD,{});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.cmd==NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD)
			{
				if(data.data.data.rewards)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
					this.hide();
				}
			}
			if(data.data.cmd==NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD)
			{
				if(data.data.data.rewards)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
					// this.hide();
				}
				this.refreshView();
			}
			if(data.data.cmd==NetRequestConst.REQUEST_OTHERINFO_FKSHARE)
			{
				this.refreshView();
			}
			
		}
	}
	public dispose():void
	{
		this._itemContainer = null;
		this._handContainer = null;
		this._timeLabel = null;
		this._shareType = 0;

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS,this.sendShareSuccess,this);
		super.dispose();
	}
}
window["rsdkShareCallback"] = function (code)
{
	if(Number(code) == 0){
		

		let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW)
		if(shareView && shareView.isInit())
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
		}
		else{
			NetManager.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE,null);
		}
	}
	
}
 
class WelfareViewFirstRecharge extends WelfareViewTab
{
	private _getBtn:BaseButton;
	private _goToRechargeBtn:BaseButton =null;
	private isWanba:boolean =false;
	private  _container:BaseDisplayObjectContainer = null;
	private getBtnY:number =0;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD),this.useCallback,this);	
	
		this.isWanba =Api.switchVoApi.checknewRecharge();
		super.init();

		if(this.isWanba)
		{
			this.showWanbaPanel();
			return;
		}
		 
		let temW = 491;
		let temH = this.bottomBg.height + this.bottomBg.y; 
		let line1 = BaseBitmap.create("public_line3");
		line1.width = temW - 100;
		line1.x = temW/2 - line1.width/2;
		line1.y = this.bottomBg.y+ 25;
		this.addChild(line1);

		let nameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRecharge"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = line1.x + line1.width/2 - nameTF.width/2;
		nameTF.y = line1.y + line1.height/2 - nameTF.height/2;
		this.addChild(nameTF);

		var  bg:BaseBitmap =null; 
		bg = BaseBitmap.create("public_9_bg21"); 
		bg.width = temW - 40;
		bg.height = 100;
		bg.x = temW/2 - bg.width/2;
		bg.y =  line1.y + 35;
		this.addChild(bg);
		 
		this.showReward(bg,bg.y+7);
		
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 0)
		{
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
			let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"gotocharge",this.clickBtnHandler,this);
			goToRechargeBtn.x = temW/2 - goToRechargeBtn.width/2;
			goToRechargeBtn.y = bg.y + bg.height + 48 - goToRechargeBtn.height/2;
			this.addChild(goToRechargeBtn);
			this._getBtn = goToRechargeBtn;
		}
		else if(payflag == 1)
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickBtnHandler,this);
			getBtn.x = temW/2 - getBtn.width/2;
			getBtn.y = bg.y + bg.height + 48 - getBtn.height/2;
			this.addChild(getBtn);
			this._getBtn = getBtn;

		}
		else
		{
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = temW/2 - hasGetSp.width/2; 
			hasGetSp.y = bg.y + bg.height + 48 - hasGetSp.height/2;
			this.addChild(hasGetSp);
		}
		
	}
	private showReward(bg:BaseBitmap=null,iconY:number=0):void
	{
		let temScale = 0.8;
		let spaceW = 15;
		let spaceH = 10;
		
		let rewardList = Config.FirstchargeCfg.getRewardItemVoList();
		let totalNum = rewardList.length;
	
		for(let i = 0;i<rewardList.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			icon.x = bg.x + bg.width/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
			icon.y =iconY;
			this.addChild(icon);

		}

	}

	private clickBtnHandler():void
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 1)
		{	 
			NetManager.request(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD,null);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		
	}
	//～～～～～玩吧版本～～～～～～～～
	private showWanbaPanel():void
	{
		
		let  rechargeArr:Array<number> =[]
		let rechargeArr2=Config.RechargeCfg.getNormalRechargeCfg();
		for(var i:number=0;i<rechargeArr2.length;i++)
		{
			 let _id =rechargeArr2[i].id;
			 let boo = Config.FirstchargeCfg.getneedRecharge(_id);
			 if(boo)
			 {
				 rechargeArr.push(rechargeArr2[i].cost)
			 }
		}
		rechargeArr = rechargeArr.reverse();

			

		var  firstBg = BaseBitmap.create("firstrecharge_bottom");
		this.addChild(firstBg);
		firstBg.y = GameConfig.stageHeigth - firstBg.height-90;

		let nameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRecharge"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		nameTF.x = firstBg.x+200;
		nameTF.y = firstBg.y+13;
		this.addChild(nameTF);
	
		this.getBtnY = firstBg.y+180;
		
		this.showReward(firstBg,firstBg.y+50);
		this.bottomBg.visible =false;
		
		let firstrechargemask_bg = BaseBitmap.create("firstrechargemask_bg");	
		firstrechargemask_bg.x = firstBg.x;
		firstrechargemask_bg.y = firstBg.y - 70;
		firstrechargemask_bg.width =firstBg.width;
		this.addChild(firstrechargemask_bg);

		let firstFontBit = BaseBitmap.create("firstrecharge_font");	
		firstFontBit.x = firstBg.x + 110;
		firstFontBit.y = firstBg.y - 120;
		this.addChild(firstFontBit);
			
		let starX =60;
		let starY =firstBg.y+160;
		let payflag = Api.shopVoApi.getPayFlag();
		
		this._container = new BaseDisplayObjectContainer();
		this.addChild(this._container);

		let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickBtnHandler,this);
		getBtn.x = firstBg.x+180;
		getBtn.y = firstBg.y+200;
		this.addChild(getBtn);
		this._getBtn = getBtn;
		getBtn.visible =false;

		if(payflag==0)
		{	
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback2,this);
		
			for(var  i:number=0; i<rechargeArr.length; i++ )
			{
				
				let getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"",this.clickGetBtnHandler,this);
				var num= i%2;
				getBtn.setPosition(starX+(getBtn.width+40)*num,(getBtn.height+40)*Math.floor(i/2)+starY);
				let btnStr = LanguageManager.getlocal("firstRecharge"+(i+1),[rechargeArr[i]+""]);	
				getBtn.setText(btnStr,false)
				// this.addChild(getBtn);
				this._container.addChild(getBtn);

				let rechargeDes:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				rechargeDes.text =LanguageManager.getlocal("firstRechargeDes1",[rechargeArr[i]*40+""]);
				rechargeDes.x = getBtn.x+20;
				rechargeDes.y = getBtn.y+getBtn.height+5;
				this._container.addChild(rechargeDes);
				// this.addChild(rechargeDes);
			}

			let firstDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeDes"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
			firstDes.x = firstBg.x+40;
			firstDes.y = firstBg.y+firstBg.height -30;
			// this.addChild(firstDes);
			this._container.addChild(firstDes);
		} 

		else if(payflag == 1)
		{
			getBtn.visible =true;
		}
		else
		{
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = firstBg.x+180; 
			hasGetSp.y = firstBg.y+200;
			this.addChild(hasGetSp);
		}

	}
	private useCallback2(evt:egret.Event):void
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 1)
		{
			if(this._container)
			{
				this._container.visible = false;
			}
			if(this._getBtn)
			{
				this._getBtn.visible =true; 
			} 
		}
	}

	private clickGetBtnHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}

	private useCallback(event:egret.Event=null):void
	{ 
		
		let payflag = Api.shopVoApi.getPayFlag(); 
		if(payflag == 2 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);

			let rewardList = Config.FirstchargeCfg.getRewardItemVoList();
			if(rewardList)
			{
				let globalPt:egret.Point = this.localToGlobal(this._getBtn.x,this._getBtn.y - 40);
				let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
				App.CommonUtil.playRewardFlyAction(rewardList,runPos);
			}
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		}
		else if(payflag == 1 && this._getBtn)
		{
			this._getBtn.setText("taskCollect");
		}
		
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["itemeffect"]);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD),this.useCallback,this);
		this._getBtn = null;
		this._container =null;
		super.dispose();
	}
}
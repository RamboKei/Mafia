class WelfareViewMonthCard extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _scrollContiner:BaseDisplayObjectContainer=undefined;
	private _descTF:BaseTextField = null;

	private _offsetY:number = 0;
	/** 最近一次点击购买钻石的时间（防止连点） */
	private _lastClickBuyTime:number = 0;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		this._offsetY = this.bottomBg.y+20;
		this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, GameConfig.stageHeigth - (this.bottomBg.y + 78) - 30);
		}
		else
		{
			rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, this.bottomBg.height - 40);
		}
		

		let scrollView:ScrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this.addChild(scrollView);
		
		let line1 = BaseBitmap.create("public_line3");
		line1.width = this.bottomBg.width - 100;
		line1.x = this.bottomBg.width/2 - line1.width/2;
		line1.y = this.bottomBg.y+ 45 - this._offsetY;
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			this._scrollContiner.addChild(line1);
		}
		
		
		let cardNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("monthCard"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		cardNameTF.x = line1.x + line1.width/2 - cardNameTF.width/2;
		cardNameTF.y = line1.y + line1.height/2 - cardNameTF.height/2;
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			this._scrollContiner.addChild(cardNameTF);
		}

		let iconSp = BaseBitmap.create("monthcard_bigicon");
		iconSp.x = this.bottomBg.width/2 - iconSp.width/2;
		iconSp.y = this.bottomBg.y+ 90  - this._offsetY;
		this._scrollContiner.addChild(iconSp);
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			iconSp.setRes("monthcard_bigicon2");
			iconSp.setPosition(this.bottomBg.width/2 - iconSp.width/2,this.bottomBg.y + 100  - this._offsetY);
		}

		

		//描述
		let carddescriptiondeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("carddescription"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		carddescriptiondeTxt.x = iconSp.x -34;  //10  315
		carddescriptiondeTxt.y = iconSp.y-109 + this._offsetY;
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			this.addChild(carddescriptiondeTxt);
		}

		if(PlatformManager.checkIsIOSShenheSp()&&PlatformManager.checkIsTWBSp())
		{
			cardNameTF.visible = false;
			carddescriptiondeTxt.visible = false;
		}

		let descSp = BaseBitmap.create((App.DeviceUtil.isWXgame())?"monthcard_desc_2":"monthcard_desc");
		descSp.x = this.bottomBg.width/2 - descSp.width/2;
		descSp.y = iconSp.y + iconSp.height + 10;
		this._scrollContiner.addChild(descSp);
		let descSp2:BaseBitmap = null;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			descSp.setRes("monthcard_desc1");
			descSp.setPosition(this.bottomBg.x + 47, iconSp.y + iconSp.height + 20);
			
			descSp2 = BaseBitmap.create("monthcard_desc2")
			descSp2.setPosition(descSp.x, descSp.y + descSp.height + 14);
			this._scrollContiner.addChild(descSp2);
		}

		let jumpSp:BaseBitmap = null;
		if (Api.switchVoApi.checkJumpBattle()) 
		{	
			descSp.y = iconSp.y + iconSp.height;
			jumpSp = BaseBitmap.create("unlock_challenge_skip");
			jumpSp.x = this.bottomBg.width/2 - jumpSp.width/2;
			jumpSp.y = descSp.y + descSp.height;
			this._scrollContiner.addChild(jumpSp);	
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				descSp.setPosition(this.bottomBg.x + 47, iconSp.y + iconSp.height + 20);
				jumpSp.setRes("unlock_challenge_skip_2")
				jumpSp.setPosition(descSp2.x,descSp2.y + descSp2.height +14);
			}
		}

		let practice:BaseBitmap = null;
		//修身显示
		if(Api.practiceVoApi.isPracticeOPen())
		{
			practice = BaseBitmap.create("unlock_practice");
			practice.x = this.bottomBg.width/2 - practice.width/2;
			practice.y = descSp.y + descSp.height+30;
			this._scrollContiner.addChild(practice);	
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				practice.setRes("monthcard_desc4")
				practice.setPosition(jumpSp.x,jumpSp.y + jumpSp.height +14);
			}
		}


		let isBuy = Api.shopVoApi.ifBuyMonthCard();
		if(isBuy == true)
		{
			let hasGetSp = BaseBitmap.create("welfare_hasbuy");
			hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2;
			hasGetSp.y = descSp.y + descSp.height + 45 - hasGetSp.height/2;
			this._scrollContiner.addChild(hasGetSp);
			if(Api.practiceVoApi.isPracticeOPen())
			{
				hasGetSp.y = descSp.y + descSp.height + 75 - hasGetSp.height/2;
			}
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 160 - this._offsetY;
				this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW2);
				this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 -this._descTF.width/2,hasGetSp.y + hasGetSp.height + 4);
				this._scrollContiner.addChild(this._descTF);
			}
			
			this.showText();
		}
		else
		{

			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
			if(rechargeItemCfg)
			{
				App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()?"recharge_bigbtn":ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler,this);
				goToRechargeBtn.x = this.bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = descSp.y + descSp.height + 45 - goToRechargeBtn.height/2 ;
				if (Api.switchVoApi.checkJumpBattle()) 
				{	
					goToRechargeBtn.y = descSp.y + descSp.height + 65 - goToRechargeBtn.height/2 ;
				}
				if(Api.practiceVoApi.isPracticeOPen())
				{
					goToRechargeBtn.y = descSp.y + descSp.height + 95 - goToRechargeBtn.height/2 

				}
				if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
				{
					goToRechargeBtn.y = GameConfig.stageHeigth - goToRechargeBtn.height - 160 - this._offsetY;
				}
				goToRechargeBtn.setText(App.CommonUtil.getMoneyString(rechargeItemCfg.cost),false);
				this._scrollContiner.addChild(goToRechargeBtn);
				this._goToRechargeBtn = goToRechargeBtn;
				if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
				{
					this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW2);
					this._descTF.setPosition(this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 -this._descTF.width/2,this._goToRechargeBtn.y + this._goToRechargeBtn.height + 4);
					this._scrollContiner.addChild(this._descTF);
				}
			}
		}

		if (PlatformManager.checkIsTWMCSp() == true)
		{
			let buyCardExplain:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("twBuyCardExplain"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			buyCardExplain.width = 360;
			buyCardExplain.height = 250;
			buyCardExplain.x = this.bottomBg.width/2 - buyCardExplain.width/2;
			buyCardExplain.y = descSp.y+220;
			buyCardExplain.lineSpacing = 5;
			this._scrollContiner.addChild(buyCardExplain);

		}
		this._scrollContiner.height += 50;
	}
	public showText():void
	{
		//月卡有效期
		let str =App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(),6);
		let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		cardTimedeTxt.x = 240;
		cardTimedeTxt.y = 960- 130  - this._offsetY;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			cardTimedeTxt.y = GameConfig.stageHeigth - 110  - this._offsetY;
		}
		this._scrollContiner.addChild(cardTimedeTxt);
	}

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.ifBuyMonthCard();
		if(isBuy)
		{
			 this.showText();
			this._goToRechargeBtn.visible = false;
			let hasGetSp = BaseBitmap.create("welfare_hasbuy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height/2 - hasGetSp.height/2;
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 160 - this._offsetY;
				this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 -this._descTF.width/2,hasGetSp.y + hasGetSp.height + 4);
			}
			this._scrollContiner.addChild(hasGetSp);

			App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		}
	}

	private goToRechargeHandler():void
	{
		if ((! this._lastClickBuyTime) || (new Date().getTime() - this._lastClickBuyTime > 5000)) {
			this._lastClickBuyTime = new Date().getTime();
			PlatformManager.pay("g7");
		}
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
	}

	protected getResourceList():string[]
	{
		let arr:string[] = [];
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			arr.push("monthcard_desc1");
			arr.push("monthcard_desc2");
			arr.push("monthcard_desc4");
			arr.push("unlock_challenge_skip_2");
			arr.push("monthcard_bigicon2");
			arr.push("recharge_bigbtn");
			arr.push("recharge_bigbtn_down");
		}
		if (App.DeviceUtil.isWXgame()) {
			return super.getResourceList().concat([
					"monthcard_desc_2",
					"monthcard_desc1",
					"monthcard_desc2",
					"monthcard_desc4",
					"unlock_challenge_skip_2"
					]).concat(arr);
		} else {

						
			return super.getResourceList().concat([
					"monthcard_desc_2",
					"monthcard_bigicon",
					"unlock_challenge_skip",
					"unlock_practice",

					]).concat(arr);
		}
		
		
	}
	protected getResPreName():string
	{
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			return "monthcard_2";
		}
		else
		{
			return "monthcard"
		}
		
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		this._goToRechargeBtn = null;
		this._scrollContiner = undefined;
		this._offsetY = 0;
		this._lastClickBuyTime = 0;
		this._descTF = null;
		super.dispose();
	}
}
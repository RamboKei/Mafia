class WelfareViewYearCard extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _scrollContiner:BaseDisplayObjectContainer=undefined;

	private _openDialogDiscountEnabled = false;
	private _offsetY:number = 0;

	/** 最近一次点击购买钻石的时间（防止连点） */
	private _lastClickBuyTime:number = 0;


	private _descTF:BaseTextField = null;
	private _oldPriceText:BaseTextField = null;
	private _acTimeTF:BaseTextField = null;
	private _lineShape:egret.Shape = null;
	
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
			rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, GameConfig.stageHeigth - (this.bottomBg.y + 78));
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
		
		let cardNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("yearCard"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		cardNameTF.x = line1.x + line1.width/2 - cardNameTF.width/2;
		cardNameTF.y = line1.y + line1.height/2 - cardNameTF.height/2;
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			this._scrollContiner.addChild(cardNameTF);
		}

		let iconSp = BaseBitmap.create("yearcard_bigicon");
		iconSp.x = this.bottomBg.width/2 - iconSp.width/2;
		iconSp.y = this.bottomBg.y+ 90 - this._offsetY;
		this._scrollContiner.addChild(iconSp);
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			iconSp.setRes("yearcard_bigicon2");
			iconSp.setPosition(this.bottomBg.x - 14,this.bottomBg.y + 78 -  iconSp.height / 2 - this._offsetY);
		}
		
		//描述
		let carddescriptiondeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("lifecarddes"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
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
		let rewardsp:BaseBitmap = null;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			rewardsp = BaseBitmap.create("yearcard_reward");
			rewardsp.setPosition(this.bottomBg.x + 14,iconSp.y + iconSp.height + 4);
			this._scrollContiner.addChild(rewardsp);

			let rewardName1 = ComponentManager.getTextField(LanguageManager.getlocal("servant_name1034"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
			rewardName1.setPosition(rewardsp.x + rewardsp.width - rewardName1.width / 2 - 180,rewardsp.y + rewardsp.height - rewardName1.height - 10);
			this._scrollContiner.addChild(rewardName1);

			let rewardName2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_303"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
			rewardName2.setPosition(rewardsp.x + rewardsp.width - 65 - rewardName2.width / 2,rewardsp.y + rewardsp.height - rewardName2.height - 10);
			this._scrollContiner.addChild(rewardName2);
		}

		let yearcard_desc = "yearcard_desc";
		// 折扣活动
		if ((Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) || PlatformManager.checkIsSfSp()) {
			yearcard_desc = "yearcard_desc2";
		} else if (App.DeviceUtil.isWXgame()) {
			yearcard_desc = "yearcard_desc4";
		}
		let descSp = BaseBitmap.create(yearcard_desc);
		descSp.x = this.bottomBg.width/2 - descSp.width/2;
		descSp.y = iconSp.y + iconSp.height + 10;
		this._scrollContiner.addChild(descSp);

		let descSp2:BaseBitmap = null;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			descSp.setRes("yearcard_desc_1");
			descSp.setPosition(rewardsp.x,rewardsp.y + rewardsp.height + 9);

			descSp2 = BaseBitmap.create("yearcard_desc_2");
			descSp2.setPosition(descSp.x,descSp.y + descSp.height + 7)
			this._scrollContiner.addChild(descSp2);
		}
		let jumpSp:BaseBitmap = null;
		if (Api.switchVoApi.checkJumpBattle()) 
		{	
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				jumpSp = BaseBitmap.create("unlock_challenge_skip_2");
				jumpSp.setPosition(descSp2.x,descSp2.y + descSp2.height + 7);
			}
			else
			{
				descSp.y = iconSp.y + iconSp.height;
				jumpSp = BaseBitmap.create("unlock_challenge_skip");
				jumpSp.x = this.bottomBg.width/2 - jumpSp.width/2;
				jumpSp.y = descSp.y + descSp.height ;
			}

			this._scrollContiner.addChild(jumpSp);	
		}

			//修身显示
		let practice:BaseBitmap = null ;
		if(Api.practiceVoApi.isPracticeOPen())
		{
			practice = BaseBitmap.create("yearcard_desc3");
			practice.x = this.bottomBg.width/2 - practice.width/2;
			practice.y = descSp.y + descSp.height+30;
			this._scrollContiner.addChild(practice);
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				practice.setRes("yearcard_desc_4");
				practice.setPosition(jumpSp.x,jumpSp.y + jumpSp.height + 7);
			}
		}


		let isBuy = Api.shopVoApi.ifBuyYearCard();
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
				this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW2);
				this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 -this._descTF.width/2,hasGetSp.y + hasGetSp.height + 4);
				this._scrollContiner.addChild(this._descTF);
			}
			this.showText();
		
		}
		else
		{
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
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
				goToRechargeBtn.setText(App.CommonUtil.getMoneyString(rechargeItemCfg.cost),false);
				this._scrollContiner.addChild(goToRechargeBtn);
				this._goToRechargeBtn = goToRechargeBtn;

				if(Api.practiceVoApi.isPracticeOPen())
				{
					goToRechargeBtn.y = descSp.y + descSp.height + 95 - goToRechargeBtn.height/2 
				}
				if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
				{
					goToRechargeBtn.y = GameConfig.stageHeigth - goToRechargeBtn.height - 160 - this._offsetY;
					this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW2);
					this._descTF.setPosition(this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 -this._descTF.width/2,this._goToRechargeBtn.y + this._goToRechargeBtn.height + 4);
					this._scrollContiner.addChild(this._descTF);
				}
				// 折扣活动
				if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() || (Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart)) {
					if((!Api.acVoApi.getActivityVoByAidAndCode("discount","2"))&& (!App.DeviceUtil.isWXgame())&&(!PlatformManager.checkIsLocal()))
					{
						return;
					}
					let oldPriceText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_oldPrice", [LanguageManager.getlocal("anyMoney",[rechargeItemCfg.cost.toString()])]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
					oldPriceText.x = goToRechargeBtn.x - oldPriceText.width - 10;
					oldPriceText.y = goToRechargeBtn.y + goToRechargeBtn.height/2 - oldPriceText.height/2;
					this._scrollContiner.addChild(oldPriceText);
					
					if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
					{	
						if(App.DeviceUtil.isWXgame()|| PlatformManager.checkIsLocal())
						{
							oldPriceText.text = LanguageManager.getlocal("acDiscount_oldPrice",[LanguageManager.getlocal("anyMoney",["288"])]);
						}
						if((Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart))
						{
							oldPriceText.setPosition(this.bottomBg.x + this.bottomBg.width - oldPriceText.width - 91,this._goToRechargeBtn.y - oldPriceText.height - 7);
							let timeStr =App.DateUtil.getFormatBySecond( Api.acVoApi.getActivityVoByAidAndCode("discount","2").et - GameData.serverTime,1);
							this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearTime",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
							this._acTimeTF.setPosition(this.bottomBg.x +  91,this._goToRechargeBtn.y - this._acTimeTF.height - 7)
							this._scrollContiner.addChild(this._acTimeTF);
							this.tick();

						}
						else
						{
							oldPriceText.setPosition(this.bottomBg.x + this.bottomBg.width / 2 - oldPriceText.width / 2,this._goToRechargeBtn.y - oldPriceText.height - 7);
						}

						oldPriceText.setColor(TextFieldConst.COLOR_WARN_RED2);


					}
					
					// 划线
					var lineShape:egret.Shape = new egret.Shape();  
					lineShape.graphics.lineStyle(2, 0xff0000, 1);
					lineShape.graphics.moveTo(0, 0);    //将画笔移动到起点位置
					lineShape.graphics.lineTo(oldPriceText.width, 0);   //从起点位置划线到终点
					lineShape.graphics.endFill();
					lineShape.x = oldPriceText.x;
					lineShape.y = oldPriceText.y + 10;
					this._scrollContiner.addChild(lineShape);					
					this._oldPriceText = oldPriceText;
					this._lineShape = lineShape;

					let rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g11");
					if(rechargeItemCurrentCfg) {
						if((Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart))
						{
							this._goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney",[rechargeItemCurrentCfg.cost.toString()]),false);
						}
					}
				}
			}
		}
		// 折扣活动
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			this._openDialogDiscountEnabled = true;
		} else {
			this._openDialogDiscountEnabled = false;
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

	public tick(): void {
		let needRefresh = false;
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			if (!this._openDialogDiscountEnabled) {
				needRefresh = true;
			}
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&this._acTimeTF != null)
			{
				let timeStr =App.DateUtil.getFormatBySecond( Api.acVoApi.getActivityVoByAidAndCode("discount","2").et - GameData.serverTime,1);
				this._acTimeTF.text = LanguageManager.getlocal("newYearTime",[timeStr]);

			}
		} else {
				if(this._acTimeTF!=null)
				{
					this._acTimeTF.setVisible(false);
				}
				if(this._oldPriceText!=null)
				{
					 if(App.DeviceUtil.isWXgame() == false && PlatformManager.checkIsLocal() == false)
					 {
						 this._oldPriceText.setVisible(false);
					 }
					
				}
				if(this._lineShape!=null)
				{
					if(App.DeviceUtil.isWXgame() == false && PlatformManager.checkIsLocal() == false)
					{
						this._lineShape.visible = false;
					}
				}
			if (this._openDialogDiscountEnabled) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEndViewRefreshed"));
				needRefresh = true;
			}
		}
		if(!Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			if (needRefresh) {
			// 刷新界面
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW);	
		}
		}
		
	}
	public showText():void
	{
		//年卡有效期
		let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("lifecarTimeddes"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		cardTimedeTxt.x = 250;
		cardTimedeTxt.y = 960-130 - this._offsetY;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			cardTimedeTxt.y = GameConfig.stageHeigth - 110  - this._offsetY;
		}
		this._scrollContiner.addChild(cardTimedeTxt);
	}

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.ifBuyYearCard();
		if(isBuy)
		{
			this.showText();
			this._goToRechargeBtn.visible = false;
			let hasGetSp = BaseBitmap.create("welfare_hasbuy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height/2 - hasGetSp.height/2;
			this._scrollContiner.addChild(hasGetSp);
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 160 - this._offsetY;
				this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 -this._descTF.width/2,hasGetSp.y + hasGetSp.height + 4);
				if(this._acTimeTF!=null)
				{
					this._acTimeTF.setVisible(false);
				}
				if(this._oldPriceText!=null)
				{
					this._oldPriceText.setVisible(false);
				}
				if(this._lineShape!=null)
				{
					this._lineShape.visible = false;
				}
			}
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
			App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("yearCard")]));
		}
	}


	private goToRechargeHandler():void
	{
		if ((! this._lastClickBuyTime) || (new Date().getTime() - this._lastClickBuyTime > 5000)) {
			this._lastClickBuyTime = new Date().getTime();
			if (this._openDialogDiscountEnabled) {
				PlatformManager.pay("g11");
			} else {
				PlatformManager.pay("g8");
			}
		}
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
	}

	protected getResourceList():string[]
	{
		let arr:string[] = [];
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			arr.push("yearcard_desc_1");
			arr.push("yearcard_desc_2");
			arr.push("yearcard_desc_4");
			arr.push("unlock_challenge_skip_2");
			arr.push("yearcard_bigicon2");
			arr.push("recharge_bigbtn");
			arr.push("recharge_bigbtn_down");
			arr.push("yearcard_reward");
		}
		if ((Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) || PlatformManager.checkIsSfSp()) {
			return super.getResourceList().concat([
						"yearcard_desc2",
						"yearcard_desc3",
						"yearcard_bigicon",
						"unlock_challenge_skip",
						]).concat(arr);
		} else {
			if (App.DeviceUtil.isWXgame()) {
				return super.getResourceList().concat([
						"yearcard_desc4",
						"yearcard_desc3",
						"yearcard_bigicon",
						"unlock_challenge_skip",
						
						]).concat(arr);
			} else {
				return super.getResourceList().concat([
						"yearcard_desc2",
						"yearcard_desc3",
						"yearcard_bigicon",
						"unlock_challenge_skip",
						]).concat(arr);
			}
		}
	}
	protected getResPreName():string
	{
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			return "yearcard_2";
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
		this._offsetY = 0;

		this._lastClickBuyTime = 0;

		this._descTF = null;
		this._oldPriceText = null;
	 	this._acTimeTF = null;
	 	this._lineShape = null;
		super.dispose();
	}
}
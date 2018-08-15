/**
 * 惩戒女囚
 * author dky
 * date 2017/11/20
 * @class AcPunishView
 */
class AcPunishView extends AcCommonView {


	private _scrollList: ScrollList;
	private _shopInfoVoList: any;
	private _punishItemVoList: any = {};
	private _punishItemList: any[];

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _score1Text: BaseTextField = null;
	private _score2Text: BaseTextField = null;
	private _openTxt: BaseTextField;


	private _progressBar: ProgressBar;
	private _levelTxt: BaseTextField;

	private _acData :any;
	private _acVo:AcPunishVo;

	private _selectBg:BaseBitmap;
	private _selectItem:BaseDisplayObjectContainer;
	private _boxContainer:BaseDisplayObjectContainer;
	private _lightSp:BaseBitmap;
	private _boxDesc:BaseTextField;
	private _boxSp:BaseBitmap;
	private _chooseBtn:BaseButton;
	private _bodyContainer:BaseDisplayObjectContainer;
	private _headPic:BaseBitmap;
	private _chooseAllBtn:BaseButton;

	private _selectIndex = -1;
	// let tmpVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("dailyCharge","1");
	private _lastTime = 0;//刷新时间
	private _touchSwitch = true;
	private _tw:egret.Tween;

	private _wordsContanier:BaseDisplayObjectContainer;
	private _wordsTF:BaseTextField;
	public constructor() {
		super();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		
			"forpeople_top","punish_box_close","punish_box_open",
			"wifeview_bottombg","acpunish","taoxinani",
			"punish_rank_icon","punish_body","punish_head1","punish_head2",
			"punish_body2","punish_head2_1","punish_head2_2",
			"punish_light","punish_ani1","punish_ani2","punish_ani3","punish_ani4",
			"punish_rank_name","punish_bigbg",
			"btn_buy_tool_down","btn_buy_tool","btn_buy_tool2_down","btn_buy_tool2",
			"progress8","punish_buyitem",
			"progress3_bg","itemeffect",
			"punish_bigbg2","punish_ani41","punish_ani42",
			"punish_bigbg4","punish_nian","punish_nian1",
			"punish_bigbg5","punish_ani51","punish_ani52","punish_ani53","punish_ani54","punish_boss","punish_boss1",
			"punish_ani5_hit","punish_ani51_0","punish_ani52_0","punish_ani53_0","punish_ani54_0",
		]);
	}

	protected initView(): void {

		this._lastTime = App.DateUtil.getWeeTs(GameData.serverTime);
		this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);
		let maskSp = BaseBitmap.create("commonview_bg1");
		maskSp.width = GameConfig.stageWidth;
		maskSp.height = 180;
		// maskSp.y = 180;
		this.addChildToContainer(maskSp);
		

		this._punishItemList = new Array<any>();


		this.showText();
		this.showList();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM,this.buyCallback,this);
		//初始化 时间
		// let deltaT = this.acVo.et - GameData.serverTime;
		// if (this._acCDTxt && deltaT > 0) {
		// 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		// } else {
		// 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		// }
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._acCDTxt.text = LanguageManager.getlocal("acPunishTime",[cfg.activeTime[0],cfg.activeTime[1]]);
		this._acCDTxt.x = 10;
		this._activityTimerText.x = 10;

		this.refreshState();
		this.runText();
		
		this.checkState();
	}

	 /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE,requestData:{activeId:this.acVo.aidAndCode}};
	}

	private showText(): void {
		

		//背景图片
		let bgres = "punish_bigbg";
		if (this.code == "2")
		{
			bgres = "punish_bigbg2";
		}
		else if(this.code == "4")
		{
			bgres = "punish_bigbg4";
		}
		else if(this.code == "5")
		{
			bgres = "punish_bigbg5";
		}
		let bigBg: BaseBitmap = BaseBitmap.create(bgres);
		// this.addChildToContainer(bigBg);
		this.container.addChildAt(bigBg,0);
		bigBg.y = 20;
		
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = 20;
		
		//女囚
		if (this.code == "1"){
			this._bodyContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._bodyContainer);
			let bodyPic: BaseBitmap = BaseBitmap.create("punish_body2")
			this._bodyContainer.addChild(bodyPic);;
			bodyPic.y = 0;
			this._headPic = BaseBitmap.create("punish_head2_1");
			this._headPic.y = 45;
			this._headPic.x = 36;
			this._bodyContainer.addChild(this._headPic);
			this._bodyContainer.x = GameConfig.stageWidth/2 - this._bodyContainer.width/2;
			this._bodyContainer.y = 230;
		}
		else if (this.code == "3"){
			this._bodyContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._bodyContainer);
			let bodyPic: BaseBitmap = BaseBitmap.create("punish_body")
			this._bodyContainer.addChild(bodyPic);;
			bodyPic.y = 0;
			this._headPic = BaseBitmap.create("punish_head1");
			this._headPic.y = 45;
			this._headPic.x = 36;
			this._bodyContainer.addChild(this._headPic);
			this._bodyContainer.x = GameConfig.stageWidth/2 - this._bodyContainer.width/2;
			this._bodyContainer.y = 230;
		}
		else if (this.code == "4"){
			this._bodyContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._bodyContainer);
			// let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
			// this._bodyContainer.addChild(bodyPic);;
			// bodyPic.y = 0;
			this._headPic = BaseBitmap.create("punish_nian");
			// this._headPic.y = 45;
			// this._headPic.x = 36;
			this._bodyContainer.addChild(this._headPic);
			this._bodyContainer.x = GameConfig.stageWidth/2 - this._bodyContainer.width/2;
			this._bodyContainer.y = 230;
		}
		else if (this.code == "5"){
			this._bodyContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this._bodyContainer);
			// let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
			// this._bodyContainer.addChild(bodyPic);;
			// bodyPic.y = 0;
			this._headPic = BaseBitmap.create("punish_boss");
			// this._headPic.y = 45;
			// this._headPic.x = 36;
			this._bodyContainer.addChild(this._headPic);
			this._bodyContainer.x = 0;
			this._bodyContainer.y = 290;
		}

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 30
		this._activityTimerText.y = 109;
		let stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
		// let day = 
		let etTxt = App.DateUtil.getFormatBySecond(this.acVo.et-86400, 7);
		// this._activityTimerText.text = LanguageManager.getlocal("acPunishDate", [stTxt, etTxt]);
		this._activityTimerText.text = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + 33;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//积分背景
		let scoreBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		scoreBg.width = 190;
		scoreBg.height = 63;
		scoreBg.x = 440;
		scoreBg.y = 100;
		this.addChildToContainer(scoreBg);


		let score1Str = LanguageManager.getlocal("acPunishScore2",[this._acVo.v.toString()]);
		this._score1Text = ComponentManager.getTextField(score1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._score1Text.x = scoreBg.x + 20;
		this._score1Text.y = scoreBg.y + 7;
		this.addChildToContainer(this._score1Text);

		let score2Str = LanguageManager.getlocal("acPunishScore1",[this._acVo.score.toString()]);
		this._score2Text = ComponentManager.getTextField(score2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._score2Text.x = this._score1Text.x;
		this._score2Text.y = this._score1Text.y + this._score1Text.height + 8;
		this.addChildToContainer(this._score2Text);

		//跑马灯背景
		let topBg:BaseBitmap = BaseBitmap.create("public_ac_notice_bg");
		topBg.width = GameConfig.stageWidth;
		// topBg.height = 96;
		topBg.x = 0;
		topBg.y = 185;
		this.addChildToContainer(topBg);

	
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);


		//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("wifeview_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = 96;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		this.addChildToContainer(bottomBg);

		if(this.code == "5")
		{
			bigBg.y = bottomBg.y + bottomBg.height - bigBg.height;
		}

		if(!Api.switchVoApi.checkOpenShenhe())
		{
			let rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acPunishRankRewardPopupViewTitle",this.rankRewardBtnCilck,this);
			rewardBtn.x = 85;
			rewardBtn.y = bottomBg.y + bottomBg.height/2 - rewardBtn.height/2;
			this.addChildToContainer(rewardBtn);
			rewardBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		
		

		let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"dinnerExchangePopupViewTitle",this.exchangeCilck,this);
		exchangeBtn.x = 390;
		exchangeBtn.y =  bottomBg.y + bottomBg.height/2 - 30;//rewardBtn.y;
		this.addChildToContainer(exchangeBtn);
		exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);

		if(this.code == "3")
		{
			let buyBtn = ComponentManager.getButton("btn_buy_tool2","",this.butItemBtnCilck,this);
			buyBtn.x = 0;
			buyBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 120;
			this.addChildToContainer(buyBtn);
		}
		else{
			let buyBtn = ComponentManager.getButton("btn_buy_tool","",this.butItemBtnCilck,this);
			buyBtn.x = 0;
			buyBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 120;
			this.addChildToContainer(buyBtn);
		}
	

		

		let buyBB:BaseBitmap = BaseBitmap.create("punish_buyitem");
		buyBB.x = 80;
		buyBB.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 30;
		buyBB.anchorOffsetX = buyBB.width/2;
		buyBB.anchorOffsetY = buyBB.height/2;
		this.addChildToContainer(buyBB);

		this._tw = egret.Tween.get(buyBB,{loop:true});
		
		this._tw.to({scaleX:1.15,scaleY:1.15},700)
		.to({scaleX:1,scaleY:1},700)
		// .to({y:-80,alpha:0.5},1500)
		// .call(this.onComplete,this);

		if(!Api.switchVoApi.checkOpenShenhe())
		{
			let rankBtnBg:BaseBitmap = BaseBitmap.create("mainui_bottombtnbg");
			rankBtnBg.x = GameConfig.stageWidth - rankBtnBg.width - 20;
			rankBtnBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 80;
			this.addChildToContainer(rankBtnBg);

			let rankBtn:BaseBitmap = BaseBitmap.create("punish_rank_icon");

			rankBtn.x = rankBtnBg.x + rankBtnBg.width/2 - rankBtn.width/2;
			rankBtn.y = rankBtnBg.y + 5;
			this.addChildToContainer(rankBtn);

			let rankIcon:BaseBitmap = BaseBitmap.create("punish_rank_name");
			rankIcon.x = rankBtnBg.x + rankBtnBg.width/2 - rankIcon.width/2;
			rankIcon.y = rankBtn.y + 50;
			rankBtn.addTouchTap(this.rankCilck, this);
		
			this.addChildToContainer(rankIcon);

		}

	

		//是否打死或者活动结束
		// if(this._acData.hp <= 0)

		this._progressBar = ComponentManager.getProgressBar("progress8", "progress3_bg", 562);
		this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2;
		this._progressBar.y = topBg.y + topBg.height + 30;
		this.addChildToContainer(this._progressBar);

		let lvStr = "";
		if(this.code == "2")
		{
			lvStr = (100- this._acData.hp/cfg.Hp*100).toFixed(3);
			this._progressBar.setPercentage( 1 - this._acData.hp/cfg.Hp)
		}else {
			lvStr = Math.floor(this._acData.hp/cfg.Hp*100).toString();
			this._progressBar.setPercentage(this._acData.hp/cfg.Hp)
		}

		this._levelTxt = ComponentManager.getTextField(lvStr  + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
		this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2;
		this.addChildToContainer(this._levelTxt);

		let btnKey = "acPunishBtn";
		if(this.code == "2")
		{
			 btnKey = "useBtn";
		}
		else if(this.code == "3"){
			btnKey = "acPunishBtn2";
		}
		else if(this.code == "4"){
			btnKey = "acPunishBtn3";
		}
		else if(this.code == "5"){
			btnKey = "acPunishBtn5";
		}
		this._chooseBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED,btnKey,this.chooseBtnClick,this);
		this._chooseBtn.x = this.width/2 - this._chooseBtn.width/2;
		this._chooseBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 100;
		this._chooseBtn.visible = false;
		this.addChildToContainer(this._chooseBtn);
		this._chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		//增加一键按钮
		this._chooseAllBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED,`acPunishAllBtn${this.code}`,this.chooseAllBtnClick,this);
		this._chooseAllBtn.x = this.width/2 + 10;
		this._chooseAllBtn.y = this._chooseBtn.y;
		this._chooseAllBtn.visible = false;
		this.addChildToContainer(this._chooseAllBtn);
		this._chooseAllBtn.setColor(TextFieldConst.COLOR_BLACK);
		

		let openStr = LanguageManager.getlocal("acPunishOpenTime",["00:00:00"])
		this._openTxt = ComponentManager.getTextField(openStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._openTxt.x = GameConfig.stageWidth/2 - this._openTxt.width/2;
		this._openTxt.y = 350;
		this.addChildToContainer(this._openTxt);

		this._boxContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._boxContainer);
		this._lightSp = BaseBitmap.create("public_rotatelight");
		this._lightSp.scaleX = 1.5;
		this._lightSp.scaleY = 1.5;
		this._lightSp.anchorOffsetX = this._lightSp.width/2;
		this._lightSp.anchorOffsetY = this._lightSp.height/2;
		this._lightSp.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );
		egret.Tween.get(this._lightSp,{loop:true})
			.to({rotation: 360}, 3000)
		this._boxContainer.addChild(this._lightSp);

		this._boxSp = BaseBitmap.create("punish_box_close");
		this._boxSp.x = GameConfig.stageWidth/2 - this._boxSp.width/2;
		this._boxSp.y = GameConfig.stageHeigth/2 - this._boxSp.height/2;
		this._boxContainer.addChild(this._boxSp);
		this._boxSp.addTouchTap(this.getBoxClick,this);
		
		let descBg = BaseBitmap.create("public_searchdescbg");
		descBg.x = GameConfig.stageWidth/2 - descBg.width/2;
		descBg.y = this._boxSp.y + this._boxSp.height + 50;
		this._boxContainer.addChild(descBg);


		this._boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBoxDesc-"+this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._boxDesc.x = GameConfig.stageWidth/2 - this._boxDesc.width/2;
		this._boxDesc.y = descBg.y + descBg.height/2 - this._boxDesc.height/2;
		this._boxContainer.addChild(this._boxDesc);
		
		this.tick();


		this._wordsContanier = new BaseDisplayObjectContainer();
		this._wordsContanier.x = 50;
		this._wordsContanier.y = 300;
		this.addChildToContainer(this._wordsContanier);
		let wordsBg = BaseBitmap.create("public_9_bg25");
		// wordsBg.visible = false;
		wordsBg.x = 0;
		wordsBg.y = 0;
		wordsBg.width = 200;
		wordsBg.height = 78;
		this._wordsContanier.addChild(wordsBg);

		let wordsBgCor = BaseBitmap.create("public_9_bg25_tail");
		wordsBgCor.x = 150;
		wordsBgCor.y = wordsBg.y + wordsBg.height - 3;
		wordsBgCor.skewY = 180;
		this._wordsContanier.addChild(wordsBgCor);

		this._wordsTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip");
		this._wordsTF.x = wordsBg.x + 20;
		this._wordsTF.y = wordsBg.y + 20;
		this._wordsTF.width = 180;
		this._wordsTF.height = 80;
		this._wordsContanier.addChild(this._wordsTF);
		this._wordsContanier.visible = false;
		// //顶部背景图片
		// let test1: BaseBitmap = BaseBitmap.create("punish_1_3");
		// this.addChildToContainer(test1);
		// //顶部背景图片
		// let test2: BaseBitmap = BaseBitmap.create("punish_2_3");
		// this.addChildToContainer(test2);
		// //顶部背景图片
		// let test3: BaseBitmap = BaseBitmap.create("punish_3_3");
		// this.addChildToContainer(test3);
		// //顶部背景图片
		// let test4: BaseBitmap = BaseBitmap.create("punish_4_3");
		// this.addChildToContainer(test4);
	}

	//刷新活动状态
	private refreshState()
	{	
		let cfg : Config.AcCfg.PunishCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let startTime = this._acVo.st;
		let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
		let num = 0;
		for(let i in this._punishItemVoList){
			let data = this._punishItemVoList[i];
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
			num += hasNum;
		}
		if( GameData.serverTime - zeroTime < 3600*cfg.activeTime[0]){
			//活动未开始
			this._openTxt.visible = true;
			
			this.setBoxVisible(false);
			this.setBossVisible(false);
			this._chooseAllBtn.visible = false;
		}
		else
		{	
			this._openTxt.visible = false;
			//活动已经开始
			if(this._acData.hp <= 0){
				//被打死了
				this.setBoxVisible(true);
				this.setBossVisible(false);
				this._chooseAllBtn.visible = false;
				this._boxDesc.text = LanguageManager.getlocal("acPunishGetBoxDesc-"+this.code);
				this._boxDesc.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
				if(this._acVo.get){
					this._boxSp.texture = ResourceManager.getRes("punish_box_open");
					this._lightSp.visible = true;
				}else{
					this._boxSp.texture = ResourceManager.getRes("punish_box_close");
					this._lightSp.visible = false;
				}
			}
			else{
				let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
				if(GameData.serverTime - zeroTime > 3600*cfg.activeTime[1] || deltaT < 0){
				// if(GameData.serverTime - zeroTime > 1){
					//活动已经结束
					this.setBoxVisible(true);
					this.setBossVisible(false);
					this._chooseAllBtn.visible = false;
					this._boxDesc.text = LanguageManager.getlocal("acPunishBoxDesc-"+this.code);
					this._boxDesc.textColor = TextFieldConst.COLOR_WARN_RED;
					this._lightSp.visible = false;
					App.DisplayUtil.changeToGray(this._boxSp);
					if(deltaT < 0){
						this._openTxt.visible = false;
					}else{
						this._openTxt.visible = true;
					}
				}
				else{
					//没结束也没打死
					this.setBoxVisible(false);
					this.setBossVisible(true);
					if(num >= cfg.itemNum){
						this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width - 10;
						this._chooseAllBtn.visible = true;
					}
					else{
						this._chooseBtn.x = GameConfig.stageWidth/2 - this._chooseBtn.width/2;
						this._chooseAllBtn.visible = false;
					}
				}
			}
		}
		
	}

	private checkState()
	{	
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let startTime = this._acVo.st;
		let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
		
		if( GameData.serverTime - zeroTime < 3600*cfg.activeTime[0]){
			//活动未开始

		}
		else
		{	
			this._openTxt.visible = false;
			//活动已经开始
			if(this._acData.hp <= 0){
				//被打死了

			}
			else{
				let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
				if(GameData.serverTime - zeroTime > 3600*cfg.activeTime[1] || deltaT<0){
				// if(GameData.serverTime - zeroTime > 1){
					//活动已经结束
					
				}
				else{
					//没结束也没打死
					ViewController.getInstance().openView(ViewConst.BASE.ACPUNISHREPORTVIEW,{aid:this.aid,code:this.code});
				}
			}
			
		}
		
	}

	private getState():number
	{		
		let state = 0;
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let startTime = this._acVo.st;
		let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
		let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
		if( GameData.serverTime - zeroTime < 3600*cfg.activeTime[0] &&deltaT > 0){
			//活动未开始
			state = 1;
		}
		else
		{	
			this._openTxt.visible = false;
			//活动已经开始
			if(this._acData.hp <= 0){
				//被打死了
				state = 2;
			}
			else{
				let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
				if(GameData.serverTime - zeroTime > 3600*cfg.activeTime[1] || deltaT < 0){
				// if(GameData.serverTime - zeroTime > 1){
					//活动已经结束
					// this.setBoxVisible(true);
				
					if(deltaT < 0){
						state = 3
					}else{
						state = 4
					}
				}
				else{
					//没结束也没打死
					state = 5;
				}
			}
			
		}
		
		return state;
		// return 4;
		
	}
	//箱子相关
	private setBoxVisible(b:boolean){
		// this._openTxt.visible = true;
		this._boxContainer.visible = b;
		
	}
	//女囚相关
	private setBossVisible(b:boolean){
		this._levelTxt.visible = b;
		this._progressBar.visible = b;
		this._chooseBtn.visible = b;
		this._chooseAllBtn.visible = b;
		if(this._bodyContainer)
			this._bodyContainer.visible = b;
		for (var index = 0; index < this._punishItemList.length; index++) {
			var element = this._punishItemList[index];
			element.visible = b;
		}
	}

	//刷新选中状态
	private setSelect(index)
	{

		if(this._selectItem)
		{
			if(this._selectItem.getChildByName("select"))
			{
				this._selectItem.removeChild(this._selectItem.getChildByName("select"));
				let baseBitmap = <BaseBitmap>this._selectItem.getChildByName("select");
				baseBitmap = null;
				
			}
		}
		this._selectItem =  <BaseDisplayObjectContainer>this._punishItemList[index];
		// let bg2Index = this._selectItem.getChildIndex(this._selectItem.getChildByName("bg2"));
		
		let itemBg2:BaseBitmap = BaseBitmap.create("itembg_selected");
		itemBg2.width = 108;
		itemBg2.height = 104;
		// itemBg2.width = 500;
		// itemBg2.height = 50;
		itemBg2.x = 0;
		itemBg2.y = 0;
		itemBg2.name = "select";
		this._selectItem.addChild(itemBg2);

		this._selectIndex = index;

	}

	private chooseAllBtnClick(){
		if(!this._touchSwitch){
			return;
		}
		let num = 0;
		for(let i in this._punishItemVoList){
			let data = this._punishItemVoList[i];
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
			num += hasNum;
		}
		if(num <= 0){
			let rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"acPunishBuyTitle",
					msg:rewardStr,
					callback:this.doBuy,
					handler:this,
					needCancel:true
				});
				return ;
		}
		let cfg : Config.AcCfg.PunishCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(num >= cfg.itemNum){
			this._touchSwitch = false;
			let key = (this._selectIndex+1).toString();
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
			this.request(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH,{ activeId: "punish-"+this.code});
			this._touchSwitch = true;
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishAllRule", [`${cfg.itemNum}`,LanguageManager.getlocal(`acPunishAllBtn${this.code}`)]));
		}
	}

	private chooseAllBtnClickCallback(evt):void{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
		let data = evt.data;
		if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
					this.showRewards(data.data.data);
					// if(this.code == '1' || this.code == '3'){
					// 	this.showRewards(data.data.data);
					// }
				}
			}
			if(data.data.data.hasKill)
			{
				this._acData.hp = 0;
			}else{
				this._acData  = data.data.data.punishActive;
			}
			
			this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);
			this.buyCallback(null);
			this.refreshState();
			/**
			 * 飘起经验
			 */
			let strList = [];
			let scrore1 = data.data.data.score1;
			let flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1",[String(scrore1)]);
			strList.push({tipMessage:flyStr1});
			let scrore2 = data.data.data.score2;
			if(scrore2 > 0)
			{
				let flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2",[String(scrore2)]);
				strList.push({tipMessage:flyStr2} );
			}
			egret.setTimeout( ()=>{
				App.CommonUtil.playRewardFlyAction(strList);
			},this,800)
		}
	}

	private currIconArr = [];
	private showRewards(data:any):void
	{
			this.currIconArr=[];
			let contentList:Array<RewardItemVo> =GameData.formatRewardItem(data.rewards);
			for(var i:number =0;i<contentList.length;i++)
			{
				let icon = GameData.getItemIcon(contentList[i],true);
				icon.anchorOffsetX=icon.width/2;
				icon.anchorOffsetY=icon.height/2;
				icon.scaleX=0.5;
				icon.scaleY=0.5;
				icon.x= 300;
				icon.y= GameConfig.stageHeigth/2-70;
				this.addChild(icon);
				App.DisplayUtil.addFactorFunc(BaseDisplayObjectContainer);
			    let currX = App.MathUtil.getRandom(500);
				if(this.code == '1')
				{
					icon.y= GameConfig.stageHeigth-300;
					icon.x= 180; 
				 	icon["tweenMoveList"]=[egret.Point.create(icon.x,icon.y),egret.Point.create(currX,400),egret.Point.create(currX,900)];
				}
				else
				{
				 	icon["tweenMoveList"]=[egret.Point.create(icon.x,icon.y),egret.Point.create(currX,200),egret.Point.create(currX,800)];
				}
			
				egret.Tween.get(icon).to({}).call(this.onComplete,this,[icon]);
				this.addChild(icon);
				this.currIconArr.push(icon);
		}
	}

	private onComplete(icon:BaseDisplayObjectContainer=null):void
	{
	    	let l=this.currIconArr.length;
			for(var i:number=l-1;i>=0;i--)
			{
				egret.Tween.removeTweens(this.currIconArr[i]);
				egret.Tween.get(this.currIconArr[i]).wait(100).to({factor:1},700).call(function(icon:BaseDisplayObjectContainer){
					
					let timerNum:number =egret.setTimeout(()=> 
					{
						if(!this.isInit())
						{
							egret.clearTimeout(timerNum);
							return;
						}
						// this.restPrisonView();
						icon.dispose();
						icon["tweenMoveList"]=undefined;
						this.currIconArr.splice(i,1);
					},this, 800);
								
				}.bind(this,this.currIconArr[i]));
			}
	}

	private chooseBtnClick()
	{	
		if(this._selectIndex == -1){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishSelectItem"));
			return ;
		}
		if(!this._touchSwitch){
			return;
		}
		
		let data = this._punishItemVoList[(this._selectIndex+1).toString()];
		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
		if(hasNum <= 0){
			// App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
			let rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"acPunishBuyTitle",
				msg:rewardStr,
				callback:this.doBuy,
				handler:this,
				needCancel:true
			});
			return ;
		}

		this._touchSwitch = false;

		if(this.code == "2"){
			this.doCodeTwoLightAni();
		}else if(this.code == "3")
		{
			this.doAni1();
		}
		else if(this.code == "4")
		{
			// this.doNianShouAni();
			this.doYanHuaAni();
		}
		else if(this.code == "5")
		{
			// this.doNianShouAni();
			this.doYingJiuAni();
		}
		else
		{
			this.doAni2();
		}
		
		
	}


	//点灯动画
	private doYanHuaAni()
	{
		let idx = this._selectIndex+1 + 1812;
		let lightSp = BaseBitmap.create("itemicon"+idx);
		lightSp.rotation = -20;
		// lightSp.setScale(1.7);
		// lightSp.x = -lightSp.width/2*lightSp.scaleX;
		let lightContainer = new BaseDisplayObjectContainer();
		lightContainer.x = GameConfig.stageWidth/2-lightSp.width/2*lightSp.scaleX;;
		// lightContainer.y = GameConfig.stageHeigth - 200;
		lightContainer.addChild(lightSp);
		lightContainer.y = this._chooseBtn.y - lightContainer.height-80;
		this.container.addChildAt(lightContainer,10);
		lightSp.alpha = 0;
		let ranX = App.MathUtil.getRandom(0,50);
		egret.Tween.get(lightSp,{loop:false}).to({alpha:1},500).wait(300).call(()=>{
			// this._touchSwitch = true;
		},this);
		egret.Tween.get(lightContainer,{loop:false}).
		to({
			y:this._chooseBtn.y - lightContainer.height-230,
			x:lightContainer.x-ranX,
			scaleX:0.5,
			scaleY:0.5,
			},500).call(()=>{
			this.removeChildFromContainer(lightContainer);
			lightContainer = null;
			lightSp = null;
			this.doNianShouAni();
		},this);

	}

	//年兽动画
	private doNianShouAni()
	{
		SoundManager.playEffect("effect_punish_boom");
		let aniNum = [1,3,5,7];
		let idx = this._selectIndex+1 + 1812;
		
		this._headPic.texture = ResourceManager.getRes("punish_nian1")

		egret.Tween.get(this._headPic,{loop:false}).wait(500).call(()=>{
				this._headPic.texture = ResourceManager.getRes("punish_nian")
			},this);

		for (var index = 0; index < aniNum[this._selectIndex]; index++) {

			let ranIndex = App.MathUtil.getRandom(1,3);
			let lightSp = BaseBitmap.create("punish_ani4" + ranIndex);
			lightSp.rotation = -20;
			lightSp.setScale(1.3);
			// lightSp.x = -lightSp.width/2*lightSp.scaleX;
			let lightContainer = new BaseDisplayObjectContainer();
			let ranX = App.MathUtil.getRandom(0,100);
			let ranY = App.MathUtil.getRandom(-20,80);
			lightContainer.x = GameConfig.stageWidth/2-lightSp.width/2*lightSp.scaleX + ranX;
			// lightContainer.y = GameConfig.stageHeigth - 200;
			lightContainer.addChild(lightSp);
			lightContainer.y = this._chooseBtn.y - lightContainer.height-180 + ranY;
			this.container.addChildAt(lightContainer,10);
			// lightSp.alpha = 0;
			
			egret.Tween.get(lightSp,{loop:false}).wait(500).call(()=>{
				this._touchSwitch = true;
			},this);
			lightSp.anchorOffsetX = lightSp.width/2;
			lightSp.anchorOffsetY = lightSp.height/2;
			lightContainer.setScale(0.1);

			egret.Tween.get(lightContainer,{loop:false}).wait(100*index).to({scaleX:1,scaleY:1},100).call(()=>{
				this.removeChildFromContainer(lightContainer);
				lightContainer = null;
				lightSp = null;
			},this);
			
		}

		

		let key = (this._selectIndex+1).toString();
		this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
	}

	//营救动画
	private doYingJiuAni0()
	{
		let idx = this._selectIndex+1 ;
		let lightSp = BaseBitmap.create("punish_ani5"+idx + "_0");
		lightSp.rotation = -20;
		// lightSp.setScale(1.7);
		// lightSp.x = -lightSp.width/2*lightSp.scaleX;
		let lightContainer = new BaseDisplayObjectContainer();
		lightContainer.x = GameConfig.stageWidth/2-30;;
		// lightContainer.y = GameConfig.stageHeigth - 200;
		lightContainer.addChild(lightSp);
		lightContainer.y = this._chooseBtn.y - 160;
		this.container.addChildAt(lightContainer,10);
		egret.Tween.get(lightContainer,{loop:false}).
		to({
			y:lightContainer.y + 10,
			x:lightContainer.x + 20,
			scaleX:1.1,
			scaleY:1.1,
			},300).call(()=>{
			this.removeChildFromContainer(lightContainer);
			lightContainer = null;
			lightSp = null;
			this.doYingJiuAni();
		},this);
	}
	//营救动画
	private doYingJiuAni()
	{
		let dis = ( (GameConfig.stageWidth/2-30)-(this._headPic.x + 240))/((this._chooseBtn.y - 160) -(this._headPic.y + 470))
		let angle = Math.atan(dis) * 180 / Math.PI;;
		SoundManager.playEffect("effect_punish_5weapon");
		let idx = this._selectIndex+1 ;
		let lightSp = BaseBitmap.create("punish_ani5"+idx);
		lightSp.rotation = -angle;
		// lightSp.setScale(1.7);
		// lightSp.x = -lightSp.width/2*lightSp.scaleX;
		let lightContainer = new BaseDisplayObjectContainer();
		lightContainer.x = GameConfig.stageWidth/2-30;;
		// lightContainer.y = GameConfig.stageHeigth - 200;
		lightContainer.addChild(lightSp);
		lightContainer.y = this._chooseBtn.y - 160;
		this.container.addChildAt(lightContainer,10);
		egret.Tween.get(lightContainer,{loop:false}).
		to({
			y:this._headPic.y + 470,
			x:this._headPic.x + 240,
			scaleX:0.5,
			scaleY:0.5,
			},300).call(()=>{
			this.removeChildFromContainer(lightContainer);
			lightContainer = null;
			lightSp = null;
			this.doYingJiuAni2();
		},this);

	}

	//营救动画
	private doYingJiuAni2()
	{
		//飘血
		let bloodSp = BaseBitmap.create("punish_ani5_hit");
		bloodSp.x = this._headPic.x +240 - 90;
		bloodSp.y = this._headPic.y + 470  -70;
		this.container.addChildAt(bloodSp,10);

		let idx = this._selectIndex+1 ;
		let showSp = BaseBitmap.create("punish_ani5"+idx + "_0");

		let dis = ( (GameConfig.stageWidth/2-30)-(this._headPic.x + 240))/((this._chooseBtn.y - 160) -(this._headPic.y + 470))
		let angle = Math.atan(dis) * 180 / Math.PI;;
		// Math.atan2

		showSp.rotation = -angle;
		showSp.x = this._headPic.x +240 ;
		showSp.y = this._headPic.y + 470;
		showSp.setScale(0.5)
		this.container.addChildAt(showSp,11);

		egret.Tween.get(bloodSp,{loop:false}).
		wait(300).call(()=>{
			this.removeChildFromContainer(bloodSp);
			bloodSp = null;
			// this.doYingJiuAni2();
			this.removeChildFromContainer(showSp);
			showSp = null;
		},this);
		// SoundManager.playEffect("effect_punish_boom");
		// let aniNum = [1,3,5,7];
		// let idx = this._selectIndex+1 + 1812;
		SoundManager.playEffect("effect_punish_5boss");
		this._headPic.texture = ResourceManager.getRes("punish_boss1")

		egret.Tween.get(this._headPic,{loop:false}).wait(500).call(()=>{
				this._headPic.texture = ResourceManager.getRes("punish_boss")
				this._touchSwitch = true;
			},this);
		let key = (this._selectIndex+1).toString();
		this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
	}


	//点灯动画
	private doCodeTwoLightAni()
	{
		let idx = this._selectIndex+1 + 1804;
		let lightSp = BaseBitmap.create("itemicon"+idx);
		lightSp.rotation = -20;
		lightSp.setScale(1.7);
		// lightSp.x = -lightSp.width/2*lightSp.scaleX;
		let lightContainer = new BaseDisplayObjectContainer();
		lightContainer.x = GameConfig.stageWidth/2-lightSp.width/2*lightSp.scaleX;;
		// lightContainer.y = GameConfig.stageHeigth - 200;
		lightContainer.addChild(lightSp);
		lightContainer.y = this._chooseBtn.y - lightContainer.height-80;
		this.container.addChildAt(lightContainer,1);
		lightSp.alpha = 0;
		let ranX = App.MathUtil.getRandom(0,50);
		egret.Tween.get(lightSp,{loop:false}).to({alpha:1},500).wait(300).call(()=>{
			this._touchSwitch = true;
		},this);
		egret.Tween.get(lightContainer,{loop:false}).to({y:0,x:lightContainer.x+ranX},2500).call(()=>{
			this.removeChildFromContainer(lightContainer);
			lightContainer = null;
			lightSp = null;
		},this);

		let key = (this._selectIndex+1).toString();
		this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
	}
	private doAni1()
	{
		let key = (this._selectIndex+1).toString();
		
		let posX = [200,200,220,220];
		let posY = [300,300,140,300]
		let aniStr = "punish_" + key + "_"
		let itemClip = ComponentManager.getCustomMovieClip(aniStr,2,100);
		itemClip.frameImages = ["punish_" + key + "_1","punish_" + key + "_2"]
		itemClip.x = posX[this._selectIndex];
		itemClip.y = posY[this._selectIndex];
		this.addChildToContainer(itemClip);
		
		itemClip.playWithTime(1);

		itemClip.setEndCallBack(
			this.nextAni
			
			,this)
	}
	private doAni2()
	{
		SoundManager.playEffect(SoundConst.EFFECT_PRISON_HIT);
		this._wordsContanier.visible = true;
		let rnd =  App.MathUtil.getRandom(1,4);
		this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);

		let key = (this._selectIndex+1).toString();
		
		let container = new BaseDisplayObjectContainer();
		let aniBB: BaseBitmap = BaseBitmap.create("punish_ani" + key );
        container.setScale(2.5);
        this.addChildToContainer(container);
		container.addChild(aniBB)
        egret.Tween.get(container).to({scaleX:1,scaleY:1},200).call(function(m:BaseDisplayObjectContainer){
            if(m)
            {
                // egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                // m.dispose();
				this.nextAni2(m);
            }
        }.bind(this,container),this);
        container.anchorOffsetX = container.width/2;
        container.anchorOffsetY = container.height/2;
        let posX = [250,320,250,300];
        let posY = [500,500,440,400];
        container.x = posX[this._selectIndex];
        container.y = posY[this._selectIndex];
	}
	private nextAni2(m:any)
	{
		let key = (this._selectIndex+1).toString();
		this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
		
		this._headPic.texture = ResourceManager.getRes("punish_head2_2")
		let aniBB: BaseBitmap = BaseBitmap.create("punish_light");
		m.addChildAt(aniBB,0)
		egret.Tween.removeTweens(m);
		egret.Tween.get(m).wait(200).to({alpha:0},500).call(function(m:BaseDisplayObjectContainer){
            if(m)
            {
				// m.addChildAt(0)
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
				this._headPic.texture = ResourceManager.getRes("punish_head2_1")
                m.dispose();
				// this.nextAni2(m);
				this._touchSwitch = true;
				this._wordsContanier.visible = false;
            }
        }.bind(this,m),this);
	}
	private doBuy()
	{
		AcPunishBuyItemPopupView.aid = this.aid;
		AcPunishBuyItemPopupView.code = this.code
		ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW,{});
	}

	private nextAni(m:any)
	{	
		let key = (this._selectIndex+1).toString();
		let rnd =  App.MathUtil.getRandom(1,5);
		SoundManager.playEffect("effect_punish_" + rnd);
		SoundManager.playEffect("effect_item_" + key);
		let posX = [200,200,220,220];
		let posY = [300,300,140,300]

		
		let aniStr = "punish_" + key + "_"
		let itemClip = ComponentManager.getCustomMovieClip(aniStr,2,100);
		itemClip.frameImages = ["punish_" + key + "_3","punish_" + key + "_4"]
		itemClip.x = posX[this._selectIndex];
		itemClip.y = posY[this._selectIndex];
		this.addChildToContainer(itemClip);
		this._touchSwitch = false;
		itemClip.playWithTime(1);
		this._headPic.texture = ResourceManager.getRes("punish_head2")
		itemClip.setEndCallBack(
			this.setEnd
			
			,this)
		m.dispose();
	}
	private setEnd(m:any)
	{
		let key = (this._selectIndex+1).toString();
		this._headPic.texture = ResourceManager.getRes("punish_head1")
		this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: "punish-"+this.code,itemKey:key});
		this._touchSwitch = true;

		let tmpThis = this;
        egret.Tween.get(m).to({alpha:0},300).call(function(m:CustomMovieClip){
            if(m)
            {
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
				m.dispose();
            }
        }.bind(this,m),this);
		
	}
	//领取BOSS奖励
	private getBoxClick(){
		if(this._acVo.get){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
			return ;
		}
		if(this._acData.hp > 0){
			// App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
			return ;
		}
		this.request(NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD,{ activeId: "punish-" + this.code});
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			if(data.data.data.hasKill)
			{
				this._acData.hp = 0;
			}else{
				this._acData  = data.data.data.punishActive;
			}
			
			this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);
			this.buyCallback(null);
			this.refreshState();
			/**
			 * 飘起经验
			 */
			let strList = [];
			let scrore1 = data.data.data.score1;
			let flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1",[String(scrore1)]);
			strList.push({tipMessage:flyStr1});
			let scrore2 = data.data.data.score2;
			if(scrore2 > 0)
			{
				let flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2",[String(scrore2)]);
				strList.push({tipMessage:flyStr2} );
			}
			egret.setTimeout( ()=>{
				App.CommonUtil.playRewardFlyAction(strList);
			},this,800)
			
		}else if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE)
		{
			this._acData  = data.data.data.punishActive;
			this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			this.refreshState();
		}
		
	}

	private butItemBtnCilck()
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let startTime = this._acVo.st;
		let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
		let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
		if(GameData.serverTime - zeroTime > 3600*cfg.activeTime[1] || deltaT < 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		// if(this.getState() == 3)
		// {
			
		// }
		AcPunishBuyItemPopupView.aid = this.aid;
		AcPunishBuyItemPopupView.code = this.code
		ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW,{});
	}

	private rankRewardBtnCilck()
	{
		AcPunishRankRewardPopupView.aid = this.aid;
		AcPunishRankRewardPopupView.code = this.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKREWARDPOPUPVIEW,{acData:this._acData,aid:this.aid,code:this.code});
	}
	private rankCilck()
	{
		// this._acVo.et = GameData.serverTime + 10;
		AcPunishRankPopupView.aid = this.aid;
		AcPunishRankPopupView.code = this.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKPOPUPVIEW,{aid:this.aid,code:this.code});
	}

	private exchangeCilck()
	{
		AcPunishExPopupView.aid = this.aid;
		AcPunishExPopupView.code = this.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHEXPOPUPVIEW,{aid:this.aid,code:this.code});
	}

	protected getRuleInfo():string
	{
		return "acPunish_Rule-" + this.code;
	}

	protected addChildToContainer(obj: egret.DisplayObject): void {
		if (obj) {
			this.container.addChild(obj);
			this.container.y = 0;
		}
	}
	private showList(): void {

		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._punishItemVoList = cfg.punishList;
		for (var index = 1; index < 5; index++) {
			let item = this.getItem(this._punishItemVoList[index.toString()])
			this._punishItemList.push(item);
			item.setScale(0.9);
			item.x = 77 + (136*0.9+10) *(index-1);
			item.y = GameConfig.stageHeigth - this.container.y - 350;
			this.addChild(item);

			item.addTouchTap(this.itemClick,this,[index-1]);

			
		}

		for (var index = 0; index < this._punishItemList.length; index++) {
		
			let data = this._punishItemVoList[(index+1).toString()];
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
			if(hasNum > 0){
				this.setSelect(index);
				return;
			}	
		}

	}

	private getItem(data):BaseDisplayObjectContainer
	{

		// let itemInfo = Api.itemVoApi.getItemInfoVoById(data.item.toString());
		let container = new BaseDisplayObjectContainer();

		let itemCfg = Config.ItemCfg.getItemCfgById(Number(data.item));
		// let itemCfg = Config.ItemCfg.getItemCfgById(Number("1810"));
		

		let iconBg:BaseBitmap = BaseBitmap.create(itemCfg.iconBg);
		iconBg.name = "itembg"
		container.addChild(iconBg);
		// container.width = iconBg.width;
		// container.height = iconBg.height;
		
		let icon:BaseLoadBitmap = BaseLoadBitmap.create(itemCfg.icon);		
		container.addChild(icon);
		icon.name = "itemicon";
		icon.setPosition(4,3);

		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
		let numLb:BaseTextField = ComponentManager.getTextField( hasNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		numLb.setPosition(iconBg.width - 8 - numLb.width, iconBg.height - 8 - numLb.height );
		container.addChild(numLb);
		numLb.name = "numLb";

		let nameBg:BaseBitmap = BaseBitmap.create("public_numbg");
		nameBg.x = iconBg.width/2 - nameBg.width/2;
		nameBg.y = iconBg.height + 5;
		container.addChild(nameBg);

		let nameLb:BaseTextField = ComponentManager.getTextField(itemCfg.name ,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameLb.x = nameBg .x + nameBg.width/2 - nameLb.width/2;
		nameLb.y = nameBg.y + nameBg.height/2 - nameLb.height/2;
		container.addChild(nameLb);

		if(hasNum <= 0)
		{
			App.DisplayUtil.changeToGray(icon);
			App.DisplayUtil.changeToGray(iconBg);
		}

		return container;
	}

	private itemClick(evt:egret.Event,index:number)
	{
		// this._selectIndex = index;
		this.setSelect(index);
		
	}


	public tick() {

		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let acstartTime = this._acVo.st;
		
		let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
		let now = GameData.serverTime;


		let startTime = zeroTime + 3600*cfg.activeTime[0];
		let endTime = zeroTime + 3600*cfg.activeTime[1];

		let isRefresh = false;
		if(this._lastTime < startTime && now > startTime)
		{
			isRefresh = true;
		}
		if(this._lastTime < endTime && now > endTime)
		{
			isRefresh = true;
		}
		if(this.getState() == 3||this.getState() == 4){
			if(this._boxContainer&&this._boxContainer.visible == false){
				isRefresh = true;
			}
		}
		
		if(isRefresh){
			this.refreshState()
			this._lastTime = now;
		}

		// let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
		if(this.getState() == 4){
			let openTime = 86400 + App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0]*3600;
			let openStr = LanguageManager.getlocal("acPunishOpenTime",[App.DateUtil.getFormatBySecond(openTime, 1)])
			this._openTxt.visible = true;
			this._openTxt.text = openStr;
			
		}
		if(this.getState() == 1){
			let openTime = App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0]*3600;
			let openStr = LanguageManager.getlocal("acPunishOpenTime",[App.DateUtil.getFormatBySecond(openTime, 1)])
			this._openTxt.visible = true;
			this._openTxt.text = openStr;
			
		}
	}

	public buyCallback(event: egret.Event): void {
		let num = 0;
		for (var index = 0; index < this._punishItemList.length; index++) {
			let txt = <BaseTextField>this._punishItemList[index].getChildByName("numLb")

			

			let data = this._punishItemVoList[(index+1).toString()];
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
			txt.text = hasNum.toString();
			txt.setPosition(108 - 8 - txt.width, 106 - 8 - txt.height );

			let iconBg = <BaseBitmap>this._punishItemList[index].getChildByName("itembg")
			let icon = <BaseLoadBitmap>this._punishItemList[index].getChildByName("itemicon")
			if(hasNum <= 0){
				App.DisplayUtil.changeToGray(icon);
				App.DisplayUtil.changeToGray(iconBg);
			}else{
				App.DisplayUtil.changeToNormal(icon);
				App.DisplayUtil.changeToNormal(iconBg);
			}
			num += hasNum;
		}
		this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);

		let score1Str = LanguageManager.getlocal("acPunishScore2",[this._acVo.v.toString()]);
		this._score1Text.text = score1Str;

		let score2Str = LanguageManager.getlocal("acPunishScore1",[this._acVo.score.toString()]);
		this._score2Text.text = score2Str;


		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		
		
		let lvStr = "" ;
		if(this.code == "2"){
			lvStr = (100- this._acData.hp/cfg.Hp*100).toFixed(3);
			this._progressBar.setPercentage( 1 - this._acData.hp/cfg.Hp)
		}else{
			lvStr = Math.floor(this._acData.hp/cfg.Hp*100).toString();
			this._progressBar.setPercentage(this._acData.hp/cfg.Hp)
		}
		this._levelTxt.text = lvStr  + "%";
		if(num >= cfg.itemNum){
			this._chooseBtn.x = GameConfig.stageWidth/ 2 - this._chooseBtn.width - 10;
			this._chooseAllBtn.visible = true;
		}
	}

	private runText()
	{
		let strList = new Array<string>();
		
		for (var index = 0; index < this._acData.log.length; index++) {
			let str = this.getTipText(this._acData.log[index]);
			strList.push(str);
		}
		let lampContainer = new LoopLamp(strList);
		lampContainer.y = 190;
		this.addChildToContainer(lampContainer);
	}


	

	private getTipText(data:any):string
	{
		let tipStr = "";
		if(!data){
			return "";
		}
		let itemcfg = Config.ItemCfg.getItemCfgById(Number(data[1]));
		if(itemcfg){
			let rewardStr = GameData.getRewardsStr(data[2]);
			tipStr = LanguageManager.getlocal("acPunishTip",[data[0],itemcfg.name,rewardStr])
		}
		return tipStr;
	}
	public exCallback(event: egret.Event): void {
		this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish",this.code);
		this._score2Text.text = LanguageManager.getlocal("acPunishScore1",[this._acVo.score.toString()]);
	}
	protected getSheepType(): number {
		return 1;
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM,this.buyCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
		this._scrollList = null;
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._score1Text = null;
		this._score2Text = null;
		this._acData = null;
		this._acVo = null;
		this._progressBar = null;
		this._selectBg = null;
		this._selectIndex = -1;
		this._openTxt = null;
		this._boxContainer = null;
		this._lightSp = null;
		this._boxDesc = null;
		this._boxSp = null;
		this._chooseBtn = null;
		this._touchSwitch = true;
		// egret.Tween.removeTweens(this._lightSp);
		this._bodyContainer = null;
		this._headPic = null;
		this._wordsContanier = null;
		this._punishItemList = null;
		this._chooseAllBtn = null;
		this.currIconArr = [];
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		super.dispose();
	}

}
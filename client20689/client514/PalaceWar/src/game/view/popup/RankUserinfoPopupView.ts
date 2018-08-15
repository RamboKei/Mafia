/**
 * 排行榜玩家信息弹板
 * author yanyuling
 * date 2017/10/25
 * @class RankUserinfoPopupView
 */
class RankUserinfoPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _bottomnodeContainer:BaseDisplayObjectContainer;

	private _shieldBtn:BaseButton;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
		let UIData = this.param.data;
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
		//自己管理自己的节点
		this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._bottomnodeContainer);

		let tarWidth = 550;
		let bg0:BaseBitmap = BaseBitmap.create("playerview_bg2");
		bg0.setScale(tarWidth/bg0.width);
        bg0.x = 10;
		this._nodeContainer.addChild(bg0);
		
		let fanImg = BaseBitmap.create("playerview_name_bg");
		fanImg.scaleX = 0.85;
		fanImg.x = GameConfig.stageWidth -fanImg.width-40;
		fanImg.y = 240;
		this._nodeContainer.addChild(fanImg);

		let temX = fanImg.x+100;
		let temY = fanImg.y;

		let nameTF:BaseTextField = ComponentManager.getTextField(UIData.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		// nameTF.border = true;
		nameTF.stroke = 1;
		nameTF.borderColor = TextFieldConst.COLOR_BLACK;
		nameTF.x = temX - nameTF.width/2;
		nameTF.y = temY + 7;
		this._nodeContainer.addChild(nameTF);

		let uidStr = LanguageManager.getlocal("uidTitle") + ":" + UIData.ruid;
		let uidTF:BaseTextField = ComponentManager.getTextField(uidStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
		uidTF.x = nameTF.x
		uidTF.y = nameTF.y + nameTF.height +5;
		this._nodeContainer.addChild(uidTF);

		let allName = UIData.gname;
		if(allName == "")
		{
			allName = LanguageManager.getlocal("allianceRankNoAlliance");
		}
		let alliStr = LanguageManager.getlocal("acRank_myAlliancenick");
		let allianceTxt:BaseTextField = ComponentManager.getTextField(alliStr+allName,20,TextFieldConst.COLOR_WARN_YELLOW);
		allianceTxt.x = nameTF.x
		allianceTxt.y = uidTF.y + uidTF.height +5;
		this._nodeContainer.addChild(allianceTxt);

		let poStr = LanguageManager.getlocal("playerview_Nopo");
		let po = UIData.po;
		if(po > 0)
		{
			poStr = LanguageManager.getlocal("allianceMemberPo" + po);
		}
		
		let alliancePoTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po") + ": "+ poStr,20,TextFieldConst.COLOR_WARN_YELLOW);
		alliancePoTxt.x = nameTF.x
		alliancePoTxt.y = allianceTxt.y + allianceTxt.height +5;
		this._nodeContainer.addChild(alliancePoTxt);

		if (UIData.vip > 0)
		{
			let vipbg = BaseBitmap.create("playerview_wipbg")
			vipbg.x = nameTF.x;
			vipbg.y = fanImg.y - 37;
			vipbg.scaleY = 1.3;
			this._nodeContainer.addChild(vipbg);
			
			let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
			vipImg.width = 80;
			vipImg.height = 35;
			vipImg.x = vipbg.x;
			vipImg.y = vipbg.y + 2;
			this._nodeContainer.addChild(vipImg);
		}

		let curLv = UIData.level;
		let posX = 20;
		if (UIData.title != "")
		{
			curLv = UIData.title ;
			posX = -10;
		}
		let userContainer = Api.playerVoApi.getPlayerPortrait(curLv,UIData.pic);
		userContainer.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
		userContainer.x = posX;
		userContainer.y = 40;
		userContainer.name = "userContainer";
		this._nodeContainer.addChild(userContainer);

		//下部信息部分
		let bottomInfoX = 330;
		let bottomInfoY = 0;
		this._bottomnodeContainer.y = 410;
		//底部需要往上移动
		let btY = bg0.y + bg0.height

		let playerview_powerbg = BaseBitmap.create("playerview_powerbg")
		playerview_powerbg.x = 50;
		playerview_powerbg.y = this._bottomnodeContainer.y - 60;
		this._nodeContainer.addChild(playerview_powerbg);

		let myPowerImg = BaseBitmap.create("playerview_power_img");
		myPowerImg.x = playerview_powerbg.x + 30;
		myPowerImg.y = playerview_powerbg.y + 20;
		this._nodeContainer.addChild(myPowerImg);

		let titleText1 =  ComponentManager.getTextField(App.StringUtil.changeIntToText(UIData.power) ,24,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText1.name = "powerTxt"
		titleText1.x = myPowerImg.x + myPowerImg.width + 2;
		titleText1.y = myPowerImg.y + myPowerImg.height/2 - titleText1.height/2;
		this._nodeContainer.addChild(titleText1); 

		let officebg =  BaseBitmap.create("palace_rewardbg");//("palace_rewardbg");
		officebg.width = 260;
		officebg.height = 40;
		officebg.x = playerview_powerbg.x -10  ;
		officebg.y = myPowerImg.y - 55;
		this._nodeContainer.addChild(officebg);
		
		let officeText1 =  ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		officeText1.name = "powerTxt"
		officeText1.x = myPowerImg.x;
		officeText1.y = officebg.y + officebg.height/2 - officeText1.height/2;
		this._nodeContainer.addChild(officeText1); 

		let officeTF:BaseBitmapText = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOfficeByLevel(UIData.level), "office_fnt");
		officeTF.name = "officeTF";
		officeTF.setScale(0.9);
		officeTF.x = officeText1.x + officeText1.width-5;
		officeTF.y = officeText1.y + officeText1.height/2 - officeTF.height/2-2;
		this._nodeContainer.addChild(officeTF);

		let playerview_probg = BaseBitmap.create("playerview_probg");
		playerview_probg.x = 10  ;
		playerview_probg.height = 106;
		playerview_probg.scaleX = tarWidth/playerview_probg.width;
		playerview_probg.y = bottomInfoY;
		
		let servant_mask = BaseBitmap.create("servant_mask");
		servant_mask.width = tarWidth;
		servant_mask.x = 10;
		
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		bottomBg.scaleX = tarWidth/bottomBg.width;
        bottomBg.height =182;
		bottomBg.x = 10 ;
		bottomBg.y = playerview_probg.y + playerview_probg.height-10;
		servant_mask.y = bottomBg.y - servant_mask.height;
		this._bottomnodeContainer.addChild(servant_mask);
		this._bottomnodeContainer.addChild(bottomBg);
		this._bottomnodeContainer.addChild(playerview_probg);

		let proPosY = playerview_probg.y + 15;
		let proPosX = GameConfig.stageWidth/2;
		for (var index = 1; index <= 8; index++) {
			// let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
			let proText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			proText.name = "proText" + index
			let ModT = 0;
			if(index == 1 || index == 4 || index == 7)
			{
				ModT = -1;
			}else if(index == 3 || index == 6 || index == 8)
			{
				ModT = 1;
			}
			proPosX = GameConfig.stageWidth/2 + ModT*180 - 30;
			// proPosX = tarWidth/2 + ModT*180;
			if ( index > 1 && index%3 == 1)
			{
				proPosY += 25;
			}
			let imgIdx = index;
			if(index >=7)
			{
				imgIdx +=1;
			}
			let img = BaseBitmap.create("playerview_pro"+imgIdx)
			img.x = proPosX-img.width-20;
			img.y = proPosY;
			this._bottomnodeContainer.addChild(img);

			proText.x = proPosX-15;
			proText.y = img.y+2;
			// proText.y = img.y + img.height/2 - proText.height/2 ;
			this._bottomnodeContainer.addChild(proText);
		}
		this.refreshProTxt();

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 500;
		line1.x = tarWidth/2  - line1.width/2;
		line1.y = bottomBg.y+ 30;
		this._bottomnodeContainer.addChild(line1);

		let playerRank_titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("playerRank_title"),22,0x272727);
		playerRank_titleTxt.x =    tarWidth/2 - playerRank_titleTxt.width/2;
		playerRank_titleTxt.y = line1.y + line1.height/2 - playerRank_titleTxt.height/2;
		this._bottomnodeContainer.addChild(playerRank_titleTxt);

		let probg1 = BaseBitmap.create("public_9_bg21");
		probg1.width = 500;
		probg1.height = 138;
		probg1.x =  tarWidth/2 - probg1.width/2+bottomBg.x;
		probg1.y = line1.y + 30;
		this._bottomnodeContainer.addChild(probg1)

		// bottomInfoY += 10;

		let titleinfo = UIData.titleinfo;
		let startX = probg1.x+10;
		let startY = probg1.y + 10;
		let addH = 0;
		
		let titleNum = 0;
		for (var key in titleinfo) {
			if (titleinfo[key] >= 1)
			{
				if(Number(key) < 4001)
				{
					titleNum ++;
				}
				let officerImg = BaseLoadBitmap.create("user_title_" + key +"_3");
				let deltaV = 0.8;
				officerImg.width = 155 * deltaV;
				officerImg.height = 59 * deltaV;
				if (startX > probg1.x + probg1.width-100)
				{
					startX = probg1.x+10;
					startY += 40;
					addH += 40;
				}
				officerImg.x =  startX;
				officerImg.y = startY ;
				this._bottomnodeContainer.addChild(officerImg);
				startX += 120;
			}
		}

		if (titleNum == 0)
		{
			let noTitleTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("rankUserinfo_noTitle"),20,TextFieldConst.COLOR_BROWN);
			noTitleTipTxt.x = tarWidth/2 - noTitleTipTxt.width/2;
			noTitleTipTxt.y = probg1.y + probg1.height/2 - noTitleTipTxt.height/2;
			this._bottomnodeContainer.addChild(noTitleTipTxt); 
		}
		// bottomBg.height += addH;
		this.cacheAsBitmap=true;
		
		let dinnerBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"dinner_shotJoin",this.dinerBtnHandler,this);
		dinnerBtn.x = this.viewBg.x + this.viewBg.width - dinnerBtn.width-10;
		dinnerBtn.y = bottomBg.y + bottomBg.height  + 15;
		
		if(UIData.ruid == Api.playerVoApi.getPlayerID() || this.param.data.isDinnerHost)
		{	
			dinnerBtn.visible = false;
		}else{
			dinnerBtn.visible = true;
		}
		this._bottomnodeContainer.addChild(dinnerBtn);
		this._shieldBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"chatShield",this.shieldBtnHandler,this);
		this._shieldBtn.x = this.viewBg.x + 10;
		this._shieldBtn.y = bottomBg.y + bottomBg.height  + 15;
		
		if(UIData.ruid == Api.playerVoApi.getPlayerID())
		{	
			this._shieldBtn.visible = false;
		}else{
			this._shieldBtn.visible = true;
		}

		// if(LocalStorageManager.get("shield" + UIData.ruid)){
		// 	this._shieldBtn.setText("chatCancelShield")
		// }
		if(Api.chatVoApi.getIsBlock(UIData.ruid)){
			this._shieldBtn.setText("chatCancelShield")
		}
		else{
			this._shieldBtn.setText("chatShield");
		}

		this._bottomnodeContainer.addChild(this._shieldBtn);
	}
	protected refreshProTxt()
	{
		let UIData = this.param.data;
		let bcid:number =  Api.challengeVoApi.getBigChannelIdByCid(UIData.cid);
		let proCfg=[
			{
				txt : LanguageManager.getlocal("playerview_force") ,//"武力: ",
				proValue: App.StringUtil.changeIntToText(UIData.atk),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_inte") ,
				proValue:App.StringUtil.changeIntToText( UIData.inte),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_wife") ,
				proValue:UIData.wifenum,
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_policy") ,
				proValue:App.StringUtil.changeIntToText(UIData.politics),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_charm") ,
				proValue:App.StringUtil.changeIntToText(UIData.charm),
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("playerview_child") ,
				proValue:UIData.childnum,
				proIcon:"",
			},{
				txt : LanguageManager.getlocal("rank_challenge")+": "  ,
				proValue: bcid +"."+ LanguageManager.getlocal("challengeTitle"+ bcid),
				proIcon:"public_icon4",
			},{
				txt : LanguageManager.getlocal("rank_imacy2"),
				proValue: UIData.imacy,
				proIcon:"public_icon3",
			}
		]
		for (var index = 0; index < proCfg.length; index++) {
			let proText = <BaseTextField>this._bottomnodeContainer.getChildByName("proText"+(index+1));
			proText.text = String(proCfg[index].proValue);
		}
	}

	protected shieldBtnHandler()
	{
		let UIData = this.param.data;
		if(Api.chatVoApi.getIsBlock(UIData.ruid)){
			// LocalStorageManager.remove("shield" + UIData.ruid);
			// App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
			// this._shieldBtn.setText("chatShield");
			// return;
			let rewardStr = LanguageManager.getlocal("chatCancelBlockDesc",[UIData.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"chatCancelShield",
				msg:rewardStr,
				callback:this.doShield,
				handler:this,
				needCancel:true
			});
			return;
		}
		
		let rewardStr = LanguageManager.getlocal("chatShieldDesc",[UIData.name]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"chatShield",
			msg:rewardStr,
			callback:this.doShield,
			handler:this,
			needCancel:true
		});
	}

	private doShield()
	{
		let UIData = this.param.data;
		// LocalStorageManager.set("shield" + UIData.ruid,"true")
		if(Api.chatVoApi.getIsBlock(UIData.ruid))
		{
			this.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, {fuid:UIData.ruid});
		}
		else{
			let num = 0;
			if(Api.chatVoApi.getChatBlockVo().info)
			{
				num = Api.chatVoApi.getChatBlockVo().info.length;
				if(!num)
				{
					num = 0;
				}
			}
			if(num >= 50){
				App.CommonUtil.showTip(LanguageManager.getlocal("chatblockCountMax"));
				return;
			}

			this.request(NetRequestConst.REQUEST_CHAT_BLOCK, {fuid:UIData.ruid});
		}
		
		
	
		// if(LocalStorageManager.get("shield" + UIData.ruid)){

	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.cmd == NetRequestConst.REQUEST_CHAT_BLOCK){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg2"));
		}else if(data.data.cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldMsg3"));
		}
		if(Api.chatVoApi.getIsBlock(this.param.data.ruid)){
			this._shieldBtn.setText("chatCancelShield")
		}
		else{
			this._shieldBtn.setText("chatShield");
		}
	}

	protected dinerBtnHandler()
	{
		if(Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv())
		{
			App.CommonUtil.showTip(Api.dinnerVoApi.getLockedString());
			return;
		}
		if(this.param.data.ishavedinner == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_shotJoinTip"));
			return;
		}
		//触发宴会引导
		if(Api.rookieVoApi.curGuideKey == "dinner")
		{
			this.hide();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DINNER_GUIDE);
			return;
		}
		ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, {"info":{uid:this.param.data.ruid,name:this.param.data.name}});

		if (this.param.data.isFromDinner) {
			this.hide();
		}
	}

   	protected getShowHeight():number
	{
		return 795;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"playerview_bg2",

			"playerview_wipbg","playerview_name_bg","playerview_powerbg","playerview_probg",
			"playerview_pro1","playerview_pro2","playerview_pro3","playerview_pro4","playerview_pro5","playerview_pro6",
			"playerview_pro_inmg2","playerview_infobg","playerview_arrow","playerview_pro7","playerview_pro8","playerview_pro9",
			"progress3","progress3_bg","playerview_lvupBtn","playerview_lvupBtn_down","playerview_power_img",
			"office_fnt","playerview_lvup_word","palace_rewardbg","servant_mask",
		]);
	}

	public dispose():void
	{
        this._nodeContainer = null;
		this._bottomnodeContainer = null;
		this.cacheAsBitmap=true;
        super.dispose();
    }
}
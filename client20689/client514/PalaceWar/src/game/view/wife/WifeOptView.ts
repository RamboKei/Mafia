/**
 * 红颜操作界面
 * author dky
 * date 2017/10/9
 * @class WifeView
 */
class WifeOptView extends CommonView {

	//亲密度
	private _intimateValueText: BaseTextField;
	//子嗣
	private _childrenValueText: BaseTextField;

	//魅力值
	private _charmValueText: BaseTextField;

	//红颜经验
	private _expValueText: BaseTextField;

	private _wifeInfoVo: WifeInfoVo;

	private _giveDotSp:BaseBitmap = null;
	private _skillDotSp:BaseBitmap = null;
	private _skinDotSp:BaseBitmap = null;

	private _loveBtn:BaseButton;
	private _giveBtn:BaseButton;
	private _skillBtn:BaseButton;
	private _skinBtn:BaseButton;

	private _wifeIcon:BaseLoadBitmap;

	private _bottomBg:BaseBitmap;

	private _topContanier:BaseDisplayObjectContainer;

	private _wordsCornerBg:BaseBitmap = null;
	private _wordsBg:BaseBitmap = null;
	private _wifeWordsText: BaseTextField;
	private _droWifeIcon:BaseLoadDragonBones;
	private _droWifeIcon2:BaseLoadDragonBones;

	private _isMoving = false;

	 public constructor() {
		super();
		
	}
	public initView(): void {


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);



		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			// wifePic = skinCfg.body;
			this.playEffect(skinCfg.sound,true);
		}
		else{
			this.playEffect(this._wifeInfoVo.sound,true);
		}

		// this.playEffect(this._wifeInfoVo.sound,true);
		//大背景
		let bigBg:BaseBitmap = BaseBitmap.create("wifeview_optbg");
		bigBg.y = -15;
		this.addChildToContainer(bigBg);

		this._topContanier = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._topContanier);
		//描述背景
		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
		titleBg.width = GameConfig.stageWidth;
		titleBg.height = 70;
		titleBg.y = -21;
		this._topContanier.addChild(titleBg);
	
		//红颜描述文字
		let wifeDescText:BaseTextField = ComponentManager.getTextField(this._wifeInfoVo.desc ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeDescText.setColor(TextFieldConst.COLOR_WHITE);
		wifeDescText.x = 20;
		wifeDescText.width = GameConfig.stageWidth - wifeDescText.x*2;
		this._topContanier.addChild(wifeDescText);






		let wifePicStr = this._wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.addChildToContainer(this._droWifeIcon);

				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.addChildToContainer(this._droWifeIcon);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.addChildToContainer(this._droWifeIcon);
			}
		}

		let wifeScale = 0.8;
		//红颜图像
		this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
		this._wifeIcon.x = 80;
		
		this._wifeIcon.setScale(wifeScale);
		this.addChildToContainer(this._wifeIcon);

		if(this._droWifeIcon)
		{
			this._wifeIcon.visible = false;
			this._droWifeIcon2 = this._droWifeIcon;
		}

		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");

		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{


			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			
			nameBg.width = nameTF.width + 40;
			nameBg.x = this.container.width/2 - nameBg.width/2;
			nameBg.y = this.container.height - 380;
			this.addChildToContainer(nameBg);
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
			this.addChildToContainer(nameTF);
		} else {
			//红颜名字背景
		
			nameBg.x = 25;
			nameBg.y = 200;
			this.addChildToContainer(nameBg);
			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
			this.addChildToContainer(nameTF);


		}


		

							//红颜说的话背景
		this._wordsBg = BaseBitmap.create("public_9_bg25");
		this._wordsBg.width = 430;
		this._wordsBg.height = 90;
		this._wordsBg.x = 180;
		
		this.addChildToContainer(this._wordsBg);

		this._wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
		this._wordsCornerBg.x = 390;
		
		this.addChildToContainer(this._wordsCornerBg);

		//红颜说的话
		this._wifeWordsText = ComponentManager.getTextField(this._wifeInfoVo.words ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._wifeWordsText.setColor(TextFieldConst.COLOR_BLACK);
		this._wifeWordsText.x = 200;

		this._wifeWordsText.width = 390;
		this.addChildToContainer(this._wifeWordsText);

				//下面属性背景
		this._bottomBg = BaseBitmap.create("wifeview_bottombg2");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = 96;
		this._bottomBg.x = 0;
		this._bottomBg.y = GameConfig.stageHeigth - this.container.y - this._bottomBg.height;
		App.LogUtil.log(this._bottomBg.y)
		this.addChildToContainer(this._bottomBg);
		// this._wifeIcon.y = this._bottomBg.y - 840*wifeScale + 120;

		this._wifeIcon.y = 158;
		if(this._wifeIcon.y + 840*wifeScale <  this._bottomBg.y + 50){
			this._wifeIcon.y = this._bottomBg.y + 50 - 840*wifeScale;
			
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		this._wordsBg.y = this._wifeIcon.y - 90;
		this._wifeWordsText.y = this._wordsBg.y + 20;
		this._wordsCornerBg.y = this._wordsBg.y + 87;
		
	

		let intIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
		intIcon.x = 50;
		intIcon.y = this._bottomBg.y + 75;
		this.addChildToContainer(intIcon);
		//亲密度
		let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
		this._intimateValueText = ComponentManager.getTextField( IntimacyValue,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._intimateValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._intimateValueText.x = intIcon.x + intIcon.width + 5;
		this._intimateValueText.y = intIcon.y + intIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._intimateValueText);

		//子嗣
		let childIcon:BaseBitmap = BaseBitmap.create("wifeview_childicon");
		childIcon.x = intIcon.x;
		childIcon.y = intIcon.y + intIcon.width ;
		this.addChildToContainer(childIcon);

		let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
		this._childrenValueText = ComponentManager.getTextField(childValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._childrenValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._childrenValueText.x = this._intimateValueText.x;
		this._childrenValueText.y = childIcon.y + childIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._childrenValueText);

		//魅力
		let charmIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
		charmIcon.x = 345;
		charmIcon.y = intIcon.y ;
		this.addChildToContainer(charmIcon);

		let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
		this._charmValueText = ComponentManager.getTextField(charmValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._charmValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._charmValueText.x = charmIcon.x + charmIcon.width + 5;
		this._charmValueText.y = charmIcon.y + charmIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._charmValueText);

		//经验
		let expIcon:BaseBitmap = BaseBitmap.create("wifeview_vexpicon");
		expIcon.x = charmIcon.x;
		expIcon.y = childIcon.y ;
		this.addChildToContainer(expIcon);

		let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
		this._expValueText = ComponentManager.getTextField(expValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._expValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._expValueText.x = charmIcon.x + charmIcon.width + 5;
		this._expValueText.y = this._childrenValueText.y;
		this.addChildToContainer(this._expValueText);


		// //按钮背景
		// let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg9");
		// btnBg.width = 190;
		// btnBg.height = 260;
		// btnBg.x = 430;
		// btnBg.y = this._bottomBg.y - bottomBg.height - 230;
		// this.addChildToContainer(btnBg);

		let yy = this._bottomBg.y - 50

		let loveBg:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg.x = 50;
		loveBg.y = yy;
		this.addChildToContainer(loveBg);

		let loveBg2:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg2.x = 180;
		loveBg2.y = yy;
		this.addChildToContainer(loveBg2);

		let loveBg3:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg3.x = 310;
		loveBg3.y = yy;
		this.addChildToContainer(loveBg3);

		let loveBg4:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg4.x = 450;
		loveBg4.y = yy;
		this.addChildToContainer(loveBg4);

		//宠幸按钮
		this._loveBtn = ComponentManager.getButton("wife_love",null,this.loveHander,this,null,0);
		this._loveBtn.x = 70;
		this._loveBtn.y = yy;
		// this._loveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._loveBtn);

		
		let loveNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		loveNameBg.x = this._loveBtn.x + 10;
		loveNameBg.y = this._loveBtn.y + 70 ;
		this.addChildToContainer(loveNameBg);
		
		let loveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeLoveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		loveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		loveNameTF.x = loveNameBg.x + loveNameBg.width/2 - loveNameTF.width/2;
		loveNameTF.y = loveNameBg.y + loveNameBg.height/2 - loveNameTF.height/2;
		this.addChildToContainer(loveNameTF);

		//赏赐按钮
		this._giveBtn = ComponentManager.getButton("wife_give",null,this.giveHander,this,null,0);
		this._giveBtn.x = 200;
		this._giveBtn.y = yy;
		// this._giveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._giveBtn);

		let giveNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		giveNameBg.x = this._giveBtn.x+ 10;
		giveNameBg.y = this._giveBtn.y + 70 ;
		this.addChildToContainer(giveNameBg);
		
		let giveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeGiveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		giveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		giveNameTF.x = giveNameBg.x + giveNameBg.width/2 - giveNameTF.width/2;
		giveNameTF.y = giveNameBg.y + giveNameBg.height/2 - giveNameTF.height/2;
		this.addChildToContainer(giveNameTF);

		//技能按钮
		this._skillBtn = ComponentManager.getButton("wife_skill",null,this.skillHander,this,null,0);
		this._skillBtn.x = 333;
		this._skillBtn.y = yy;
		// this._skillBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skillBtn);

		let skillNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		skillNameBg.x = this._skillBtn.x+ 10;
		skillNameBg.y = this._skillBtn.y + 70 ;
		this.addChildToContainer(skillNameBg);
		
		let skillNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillBtn")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		skillNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		skillNameTF.x = skillNameBg.x + skillNameBg.width/2 - skillNameTF.width/2;
		skillNameTF.y = skillNameBg.y + skillNameBg.height/2 - skillNameTF.height/2;
		this.addChildToContainer(skillNameTF);

		//换装按钮
		this._skinBtn = ComponentManager.getButton("wifeview_skin",null,this.skinHander,this,null,0);
		this._skinBtn.x = 470;
		this._skinBtn.y = yy;
		// this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skinBtn);

		let skinNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		skinNameBg.x = this._skinBtn.x+ 10;
		skinNameBg.y = this._skinBtn.y + 70 ;
		this.addChildToContainer(skinNameBg);
		
		let skinNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinViewTitle")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		skinNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		skinNameTF.x = skinNameBg.x + skinNameBg.width/2 - skinNameTF.width/2;
		skinNameTF.y = skinNameBg.y + skinNameBg.height/2 - skinNameTF.height/2;
		this.addChildToContainer(skinNameTF);

		this.checkRedPoint();

		// this.moveUiUp();
	}

	private checkRedPoint(){
		//赏赐红点
		if(Api.wifeVoApi.getGiveRed())
		{
			if(this._giveDotSp == null)
			{
				this._giveDotSp = BaseBitmap.create("public_dot2");
				this._giveDotSp.x = this._giveBtn.x + this._giveBtn.width - this._giveDotSp.width ;
				this._giveDotSp.y = this._giveBtn.y;
				this.addChildToContainer(this._giveDotSp);
			}
			else
			{
				if(this._giveDotSp)
				{
					this._giveDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._giveDotSp)
			{
				this._giveDotSp.visible = false;
			}
		}
		//技能红点
		if(Api.wifeVoApi.getSkillRed(this._wifeInfoVo.id))
		{
			if(this._skillDotSp == null)
			{
				this._skillDotSp = BaseBitmap.create("public_dot2");
				this._skillDotSp.x = this._skillBtn.x + this._skillBtn.width - this._skillDotSp.width ;
				this._skillDotSp.y = this._skillBtn.y;
				this.addChildToContainer(this._skillDotSp);
			}
			else
			{
				if(this._skillDotSp)
				{
					this._skillDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._skillDotSp)
			{
				this._skillDotSp.visible = false;
			}
		}

		//皮肤红点
		if(Api.wifeSkinVoApi.getSkinRed(this.param.data.id))
		{
			if(this._skinDotSp == null)
			{
				this._skinDotSp = BaseBitmap.create("public_dot2");
				this._skinDotSp.x = this._skinBtn.x + this._skinBtn.width - this._skinDotSp.width ;
				this._skinDotSp.y = this._skinBtn.y;
				this.addChildToContainer(this._skinDotSp);
			}
			else
			{
				if(this._skinDotSp)
				{
					this._skinDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._skinDotSp)
			{
				this._skinDotSp.visible = false;
			}
		}
	}

	private loveHander(){
		if(this._isMoving)
		{
			return;
		}
		let gem = Api.playerVoApi.getPlayerGem();
		let needGem = Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy);
		let message:string = LanguageManager.getlocal("wifeLoveUseGem",[App.StringUtil.toString(needGem),this._wifeInfoVo.name]);
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:this.confirmCallbackHandler,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1});

		// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,this.param.data.id);
	}

	private giveHander(){
		if(this._isMoving)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.WIFEGIVEPOPUPVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});

		// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,this.param.data.id);
	}

	private skillHander(){
		if(this._isMoving)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.WIFESKILLPOPUPVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
		// ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
	}

	private skinHander(){
		if(PlatformManager.checkIsKRSp())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
			return;
		}
		if(this._isMoving)
		{
			return;
		}
		let id = this.param.data.id
		if(!Api.wifeSkinVoApi.isHaveSkin(id))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
			return;
		}
		if(this._droWifeIcon)
		{
			// if(this.container&&this.container.contains(this._droWifeIcon))
			// {
				
			// }
			// this.container.removeChild(this._droWifeIcon)
			// this._droWifeIcon.dispose();
			// this._droWifeIcon = null;
			this._droWifeIcon.stop();
			
		}
	
		ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
	}


	private confirmCallbackHandler():void
	{
		let id = this.param.data.id
		// if(!Api.wifeSkinVoApi.isHaveSkin(id))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
		// 	return;
		// }
	
		// let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		if (Api.playerVoApi.getPlayerGem() < Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy) )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeLoveTip1"));
			return
		}
		let idStr = App.StringUtil.toString(id);
		this.request(NetRequestConst.REQUEST_WIFE_LOVE,{wifeId:idStr});
		if(this._droWifeIcon)
		{
			// if(this.container&&this.container.contains(this._droWifeIcon))
			// {
				
			// }
			// this.container.removeChild(this._droWifeIcon)
			// this._droWifeIcon.dispose();
			// this._droWifeIcon = null;
			this._droWifeIcon.stop();
			
		}
	}
	//宠幸之后刷新数据
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.ret < 0){
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_WIFE_LOVE){

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText.text = IntimacyValue;
			//子嗣
			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText.text = childValue;

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText.text = charmValue;

			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText.text = expValue;

			let childData:any = null;
			if(data.data.data.childArr.length > 0){
				childData = data.data.data.childArr[0]
			} 


			// if(this._droWifeIcon)
			// {
			// 	this._droWifeIcon.dispose();
			// 	this._droWifeIcon = null;
			// }

			ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:this.param.data.id,type:2,childData:childData,rewards:data.data.data.rewards});
			

			// if(data.data.data.rewards)
			// {
			// 	let rewards= GameData.formatRewardItem(data.data.data.rewards);
			// 	if(rewards&&rewards.length>0)
			// 	{
			// 		App.CommonUtil.playRewardFlyAction(rewards);
			// 	}
			// }


		}

		
	}
	protected refreshInfoAfterLove()
	{
			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText.text = IntimacyValue;
			//子嗣
			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText.text = childValue;

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText.text = charmValue;

			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText.text = expValue;
		
	}

	protected refreshInfoAfterSkin()
	{
		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
			}
			
		}
		this._wifeIcon.setload(wifePic);

	

		this.checkDro();
	}

	private checkDro()
	{

		if(this._droWifeIcon)
		{
			this._droWifeIcon.dispose()
			this._droWifeIcon = null;
		}
		let bg2Index = this.container.getChildIndex(this._wifeIcon);
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					// this._droWifeIcon.setScale(0.7) 
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
					this._wifeIcon.visible = false;
				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
				this._wifeIcon.visible = false;
			}
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		else{
			this._wifeIcon.visible = true;
		}
		this._droWifeIcon2 = this._droWifeIcon;
	}

	private checkDro2()
	{
		if(this._droWifeIcon){
			// let bg2Index = this.container.getChildIndex(this._wifeIcon);
			// // this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
			// // this.container.addChildAt(this._droWifeIcon,bg2Index)
			// this._droWifeIcon = this._droWifeIcon2;
			// this.container.addChildAt(this._droWifeIcon,bg2Index)
			// this._droWifeIcon.x = this._wifeIcon.x + 230;
			// this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 40;
			// return;
			this._droWifeIcon.resume();
		}
		else{
			this._wifeIcon.visible = true;
		}
		// this.checkDro();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			 "wifeview_namebg","wifeview_optbg","wifeview_namebg","wifeview_bottombg2",
			 "wifeview_charmicon","wifeview_childicon","wifeview_vexpicon","wifeview_vigoricon",
			  "wifeview_mask","wife_btnbg","wife_give","wife_love","wife_skill",
			  "wifeview_btnbg","wifeview_skin","wifeview_skinmask","wifeview_skingray",
			  "wifeview_skinstar",
		]);
	}

	private moveUiUp()
	{
		let ths=this;
		this._isMoving = true;
		egret.Tween.get(this.container).wait(200)
		.call(function(){
				this._wordsBg.visible = false;
				this._wifeWordsText.visible = false;
				this._wordsCornerBg.visible = false;
				
			},this)
		
		
		egret.Tween.get(this._topContanier).to({y:-600}, 400)
		.call(this.showSkinAni,this)
		.wait(2700)
		.to({y:10}, 500)
		.to({y:0}, 100)
		.call(function(){
				ths._wordsBg.visible = true;
				ths._wifeWordsText.visible = true;
				ths._wordsCornerBg.visible = true;
				ths._isMoving = false;
			},this)
		.call(this.showStar,this)
	}
	private showStar()
	{
		for (var index = 0; index < 10; index++) {

			let ranIndex = App.MathUtil.getRandom(1,3);
			let lightSp = BaseBitmap.create("wifeview_skinstar");
			lightSp.rotation = -20;
			lightSp.setScale(3);
			// lightSp.x = -lightSp.width/2*lightSp.scaleX;
			let lightContainer = new BaseDisplayObjectContainer();
			let ranX = App.MathUtil.getRandom(-200,300);
			let ranY = App.MathUtil.getRandom(-200,180);
			lightContainer.x = GameConfig.stageWidth/2-lightSp.width/2*lightSp.scaleX + ranX;
			// lightContainer.y = GameConfig.stageHeigth - 200;
			lightContainer.addChild(lightSp);
			// lightContainer.y = this._wifeIcon.y - lightContainer.height-180 + ranY;
			lightContainer.y = this.container.height/2 + ranY;
			this.container.addChildAt(lightContainer,10);
			// lightSp.alpha = 0;
			
			// egret.Tween.get(lightSp,{loop:false}).wait(500).call(()=>{
			// 	this._touchSwitch = true;
			// },this);
			lightSp.anchorOffsetX = lightSp.width/2;
			lightSp.anchorOffsetY = lightSp.height/2;
			lightContainer.setScale(0.1);

			egret.Tween.get(lightContainer,{loop:false}).wait(100*index).to({scaleX:1,scaleY:1},500).call(()=>{
				this.removeChildFromContainer(lightContainer);
				lightContainer = null;
				lightSp = null;
			},this);
			
		}


		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		

		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			// wifePic = skinCfg.body;
			this.playEffect(skinCfg.sound,true);
		}
		else{
			this.playEffect(this._wifeInfoVo.sound,true);
		}

		
		
	}

	private showSkinAni()
	{
		let ths=this;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		let mask1:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask1.x = -640;
		mask1.y = -20;
		this.container.addChildAt(mask1,bg2Index)

		egret.Tween.get(mask1).to({x:0}, 800).to({x:-30}, 100).wait(200).call(function(){
				// egret.Tween.removeTweens(ths);
				// ths._tweenTo=null;
				
			},this)
		.wait(1700).to({x:0}, 100).to({x:-640}, 600);

		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask2.$setSkewY(180);
		mask2.x = GameConfig.stageWidth*2;
		mask2.y = -20;
		this.container.addChildAt(mask2,bg2Index)

		egret.Tween.get(mask2).to({x:640}, 800).to({x:670}, 100).wait(200).call(this.addMask,this)
		.wait(1700).to({x:640}, 100).to({x:GameConfig.stageWidth*2}, 600)
	
	}
	private addMask()
	{
		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skingray");
		// mask2.$setSkewY(180);
		mask2.alpha = 0;
		mask2.x = GameConfig.stageWidth/2 - mask2.width/2;
		mask2.y = this._wifeIcon.y;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		this.container.addChildAt(mask2,bg2Index)
		egret.Tween.get(mask2)
		.to({alpha:0.4}, 300)
		.wait(1000).to({alpha:0}, 500)
		.call(function()
		{
			mask2.dispose();
		},this)
		this.refreshInfoAfterSkin();
	}

	protected getRuleInfo(): string {
		return "wife_description";
	}
	private doGuide()
	{
		this.hide();
	}

	private touchTap():void
	{
		this.hide();
		// SoundManager.resumeBg()

		// if(Api.rookieVoApi.isInGuiding){
		// 	// Api.rookieVoApi.checkWaitingGuide();
		// 	Api.rookieVoApi.checkNextStep();
		// }
		
	}

	public dispose(): void {
		super.dispose();

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);
		this._intimateValueText = null;
		//子嗣
		this._childrenValueText = null;

		//魅力值
		this._charmValueText = null;

		//红颜经验
		this._expValueText = null;

		this._wifeInfoVo = null;

		this._giveDotSp = null;
		this._skillDotSp = null;
		this._skinDotSp = null;
		this._loveBtn = null;
		this._giveBtn = null;
		this._skinBtn = null;
		this._skinBtn = null;

		this._topContanier = null;

		this._wordsCornerBg = null;
		this._wordsBg = null;
		this._wifeWordsText = null;
		this._isMoving =false;
		this._droWifeIcon = null;
		this._droWifeIcon2 = null;

	}
}
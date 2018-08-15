/**
 * 门客信息
 * author yanyuling
 * date 2017/9/25
 * @class ServantInfoView
 */
class ServantInfoView  extends CommonView
{
	static CALPHA:number =0;
	
	private _nodeContainer:BaseDisplayObjectContainer;
	private _bottomnodeContainer:BaseDisplayObjectContainer;
	private _goldNumTxt:BaseTextField;
	private _servantId:string=null;
	private _leveupNeedTxt:BaseTextField;
	private _servantInfoObj:any = null;
	private _proTxtList:BaseTextField[] = null;
	private _servantProCfg:Object[] = null;
	private _progressBar:ProgressBar;
	private _curLvNeedGold:number = 0 ;
	private _oldLv:number;
	private _lastUseTime=0;
	private _checkFlag:BaseBitmap;
	private _bottomNodeList=[];
	private _bottomBg:BaseBitmap;
	private _levelupBtn:BaseButton;
	private _nameTxt:BaseTextField;
	private _alvImg:BaseLoadBitmap;

	private _clickHand:BaseBitmap;
	private _servantFullImg:BaseLoadBitmap;
	private _lvText:BaseTextField;
	private _serverList:string[] = undefined;
	private _specialityIconList=[];
	private _toprefreshNode:BaseDisplayObjectContainer;
	private _switchDelta:number = 500;
	private _decreeGoldCost:number = 0;
	private _task4ClickTimes:number = 0;

    public constructor() {
		super();
	}

	public initView():void
	{
		Api.rookieVoApi.checkNextStep();

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshServantProTxt,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.checkRedPoints,this);

		this._proTxtList = [];
		this.resetServantId(this.param.data);

		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		this._nodeContainer = new BaseDisplayObjectContainer()
		this.addChildToContainer(this._nodeContainer);
		this._toprefreshNode = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._toprefreshNode);
		
		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._bottomnodeContainer);
		
		
		let goldBg = BaseBitmap.create("servant_topresbg");
		goldBg.width = 120

        goldBg.x = PlatformManager.hasSpcialCloseBtn()?480:20;
		goldBg.y = PlatformManager.hasSpcialCloseBtn()?500:(this.container.y -goldBg.height -20);
		this.addChild(goldBg);

		let goldIcon = BaseBitmap.create("public_icon2");
		goldIcon.x =goldBg.x  - goldIcon.width/2+15;
		goldIcon.y = goldBg.y + goldBg.height/2 - goldIcon.height/2-5;
		this.addChild(goldIcon);

		this._goldNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr(); //0611
		this._goldNumTxt.x = goldIcon.x + goldIcon.width;
        this._goldNumTxt.y = goldBg.y + goldBg.height/2 - this._goldNumTxt.height/2 - 3;
        this.addChild( this._goldNumTxt);

		let servant_infobg = BaseLoadBitmap.create("servant_infobg");
		servant_infobg.width = 640;
		servant_infobg.height = 580;
		servant_infobg.y = -20;
		this._nodeContainer.addChild(servant_infobg);

		let servantFullImg = BaseLoadBitmap.create(this._servantInfoObj.fullImgPath);
		servantFullImg.width = 405;
		servantFullImg.height = 467;
		servantFullImg.anchorOffsetY = servantFullImg.height;
		servantFullImg.anchorOffsetX = servantFullImg.width/2;
		servantFullImg.x = GameConfig.stageWidth/2;
		servantFullImg.y = servant_infobg.y + servant_infobg.height-50;
		this._servantFullImg = servantFullImg;
		this._nodeContainer.addChild(servantFullImg);

		let nameBg = BaseBitmap.create("servant_alv_namebg");
        nameBg.x = 20
        nameBg.y = 20;
        this._toprefreshNode.addChild(nameBg);

		this._alvImg = BaseLoadBitmap.create("servant_alv_1");
		this._alvImg.width = 91;
		this._alvImg.height = 81;
		this._alvImg.visible = false;
		this._toprefreshNode.addChild(this._alvImg);
		if (this._servantInfoObj.clv > 0){
			this._alvImg.visible = true;
		}

		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);
        this._nameTxt = nameTxt;
		nameTxt.multiline = true;
		this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
		if(PlatformManager.checkIsTextHorizontal()){
			nameTxt.x = this._nodeContainer.width/2 - nameTxt.width/2;
			nameTxt.y = this._nodeContainer.height  - 225 - nameTxt.height/2;

			nameBg.width = nameTxt.width + 50;
			nameBg.x = this._nodeContainer.width/2 - nameBg.width/2;
			nameBg.y = this._nodeContainer.height - 225 - nameBg.height/2;
			this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);

			this._alvImg.x = nameBg.x - this._alvImg.width/2-5;
			this._alvImg.y = nameBg.y + nameBg.height/2  - this._alvImg.height/2 - 5;
		} else {
			this._alvImg.x = nameBg.x + nameBg.width/2 - this._alvImg.width/2+5;
			this._alvImg.y = nameBg.y -20;
			nameTxt.width = 26;
			
			nameTxt.x =nameBg.x + nameBg.width/2-nameTxt.width/2;
			this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
			if(this._alvImg.visible){
				nameTxt.y = this._alvImg.y+ 90;
			}else{
				nameTxt.y = this._alvImg.y+ 60;
			}
		}

        this._toprefreshNode.addChild( nameTxt);

		let servant_mask = BaseBitmap.create("servant_mask");
		servant_mask.width = servant_infobg.width;
		servant_mask.x = GameConfig.stageWidth/2-servant_mask.width/2;
		servant_mask.y = servant_infobg.y + servant_infobg.height - servant_mask.height;
		this._nodeContainer.addChild(servant_mask);

		//红色属性背景条
		let servant_attributemap = BaseBitmap.create("servant_attributemap")
		servant_attributemap.x = 180;
		servant_attributemap.y = 380;
		this._toprefreshNode.addChild(servant_attributemap);

		//蓝色背景图
		let servantBlueBg = BaseBitmap.create("servant_downbg")
		servantBlueBg.x = 0;
		servantBlueBg.y = 445;
		this._nodeContainer.addChild(servantBlueBg);

		//等级蓝色背景图
		let servant_levebg = BaseBitmap.create("servant_levebg")
		servant_levebg.x = 5;
		servant_levebg.y = 445;
		this._nodeContainer.addChild(servant_levebg);

		//等级 文字不变
		this._lvText  =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._lvText.text = LanguageManager.getlocal("servant_infoLv");
        this._lvText.x =22;
        this._lvText.y = 455;
        this._nodeContainer.addChild( this._lvText );

		for(var i=0;i<4;i++){
			let attribute = BaseBitmap.create("servant_attribute"+(i+1));
			let num= i%2;
			attribute.x = 90+num*180;
			attribute.y =460+ 32*Math.floor(i/2);
			this._nodeContainer.addChild(attribute);
		}

		this._progressBar = ComponentManager.getProgressBar("progress3","progress3_bg",460);
		this._progressBar.x = 10;
		this._progressBar.y = 530;
		this._progressBar.setTextSize(18);
		this._nodeContainer.addChild(this._progressBar);

		//勾选底
		let probg = BaseBitmap.create("hold_dinner_box")
		probg.x = 480;
		probg.y = 465;
		this._nodeContainer.addChild(probg);

		//连升十级
		let tenTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
        tenTxt.x = 525;// probg.x + 45;
        tenTxt.y = 470;//probg.y+ 260;
		tenTxt.size =24;
        this._nodeContainer.addChild( tenTxt);

		this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
		this._checkFlag.width = this._checkFlag.height = 38;
		this._checkFlag.x = 480;//tenTxt.x + 95;
		this._checkFlag.y = tenTxt.y - 10;
		// if (Api.rookieVoApi.curGuideKey == "maintask" && this._checkFlag.alpha == 0 ){
		// 	ServantInfoView.CALPHA = 1;
		// 	this._checkFlag.alpha = 1;
		// }else{
			this._checkFlag.alpha = ServantInfoView.CALPHA;
		// }
		this._nodeContainer.addChild(this._checkFlag);
		this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
		this.changeProgressText();
		
		
		this._servantProCfg =[
			{
				txt: this.getProStringWithProId(1),
				txtcolor:TextFieldConst.COLOR_QUALITY_ORANGE,
				txtId:1,
			},
			{
				txt:this.getProStringWithProId(3),
				txtcolor:TextFieldConst.COLOR_QUALITY_ORANGE,
				txtId:3,
			},
			{
				txt:this.getProStringWithProId(4),
				txtcolor:0xddd5c7,
				txtId:4,
			},
			{
				txt:this.getProStringWithProId(5),
				txtcolor:0xddd5c7,
				txtId:5,
			},
			{
				txt:this.getProStringWithProId(6),
				txtcolor:0xddd5c7,
				txtId:6,
			},
			{
				txt: this.getProStringWithProId(7),
				txtcolor:0xddd5c7,
				txtId:7,
			},
		];
		let proX = probg.x + 30;
		let proY = probg.y + 35;

		let detailImg = ComponentManager.getButton("servant_detailBtn","",this.detailClickHandler,this)
		detailImg.x = 400;//probg.x + probg.width - detailImg.width/2-10;
		detailImg.y = 380;//probg.y - detailImg.height/2+15;
		this._toprefreshNode.addChild(detailImg);

		for (var index = 0; index < this._servantProCfg.length; index++) {
			var element:any = this._servantProCfg[index];
			let proTxt = ComponentManager.getTextField("",22,element.txtcolor);
			proTxt.text = this.getProStringWithProId(element.txtId);
			proTxt.x = proX;
			proTxt.y = proY;

			//等级
			if(element.txtId==1){
				proTxt.x=5;
				proTxt.y=475;
				proTxt.width=80;
				proTxt.textAlign ="center";
				proTxt.size =42;
				proTxt.textColor =TextFieldConst.COLOR_LIGHT_YELLOW;
			}
			//属性
			if(element.txtId==3){
				proTxt.x=210;
				proTxt.y=392;	
				proTxt.width=190;
				if(PlatformManager.checkIsThSp())
				{
					proTxt.width=200;
				}
				proTxt.size =26;
				proTxt.textAlign ="center";
				proTxt.textColor =TextFieldConst.COLOR_LIGHT_YELLOW;
			}
			//属性武力
			if(element.txtId==4){
				proTxt.x=160;
				proTxt.y=465;
				proTxt.size =24;
				proTxt.textColor =TextFieldConst.COLOR_WHITE;
			}
			//属性智力
			if(element.txtId==5){
				proTxt.x=340;
				proTxt.y=465;
				proTxt.size =24;
				proTxt.textColor =TextFieldConst.COLOR_WHITE;
			}
			//属性政治
			if(element.txtId==6){
				proTxt.x=160;
				proTxt.y=495;
				proTxt.size =24;
				proTxt.textColor =TextFieldConst.COLOR_WHITE;
			}
			//属性魅力
			if(element.txtId==7){
				proTxt.x=340;
				proTxt.y=495;
				proTxt.size =24;
				proTxt.textColor =TextFieldConst.COLOR_WHITE;
			}

			if(element.txtId==3){
				this._toprefreshNode.addChild( proTxt);
			}else{
				this._nodeContainer.addChild( proTxt);
			}
			proY += 28;
			this._proTxtList.push(proTxt);
		}

		let levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.levelupBtnClickHandler,this);
		levelupBtn.x = 480;//probg.x + probg.width/2 - levelupBtn.width/2;
		levelupBtn.y = 505;//proY + 12 + 55;
		levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(levelupBtn);
		this._levelupBtn = levelupBtn;

		let btY = servant_infobg.y + servant_infobg.height
		if (btY + this.container.y  + 406 > GameConfig.stageHeigth){
			let bgy = 554  - servant_infobg.height - this.container.y;
			bgy = bgy >= 0 ? 0 :bgy;
			servant_infobg.y = bgy+50;
			servant_infobg.mask = new egret.Rectangle(0,this.container.y-50,GameConfig.stageWidth,servant_infobg.height)
			this._bottomnodeContainer.y = 565//GameConfig.stageHeigth - 406 - this.container.y;
			servantFullImg.y = servant_infobg.y + servant_infobg.height-50;
		}else{
			this._bottomnodeContainer.y =565// GameConfig.stageHeigth - 554-this.container.y;
		}

		this._progressBar.y =530; //this._bottomnodeContainer.y - 40;
		let bottomInfoY =0;// 457;
		let bottomBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
		bottomBg.x = 0 ;
		bottomBg.y = bottomInfoY;
		let attrLineNum = Math.ceil(servantCfg.ability.length / 2);
		let targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y  - this.container.y;
		bottomBg.height = targetHeight;
		this._bottomnodeContainer.addChild(bottomBg);
		this._bottomBg = bottomBg;
		
		let arrow_leftBtn = ComponentManager.getButton("btn_leftpage","",this.switchHandler,this,["left"]);
		arrow_leftBtn.x = 20;
		arrow_leftBtn.y = this._bottomnodeContainer.y - (PlatformManager.hasSpcialCloseBtn()? 300:200);
		this._nodeContainer.addChild(arrow_leftBtn);
		// egret.Tween.get(arrow_leftBtn,{loop:true}).to({x:40},800).wait(100).to({x:20},800).wait(100);

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpage","",this.switchHandler,this,["right"]);
		arrow_rightBtn.scaleX = -1;
		let tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x  ;//- arrow_rightBtn.width;
		arrow_rightBtn.x = tarRightPosX
		arrow_rightBtn.y = arrow_leftBtn.y;//proY + 12 + 55;
		this._nodeContainer.addChild(arrow_rightBtn);
		// egret.Tween.get(arrow_rightBtn,{loop:true}).to({x:tarRightPosX-20},800).wait(100).to({x:tarRightPosX},800).wait(100);

		this.refreshBaseUIInfo(); //0611
    }

	protected switchHandler(param:any)
	{	
		let curS = egret.getTimer();
		if( curS - this._switchDelta < 300)
		{
			return;	
		}
		this._switchDelta = curS;

		if(!this._serverList){
			this._serverList =  Api.servantVoApi.getServantInfoIdListWithSort(Api.otherInfoVoApi.getServantSortId());
		}
		let newserId = "";
		let len = this._serverList.length
		for (var index = 0; index < len; index++) {
			if(this._serverList[index] == this._servantId)
			{
				if(param == "left"){
					if(index == 0){
						
						newserId = this._serverList[len-1];
					}else{
						newserId = this._serverList[index-1];
					}
				}else if(param == "right"){
					if(index == len-1){
						newserId = this._serverList[0];
					}else{
						newserId = this._serverList[index+1];
					}
				}
				break;
			}
		}
		if(newserId && newserId == this._servantId){
			return;
		}
		this.resetServantId(newserId); //重置门客id
		egret.Tween.get(this._toprefreshNode,{loop:false}).to({alpha:0},200).call(this.refreshBaseUIInfo,this).wait(300).to({alpha:1},200);
		// this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
		let tarPosX1 = -this._servantFullImg.width/2-20;
		let tarPosX2 = GameConfig.stageWidth+ this._servantFullImg.width/2 + 20;
		 if(param == "left"){
			 tarPosX2 = -this._servantFullImg.width-20;
			 tarPosX1 = GameConfig.stageWidth+ this._servantFullImg.width/2 + 20;
		}
		egret.Tween.get(this._servantFullImg,{loop:false}).set({visible:false}).to({x:tarPosX1},200).wait(100).call(()=>{
			this._servantFullImg.setload(this._servantInfoObj.fullImgPath); //0611
		},this).set({visible:true,x:tarPosX2}).to({x:GameConfig.stageWidth/2},200);
	}
	protected resetServantId(newServantId:string)
	{
		this._servantId = newServantId;
		let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
		this._servantInfoObj = servantInfoObj;
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		this.playEffect(this._servantInfoObj.sound,true);
	}
	/**
	 * 左右切换门客后，刷新UI
	 */
	protected refreshBaseUIInfo()
	{
		this.dealBottomTabGroups();
		this.dealSpecialityIcons();
		this._progressBar.setPercentage(this._servantInfoObj.hasexp/this._curLvNeedGold);
		this.refreshServantProTxt();
		this.resreshUITextInfoAndBtnStatus();
	}

	protected dealBottomTabGroups()
	{
		let tabbarGroup = <TabBarGroup>this._bottomnodeContainer.getChildByName("tabbarGroup")
		if(tabbarGroup){
			this._bottomnodeContainer.removeChild(tabbarGroup);
		}
		let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
		let tabName = ["servant_info_tab1","servant_info_tab2","servant_info_tab3"];
        if (servantCfg.wifeId ){
			tabName.push("servant_info_tab5")
		}
		if(servantCfg.aura){
			tabName.push("servant_info_tab4")
		}
		tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
       	tabbarGroup.setSpace(2);
		tabbarGroup.x = 30;
        tabbarGroup.y = 24;
		tabbarGroup.name = "tabbarGroup";
        this._bottomnodeContainer.addChild(tabbarGroup);

		let bottomH = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y;

		for (var index = 0; index < 5; index++) {
			let tmpNode = <BaseDisplayObjectContainer>this._bottomNodeList[index];
			if(!tmpNode){	
				tmpNode = new BaseDisplayObjectContainer();
				this._bottomNodeList.push(tmpNode);
				tmpNode.visible = false;
				this._bottomnodeContainer.addChild(tmpNode);
				// if(index == 2){ //道具部分通用
				// 	this.initItemsInfo(this._bottomNodeList[2],bottomH); 
				// }
			}

			// if(index != 2){
				tmpNode.removeChildren();
			// }
		}

		this.initBookInfo(this._bottomNodeList[0],bottomH);
		this.iniSkillInfo(this._bottomNodeList[1],bottomH);
		this.initItemsInfo(this._bottomNodeList[2],bottomH); 
		this.initWifeInfo(this._bottomNodeList[3],bottomH);
		this.initFourInfo(this._bottomNodeList[4],bottomH);


		if (servantCfg.wifeId ){
			this._bottomNodeList[3].visible = true;
		}else{
			this._bottomNodeList[3].visible = false;
		}
		if(!servantCfg.aura){
			this._bottomNodeList[4].visible = false;
		}else{
			this._bottomNodeList[4].visible = true;
		}

		this.tabBtnClickHandler({index:0}); 
	}

	protected dealSpecialityIcons()
	{
		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		let specialAbility  = servantCfg.speciality;
		let len = specialAbility.length > this._specialityIconList.length ? specialAbility.length : this._specialityIconList.length
		for (var index = 0; index < len; index++) {
			var element = specialAbility[index];
			//图 
			let specialityIcon = this._specialityIconList[index];
			if(!specialityIcon){
				if(!element){
					continue;
				}
				specialityIcon = BaseBitmap.create("servant_speciality"+element);
				specialityIcon.name = "specialityIcon"+index;
				this._specialityIconList.push(specialityIcon);
				this._toprefreshNode.addChild(specialityIcon);
			}else{
				if(!element){
					specialityIcon.visible = false;
					continue;
				}
				specialityIcon.visible = true;
				specialityIcon.texture = ResourceManager.getRes("servant_speciality"+element);
			}

			if(specialityIcon){
				if(PlatformManager.checkIsTextHorizontal()){
					specialityIcon.setPosition(3 * GameConfig.stageWidth / 4,20 + 55 * index);
				}else{
					specialityIcon.x =520+50*index;
					specialityIcon.y = 40;
				}
			}
		}
	}

	protected initBookInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoBookItems = new ServantInfoBookItems();
		servantInfoBookItems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoBookItems);
		if(Api.rookieVoApi.isInGuiding){
			let pos = servantInfoBookItems.localToGlobal(servantInfoBookItems.y,20);
			Api.rookieVoApi.waitingPosY = pos.y + 90;
		}
	}

	protected initWifeInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoWifeItem = new ServantInfoWifeItem();
		servantInfoWifeItem.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoWifeItem);
	}

	protected iniSkillInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoSkillsItem = new ServantInfoSkillsItem();
		servantInfoSkillsItem.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoSkillsItem);
	}

	protected initFourInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoFourItems = new ServantInfoFourItems();
		servantInfoFourItems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoFourItems);
	}
	protected initItemsInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoItems = new ServantInfoItems();
		servantInfoItems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoItems);
	}
	/**
	 * 检测红点
	 */
	protected checkRedPoints()
	{
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		let skillRedP = this._bottomnodeContainer.getChildByName("skillRedP");
		if (!skillRedP){
			skillRedP = BaseBitmap.create("public_dot2");
            skillRedP.x = 298;
            skillRedP.y = 24 ;
            skillRedP.name = "skillRedP";
		}
		this._bottomnodeContainer.addChild(skillRedP);
		skillRedP.visible = this._servantInfoObj.isSkillLvUpEnable();

		let bookRedP = this._bottomnodeContainer.getChildByName("bookRedP");
		if (!bookRedP){
			bookRedP = BaseBitmap.create("public_dot2");
            bookRedP.x = 150;
            bookRedP.y = 24 ;
            bookRedP.name = "bookRedP";
		}
		this._bottomnodeContainer.addChild(bookRedP);
		bookRedP.visible = this._servantInfoObj.isBookLvUpEnable();

		let advRedP = this._nodeContainer.getChildByName("advRedP");
		if (!advRedP){
			advRedP = BaseBitmap.create("public_dot2");
            advRedP.x = this._levelupBtn.x + this._levelupBtn.width-15;
            advRedP.y = this._levelupBtn.y-5 ;
            advRedP.name = "advRedP";
		}
		this._nodeContainer.addChild(advRedP);
		advRedP.visible = this._servantInfoObj.isAdvanceEnable();

		let itemRedP = this._bottomnodeContainer.getChildByName("itemRedP");
		if (!itemRedP){
			itemRedP = BaseBitmap.create("public_dot2");
            itemRedP.x = 450;
            itemRedP.y = 24 ;
            itemRedP.name = "itemRedP";
		}
		 this._bottomnodeContainer.addChild(itemRedP);
		itemRedP.visible = Api.servantVoApi.isShowRedForItem();

		// aura
		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		if(servantCfg.aura ){
			let auraRedP = this._bottomnodeContainer.getChildByName("auraRedP");
			if (!auraRedP){
				auraRedP = BaseBitmap.create("public_dot2");
				auraRedP.x = 600;
				auraRedP.y = 24 ;
				auraRedP.name = "auraRedP";
			}
			this._bottomnodeContainer.addChild(auraRedP);
			auraRedP.visible = this._servantInfoObj.isShowRedForaura();
		}
	}

	protected changeCheckFlagStatus()
	{
		this._task4ClickTimes = 1;
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;
		ServantInfoView.CALPHA = this._checkFlag.alpha;
		if (this._checkFlag.alpha == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
		}
		this.changeProgressText();
		if (Api.rookieVoApi.curGuideKey == "maintask" ){
			Api.rookieVoApi.checkNextStep();
		}
	}


	protected changeProgressText()
	{
		let needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp) ;
		let cnKey = "servantInfo_levelupNeed" ;

		let attrInfo = Api.servantVoApi.getDecreePolicyAddAttrInfo();
		let attrStr = "";
		let subNeed = 0;
		let totalSubNeed = 0;
		let deltaT = 0;
		if(attrInfo.lastTimes > 0){
			subNeed = Math.floor(this._curLvNeedGold *attrInfo.addExtent);
			totalSubNeed += subNeed;
			deltaT ++;
		}

		if (this._checkFlag.alpha == 1){
			cnKey = "servantInfo_levelupNeed2" ;
			let curLv = this._servantInfoObj.level;
			for (var index = curLv; index < curLv+9; index++) {
				let needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
				if(needNextLv){
					needGold += needNextLv;
					if(deltaT < attrInfo.lastTimes){
						totalSubNeed +=  Math.floor(needNextLv *attrInfo.addExtent);
					}
					deltaT ++;
				}else{
					break;
				}
			}
		}
		this._decreeGoldCost = 0;
		if(attrInfo.lastTimes > 0){
			let keyStr:string = attrInfo.strKey;
			if (keyStr == "decreeAttrAddTxt0")
			{
				keyStr = "decreeAttrAddTxt00"
			}
			this._decreeGoldCost = totalSubNeed;
		 	attrStr = "<font color=0x65eb5d>" + LanguageManager.getlocal(keyStr,[attrInfo.strKey2,"-"+totalSubNeed]) + "</font>";
		}
		this._progressBar.setText(LanguageManager.getlocal(cnKey) + needGold + LanguageManager.getlocal("servantInfo_levelupNeedGold") + attrStr);
	}
	protected tabBtnClickHandler(params:any)
    {
		for (var index = 0; index < this._bottomNodeList.length; index++) {
			this._bottomNodeList[index].visible = false;
		}

		let tarIdx = params.index;
		if(tarIdx == 3){
			let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
			if (servantCfg.wifeId){
				this._bottomNodeList[3].visible = true;
			}else{
				this._bottomNodeList[3].visible = false;
			}
			if(servantCfg.aura){
				this._bottomNodeList[4].visible = true;
			}else{
				this._bottomNodeList[4].visible = false;
			}
		}else{
			this._bottomNodeList[tarIdx].visible = true;
		}
    }
	protected getProStringWithProId(id:number):string
	{
		if(!this._servantInfoObj){
			return;
		}
		if(id == 1){
			return App.StringUtil.changeIntToText(this._servantInfoObj.level);
		}
		if(id == 3){
			return LanguageManager.getlocal("servant_infoAttr") +App.StringUtil.changeIntToText(this._servantInfoObj.total);
		}
		if(id == 4){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.forceTotal);//LanguageManager.getlocal("servant_force",[String(this._servantInfoObj.attrVo.forceTotal)]) ;
		}
		if(id == 5){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.brainsTotal);//LanguageManager.getlocal("servant_inte",[String(this._servantInfoObj.attrVo.brainsTotal)]);
		}
		if(id == 6){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.politicsTotal);
		}
		if(id == 7){
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.charmTotal);//LanguageManager.getlocal("servant_charm",[String(this._servantInfoObj.attrVo.charmTotal)]);
		}
		return "";
	}

	/**刷新基础的文本和按钮状态 */
	protected resreshUITextInfoAndBtnStatus()
	{
		if (this._servantInfoObj.clv > 0){
			this._alvImg.setload("servant_alv_" + this._servantInfoObj.clv);
			this._alvImg.visible = true;
			if(!PlatformManager.checkIsTextHorizontal()){
				this._nameTxt.y = this._alvImg.y+ 90;
			}
		}else{
			if(!PlatformManager.checkIsTextHorizontal()){
				this._nameTxt.y = this._alvImg.y+ 60;
			}
			this._alvImg.visible = false;
		}
		
		this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
		this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
		this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		this.changeProgressText();
		
		this.changeLvBtnStatus();
		this.checkRedPoints();
	}
	//升级之后刷新数据
	protected refreshInfoAfterUpdate(p:any)
	{
		Api.rookieVoApi.checkNextStep();
		this.resreshUITextInfoAndBtnStatus();

		let newPer = this._servantInfoObj.hasexp/this._curLvNeedGold
		let oldPer = this._progressBar.getPercent();
		let deltaT = 500;
		if (this._oldLv < this._servantInfoObj.level){
			let addLv = this._servantInfoObj.level - this._oldLv;
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:1},(1-oldPer)*deltaT).set({percent:0},0).to({percent:newPer},deltaT*newPer);

			if (p.data.ret == true && p.data.data.data.lucky) {
				App.CommonUtil.showGodbless("servantLv");
			}
			this.showUpgradeEffect(addLv)
		}else{
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:newPer},(newPer-oldPer)*deltaT);
		}

		//功能解锁
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
	}
	
	protected changeLvBtnStatus()
	{
		if (this._servantInfoObj.isLvEnableForAdvance()){
			this._levelupBtn.setText("servant_clvUpBtn");
		}else{
			this._levelupBtn.setText("servantInfoLevelup");
		}

		if(this._servantInfoObj.isAdvanceEnable()){
			App.DisplayUtil.changeToNormal(this._levelupBtn);
		}else{
			// if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold() || this._servantInfoObj.isAtTopLv() ){

			if(Api.playerVoApi.getPlayerGold() == 0 || this._servantInfoObj.isAtTopLv() ){
				App.DisplayUtil.changeToGray(this._levelupBtn);
			}else{
				App.DisplayUtil.changeToNormal(this._levelupBtn);
			}
		}
	}
	protected refreshServantProTxt()
	{
		for (var index = 0; index <this._servantProCfg.length; index++) {
			var element:any = this._servantProCfg[index];
			let proTxt:BaseTextField = this._proTxtList[index];
			proTxt.text = this.getProStringWithProId(element.txtId);
		}
		this.checkRedPoints();
	}
	//播放升级成功动画
	protected showUpgradeEffect(addLv:number)
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv",[String(addLv)]),TextFieldConst.FONTNAME_BOSS_SCORE);
		servant_upgrade_word.x = 240;
		servant_upgrade_word.y = 200

		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
		upgradeClip.setScale(2);
		upgradeClip.x = 110;
		upgradeClip.y = 20;
		this._toprefreshNode.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
		

		this._toprefreshNode.addChild(servant_upgrade_word);
		egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:150},800).to({alpha:0},100);

		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			tmpthis._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
			//字体刷新加个延时
			tmpthis.refreshServantProTxt();
			tmpthis._toprefreshNode.removeChild(upgradeClip);
			upgradeClip = null;
			tmpthis._toprefreshNode.removeChild(servant_upgrade_word);
			servant_upgrade_word = null;
		})
	}

	protected detailClickHandler()
	{
		if(Api.rookieVoApi.getIsGuiding()){
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW,this._servantId);
	}
	protected levelupBtnClickHandler()
	{
		if (this._servantInfoObj.isLvEnableForAdvance()){
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTADVANCEPOPUPVIEW,this._servantId);
			return;
		}

		let newT = egret.getTimer();
		if (newT - this._lastUseTime < 800){
			return;
		}
		this._lastUseTime = newT;
		if(this._servantInfoObj.isAtTopLv()){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip1"));
			return;
		}
		// if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold()){
		if (Api.playerVoApi.getPlayerGold() == 0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
			//需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
			return
		}
		this._task4ClickTimes = 2;
		this._oldLv = this._servantInfoObj.level;
		if (this._checkFlag.alpha == 0){
			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT,{servantId:this._servantId});
		}else{
			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN,{servantId:this._servantId});
		}
	}

	public hide():void
	{
		if(Api.rookieVoApi.isInGuiding){
			Api.rookieVoApi.checkWaitingGuide();
			ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
		}
		super.hide();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat( [
			"servant_topresbg","servant_probigbg","servant_detailBtn","servant_bottombg","progress3","progress3_bg","servant_namebg",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4", "servant_upgrade_frame","levelup_lizi","levelup_lizi_json",
			"servant_mask","servant_alv_namebg","guide_hand","servant_downbg","servant_attribute1",
			"servant_attribute2","servant_attribute3","servant_attribute4","servant_attributemap","servant_levebg","servant_speciality1","servant_speciality2","servant_speciality3","servant_speciality4",
			"servant_speciality5","servant_speciality6","hold_dinner_box","btn_leftpage","btn_leftpage_down","guide_hand"
		]);
	}
	private showHand()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		if (!PlatformManager.hasSpcialCloseBtn()){
			this._clickHand.skewY = 180;
		}
		this._clickHand.x = PlatformManager.hasSpcialCloseBtn()?57:620;
		this._clickHand.y = 50;
		this.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}

	protected tick()
	{
		if(Api.mainTaskVoApi.getCurMainTaskId() == "4" && this._servantId == "1001" && this._servantInfoObj.level < 10 ){
			if(!this._clickHand){
				this.showHand();
			}
			if(this._checkFlag.alpha == 0 && this._task4ClickTimes == 0){
				this._clickHand.x = this._checkFlag.x + 30;
				this._clickHand.y = this._checkFlag.y + 10  + this.container.y;
			}else{
				this._clickHand.x = this._levelupBtn.x + 70;
				this._clickHand.y = this._levelupBtn.y + 10  + this.container.y;
			}
			if(this._task4ClickTimes >= 2){
				this._clickHand.visible = false;
			}
		}else{
			if(!Api.rookieVoApi.isInGuiding && this._clickHand){
				this._clickHand.visible = false;
			}
		}
		return true;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshServantProTxt,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.checkRedPoints,this);

		this._nodeContainer = null;
		this._goldNumTxt = null;
		this._servantId = "";
		this.param = null;
		this._leveupNeedTxt = null;
		this._servantInfoObj = null;
		this._proTxtList =null;
		this._servantProCfg = null;
		this._progressBar = null;
		this._checkFlag = null;
		this._bottomNodeList = [];
		this._bottomBg = null;
		this._levelupBtn = null;
		this._nameTxt = null;
		this._alvImg = null;
		this._oldLv = null;
		this._bottomnodeContainer = null;
		this._curLvNeedGold = null;
		this._lastUseTime = null;
		this._clickHand = null;
		this._serverList = null;
		this._servantFullImg = null;
		this._lvText = null;
		this._serverList = null;
		this._specialityIconList = [];
		this._switchDelta = 0;
		this._decreeGoldCost = 0;
		this._task4ClickTimes = 0;
		if(this._clickHand){
			egret.Tween.removeTweens(this._clickHand);
			this._clickHand = null;
		}	
		
		super.dispose();
	}
}
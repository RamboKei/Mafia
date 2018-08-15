/**
 * author 陈可
 * date 2017/9/18
 * @class MainUI
 */

class MainUI extends BaseLoadDisplayObjectContiner
{
	private _topContiner:BaseDisplayObjectContainer=undefined;
	private _iconContainer:BaseDisplayObjectContainer;
	private _bottomContiner:BaseDisplayObjectContainer=undefined;

	private _goOutBtn:BaseBitmap;
	private _mailButton:BaseButton;
	private _settingButton:BaseButton;
	private _taskContainer:BaseDisplayObjectContainer;
	private _settingAndMailContainer:BaseDisplayObjectContainer;
	private _isAtHome:boolean = true;
	private _missionIcon:BaseBitmap;

	private _chatTxt:BaseTextField;
	private _chatTxtPoint:BaseTextField;
	private _taskTxt:BaseTextField;
	private _functionTxt:BaseTextField;
	private _lampRoll:LampRoll;
	private _mailRedDotSp:BaseBitmap = null;
	private _achRedDotSp:BaseBitmap = null;
	private _functionPreviewBg:BaseBitmap = null;
	private _functionAni:CustomMovieClip = null;

	private _activityIconList:BaseDisplayObjectContainer[]=[];
	
	private _iconNameList:Object={};
	private _signName:string =null;
	private _functionIcon:BaseBitmap =null;
	private _lastL:number=0;
	private _tuyouBackToLobby:BaseButton = null;
	private _empContainer:BaseDisplayObjectContainer;
	private _empBtn : BaseButton = null;
	private _friendsBtn : BaseButton = null;
	// private _wxgameKefuBtn : BaseButton = null;	
	private _empCircle : BaseBitmap = null;
	private _empTitleCircle : BaseBitmap = null;
	private _empTurnCircle : BaseBitmap = null;

	private _redPoint : BaseBitmap = null;
	private _wxMoreGameIcon:BaseLoadBitmap = null;
	public constructor() 
	{
		super();
		//玩家基础信息发生变化的刷新
	}

	/**
	 * 填内容
	 */
	protected init():void
	{
		this.initTop();
		this.initButtom();

		// 初始化后刷新邮件状态
		this.checkMailState();
		if(Api.switchVoApi.checkAutoLoadDefaultRes())
		{
			App.LoginResLoader.autoLoadNextResItem();
		}

		this.checkEmpBtn();

		if (PlatformManager.checkIsTySp() == true || PlatformManager.checkIsXlSp() == true || PlatformManager.getAppid()=="17018010")
		{
			this._tuyouBackToLobby = ComponentManager.getButton("loginres_btn4","",this.backToLobbyHandler,this);
			this._tuyouBackToLobby.setPosition(10,120);
			this.addChild(this._tuyouBackToLobby);
			this._tuyouBackToLobby.visible = false;
		}
		if(Api.promoteVoApi._showNotice){
			Api.promoteVoApi._showNotice = false;
			ViewController.getInstance().openView('PromoteNoticeView');
		}
	}

	private checkEmpBtn():void
	{
		if(Api.switchVoApi.checkEmperorOpen()==true )
		{	
			let api = Api.emperorwarVoApi;
			if (api.getVersion() > 0 && api.isInShow())//api.getVersion() > 0 && api.isInShow()
			{	
				TimerManager.remove(this.checkEmpBtn,this);
				if (!this._empBtn)
				{
					this.create_empBtn();
				}
				TimerManager.doTimer((api.getet()-GameData.serverTime+86400)*1000,1,this.checkEmpBtn,this);
			}	
			else
			{
				if (this._empBtn)
				{
					this.disposeEmpBtn();
				}
			}
		}
	}

	private disposeEmpBtn(){
		this._empBtn = null;
		egret.Tween.removeTweens(this._empCircle);
		this._empTitleCircle = null;
		egret.Tween.removeTweens(this._empTurnCircle);
		this._empTurnCircle = null;
		let scanclip : any = this._empContainer.getChildByName('scanclip');
		if(scanclip){
			scanclip.stop();
			scanclip.dispose();
			scanclip = null;
		}

		let emplight : any = this._empContainer.getChildByName('emplight');
		if(emplight){
			egret.Tween.removeTweens(emplight);
			emplight = null;
		}

		if(this._empContainer){
			this._empContainer.dispose();
			this._empContainer = null;
		}
	}

	private create_empBtn():void{
		let empContainer = new BaseDisplayObjectContainer();
		empContainer.width = empContainer.height = 120;
		this.setLayoutPosition(LayoutConst.rightbottom, empContainer, this, [10,120]);
		empContainer.y = (GameConfig.stageHeigth - 300);
		if(this._friendsBtn)
		{
			empContainer.y -=  (this._friendsBtn.height - 20);
		}
		this._empContainer = empContainer;
		this.addChild(empContainer);

		empContainer.y = this._friendsBtn.y -  empContainer.height;
		this._bottomContiner.addChild(empContainer);
		let empBtn = ComponentManager.getButton(``,``,this.empClick,this);
		empBtn.width = empBtn.height = 100;
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empBtn, empContainer, [0,0], true);
		empContainer.addChild(empBtn);
		let btnbg = BaseBitmap.create(`empBtnBg`);
		empBtn.addChild(btnbg);
		this._empBtn = empBtn;
		

		let circle = BaseBitmap.create('empcircle');
		circle.anchorOffsetX = circle.width / 2;
		circle.anchorOffsetY = circle.height / 2;
		circle.setScale(1.1);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circle, empBtn, [60*1.1,59*1.1]);
		empContainer.addChild(circle);
		egret.Tween.get(circle,{loop : true}).to({rotation : -360} , 1500);
		this._empCircle = circle;

		let empTitleCircle = BaseBitmap.create('emptitlecircle');
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empTitleCircle, empBtn);
		empContainer.addChild(empTitleCircle);
		// egret.Tween.get(empTitleCircle,{loop : true}).to({rotation : 360} , 1500);
		this._empTitleCircle = empTitleCircle;

		let empturncircle = BaseBitmap.create('empturncircle');
		empturncircle.width = empturncircle.height = 120;
		empturncircle.anchorOffsetX = empturncircle.width / 2;
		empturncircle.anchorOffsetY = empturncircle.height / 2;
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empturncircle, empBtn, [60, 60]);
		empContainer.addChild(empturncircle);
		egret.Tween.get(empturncircle,{loop : true}).to({rotation : -360} , 8000);
		this._empTurnCircle = empturncircle;
		

		let clip = ComponentManager.getCustomMovieClip('empbtn',11, 100);
		clip.width = 70;
		clip.height = 63;
		// clip.anchorOffsetX = 35;
		// clip.anchorOffsetY = 63/2;
		clip.setFrameEvent(11,()=>{
			egret.Tween.get(clip).wait(1000).call(()=>{
				clip.playWithTime(1);
			},this);
			//clip.retain();
			// clip.
		},this);
		clip.setFrameEvent(7,()=>{
			egret.Tween.get(emplight).to({scaleX : 1.5, scaleY : 1.5},500).to({rotation : 60},500).call(()=>{
				emplight.setScale(0.5);
			},this);
			egret.Tween.get(emplight).to({alpha : 1},350).wait(500).to({alpha : 0},150);
			//clip.retain();
			// clip.
		},this);
		clip.playWithTime(1);
		clip.name = 'scanclip'
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, empContainer, [0,0], true);
		empContainer.addChild(clip);

		let btn = BaseBitmap.create(`empBtnname`);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn, empBtn, [0,20]);
		empContainer.addChild(btn);

		let emplight = BaseBitmap.create('emplight');
		emplight.name = 'emplight';
		emplight.width = emplight.height = 70;
		emplight.anchorOffsetX = emplight.width / 2;
		emplight.anchorOffsetY = emplight.height / 2;
		//this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empturncircle, empBtn, [60, 60]);
		this.setLayoutPosition(LayoutConst.lefttop, emplight, empTitleCircle, [65,10]);
		empContainer.addChild(emplight);
		emplight.alpha = 0;
		emplight.setScale(0.5);
	}

	private backToLobbyHandler():void
	{	
		SoundManager.isInBackground = true;
		SoundManager.pauseBg();
		PlatformManager.logout();
	}

	private empClick():void{
		let api = Api.emperorwarVoApi;
		if(api.judgeType() == 5){
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENTERVIEW);
		}
	}
	
	private initTop():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEG_SWITCH,this.initFQStrategyIcon,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreshText,this);
		
		//功能预览
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshText,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END,this.rookieGuideEndCheck,this);

		this._topContiner=new BaseDisplayObjectContainer();
		this.addChild(this._topContiner);

		if(App.DeviceUtil.checkIsSeascreen()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
		{
			this._topContiner.y=GameConfig.seaScreenTopH;
		}
		
		if(Api.switchVoApi.checkOpenVoice())
		{
			//声音区分
			let type = LocalStorageManager.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);
			if(type=="true")
			{
				SoundManager.setVoiceOn(true);
			}
			else
			{
				SoundManager.setVoiceOn(false);
			}
		} 
		
		//填内容
		this._isAtHome = true;
		let topbg = new MainUINewTop({showName:true});
		this._topContiner.addChild(topbg);

		this._iconContainer=new BaseDisplayObjectContainer();
		this._iconContainer.y=113;
		this._topContiner.addChild(this._iconContainer);


		//跑马灯
		this._lampRoll = new LampRoll();
		if(!this._isAtHome && Api.chatVoApi.getLastCrossMessage()){
			this._lampRoll.y = 185; 
		}
		else{
			this._lampRoll.y = 106;
		}
		this._topContiner.addChild(this._lampRoll);
		
		if(Config.AcCfg.isGetAll)
		{
			this.initIconsAndCheckStatus();
		}
		else
		{
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		}
		TickManager.addTick(this.tick,this);
		this.tick();

	}

	private freshChatMsg(evt):void{
		let view = this;
		Api.chatVoApi.clearPriChatList();
		Api.chatVoApi.setPriChatList(evt.data.data.data);
		view._redPoint.visible = Api.chatVoApi.isNewMsg();
	}

	private freshPrichatRed(evt):void{
		let view = this;
		view._redPoint.visible = Api.chatVoApi.isNewMsg()
	}

	private rookieGuideEndCheck(evt):void
	{
		if (PlatformManager.checkIsGDTAD1User() || PlatformManager.checkIsGDTAD2User())
		{
			ViewController.getInstance().openView("DesktopPopupView");
		}
	}

	private freshPrichat(evt):void{
		let view = this;
		//Api.chatVoApi.clearPriChatList();
		if(evt.data.data.data['privatechat.info']){
			Api.chatVoApi.setPriChatList(evt.data.data.data['privatechat.info']);
			view._redPoint.visible = Api.chatVoApi.isNewMsg()
		}
	}

	private friendsBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
	}
	private wxgameKefuBtnHandler()
	{
		RSDKHelper.showWxCustomerService();
	}

	private checkAllRedPoint():void
	{
		for(let key in this.bottomBtnCfg)
		{
			this.checkRedPointByModel(this.bottomBtnCfg[key].btnName);
		}
	}

	private checkRedPointByModel(e:egret.Event|string):void
	{
		let modelName:string=(e instanceof egret.Event)?e.data:e;
		let btn:BaseButton = <BaseButton>this._bottomContiner.getChildByName(modelName);
		if(btn)
		{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].checkRedPoint)
			{
				let showRedPoint:boolean=Api[modelName+"VoApi"].checkRedPoint();
				let redSp:BaseBitmap;
				if(showRedPoint)
				{
					App.CommonUtil.addIconToBDOC(btn);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(btn);
				}
			}
		}
		if(modelName==MessageConst.MESSAGE_MODEL_SHOP||modelName==MessageConst.MESSAGE_MODEL_USERINFO)
		{
			this.checkVipState();
			this.checkThanksg(); 
		} 
	}

	private checkAchPoint()
	{
		if(Api.achievementVoApi.getAchGetNum() > 0)
		{
			if(this._achRedDotSp == null &&this._bottomContiner.getChildByName("achieve"))
			{
				this._achRedDotSp = BaseBitmap.create("public_dot2");
				let achBtn = this._bottomContiner.getChildByName("achieve");
				this._achRedDotSp.x = achBtn.x + achBtn.width - this._achRedDotSp.width ;
				this._achRedDotSp.y = achBtn.y + 2;
				this._bottomContiner.addChild(this._achRedDotSp);
			}
			else
			{
				if(this._achRedDotSp)
				{
					this._achRedDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._achRedDotSp)
			{
				this._achRedDotSp.visible = false;
			}
		}
	}

	private tick():void
	{
		let shareIcon = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("share_func");
		let vo = Api.otherInfoVoApi.getGeneralShareInfo();
		if(shareIcon&&vo)
		{
			if(vo.et && vo.et == 0 || vo.et <= GameData.serverTime)
			{
				App.CommonUtil.addIconToBDOC(shareIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(shareIcon);
			}
		}

		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}

		if(this._friendsBtn && Api.friendVoApi.checkNpcMessage())
		{
			this._friendsBtn.visible = this._isAtHome;
			if( Api.friendVoApi.isShowRedForEnter() ){
				App.CommonUtil.addIconToBDOC(this._friendsBtn);
				let reddot = this._friendsBtn.getChildByName("reddot");
				reddot.x = this._friendsBtn.width - 30;
				reddot.y =  10;
			}else{
				App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
			}
		}
		this.check12BoxIcon();
		// this.checkRankActiveIcon();
		if (Api.acVoApi.checkIsHasNewAc())
		{
			this.showNewActivityIcons();
		}
		let isSort:boolean = false;
		let l:number=this._activityIconList.length;
		if(l>0)
		{
			let isdelete:boolean=false;
			for(let i:number=l-1;i>=0;i--)
			{
				isdelete = false
				let icon:BaseDisplayObjectContainer=this._activityIconList[i];
				let name:string=icon.name;
				let [aid,code]=name.split("-");
				let aidArr:string[]=Config.IconorderCfg.getAidListByCfgName(aid);
				if(aidArr&&aidArr.length>0)
				{
					let needCheckId:string[]=aidArr;
					//组合中任一活动处于开启状态，则不能移除
					for(let ii:number=0;ii<needCheckId.length;ii++)
					{
						let tmpAid = needCheckId[ii];
						if(Api.acVoApi.getActivityVoByAidAndCode(tmpAid,code))
						{
							if(!Api.acVoApi.checkActivityStartByAid(tmpAid,code))
							{
								isdelete = true;
							}else{
								isdelete=false;
								break;
							}
						}
					}
				}else{
					if(Api.acVoApi.getActivityVoByAidAndCode(aid,code) && !Api.acVoApi.checkActivityStartByAid(aid,code))
					{
						isdelete = true;
					}
				}
				
				if(isdelete)
				{
					icon.dispose();
					this._activityIconList.splice(i,1);
					delete this._iconNameList[icon.name];
					isSort = true;
				}

				this.setIconTime(icon);
			}
			if(isSort||(this._lastL!=l))
			{
				this.sortIcons();
				this.setIconsPos();
			}
		}
		this._lastL=this._activityIconList.length;
		
	}
	private setIconTime(icon)
	{
		// egret.log(icon.name)
		if(icon.name == "newcharge_func" || icon.name == "JD618_func"){
			let lt = 0;
			let timeStr = "";
			if(icon.name == "newcharge_func"){
				lt = Api.shopVoApi.getPayInfo1Time();
				timeStr = App.DateUtil.getFormatBySecond(lt,1);
			}else if(icon.name == "JD618_func")
			{
				timeStr = Api.otherInfoVoApi.getJD618ActivetyTimeStr();
				if(timeStr == "")
				{
					return;
				}
			}

			if(icon.getChildByName("time")){
				let textTxt = <BaseTextField>icon.getChildByName("time");
				textTxt.text = timeStr;
				textTxt.anchorOffsetX = textTxt.width/2;
			}else{
				let timeBg = BaseBitmap.create("public_9_bg15"); 
				timeBg.width = 160;
				timeBg.anchorOffsetX = timeBg.width/2;
				timeBg.x = icon.width/2;
				timeBg.y = 32;
				timeBg.setScale(0.5)
				icon.addChild(timeBg)
				let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_WARN_GREEN);
				timeTF.anchorOffsetX = timeTF.width/2;
				timeTF.x = icon.width/2;
				timeTF.y = 34;
				timeTF.name = "time"
				icon.addChild(timeTF)
			}
		}
	}
	//12元礼包
	private check12BoxIcon()
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag > 0 && Api.switchVoApi.checkOpenNewCharge())
		{
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			if(rechargeItemCfg)
			{
				let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
				let itemVo2 = Api.shopVoApi.getPayInfoById2("g10");
				if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime > GameData.serverTime ){
					// egret.log(itemVo1.st + rechargeItemCfg.lastTime - 3000 - GameData.serverTime)
				// if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime - 3000 > GameData.serverTime ){
					this.createMainUIIcon("newcharge");
				}
				else{
					this.removeMainUIIcon("newcharge");
				}
			}
			else{
				this.removeMainUIIcon("newcharge");
			}
		}
		else{
			this.removeMainUIIcon("newcharge");
		}
	}
	
	//京东618礼包
	private checkJD618BoxIcon()
	{
		if(Api.otherInfoVoApi.isJDActiveIconVisible())
		{
			this.createMainUIIcon("JD618");
		}
		else{
			this.removeMainUIIcon("JD618");
		}
	}
	// 腾讯视频入口引导
	private initQqvideoguideIcon()
	{
		if (PlatformManager.getIsWanbaQQLive()) {
			this.createMainUIIcon("qqvideoguide");
			this.createMainUIIcon("qqvideoquestionnaire");
		}
	}
	private initIconsAndCheckStatus():void
	{		

		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		this.initIcons();
		this.setPosAndCheckState();
		//此方法禁止单独添加icon
	}	

	private initIcons():void
	{
		this.initFQStrategyIcon()
		this.initVipIcon();
		this.initRebateIcon();
		this.initRealnameIcon();
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		let acIconList=Api.acVoApi.getAllActivityIcons();
		let l:number=acIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=acIconList[i];
			this._iconNameList[icon.name.split("_")[0]]=icon;
			this._iconContainer.addChild(icon);
			this._activityIconList.push(icon);
		}
		this.initFuliIcons();
		this.checkWanBaIcon();
		this.initCardIcons();
		this.check12BoxIcon();
		// this.checkRankActiveIcon();

		this.checkCandyIcon();
		this.initAndCheckAttentionIcon();
		this.initDownloadIcon();
		this.initInviteIcon();
		this.initZhubowanghongIcon();
		this.initCoverIcon();
		this.initBindIcon();

		this.checkJD618BoxIcon()//检测京东618,只需京东渠道检测吧;
		this.initQqvideoguideIcon()//腾讯视频，入口引导


	}

	private setPosAndCheckState():void
	{
		this.sortIcons();
		this.setIconsPos();
		this.checkActivityIconState();
	}

	private sortIcons():void
	{
		this._activityIconList.sort((a:BaseDisplayObjectContainer,b:BaseDisplayObjectContainer)=>{
			let nameA:string=a.name;
			if(nameA)
			{
				if(nameA.indexOf("_")>-1)
				{
					nameA=nameA.split("_")[0];
				}
				if(nameA.indexOf("-")>-1)
				{
					nameA=nameA.split("-")[0];
				}
			}
			let nameB:string=b.name;
			if(nameB)
			{
				if(nameB.indexOf("_")>-1)
				{
					nameB=nameB.split("_")[0];
				}
				if(nameB.indexOf("-")>-1)
				{
					nameB=nameB.split("-")[0];
				}
			}
			let sortIdA=Config.IconorderCfg.getIconSortIdByCfgName(nameA);
			let sortIdB=Config.IconorderCfg.getIconSortIdByCfgName(nameB);
			return sortIdA-sortIdB;
		});
	}
 
	private showNewActivityIcons():void
	{		
		let acIconList=Api.acVoApi.getAllActivityIcons();
		let l:number=acIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=acIconList[i];
			this._iconNameList[icon.name.split("_")[0]]=icon;
			this._iconContainer.addChild(icon);
			this._activityIconList.push(icon);
		}
		this.sortIcons();
	}

	private checkRankActiveIcon()
	{
		if(Api.acVoApi.getRanActives().length>0){
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("rankActive")
		}
		else{
			this.removeMainUIIcon("rankActive")
			}
	}

	private initAndCheckAttentionIcon():void
	{

		
		if(PlatformManager.isSupportAttention()&& !PlatformManager.checkAttention() &&!Api.otherInfoVoApi.getFkFocusInfo() ) //
		{
			// if(!App.MessageHelper.hasEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON))
			// {
			// 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
			// }
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("attention");
		}
		else
		{
			if(PlatformManager.isSupportAttention()&&!Api.otherInfoVoApi.getFkFocusInfo()){
				let icon:BaseDisplayObjectContainer = this.createMainUIIcon("attention");
				if(!Api.otherInfoVoApi.getFkFocusInfo()){
					App.CommonUtil.addIconToBDOC(icon);
				}
				else{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
			else{
				this.removeMainUIIcon("attention");
			}
			// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
			
		}
	}
	/**
	 * 初始化F&Q新手引导 
	 */
	private initFQStrategyIcon()
	{
		let fqSwitch = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
		let fqContainer = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("fqStrategy_func");
		if(fqSwitch == "OFF")
		{
			if( fqContainer != null)
			{
				this.removeMainUIIcon("fqStrategy");
			}
		}
		else
		{
			this.createMainUIIcon("fqStrategy");
			
		}
		
	}
	private initVipIcon():void
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		this.createMainUIIcon("rechargeVip");
	}
	//福利－1.5倍
	private initRebateIcon():void
	{
		if(Api.switchVoApi.checkOpenRechargeRebate())
		{ 
			this.createMainUIIcon("rebate");
		}
		else if(Api.switchVoApi.checkOpenRechargeRebate2())
		{
			this.createMainUIIcon("rebate2");
		}
		else 
		{
			return;
		}
	 
	
	}
	//实名认证
	private initRealnameIcon():void
	{
		if(!Api.switchVoApi.checkOpenCertification()||Api.otherInfoVoApi.certification())
		{
			return;
		}
		else
		{
			RSDKHelper.checkRealname((result)=>{
			if(result)
			{
				this.createMainUIIcon("realname");
			} 
		 }) 
		}  
	}
	private initCardIcons()
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		// if (Api.switchVoApi.checkTWShenhe()) {
		// 	return;
		// }
		if (PlatformManager.checkIsShenHeYiWan()) {
			return;
		}

		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if(!isBuyMonthCard){
			this.createMainUIIcon("monthcard");
		}
		if(isBuyMonthCard && !isBuyYearCard)

		{
			this.createMainUIIcon("yearcard");
		}		
	}
	//签到
	private initSignIcons():void
	{
		this.checkSignIcons();
		this.cheackSignRedDot();
	}

	private checkSignIcons():void
	{ 
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		if(totalSignDay>=8)
		{
			if(Api.arrivalVoApi.getIsAugustsignin())
			{
				this.removeMainUIIcon("sign7");
				this.createMainUIIcon("augustsign");
			}
			return
		}
		if(totalSignDay<=7)
		{
			let flag2 = Api.arrivalVoApi.checkFlagByIndex(2);
			let flag3 = Api.arrivalVoApi.checkFlagByIndex(3);
			let flag7 = Api.arrivalVoApi.checkFlagByIndex(7);
			if(totalSignDay<=2&&flag2!=1)
			{
				this.createMainUIIcon("sign2");
				this._signName="sign2";
				return 
			}
			else if(totalSignDay<=3&&flag3!=1)
			{
				this.removeMainUIIcon("sign2");
				this.createMainUIIcon("sign3");
				this._signName="sign3";
				this.setIconsPos();
				return 
			}
			else if(totalSignDay<=7&&flag7!=1)
			{
				this.removeMainUIIcon("sign3");
				this.createMainUIIcon("sign7");
				this._signName="sign7";
				this.setIconsPos();
				return 
			}
			else
			{	
				this.removeMainUIIcon("sign7");	
			}
		}
		else
		{
			this.removeMainUIIcon("sign7");	
		}
		 
	}
	private cheackSignRedDot():void
	{
		let signIcon = this.getTopBtnByName(this._signName);
		if(signIcon)
		{
			var boo =Api.arrivalVoApi.isShowRedDot;
			if(boo)
			{
				App.CommonUtil.addIconToBDOC(signIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(signIcon);
			}
		} 
	}

	private checkCardIcon()
	{
		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if(isBuyMonthCard){
			this.removeMainUIIcon("monthcard");
		}
		if(isBuyYearCard)

		{
			this.removeMainUIIcon("yearcard");
		}	
	}
	private checkWanBaIcon():void
	{
		if(Api.otherInfoVoApi.checkShowWanbaDesktopIcon())
		{
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("desktop");
			App.CommonUtil.addIconToBDOC(icon);
		}
		else
		{
			this.removeMainUIIcon("desktop");
		}
		let shareVo = Api.otherInfoVoApi.getGeneralShareInfo();
		if(Api.otherInfoVoApi.checkShowWanbaShareIcon() &&						
		 Api.switchVoApi.checkTWShenhe() == false && 					//不是港台审核
		 (!PlatformManager.checkIsThSp()) &&
		 shareVo &&
		 (shareVo.sharenum < Config.GameprojectCfg.rewardAllNum ) //分享次数小于总次数才会显示 等于总次数的时候消失
		 
		 ) 
		{
			this.createMainUIIcon("share");
			// let icon:BaseDisplayObjectContainer = this.createMainUIIcon("share");
			// // App.CommonUtil.addIconToBDOC(icon);
			// if(PlatformManager.checkIsFkylcSp())
			// {
				
			// 	if(Api.otherInfoVoApi.getFkIsshowRed()){
			// 		App.CommonUtil.addIconToBDOC(icon);
			// 	}
			// 	else{
			// 		App.CommonUtil.removeIconFromBDOC(icon);
			// 	}
				
			// }
		}
		else
		{
			this.removeMainUIIcon("share");
		}
		
		this.initAndCheckAttentionIcon(); 
		this.checkRealnameIcon2();
	}

	private  createRealnameRedHot():void
	{
		let icon = this.getTopBtnByName("realname");  
		App.CommonUtil.addIconToBDOC(icon); 
		this.checkRealnameIcon2();
	}

	private checkRealnameIcon2():void
	{
		let icon = this.getTopBtnByName("realname");  
		if(icon)
		{ 
			if(Api.otherInfoVoApi.certification())
			{	 
				App.CommonUtil.removeIconFromBDOC(icon);  
			} 
		}  
	}

	private checkCandyIcon():void
	{
		if(Api.otherInfoVoApi.getCandyGetInfo()&&PlatformManager.getCandyFlag())
		{
			this.createMainUIIcon("candyget");
		}	
	}
	// 微端下载
	private initDownloadIcon():void
	{
		if ((PlatformManager.checkIsTWBSp() && Api.gameinfoVoApi.getDownType() === "pc") 
			|| (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")) 
			{
			this.createMainUIIcon("download");
		} 
	}
	// 邀请有礼图标
	private initInviteIcon():void
	{
		if (Api.switchVoApi.checkOpenInvite()) {
			this.createMainUIIcon("invite");
		}
	}
	// 主播网红图标
	private initZhubowanghongIcon():void
	{
		if (PlatformManager.checkIsTWBSp()) {
			if (GameData.serverTime * 1000 < new Date("2018/04/14").getTime()) {
				if (Api.wifeVoApi.getWifeInfoVoById(212) === null) {
					this.createMainUIIcon("zhubowanghong");
				}
			}
		}
	}
	private initCoverIcon():void
	{
		if (PlatformManager.checkIsWanbaSp() && (!PlatformManager.getIsWanbaQQLive()) && Api.switchVoApi.checkOpenCover() && Api.otherInfoVoApi.getCoverState() !== 2) {
			this.createMainUIIcon("cover");
		} else {
			this.removeMainUIIcon("cover");
		}
	}

	// 绑定有礼图标
	private initBindIcon():void
	{
		if (Api.switchVoApi.checkOpenFbBind() 
			&& Api.otherInfoVoApi.getFBBindFlag() != 1
			&& PlatformManager.checkIsTWBSp() 
			&& PlatformManager.checkIsWeiduan() 
			&&  (
				(App.CommonUtil.compareVersion("3.0", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isIOS()) 
				||
				(App.CommonUtil.compareVersion("1.6", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isAndroid())
				)
			) {
			this.createMainUIIcon("bind");
		} else {
			this.removeMainUIIcon("bind");
		}
	}
	private initFuliIcons():void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	
	
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		this.createMainUIIcon("welfare");
		this.checkFirstRechargeIcon();
		this.checkWelfareState();
		this.checkVipState();
		this.initSignIcons();
		this.checkThanksg(); 
		this.checkWanbaQQbi(); 
		this.checkWywEgameqq();
	}
	//玩一玩 推广资源互换
	private checkWywEgameqq()
	{
		// this.createMainUIIcon("wywegameqq");
		if(PlatformManager.checkIsLmSp())
		{
			this.createMainUIIcon("wywegameqq");
		}
		

	}
	private checkWanbaQQbi()
	{
		if(PlatformManager.checkIsWanbaSp()&& GameData.serverTime < 1529337599)
		{
			this.createMainUIIcon("shareqq");
		}
		else
		{
			this.removeMainUIIcon("shareqq");
		}
	}
	private checkThanksg():void
	{
		this.createMainUIIcon("thanksgiving");
		let thanksIcon = this.getTopBtnByName("thanksgiving");
		let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();
		if(thanksIcon)
		{
			if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true)
			{
				this.createMainUIIcon("thanksgiving");
			}
			else
			{
				this.removeMainUIIcon("thanksgiving");
			}
		}
	}
	private checkVipState():void
	{
		let vipIcon = this.getTopBtnByName("rechargeVip");
		if(vipIcon)
		{
			var boo  =Api.vipVoApi.checkRedPoint();
			if(boo)
			{
			 
				App.CommonUtil.addIconToBDOC(vipIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(vipIcon);
			}
		}
	}

	private createMainUIIcon(modelName:string):BaseDisplayObjectContainer
	{
		if(!this._iconNameList[modelName])
		{
			let isShow = false;
			if(modelName == "welfare" || modelName == "rechargeVip" || modelName == "firstrecharge"
				|| modelName == "monthcard"|| modelName == "yearcard"||modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="rebate"||modelName=="realname"||modelName=="rebate2"||modelName=="qqvideoguide" ||modelName=="qqvideoquestionnaire"
				|| modelName == "fqStrategy"
			)
			{
				isShow = true;
			}
			else
			{
				isShow=Config.IconorderCfg.getisFlickByName(modelName);
			}
			let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(modelName.toLowerCase()+"_icon",modelName.toLowerCase()+"_icon_name",isShow);
			iconContainer.name=modelName+"_func";
			this._iconNameList[modelName]=iconContainer;
			iconContainer.addTouchTap(()=>{

					//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}
				
				if(modelName == "JD618")
				{
					let urlPath = "https://pro.m.jd.com/mall/active/3pdMhNYRFMUo7hMQkzobm8oLf8x4/index.html";
          			window.open(urlPath,"_self");
					return;
				}
				if(modelName=="shareqq")
				{
					RSDKHelper.openUrl("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780",null,null)
					// window.open("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780");
				}
				if(modelName == "wywegameqq"){
					//企鹅电竞
					//玩一玩推广资源互换 sdk没有openlink
					NetManager.request(NetRequestConst.REQUEST_STATS_CLICKWYWICON, {});
					let urlPath = "http://cmshow.qq.com/apollo/html/game-platform/scan-game.html?gameId=101477809";
					window.open(urlPath,"_self");
					return;
				}
				if(modelName == "qqvideoquestionnaire"){
					//腾讯视频问卷
					let urlPath = "https://wj.qq.com/s/2265517/9ae5";
					window.open(urlPath,"_self");
					return;
				}
				
				let viewName:string=App.StringUtil.firstCharToUper(modelName)+"View";
				let popupViewName:string=App.StringUtil.firstCharToUper(modelName)+"PopupView";
				if(egret.hasDefinition(viewName)==false&&egret.hasDefinition(popupViewName))
				{
					viewName=popupViewName;
				}
				if(modelName=="rechargeVip")
				{
					viewName+="|1";
				}
				else if(modelName=="firstrecharge")
				{
					if(Api.switchVoApi.checkWeChatFirstcharge())
					{
					 	viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					}
					else
					{
					 	viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					} 
				}
				else if(modelName=="monthcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWMONTHCARD;
				}
				else if(modelName=="yearcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWYEARCARD;
				}
				else if(modelName=="candyget")
				{
					viewName=ViewConst.POPUP.CANDYGETPOPUPVIEW;
				}
				else if(modelName=="newcharge")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
				}
				else if(modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="augustsign")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWSIGNIN;
				}
				else if(modelName=="rebate")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE;
				}
				else if(modelName=="rebate2")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE2;
				}
				else if(modelName == "fqStrategy")
				{
					viewName = ViewConst.COMMON.FQSTRATEGYVIEW;
				}
				ViewController.getInstance().openView(viewName);
				// window.open("https://www.baidu.com");
			},this);
			this._activityIconList.push(iconContainer);
			this._iconContainer.addChild(iconContainer);
			if(Api.switchVoApi.checkClosePay())
			{
				iconContainer.visible=false;
			}
			this.sortIcons();
			return iconContainer;
		}
		else
		{
			return this._iconNameList[modelName];
		}
	}

	private removeMainUIIcon(modelName:string):void
	{
		let l:number=this._activityIconList.length;
		for(let i:number=l-1;i>=0;i--)
		{
			if(this._activityIconList[i].name&&this._activityIconList[i].name.split("_")[0]==modelName)
			{
				this._activityIconList[i].dispose();
				this._activityIconList.splice(i,1);
				this.setIconsPos();
				break;
			}
		}
		if(this._iconNameList[modelName])
		{
			delete this._iconNameList[modelName];
		}
	}

	private setIconsPos():void
	{
		if (Api.switchVoApi.checkTWShenhe() == true) {
			for (let k in this._activityIconList) {
				let v:BaseDisplayObjectContainer = this._activityIconList[k];
				if (v.name == "welfare_func") {
					v.setPosition(30+v.width/2,v.height/2);
				}
				else {
					v.visible = false;
				}
			}
			return;
		}
 		let l=this._activityIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			icon.visible =true;
			icon.setPosition(30+(icon.width+30)*(i%6)+icon.width/2,Math.floor(i/6)*(icon.height+10)+icon.height/2);
			if(PlatformManager.checkIsThSp())
			{
				icon.setPosition(30+(icon.width+30)*(i%6)+icon.width/2,Math.floor(i/6)*(icon.height+20)+icon.height/2);
			}
		}
	}

	protected doRefreshTaskInfo()
	{
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			this._taskContainer.visible = true;
			// this._settingAndMailContainer.y = 70;
			let taskid = Api.dailytaskVoApi.getTaskIdForMainTaskUI();
			this._taskTxt.text =  LanguageManager.getlocal("dailyTaskName"+ taskid);
			let curStatus:number = Api.dailytaskVoApi.getTaskStatusByTaskId(taskid)
			if( curStatus == 2)
			{
				this._taskContainer.visible = false;
				this._settingAndMailContainer.y = 70;
				return;
			}else if( curStatus == 1)
			{
				this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
				this._missionIcon.x = 25;
			}else
			{
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
				this._missionIcon.x = 35
				this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
			}
			if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
				if(!this._taskContainer.getChildByName("taskeffect")){
					let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
					upgradeClip.x = 5;
					upgradeClip.y = -221;
					upgradeClip.name = "taskeffect";
					// let index = this._missionIcon.
					this._taskContainer.addChildAt(upgradeClip,1);
					upgradeClip.playWithTime(0);

					if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=10){
						let clickHand = BaseBitmap.create("studyatk_arrow");
						clickHand.rotation = 90;
						clickHand.x = 300;
						clickHand.y = -225;
						clickHand.name = "taskeffect2";
						this._bottomContiner.addChild(clickHand);

						egret.Tween.get(clickHand,{loop:true})
							.to({x:390,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:300 ,scaleX:1.0,scaleY:1.0}, 500)
					}
					
				}
			}else{
				let taskeffect = this._taskContainer.getChildByName("taskeffect");
				let taskeffect2 = this._bottomContiner.getChildByName("taskeffect2")
				if(taskeffect){
					this._taskContainer.removeChild(taskeffect);
				}
				if(taskeffect2){
					this._bottomContiner.removeChild(taskeffect2);
				}
			}
			return;
		}
		this._taskTxt.text =  Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[0];
		if (Api.mainTaskVoApi.isCurTaskReach())
		{
			this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
			this._missionIcon.x = 25;
		}
		else{
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
			this._missionIcon.x = 35
			// egret.Tween.removeTweens(this._missionIcon);
			this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
		}

		if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
			if(!this._taskContainer.getChildByName("taskeffect")){
				let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
				upgradeClip.x = 5;
				upgradeClip.y = -221;
				upgradeClip.name = "taskeffect";
				this._taskContainer.addChildAt(upgradeClip,1);
				upgradeClip.playWithTime(0);

				if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=10){
						let clickHand = BaseBitmap.create("studyatk_arrow");
						clickHand.rotation = 90;
						clickHand.x = 300;
						clickHand.y = -225;
						clickHand.name = "taskeffect2";
						this._bottomContiner.addChild(clickHand);

						egret.Tween.get(clickHand,{loop:true})
							.to({x:350,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:300 ,scaleX:1.0,scaleY:1.0}, 500)
					}
			}
		}else{
			let taskeffect = this._taskContainer.getChildByName("taskeffect");
			let taskeffect2 = this._bottomContiner.getChildByName("taskeffect2")
			if(taskeffect){
				this._taskContainer.removeChild(taskeffect);
			}
			if(taskeffect2){
				this._bottomContiner.removeChild(taskeffect2);
			}
		}
		

	

	}

	protected doRefreshChat()
	{
		if(!this._chatTxt)
		{
			return;
		}
		this._chatTxt.text = Api.chatVoApi.getLastMessage();
		let chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(chatTxt.width >= 480){
			this._chatTxtPoint.visible = true;
		}
		else{
			this._chatTxtPoint.visible = false;
		}
	}

	protected doQuickAlliance()
	{
		NetManager.chatServerLogout(null,null);
		Api.chatVoApi.refreshLastMessage();
		this.doRefreshChat();
	}
	private bottomBtnCfg = [
		{
			id:1,
			btnName:"servant",
			btnIconImg:"mainui_bottomimg1",
			isOPen:true,
		},
		{
			id:2,
			btnName:"item",
			btnIconImg:"mainui_bottomimg2",
			isOPen:true,
		},
		{
			id:3,
			btnName:"dailytask",
			btnIconImg:"mainui_bottomimg3",
			isOPen:true,
		},
		{
			id:4,
			btnName:"achieve",
			btnIconImg:"mainui_bottomimg4",
			isOPen:true,
		},
		{
			id:5,
			btnName:"shop",
			btnIconImg:"mainui_bottomimg5",
			isOPen:true,
		},
		{
			id:6,
			btnName:"welfare",
			btnIconImg:"mainui_bottomimg6",
			isOPen:false,
		},
		{
			id:7,
			btnName:"challenge",
			btnIconImg:"mainui_bottomimg9",
			isOPen:false,
		},
		{
			id:8,
			btnName:"manage",
			btnIconImg:"mainui_bottomimg10",
			isOPen:false,
		},
	];
	private initButtom():void
	{
		this._bottomContiner=new BaseDisplayObjectContainer();
		// this._bottomContiner.alpha = 0;
		//填内容
		this._bottomContiner.setPosition(0,GameConfig.stageHeigth-this._bottomContiner.height);
		this.addChild(this._bottomContiner);
		let result:boolean = App.CommonUtil.formatIphoneXButtom(this._bottomContiner);
		if(result)
		{
			let mark:BaseShape=new BaseShape();
			mark.graphics.beginFill(0x131F2C);
			mark.graphics.drawRect(0,0,GameConfig.stageWidth,50);
			mark.graphics.endFill();
			mark.setPosition(0,GameConfig.stageHeigth-50);
			this.addChildAt(mark,this.getChildIndex(this._bottomContiner));
			mark.cacheAsBitmap=true;
		}

		let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg"));
		bottomBg.x=0;
		bottomBg.y=-bottomBg.height;
		this._bottomContiner.addChild(bottomBg);

		// let goOutBtn =  ComponentManager.getButton("mainui_btn3",null,this.goOutBtnClickHandler,this,null,1) //BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
		let goOutBtn =  BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
		goOutBtn.addTouchTap(this.goOutBtnClickHandler,this);
		goOutBtn.anchorOffsetY = goOutBtn.height/2;
		goOutBtn.anchorOffsetX = goOutBtn.width/2;
		goOutBtn.x = 10+ goOutBtn.width/2;
		goOutBtn.y =  bottomBg.y + bottomBg.height/2-2;
		this._bottomContiner.addChild(goOutBtn);
		this._goOutBtn = goOutBtn;
		egret.Tween.get(goOutBtn, {
            loop: true,//设置循环播放
        }).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360


		let PerWidth = 95;
		let curIdx = 0;
		for (let i = 0; i < this.bottomBtnCfg.length; i++)
		{
			let btncfg = this.bottomBtnCfg[i];
			if (btncfg.isOPen) 
			{
				let imgBtn = ComponentManager.getButton(btncfg.btnIconImg,"",this.bottomBtnClickHandler,this,[btncfg]);
				imgBtn.x = 168 +PerWidth*curIdx ;
				imgBtn.y = -imgBtn.height-15;
				imgBtn.name = btncfg.btnName;
				this._bottomContiner.addChild(imgBtn);
				curIdx +=1 ;
			}
		}
		this.checkAchPoint();
		this.checkAllRedPoint();

		//聊天按钮相关
		let chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		chatbg.width = GameConfig.stageWidth;
		chatbg.height = 35;
		chatbg.x=0;
		chatbg.y= bottomBg.y-chatbg.height-3;
		this._bottomContiner.addChild(chatbg);
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

		this._taskContainer = new BaseDisplayObjectContainer();
		this._taskContainer.x = 0;
		this._taskContainer.y = 0;
		this._bottomContiner.addChild(this._taskContainer);
		
		

		if(!Api.switchVoApi.checkClosePay())
		{
			//功能预览
			let functionPreviewBg = BaseBitmap.create("mainui_functionpreview");
			functionPreviewBg.name = "functionPreviewBg";
			functionPreviewBg.x = 5;
			functionPreviewBg.y = chatbg.y- chatbg.height - functionPreviewBg.height-50;
			this._bottomContiner.addChild(functionPreviewBg);
			this._functionPreviewBg =functionPreviewBg;
			functionPreviewBg.addTouchTap(this.functionClickHandler,this);

			let functionIcon= BaseBitmap.create("mainui_funicon"); 
			functionIcon.x = 18;
			functionIcon.y = functionPreviewBg.y+5;
			this._bottomContiner.addChild(functionIcon);
			this._functionIcon =functionIcon;
		

			var str =Api.otherInfoVoApi.getFunctionName();
			//功能名字
			let _functionTxt = ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			_functionTxt.x =functionPreviewBg.x+75;
			_functionTxt.y =functionPreviewBg.y+15;
			_functionTxt.text = str;
			this._functionTxt =_functionTxt;
			this._bottomContiner.addChild(_functionTxt);
			this.refreshText();
		}



		//task 
		let taskBg = BaseBitmap.create("mainui_taskbg170");
		taskBg.name = "taskBg"
		taskBg.x = 5;
		taskBg.y = chatbg.y- chatbg.height - taskBg.height+30;
		this._taskContainer.addChild(taskBg);
		taskBg.addTouchTap(this.missionBtnClickHandler,this);

		let missionIcon = BaseBitmap.create("mainui_missionIcon1")
		missionIcon.anchorOffsetX = missionIcon.width/2;
		missionIcon.anchorOffsetY = missionIcon.height/2;
		missionIcon.x = taskBg.x+15 + missionIcon.width/2;
		missionIcon.y = taskBg.y + taskBg.height/2;
		this._taskContainer.addChild(missionIcon);
		this._missionIcon = missionIcon;
		egret.Tween.get(this._missionIcon, {
			loop: true,//设置循环播放
		}).to({scaleX:0.8,scaleY:0.8},700).to({scaleX:1,scaleY:1.0},700);//设置2000毫秒内 rotation 属性变为360

		this._taskTxt =  ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._taskTxt.x = missionIcon.x + 45;
		this._taskTxt.y = missionIcon.y - 10 ;
		this._taskContainer.addChild(this._taskTxt);

		//邮件设置
		this._settingAndMailContainer = new BaseDisplayObjectContainer();
		this._settingAndMailContainer.x = 0;
		this._settingAndMailContainer.y = 0;
		this._bottomContiner.addChild(this._settingAndMailContainer);
		let settingButton = ComponentManager.getButton("mainui_bottomimg8","",this.settingBtnClickHandler,this);
		settingButton.x = taskBg.x + 10;
		settingButton.y = taskBg.y - 25 - settingButton.height;
		this._settingAndMailContainer.addChild(settingButton);
		// settingButton.visible=false;

		let settingBg = BaseBitmap.create("mainui_bottombtnbg");
		settingBg.x = settingButton.x+settingButton.width/2-settingBg.width/2;
		settingBg.y = settingButton.y;
		this._settingAndMailContainer.addChildAt(settingBg,0);
		// settingBg.visible=false;

		let mailButton = ComponentManager.getButton("mainui_bottomimg12","",this.mailBtnClickHandler,this);
		mailButton.x = settingButton.x;
		mailButton.y = settingButton.y - settingButton.height - 20;
		this._settingAndMailContainer.addChild(mailButton);
		this._mailButton = mailButton;

		let mailBg = BaseBitmap.create("mainui_bottombtnbg");
		mailBg.x = settingBg.x;
		mailBg.y = mailButton.y;
		this._settingAndMailContainer.addChildAt(mailBg,0);

		//friends
		this._friendsBtn = ComponentManager.getButton("mainui_friends_btn","",this.friendsBtnHandler,this);
		this._friendsBtn.x = GameConfig.stageWidth - this._friendsBtn.width-20;
		this._friendsBtn.y = chatbg.y - this._friendsBtn.height;
		this._friendsBtn.visible = false;
		if(Api.friendVoApi.checkNpcMessage() ){
			this._friendsBtn.visible = true;
		}
		this._bottomContiner.addChild(this._friendsBtn);
		// //微信小游戏联系客服
		// if (App.DeviceUtil.isWXgame()) {
		// 	this._wxgameKefuBtn = ComponentManager.getButton("mainui_wxgamekefu_btn","",this.wxgameKefuBtnHandler,this);
		// 	this._wxgameKefuBtn.y = chatbg.y - this._wxgameKefuBtn.height;
		// 	if(this._friendsBtn.visible){
		// 		this._wxgameKefuBtn.x = this._friendsBtn.x - this._wxgameKefuBtn.width-20;
		// 	} else {
		// 		this._wxgameKefuBtn.x = GameConfig.stageWidth - this._wxgameKefuBtn.width-20;
		// 	}
		// 	this._bottomContiner.addChild(this._wxgameKefuBtn);
		// }
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);

		this.doRefreshTaskInfo();
		this.refreshTaskContainerStatus();
		let public_dot3 = BaseBitmap.create("public_dot2");
		this._bottomContiner.addChild(public_dot3);
		public_dot3.visible = false;
        this.setLayoutPosition(LayoutConst.righttop, public_dot3, chatIcon, [0,-20]);
		this._redPoint = public_dot3; 
		Api.chatVoApi.clearPriChatList();
		NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
			isall : 1
		});


		if(App.DeviceUtil.isWXgame())
		{
			PlatformManager.getWXMoreGameIcon(this.createMoreGameBtn,this);
		}
	}

	private createMoreGameBtn(msg:any)
	{
		// alert(msg);
		console.log("msg"+msg); 
		this._wxMoreGameIcon = BaseLoadBitmap.create(msg);	
		this._wxMoreGameIcon.x = GameConfig.stageWidth - 100;
		this._wxMoreGameIcon.y = 200;
		this.addChild(this._wxMoreGameIcon);
		this._wxMoreGameIcon.touchEnabled = true;
		this._wxMoreGameIcon.addTouchTap(this.showMoreGame,this);
		this._wxMoreGameIcon.visible = false;
	}
	private showMoreGame()
	{
		if(App.DeviceUtil.isWXgame())
		{
			PlatformManager.showWXMoreGame();
		}
	}
	private checkIsRefresh():void
	{
		if(Api.otherInfoVoApi.getFunctionRedhot())
		{
			this.refreshText(); 
		}
	}

	private refreshText():void
	{

		if(this._functionTxt)
		{
			if(Api.otherInfoVoApi.getFunctionName()==null)
			{
				this._bottomContiner.removeChild(this._functionPreviewBg);
				this._bottomContiner.removeChild(this._functionTxt);
				this._bottomContiner.removeChild(this._functionIcon);
				if(this._functionAni){
					this._bottomContiner.removeChild(this._functionAni);
					this._functionAni = null;
				}
			}
			else
			{
				this._functionTxt.text  =  Api.otherInfoVoApi.getFunctionName();
				if(Api.otherInfoVoApi.getFunctionRedhot())
				{
					this._functionTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
				}
				else
				{
					this._functionTxt.textColor =TextFieldConst.COLOR_WHITE;	
				}

				if(Api.otherInfoVoApi.getFunctionRedhot()){
					if(!this._functionAni){
						this._functionAni = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
						this._functionAni.x = 5;
						this._functionAni.y = -303;
						this._functionAni.name = "taskeffect";
						this._bottomContiner.addChild(this._functionAni);
						this._functionAni.playWithTime(0);

						if (!this._isAtHome)
						{
							this._functionAni.visible = false;
						}
					}
				}else{
					if(this._functionAni){
						this._bottomContiner.removeChild(this._functionAni);
						this._functionAni = null;
					}
				}
			}
			let welfareIcon = this.getTopBtnByName("welfare");
			if(welfareIcon)
			{
				let firstRechargeflag = Api.shopVoApi.getPayFlag();
				let signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
				let functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
				if(firstRechargeflag == 1 || signinShowRedDot == true||functionPreViewRedDot==true)
				{
					App.CommonUtil.addIconToBDOC(welfareIcon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(welfareIcon);
				}
			}
		}
	}

	protected refreshTaskContainerStatus():void
	{
		if (this._isAtHome)
		{
			this._iconContainer.visible=true;
			this._settingAndMailContainer.visible = false
			if (Api.switchVoApi.checkTWShenhe() == true) {
				// this._iconContainer.visible = false;
				for (let k in this._activityIconList) {
					let v:BaseDisplayObjectContainer = this._activityIconList[k];
					if (v.name == "welfare_func") {
						v.setPosition(30+v.width/2,v.height/2);
					}
					else {
						v.visible = false;
					}
				}
			}
			// this._taskContainer.visible = true;
		}else
		{
			this._iconContainer.visible=false;
			this._settingAndMailContainer.visible = true
			// this._taskContainer.visible = false;
		}
	}
	protected roleHeadClickHandler():void
	{
		PlayerBottomUI.getInstance().show();
	}
	private functionClickHandler():void
	{
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWFUNCTIONPREVIEW);
	}

	protected mailBtnClickHandler():void
	{
		// NetManager.request(NetRequestConst.REQUEST_MAIL_GET_MYMAILLIST,null);
		ViewController.getInstance().openView(ViewConst.POPUP.MAILPOPUPVIEW);
	}
	protected settingBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingPopopView, {});
	}
	protected missionBtnClickHandler():void
	{
		/**
		 * 跳转每日任务
		 */
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
	}
	protected chatBgClickHandler():void
	{	
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}
		// App.LogUtil.log("chatBgClickHandler >>>>> ");
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
	}
	protected addGoldBtnClickHandler():void
	{

	}

	private doDinnerGuide()
	{
		if(this._isAtHome){
			this.goOutBtnClickHandler();
		}
	}
	protected goOutBtnClickHandler():void
	{
		this._isAtHome = !this._isAtHome; //修改状态
		if (this._isAtHome)
		{
			if(!Api.chatVoApi.getIsReadCross()){
				Api.chatVoApi.setIsReadCross(true);
			}
			this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
			if(this._empBtn){
				this._empContainer.visible = true;
			}
			else{
				let api = Api.emperorwarVoApi;
				if(api.isInShow()){
					this.checkEmpBtn();
				}
			}
			if(this._functionPreviewBg)
			{
				this._functionPreviewBg.visible=true;
				this._functionTxt.visible=true;
				this._functionIcon.visible=true;
				if(this._functionAni)
				{
					this._functionAni.visible = true;
				}
			}
			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = false;
			}
			if(this._friendsBtn && Api.friendVoApi.checkNpcMessage() ){
				this._friendsBtn.visible = true;
			}
			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = false;
			}
			
		}else{
			if(this._functionPreviewBg)
			{
				this._functionPreviewBg.visible=false;
				this._functionTxt.visible=false;
				this._functionIcon.visible=false;
				if(this._functionAni)
				{
					this._functionAni.visible = false;
				}
			}
			this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3_1");

			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = true;
			}
			if(this._empBtn){
				this._empContainer.visible = false;
			}
			if(this._friendsBtn){
				this._friendsBtn.visible = false;
			}
			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = true;
			}
		}
		
		this.refreshTaskContainerStatus();
		SceneController.getInstance().jump();
		Api.rookieVoApi.checkNextStep();
		
		//test code
		// Api.rookieVoApi.curGuideKey = "search";
		// Api.rookieVoApi.insertWaitingGuide({"idx":"search_1"},true);

		Api.rookieVoApi.checkWaitingGuide();
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
			case "servant":
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
				
				break;
			case "item":
				ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB1);
				//测试获得门客或者红颜出对话框功能
				// ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1036","1036"]);
				// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:["306","306"]});
				break;
			case "dailytask":
				ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
				break;
			case "achieve":
				// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
				ViewController.getInstance().openView(ViewConst.COMMON.ACHIEVEMENTVIEW);
				// ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW);
				// ViewController.getInstance().openView(ViewConst.POPUP.CANDYGETPOPUPVIEW);
			
				//成就功能有了。用其他按钮吧 ~
				break;
			case "shop": 
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
					// Api.rookieVoApi.isInGuiding = true;
				// ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"111",f:null,o:this});
				break;
			case "welfare":
				App.LogUtil.log("welfareCkick >>>> " );
				break;
			case "challenge":
				ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
				break;
			case "manage":
				ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
				break;
			default:
				break;
		}
	}
	
	protected getResourceList():string[]
	{
		let arr = ["mainui_btn1","mainui_fg",
		"mainui_taskbg170",
		"mainui_bottombg","mainui_missionIcon1","mainui_missionIcon2",
		"mainui_bottomimg1",
		"mainui_bottomimg2",
		"mainui_bottomimg3",
		"mainui_bottomimg4",
		"mainui_bottomimg5",
		"mainui_bottomimg8",
		"mainui_bottomimg12",
		"mainui_bottombtnbg",
		"mainui_chatbg",
		"mainui_chatIcon",
		"mainui_btn3",
		"mainui_avatarFlower",
		"mainui_headbg",
		"mainui_btn3_1",
		"mainui_iconani",
		"mainui_functionpreview",
		"mainui_funicon",
		"taskeffect",
		"studyatk_arrow",
		"mainui_bubble",
		"mainui_friends_btn","mainui_friends_btn_down",
		"mainui_wxgamekefu_btn","mainui_wxgamekefu_btn_down",];
		if(Api.switchVoApi.checkEmperorOpen()==true )
		{	
			let api = Api.emperorwarVoApi;
			if (api.getVersion() > 0 && api.isInShow())//
			{	
				arr = arr.concat(["empBtnname","empBtnBg","empcircle","emplight","emptitlecircle","empturncircle","empbtn"]);
			}	
		}
		return arr;
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.uiLayer;
	}

	/**
	 * 根据名称获取按钮
	 * @param name 
	 */
	private getTopBtnByName(name:string):BaseDisplayObjectContainer
	{
		let l=this._activityIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			if(icon && icon.name &&icon.name.split("_")[0] == name)
			{
				return icon;
			}
		}
		return null;
	}

	private checkFirstRechargeIcon():void
	{
		if(Api.shopVoApi.getPayFlag()==2)
		{
			this.removeMainUIIcon("firstrecharge");
		}
		else
		{
			let icon = this.createMainUIIcon("firstrecharge");
			if(Api.shopVoApi.getPayFlag()==1)
			{
				App.CommonUtil.addIconToBDOC(icon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(icon);
			}
		}
	}

	/**
	 * 检测福利红点
	 */
	private checkWelfareState():void
	{
		let welfareIcon = this.getTopBtnByName("welfare");
		if(welfareIcon)
		{
			let firstRechargeflag = Api.shopVoApi.getPayFlag();
			let signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
			let functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
			if(firstRechargeflag == 1 || signinShowRedDot == true||functionPreViewRedDot==true)
			{
				App.CommonUtil.addIconToBDOC(welfareIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(welfareIcon);
			}
		}
		this.checkFirstRechargeIcon();
		this.checkCardIcon();
		this.initCardIcons();  

		this.checkSignState();
	}
	private checkSignState():void
	{
		this.initSignIcons(); 
	}
	/**
	 * 检查活动icon红点
	 */
	private checkActivityIconState():void
	{
		let l=this._activityIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			if(icon.name&&icon.name.split("_")[1]=="func")
			{
				continue;
			}
			if(icon && icon.name!="welfare")
			{
				let name = icon.name;
				let aid:string = "";
				let code:string = "";
				aid = name.split("-")[0];
				code = name.split("-")[1];
				let isShowRedDot:boolean;
				let aidArr:string[]=Config.IconorderCfg.getAidListByCfgName(aid);
				if(aidArr&&aidArr.length>0)
				{
					let needCheckId:string[]=aidArr;
					for(let ii:number=0;ii<needCheckId.length;ii++)
					{
						if(!isShowRedDot)
						{
							isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii],null);
						}
					}
				}
				else
				{
					isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
				}

				// if(aid=="carnival")
				// {
				// 	let needCheckId:string[]=["carnivalCharge","carnivalCost"];
				// 	for(let ii:number=0;ii<needCheckId.length;ii++)
				// 	{
				// 		if(!isShowRedDot)
				// 		{
				// 			isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii],null);
				// 		}
				// 	}
				// }
				// else
				// {
				// 	isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
				// }



				if(isShowRedDot == true)
				{
					App.CommonUtil.addIconToBDOC(icon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
		}
	}


	/**
	 * 检测邮件红点
	 */
	private checkMailState():void
	{
		if(Api.mailVoApi.getUnreadNum() > 0)
		{
			// if(this._mailButton)
			// {
			// 	this._mailButton.showStatusIcon("public_dot2");
			// }
			// if(this._mailRedDotSp == null && this._mailButton)
			// {
			// 	this._mailRedDotSp = BaseBitmap.create("public_dot2");
			// 	this._mailRedDotSp.x = this._mailButton.x + this._mailButton.width - this._mailRedDotSp.width + 5;
			// 	this._mailRedDotSp.y = this._mailButton.y - 3;
			// 	this._settingAndMailContainer.addChild(this._mailRedDotSp);
			// }
			// else
			// {
			// 	if(this._mailRedDotSp)
			// 	{
			// 		this._mailRedDotSp.visible = true;
			// 	}
			// }

			App.CommonUtil.addIconToBDOC(this._mailButton);
		}
		else
		{
			// if(this._mailButton)
			// {
			// 	this._mailButton.removeStatusIcon();
			// }
			// if(this._mailRedDotSp)
			// {
			// 	this._mailRedDotSp.visible = false;
			// }
			App.CommonUtil.removeIconFromBDOC(this._mailButton);
		}
	}
	
	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEG_SWITCH,this.initFQStrategyIcon,this);

		TimerManager.remove(this.checkEmpBtn,this);
	 	App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreshText,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	
	    App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.checkIsRefresh,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END,this.rookieGuideEndCheck,this);
		if(this._empBtn){
			this.disposeEmpBtn();
		}
		TickManager.removeTick(this.tick,this);
		//添加需要释放的内容
		this._topContiner = null;
		this._bottomContiner = null;
		this._settingAndMailContainer= null;

		this._goOutBtn= null;
		this._mailButton= null;
		this._settingButton= null;
		this._taskContainer= null;
		
		this._isAtHome= false;

		this._chatTxt= null;
		this._taskTxt= null;
		this._lampRoll = null;
		this._mailRedDotSp = null;
		this._achRedDotSp = null;
		this._activityIconList.length=0;
		this._iconNameList={};
		this._functionPreviewBg  =null;
		this._signName =null;
		this._functionIcon =null;
		this._functionAni = null;
		this._lastL=0;
		this._tuyouBackToLobby = null;
		this._empBtn= null;
		this._friendsBtn = null;
		// this._wxgameKefuBtn = null;
		this._wxMoreGameIcon = null;
		super.dispose();
	}

	private static _instance:MainUI;
	public static getInstance():MainUI
	{
		if(!MainUI._instance)
		{
			MainUI._instance=new MainUI();
		}
		return MainUI._instance;
	}
}
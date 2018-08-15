/**
 * 红颜册封
 * author dky
 * date 2018/4/24
 * @class WifestatusView
 */
class WifestatusView extends CommonView
{

	// 滑动列表
	private _scrollList:ScrollList;

	// 随机传唤按钮
	private _callBtn:BaseButton
	// 恢复精力按钮
	private _recoverBtn:BaseButton

	// private _selectWifeId:number;

	private _rewardData:any;

	//服务器随机宠幸返回数据
	private _loveData:any;
	public static currNum:number =0;

	public static wifeId;
	public static wifeLevel;
	public static isMoveing = false;
	public static unlockLevel:string ;//触发解锁特效

	private _addTF:BaseTextField;
	private _scoreTF:BaseTextField;
	private _oldStar:number;

	private _redDotSp:BaseBitmap = null;

	public constructor() 
	{
		super();
	}
	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE,this.showUnlockAni,this);
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
		// this.playEffect(SoundConst.EFFECT_WIFE,true);
		Api.rookieVoApi.checkNextStep();

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESTATUS_STATE,this.callWifeCallback,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS,this.checkRedPoint,this);
		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		//黑色长条
		// let bgBlackBar:BaseBitmap=BaseBitmap.create("public_9_viewmask");
		// bgBlackBar.width =640;
		// bgBlackBar.height =30;
		// bgBlackBar.setPosition(0,-7);
		// this.addChildToContainer(bgBlackBar);

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth-10;
		bottomBg.height = GameConfig.stageHeigth - 186;
		bottomBg.x = 5;
		bottomBg.y = -7;
		this.addChildToContainer(bottomBg);

		let addContainer = new BaseDisplayObjectContainer()
        let add1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAdd1"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		add1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		// add1.x = 10;
		// add1.y = bottomBg.y + bottomBg.height/2 - add1.height/2;
		addContainer.addChild(add1);

        let add1Icon:BaseBitmap=BaseBitmap.create("wifestatus_icon");
        add1Icon.x = add1.x + add1.width + 10;
		add1Icon.setScale(0.7);
		// add1Icon.y = bgBlackBar.y + bgBlackBar.height/2 - add1Icon.height*0.7/2;
		addContainer.addChild(add1Icon);

		let starEffect = Config.WifestatusbaseCfg.starEffect;
        let add2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAdd2",[String(starEffect)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		add2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		add2.x = add1Icon.x + add1Icon.width*0.7 + 10;
		add1.y = 3;
		add2.y = add1.y;
		// add2.y = bgBlackBar.y + bgBlackBar.height/2 - add2.height/2;
		addContainer.addChild(add2);
		addContainer.x = this.container.width/2 - addContainer.width/2;
		addContainer.y = bottomBg.y + bottomBg.height - 35;
		this.addChildToContainer(addContainer);

		



		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
		this.addChildToContainer(bottom);

		//当前
		let curTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusScoreTitle"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		curTitle.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		curTitle.x = 20;
		curTitle.y = bottom.y + 15;
		this.addChildToContainer(curTitle);

		let scoreIcon:BaseBitmap=BaseBitmap.create("wifestatus_icon");
        scoreIcon.x = curTitle.x + curTitle.width + 10;
		scoreIcon.setScale(0.7);
		scoreIcon.y = curTitle.y - 3;
		this.addChildToContainer(scoreIcon);

		this._scoreTF = ComponentManager.getTextField(wifestatusVo.star + "",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// scoreTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this._scoreTF.x = scoreIcon.x + scoreIcon.width*0.7 + 10;
		this._scoreTF.y = curTitle.y;
		this.addChildToContainer(this._scoreTF);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 219 - 20);

		let wifeList = Config.WifestatusCfg.getWifestatusList();
		this._scrollList = ComponentManager.getScrollList(WifestatusScrollItem,wifeList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 3,bottomBg.y + 10);
		if(wifeList.length > 0 ){
			this._scrollList.setScrollTopByIndex(wifeList.length-1);
		}
		

		// let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let addstr = LanguageManager.getlocal("wifeStatusProAdd",[String((wifestatusVo.star*starEffect).toFixed(1))]);
		this._addTF = ComponentManager.getTextField(addstr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._addTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		this._addTF.x = 20;
		this._addTF.y = this._scoreTF.y + this._scoreTF.height + 10;
		this.addChildToContainer(this._addTF);

		

		this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"wifeStatusAll",this.clickCallBtn,this);
		this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 37;
		this._callBtn.y = this._addTF.y - 30
		this.addChildToContainer(this._callBtn);
		this._callBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.checkRedPoint();
		if(Api.playerVoApi.getPlayerVipLevel()<Config.WifestatusbaseCfg.needVip)
		{
			let vipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAutoTip",[Config.WifestatusbaseCfg.needVip + ""]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			vipTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
			vipTF.x = GameConfig.stageWidth - vipTF.width - 37;
			vipTF.y = this._scoreTF.y + this._scoreTF.height ;
			this.addChildToContainer(vipTF);
			this._callBtn.visible = false;
		}
		
	}

	// public clickItemHandler(event: egret.TouchEvent): void {
        
    //     WifestatusView.currNum =event.data;
    //     var _wifestatusScrollItem: WifestatusScrollItem = <WifestatusScrollItem>this._scrollList.getItemByIndex(event.data);
    //     _wifestatusScrollItem.touchNum += 1;
    //     if (_wifestatusScrollItem.touchNum % 2 == 0) {
    //         _wifestatusScrollItem.itemListType = false;
    //     }
    //     else {
    //         _wifestatusScrollItem.itemListType = true;
    //     }
    //     this._scrollList.refreshData(this._announcementList);
    //     // this._scrollList.setScrollTopByIndex(event.data);
    // }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"wifestatus_child_bg","servant_topresbg",
					"wifestatus_headbg","wifestatus_headmask","wifestatus_headnull","wifestatus_icon",
					"wifestatus_itembg","wifestatus_itembg2","wifestatus_lock","wifestatus_namebg","wifestatus_smallbg",
					"wifestatus_title1","wifestatus_title2","wifestatus_title3","wifestatus_title4",
					"wifestatus_title5","wifestatus_title6","wifestatus_title7","wifestatus_title8",
					"wifestatus_title9","wifestatus_title10","wifestatus_title11","wifeview_namebg",
					"childview_bg1","childview_bg2","childview_bg3","wifeview_charmicon",
					"wifeview_vigoricon", "progress3", "progress3_bg","arena_bottom",
					"wifestatus_frame","wifestatus_flytext","wifestatus_itembg_9",
					"wifestatus_itembg3","wifestatus_itemeffect","wifestatus_locked"
					]);
	}

	private unLockClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW)
	}


	private clickCallBtn(param:any):void
	{	
		if(!Api.wifestatusVoApi.getIsConfer())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusNoStatus"));
			return;
		}
		this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
		this.request(NetRequestConst.REQUEST_WIFESTATUS_AUTOCONFER, { });
		// ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:"102"})
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.data.ret < 0){
			return;
		}
		if(data.data.data.unlockFlag)
		{
			WifestatusView.unlockLevel = Api.wifestatusVoApi.getWifestatusVo().level;
		}
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);
		let wifeList = Config.WifestatusCfg.getWifestatusList();
		
		let level = Api.wifestatusVoApi.getWifestatusVo().level;
		let index = Api.wifestatusVoApi.getWifeIndexVoById(level);
		// this._scrollList.setScrollTopByIndex(index);

		

		this._scrollList.refreshData(wifeList);


		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let starEffect = Config.WifestatusbaseCfg.starEffect;
		let addstr = LanguageManager.getlocal("wifeStatusProAdd",[String((wifestatusVo.star*starEffect).toFixed(1))]);
		this._addTF.text = addstr;
		this._scoreTF.text = wifestatusVo.star + "";

		//显示特效
		let statusType = 0;//0上封 1 下封
		if(this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star)
		{
			statusType = 1;
		}
		// ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:this.param.data.wifeId,type:statusType})
		
		if(data.data.data.addWifeArr&&data.data.data.addWifeArr.length==1)
		{
			ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:data.data.data.addWifeArr[0],type:statusType})
			let needLv = Api.wifestatusVoApi.getWifestatusLevelById(data.data.data.addWifeArr[0]);
			let index2 = Api.wifestatusVoApi.getWifeIndexVoById(needLv);
			this._scrollList.setScrollTopByIndex(index2);
		}
		else{
			this._scrollList.setScrollTopByIndex(index);
			this.showUnlockAni();
		}

		let container = Api.wifestatusVoApi.getStatusEffect(Api.wifestatusVoApi.getWifestatusVo().star - this._oldStar);
		LayerManager.msgLayer.addChild(container);

		
		// 
	}

	private confirmCallbackHandler():void
	{
		if(WifeView.isMoveing){
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY,null);
	}

	
	// 随机传唤后端返回数据后
	private callWifeCallback(event:egret.Event):void
	{
		// let rdata = event.data.data.data;
		// this._loveData = rdata;


		// let id = this._loveData.callWife[0];
		// this._scrollList.addEventListener(egret.Event.COMPLETE,this.moveComplete,this);
		// this.container.touchChildren = false;

		// let index = Api.wifeVoApi.getWifeIndexVoById(id);

		// WifeView.isMoveing = true;

		// this._scrollList.setScrollTopByIndex(index +1,500);

		// let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index + 1);
		
		// wideItem.refreshData(id);
		let wifeList = Config.WifestatusCfg.getWifestatusList();
		this._scrollList.refreshData(wifeList);
		let index = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.wifeLevel);
		if(WifestatusView.unlockLevel)
		{
			index = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.unlockLevel);
			// this.showUnlockAni();
		}
		this._scrollList.setScrollTopByIndex(index);


		// if(wifeList.length > 0 ){
		// 	this._scrollList.setScrollTopByIndex(wifeList.length-1);
		// }
		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let starEffect = Config.WifestatusbaseCfg.starEffect;
		let addstr = LanguageManager.getlocal("wifeStatusProAdd",[String((wifestatusVo.star*starEffect).toFixed(1))]);
		this._addTF.text = addstr;
		this._scoreTF.text = wifestatusVo.star + "";

		
		// let index1 = Api.wifestatusVoApi.getWifeIndexVoById("11");
		// // WifestatusView.unlockLevel = "11";
		// this._scrollList.refreshData(wifeList);
		// this._scrollList.setScrollTopByIndex(index1);
		

	}

	private showUnlockAni()
	{	
		if(WifestatusView.unlockLevel)
		{
			let index1 = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.unlockLevel);
			let wifestatusScrollItem =  <WifestatusScrollItem>this._scrollList.getItemByIndex(index1);
			wifestatusScrollItem.showUnlockAni();
			
		}
		
	}
	private refreshItem(p:any){

		// if(!WifeView.wifeId){
		// 	return;
		// }

		if (p.data.ret == true && p.data.data.data.lucky) {
			this.showLucky();
		}

		let index = Api.wifeVoApi.getWifeIndexVoById(WifeView.wifeId);
		let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index + 1);
		
		wideItem.refreshData(WifeView.wifeId);
	}

	// 列表滑动结束后
	private moveComplete(event:egret.Event):void
	{
		
		
	}

	private showLucky():void
	{
		App.CommonUtil.showGodbless("wife");
	}

	
	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }


	protected getRuleInfo():string
	{
		return "wifestatus_description";
	}

	public hide():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1)
		
		
		super.hide();
	}

	private checkRedPoint(){
		//一键册封
		if(Api.wifestatusVoApi.getIsConfer()&&Api.playerVoApi.getPlayerVipLevel()>=Config.WifestatusbaseCfg.needVip)
		{
			if(this._redDotSp == null)
			{
				this._redDotSp = BaseBitmap.create("public_dot2");
				this._redDotSp.x = this._callBtn.x + this._callBtn.width - this._redDotSp.width ;
				this._redDotSp.y = this._callBtn.y;
				this.addChildToContainer(this._redDotSp);
			}
			else
			{
				if(this._redDotSp)
				{
					this._redDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._redDotSp)
			{
				this._redDotSp.visible = false;
			}
		}
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE,this.showUnlockAni,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS,this.checkRedPoint,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESTATUS_STATE,this.callWifeCallback,this);

		if(this._scrollList)
		{
			this._scrollList = null;
		}
		this._redDotSp= null;
		this._oldStar = null;
		this._loveData = null;
		this._rewardData = null;
		this._addTF = null;
		this._scoreTF = null;
		WifestatusView.unlockLevel = null;
		super.dispose();
	}
}
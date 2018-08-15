/**
 * 媒婆
 * author dky
 * date 2017/10/28
 * @class AdultView
 */
class AdultView extends CommonView {

	// 未婚滑动列表
	private _scrollList: ScrollList;
    // 已婚滑动列表
	private _scrollList2: ScrollList;
	// 列表
	private _adultInfoVoList: Array<AdultInfoVo>;
	//孩子母亲
	private _motherText: BaseTextField;
	//亲密度
	private _intimacyText: BaseTextField;
	//亲密度描述
	private _intimacyDescText: BaseTextField;

	//孩子说的话
	private _childWordsText: BaseTextField;

	//孩m名字
	private _childNameText: BaseTextField;

	//孩子图片
	private _child_Icon: BaseBitmap;

	//孩子vo
	private _adultInfoVo: AdultInfoVo;

	//联姻按钮
	private _childUpBmp : BaseBitmap;
	private _childUpdBtn: BaseButton;

	//取消联姻按钮
	private _childNameBmp : BaseBitmap;
	private _childNameBtn: BaseButton;


	//孩子vo
	private _adultMarryInfoVo: AdultMarryInfoVo;
	//亲家名字
	private _otherNameText: BaseTextField;
	//联姻加成
	private _marryBuffText: BaseTextField;
	//联姻时间
	private _marryTimeText: BaseTextField;

	//孩子说的话
	private _marryWordsText: BaseTextField;

	//孩子图片
	private _marryChild_Icon: BaseBitmap;

	//孩子配偶图片
	private _marryChild_Icon2: BaseBitmap;
	private _qualityBB : BaseBitmap;


    private _curTabIdx=0;

	// private _nameBg: BaseBitmap;
	private _attBg: BaseBitmap;
	private _child_infobg: BaseBitmap;

	//活力恢复时间
	private _vigouTimeText: BaseTextField;



	private _childContainer: BaseDisplayObjectContainer;
	//已婚子嗣
	private _childContainer2: BaseDisplayObjectContainer;

	private _childId: string = null;
	private _childInfoObj: any = null;
	private _proTxtList: BaseTextField[] = null;
	private _childProCfg: Object[] = null;
	private _curLevel: number = 0;

	private _child_wordbg:BaseBitmap;
	private _child_wordbgCor:BaseBitmap;
	

	private _marryChild_wordbg:BaseBitmap;
	private _marryChild_wordbgCor:BaseBitmap;

	private _adultScrollItem:AdultScrollItem;
	private _adult2ScrollItem:Adult2ScrollItem;


	private _marryIndex: number = 0;
	private _marryData: any;

	private _receiveIndex: number = 0;
	private _receiveData: any;

	private _achRedDotSp:BaseBitmap = null;
	private _achRedDotSp2:BaseBitmap = null;
	private _achRedDotSp3:BaseBitmap = null;

	private _goChildBtn: BaseButton;

	private _qualityBg : BaseBitmap = null
	private initflag : boolean = false;

	public constructor() {
		super();
	}
	public initView(): void {
		let view = this;
		Api.rookieVoApi.checkNextStep();
		
		Api.adultVoApi.getAdultMarryNum();

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULTFRESH,this.freshAdult,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_CANCELVISIT),view.cancelVisitCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.refreshSadun,this);

		this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, { });

		let topBg = BaseBitmap.create("public_bg6");
		topBg.y = -21;
		this.addChildToContainer(topBg);
		//孩子背景
		let childBg: BaseBitmap = BaseBitmap.create("adult_bg");
		childBg.x = 0;
		childBg.y = topBg.y + topBg.height + 0;
		this.addChildToContainer(childBg);

		//子嗣
		this._proTxtList = [];
		this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
		this._adultInfoVoList = Api.adultVoApi.getAdultVoList();

		this._childContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._childContainer);

		//已婚子嗣
		this._childContainer2 = new BaseDisplayObjectContainer();
		this._childContainer2.width = GameConfig.stageWidth;
		this.addChildToContainer(this._childContainer2);

		if (Api.adultVoApi.getAdultNum() > 0) {
			let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
			qualityBg.x = childBg.x + 10;
			qualityBg.y = childBg.y + 40 + (PlatformManager.checkIsThSp() ? 76 : 0);
			qualityBg.rotation = PlatformManager.checkIsThSp() ? -90 : 0;
			qualityBg.setScale(1.5);
			this._qualityBg = qualityBg;
			this.addChildToContainer(qualityBg);
	
			let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + (this._adultInfoVo.aquality || 1));
			// qualityBB.x = childBg.x + 10;
			// qualityBB.y = childBg.y + 45;
			// qualityBB.setScale(0.7);
			if(PlatformManager.checkIsThSp()){
				qualityBB.x = qualityBg.x + 2;
				qualityBB.y = qualityBg.y - 45;
			}
			else{
				view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qualityBB, qualityBg);
			}
			this.addChildToContainer(qualityBB);
			this._qualityBB = qualityBB;

			//孩子属性容器
			this._child_wordbg = BaseBitmap.create("public_9_bg25");
			this._child_wordbg.visible = false;
			this._child_wordbg.x = 60;
			this._child_wordbg.y = 60;
			this._child_wordbg.width = 300;
			this._child_wordbg.height = 78;
			this._childContainer.addChild(this._child_wordbg);

			this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
			this._child_wordbgCor.x = 260;
			this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
			this._childContainer.addChild(this._child_wordbgCor);

			this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			this._childWordsText.text = LanguageManager.getlocal("childIntimacyDesc");
			this._childWordsText.x = this._child_wordbg.x + 20;
			this._childWordsText.y = this._child_wordbg.y + 20;
			this._childWordsText.width = 280;
			this._childWordsText.height = 80;
			this._childContainer.addChild(this._childWordsText);

			this._child_Icon = BaseBitmap.create("");
			this._child_Icon.x = 40;
			this._child_Icon.y = this._child_wordbgCor.y - 10;
			this._childContainer.addChild(this._child_Icon);
			// let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];

			this._motherText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
			this._motherText.x = 30;
			this._motherText.y = 5;
			this._childContainer.addChild(this._motherText);

			this._intimacyText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			// this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
			this._intimacyText.x = 200;
			this._intimacyText.y = 5;
			this._childContainer.addChild(this._intimacyText);

			this._intimacyDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			this._intimacyDescText.text = LanguageManager.getlocal("childIntimacyDesc");
			this._intimacyDescText.x = GameConfig.stageWidth - this._intimacyDescText.width - 30;
			this._intimacyDescText.y = 5;
			this._childContainer.addChild(this._intimacyDescText);



			// this._child_infobg = BaseBitmap.create("servant_probigbg");
			// // this._child_infobg.width = 240;
			// // this._child_infobg.height = 345;
			// this._child_infobg.x = 375;
			// this._child_infobg.y = this._child_wordbg.y + 70;
			// this._childContainer.addChild(this._child_infobg);
			this._child_infobg = BaseBitmap.create("adultdbanbg");
			// this._child_infobg.width = 240;
			// this._child_infobg.height = 345;
			// this._child_infobg.x = 375;
			// this._child_infobg.y = this._child_wordbg.y + 70;
			this._childContainer.setLayoutPosition(LayoutConst.rightverticalCenter, this._child_infobg, childBg, [10,0]);
			this._childContainer.addChild(this._child_infobg);

			//子嗣属性
			// this._attBg = BaseBitmap.create("public_9_probiginnerbg");
			// this._attBg.width = 182;
			// this._attBg.height = 190;
 			// this._attBg.x = this._child_infobg.x + this._child_infobg.width / 2 - this._attBg.width / 2;
			// this._attBg.y = this._child_infobg.y + 50;
			// this._childContainer.addChild(this._attBg);

			//子嗣名字
			this._childNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
			// this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
			// this._childNameText.y = this._child_infobg.y + 20;
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCentertop, this._childNameText, this._child_infobg, [0,20]);
			this._childContainer.addChild(this._childNameText);
			this._childNameText.addTouchTap(this.changeNameHandler,this,null);
			// this.addTouchTap(this.changeNameHandler,this);

			let proX = this._child_infobg.x + 35;
			let proY = this._childNameText.y + this._childNameText.textHeight + 25;
			for (var index = 0; index < 6; index++) {
				let proTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
				proTxt.x = proX;
				proTxt.y = proY;
				this._childContainer.addChild(proTxt);
				proY += 25;
				this._proTxtList.push(proTxt);
			}			
			this._vigouTimeText = ComponentManager.getTextField("00:00:00", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED2);
			// this._vigouTimeText.x = 410;
			// this._vigouTimeText.y = this._child_infobg.y + this._child_infobg.height - 100;
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCentertop, this._vigouTimeText, this._child_infobg, [0,proY + 15]);
			this._childContainer.addChild(this._vigouTimeText);
			//按钮mainui_bottombtnbg
			let desc = (this._child_infobg.width - 98 * 2) / 3;

			let upbtnbg = BaseBitmap.create('mainui_bottombtnbg');
			upbtnbg.setScale(1.4);
			this._childContainer.setLayoutPosition(LayoutConst.leftbottom, upbtnbg, this._child_infobg, [desc,25]);
			this._childContainer.addChild(upbtnbg);

			this._childUpdBtn = ComponentManager.getButton("adultlyin", '', this.updBtnClickHandler, this);
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._childUpdBtn, upbtnbg);
			this._childContainer.addChild(this._childUpdBtn);

			this._childUpBmp = BaseBitmap.create('adultlyinfont');
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._childUpBmp, this._childUpdBtn);
			this._childContainer.addChild(this._childUpBmp);

			let namebtnbg = BaseBitmap.create('mainui_bottombtnbg');
			namebtnbg.setScale(1.4);
			this._childContainer.setLayoutPosition(LayoutConst.rightbottom, namebtnbg, this._child_infobg, [desc,25]);
			this._childContainer.addChild(namebtnbg);

			this._childNameBtn = ComponentManager.getButton("adultbfang", '', this.nameBtnClickHandler, this);
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._childNameBtn, namebtnbg);
			this._childContainer.addChild(this._childNameBtn);

			this._childNameBmp = BaseBitmap.create('adultbffont');
			this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._childNameBmp, this._childNameBtn);
			this._childContainer.addChild(this._childNameBmp);

			if(Api.switchVoApi.checkopenSadun()){
				
			}
			else{
				namebtnbg.visible = this._childNameBtn.visible = this._childNameBmp.visible = false;
				this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, upbtnbg, this._child_infobg, [0,25]);
				this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._childUpdBtn, upbtnbg);
				this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._childUpBmp, this._childUpdBtn);
			}
			this.tick();
		}
		let arena_bottom: BaseBitmap = BaseBitmap.create("arena_bottom");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this);
		this.addChild(arena_bottom);
		//孩子栏位背景
		let childItemBg: BaseBitmap = BaseBitmap.create("servant_bottombg");
		// childItemBg.width = 626;
		childItemBg.height = GameConfig.stageHeigth - this.container.y - childBg.height - topBg.height -topBg.y - arena_bottom.height;
		// childItemBg.height = 300 ;
		childItemBg.x = 0;
		childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height - arena_bottom.height;
		// childItemBg.y = -15;
		this.addChildToContainer(childItemBg);

        let tabName = ["adultTab1","adultTab2"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 20;
        tabbarGroup.y = childItemBg.y + 24
		this.addChildToContainer(tabbarGroup);
		//初始化孩子席位
		let adultList = Api.adultVoApi.getAdultVoList()

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, GameConfig.stageWidth - 36, childItemBg.height - 120);
		this._scrollList = ComponentManager.getScrollList(AdultScrollItem, adultList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = childItemBg.x + childItemBg.width / 2 - this._scrollList.width / 2;
		this._scrollList.y = childItemBg.y + 90;
		this._scrollList.addTouchTap(this.clickItemHandler, this);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg"),TextFieldConst.COLOR_BLACK )

		this._goChildBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultEmptyBtnMsg", this.goChildBtnClick, this);
		this._goChildBtn .x = childItemBg.x + childItemBg.width / 2 - this._goChildBtn.width / 2;
		this._goChildBtn .y = childItemBg.y + childItemBg.height/2 + 70 ;
		// this._goChildBtn .setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._goChildBtn );
		if(adultList.length<=0){
			this._goChildBtn.visible = true;
		}
		else{
			this._goChildBtn.visible = false;
		}
		//从其他界面点过来
		if(this.param && this.param.data.childId){
			if( this.param.data.childId){
				let chidlIndex = Api.adultVoApi.getAdultIndexVoById(this.param.data.childId);
				this._scrollList.setScrollTopByIndex(chidlIndex,0);

				let childInfoVo = this._adultInfoVoList[chidlIndex];
				let id = childInfoVo.id;
				this._adultInfoVo = childInfoVo;
				this.updChildAttData(childInfoVo);
				// this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
				this.setSelect(id);
			}
			
		}
		else
		{
			if (Api.adultVoApi.getAdultNum() > 0) {
				let childInfoVo = this._adultInfoVoList[0];
				let id = childInfoVo.id;
				this._adultInfoVo = childInfoVo;
				this.updChildAttData(childInfoVo);

				let chidlIndex = Api.adultVoApi.getAdultIndexVoById(id);
				// this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
				this.setSelect(id);

			}

		}
		this._marryChild_wordbg = BaseBitmap.create("public_9_bg25");
		// this._marryChild_wordbg.visible = false;
		this._marryChild_wordbg.x = 160;
		this._marryChild_wordbg.y = 60;
		this._marryChild_wordbg.width = 300;
		this._marryChild_wordbg.height = 78;
		this._childContainer2.addChild(this._marryChild_wordbg);

		this._marryChild_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
		this._marryChild_wordbgCor.x = 300;
		this._marryChild_wordbgCor.y = this._marryChild_wordbg.y + this._marryChild_wordbg.height - 3;
		this._childContainer2.addChild(this._marryChild_wordbgCor);

		this._marryWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._marryWordsText.text = LanguageManager.getlocal("adultMarryWord1");
		this._marryWordsText.x = this._marryChild_wordbg.x + 20;
		this._marryWordsText.y = this._marryChild_wordbg.y + 20;
		this._marryWordsText.width = 280;
		this._marryWordsText.height = 80;
		this._childContainer2.addChild(this._marryWordsText);

		this._marryChild_Icon = BaseBitmap.create("");
		this._marryChild_Icon.x = 40;
		this._marryChild_Icon.y = this._marryChild_wordbgCor.y - 10;
		this._childContainer2.addChild(this._marryChild_Icon);

		this._marryChild_Icon2 = BaseBitmap.create("");
		this._marryChild_Icon2.x = 260;
		this._marryChild_Icon2.y = this._marryChild_wordbgCor.y - 10;
		this._childContainer2.addChild(this._marryChild_Icon2);


		// let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];

		this._otherNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
		this._otherNameText.x = 30;
		this._otherNameText.y = 5;
		this._childContainer2.addChild(this._otherNameText);

		this._marryBuffText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
		this._marryBuffText.x = 230;
		this._marryBuffText.y = 5;
		this._childContainer2.addChild(this._marryBuffText);

		this._marryTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._marryTimeText.x = 430;
		this._marryTimeText.y = 5;
		this._childContainer2.addChild(this._marryTimeText);



		//初始化孩子席位
		let adultMarryList = Api.adultVoApi.getAdultMarryVoList()

		let rect1 = egret.Rectangle.create();
		rect1.setTo(0, 0, GameConfig.stageWidth - 36, childItemBg.height - 120);
		this._scrollList2 = ComponentManager.getScrollList(Adult2ScrollItem, adultMarryList, rect1);
		this.addChildToContainer(this._scrollList2);
		this._scrollList2.x = childItemBg.x + childItemBg.width / 2 - this._scrollList2.width / 2;
		this._scrollList2.y = childItemBg.y + 90;
		this._scrollList2.addTouchTap(this.clickItemHandler2, this);
		this._scrollList2.visible = false; 
		this._scrollList2.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg2"),TextFieldConst.COLOR_BLACK )

		if(Api.adultVoApi.getAdultMarryNum()>0)
		{
			this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
			this.updMarryChildAttData(this._adultMarryInfoVo);
			

			this.setSelect2(this._adultMarryInfoVo.id);
		}
		this._childContainer2.visible = false;
		this._scrollList2.visible = false;
		
		this._marryChild_Icon.anchorOffsetX = this._marryChild_Icon.width/2;
		this._marryChild_Icon2.anchorOffsetX = this._marryChild_Icon2.width/2;
		this._marryChild_Icon.x = this._marryChild_Icon.x + this._marryChild_Icon.width/2;
		this._marryChild_Icon2.x = this._marryChild_Icon2.x + this._marryChild_Icon2.width/2;

		//底部按钮
		//提亲请求
		let requestBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarryRequestViewTitle", this.requestBtnClick, this);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, requestBtn, arena_bottom, [20,0]);
		this.addChild(requestBtn);


		let visitBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultvisit", this.visitBtnClick, this);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, visitBtn, arena_bottom);
		this.addChild(visitBtn);

		let yyuanBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultyyuan", this.yyuanBtnClick, this);
		this.setLayoutPosition(LayoutConst.rightverticalCenter, yyuanBtn, arena_bottom, [20,0]);
		this.addChild(yyuanBtn);
		//visitBtn.visible = yyuanBtn.visible = Api.switchVoApi.checkopenSadun();
		if(Api.switchVoApi.checkopenSadun()){
			
		}
		else{
			visitBtn.visible = yyuanBtn.visible = false;
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, requestBtn, arena_bottom);
		}

		// let requestBtn = ComponentManager.getButton("btn_marry", "", this.requestBtnClick, this);
		// requestBtn.x = 0;
		// requestBtn.y = GameConfig.stageHeigth - requestBtn.height;
		// // requestBtn.setColor(TextFieldConst.COLOR_BLACK);
		// this.addChild(requestBtn);

		this._achRedDotSp = BaseBitmap.create("public_dot2");
		this._achRedDotSp.x = requestBtn.x + requestBtn.width - this._achRedDotSp.width - 1 ;
		this._achRedDotSp.y = requestBtn.y - 2;
		this._achRedDotSp.visible = false;
		this.addChild(this._achRedDotSp);

		this._achRedDotSp2 = BaseBitmap.create("public_dot2");
		this._achRedDotSp2.x = visitBtn.x + visitBtn.width - this._achRedDotSp2.width - 1 ;
		this._achRedDotSp2.y = visitBtn.y - 2;
		this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0;
		this.addChild(this._achRedDotSp2);

		if(this._childNameBtn){
			this._achRedDotSp3 = BaseBitmap.create("public_dot2");
			this.setLayoutPosition(LayoutConst.righttop, this._achRedDotSp3, this._childNameBtn, [5,5]);
			this._achRedDotSp3.visible = Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id);
			this._childContainer.addChild(this._achRedDotSp3);
		}
		this.initflag = true;
		this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
		this.request(NetRequestConst.REQUEST_SADUN_GETINFO,null);

	}

	private show_last_msg():void{
		if(Api.adultVoApi._marryList.length > 0){
			this._marryData = Api.adultVoApi._marryList;
			this.playMarry();
		}
		else{
			if(Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "")
			{
				let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
				let msg = LanguageManager.getlocal("adultMarryMsg",[rewardStr])
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"adultMarryRefuse",
					msg:msg,
					callback:()=>{
						if(Api.adultVoApi.getReceiveData().length > 0){
							this._receiveData = Api.adultVoApi.getReceiveData();
							this.playReceive()
						}
					},
					handler:this
				});
			}
			else{
				if(Api.adultVoApi.getReceiveData().length > 0){
					this._receiveData = Api.adultVoApi.getReceiveData();
					this.playReceive();
				}
				else{
					if(Api.adultVoApi.getSadunRefuse() && Api.adultVoApi.getSadunRefuse() != "")
					{
						let rewardStr = GameData.getRewardsStr(Api.adultVoApi.getSadunRefuse());
						let msg = LanguageManager.getlocal("adultReceiveMsg",[rewardStr])
						ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
							title:"adultVisitefuse",
							msg:msg,
							callback:()=>{
								let rewards= GameData.formatRewardItem(Api.adultVoApi.getSadunRefuse());
								if(rewards&&rewards.length>0)
								{
									App.CommonUtil.playRewardFlyAction(rewards);
								}
								this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK,null);
								Api.adultVoApi.clearSadunRefuse();
							},
							handler:this
						});
					}
					else{
						this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK,null);
						Api.adultVoApi.clearSadunRefuse();
					}
				}
			}
		}
	}

	private goChildBtnClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, {});
		this.hide();
	}

	private requestBtnClick()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTMARRYREQUESTVIEW, {confirmCallback: this.requestMarryCallback,confirmCallback2: this.checkRedPoint, handler: this });
	}

	private visitBtnClick():void{
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTVISITREQUESTVIEW);
	}

	private yyuanBtnClick():void{
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTYINYUANRECORDVIEW,{type : 'yyuanrecord', childid : this._adultInfoVo ? this._adultInfoVo.id : null });
	}

	private checkRedPoint(type:number)
	{
		if(type == 1)
		{
			this._achRedDotSp.visible = true;
		}else{
			this._achRedDotSp.visible = false;
		}
	}

	private refreshSadun():void{
		this.updChildAttData(this._adultInfoVo);
		this.refreshItem();
		this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0;
		if(this._achRedDotSp3){
			this._achRedDotSp3.visible = this._adultInfoVo ? Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id) : false;
		}
	}

     protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index;
        if(this._curTabIdx == 0)
		{
			this._scrollList.visible = true;
			this._childContainer.visible = true;
			this._childContainer2.visible = false;
			this._scrollList2.visible = false;
			if(Api.adultVoApi.getAdultNum()>0)
			{
				// this._scrollList2.visible = true;
				if(this._qualityBB){
					this._qualityBB.visible = this._qualityBg.visible = true;
				}
				this._childContainer.visible = true;
			}else{
				if(this._qualityBB){
					this._qualityBB.visible = this._qualityBg.visible = false;
				}
				this._childContainer.visible = false;
			}
			let adultInfoVoList = Api.adultVoApi.getAdultVoList();
			if(adultInfoVoList.length<=0){
				this._goChildBtn.visible = true;
			}
			else{
				this._goChildBtn.visible = false;
			}

		}
		else{
			if(this._qualityBB){
				this._qualityBB.visible = this._qualityBg.visible = this._childContainer.visible = false;
			}
			this._scrollList.visible = false;
			this._goChildBtn.visible = false;

			if(Api.adultVoApi.getAdultMarryNum()>0)
			{
				this._scrollList2.visible = true;
				this._childContainer2.visible = true;
			}
			this._scrollList2.visible = true;
		}
    }
	private clickItemHandler(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		this._adultInfoVoList =  Api.adultVoApi.getAdultVoList();
		if (this._adultInfoVoList) {
			let adultInfoVo = this._adultInfoVoList[index];
			if(adultInfoVo)
			{
				let id = adultInfoVo.id;
				this._adultInfoVo = adultInfoVo;
				this.updChildAttData(adultInfoVo);
				this.setSelect(id);
			}
			
		}
		this.tick()
	}

	private clickItemHandler2(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		
		let adultMarryList = Api.adultVoApi.getAdultMarryVoList()
		this._adultMarryInfoVo = adultMarryList[index];
		if (this._adultMarryInfoVo) {

			let id = this._adultMarryInfoVo.id;
			this.updMarryChildAttData(this._adultMarryInfoVo);
			this.setSelect2(id);
			
			// ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: id,confirmCallback: null, handler: this });
		}

	}

	public tick(): void {
		if (Api.adultVoApi.getAdultNum() <= 0) {
			return;
		}
		if (this._vigouTimeText == null) {
			return;
		}

		let lastTime = 0;
		let type = 0;
		this._vigouTimeText.visible = false;
		if(this._adultInfoVo){
			this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
			if(this._adultInfoVo && this._adultInfoVo.pro){
				type = this._adultInfoVo.pro[1];
				lastTime = this._adultInfoVo.pro[0] - GameData.serverTime;
				if(lastTime > 0){
					this._vigouTimeText.text = LanguageManager.getlocal("adultMarryTime") + App.DateUtil.getFormatBySecond(lastTime, 1);
					this._childContainer.setLayoutPosition(LayoutConst.horizontalCentertop, this._vigouTimeText, this._child_infobg, [0,205]);
					this._vigouTimeText.visible = true;
				}else if(lastTime == 0){
					this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, { });
				}
			}
		}
	}

	//扩展子嗣栏位回调
	private addChildPos()
	{
		this.request(NetRequestConst.REQUEST_CHILD_ADDPOSNUM, null);
	}
	//刷新选中状态
	private setSelect(childId)
	{
		let childIndex = Api.adultVoApi.getAdultIndexVoById(childId);
		
		if(this._adultScrollItem)
		{
			if(this._adultScrollItem.getChildByName("select"))
			{
				this._adultScrollItem.removeChild(this._adultScrollItem.getChildByName("select"));
				let baseBitmap = <BaseBitmap>this._adultScrollItem.getChildByName("select");
				baseBitmap = null;
				
			}
		}
		this._adultScrollItem =  <AdultScrollItem>this._scrollList.getItemByIndex(childIndex);
		let bg2Index = this._adultScrollItem.getChildIndex(this._adultScrollItem.getChildByName("bg2"));
		
		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_bg29");
		itemBg2.width = this._adultScrollItem.width-75;
		itemBg2.height = 48;
		// itemBg2.width = 500;
		// itemBg2.height = 50;
		itemBg2.x =  this._adultScrollItem.width/2 - itemBg2.width/2 + 20;
		itemBg2.y = this._adultScrollItem.height/2 - itemBg2.height/2;
		itemBg2.name = "select";
		this._adultScrollItem.addChildAt(itemBg2,bg2Index + 1);

	}

	//刷新选中状态
	private setSelect2(childId)
	{
		let childIndex = Api.adultVoApi.getAdultMarryIndexVoById(childId);
		
		if(this._adult2ScrollItem)
		{
			if(this._adult2ScrollItem.getChildByName("select2"))
			{
				this._adult2ScrollItem.removeChild(this._adult2ScrollItem.getChildByName("select2"));
				let baseBitmap = <BaseBitmap>this._adult2ScrollItem.getChildByName("select2");
				baseBitmap = null;
				
			}
		}
		this._adult2ScrollItem =  <Adult2ScrollItem>this._scrollList2.getItemByIndex(childIndex);
		let bg2Index = this._adult2ScrollItem.getChildIndex(this._adult2ScrollItem.getChildByName("bg2"));
		
		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_bg29");
		itemBg2.width = this._adult2ScrollItem.width-36;
		itemBg2.height = 97;
		// itemBg2.width = 500;
		// itemBg2.height = 50;
		itemBg2.x =  18;
		itemBg2.y = 8;
		itemBg2.name = "select2";
		this._adult2ScrollItem.addChildAt(itemBg2,bg2Index + 1);

	}

	//刷新子嗣数据
	private updChildAttData(childInfoVo: AdultInfoVo) {
		if (childInfoVo == null)
		{
			return;
		}
		this._childProCfg = [
			{
				txt: this.getProStringWithProId(1)
			},
			{
				txt: this.getProStringWithProId(2)
			},
			{
				txt: this.getProStringWithProId(3)
			},
			{
				txt: this.getProStringWithProId(4)
			},
			{
				txt: this.getProStringWithProId(5)
			},
			{
				txt: this.getProStringWithProId(6)
			},

		];

		this._child_Icon.texture = ResourceManager.getRes( Api.adultVoApi.getAdultPic(childInfoVo.id));

		let childCfg1 = GameConfig.config.childCfg[childInfoVo.quality.toString()];

		if(childInfoVo.level == childCfg1.lv){
			this._child_wordbg.visible = false;
			this._child_wordbgCor.visible = false;
			this._childWordsText.visible = false;
		
		}
		else{
			this._childWordsText.text = Api.adultVoApi.getAdultWord(childInfoVo.id);
			this._child_wordbg.visible = true;
			this._child_wordbgCor.visible = true;
			this._childWordsText.visible = true;
		}
		let wifeInfoVo: WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childInfoVo.motherId);
		this._motherText.text = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
		this._intimacyText.text = LanguageManager.getlocal("childIntimacy", [wifeInfoVo.intimacy.toString()]);

		let childName = childInfoVo.name;
		if (childName == "") {
			childName = LanguageManager.getlocal("childNeedName");
		}
		else{
			childName = "<font u ='true'>" + childInfoVo.name + "</font>";
		}
		this._childNameText.text = childName;
		this._childContainer.setLayoutPosition(LayoutConst.horizontalCentertop, this._childNameText, this._child_infobg, [0,25]);
		// this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
		// this._childNameText.y = this._child_infobg.y + 20;

		let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
		//刷新等级
		let levelStr = LanguageManager.getlocal("servant_infoLv") + childInfoVo.level + "/" + childCfg.lv
		if(childInfoVo.level >= childCfg.lv){
			levelStr = LanguageManager.getlocal("child_levelMax");
		}

		for (var index = 1; index < this._childProCfg.length; index++) {
			var element: any = this._childProCfg[index];
			let proTxt: BaseTextField = this._proTxtList[index];
			proTxt.text = element.txt
		}
		if(this._qualityBB){
			this._qualityBB.setRes("adult_q" + (this._adultInfoVo.aquality || 1));
		}
		
		//刷新联姻按钮
		this._childUpBmp.setRes(Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id) ? 'adultqxlyfont' : 'adultlyinfont');
		this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._childUpBmp, this._childUpdBtn);

		//刷新拜访按钮
		this._childNameBmp.setRes(Api.adultVoApi.notInVisit(this._adultInfoVo.id) ? 'adultbffont' : 'adultqxbfang');
		if(Api.adultVoApi.isVisited(this._adultInfoVo.id)){
			this._childNameBmp.setRes('adultybfang');
		}
		if(this._achRedDotSp3){
			this._achRedDotSp3.visible = Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id);
		}
		this._childContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._childNameBmp, this._childNameBtn);
	}
	//刷新已婚子嗣数据
	private updMarryChildAttData(adultMarryInfo: AdultMarryInfoVo) {
		if(Api.adultVoApi.getAdultMarryNum() <= 0){
			this._childContainer2.visible = false;
			return;
		}

		this._childContainer2.visible = true;

		this._otherNameText.text = LanguageManager.getlocal("adultOtherName") + adultMarryInfo.funame;
		this._marryBuffText.text = LanguageManager.getlocal("adultMarryBuff") + adultMarryInfo.ftotal;
		this._marryTimeText.text = App.DateUtil.getFormatBySecond(adultMarryInfo.mts,2)

		let myIcon = "adult_boy"
		let otherIcon = "adult_girl"
		if(adultMarryInfo.sex == 2){
			myIcon = "adult_girl"
			otherIcon = "adult_boy"
			this._marryChild_Icon.skewY = 180;
			this._marryChild_Icon2.skewY = 180;
		}	
		else{
			this._marryChild_Icon.skewY = 0;
			this._marryChild_Icon2.skewY = 0;
		}

		this._marryChild_Icon.texture = ResourceManager.getRes(myIcon);
		this._marryChild_Icon2.texture = ResourceManager.getRes(otherIcon);
	}

	protected changeNameHandler() {
		if(this._adultInfoVo.name != "")
		{
			ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type:3, childId: this._adultInfoVo.id,confirmCallback: this.reNameCallBack, handler: this });
		}
	}

	private doCancel()
	{
		this.request(NetRequestConst.REQUEST_RADULT_CANCELPROPOSE, { childId: this._adultInfoVo.id });
	}
	//全服联姻、联姻后请求回调、拜访回调
	private reNameCallBack(param)
	{
		this.refreshItem();
		this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
		this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
		this.updChildAttData(this._adultInfoVo);
		this.setSelect(this._adultInfoVo.id);
		if(param && param == 'visitSuccess'){
			ViewController.getInstance().openView(ViewConst.BASE.ADULTVISITSUCCESSVIEW, { 
				name : Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name, 
				type : 'visitSuccess'
			});
		}
	}
	//恢复活力
	private useItemConfirmCallbackHandler()
	{
		this.request(NetRequestConst.REQUEST_CHILD_RECOVER, { childId: this._adultInfoVo.id });
	}
	private updBtnClickHandler() {
		if(Api.adultVoApi.notInVisit(this._adultInfoVo.id)){
			if(Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)){
				//取消联姻
				let rewardStr = ""
				if(this._adultInfoVo.pro[1] == 1){
					
					rewardStr = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needGem*0.8 + LanguageManager.getlocal("gemName");
				}
				else if(this._adultInfoVo.pro[1] == 2)
				{
					let costItemId = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needItem;
					let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
					let itemListCfg = Config.ItemCfg.getItemCfgById
					let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
					rewardStr = itemCfg.name;
				}	
				// let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
				let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"adultCancelMarry",
					msg:msg,
					callback:this.doCancel,
					handler:this,
					needCancel:true
				});
			}else{
				ViewController.getInstance().openView(ViewConst.COMMON.ADULTMARRYVIEW, {childId: this._adultInfoVo.id,confirmCallback: this.reNameCallBack,confirmCallback2: this.requestMarryCallback, handler: this });
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal('adultisinvisit'));
		}
		// sadun.getvisitedme
		
	}

		//拜访处理
		protected nameBtnClickHandler() {
			//ADULTCHOOSEVISITVIEW
			//子嗣是否正在拜访
			if(!Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)){
				if(Api.adultVoApi.isVisited(this._adultInfoVo.id)){
					App.CommonUtil.showTip(LanguageManager.getlocal('adultisvisited'));
					return;
				}
				if(Api.adultVoApi.isChildCanVisit(this._adultInfoVo.id)){
					if(!Api.adultVoApi.isCanSendVisit()){
						App.CommonUtil.showTip(LanguageManager.getlocal('adultsendmax',  [Config.SadunCfg.maxSend.toString()]));
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.ADULTCHOOSEVISITVIEW, {
						childId : this._adultInfoVo.id,
						confirmCallback : this.reNameCallBack,
						handler: this
					});
				}else if(!Api.adultVoApi.notInVisit(this._adultInfoVo.id)){
					//弹窗确认
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						title:"itemUseConstPopupViewTitle",
						msg:LanguageManager.getlocal('adultconfirmcancel', [this._adultInfoVo.name, Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]),
						callback:()=>{
							if(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)){
								this.request(NetRequestConst.REQUEST_SADUN_CANCELVISIT, {
									childId : this._adultInfoVo.id,
									fuid : Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)
								});
							}
							else if(this._adultInfoVo.visit){
								App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelreceive',[Api.adultVoApi.getSadunInfoByUid(this._adultInfoVo.visit).name]));
							}
							else{
								App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelrefuse',['']));
							}
						},
						handler:this,
						needCancel:true
					});
					//取消拜访
				}
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal('adultisinmarry'));
			}
			
		}

	private doGuide()
    {
       this.updBtnClickHandler();
	}
	
    private requestMarryCallback()
    {

		let adultList = Api.adultVoApi.getAdultVoList();
		this._scrollList.refreshData(adultList);
		
		if(Api.adultVoApi.getAdultNum()>0)
		{
			this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
			this.updChildAttData(this._adultInfoVo);
			this._childContainer.visible = true;
			this.setSelect(this._adultInfoVo.id);
		}
		else
		{
			this._childContainer.visible = false;
		}
		
		

		let adultMarryList = Api.adultVoApi.getAdultMarryVoList();
		this._scrollList2.refreshData(adultMarryList);
		
		if(Api.adultVoApi.getAdultMarryNum()>0)
		{
			this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
			this.updMarryChildAttData(this._adultMarryInfoVo);
			this._childContainer2.visible = false;
			this.setSelect2(this._adultMarryInfoVo.id);
			// this._childContainer.visible = true;
		}
		else
		{
			// this._childContainer2.visible = false;
		}

    }

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.data.data)
		{
			return;
		}
		if(this._adultInfoVo){
			this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
		}
		
		if (data.data.cmd == NetRequestConst.REQUEST_RADULT_CANCELPROPOSE){
			//this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
			// this.updChildAttData(this._adultInfoVo);
			// this._childContainer.visible = true;
			// this.setSelect(this._adultInfoVo.id);
			this.updChildAttData(this._adultInfoVo);
			this.refreshItem();
			if(data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
		}
		else if(data.data.cmd == NetRequestConst.REQUEST_CHILD_RECOVER){
			this.updChildAttData(this._adultInfoVo);
			this.refreshItem();
		}

		else if(data.data.cmd ==  NetRequestConst.REQUEST_RADULT_GETADULTINFO)
		{
			
			// this._marryData = ["c1","c16","c13"];
			// this.playMarry();
			this.updChildAttData(this._adultInfoVo);
			this.refreshItem();		

		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETPROPOSEE) {
			if(data.data.data.minfo)
			{
				this._achRedDotSp.visible = true;
			}
			else
			{
				this._achRedDotSp.visible = false;
			}
		}
		else if(data.data.cmd == NetRequestConst.REQUEST_SADUN_GETINFO){
			Api.adultVoApi.init_sadun_data(data.data.data);
			this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0;
			if(this._achRedDotSp3){
				this._achRedDotSp3.visible = this._adultInfoVo ? Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id) : false;
			}
			if(this.initflag){
				this.show_last_msg();
				this.initflag = false;
			}
		}
		else if((data.data.cmd == NetRequestConst.REQUEST_SADUN_READCALLBACK)){
			Api.adultVoApi.clearReceiveData();
		}
	}


	private playMarry()
	{
		if(this._marryIndex <= this._marryData.length - 1)
		{
			let childId = this._marryData[this._marryIndex]
			ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId,confirmCallback: this.playMarry, handler: this });
			this._marryIndex ++;
		}
		else{
			if(Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "")
			{
				let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
				let msg = LanguageManager.getlocal("adultMarryMsg",[rewardStr])
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"adultMarryRefuse",
					msg:msg,
					callback:()=>{
						if(Api.adultVoApi.getReceiveData().length > 0){
							this._receiveData = Api.adultVoApi.getReceiveData();
							this.playReceive()
						}
					},
					handler:this
				});
			}
			else{
				if(Api.adultVoApi.getReceiveData().length > 0){
					this._receiveData = Api.adultVoApi.getReceiveData();
					this.playReceive()
				}
			}
		}
	}

	private playReceive(){
		if(this._receiveIndex <= this._receiveData.length - 1)
		{
			let unit = this._receiveData[this._receiveIndex];
			//Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name
			ViewController.getInstance().openView(ViewConst.BASE.ADULTVISITSUCCESSVIEW, { 
				wifename : Config.WifeCfg.getWifeCfgById(unit.visitwife).name,
				childname : Api.adultVoApi.getAdultInfoVoById(unit.childid).name,
				attr : Api.adultVoApi.getAdultInfoVoById(unit.childid).attrVo.attTotal - unit.oldattr,
				confirmCallback: this.playReceive, 
				handler: this, 
				type : 'receiveSuccess',
				isreceived : true
			});
		
			// let dis = Api.adultVoApi.getAdultInfoVoById(unit.childid).attrVo.attTotal - unit.oldattr;
			// let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
			// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
			// let powerFly = new PowerFly();
			// powerFly.init(dis);
			// LayerManager.msgLayer.addChild(powerFly);
			
			this._receiveIndex ++;
		}
		else{
			if(Api.adultVoApi.getSadunRefuse() && Api.adultVoApi.getSadunRefuse() != "")
			{
				let rewardStr = GameData.getRewardsStr(Api.adultVoApi.getSadunRefuse());
				let msg = LanguageManager.getlocal("adultReceiveMsg",[rewardStr])
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"adultVisitefuse",
					msg:msg,
					callback:()=>{
						let rewards= GameData.formatRewardItem(Api.adultVoApi.getSadunRefuse());
						if(rewards&&rewards.length>0)
						{
							App.CommonUtil.playRewardFlyAction(rewards);
						}
						this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK,null);
						Api.adultVoApi.clearSadunRefuse();
					},
					handler:this
				});
			}
			else{
				this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK,null);
				Api.adultVoApi.clearSadunRefuse();
			}
		}
	}

	//结婚成功刷新列表
	private doRefresh()
	{
		let adultList = Api.adultVoApi.getAdultVoList();
		this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
		this.updChildAttData(this._adultInfoVo);
		this._scrollList.refreshData(adultList);
		let adultMarryList = Api.adultVoApi.getAdultMarryVoList();
		this._scrollList2.refreshData(adultMarryList);
		if(Api.adultVoApi.getAdultMarryNum()>0)
		{
			this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
			this.updMarryChildAttData(this._adultMarryInfoVo);
		}
		this._childContainer2.visible = false;
		this._scrollList2.visible = false;
		if(this._adultInfoVo){
			this.setSelect(this._adultInfoVo.id);
		}
	}
	//刷新列表属性
	private refreshItem(){
		if(this._adultInfoVo == null)
		{
			return;
		}
		let index = Api.adultVoApi.getAdultIndexVoById(this._adultInfoVo.id);
		let childScrollItem = <AdultScrollItem>this._scrollList.getItemByIndex(index);
	
		childScrollItem.refreshData(index);
	}

	protected getProStringWithProId(id: number): string {
		if (id == 1) {
			// let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
			// let levelStr = LanguageManager.getlocal("servant_infoLv") + this._adultInfoVo.level + "/" + childCfg.lv
            let qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._adultInfoVo.aquality);
			return qualityStr;
		}
		if (id == 2) {
			return LanguageManager.getlocal("servant_infoAttr") + this._adultInfoVo.attrVo.attTotal;
		}
		if (id == 3) {

			return LanguageManager.getlocal("playerview_force") + this._adultInfoVo.attrVo.forceTotal;
		}
		if (id == 4) {
			return LanguageManager.getlocal("playerview_inte") + this._adultInfoVo.attrVo.brainsTotal;
		}
		if (id == 5) {
			return LanguageManager.getlocal("playerview_policy") + this._adultInfoVo.attrVo.politicsTotal;
		}
		if (id == 6) {
			return LanguageManager.getlocal("playerview_charm") + this._adultInfoVo.attrVo.charmTotal;
		}
		return "";
	}

	private cancelVisitCallback(evt):void{
		let view= this;
		let data = evt.data.data;
		if(data.ret >= 0 ){
			if(data.data.sadunstat){
				let str = '';
				switch(data.data.sadunstat){
					case 'agree':
						str = LanguageManager.getlocal('adultcancelreceive',[Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name, this._adultInfoVo.name]);
						break;
					case 'refuse':
						str = LanguageManager.getlocal('adultcancelrefuse',[Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]);
						break;
					case 'overtime':
						str = LanguageManager.getlocal('adultcancelsuccess')
						break;
					default:
						str = LanguageManager.getlocal('adultcancelsuccess')
						break;
				}
				App.CommonUtil.showTip(str);
				this.request(NetRequestConst.REQUEST_SADUN_GETINFO,null);
			}
			else{
				view.refreshSadun();
				App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelsuccess'));
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelrefuse',[Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]));
			this.request(NetRequestConst.REQUEST_SADUN_GETINFO,null);
		}

		let rewards = data.data.refuse;
		if(rewards&&rewards.length>0)
		{
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);
		}
	}

	/*
	"adult_attbg","adult_bg","adult_boy","adult_girl","adult_inmarry","adult_lovebg",
	"adult_namebg","adult_q1","adult_q2","adult_q3","adult_q4","adult_q5","adult_q6","adult_q7",
	"adult_smallbg","adultbfang","adultbffont","adultbfgift","adultbfzhong","adultdbanbg",
	"adulthbian","adultlyin","adultlyinfont","adultqxbfang","adultqxlyfont","adultvisiting","adultxxzhong",*/
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"childview_mask", "childview_pic_1", "servant_bottombg",
			"progress11", "progress11_bg","servant_probigbg",
			"childview_boyicon","childview_girlicon","arena_bottom",
			"adultreceivebg","adultvisitbg","adultybfang"
		]);
	}

	protected getRuleInfo(): string {
		return "adult_description";
	}

	private freshAdult(){
		// let adultList = Api.adultVoApi.getAdultVoList();
		if(this._adultInfoVo){
			let id = this._adultInfoVo.id;
			this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(id);
			if(this._adultInfoVo){
				this.updChildAttData(this._adultInfoVo);
				this.refreshItem();
				this.setSelect(id);
			}else{
				this.doRefresh();
			}
		}
		else{
			this.doRefresh();
		}
	}
		

	public dispose(): void {
		
			// 未婚滑动列表
		this._scrollList = null;
		// 已婚滑动列表
		this._scrollList2 = null;
		// 列表
		this._adultInfoVoList = null;
		//孩子母亲
		this._motherText = null;
		//亲密度
		this._intimacyText = null;
		//亲密度描述
		this._intimacyDescText = null;

		//孩子说的话
		this._childWordsText = null;

		//孩m名字
		this._childNameText = null;

		//孩子图片
		this._child_Icon = null;

		//孩子vo
		this._adultInfoVo = null;

		//联姻按钮
		this._childUpdBtn = null;

		//取消联姻按钮
		this._childNameBtn = null;


		//孩子vo
		this._adultMarryInfoVo = null;
		//亲家名字
		this._otherNameText = null;
		//联姻加成
		this._marryBuffText = null;
		//联姻时间
		this._marryTimeText = null;

		//孩子说的话
		this._marryWordsText = null;

		//孩子图片
		this._marryChild_Icon = null;

		//孩子配偶图片
		this._marryChild_Icon2 = null;


		this._curTabIdx=0;

		// this._nameBg: BaseBitmap;
		this._attBg = null;
		this._child_infobg = null;

		//活力恢复时间
		this._vigouTimeText = null;



		this._childContainer = null;
		//已婚子嗣
		this._childContainer2 = null;

		this._childId = null;
		this._childInfoObj = null;
		this._proTxtList = null;
		this._childProCfg = null;
		this._curLevel = null;

		this._child_wordbg = null;
		this._child_wordbgCor = null;
		

		this._marryChild_wordbg = null;
		this._marryChild_wordbgCor = null;

		this._adultScrollItem = null;
		this._adult2ScrollItem = null;

		this._achRedDotSp = null;
		this._achRedDotSp2 = null;
		this._achRedDotSp3 = null;

		if(this._childNameText){
			this._childNameText.removeTouchTap();
		}
		this._marryIndex = 0;
		this._receiveIndex = 0;
		this._marryData = null;
		this._goChildBtn = null;
		this._qualityBB = null;
		this._qualityBg = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_CANCELVISIT),this.cancelVisitCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.refreshSadun,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULTFRESH,this.freshAdult,this);
		super.dispose();
	}
}
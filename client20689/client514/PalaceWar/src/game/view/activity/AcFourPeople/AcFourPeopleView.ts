class AcFourPeopleView extends AcCommonView {


	private _scrollList: ScrollList = null; 
	private _fourPeopleInfoVoList =null;

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;

	public constructor() {
		super();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"forpeople_bottom",
			"forpeople_qualifications",
			"forpeople_top",
			"fourpeople_bg_1",
			"fourpeople_bg_2",
			"fourpeople_bg_3",
			"fourpeople_bg_4",
			"servant_star",
			"achievement_state3",
			"recharge_fnt",
			"fourfloor",
			"fourpecialaura",
			"fourpeople_mask",
			"fourpeople_bottom",
			"forpeople_bg2"
		]);
	}

	protected initView(): void {
		let maskSp = new egret.Shape();
		maskSp.graphics.beginFill(0x000000);
		maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 180);
		maskSp.graphics.endFill();
		maskSp.y = 180;
		this.addChildToContainer(maskSp);

		this.showText();
		this.showList();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);

		//初始化 时间
		let deltaT = this.acVo.et - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}

	}

	private showText(): void {
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = 85;

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 30
		this._activityTimerText.y = 109;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + 33;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ruleText.x = 30
		this._ruleText.y = this._acCDTxt.y + 33;
		this._ruleText.text = LanguageManager.getlocal("acFourPeopleRule"+this.code);
		this.addChildToContainer(this._ruleText);

		//谋士令
		this._inOrderText = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeopleInOrder"+this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._inOrderText.x = 30
		this._inOrderText.y = this._ruleText.y + 33;
		this.addChildToContainer(this._inOrderText);

	}

	protected addChildToContainer(obj: egret.DisplayObject): void {
		if (obj) {
			this.container.addChild(obj);
			this.container.y = 0;
		}
	}
	private showList(): void {

		this._fourPeopleInfoVoList=[];
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._fourPeopleInfoVoList = cfg.getPeopleList(); 
		AcFourPeopleScrollItem.CODE=this.code;

		this._scrollList =null;
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, GameConfig.stageHeigth - 260);
		this._scrollList = ComponentManager.getScrollList(AcFourPeopleScrollItem, this._fourPeopleInfoVoList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(0, 250);

	}

	public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}
		return false;
	}

	public useCallback(event: egret.Event): void 
	{
		if (event.data.ret == true) {
			let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let arr = cfg.getPeopleList();
			this._scrollList.refreshData(arr);
		}
	}
	protected getSheepType(): number {
		return 1;
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);
		this._scrollList = null;
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._inOrderText = null;
		this._ruleText = null;
		this._fourPeopleInfoVoList = null;
		super.dispose();
	}

}
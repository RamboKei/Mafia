class AtkracecrossSummaryView  extends CommonView
{

	private _countDownTime:number = 0;
	private _countDownText:BaseTextField = null;
	private _enterBtn:BaseButton = null;
	private _cdTimeDesc:BaseTextField = null;
	private _cdType:number = 1;//倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时

	private _openDesc:BaseTextField = null;
	private _isCanJoin:number = null; // 0 没资格  1 有资格

	public constructor() 
	{
		super();
	}

	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	//刷新跨服擂台活动数据
	// 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,requestData:{}};
	// }
	
	private refreshInfo():void
	{	
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,{});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let crossVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		if (crossVo.info && crossVo.info.iscanjoin == 1)
		{
			this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
		}
		else 
		{
			this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"atkracecross_bg","atkracecross_title","btn_enter_race","atkracecross_timebg"
		]);
	}

	protected getBgName():string
	{
		return "atkracecross_bg";
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	}

	public initView():void
	{	

		let titlePic:BaseBitmap = BaseBitmap.create("atkracecross_title");
		titlePic.setPosition(GameConfig.stageWidth/2 - titlePic.width/2,10);
		this.addChildToContainer(titlePic);

		//进入擂台按钮
		this._enterBtn = ComponentManager.getButton("btn_enter_race",null,this.enterRackHandler,this,null,0);
		this._enterBtn.setPosition(GameConfig.stageWidth/2 - this._enterBtn.width/2,420);
		this.addChildToContainer(this._enterBtn);

		//底部
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		bottomBg.height = 168;
		bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2,GameConfig.stageHeigth - bottomBg.height);
		this.addChildToContainer(bottomBg);
		
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x =24;
		timeDesc.y =bottomBg.y+30;
		this.addChildToContainer(timeDesc);

		let qualification:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossQualification"), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qualification.x =timeDesc.x;
		qualification.y =timeDesc.y + 35;
		qualification.width = GameConfig.stageWidth - qualification.x*2;
		qualification.lineSpacing = 6;
		this.addChildToContainer(qualification);

		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		if (crossVo.st > GameData.serverTime - timeNumber)
		{	
			this._enterBtn.visible = false;
			this._cdType = 1;
			this._countDownTime = timeNumber - GameData.serverTime + crossVo.st 
		}
		else if (crossVo.et > GameData.serverTime + timeNumber2)
		{
			this._cdType = 2;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else {
			this._cdType = 3;
			this._countDownTime = crossVo.et -  GameData.serverTime;
		}
		//test code 
		// this._cdType = 2;
		// this._countDownTime = 10;

		//顶部
		let topBg:BaseBitmap = BaseBitmap.create("atkracecross_timebg");
		topBg.height = 128;
		topBg.setPosition(GameConfig.stageWidth/2 - topBg.width/2,152);
		this.addChildToContainer(topBg);

		this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime"+this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cdTimeDesc.y =topBg.y + 10;
		this.addChildToContainer(this._cdTimeDesc);

		//倒计时
		this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xe50404);
		this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2 - this._countDownText.width/2;
		this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width , this._cdTimeDesc.y);
		this.addChildToContainer(this._countDownText);

		if (this._cdType == 3)
		{
			this._countDownText.visible = false;
			this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
			this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
		}
		
		this._openDesc = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		this._openDesc.width = 360;
		this._openDesc.setPosition(GameConfig.stageWidth/2 - this._openDesc.width/2 , this._countDownText.y+50);
		this._openDesc.lineSpacing = 6;
		this._openDesc.textAlign = egret.HorizontalAlign.CENTER;
		this.addChildToContainer(this._openDesc);

		if (crossVo.st > GameData.serverTime - 300)
		{	
			this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");
			TimerManager.doTimer(crossVo.st - GameData.serverTime + 300,1,this.refreshInfo,this);
		}
		else 
		{
			this.refreshInfo();
		}
	}

	private enterRackHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVIEW);
		// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSDETAILPOPUPVIEW);
	}

	public tick():void
	{	
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this.refreshEnterBtn();
			}
		}
	}

	private refreshEnterBtn():void
	{
		this._cdType += 1;
		

		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		if (this._cdType == 2)
		{	
			this._enterBtn.visible = true;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else if (this._cdType == 3)
		{
			this._countDownTime = crossVo.et -  GameData.serverTime;
			this._countDownText.visible = false;
			this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
		}
		else if (this._cdType == 4)
		{	
			ViewController.getInstance().hideAllView();
			App.CommonUtil.showTip(LanguageManager.getlocal("atkracecrossEndTip"));
			return;
		}

		this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime"+this._cdType);
		this._countDownText.text = this.getCountTimeStr();

		if (this._cdType == 3)
		{
			this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
		}
	}


	private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{	
		TimerManager.remove(this.refreshInfo,this);
		this._countDownTime = 0;
		this._countDownText = null;
		this._enterBtn = null;
		this._cdTimeDesc = null;
		this._openDesc = null;
		this._isCanJoin = null;

		super.dispose();
	}
}
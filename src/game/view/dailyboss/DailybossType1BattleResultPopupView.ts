class DailybossType1BattleResultPopupView extends BattleWin
{	
	
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		super.initView();
		
		let bossData:any=this.getBattleData();
		let killTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossKillBoss1ResultDesc",[String(bossData.bossLv-1)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		killTxt.textAlign=egret.HorizontalAlign.CENTER;
		killTxt.setPosition((GameConfig.stageWidth-killTxt.width)/2,this._winBg.y+220);
		this.addChildToContainer(killTxt);

		if(bossData.score)
		{
			let scoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc")+App.StringUtil.formatStringColor("+"+bossData.score,TextFieldConst.COLOR_WARN_GREEN),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			scoreTxt.setPosition((GameConfig.stageWidth-scoreTxt.width)/2,killTxt.y+killTxt.height+10);
			this.addChild(scoreTxt);
		}

		let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		closeText.textAlign=egret.HorizontalAlign.CENTER;
		closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,this._winBg.y+this._winBg.height);
		this.addChildToContainer(closeText);

		this.addTouchTap(this.hide,this);
	}

	protected getIsCountDown():boolean
	{
		return false;
	}

	private getBattleData()
	{
		return this.param.data.info;
	}
}
class CityScene extends BaseScene
{
	public constructor()
	{
		super();
	}

	protected setLayerPosition():void
	{
		super.setLayerPosition();
		this._mapLayer.setPosition(0,0);
	}

	private checkDinnerClose():string
	{
		return Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv()?LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]):null;
	}
	public dispose():void
	{
		super.dispose();
	}
}
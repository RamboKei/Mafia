class DailybossScroePopupView extends ScorePopupView
{
	public constructor() 
	{
		super();
	}
	protected getScoreDataList()
	{
		return Config.DailybossCfg.shopList;
	}
	protected initMessage():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY,this.refresh,this);
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}
	protected getListItemClass():any
	{
		return DailybossScroePopupListItem;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY,this.refresh,this);
		super.dispose();
	}
}

class DailybossScroePopupListItem extends ScorePopupListItem
{
	public constructor() 
	{
		super();
	}

	protected needScore():number
	{
		return Api.dailybossVoApi.getShopItemNeedScore(this._data.id);
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit - Api.dailybossVoApi.getShopItemByNum(String(this._idx+1));
		}
		return 1;
	}


	protected getRequestType():string
	{
		return NetRequestConst.REQUEST_DAILYBOSS_BUY;
	}


}
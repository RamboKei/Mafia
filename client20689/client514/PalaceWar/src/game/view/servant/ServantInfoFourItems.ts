/**
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItems
 */
class ServantInfoFourItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);

        let auraList = servantcfg.aura;
		let keysList = Object.keys(auraList);
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-120);
		
		ServantInfoFourItemScrollItem.servantId = this._servantId;

		let scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem,keysList,rect);
		scrollView.y = 90;
		scrollView.x = 24;
		this._scrollView = scrollView;
		this.addChild(scrollView);
	}

    private servantWifeLevelupHandler()
    {
        
    }

    public dispose():void
	{
		this._scrollView = null;
        this._servantId =  null;
		super.dispose();
	}

}
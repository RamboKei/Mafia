/**
 * 门客详情 技能信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoWifeItem
 */
class ServantInfoWifeItem extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _wifeId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
		this._wifeId =  servantcfg.wifeId;
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let wifeSkill = wifecfg.wifeSkill;

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 520;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = 90
		this.addChild( line1);

		let wifeTip = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeTip.textColor = TextFieldConst.COLOR_BROWN;
		let str2 = "";
		if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId))
		{
			str2 = LanguageManager.getlocal("servant_wife_own");
		}else
		{
			str2 = LanguageManager.getlocal("servant_wife_not_own");
		}
		wifeTip.text = LanguageManager.getlocal("servant_wifeTip",[wifecfg.name,str2]);
		wifeTip.x = GameConfig.stageWidth/2 - wifeTip.width/2;
		wifeTip.y = line1.y + line1.height/2 -wifeTip.height/2 ;
		this.addChild(wifeTip);
		
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		let list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-150);
		
		ServantInfoWifeItemScrollItem.servantId = this._servantId;

		let scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem,list,rect);
		scrollView.y = 120;
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
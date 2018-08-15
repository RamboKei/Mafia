/**
 * 副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossPopupView
 */
class AllianceBossPopupView extends PopupView
{
	// 滑动列表
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList: ScrollList;
	private _topTipTF:BaseTextField;
	private _dataLsit:any[] = [];
	public constructor() 
	{
		super();
	}
	public initView():void
	{		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._topTipTF.x = this.viewBg.width/2 - this._topTipTF.width/2;
		this._topTipTF.y = 20;
		this._nodeContainer.addChild(this._topTipTF);
		
		let tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
		
		// let tmplidst2 = Config.AllianceelitebossCfg.getAllainceCfgIdList().sort((a:string,b:string)=>{
		// 	return Number(a.substring(1)) - Number(b.substring(1));
		// });

		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let myAlliLv = alliVo.level;
		let dataList = []
		for (var index = 0; index < tmpList.length; index++) {
			if (Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index]).needAllianceLv <= myAlliLv)
			{
				dataList.push(tmpList[index]);
			}
		}
		this._dataLsit = dataList;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,this.viewBg.width,690);
		this._scrollList = ComponentManager.getScrollList(AllianceBossScrollItem,dataList,rect);
		this._scrollList.x = 25;
		this._scrollList.y = this._topTipTF.y + 30;
		this._nodeContainer.addChild(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));

		let bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        bottomTipTxt.x = this.viewBg.width/2 - bottomTipTxt.width/2;
        bottomTipTxt.y = this._scrollList.y + rect.height + 10;
        this._nodeContainer.addChild(bottomTipTxt);

	}
	protected showBossLog(event:egret.Event)
	{
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
		
		}
		this._scrollList.refreshData(this._dataLsit);
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }
	protected getShowHeight():number
	{
		return 850;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		,"searchbinfowifebg","progress5","progress3_bg","alliance_effect",
		"allianceBossbg","allianceview_itembossbg"
		]);
	}


	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);

		// 未婚滑动列表
		this._scrollList = null;
		this._nodeContainer = null;
		this._topTipTF = null;
		this._dataLsit = [];
		super.dispose();
	}
}
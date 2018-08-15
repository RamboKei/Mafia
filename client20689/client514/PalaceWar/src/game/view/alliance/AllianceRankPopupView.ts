/**
 * 排名
 * author dky
 * date 2017/11/28
 * @class AllianceRankPopupView
 */
class AllianceRankPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _rankData :any;
	private _rank :number = 0;
	private _index:number = 0;
	private _allianceVo :AllianceVo;

	// private _punishRewardList: any = {};

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE,this.doApply,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE,this.doCancel,this);
		// this._rankData = this.param.data.acData;
		this._allianceVo = Api.allianceVoApi.getAllianceVo();

		let tabName = ["allianceRankTab1"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 35;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);

		let bg1= BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 555;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);

      

        let bg3= BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);

		let allianceVo
		let allianceStr  = "";
		if(Api.playerVoApi.getPlayerAllianceId() == 0){
			allianceStr = LanguageManager.getlocal("allianceRankMyAlliance",[LanguageManager.getlocal("allianceRankNoAlliance")])
		}
		else{
			allianceStr = LanguageManager.getlocal("allianceRankMyAlliance",[Api.playerVoApi.getPlayerAllianceName()])
		}
		
		let allianceTxt = ComponentManager.getTextField(allianceStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        allianceTxt.x = bg3.x + 50;
        allianceTxt.y = bg3.y + bg3.height/2 - allianceTxt.height/2;
        this.addChildToContainer(allianceTxt);

		let rankeStr  = "";
		if(Api.playerVoApi.getPlayerAllianceId() == 0){
			rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank",[LanguageManager.getlocal("allianceRankNoRank")])
		}
		else{
			rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank",[this._rank.toString()]);
		}
		
		let rankTxt = ComponentManager.getTextField(rankeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        rankTxt.x = bg3.x + 330;
        rankTxt.y = bg3.y + bg3.height/2 - rankTxt.height/2;
        this.addChildToContainer(rankTxt);

		
		let dataList = this._rankData;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 10,bg1.height - 27);
		this._scrollList = ComponentManager.getScrollList(AllianceRankScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.x = bg1.x + 5;
		this._scrollList.y = bg1.y + 10;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceRankNoAlliance"));

	}

	/**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST,requestData:{}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if (data.data.data.allianceFlag == 1 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			this.hide();
			return;
		}
		if (data.data.data.allianceFlag == 2 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
			return;
		}
		if (data.data.data.allianceFlag == 3 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST)
		{
			this._rankData  = data.data.data.alliancelist;
			this._rank  = data.data.data.arank;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE)
		{
			let index = this._index;
			let wideItem = <AllianceRankScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTipSuccess"));
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY)
		{
			let index = this._index;
			let wideItem = <AllianceRankScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceCancelApplyTip"));
		}

		
	}
	private doApply(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE,{aid:event.data.aid});
	}
	private doCancel(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY,{aid:event.data.aid});
	}


	private rankBtnClick()
	{

	}

	protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
    }
    protected refreshRankList()
    {
	}


	public hide():void
	{
		super.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"dinner_rankbg","dinnerrankpopupview","dinner_line","dinner_rank_titlebg",
					]);
	}



	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE,this.doApply,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE,this.doCancel,this);
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._allianceVo = null;
		this._index = null;
		this._rank = 0;
		this._curTabIdx = 0;

		super.dispose();
	}
}
/**
 *帮会任务
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskView
 */
class AllianceTaskView extends CommonView
{

	private _scrollView:ScrollList = null;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let buttombg = BaseBitmap.create("arena_bottom");
		buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
		this.addChildToContainer(buttombg);

		let rankBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnRank",this.rankBtnHandler,this);
		rankBtn.x =  buttombg.x +30;
		rankBtn.y = buttombg.y + buttombg.height/2 - rankBtn.height/2;
		this.addChildToContainer(rankBtn);

		let buffBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnBuff",this.buffBtnHandler,this);
		buffBtn.x = buttombg.x + buttombg.width/2 - rankBtn.width/2;
		buffBtn.y = rankBtn.y;
		this.addChildToContainer(buffBtn);

		let rewardBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnReward",this.rewardBtnHandler,this);
		rewardBtn.x = buttombg.x + buttombg.width - rewardBtn.width - rankBtn.x; 
		rewardBtn.y = rankBtn.y 
		this.addChildToContainer(rewardBtn);

		let rect = new egret.Rectangle(0,0,622, buttombg.y - 10);
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskScrollItem,list,rect);
		this._scrollView.y = -10;
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this.addChildToContainer(this._scrollView);
	}

	protected rewardBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKREWARDVIEW);
	}

	protected rankBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW,{taskId:null,alliRank:1});
	}

	protected buffBtnHandler()
	{
		let tws = App.DateUtil.getWeeTs(GameData.serverTime);
		if(GameData.serverTime + 1800 >= tws + 86400 )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKBUFFLISTPOPUPVIEW);
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{

	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ALLIANCETASK_INIT,requestData:{}};
	}
	protected getRuleInfo():string
	{
		return "allianceTaskRuleInfo";
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"arena_bottom","progress3","progress3_bg",
			"alliance_taskAttrbg1",
			"alliance_taskAttrbg2",
			"alliance_taskAttrbg3",
			"alliance_taskAttrbg4",
			"alliance_taskAttrWordbg",
			"alliance_taskbg",
			"alliance_taskIcon1",
			"alliance_taskIcon2",
			"alliance_taskIcon3",
			"alliance_taskIcon4",
			"alliance_taskIcon5",
			"alliance_taskimg1",
			"alliance_taskwotdbg1",
			"alliance_taskwotdbg2",
			"alliance_taskwotdbg3",
		]);
	}

	public dispose():void
	{
		this._scrollView = null;
		super.dispose();
	}
}
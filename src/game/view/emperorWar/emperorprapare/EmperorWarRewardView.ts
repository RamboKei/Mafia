/**
 * author:qianjun
 * desc:奖励弹窗
*/
class EmperorWarRewardView extends CommonView
{
	public constructor() {
		super();
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"emperorWarRewardViewTab1",
			"emperorWarRewardViewTab2",
		];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"itemeffect","emparena_bottom","emptquan",
			"prestige_prerogative1","prestige_prerogative2","prestige_prerogative3","prestige_prerogative1_down","prestige_prerogative2_down","prestige_prerogative3_down"
		]);
	}

	private get api(){
        return Api.emperorwarVoApi;
    }

	private _topBg : BaseBitmap = null;
	public initView():void
	{	
		let view = this;
		let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
		view.addChild(emparena_bottom);

		let topBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		topBg.width = GameConfig.stageWidth+18;
		topBg.height = emparena_bottom.y - view.tabbarGroup.y - view.tabbarGroup.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view, [0,view.tabbarGroup.y + view.tabbarGroup.height - 5]);
		let index = view.getChildIndex(view.tabbarGroup);
		view.addChildAt(topBg, index - 1);
		view._topBg = topBg;

		let cheerForinfo = view.api.getBmDataByKV('uid',view.api.getZhuweiID());
		let ttaitext = '';
		if(cheerForinfo){
			let taotai = view.api.type == 5 ? (cheerForinfo.status < 5) : false;
			ttaitext = taotai ? LanguageManager.getlocal(`emperorWarTtai`) : ``;
		}
		let name = cheerForinfo ? cheerForinfo.name : LanguageManager.getlocal('nothing');
		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarCheerFor`,[name, ttaitext]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, desc1, emparena_bottom, [10,0]);
		view.addChild(desc1);

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal(`atkracecrossActivityRewardTxt5`), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, desc2, emparena_bottom, [10,0]);
		view.addChild(desc2);
	}

	public getViewBg():BaseBitmap{
		let view = this;
		return view._topBg;
	}

	public dispose():void
	{
		super.dispose();
	}
}
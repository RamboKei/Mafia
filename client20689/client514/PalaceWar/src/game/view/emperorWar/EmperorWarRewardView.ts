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
			"EmperorWarRewardViewTab1",
			"EmperorWarRewardViewTab2",
		];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"itemeffect",
		]);
	}

	protected initView():void
	{	
		let view = this;
		let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
		view.addChild(emparena_bottom);

		let topBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		topBg.width = GameConfig.stageWidth+18;
		topBg.height = emparena_bottom.y - view.tabbarGroup.y - view.tabbarGroup.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, [0,view.tabbarGroup.y + view.tabbarGroup.height]);
		view.addChild(topBg);

		let taotai = Math.floor(Math.random() * 2) == 1;
		let ttaitext = taotai ? LanguageManager.getlocal(`emperorWarTtai`) : ``;
		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarCheerFor`,[`阿萨德穆萨`, ttaitext]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, desc1, emparena_bottom, [10,0]);
		view.addChild(desc1);

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal(`atkracecrossActivityRewardTxt5`), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, desc2, emparena_bottom, [10,0]);
		view.addChild(desc2);
	}

	public dispose():void
	{
		

		super.dispose();
	}
}
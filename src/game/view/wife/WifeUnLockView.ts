/**
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeUnLockView
 */
class WifeUnLockView extends CommonView
{
	private _wifVoApi:WifeVoApi;
	public constructor() 
	{
		super();
	}
	protected initView():void
	{
		this._wifVoApi = Api.wifeVoApi;
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		// if(unlockList.length <= 0 )
		// {
		// 	return;
		// }

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 120;
		this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 0,GameConfig.stageHeigth - this.container.y + 20);
		let scrollList = ComponentManager.getScrollList(WifeScrollItem2,unlockList,rect);
		scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
		this.addChildToContainer(scrollList);
		scrollList.setPosition(0,-15);
	}

	public dispose():void
	{
		
		super.dispose();
	}
}
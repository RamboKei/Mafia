/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
namespace LayerManager 
{
	/**
	 * 场景，地图，建筑等最底层图层
	 */
	export let bgLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 主UI等标题栏，菜单栏等界面图层
	 */
	export let uiLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 功能界面图层
	 */
	export let panelLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * loading，全屏遮罩图层
	 */
	export let maskLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 提示，警告等游戏提示图层
	 */
	export let msgLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 初始化游戏图层
	 * @param layerContiner 图层父容器
	 */
	export function initLayer(layerContiner:egret.DisplayObjectContainer):void
	{
		bgLayer=new BaseDisplayObjectContainer();
		uiLayer=new BaseDisplayObjectContainer();
		panelLayer=new BaseDisplayObjectContainer();
		maskLayer=new BaseDisplayObjectContainer();
		msgLayer=new BaseDisplayObjectContainer();

		layerContiner.addChild(bgLayer);
		layerContiner.addChild(uiLayer);
		layerContiner.addChild(panelLayer);
		layerContiner.addChild(maskLayer);
		layerContiner.addChild(msgLayer);

		if(App.DeviceUtil.checkIsFullscreen())
		{
			let layerY:number=(GameConfig.stage.stageHeight-GameConfig.stageHeigth)*0.5;
			bgLayer.y=layerY;
			uiLayer.y=layerY;
			panelLayer.y=layerY;
			maskLayer.y=layerY;
			msgLayer.y=layerY;
			GameData.layerPosY=layerY;
		}
	}
}
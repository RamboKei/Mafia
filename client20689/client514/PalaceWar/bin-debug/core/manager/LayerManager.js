/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
var LayerManager;
(function (LayerManager) {
    /**
     * 场景，地图，建筑等最底层图层
     */
    LayerManager.bgLayer = undefined;
    /**
     * 主UI等标题栏，菜单栏等界面图层
     */
    LayerManager.uiLayer = undefined;
    /**
     * 功能界面图层
     */
    LayerManager.panelLayer = undefined;
    /**
     * loading，全屏遮罩图层
     */
    LayerManager.maskLayer = undefined;
    /**
     * 提示，警告等游戏提示图层
     */
    LayerManager.msgLayer = undefined;
    /**
     * 初始化游戏图层
     * @param layerContiner 图层父容器
     */
    function initLayer(layerContiner) {
        LayerManager.bgLayer = new BaseDisplayObjectContainer();
        LayerManager.uiLayer = new BaseDisplayObjectContainer();
        LayerManager.panelLayer = new BaseDisplayObjectContainer();
        LayerManager.maskLayer = new BaseDisplayObjectContainer();
        LayerManager.msgLayer = new BaseDisplayObjectContainer();
        layerContiner.addChild(LayerManager.bgLayer);
        layerContiner.addChild(LayerManager.uiLayer);
        layerContiner.addChild(LayerManager.panelLayer);
        layerContiner.addChild(LayerManager.maskLayer);
        layerContiner.addChild(LayerManager.msgLayer);
    }
    LayerManager.initLayer = initLayer;
})(LayerManager || (LayerManager = {}));

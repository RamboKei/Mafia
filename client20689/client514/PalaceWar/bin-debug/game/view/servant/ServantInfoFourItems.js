var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItems
 */
var ServantInfoFourItems = (function (_super) {
    __extends(ServantInfoFourItems, _super);
    function ServantInfoFourItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoFourItems.prototype.init = function (servantId, bottomH) {
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var auraList = servantcfg.aura;
        var keysList = Object.keys(auraList);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 120);
        ServantInfoFourItemScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem, keysList, rect);
        scrollView.y = 90;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantInfoFourItems.prototype.servantWifeLevelupHandler = function () {
    };
    ServantInfoFourItems.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoFourItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoFourItems.prototype, "ServantInfoFourItems");

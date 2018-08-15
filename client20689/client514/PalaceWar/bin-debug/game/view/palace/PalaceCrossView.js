/**
 * 跨服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceCrossView
 *  与 PalaceView 的差异仅表现在posCfg 和背景图上，无它
 */
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
var PalaceCrossView = (function (_super) {
    __extends(PalaceCrossView, _super);
    function PalaceCrossView() {
        return _super.call(this) || this;
    }
    PalaceCrossView.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    PalaceCrossView.prototype.initPosCfg = function () {
        this._posList = [
            { x: 141, y: 281, width: 280, heigh: 200, shadowId: 6, flagId: 5, ennameX: 236, ennameY: 290 },
            { x: 78, y: 579, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 96, ennameY: 560 },
            { x: 372, y: 579, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 390, ennameY: 560 },
            { x: 64, y: 742, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 82, ennameY: 718 },
            { x: 389, y: 742, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 406, ennameY: 718 },
            { x: 49, y: 890, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 68, ennameY: 864 },
            { x: 407, y: 890, width: 170, heigh: 100, shadowId: 7, flagId: 5, ennameX: 424, ennameY: 864 },
        ];
    };
    PalaceCrossView.prototype.getStartIdx = function () {
        return 0;
    };
    PalaceCrossView.prototype.getCorssBtnPath = function () {
        return "palacve_backBtn";
    };
    PalaceCrossView.prototype.crossBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
        this.hide();
    };
    PalaceCrossView.prototype.getBgRes = function () {
        return "palace_bg3";
    };
    PalaceCrossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_bg3",
            "palace_shadow6", "palace_shadow7",
            "palace_building_flag5",
        ]);
    };
    ;
    PalaceCrossView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, requestData: {} };
    };
    PalaceCrossView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PalaceCrossView;
}(PalaceView));
__reflect(PalaceCrossView.prototype, "PalaceCrossView");

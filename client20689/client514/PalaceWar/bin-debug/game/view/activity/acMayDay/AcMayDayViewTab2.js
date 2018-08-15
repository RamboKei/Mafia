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
/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab2 累计充值
*/
var AcMayDayViewTab2 = (function (_super) {
    __extends(AcMayDayViewTab2, _super);
    function AcMayDayViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isSpecial = false;
        _this._seprateNum = 0;
        _this.initView();
        return _this;
    }
    AcMayDayViewTab2.prototype.initView = function () {
        var bottomBg = BaseBitmap.create("public_9_bg43");
        bottomBg.width = 625;
        bottomBg.height = GameConfig.stageHeigth - 410;
        bottomBg.x = 5;
        bottomBg.y = -180;
        this.addChild(bottomBg);
        var aid = AcMayDayView.AID;
        var code = AcMayDayView.CODE;
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);
        var objList = this.cfg.recharge;
        var terList = {};
        // for (var key in objList) {
        // 	let tmpCfg = objList[key];
        // 		this._seprateNum = tmpCfg.needGem;
        // 		terList[key] = tmpCfg;
        // }
        var keys = Object.keys(objList);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 430);
        var scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem, keys, tmpRect);
        scrollList.setPosition(20, -170);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    Object.defineProperty(AcMayDayViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcMayDayViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab2;
}(CommonViewTab));
__reflect(AcMayDayViewTab2.prototype, "AcMayDayViewTab2");

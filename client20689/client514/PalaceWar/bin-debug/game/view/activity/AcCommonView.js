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
var AcCommonView = (function (_super) {
    __extends(AcCommonView, _super);
    function AcCommonView() {
        var _this = _super.call(this) || this;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    Object.defineProperty(AcCommonView.prototype, "code", {
        get: function () {
            return this.param.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCommonView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCommonView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aidAndCode) + "_Title";
    };
    AcCommonView.prototype.getTitleParams = function () {
        return null;
    };
    return AcCommonView;
}(CommonView));
__reflect(AcCommonView.prototype, "AcCommonView");

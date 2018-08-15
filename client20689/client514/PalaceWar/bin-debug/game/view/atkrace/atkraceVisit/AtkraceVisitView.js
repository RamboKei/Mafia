/**
 * 来访消息主界面
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
var AtkraceVisitView = (function (_super) {
    __extends(AtkraceVisitView, _super);
    function AtkraceVisitView() {
        return _super.call(this) || this;
    }
    AtkraceVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    AtkraceVisitView.prototype.getShowHeight = function () {
        return 750;
    };
    AtkraceVisitView.prototype.initView = function () {
    };
    // protected getTabbarGroupY():number
    // {
    // 	return 50;
    // }
    AtkraceVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    AtkraceVisitView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceVisitView;
}(PopupView));
__reflect(AtkraceVisitView.prototype, "AtkraceVisitView");

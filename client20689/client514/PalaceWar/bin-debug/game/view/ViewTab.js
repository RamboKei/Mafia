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
var ViewTab = (function (_super) {
    __extends(ViewTab, _super);
    function ViewTab() {
        return _super.call(this) || this;
    }
    ViewTab.prototype.init = function () {
    };
    /**
     * 切换页签
     */
    ViewTab.prototype.refreshWhenSwitchBack = function () {
    };
    ViewTab.prototype.getViewTitleButtomY = function () {
        var className = this.getClassName();
        className = this.getClassName().substring(0, className.indexOf("Tab"));
        var view = ViewController.getInstance().getView(className);
        return view["getTitleButtomY"]();
    };
    ViewTab.prototype.getParent = function () {
        return null;
    };
    ViewTab.prototype.getResourceList = function () {
        return [];
    };
    return ViewTab;
}(BaseLoadDisplayObjectContiner));
__reflect(ViewTab.prototype, "ViewTab");

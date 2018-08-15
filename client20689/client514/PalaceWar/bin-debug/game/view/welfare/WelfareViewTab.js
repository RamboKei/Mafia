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
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
var WelfareViewTab = (function (_super) {
    __extends(WelfareViewTab, _super);
    function WelfareViewTab() {
        var _this = _super.call(this) || this;
        _this.isWanbaBoo = false;
        return _this;
    }
    WelfareViewTab.prototype.init = function () {
        this.isWanbaBoo = Api.switchVoApi.checknewRecharge();
        var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        if (totalSignDay <= 6 && this.getResPreName() == "signin") {
            logdStr = BaseBitmap.create(this.getResPreName() + "2_bg");
            if (totalSignDay <= 2) {
                logdStr = BaseBitmap.create(this.getResPreName() + "3_bg");
            }
        }
        else if (this.getResPreName() == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            // vip折扣
            var picname = this.getResPreName() + "_discount_bg";
            logdStr = BaseBitmap.create(picname);
        }
        else if (this.isWanbaBoo && this.getResPreName() == "firstrecharge") {
            var picname = "firstrecharge2_bg";
            logdStr = BaseBitmap.create(picname);
        }
        var bg = logdStr;
        this.addChild(bg);
        this.bottomBg = BaseBitmap.create("common_9_bg");
        this.bottomBg.y = bg.height;
        this.bottomBg.height = GameConfig.stageHeigth - 89 - bg.height;
        this.addChild(this.bottomBg);
    };
    WelfareViewTab.prototype.getParent = function () {
        return null;
    };
    WelfareViewTab.prototype.getResourceList = function () {
        var preName = this.getResPreName();
        var arr = [];
        arr.push(preName + "_btn");
        if (preName == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            arr.push(preName + "_discount_bg");
        }
        else {
            arr.push(preName + "_bg");
        }
        var descImage = preName + "_desc";
        var iconImage = preName + "_icon";
        if (RES.hasRes(descImage)) {
            arr.push(descImage);
        }
        if (RES.hasRes(iconImage)) {
            arr.push(iconImage);
        }
        return arr;
    };
    WelfareViewTab.prototype.getResPreName = function () {
        var className = egret.getQualifiedClassName(this);
        var preName = className.substring(11, className.length);
        return preName.toLowerCase();
    };
    WelfareViewTab.prototype.dispose = function () {
        if (this.bottomBg) {
            this.removeChild(this.bottomBg);
            this.bottomBg.dispose();
            this.bottomBg = null;
        }
        _super.prototype.dispose.call(this);
    };
    return WelfareViewTab;
}(BaseLoadDisplayObjectContiner));
__reflect(WelfareViewTab.prototype, "WelfareViewTab");

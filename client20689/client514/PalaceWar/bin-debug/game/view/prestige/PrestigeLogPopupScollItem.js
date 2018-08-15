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
var PrestigeLogPopupScollItem = (function (_super) {
    __extends(PrestigeLogPopupScollItem, _super);
    function PrestigeLogPopupScollItem() {
        return _super.call(this) || this;
    }
    PrestigeLogPopupScollItem.prototype.initItem = function (index, data) {
        this.width = 526;
        this.height = 75;
        var bgImg = BaseBitmap.create("public_9_probiginnerbg");
        bgImg.width = 526;
        bgImg.height = 71;
        this.addChild(bgImg);
        /**
        --log
        --{dtype:类型 ,st:时间,v:值}
        --0做成 每日任务
        --1-14 各种冲榜
         */
        var typeStr;
        if (data.dtype == 0) {
            typeStr = LanguageManager.getlocal("dailyTaskViewTitle");
        }
        else {
            typeStr = LanguageManager.getlocal("acRankActive-" + data.dtype + "_Title");
        }
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLogDesc", [typeStr, String(data.v)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descTxt.x = 13;
        descTxt.y = 10;
        descTxt.width = 500;
        descTxt.lineSpacing = 5;
        this.addChild(descTxt);
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.st, 2), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTxt.x = bgImg.width - timeTxt.width - 10;
        timeTxt.y = 43;
        this.addChild(timeTxt);
    };
    PrestigeLogPopupScollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PrestigeLogPopupScollItem;
}(ScrollListItem));
__reflect(PrestigeLogPopupScollItem.prototype, "PrestigeLogPopupScollItem");

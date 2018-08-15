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
var AtkracecrossServerItem = (function (_super) {
    __extends(AtkracecrossServerItem, _super);
    function AtkracecrossServerItem() {
        return _super.call(this) || this;
    }
    AtkracecrossServerItem.prototype.initItem = function (index, data) {
        this.width = GameConfig.stageWidth;
        this.height = 40;
        var rankTxt = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.setPosition(GameConfig.stageWidth / 2 - 155 - rankTxt.width / 2, this.height / 2 - rankTxt.height / 2);
        this.addChild(rankTxt);
        var nameTxt = ComponentManager.getTextField(data.zid + LanguageManager.getlocal("serverListServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = GameConfig.stageWidth / 2 - nameTxt.width / 2;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(String(data.point), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = GameConfig.stageWidth / 2 + 155 - scoreTxt.width / 2;
        scoreTxt.y = rankTxt.y;
        this.addChild(scoreTxt);
    };
    AtkracecrossServerItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossServerItem;
}(ScrollListItem));
__reflect(AtkracecrossServerItem.prototype, "AtkracecrossServerItem");

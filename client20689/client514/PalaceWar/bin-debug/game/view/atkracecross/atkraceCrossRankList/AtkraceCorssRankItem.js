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
var AtkraceCorssRankItem = (function (_super) {
    __extends(AtkraceCorssRankItem, _super);
    function AtkraceCorssRankItem() {
        return _super.call(this) || this;
    }
    AtkraceCorssRankItem.prototype.initItem = function (index, data) {
        this.width = 502;
        this.height = 52;
        if (index < 3) {
            var rankImg = BaseBitmap.create("rankinglist_rank" + String(index + 1));
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankImg = BaseBitmap.create("rankinglist_rankbg");
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = 62 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = 220 - nameTxt.width / 2 - 40;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var serverTxt = ComponentManager.getTextField(data.zid, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverTxt.x = 290; ////220 - nameTxt.width/2+90;
        serverTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = 404 - scoreTxt.width / 2 + 20;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
        if (Api.playerVoApi.getPlayerName() == data.name) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            serverTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
    };
    AtkraceCorssRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceCorssRankItem;
}(ScrollListItem));
__reflect(AtkraceCorssRankItem.prototype, "AtkraceCorssRankItem");

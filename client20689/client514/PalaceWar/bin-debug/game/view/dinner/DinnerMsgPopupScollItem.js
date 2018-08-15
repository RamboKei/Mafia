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
var DinnerMsgPopupScollItem = (function (_super) {
    __extends(DinnerMsgPopupScollItem, _super);
    function DinnerMsgPopupScollItem() {
        return _super.call(this) || this;
    }
    DinnerMsgPopupScollItem.prototype.initItem = function (index, data) {
        this.width = 502;
        this.height = 124;
        var rankImg = BaseBitmap.create("dinner_rankbg");
        rankImg.x = 37 - rankImg.width / 2;
        rankImg.y = 20;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = rankImg.x + rankImg.width / 2 - rankTxt.width / 2;
        rankTxt.y = rankImg.y + rankImg.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
        var descStr = LanguageManager.getlocal("dinnerMsgDesc", [type, data.num, data.enemy_num]);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTxt.x = 70;
        descTxt.y = 20;
        this.addChild(descTxt);
        var timeStr = LanguageManager.getlocal("dinnerMsgTime", [App.DateUtil.getFormatBySecond(data.start_time, 2)]);
        var timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        timeTxt.x = descTxt.x;
        timeTxt.y = descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);
        var score1 = data.point;
        var score2 = data.score;
        if (score1 >= 0) {
            score1 = "+" + score1;
        }
        if (score2 >= 0) {
            score2 = "+" + score2;
        }
        var scoreStr = LanguageManager.getlocal("dinnerMsgInfo", [score1, score2]);
        var scoreTxt = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        scoreTxt.x = descTxt.x;
        scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y = timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
    };
    DinnerMsgPopupScollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerMsgPopupScollItem;
}(ScrollListItem));
__reflect(DinnerMsgPopupScollItem.prototype, "DinnerMsgPopupScollItem");

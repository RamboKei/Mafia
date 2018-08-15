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
 * 报名册item
 * author qianjun
 */
var EmperorWarBmceScrollItem = (function (_super) {
    __extends(EmperorWarBmceScrollItem, _super);
    function EmperorWarBmceScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        return _this;
    }
    EmperorWarBmceScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._rowIdx = index;
        view._uiData = data;
        view.width = data.width;
        view.height = 52;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (view._uiData.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var pos_arr = data.pos_arr;
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.name;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[0] + (48 - nameTxt.textWidth) / 2, 0]);
        view.addChild(nameTxt);
        if (view._uiData.title != "") {
            var officerImg = BaseLoadBitmap.create("user_title_" + view._uiData.title + "_3");
            var deltaV = 0.8;
            officerImg.width = 155 * deltaV;
            officerImg.height = 59 * deltaV;
            view.setLayoutPosition(LayoutConst.leftverticalCenter, officerImg, view, [pos_arr[1] + (48 - officerImg.width) / 2, 0]);
            view.addChild(officerImg);
        }
        else {
            var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            officerTxt.text = LanguageManager.getlocal("officialTitle" + this._uiData.level);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, officerTxt, view, [pos_arr[1] + (48 - officerTxt.textWidth) / 2, 0]);
            view.addChild(officerTxt);
        }
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
        view.setLayoutPosition(LayoutConst.leftverticalCenter, powerTxt, view, [pos_arr[2] + (48 - powerTxt.textWidth) / 2, 0]);
        view.addChild(powerTxt);
        if (data.end) {
            var rwbTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rwbTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.rwb));
            view.setLayoutPosition(LayoutConst.leftverticalCenter, rwbTxt, view, [pos_arr[3] + (72 - rwbTxt.textWidth) / 2, 0]);
            view.addChild(rwbTxt);
        }
        var lineImg = BaseBitmap.create("rank_line");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        view.addChild(lineImg);
        this.cacheAsBitmap = true;
    };
    EmperorWarBmceScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    EmperorWarBmceScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    EmperorWarBmceScrollItem.prototype.dispose = function () {
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarBmceScrollItem;
}(ScrollListItem));
__reflect(EmperorWarBmceScrollItem.prototype, "EmperorWarBmceScrollItem");

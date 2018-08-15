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
var ScorePopupView = (function (_super) {
    __extends(ScorePopupView, _super);
    function ScorePopupView() {
        return _super.call(this) || this;
    }
    ScorePopupView.prototype.initView = function () {
        this.initMessage();
        this._leftScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossCanUseScoreNumDesc", [this.getOwnScoreNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._leftScoreTxt.setPosition(this.viewBg.x + (this.viewBg.width - this._leftScoreTxt.width) / 2, 10);
        this.addChildToContainer(this._leftScoreTxt);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        bg.height = 610 + 27;
        bg.setPosition(15, this._leftScoreTxt.y + this._leftScoreTxt.height + 10);
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 600 + 25);
        this._scrollList = ComponentManager.getScrollList(this.getListItemClass(), this.getScoreDataList(), rect);
        this._scrollList.setPosition(bg.x + 5, bg.y + 5 + 3);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this.addChildToContainer(this._scrollList);
    };
    ScorePopupView.prototype.initMessage = function () {
    };
    ScorePopupView.prototype.refresh = function (e) {
        var data = e ? e.data : null;
        if (data.data.data && data.data.data.rewards) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
        }
        if (this._leftScoreTxt) {
            this._leftScoreTxt.text = LanguageManager.getlocal("dailybossCanUseScoreNumDesc", [this.getOwnScoreNum().toString()]);
        }
    };
    ScorePopupView.prototype.getListItemClass = function () {
        return ScorePopupListItem;
    };
    ScorePopupView.prototype.getScoreDataList = function () {
        return [];
    };
    ScorePopupView.prototype.getTitleStr = function () {
        return "dinnerExchangePopupViewTitle";
    };
    ScorePopupView.prototype.getOwnScoreNum = function () {
        return 0;
    };
    ScorePopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ScorePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ScorePopupView;
}(PopupView));
__reflect(ScorePopupView.prototype, "ScorePopupView");
var ScorePopupListItem = (function (_super) {
    __extends(ScorePopupListItem, _super);
    function ScorePopupListItem() {
        var _this = _super.call(this) || this;
        _this._needTxt = null;
        _this._canNumTxt = null;
        _this._idx = 0;
        return _this;
    }
    ScorePopupListItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(this.getRequestType(), this.refresh, this);
        this._data = data;
        this._idx = index;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 120;
        this.addChild(bg);
        var icon = data.iconContainer;
        icon.setPosition(10, bg.y + (bg.height - icon.height) / 2);
        this.addChild(icon);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        nameTxt.setPosition(icon.x + icon.width + 10, icon.y + 10);
        this.addChild(nameTxt);
        var score = this.needScore();
        if (!score) {
            score = 0;
        }
        this._needTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopNeedDesc", [score.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._needTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 10);
        this.addChild(this._needTxt);
        this._canNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc", [this.canExchangeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._canNumTxt.setPosition(this._needTxt.x, this._needTxt.y + this._needTxt.height + 10);
        this.addChild(this._canNumTxt);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeHandler, this);
        btn.setPosition(bg.x + bg.width - btn.width - 20, bg.y + (bg.height - btn.height) / 2);
        this.addChild(btn);
    };
    ScorePopupListItem.prototype.needScore = function () {
        return 0;
    };
    ScorePopupListItem.prototype.canExchangeNum = function () {
        if (this._data.limit) {
            return this._data.limit;
        }
        return 1;
    };
    ScorePopupListItem.prototype.getOwnScoreNum = function () {
        return Api.dailybossVoApi.getScore();
    };
    ScorePopupListItem.prototype.exchangeHandler = function () {
        if (this.getOwnScoreNum() < this.needScore()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
            return;
        }
        if (this.canExchangeNum() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        NetManager.request(this.getRequestType(), { itemKey: this._data.id });
    };
    ScorePopupListItem.prototype.refresh = function () {
        var score = this.needScore();
        if (!score) {
            score = 0;
        }
        this._needTxt.text = LanguageManager.getlocal("dailybossScoreShopNeedDesc", [score.toString()]);
        this._canNumTxt.text = LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc", [this.canExchangeNum().toString()]);
    };
    ScorePopupListItem.prototype.getRequestType = function () {
        return "重写getRequestType方法，返回cmd";
    };
    ScorePopupListItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(this.getRequestType(), this.refresh, this);
        this._needTxt = null;
        this._canNumTxt = null;
        this._idx = 0;
        _super.prototype.dispose.call(this);
    };
    return ScorePopupListItem;
}(ScrollListItem));
__reflect(ScorePopupListItem.prototype, "ScorePopupListItem");

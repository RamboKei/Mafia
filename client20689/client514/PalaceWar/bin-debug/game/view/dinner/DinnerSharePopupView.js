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
var DinnerSharePopupView = (function (_super) {
    __extends(DinnerSharePopupView, _super);
    function DinnerSharePopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    DinnerSharePopupView.prototype.getTitleStr = function () {
        return "dinner_share";
    };
    DinnerSharePopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var btnArray = ["share_to_world"];
        if (Api.playerVoApi.getPlayerAllianceId() > 0) {
            btnArray.push("share_to_alliance");
        }
        for (var i = 0; i < btnArray.length; i++) {
            var item = this.getItem(btnArray[i], i);
            item.setPosition(this.viewBg.width / 2 - item.width / 2, 40 + i * 82);
            this.addChildToContainer(item);
        }
    };
    DinnerSharePopupView.prototype.getItem = function (text, idx) {
        var container = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9_bg28");
        itemBg.width = 500;
        container.addChild(itemBg);
        var extendTf = ComponentManager.getTextField(LanguageManager.getlocal(text), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        extendTf.x = container.width / 2 - extendTf.width / 2;
        extendTf.y = container.height / 2 - extendTf.height / 2;
        container.addChild(extendTf);
        itemBg.addTouch(this.eventHandler, this, [idx, itemBg]);
        return container;
    };
    DinnerSharePopupView.prototype.doShareDinner = function (idx) {
        if (GameData.serverTime - Api.dinnerVoApi.lastShareTime[idx] < 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip"));
            return;
        }
        Api.dinnerVoApi.lastShareTime[idx] = GameData.serverTime;
        var chatData = {};
        if (idx == 0) {
            chatData.channel = 1;
        }
        else {
            chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        }
        var typeStr = LanguageManager.getlocal("dinnerTitle" + [Api.dinnerVoApi.getDtype().toString()]);
        chatData.message = LanguageManager.getlocal("dinner_share_text", [Api.playerVoApi.getPlayerName(), typeStr]);
        NetManager.requestChat(chatData);
        App.CommonUtil.showTip(LanguageManager.getlocal("share_success"));
        NetManager.request(NetRequestConst.REQUEST_DINNER_SHAREDINNER, {});
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    DinnerSharePopupView.prototype.eventHandler = function (event, idx, itemBg) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                this.doShareDinner(idx);
                break;
        }
    };
    DinnerSharePopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerSharePopupView;
}(PopupView));
__reflect(DinnerSharePopupView.prototype, "DinnerSharePopupView");

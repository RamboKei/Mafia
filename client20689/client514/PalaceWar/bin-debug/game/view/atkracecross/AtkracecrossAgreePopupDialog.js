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
var AtkracecrossAgreePopupDialog = (function (_super) {
    __extends(AtkracecrossAgreePopupDialog, _super);
    function AtkracecrossAgreePopupDialog() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AtkracecrossAgreePopupDialog.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["atkrace_popup_bg"]);
    };
    AtkracecrossAgreePopupDialog.prototype.getTitleStr = function () {
        return "atkraceViewTitle";
    };
    AtkracecrossAgreePopupDialog.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AtkracecrossAgreePopupDialog.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        //底部
        var agreeBg = BaseBitmap.create("atkrace_popup_bg");
        agreeBg.setPosition(this.viewBg.width / 2 - agreeBg.width / 2, 0);
        this.addChildToContainer(agreeBg);
        this._type = this.param.data.type;
        var sid = this.param.data.sid;
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        ;
        servantFullImg.x = this.viewBg.width / 2 - servantFullImg.width / 2;
        servantFullImg.y = agreeBg.height - servantFullImg.height;
        this.addChildToContainer(servantFullImg);
        var str = LanguageManager.getlocal("atkraceAgreeAsk" + this._type, [this.param.data.name]);
        var descText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descText.width = 500;
        descText.lineSpacing = 5;
        var descBg = BaseBitmap.create("public_9_bg11");
        descBg.width = agreeBg.width;
        descBg.height = descText.height + 40;
        descBg.setPosition(this.viewBg.width / 2 - descBg.width / 2, agreeBg.height - descBg.height);
        this.addChildToContainer(descBg);
        descText.setPosition(this.viewBg.width / 2 - descText.width / 2, agreeBg.height - descText.height - 20);
        this.addChildToContainer(descText);
        var btnArray = [];
        if (this._type == 1) {
            btnArray.push("atkraceAgreeAnswer0");
        }
        btnArray.push("atkraceAgreeAnswer" + this._type);
        for (var i = 0; i < btnArray.length; i++) {
            var btnBg = BaseBitmap.create("public_9_bg28");
            btnBg.width = 556;
            btnBg.height = 55;
            btnBg.setPosition(GameConfig.stageWidth / 2 - btnBg.width / 2, GameConfig.stageHeigth / 2 + 260 + i * 65);
            this.addChild(btnBg);
            btnBg.addTouchTap(this.btnClick, this, [i]);
            var btnText = ComponentManager.getTextField(LanguageManager.getlocal(btnArray[i]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height / 2 - btnText.height / 2);
            this.addChild(btnText);
        }
        if (!Api.rookieVoApi.isGuiding) {
            this.touchEnabled = false;
            this.y = -200;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1, y: 0 }, 500).call(this.remove, this);
        }
    };
    AtkracecrossAgreePopupDialog.prototype.remove = function () {
        this.drawblackMask();
        this.touchEnabled = true;
    };
    AtkracecrossAgreePopupDialog.prototype.isShowMask = function () {
        return false;
    };
    AtkracecrossAgreePopupDialog.prototype.drawblackMask = function () {
        var _maskBmp = BaseBitmap.create("public_9_viewmask");
        _maskBmp.width = GameConfig.stageWidth;
        _maskBmp.height = GameConfig.stageHeigth;
        _maskBmp.touchEnabled = true;
        this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp, 0);
    };
    AtkracecrossAgreePopupDialog.prototype.btnClick = function (event, idx) {
        if (this._type == 1 && idx == 0) {
            this.request(NetRequestConst.REQUEST_ATKRACECROSS_HANDLE, { handle: 1 });
        }
        else {
            this.hide();
        }
    };
    AtkracecrossAgreePopupDialog.prototype.doGuide = function () {
        this.request(NetRequestConst.REQUEST_ATKRACECROSS_HANDLE, { handle: 1 });
    };
    //请求回调
    AtkracecrossAgreePopupDialog.prototype.receiveData = function (data) {
        if (data.ret == true) {
            if (this.param.data && this.param.data.f && this.param.data.o) {
                this._obj = this.param.data.o;
                this._callbackF = this.param.data.f;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW, { f: this._callbackF, o: this._obj });
            this.hide();
        }
    };
    AtkracecrossAgreePopupDialog.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this._type = 0;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossAgreePopupDialog;
}(PopupView));
__reflect(AtkracecrossAgreePopupDialog.prototype, "AtkracecrossAgreePopupDialog");

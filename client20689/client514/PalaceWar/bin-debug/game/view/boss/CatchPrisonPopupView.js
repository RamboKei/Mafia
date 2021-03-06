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
var CatchPrisonPopupView = (function (_super) {
    __extends(CatchPrisonPopupView, _super);
    function CatchPrisonPopupView() {
        var _this = _super.call(this) || this;
        //囚犯主图
        _this.prisonerDescribe = null;
        return _this;
    }
    CatchPrisonPopupView.prototype.getResourceList = function () {
        this._prisonerId = this.param.data.unlockPrison;
        this._showBoss = this.param.data.showBoss;
        return _super.prototype.getResourceList.call(this).concat(["prisonview_small_bg", "catch_prisoner_text", "prisonview_itembg", "catch_prisoner_text_laoyitype"]);
    };
    CatchPrisonPopupView.prototype.initView = function () {
        this.touchEnabled = false;
        var bg = BaseBitmap.create("prisonview_small_bg");
        bg.x += 15;
        this.addChildToContainer(bg);
        //人物大头像 
        var prisonHead = BaseLoadBitmap.create("story_npc_" + this._showBoss);
        prisonHead.x += 100;
        prisonHead.y += 15;
        prisonHead.scaleX = 0.8;
        prisonHead.scaleY = 0.8;
        this.addChildToContainer(prisonHead);
        var bg2 = BaseBitmap.create("prisonview_itembg");
        bg2.x += 15;
        this.addChildToContainer(bg2);
        //人物描述
        var textStr = LanguageManager.getlocal("prisonerName" + this._prisonerId) + " (" + LanguageManager.getlocal("prisonerOffice" + this._prisonerId) + ")";
        this.prisonerDescribe = ComponentManager.getTextField(textStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.prisonerDescribe.setPosition(this.viewBg.width / 2 - this.prisonerDescribe.width / 2, bg2.y + bg2.height - 50);
        this.addChildToContainer(this.prisonerDescribe);
        var btnBg = BaseBitmap.create("catch_prisoner_text");
        if (Api.switchVoApi.checkOpenNewPrison()) {
            btnBg = BaseBitmap.create("catch_prisoner_text_laoyitype");
        }
        btnBg.setPosition(GameConfig.stageWidth / 2 - btnBg.width / 2, GameConfig.stageHeigth / 2 + 260);
        this.addChild(btnBg);
        this.y = -200;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1, y: 0 }, 800).call(this.remove, this);
    };
    CatchPrisonPopupView.prototype.drawblackMask = function () {
        var _maskBmp = BaseBitmap.create("public_9_viewmask");
        _maskBmp.width = GameConfig.stageWidth;
        _maskBmp.height = GameConfig.stageHeigth;
        _maskBmp.touchEnabled = true;
        this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp, 0);
    };
    CatchPrisonPopupView.prototype.isShowMask = function () {
        return false;
    };
    CatchPrisonPopupView.prototype.remove = function () {
        this.drawblackMask();
        this.touchEnabled = true;
        this.addTouchTap(this.touchHandler, this);
    };
    CatchPrisonPopupView.prototype.touchHandler = function () {
        this.dispose();
    };
    CatchPrisonPopupView.prototype.getShowHeight = function () {
        return 510;
    };
    CatchPrisonPopupView.prototype.getTitleStr = function () {
        return "prisonCatch";
    };
    CatchPrisonPopupView.prototype.dispose = function () {
        this.prisonerDescribe = null;
        this._prisonerId = null;
        this._showBoss = null;
        _super.prototype.dispose.call(this);
    };
    return CatchPrisonPopupView;
}(PopupView));
__reflect(CatchPrisonPopupView.prototype, "CatchPrisonPopupView");

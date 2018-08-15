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
var LoginLoading = (function (_super) {
    __extends(LoginLoading, _super);
    function LoginLoading() {
        return _super.call(this) || this;
    }
    LoginLoading.prototype.getResourceList = function () {
        return [];
    };
    LoginLoading.prototype.init = function () {
        var progressBarBg = BaseBitmap.create("loginbg_progressbg");
        progressBarBg.setPosition(GameConfig.stageWidth / 2 - progressBarBg.width / 2, GameConfig.stageHeigth - 128.8);
        this.addChild(progressBarBg);
        this._progressBar = ComponentManager.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1, ProgressBarConst.IMAGE_PROGRESS1_Bg);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.getBgWidth() / 2;
        this._progressBar.y = GameConfig.stageHeigth - 100;
        this.addChild(this._progressBar);
        this.setPercentage(0);
        var loginLoadingTxt = BaseBitmap.create("login_loading");
        loginLoadingTxt.setPosition(GameConfig.stageWidth * 0.5 - loginLoadingTxt.width * 0.5, this._progressBar.y - loginLoadingTxt.height - 5);
        this.addChild(loginLoadingTxt);
        var loadNumBMTxt = ComponentManager.getBitmapText("0%", "loadnum_fnt");
        loadNumBMTxt.width = 100;
        loadNumBMTxt.textAlign = egret.HorizontalAlign.CENTER;
        loadNumBMTxt.setPosition(GameConfig.stageWidth * 0.5 - loadNumBMTxt.width * 0.5, this._progressBar.y + this._progressBar.getBgHeight() + 5);
        this.addChild(loadNumBMTxt);
        this._loadNumBMTxt = loadNumBMTxt;
        App.CommonUtil.formatSeaScreen(this);
    };
    LoginLoading.prototype.showBg = function () {
        App.LogUtil.log("开始显示loginLoading的bg");
        LoginLoading.hideDivLoading();
        if (this._loadImg) {
            BaseLoadBitmap.release(this._loadImg);
            this._loadImg = null;
        }
        if (!this._bg) {
            this._bg = BaseBitmap.create(PlatCfg.loginBg);
            this.addChildAt(this._bg, 0);
        }
    };
    LoginLoading.prototype.setPercentage = function (percent, textStr, textColor) {
        if (this._progressBar) {
            this._progressBar.setPercentage(percent);
            if (this._loadNumBMTxt) {
                this._loadNumBMTxt.text = Math.floor(percent * 100) + "%";
            }
        }
    };
    LoginLoading.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    LoginLoading.prototype.dispose = function () {
        LoginLoading.hideDivLoading();
        this._progressBar = null;
        this._loadImg = null;
        this._loadNumBMTxt = null;
        _super.prototype.dispose.call(this);
    };
    LoginLoading.show = function () {
        if (!LoginLoading._loginLoading) {
            LoginLoading._loginLoading = new LoginLoading();
            LoginLoading._loginLoading.show();
        }
        else {
            if (!LoginLoading._loginLoading.parent) {
                LoginLoading._loginLoading.getParent().addChild(LoginLoading._loginLoading);
            }
        }
    };
    LoginLoading.hide = function () {
        if (LoginLoading._loginLoading) {
            if (LoginLoading._loginLoading.parent) {
                LoginLoading._loginLoading.parent.removeChild(LoginLoading._loginLoading);
            }
            LoginLoading.hideDivLoading();
            LoginLoading._loginLoading.setPercentage(0);
        }
    };
    LoginLoading.showBg = function () {
        if (LoginLoading._loginLoading) {
            LoginLoading._loginLoading.showBg();
        }
    };
    LoginLoading.setPercentage = function (percent, textStr, textColor) {
        if (LoginLoading._loginLoading) {
            LoginLoading._loginLoading.setPercentage(percent, textStr, textColor);
        }
    };
    LoginLoading.hideDivLoading = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var my = document.getElementById("alertdiv");
            if (my != null) {
                App.LogUtil.log("htmlloding移除完成");
                my.parentNode.removeChild(my);
            }
        }
    };
    return LoginLoading;
}(BaseLoadDisplayObjectContiner));
__reflect(LoginLoading.prototype, "LoginLoading");

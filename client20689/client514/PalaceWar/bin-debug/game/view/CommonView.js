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
 * 通用大面板的父类
 * author dmj
 * date 2017/9/16
 * @class CommonView
 */
var CommonView = (function (_super) {
    __extends(CommonView, _super);
    function CommonView() {
        return _super.call(this) || this;
    }
    /**
     *
     * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
     */
    CommonView.prototype.show = function (data) {
        if (this.isShow()) {
            return;
        }
        CommonView._showloadingCount++;
        App.LogUtil.log("commonview.showCount:", CommonView._showloadingCount);
        _super.prototype.show.call(this, data);
    };
    CommonView.prototype.hide = function () {
        if (!this.isShow()) {
            return;
        }
        if (!this.isInit()) {
            this.removeLoadingCount();
        }
        if (CommonView._showloadingCount > 0) {
            var thisName = this.getClassName();
            var hideData = CommonView._waitHideList[thisName];
            if (hideData == null) {
                hideData = { hide: this.hide, hideThisObj: this };
                CommonView._waitHideList[thisName] = hideData;
                App.LogUtil.log(thisName, "等待关闭");
                return;
            }
        }
        _super.prototype.hide.call(this);
        var idx = CommonView.showedViewNameList.indexOf(this.getClassName());
        if (idx > -1) {
            CommonView.showedViewNameList.splice(idx, 1);
        }
        if (CommonView.showedViewNameList.length < 1) {
            SceneController.getInstance().showScene();
        }
    };
    CommonView.prototype.preInit = function () {
        var thisName = this.getClassName();
        var idx = CommonView.showedViewNameList.indexOf(thisName);
        if (idx < 0) {
            CommonView.showedViewNameList.push(thisName);
        }
        _super.prototype.preInit.call(this);
        if (CommonView.showedViewNameList.length < 2 && thisName != "RookieView") {
            SceneController.getInstance().hideScene();
        }
    };
    CommonView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.height = GameConfig.stageHeigth;
        }
    };
    CommonView.prototype.removeLoadingCount = function () {
        CommonView._showloadingCount--;
        App.LogUtil.log("commonview.hideCount:", CommonView._showloadingCount);
        if (CommonView._showloadingCount == 0) {
            for (var key in CommonView._waitHideList) {
                var hideData = CommonView._waitHideList[key];
                if (hideData) {
                    hideData.hide.call(hideData.hideThisObj);
                    hideData.hide = null;
                    hideData.hideThisObj = null;
                    delete CommonView._waitHideList[key];
                    App.LogUtil.log(this.getClassName() + "初始化完成,关闭界面" + key);
                }
            }
        }
    };
    CommonView.prototype.init = function () {
        this.removeLoadingCount();
        _super.prototype.init.call(this);
        this.initRuleBtn();
    };
    CommonView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        if (this.titleBg) {
            var titleBgShadow = BaseBitmap.create("commonview_titlebgshadow");
            titleBgShadow.width = this.titleBg.width;
            titleBgShadow.setPosition(0, this.titleBg.y + this.titleBg.height);
            this.addChild(titleBgShadow);
        }
    };
    CommonView.prototype.initViewBg = function () {
        _super.prototype.initViewBg.call(this);
    };
    CommonView.prototype.initRuleBtn = function () {
        if (this.getRuleInfo()) {
            this._ruleBtn = ComponentManager.getButton("btn_rule", "", this.clickRuleBtnHandler, this);
            this._ruleBtn.x = 12 + (PlatformManager.hasSpcialCloseBtn() ? 80 : 0);
            this._ruleBtn.y = 22;
            this.addChild(this._ruleBtn);
        }
    };
    CommonView.prototype.clickRuleBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, LanguageManager.getlocal(this.getRuleInfo()));
    };
    // 需要加载的资源
    CommonView.prototype.getResourceList = function () {
        var titleBgName = this.getTitleBgName();
        var resArr = _super.prototype.getResourceList.call(this).concat([
            this.getBgName(),
            titleBgName,
            this.getCloseBtnName()
        ]);
        if (titleBgName && RES.hasRes(titleBgName + "shadow")) {
            resArr[resArr.length] = titleBgName + "shadow";
        }
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr[resArr.length] = lowClassName;
        }
        return resArr;
    };
    // 背景图名称
    CommonView.prototype.getBgName = function () {
        return "commonview_bg1";
    };
    // 标题背景名称
    CommonView.prototype.getTitleBgName = function () {
        return "commonview_titlebg";
    };
    // 关闭按钮图标名称
    CommonView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    // 规则说明内容
    CommonView.prototype.getRuleInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    CommonView.prototype.getRuleBtnName = function () {
        return "btn_rule";
    };
    CommonView.prototype.dispose = function () {
        if (this._ruleBtn) {
            this.removeChild(this._ruleBtn);
            this._ruleBtn.dispose();
            this._ruleBtn = null;
        }
        _super.prototype.dispose.call(this);
    };
    CommonView.showedViewNameList = [];
    CommonView._waitHideList = {};
    /**
     * 正在加载的界面数量
     */
    CommonView._showloadingCount = 0;
    return CommonView;
}(BaseView));
__reflect(CommonView.prototype, "CommonView");

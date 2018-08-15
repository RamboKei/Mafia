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
 * 称帝报名弹窗
 * author qianjun
 */
var EmperorWarSignPopView = (function (_super) {
    __extends(EmperorWarSignPopView, _super);
    function EmperorWarSignPopView() {
        var _this = _super.call(this) || this;
        _this._costText = null;
        _this._signBtn = null;
        _this._ybMing = null;
        _this._curRWB = 0;
        return _this;
    }
    EmperorWarSignPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "empbmcbg", "empbmce_down", "empbmce", "emptdtiao", "empybmyin", "progress2_bg"
        ]);
    };
    Object.defineProperty(EmperorWarSignPopView.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarSignPopView.prototype.initView = function () {
        var view = this;
        view.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
        view._curRWB = Math.floor(Math.random() * (view.cfg.enterMin * 2));
        //描述规则
        var ruleText = ComponentManager.getTextField(LanguageManager.getlocal("emperorRuleDesc1"), 22);
        ruleText.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText, view.viewBg, [0, 100]);
        ruleText.lineSpacing = 6;
        //ruleText.y = (GameConfig.stageHeigth - view.viewBg.height) / 2 + 100;
        view.addChild(ruleText);
        var ruleText2 = ComponentManager.getTextField(LanguageManager.getlocal("emperorRuleDesc2"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleText2.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText2, ruleText, [0, ruleText.textHeight + 50]);
        ruleText2.lineSpacing = 6;
        view.addChild(ruleText2);
        var have = this.getCoin();
        view._costText = ComponentManager.getTextField(LanguageManager.getlocal("emperorCost", ["" + have]), 22);
        view.setLayoutPosition(LayoutConst.lefttop, view._costText, ruleText2, [0, ruleText2.textHeight + 50]);
        view.addChild(view._costText);
        var emperorMax = ComponentManager.getTextField(LanguageManager.getlocal("emperorMax", ["" + have]), 22);
        view.setLayoutPosition(LayoutConst.righttop, emperorMax, ruleText2, [0, ruleText2.textHeight + 50]);
        view.addChild(emperorMax);
        var dragProgressBar = ComponentManager.getDragProgressBar("emptdtiao", "progress2_bg", this.getCoin(), this.dragCallback, this, null, 1, GameConfig.stageWidth - 80);
        dragProgressBar.setDragPercent(this.getCoin(), this.getCoin());
        dragProgressBar.setBtnVisible(false);
        view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view._costText, [-12, 39]);
        view.addChild(dragProgressBar);
        var bmcBtn = ComponentManager.getButton("empbmce", "", view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.leftbottom, bmcBtn, view.viewBg, [40, 50]);
        view.addChild(bmcBtn);
        view._signBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorSign", view.signClick, view);
        view._signBtn.visible = false;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._signBtn, view.viewBg, [0, 80]);
        view.addChild(view._signBtn);
        view._ybMing = BaseBitmap.create("empybmyin");
        view._ybMing.visible = false;
        view._ybMing.anchorOffsetX = view._ybMing.width / 2;
        view.anchorOffsetY = view._ybMing.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, view.viewBg, [view._ybMing.width / 2, 50]);
        view.addChild(view._ybMing);
        view.setBtnVisible();
    };
    EmperorWarSignPopView.prototype.dragCallback = function (curNum) {
        var view = this;
        view._costText.text = LanguageManager.getlocal("emperorCost", ["" + curNum]);
    };
    //报名册弹窗
    EmperorWarSignPopView.prototype.bmcClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    };
    EmperorWarSignPopView.prototype.signClick = function () {
        var view = this;
        if (view._curRWB < view.cfg.enterMin) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emprorTip1"));
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("emprorSignTipConfirm", [view._curRWB.toString()]),
                callback: this.sendSignCall,
                handler: this,
                needCancel: true
            });
        }
    };
    EmperorWarSignPopView.prototype.sendSignCall = function () {
        //盖章动画
        var view = this;
        view._signBtn.visible = false;
        view._ybMing.alpha = 0;
        //view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, view.viewBg, [0,50]);
        view._ybMing.visible = true;
        egret.Tween.get(view._ybMing).to({ scaleX: 1.3, scaleY: 1.3 }, 50).
            to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500);
    };
    EmperorWarSignPopView.prototype.getCoin = function () {
        var view = this;
        return view._curRWB;
    };
    EmperorWarSignPopView.prototype.setBtnVisible = function () {
        var view = this;
        var isSign = Math.floor(Math.random() * 2) == 1;
        view._signBtn.visible = isSign;
        view._ybMing.visible = !isSign;
    };
    // 背景图名称
    EmperorWarSignPopView.prototype.getBgName = function () {
        return "empbmcbg";
    };
    EmperorWarSignPopView.prototype.initTitle = function () {
        return null;
    };
    EmperorWarSignPopView.prototype.getCloseBtnName = function () {
        return null;
    };
    EmperorWarSignPopView.prototype.isTouchMaskClose = function () {
        return true;
    };
    EmperorWarSignPopView.prototype.dispose = function () {
        var view = this;
        egret.Tween.removeTweens(view._ybMing);
        _super.prototype.dispose.call(this);
    };
    return EmperorWarSignPopView;
}(PopupView));
__reflect(EmperorWarSignPopView.prototype, "EmperorWarSignPopView");

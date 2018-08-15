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
var PrisonPopView = (function (_super) {
    __extends(PrisonPopView, _super);
    function PrisonPopView() {
        var _this = _super.call(this) || this;
        //囚犯主图
        _this.prisonerDescribe = null;
        _this.currContainer = null;
        return _this;
    }
    PrisonPopView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        this.touchEnabled = false;
        var bg = BaseBitmap.create("prisonview_small_bg");
        bg.x += 13;
        this.addChildToContainer(bg);
        // this.currContainer.addChild(bg);
        //人物大头像  story_npc_
        var currNum = Api.prisonVoApi.getCurrPrisonId() + 20;
        var prisonHead = BaseLoadBitmap.create("story_npc_" + currNum);
        prisonHead.x += 100;
        prisonHead.y += 15;
        prisonHead.scaleX = 0.8;
        prisonHead.scaleY = 0.8;
        this.addChildToContainer(prisonHead);
        // this.currContainer.addChild(prisonHead);
        var bg2 = BaseBitmap.create("prisonview_itembg");
        bg2.x += 15;
        this.addChildToContainer(bg2);
        //人物描述
        this.prisonerDescribe = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription" + Api.prisonVoApi.getCurrPrisonId());
        this.prisonerDescribe.setPosition(bg2.x + 20, bg2.y + bg2.height - 60);
        this.prisonerDescribe.width = bg.width - 30;
        this.addChildToContainer(this.prisonerDescribe);
        // this.currContainer.addChild(this.prisonerDescribe);
        this.y = -200;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1, y: 0 }, 800).call(this.remove, this);
    };
    PrisonPopView.prototype.hide = function () {
        if (this.touchEnabled == true) {
            _super.prototype.hide.call(this);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_BLACKPANEL);
        }
    };
    PrisonPopView.prototype.isShowMask = function () {
        return false;
    };
    PrisonPopView.prototype.remove = function () {
        //  this.drawblackMask();
        this.touchEnabled = true;
        this.addTouchTap(this.hide, this);
    };
    PrisonPopView.prototype.getShowHeight = function () {
        return 510;
    };
    PrisonPopView.prototype.getTitleStr = function () {
        return Api.prisonVoApi.getPrisonTitleStr();
    };
    PrisonPopView.prototype.dispose = function () {
        this.prisonerDescribe = null;
        this.currContainer = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return PrisonPopView;
}(PopupView));
__reflect(PrisonPopView.prototype, "PrisonPopView");

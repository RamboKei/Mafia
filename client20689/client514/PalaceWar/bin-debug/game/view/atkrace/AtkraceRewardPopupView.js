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
var AtkraceRewardPopupView = (function (_super) {
    __extends(AtkraceRewardPopupView, _super);
    function AtkraceRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._backCardArray = [];
        _this._awardIconArray = [];
        _this._clickIdx = 0;
        _this._iconWidth = 108;
        _this._turnTime = 400;
        _this._callbackF = null;
        _this._obj = null;
        _this._rewardsStr = null;
        return _this;
    }
    AtkraceRewardPopupView.prototype.getTitleStr = function () {
        return "atkrace_win_award";
    };
    AtkraceRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["atkrace_card_back", "atkrace_reward_anim"]);
    };
    AtkraceRewardPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AtkraceRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AtkraceRewardPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 520;
        itemBg.height = 272;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 20);
        this.addChildToContainer(itemBg);
        for (var i = 1; i <= 6; i++) {
            var cardBtn = ComponentManager.getButton("atkrace_card_back", null, this.clickCard, this, [i]);
            cardBtn.setPosition(70 + (i - 1) % 3 * (cardBtn.width + 46), 35 + Math.floor((i - 1) / 3) * (cardBtn.height + 20));
            this.addChildToContainer(cardBtn);
            this._backCardArray.push(cardBtn);
        }
        this._clip = ComponentManager.getCustomMovieClip("atkrace_reward_anim", 7, 80);
        this._clip.setEndCallBack(this.animEndCallback, this);
    };
    AtkraceRewardPopupView.prototype.clickCard = function (idx) {
        for (var k in this._backCardArray) {
            this._backCardArray[k].setEnable(false);
        }
        this._clickIdx = idx;
        this.request(NetRequestConst.REQUEST_ATKRACE_RANDREWARD, { pos: idx });
    };
    //请求回调
    AtkraceRewardPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        var randcards;
        randcards = data.data.data.randcards;
        // randcards = ["14_1_12","15_1_8","6_1551_1","14_1_4","15_1_4","14_1_12"];
        var randVo = GameData.formatRewardItem(randcards[this._clickIdx - 1])[0];
        var rtyep = randVo.type;
        if (rtyep == 6) {
            rtyep = randVo.id;
        }
        this._rewardsStr = LanguageManager.getlocal("get_item", [LanguageManager.getlocal("itemName_" + rtyep), randVo.num.toString()]);
        for (var i = 0; i < 6; i++) {
            var icon = GameData.getRewardItemIcons(randcards[i])[0]; //Config.ItemCfg.getItemCfgById(randcards[i]).getIconContainer();
            icon.setPosition(70 + i % 3 * (icon.width + 46) + this._iconWidth / 2, 35 + Math.floor(i / 3) * (icon.height + 20));
            this.addChildToContainer(icon);
            icon.scaleX = 0;
            icon.visible = false;
            this._awardIconArray.push(icon);
        }
        var clickCards = this._backCardArray[this._clickIdx - 1];
        egret.Tween.get(clickCards).to({ scaleX: 0, x: clickCards.x + this._iconWidth / 2 }, this._turnTime).call(this.showAnim, this);
    };
    AtkraceRewardPopupView.prototype.showAnim = function () {
        var wardsIcon = this._awardIconArray[this._clickIdx - 1];
        var tempBitmap = BaseBitmap.create("atkrace_reward_anim1");
        this._clip.setPosition(wardsIcon.x - tempBitmap.width / 2, wardsIcon.y - tempBitmap.height / 2 + this._iconWidth / 2);
        this._clip.playWithTime(1);
        this.addChildToContainer(this._clip);
        BaseBitmap.release(tempBitmap);
        wardsIcon.visible = true;
        egret.Tween.get(wardsIcon).to({ scaleX: 1, x: wardsIcon.x - this._iconWidth / 2 }, this._turnTime).call(this.turnOtherCards, this);
    };
    AtkraceRewardPopupView.prototype.animEndCallback = function (o) {
        o.visible = false;
    };
    AtkraceRewardPopupView.prototype.turnOtherCards = function () {
        var wardsIcon = this._awardIconArray[this._clickIdx - 1];
        var posX = wardsIcon.x;
        var posY = wardsIcon.y;
        var posX2 = wardsIcon.x + wardsIcon.width * 0.05;
        var posY2 = wardsIcon.y + wardsIcon.height * 0.05;
        egret.Tween.get(wardsIcon, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9, x: posX2, y: posY2 }, 400).to({ scaleX: 1, scaleY: 1, x: posX, y: posY }, 400);
        for (var i = 0; i < 6; i++) {
            if (i + 1 == this._clickIdx) {
                continue;
            }
            var clickCards = this._backCardArray[i];
            var wardsIcon_1 = this._awardIconArray[i];
            wardsIcon_1.visible = true;
            egret.Tween.get(clickCards).to({ scaleX: 0, x: clickCards.x + this._iconWidth / 2 }, this._turnTime);
            egret.Tween.get(wardsIcon_1).wait(this._turnTime).to({ scaleX: 1, x: wardsIcon_1.x - this._iconWidth / 2 }, this._turnTime);
        }
        TimerManager.doTimer(this._turnTime * 2, 1, this.showTips, this);
    };
    AtkraceRewardPopupView.prototype.showTips = function () {
        var awardBg = BaseBitmap.create("public_numbg");
        awardBg.width = 540;
        awardBg.setPosition(GameConfig.stageWidth / 2 - awardBg.width / 2, this.viewBg.y + this.viewBg.height + 20);
        this.addChild(awardBg);
        var awardText = ComponentManager.getTextField(this._rewardsStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        awardText.setPosition(GameConfig.stageWidth / 2 - awardText.width / 2, awardBg.y + awardBg.height / 2 - awardText.height / 2);
        this.addChild(awardText);
        this.addTouchTap(this.closeHandle, this);
    };
    AtkraceRewardPopupView.prototype.closeHandle = function () {
        var f = this._callbackF;
        var o = this._obj;
        this.hide();
        if (f && o) {
            f.apply(o);
        }
    };
    AtkraceRewardPopupView.prototype.dispose = function () {
        for (var k in this._backCardArray) {
            egret.Tween.removeTweens(this._backCardArray[k]);
        }
        this._backCardArray.length = 0;
        this._clickIdx = 0;
        for (var k2 in this._awardIconArray) {
            egret.Tween.removeTweens(this._awardIconArray[k2]);
        }
        this._awardIconArray.length = 0;
        this._clip = null;
        this._callbackF = null;
        this._obj = null;
        this._rewardsStr = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceRewardPopupView;
}(PopupView));
__reflect(AtkraceRewardPopupView.prototype, "AtkraceRewardPopupView");

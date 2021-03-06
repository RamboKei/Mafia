/**
 * author shaoliang
 * date 2017/9/29
 * @class BattleWin
 */
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
var BattleWin = (function (_super) {
    __extends(BattleWin, _super);
    function BattleWin() {
        var _this = _super.call(this) || this;
        _this._awardArray = [];
        _this._callbackF = null;
        _this._obj = null;
        _this._type = 1; //1 关卡 ，  2 擂台 3 boss
        _this._winBg = null;
        return _this;
    }
    BattleWin.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data.type == 2) {
            rewardPic = ["atkrace_win1", "atkrace_win2", "atkrace_win3", "atkrace_win4", "recharge_fnt"];
        }
        return rewardPic.concat([
            "battle_win_word",
            "battle_win_light",
            "fire_flake_json",
            "fire_flake"
        ]);
    };
    BattleWin.prototype.getTitleBgName = function () {
        return null;
    };
    BattleWin.prototype.getTitleStr = function () {
        return null;
    };
    BattleWin.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    BattleWin.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data) {
            if (this.param.data.award) {
                this._awardArray = GameData.formatRewardItem(this.param.data.award);
            }
            else if (this.param.data.rewards) {
                this._awardArray = GameData.formatRewardItem(this.param.data.rewards);
            }
        }
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this.param.data && this.param.data.type) {
            this._type = this.param.data.type;
        }
        this._winBg = BaseBitmap.create("public_rule_bg");
        this._winBg.setPosition(GameConfig.stageWidth / 2 - this._winBg.width, GameConfig.stageHeigth / 2 - this._winBg.height / 2);
        this.addChildToContainer(this._winBg);
        var winBg2 = BaseBitmap.create("public_rule_bg");
        winBg2.scaleX = -1;
        winBg2.setPosition(GameConfig.stageWidth / 2 + winBg2.width - 1, GameConfig.stageHeigth / 2 - winBg2.height / 2);
        this.addChildToContainer(winBg2);
        var awardBg = BaseBitmap.create("public_9_bg1");
        awardBg.width = 500;
        awardBg.height = 122;
        awardBg.setPosition(GameConfig.stageWidth / 2 - awardBg.width / 2, GameConfig.stageHeigth / 2 - awardBg.height / 2 + 2 - 20);
        this.addChildToContainer(awardBg);
        for (var k = 0; k < this._awardArray.length; k++) {
            var v = this._awardArray[k];
            var awardIcon = GameData.getItemIcon(v);
            awardIcon.setPosition(GameConfig.stageWidth / 2 + 19 + (this._awardArray.length / 2 - k - 1) * 138, awardBg.y + awardBg.height / 2 - awardIcon.height / 2);
            this.addChildToContainer(awardIcon);
        }
        if (this.getIsCountDown()) {
            var countDownBg = BaseBitmap.create("promotion_officerbg1");
            countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2 + 20, awardBg.y + awardBg.height + 5 + 10);
            this.addChildToContainer(countDownBg);
            var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDownNext"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            timeDesc.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 + 10, countDownBg.y + countDownBg.height / 2 - timeDesc.height / 2);
            this.addChildToContainer(timeDesc);
            this._countDownLb = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_TITLE_BIG);
            this._countDownLb.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 - 20, countDownBg.y + countDownBg.height / 2 - this._countDownLb.height / 2);
            this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
            this.addChildToContainer(this._countDownLb);
            this._countDownLb.text = "1";
            this._countDownTime = 1;
        }
        if (this._type == 2) {
            //擂台胜利
            var socreText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            socreText.setPosition(GameConfig.stageWidth / 2 + 30 - socreText.width, awardBg.y + 20);
            this.addChildToContainer(socreText);
            var score = ComponentManager.getTextField("+2", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            score.setPosition(GameConfig.stageWidth / 2 + 30 + 10, socreText.y);
            this.addChildToContainer(score);
            var bookText = ComponentManager.getTextField(LanguageManager.getlocal("atkRace_bookExp"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            bookText.setPosition(GameConfig.stageWidth / 2 + 30 - bookText.width, socreText.y + 36);
            this.addChildToContainer(bookText);
            var bookscore = ComponentManager.getTextField("+2", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            bookscore.setPosition(GameConfig.stageWidth / 2 + 30 + 10, bookText.y);
            this.addChildToContainer(bookscore);
            var moraleAdd = ComponentManager.getTextField("+1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            moraleAdd.setPosition(GameConfig.stageWidth / 2 + 30, bookscore.y + 36);
            this.addChildToContainer(moraleAdd);
            var morale = BaseBitmap.create("atkrace_morale");
            morale.setPosition(GameConfig.stageWidth / 2 + 30 - morale.width, moraleAdd.y + moraleAdd.height / 2 - morale.height / 2);
            this.addChildToContainer(morale);
            var win1 = BaseBitmap.create("atkrace_win1");
            win1.setPosition(158, this._winBg.y + this._winBg.height - 10);
            this.addChild(win1);
            var winNumber = this.param.data.num + 1;
            var winText = ComponentManager.getBitmapText(winNumber.toString(), "recharge_fnt");
            winText.setPosition(win1.x + win1.width + 7, win1.y + win1.height / 2 - winText.height / 2);
            this.addChild(winText);
            var win2 = BaseBitmap.create("atkrace_win2");
            win2.setPosition(winText.x + winText.width + 7, win1.y);
            this.addChild(win2);
            if (winNumber % 3 != 0) {
                var win3 = BaseBitmap.create("atkrace_win3");
                win3.setPosition(130, win1.y + win1.height + 20);
                this.addChild(win3);
                var next = 3 - winNumber % 3;
                var nextText = ComponentManager.getBitmapText(next.toString(), "recharge_fnt");
                nextText.setPosition(win3.x + win3.width + 7, win3.y + win3.height / 2 - nextText.height / 2);
                this.addChild(nextText);
                var win4 = BaseBitmap.create("atkrace_win4");
                win4.setPosition(nextText.x + nextText.width + 7, win3.y);
                this.addChild(win4);
            }
        }
        if (this._type == 3) {
            //名望
            var renownNumber = GameConfig.config.prisonbaseCfg.getPrestige;
            var renown = ComponentManager.getTextField(LanguageManager.getlocal("renown"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            renown.setPosition(200, awardBg.y + awardBg.height + 10);
            this.addChildToContainer(renown);
            var renownText = ComponentManager.getTextField("+" + renownNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            renownText.setPosition(renown.x + renown.width, renown.y);
            this.addChildToContainer(renownText);
            var renownLimited = ComponentManager.getTextField(LanguageManager.getlocal("renown_limited"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            renownLimited.setPosition(330, renown.y);
            this.addChildToContainer(renownLimited);
            var renownLimitedText = ComponentManager.getTextField("+" + renownNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            renownLimitedText.setPosition(renownLimited.x + renownLimited.width, renown.y);
            this.addChildToContainer(renownLimitedText);
            var countDownBg = BaseBitmap.create("promotion_officerbg1");
            countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2 + 20, awardBg.y + awardBg.height + 35);
            this.addChildToContainer(countDownBg);
            var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDownNext"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            timeDesc.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 + 10, countDownBg.y + countDownBg.height / 2 - timeDesc.height / 2);
            this.addChildToContainer(timeDesc);
            this._countDownLb = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_TITLE_BIG);
            this._countDownLb.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 - 20, countDownBg.y + countDownBg.height / 2 - this._countDownLb.height / 2);
            this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
            this.addChildToContainer(this._countDownLb);
            this._countDownLb.text = "1";
            this._countDownTime = 1;
        }
        //点击任意位置关闭
        if (this._type == 1) {
            var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            closeText.textAlign = egret.HorizontalAlign.CENTER;
            closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, this._winBg.y + this._winBg.height);
            this.addChildToContainer(closeText);
        }
        this.container.anchorOffsetX = GameConfig.stageWidth / 2;
        this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
        this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.container.scaleX = 0.1;
        this.container.scaleY = 1;
        egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 120).call(this.showWordAnim, this).wait(80).call(this.showAnim, this);
        ;
        SoundManager.playEffect(SoundConst.EFFECT_BATTLE_WIN);
    };
    BattleWin.prototype.getIsCountDown = function () {
        return (Api.rookieVoApi.isInGuiding != true && this._type == 1);
    };
    BattleWin.prototype.showWordAnim = function () {
        var winBg = BaseBitmap.create("public_rule_bg");
        var winLight = BaseBitmap.create("battle_win_light");
        winLight.scaleY = 0.5;
        winLight.setPosition(GameConfig.stageWidth / 2 - winLight.width / 2 * winLight.scaleX, GameConfig.stageHeigth / 2 - winBg.height / 2 - 5);
        this.addChildToContainer(winLight);
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y = GameConfig.stageHeigth / 2 - 365;
        this.addChildToContainer(this._fire_lizi);
        var winText = BaseBitmap.create("battle_win_word");
        var scale1 = 2.5;
        var scale2 = 0.9;
        var tempsPos1 = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2 * scale1, GameConfig.stageHeigth / 2 - winBg.height / 2 * scale1 - 35 + 30);
        var tempsPos2 = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2 * scale2, GameConfig.stageHeigth / 2 - winBg.height / 2 * scale2 - 35);
        var realPos = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2, GameConfig.stageHeigth / 2 - winBg.height / 2 - 35);
        winText.setScale(scale1);
        winText.setPosition(tempsPos1.x, tempsPos1.y);
        this.addChildToContainer(winText);
        egret.Tween.get(winText).to({ x: tempsPos2.x, y: tempsPos2.y, scaleX: scale2, scaleY: scale2 }, 120).to({ x: realPos.x, y: realPos.y, scaleX: 1, scaleY: 1 }, 50);
        winLight.alpha = 0;
        egret.Tween.get(winLight).wait(100).to({ alpha: 1 }, 100).wait(90).to({ alpha: 0 }, 10);
    };
    BattleWin.prototype.showAnim = function () {
        this._fire_lizi.start();
        var tmpthis = this;
        egret.Tween.get(this._fire_lizi, { loop: false }).wait(500).to({ alpha: 0 }, 200).call(function () {
            if (this._fire_lizi) {
                tmpthis.removeChildFromContainer(this._fire_lizi);
                this._fire_lizi.dispose();
                this._fire_lizi = null;
            }
        });
    };
    BattleWin.prototype.tick = function () {
        if (this._countDownTime > 0) {
            this._countDownTime--;
            this._countDownLb.text = this._countDownTime.toPrecision();
        }
        else if (this._countDownTime == 0) {
            this.touchTap();
        }
    };
    BattleWin.prototype.touchTap = function () {
        this._countDownTime = -1;
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        if (Api.rookieVoApi.isInGuiding) {
            Api.rookieVoApi.checkWaitingGuide();
        }
        if (this._type == 3) {
            var cid = this.param.data.cid;
            var config = ChallengeCfg.getChallengeCfgById(cid);
            if (config.unlockPrison) {
                //功能解锁
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
                ViewController.getInstance().openView(ViewConst.POPUP.CATCHPRISONPUPUPVIEW, { unlockPrison: config.unlockPrison, showBoss: config.showBoss });
            }
            if (cid == 41 * 80) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
            }
        }
        this.hide();
    };
    BattleWin.prototype.dispose = function () {
        this._awardArray.length = 0;
        this._callbackF = null;
        this._obj = null;
        this._countDownLb = null;
        this._countDownTime = -1;
        this._fire_lizi = null;
        this._type = 1;
        this._winBg = null;
        _super.prototype.dispose.call(this);
    };
    return BattleWin;
}(BaseView));
__reflect(BattleWin.prototype, "BattleWin");

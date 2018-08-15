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
 * 修身UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeView
 */
var PracticeView = (function (_super) {
    __extends(PracticeView, _super);
    function PracticeView() {
        var _this = _super.call(this) || this;
        _this._isLvupEnable = false;
        _this._refreshTxtList = [];
        _this._lvBeforeBuy = 0;
        return _this;
    }
    PracticeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.levelupCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.levelupCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY), this.levelupCallBackHandler, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var servant_infobg = BaseBitmap.create("practice_bg");
        servant_infobg.y = -20;
        this._nodeContainer.addChild(servant_infobg);
        var userContainer = Api.playerVoApi.getMyPortrait();
        userContainer.x = GameConfig.stageWidth / 2 - userContainer.width / 2;
        userContainer.name = "userContainer";
        this._nodeContainer.addChild(userContainer);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        var btHeight = PlayerBottomUI.getInstance().showHeight;
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = GameConfig.stageWidth;
        //蓝色背景图
        var servantBlueBg = BaseBitmap.create("playerview_probg");
        servantBlueBg.x = 0;
        servantBlueBg.y = 0;
        var bottomInfoY = 0; // 457;
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.height = 390;
        bottomBg.x = 0;
        bottomBg.y = servantBlueBg.y + servantBlueBg.height - 10;
        var innerbg = BaseBitmap.create("public_9_bg43");
        innerbg.height = 225;
        innerbg.width = 600;
        innerbg.x = bottomBg.x + bottomBg.width / 2 - innerbg.width / 2;
        innerbg.y = bottomBg.y + 85;
        var targetHeight = GameConfig.stageHeigth - this.container.y - btHeight - innerbg.y - innerbg.height;
        this._bottomnodeContainer.y = targetHeight - 15;
        this._bottomnodeContainer.addChild(servant_mask);
        this._bottomnodeContainer.addChild(bottomBg);
        this._bottomnodeContainer.addChild(innerbg);
        this._bottomnodeContainer.addChild(servantBlueBg);
        var playerview_powerbg = BaseBitmap.create("playerview_powerbg");
        playerview_powerbg.x = GameConfig.stageWidth / 2 - playerview_powerbg.width / 2;
        playerview_powerbg.y = -60;
        this._bottomnodeContainer.addChild(playerview_powerbg);
        var myPowerImg = BaseBitmap.create("player_power2");
        myPowerImg.x = playerview_powerbg.x + 30;
        myPowerImg.y = playerview_powerbg.y + 20;
        this._bottomnodeContainer.addChild(myPowerImg);
        var titleText1 = ComponentManager.getTextField("" + Api.playerVoApi.getPlayerPower(), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.name = "powerTxt";
        titleText1.x = myPowerImg.x + myPowerImg.width + 5;
        titleText1.y = myPowerImg.y + myPowerImg.height / 2 - titleText1.height / 2;
        this._bottomnodeContainer.addChild(titleText1);
        //等级蓝色背景图
        var servant_levebg = BaseBitmap.create("servant_levebg");
        servant_levebg.x = 5;
        servant_levebg.y = servantBlueBg.y;
        this._bottomnodeContainer.addChild(servant_levebg);
        //等级 文字不变
        var lvText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvText.text = LanguageManager.getlocal("servant_infoLv");
        lvText.x = servant_levebg.x + 17;
        lvText.y = servant_levebg.y + 10;
        this._bottomnodeContainer.addChild(lvText);
        var lvValueText = ComponentManager.getTextField("123", 42);
        lvValueText.name = "lvValueText";
        lvValueText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvValueText.text = "12";
        lvValueText.anchorOffsetX = lvValueText.width / 2;
        lvValueText.x = servant_levebg.x + servant_levebg.width / 2;
        lvValueText.y = lvText.y + 25;
        this._bottomnodeContainer.addChild(lvValueText);
        var attrCfg = [
            {
                icon: "playerview_pro1",
                value: "100",
            },
            {
                icon: "playerview_pro2",
                value: "100",
            },
            {
                icon: "playerview_pro4",
                value: "100",
            },
            {
                icon: "playerview_pro5",
                value: "100",
            },
        ];
        for (var i = 0; i < 4; i++) {
            var img = attrCfg[i].icon;
            var attribute = BaseBitmap.create(img);
            var num = i % 2;
            attribute.x = 120;
            if (i % 2 == 1) {
                attribute.x = GameConfig.stageWidth / 2 + 50;
            }
            attribute.y = servant_levebg.y + 15 + 25 * Math.floor(i / 2);
            this._bottomnodeContainer.addChild(attribute);
            var valueTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            valueTxt.text = "100";
            valueTxt.x = attribute.x + attribute.width + 5;
            valueTxt.y = attribute.y + attribute.height / 2 - valueTxt.height / 2;
            this._bottomnodeContainer.addChild(valueTxt);
            this._refreshTxtList.push(valueTxt);
        }
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 440);
        this._progressBar.x = 22;
        this._progressBar.y = bottomBg.y + 35;
        this._progressBar.setTextSize(18);
        this._bottomnodeContainer.addChild(this._progressBar);
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "servantInfoLevelup", this.levelupBtnClickHandler, this);
        levelupBtn.x = this._progressBar.x + this._progressBar.width + 10;
        levelupBtn.y = this._progressBar.y + this._progressBar.height / 2 - levelupBtn.height / 2;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._bottomnodeContainer.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        var sbookItems = new ServantInfoBookItems();
        sbookItems.y = bottomBg.y + 15;
        sbookItems.init("", innerbg.height + 110, true);
        this._bottomnodeContainer.addChild(sbookItems);
        this.refreshTxtValue();
    };
    PracticeView.prototype.refreshTxtValue = function () {
        var isLvMax = Api.practiceVoApi.getLevel() == GameConfig.config.practicebaseCfg.maxLv;
        if (Api.practiceVoApi.isPracticeLvupEnable() && !isLvMax) {
            App.CommonUtil.addRedDotToBDOC(this._levelupBtn);
        }
        else {
            App.CommonUtil.removeRedDotFromBDOC(this._levelupBtn);
        }
        if (isLvMax) {
            this._levelupBtn.setEnable(false);
        }
        PlayerBottomUI.getInstance().checkRedPoints();
        var powerTxt = this._bottomnodeContainer.getChildByName("powerTxt");
        var lvValueText = this._bottomnodeContainer.getChildByName("lvValueText");
        powerTxt.text = "" + Api.practiceVoApi.getPower();
        lvValueText.text = "" + Api.practiceVoApi.getLevel();
        lvValueText.anchorOffsetX = lvValueText.width / 2;
        var attrV = Api.practiceVoApi.geAttrValues();
        this._refreshTxtList[0].text = "" + attrV[0];
        this._refreshTxtList[1].text = "" + attrV[1];
        this._refreshTxtList[2].text = "" + attrV[2];
        this._refreshTxtList[3].text = "" + attrV[3];
        this.refreshProgress();
    };
    PracticeView.prototype.refreshProgress = function () {
        var isLvMax = Api.practiceVoApi.getLevel() == GameConfig.config.practicebaseCfg.maxLv;
        var value = Api.practiceVoApi.getProgressValue();
        if (isLvMax) {
            this._progressBar.setText(LanguageManager.getlocal("practice_expV", ["" + value.v1]));
        }
        else {
            this._progressBar.setText(LanguageManager.getlocal("practice_expV", [value.v1 + "/" + value.v2]));
        }
        var per = value.v1 / value.v2;
        per = per < 1 ? per : 1;
        this._progressBar.setPercentage(per);
        this._isLvupEnable = false;
        if (per >= 1 && !isLvMax) {
            this._isLvupEnable = true;
        }
    };
    PracticeView.prototype.levelupCallBackHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_BUY) {
            // this.refreshProgress();
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuySuccessTip"));
            var newLv = Api.practiceVoApi.getLevel();
            if (this._lvBeforeBuy < newLv) {
                this.showUpgradeEffect(newLv - this._lvBeforeBuy);
            }
            this.refreshTxtValue();
            this._lvBeforeBuy = newLv;
            return;
        }
        if (rdata.cmd == NetRequestConst.REQUEST_REQUEST_UNLOCK) {
            this.refreshTxtValue();
            return;
        }
        this.refreshTxtValue();
        this.showUpgradeEffect(1);
    };
    //播放升级成功动画
    PracticeView.prototype.showUpgradeEffect = function (addLv) {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv", [String(addLv)]), TextFieldConst.FONTNAME_BOSS_SCORE);
        servant_upgrade_word.x = 240;
        servant_upgrade_word.y = 200;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 110;
        upgradeClip.y = 20;
        this._nodeContainer.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        this._nodeContainer.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 150 }, 800).to({ alpha: 0 }, 100);
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            //字体刷新加个延时
            tmpthis.refreshTxtValue();
            tmpthis._nodeContainer.removeChild(upgradeClip);
            upgradeClip = null;
            tmpthis._nodeContainer.removeChild(servant_upgrade_word);
            servant_upgrade_word = null;
        });
    };
    PracticeView.prototype.levelupBtnClickHandler = function () {
        if (this._isLvupEnable == false) {
            // ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBATCHBUYPOPUPVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEBUYPOPUPVIEW);
            this._lvBeforeBuy = Api.practiceVoApi.getLevel();
        }
        else {
            if (Api.practiceVoApi.getLevel() == GameConfig.config.practicebaseCfg.maxLv) {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_topLvTip"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_REQUEST_UPGRADE, {});
        }
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	return {requestType:NetRequestConst.REQUEST_REQUEST_INDEX,requestData:{}};
    // }
    PracticeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerpromo_abitopbg", "playerview_probg",
            "public_9_bg22", "servant_levebg", "servant_infoLv", "servant_attribute1", "servant_attribute2",
            "servant_attribute3", "servant_attribute4", "progress3", "progress3_bg",
            "playerview_pro1", "playerview_pro2", "playerview_pro4", "playerview_pro5",
            "public_9_bg44", "public_9_bg43", "playerview_powerbg", "playerview_power_img",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_xLv", "servant_upgrade_frame", "player_power2", "practice_bg",
        ]);
    };
    PracticeView.prototype.closeHandler = function () {
        PlayerBottomUI.getInstance().hide(true);
        _super.prototype.hide.call(this);
    };
    PracticeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE), this.levelupCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.levelupCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_BUY), this.levelupCallBackHandler, this);
        this._nodeContainer = null;
        this._bottomnodeContainer = null;
        this._scrollList = null;
        this._progressBar = null;
        this._levelupBtn = null;
        this._isLvupEnable = false;
        this._refreshTxtList = [];
        this._lvBeforeBuy = 0;
        _super.prototype.dispose.call(this);
    };
    return PracticeView;
}(CommonView));
__reflect(PracticeView.prototype, "PracticeView");

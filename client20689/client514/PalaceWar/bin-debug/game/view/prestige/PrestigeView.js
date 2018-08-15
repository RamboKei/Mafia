/**
 * author shaoliang
 * date 2018/04/08
 * @class PrestigeView
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
var PrestigeView = (function (_super) {
    __extends(PrestigeView, _super);
    function PrestigeView() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = null;
        _this._pillar = null;
        return _this;
    }
    PrestigeView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_PRESTIGE_INDEX, requestData: {} };
    };
    PrestigeView.prototype.receiveData = function (data) {
        if (data.ret && data.data.data.rewards) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
            if (data.data.data.rewards == "11_4003_1") {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            }
        }
    };
    PrestigeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeskin_barbg",
            "prestige_pillar_base",
            "prestige_pillar1",
            "prestige_pillar2",
            "prestige_bg",
            "prestige_black_bg",
            "prestige_chair",
            "prestige_circle_bg",
            "prestige_circle",
            "prestige_cur",
            "prestige_flag1",
            "prestige_flag2",
            "prestige_light",
            "prestige_fnt",
            "prestige_prerogative1", "prestige_prerogative2", "prestige_prerogative3",
        ]);
    };
    PrestigeView.prototype.initView = function () {
        this.container.y = this.getTitleButtomY();
        this._scrollContiner = new BaseDisplayObjectContainer();
        var bHeight = PlayerBottomUI.getInstance().showHeight;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - this.getTitleButtomY() - 45 - bHeight));
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this.addChildToContainer(scrollView);
        var darkBg = BaseBitmap.create("prestige_bg");
        this._scrollContiner.addChild(darkBg);
        scrollView.bounces = false;
        var pillar1 = BaseBitmap.create("prestige_pillar1");
        pillar1.x = 0;
        pillar1.y = 42;
        this._scrollContiner.addChild(pillar1);
        var pillarBase = BaseBitmap.create("prestige_pillar_base");
        pillarBase.height = pillar1.height + pillarBase.height - 10;
        this._scrollContiner.addChild(pillarBase);
        var zhuziHeight = pillar1.height;
        var item1 = Config.PrestigeCfg.getPrestigeCfgById(3);
        var curPrestige = Api.prestigeVoApi.getInfo()["v"];
        if (curPrestige > item1.prestige) {
            curPrestige = item1.prestige;
        }
        this._pillar = BaseBitmap.create("prestige_pillar2");
        this._pillar.setPosition(pillar1.x, pillar1.y);
        this._scrollContiner.addChild(this._pillar);
        var mask = egret.Rectangle.create();
        var curProportion = curPrestige / item1.prestige;
        mask.setTo(0, (1 - curProportion) * zhuziHeight, this._pillar.width, zhuziHeight * curProportion);
        this._pillar.mask = mask;
        //当前人望
        var pillarLight = BaseBitmap.create("prestige_light");
        pillarLight.setPosition(0, pillar1.y + mask.y - pillarLight.height / 2);
        this._scrollContiner.addChild(pillarLight);
        var pillarText = ComponentManager.getBitmapText(String(Api.prestigeVoApi.getInfo()["v"]), "prestige_fnt");
        pillarText.setPosition(pillarLight.x + pillarLight.width / 2 - pillarText.width / 2, pillarLight.y - pillarText.height + 20);
        this._scrollContiner.addChild(pillarText);
        var pillarCur = BaseBitmap.create("prestige_cur");
        pillarCur.x = pillarLight.x + pillarLight.width / 2 - pillarCur.width / 2;
        if (curPrestige / item1.prestige > 0.9) {
            pillarCur.y = pillarLight.y + pillarLight.height / 2;
        }
        else {
            pillarCur.y = pillarText.y - pillarCur.height;
        }
        this._scrollContiner.addChild(pillarCur);
        //四个旗子
        var flagY1 = pillar1.y - 10;
        var flagY2 = flagY1 + zhuziHeight * 0.3;
        var flagY3 = flagY1 + zhuziHeight * 0.6;
        var flagY4 = flagY1 + zhuziHeight * 0.8;
        //1
        var flag1 = BaseBitmap.create(this.getFlagPicStr(curPrestige, item1.prestige));
        flag1.setPosition(142, flagY1);
        this._scrollContiner.addChild(flag1);
        var nameTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName4", [String(item1.prestige)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt1.setPosition(flag1.x + flag1.width / 2 - nameTxt1.width / 2, flag1.y + 18);
        this._scrollContiner.addChild(nameTxt1);
        if (curPrestige < item1.prestige) {
            nameTxt1.textColor = 0xa1a1a1;
        }
        var chairBg = BaseBitmap.create("prestige_circle_bg");
        chairBg.setPosition(flag1.x + flag1.width / 2 - chairBg.width / 2, flag1.y + flag1.height);
        this._scrollContiner.addChild(chairBg);
        var chairIcon = BaseBitmap.create("prestige_chair");
        chairIcon.setPosition(chairBg.x + chairIcon.width / 2 - chairIcon.width / 2, chairBg.y + chairIcon.height / 2 - chairIcon.height / 2);
        this._scrollContiner.addChild(chairIcon);
        var zigeBg = BaseBitmap.create("prestige_black_bg");
        zigeBg.setPosition(chairBg.x + chairBg.width / 2 - zigeBg.width / 2, chairBg.y + chairIcon.height - zigeBg.height + 2);
        this._scrollContiner.addChild(zigeBg);
        var zigeText = ComponentManager.getTextField(LanguageManager.getlocal("restige_qualification"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        zigeText.setPosition(zigeBg.x + zigeBg.width / 2 - zigeText.width / 2, zigeBg.y + zigeBg.height / 2 - zigeText.height / 2);
        this._scrollContiner.addChild(zigeText);
        var tequanBg = BaseBitmap.create("prestige_black_bg");
        tequanBg.setPosition(flag1.x, 220);
        tequanBg.width = flag1.width;
        tequanBg.height = 84;
        this._scrollContiner.addChild(tequanBg);
        var tequanText = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelDesc4"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tequanText.textAlign = egret.HorizontalAlign.CENTER;
        tequanText.lineSpacing = 5;
        tequanText.setPosition(tequanBg.x + 100 - tequanText.width / 2, tequanBg.y + tequanBg.height / 2 - tequanText.height / 2);
        this._scrollContiner.addChild(tequanText);
        //三个特权
        for (var i = 1; i <= 3; i++) {
            var tequanIconBg = BaseBitmap.create("prestige_circle");
            tequanIconBg.setPosition(tequanBg.x + 55 + 105 * i, tequanBg.y);
            this._scrollContiner.addChild(tequanIconBg);
            var prerogativeBtn = ComponentManager.getButton("prestige_prerogative" + i, null, this.prerogativeHandle, this, [i], 3);
            prerogativeBtn.setPosition(tequanIconBg.x + tequanIconBg.width / 2 - prerogativeBtn.width / 2, tequanIconBg.y + tequanIconBg.height / 2 - prerogativeBtn.height / 2);
            this._scrollContiner.addChild(prerogativeBtn);
        }
        //2
        var item2 = Config.PrestigeCfg.getPrestigeCfgById(2);
        var flag2 = BaseBitmap.create(this.getFlagPicStr(curPrestige, item2.prestige));
        flag2.setPosition(flag1.x, flagY2);
        this._scrollContiner.addChild(flag2);
        var nameTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName3", [String(item2.prestige)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt2.setPosition(flag2.x + flag2.width / 2 - nameTxt2.width / 2, flag2.y + 18);
        this._scrollContiner.addChild(nameTxt2);
        if (curPrestige < item2.prestige) {
            nameTxt2.textColor = 0xa1a1a1;
        }
        this.setAwardsBgStr(item2.getReward, flag2.y, curPrestige, item2.prestige);
        //3
        var item3 = Config.PrestigeCfg.getPrestigeCfgById(1);
        var flag3 = BaseBitmap.create(this.getFlagPicStr(curPrestige, item3.prestige));
        flag3.setPosition(flag1.x, flagY3);
        this._scrollContiner.addChild(flag3);
        var nameTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName2", [String(item3.prestige)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt3.setPosition(flag3.x + flag3.width / 2 - nameTxt3.width / 2, flag3.y + 18);
        this._scrollContiner.addChild(nameTxt3);
        if (curPrestige < item3.prestige) {
            nameTxt3.textColor = 0xa1a1a1;
        }
        this.setAwardsBgStr(item3.getReward, flag3.y, curPrestige, item3.prestige);
        //4
        var item4 = Config.PrestigeCfg.getPrestigeCfgById(0);
        var flag4 = BaseBitmap.create(this.getFlagPicStr(curPrestige, item4.prestige));
        flag4.setPosition(flag1.x, flagY4);
        this._scrollContiner.addChild(flag4);
        var nameTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName1", [String(item4.prestige)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt4.setPosition(flag4.x + flag4.width / 2 - nameTxt4.width / 2, flag4.y + 18);
        this._scrollContiner.addChild(nameTxt4);
        if (curPrestige < item4.prestige) {
            nameTxt4.textColor = 0xa1a1a1;
        }
        this.setAwardsBgStr(item4.getReward, flag4.y, curPrestige, item4.prestige);
        //底部
        var bottomBg = BaseBitmap.create("wifeskin_barbg");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - bHeight;
        this.addChildToContainer(bottomBg);
        // 称帝详情
        var prestigeInfoBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "prestigeInfo", this.prestigeInfoHandle, this);
        prestigeInfoBtn.setPosition(GameConfig.stageWidth / 2 - prestigeInfoBtn.width / 2 - 180, bottomBg.y + bottomBg.height / 2 - prestigeInfoBtn.height / 2);
        this.addChildToContainer(prestigeInfoBtn);
        // 名望日志
        var prestigeLogBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "prestigeLog", this.prestigeLogHandle, this);
        prestigeLogBtn.setPosition(GameConfig.stageWidth / 2 - prestigeLogBtn.width / 2 + 180, prestigeInfoBtn.y);
        this.addChildToContainer(prestigeLogBtn);
    };
    PrestigeView.prototype.prerogativeHandle = function (i) {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW, { itemId: i });
    };
    PrestigeView.prototype.getFlagPicStr = function (v1, v2) {
        if (v1 >= v2) {
            return "prestige_flag2";
        }
        else {
            return "prestige_flag1";
        }
    };
    PrestigeView.prototype.setAwardsBgStr = function (str, posY, v1, v2) {
        var icons = GameData.getRewardItemIcons(str, true);
        var itemsVo = GameData.formatRewardItem(str);
        var l = icons.length;
        var rewardContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < l; i++) {
            icons[i].setPosition((icons[i].width + 10) * i, 0);
            rewardContainer.addChild(icons[i]);
            var nameTxt = ComponentManager.getTextField(itemsVo[i].name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            nameTxt.setPosition(icons[i].x + icons[i].width / 2 - nameTxt.width / 2, icons[i].y + icons[i].height + 4);
            rewardContainer.addChild(nameTxt);
        }
        rewardContainer.setPosition(327, posY + 50);
        this._scrollContiner.addChild(rewardContainer);
        if (v1 >= v2) {
            for (var i = 0; i < l; i++) {
                var maskBg = BaseBitmap.create("public_9_bg11");
                maskBg.height = icons[i].height;
                maskBg.width = icons[i].width;
                icons[i].addChild(maskBg);
                var gotTxt = ComponentManager.getTextField(LanguageManager.getlocal("candyGetAlready"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                gotTxt.setPosition(icons[i].x + icons[i].width / 2 - gotTxt.width / 2, icons[i].y + icons[i].height / 2 - gotTxt.height / 2);
                rewardContainer.addChild(gotTxt);
            }
        }
    };
    PrestigeView.prototype.prestigeInfoHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEINFOPOPUPVIEW, {});
    };
    PrestigeView.prototype.prestigeLogHandle = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGELOFPOPUPVIEW, {});
    };
    PrestigeView.prototype.closeHandler = function () {
        if (Api.practiceVoApi.isPracticeOPen()) {
            PlayerBottomUI.getInstance().hide(true);
        }
        // else{
        // 	PlayerBottomUI.getInstance().btnHandler(1);
        // }
        _super.prototype.hide.call(this);
    };
    PrestigeView.prototype.dispose = function () {
        this._scrollContiner = null;
        this._pillar = null;
        _super.prototype.dispose.call(this);
    };
    return PrestigeView;
}(CommonView));
__reflect(PrestigeView.prototype, "PrestigeView");

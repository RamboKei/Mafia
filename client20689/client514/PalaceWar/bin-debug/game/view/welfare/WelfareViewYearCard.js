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
var WelfareViewYearCard = (function (_super) {
    __extends(WelfareViewYearCard, _super);
    function WelfareViewYearCard() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = undefined;
        _this._openDialogDiscountEnabled = false;
        _this._offsetY = 0;
        return _this;
    }
    WelfareViewYearCard.prototype.init = function () {
        _super.prototype.init.call(this);
        this._offsetY = this.bottomBg.y + 20;
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, this.bottomBg.y + 20, this.bottomBg.width, this.bottomBg.height - 40);
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this.addChild(scrollView);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = this.bottomBg.width - 100;
        line1.x = this.bottomBg.width / 2 - line1.width / 2;
        line1.y = this.bottomBg.y + 45 - this._offsetY;
        this._scrollContiner.addChild(line1);
        var cardNameTF = ComponentManager.getTextField(LanguageManager.getlocal("yearCard"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        cardNameTF.x = line1.x + line1.width / 2 - cardNameTF.width / 2;
        cardNameTF.y = line1.y + line1.height / 2 - cardNameTF.height / 2;
        this._scrollContiner.addChild(cardNameTF);
        var iconSp = BaseBitmap.create("yearcard_bigicon");
        iconSp.x = this.bottomBg.width / 2 - iconSp.width / 2;
        iconSp.y = this.bottomBg.y + 90 - this._offsetY;
        this._scrollContiner.addChild(iconSp);
        //描述
        var carddescriptiondeTxt = ComponentManager.getTextField(LanguageManager.getlocal("lifecarddes"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        carddescriptiondeTxt.x = iconSp.x - 34; //10  315
        carddescriptiondeTxt.y = iconSp.y - 109 + this._offsetY;
        this.addChild(carddescriptiondeTxt);
        var yearcard_desc = "yearcard_desc";
        // 折扣活动
        if ((Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) || PlatformManager.checkIsSfSp()) {
            yearcard_desc = "yearcard_desc2";
        }
        var descSp = BaseBitmap.create(yearcard_desc);
        descSp.x = this.bottomBg.width / 2 - descSp.width / 2;
        descSp.y = iconSp.y + iconSp.height + 10;
        this._scrollContiner.addChild(descSp);
        if (Api.switchVoApi.checkJumpBattle()) {
            descSp.y = iconSp.y + iconSp.height;
            var jumpSp = BaseBitmap.create("unlock_challenge_skip");
            jumpSp.x = this.bottomBg.width / 2 - jumpSp.width / 2;
            jumpSp.y = descSp.y + descSp.height;
            this._scrollContiner.addChild(jumpSp);
        }
        //修身显示
        if (Api.practiceVoApi.isPracticeOPen()) {
            var practice = BaseBitmap.create("yearcard_desc3");
            practice.x = this.bottomBg.width / 2 - practice.width / 2;
            practice.y = descSp.y + descSp.height + 30;
            this._scrollContiner.addChild(practice);
        }
        var isBuy = Api.shopVoApi.ifBuyYearCard();
        if (isBuy == true) {
            var hasGetSp = BaseBitmap.create("welfare_hasbuy");
            hasGetSp.x = this.bottomBg.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = descSp.y + descSp.height + 45 - hasGetSp.height / 2;
            this._scrollContiner.addChild(hasGetSp);
            if (Api.practiceVoApi.isPracticeOPen()) {
                hasGetSp.y = descSp.y + descSp.height + 75 - hasGetSp.height / 2;
            }
            this.showText();
        }
        else {
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g8");
            if (rechargeItemCfg) {
                App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
                var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "anyMoney", this.goToRechargeHandler, this);
                goToRechargeBtn.x = this.bottomBg.width / 2 - goToRechargeBtn.width / 2;
                goToRechargeBtn.y = descSp.y + descSp.height + 45 - goToRechargeBtn.height / 2;
                if (Api.switchVoApi.checkJumpBattle()) {
                    goToRechargeBtn.y = descSp.y + descSp.height + 65 - goToRechargeBtn.height / 2;
                }
                goToRechargeBtn.setText(App.CommonUtil.getMoneyString(rechargeItemCfg.cost), false);
                this._scrollContiner.addChild(goToRechargeBtn);
                this._goToRechargeBtn = goToRechargeBtn;
                if (Api.practiceVoApi.isPracticeOPen()) {
                    goToRechargeBtn.y = descSp.y + descSp.height + 95 - goToRechargeBtn.height / 2;
                }
                // 折扣活动
                if (Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
                    var oldPriceText = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_oldPrice", [LanguageManager.getlocal("anyMoney", [rechargeItemCfg.cost.toString()])]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    oldPriceText.x = goToRechargeBtn.x - 130;
                    oldPriceText.y = goToRechargeBtn.y + goToRechargeBtn.height / 2 - oldPriceText.height / 2;
                    this._scrollContiner.addChild(oldPriceText);
                    // 划线
                    var lineShape = new egret.Shape();
                    lineShape.graphics.lineStyle(2, 0xff0000, 1);
                    lineShape.graphics.moveTo(0, 0); //将画笔移动到起点位置
                    lineShape.graphics.lineTo(oldPriceText.width, 0); //从起点位置划线到终点
                    lineShape.graphics.endFill();
                    lineShape.x = oldPriceText.x;
                    lineShape.y = oldPriceText.y + 10;
                    this._scrollContiner.addChild(lineShape);
                    var rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g11");
                    if (rechargeItemCurrentCfg) {
                        goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney", [rechargeItemCurrentCfg.cost.toString()]), false);
                    }
                }
            }
        }
        // 折扣活动
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            this._openDialogDiscountEnabled = true;
        }
        else {
            this._openDialogDiscountEnabled = false;
        }
        if (PlatformManager.checkIsTWMCSp() == true) {
            var buyCardExplain = ComponentManager.getTextField(LanguageManager.getlocal("twBuyCardExplain"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            buyCardExplain.width = 360;
            buyCardExplain.height = 250;
            buyCardExplain.x = this.bottomBg.width / 2 - buyCardExplain.width / 2;
            buyCardExplain.y = descSp.y + 220;
            buyCardExplain.lineSpacing = 5;
            this._scrollContiner.addChild(buyCardExplain);
        }
    };
    WelfareViewYearCard.prototype.tick = function () {
        var needRefresh = false;
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            if (!this._openDialogDiscountEnabled) {
                needRefresh = true;
            }
        }
        else {
            if (this._openDialogDiscountEnabled) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEndViewRefreshed"));
                needRefresh = true;
            }
        }
        if (needRefresh) {
            // 刷新界面
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW);
        }
    };
    WelfareViewYearCard.prototype.showText = function () {
        //年卡有效期
        var cardTimedeTxt = ComponentManager.getTextField(LanguageManager.getlocal("lifecarTimeddes"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        cardTimedeTxt.x = 250;
        cardTimedeTxt.y = 960 - 130 - this._offsetY;
        this._scrollContiner.addChild(cardTimedeTxt);
    };
    WelfareViewYearCard.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var isBuy = Api.shopVoApi.ifBuyYearCard();
        if (isBuy) {
            this.showText();
            this._goToRechargeBtn.visible = false;
            var hasGetSp = BaseBitmap.create("welfare_hasbuy");
            hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height / 2 - hasGetSp.height / 2;
            this._scrollContiner.addChild(hasGetSp);
            App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
            App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc", [LanguageManager.getlocal("yearCard")]));
        }
    };
    WelfareViewYearCard.prototype.goToRechargeHandler = function () {
        if (this._openDialogDiscountEnabled) {
            PlatformManager.pay("g11");
        }
        else {
            PlatformManager.pay("g8");
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
    };
    WelfareViewYearCard.prototype.getResourceList = function () {
        if ((Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) || PlatformManager.checkIsSfSp()) {
            return _super.prototype.getResourceList.call(this).concat([
                "yearcard_desc2",
            ]);
        }
        else {
            return _super.prototype.getResourceList.call(this);
        }
    };
    WelfareViewYearCard.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        this._goToRechargeBtn = null;
        this._offsetY = 0;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewYearCard;
}(WelfareViewTab));
__reflect(WelfareViewYearCard.prototype, "WelfareViewYearCard");

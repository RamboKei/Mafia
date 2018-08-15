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
 * 红颜许愿
 * author yanyuling
 * date 2018/03/13
 * @class AcWishTreeView
 */
var AcWishTreeView = (function (_super) {
    __extends(AcWishTreeView, _super);
    function AcWishTreeView() {
        var _this = _super.call(this) || this;
        _this._cdNum = -2;
        return _this;
    }
    AcWishTreeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE), this.exchangeHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WISHTRER_NEXTDAY, this.refreshUI, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var forpeople_top = BaseBitmap.create("forpeople_top");
        forpeople_top.y = -15;
        this._nodeContainer.addChild(forpeople_top);
        var durTimeTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        durTimeTxt.text = this.acVo.getAcLocalTime(true, "0xffffff");
        durTimeTxt.x = 8;
        durTimeTxt.y = 5;
        this._nodeContainer.addChild(durTimeTxt);
        var topTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWishTreeTip1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTipTxt.x = durTimeTxt.x;
        topTipTxt.y = durTimeTxt.y + 35;
        this._nodeContainer.addChild(topTipTxt);
        var wishtree_bg = BaseBitmap.create("wishtree_bg");
        wishtree_bg.y = 80;
        this._nodeContainer.addChild(wishtree_bg);
        var wordImg = BaseBitmap.create("wishtree_word");
        wordImg.y = wishtree_bg.y + 80;
        wordImg.x = GameConfig.stageWidth - 100;
        this._nodeContainer.addChild(wordImg);
        var exchangeBtn = ComponentManager.getButton("wishtree_btn1", "", this.exchangeBtnHandler, this);
        exchangeBtn.x = 5;
        exchangeBtn.y = wishtree_bg.y + 5;
        this._exchangeBtn = exchangeBtn;
        this._nodeContainer.addChild(exchangeBtn);
        var bottomBg = BaseBitmap.create("wifeskin_barbg");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this._nodeContainer.addChild(bottomBg);
        var timesBg = BaseBitmap.create("wifeview_skingetbg");
        timesBg.width = 260;
        timesBg.height = 40;
        timesBg.x = GameConfig.stageWidth - timesBg.width;
        timesBg.y = bottomBg.y - timesBg.height;
        timesBg.name = "timesBg";
        this._nodeContainer.addChild(timesBg);
        this._lastTimeTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lastTimeTxt.text = LanguageManager.getlocal("acWishTreeTimesTxt", ["", ""]);
        this._lastTimeTxt.x = timesBg.x + timesBg.width / 2 - this._lastTimeTxt.width / 2 - 5;
        this._lastTimeTxt.y = timesBg.y + timesBg.height / 2 - this._lastTimeTxt.height / 2;
        this._nodeContainer.addChild(this._lastTimeTxt);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acTailorBtnOne", this.buyHandler, this);
        buyBtn.setText("");
        buyBtn.x = GameConfig.stageWidth / 2 - buyBtn.width / 2;
        buyBtn.y = bottomBg.y + 15;
        this._buyBtn = buyBtn;
        this._nodeContainer.addChild(buyBtn);
        var bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWishTreeTip2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTipTxt.name = "bottomTipTxt";
        this._bottomTipTxt = bottomTipTxt;
        bottomTipTxt.x = GameConfig.stageWidth / 2 - bottomTipTxt.width / 2;
        bottomTipTxt.y = bottomBg.y + bottomBg.height - 30;
        this._nodeContainer.addChild(bottomTipTxt);
        this.refreshUI();
        this.showEffect();
    };
    AcWishTreeView.prototype.refreshUI = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var numL = cfg.getLastWishTimes();
        var itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        var wishTime = numL - itemNum;
        if (wishTime <= 0) {
            wishTime = 0;
        }
        this._lastTimeTxt.text = LanguageManager.getlocal("acWishTreeTimesTxt", [String(wishTime), "" + numL]);
        /**
         * 无许愿次数
         */
        if (numL == 0) {
            this._nodeContainer.getChildByName("timesBg").visible = false;
            this._lastTimeTxt.visible = false;
            this._buyBtn.visible = false;
            this._bottomTipTxt.text = LanguageManager.getlocal("acWishTreeTip3");
            this._bottomTipTxt.x = GameConfig.stageWidth / 2 - this._bottomTipTxt.width / 2;
            this._bottomTipTxt.y = this._buyBtn.y + 30;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isShowRedDot) {
            App.CommonUtil.addRedDotToBDOC(this._exchangeBtn);
        }
        else {
            App.CommonUtil.removeRedDotFromBDOC(this._exchangeBtn);
        }
        if (this._cdNum == -2) {
            if (vo.getDiscount() == 0) {
                this._buyBtn.setText("acWishTreeBtnTxt1");
            }
            else {
                this._buyBtn.setText("acWishTreeBtnTxt2");
            }
        }
    };
    AcWishTreeView.prototype.buyHandler = function () {
        if (this._cdNum > 0) {
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var numL = cfg.getLastWishTimes();
        var itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        if (itemNum >= numL) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acWishTreebuytip2"));
            return;
        }
        this._cdNum = 15;
        if (vo.getDiscount() == 0) {
            PlatformManager.pay(cfg.cost1);
        }
        else {
            PlatformManager.pay(cfg.cost2);
        }
    };
    AcWishTreeView.prototype.exchangeBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACWISHTREEEXCHANGEVIEW, { aid: this.aid, code: this.code });
    };
    AcWishTreeView.prototype.exchangeHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        this.refreshUI();
    };
    AcWishTreeView.prototype.showEffect = function () {
        var time1 = App.MathUtil.getRandom(10000, 20000);
        var time2 = App.MathUtil.getRandom(0, 1500);
        var taohuaParticle = App.ParticleUtil.getParticle("taohua");
        taohuaParticle.x = 0;
        taohuaParticle.y = this.height - 700;
        taohuaParticle.rotation = -66;
        taohuaParticle.start();
        // this._effectLayer.addChild(taohuaParticle);
        this._nodeContainer.addChild(taohuaParticle);
        egret.Tween.get(taohuaParticle)
            .call(function () {
            taohuaParticle.start();
        }, this);
    };
    AcWishTreeView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            this.refreshUI();
            var rewardStr = "6_2102_1";
            var rewObj = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (data.data.data.payment) {
                var itemid = data.data.data.payment.itemId;
                PlatformManager.analyticsPay(itemid, data.data.data.payment.orderId);
            }
        }
    };
    AcWishTreeView.prototype.tick = function () {
        if (this._cdNum >= 0) {
            var text = App.DateUtil.getFormatBySecond(this._cdNum, 3);
            this._buyBtn.setText(text, false);
            this._cdNum--;
            return true;
        }
        else {
            if (this._cdNum == -1) {
                this._cdNum = -2;
                var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                if (vo.getDiscount() == 0) {
                    this._buyBtn.setText("acWishTreeBtnTxt1");
                }
                else {
                    this._buyBtn.setText("acWishTreeBtnTxt2");
                }
            }
        }
        return false;
    };
    AcWishTreeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wishtree_bg",
            "wishtree_btn_down",
            "wishtree_btn1",
            "wishtree_headmask",
            "wishtree_listbg",
            "wishtree_word",
            "wifeskin_barbg",
            "forpeople_top",
            "wishtree_get",
            "wishtree_mask",
            "taohua", "taohua_json",
            "wifeview_skingetbg",
        ]);
    };
    AcWishTreeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE), this.exchangeHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WISHTRER_NEXTDAY, this.refreshUI, this);
        this._nodeContainer = null;
        this._lastTimeTxt = null;
        this._cdNum = -2;
        _super.prototype.dispose.call(this);
    };
    return AcWishTreeView;
}(AcCommonView));
__reflect(AcWishTreeView.prototype, "AcWishTreeView");

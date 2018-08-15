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
var RechargeVipView = (function (_super) {
    __extends(RechargeVipView, _super);
    function RechargeVipView() {
        var _this = _super.call(this) || this;
        _this._greenarrow = null;
        _this._currMaxVip = 0;
        _this.public_dot2 = null;
        return _this;
    }
    RechargeVipView.prototype.getTabbarGroupY = function () {
        return 40;
    };
    RechargeVipView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "recharge_fnt",
            "rechargeview_greenarrow",
            "rechargevie_topbar",
            "common_left_bg",
            "common_9_bg",
            "rechargevie_close",
            "rechargevie_down",
            "rechargevie_open",
            "achievement_state3",
            "servant_topresbg",
            "progress7",
            "progress7_bg",
            "itemeffect",
            "rechargevie_btn",
            "rechargevie_btn_down",
            "rechargevie_receivebtn_down",
            "rechargevie_receivebtn",
            "rechargevie_received",
            "rechargevie_receiveImg",
            "rechargevie_effects",
            "recharge_discount_left",
            "recharge_discount_right",
            "btn_small_orange_down",
            "btn_small_orange",
            "recharge2big",
            "recharge4",
            "rechargelistimg",
            "rechargetitlenewbg",
            "recharge2_fnt",
            "rechargetitlle",
            "welfare_hasbuy",
            "rechargevie_give"
        ]);
    };
    RechargeVipView.prototype.hideAndShowVip = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
    };
    RechargeVipView.prototype.initView = function () {
        if (PlatformManager.checkIsUseSDK() && PlatformManager.checkIsWeiduan() == true && App.DeviceUtil.isAndroid() && (PlatformManager.checkIsTWBSp() == true || PlatformManager.checkIsTWShenheSp() == true)) {
            //漏单处理
            PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
            console.log("QAZ checkPurchase");
        }
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        public_dot2.x = 295;
        public_dot2.y = this.tabbarGroup.y;
        this.public_dot2 = public_dot2;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW, this.hideAndShowVip, this);
        var goldBg = BaseBitmap.create("servant_topresbg");
        goldBg.width = 100;
        goldBg.x = 50 + (PlatformManager.hasSpcialCloseBtn() ? 100 : 0);
        goldBg.y = 55 + (PlatformManager.hasSpcialCloseBtn() ? 35 : 0);
        this.addChild(goldBg);
        var gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.setPosition(goldBg.x - 42, goldBg.y - 20);
        gemIcon.setScale(0.6);
        this.addChild(gemIcon);
        //金币文字
        var gemTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        gemTxt.setPosition(gemIcon.x + 100 * gemIcon.scaleX, gemIcon.y + (100 * gemIcon.scaleY - gemTxt.height) / 2 + 5);
        this.addChild(gemTxt);
        this._gemTxt = gemTxt;
        //黑色长条
        var bgBlackBar = BaseBitmap.create("public_9_viewmask");
        bgBlackBar.width = 640;
        bgBlackBar.height = 30;
        bgBlackBar.setPosition(0, 90);
        this.addChild(bgBlackBar);
        this.setChildIndex(bgBlackBar, this.getChildIndex(this.closeBtn) - 1);
        //再充值多少解锁特权
        var upTxt = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        upTxt.setPosition(PlatformManager.hasSpcialCloseBtn() ? (goldBg.x + goldBg.width + 10) : ((GameConfig.stageWidth - upTxt.width) * 0.5), 95);
        this.addChild(upTxt);
        this._upTxt = upTxt;
        var progressBar = ComponentManager.getProgressBar("progress7", "progress7_bg", 316);
        progressBar.setPosition(160 + (GameConfig.stageWidth - progressBar.width) * 0.5, upTxt.y + upTxt.height + 40);
        this.addChild(progressBar);
        this._progressBar = progressBar;
        var leftVip = null;
        if (Api.vipVoApi.getCurLevelVipCfg().level != 0) {
            var currLeftVip = Api.vipVoApi.getCurLevelVipCfg().icon;
            leftVip = BaseLoadBitmap.create(currLeftVip);
            leftVip.setPosition(380, progressBar.y - 29);
            this.addChild(leftVip);
            leftVip.bindData = currLeftVip;
            this._leftVip = leftVip;
            this._greenarrow = BaseBitmap.create("rechargeview_greenarrow");
            this._greenarrow.setPosition(this._leftVip.x + this._leftVip.width + 80, this._leftVip.y + 5);
            this.addChild(this._greenarrow);
            var currRightIcon = Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
            var rightVip = BaseLoadBitmap.create(currRightIcon);
            rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
            this.addChild(rightVip);
            rightVip.bindData = currRightIcon;
            this._rightVip = rightVip;
        }
        else {
            leftVip = BaseLoadBitmap.create("");
            leftVip.setPosition(380, progressBar.y - 32);
            this.addChild(leftVip);
            this._leftVip = leftVip;
            if (this._greenarrow) {
                this._greenarrow.setPosition(430, progressBar.y - 27);
            }
            else {
                this._greenarrow = BaseBitmap.create("rechargeview_greenarrow");
                this._greenarrow.setPosition(420, progressBar.y - 27);
                this.addChild(this._greenarrow);
            }
            this._greenarrow.visible = false;
            var rightVip = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon);
            rightVip.bindData = currRightIcon;
            this.addChild(rightVip);
            this._rightVip = rightVip;
        }
        //rechargevie_topbar  上边长条
        var rechargevie_topbar = BaseLoadBitmap.create("rechargevie_topbar");
        rechargevie_topbar.setPosition(0, this._progressBar.y + 30);
        this.addChild(rechargevie_topbar);
        this.refresh();
    };
    RechargeVipView.prototype.rechargeHandler = function () {
        var data = [];
        data.index = 0;
        this.clickTabbarHandler(data);
        this.tabbarGroup.selectedIndex = data.index;
    };
    RechargeVipView.prototype.refresh = function () {
        this.public_dot2.visible = Api.vipVoApi.getReddot();
        this._currMaxVip = Api.playerVoApi.getPlayerMaxVip();
        if (this._progressBar) {
            var nextVipNeedGem = Api.vipVoApi.getNextVipNeedGemNum();
            var nextVipLeftGem = Api.vipVoApi.getNextVipLvNeedRechargeGemNum();
            var nextVipHasRechargeGem = nextVipNeedGem - nextVipLeftGem;
            var nextVipLevel = Math.min(Config.VipCfg.getMaxLevel(), Api.playerVoApi.getPlayerVipLevel() + 1);
            if (Api.playerVoApi.getPlayerVipLevel() == this._currMaxVip) {
                this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipMaxDesc");
                this._progressBar.setPercentage(1, nextVipNeedGem + "/" + nextVipNeedGem);
            }
            else {
                this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipDesc", [nextVipLeftGem.toString(), nextVipLevel.toString(), Api.playerVoApi.getPlayerVipLevel() + ""]);
                this._progressBar.setPercentage(nextVipHasRechargeGem / nextVipNeedGem, nextVipHasRechargeGem + "/" + nextVipNeedGem);
            }
            if (!PlatformManager.hasSpcialCloseBtn()) {
                this._upTxt.setPosition((GameConfig.stageWidth - this._upTxt.width) * 0.5, 95);
            }
            if (this._gemTxt) {
                this._gemTxt.text = Api.playerVoApi.getPlayerGem().toString();
            }
            if (Api.vipVoApi.getCurLevelVipCfg().level != 0 && Api.playerVoApi.getPlayerVipLevel() != this._currMaxVip) {
                var currLevip = Api.vipVoApi.getCurLevelVipCfg().icon;
                this._greenarrow.visible = true;
                if (this._leftVip.bindData != currLevip) {
                    this._leftVip.setload(currLevip);
                    this._leftVip.bindData = currLevip;
                }
                if (this._greenarrow) {
                    this._greenarrow.setPosition(460, this._leftVip.y + 5);
                }
                var currRightIcon = Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
                if (this._rightVip) {
                    if (this._rightVip.bindData == currRightIcon) {
                        this._rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
                    }
                    else {
                        this._rightVip.setload(currRightIcon);
                        this._rightVip.bindData = currRightIcon;
                    }
                    this._rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
                }
            }
            else {
                if (Api.playerVoApi.getPlayerVipLevel() == this._currMaxVip) {
                    this._leftVip.visible = false;
                    this._greenarrow.visible = false;
                    this._rightVip.setPosition(this._leftVip.x + 60, this._leftVip.y + 3);
                }
                else {
                    this._rightVip.setPosition(this._leftVip.x + 60, this._leftVip.y + 3);
                }
            }
        }
    };
    RechargeVipView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            // if(data.data.data.payment)
            // {
            // 	let itemid=data.data.data.payment.itemId;
            // 	App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1"));
            // 	let doubleIcon:BaseBitmap=<BaseBitmap>this.getChildByName(itemid+"doubleIcon");
            // 	if(doubleIcon)
            // 	{
            // 		BaseBitmap.release(doubleIcon);
            // 	}
            // }
            this.refresh();
        }
    };
    RechargeVipView.prototype.useVipCallback = function (event) {
        if (event.data.ret) {
            this.public_dot2.visible = Api.vipVoApi.getReddot();
        }
    };
    RechargeVipView.prototype.getTabbarTextArr = function () {
        return ["rechargeVipViewTitle",
            "vipBtn"
        ];
    };
    RechargeVipView.prototype.tick = function () {
        if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
            this.getSelectedTab()["tick"].call(this.getSelectedTab());
        }
    };
    RechargeVipView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW, this.hideAndShowVip, this);
        this._progressBar = null;
        this._rightVip = null;
        this._upTxt = null;
        this._gemTxt = null;
        this._leftVip = null;
        this._greenarrow = null;
        this._currMaxVip = 0;
        this.public_dot2 = null;
        _super.prototype.dispose.call(this);
    };
    return RechargeVipView;
}(CommonView));
__reflect(RechargeVipView.prototype, "RechargeVipView");

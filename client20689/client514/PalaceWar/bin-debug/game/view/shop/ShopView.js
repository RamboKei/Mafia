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
 * 商店
 * author dmj
 * date 2017/9/22
 * @class ShopView
 */
var ShopView = (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        var _this = _super.call(this) || this;
        //元宝文本
        _this.gemTF = null;
        _this._cdTxt = null;
        return _this;
    }
    ShopView.prototype.initView = function () {
        var temW = 38;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.useCallback, this);
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.scaleX = temW / gemIcon.width;
        gemIcon.scaleY = temW / gemIcon.height;
        gemIcon.x = PlatformManager.hasSpcialCloseBtn() ? 430 : 5;
        gemIcon.y = PlatformManager.hasSpcialCloseBtn() ? 320 : 44;
        this.addChild(gemIcon);
        this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.gemTF.x = gemIcon.x + temW + 5;
        this.gemTF.y = gemIcon.y + 9;
        this.addChild(this.gemTF);
        var goToRechargeBtn = ComponentManager.getButton("mainui_btn1", "", this.goToRechargeHandler, this);
        // goToRechargeBtn.scaleX = temW/goToRechargeBtn.width;
        // goToRechargeBtn.scaleY = temW/goToRechargeBtn.height;
        goToRechargeBtn.setScale(0.85);
        goToRechargeBtn.x = gemIcon.x + 118;
        goToRechargeBtn.y = gemIcon.y + 4;
        this.addChild(goToRechargeBtn);
        if (Api.switchVoApi.checkClosePay()) {
            goToRechargeBtn.visible = false;
        }
        var bg = BaseBitmap.create("shopview_bg");
        bg.x = 0;
        bg.y = -10;
        this.addChildToContainer(bg);
        if (Api.shopVoApi.getet() >= GameData.serverTime) {
            var cdbg = BaseBitmap.create("public_resnumbg");
            cdbg.setScale(1.5);
            cdbg.x = bg.x + bg.width - cdbg.width * 1.5 - 5;
            cdbg.y = bg.y + bg.height - 40;
            cdbg.name = "cdbg";
            this.addChildToContainer(cdbg);
            var timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime, 3);
            this._cdTxt = ComponentManager.getTextField("", 20);
            this._cdTxt.textColor = 0x00ff00;
            this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt", [timeStr]);
            this._cdTxt.x = cdbg.x + 40;
            this._cdTxt.y = cdbg.y + 13;
            this.addChildToContainer(this._cdTxt);
        }
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.x = 0;
        bottomBg.y = bg.y + bg.height;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y;
        this.addChildToContainer(bottomBg);
        var topBg = BaseBitmap.create("public_9_bg32");
        topBg.width = GameConfig.stageWidth - 30;
        topBg.height = bottomBg.height - 100;
        topBg.x = 15;
        topBg.y = bottomBg.y + 80;
        this.addChildToContainer(topBg);
    };
    ShopView.prototype.clickTabbarHandler = function (data) {
        // App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        if (this.checkTabCondition(index) == false) {
            // 重新checkTabCondition方法处理
            this.tabbarGroup.selectedIndex = this.selectedTabIndex;
            return;
        }
        this.lastSelectedTabIndex = this.selectedTabIndex;
        this.selectedTabIndex = index;
        this.changeTab();
        if (data.index == 0 && Api.shopVoApi.getInterday()) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SHOP_NEXTDAY);
        }
    };
    ShopView.prototype.useCallback = function () {
        this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
    };
    ShopView.prototype.goToRechargeHandler = function () {
        // App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    ShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shopview_bg", "shopview_corner", "shopview_line",
            "servant_bottombg", "common_titlebg", "vipLimit_img",
        ]);
    };
    ShopView.prototype.getContainerY = function () {
        return 260;
    };
    ShopView.prototype.getTitleButtomY = function () {
        var buttonY;
        if (this.titleBg) {
            buttonY = this.titleBg.y + this.titleBg.height;
        }
        else {
            if (this.titleTF) {
                buttonY = this.titleTF.y + this.titleTF.height;
            }
        }
        return buttonY;
    };
    ShopView.prototype.getTabbarGroupY = function () {
        return 225;
    };
    ShopView.prototype.tick = function () {
        if (Api.shopVoApi.getet() >= GameData.serverTime) {
            var timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime, 3);
            this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt", [timeStr]);
            this._cdTxt.visible = true;
            return true;
        }
        else {
            if (this._cdTxt)
                this._cdTxt.visible = false;
        }
        return false;
    };
    ShopView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_SHOP_GETSHOPCFG, requestData: {} };
    };
    ShopView.prototype.getTabbarTextArr = function () {
        return ["shopViewTab1",
            "shopViewTab3"
            // ,"itemBtn"
        ];
    };
    ShopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.useCallback, this);
        this.gemTF = null;
        _super.prototype.dispose.call(this);
    };
    return ShopView;
}(CommonView));
__reflect(ShopView.prototype, "ShopView");

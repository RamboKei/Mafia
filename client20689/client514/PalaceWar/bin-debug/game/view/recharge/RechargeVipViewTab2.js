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
var RechargeVipViewTab2 = (function (_super) {
    __extends(RechargeVipViewTab2, _super);
    function RechargeVipViewTab2() {
        var _this = _super.call(this) || this;
        _this._receiveItemBtn = null;
        _this._curShowVipLevel = -1;
        _this._vipBtnList = [];
        _this.currLevel = -1;
        _this.isTouch = false;
        _this.newCurrIndex = -1;
        _this.nextVipCfg = null;
        _this.titleTxt = null;
        _this.txt = null;
        _this.downBg = null;
        _this.upBg = null;
        _this.boo = false;
        _this.currCountainer = null;
        _this.groupArr = [];
        _this.scrollView = null;
        _this._receiveItemBtnType = 0; //0 默认 充值  1 可以领取   2已经领取  
        _this.receiveImg = null;
        _this.rechargevie_effects = null;
        _this._light = null;
        _this._light2 = null;
        _this._slideCountainer = null;
        _this._scrollRect1 = null;
        _this._vipNum = "1_privilege";
        _this._vip1Boo = false;
        /** 打开对话框的时候，vip折扣活动是否开启 */
        _this._openDialogDiscountEnabled = false;
        _this.initView();
        return _this;
    }
    RechargeVipViewTab2.prototype.refreshWhenSwitchBack = function () {
        var currLevel = Api.playerVoApi.getPlayerVipLevel();
        this.currLevel = currLevel;
        if (RechargeVipViewTab2.lastVipLevel != currLevel) {
            RechargeVipViewTab2.currNum = -1;
            RechargeVipViewTab2.lastVipLevel = currLevel;
            this.showBtn();
            this.refresh();
            this.newCurrIndex = Api.playerVoApi.getPlayerVipLevel();
            this.refreshView();
            if (this._vip1Boo && RechargeVipViewTab2.lastVipLevel == 1) {
                this.upBg.setload("vip_details_" + this._vipNum);
            }
            else {
                this.upBg.setload("vip_details_" + RechargeVipViewTab2.lastVipLevel);
            }
            this.showItemList();
        }
    };
    RechargeVipViewTab2.prototype.refresh = function () {
        this.currLevel = Api.playerVoApi.getPlayerVipLevel();
        if (this.newCurrIndex == -1) {
            this.newCurrIndex = this.currLevel;
        }
    };
    RechargeVipViewTab2.prototype.initView = function () {
        this._vip1Boo = Api.switchVoApi.checkVip1Privilege();
        this._slideCountainer = new BaseDisplayObjectContainer();
        this._slideCountainer.y = 30;
        this.addChild(this._slideCountainer);
        RechargeVipViewTab2.lastVipLevel = Api.playerVoApi.getPlayerVipLevel();
        this.refresh();
        this.refreshView();
        var leftBg = BaseBitmap.create("common_left_bg");
        leftBg.x = 0;
        leftBg.y = -30;
        leftBg.height = GameConfig.stageHeigth - 200;
        this.addChild(leftBg);
        //背景宣传图
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, 549);
        if (this.currLevel == 0) {
            this.currLevel = 1;
        }
        if (this._vip1Boo && this.currLevel == 1) {
            this.upBg = BaseLoadBitmap.create("vip_details_" + this._vipNum, rect);
        }
        else {
            this.upBg = BaseLoadBitmap.create("vip_details_" + this.currLevel, rect);
        }
        this.upBg.x = 0;
        this._slideCountainer.addChild(this.upBg);
        this.upBg.y = -30;
        //背景图风景
        var downBg = BaseBitmap.create("common_9_bg");
        downBg.width = 400;
        downBg.setPosition(this.upBg.x, this.upBg.y + this.upBg.height);
        this._slideCountainer.addChild(downBg);
        var downTitleLine = BaseBitmap.create("public_line3");
        downTitleLine.width = downBg.width - 60;
        downTitleLine.setPosition(downBg.x + (downBg.width - downTitleLine.width) / 2, downBg.y + 32);
        this._slideCountainer.addChild(downTitleLine);
        if (RechargeVipViewTab2.currNum == -1) {
            var str = this.currLevel + "";
        }
        else {
            var str = (RechargeVipViewTab2.currNum + 1).toString();
        }
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_3", [str]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BLACK);
        var pos = App.CommonUtil.getCenterPos(downTitleLine, titleTxt, false);
        titleTxt.setPosition(pos.x, pos.y);
        this._slideCountainer.addChild(titleTxt);
        this.titleTxt = titleTxt;
        var txt = ComponentManager.getTextField(this.nextVipCfg.localStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.width = 400;
        txt.lineSpacing = 5;
        txt.y = 580;
        txt.x = 30;
        txt.cacheAsBitmap = true;
        this._slideCountainer.addChild(txt);
        this.txt = txt;
        // downBg.height = 500;
        downBg.height = txt.height + 100 > 500 ? (txt.height + 100) : 500;
        var scrollRect1 = new egret.Rectangle(0, 0, 800, GameConfig.stageHeigth - 190);
        if (this.scrollView == null) {
            this.scrollView = ComponentManager.getScrollView(this._slideCountainer, scrollRect1);
            this.scrollView.x = 150;
            this.scrollView.y = -30;
            this.addChild(this.scrollView);
        }
        if (Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex).reward) {
            this.showItemList();
        }
        else {
            this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
            this._receiveItemBtn.addTouchTap(this.itemHandler, this);
            this._slideCountainer.addChild(this._receiveItemBtn);
            this._receiveItemBtn.setPosition(385, 410);
            var _point = new egret.Point(this._receiveItemBtn.x, this._receiveItemBtn.y);
        }
        this.showBtn();
        // vip折扣
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "1") && Api.acVoApi.getActivityVoByAidAndCode("discount", "1").isStart) {
            var discountIcon = BaseBitmap.create("recharge_discount_right");
            discountIcon.x = 414;
            discountIcon.y = 526;
            this._slideCountainer.addChild(discountIcon);
            // 划线
            var lineShape = new egret.Shape();
            lineShape.graphics.lineStyle(2, 0xff0000, 1);
            lineShape.graphics.moveTo(0, 0); //将画笔移动到起点位置
            lineShape.graphics.lineTo(255, 0); //从起点位置划线到终点
            lineShape.graphics.endFill();
            lineShape.x = this.txt.x;
            lineShape.y = this.txt.y + 10;
            this._slideCountainer.addChild(lineShape);
            this._openDialogDiscountEnabled = true;
        }
        else {
            this._openDialogDiscountEnabled = false;
        }
    };
    RechargeVipViewTab2.prototype.showItemList = function () {
        this.clearIconArr();
        if (this._vip1Boo == false && this.newCurrIndex == 1) {
            this.nextVipCfg.reward = "";
        }
        var iconList = GameData.getRewardItemIcons(this.nextVipCfg.reward, true, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 10;
            var startY = 421;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.scaleX = 0.78;
                icon.scaleY = 0.78;
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this._slideCountainer.addChild(icon);
                this.groupArr.push(icon);
                _icon = icon;
            }
            //领取按钮
            this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
            this._receiveItemBtn.addTouchTap(this.itemHandler, this);
            this._receiveItemBtn.anchorOffsetX = this._receiveItemBtn.width / 2;
            this._receiveItemBtn.anchorOffsetY = this._receiveItemBtn.height / 2;
            this._slideCountainer.addChild(this._receiveItemBtn);
            this._receiveItemBtn.visible = false;
            this._receiveItemBtn.setPosition(385, 410);
            if (this.rechargevie_effects == null) {
                //可以领取的背景发光特效
                this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
                this.rechargevie_effects.addTouchTap(this.itemHandler, this);
                this._slideCountainer.addChild(this.rechargevie_effects);
                this.rechargevie_effects.anchorOffsetX = this.rechargevie_effects.width / 2;
                this.rechargevie_effects.anchorOffsetY = this.rechargevie_effects.height / 2;
                this.rechargevie_effects.setPosition(440, 460);
                var _index = this._slideCountainer.getChildIndex(this._receiveItemBtn);
                this._slideCountainer.setChildIndex(this.rechargevie_effects, _index);
                this.rechargevie_effects.touchEnabled = false;
                this.rechargevie_effects.visible = false;
            }
            //领取字体
            this.receiveImg = BaseBitmap.create("rechargevie_receiveImg");
            this._slideCountainer.addChild(this.receiveImg);
            this.receiveImg.x = 400;
            this.receiveImg.y = 480;
            this.receiveImg.touchEnabled = false;
            this.receiveImg.visible = false;
            this.showReceive();
        }
        else {
            if (this._receiveItemBtn == null) {
                this._receiveItemBtnType = 0;
                this._receiveItemBtn = BaseBitmap.create("rechargevie_btn");
                this._receiveItemBtn.addTouchTap(this.itemHandler, this);
                this._slideCountainer.addChild(this._receiveItemBtn);
                this._receiveItemBtn.setPosition(390, 410);
                var _point = new egret.Point(this._receiveItemBtn.x, this._receiveItemBtn.y);
            }
        }
    };
    RechargeVipViewTab2.prototype.clearIconArr = function () {
        for (var i = this.groupArr.length - 1; i >= 0; i--) {
            var itemIcon = this.groupArr[i];
            if (itemIcon && itemIcon.parent) {
                if (itemIcon instanceof BaseDisplayObjectContainer) {
                    itemIcon.dispose();
                }
                else {
                    BaseBitmap.release(itemIcon);
                }
                this.groupArr.pop();
            }
        }
        if (this.rechargevie_effects) {
            egret.Tween.removeTweens(this.rechargevie_effects);
            BaseBitmap.release(this.rechargevie_effects);
            this.rechargevie_effects = null;
        }
        if (this.receiveImg) {
            BaseBitmap.release(this.receiveImg);
            this.receiveImg = null;
        }
        if (this._receiveItemBtn) {
            BaseBitmap.release(this._receiveItemBtn);
            this._receiveItemBtn = null;
        }
    };
    RechargeVipViewTab2.prototype.showBtn = function () {
        this._vipBtnList = [];
        var btnNum = Api.vipVoApi.getMaxbtnNum(); //this.getMaxbtnNum();
        for (var i = 0; i < btnNum; i++) {
            this._vipBtnList.push(i);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 180, GameConfig.stageHeigth - 200);
        this._scrollList = ComponentManager.getScrollList(VipBtnScrollItem, this._vipBtnList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, -30);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        if (RechargeVipViewTab2.currNum != -1) {
            var _vipBtnScrollItem = this._scrollList.getItemByIndex(RechargeVipViewTab2.currNum);
            _vipBtnScrollItem.setType();
        }
        else {
            if (this.currLevel == 0) {
                var _vipBtnScrollItem = this._scrollList.getItemByIndex(this.currLevel);
                _vipBtnScrollItem.setType();
            }
            else {
                RechargeVipViewTab2.currNum = this.currLevel - 1;
                var _vipBtnScrollItem = this._scrollList.getItemByIndex(this.currLevel - 1);
                _vipBtnScrollItem.setType();
            }
        }
    };
    RechargeVipViewTab2.prototype.clickItemHandler = function (event) {
        this.scrollView.setScrollTop(-30);
        var num = RechargeVipViewTab2.currNum;
        RechargeVipViewTab2.currNum = event.data;
        this.newCurrIndex = event.data + 1;
        if (RechargeVipViewTab2.currNum != -1) {
            if (num != -1) {
                var _vipBtnScrollItem = this._scrollList.getItemByIndex(num);
                _vipBtnScrollItem.removeBitmap();
            }
            else {
                var _vipBtnScrollItem = this._scrollList.getItemByIndex(0);
                _vipBtnScrollItem.removeBitmap();
            }
        }
        var _vipBtnScrollItem = this._scrollList.getItemByIndex(event.data);
        _vipBtnScrollItem.setType();
        if (this._vip1Boo && this.newCurrIndex == 1) {
            this.upBg.setload("vip_details_" + this._vipNum);
        }
        else {
            this.upBg.setload("vip_details_" + this.newCurrIndex);
        }
        this.refresh();
        this.refreshView();
    };
    RechargeVipViewTab2.prototype.refreshView = function () {
        if (this.newCurrIndex == 0) {
            this.newCurrIndex += 1;
        }
        this.nextVipCfg = Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex);
        if (this.titleTxt) {
            this.titleTxt.text = LanguageManager.getlocal("wifeUnlock_3", [this.newCurrIndex + ""]);
        }
        if (this.txt) {
            this.txt.text = this.nextVipCfg.localStr;
        }
        this.showItemList();
    };
    RechargeVipViewTab2.prototype.itemHandler = function () {
        if (RechargeVipViewTab2.currNum != -1 && this._receiveItemBtnType == 1) {
            if (Api.playerVoApi.getPlayerVipLevel() >= this.newCurrIndex) {
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
                NetManager.request(NetRequestConst.REQUEST_VIP_VIPWELFARE, { "vip": this.newCurrIndex + "", });
            }
        }
        else {
            if (this._receiveItemBtnType == 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_RE);
            }
        }
    };
    RechargeVipViewTab2.prototype.useVipCallback = function (event) {
        if (event.data.ret) {
            if (this._scrollList) {
                var _vipBtnScrollItem = this._scrollList.getItemByIndex(this.newCurrIndex - 1);
                _vipBtnScrollItem.setRedhot();
            }
            var curr_point = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 100);
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards), curr_point);
            this.showReceive();
            if (Api.switchVoApi.checkVip1Privilege()) {
                var titleVo = Api.itemVoApi.getTitleInfoVoById(4001);
                var titleVo2 = Api.itemVoApi.getTitleInfoVoById(4004);
                if (titleVo && titleVo.num > 0 || titleVo2 && titleVo2.num > 0) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR);
                }
            }
        }
    };
    RechargeVipViewTab2.prototype.removeLightEffect = function () {
        if (this._light) {
            if (this._light.mask) {
                var bmp = this._light.mask;
                if (bmp) {
                    BaseBitmap.release(bmp);
                }
            }
            BaseBitmap.release(this._light);
            this._light = null;
        }
    };
    //领取按钮状态
    RechargeVipViewTab2.prototype.showReceive = function () {
        if (Api.shopVoApi.getVipRewardInfo(this.newCurrIndex)) {
            //已经领取状态
            this._receiveItemBtn.visible = false;
            egret.Tween.removeTweens(this._receiveItemBtn);
            this._receiveItemBtnType = 2;
            this.receiveImg.visible = false;
            this._alreadyReceived = BaseBitmap.create("rechargevie_received");
            this._slideCountainer.addChild(this._alreadyReceived);
            this._alreadyReceived.setPosition(390, 413);
            this.groupArr.push(this._alreadyReceived);
            if (this.rechargevie_effects) {
                egret.Tween.removeTweens(this.rechargevie_effects);
                this.rechargevie_effects.visible = false;
            }
        }
        else {
            if (!Api.vipVoApi.getVipCfgByLevel(this.newCurrIndex).reward) {
                this.rechargeState();
                return;
            }
            // 可领取状态
            if (Api.playerVoApi.getPlayerVipLevel() >= this.newCurrIndex) {
                this.removeLightEffect();
                this._receiveItemBtn.texture = ResourceManager.getRes("rechargevie_receivebtn");
                this._receiveItemBtn.x = 440;
                this._receiveItemBtn.y = 470;
                this._receiveItemBtn.visible = true;
                this._receiveItemBtnType = 1;
                this.receiveImg.visible = true;
                //光效转圈特效
                if (this.rechargevie_effects) {
                    this.rechargevie_effects.visible = true;
                    egret.Tween.get(this.rechargevie_effects, { loop: true }).to({ rotation: this.rechargevie_effects.rotation + 360 }, 10000);
                }
                egret.Tween.get(this._receiveItemBtn, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
            else {
                this.rechargeState();
            }
        }
    };
    RechargeVipViewTab2.prototype.rechargeState = function () {
        this._receiveItemBtn.texture = ResourceManager.getRes("rechargevie_btn");
        this._receiveItemBtn.setPosition(440, 460);
        this._receiveItemBtn.visible = true;
        var _point = new egret.Point(385, 410);
        this._receiveItemBtnType = 0;
        this.receiveImg.visible = false;
        egret.Tween.removeTweens(this._receiveItemBtn);
        if (this.rechargevie_effects) {
            egret.Tween.removeTweens(this.rechargevie_effects);
            this.rechargevie_effects.visible = false;
        }
    };
    RechargeVipViewTab2.prototype.getShowVipLevel = function () {
        if (this._curShowVipLevel < 0) {
            this._curShowVipLevel = Api.vipVoApi.getShowVipLevel();
            if (this._curShowVipLevel >= Config.VipCfg.getMaxLevel()) {
                this._curShowVipLevel = Config.VipCfg.getMaxLevel();
            }
        }
        return this._curShowVipLevel;
    };
    RechargeVipViewTab2.prototype.getNextShowVipLevel = function () {
        var nextVipLevel = Math.min(Math.max(0, this.getShowVipLevel() + 1), Config.VipCfg.getMaxLevel());
        return nextVipLevel;
    };
    RechargeVipViewTab2.prototype.rechargeHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    RechargeVipViewTab2.prototype.tick = function () {
        var needRefresh = false;
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "1") && Api.acVoApi.getActivityVoByAidAndCode("discount", "1").isStart) {
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
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW);
        }
    };
    RechargeVipViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
        this._receiveItemBtn = null;
        this._alreadyReceived = null;
        this._curShowVipLevel = -1;
        this._vipBtnList = [];
        this._scrollList = null;
        RechargeVipViewTab2.currNum = -1;
        this.newCurrIndex = -1;
        this.txt = null;
        this.titleTxt = null;
        this.downBg = null;
        this.currLevel = -1;
        this.nextVipCfg = null;
        this.upBg = null;
        RechargeVipViewTab2.lastVipLevel = 0;
        this.boo = false;
        this._receiveItemBtnType = 0;
        this.receiveImg = null;
        this._slideCountainer = null;
        this.scrollView = null;
        _super.prototype.dispose.call(this);
    };
    RechargeVipViewTab2.currNum = -1;
    RechargeVipViewTab2.lastVipLevel = 0;
    return RechargeVipViewTab2;
}(CommonViewTab));
__reflect(RechargeVipViewTab2.prototype, "RechargeVipViewTab2");

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
 * 红颜
 * author dmj
 * date 2017/10/9
 * @class WifeView
 */
var WifeView = (function (_super) {
    __extends(WifeView, _super);
    function WifeView() {
        var _this = _super.call(this) || this;
        _this._redDotSp = null;
        return _this;
    }
    WifeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE);
        this.playEffect(SoundConst.EFFECT_WIFE, true);
        Api.rookieVoApi.checkNextStep();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.refreshItem, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS, this.checkRedPoint, this);
        //大背景
        var bigBg = BaseBitmap.create("wife_listbg");
        bigBg.y = -15;
        this.addChildToContainer(bigBg);
        var bottom = BaseBitmap.create("arena_bottom");
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
        this.addChildToContainer(bottom);
        this._wifVoApi = Api.wifeVoApi;
        this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
        if (this._wifeInfoVoList.length <= 0) {
            return;
        }
        // let bottomBg = BaseBitmap.create("public_9_bg23");
        // bottomBg.width = GameConfig.stageWidth-10;
        // bottomBg.height = GameConfig.stageHeigth - 230;
        // bottomBg.x = 5;
        // bottomBg.y = 0;
        // this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 170);
        var wifeList = new Array();
        wifeList.push(null);
        wifeList = wifeList.concat(this._wifeInfoVoList);
        wifeList.push(null);
        // let wife1 = new Array<WifeInfoVo>;
        // [wifeList].concat(this._wifeInfoVoList).concat(wifeList);
        // egret.log(wifeList.length)
        this._scrollList = ComponentManager.getScrollList(WifeScrollItem1, wifeList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(7, -15);
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        // this._scrollList.setScrollTop(300,0);
        var vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        vigorTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        vigorTF.x = 20;
        vigorTF.y = this._scrollList.y + this._scrollList.height + 37;
        this.addChildToContainer(vigorTF);
        this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._vigorNumTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
        this._vigorNumTF.y = vigorTF.y;
        this.addChildToContainer(this._vigorNumTF);
        var vipTipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        vipTipTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        vipTipTxt.x = vigorTF.x + 170;
        vipTipTxt.y = vigorTF.y;
        this.addChildToContainer(vipTipTxt);
        var needVip = GameConfig.config.wifebaseCfg.needVip;
        if (Api.playerVoApi.getPlayerVipLevel() >= needVip) {
            vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
            var checkbox = ComponentManager.getCheckBox();
            checkbox.x = vipTipTxt.x + vipTipTxt.width + 5;
            checkbox.y = vipTipTxt.y + vipTipTxt.height / 2 - checkbox.height / 2;
            this.addChildToContainer(checkbox);
            this._checkBox = checkbox;
            this._checkBox.addTouchTap(this.selectHandler, this);
        }
        else {
            vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt", [needVip]);
        }
        this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "callBtn", this.clickCallBtn, this);
        this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 60;
        this._callBtn.y = vigorTF.y - 20;
        this.addChildToContainer(this._callBtn);
        this._callBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "recoverVigor", this.clickCallBtn, this);
        this._recoverBtn.x = GameConfig.stageWidth - this._recoverBtn.width - 60;
        this._recoverBtn.y = this._callBtn.y;
        this.addChildToContainer(this._recoverBtn);
        this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._recoverBtn.visible = false;
        this.tick();
        var unLockBtn = ComponentManager.getButton("wifelookbtn", null, this.unLockClick, this);
        unLockBtn.x = 15;
        unLockBtn.y = 0;
        unLockBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(unLockBtn);
        if (Api.switchVoApi.checkOpenWifeStatus()) {
            this._wifeStatusBtn = ComponentManager.getButton("wifestatus_btn", null, this.wifestatusClick, this);
            this._wifeStatusBtn.x = 15;
            this._wifeStatusBtn.y = unLockBtn.y + unLockBtn.height;
            this._wifeStatusBtn.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(this._wifeStatusBtn);
        }
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = GameConfig.stageWidth;
        servant_mask.x = 0;
        servant_mask.y = GameConfig.stageHeigth - this.container.y - bottom.height - 140;
        this.addChildToContainer(servant_mask);
        this.checkRedPoint();
    };
    WifeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg", "wifeview_charmicon",
            "wifeview_vigoricon", "wifeview_unlockmask", "wife_listbg",
            "arena_bottom", "wifehalfbg", "wifelookbtn_down", "wifelookbtn",
            "servant_mask", "wifeview_itembg", "wifeview_lockbg", "wifeview_itembg2",
            "wifestatus_btn_down", "wifestatus_btn",
        ]);
    };
    WifeView.prototype.unLockClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW);
    };
    WifeView.prototype.wifestatusClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
        this.hide();
    };
    WifeView.prototype.checkRedPoint = function () {
        //一键册封
        if (Api.wifestatusVoApi.getIsConfer()) {
            if (this._redDotSp == null && this._wifeStatusBtn) {
                this._redDotSp = BaseBitmap.create("public_dot2");
                this._redDotSp.x = this._wifeStatusBtn.x + this._wifeStatusBtn.width - this._redDotSp.width - 30;
                this._redDotSp.y = this._wifeStatusBtn.y + 20;
                this.addChildToContainer(this._redDotSp);
            }
            else {
                if (this._redDotSp) {
                    this._redDotSp.visible = true;
                }
            }
        }
        else {
            if (this._redDotSp) {
                this._redDotSp.visible = false;
            }
        }
    };
    WifeView.prototype.selectHandler = function () {
        if (this._checkBox.checkSelected()) {
            this._callBtn.setText("wifeBatchTxt2");
        }
        else {
            this._callBtn.setText("callBtn");
        }
    };
    WifeView.prototype.clickCallBtn = function (param) {
        if (WifeView.isMoveing) {
            return;
        }
        Api.rookieVoApi.checkNextStep();
        // todo随机传唤
        if (this._wifVoApi.getEnergyNum() > 0) {
            var batchV = false;
            if (this._checkBox && this._checkBox.checkSelected()) {
                batchV = true;
            }
            NetManager.request(NetRequestConst.REQUEST_WIFE_CALL, { autoFlag: batchV });
        }
        else {
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
            if (itemInfoVo && itemInfoVo.num > 0) {
                var message = LanguageManager.getlocal("useItemMsg", [itemInfoVo.name + "x1", LanguageManager.getlocal("vigorDesc")]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: itemInfoVo.icon, iconBg: itemInfoVo.iconBg, num: itemInfoVo.num, msg: message, id: Number(GameConfig.config.wifebaseCfg.needItem), useNum: 1 });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
            }
        }
    };
    WifeView.prototype.confirmCallbackHandler = function () {
        if (WifeView.isMoveing) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY, null);
    };
    // private clickItemHandler(event:egret.TouchEvent):void
    // {
    // 	let index:number = Number(event.data);
    // 	let wifeInfoVo = this._wifeInfoVoList[index];
    // 	let id = wifeInfoVo.id;
    // 	// todo打开宠幸妻妾界面
    // 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id,handler:this});
    // 	SoundManager.stopEffect(SoundConst.EFFECT_WIFE);
    // 	this._selectWifeId = id;
    // }
    // 随机传唤后端返回数据后
    WifeView.prototype.callWifeCallback = function (event) {
        var rdata = event.data.data.data;
        this._loveData = rdata;
        this.tick();
        if (this._checkBox && this._checkBox.checkSelected()) {
            var autoCallWife = rdata.autoCallWife;
            // ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo.name])
            ViewController.getInstance().openView(ViewConst.BASE.WIFECALLBATCHSUCCESSVIEW, [autoCallWife]);
            return;
        }
        if (rdata.lucky) {
            TimerManager.doTimer(2000, 1, this.showLucky, this);
        }
        var id = this._loveData.callWife[0];
        this._scrollList.addEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        this.container.touchChildren = false;
        var index = Api.wifeVoApi.getWifeIndexVoById(id);
        WifeView.isMoveing = true;
        this._scrollIndex = index + 1;
        this._scrollList.setScrollTopByIndex(index + 1, 500);
        var wideItem = this._scrollList.getItemByIndex(index + 1);
        wideItem.refreshData(id);
        if (rdata.rewards) {
            this._rewardData = rdata.rewards;
            // let rewards= GameData.formatRewardItem(rdata.rewards);
            // if(rewards&&rewards.length>0)
            // {
            // 	App.CommonUtil.playRewardFlyAction(rewards);
            // }
        }
    };
    WifeView.prototype.refreshItem = function (p) {
        // if(!WifeView.wifeId){
        // 	return;
        // }
        if (p.data.ret == true && p.data.data.data.lucky) {
            this.showLucky();
        }
        var index = Api.wifeVoApi.getWifeIndexVoById(WifeView.wifeId);
        var wideItem = this._scrollList.getItemByIndex(index + 1);
        wideItem.refreshData(WifeView.wifeId);
    };
    // 列表滑动结束后
    WifeView.prototype.moveComplete = function (event) {
        this.container.touchChildren = true;
        this._scrollList.removeEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        var posX = this._scrollList.getItemByIndex(this._scrollIndex).x;
        var posY = this._scrollList.getItemByIndex(this._scrollIndex).y;
        var targetPoint = this._scrollList.getItemByIndex(this._scrollIndex).localToGlobal(0, 0);
        // 播放召唤动画，更新数据
        var index = Number(event.data);
        var wifeInfoVo = this._wifeInfoVoList[index];
        var id = this._loveData.callWife[0];
        var childData = null;
        if (this._loveData.childArr.length > 0) {
            childData = this._loveData.childArr[0];
        }
        // if(this._rewardData)
        // {
        // 	let rewards= GameData.formatRewardItem(this._rewardData);
        // 	if(rewards&&rewards.length>0)
        // 	{
        // 		App.CommonUtil.playRewardFlyAction(rewards);
        // 	}
        // }
        ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW, { id: id, type: 1, x: targetPoint.x, y: targetPoint.y, childData: childData, rewards: this._rewardData });
    };
    WifeView.prototype.showLucky = function () {
        App.CommonUtil.showGodbless("wife");
    };
    // 使用精力丹后端返回数据后
    WifeView.prototype.recoverEnergyCallback = function (event) {
        var rdata = event.data.data.data;
        this.tick();
    };
    WifeView.prototype.tick = function () {
        if (this._vigorNumTF == null) {
            return;
        }
        if (this._wifVoApi.getEnergyNum() > 0) {
            this._callBtn.visible = true;
            this._recoverBtn.visible = false;
            this._vigorNumTF.text = this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum();
        }
        else {
            this._callBtn.visible = false;
            this._recoverBtn.visible = true;
            this._vigorNumTF.text = App.DateUtil.getFormatBySecond(this._wifVoApi.getRecoverEnergyTime(), 1);
        }
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    WifeView.prototype.doGuide = function () {
        this.hide();
    };
    WifeView.prototype.getRuleInfo = function () {
        return "wife_description";
    };
    WifeView.prototype.hide = function () {
        if (Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding) {
            return;
        }
        if (Api.rookieVoApi.isInGuiding) {
            // Api.rookieVoApi.checkWaitingGuide();
            Api.rookieVoApi.checkNextStep();
        }
        _super.prototype.hide.call(this);
    };
    WifeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.refreshItem, this);
        if (this._scrollList) {
            this._scrollList = null;
        }
        if (this._wifeInfoVoList) {
            this._wifeInfoVoList = null;
        }
        if (this._vigorNumTF) {
            this._vigorNumTF = null;
        }
        if (this._wifVoApi) {
            this._wifVoApi = null;
        }
        this._redDotSp = null;
        this._loveData = null;
        WifeView.wifeId = null;
        WifeView.isMoveing = false;
        this._rewardData = null;
        this._wifeStatusBtn = null;
        _super.prototype.dispose.call(this);
    };
    WifeView.isMoveing = false;
    return WifeView;
}(CommonView));
__reflect(WifeView.prototype, "WifeView");

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
var SharePopupView = (function (_super) {
    __extends(SharePopupView, _super);
    function SharePopupView() {
        var _this = _super.call(this) || this;
        _this._shareType = 0;
        return _this;
    }
    SharePopupView.prototype.initView = function () {
        // if(PlatformManager.checkIsWanbaSp()||PlatformManager.checkIsTWBSp() || PlatformManager.checkIs4399Sp()||PlatformManager.checkIsKRSp())
        // {
        // 	this.showWanbaInfo();
        // }
        // else
        // {
        // 	this.showFkylcInfo();
        // }
        this._shareType = PlatformManager.checkShare();
        if (this._shareType == 2 || this._shareType == 3) {
            this.showFkylcInfo();
        }
        else {
            this.showWanbaInfo();
        }
    };
    SharePopupView.prototype.showFkylcInfo = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS, this.sendShareSuccess, this);
        var getTxt = ComponentManager.getTextField(LanguageManager.getlocal(PlatformManager.checkIsAiweiyouSp() ? "fkylcShareTip_aiweiyou" : "fkylcShareTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        getTxt.x = this.viewBg.width / 2 - getTxt.width / 2;
        getTxt.y = 20;
        this.addChildToContainer(getTxt);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 528;
        bottomBg.height = 614;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 50;
        this.addChildToContainer(bottomBg);
        this.refreshView();
        var messageStr = LanguageManager.getlocal("fkylcGetCD", ["00:00:00"]);
        this._timeLabel = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._timeLabel.setPosition(this.viewBg.width / 2 - this._timeLabel.width / 2, 690);
        this.addChildToContainer(this._timeLabel);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, this.getTitleStr(), this.showHand, this);
        confirmBtn.setPosition(this.viewBg.width / 2 - confirmBtn.width / 2, this._timeLabel.y + this._timeLabel.height + 20);
        this.addChildToContainer(confirmBtn);
        this.tick();
        // for(let i:number=0;i<l;i++)
        // {
        // 	let rewardStr=rewards[keys[i]];
        // 	let icons = GameData.getRewardItemIcons(rewardStr);
        // 	let bg:BaseBitmap=BaseBitmap.create("public_9_bg14");
        // 	bg.width=517
        // 	bg.height=150;
        // 	bg.setPosition((this.viewBg.width-bg.width)/2,70+(bg.height+10)*i);
        // 	this.addChildToContainer(bg);
        // 	for(let ii:number=0;ii<icons.length;ii++)
        // 	{
        // 		icons[ii].setPosition(bg.x+20+(icons[ii].width+10)*ii,bg.y+15);
        // 		this.addChildToContainer(icons[ii]);
        // 	}
        // 	let lineImg = BaseBitmap.create("public_line1");
        // 	lineImg.x = this.width/2 - lineImg.width/2;
        // 	lineImg.y = 40;
        // 	this.addChildToContainer(lineImg);
        // }
    };
    SharePopupView.prototype.getFKYLCItem = function (reward, index, day) {
        var fkVo = Api.otherInfoVoApi.getFkShareInfo();
        var container = new BaseDisplayObjectContainer();
        var rewardStr = reward;
        var icons = GameData.getRewardItemIcons(rewardStr, true);
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 514;
        bg.height = 190;
        // bg.setPosition((this.viewBg.width-bg.width)/2,70+(bg.height+10)*i);
        container.addChild(bg);
        for (var ii = 0; ii < icons.length; ii++) {
            icons[ii].setPosition(bg.x + 20 + (icons[ii].width + 10) * ii, bg.y + 15);
            container.addChild(icons[ii]);
        }
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.x = container.width / 2 - lineImg.width / 2;
        lineImg.y = 127;
        container.addChild(lineImg);
        var getStr = LanguageManager.getlocal(PlatformManager.checkIsAiweiyouSp() ? "fkylcShareNum_aiweiyou" : "fkylcShareNum", [day]);
        var getTxt = ComponentManager.getTextField(getStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        getTxt.x = 30;
        getTxt.y = 145;
        container.addChild(getTxt);
        var num = 0;
        if (fkVo) {
            num = fkVo.n;
        }
        var numStr;
        var color = TextFieldConst.COLOR_WARN_RED;
        numStr = "(" + num + "/" + day + ")";
        if (num >= Number(day)) {
            color = TextFieldConst.COLOR_WARN_GREEN2;
        }
        var mumTxt = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        mumTxt.x = 165;
        mumTxt.y = 145;
        mumTxt.textColor = color;
        container.addChild(mumTxt);
        //state 1 未领取 2已经领取 3未达成
        var state = 1;
        if (!fkVo) {
            state = 3;
        }
        else {
            if (num >= Number(day)) {
                if (fkVo.get[day] == 1) {
                    state = 2;
                }
                else {
                    state = 1;
                }
            }
            else {
                state = 3;
            }
        }
        if (state == 1) {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getBtnCilck, this, [day]);
            getBtn.x = 350;
            getBtn.y = 134;
            container.addChild(getBtn);
            getBtn.setColor(TextFieldConst.COLOR_BLACK);
            getBtn.bindData = index;
        }
        else if (state == 3) {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getBtnCilck, this, [day]);
            getBtn.x = 350;
            getBtn.y = 134;
            container.addChild(getBtn);
            getBtn.setColor(TextFieldConst.COLOR_BLACK);
            getBtn.bindData = index;
            getBtn.setEnable(false);
        }
        else {
            var stateIcon = BaseBitmap.create("achievement_state3");
            stateIcon.x = 378;
            stateIcon.y = 124;
            stateIcon.setScale(0.7);
            container.addChild(stateIcon);
        }
        return container;
    };
    SharePopupView.prototype.getBtnCilck = function (key) {
        // let fkVo = Api.otherInfoVoApi.getFkShareInfo();
        // if(fkVo && fkVo.et && fkVo.et > GameData.serverTime)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("fkylcGetCDTip"));
        // 	return;
        // }
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD, { key: key });
    };
    SharePopupView.prototype.fkcwShareCallback = function () {
        var shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW);
        if (shareView && shareView.isInit()) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE, null);
        }
    };
    SharePopupView.prototype.showHand = function () {
        if (this._shareType == 3) {
            PlatformManager.share(this.fkcwShareCallback, this);
            return;
        }
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var clickHand = BaseBitmap.create("guide_hand");
            clickHand.skewY = 180;
            clickHand.x = 590;
            clickHand.y = 10;
            this._handContainer.addChild(clickHand);
            egret.Tween.get(clickHand, { loop: true })
                .to({ y: 60 }, 500)
                .to({ y: 10 }, 500);
            var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth / 2 - getTxt.width / 2;
            getTxt.y = GameConfig.stageHeigth / 2 - getTxt.height / 2;
            getTxt.lineSpacing = 10;
            this._handContainer.addChild(getTxt);
            // egret.Tween.get(clickHand,{loop:true})
            // 		.to({scaleX: 0.9,scaleY:0.9}, 500)
            // 		.to({scaleX: 1,scaleY:1}, 500)
        }
        else {
            this._handContainer.visible = true;
        }
    };
    SharePopupView.prototype.hideMask = function () {
        if (this._handContainer) {
            this._handContainer.visible = false;
        }
        // this.sendShareSuccess();
    };
    SharePopupView.prototype.tick = function () {
        // if(PlatformManager.checkIsFkylcSp){
        var fkVo = Api.otherInfoVoApi.getFkShareInfo();
        if (fkVo && fkVo.et && fkVo.et > GameData.serverTime) {
            var time = App.DateUtil.getFormatBySecond(fkVo.et - GameData.serverTime, 1);
            var messageStr = LanguageManager.getlocal("fkylcGetCD", [time]);
            this._timeLabel.text = messageStr;
            this._timeLabel.visible = true;
        }
        else {
            if (this._timeLabel) {
                this._timeLabel.visible = false;
            }
        }
        // }
    };
    SharePopupView.prototype.refreshView = function () {
        if (this._itemContainer) {
            this.removeChildFromContainer(this._itemContainer);
            this._itemContainer = null;
        }
        this._itemContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._itemContainer);
        var rewards = Config.GameprojectCfg.rewardFKYLC2;
        var keys = Object.keys(rewards);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var l = keys.length;
        for (var i = 0; i < l; i++) {
            var item = this.getFKYLCItem(rewards[keys[i]], i, keys[i]);
            this._itemContainer.addChild(item);
            item.x = 30;
            item.y = 60 + (item.height + 10) * i;
        }
    };
    SharePopupView.prototype.showWanbaInfo = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 184;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("shareSuccessRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        rewardTxt.setPosition(bg.x + 10, bg.y + 25);
        this.addChildToContainer(rewardTxt);
        var iconList = GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB2, true);
        var l = iconList ? iconList.length : 0;
        for (var i = 0; i < l; i++) {
            var icon = iconList[i];
            icon.setPosition(bg.x + 10 + (icon.width + 10) * i, rewardTxt.y + rewardTxt.height + 5);
            this.addChildToContainer(icon);
        }
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sharePopupViewTitle", this.confirmHandler, this);
        confirmBtn.setPosition(bg.x + (bg.width - confirmBtn.width) / 2, bg.y + bg.height + 10);
        this.addChildToContainer(confirmBtn);
    };
    SharePopupView.prototype.confirmHandler = function () {
        PlatformManager.share(this.requestReward, this);
    };
    SharePopupView.prototype.sendShareSuccess = function () {
        this.hideMask();
        this.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE, {});
    };
    SharePopupView.prototype.getTitleStr = function () {
        if (PlatformManager.checkIsAiweiyouSp() == true) {
            return "sharePopupViewTitle_aiweiyou";
        }
        else {
            return "sharePopupViewTitle";
        }
    };
    SharePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "achievement_state3", "guide_hand"
        ]);
    };
    SharePopupView.prototype.requestReward = function () {
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD, {});
    };
    SharePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD) {
                if (data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                    this.hide();
                }
            }
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD) {
                if (data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                    // this.hide();
                }
                this.refreshView();
            }
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_FKSHARE) {
                this.refreshView();
            }
        }
    };
    SharePopupView.prototype.dispose = function () {
        this._itemContainer = null;
        this._handContainer = null;
        this._timeLabel = null;
        this._shareType = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS, this.sendShareSuccess, this);
        _super.prototype.dispose.call(this);
    };
    return SharePopupView;
}(PopupView));
__reflect(SharePopupView.prototype, "SharePopupView");
window["rsdkShareCallback"] = function (code) {
    if (Number(code) == 0) {
        var shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW);
        if (shareView && shareView.isInit()) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_FKSHARE, null);
        }
    }
};

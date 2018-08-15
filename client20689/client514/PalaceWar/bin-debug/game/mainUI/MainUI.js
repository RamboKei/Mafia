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
 * author 陈可
 * date 2017/9/18
 * @class MainUI
 */
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this._topContiner = undefined;
        _this._bottomContiner = undefined;
        _this._isAtHome = true;
        _this._mailRedDotSp = null;
        _this._achRedDotSp = null;
        _this._functionPreviewBg = null;
        _this._functionAni = null;
        _this._activityIconList = [];
        _this._iconNameList = {};
        _this._signName = null;
        _this._functionIcon = null;
        _this._lastL = 0;
        _this.bottomBtnCfg = [
            {
                id: 1,
                btnName: "servant",
                btnIconImg: "mainui_bottomimg1",
                isOPen: true,
            },
            {
                id: 2,
                btnName: "item",
                btnIconImg: "mainui_bottomimg2",
                isOPen: true,
            },
            {
                id: 3,
                btnName: "dailytask",
                btnIconImg: "mainui_bottomimg3",
                isOPen: true,
            },
            {
                id: 4,
                btnName: "achieve",
                btnIconImg: "mainui_bottomimg4",
                isOPen: true,
            },
            {
                id: 5,
                btnName: "shop",
                btnIconImg: "mainui_bottomimg5",
                isOPen: true,
            },
            {
                id: 6,
                btnName: "welfare",
                btnIconImg: "mainui_bottomimg6",
                isOPen: false,
            },
            {
                id: 7,
                btnName: "challenge",
                btnIconImg: "mainui_bottomimg9",
                isOPen: false,
            },
            {
                id: 8,
                btnName: "manage",
                btnIconImg: "mainui_bottomimg10",
                isOPen: false,
            },
        ];
        return _this;
        //玩家基础信息发生变化的刷新
    }
    /**
     * 填内容
     */
    MainUI.prototype.init = function () {
        this.initTop();
        this.initButtom();
        // 初始化后刷新邮件状态
        this.checkMailState();
        if (Api.switchVoApi.checkAutoLoadDefaultRes()) {
            App.LoginResLoader.autoLoadNextResItem();
        }
        var empBtn = ComponentManager.getButton("", "", this.empClick, this);
        this.addChild(empBtn);
        var btnbg = BaseBitmap.create("empBtnBg");
        empBtn.addChild(btnbg);
        var btn = BaseBitmap.create("empBtn");
        empBtn.addChild(btn);
        this.setLayoutPosition(LayoutConst.rightbottom, empBtn, this, [10, 180]);
    };
    MainUI.prototype.empClick = function () {
        ViewController.getInstance().openView('EmperorWarEnterView');
    };
    MainUI.prototype.initTop = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doRefreshTaskInfo, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC, this.doRefreshTaskInfo, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.doRefreshTaskInfo, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, this.doQuickAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT, this.checkAchPoint, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkActivityIconState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.checkRedPointByModel, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.checkWanBaIcon, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE, this.doDinnerGuide, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD), this.refreshText, this);
        //功能预览
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT, this.checkIsRefresh, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.refreshText, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.initCoverIcon, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.initBindIcon, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REALNAME, this.createRealnameRedHot, this);
        this._topContiner = new BaseDisplayObjectContainer();
        this.addChild(this._topContiner);
        if (App.DeviceUtil.checkIsSeascreen()) {
            this._topContiner.y = GameConfig.seaScreenTopH;
        }
        //填内容
        this._isAtHome = true;
        var topbg = new MainUINewTop({ showName: true });
        this._topContiner.addChild(topbg);
        this._iconContainer = new BaseDisplayObjectContainer();
        this._iconContainer.y = 113;
        this._topContiner.addChild(this._iconContainer);
        //跑马灯
        this._lampRoll = new LampRoll();
        this._lampRoll.y = 106;
        this._topContiner.addChild(this._lampRoll);
        if (Config.AcCfg.isGetAll) {
            this.initIconsAndCheckStatus();
        }
        else {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, this.initIconsAndCheckStatus, this);
        }
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    MainUI.prototype.checkAllRedPoint = function () {
        for (var key in this.bottomBtnCfg) {
            this.checkRedPointByModel(this.bottomBtnCfg[key].btnName);
        }
    };
    MainUI.prototype.checkRedPointByModel = function (e) {
        var modelName = (e instanceof egret.Event) ? e.data : e;
        var btn = this._bottomContiner.getChildByName(modelName);
        if (btn) {
            if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].checkRedPoint) {
                var showRedPoint = Api[modelName + "VoApi"].checkRedPoint();
                var redSp = void 0;
                if (showRedPoint) {
                    App.CommonUtil.addRedDotToBDOC(btn);
                }
                else {
                    App.CommonUtil.removeRedDotFromBDOC(btn);
                }
            }
        }
        if (modelName == MessageConst.MESSAGE_MODEL_SHOP || modelName == MessageConst.MESSAGE_MODEL_USERINFO) {
            this.checkVipState();
            this.checkThanksg();
        }
    };
    MainUI.prototype.checkAchPoint = function () {
        if (Api.achievementVoApi.getAchGetNum() > 0) {
            if (this._achRedDotSp == null && this._bottomContiner.getChildByName("achieve")) {
                this._achRedDotSp = BaseBitmap.create("public_dot2");
                var achBtn = this._bottomContiner.getChildByName("achieve");
                this._achRedDotSp.x = achBtn.x + achBtn.width - this._achRedDotSp.width;
                this._achRedDotSp.y = achBtn.y + 2;
                this._bottomContiner.addChild(this._achRedDotSp);
            }
            else {
                if (this._achRedDotSp) {
                    this._achRedDotSp.visible = true;
                }
            }
        }
        else {
            if (this._achRedDotSp) {
                this._achRedDotSp.visible = false;
            }
        }
    };
    MainUI.prototype.tick = function () {
        if (Api.switchVoApi.checkClosePay()) {
            return;
        }
        this.check12BoxIcon();
        // this.checkRankActiveIcon();
        if (Api.acVoApi.checkIsHasNewAc()) {
            this.showNewActivityIcons();
        }
        var l = this._activityIconList.length;
        if (l > 0) {
            var isdelete = false;
            for (var i = l - 1; i >= 0; i--) {
                var icon = this._activityIconList[i];
                var name_1 = icon.name;
                var _a = name_1.split("-"), aid = _a[0], code = _a[1];
                if (Api.acVoApi.getActivityVoByAidAndCode(aid, code)) {
                    if (!Api.acVoApi.checkActivityStartByAid(aid, code)) {
                        icon.dispose();
                        this._activityIconList.splice(i, 1);
                        delete this._iconNameList[icon.name];
                        isdelete = true;
                    }
                }
                this.setIconTime(icon);
            }
            if (isdelete || (this._lastL != l)) {
                this.sortIcons();
                this.setIconsPos();
            }
        }
        this._lastL = this._activityIconList.length;
    };
    MainUI.prototype.setIconTime = function (icon) {
        // egret.log(icon.name)
        if (icon.name == "newcharge_func") {
            var lt = Api.shopVoApi.getPayInfo1Time();
            var timeStr = App.DateUtil.getFormatBySecond(lt, 1);
            if (icon.getChildByName("time")) {
                icon.getChildByName("time").text = timeStr;
            }
            else {
                var timeBg = BaseBitmap.create("public_9_bg15");
                timeBg.width = 160;
                timeBg.x = -5;
                timeBg.y = 32;
                timeBg.setScale(0.5);
                icon.addChild(timeBg);
                var timeTF = ComponentManager.getTextField(timeStr, 18, TextFieldConst.COLOR_WARN_GREEN);
                timeTF.x = 2;
                timeTF.y = 34;
                timeTF.name = "time";
                icon.addChild(timeTF);
            }
        }
    };
    //12元礼包
    MainUI.prototype.check12BoxIcon = function () {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag > 0 && Api.switchVoApi.checkOpenNewCharge()) {
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            if (rechargeItemCfg) {
                var itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
                var itemVo2 = Api.shopVoApi.getPayInfoById2("g10");
                if (itemVo1 && itemVo1.st + rechargeItemCfg.lastTime > GameData.serverTime) {
                    // egret.log(itemVo1.st + rechargeItemCfg.lastTime - 3000 - GameData.serverTime)
                    // if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime - 3000 > GameData.serverTime ){
                    this.createMainUIIcon("newcharge");
                }
                else {
                    this.removeMainUIIcon("newcharge");
                }
            }
            else {
                this.removeMainUIIcon("newcharge");
            }
        }
        else {
            this.removeMainUIIcon("newcharge");
        }
    };
    MainUI.prototype.initIconsAndCheckStatus = function () {
        if (Api.switchVoApi.checkClosePay()) {
            return;
        }
        this.initIcons();
        this.setPosAndCheckState();
        //此方法禁止单独添加icon
    };
    MainUI.prototype.initIcons = function () {
        this.initVipIcon();
        this.initRebateIcon();
        this.initRealnameIcon();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, this.initIconsAndCheckStatus, this);
        var acIconList = Api.acVoApi.getAllActivityIcons();
        var l = acIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = acIconList[i];
            this._iconNameList[icon.name.split("_")[0]] = icon;
            this._iconContainer.addChild(icon);
            this._activityIconList.push(icon);
        }
        this.initFuliIcons();
        this.checkWanBaIcon();
        this.initCardIcons();
        this.check12BoxIcon();
        // this.checkRankActiveIcon();
        this.checkCandyIcon();
        this.initAndCheckAttentionIcon();
        this.initDownloadIcon();
        this.initInviteIcon();
        this.initZhubowanghongIcon();
        this.initCoverIcon();
        this.initBindIcon();
    };
    MainUI.prototype.setPosAndCheckState = function () {
        this.sortIcons();
        this.setIconsPos();
        this.checkActivityIconState();
    };
    MainUI.prototype.sortIcons = function () {
        this._activityIconList.sort(function (a, b) {
            var nameA = a.name;
            if (nameA) {
                if (nameA.indexOf("_") > -1) {
                    nameA = nameA.split("_")[0];
                }
                if (nameA.indexOf("-") > -1) {
                    nameA = nameA.split("-")[0];
                }
            }
            var nameB = b.name;
            if (nameB) {
                if (nameB.indexOf("_") > -1) {
                    nameB = nameB.split("_")[0];
                }
                if (nameB.indexOf("-") > -1) {
                    nameB = nameB.split("-")[0];
                }
            }
            var sortIdA = Config.IconorderCfg.getIconSortIdByCfgName(nameA);
            var sortIdB = Config.IconorderCfg.getIconSortIdByCfgName(nameB);
            return sortIdA - sortIdB;
        });
    };
    MainUI.prototype.showNewActivityIcons = function () {
        var acIconList = Api.acVoApi.getAllActivityIcons();
        var l = acIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = acIconList[i];
            this._iconNameList[icon.name.split("_")[0]] = icon;
            this._iconContainer.addChild(icon);
            this._activityIconList.push(icon);
        }
        this.sortIcons();
    };
    MainUI.prototype.checkRankActiveIcon = function () {
        if (Api.acVoApi.getRanActives().length > 0) {
            var icon = this.createMainUIIcon("rankActive");
        }
        else {
            this.removeMainUIIcon("rankActive");
        }
    };
    MainUI.prototype.initAndCheckAttentionIcon = function () {
        if (PlatformManager.isSupportAttention() && !PlatformManager.checkAttention() && !Api.otherInfoVoApi.getFkFocusInfo()) {
            // if(!App.MessageHelper.hasEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON))
            // {
            // 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
            // }
            var icon = this.createMainUIIcon("attention");
        }
        else {
            if (PlatformManager.isSupportAttention() && !Api.otherInfoVoApi.getFkFocusInfo()) {
                var icon = this.createMainUIIcon("attention");
                if (!Api.otherInfoVoApi.getFkFocusInfo()) {
                    App.CommonUtil.addRedDotToBDOC(icon);
                }
                else {
                    App.CommonUtil.removeRedDotFromBDOC(icon);
                }
            }
            else {
                this.removeMainUIIcon("attention");
            }
            // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
        }
    };
    MainUI.prototype.initVipIcon = function () {
        if (Api.switchVoApi.checkClosePay()) {
            return;
        }
        this.createMainUIIcon("rechargeVip");
    };
    //福利－1.5倍
    MainUI.prototype.initRebateIcon = function () {
        if (!Api.switchVoApi.checkOpenRechargeRebate()) {
            return;
        }
        this.createMainUIIcon("rebate");
    };
    //实名认证
    MainUI.prototype.initRealnameIcon = function () {
        var _this = this;
        if (!Api.switchVoApi.checkOpenCertification() || Api.otherInfoVoApi.certification()) {
            return;
        }
        else {
            RSDKHelper.checkRealname(function (result) {
                if (result) {
                    _this.createMainUIIcon("realname");
                }
            });
        }
    };
    MainUI.prototype.initCardIcons = function () {
        if (Api.switchVoApi.checkClosePay()) {
            return;
        }
        // if (Api.switchVoApi.checkTWShenhe()) {
        // 	return;
        // }
        if (PlatformManager.checkIsShenHeYiWan()) {
            return;
        }
        var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
        var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
        if (!isBuyMonthCard) {
            this.createMainUIIcon("monthcard");
        }
        if (isBuyMonthCard && !isBuyYearCard) {
            this.createMainUIIcon("yearcard");
        }
    };
    //签到
    MainUI.prototype.initSignIcons = function () {
        this.checkSignIcons();
        this.cheackSignRedDot();
    };
    MainUI.prototype.checkSignIcons = function () {
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        if (totalSignDay >= 8) {
            return;
        }
        if (totalSignDay <= 7) {
            var flag2 = Api.arrivalVoApi.checkFlagByIndex(2);
            var flag3 = Api.arrivalVoApi.checkFlagByIndex(3);
            var flag7 = Api.arrivalVoApi.checkFlagByIndex(7);
            if (totalSignDay <= 2 && flag2 != 1) {
                this.createMainUIIcon("sign2");
                this._signName = "sign2";
                return;
            }
            else if (totalSignDay <= 3 && flag3 != 1) {
                this.removeMainUIIcon("sign2");
                this.createMainUIIcon("sign3");
                this._signName = "sign3";
                this.setIconsPos();
                return;
            }
            else if (totalSignDay <= 7 && flag7 != 1) {
                this.removeMainUIIcon("sign3");
                this.createMainUIIcon("sign7");
                this._signName = "sign7";
                this.setIconsPos();
                return;
            }
            else {
                this.removeMainUIIcon("sign7");
            }
        }
        else {
            this.removeMainUIIcon("sign7");
        }
    };
    MainUI.prototype.cheackSignRedDot = function () {
        var signIcon = this.getTopBtnByName(this._signName);
        if (signIcon) {
            var boo = Api.arrivalVoApi.isShowRedDot;
            if (boo) {
                App.CommonUtil.addRedDotToBDOC(signIcon);
            }
            else {
                App.CommonUtil.removeRedDotFromBDOC(signIcon);
            }
        }
    };
    MainUI.prototype.checkCardIcon = function () {
        var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
        var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
        if (isBuyMonthCard) {
            this.removeMainUIIcon("monthcard");
        }
        if (isBuyYearCard) {
            this.removeMainUIIcon("yearcard");
        }
    };
    MainUI.prototype.checkWanBaIcon = function () {
        if (Api.otherInfoVoApi.checkShowWanbaDesktopIcon()) {
            var icon = this.createMainUIIcon("desktop");
            App.CommonUtil.addRedDotToBDOC(icon);
        }
        else {
            this.removeMainUIIcon("desktop");
        }
        if (Api.otherInfoVoApi.checkShowWanbaShareIcon() && Api.switchVoApi.checkTWShenhe() == false) {
            var icon = this.createMainUIIcon("share");
            // App.CommonUtil.addRedDotToBDOC(icon);
            if (PlatformManager.checkIsFkylcSp()) {
                if (Api.otherInfoVoApi.getFkIsshowRed()) {
                    App.CommonUtil.addRedDotToBDOC(icon);
                }
                else {
                    App.CommonUtil.removeRedDotFromBDOC(icon);
                }
            }
        }
        else {
            this.removeMainUIIcon("share");
        }
        this.initAndCheckAttentionIcon();
        this.checkRealnameIcon2();
    };
    MainUI.prototype.createRealnameRedHot = function () {
        var icon = this.getTopBtnByName("realname");
        App.CommonUtil.addRedDotToBDOC(icon);
        this.checkRealnameIcon2();
    };
    MainUI.prototype.checkRealnameIcon2 = function () {
        var icon = this.getTopBtnByName("realname");
        if (icon) {
            if (Api.otherInfoVoApi.certification()) {
                App.CommonUtil.removeRedDotFromBDOC(icon);
            }
        }
    };
    MainUI.prototype.checkCandyIcon = function () {
        if (Api.otherInfoVoApi.getCandyGetInfo() && PlatformManager.getCandyFlag()) {
            this.createMainUIIcon("candyget");
        }
    };
    // 微端下载
    MainUI.prototype.initDownloadIcon = function () {
        if ((PlatformManager.checkIsTWBSp() && Api.gameinfoVoApi.getDownType() === "pc")
            || (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")) {
            this.createMainUIIcon("download");
        }
    };
    // 邀请有礼图标
    MainUI.prototype.initInviteIcon = function () {
        if (Api.switchVoApi.checkOpenInvite()) {
            this.createMainUIIcon("invite");
        }
    };
    // 主播网红图标
    MainUI.prototype.initZhubowanghongIcon = function () {
        if (PlatformManager.checkIsTWBSp()) {
            if (GameData.serverTime * 1000 < new Date("2018/04/14").getTime()) {
                if (Api.wifeVoApi.getWifeInfoVoById(212) === null) {
                    this.createMainUIIcon("zhubowanghong");
                }
            }
        }
    };
    MainUI.prototype.initCoverIcon = function () {
        if (PlatformManager.checkIsWanbaSp() && Api.switchVoApi.checkOpenCover() && Api.otherInfoVoApi.getCoverState() !== 2) {
            this.createMainUIIcon("cover");
        }
        else {
            this.removeMainUIIcon("cover");
        }
    };
    // 绑定有礼图标
    MainUI.prototype.initBindIcon = function () {
        if (Api.switchVoApi.checkOpenFbBind()
            && Api.otherInfoVoApi.getFBBindFlag() != 1
            && PlatformManager.checkIsTWBSp()
            && PlatformManager.checkIsWeiduan()
            && ((App.CommonUtil.compareVersion("3.0", PlatformManager.getAppVersion()) !== -1 && App.DeviceUtil.isIOS())
                ||
                    (App.CommonUtil.compareVersion("1.6", PlatformManager.getAppVersion()) !== -1 && App.DeviceUtil.isAndroid()))) {
            this.createMainUIIcon("bind");
        }
        else {
            this.removeMainUIIcon("bind");
        }
    };
    MainUI.prototype.initFuliIcons = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkWelfareState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkWelfareState, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.checkWelfareState, this);
        if (Api.switchVoApi.checkClosePay()) {
            return;
        }
        this.createMainUIIcon("welfare");
        this.checkFirstRechargeIcon();
        this.checkWelfareState();
        this.checkVipState();
        this.initSignIcons();
        this.checkThanksg();
        this.checkWanbaQQbi();
    };
    MainUI.prototype.checkWanbaQQbi = function () {
        if (PlatformManager.checkIsWanbaSp() && GameData.serverTime < 1529337599) {
            this.createMainUIIcon("shareqq");
        }
        else {
            this.removeMainUIIcon("shareqq");
        }
    };
    MainUI.prototype.checkThanksg = function () {
        this.createMainUIIcon("thanksgiving");
        var thanksIcon = this.getTopBtnByName("thanksgiving");
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        if (thanksIcon) {
            if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true) {
                this.createMainUIIcon("thanksgiving");
            }
            else {
                this.removeMainUIIcon("thanksgiving");
            }
        }
    };
    MainUI.prototype.checkVipState = function () {
        var vipIcon = this.getTopBtnByName("rechargeVip");
        if (vipIcon) {
            var boo = Api.vipVoApi.checkRedPoint();
            if (boo) {
                App.CommonUtil.addRedDotToBDOC(vipIcon);
            }
            else {
                App.CommonUtil.removeRedDotFromBDOC(vipIcon);
            }
        }
    };
    MainUI.prototype.createMainUIIcon = function (modelName) {
        if (!this._iconNameList[modelName]) {
            var isShow = false;
            if (modelName == "welfare" || modelName == "rechargeVip" || modelName == "firstrecharge"
                || modelName == "monthcard" || modelName == "yearcard" || modelName == "sign2" || modelName == "sign3" || modelName == "sign7" || modelName == "rebate" || modelName == "realname") {
                isShow = true;
            }
            else {
                isShow = Config.IconorderCfg.getisFlickByName(modelName);
            }
            var iconContainer = App.CommonUtil.createMainUIIcon(modelName.toLowerCase() + "_icon", modelName.toLowerCase() + "_icon_name", isShow);
            iconContainer.name = modelName + "_func";
            this._iconNameList[modelName] = iconContainer;
            iconContainer.addTouchTap(function () {
                //引导过程种不响应
                if (Api.rookieVoApi.isGuiding) {
                    return;
                }
                if (modelName == "shareqq") {
                    RSDKHelper.openUrl("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780", null, null);
                    // window.open("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780");
                }
                var viewName = App.StringUtil.firstCharToUper(modelName) + "View";
                var popupViewName = App.StringUtil.firstCharToUper(modelName) + "PopupView";
                if (egret.hasDefinition(viewName) == false && egret.hasDefinition(popupViewName)) {
                    viewName = popupViewName;
                }
                if (modelName == "rechargeVip") {
                    viewName += "|1";
                }
                else if (modelName == "firstrecharge") {
                    viewName = ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
                }
                else if (modelName == "monthcard") {
                    viewName = ViewConst.COMMON.WELFAREVIEWMONTHCARD;
                }
                else if (modelName == "yearcard") {
                    viewName = ViewConst.COMMON.WELFAREVIEWYEARCARD;
                }
                else if (modelName == "candyget") {
                    viewName = ViewConst.POPUP.CANDYGETPOPUPVIEW;
                }
                else if (modelName == "newcharge") {
                    viewName = ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
                }
                else if (modelName == "sign2" || modelName == "sign3" || modelName == "sign7") {
                    viewName = ViewConst.COMMON.WELFAREVIEWSIGNIN;
                }
                else if (modelName == "rebate") {
                    viewName = ViewConst.COMMON.WELFAREVIEWREBATE;
                }
                ViewController.getInstance().openView(viewName);
                // window.open("https://www.baidu.com");
            }, this);
            this._activityIconList.push(iconContainer);
            this._iconContainer.addChild(iconContainer);
            if (Api.switchVoApi.checkClosePay()) {
                iconContainer.visible = false;
            }
            this.sortIcons();
            return iconContainer;
        }
        else {
            return this._iconNameList[modelName];
        }
    };
    MainUI.prototype.removeMainUIIcon = function (modelName) {
        var l = this._activityIconList.length;
        for (var i = l - 1; i >= 0; i--) {
            if (this._activityIconList[i].name && this._activityIconList[i].name.split("_")[0] == modelName) {
                this._activityIconList[i].dispose();
                this._activityIconList.splice(i, 1);
                this.setIconsPos();
                break;
            }
        }
        if (this._iconNameList[modelName]) {
            delete this._iconNameList[modelName];
        }
    };
    MainUI.prototype.setIconsPos = function () {
        if (Api.switchVoApi.checkTWShenhe() == true) {
            return;
        }
        var l = this._activityIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = this._activityIconList[i];
            icon.setPosition(30 + (icon.width + 30) * (i % 6) + icon.width / 2, Math.floor(i / 6) * (icon.height + 10) + icon.height / 2);
        }
    };
    MainUI.prototype.doRefreshTaskInfo = function () {
        if (Api.mainTaskVoApi.getCurMainTaskId() == null) {
            this._taskContainer.visible = true;
            // this._settingAndMailContainer.y = 70;
            var taskid = Api.dailytaskVoApi.getTaskIdForMainTaskUI();
            this._taskTxt.text = LanguageManager.getlocal("dailyTaskName" + taskid);
            var curStatus = Api.dailytaskVoApi.getTaskStatusByTaskId(taskid);
            if (curStatus == 2) {
                this._taskContainer.visible = false;
                this._settingAndMailContainer.y = 70;
                return;
            }
            else if (curStatus == 1) {
                this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
                this._missionIcon.x = 25;
            }
            else {
                this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
                this._missionIcon.x = 35;
                this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
            }
            if (this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")) {
                if (!this._taskContainer.getChildByName("taskeffect")) {
                    var upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_", 8, 100);
                    upgradeClip.x = 5;
                    upgradeClip.y = -221;
                    upgradeClip.name = "taskeffect";
                    // let index = this._missionIcon.
                    this._taskContainer.addChildAt(upgradeClip, 1);
                    upgradeClip.playWithTime(0);
                    if (Number(Api.mainTaskVoApi.getCurMainTaskId()) <= 10) {
                        var clickHand = BaseBitmap.create("studyatk_arrow");
                        clickHand.rotation = 90;
                        clickHand.x = 300;
                        clickHand.y = -225;
                        clickHand.name = "taskeffect2";
                        this._bottomContiner.addChild(clickHand);
                        egret.Tween.get(clickHand, { loop: true })
                            .to({ x: 390, scaleX: 1.0, scaleY: 1.0 }, 500)
                            .to({ x: 300, scaleX: 1.0, scaleY: 1.0 }, 500);
                    }
                }
            }
            else {
                if (this._taskContainer.getChildByName("taskeffect")) {
                    this._taskContainer.removeChild(this._taskContainer.getChildByName("taskeffect"));
                    this._bottomContiner.removeChild(this._bottomContiner.getChildByName("taskeffect2"));
                }
            }
            return;
        }
        this._taskTxt.text = Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[0];
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
            this._missionIcon.x = 25;
        }
        else {
            this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
            this._missionIcon.x = 35;
            // egret.Tween.removeTweens(this._missionIcon);
            this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
        }
        if (this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")) {
            if (!this._taskContainer.getChildByName("taskeffect")) {
                var upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_", 8, 100);
                upgradeClip.x = 5;
                upgradeClip.y = -221;
                upgradeClip.name = "taskeffect";
                this._taskContainer.addChildAt(upgradeClip, 1);
                upgradeClip.playWithTime(0);
                if (Number(Api.mainTaskVoApi.getCurMainTaskId()) <= 10) {
                    var clickHand = BaseBitmap.create("studyatk_arrow");
                    clickHand.rotation = 90;
                    clickHand.x = 300;
                    clickHand.y = -225;
                    clickHand.name = "taskeffect2";
                    this._bottomContiner.addChild(clickHand);
                    egret.Tween.get(clickHand, { loop: true })
                        .to({ x: 350, scaleX: 1.0, scaleY: 1.0 }, 500)
                        .to({ x: 300, scaleX: 1.0, scaleY: 1.0 }, 500);
                }
            }
        }
        else {
            if (this._taskContainer.getChildByName("taskeffect")) {
                this._taskContainer.removeChild(this._taskContainer.getChildByName("taskeffect"));
                this._bottomContiner.removeChild(this._bottomContiner.getChildByName("taskeffect2"));
            }
        }
    };
    MainUI.prototype.doRefreshChat = function () {
        if (!this._chatTxt) {
            return;
        }
        this._chatTxt.text = Api.chatVoApi.getLastMessage();
        var chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (chatTxt.width >= 480) {
            this._chatTxtPoint.visible = true;
        }
        else {
            this._chatTxtPoint.visible = false;
        }
    };
    MainUI.prototype.doQuickAlliance = function () {
        NetManager.chatServerLogout(null, null);
        Api.chatVoApi.refreshLastMessage();
        this.doRefreshChat();
    };
    MainUI.prototype.initButtom = function () {
        this._bottomContiner = new BaseDisplayObjectContainer();
        // this._bottomContiner.alpha = 0;
        //填内容
        this._bottomContiner.setPosition(0, GameConfig.stageHeigth - this._bottomContiner.height);
        this.addChild(this._bottomContiner);
        var bottomBg = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg"));
        bottomBg.x = 0;
        bottomBg.y = -bottomBg.height;
        this._bottomContiner.addChild(bottomBg);
        // let goOutBtn =  ComponentManager.getButton("mainui_btn3",null,this.goOutBtnClickHandler,this,null,1) //BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
        var goOutBtn = BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
        goOutBtn.addTouchTap(this.goOutBtnClickHandler, this);
        goOutBtn.anchorOffsetY = goOutBtn.height / 2;
        goOutBtn.anchorOffsetX = goOutBtn.width / 2;
        goOutBtn.x = 10 + goOutBtn.width / 2;
        goOutBtn.y = bottomBg.y + bottomBg.height / 2 - 2;
        this._bottomContiner.addChild(goOutBtn);
        this._goOutBtn = goOutBtn;
        egret.Tween.get(goOutBtn, {
            loop: true,
        }).to({ scaleX: 0.9, scaleY: 0.9 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var PerWidth = 95;
        var curIdx = 0;
        for (var i = 0; i < this.bottomBtnCfg.length; i++) {
            var btncfg = this.bottomBtnCfg[i];
            if (btncfg.isOPen) {
                var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this.bottomBtnClickHandler, this, [btncfg]);
                imgBtn.x = 168 + PerWidth * curIdx;
                imgBtn.y = -imgBtn.height - 15;
                imgBtn.name = btncfg.btnName;
                this._bottomContiner.addChild(imgBtn);
                curIdx += 1;
            }
        }
        this.checkAchPoint();
        this.checkAllRedPoint();
        //聊天按钮相关
        var chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        chatbg.x = 0;
        chatbg.y = bottomBg.y - chatbg.height - 3;
        this._bottomContiner.addChild(chatbg);
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(this.chatBgClickHandler, this);
        var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 10;
        chatIcon.y = chatbg.y + chatbg.height / 2;
        this._bottomContiner.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastMessage();
        if (!showStr) {
            showStr = "1";
        }
        this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxt.x = chatIcon.x + 20;
        this._chatTxt.y = chatIcon.y - this._chatTxt.height / 2;
        this._chatTxt.width = 480;
        this._chatTxt.height = 50;
        this._chatTxt.lineSpacing = 50;
        this._bottomContiner.addChild(this._chatTxt);
        this._chatTxtPoint = ComponentManager.getTextField("...", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxtPoint.x = 522;
        this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height / 2 - 5;
        this._chatTxtPoint.visible = false;
        // this._chatTxtPoint.width = 450;
        // this._chatTxtPoint.height = 20;
        this._bottomContiner.addChild(this._chatTxtPoint);
        this.doRefreshChat();
        this._taskContainer = new BaseDisplayObjectContainer();
        this._taskContainer.x = 0;
        this._taskContainer.y = 0;
        this._bottomContiner.addChild(this._taskContainer);
        if (!Api.switchVoApi.checkClosePay()) {
            //功能预览
            var functionPreviewBg = BaseBitmap.create("mainui_functionpreview");
            functionPreviewBg.name = "functionPreviewBg";
            functionPreviewBg.x = 5;
            functionPreviewBg.y = chatbg.y - chatbg.height - functionPreviewBg.height - 50;
            this._bottomContiner.addChild(functionPreviewBg);
            this._functionPreviewBg = functionPreviewBg;
            functionPreviewBg.addTouchTap(this.functionClickHandler, this);
            var functionIcon = BaseBitmap.create("mainui_funicon");
            functionIcon.x = 18;
            functionIcon.y = functionPreviewBg.y + 5;
            this._bottomContiner.addChild(functionIcon);
            this._functionIcon = functionIcon;
            var str = Api.otherInfoVoApi.getFunctionName();
            //功能名字
            var _functionTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            _functionTxt.x = functionPreviewBg.x + 75;
            _functionTxt.y = functionPreviewBg.y + 15;
            _functionTxt.text = str;
            this._functionTxt = _functionTxt;
            this._bottomContiner.addChild(_functionTxt);
            this.refreshText();
        }
        //task 
        var taskBg = BaseBitmap.create("mainui_taskbg170");
        taskBg.name = "taskBg";
        taskBg.x = 5;
        taskBg.y = chatbg.y - chatbg.height - taskBg.height + 30;
        this._taskContainer.addChild(taskBg);
        taskBg.addTouchTap(this.missionBtnClickHandler, this);
        var missionIcon = BaseBitmap.create("mainui_missionIcon1");
        missionIcon.anchorOffsetX = missionIcon.width / 2;
        missionIcon.anchorOffsetY = missionIcon.height / 2;
        missionIcon.x = taskBg.x + 15 + missionIcon.width / 2;
        missionIcon.y = taskBg.y + taskBg.height / 2;
        this._taskContainer.addChild(missionIcon);
        this._missionIcon = missionIcon;
        egret.Tween.get(this._missionIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 700).to({ scaleX: 1, scaleY: 1.0 }, 700); //设置2000毫秒内 rotation 属性变为360
        this._taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._taskTxt.x = missionIcon.x + 45;
        this._taskTxt.y = missionIcon.y - 10;
        this._taskContainer.addChild(this._taskTxt);
        //邮件设置
        this._settingAndMailContainer = new BaseDisplayObjectContainer();
        this._settingAndMailContainer.x = 0;
        this._settingAndMailContainer.y = 0;
        this._bottomContiner.addChild(this._settingAndMailContainer);
        var settingButton = ComponentManager.getButton("mainui_bottomimg8", "", this.settingBtnClickHandler, this);
        settingButton.x = taskBg.x + 10;
        settingButton.y = taskBg.y - 25 - settingButton.height;
        this._settingAndMailContainer.addChild(settingButton);
        // settingButton.visible=false;
        var settingBg = BaseBitmap.create("mainui_bottombtnbg");
        settingBg.x = settingButton.x + settingButton.width / 2 - settingBg.width / 2;
        settingBg.y = settingButton.y;
        this._settingAndMailContainer.addChildAt(settingBg, 0);
        // settingBg.visible=false;
        var mailButton = ComponentManager.getButton("mainui_bottomimg12", "", this.mailBtnClickHandler, this);
        mailButton.x = settingButton.x;
        mailButton.y = settingButton.y - settingButton.height - 20;
        this._settingAndMailContainer.addChild(mailButton);
        this._mailButton = mailButton;
        var mailBg = BaseBitmap.create("mainui_bottombtnbg");
        mailBg.x = settingBg.x;
        mailBg.y = mailButton.y;
        this._settingAndMailContainer.addChildAt(mailBg, 0);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL, this.checkMailState, this);
        this.doRefreshTaskInfo();
        this.refreshTaskContainerStatus();
    };
    MainUI.prototype.checkIsRefresh = function () {
        if (Api.otherInfoVoApi.getFunctionRedhot()) {
            this.refreshText();
        }
    };
    MainUI.prototype.refreshText = function () {
        if (this._functionTxt) {
            if (Api.otherInfoVoApi.getFunctionName() == null) {
                this._bottomContiner.removeChild(this._functionPreviewBg);
                this._bottomContiner.removeChild(this._functionTxt);
                this._bottomContiner.removeChild(this._functionIcon);
                if (this._functionAni) {
                    this._bottomContiner.removeChild(this._functionAni);
                    this._functionAni = null;
                }
            }
            else {
                this._functionTxt.text = Api.otherInfoVoApi.getFunctionName();
                if (Api.otherInfoVoApi.getFunctionRedhot()) {
                    this._functionTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
                }
                else {
                    this._functionTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                if (Api.otherInfoVoApi.getFunctionRedhot()) {
                    if (!this._functionAni) {
                        this._functionAni = ComponentManager.getCustomMovieClip("taskeffect_", 8, 100);
                        this._functionAni.x = 5;
                        this._functionAni.y = -303;
                        this._functionAni.name = "taskeffect";
                        this._bottomContiner.addChild(this._functionAni);
                        this._functionAni.playWithTime(0);
                        if (!this._isAtHome) {
                            this._functionAni.visible = false;
                        }
                    }
                }
                else {
                    if (this._functionAni) {
                        this._bottomContiner.removeChild(this._functionAni);
                        this._functionAni = null;
                    }
                }
            }
            var welfareIcon = this.getTopBtnByName("welfare");
            if (welfareIcon) {
                var firstRechargeflag = Api.shopVoApi.getPayFlag();
                var signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
                var functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
                if (firstRechargeflag == 1 || signinShowRedDot == true || functionPreViewRedDot == true) {
                    App.CommonUtil.addRedDotToBDOC(welfareIcon);
                }
                else {
                    App.CommonUtil.removeRedDotFromBDOC(welfareIcon);
                }
            }
        }
    };
    MainUI.prototype.refreshTaskContainerStatus = function () {
        if (this._isAtHome) {
            this._iconContainer.visible = true;
            this._settingAndMailContainer.visible = false;
            if (Api.switchVoApi.checkTWShenhe() == true) {
                // this._iconContainer.visible = false;
                for (var k in this._activityIconList) {
                    var v = this._activityIconList[k];
                    if (v.name == "welfare_func") {
                        v.setPosition(30 + v.width / 2, v.height / 2);
                    }
                    else {
                        v.visible = false;
                    }
                }
            }
            // this._taskContainer.visible = true;
        }
        else {
            this._iconContainer.visible = false;
            this._settingAndMailContainer.visible = true;
            // this._taskContainer.visible = false;
        }
    };
    MainUI.prototype.roleHeadClickHandler = function () {
        PlayerBottomUI.getInstance().show();
        // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
    };
    MainUI.prototype.functionClickHandler = function () {
        if (Api.rookieVoApi.isInGuiding) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWFUNCTIONPREVIEW);
    };
    MainUI.prototype.mailBtnClickHandler = function () {
        // NetManager.request(NetRequestConst.REQUEST_MAIL_GET_MYMAILLIST,null);
        ViewController.getInstance().openView(ViewConst.POPUP.MAILPOPUPVIEW);
    };
    MainUI.prototype.settingBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SettingPopopView, {});
    };
    MainUI.prototype.missionBtnClickHandler = function () {
        /**
         * 跳转每日任务
         */
        if (Api.mainTaskVoApi.getCurMainTaskId() == null) {
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
    };
    MainUI.prototype.chatBgClickHandler = function () {
        if (Api.rookieVoApi.isInGuiding) {
            return;
        }
        // App.LogUtil.log("chatBgClickHandler >>>>> ");
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
    };
    MainUI.prototype.addGoldBtnClickHandler = function () {
    };
    MainUI.prototype.doDinnerGuide = function () {
        if (this._isAtHome) {
            this.goOutBtnClickHandler();
        }
    };
    MainUI.prototype.goOutBtnClickHandler = function () {
        this._isAtHome = !this._isAtHome; //修改状态
        if (this._isAtHome) {
            this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
            if (this._functionPreviewBg) {
                this._functionPreviewBg.visible = true;
                this._functionTxt.visible = true;
                this._functionIcon.visible = true;
                if (this._functionAni) {
                    this._functionAni.visible = true;
                }
            }
        }
        else {
            if (this._functionPreviewBg) {
                this._functionPreviewBg.visible = false;
                this._functionTxt.visible = false;
                this._functionIcon.visible = false;
                if (this._functionAni) {
                    this._functionAni.visible = false;
                }
            }
            this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3_1");
        }
        this.refreshTaskContainerStatus();
        SceneController.getInstance().jump();
        Api.rookieVoApi.checkNextStep();
    };
    MainUI.prototype.bottomBtnClickHandler = function (param) {
        // let isOPen= param.isOPen;
        // if(!isOPen)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
        // 	return;
        // }
        var btnName = param.btnName;
        switch (btnName) {
            case "servant":
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
                // ViewController.getInstance().openView(ViewConst.POPUP.SETPASSWORDPOPUPVIEW);
                break;
            case "item":
                ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB1);
                //测试获得门客或者红颜出对话框功能
                // ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1036","1036"]);
                // ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:["306","306"]});
                break;
            case "dailytask":
                ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
                break;
            case "achieve":
                // App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                ViewController.getInstance().openView(ViewConst.COMMON.ACHIEVEMENTVIEW);
                // ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW);
                // ViewController.getInstance().openView(ViewConst.POPUP.CANDYGETPOPUPVIEW);
                //成就功能有了。用其他按钮吧 ~
                break;
            case "shop":
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                // Api.rookieVoApi.isInGuiding = true;
                // ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"111",f:null,o:this});
                break;
            case "welfare":
                App.LogUtil.log("welfareCkick >>>> ");
                break;
            case "challenge":
                ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
                break;
            case "manage":
                ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
                break;
            default:
                break;
        }
    };
    MainUI.prototype.getResourceList = function () {
        return ["mainui_btn1", "mainui_fg",
            "mainui_taskbg170",
            "mainui_bottombg", "mainui_missionIcon1", "mainui_missionIcon2",
            "mainui_bottomimg1",
            "mainui_bottomimg2",
            "mainui_bottomimg3",
            "mainui_bottomimg4",
            "mainui_bottomimg5",
            "mainui_bottomimg8",
            "mainui_bottomimg12",
            "mainui_bottombtnbg",
            "mainui_chatbg",
            "mainui_chatIcon",
            "mainui_image26",
            "mainui_btn3",
            "mainui_avatarFlower",
            "mainui_headbg",
            "mainui_btn3_1",
            "mainui_iconani",
            "mainui_functionpreview",
            "mainui_funicon",
            "taskeffect",
            "studyatk_arrow",
        ];
    };
    MainUI.prototype.getParent = function () {
        return LayerManager.uiLayer;
    };
    /**
     * 根据名称获取按钮
     * @param name
     */
    MainUI.prototype.getTopBtnByName = function (name) {
        var l = this._activityIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = this._activityIconList[i];
            if (icon && icon.name && icon.name.split("_")[0] == name) {
                return icon;
            }
        }
        return null;
    };
    MainUI.prototype.checkFirstRechargeIcon = function () {
        if (Api.shopVoApi.getPayFlag() == 2) {
            this.removeMainUIIcon("firstrecharge");
        }
        else {
            var icon = this.createMainUIIcon("firstrecharge");
            if (Api.shopVoApi.getPayFlag() == 1) {
                App.CommonUtil.addRedDotToBDOC(icon);
            }
            else {
                App.CommonUtil.removeRedDotFromBDOC(icon);
            }
        }
    };
    /**
     * 检测福利红点
     */
    MainUI.prototype.checkWelfareState = function () {
        var welfareIcon = this.getTopBtnByName("welfare");
        if (welfareIcon) {
            var firstRechargeflag = Api.shopVoApi.getPayFlag();
            var signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
            var functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
            if (firstRechargeflag == 1 || signinShowRedDot == true || functionPreViewRedDot == true) {
                App.CommonUtil.addRedDotToBDOC(welfareIcon);
            }
            else {
                App.CommonUtil.removeRedDotFromBDOC(welfareIcon);
            }
        }
        this.checkFirstRechargeIcon();
        this.checkCardIcon();
        this.initCardIcons();
        this.checkSignState();
    };
    MainUI.prototype.checkSignState = function () {
        this.initSignIcons();
    };
    /**
     * 检查活动icon红点
     */
    MainUI.prototype.checkActivityIconState = function () {
        var l = this._activityIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = this._activityIconList[i];
            if (icon.name && icon.name.split("_")[1] == "func") {
                continue;
            }
            if (icon && icon.name != "welfare") {
                var name_2 = icon.name;
                var aid = "";
                var code = "";
                aid = name_2.split("-")[0];
                code = name_2.split("-")[1];
                var isShowRedDot = void 0;
                var aidArr = Config.IconorderCfg.getAidListByCfgName(aid);
                if (aidArr && aidArr.length > 0) {
                    var needCheckId = aidArr;
                    for (var ii = 0; ii < needCheckId.length; ii++) {
                        if (!isShowRedDot) {
                            isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii], null);
                        }
                    }
                }
                else {
                    isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid, code);
                }
                // if(aid=="carnival")
                // {
                // 	let needCheckId:string[]=["carnivalCharge","carnivalCost"];
                // 	for(let ii:number=0;ii<needCheckId.length;ii++)
                // 	{
                // 		if(!isShowRedDot)
                // 		{
                // 			isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii],null);
                // 		}
                // 	}
                // }
                // else
                // {
                // 	isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
                // }
                if (isShowRedDot == true) {
                    App.CommonUtil.addRedDotToBDOC(icon);
                }
                else {
                    App.CommonUtil.removeRedDotFromBDOC(icon);
                }
            }
        }
    };
    /**
     * 检测邮件红点
     */
    MainUI.prototype.checkMailState = function () {
        if (Api.mailVoApi.getUnreadNum() > 0) {
            // if(this._mailButton)
            // {
            // 	this._mailButton.showStatusIcon("public_dot2");
            // }
            // if(this._mailRedDotSp == null && this._mailButton)
            // {
            // 	this._mailRedDotSp = BaseBitmap.create("public_dot2");
            // 	this._mailRedDotSp.x = this._mailButton.x + this._mailButton.width - this._mailRedDotSp.width + 5;
            // 	this._mailRedDotSp.y = this._mailButton.y - 3;
            // 	this._settingAndMailContainer.addChild(this._mailRedDotSp);
            // }
            // else
            // {
            // 	if(this._mailRedDotSp)
            // 	{
            // 		this._mailRedDotSp.visible = true;
            // 	}
            // }
            App.CommonUtil.addRedDotToBDOC(this._mailButton);
        }
        else {
            // if(this._mailButton)
            // {
            // 	this._mailButton.removeStatusIcon();
            // }
            // if(this._mailRedDotSp)
            // {
            // 	this._mailRedDotSp.visible = false;
            // }
            App.CommonUtil.removeRedDotFromBDOC(this._mailButton);
        }
    };
    MainUI.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.doRefreshTaskInfo, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT, this.checkAchPoint, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doRefreshTaskInfo, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC, this.doRefreshTaskInfo, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, this.doQuickAlliance, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, this.initIconsAndCheckStatus, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL, this.checkMailState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkWelfareState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkWelfareState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkActivityIconState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.checkRedPointByModel, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.checkWanBaIcon, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE, this.doDinnerGuide, this);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD), this.refreshText, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.checkWelfareState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT, this.checkIsRefresh, this);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.checkIsRefresh, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.initCoverIcon, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.initBindIcon, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REALNAME, this.createRealnameRedHot, this);
        TickManager.removeTick(this.tick, this);
        //添加需要释放的内容
        this._topContiner = null;
        this._bottomContiner = null;
        this._settingAndMailContainer = null;
        this._goOutBtn = null;
        this._mailButton = null;
        this._settingButton = null;
        this._taskContainer = null;
        this._isAtHome = false;
        this._chatTxt = null;
        this._taskTxt = null;
        this._lampRoll = null;
        this._mailRedDotSp = null;
        this._achRedDotSp = null;
        this._activityIconList.length = 0;
        this._iconNameList = {};
        this._functionPreviewBg = null;
        this._signName = null;
        this._functionIcon = null;
        this._functionAni = null;
        this._lastL = 0;
        _super.prototype.dispose.call(this);
    };
    MainUI.getInstance = function () {
        if (!MainUI._instance) {
            MainUI._instance = new MainUI();
        }
        return MainUI._instance;
    };
    return MainUI;
}(BaseLoadDisplayObjectContiner));
__reflect(MainUI.prototype, "MainUI");

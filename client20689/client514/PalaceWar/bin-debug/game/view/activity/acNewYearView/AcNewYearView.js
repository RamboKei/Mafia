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
 * 春节活动
 */
var AcNewYearView = (function (_super) {
    __extends(AcNewYearView, _super);
    function AcNewYearView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._activityDesText = null;
        _this._chineseknot = null;
        _this.lastType = 0;
        _this._topBg = null;
        _this._topBg2 = null;
        _this.curr_acNewYearVo = null;
        _this.public_dot1 = null;
        return _this;
    }
    AcNewYearView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        AcNewYearView.AID = this.aid;
        AcNewYearView.CODE = this.code;
        var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid);
        this.curr_acNewYearVo = curr_acNewYearVo;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var topBg = BaseBitmap.create("acnewyear_topbg_" + this.code);
        topBg.width = GameConfig.stageWidth + 18;
        topBg.y = -286;
        this.addChild(topBg);
        this._nodeContainer.addChild(topBg);
        this._topBg = topBg;
        var topBg2 = BaseBitmap.create("acnewyear_topbg2_" + this.code);
        topBg2.width = GameConfig.stageWidth + 18;
        topBg2.y = -286;
        this._nodeContainer.addChild(topBg2);
        this._topBg2 = topBg2;
        this._topBg2.visible = false;
        AcNewYearView.topBgHeight = GameConfig.stageHeigth - topBg.height - topBg.y - this.container.y + 5;
        //最底部背景
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth + 16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y - this.container.y + 9;
        bottomBg.x = -8;
        bottomBg.y = topBg.height + topBg.y - 4;
        this._nodeContainer.addChild(bottomBg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._activityTimerText.x = 80;
        this._activityTimerText.y = -142;
        this._activityTimerText.text = curr_acNewYearVo.acTimeAndHour;
        this.addChildToContainer(this._activityTimerText);
        //攀升描述   
        this._activityDesText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityDesText.x = 80;
        this._activityDesText.y = -102;
        this._activityDesText.text = LanguageManager.getlocal("newayearactivityDes_" + this.code);
        this.addChildToContainer(this._activityDesText);
        //中国结
        var chineseknot = BaseBitmap.create("acnewyear_chineseknot2_" + this.code);
        chineseknot.x = 280;
        chineseknot.y = -118;
        this._chineseknot = chineseknot;
        this._nodeContainer.addChild(chineseknot);
        var tabName = [];
        var tabY = bottomBg.y + 24;
        var tabX = 15;
        this.public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(this.public_dot1);
        this.public_dot1.x = 295;
        this.public_dot1.y = this.tabbarGroup.y;
        this.public_dot1.visible = this.curr_acNewYearVo.isShowRedDot;
    };
    AcNewYearView.prototype.isShowRedhot = function () {
        if (AcNewYearViewTab2.isStarBoo == true) {
            this.public_dot1.visible = this.curr_acNewYearVo.isShowRedDot;
        }
        else {
            this.public_dot1.visible = false;
        }
    };
    AcNewYearView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        this.acEnd();
        if (data.index == 1) {
            this._topBg2.visible = true;
            this._topBg.visible = true;
            this._activityTimerText.visible = false;
            this._chineseknot.visible = false;
            this._activityDesText.visible = false;
        }
        else {
            this._topBg2.visible = false;
            this._topBg.visible = true;
            this._activityTimerText.visible = true;
            this._chineseknot.visible = true;
            this._activityDesText.visible = true;
        }
    };
    AcNewYearView.prototype.acEnd = function () {
        if (this.curr_acNewYearVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    AcNewYearView.prototype.getTabbarTextArr = function () {
        return ["acNewYearViewTab1",
            "acNewYearViewTab2_" + this.code,
        ];
    };
    AcNewYearView.prototype.getTabbarGroupY = function () {
        return 235;
    };
    AcNewYearView.prototype.goToRechargeHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcNewYearView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acnewyear_big_package",
            "acnewyear_bottom",
            "acnewyear_bottom2",
            "acnewyear_bottom3",
            "acnewyear_chineseknot_1",
            "acnewyear_chineseknot_2",
            "acnewyear_box",
            "acnewyear_chineseknot2_1",
            "acnewyear_chineseknot2_2",
            "acnewyear_look",
            "acnewyear_small_package",
            "acnewyear_topbg_1",
            "acnewyear_topbg2_1",
            "acnewyear_topbg_2",
            "acnewyear_topbg2_2",
            "progress3",
            "progress3_bg",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
        ]);
    };
    AcNewYearView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        this._nodeContainer = null;
        AcVipShopView.AID = null;
        AcVipShopView.CODE = null;
        this.lastType = 0;
        this._activityTimerText = null;
        this._activityDesText = null;
        this._chineseknot = null;
        this._topBg = null;
        this._topBg2 = null;
        AcNewYearView.topBgHeight = 0;
        _super.prototype.dispose.call(this);
    };
    AcNewYearView.AID = null;
    AcNewYearView.CODE = null;
    AcNewYearView.topBgHeight = 0;
    return AcNewYearView;
}(AcCommonView));
__reflect(AcNewYearView.prototype, "AcNewYearView");

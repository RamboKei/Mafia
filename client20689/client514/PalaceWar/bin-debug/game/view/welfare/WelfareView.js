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
 * 福利
 * author dmj
 * date 2017/11/02
 * @class WelfareView
 */
var WelfareView = (function (_super) {
    __extends(WelfareView, _super);
    function WelfareView() {
        var _this = _super.call(this) || this;
        /**
         * 福利中心显示功能配置
         * 配置规则：WelfareView后面的文件名，例如：WelfareViewFirstRecharge.ts   就配置FristRecharge
         */ //	"OfficialWeChat"
        _this._functionConfig = [
            "RechargeBox",
            "Signin",
            "FirstRecharge",
            "MonthCard",
            "YearCard",
            "GodBless",
            "Binding",
            "OfficialWeChat",
            "Realname",
            "FunctionPreview",
            "Qgroup",
            "Rebate",
        ];
        // tab按钮的资源数组
        _this._tabbarList = [];
        //左侧背景
        _this._leftBg = null;
        _this._tabbarTextList = [];
        _this._lastFirstRechargeflag = null;
        _this._lastSigninShowRedDot = null;
        return _this;
    }
    WelfareView.prototype.show = function (data) {
        this._functionConfig = Api.arrivalVoApi.getFunctionCfgList();
        // if (Api.switchVoApi.checkTWShenhe()) {
        // 	for(var i=0;i<this._functionConfig.length;i++)
        // 	{
        // 		if (this._functionConfig[i]=="YearCard")
        // 		{
        // 			this._functionConfig.splice(i,1);
        // 		}
        // 	}	
        // }
        //审核服下益玩大平台特殊处理
        if (PlatformManager.checkIsShenHeYiWan()) {
            var delete_arr = ['YearCard', 'MonthCard'];
            for (var _i = 0, delete_arr_1 = delete_arr; _i < delete_arr_1.length; _i++) {
                var str = delete_arr_1[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        if (data && data.tab) {
            this.selectedTabIndex = this._functionConfig.indexOf(data.tab);
        }
        for (var i = 0; i < this._functionConfig.length; i++) {
            var preName = this._functionConfig[i].toLowerCase();
            this._tabbarList.push(preName + "_btn");
            this._tabbarTextList.push("");
        }
        this.tabViewData = {};
        _super.prototype.show.call(this, data);
    };
    WelfareView.prototype.initView = function () {
        // if (Api.switchVoApi.checkTWShenhe()) {
        // 	for(var i=0;i<this._functionConfig.length;i++)
        // 	{
        // 		if (this._functionConfig[i]=="YearCard")
        // 		{
        // 			this._functionConfig.splice(i,1);
        // 		}
        // 	}	
        // }
        //审核服下益玩大平台特殊处理
        if (PlatformManager.checkIsShenHeYiWan()) {
            var delete_arr = ['YearCard', 'MonthCard'];
            for (var _i = 0, delete_arr_2 = delete_arr; _i < delete_arr_2.length; _i++) {
                var str = delete_arr_2[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        var leftBg = BaseBitmap.create("common_left_bg");
        leftBg.x = 0;
        leftBg.y = 0;
        leftBg.height = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(leftBg);
        this._leftBg = leftBg;
    };
    WelfareView.prototype.hideAndShowYearCard = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
    };
    WelfareView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + this._functionConfig[this.selectedTabIndex]);
        if (tabveiwClass) {
            if (this.tabViewData[this.selectedTabIndex]) {
                this.addChildToContainer(this.tabViewData[this.selectedTabIndex]);
            }
            else {
                // let bg:BaseBitmap = BaseBitmap.create("welfare_9_bg");
                // bg.setPosition(149,0);
                // this.addChildToContainer(bg);
                var tabView = new tabveiwClass();
                tabView.show();
                tabView.setPosition(149, 0);
                this.tabViewData[this.selectedTabIndex] = tabView;
                this.addChildToContainer(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChildFromContainer(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    WelfareView.prototype.initTabbarGroup = function () {
        // super.initTabbarGroup();
        var tabContainer = new BaseDisplayObjectContainer();
        var scrollH = GameConfig.stageHeigth - this.container.y + 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(tabContainer, rect);
        scrollView.y = 90;
        scrollView.bounces = false;
        this.addChild(scrollView);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            tabContainer.addChild(this.tabbarGroup);
            // this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
        this.tabbarGroup.setAligh(TabBarGroup.ALIGN_VERTICAL);
        this.tabbarGroup.x = 0;
        this.tabbarGroup.y = 0;
        this.container.y = 89;
        this.tabbarGroup.setSpace(6);
        this.tabbarGroup.addLine("welfare_line");
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        this.checkTabbarGroupState();
        this.refreshFunctionRed();
    };
    WelfareView.prototype.checkTabbarGroupState = function () {
        var firstRechargeflag = Api.shopVoApi.getPayFlag();
        var firstIndex = this._functionConfig.indexOf("FirstRecharge");
        if (this._lastFirstRechargeflag == null || this._lastFirstRechargeflag != firstRechargeflag) {
            this._lastFirstRechargeflag = firstRechargeflag;
            if (firstRechargeflag == 1) {
                this.tabbarGroup.showStatusIcon(firstIndex, "public_dot2");
            }
            else {
                this.tabbarGroup.removeStatusIcon(firstIndex);
            }
        }
        var signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
        var signinIndex = this._functionConfig.indexOf("Signin");
        if (this._lastSigninShowRedDot == null || this._lastSigninShowRedDot != signinShowRedDot) {
            this._lastSigninShowRedDot = signinShowRedDot;
            if (signinShowRedDot == true) {
                this.tabbarGroup.showStatusIcon(signinIndex, "public_dot2");
            }
            else {
                this.tabbarGroup.removeStatusIcon(signinIndex);
            }
        }
        //实名认证红点 
        var realnameIndex = this._functionConfig.indexOf("Realname");
        if (Api.otherInfoVoApi.checkrealnamerewards() && PlatformManager.client.checkPerson()) {
            this.tabbarGroup.showStatusIcon(realnameIndex, "public_dot2");
        }
        else {
            this.tabbarGroup.removeStatusIcon(realnameIndex);
        }
    };
    WelfareView.prototype.refreshFunctionRed = function () {
        //功能预览红点
        var functionIndex = this._functionConfig.indexOf("FunctionPreview");
        if (Api.otherInfoVoApi.getFunctionRedhot() == true) {
            this.tabbarGroup.showStatusIcon(functionIndex, "public_dot2");
        }
        else {
            this.tabbarGroup.removeStatusIcon(functionIndex);
        }
    };
    WelfareView.prototype.getTabbarTextArr = function () {
        return this._tabbarTextList;
    };
    WelfareView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(this._tabbarList).concat([
            "firstrecharge_bottom", "firstrecharge2_bg", "firstrecharge_font", "firstrechargemask_bg",
            "common_9_bg", "common_left_bg", "welfare_line",
            "signin_had_get", "welfare_hasbuy", "itemeffect", "monthcard_bigicon", "yearcard_bigicon",
            "godbless_bookRoom", "godbless_child", "godbless_manage", "godbless_rank", "godbless_servantLv", "godbless_wife",
            "signin2_bg", "signin3_bg", "rechargebox_bg1", "rechargebox_bg2", "rechargebox_bg", "dinner_gems_1", "unlock_challenge_skip",
            "unlock_practice", "yearcard_desc3",
        ]);
    };
    WelfareView.prototype.getTabbarName = function () {
        return this._tabbarList;
    };
    WelfareView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WelfareView.prototype.tick = function () {
        if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
            this.getSelectedTab()["tick"].call(this.getSelectedTab());
        }
    };
    WelfareView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        if (this.tabViewData) {
            for (var key in this.tabViewData) {
                var view = this.tabViewData[key];
                if (view) {
                    if (this.container.contains(view)) {
                        this.removeChildFromContainer(view);
                    }
                    view.dispose();
                    view = null;
                }
            }
            this.tabViewData = null;
        }
        this._tabbarList = [];
        this._leftBg = null;
        this._tabbarTextList = [];
        this._lastFirstRechargeflag = null;
        this._lastSigninShowRedDot = null;
        if (this.tabbarGroup) {
            this.tabbarGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return WelfareView;
}(CommonView));
__reflect(WelfareView.prototype, "WelfareView");

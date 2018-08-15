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
 * 排名
 * author dky
 * date 2017/11/28
 * @class AllianceRankPopupView
 */
var AllianceRankPopupView = (function (_super) {
    __extends(AllianceRankPopupView, _super);
    // private _punishRewardList: any = {};
    function AllianceRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._rank = 0;
        _this._index = 0;
        return _this;
    }
    AllianceRankPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, this.doApply, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, this.doCancel, this);
        // this._rankData = this.param.data.acData;
        this._allianceVo = Api.allianceVoApi.getAllianceVo();
        var tabName = ["allianceRankTab1"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 35;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 555;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 60;
        this.addChildToContainer(bg1);
        var bg3 = BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);
        var allianceVo;
        var allianceStr = "";
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            allianceStr = LanguageManager.getlocal("allianceRankMyAlliance", [LanguageManager.getlocal("allianceRankNoAlliance")]);
        }
        else {
            allianceStr = LanguageManager.getlocal("allianceRankMyAlliance", [Api.playerVoApi.getPlayerAllianceName()]);
        }
        var allianceTxt = ComponentManager.getTextField(allianceStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        allianceTxt.x = bg3.x + 50;
        allianceTxt.y = bg3.y + bg3.height / 2 - allianceTxt.height / 2;
        this.addChildToContainer(allianceTxt);
        var rankeStr = "";
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank", [LanguageManager.getlocal("allianceRankNoRank")]);
        }
        else {
            rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank", [this._rank.toString()]);
        }
        var rankTxt = ComponentManager.getTextField(rankeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTxt.x = bg3.x + 330;
        rankTxt.y = bg3.y + bg3.height / 2 - rankTxt.height / 2;
        this.addChildToContainer(rankTxt);
        var dataList = this._rankData;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 10, bg1.height - 27);
        this._scrollList = ComponentManager.getScrollList(AllianceRankScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.x = bg1.x + 5;
        this._scrollList.y = bg1.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceRankNoAlliance"));
    };
    /**
     * 获取活动配置
     */
    AllianceRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST, requestData: {} };
    };
    //请求回调
    AllianceRankPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (data.data.data.allianceFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (data.data.data.allianceFlag == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
            return;
        }
        if (data.data.data.allianceFlag == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST) {
            this._rankData = data.data.data.alliancelist;
            this._rank = data.data.data.arank;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE) {
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTipSuccess"));
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY) {
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceCancelApplyTip"));
        }
    };
    AllianceRankPopupView.prototype.doApply = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE, { aid: event.data.aid });
    };
    AllianceRankPopupView.prototype.doCancel = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY, { aid: event.data.aid });
    };
    AllianceRankPopupView.prototype.rankBtnClick = function () {
    };
    AllianceRankPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AllianceRankPopupView.prototype.refreshRankList = function () {
    };
    AllianceRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AllianceRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinnerrankpopupview", "dinner_line", "dinner_rank_titlebg",
        ]);
    };
    AllianceRankPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, this.doApply, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, this.doCancel, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._allianceVo = null;
        this._index = null;
        this._rank = 0;
        this._curTabIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceRankPopupView;
}(PopupView));
__reflect(AllianceRankPopupView.prototype, "AllianceRankPopupView");

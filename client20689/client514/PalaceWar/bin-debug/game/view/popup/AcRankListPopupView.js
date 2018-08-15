/**
 * 冲榜排行
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListPopupView
 */
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
var AcRankListPopupView = (function (_super) {
    __extends(AcRankListPopupView, _super);
    function AcRankListPopupView() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._acRankInfoVo = null;
        _this._allirank = null;
        return _this;
    }
    AcRankListPopupView.prototype.initView = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, String(this._code));
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 700 - 5;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        this._nodeContainer.addChild(bg1);
        var titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
        if (rankcfg.type == 12 || rankcfg.type == 13 || rankcfg.type == 14) {
            titleTxt2Str = LanguageManager.getlocal("acRankPop_titleAlliance");
            var deltaH = 30;
            bg1.height -= deltaH;
            startY += deltaH;
            var tabName = ["acRankListTab1", "acRankListTab2"];
            var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
            tabbarGroup.setSpace(2);
            tabbarGroup.x = 30;
            tabbarGroup.y = 9;
            this._nodeContainer.addChild(tabbarGroup);
        }
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(titleTxt2Str, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.name = "titleTxt2";
        titleTxt2.x = bg2.x + 175;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        var titleStr3;
        titleStr3 = LanguageManager.getlocal("acRankPop_title3_" + rankcfg.type);
        if (rankcfg.type == 13 || rankcfg.type == 14) {
            titleStr3 = LanguageManager.getlocal("acRankPop_title3_" + rankcfg.type);
        }
        var titleTxt3 = ComponentManager.getTextField(titleStr3, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 430 - titleTxt3.width / 2;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        titleTxt3.name = "titleTxt3";
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);
        var nickTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickTxt.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        nickTxt.x = bg3.x + 20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        if (rankcfg.type == 11 || rankcfg.type == 12) {
            var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            if (rankcfg.type == 11) {
                tipTxt.text = LanguageManager.getlocal("acRankActive19", [rankcfg.rankLimit]);
            }
            else {
                tipTxt.text = LanguageManager.getlocal("acRankList_allianceTip");
            }
            tipTxt.x = bg3.x + 220;
            tipTxt.y = bg3.y + 20;
            this._nodeContainer.addChild(tipTxt);
        }
        var rankV = "10000+";
        var addV = 0;
        if (this._acRankInfoVo.myrank.myrank) {
            rankV = String(this._acRankInfoVo.myrank.myrank);
            addV = this._acRankInfoVo.myrank.value;
        }
        var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y + 40;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);
        var addStr = "";
        var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV", [titleStr3, String(addV)]);
        addvalueTxt.x = myRankTxt.x + 240;
        addvalueTxt.y = myRankTxt.y;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, bg1.height - 60);
        var dataList = this._acRankInfoVo.rankList;
        var scrollView = ComponentManager.getScrollList(AcRankListScrollItem, dataList, rect);
        scrollView.y = bg2.y + 50;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollView = scrollView;
    };
    /**
     * 获取活动配置
     */
    AcRankListPopupView.prototype.getRequestData = function () {
        this._aid = String(this.param.data.aid);
        this._code = String(this.param.data.code);
        if (this._aid == "" || this._code == "") {
            return null;
        }
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE, requestData: { activeId: this._aid + "-" + this._code } };
    };
    AcRankListPopupView.prototype.receiveData = function (data) {
        this._acRankInfoVo = Api.acRankVoApi.getAcRankInfoVoByAidAndCode(this._aid, this._code);
        this._allirank = data.data.data.allirank;
    };
    AcRankListPopupView.prototype.tabBtnClickHandler = function (params) {
        var titleTxt2 = this._nodeContainer.getChildByName("titleTxt2");
        var titleTxt3 = this._nodeContainer.getChildByName("titleTxt3");
        var addvalueTxt = this._nodeContainer.getChildByName("addvalueTxt");
        var myRankTxt = this._nodeContainer.getChildByName("myRankTxt");
        var index = params.index;
        var dataList = [];
        var titleStr2 = "";
        var titleStr3 = "";
        var addV = 0;
        var rankV = "10000+";
        if (index == 0) {
            titleStr2 = LanguageManager.getlocal("acRankPop_titleAlliance");
            dataList = this._acRankInfoVo.rankList;
            titleStr3 = LanguageManager.getlocal("acRankPop_title3_12");
            if (this._acRankInfoVo.myrank.myrank) {
                addV = this._acRankInfoVo.myrank.value;
                rankV = String(this._acRankInfoVo.myrank.myrank);
            }
            var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, String(this._code));
            if (rankcfg.type == 13 || rankcfg.type == 14) {
                titleStr3 = LanguageManager.getlocal("acRankPop_title3_" + rankcfg.type);
            }
        }
        else {
            titleStr2 = LanguageManager.getlocal("acRankPop_title2");
            // dataList = this._acRankInfoVo.rankList;
            dataList = this._allirank.rankList;
            titleStr3 = LanguageManager.getlocal("acRankPop_title3_12_1");
            if (this._allirank.myrank && this._allirank.myrank.myrank) {
                addV = this._allirank.myrank.value;
                rankV = String(this._allirank.myrank.myrank);
            }
        }
        titleTxt2.text = titleStr2;
        titleTxt3.text = titleStr3;
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV", [titleStr3, String(addV)]);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        this._scrollView.refreshData(dataList);
    };
    AcRankListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcRankListPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._nodeContainer = null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._allirank = null;
        _super.prototype.dispose.call(this);
    };
    return AcRankListPopupView;
}(PopupView));
__reflect(AcRankListPopupView.prototype, "AcRankListPopupView");

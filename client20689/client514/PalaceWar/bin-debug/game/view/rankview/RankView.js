/**
 * 排行榜
 * author yanyuling
 * date 2017/10/25
 * @class RankView
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
var RankView = (function (_super) {
    __extends(RankView, _super);
    function RankView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._listPosY = 0;
        _this._redList = [];
        return _this;
    }
    RankView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT), this.worshipCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_INDEX), this.refreshRankList, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_INDEX, {});
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        //最底部背景
        var bottomBg2 = BaseBitmap.create("wifeview_bottombg");
        bottomBg2.x = 0;
        bottomBg2.y = GameConfig.stageHeigth - bottomBg2.height - this.container.y;
        this._nodeContainer.addChild(bottomBg2);
        var topBg = BaseBitmap.create("servant_bottombg");
        topBg.width = GameConfig.stageWidth + 18;
        topBg.x = -9;
        topBg.y = -35;
        topBg.height = bottomBg2.y - topBg.y + 20;
        this._nodeContainer.addChildAt(topBg, 0);
        var tabName = ["rankTab1", "rankTab2", "rankTab3"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 15;
        tabbarGroup.y = topBg.y + 24;
        this._nodeContainer.addChild(tabbarGroup);
        var tabX = tabbarGroup.x;
        for (var index = 0; index < tabName.length; index++) {
            var red = BaseBitmap.create("public_dot2");
            if (index == 0)
                red.x = tabX + 122;
            if (index == 1)
                red.x = tabX + 280;
            if (index == 2)
                red.x = tabX + 437;
            red.y = tabbarGroup.y;
            red.visible = !Api.otherInfoVoApi.isRankVisited(index);
            this._nodeContainer.addChild(red);
            this._redList.push(red);
        }
        var innerBg = BaseBitmap.create("public_9_bg32");
        innerBg.height = topBg.height - 95;
        innerBg.width = 606 + 18;
        innerBg.x = GameConfig.stageWidth / 2 - innerBg.width / 2;
        innerBg.y = topBg.y + 80;
        this._nodeContainer.addChild(innerBg);
        var titleBg = BaseBitmap.create("public_9_bg33");
        titleBg.width = innerBg.width;
        titleBg.height = 50;
        titleBg.x = innerBg.x;
        titleBg.y = innerBg.y;
        this._nodeContainer.addChild(titleBg);
        this._listPosY = titleBg.y + titleBg.height + 5;
        this._scroRect = new egret.Rectangle(titleBg.x, 0, titleBg.width, innerBg.height - titleBg.height - 90);
        // 膜拜背景
        var bottomBg = BaseBitmap.create("public_9_bg34");
        bottomBg.width = innerBg.width;
        bottomBg.height = 74;
        bottomBg.x = innerBg.x;
        bottomBg.y = innerBg.y + innerBg.height - bottomBg.height - 10;
        this._nodeContainer.addChild(bottomBg);
        var worshipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        worshipTxt.text = LanguageManager.getlocal("rankworship_tip");
        worshipTxt.x = bottomBg.x + 30;
        worshipTxt.y = bottomBg.y + bottomBg.height / 2 - worshipTxt.height / 2;
        this._nodeContainer.addChild(worshipTxt);
        var worshipBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "rankworship", this.worshipBtnHandler, this);
        worshipBtn.x = bottomBg.x + bottomBg.width - worshipBtn.width - 30;
        worshipBtn.y = bottomBg.y + bottomBg.height / 2 - worshipBtn.height / 2;
        worshipBtn.visible = false;
        this._nodeContainer.addChild(worshipBtn);
        this._worshipBtn = worshipBtn;
        this._worshipFlag = BaseBitmap.create("rank_visited");
        this._worshipFlag.anchorOffsetX = this._worshipFlag.width / 2;
        this._worshipFlag.anchorOffsetY = this._worshipFlag.height / 2;
        this._worshipFlag.setScale(0.7);
        this._worshipFlag.x = worshipBtn.x + 60;
        this._worshipFlag.y = worshipBtn.y + 20;
        this._worshipFlag.visible = false;
        this._nodeContainer.addChild(this._worshipFlag);
        //标题信息
        //底部个人排行信息
        var title_rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x = worshipTxt.x + 10;
        title_rankTxt.y = titleBg.y + titleBg.height / 2 - title_rankTxt.height + 15;
        this._nodeContainer.addChild(title_rankTxt);
        this._title_rankTxt = title_rankTxt;
        var title_nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 110;
        title_nameTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_nameTxt);
        this._title_nameTxt = title_nameTxt;
        var title_officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_officerTxt.text = LanguageManager.getlocal("rankofficer");
        title_officerTxt.x = title_nameTxt.x + 200;
        title_officerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_officerTxt);
        this._title_officerTxt = title_officerTxt;
        var title_powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = title_officerTxt.x + 150;
        title_powerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_powerTxt);
        this._title_powerTxt = title_powerTxt;
        //底部个人排行信息
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.text = LanguageManager.getlocal("ranknickName2", [Api.playerVoApi.getPlayerName()]);
        nameTxt.x = worshipTxt.x;
        nameTxt.y = bottomBg2.y + 20;
        this._nodeContainer.addChild(nameTxt);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTxt.x = nameTxt.x + 300;
        rankTxt.y = nameTxt.y;
        this._nodeContainer.addChild(rankTxt);
        this._rankTxt = rankTxt;
        var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        officerTxt.text = LanguageManager.getlocal("rankofficer2", [Api.playerVoApi.getPlayerOffice()]);
        officerTxt.x = nameTxt.x;
        officerTxt.y = nameTxt.y + 35;
        this._nodeContainer.addChild(officerTxt);
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerTxt.x = rankTxt.x;
        powerTxt.y = officerTxt.y;
        this._nodeContainer.addChild(powerTxt);
        this._powerTxt = powerTxt;
        // this.tabBtnClickHandler({index:0})
    };
    RankView.prototype.refreshTopTitle = function () {
        if (this._curTabIdx == 0) {
            this._title_officerTxt.text = LanguageManager.getlocal("rankofficer");
            this._title_powerTxt.text = LanguageManager.getlocal("rankpower");
            this._powerTxt.text = LanguageManager.getlocal("rankpower2", [String(Api.playerVoApi.getPlayerPower())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2", [String(Api.rankVoApi.getprank())]);
            this._title_nameTxt.x = this._title_rankTxt.x + 110;
            this._title_officerTxt.x = this._title_nameTxt.x + 200;
            this._title_powerTxt.x = this._title_officerTxt.x + 150;
        }
        else if (this._curTabIdx == 1) {
            var cid = Api.rankVoApi.getcid();
            var bcid = Api.challengeVoApi.getBigChannelIdByCid(cid);
            var cTxt = String(bcid) + "." + LanguageManager.getlocal("challengeTitle" + bcid);
            this._powerTxt.text = LanguageManager.getlocal("rankchallenge", [cTxt]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2", [String(Api.rankVoApi.getcRank())]);
            this._title_officerTxt.text = LanguageManager.getlocal("rank_challenge");
            this._title_powerTxt.text = "";
            this._title_nameTxt.x = this._title_rankTxt.x + 140;
            this._title_officerTxt.x = this._title_nameTxt.x + 270;
        }
        else if (this._curTabIdx == 2) {
            this._powerTxt.text = LanguageManager.getlocal("rankimacy", [String(Api.rankVoApi.getimacy())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2", [String(Api.rankVoApi.getirank())]);
            this._title_officerTxt.text = LanguageManager.getlocal("rank_imacy");
            this._title_powerTxt.text = "";
            this._title_nameTxt.x = this._title_rankTxt.x + 140;
            this._title_officerTxt.x = this._title_nameTxt.x + 270;
        }
    };
    RankView.prototype.worshipCallback = function (event) {
        for (var index = 0; index < this._redList.length; index++) {
            this._redList[index].visible = !Api.otherInfoVoApi.isRankVisited(index);
        }
        var data = event.data;
        if (data.ret == true && data.data.data.lucky) {
            App.CommonUtil.showGodbless("rank");
        }
        this._worshipBtn.visible = false;
        this._worshipFlag.setScale(1.3);
        this._worshipFlag.visible = true;
        egret.Tween.get(this._worshipFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 400).wait(600).call(function () {
            ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW, data);
        });
    };
    RankView.prototype.worshipBtnHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_RANK_VISIT, { dtype: this._curTabIdx + 1 });
    };
    RankView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    RankView.prototype.refreshRankList = function () {
        this.refreshTopTitle();
        if (Api.otherInfoVoApi.isRankVisited(this._curTabIdx)) {
            this._worshipFlag.visible = true;
            this._worshipBtn.visible = false;
        }
        else {
            this._worshipFlag.visible = false;
            this._worshipBtn.visible = true;
        }
        // let data = event.data;
        // egret.log(">>>>>>>>");
        //刷新列表
        var list = Api.rankVoApi.getRankListByTabIdx(this._curTabIdx);
        if (!this._scrollList) {
            this._scrollList = ComponentManager.getScrollList(RankScrollItem, list, this._scroRect);
            this._scrollList.y = this._listPosY;
            this._nodeContainer.addChild(this._scrollList);
        }
        else {
            this._scrollList.refreshData(list);
        }
    };
    RankView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_1", "rank_2", "rank_3", "rank_display_namebg", "rank_line",
            "rank_select_mask", "servant_bottombg", "wifeview_bottombg", "rank_visited",
        ]);
    };
    RankView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT), this.worshipCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_INDEX), this.refreshRankList, this);
        this._curTabIdx = 0;
        this._nodeContainer = null;
        this._scrollList = null;
        this._title_nameTxt = null;
        this._title_officerTxt = null;
        this._title_powerTxt = null;
        this._title_rankTxt = null;
        this._rankTxt = null;
        this._powerTxt = null;
        this._redList = [];
        _super.prototype.dispose.call(this);
    };
    return RankView;
}(CommonView));
__reflect(RankView.prototype, "RankView");

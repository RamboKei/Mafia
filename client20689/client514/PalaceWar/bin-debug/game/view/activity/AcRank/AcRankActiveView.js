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
 * 冲榜
 * author yanyuling
 * date 2017/11/06
 * @class AcRankActiveView
 */
var AcRankActiveView = (function (_super) {
    __extends(AcRankActiveView, _super);
    function AcRankActiveView() {
        var _this = _super.call(this) || this;
        _this._deltaSecs = 86400;
        return _this;
    }
    AcRankActiveView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE, { activeId: this.aid + "-" + this.code });
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rightBg = "activity_rank_bg";
        if (rankcfg.type == 11) {
            rightBg = rightBg = "activity_rank_bg_" + this.code;
        }
        else {
            var roleNode = Api.playerVoApi.getPlayerPortrait(rankcfg.title, Api.playerVoApi.getPlayePicId());
            roleNode.width = 382;
            roleNode.height = 618;
            roleNode.x = 30;
            roleNode.setScale(0.7);
            this._nodeContainer.addChild(roleNode);
            //摄政王
            var officerImg = BaseLoadBitmap.create("user_title_" + rankcfg.title + "_2");
            //名字竖改横
            if (PlatformManager.checkIsTextHorizontal()) {
                officerImg.x = 50;
                officerImg.y = 155;
            }
            else {
                officerImg.x = 10;
                officerImg.y = 10;
            }
            this._nodeContainer.addChild(officerImg);
        }
        var activity_rank_bg = BaseBitmap.create(rightBg);
        activity_rank_bg.x = 0;
        activity_rank_bg.y = -15;
        this._nodeContainer.addChildAt(activity_rank_bg, 0);
        var activity_rank_rightBg = BaseBitmap.create("activity_rank_rightBg");
        activity_rank_rightBg.height = 265;
        activity_rank_rightBg.x = GameConfig.stageWidth - activity_rank_rightBg.width - 5;
        activity_rank_rightBg.y = -10;
        this._nodeContainer.addChild(activity_rank_rightBg);
        var activity_rank_rightBg2 = BaseBitmap.create("public_9_managebg");
        activity_rank_rightBg2.width = activity_rank_rightBg.width - 30;
        activity_rank_rightBg2.height = 205;
        activity_rank_rightBg2.x = activity_rank_rightBg.x + 15;
        activity_rank_rightBg2.y = -15;
        this._nodeContainer.addChild(activity_rank_rightBg2);
        var acTimeTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        var stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(this.acVo.et - this._deltaSecs, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(this.acVo.st, this.acVo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = activity_rank_rightBg2.width - 50;
        acTimeTxt.text = this.acVo.getAcLocalTime(true);
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = activity_rank_rightBg.x + 25;
        acTimeTxt.y = activity_rank_rightBg.y + 20;
        this._nodeContainer.addChild(acTimeTxt);
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        acCDTxt.x = acTimeTxt.x;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 8;
        this._nodeContainer.addChild(acCDTxt);
        // acRankActiveDesc1
        var rankDescTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._rankDescTxt = rankDescTxt;
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        rankDescTxt.width = 240;
        this._rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc" + rankcfg.type, [rankcfg.getMaxRangValue()]);
        rankDescTxt.x = activity_rank_rightBg.x + 25;
        rankDescTxt.y = acCDTxt.y + acCDTxt.height + 8;
        this._nodeContainer.addChild(rankDescTxt);
        var myRankTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        myRankTxt.y = activity_rank_rightBg2.y + activity_rank_rightBg2.height - 28;
        this._nodeContainer.addChild(myRankTxt);
        this._myRankTxt = myRankTxt;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRankBtnTxt", this.rankListBtnHandler, this);
            rankListBtn.x = activity_rank_rightBg.x + activity_rank_rightBg.width / 2 - rankListBtn.width / 2;
            rankListBtn.y = activity_rank_rightBg.y + 205;
            this._nodeContainer.addChild(rankListBtn);
            this._rankListBtn = rankListBtn;
        }
        var wordRes = "activity_rank_word";
        if (rankcfg.titleType == 3) {
            wordRes = "activity_rank_word2";
        }
        if (rankcfg.type == 11) {
            wordRes = "activity_rank_word3";
        }
        var activity_rank_word = BaseBitmap.create(wordRes);
        activity_rank_word.x = 5;
        activity_rank_word.y = activity_rank_bg.y + 220;
        this._nodeContainer.addChild(activity_rank_word);
        /**
         * 下部列表
         */
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.x = 0;
        bottomBg.y = activity_rank_bg.y + activity_rank_bg.height - 3;
        // bottomBg.height = 1134 - bottomInfoY  - this.container.y-20;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y; //-20;
        this._nodeContainer.addChild(bottomBg);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        tipTxt.text = LanguageManager.getlocal("acRanktip");
        if (rankcfg.type == 11) {
            tipTxt.text = LanguageManager.getlocal("acRanktip2");
        }
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + bottomBg.height - 50;
        bottomBg.name = "bottomBg";
        this._nodeContainer.addChild(tipTxt);
    };
    AcRankActiveView.prototype.getRankListHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        var rData = event.data.data.data;
        this._rankData = rData;
        if (rData.acrank.myrank.myrank) {
            this._myRankTxt.text = LanguageManager.getlocal("acRank_myrank1", [String(rData.acrank.myrank.myrank)]);
        }
        else {
            this._myRankTxt.text = LanguageManager.getlocal("acRank_myrank1", ["10000+"]);
        }
        this._myRankTxt.x = 399; // this._rankListBtn.x + this._rankListBtn.width/2 -this._myRankTxt.width/2;
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rList = rankcfg.getRankList();
        var bottomBg = this._nodeContainer.getChildByName("bottomBg");
        if (rankcfg.isCross == 1) {
            var crossbg = BaseBitmap.create("activity_rank_cross");
            // crossbg.height = 40;
            crossbg.width = GameConfig.stageWidth;
            crossbg.x = 0;
            crossbg.y = bottomBg.y - 5;
            this._nodeContainer.addChild(crossbg);
            bottomBg.height -= crossbg.height;
            bottomBg.y += crossbg.height - 5;
        }
        var scroStartY = 10;
        for (var key in rList) {
            var rItem = rList[key];
            var id = rItem.id;
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = scroStartY;
            this._rewardNodeContainer.addChild(line1);
            var len = 1;
            if (rItem.reward1 && rItem.reward1 != "") {
                len = 2;
            }
            var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
            if (Number(key) < 4) {
                txt.text = LanguageManager.getlocal("acRank_rank" + key);
            }
            else {
                txt.text = LanguageManager.getlocal("acRank_rank4", [String(rItem.minRank), String(rItem.maxRank)]);
            }
            txt.x = line1.x + line1.width / 2 - txt.width / 2;
            txt.y = scroStartY + 10 - txt.height / 2;
            this._rewardNodeContainer.addChild(txt);
            var addH = 0;
            if (Number(key) == 1 && (rankcfg.type != 11)) {
                var officerTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
                officerTxt.text = LanguageManager.getlocal("acRank_getofficer");
                if (len == 2) {
                    officerTxt.text = LanguageManager.getlocal("acRank_alliance_masterget2");
                }
                officerTxt.x = txt.x + txt.width / 2 - officerTxt.width;
                officerTxt.y = txt.y + txt.height + 20;
                this._rewardNodeContainer.addChild(officerTxt);
                var titleImg = BaseLoadBitmap.create("user_title_" + rankcfg.title + "_3");
                var deltaV = 0.8;
                titleImg.width = 155 * deltaV;
                titleImg.height = 59 * deltaV;
                titleImg.x = officerTxt.x + officerTxt.width;
                titleImg.y = officerTxt.y + officerTxt.height / 2 - 30;
                this._rewardNodeContainer.addChild(titleImg);
            }
            var rIcons = rItem.rewardIcons;
            for (var outIdx = 0; outIdx < len; outIdx++) {
                if (outIdx == 1) {
                    rIcons = rItem.reward1Icons;
                }
                var innerbg = BaseBitmap.create("public_9_managebg");
                innerbg.width = bottomBg.width - 50;
                innerbg.height = 125;
                innerbg.x = 25;
                innerbg.y = scroStartY + 30;
                this._rewardNodeContainer.addChild(innerbg);
                addH = 0;
                if (Number(key) == 1 && outIdx == 0) {
                    addH = 35;
                    scroStartY += 35;
                }
                scroStartY += 40;
                if (len == 2) {
                    var memberGetTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
                    memberGetTxt.y = innerbg.y + 10;
                    if (outIdx == 1) {
                        memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
                        memberGetTxt.x = innerbg.x + innerbg.width / 2 - memberGetTxt.width / 2;
                        this._rewardNodeContainer.addChild(memberGetTxt);
                        scroStartY += 40;
                    }
                    else if (outIdx == 0 && Number(key) > 1) {
                        memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
                        memberGetTxt.x = innerbg.x + innerbg.width / 2 - memberGetTxt.width / 2;
                        this._rewardNodeContainer.addChild(memberGetTxt);
                        scroStartY += 40;
                    }
                }
                var tmpX = 33;
                for (var index = 0; index < rIcons.length; index++) {
                    var element = rIcons[index];
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 8);
                    //换行处理
                    if (tmpX >= GameConfig.stageWidth) {
                        tmpX = 33;
                        scroStartY += element.height + 15;
                        element.x = tmpX;
                        element.y = scroStartY;
                        addH += element.height + 15;
                        tmpX += (element.width + 8);
                    }
                    this._rewardNodeContainer.addChild(element);
                }
                if (len == 2) {
                    if (outIdx == 0) {
                        scroStartY += 105;
                    }
                    else {
                        scroStartY += 145;
                    }
                    if (Number(key) == 1 && outIdx == 0) {
                    }
                    else {
                        addH += 45;
                    }
                }
                else {
                    scroStartY += 145;
                }
                innerbg.height += addH + 5;
            }
        }
        var rect = new egret.Rectangle(0, 10, GameConfig.stageWidth, bottomBg.height - 85);
        var scrollView = ComponentManager.getScrollView(this._rewardNodeContainer, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = 0; //bottomBg.x;
        scrollView.y = bottomBg.y + 25;
        this._nodeContainer.addChild(scrollView);
    };
    AcRankActiveView.prototype.rankListBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKLISTPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcRankActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_rank_bg", "activity_rank_rightBg", "activity_rank_word",
            "itemeffect", "activity_rank_word2", "activity_rank_word3", "activity_rank_bg_19",
            "activity_rank_cross", "activity_rank_bg_23", "activity_rank_bg_27",
        ]);
    };
    AcRankActiveView.prototype.getRuleInfo = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        return rankcfg.helpInfo;
    };
    AcRankActiveView.prototype.tick = function () {
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        return false;
    };
    AcRankActiveView.prototype.getTitleStr = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aid + "-" + rankcfg.type) + "_Title";
    };
    AcRankActiveView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        this._nodeContainer = null;
        this._rewardNodeContainer = null;
        this._myRankTxt = null;
        this._rankListBtn = null;
        this._rankData = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcRankActiveView;
}(AcCommonView));
__reflect(AcRankActiveView.prototype, "AcRankActiveView");

/**
 * author dky
 * date 2017/10/25
 * @class ConquestView
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
var ConquestView = (function (_super) {
    __extends(ConquestView, _super);
    function ConquestView() {
        var _this = _super.call(this) || this;
        _this._topContiner = undefined;
        _this._middleContiner = undefined;
        _this._buttomContiner = undefined;
        _this._scrollContiner = undefined;
        _this._soldierText = null;
        _this._expProgress = null;
        _this._isShowName = false;
        _this._officerIcon = null;
        _this._isInited = false;
        _this._oldInfo = null;
        return _this;
    }
    ConquestView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            ProgressBarConst.IMAGE_PROGRESS_EXP, ProgressBarConst.IMAGE_PROGRESS_EXP_Bg,
            "conquest_cellbg",
            "promotion_officerbg1",
            "channel_bg",
            "channel_light",
            "channel_knife",
            "challenge_icon_force",
            "challenge_top_bg",
            "mainui_topresbg",
            "progress4", "progress7_bg",
            "mainui_fg"
        ]);
    };
    ConquestView.prototype.getTitleStr = function () {
        return "conquestTitle";
    };
    ConquestView.prototype.getDescStr = function () {
        return "challengeDesc" + Api.challengeVoApi.getCurBigChannelId();
    };
    // 规则说明内容
    ConquestView.prototype.getRuleInfo = function () {
        return "conquestInfo";
    };
    ConquestView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_CONQUEST_INDEX, requestData: {} };
    };
    ConquestView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        this.container.y = this.getTitleButtomY();
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - this.getTitleButtomY() - 20));
        // let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
        // this.addChildToContainer(scrollView);
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - 280;
        bottomBg.x = 5;
        bottomBg.y = 110;
        this.addChildToContainer(bottomBg);
        //不拖动
        this.addChildToContainer(this._scrollContiner);
        this._topContiner = new BaseDisplayObjectContainer();
        this._scrollContiner.addChild(this._topContiner);
        this.initTop();
        this.initMiddle();
        this.initButtom();
        this.refreshBottom();
    };
    ConquestView.prototype.initTop = function () {
        var topinfobg = BaseBitmap.create("challenge_top_bg");
        this._topContiner.addChild(topinfobg);
        // let headBg:BaseBitmap=BaseBitmap.create("mainui_headbg");
        // headBg.setPosition(60,App.CommonUtil.getCenterY(topinfobg,headBg,false)+1);
        // headBg.name = "headBg";
        // this._topContiner.addChild(headBg);
        this._circleHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
        this._circleHead.setPosition(2, 6);
        this._topContiner.addChild(this._circleHead);
        this._circleHead.addTouchTap(this.roleHeadClickHandler, this);
        //官职
        this._officerIcon = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt");
        this._officerIcon.setScale(0.85);
        this._officerIcon.setPosition(this._circleHead.x + this._circleHead.width / 2 - this._officerIcon.width * this._officerIcon.scaleX / 2, this._circleHead.y + 63);
        this._topContiner.addChild(this._officerIcon);
        //权势
        var powerBg = BaseBitmap.create("public_9_resbg");
        powerBg.setPosition(105, this._circleHead.y + 2);
        powerBg.width = 172;
        this._topContiner.addChild(powerBg);
        var powerIcon = BaseLoadBitmap.create("challenge_icon_power");
        powerIcon.setPosition(powerBg.x - 3, powerBg.y);
        this._topContiner.addChild(powerIcon);
        var powerValueText = ComponentManager.getTextField(Api.playerVoApi.getPlayerPower().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xfdf2e8);
        powerValueText.setPosition(powerBg.x + 50, powerBg.y + powerBg.height / 2 - powerValueText.height / 2 + 2);
        this._topContiner.addChild(powerValueText);
        //武力 
        var focreBg = BaseBitmap.create("public_9_resbg");
        focreBg.setPosition(powerBg.x + 175, powerBg.y);
        focreBg.width = powerBg.width;
        this._topContiner.addChild(focreBg);
        var resImg1 = BaseBitmap.create("challenge_icon_force");
        resImg1.setPosition(focreBg.x - 3, focreBg.y);
        this._topContiner.addChild(resImg1);
        var attText = ComponentManager.getTextField(Api.playerVoApi.getAtk().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, powerValueText.textColor);
        attText.setPosition(focreBg.x + 50, focreBg.y + focreBg.height / 2 - attText.height / 2 + 2);
        this._topContiner.addChild(attText);
        //士兵数量
        var soldierBg = BaseBitmap.create("public_9_resbg");
        soldierBg.setPosition(focreBg.x + 175, focreBg.y);
        soldierBg.width = powerBg.width;
        this._topContiner.addChild(soldierBg);
        var resImg3 = BaseBitmap.create("public_icon4");
        resImg3.setPosition(soldierBg.x - 3, soldierBg.y);
        this._topContiner.addChild(resImg3);
        this._soldierText = ComponentManager.getTextField(Api.playerVoApi.getSoldier().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._soldierText.setPosition(soldierBg.x + 50, soldierBg.y + soldierBg.height / 2 - this._soldierText.height / 2 + 2);
        this._topContiner.addChild(this._soldierText);
        //政绩
        var resImg2 = BaseBitmap.create("public_icon5");
        resImg2.setPosition(powerBg.x - 3, powerBg.y + 49);
        this._topContiner.addChild(resImg2);
        this._expProgress = ComponentManager.getProgressBar("progress4", "progress7_bg", 463);
        this._expProgress.setPosition(resImg2.x + 55, resImg2.y + resImg2.height / 2 - this._expProgress.height / 2);
        this._expProgress.setTextSize(TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._topContiner.addChild(this._expProgress);
        this.resetExpProgress();
        this.refreshUpgradeClip();
    };
    //请求回调
    ConquestView.prototype.receiveData = function (data) {
        if (data.data.refreshdata) {
            this.sendData();
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_CONQUEST_INDEX) {
            if (!this._isInited) {
                this._isInited = true;
                return;
            }
            // this.a
            this._conVo = Api.conquestVoApi.getConquestVo();
            this.refreshView();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CONQUEST_FIGHT) {
            ViewController.getInstance().openView(ViewConst.BATTLE.CONQUESTFIGHTVIEW, { f: this.sendData, o: this, info: this._oldInfo, fightflag: data.data.data.fightflag, rewards: data.data.data.rewards });
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT) {
            //一键征伐的奖励
            var _data = data.data.data;
            if (_data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONQUESTINFOPOPUPVIEW, _data);
            }
            this.sendData();
        }
    };
    ConquestView.prototype.sendData = function () {
        this.request(NetRequestConst.REQUEST_CONQUEST_INDEX, {});
    };
    ConquestView.prototype.refreshView = function () {
        this.refreshBottom();
        if (this._middleContiner) {
            this._scrollContiner.removeChild(this._middleContiner);
            this._middleContiner = null;
        }
        this.initMiddle();
    };
    ConquestView.prototype.refreshBottom = function () {
        var data = Api.conquestVoApi.getConquestVo();
        if (data.tnum >= 50) {
            this._reachText.visible = false;
            // 一键征伐
            if (this._childUpdAllBtn) {
                this._childUpdAllBtn.visible = true;
            }
            else {
                //一键征伐按钮
                this._childUpdAllBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "conquestAll", this.attAllClickHandler, this);
                this._childUpdAllBtn.setPosition(390, GameConfig.stageHeigth - this.container.y - this._childUpdAllBtn.height - 8);
                this._childUpdAllBtn.setColor(TextFieldConst.COLOR_BLACK);
                this.addChildToContainer(this._childUpdAllBtn);
            }
        }
    };
    ConquestView.prototype.attAllClickHandler = function () {
        var conVo = Api.conquestVoApi.getConquestVo();
        if (conVo.info.cid > 200) {
            App.CommonUtil.showTip(LanguageManager.getlocal("conquestCannotAtt2"));
            return;
        }
        if (Api.playerVoApi.getSoldier() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("conquestCannotAtt"));
            return;
        }
        if (Api.conquestVoApi.getAttNum(conVo.info.cid) <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("conquestCannotAtt3"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONQUESTBATCHPOPUPVIEW, { callback: this.callbackHandler, handler: this });
    };
    ConquestView.prototype.callbackHandler = function (itemNum) {
        var coVo = Api.conquestVoApi.getConquestVo();
        var carNum = coVo.info.cid + itemNum;
        this.request(NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT, { cid: carNum });
    };
    ConquestView.prototype.roleHeadClickHandler = function () {
        PlayerBottomUI.getInstance().show();
        // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
    };
    ConquestView.prototype.resetExpProgress = function () {
        var exp = Api.playerVoApi.getPlayerExp();
        var nextExp = Api.playerVoApi.getNextLevelExp();
        this._expProgress.setText(exp.toString() + "/" + nextExp.toString());
        this._expProgress.setPercentage(exp / nextExp);
        var soldierNum = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
        this._soldierText.text = soldierNum;
    };
    ConquestView.prototype.initMiddle = function () {
        // this._middleContiner.dispose();
        // this._attackBtnTab.length = 0;
        this._middleContiner = new BaseDisplayObjectContainer();
        this._middleContiner.y = 105;
        this._scrollContiner.addChild(this._middleContiner);
        var data = Api.conquestVoApi.getConquestVo();
        if (data.info.cid > 200) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("conquestAttMax"));
            var tipText = ComponentManager.getTextField(LanguageManager.getlocal("conquestAttMax"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipText.setPosition(this.width / 2 - tipText.width / 2, 300);
            tipText.textAlign = TextFieldConst.ALIGH_CENTER;
            this._middleContiner.addChild(tipText);
            return;
        }
        for (var index = 0; index < 3; index++) {
            // data.info[index]
            var item = this.getItem(index);
            this._middleContiner.addChild(item);
            item.x = 12 + (202 + 5) * index;
            item.y = 62;
        }
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = this.width / 2 - line1.width / 2;
        line1.y = 23;
        this._middleContiner.addChild(line1);
        var levelStr = LanguageManager.getlocal("conquestLevel", [data.info.cid]);
        var levelText = ComponentManager.getTextField(levelStr, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        levelText.setPosition(this.width / 2 - levelText.width / 2, 19);
        this._middleContiner.addChild(levelText);
    };
    ConquestView.prototype.getItem = function (index) {
        var data = Api.conquestVoApi.getConquestVo();
        // let itemData = data.info[index];
        var itemContainer = new BaseDisplayObjectContainer();
        // let data = 
        var upBg = BaseBitmap.create("conquest_cellbg");
        upBg.height = 615;
        itemContainer.addChild(upBg);
        var cfg = Config.ConquestCfg.getConquestCfgById(data.info.cid + "");
        var persionId = Config.ConquestCfg.getConquestCfgById(data.info.cid + "")["person" + (index + 1)];
        var name = LanguageManager.getlocal("BossName" + persionId);
        var nameText = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(upBg.width / 2 - nameText.width / 2, 9);
        itemContainer.addChild(nameText);
        var prisonHead = BaseLoadBitmap.create("story_npc_" + persionId);
        prisonHead.x = 20;
        prisonHead.y = 58;
        prisonHead.scaleX = 0.4;
        prisonHead.scaleY = 0.4;
        itemContainer.addChild(prisonHead);
        var iconBg3 = BaseBitmap.create("public_9_resbg");
        iconBg3.setPosition(20, 265);
        itemContainer.addChild(iconBg3);
        var resImg3 = BaseBitmap.create("public_icon4");
        resImg3.setPosition(iconBg3.x - 3, iconBg3.y);
        itemContainer.addChild(resImg3);
        var soldierNum = App.StringUtil.changeIntToText(data.info.cinfo[index].soldier);
        var attText = ComponentManager.getTextField(soldierNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        attText.setPosition(iconBg3.x + 50, iconBg3.y + iconBg3.height / 2 - attText.height / 2);
        itemContainer.addChild(attText);
        var txtBg = BaseBitmap.create("public_9_managebg");
        txtBg.x = 15;
        txtBg.y = attText.y + attText.height + 20;
        txtBg.width = 170;
        txtBg.height = 220;
        itemContainer.addChild(txtBg);
        var rewardTitle = ComponentManager.getTextField(LanguageManager.getlocal("taskReward"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rewardTitle.x = txtBg.x + 5;
        rewardTitle.y = txtBg.y + 5;
        itemContainer.addChild(rewardTitle);
        var scoreTitle = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber") + "+" + cfg.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        scoreTitle.x = rewardTitle.x;
        scoreTitle.y = rewardTitle.y + scoreTitle.height + 5;
        itemContainer.addChild(scoreTitle);
        var zjTitle = ComponentManager.getTextField(LanguageManager.getlocal("affairtxt2") + "+" + cfg.reward, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        zjTitle.x = scoreTitle.x;
        zjTitle.y = scoreTitle.y + scoreTitle.height + 5;
        itemContainer.addChild(zjTitle);
        var getTitle = ComponentManager.getTextField(LanguageManager.getlocal("conquestGetItem"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        getTitle.x = scoreTitle.x;
        getTitle.y = zjTitle.y + zjTitle.height + 5;
        itemContainer.addChild(getTitle);
        // let rewardContainer = new BaseDisplayObjectContainer();
        // rewardContainer.x = scoreTitle.x - 3;
        // rewardContainer.y = getTitle.y + getTitle.height + 5;
        // itemContainer.addChild(rewardContainer);
        for (var index2 = 0; index2 < data.info.cinfo[index].rewards.length; index2++) {
            var element = data.info.cinfo[index].rewards[index2];
            var rewardList = GameData.formatRewardItem(element);
            var temX = 0;
            var temScale = 0.45;
            // let icon = GameData.getItemIcon(rewardList[0],true,true);
            var icon = GameData.getItemIcon(rewardList[0], true, true);
            var num = index2 % 3;
            icon.x = 14 + 7 * (num + 1) + icon.width * temScale * num;
            icon.y = (icon.height * temScale + 5) * (Math.floor((index2) / 3)) + getTitle.y + getTitle.height + 5;
            ;
            icon.scaleX = icon.scaleY = temScale;
            itemContainer.addChild(icon);
        }
        var attBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "conquestTitle", this.attBtnCilck, this, [index]);
        attBtn.x = 24;
        attBtn.y = txtBg.y + txtBg.height + 10;
        itemContainer.addChild(attBtn);
        attBtn.setColor(TextFieldConst.COLOR_BLACK);
        attBtn.bindData = index;
        return itemContainer;
    };
    ConquestView.prototype.attBtnCilck = function (index) {
        if (Api.playerVoApi.getSoldier() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("conquestCannotAtt"));
            return;
        }
        var data = Api.conquestVoApi.getConquestVo();
        this._oldInfo = { cid: data.info.cid, oldSilder: Api.playerVoApi.getSoldier(), enemySoldier: data.info.cinfo[index].soldier, enemyAtk: data.info.cinfo[index], idx: index + 1 };
        this.request(NetRequestConst.REQUEST_CONQUEST_FIGHT, { num: index + 1 });
    };
    ConquestView.prototype.initButtom = function () {
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "conquestRank", this.rankBtnCilck, this);
            rankBtn.x = 85;
            rankBtn.y = GameConfig.stageHeigth - 70;
            this.addChild(rankBtn);
            rankBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        // 一键征伐
        this._reachText = ComponentManager.getTextField(LanguageManager.getlocal("conquestAllTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._reachText.setPosition(320, GameConfig.stageHeigth - 70 + 30 - this._reachText.height / 2);
        this.addChild(this._reachText);
    };
    ConquestView.prototype.rankBtnCilck = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONQUESTRANKPOPUPVIEW);
    };
    ConquestView.prototype.onClickAttack = function () {
        var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        if (challengeConfig.dialogue) {
            var key = LocalStorageConst.LOCAL_CHALLENGE_STORY + "_cId_" + Api.challengeVoApi.getCurChannelId() + "_zId_" + GameData.curZoneID + "_pId_" + Api.playerVoApi.getPlayerID();
            var value = LocalStorageManager.get(key);
            // value=null;
            if (value) {
                this.realAttackChannel();
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.CHALLENGESTORY, { f: this.realAttackChannel, o: this, dialogue: challengeConfig.dialogue });
                // LocalStorageManager.set(key,"1");
            }
        }
        else {
            this.realAttackChannel();
        }
    };
    ConquestView.prototype.realAttackChannel = function () {
        // if (Api.challengeVoApi.getIsBossChannel() == true) {
        // 	ViewController.getInstance().openView(ViewConst.BATTLE.BOSSBATTLEVIEW,{f:this.refreshInfo,o:this});
        // }
        // else {
        // 	ViewController.getInstance().openView(ViewConst.BASE.BATTLEVIEW,{f:this.refreshInfo,o:this});
        // }
    };
    ConquestView.prototype.refreshInfo = function () {
        if (this._expProgress == null) {
            return;
        }
        // let openViewMessage:string = Api.challengeVoApi.getOpenViewMessage();
        // if (openViewMessage) {
        // 	this.hide();
        // 	return App.CommonUtil.showTip(openViewMessage);
        // }
        this.resetExpProgress();
        var newBigChannel = Api.challengeVoApi.getCurBigChannelId();
        var newMiddleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        this.refreshUpgradeClip();
    };
    // private setButtonStatus():void
    // {
    // 	let newMiddleChannel:number = Api.challengeVoApi.getCurMiddleChannelId();
    // 	this._attackBtnTab[this._middleChannel-1].hiddenKnifeAnim();
    // 	this._attackBtnTab[newMiddleChannel-1].showClickable();
    // 	this._middleChannel =  Api.challengeVoApi.getCurMiddleChannelId();;
    // }
    ConquestView.prototype.getButtomLineBg = function () {
        return null;
    };
    ConquestView.prototype.refreshUpgradeClip = function () {
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        if (nextLvCfg && Api.playerVoApi.getPlayerExp() >= nextLvCfg.exp || Api.practiceVoApi.isShowRedForPBottom()) {
            if (!this._upgradeClip) {
                this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg", 10, 100);
                this._upgradeClip.x = -16;
                this._upgradeClip.y = -18;
                this._circleHead.addChild(this._upgradeClip);
                this._circleHead.swapChildren(this._circleHead.getChildByName("myHead"), this._upgradeClip);
                this._upgradeClip.playWithTime(0);
            }
        }
        else {
            if (this._upgradeClip) {
                this._upgradeClip.stop();
                this._circleHead.removeChild(this._upgradeClip);
                this._upgradeClip = null;
                this._officerIcon.text = Api.playerVoApi.getPlayerOffice();
            }
        }
    };
    ConquestView.prototype.refresh = function () {
        this.refreshInfo();
    };
    ConquestView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    ConquestView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        this._soldierText = null;
        this._expProgress = null;
        this._scrollContiner = null;
        this._topContiner = null;
        this._middleContiner = null;
        this._buttomContiner = null;
        this._upgradeClip = null;
        this._circleHead = null;
        this._conVo = null;
        this._isInited = false;
        this._childUpdAllBtn = null;
        this._reachText = null;
        this._oldInfo = null;
        this._officerIcon = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestView;
}(CommonView));
__reflect(ConquestView.prototype, "ConquestView");

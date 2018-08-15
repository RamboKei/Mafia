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
var DailybossBattleView = (function (_super) {
    __extends(DailybossBattleView, _super);
    function DailybossBattleView() {
        var _this = _super.call(this) || this;
        _this._heroRattle = null;
        _this._attackEffect = null; //开火动画
        _this._hasKill = 0; // 1--Boss已经被击杀
        _this._exp = 0;
        _this._dps = 0;
        _this._rewards = null;
        _this._maxRound = 35;
        return _this;
    }
    DailybossBattleView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.autoSetServant, this);
        var soldiersBg = BaseLoadBitmap.create("dailyboss_battle_soldier");
        soldiersBg.setPosition(0, GameConfig.stageHeigth - 760);
        this.addChildToContainer(soldiersBg);
        this.initAttackRank();
        if (Api.dailybossVoApi.getBossType() == 2 && !this._bossData.hp) {
            this.showKillBossBattleResult();
        }
        else if (Api.dailybossVoApi.getBossType() == 1 && this._bossData.bossLv > this._maxRound) {
            this.showDefenedWinResult();
        }
        else {
            this.initAttackBtn();
            this.autoSetServant();
            this.setBossUIStatus();
            var nameBg = BaseBitmap.create("promotion_officerbg1");
            // nameBg.setScale(0.9);
            nameBg.setPosition((GameConfig.stageWidth - nameBg.width * nameBg.scaleX) / 2, 300);
            this.addChildToContainer(nameBg);
            this._nameBg = nameBg;
            var nameTxt = ComponentManager.getTextField(this.getbossName(), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            nameTxt.width = nameBg.width * nameBg.scaleX;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.setPosition(nameBg.x, nameBg.y + (nameBg.height * nameBg.scaleY - nameTxt.height) / 2);
            this.addChildToContainer(nameTxt);
            this._nameTxt = nameTxt;
            if (this._bossData) {
                this.setTopProgress(this._bossData.hp, this._bossData.totalHp, GameConfig.stageWidth - 160, Api.dailybossVoApi.getBossType());
                this._topProgress.y = 10;
            }
            this.initPao();
            this.checkShowLastRankRewardView();
        }
    };
    // protected resetTopProgressAfterDamage():void
    // {
    // 	this.setTopProgress(this._bossData.hp,this._bossData.totalHp);
    // }
    DailybossBattleView.prototype.getbossName = function () {
        var nameStr;
        if (Api.dailybossVoApi.getBossType() == 1) {
            var lv = this._bossData.bossLv;
            nameStr = LanguageManager.getlocal("dailybossNameType1", [lv.toString()]);
            if (lv > this._maxRound) {
                lv = this._maxRound;
            }
            nameStr = nameStr + LanguageManager.getlocal("dailybossName" + lv);
        }
        else {
            nameStr = LanguageManager.getlocal("dailybossNameType2");
        }
        return nameStr;
    };
    DailybossBattleView.prototype.getBossType = function () {
        return Api.dailybossVoApi.getBossType();
    };
    DailybossBattleView.prototype.setBossUIStatus = function () {
        var bossLv = 0;
        if (this._bossData.bossLv && Api.dailybossVoApi.getBossType() == 1) {
            bossLv = (this._bossData.bossLv - 1) % 5 + 1;
        }
        var imgUrl = "dailyboss_lv_" + bossLv;
        if (this._bossImg != imgUrl) {
            if (this._upHero) {
                this._upHero.resetHero(imgUrl);
            }
            else {
                this.setUpHero(imgUrl, null, 3);
                this._upHero.y = 50;
                this._upPositon.y = this._upHero.y;
            }
            var rattle = new BattleRattle();
            rattle.init(this.container, 260, 2);
            rattle.setPosition(350, this._upHero.y);
            rattle.resetString(null, 3000, 2);
            if (this._nameTxt) {
                this._nameTxt.text = this.getbossName();
            }
        }
        this._bossImg = imgUrl;
    };
    DailybossBattleView.prototype.checkShowLastRankRewardView = function () {
        if (this._lastReward) {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKREWARDPOPUPVIEW, this._lastReward);
            this._lastReward = null;
        }
    };
    DailybossBattleView.prototype.initAttackBtn = function () {
        this._attackBtn = ComponentManager.getButton("boss_start_war", "", this.attackHandle, this);
        this._attackBtn.setPosition((GameConfig.stageWidth - this._attackBtn.width) / 2, this._buttomBg.y - this._attackBtn.height - 20);
        this.addChildToContainer(this._attackBtn);
        this._attackBtn.visible = false;
    };
    DailybossBattleView.prototype.initPao = function () {
        this._pao = new DailybossPao();
        this._pao.setPosition(GameConfig.stageWidth - this._pao.width, -this.container.y + GameConfig.stageHeigth - this._pao.height - this._buttomBg.height);
        this.addChildToContainer(this._pao);
        // this._pao.kaiPao();
    };
    DailybossBattleView.prototype.initAttackRank = function () {
        var buttomBg = BaseBitmap.create("public_9_downbg");
        buttomBg.width = GameConfig.stageWidth;
        buttomBg.height = 172;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        this.addChildToContainer(buttomBg);
        this._buttomBg = buttomBg;
        var damageTitle = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTitle" + Api.dailybossVoApi.getBossType()), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        damageTitle.lineSpacing = 2;
        damageTitle.width = TextFieldConst.FONTSIZE_BUTTON_COMMON + 4;
        damageTitle.height = this._buttomBg.height;
        damageTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        damageTitle.setPosition(this._buttomBg.x + 20, this._buttomBg.y);
        this.addChildToContainer(damageTitle);
        if (!this._myRankItem) {
            this._myRankItem = ScrollListItem.create(DailybossDamageRankListItem, -1, this._bossData.myrank);
            this._myRankItem.setPosition(55, this._buttomBg.y + this._buttomBg.height - this._myRankItem.height - 10);
            this.addChildToContainer(this._myRankItem);
        }
        var rect = egret.Rectangle.create();
        if (Api.dailybossVoApi.getBossType() == 1) {
            rect.setTo(0, 0, this._buttomBg.width - 60, this._myRankItem.y - this._buttomBg.y + 15);
            this._myRankItem.visible = false;
            this._attackRankList = ComponentManager.getScrollList(DailybossRewardListItem, this._bossData.logInfo, rect);
            this._attackRankList.setPosition(55, this._buttomBg.y + 10);
        }
        else {
            rect.setTo(0, 0, this._buttomBg.width - 60, this._myRankItem.y - this._buttomBg.y - 10);
            this._attackRankList = ComponentManager.getScrollList(DailybossDamageRankListItem, this._bossData.rankList, rect);
            this._attackRankList.setPosition(55, this._buttomBg.y + 10);
            var lookMore = ComponentManager.getButton("dailybossbattle_more", "lookMore", this.damageRankHandler, this);
            lookMore.setPosition(GameConfig.stageWidth - lookMore.width, this._buttomBg.y - lookMore.height + 95);
            this.addChild(lookMore);
        }
        this._attackRankList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
        this.addChildToContainer(this._attackRankList);
    };
    DailybossBattleView.prototype.setAttackRank = function () {
        if (this._attackRankList) {
            if (Api.dailybossVoApi.getBossType() == 1) {
                this._attackRankList.refreshData(this._bossData.logInfo);
            }
            else {
                this._attackRankList.refreshData(this._bossData.rankList);
            }
        }
        if (this._myRankItem) {
            this._myRankItem.refresh(-1, this._bossData.myrank);
        }
    };
    DailybossBattleView.prototype.setDownHero = function (picName, info) {
        if (!this._downHero) {
            this._downHero = new BattleHero();
            this._downHero.init(picName, info, 3, 1);
            this._downHero.setPosition(0, -this.container.y + GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 165);
            // this.addChildToContainer(this._downHero);
            this.container.addChildAt(this._downHero, 0);
            this._downHero.addTouchTap(this.showSelectServantHandler, this);
            this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
            var changePic = BaseBitmap.create("promotion_officerbg1");
            changePic.setPosition(this._downHero.x + (this._downHero.width * this._downHero.scaleX - changePic.width) / 2, this._downHero.y + this._downHero.height * this._downHero.scaleY - changePic.height - 10);
            this.addChildToContainer(changePic);
            this._changePic = changePic;
            var nameTxt = ComponentManager.getTextField(App.StringUtil.formatStringColor(LanguageManager.getlocal("dailybossChangeServantDesc"), TextFieldConst.COLOR_WARN_YELLOW), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            nameTxt.width = changePic.width;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.setPosition(changePic.x, changePic.y + (changePic.height - nameTxt.height) / 2);
            this.addChildToContainer(nameTxt);
            changePic.addTouchTap(this.showSelectServantHandler, this);
            this._changeTxt = nameTxt;
            this._heroRattle = new BattleRattle();
            this._heroRattle.init(this.container, 295, 2);
            this._heroRattle.setPosition(140, this._downHero.y - 30);
        }
        else {
            this._downHero.resetHero(picName);
        }
        if (this._selectServantId) {
            var power = Api.servantVoApi.getServantCombatWithId(String(this._selectServantId));
            var rattleStr = LanguageManager.getlocal("dailybossServantBattleTip", [LanguageManager.getlocal("servant_name" + this._selectServantId), power.toString()]);
            this._heroRattle.resetString(rattleStr, -1);
            this._heroRattle.visible = true;
        }
        else {
            this._heroRattle.visible = false;
        }
    };
    DailybossBattleView.prototype.attackHandle = function (area, damage, isCrit) {
        if (this._isMoving) {
            return;
        }
        if (!this._selectServantId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossNoServantCanBattleDesc"));
        }
        else {
            this.request(NetRequestConst.REQUEST_DAILYBOSS_ATTACK, { servantId: this._selectServantId });
        }
        // this.playAttackEffect();
        //test code
        // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank});
    };
    DailybossBattleView.prototype.showSelectServantHandler = function () {
        var _this = this;
        if (this._allServantInfo == null) {
            this._allServantInfo = {};
            var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
            for (var k in allKey) {
                var key = allKey[k];
                this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
            }
        }
        this._curKey = null;
        this._leftValue = 0;
        var allKeys = Object.keys(this._allServantInfo);
        allKeys.sort(function (a, b) {
            var valueA = Api.dailybossVoApi.checkServantcanStatus(a);
            var valueB = Api.dailybossVoApi.checkServantcanStatus(b);
            if (valueA == valueB) {
                return Number(_this._allServantInfo[b] - _this._allServantInfo[a]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        if (Api.dailybossVoApi.checkServantcanStatus(allKeys[0]) == 0) {
            this._curKey = allKeys[0];
            this._leftValue = this._allServantInfo[this._curKey];
        }
        this._rightValue;
        var showTab = [];
        for (var k in allKeys) {
            var key = allKeys[k];
            showTab.push([key, Api.dailybossVoApi.checkServantcanStatus(key), this._allServantInfo[key]]);
        }
        showTab.sort(function (a, b) {
            var valueA = a[1];
            var valueB = b[1];
            if (valueA == valueB) {
                return Number(b[2] - a[2]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_BATTLE_REC1, "info": showTab, callback: this.selectServantHandler, handler: this });
    };
    DailybossBattleView.prototype.autoSetServant = function () {
        this.setServant(Api.dailybossVoApi.findBestServant(this._bossData.hp));
    };
    DailybossBattleView.prototype.setServant = function (id) {
        this._selectServantId = id;
        var servantCfg = Config.ServantCfg.getServantItemById(this._selectServantId);
        var pic = servantCfg ? servantCfg.fullIcon : null;
        this.setDownHero(pic);
        if (pic) {
            this._attackBtn.visible = true;
        }
    };
    DailybossBattleView.prototype.selectServantHandler = function (params) {
        var servantId = params.key;
        this._selectServantId = servantId;
        this._downHero.resetHero(Config.ServantCfg.getServantItemById(servantId).fullIcon);
        this.setDownHero(Config.ServantCfg.getServantItemById(servantId).fullIcon);
    };
    DailybossBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "promotion_officerbg1", "progress8", "progress7_bg",
            "boss_start_war",
            "boss_start_war_down",
            "dailyboss_kaopao", "dailyboss_defened",
            "dailybossbattle_more", "dailybossbattle_more_down"
        ]);
    };
    DailybossBattleView.prototype.getHitAnimSources = function () {
        return "dailyboss_baozha";
    };
    DailybossBattleView.prototype.getHitAnimInfo = function () {
        return ["dailyboss_baozha_", 9];
    };
    // 标题背景名称
    DailybossBattleView.prototype.getTitleBgName = function () {
        return "commonview_titlebg";
    };
    DailybossBattleView.prototype.getTitleStr = function () {
        return "dailybossTitle";
    };
    DailybossBattleView.prototype.getBgName = function () {
        return "dailyboss_battle_bg";
    };
    DailybossBattleView.prototype.playHitEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_HIT);
    };
    DailybossBattleView.prototype.playFireEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_FIRE);
    };
    DailybossBattleView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS, requestData: {} };
    };
    DailybossBattleView.prototype.receiveData = function (data) {
        // if(data.data.cmd==NetRequestConst.REQUEST_DAILYBOSS_ATTACK)
        // {
        // 	data={ret:true,data:{"uid":1000842,"cmd":"dailyboss.attack","ts":1512216439,"zoneid":1,"data":{"lastReward":{"rewards":"5_1_100","rewardType":1,"score":100,"joinNum":3,"myrank":1},"userinfo":{"politics":10003317,"level":7,"vip":3,"exp":7339,"usegems":3878,"mygname":"","uid":1000842,"gem":10011291,"pic":1,"todayolt":98412,"soldier":1810864767,"freeg":10002589,"lastday":0,"buyn":7,"tcost":0,"mygid":0,"food":942226428,"charm":5010506,"olt":1512216173,"buyg":2580,"vipexp":258,"atk":6799825536,"gold":542670022,"buyt":1511320592,"inte":10897,"totalolt":98412,"title":"","name":"宦清雅","power":6814850256},"dailyboss":{"shop":{},"servant":{"1002":1,"1003":1,"1033":1},"lastday":1512144000,"info":{"lastAttack":1512144000,"damage":4004741362,"lastGet":1512144000},"score":5462,"version":1512190800,"tscore":5462},"bossData":{"totalHp":3500000000,"rewards":"5_1_100","killFlag":true,"myrank":{"uid":1000842,"title":"","myrank":1,"value":4004741362},"isDead":true,"hp":0,"damage":1001045258,"killName":"宦清雅","score":1415,"joinNum":3,"rankList":[{"uid":"1000842","title":"","name":"宦清雅","value":4004741362},{"uid":"1001337","title":"","name":"弓芮","value":440184},{"uid":"1000499","title":"","name":"林蛋大","value":330138}]}},"rnum":8,"ret":0}};
        // }
        if (data.ret) {
            if (data.data.data.bossData) {
                this._bossData = data.data.data.bossData;
            }
            if (data.data.data.lastReward) {
                this._lastReward = data.data.data.lastReward;
            }
            if (this._bossData.myrank == null) {
                this._bossData.myrank = {};
            }
            if (Object.keys(this._bossData.myrank).length < 1) {
                this._bossData.myrank = { uid: Api.playerVoApi.getPlayerID(), title: Api.playerVoApi.getTitleid(), value: 0, myrank: "10000+", name: Api.playerVoApi.getPlayerName() };
            }
            if (this._bossData.myrank.name == null) {
                this._bossData.myrank.name = Api.playerVoApi.getPlayerName();
            }
            if (data.data.cmd == NetRequestConst.REQUEST_DAILYBOSS_ATTACK) {
                this._hasKill = data.data.data.hasKill;
                if (this._hasKill == 1) {
                    ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW, { type: 3, f: this.killBossCallback, o: this });
                    NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS, {});
                    return;
                }
                this._exp = data.data.data.bossData.score;
                this._rewards = data.data.data.bossData.rewards;
                this._dps = data.data.data.bossData.damage;
                this.playAttackEffect();
            }
            else {
                if (data.data.data.rewards) {
                    App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
                }
            }
        }
    };
    DailybossBattleView.prototype.killBossCallback = function () {
        this.refreshUIStatusByAttack();
    };
    DailybossBattleView.prototype.playAttackEffect = function () {
        this._isMoving = true;
        this._attackBtn.visible = false;
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._downHero.x - (scaleBig - 1) * this._downHero.width / 2, this._downHero.y - (scaleBig - 1) * this._downHero.height / 2);
        egret.Tween.get(this._downHero).
            to({ x: moveFirst.x, y: moveFirst.y, scaleX: scaleBig, scaleY: scaleBig }, 300).
            to({ x: this._downHero.x, y: this._downHero.y, scaleX: 1, scaleY: 1 }, 300).call(this.fireEffect, this);
    };
    DailybossBattleView.prototype.fireEffect = function () {
        this._attackEffect = ComponentManager.getCustomMovieClip("dailyboss_kaopao_", 8, 30);
        this._attackEffect.setPosition(this._pao.x + 48, this._pao.y + 11);
        this._attackEffect.setEndCallBack(this.fireCallback, this);
        this._attackEffect.play(1);
        this.addChildToContainer(this._attackEffect);
        this.playFireEffcet();
        this._pao.kaiPao();
        var ths = this;
        var angle = this._pao.getAngle();
        var paodan = BaseBitmap.create("dailybossbattle_paodan");
        paodan.setPosition(this._pao.x + 40, this._pao.y);
        ths.addChildToContainer(paodan);
        App.DisplayUtil.addFactorFunc(BaseBitmap);
        var endPos = egret.Point.create(this._upHero.x + this._upHero.width / 2 - paodan.width / 2, this._upHero.y + this._upHero.height / 2 - paodan.height / 2);
        paodan["tweenMoveList"] = [egret.Point.create(paodan.x, paodan.y), egret.Point.create(paodan.x / 2 + endPos.x / 2 + 80, paodan.y / 2 + endPos.y / 2 - 80), endPos];
        egret.Tween.get(paodan).to({ factor: 1 }, 300).call(function (paodan) {
            if (paodan) {
                paodan["tweenMoveList"] = undefined;
                paodan.dispose();
                ths.showBossBehit();
            }
        }, ths, [paodan]);
    };
    DailybossBattleView.prototype.fireCallback = function () {
        this._attackEffect.dispose();
    };
    DailybossBattleView.prototype.showBossBehit = function () {
        this._heroArray.length = 0;
        this._damage = this._bossData.damage;
        this._area = 1;
        var offsetY;
        var moveY;
        var scaleTo = 0.4;
        var offsetX;
        this._heroArray = [this._downHero, this._upHero];
        this.showBeAttackAnim();
    };
    DailybossBattleView.prototype.atkEndCallback = function () {
        this.refreshUIStatusByAttack();
        if (this._bossData) {
            if (!this._bossData.hp) {
                if (this._bossData.killFlag) {
                    App.MessageHelper.addEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this.checkShowLastRankRewardView, this);
                    ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this._bossData);
                }
                else {
                    this.checkShowLastRankRewardView();
                }
            }
        }
    };
    DailybossBattleView.prototype.showKillBossBattleResult = function () {
        if (!this._killBossContainer) {
            this._killBossContainer = new BaseDisplayObjectContainer();
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 345, 401);
            var killBg = BaseLoadBitmap.create("dailybossbattle_successbg", rect);
            this._killBossContainer.addChild(killBg);
            var killerTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossKillerDesc", [this._bossData.killName]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            killerTxt.lineSpacing = 5;
            killerTxt.textAlign = egret.HorizontalAlign.CENTER;
            killerTxt.setPosition(killBg.x + (killBg.width - killerTxt.width) / 2, killBg.y + 150);
            this._killBossContainer.addChild(killerTxt);
            var personNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossPersonNumDesc", [this._bossData.joinNum.toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            personNumTxt.setPosition(killBg.x + (killBg.width - personNumTxt.width) / 2, killerTxt.y + killerTxt.height + 20);
            this._killBossContainer.addChild(personNumTxt);
            if (!Api.switchVoApi.checkOpenShenhe()) {
                var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "dailybossDamageRankTitle2", this.damageRankHandler, this);
                rankBtn.setPosition(killBg.x + (killBg.width - rankBtn.width) / 2, personNumTxt.y + personNumTxt.height + 25);
                this._killBossContainer.addChild(rankBtn);
                this._killBossContainer.setPosition((GameConfig.stageWidth - this._killBossContainer.width) / 2, (-this.container.y + (GameConfig.stageHeigth - this._killBossContainer.height) / 2));
                this.addChildToContainer(this._killBossContainer);
            }
        }
    };
    DailybossBattleView.prototype.showDefenedWinResult = function () {
        if (!this._defenedWinContainer) {
            this._defenedWinContainer = new BaseDisplayObjectContainer();
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 345, 401);
            var killBg = BaseLoadBitmap.create("dailyboss_defened", rect);
            this._defenedWinContainer.addChild(killBg);
            var killerTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossTitle1"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            killerTxt.lineSpacing = 5;
            killerTxt.textAlign = egret.HorizontalAlign.CENTER;
            killerTxt.setPosition(killBg.x + (killBg.width - killerTxt.width) / 2, killBg.y + 160);
            this._defenedWinContainer.addChild(killerTxt);
            var personNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDefendWin"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
            personNumTxt.setPosition(killBg.x + (killBg.width - personNumTxt.width) / 2, killerTxt.y + killerTxt.height + 20);
            this._defenedWinContainer.addChild(personNumTxt);
            // let rankBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"close",this.hide,this);
            // rankBtn.setPosition(killBg.x+(killBg.width-rankBtn.width)/2,personNumTxt.y+personNumTxt.height+55);
            // this._defenedWinContainer.addChild(rankBtn);
            this._defenedWinContainer.setPosition((GameConfig.stageWidth - this._defenedWinContainer.width) / 2, (-this.container.y + (GameConfig.stageHeigth - this._defenedWinContainer.height) / 2));
            this.addChildToContainer(this._defenedWinContainer);
        }
    };
    DailybossBattleView.prototype.damageRankHandler = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKPOPUPVIEW,this._bossData);
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW, { rankList: this._bossData.rankList, myrank: this._bossData.myrank });
    };
    DailybossBattleView.prototype.refreshUIStatusByAttack = function () {
        this.setAttackRank();
        var oo = null;
        var ff = null;
        if (this.getBossType() == 2 && !this._bossData.hp) {
            if (this._upHero) {
                this._upHero.visible = false;
            }
            if (this._topProgress) {
                this._topProgress.visible = false;
            }
            if (this._nameBg) {
                this._nameBg.visible = false;
            }
            if (this._nameTxt) {
                this._nameTxt.visible = false;
            }
            if (this._attackBtn) {
                this._attackBtn.visible = false;
            }
            if (this._downHero) {
                this._downHero.visible = false;
            }
            if (this._pao) {
                this._pao.visible = false;
            }
            if (this._changePic) {
                this._changePic.visible = false;
            }
            if (this._changeTxt) {
                this._changeTxt.visible = false;
            }
            if (this._heroRattle) {
                this._heroRattle.visible = false;
            }
            this.showKillBossBattleResult();
        }
        else {
            if (this._bossData.bossLv > this._maxRound) {
                oo = this;
                ff = this.showDefenedWinResult;
                this._topProgress.visible = false;
                this._upHero.visible = false;
                this._attackBtn.visible = false;
                this._pao.visible = false;
                this._downHero.visible = false;
                this._changePic.visible = false;
                this._heroRattle.visible = false;
                this._changeTxt.visible = false;
                this._nameTxt.visible = false;
                this._nameBg.visible = false;
            }
            else {
                this.setTopProgress(this._bossData.hp, this._bossData.totalHp);
                this.autoSetServant();
            }
        }
        this.setBossUIStatus();
        if (this.getBossType() == 1 && this._bossData.isDead) {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW, { info: this._bossData, f: ff, o: oo });
        }
        else if (this.getBossType() == 2) {
            if (this._bossData.killFlag) {
                // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:1,  damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW, { type: 2, damage: this._dps, exp: this._exp });
            }
        }
    };
    DailybossBattleView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.autoSetServant, this);
        App.MessageHelper.removeEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this.checkShowLastRankRewardView, this);
        this._bossData = null;
        this._buttomBg = null;
        this._attackBtn = null;
        this._pao = null;
        this._selectServantId = null;
        this._attackRankList = null;
        this._myRankItem = null;
        this._nameBg = null;
        this._nameTxt = null;
        this._killBossContainer = null;
        this._bossImg = null;
        this._heroRattle = null;
        this._attackEffect = null;
        this._hasKill = null;
        this._dps = 0;
        this._exp = 0;
        this._rewards = null;
        this._allServantInfo = null;
        this._defenedWinContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossBattleView;
}(BaseBattleView));
__reflect(DailybossBattleView.prototype, "DailybossBattleView");
var DailybossDamageRankListItem = (function (_super) {
    __extends(DailybossDamageRankListItem, _super);
    function DailybossDamageRankListItem() {
        return _super.call(this) || this;
    }
    DailybossDamageRankListItem.prototype.initItem = function (index, data) {
        var color = (data.myrank == null ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_LIGHT_YELLOW);
        var nameTxt = ComponentManager.getTextField((data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        nameTxt.y = 5;
        var valueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageValueDesc", [data.value.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        valueTxt.setPosition(360, 0);
        this.addChild(valueTxt);
        this._valueTxt = valueTxt;
        valueTxt.y = 5;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            valueTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        if (data.title) {
            var titleIcon = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
            titleIcon.setScale(0.6);
            titleIcon.setPosition(220, titleIcon.height / 2 - 5);
            this.addChild(titleIcon);
            this._titleIcon = titleIcon;
        }
        this.width = 500;
    };
    DailybossDamageRankListItem.prototype.refresh = function (index, data) {
        if (this._nameTxt) {
            this._nameTxt.text = (data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name;
        }
        if (this._valueTxt) {
            this._valueTxt.text = LanguageManager.getlocal("dailybossDamageValueDesc", [data.value.toString()]);
        }
        if (data.title) {
            if (this._titleIcon) {
                this._titleIcon.setload(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
            }
            else {
                var titleIcon = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
                titleIcon.setScale(0.6);
                titleIcon.setPosition(220, 3);
                this.addChild(titleIcon);
                this._titleIcon = titleIcon;
            }
        }
    };
    DailybossDamageRankListItem.prototype.dipose = function () {
        this._nameTxt = null;
        this._titleIcon = null;
        this._valueTxt = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossDamageRankListItem;
}(ScrollListItem));
__reflect(DailybossDamageRankListItem.prototype, "DailybossDamageRankListItem");

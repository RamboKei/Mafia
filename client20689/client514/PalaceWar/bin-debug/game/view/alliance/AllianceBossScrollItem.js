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
 *副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossScrollItem
 */
var AllianceBossScrollItem = (function (_super) {
    __extends(AllianceBossScrollItem, _super);
    function AllianceBossScrollItem() {
        var _this = _super.call(this) || this;
        _this._bossCfgData = null;
        return _this;
    }
    AllianceBossScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS), this.openBtnHandlerCallBack, this);
        this._bossId = data;
        this._bossCfgData = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);
        var bg = BaseBitmap.create("allianceBossbg");
        this.addChild(bg);
        var monsterImg = BaseLoadBitmap.create("alliance_monster" + this._bossCfgData.bossPic);
        monsterImg.width = 405;
        monsterImg.height = 467;
        var scaV = 0.5;
        monsterImg.setScale(scaV);
        monsterImg.x = 132 - monsterImg.width / 2 * scaV;
        monsterImg.y = bg.height / 2 - monsterImg.height / 2 * scaV;
        this.addChild(monsterImg);
        var nameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.textColor = 0xFCD64A;
        nameTF.text = LanguageManager.getlocal("allianceBoss_monsterName" + (this._bossId));
        nameTF.x = 265;
        nameTF.y = 35;
        this.addChild(nameTF);
        var rewardTF = ComponentManager.getTextField("", 18);
        rewardTF.text = LanguageManager.getlocal("allianceBoss_rewardTxt");
        rewardTF.x = nameTF.x;
        rewardTF.y = nameTF.y + 30;
        this.addChild(rewardTF);
        var rewardTF2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        rewardTF2.text = LanguageManager.getlocal("allianceBoss_rewardTxt2", [this._bossCfgData.addAsset, this._bossCfgData.addExp]);
        rewardTF2.x = rewardTF.x + rewardTF.width;
        rewardTF2.y = rewardTF.y;
        this.addChild(rewardTF2);
        //伤害排行
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "allianceBoss_btn1", this.rankBtnhandler, this);
        rankBtn.x = bg.width - 143 - rankBtn.width;
        rankBtn.y = 156;
        this.addChild(rankBtn);
        this._rankBtn = rankBtn;
        if (Api.switchVoApi.checkOpenShenhe() && this._rankBtn) {
            this._rankBtn.visible = false;
        }
        //进入副本
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBoss_btn2", this.enterBtnhandler, this);
        enterBtn.x = bg.width - 143 + 5;
        enterBtn.y = 156; //rankBtn.y;
        this.addChild(enterBtn);
        this._enterBtn = enterBtn;
        var logBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBoss_btn3", this.logBtnhandler, this);
        logBtn.x = bg.width - 143 - logBtn.width / 2;
        logBtn.y = 156;
        this.addChild(logBtn);
        this._logBtn = logBtn;
        if (Api.switchVoApi.checkOpenShenhe()) {
            this._logBtn.visible = false;
        }
        var openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBoss_btn4", this.openBtnhandler, this);
        openBtn.x = logBtn.x;
        openBtn.y = logBtn.y;
        this.addChild(openBtn);
        this._openBtn = openBtn;
        this._cdTxt = ComponentManager.getTextField("", 18);
        this._cdTxt.text = this.getEndStr();
        this._cdTxt.x = bg.width - 148 - this._cdTxt.width / 2 - 10;
        this._cdTxt.y = this._openBtn.y + 57;
        this._cdTxt.visible = false;
        this.addChild(this._cdTxt);
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 510);
        progress.x = 5;
        progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1", ["100"]));
        progress.y = bg.height - 35;
        this._progress = progress;
        this.addChild(progress);
        this._mask = BaseBitmap.create("alliance_effect");
        this._mask.width = bg.width;
        this._mask.height = bg.height;
        this._mask.visible = false;
        this.addChild(this._mask);
        /**
         * 23:30 以后
         */
        var lastS = GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime);
        if (lastS > 84600) {
            openBtn.setEnable(false);
            enterBtn.setEnable(false);
        }
        else {
            openBtn.setEnable(true);
            enterBtn.setEnable(true);
        }
        TimerManager.doTimer(1000, 0, this.tick, this);
        this.refreshUI();
    };
    AllianceBossScrollItem.prototype.refreshUI = function () {
        var alliVo = Api.allianceVoApi.getAllianceVo();
        this._cdTxt.visible = false;
        this._leftHp = 0;
        if (this._bossCfgData.needAllianceLv <= alliVo.level) {
            var boss = alliVo.boss;
            var leftHp = boss[this._bossCfgData.id];
            this._leftHp = leftHp;
            if (leftHp != null) {
                this._openBtn.visible = false;
                var perc = leftHp / this._bossCfgData.bossHp;
                this._progress.setPercentage(perc);
                if (leftHp == 0) {
                    this._mask.visible = false;
                    if (!Api.switchVoApi.checkOpenShenhe()) {
                        this._logBtn.visible = true;
                    }
                    this._rankBtn.visible = false;
                    this._enterBtn.visible = false;
                    this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt2"));
                }
                else {
                    this._mask.visible = true;
                    this._logBtn.visible = false;
                    if (!Api.switchVoApi.checkOpenShenhe()) {
                        this._rankBtn.visible = true;
                    }
                    this._enterBtn.visible = true;
                    this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1", [(perc * 100).toFixed(0) + "%"]));
                    this._cdTxt.visible = true;
                }
            }
            else {
                this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1", ["100%"]));
                this._progress.setPercentage(1.0);
                this._openBtn.visible = true;
                this._logBtn.visible = false;
                this._rankBtn.visible = false;
                this._enterBtn.visible = false;
                this._mask.visible = false;
            }
        }
        else {
            this._logBtn.visible = false;
            this._enterBtn.visible = false;
            this._rankBtn.visible = false;
            this._openBtn.visible = true;
        }
    };
    AllianceBossScrollItem.prototype.getEndStr = function () {
        var ZeroStr = App.DateUtil.getWeeTs(GameData.serverTime) + 84600 - GameData.serverTime;
        if (ZeroStr >= 0) {
            var timeStr = App.DateUtil.getFormatBySecond(ZeroStr, 8);
            return LanguageManager.getlocal("allianceBoss_endTimeStr", [timeStr]);
        }
        else {
            return "";
        }
    };
    AllianceBossScrollItem.prototype.tick = function () {
        var str = this.getEndStr();
        if (str != "" && this._leftHp > 0) {
            this._cdTxt.text = this.getEndStr();
            this._cdTxt.visible = true;
            return true;
        }
        else {
            this._cdTxt.visible = false;
            return false;
        }
    };
    AllianceBossScrollItem.prototype.openBtnHandlerCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            this.refreshUI();
        }
    };
    AllianceBossScrollItem.prototype.openBtnhandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSOPENPOPUPVIEW, this._bossId);
    };
    AllianceBossScrollItem.prototype.rankBtnhandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW, this._bossId);
    };
    AllianceBossScrollItem.prototype.enterBtnhandler = function () {
        // NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{bossId:String(this._itemIndex+1),servantId:"1001"});
        ViewController.getInstance().openView(ViewConst.BATTLE.ALLIANCEBOSSBATTLEVIEW, { idx: this._bossId, f: this.refreshUI, o: this });
    };
    AllianceBossScrollItem.prototype.logBtnhandler = function () {
        // NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG,{bossId:String(this._itemIndex+1)});
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW, this._bossId);
    };
    AllianceBossScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceBossScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS), this.openBtnHandlerCallBack, this);
        TimerManager.remove(this.tick, this);
        this._bossCfgData = null;
        this._bossId = null;
        this._mask = null;
        this._logBtn = null;
        this._enterBtn = null;
        this._rankBtn = null;
        this._openBtn = null;
        this._progress = null;
        this._cdTxt = null;
        this._leftHp = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossScrollItem;
}(ScrollListItem));
__reflect(AllianceBossScrollItem.prototype, "AllianceBossScrollItem");

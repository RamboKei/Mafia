/**
 * 战斗中 玩家 或 npc 信息小板
 * author shaoliang
 * date 2017/9/21
 * @class BattleInfo
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
var BattleInfo = (function (_super) {
    __extends(BattleInfo, _super);
    function BattleInfo() {
        return _super.call(this) || this;
    }
    /**
     * 初始化
     * 总的兵力
     * @param params 信息 自己不传，npc传。
     */
    BattleInfo.prototype.init = function (totalNum, params, info) {
        this._totalNum = totalNum;
        if (!params) {
            this._isHero = false;
        }
        else {
            this._isHero = true;
        }
        var scale9Bg = BaseBitmap.create("battle_info_bg");
        this.addChild(scale9Bg);
        var forceNum;
        var progressBarPic;
        var nameStr;
        var officerTitleStr;
        var show;
        if (this._isHero) {
            forceNum = Api.playerVoApi.getAtk();
            progressBarPic = "battle_hero_bar";
            nameStr = Api.playerVoApi.getPlayerName();
            officerTitleStr = Api.playerVoApi.getPlayerOffice();
        }
        else {
            if (info) {
                show = info.show;
                forceNum = Math.ceil(this._totalNum / 10);
                officerTitleStr = LanguageManager.getlocal("dailybossNameType1", [String(info.cid)]);
                nameStr = LanguageManager.getlocal("BossName" + show);
            }
            else {
                var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
                show = challengeConfig.show;
                forceNum = challengeConfig.atk;
                officerTitleStr = LanguageManager.getlocal("nothing");
                nameStr = LanguageManager.getlocal("npcName" + show);
            }
            progressBarPic = "battle_npc_bar";
        }
        var headContainer;
        var preX = 0;
        if (this._isHero) {
            headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
            preX = 98;
            headContainer.setPosition(0, 0);
            scale9Bg.scaleX = -1;
            scale9Bg.setPosition(headContainer.width / 2 + scale9Bg.width, (headContainer.height - scale9Bg.height) / 2 - 3);
        }
        else {
            headContainer = new BaseDisplayObjectContainer();
            var myBody = BaseBitmap.create("head_circle_bg");
            headContainer.addChild(myBody);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 120, 120);
            this._npcHead = BaseLoadBitmap.create("prison_icon" + show, rect);
            this._npcHead.scaleX = 100 / this._npcHead.width;
            this._npcHead.scaleY = 100 / this._npcHead.height;
            this._npcHead.x = -5;
            this._npcHead.y = 1;
            headContainer.addChild(this._npcHead);
            preX = 14;
            scale9Bg.setPosition(0, (headContainer.height - scale9Bg.height) / 2 - 3);
            headContainer.setPosition(scale9Bg.width - headContainer.width / 2, 0);
        }
        this.addChild(headContainer);
        var soldierText = ComponentManager.getTextField(LanguageManager.getlocal("soldier"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        soldierText.x = preX;
        soldierText.y = 62 + 2;
        this.addChild(soldierText);
        this._progressBar = ComponentManager.getProgressBar(progressBarPic, "exp_progress_bg", 245);
        this._progressBar.x = preX + soldierText.width + 5;
        this._progressBar.y = soldierText.y;
        this._progressBar.setTextSize(18);
        this.addChild(this._progressBar);
        this._name = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._name.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._name.x = preX;
        this._name.y = 9 + 2;
        this.addChild(this._name);
        this._force = ComponentManager.getTextField(LanguageManager.getlocal("force") + ":  " + forceNum, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // force.textColor = TextFieldConst.COLOR_YELLOW;
        this._force.x = preX;
        this._force.y = 35 + 2;
        this.addChild(this._force);
        var officerTitle = ComponentManager.getTextField(officerTitleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        officerTitle.textColor = TextFieldConst.COLOR_WARN_GREEN;
        officerTitle.x = preX + 310 - officerTitle.width;
        officerTitle.y = this._name.y;
        this.addChild(officerTitle);
    };
    Object.defineProperty(BattleInfo.prototype, "curNumber", {
        set: function (v) {
            this._curNum = v;
            this._progressBar.setText(this._curNum.toString());
            this._progressBar.setPercentage(v / this._totalNum);
        },
        enumerable: true,
        configurable: true
    });
    BattleInfo.prototype.resetInfo = function (v) {
        this._totalNum = v;
        if (this._isHero) {
        }
        else {
            var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
            var nameStr = LanguageManager.getlocal("npcName" + challengeConfig.show);
            this._name.text = nameStr;
            var forceNum = challengeConfig.atk;
            this._force.text = LanguageManager.getlocal("force") + ":  " + forceNum;
            this._npcHead.setload("prison_icon" + challengeConfig.show);
        }
    };
    BattleInfo.prototype.dispose = function () {
        this._totalNum = null;
        this._curNum = null;
        this._progressBar = null;
        this._force = null;
        this._name = null;
        this._npcHead = null;
        _super.prototype.dispose.call(this);
    };
    return BattleInfo;
}(BaseDisplayObjectContainer));
__reflect(BattleInfo.prototype, "BattleInfo");

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
var EmperorwarBattleView = (function (_super) {
    __extends(EmperorwarBattleView, _super);
    function EmperorwarBattleView() {
        var _this = _super.call(this) || this;
        _this._leftHeadTab = [];
        _this._rightHeadTab = [];
        _this._roundText = null;
        _this._curRound = 1;
        _this._leftMaskTab = [];
        _this._rightMaskTab = [];
        return _this;
    }
    EmperorwarBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperor_battle_lost_bg", "emperor_battle_lost", "emperor_battle_round", "emperor_battle_top_bg", "emperor_battle_win_bg", "emperor_battle_win", "emperor_hero_bg",
            "emperor_hero_empty", "emperor_round_1", "emperor_round_2", "emperor_round_3", "emperor_round_4", "emperor_round_5",
        ]);
    };
    EmperorwarBattleView.prototype.getBgName = function () {
        return "arena_bg";
    };
    EmperorwarBattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, 0);
            this.addChild(this.viewBg);
        }
    };
    EmperorwarBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    EmperorwarBattleView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorwarBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorwarBattleView.prototype.initView = function () {
        this.initTopInfo();
    };
    EmperorwarBattleView.prototype.initTopInfo = function () {
        var topBg = BaseBitmap.create("emperor_battle_top_bg");
        this.addChild(topBg);
        var playerHead1 = Api.playerVoApi.getPlayerCircleHead(1, "-1");
        playerHead1.setPosition(8, 8);
        this.addChild(playerHead1);
        var playerHead2 = Api.playerVoApi.getPlayerCircleHead(1, "-1");
        playerHead2.setPosition(GameConfig.stageWidth - playerHead1.x - playerHead2.width, playerHead1.y);
        this.addChild(playerHead2);
        this._leftHeadTab.push(playerHead1);
        this._rightHeadTab.push(playerHead2);
        var maskHead1 = BaseBitmap.create("public_9_bg11");
        maskHead1.width = playerHead1.width;
        maskHead1.height = playerHead1.height - 10;
        maskHead1.x = playerHead1.x;
        maskHead1.y = playerHead1.y;
        this.addChild(maskHead1);
        var maskHead2 = BaseBitmap.create("public_9_bg11");
        maskHead2.width = playerHead2.width;
        maskHead2.height = playerHead2.height - 10;
        maskHead2.x = playerHead2.x;
        maskHead2.y = playerHead2.y;
        this.addChild(maskHead2);
        this._leftMaskTab.push(maskHead1);
        this._rightMaskTab.push(maskHead2);
        for (var i = 0; i < 4; i++) {
            var leftHeroContainer = new BaseDisplayObjectContainer();
            leftHeroContainer.setPosition(107 + i * 45, 8);
            this.addChild(leftHeroContainer);
            var heroBg = BaseBitmap.create("emperor_hero_bg");
            leftHeroContainer.addChild(heroBg);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 180, 177);
            var servantIcon = BaseLoadBitmap.create("servant_half_1006", rect);
            servantIcon.setScale((heroBg.height - 4) / servantIcon.height);
            servantIcon.setPosition(-64 * servantIcon.scaleX, 2);
            var mask = egret.Rectangle.create();
            mask.setTo(90 - heroBg.width / 2, 0, (heroBg.width - 4) / servantIcon.scaleX, (heroBg.height - 5) / servantIcon.scaleY);
            servantIcon.mask = mask;
            leftHeroContainer.addChild(servantIcon);
            this._leftHeadTab.push(leftHeroContainer);
            var maskHero1 = BaseBitmap.create("public_9_bg11");
            maskHero1.width = heroBg.width;
            maskHero1.height = heroBg.height;
            maskHero1.x = heroBg.x;
            maskHero1.y = heroBg.y;
            leftHeroContainer.addChild(maskHero1);
        }
        var roundBg = BaseBitmap.create("emperor_battle_round");
        roundBg.setPosition(GameConfig.stageWidth / 2 - roundBg.width / 2, 0);
        this.addChild(roundBg);
        this._roundText = ComponentManager.getBitmapText("2", TextFieldConst.FONTNAME_BOSS_SCORE);
        this._roundText.setPosition(GameConfig.stageWidth / 2 - this._roundText.width / 2, 45);
        this.addChild(this._roundText);
    };
    EmperorwarBattleView.prototype.dispose = function () {
        this._leftHeadTab.length = 0;
        this._rightHeadTab.length = 0;
        this._leftMaskTab.length = 0;
        this._rightMaskTab.length = 0;
        this._roundText = null;
        this._curRound = 0;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarBattleView;
}(BaseBattleView));
__reflect(EmperorwarBattleView.prototype, "EmperorwarBattleView");

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
var BattleHero = (function (_super) {
    __extends(BattleHero, _super);
    function BattleHero() {
        var _this = _super.call(this) || this;
        _this._type = 0; // 2 关卡boos战  3 副本 
        _this._servantFullImg = null;
        _this._infoContainer = null;
        _this._textArray = [];
        _this._picName = '';
        _this._rect = null;
        _this._tmpMap1 = null;
        _this._tmpMap2 = null;
        _this._tmpMap3 = null;
        return _this;
    }
    Object.defineProperty(BattleHero.prototype, "tmpMap", {
        get: function () {
            return this._tmpMap3;
        },
        enumerable: true,
        configurable: true
    });
    BattleHero.prototype.init = function (heroPic, info, type, area) {
        if (type != null) {
            this._type = type;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 405 * 0.8, 467 * 0.8);
        if (this._type == 3) {
            rect.setTo(0, 0, 405 * 0.6, 467 * 0.6);
        }
        this._rect = rect;
        if (heroPic == null) {
            heroPic = "servant_empty";
        }
        this._picName = heroPic;
        this._servantFullImg = BaseLoadBitmap.create(heroPic, rect);
        this.addChild(this._servantFullImg);
        if (info && this._type == 0) {
            var infoBg = void 0;
            infoBg = BaseBitmap.create("atkrace_battle_info");
            infoBg.y = this._servantFullImg.height - infoBg.height + 10;
            this.addChild(infoBg);
            var level = info.level;
            var levelText = ComponentManager.getBitmapText(level.toString(), TextFieldConst.FONTNAME_BOSS_SCORE);
            levelText.setScale(0.9);
            levelText.setPosition(48 - levelText.width / 2 * levelText.scaleX, infoBg.y + 40);
            this.addChild(levelText);
            var servantName = ComponentManager.getTextField(info.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            servantName.setPosition(95, infoBg.y + 20);
            this.addChild(servantName);
            var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            infoDesc1.setPosition(servantName.x, servantName.y + servantName.height + 3);
            this.addChild(infoDesc1);
            var ability = info.ability;
            var infoText1 = ComponentManager.getTextField(ability.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
            this.addChild(infoText1);
        }
        else if (info && this._type == 2) {
            this._infoContainer = new BaseDisplayObjectContainer();
            this.addChild(this._infoContainer);
            var buttomBg = BaseBitmap.create("public_9_downbg");
            buttomBg.width = 270;
            this._infoContainer.x = this._servantFullImg.width / 2 - buttomBg.width / 2;
            this._infoContainer.addChild(buttomBg);
            var idx = 0;
            for (var k in info) {
                var v = info[k];
                var infoText = ComponentManager.getTextField(v[0], TextFieldConst.FONTSIZE_CONTENT_SMALL, v[1]);
                infoText.setPosition(buttomBg.width / 2 - infoText.width / 2, 10 + idx * 30);
                this._infoContainer.addChild(infoText);
                idx++;
                this._textArray.push(infoText);
            }
            buttomBg.height = 10 + idx * 30;
            this._infoContainer.y = this._servantFullImg.height - buttomBg.height;
            if ("servant_empty" == heroPic) {
                this._infoContainer.visible = false;
            }
        }
        if (this._type != 3) {
            this.addHeroFilter(area);
        }
    };
    BattleHero.prototype.resetHero = function (pic, power) {
        if (pic) {
            this._servantFullImg.setload(pic);
            this._picName = pic;
            if (this._type == 2) {
                if (this._infoContainer) {
                    this._infoContainer.visible = true;
                }
                if (power) {
                    this.resetInfoText(LanguageManager.getlocal("fightForce") + ":" + power);
                }
            }
        }
        else {
            if (this._infoContainer) {
                this._infoContainer.visible = false;
            }
            this._picName = 'servant_empty';
            this._servantFullImg.setload("servant_empty");
        }
        this.addHeroFilter(1);
    };
    BattleHero.prototype.resetInfoText = function (s, idx) {
        if (idx === void 0) { idx = 0; }
        this._textArray[idx].text = s;
        this._textArray[idx].x = this._infoContainer.width / 2 - this._textArray[idx].width / 2;
    };
    BattleHero.prototype.setMaskOffSet = function () {
        this._tmpMap1.alpha = 0.8;
        this._tmpMap2.alpha = 0.4;
        this._tmpMap3.alpha = 0;
    };
    BattleHero.prototype.resetMaskOffSet = function () {
        egret.Tween.get(this._tmpMap1).to({ x: 0, y: 0, alpha: 0 }, 100);
        egret.Tween.get(this._tmpMap2).to({ x: 0, y: 0, alpha: 0 }, 150);
    };
    BattleHero.prototype.addHeroFilter = function (area) {
        //遮罩
        var mycolor_matrix = [[
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 50,
                0, 0, 0, 1, 0
            ], [
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 30,
                0, 0, 0, 1, 0
            ], [
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 50,
                0, 0, 0, 1, 0
            ]];
        var enermycolor_matrix = [[
                1, 0, 0, 0, 50,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ], [
                1, 0, 0, 0, 30,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ], [
                1, 0, 0, 0, 50,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ]];
        for (var i = 1; i < 4; ++i) {
            var selefmap = this["_tmpMap" + i];
            if (selefmap) {
                selefmap.setload(this._picName);
                selefmap = null;
            }
            else {
                var temp = BaseLoadBitmap.create(this._picName);
                temp.width = this._rect.width;
                temp.height = this._rect.height;
                this.addChild(temp);
                temp.cacheAsBitmap = true;
                var color_matrix = area == 1 ? mycolor_matrix : enermycolor_matrix;
                var colorFlilter = new egret.ColorMatrixFilter(color_matrix[i - 1]);
                temp.filters = [colorFlilter];
                colorFlilter = null;
                this["_tmpMap" + i] = temp;
            }
        }
        mycolor_matrix = enermycolor_matrix = null;
        var maxIndex = this.numChildren;
        this.setChildIndex(this._tmpMap1, maxIndex);
        var baseIndex = this.getChildIndex(this._servantFullImg);
        this.setChildIndex(this._tmpMap1, Math.max(0, baseIndex - 1));
        this.setChildIndex(this._tmpMap2, Math.max(0, baseIndex - 2));
        this.setChildIndex(this._tmpMap3, baseIndex + 3);
        this._tmpMap1.x = -20;
        this._tmpMap1.y = -40;
        this._tmpMap1.alpha = 0;
        this._tmpMap2.x = -40;
        this._tmpMap2.y = -80;
        this._tmpMap2.alpha = 0;
        this._tmpMap3.x = 0;
        this._tmpMap3.y = 0;
        this._tmpMap3.alpha = 0;
    };
    BattleHero.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._servantFullImg = null;
        this._type = null;
        this._infoContainer = null;
        this._textArray.length = 0;
        this._picName = '';
        this._rect = null;
        for (var i = 1; i < 4; ++i) {
            if (this["_tmpMap" + i]) {
                this.removeChild(this["_tmpMap" + i]);
                BaseLoadBitmap.release(this["_tmpMap" + i]);
                this["_tmpMap" + i].filters = null;
                this["_tmpMap" + i] = null;
            }
        }
        _super.prototype.dispose.call(this);
    };
    return BattleHero;
}(BaseDisplayObjectContainer));
__reflect(BattleHero.prototype, "BattleHero");

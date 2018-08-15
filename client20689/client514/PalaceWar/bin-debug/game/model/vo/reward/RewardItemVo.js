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
 * 奖励物品vo
 * author dmj
 * date 2017/9/26
 * @class RewardItemVo
 */
var RewardItemVo = (function (_super) {
    __extends(RewardItemVo, _super);
    function RewardItemVo() {
        var _this = _super.call(this) || this;
        /**
         * 奖励物品类型：1 元宝  2 银两  3 粮食  4 士兵 5 政绩  6 道具  7 门客属性 8 门客  9亲密度 10红颜  11 称号  12红颜魅力 13 红颜经验值 14 门客书籍经验  15  门客技能经验
         */
        _this.type = 0;
        /**
         * 物品id
         */
        _this.id = 0;
        /**
         * 数量
         */
        _this.num = 0;
        _this._name = "";
        _this._tipName = "";
        _this._desc = "";
        _this._icon = "";
        _this._iconbg = "";
        // 品质
        _this._quality = 1;
        return _this;
    }
    RewardItemVo.prototype.initData = function (data) {
        var itemArr = data.split("_");
        this.type = Number(itemArr[0]);
        this.id = Number(itemArr[1]);
        this.num = Number(itemArr[2]);
        var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
        this._tipName = "";
        if (this.type == 1) {
            this._name = LanguageManager.getlocal("gemName");
            this._icon = "itemicon1";
        }
        else if (this.type == 2) {
            this._name = LanguageManager.getlocal("playerview_gold").replace(":  ", "");
            this._icon = "itemicon2";
        }
        else if (this.type == 3) {
            this._name = LanguageManager.getlocal("playerview_food").replace(":  ", "");
            this._icon = "itemicon3";
        }
        else if (this.type == 4) {
            this._name = LanguageManager.getlocal("playerview_soldier").replace(":  ", "");
            this._icon = "itemicon4";
        }
        else if (this.type == 5) {
            this._name = LanguageManager.getlocal("playerview_exp").replace(":  ", "");
            this._icon = "itemicon5";
        }
        else if (this.type == 6) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
        }
        else if (this.type == 7) {
            if (this.id == 1) {
                this._name = LanguageManager.getlocal("playerview_forceAtt").replace(":  ", "");
            }
            else if (this.id == 2) {
                this._name = LanguageManager.getlocal("playerview_inteAtt").replace(":  ", "");
            }
            else if (this.id == 3) {
                this._name = LanguageManager.getlocal("playerview_policyAtt").replace(":  ", "");
            }
            else if (this.id == 4) {
                this._name = LanguageManager.getlocal("playerview_charmAtt").replace(":  ", "");
            }
            this._tipName = this._name;
        }
        else if (this.type == 8) {
            this._icon = "servant_half_" + this.id;
            this._name = LanguageManager.getlocal("servant_name" + this.id);
        }
        else if (this.type == 9) {
            this._name = LanguageManager.getlocal("wifeIntimacy").replace(" :", "");
            this._tipName = this._name;
        }
        else if (this.type == 10) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
                this._name = wifeCfg.name;
            }
        }
        else if (this.type == 11) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
            itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
        }
        else if (this.type == 12) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            this._name = LanguageManager.getlocal("wifeCharm").replace(" :", "");
            this._tipName = this._name;
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
            }
        }
        else if (this.type == 13) {
            this._name = LanguageManager.getlocal("wifeExp").replace(" :", "");
            this._tipName = this._name;
        }
        else if (this.type == 14) {
            if (this.id > 10) {
                var itemCfg_1 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_1.halfIcon;
            }
            else {
                this._icon = "itemicon14";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 15) {
            if (this.id > 10) {
                var itemCfg_2 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_2.halfIcon;
            }
            else {
                this._icon = "itemicon15";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 16) {
            var itemCfg_3 = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
            this._icon = itemCfg_3.icon;
            this._name = itemCfg_3.name;
        }
        else if (this.type == 17) {
            this._icon = "itemicon17";
            this._name = LanguageManager.getlocal("itemName_17");
        }
        this._quality = (itemCfg ? itemCfg.quality : 1);
        this._iconbg = "itembg_" + this._quality;
        if (this.type == 8) {
            this._iconbg = "itembg_" + 7;
        }
        if (this.type == 14 || this.type == 15) {
            this._iconbg = "itembg_" + 1;
        }
    };
    Object.defineProperty(RewardItemVo.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "nameColor", {
        /**根据品质取颜色 */
        get: function () {
            var color = TextFieldConst.COLOR_QUALITY_WHITE;
            if (this._quality == 2) {
                color = TextFieldConst.COLOR_QUALITY_GREEN;
            }
            else if (this._quality == 3) {
                color = TextFieldConst.COLOR_QUALITY_BLUE;
            }
            else if (this._quality == 4) {
                color = TextFieldConst.COLOR_QUALITY_PURPLE;
            }
            else if (this._quality == 5) {
                color = TextFieldConst.COLOR_QUALITY_ORANGE;
            }
            return color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "iconBg", {
        get: function () {
            return this._iconbg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "message", {
        get: function () {
            return this.name + (this.num < 0 ? this.num : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "tipMessage", {
        get: function () {
            return this._tipName + (this.num < 0 ? String(this.num) : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "desc", {
        get: function () {
            var desc = "";
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 10) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = wifeCfg.name + "*1";
            }
            else if (this.type == 11) {
                var itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 12) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = LanguageManager.getlocal("itemDesc_12", [wifeCfg.name]);
            }
            else if (this.type == 14) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_14", [itemCfg.name]);
            }
            else if (this.type == 15) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_15", [itemCfg.name]);
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                desc = itemCfg.desc2;
            }
            else {
                desc = LanguageManager.getlocal("itemDesc_" + this.type);
            }
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "dropDesc", {
        get: function () {
            var dropDesc = "";
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 10) {
                dropDesc = LanguageManager.getlocal("wifeDropDesc_" + this.id);
            }
            else if (this.type == 11) {
                var itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                dropDesc = itemCfg.dropDesc;
            }
            else {
                dropDesc = LanguageManager.getlocal("itemDropDesc_" + this.type);
            }
            return dropDesc;
        },
        enumerable: true,
        configurable: true
    });
    RewardItemVo.prototype.dispose = function () {
        this.type = 0;
        this.id = 0;
        this.num = 0;
        this._name = "";
        this._tipName = "";
        this._desc = "";
        this._icon = "";
        this._iconbg = "";
        this._quality = 1;
    };
    return RewardItemVo;
}(BaseVo));
__reflect(RewardItemVo.prototype, "RewardItemVo");

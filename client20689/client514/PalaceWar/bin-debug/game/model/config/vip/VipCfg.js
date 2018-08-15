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
var Config;
(function (Config) {
    /**
     * Vip配置
     */
    var VipCfg;
    (function (VipCfg) {
        var vipList = {};
        var maxLevel;
        var vipLength;
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!vipList.hasOwnProperty(String(key))) {
                    vipList[String(key)] = new VipItemCfg();
                }
                itemCfg = vipList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.level = Number(key);
            }
        }
        VipCfg.formatData = formatData;
        /**
         *  根据vip等级获取对应配置
         * @param vipLevel vip等级
         */
        function getVipCfgByLevel(vipLevel) {
            return vipList[String(vipLevel)];
        }
        VipCfg.getVipCfgByLevel = getVipCfgByLevel;
        function getvipLength(vipLevel) {
            return vipLength;
        }
        VipCfg.getvipLength = getvipLength;
        /**
         * 获取最大VIP等级
         */
        function getMaxLevel() {
            if (!maxLevel) {
                maxLevel = 0;
                for (var key in vipList) {
                    var itemCfg = vipList[key];
                    if (maxLevel < itemCfg.level) {
                        maxLevel = itemCfg.level;
                    }
                }
            }
            return maxLevel;
        }
        VipCfg.getMaxLevel = getMaxLevel;
    })(VipCfg = Config.VipCfg || (Config.VipCfg = {}));
    var VipItemCfg = (function (_super) {
        __extends(VipItemCfg, _super);
        function VipItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(VipItemCfg.prototype, "icon", {
            get: function () {
                return "vip_icon_" + this.level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "needGemLocalStr", {
            get: function () {
                // vip折扣
                if (Api.acVoApi.getActivityVoByAidAndCode("discount", "1") && Api.acVoApi.getActivityVoByAidAndCode("discount", "1").isStart) {
                    return LanguageManager.getlocal("vipLevel_needGem_Desc_for_discount", [this.needGem.toString(),
                        Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[this.level].needGem.toString()]);
                }
                else {
                    return LanguageManager.getlocal("vipLevel_needGem_Desc", [this.needGem.toString()]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "birthRatioLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_birthRatio_Desc", [Math.round(this.birthRatio * 100) + "%"]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxStrengthLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxStrength_Desc", [this.maxStrength.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxEnergyLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxEnergy_Desc", [this.maxEnergy.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxVigourLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxVigour_Desc", [this.maxVigour.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "searchLuckLocalStr", {
            get: function () {
                return LanguageManager.getlocal("searchLuck_Desc", [this.searchLuckFree.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        VipItemCfg.prototype.dailyLuckLocalStr = function (i) {
            if (i === void 0) { i = 0; }
            return LanguageManager.getlocal("dailyLuck_Desc" + i, [this.dailyLuckNum.toString()]);
        };
        Object.defineProperty(VipItemCfg.prototype, "localStr", {
            get: function () {
                var localStr = "";
                if (this.needGem) {
                    localStr += this.needGemLocalStr;
                }
                if (Api.switchVoApi.checkOpenWifeStatus() && this.level == 5) {
                    localStr += "\n" + LanguageManager.getlocal("vipsealupdes");
                }
                if (Api.switchVoApi.checkAutoMopup() && this.level == 6) {
                    localStr += "\n" + LanguageManager.getlocal("challengeAutoFightUnlock");
                }
                if (this.birthRatio) {
                    localStr += localStr ? "\n" + this.birthRatioLocalStr : this.birthRatioLocalStr;
                }
                if (this.maxStrength) {
                    localStr += localStr ? "\n" + this.maxStrengthLocalStr : this.maxStrengthLocalStr;
                }
                if (this.maxEnergy) {
                    localStr += localStr ? "\n" + this.maxEnergyLocalStr : this.maxEnergyLocalStr;
                }
                if (this.maxVigour) {
                    localStr += localStr ? "\n" + this.maxVigourLocalStr : this.maxVigourLocalStr;
                }
                if (this.searchLuckFree) {
                    localStr += localStr ? "\n" + this.searchLuckLocalStr : this.searchLuckFree;
                }
                if (Api.practiceVoApi.isPlayerPracticeEnable()) {
                    var vipAddV = GameConfig.config.practicebaseCfg.vip[this.level];
                    localStr += "\n" + LanguageManager.getlocal("practice_vipAdd2", [(vipAddV * 100).toFixed(0)]);
                }
                if (this.dailyLuckNum) {
                    for (var i = 1; i < 7; i++) {
                        localStr += localStr ? "\n" + this.dailyLuckLocalStr(i) : this.dailyLuckNum;
                    }
                }
                return localStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "extraRewardVoList", {
            get: function () {
                if (!this._extraRewardList) {
                    if (this.reward) {
                        this._extraRewardList = GameData.formatRewardItem(this.reward);
                    }
                }
                return this._extraRewardList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "searchLuckFreeLocalStr", {
            // public get extraRwardItemsList():BaseDisplayObjectContainer[]
            // {
            // 	if(this.reward)
            // 	{
            // 		return GameData.getRewardItemIcons(this.reward,true,true);
            // 	}
            // 	return null;
            // }
            get: function () {
                return LanguageManager.getlocal("searchLuckFreeChangeDesc", [String(this.level), String(this.searchLuckFree)]);
            },
            enumerable: true,
            configurable: true
        });
        return VipItemCfg;
    }(BaseItemCfg));
    Config.VipItemCfg = VipItemCfg;
    __reflect(VipItemCfg.prototype, "Config.VipItemCfg");
})(Config || (Config = {}));

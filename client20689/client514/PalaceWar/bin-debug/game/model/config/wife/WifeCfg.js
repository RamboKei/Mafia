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
     * 红颜配置
     */
    var WifeCfg;
    (function (WifeCfg) {
        var wifeListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!wifeListCfg.hasOwnProperty(String(key))) {
                    wifeListCfg[String(key)] = new WifeItemCfg();
                }
                itemCfg = wifeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        WifeCfg.formatData = formatData;
        function getWifeCfgById(id) {
            return wifeListCfg[String(id)];
        }
        WifeCfg.getWifeCfgById = getWifeCfgById;
        function getWifeCfgList() {
            return wifeListCfg;
        }
        WifeCfg.getWifeCfgList = getWifeCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(wifeListCfg).length;
        }
        WifeCfg.getMaxLength = getMaxLength;
    })(WifeCfg = Config.WifeCfg || (Config.WifeCfg = {}));
    var WifeItemCfg = (function (_super) {
        __extends(WifeItemCfg, _super);
        function WifeItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WifeItemCfg.prototype, "name", {
            /**红颜名称 */
            get: function () {
                return LanguageManager.getlocal("wifeName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "desc", {
            /**红颜描述 */
            get: function () {
                return LanguageManager.getlocal("wifeDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "dialogIds", {
            /**
             *
             * 对话ids
             */
            get: function () {
                if (this.dialogue) {
                    var dialogids = this.dialogue.split("_");
                    return dialogids;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "words", {
            /**红颜说的话 */
            get: function () {
                //todo 后面取配置
                var wordIndex = App.MathUtil.getRandom(1, 4);
                return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "wifeunlock", {
            /**红颜解锁条件 */
            get: function () {
                if (this.unlock) {
                    if (this.unlock["needPower"]) {
                        return LanguageManager.getlocal("wifeUnlock_2", [this.unlock["needPower"]]);
                    }
                    if (this.unlock["needVip"]) {
                        return LanguageManager.getlocal("wifeUnlock_3", [this.unlock["needVip"]]);
                    }
                    if (this.unlock["needQQ"]) {
                        return LanguageManager.getlocal("wifeUnlock_4");
                    }
                    if (this.unlock["needActive"]) {
                        return LanguageManager.getlocal("wifeUnlock_5");
                    }
                }
                return LanguageManager.getlocal("wifeUnlock_1");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "bg", {
            /**红颜背景 */
            get: function () {
                return "wifeview_bg1";
                // return "wifeview_bg" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "icon", {
            /**红颜icon */
            get: function () {
                return "wife_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "body", {
            /**红颜半身像 */
            get: function () {
                // 安希的寻访id为73
                if ((this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
                    ||
                        (this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
                    return "wife_full3_" + this.id;
                }
                else {
                    return "wife_full_" + this.id;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "body2", {
            /**红颜脱衣半身像 */
            get: function () {
                return "wife_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "sound", {
            /**红颜声音 */
            get: function () {
                return "effect_wife_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "bone", {
            /**红颜骨骼 */
            get: function () {
                return "wife_full_" + this.id;
                // return "wife_full3_3051";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "bone2", {
            /**红颜脱衣服骨骼 */
            get: function () {
                return "wife_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return WifeItemCfg;
    }(BaseItemCfg));
    Config.WifeItemCfg = WifeItemCfg;
    __reflect(WifeItemCfg.prototype, "Config.WifeItemCfg");
})(Config || (Config = {}));

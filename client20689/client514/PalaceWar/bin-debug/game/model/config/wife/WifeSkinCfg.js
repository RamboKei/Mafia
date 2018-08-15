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
     * 皮肤配置
     */
    var WifeskinCfg;
    (function (WifeskinCfg) {
        var wifeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!wifeListCfg.hasOwnProperty(String(key))) {
                    wifeListCfg[String(key)] = new WifeSkinItemCfg();
                }
                itemCfg = wifeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        WifeskinCfg.formatData = formatData;
        function getWifeCfgById(id) {
            return wifeListCfg[String(id)];
        }
        WifeskinCfg.getWifeCfgById = getWifeCfgById;
        function getWifeCfgList() {
            var arr = new Array();
            for (var key in wifeListCfg) {
                var curr_wifeItemCfg = wifeListCfg[key];
                arr.push(curr_wifeItemCfg);
            }
            return arr;
        }
        WifeskinCfg.getWifeCfgList = getWifeCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(wifeListCfg).length;
        }
        WifeskinCfg.getMaxLength = getMaxLength;
    })(WifeskinCfg = Config.WifeskinCfg || (Config.WifeskinCfg = {}));
    var WifeSkinItemCfg = (function (_super) {
        __extends(WifeSkinItemCfg, _super);
        function WifeSkinItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WifeSkinItemCfg.prototype, "name", {
            /**皮肤名称 */
            get: function () {
                return LanguageManager.getlocal("skinName" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "desc", {
            /**皮肤描述 */
            get: function () {
                return LanguageManager.getlocal("skinDesc" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "desc2", {
            /**皮肤描述 */
            get: function () {
                return LanguageManager.getlocal("skinDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "dropDesc", {
            get: function () {
                return LanguageManager.getlocal("skinDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "words", {
            /**皮肤说的话 */
            get: function () {
                //todo 后面取配置
                var wordIndex = App.MathUtil.getRandom(1, 4);
                return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "icon", {
            /**皮肤icon */
            get: function () {
                return "wife_skinhalf_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "body", {
            /**皮肤半身像 */
            get: function () {
                return "wife_skin_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "body2", {
            /**皮肤脱衣半身像 */
            get: function () {
                return "wife_skinfull2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "bone", {
            /**皮肤骨骼 */
            get: function () {
                return "wife_full3_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "bone2", {
            /**皮肤骨骼脱一夫 */
            get: function () {
                return "wife_full4_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "sound", {
            /**皮肤声音 */
            get: function () {
                return "effect_wifeskin_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return WifeSkinItemCfg;
    }(BaseItemCfg));
    Config.WifeSkinItemCfg = WifeSkinItemCfg;
    __reflect(WifeSkinItemCfg.prototype, "Config.WifeSkinItemCfg");
})(Config || (Config = {}));

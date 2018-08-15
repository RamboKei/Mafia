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
    var ServantCfg;
    (function (ServantCfg) {
        var servantListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!servantListCfg.hasOwnProperty(String(key))) {
                    servantListCfg[String(key)] = new ServantItemCfg();
                }
                itemCfg = servantListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ServantCfg.formatData = formatData;
        function getServantItemById(id) {
            return servantListCfg[String(id)];
        }
        ServantCfg.getServantItemById = getServantItemById;
    })(ServantCfg = Config.ServantCfg || (Config.ServantCfg = {}));
    var ServantItemCfg = (function (_super) {
        __extends(ServantItemCfg, _super);
        function ServantItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ServantItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("servant_name" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "desc", {
            get: function () {
                return LanguageManager.getlocal("servant_Desc" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "story", {
            get: function () {
                return LanguageManager.getlocal("servant_story" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "dialogIds", {
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
        Object.defineProperty(ServantItemCfg.prototype, "fullIcon", {
            get: function () {
                return "servant_full_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "halfIcon", {
            get: function () {
                return "servant_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "sound", {
            get: function () {
                return "effect_servant_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "dropDesc", {
            // 道具描述
            get: function () {
                return LanguageManager.getlocal("servantDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "qualityBoxImgPath", {
            //获取品质框资源
            get: function () {
                var tmpCfg = GameConfig.config.servantCfg[this.id];
                return "servant_cardbg_" + tmpCfg.quality;
            },
            enumerable: true,
            configurable: true
        });
        return ServantItemCfg;
    }(BaseItemCfg));
    __reflect(ServantItemCfg.prototype, "ServantItemCfg");
})(Config || (Config = {}));

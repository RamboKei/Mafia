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
    var AcCfg;
    (function (AcCfg) {
        var TotalDayRechargeCfg = (function () {
            function TotalDayRechargeCfg() {
                this.itemListCfg = {};
            }
            TotalDayRechargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new TotalDayRechargeItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            TotalDayRechargeCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            TotalDayRechargeCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return TotalDayRechargeCfg;
        }());
        AcCfg.TotalDayRechargeCfg = TotalDayRechargeCfg;
        __reflect(TotalDayRechargeCfg.prototype, "Config.AcCfg.TotalDayRechargeCfg");
        var TotalDayRechargeItemCfg = (function (_super) {
            __extends(TotalDayRechargeItemCfg, _super);
            function TotalDayRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TotalDayRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.TotalDayRechargeItemCfg = TotalDayRechargeItemCfg;
        __reflect(TotalDayRechargeItemCfg.prototype, "Config.AcCfg.TotalDayRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));

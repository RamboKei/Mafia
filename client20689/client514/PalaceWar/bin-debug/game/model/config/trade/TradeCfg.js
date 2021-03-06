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
    var TradeCfg;
    (function (TradeCfg) {
        var tradeList = {};
        var maxTradeIdx = 0;
        function formatData(data) {
            maxTradeIdx = 0;
            for (var key in data) {
                var itemCfg = void 0;
                if (!tradeList.hasOwnProperty(String(key))) {
                    tradeList[String(key)] = new TradeItemCfg();
                }
                itemCfg = tradeList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.tradeId = String(key);
                maxTradeIdx++;
            }
        }
        TradeCfg.formatData = formatData;
        function getTradeCfgById(tradeId) {
            return tradeList[tradeId];
        }
        TradeCfg.getTradeCfgById = getTradeCfgById;
        function getMaxTradeIndex() {
            return maxTradeIdx;
        }
        TradeCfg.getMaxTradeIndex = getMaxTradeIndex;
    })(TradeCfg = Config.TradeCfg || (Config.TradeCfg = {}));
    var TradeItemCfg = (function (_super) {
        __extends(TradeItemCfg, _super);
        function TradeItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TradeItemCfg.prototype, "tradeName", {
            get: function () {
                return LanguageManager.getlocal("tradeName" + this.tradeId);
            },
            enumerable: true,
            configurable: true
        });
        return TradeItemCfg;
    }(BaseItemCfg));
    Config.TradeItemCfg = TradeItemCfg;
    __reflect(TradeItemCfg.prototype, "Config.TradeItemCfg");
})(Config || (Config = {}));

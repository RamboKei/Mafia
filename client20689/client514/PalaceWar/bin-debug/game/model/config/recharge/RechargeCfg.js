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
     * 充值配置
     */
    var RechargeCfg;
    (function (RechargeCfg) {
        var moneyNameCfg = {
            wanba: { QZ1: "星币", SQ1: "星币", QZ2: "星币", SQ2: "秀币" }
        };
        function getMoneyName() {
            var moneyName;
            if (PlatformManager.checkIsWanbaSp()) {
                try {
                    var data = window["OPEN_DATA"];
                    var platform = data.platform;
                    var app = data.qua.app;
                    moneyName = moneyNameCfg.wanba[app + platform];
                }
                catch (e) {
                }
            }
            return moneyName;
        }
        RechargeCfg.getMoneyName = getMoneyName;
        RechargeCfg.wanbaCfg = {
            "g1": {
                "pid1": 21237, "pid2": 21229
            },
            "g2": {
                "pid1": 21238, "pid2": 21230
            },
            "g3": {
                "pid1": 21239, "pid2": 21231
            },
            "g4": {
                "pid1": 21240, "pid2": 21232
            },
            "g5": {
                "pid1": 21241, "pid2": 21233
            },
            "g6": {
                "pid1": 21242, "pid2": 21234
            },
            "g7": {
                "pid1": 21243, "pid2": 21235
            },
            "g8": {
                "pid1": 21244, "pid2": 21236
            },
            "g11": {
                "pid1": 25196, "pid2": 25197
            },
            "g12": {
                "pid1": 25751, "pid2": 25755
            },
            "g13": {
                "pid1": 25752, "pid2": 25756
            },
            "g14": {
                "pid1": 25749, "pid2": 25753
            },
            "g15": {
                "pid1": 25750, "pid2": 25754
            }
        };
        function getAllProductid() {
            var idArr = [];
            var orderidArr = [];
            try {
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    if (PlatformManager.checkIsWanbaSp() && PlatformManager.checkIsUseSDK()) {
                        var data = window["OPEN_DATA"];
                        var platform = data.platform;
                        var app = data.qua.app;
                        var productId = Config.RechargeCfg.wanbaCfg[itemCfg.id]["pid" + platform];
                        orderidArr.push(productId);
                    }
                    else {
                        if (itemCfg.orderid) {
                            orderidArr.push(itemCfg.orderid);
                        }
                        else {
                            idArr.push(itemCfg.id);
                        }
                    }
                }
            }
            catch (e) {
            }
            if (orderidArr && orderidArr.length > 0) {
                return orderidArr;
            }
            return idArr;
        }
        RechargeCfg.getAllProductid = getAllProductid;
        var normalRechargeListCfg;
        var rechargeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!rechargeListCfg.hasOwnProperty(String(key))) {
                    rechargeListCfg[String(key)] = new RechargeItemCfg();
                }
                itemCfg = rechargeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        RechargeCfg.formatData = formatData;
        /**
         * 获取普通充值档
         */
        function getNormalRechargeCfg() {
            if (normalRechargeListCfg == null) {
                normalRechargeListCfg = [];
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    var gemCost = Number(itemCfg.gemCost);
                    if (PlatformManager.checkIsShenHeYiWan() && (key == "g7" || key == "g8")) {
                        itemCfg.sortId = key == "g7" ? 9 : 10;
                    }
                    if (itemCfg.sortId) {
                        normalRechargeListCfg.push(itemCfg);
                    }
                }
                normalRechargeListCfg.sort(function (a, b) {
                    return a.sortId < b.sortId ? 1 : -1;
                });
            }
            return normalRechargeListCfg;
        }
        RechargeCfg.getNormalRechargeCfg = getNormalRechargeCfg;
        /**
         * 根据key取对应档位的配置
         * @param key
         */
        function getRechargeItemCfgByKey(id) {
            for (var key in rechargeListCfg) {
                var itemCfg = rechargeListCfg[key];
                if (itemCfg.id == id) {
                    return itemCfg;
                }
            }
            return null;
        }
        RechargeCfg.getRechargeItemCfgByKey = getRechargeItemCfgByKey;
        /**
         * 获取第一个充值宝箱
         */
        function rewardList1() {
            // let rewardStr = rechargeListCfg["g9"].getReward;
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            var rewards = "1_1_" + cfg11.gemCost + "|" + cfg11.getReward;
            return GameData.formatRewardItem(rewards);
        }
        RechargeCfg.rewardList1 = rewardList1;
        /**
         * 获取第二个充值宝箱
         */
        function rewardList2() {
            // let rewardStr = rechargeListCfg["g10"].getReward;
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
            var rewards = "1_1_" + cfg11.gemCost + "|" + cfg11.getReward;
            return GameData.formatRewardItem(rewards);
        }
        RechargeCfg.rewardList2 = rewardList2;
    })(RechargeCfg = Config.RechargeCfg || (Config.RechargeCfg = {}));
    var RechargeItemCfg = (function (_super) {
        __extends(RechargeItemCfg, _super);
        function RechargeItemCfg() {
            return _super.call(this) || this;
        }
        return RechargeItemCfg;
    }(BaseItemCfg));
    Config.RechargeItemCfg = RechargeItemCfg;
    __reflect(RechargeItemCfg.prototype, "Config.RechargeItemCfg");
})(Config || (Config = {}));

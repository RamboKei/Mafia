var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 擂台配置
         */
        var CrossServerIntimacyCfg = (function () {
            function CrossServerIntimacyCfg() {
            }
            CrossServerIntimacyCfg.prototype.formatData = function (data) {
                this._winServer = data.winServer;
                this._loseServer = data.loseServer;
                this._rankList = data.rankList;
            };
            CrossServerIntimacyCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this._winServer, true, true);
            };
            CrossServerIntimacyCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this._loseServer, true, true);
            };
            CrossServerIntimacyCfg.prototype.getServerRankRewards = function () {
                return this._rankList;
            };
            return CrossServerIntimacyCfg;
        }());
        AcCfg.CrossServerIntimacyCfg = CrossServerIntimacyCfg;
        __reflect(CrossServerIntimacyCfg.prototype, "Config.AcCfg.CrossServerIntimacyCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));

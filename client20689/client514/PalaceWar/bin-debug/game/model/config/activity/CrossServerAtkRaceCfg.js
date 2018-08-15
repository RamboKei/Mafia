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
        var CrossServerAtkRaceCfg = (function () {
            function CrossServerAtkRaceCfg() {
            }
            CrossServerAtkRaceCfg.prototype.formatData = function (data) {
                this.unlock = data.unlock;
                this.servantLv = data.servantLv;
                this.dailyNum = data.dailyNum;
                this.intervalTime = data.intervalTime;
                this.fightAdd = data.fightAdd;
                this.revenge = data.revenge;
                this.challenge = data.challenge;
                this.hunt = data.hunt;
                this.parameter1 = data.parameter1;
                this.parameter3 = data.parameter3;
                this.iniAtt = data.iniAtt;
                this.juniorAtt = data.juniorAtt;
                this.mediumAtt = data.mediumAtt;
                this.seniorAtt = data.seniorAtt;
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.rankList = data.rankList;
            };
            /**
             * 每日武馆次数
             */
            CrossServerAtkRaceCfg.prototype.getDailyNum = function () {
                return this.dailyNum;
            };
            /**
             * 额外出战系数
             */
            CrossServerAtkRaceCfg.prototype.getParameter1 = function () {
                return this.parameter1;
            };
            /**
             * 门客等级限制
             */
            CrossServerAtkRaceCfg.prototype.getServantLv = function () {
                return this.servantLv;
            };
            /**
             * 每次间隔时间 单位（秒）
             */
            CrossServerAtkRaceCfg.prototype.getIntervalTime = function () {
                return this.intervalTime;
            };
            /**
             * 解锁条件  拥有 X 个门客
             */
            CrossServerAtkRaceCfg.prototype.getUnlock = function () {
                return this.unlock;
            };
            /**
             * 初始属性
             */
            CrossServerAtkRaceCfg.prototype.getInitAtt = function (key) {
                return this.iniAtt[key];
            };
            /**
             * 初级属性
             */
            CrossServerAtkRaceCfg.prototype.getJuniorAtt = function (key) {
                return this.juniorAtt[key];
            };
            /**
             * 中级属性
             */
            CrossServerAtkRaceCfg.prototype.getMediumAtt = function (key) {
                return this.mediumAtt[key];
            };
            /**
             * 高级属性
             */
            CrossServerAtkRaceCfg.prototype.getSeniorAtt = function (key) {
                return this.seniorAtt[key];
            };
            CrossServerAtkRaceCfg.prototype.getFightAdd = function () {
                return this.fightAdd;
            };
            /**
             * 上榜条件 击败多少名
             */
            CrossServerAtkRaceCfg.prototype.getbeatNum = function () {
                return this.parameter3;
            };
            CrossServerAtkRaceCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this.winServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this.loseServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getServerRankRewards = function () {
                return this.rankList;
            };
            return CrossServerAtkRaceCfg;
        }());
        AcCfg.CrossServerAtkRaceCfg = CrossServerAtkRaceCfg;
        __reflect(CrossServerAtkRaceCfg.prototype, "Config.AcCfg.CrossServerAtkRaceCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));

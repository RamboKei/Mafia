var Config;
(function (Config) {
    /**
     * 擂台配置
     */
    var AtkraceCfg;
    (function (AtkraceCfg) {
        /**
         * 解锁条件  拥有 X 个门客
         */
        var unlock;
        /**
         * 门客等级
         */
        var servantLv;
        var dailyNum;
        /**
         * 每次间隔时间 单位（秒）
         */
        var intervalTime;
        /**
         * 出使消耗道具
         */
        var fightAdd;
        /**
         * 复仇消耗道具
         */
        var revenge;
        /**
         * 挑战消耗道具
         */
        var challenge;
        /**
         * 追杀消耗道具 暂用道具
         */
        var hunt;
        /**
         * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
         */
        var parameter1;
        var parameter3;
        var iniAtt;
        var juniorAtt;
        var mediumAtt;
        var seniorAtt;
        function formatData(data) {
            unlock = data.unlock;
            servantLv = data.servantLv;
            dailyNum = data.dailyNum;
            intervalTime = data.intervalTime;
            fightAdd = data.fightAdd;
            revenge = data.revenge;
            challenge = data.challenge;
            hunt = data.hunt;
            parameter1 = data.parameter1;
            parameter3 = data.parameter3;
            iniAtt = data.iniAtt;
            juniorAtt = data.juniorAtt;
            mediumAtt = data.mediumAtt;
            seniorAtt = data.seniorAtt;
        }
        AtkraceCfg.formatData = formatData;
        /**
         * 每日武馆次数
         */
        function getDailyNum() {
            return dailyNum;
        }
        AtkraceCfg.getDailyNum = getDailyNum;
        /**
         * 额外出战系数
         */
        function getParameter1() {
            return parameter1;
        }
        AtkraceCfg.getParameter1 = getParameter1;
        /**
         * 门客等级限制
         */
        function getServantLv() {
            return servantLv;
        }
        AtkraceCfg.getServantLv = getServantLv;
        /**
         * 每次间隔时间 单位（秒）
         */
        function getIntervalTime() {
            return intervalTime;
        }
        AtkraceCfg.getIntervalTime = getIntervalTime;
        /**
         * 解锁条件  拥有 X 个门客
         */
        function getUnlock() {
            return unlock;
        }
        AtkraceCfg.getUnlock = getUnlock;
        /**
         * 初始属性
         */
        function getInitAtt(key) {
            return iniAtt[key];
        }
        AtkraceCfg.getInitAtt = getInitAtt;
        /**
         * 初级属性
         */
        function getJuniorAtt(key) {
            return juniorAtt[key];
        }
        AtkraceCfg.getJuniorAtt = getJuniorAtt;
        /**
         * 中级属性
         */
        function getMediumAtt(key) {
            return mediumAtt[key];
        }
        AtkraceCfg.getMediumAtt = getMediumAtt;
        /**
         * 高级属性
         */
        function getSeniorAtt(key) {
            return seniorAtt[key];
        }
        AtkraceCfg.getSeniorAtt = getSeniorAtt;
        function getFightAdd() {
            return fightAdd;
        }
        AtkraceCfg.getFightAdd = getFightAdd;
        /**
         * 上榜条件 击败多少名
         */
        function getbeatNum() {
            return parameter3;
        }
        AtkraceCfg.getbeatNum = getbeatNum;
    })(AtkraceCfg = Config.AtkraceCfg || (Config.AtkraceCfg = {}));
})(Config || (Config = {}));

var Config;
(function (Config) {
    var GameprojectCfg;
    (function (GameprojectCfg) {
        GameprojectCfg.rewardArr = [2, 3, 7];
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        GameprojectCfg.formatData = formatData;
    })(GameprojectCfg = Config.GameprojectCfg || (Config.GameprojectCfg = {}));
})(Config || (Config = {}));

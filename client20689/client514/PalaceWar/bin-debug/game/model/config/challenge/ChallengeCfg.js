/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */
var ChallengeCfg;
(function (ChallengeCfg) {
    function getChallengeCfgById(id) {
        if (GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()]) {
            return GameConfig.config.challengeCfg[id.toString()];
        }
        return null;
    }
    ChallengeCfg.getChallengeCfgById = getChallengeCfgById;
    /**
     * 关卡总数
     */
    function getChallengeTotalPass() {
        return Object.keys(GameConfig.config.challengeCfg).length;
    }
    ChallengeCfg.getChallengeTotalPass = getChallengeTotalPass;
})(ChallengeCfg || (ChallengeCfg = {}));

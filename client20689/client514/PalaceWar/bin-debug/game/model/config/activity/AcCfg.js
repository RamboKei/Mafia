var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        AcCfg.isGetAll = false;
        AcCfg.cfgList = {};
        // export function getCfgByActivityId(aid:string)
        // {
        // 	return cfgList[aid];
        // }
        function getCfgByActivityIdAndCode(aid, code) {
            return AcCfg.cfgList[aid] ? AcCfg.cfgList[aid][code] : null;
        }
        AcCfg.getCfgByActivityIdAndCode = getCfgByActivityIdAndCode;
        function formatAllCfg(data) {
            AcCfg.isGetAll = true;
            for (var aidAndCode in data) {
                var aidArr = aidAndCode.split("-");
                var aid = aidArr[0];
                var code = aidArr[1];
                var cfgClassName = "Config.AcCfg." + App.StringUtil.firstCharToUper(aid) + "Cfg";
                var cfgClass = egret.getDefinitionByName(cfgClassName);
                if (AcCfg.cfgList.hasOwnProperty(aid) == false) {
                    AcCfg.cfgList[aid] = {};
                }
                if (cfgClass) {
                    var cfg = new cfgClass();
                    cfg.formatData(data[aidAndCode]);
                    AcCfg.cfgList[aid][code] = cfg;
                }
                else {
                    App.LogUtil.log("缺少活动配置解析" + cfgClassName + "，请参考DailyChargeCfg写法");
                }
            }
        }
        AcCfg.formatAllCfg = formatAllCfg;
        function formatCfgById(acData, aid) {
        }
        AcCfg.formatCfgById = formatCfgById;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));

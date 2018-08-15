var GameConfig;
(function (GameConfig) {
    GameConfig.stageWidth = NaN;
    GameConfig.stageHeigth = NaN;
    GameConfig.stage = null;
    GameConfig.isLoaded = false;
    GameConfig.refreshUIResArr = ["gold", "food", "soldier", "gem", "level", "power", "exp"];
    GameConfig.platCfg = {};
    GameConfig.serverCfg = {};
    GameConfig.rookieCfg = {};
    /**
     * 差异化配置
     */
    var diffCfg = {};
    /**
     * 是否是新的差异化配置
     */
    var isNewDiffCfg = false;
    /**
     * 差异化配置是否已经加载
     */
    GameConfig.isNewDiffCfgLoaded = false;
    /**
     * 流海屏流海高度
     */
    GameConfig.seaScreenTopH = 50;
    /**
     * json配置文件
     */
    var config;
    (function (config) {
        // export let levelCfg:any={}; //已经解析，以后使用解析后的配置 Config.levelCfg
        config.searchbaseCfg = {};
        config.abilityCfg = {};
        config.abilitybaseCfg = {};
        config.challengeCfg = {};
        config.initCfg = {};
        config.interfaceCfg = {};
        config.itemCfg = {};
        config.modelCfg = {};
        config.servantbaseCfg = {};
        config.servantCfg = {};
        config.shopCfg = {};
        config.vipCfg = {};
        config.wifebaseCfg = {};
        config.wifeCfg = {};
        config.affairCfg = {};
        config.childCfg = {};
        config.childbaseCfg = {};
        config.challengestoryCfg = {};
        config.titleCfg = {};
        config.adultCfg = {};
        config.alliancebaseCfg = {};
        config.allianceCfg = {};
        config.bookroomCfg = {};
        config.studyatkbaseCfg = {};
        config.prisonbaseCfg = {};
        config.limitedrewardbaseCfg = {};
        config.conquestCfg = {};
        config.tradebaseCfg = {};
        config.wifeskinCfg = {};
        config.invitefriendCfg = {};
        config.shopnewCfg = {};
        config.buildingCfg = {};
        config.practicebaseCfg = {};
        config.wifestatusCfg = {};
        config.wifestatusbaseCfg = {};
        /**
         * 场景配置
         */
        config.sceneCfg = {};
    })(config = GameConfig.config || (GameConfig.config = {}));
    function loadConfig() {
        var loadBigCfg = true; //PlatformManager.checkIsUseBigCfg();
        //test code 
        // loadBigCfg=true;
        if (loadBigCfg) {
            ResourceManager.loadItem(getConfigName(), loadOneCfgComplete, GameConfig);
        }
        else {
            ResourceManager.loadGroup("config", function () {
                GameConfig.isLoaded = true;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
            }, loadOneCfgComplete, GameConfig);
        }
    }
    GameConfig.loadConfig = loadConfig;
    function loadOneCfgComplete(e) {
        if (e instanceof RES.ResourceEvent) {
            var resName = e.resItem.name;
            var name_1 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
            var cfgData = ResourceManager.getRes(resName);
            config[name_1] = cfgData;
            var configName = App.StringUtil.firstCharToUper(name_1);
            if (Config[configName] && Config[configName].formatData) {
                Config[configName].formatData(config[name_1]);
            }
        }
        else {
            if (typeof (e) == "object") {
                for (var resName in e) {
                    var name_2 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
                    config[name_2] = e[resName];
                    var configName = App.StringUtil.firstCharToUper(name_2);
                    // console.log(configName+"configName");
                    if (Config[configName] && Config[configName].formatData) {
                        Config[configName].formatData(config[name_2]);
                    }
                }
                GameConfig.isLoaded = true;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
            }
        }
    }
    function formatCfg2ByData(data, isNew) {
        for (var resName in data) {
            var name_3 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
            if (isNew) {
                if (!diffCfg.old) {
                    diffCfg.old = {};
                }
                diffCfg.old[name_3] = config[name_3];
            }
            else {
                if (!diffCfg.new) {
                    diffCfg.new = {};
                }
                diffCfg.new[name_3] = config[name_3];
            }
            config[name_3] = data[resName];
            var configName = App.StringUtil.firstCharToUper(name_3);
            if (Config[configName] && Config[configName].formatData) {
                Config[configName].formatData(config[name_3]);
            }
        }
        isNewDiffCfg = isNew;
    }
    function loadNewConfig(callback) {
        var newCfgName = getConfigName() + "_new";
        if (RES.hasRes(newCfgName)) {
            return ResourceManager.loadItem(newCfgName, function (data) {
                formatCfg2ByData(data, true);
                GameConfig.isNewDiffCfgLoaded = true;
                if (callback) {
                    callback();
                }
            }, GameConfig);
        }
        if (callback) {
            callback();
        }
    }
    function switchNewOrOldCfg(useNew, successCallback, successCallbackThisObj, successCallbackParams) {
        if (isNewDiffCfg == !useNew) {
            if (useNew) {
                if (diffCfg.new) {
                    formatCfg2ByData(diffCfg.new, true);
                    if (successCallback) {
                        return successCallback.apply(successCallbackThisObj, successCallbackParams);
                    }
                }
                else {
                    return loadNewConfig(function () {
                        successCallback.apply(successCallbackThisObj, successCallbackParams);
                    });
                }
            }
            else {
                if (diffCfg.old) {
                    formatCfg2ByData(diffCfg.old, false);
                    if (successCallback) {
                        return successCallback.apply(successCallbackThisObj, successCallbackParams);
                    }
                }
            }
        }
        return successCallback.apply(successCallbackThisObj, successCallbackParams);
    }
    GameConfig.switchNewOrOldCfg = switchNewOrOldCfg;
    function getConfigName() {
        var configResName;
        var languageResKey = PlatformManager.getSpid();
        if (PlatformManager.checkIsLocal()) {
            var tmpcnName = App.CommonUtil.getOption("language");
            if (tmpcnName && RES.hasRes(tmpcnName)) {
                languageResKey = tmpcnName;
            }
        }
        if (RES.hasRes("gameconfig_" + languageResKey)) {
            configResName = "gameconfig_" + languageResKey;
        }
        else {
            configResName = "gameconfig_cn";
        }
        return configResName;
    }
})(GameConfig || (GameConfig = {}));

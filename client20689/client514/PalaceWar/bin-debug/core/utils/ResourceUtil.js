var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceUtil
 */
var App;
(function (App) {
    var ResourceUtil = (function () {
        function ResourceUtil() {
        }
        ResourceUtil.initGroup = function () {
            if (ResourceUtil._isGroupInit == false) {
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, ResourceUtil.onGroupLoadProgress, ResourceUtil);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResourceUtil.onGroupLoadComplete, ResourceUtil);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResourceUtil.onGroupLoadError, ResourceUtil);
                ResourceUtil._isGroupInit = true;
            }
        };
        /**
         * 加载资源组
         * @param groupName 资源组名称
         * @param onLoadComplete 资源加载完成回调
         * @param onLoadProgress 资源加载进度回调
         * @param onLoadThisObj 资源加载回调所属对象
         */
        ResourceUtil.loadGroup = function (groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError) {
            ResourceUtil.initGroup();
            ResourceUtil._groupList[groupName] = [onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError];
            RES.loadGroup(groupName);
        };
        ResourceUtil.onGroupLoadProgress = function (e) {
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadProgress = ResourceUtil._groupList[groupName][1];
                var loadProgressTarget = ResourceUtil._groupList[groupName][2];
                if (loadProgress) {
                    loadProgress.call(loadProgressTarget, e);
                }
            }
        };
        ResourceUtil.onGroupLoadComplete = function (e) {
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadComplete = ResourceUtil._groupList[groupName][0];
                var loadCompleteTarget = ResourceUtil._groupList[groupName][2];
                if (loadComplete) {
                    loadComplete.call(loadCompleteTarget);
                }
                ResourceUtil._groupList[groupName] = null;
                delete ResourceUtil._groupList[groupName];
            }
        };
        ResourceUtil.onGroupLoadError = function (e) {
            console.log("res loaderror", e.groupName);
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadErrorTarget = ResourceUtil._groupList[groupName][2];
                var loadError = ResourceUtil._groupList[groupName][3];
                if (loadError) {
                    loadError.call(loadErrorTarget);
                }
                ResourceUtil._groupList[groupName] = null;
                delete ResourceUtil._groupList[groupName];
            }
        };
        /** 创建资源组，不自动加载
         * @param  resources 资源组
         */
        ResourceUtil.createGroup = function (resources) {
            if (resources === void 0) { resources = []; }
            var groupName = "loadGroup" + ResourceUtil._groupIndex++;
            RES.createGroup(groupName, resources, true);
            return groupName;
        };
        ResourceUtil.initItemLoad = function () {
            if (ResourceUtil._isItemLoadInit == false) {
                ResourceUtil._isItemLoadInit = true;
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, ResourceUtil.onItemLoadError, ResourceUtil);
            }
        };
        ResourceUtil.loadItem = function (key, onLoadComplete, thisObj) {
            ResourceUtil.initItemLoad();
            RES.getResAsync(key, onLoadComplete, thisObj);
        };
        ResourceUtil.loadItemByUrl = function (url, onLoadComplete, thisObj, type) {
            ResourceUtil.initItemLoad();
            RES.getResByUrl(url, onLoadComplete, thisObj, type);
        };
        ResourceUtil.onItemLoadError = function (e) {
            if (e.resItem.name.indexOf("gameconfig_") > -1 && !GameConfig.isLoaded) {
                GameConfig.loadConfig();
            }
            App.LogUtil.show("缺资源or断网", e.resItem.name);
        };
        /*****单资源加载相关结束*****/
        /**
         * 加载混合资源
         * @param resources 资源数组
         * @param groups 资源组数组
         * @param onResourceLoadComplete 资源加载完成执行函数
         * @param onResourceLoadProgress 资源加载进度监听函数
         * @param onResourceLoadTarget 资源加载监听函数所属对象
         */
        ResourceUtil.loadResource = function (resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError) {
            if (resources === void 0) { resources = []; }
            if (groups === void 0) { groups = []; }
            var needLoadArr = groups ? resources.concat(groups) : resources;
            var autoAddResArr = [];
            for (var i = needLoadArr.length - 1; i >= 0; i--) {
                var key = needLoadArr[i];
                var isGroup = false;
                if (RES["config"] && RES["config"].config && RES["config"].config.groups) {
                    if (RES["config"].config.groups[key]) {
                        isGroup = true;
                    }
                }
                else {
                    if (RES.getGroupByName(key)) {
                        isGroup = true;
                    }
                }
                if (!key || (RES.hasRes(key) == false && !isGroup)) {
                    App.LogUtil.warn("资源配置缺少", key, "跳过加载此文件");
                    needLoadArr.splice(i, 1);
                }
                else {
                    if (key.indexOf("btn") > -1) {
                        var btnDownName = key + "_down";
                        if (RES.hasRes(btnDownName)) {
                            if (needLoadArr.indexOf(btnDownName) < 0) {
                                autoAddResArr.push(btnDownName);
                            }
                        }
                    }
                    else if (key.indexOf("progress") > -1) {
                        var progressBgName = key + "_bg";
                        if (RES.hasRes(progressBgName)) {
                            if (needLoadArr.indexOf(progressBgName) < 0) {
                                autoAddResArr.push(progressBgName);
                            }
                        }
                    }
                    else if (key.indexOf("shield") > -1) {
                        var shieldName = "shield_" + GameData.getCountry();
                        if (RES.hasRes(shieldName)) {
                            needLoadArr[i] = shieldName;
                        }
                    }
                }
            }
            needLoadArr = needLoadArr.concat(autoAddResArr);
            var groupName = ResourceUtil.createGroup(needLoadArr);
            ResourceUtil.loadGroup(groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError);
            return groupName;
        };
        ResourceUtil.loadSingleScript = function (jsSrc) {
            var s = document.createElement('script');
            s.async = false;
            s.src = jsSrc;
            s.addEventListener('load', function loadcomplete() {
                s.parentNode.removeChild(s);
                s.removeEventListener('load', loadcomplete, false);
                // callback();
            }, false);
            document.body.appendChild(s);
        };
        ;
        /*****资源组加载相关开始*****/
        ResourceUtil._groupList = {};
        ResourceUtil._isGroupInit = false;
        ResourceUtil._groupIndex = 0;
        /*****资源组加载相关结束*****/
        /*****单资源加载相关开始*****/
        ResourceUtil._isItemLoadInit = false;
        return ResourceUtil;
    }());
    App.ResourceUtil = ResourceUtil;
    __reflect(ResourceUtil.prototype, "App.ResourceUtil");
})(App || (App = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 设备信息工具
 * author 陈可
 * date 2017/9/8
 * @class DeviceUtil
 */
var App;
(function (App) {
    var DeviceUtil = (function () {
        function DeviceUtil() {
        }
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsHtml5 = function () {
            return !this.isWXgame() && !this.isWyw() && egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        };
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsNative = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        };
        /**
         * 当前是否是微信小游戏版本
         */
        DeviceUtil.isWXgame = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
        };
        /**
         * 当前是否是qq玩一玩
         */
        DeviceUtil.isWyw = function () {
            return false;
        };
        /**
         * 是否是runtime2微端环境
         */
        DeviceUtil.isRuntime2 = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
        };
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsMobile = function () {
            return egret.Capabilities.isMobile;
        };
        DeviceUtil.isAndroid = function () {
            return egret.Capabilities.os == "Android";
        };
        DeviceUtil.isIOS = function () {
            return egret.Capabilities.os == "iOS";
        };
        DeviceUtil.CheckWebglRenderMode = function () {
            return egret.Capabilities.renderMode == "webgl";
        };
        /**获取设备当前语言 */
        DeviceUtil.getOSCurrentLanguage = function () {
            return "cn";
        };
        DeviceUtil.checkIsSeascreen = function () {
            if (App.DeviceUtil.IsHtml5()) {
                var window_width = document.documentElement.clientWidth;
                var window_height = document.documentElement.clientHeight;
                if (window_height / window_width > 2) {
                    return true;
                }
                return false;
            }
        };
        // 玩吧是否已下载微端
        DeviceUtil.wanbaIsDownloadApp = false;
        return DeviceUtil;
    }());
    App.DeviceUtil = DeviceUtil;
    __reflect(DeviceUtil.prototype, "App.DeviceUtil");
})(App || (App = {}));

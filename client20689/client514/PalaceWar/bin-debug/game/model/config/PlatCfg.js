var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 平台配置
 * @author 赵占涛
 */
var PlatCfg = (function () {
    function PlatCfg() {
    }
    // 初始化平台配置
    PlatCfg.initCfg = function (initCb, initCbObject) {
        var sub = PlatformManager.getAppid();
        var middle = PlatformManager.getSpName();
        var big = PlatformManager.getBigAppid();
        console.log("sub middle big", sub, middle, big);
        var cb = function (data) {
            PlatCfg.loginLogo = data.loginLogo;
            PlatCfg.loginBg = data.loginBg;
            var loginBgName = "loginbg_" + sub;
            if (RES.hasRes(loginBgName)) {
                PlatCfg.loginBg = loginBgName;
            }
            else {
                loginBgName = "loginbg_" + big;
                if (RES.hasRes(loginBgName)) {
                    PlatCfg.loginBg = loginBgName;
                }
            }
            initCb.call(initCbObject);
        };
        if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
            ResourceManager.loadItem("sub" + sub + "_json", cb, this);
        }
        else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
            ResourceManager.loadItem("middle" + middle + "_json", cb, this);
        }
        else if (big !== "" && RES.hasRes("big" + big + "_json")) {
            ResourceManager.loadItem("big" + big + "_json", cb, this);
        }
        else {
            ResourceManager.loadItem("big0_json", cb, this);
        }
    };
    return PlatCfg;
}());
__reflect(PlatCfg.prototype, "PlatCfg");

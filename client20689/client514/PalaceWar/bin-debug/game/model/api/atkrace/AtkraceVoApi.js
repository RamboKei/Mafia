/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AtkraceVoApi = (function (_super) {
    __extends(AtkraceVoApi, _super);
    function AtkraceVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 战斗信息
     */
    AtkraceVoApi.prototype.getMyFightInfo = function () {
        return this.atkraceVo.ainfo;
    };
    /**
     * 武馆信息息
     */
    AtkraceVoApi.prototype.getMyInfo = function () {
        return this.atkraceVo.info;
    };
    AtkraceVoApi.prototype.isShowNpc = function () {
        return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
        // return true;
    };
    AtkraceVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString()]);
    };
    AtkraceVoApi.prototype.getPoint = function () {
        return this.atkraceVo.point;
    };
    AtkraceVoApi.prototype.getRewardc = function () {
        return this.atkraceVo.rewardc;
    };
    AtkraceVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (this.isShowNpc()) {
            if (this.atkraceVo.ainfo && this.atkraceVo.ainfo.mesid) {
                flag = true;
            }
            else {
                var maxCount = Config.AtkraceCfg.getDailyNum();
                var myNum = this.atkraceVo.info.num;
                if (myNum < maxCount) {
                    var countDownTime = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    if (countDownTime <= 0) {
                        flag = true;
                    }
                }
            }
        }
        return flag;
    };
    AtkraceVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceVoApi;
}(BaseVoApi));
__reflect(AtkraceVoApi.prototype, "AtkraceVoApi");

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
/**
 * 皇宫api
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVoApi
 */
var PalaceVoApi = (function (_super) {
    __extends(PalaceVoApi, _super);
    function PalaceVoApi() {
        return _super.call(this) || this;
    }
    PalaceVoApi.prototype.getRoleInfoByTitleId = function (id) {
        return this.palaceVo.palace[id];
    };
    PalaceVoApi.prototype.getRoleInfoList = function () {
        return this.palaceVo.palace;
    };
    PalaceVoApi.prototype.updateRoleSign = function (titleId, sign) {
        this.palaceVo.palace[titleId].sign = sign;
    };
    /**
     * 判断自己是否在宫殿之中
     */
    PalaceVoApi.prototype.isInThePalace = function () {
        for (var key in this.palaceVo.palace) {
            var element = this.palaceVo.palace[key];
            if (element.uid == Api.playerVoApi.getPlayerID()) {
                return key;
            }
        }
        return false;
    };
    PalaceVoApi.prototype.checkNpcMessage = function () {
        return Api.otherInfoVoApi.getOtherInfo().palace_flag == 0;
    };
    PalaceVoApi.prototype.isDataInit = function () {
        return (this.palaceVo && this.palaceVo.isInit);
    };
    /**
     * 是否开启跨服职称
     */
    PalaceVoApi.prototype.isCrossOpen = function () {
        return Api.switchVoApi.isCrossOpen();
    };
    PalaceVoApi.prototype.openMainView = function () {
        if (!this.isCrossOpen()) {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
        }
    };
    /**
     *  是否显示特殊标示
     */
    PalaceVoApi.prototype.isShowBuildingFlag = function (buildingId) {
        var resList = [];
        var buicfg = GameConfig.config.buildingCfg[buildingId];
        var title = buicfg.title;
        for (var key in title) {
            var rinfo = this.palaceVo.palace[title[key]];
            if (rinfo && rinfo.uid) {
                return true;
            }
        }
        return false;
    };
    return PalaceVoApi;
}(BaseVoApi));
__reflect(PalaceVoApi.prototype, "PalaceVoApi");

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
 * 红颜系统api
 * author dmj
 * date 2017/9/22
 * @class WifeVoApi
 */
var WifeVoApi = (function (_super) {
    __extends(WifeVoApi, _super);
    function WifeVoApi() {
        return _super.call(this) || this;
    }
    WifeVoApi.prototype.checkNpcMessage = function () {
        if (this.getEnergyNum() > 0 || Api.wifestatusVoApi.getIsConfer()) {
            // return LanguageManager.getlocal("wifeTipMessage");
            return true;
        }
        return false;
    };
    WifeVoApi.prototype.setWaitShowWife = function (data) {
        this.waitShowWife = data;
    };
    WifeVoApi.prototype.getWaitShowWife = function () {
        var wafe = this.waitShowWife;
        this.waitShowWife = null;
        return wafe;
    };
    // 
    WifeVoApi.prototype.getWifes = function () {
        var obj = this.wifeVo.wifeInfoVoObj;
        return Object.keys(obj);
    };
    // 获取妻子数量
    WifeVoApi.prototype.getWifeNum = function () {
        var obj = this.wifeVo.wifeInfoVoObj;
        return Object.keys(obj).length;
    };
    // 获取孩子数量
    WifeVoApi.prototype.getChildrenNum = function () {
        var num = 0;
        for (var key in this.wifeVo.wifeInfoVoObj) {
            num += this.wifeVo.wifeInfoVoObj[key].child;
        }
        return num;
    };
    /**获取红颜列表 */
    WifeVoApi.prototype.getWifeInfoVoList = function () {
        var arr = new Array();
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        for (var key in wifeInfoVoObj) {
            arr.push(wifeInfoVoObj[key]);
        }
        return arr;
    };
    /**
     * 获取未解锁红颜列表
     */
    WifeVoApi.prototype.getUnlockWifeInfoVoList = function () {
        var arr = new Array();
        var wifeListCfg = Config.WifeCfg.getWifeCfgList();
        // let vipBoo = Api.switchVoApi.checkVip1Privilege();
        for (var key in wifeListCfg) {
            if (this.getWifeInfoVoById(Number(key)) == null) {
                var curr_wifeItemCfg = wifeListCfg[key];
                if (curr_wifeItemCfg.unlock && curr_wifeItemCfg.unlock["needVip"]) {
                    var needVip = curr_wifeItemCfg.unlock["needVip"];
                    var openVipNum = Api.vipVoApi.getMaxbtnNum();
                    if (openVipNum >= needVip) {
                        arr.push(curr_wifeItemCfg);
                    }
                }
                else {
                    arr.push(curr_wifeItemCfg);
                }
            }
        }
        arr.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return arr;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    WifeVoApi.prototype.isShowNpc = function () {
        // return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
        if (this.getWifeNum() <= 0) {
            return false;
        }
        return true;
    };
    /**
     * 检测是否有有骨骼
     */
    WifeVoApi.prototype.isHaveBone = function (boneName) {
        if (PlatformManager.checkIsKRSp()) {
            var krBones = {
                "wife_full_310_ske": 1
            };
            if (!krBones[boneName]) {
                return false;
            }
        }
        if (RES.hasRes(boneName) && App.DeviceUtil.CheckWebglRenderMode() && !Api.switchVoApi.checkCloseBone()) {
            return true;
        }
        return false;
    };
    /**
     * 根据红颜id获取红颜vo
     * @param id 红颜id
     */
    WifeVoApi.prototype.getWifeInfoVoById = function (id) {
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        if (wifeInfoVoObj && wifeInfoVoObj[id.toString()]) {
            return wifeInfoVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据红颜id获取红颜列表位置
     * @param id 红颜id
     */
    WifeVoApi.prototype.getWifeIndexVoById = function (id) {
        var wifeVolist = this.getWifeInfoVoList();
        for (var i = 0; i < wifeVolist.length; i++) {
            if (id == wifeVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**获取剩余精力次数 */
    WifeVoApi.prototype.getEnergyNum = function () {
        var num = this.wifeVo.energy_num;
        var maxNum = this.getEnergyMaxNum();
        var serverTime = GameData.serverTime;
        var needTime = GameConfig.config.wifebaseCfg.needTime;
        if (num >= maxNum) {
            num = maxNum;
        }
        else {
            var count = Math.floor((serverTime - this.wifeVo.energy_st) / needTime);
            if ((num + count) >= maxNum) {
                num = maxNum;
            }
            else {
                num += count;
            }
        }
        return num;
    };
    /**获取精力最大次数 */
    WifeVoApi.prototype.getEnergyMaxNum = function () {
        var num = GameConfig.config.vipCfg[Api.playerVoApi.getPlayerVipLevel()].maxEnergy;
        return num;
    };
    /**获取恢复精力倒计时 */
    WifeVoApi.prototype.getRecoverEnergyTime = function () {
        var time = 0;
        var needTime = GameConfig.config.wifebaseCfg.needTime;
        var st = this.wifeVo.energy_st;
        if ((st + needTime) > GameData.serverTime) {
            time = st + needTime - GameData.serverTime;
        }
        return time;
    };
    /**
     * 宠幸消耗的元宝公式（跟亲密度相关）
     * 亲密度 * 10 最大值为1000元宝
     * @param intimacy 亲密度
     */
    WifeVoApi.prototype.getLoveNeedGem = function (intimacy) {
        var needGem = intimacy * 10;
        if (needGem > 1000) {
            needGem = 1000;
        }
        return needGem;
    };
    /**
     * 获取红颜赏赐红点

     */
    WifeVoApi.prototype.getGiveRed = function () {
        var cfg = Config.WifebaseCfg.wifeGift;
        for (var index = 1; index < 5; index++) {
            var key = index.toString();
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
            if (hasNum > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取红颜技能红点

     */
    WifeVoApi.prototype.getSkillRed = function (wifeId) {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.cfg.wifeSkill;
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            if (element.condition <= wifeVo.intimacy) {
                //解锁了
                var needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index] - 1];
                var hasNum = wifeVo.exp;
                if (needExp <= hasNum) {
                    return true;
                }
            }
        }
        return false;
    };
    WifeVoApi.prototype.getWifeIcon = function (wifeId) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var icon = wifeCfg.icon;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeId)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                icon = skinCfg.icon;
            }
        }
        return icon;
    };
    WifeVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
    };
    return WifeVoApi;
}(BaseVoApi));
__reflect(WifeVoApi.prototype, "WifeVoApi");

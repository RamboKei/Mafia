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
 * 红颜皮肤系统api
 * author dky
 * date 2018/3/2
 * @class WifeSkinVoApi
 */
var WifeskinVoApi = (function (_super) {
    __extends(WifeskinVoApi, _super);
    function WifeskinVoApi() {
        return _super.call(this) || this;
    }
    // 获取皮肤数量
    WifeskinVoApi.prototype.getWifeNum = function () {
        var obj = this.wifeskinVo.wifeSkinInfoVoObj;
        return Object.keys(obj).length;
    };
    /**
     * 获取红颜对应的皮肤列表
     */
    WifeskinVoApi.prototype.getWifeSkinListById = function (id) {
        var arr = new Array();
        var wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for (var key in wifeListCfg) {
            var curr_wifeItemCfg = wifeListCfg[key];
            if (id == curr_wifeItemCfg.wifeId) {
                if (curr_wifeItemCfg.id == "1012") {
                    if (Api.switchVoApi.checkOpenPrestige() == true) {
                        arr.push(curr_wifeItemCfg);
                    }
                }
                else {
                    arr.push(curr_wifeItemCfg);
                }
            }
        }
        return arr;
    };
    /**获取红颜是不是有皮肤(配置里是否有) */
    WifeskinVoApi.prototype.isHaveSkin = function (wifeId) {
        var wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for (var key in wifeListCfg) {
            var curr_wifeItemCfg = wifeListCfg[key];
            if (wifeId == curr_wifeItemCfg.wifeId) {
                return true;
            }
        }
        return false;
    };
    /**获取红颜列表 */
    WifeskinVoApi.prototype.getWifeInfoVoList = function () {
        var arr = new Array();
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        for (var key in wifeSkinInfoVoObj) {
            arr.push(wifeSkinInfoVoObj[key]);
        }
        return arr;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    WifeskinVoApi.prototype.isShowNpc = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.WifebaseCfg.unlockLv;
    };
    /**
     * 根据红颜id获取皮肤vo
     * @param id 红颜id
     */
    WifeskinVoApi.prototype.getWifeskinInfoVoById = function (id) {
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        if (wifeSkinInfoVoObj && wifeSkinInfoVoObj[id.toString()]) {
            return wifeSkinInfoVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据皮肤id获取红颜列表位置
     * @param id 红颜id
     */
    WifeskinVoApi.prototype.getWifeSkinIndexVoById = function (skinId) {
        var wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        var skinCfgList = this.getWifeSkinListById(wifeId);
        for (var i = 0; i < skinCfgList.length; i++) {
            if (skinId == skinCfgList[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 获取所有红颜是否换肤红点

     */
    WifeskinVoApi.prototype.getSkinRedAll = function () {
        var skinList = this.getWifeInfoVoList();
        for (var index = 0; index < skinList.length; index++) {
            var element = skinList[index];
            if (element) {
                for (var key in element.skin) {
                    // arr.push(elementObj[key]);
                    if (element.skin[key].red == 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 获取某个红颜是否换肤红点

     */
    WifeskinVoApi.prototype.getSkinRed = function (wifeId) {
        var wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
        if (wifeSkinInfoVo) {
            // for (var index = 0; index < wifeSkinInfoVo.skin.length; index++) {
            // 	var element = wifeSkinInfoVo.skin[index];
            // 	// if(element.red == 1)
            // 	// {
            // 	// 	return true;
            // 	// }
            // 	for(let key in element)
            // {
            // 	// arr.push(wifeSkinInfoVoObj[key]);
            // 	if(element[key].red == 1)
            // 	{
            // 		return true;
            // 	}
            // }
            // }
            for (var key in wifeSkinInfoVo.skin) {
                // arr.push(wifeSkinInfoVoObj[key]);
                if (wifeSkinInfoVo.skin[key].red == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获取某个皮肤是否换肤红点

     */
    WifeskinVoApi.prototype.getSkinOneRed = function (wifeId, skinId) {
        var wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
        if (wifeSkinInfoVo) {
            if (wifeSkinInfoVo.skin[skinId] && wifeSkinInfoVo.skin[skinId].red == 1) {
                return true;
            }
        }
        return false;
    };
    WifeskinVoApi.prototype.isOwnSkinOfSkinId = function (skinId) {
        var wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        if (this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId]) {
            return true;
        }
        return false;
    };
    WifeskinVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
    };
    return WifeskinVoApi;
}(BaseVoApi));
__reflect(WifeskinVoApi.prototype, "WifeskinVoApi");

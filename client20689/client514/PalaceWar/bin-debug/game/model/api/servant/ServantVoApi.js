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
 * 门客系统api
 * author dmj
 * date 2017/9/22
 * @class ServantVoApi
 */
var ServantVoApi = (function (_super) {
    __extends(ServantVoApi, _super);
    function ServantVoApi() {
        var _this = _super.call(this) || this;
        _this.isShowAtkraceGuide = false;
        _this.isCheckGuide = false;
        return _this;
    }
    ServantVoApi.prototype.setWaitShowData = function (data) {
        this.waitShowData = data;
    };
    ServantVoApi.prototype.getWaitShowData = function () {
        var data = this.waitShowData;
        this.waitShowData = null;
        return data;
    };
    // todo 
    ServantVoApi.prototype.getServantCount = function () {
        return Object.keys(this.servantVo.servantInfoVoObj).length;
    };
    ServantVoApi.prototype.getServantInfoList = function () {
        return this.servantVo.servantInfoVoObj;
    };
    ServantVoApi.prototype.getServantObj = function (servantId) {
        return this.servantVo.servantInfoVoObj[servantId];
    };
    //返回排序后的servantInfo 列表，结构为数组
    ServantVoApi.prototype.getServantInfoListWithSort = function (sortType) {
        sortType = sortType ? sortType : 1;
        var idList = this.getServantInfoIdListWithSort(sortType);
        var result = [];
        for (var index = 0; index < idList.length; index++) {
            result.push(this.servantVo.servantInfoVoObj[idList[index]]);
        }
        return result;
    };
    //返回经过排序后的id
    ServantVoApi.prototype.getServantInfoIdListWithSort = function (sortType) {
        var _this = this;
        //排序数据，刷新列表
        var servantListObj = this.servantVo.servantInfoVoObj;
        var keys = Object.keys(servantListObj);
        //默认排序
        if (sortType == 1) {
            // keys.sort((a:string,b:string)=>{
            // 	return Number(a) - Number(b) ;
            // });
        }
        //总属性排序
        if (sortType == 2) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (servantA.total == servantB.total) {
                    return Number(b) - Number(a);
                }
                else {
                    if (Number(servantB.total) == Number(servantA.total)) {
                        return Number(b) - Number(a);
                    }
                    return Number(servantB.total) - Number(servantA.total);
                }
                // return 0;
            });
        }
        //资质排序, 第一版不做
        if (sortType == 4) {
            // 
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                var bookAv = servantA.getTotalBookValue();
                var bookBv = servantB.getTotalBookValue();
                if (bookAv == bookBv) {
                    return Number(b) - Number(a);
                }
                else {
                    if (bookBv == bookAv) {
                        return Number(b) - Number(a);
                    }
                    return bookBv - bookAv;
                }
                // return 0;
            });
        }
        //等级排序
        if (sortType == 3) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (servantA.level == servantB.level) {
                    return Number(b) - Number(a);
                }
                else {
                    if (Number(servantB.level) == Number(servantA.level)) {
                        return Number(b) - Number(a);
                    }
                    return Number(servantB.level) - Number(servantA.level);
                }
                // return 0;
            });
        }
        return keys;
    };
    /**
     * 属性排序后的id
     * @param sortType 1武力 2智力 ，3政治  4魅力
     */
    ServantVoApi.prototype.getServantInfoIdListByProperty = function (sortType) {
        var _this = this;
        //排序数据，刷新列表
        var servantListObj = this.servantVo.servantInfoVoObj;
        var keys = Object.keys(servantListObj);
        keys.sort(function (a, b) {
            var servantA = _this.servantVo.servantInfoVoObj[a];
            var servantB = _this.servantVo.servantInfoVoObj[b];
            var valueA;
            var valueB;
            switch (sortType) {
                case 1:
                    valueA = servantA.attrVo.forceTotal;
                    valueB = servantB.attrVo.forceTotal;
                    break;
                case 2:
                    valueA = servantA.attrVo.brainsTotal;
                    valueB = servantB.attrVo.brainsTotal;
                    break;
                case 3:
                    valueA = servantA.attrVo.politicsTotal;
                    valueB = servantB.attrVo.politicsTotal;
                    break;
                case 4:
                    valueA = servantA.attrVo.charmTotal;
                    valueB = servantB.attrVo.charmTotal;
                    break;
            }
            if (valueA == valueB) {
                return Number(Number(b) - Number(a));
            }
            else {
                return Number(valueB - valueA);
            }
        });
        return keys;
    };
    /**
     * 获取门客战斗力
     *  门客武力资质 * 5000 * 门客等级 + 门客的武力属性
     */
    ServantVoApi.prototype.getServantCombatWithId = function (servantId) {
        var infoVo = this.servantVo.servantInfoVoObj[servantId];
        var value = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);
        return value;
    };
    /**
     * 获取门客武力资质
     * @param servantId
     */
    ServantVoApi.prototype.getServantForceTotalById = function (servantId) {
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var ability = servantcfg.ability;
        var infoVo = this.servantVo.servantInfoVoObj[servantId];
        var abilityCfg = GameConfig.config.abilityCfg;
        var value = 0;
        for (var index = 0; index < ability.length; index++) {
            var abilityItem = abilityCfg[String(ability[index])];
            if (abilityItem.type == 1) {
                value += abilityItem.num * infoVo.ability[index];
            }
        }
        return value;
    };
    ServantVoApi.prototype.getServantStarsNumWithId = function (servantId) {
        var servantCfg = GameConfig.config.servantCfg[servantId];
        var ability = servantCfg.ability;
        var starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }
        return starNum;
    };
    ServantVoApi.prototype.getFullImgPathWithId = function (servantId) {
        return "servant_full_" + servantId;
    };
    /**
     * 大于60级门客数量
     */
    ServantVoApi.prototype.getServantCountLevel60Plus = function () {
        var count = 0;
        var needLv = Config.AtkraceCfg.getServantLv();
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.level >= needLv) {
                count++;
            }
        }
        return count;
    };
    /**
     * 获取大于60级的门客 属性最高在上
     */
    ServantVoApi.prototype.getServantCountLevel60PlusList = function () {
        var keyArr = [];
        var needLv = Config.AtkraceCfg.getServantLv();
        var arr = this.getServantInfoIdListWithSort(2);
        for (var key in arr) {
            var servant = this.servantVo.servantInfoVoObj[arr[key]];
            if (servant.level >= needLv) {
                keyArr.push(arr[key]);
            }
        }
        return keyArr;
    };
    ServantVoApi.prototype.checkRedPoint = function () {
        if (this.isShowRedForItem())
            return true;
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.isShowRedInServantList()) {
                return true;
            }
        }
        return false;
    };
    ServantVoApi.prototype.isShowRedForItem = function () {
        var attItem = GameConfig.config.servantbaseCfg.attItem;
        for (var index = 0; index < attItem.length; index++) {
            var id = attItem[index];
            var itemVO = Api.itemVoApi.getItemInfoVoById(id);
            if (itemVO && itemVO.num > 0) {
                return true;
            }
        }
        return false;
    };
    ServantVoApi.prototype.isOwnServantDailyBoss = function () {
        if (this.getServantObj("1051")) {
            return true;
        }
        return false;
    };
    ServantVoApi.prototype.dispose = function () {
        this.isShowAtkraceGuide = false;
        this.isCheckGuide = false;
        this.waitShowData = null;
        _super.prototype.dispose.call(this);
    };
    return ServantVoApi;
}(BaseVoApi));
__reflect(ServantVoApi.prototype, "ServantVoApi");

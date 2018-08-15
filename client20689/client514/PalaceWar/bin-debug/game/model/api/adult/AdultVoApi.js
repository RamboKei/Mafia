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
 * 子嗣系统api
 * author dky
 * date 2017/10/28
 * @class AdultVoApi
 */
var AdultVoApi = (function (_super) {
    __extends(AdultVoApi, _super);
    function AdultVoApi() {
        var _this = _super.call(this) || this;
        // 子嗣扩展槽
        _this.posnum = 0;
        return _this;
    }
    AdultVoApi.prototype.checkNpcMessage = function () {
        if (this._marryList.length && this._marryList.length > 0) {
            // return LanguageManager.getlocal("adultTipMessage");
            return true;
        }
        return false;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    AdultVoApi.prototype.isShowNpc = function () {
        if (this.getAdultNum() > 0 || this.getAdultMarryNum() > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AdultVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachConditionsUnlockDesc");
    };
    AdultVoApi.prototype.formatData = function (data) {
        if (this._adultVo == null) {
            this._adultVo = new AdultVo();
        }
        if (this._adultMarryVo == null) {
            this._adultMarryVo = new AdultMarryVo();
        }
        this._adultVo.initData(data.info);
        this._adultMarryVo.initData(data.minfo);
        this._marryList = data.marry;
        this._refuseData = data.refuse;
        _super.prototype.formatData.call(this, data);
    };
    // 获取子嗣扩展槽
    AdultVoApi.prototype.getChildPosNum = function () {
        var num = Api.childVoApi.getChildPosNum();
        return num;
    };
    // 获取成年子嗣数量
    AdultVoApi.prototype.getAdultNum = function () {
        var num = this.getAdultVoList().length;
        return num;
    };
    // 获取成年结婚子嗣数量
    AdultVoApi.prototype.getAdultMarryNum = function () {
        var num = this.getAdultMarryVoList().length;
        return num;
    };
    // 获取子嗣数组
    AdultVoApi.prototype.getAdultVoList = function () {
        var adultInfoVoObj = this._adultVo.adultInfoVoObj;
        var arr = new Array();
        for (var key in adultInfoVoObj) {
            arr.push(adultInfoVoObj[key]);
        }
        // todo对数组进行排序
        arr.sort(function (a, b) {
            if (a.aquality == b.aquality) {
                return Number(a.ts) - Number(b.ts);
            }
            else {
                return Number(b.aquality) - Number(a.aquality);
            }
            // return 0;
        });
        return arr;
    };
    // 获取成亲子嗣数组
    AdultVoApi.prototype.getAdultMarryVoList = function () {
        var adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
        var arr = new Array();
        for (var key in adultInfoVoObj) {
            arr.push(adultInfoVoObj[key]);
        }
        arr.sort(function (a, b) {
            return Number(b.mts) - Number(a.mts);
            // return 0;
        });
        return arr;
    };
    /**
     * 根据性别资质获取可以联姻的子嗣列表
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultVoListById = function (quality, sex) {
        var arr = this.getAdultVoList();
        var arr2 = new Array();
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.aquality == quality && element.sex != sex && !this.getAdultIsInMarry(element.id)) {
                arr2.push(element);
            }
        }
        return arr2;
    };
    /**
     * 根据性别资质获取可以联姻的子嗣列表/属性降序
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultVoListByIdByAttr = function (quality, sex) {
        var arr = this.getAdultVoListById(quality, sex);
        arr.sort(function (a, b) {
            return Number(b.attrVo.attTotal) - Number(a.attrVo.attTotal);
            // return 0;
        });
        return arr;
    };
    /**
     * 根据子嗣id获取子嗣vo
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultInfoVoById = function (id) {
        var adultInfoVoObj = this._adultVo.adultInfoVoObj;
        if (adultInfoVoObj && adultInfoVoObj[id]) {
            return adultInfoVoObj[id];
        }
        return null;
    };
    /**
     * 根据子嗣id获取成亲子嗣vo
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultMarryInfoVoById = function (id) {
        var adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
        if (adultInfoVoObj && adultInfoVoObj[id]) {
            return adultInfoVoObj[id];
        }
        return null;
    };
    /**
     * 根据子嗣id获取子嗣列表位置
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultIndexVoById = function (id) {
        var adultVolist = this.getAdultVoList();
        for (var i = 0; i < adultVolist.length; i++) {
            if (id == adultVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据子嗣id获取结婚子嗣列表位置
     * @param id 子嗣id
     */
    AdultVoApi.prototype.getAdultMarryIndexVoById = function (id) {
        var adultVolist = this.getAdultMarryVoList();
        for (var i = 0; i < adultVolist.length; i++) {
            if (id == adultVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    // 获取子嗣是否在提亲
    AdultVoApi.prototype.getAdultIsInMarry = function (id) {
        var adultInfoVo = this.getAdultInfoVoById(id);
        var lastTime = 0;
        if (adultInfoVo.pro && adultInfoVo.pro[0]) {
            lastTime = adultInfoVo.pro[0] - GameData.serverTime;
        }
        if (lastTime > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    // 获取子嗣图片
    AdultVoApi.prototype.getAdultPic = function (id) {
        var adultInfoVo = this.getAdultInfoVoById(id);
        var childPic = "adult_boy";
        if (adultInfoVo.sex == 2) {
            childPic = "adult_girl";
        }
        return childPic;
    };
    // 获取子嗣说的话
    AdultVoApi.prototype.getAdultWord = function (id) {
        var childInfoVo = this.getAdultInfoVoById(id);
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var childState = childInfoVo.level / childCfg.lv;
        var childWords = "";
        var wordIndex = 1;
        if (childState < 0.4) {
            wordIndex = App.MathUtil.getRandom(1, 3);
            childWords = LanguageManager.getlocal("child_words1_" + wordIndex);
        }
        else if (childState >= 0.4 || childState < 1) {
            wordIndex = App.MathUtil.getRandom(1, 5);
            childWords = LanguageManager.getlocal("child_words2_" + wordIndex);
        }
        else {
        }
        return childWords;
    };
    AdultVoApi.prototype.dispose = function () {
        this._adultVo = null;
        this.posnum = 0;
        this._marryList = null;
        this._refuseData = null;
        _super.prototype.dispose.call(this);
    };
    return AdultVoApi;
}(BaseVoApi));
__reflect(AdultVoApi.prototype, "AdultVoApi");

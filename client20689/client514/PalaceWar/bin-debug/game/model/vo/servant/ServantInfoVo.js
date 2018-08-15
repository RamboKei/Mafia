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
 * 门客vo
 * author dmj
 * date 2017/9/22
 * @class ServantInfoVo
 */
var ServantInfoVo = (function (_super) {
    __extends(ServantInfoVo, _super);
    function ServantInfoVo() {
        var _this = _super.call(this) || this;
        // 等级
        _this.level = 0;
        // 已升级经验
        _this.hasexp = 0;
        // 总属性
        _this.total = 0;
        // 资质todo，第一版不升级，等级默认为1
        _this.servantId = "";
        _this.skillExp = 0;
        _this.clv = 0;
        _this.skill = [];
        _this.abilityExp = 0;
        /**
         * 特殊门客的光环信息
         */
        _this.aura = 0;
        return _this;
    }
    ServantInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.lv != null) {
                this.level = Number(data.lv);
            }
            if (data.hasexp != null) {
                this.hasexp = Number(data.hasexp);
            }
            if (data.total != null) {
                var curTotal = this.total;
                this.total = Number(data.total);
                // if(curTotal!=0 && this.total - curTotal >0){
                // 	let dis = this.total - curTotal;
                // 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
                // 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
                // 	let powerFly = new PowerFly();
                // 	powerFly.init(dis);
                // 	LayerManager.msgLayer.addChild(powerFly);	
                // }
            }
            if (this.attrVo == null) {
                this.attrVo = new ServantAttrVo();
            }
            if (data.skillExp != null) {
                this.skillExp = data.skillExp;
            }
            if (data.clv != null) {
                this.clv = data.clv;
            }
            if (data.ability != null) {
                this.ability = data.ability;
            }
            if (data.skill != null) {
                this.skill = data.skill;
            }
            if (data.abilityExp != null) {
                this.abilityExp = data.abilityExp;
            }
            if (data.aura != null) {
                this.aura = data.aura;
            }
            this.attrVo.initData(data);
        }
    };
    Object.defineProperty(ServantInfoVo.prototype, "halfImgPath", {
        //获取头像资源
        get: function () {
            return "servant_half_" + this.servantId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "fullImgPath", {
        //获取全身像资源
        get: function () {
            return "servant_full_" + this.servantId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "qualityBoxImgPath", {
        // //获取名字资源
        // public get nameImgPath():string{
        // 	return "name_" + this.servantId;
        // }
        //获取品质框资源
        get: function () {
            return "servant_cardbg_" + this.clv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "servantName", {
        //获取门客名字
        get: function () {
            return LanguageManager.getlocal("servant_name" + this.servantId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "sound", {
        //获取声音
        get: function () {
            return "effect_servant_" + this.servantId;
        },
        enumerable: true,
        configurable: true
    });
    ServantInfoVo.prototype.isAtMaxLv = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level == topLV && !servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAtTopLv = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isLvEnableForAdvance = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV && servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAdvanceEnable = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV && servantLvList[String(this.clv + 1)]) {
            var needItem = servantLvList[String(this.clv + 1)].needItem;
            for (var key in needItem) {
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(Number(key));
                if (ownNum < needItem[key])
                    return false;
            }
            //判断道具
            return true;
        }
        return false;
    };
    /**
     * 技能是否可升级
     */
    ServantInfoVo.prototype.isSkillLvUpEnable = function () {
        var baseCfg = GameConfig.config.servantbaseCfg;
        var skillUpgradeExp = baseCfg.skillUpgradeExp;
        var maxLv = baseCfg.skillLvLimit;
        // baseCfg.servantLvList[String(this.clv)].upLv
        for (var index = 0; index < this.skill.length; index++) {
            var skillLv = this.skill[index];
            if (skillLv < maxLv && this.skillExp >= skillUpgradeExp[skillLv - 1]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 红颜技能是否可升级，可以则返回aid
     */
    ServantInfoVo.prototype.isBookLvUpEnable = function () {
        var abilitybaseCfg = GameConfig.config.abilitybaseCfg;
        var typeList = abilitybaseCfg.typeList;
        var numList = abilitybaseCfg.numList;
        var idxList = {};
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = this.ability[String(index2)];
            var curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
            var abilityExp = numList[String(tmpAcfg.num)].abilityExp;
            if (aLv < curClvCfg.abilityLv) {
                var ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
                if (abilityExp <= this.abilityExp || ownNum1 >= 1) {
                    idxList[String(index2)] = index2;
                }
            }
        }
        if (Object.keys(idxList).length > 0) {
            return idxList;
        }
        else {
            return false;
        }
    };
    /**
     * 是否在门客列表中显示红点
     */
    ServantInfoVo.prototype.isShowRedInServantList = function () {
        if (Api.servantVoApi.isShowRedForItem() || this.isAdvanceEnable() || this.isSkillLvUpEnable() || this.isBookLvUpEnable() || this.isShowRedForaura()) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.getTotalBookValue = function () {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = this.ability[String(index2)];
            var txtIdx = index2 * 2;
            totalBookV += aLv * tmpAcfg.num;
        }
        return totalBookV;
    };
    ServantInfoVo.prototype.isShowRedForaura = function () {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        if (servantCfg.aura) {
            var aura2 = servantCfg.aura["2"];
            if (aura2.maxLv > this.aura["2"]) {
                var growNeed2 = aura2.growNeed2;
                var resTab = App.StringUtil.splitString(growNeed2, "_");
                if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                    return true;
                }
            }
        }
        return false;
    };
    ServantInfoVo.prototype.dispose = function () {
        this.level = 0;
        this.hasexp = 0;
        this.total = 0;
        this.skillExp = 0;
        this.clv = 0;
        this.ability = {};
        this.skill = [];
        this.abilityExp = 0;
        this.aura = {};
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
    };
    return ServantInfoVo;
}(BaseVo));
__reflect(ServantInfoVo.prototype, "ServantInfoVo");

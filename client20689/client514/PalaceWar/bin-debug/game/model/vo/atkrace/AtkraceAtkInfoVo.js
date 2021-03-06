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
var AtkraceAtkInfoVo = (function (_super) {
    __extends(AtkraceAtkInfoVo, _super);
    function AtkraceAtkInfoVo() {
        var _this = _super.call(this) || this;
        /**
         * 对战玩家,
         */
        _this.uid = "";
        /**
         * 对战玩家,
         */
        _this.fname = "";
        /**
         * 对战玩家分数
         */
        _this.fpoint = 0;
        /**
         * 玩家剩余门客
         */
        _this.sids = {};
        /**
         * 战斗类型 1随机 2复仇 3挑战 4追杀
         */
        _this.atype = 0;
        /**
         * 我出战门客
         */
        _this.mesid = null;
        /**
         * 当前对战门客
         */
        _this.fids = {};
        /**
         * 战胜次数
         */
        _this.fightnum = 0;
        /**
         * 总门客数
         */
        _this.total = 0;
        /**
         *  -1再议 1准奏
         */
        _this.handle = 0;
        /**
         *  tmpattr:临时属性{blood血量加成:,atk攻击加成:,skill技能加成, list:[2:{},3:{},4:{}], isbuy:1是/0否},
         */
        _this.tmpattr = {};
        return _this;
    }
    AtkraceAtkInfoVo.prototype.initData = function (data) {
        if (data) {
            this.uid = data.uid;
            this.fname = data.fname;
            this.sids = data.sids;
            this.atype = data.atype;
            this.fpoint = data.fpoint;
            if (data.mesid != null) {
                this.mesid = new AtkraceServantVo();
                this.mesid.initData(data.mesid);
            }
            else {
                if (this.mesid) {
                    this.mesid.dispose();
                    this.mesid = null;
                }
            }
            if (data.fids != null) {
                for (var key in data.fids) {
                    if (this.fids[key]) {
                        this.fids[key].initData(data.fids[key]);
                    }
                    else {
                        var servantInfoVo = new AtkraceServantVo();
                        servantInfoVo.id = key;
                        servantInfoVo.initData(data.fids[key]);
                        this.fids[key] = servantInfoVo;
                    }
                }
                for (var key in this.fids) {
                    if (!data.fids[key]) {
                        delete this.fids[key];
                    }
                }
            }
            else {
                for (var key in this.fids) {
                    this.fids[key].dispose();
                }
                this.fids = {};
            }
        }
        if (data.fightnum != null) {
            this.fightnum = data.fightnum;
        }
        else {
            this.fightnum = 0;
        }
        if (data.total != null) {
            this.total = data.total;
        }
        else {
            this.total = 0;
        }
        this.handle = data.handle;
        this.tmpattr = data.tmpattr;
    };
    AtkraceAtkInfoVo.prototype.getFName = function () {
        var nameStr = this.fname;
        if (this.uid == "robot") {
            nameStr = LanguageManager.getlocal("atkRaceRobotName" + this.fname);
        }
        return nameStr;
    };
    AtkraceAtkInfoVo.prototype.dispose = function () {
        this.uid = null;
        this.fname = null;
        this.sids = null;
        this.fpoint = 0;
        this.atype = 0;
        this.fids = null;
        if (this.mesid) {
            this.mesid.dispose();
            this.mesid = null;
        }
        for (var key in this.fids) {
            this.fids[key].dispose();
        }
        this.fids = {};
        this.fightnum = 0;
        this.total = 0;
        this.handle = 0;
        this.tmpattr = null;
    };
    return AtkraceAtkInfoVo;
}(BaseVo));
__reflect(AtkraceAtkInfoVo.prototype, "AtkraceAtkInfoVo");

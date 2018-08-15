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
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeInfoVo
 */
var WifeInfoVo = (function (_super) {
    __extends(WifeInfoVo, _super);
    function WifeInfoVo() {
        var _this = _super.call(this) || this;
        // id
        _this.id = 0;
        // 亲密度
        _this.intimacy = 0;
        // 魅力
        _this.glamour = 0;
        // 经验
        _this.exp = 0;
        // 儿子数量
        _this.child = 0;
        return _this;
    }
    WifeInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.intimacy != null) {
                this.intimacy = Number(data.intimacy);
            }
            if (data.exp != null) {
                this.exp = Number(data.exp);
            }
            if (data.child != null) {
                this.child = Number(data.child);
            }
            if (data.skill != null) {
                this.skill = data.skill;
            }
            if (data.glamour != null) {
                this.glamour = Number(data.glamour);
            }
        }
    };
    Object.defineProperty(WifeInfoVo.prototype, "name", {
        /**红颜名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "desc", {
        /**红颜描述 */
        get: function () {
            return this.cfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "words", {
        /**红颜说的话 */
        get: function () {
            return this.cfg.words;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "unlock", {
        /**红颜解锁条件 */
        get: function () {
            return this.cfg.wifeunlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bg", {
        /**红颜背景 */
        get: function () {
            return this.cfg.bg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "icon", {
        /**红颜icon */
        get: function () {
            return this.cfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "body", {
        /**红颜半身像 */
        get: function () {
            return this.cfg.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "body2", {
        /**红颜脱衣半身像 */
        get: function () {
            return this.cfg.body2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bone", {
        /**红颜骨骼 */
        get: function () {
            return this.cfg.bone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bone2", {
        /**红颜脱衣服骨骼 */
        get: function () {
            return this.cfg.bone2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "sound", {
        get: function () {
            return this.cfg.sound;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "cfg", {
        get: function () {
            return Config.WifeCfg.getWifeCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    WifeInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.intimacy = 0;
        this.exp = 0;
        this.child = 0;
        this.skill = null;
        this.glamour = 0;
    };
    return WifeInfoVo;
}(BaseVo));
__reflect(WifeInfoVo.prototype, "WifeInfoVo");

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
 * @class WifeskinInfoVo
 */
var WifeskinInfoVo = (function (_super) {
    __extends(WifeskinInfoVo, _super);
    function WifeskinInfoVo() {
        var _this = _super.call(this) || this;
        // 红颜id
        _this.id = "";
        return _this;
    }
    WifeskinInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.skin != null) {
                this.skin = data.skin;
            }
            if (data.equip != null) {
                this.equip = data.equip;
            }
        }
    };
    Object.defineProperty(WifeskinInfoVo.prototype, "name", {
        /**红颜名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "desc", {
        /**红颜描述 */
        get: function () {
            return this.cfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "words", {
        /**红颜说的话 */
        get: function () {
            return this.cfg.words;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "cfg", {
        get: function () {
            return Config.WifeskinCfg.getWifeCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    WifeskinInfoVo.prototype.dispose = function () {
        this.id = "";
        this.skin = 0;
        this.equip = null;
    };
    return WifeskinInfoVo;
}(BaseVo));
__reflect(WifeskinInfoVo.prototype, "WifeskinInfoVo");

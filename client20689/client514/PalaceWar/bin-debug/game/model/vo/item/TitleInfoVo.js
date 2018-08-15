/**
 * 称号道具vo
 * author shaoliang
 * date 2017/10/28
 * @class TitleInfoVo
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
var TitleInfoVo = (function (_super) {
    __extends(TitleInfoVo, _super);
    function TitleInfoVo() {
        var _this = _super.call(this) || this;
        // 道具id
        _this.id = 0;
        // 道具状态 -1 没有 0 有， 1，已使用 ，2已装配
        _this.num = -1;
        return _this;
    }
    TitleInfoVo.prototype.initData = function (data) {
        if (data.id != null) {
            this.id = Number(data.id);
        }
        else {
        }
        if (data.num != null) {
            this.num = Number(data.num);
        }
        else {
            this.num = -1;
        }
    };
    Object.defineProperty(TitleInfoVo.prototype, "name", {
        // 道具名称
        get: function () {
            return this.itemCfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "desc", {
        // 道具描述
        get: function () {
            return this.itemCfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "dropDesc", {
        get: function () {
            return this.itemCfg.dropDesc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "icon", {
        // icon图
        get: function () {
            return this.itemCfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "iconBg", {
        // 背景图片
        get: function () {
            return this.itemCfg.iconBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "quality", {
        // 资质
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.quality;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isShowUseBtn", {
        // 是否显示使用按钮
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isUse == 1;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isOnly", {
        // 是否是全服唯一称号
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isOnly == 1;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "sortId", {
        // 排序id
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.sortId;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "type", {
        // 类型，1：道具 2：合成 3：时装
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.type;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "itemCfg", {
        // 该道具配置
        get: function () {
            return Config.TitleCfg.getTitleCfgById(this.id);
        },
        enumerable: true,
        configurable: true
    });
    TitleInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.num = -1;
    };
    return TitleInfoVo;
}(BaseVo));
__reflect(TitleInfoVo.prototype, "TitleInfoVo");

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
 * 道具信息vo
 * author dmj
 * date 2017/9/22
 * @class ItemVo
 */
var ItemVo = (function (_super) {
    __extends(ItemVo, _super);
    function ItemVo() {
        var _this = _super.call(this) || this;
        // 数据上次更新时间
        _this.updated_at = 0;
        // 道具列表
        _this.itemInfoVoObj = null;
        // 称号列表
        _this.titleInfoVoObj = null;
        /**
         * 道具合成
         */
        _this.cinfo = {};
        _this.sinfo = null;
        return _this;
    }
    ItemVo.prototype.initData = function (data) {
        if (data) {
            if (data.updated_at != null) {
                this.updated_at = Number(data.updated_at);
            }
            if (data.info) {
                if (this.itemInfoVoObj == null) {
                    this.itemInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.itemInfoVoObj[key]) {
                        this.itemInfoVoObj[key].initData({ id: Number(key), num: data.info[key] });
                    }
                    else {
                        var itemInfoVo = new ItemInfoVo();
                        itemInfoVo.initData({ id: Number(key), num: data.info[key] });
                        this.itemInfoVoObj[key] = itemInfoVo;
                    }
                }
            }
            if (this.titleInfoVoObj == null) {
                this.titleInfoVoObj = {};
                var titleCfg = Config.TitleCfg.getTitleCfg();
                for (var key in titleCfg) {
                    var titleInfoVo = new TitleInfoVo();
                    titleInfoVo.initData({ id: Number(key), num: -1 });
                    this.titleInfoVoObj[key] = titleInfoVo;
                }
            }
            if (data.tinfo) {
                for (var key in this.titleInfoVoObj) {
                    if (data.tinfo[key] != null) {
                        this.titleInfoVoObj[key].initData({ id: Number(key), num: data.tinfo[key] });
                    }
                    else {
                        this.titleInfoVoObj[key].initData({ id: Number(key), num: -1 });
                    }
                }
            }
            if (data.cinfo) {
                this.cinfo = data.cinfo;
            }
            if (Api.servantVoApi.isShowRedForItem()) {
                App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE, "servant");
            }
            if (data.sinfo) {
                this.sinfo = data.sinfo;
            }
        }
    };
    /**
     * 刷新道具合成信息
     * @param data
     */
    ItemVo.prototype.setcinfo = function (data) {
        if (!this.cinfo) {
            this.cinfo = data;
        }
        else {
            if (data.st) {
                this.cinfo.st = data.st;
            }
            if (data.version) {
                this.cinfo.version = data.version;
            }
            if (data.et) {
                this.cinfo.et = data.et;
            }
        }
    };
    ItemVo.prototype.dispose = function () {
        this.updated_at = 0;
        if (this.itemInfoVoObj) {
            for (var key in this.itemInfoVoObj) {
                if (this.itemInfoVoObj[key]) {
                    this.itemInfoVoObj[key].dispose();
                    this.itemInfoVoObj[key] = null;
                }
            }
        }
        this.itemInfoVoObj = null;
        if (this.titleInfoVoObj) {
            for (var key in this.titleInfoVoObj) {
                (this.titleInfoVoObj[key]);
                {
                    this.titleInfoVoObj[key].dispose();
                    this.titleInfoVoObj[key] = null;
                }
            }
        }
        this.titleInfoVoObj = null;
    };
    return ItemVo;
}(BaseVo));
__reflect(ItemVo.prototype, "ItemVo");

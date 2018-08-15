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
 * 其他杂项vo
 * author yanyuling
 * date 2017/10/27
 * @class OtherInfoVo
 */
var OtherInfoVo = (function (_super) {
    __extends(OtherInfoVo, _super);
    function OtherInfoVo() {
        var _this = _super.call(this) || this;
        _this.imacy = 0;
        _this.power = 0;
        _this.challenge = 0;
        _this.palace_flag = 0;
        _this.banet = 0; //禁言时间
        _this.certification = null;
        return _this;
    }
    OtherInfoVo.prototype.initData = function (data) {
        if (data.rv_info) {
            if (data.rv_info.imacy) {
                this.imacy = data.rv_info.imacy;
            }
            if (data.rv_info.power) {
                this.power = data.rv_info.power;
            }
            if (data.rv_info.challenge) {
                this.challenge = data.rv_info.challenge;
            }
        }
        if (data.palace) {
            this.palace_flag = data.palace.flag;
        }
        if (data.info) {
            this.info = data.info;
        }
        if (data.banet) {
            this.banet = data.banet;
        }
        if (data.info && data.info.certification) {
            this.certification = data.info.certification;
        }
    };
    OtherInfoVo.prototype.dispose = function () {
        this.imacy = 0;
        this.power = 0;
        this.challenge = 0;
        this.palace_flag = 0;
        this.banet = 0;
        this.info = null;
        this.certification = null;
    };
    return OtherInfoVo;
}(BaseVo));
__reflect(OtherInfoVo.prototype, "OtherInfoVo");

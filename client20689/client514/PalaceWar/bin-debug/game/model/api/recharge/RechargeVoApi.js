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
var RechargeVoApi = (function (_super) {
    __extends(RechargeVoApi, _super);
    function RechargeVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测是否还有首充
     */
    RechargeVoApi.prototype.checkFirstRecharge = function () {
        return Api.shopVoApi.getPayFlag() == 0;
    };
    return RechargeVoApi;
}(BaseVoApi));
__reflect(RechargeVoApi.prototype, "RechargeVoApi");

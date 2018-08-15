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
var GameinfoVoApi = (function (_super) {
    __extends(GameinfoVoApi, _super);
    function GameinfoVoApi() {
        return _super.call(this) || this;
    }
    GameinfoVoApi.prototype.getRegdt = function () {
        return this.gameinfoVo ? this.gameinfoVo.regdt : 0;
    };
    GameinfoVoApi.prototype.getGuideStep = function () {
        return this.gameinfoVo ? this.gameinfoVo.newerflag : 0;
    };
    GameinfoVoApi.prototype.getDownType = function () {
        if (this.gameinfoVo && this.gameinfoVo.info && this.gameinfoVo.info.downType) {
            return this.gameinfoVo.info.downType;
        }
        else {
            return "";
        }
    };
    return GameinfoVoApi;
}(BaseVoApi));
__reflect(GameinfoVoApi.prototype, "GameinfoVoApi");

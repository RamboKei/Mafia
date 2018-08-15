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
var CityScene = (function (_super) {
    __extends(CityScene, _super);
    function CityScene() {
        return _super.call(this) || this;
    }
    CityScene.prototype.setLayerPosition = function () {
        _super.prototype.setLayerPosition.call(this);
        this._mapLayer.setPosition(0, 0);
    };
    CityScene.prototype.checkDinnerClose = function () {
        return Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv() ? LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]) : null;
    };
    CityScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CityScene;
}(BaseScene));
__reflect(CityScene.prototype, "CityScene");

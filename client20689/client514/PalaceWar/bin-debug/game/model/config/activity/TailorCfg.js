var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var TailorCfg = (function () {
            function TailorCfg() {
            }
            TailorCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return TailorCfg;
        }());
        AcCfg.TailorCfg = TailorCfg;
        __reflect(TailorCfg.prototype, "Config.AcCfg.TailorCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));

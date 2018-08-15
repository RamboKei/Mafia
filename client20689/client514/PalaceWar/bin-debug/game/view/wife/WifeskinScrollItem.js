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
 * 皮肤头像
 * author dky
 * date 2018/3/5
 * @class WifeskinScrollItem
 */
var WifeskinScrollItem = (function (_super) {
    __extends(WifeskinScrollItem, _super);
    function WifeskinScrollItem() {
        return _super.call(this) || this;
    }
    WifeskinScrollItem.prototype.initItem = function (index, wifeSkinItemCfg) {
        this.width = 115 + this.getSpaceX();
        this.height = 110;
        var iconBg = BaseBitmap.create("tailor_iconBtn");
        // nameBg.width = this.width;
        iconBg.name = "bg2";
        this.addChild(iconBg);
        var iconStr = "";
        if (wifeSkinItemCfg) {
            iconStr = wifeSkinItemCfg.icon;
        }
        else {
            var cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId);
            iconStr = cfg.icon;
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setScale(0.5);
        // icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(55, 44, 44);
        circle.graphics.endFill();
        this.addChild(circle);
        icon.mask = circle;
        this.cacheAsBitmap = true;
        this.addChild(icon);
        var skillDotSp = BaseBitmap.create("public_dot2");
        skillDotSp.x = 80;
        skillDotSp.y = 5;
        skillDotSp.name = "redsp";
        this.addChild(skillDotSp);
        if (wifeSkinItemCfg) {
            if (!Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId, wifeSkinItemCfg.id)) {
                skillDotSp.visible = false;
            }
        }
        else {
            skillDotSp.visible = false;
        }
    };
    WifeskinScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    WifeskinScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeskinScrollItem;
}(ScrollListItem));
__reflect(WifeskinScrollItem.prototype, "WifeskinScrollItem");

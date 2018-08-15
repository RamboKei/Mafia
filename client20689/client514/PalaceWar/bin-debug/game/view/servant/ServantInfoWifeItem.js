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
 * 门客详情 技能信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoWifeItem
 */
var ServantInfoWifeItem = (function (_super) {
    __extends(ServantInfoWifeItem, _super);
    function ServantInfoWifeItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._wifeId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoWifeItem.prototype.init = function (servantId, bottomH) {
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        this._wifeId = servantcfg.wifeId;
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var wifeSkill = wifecfg.wifeSkill;
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 520;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 90;
        this.addChild(line1);
        var wifeTip = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        wifeTip.textColor = TextFieldConst.COLOR_BROWN;
        var str2 = "";
        if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)) {
            str2 = LanguageManager.getlocal("servant_wife_own");
        }
        else {
            str2 = LanguageManager.getlocal("servant_wife_not_own");
        }
        wifeTip.text = LanguageManager.getlocal("servant_wifeTip", [wifecfg.name, str2]);
        wifeTip.x = GameConfig.stageWidth / 2 - wifeTip.width / 2;
        wifeTip.y = line1.y + line1.height / 2 - wifeTip.height / 2;
        this.addChild(wifeTip);
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 150);
        ServantInfoWifeItemScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem, list, rect);
        scrollView.y = 120;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantInfoWifeItem.prototype.servantWifeLevelupHandler = function () {
    };
    ServantInfoWifeItem.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoWifeItem;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoWifeItem.prototype, "ServantInfoWifeItem");

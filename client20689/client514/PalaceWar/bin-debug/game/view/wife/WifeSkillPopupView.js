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
 * 红颜技能
 * author dky
 * date 2017/11/18
 * @class WifeSkillPopupView
 */
var WifeSkillPopupView = (function (_super) {
    __extends(WifeSkillPopupView, _super);
    function WifeSkillPopupView() {
        var _this = _super.call(this) || this;
        // private _text2:BaseTextField;
        _this._index = 0;
        return _this;
    }
    WifeSkillPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        this._handler = this.param.data.handler;
        this._confirmCallback = this.param.data.confirmCallback;
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        WifeSkillPopupView.wifeId = id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var serBg = serCfg.qualityBoxImgPath;
        if (Api.servantVoApi.getServantObj(cfg.servantId)) {
            var serVo = Api.servantVoApi.getServantObj(cfg.servantId);
            serBg = serVo.qualityBoxImgPath;
        }
        var temW = 108;
        var iconBgBt = BaseLoadBitmap.create(serBg);
        iconBgBt.x = 30;
        iconBgBt.y = 15;
        this.addChildToContainer(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(serCfg.halfIcon);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChildToContainer(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        var nameStr = LanguageManager.getlocal("wifeSkillServant", [serCfg.name]);
        var nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = 150;
        nameTF.y = 20;
        this.addChildToContainer(nameTF);
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            var getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            getTF.x = nameTF.x + nameTF.width + 5;
            getTF.y = nameTF.y;
            this.addChildToContainer(getTF);
            var maskBt = BaseBitmap.create("wifeview_mask");
            maskBt.x = iconBgBt.x;
            maskBt.y = iconBgBt.y;
            this.addChildToContainer(maskBt);
        }
        var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
        this._text1 = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._text1.x = nameTF.x;
        this._text1.y = nameTF.y + nameTF.height + 15;
        this.addChildToContainer(this._text1);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        tipTF.x = nameTF.x;
        tipTF.y = this._text1.y + this._text1.height + 15;
        this.addChildToContainer(tipTF);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 535;
        bottomBg.height = 535;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 135;
        this.addChildToContainer(bottomBg);
        // let list1: Array<number> = new Array();
        // for (var index = 0; index < this._wifeInfoVo.cfg.wifeSkill.length; index++) {
        // 	list1.push(index)
        // }
        var list = this._wifeInfoVo.cfg.wifeSkill;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 525, 535);
        this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem, list, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 5);
    };
    WifeSkillPopupView.prototype.doGive = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(), key: data.index });
    };
    //请求回调
    WifeSkillPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            var id = this.param.data.id;
            this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
            this._text1.text = expStr;
            // this._text2.text = this._wifeInfoVo.glamour.toString();
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
    };
    WifeSkillPopupView.prototype.refreshHandler = function () {
    };
    WifeSkillPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    WifeSkillPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._confirmCallback = null;
        this._handler = null;
        this._wifeInfoVo = null;
        this._text1 = null;
        // this._text2 = null;
        this._index = null;
        WifeSkillPopupView.wifeId = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        _super.prototype.dispose.call(this);
    };
    WifeSkillPopupView.wifeId = null;
    return WifeSkillPopupView;
}(PopupView));
__reflect(WifeSkillPopupView.prototype, "WifeSkillPopupView");

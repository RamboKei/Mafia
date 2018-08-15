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
 * 副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossPopupView
 */
var AllianceBossPopupView = (function (_super) {
    __extends(AllianceBossPopupView, _super);
    function AllianceBossPopupView() {
        return _super.call(this) || this;
    }
    AllianceBossPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG), this.showBossLog, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._topTipTF.x = this.viewBg.width / 2 - this._topTipTF.width / 2;
        this._topTipTF.y = 20;
        this._nodeContainer.addChild(this._topTipTF);
        var tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
        var alliVo = Api.allianceVoApi.getAllianceVo();
        var myAlliLv = alliVo.level;
        var dataList = [];
        for (var index = 0; index < tmpList.length; index++) {
            if (Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index]).needAllianceLv <= myAlliLv) {
                dataList.push(tmpList[index]);
            }
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, this.viewBg.width, 690);
        this._scrollList = ComponentManager.getScrollList(AllianceBossScrollItem, dataList, rect);
        this._scrollList.x = 25;
        this._scrollList.y = this._topTipTF.y + 30;
        this._nodeContainer.addChild(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));
        var bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        bottomTipTxt.x = this.viewBg.width / 2 - bottomTipTxt.width / 2;
        bottomTipTxt.y = this._scrollList.y + rect.height + 10;
        this._nodeContainer.addChild(bottomTipTxt);
    };
    AllianceBossPopupView.prototype.showBossLog = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
        }
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    AllianceBossPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    AllianceBossPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            ,
            "searchbinfowifebg", "progress5", "progress3_bg", "alliance_effect",
            "allianceBossbg",
        ]);
    };
    AllianceBossPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG), this.showBossLog, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._nodeContainer = null;
        this._topTipTF = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossPopupView;
}(PopupView));
__reflect(AllianceBossPopupView.prototype, "AllianceBossPopupView");

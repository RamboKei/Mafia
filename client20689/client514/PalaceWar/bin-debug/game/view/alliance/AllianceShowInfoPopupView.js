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
 * 查看帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceShowInfoPopupView
 */
var AllianceShowInfoPopupView = (function (_super) {
    __extends(AllianceShowInfoPopupView, _super);
    function AllianceShowInfoPopupView() {
        return _super.call(this) || this;
    }
    AllianceShowInfoPopupView.prototype.initView = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        // itemInfo.ic
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 565;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 500;
        bg1.height = 226;
        bg1.setPosition(this.viewBg.width / 2 - bg1.width / 2, 70);
        this.addChildToContainer(bg1);
        var nameStr = LanguageManager.getlocal("allianceFindInfo1", [this._allianceInfo.name, this._allianceInfo.level]);
        var info1TF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info1TF.x = 50;
        info1TF.y = 40;
        this.addChildToContainer(info1TF);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(this._allianceInfo.level);
        var info3Str = LanguageManager.getlocal("allianceFindInfo3", [this._allianceInfo.exp + "/" + allianceCfg.exp]);
        var info3TF = ComponentManager.getTextField(info3Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info3TF.y = info1TF.y + info1TF.height + 20;
        info3TF.x = info1TF.x;
        this.addChildToContainer(info3TF);
        var info4Str = LanguageManager.getlocal("allianceFindInfo4", [this._allianceInfo.wealth]);
        var info4TF = ComponentManager.getTextField(info4Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info4TF.y = info3TF.y + info3TF.height + 10;
        info4TF.x = info1TF.x;
        this.addChildToContainer(info4TF);
        var info5Str = LanguageManager.getlocal("allianceFindInfo5", [this._allianceInfo.affect]);
        var info5TF = ComponentManager.getTextField(info5Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info5TF.y = info4TF.y + info4TF.height + 10;
        info5TF.x = info1TF.x;
        this.addChildToContainer(info5TF);
        var info7Str = LanguageManager.getlocal("allianceFindInfo7", [this._allianceInfo.cqq]);
        var info7TF = ComponentManager.getTextField(info7Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info7TF.y = info5TF.y + info5TF.height + 10;
        info7TF.x = info1TF.x;
        this.addChildToContainer(info7TF);
        var info8Str = LanguageManager.getlocal("allianceFindInfo8", [this._allianceInfo.intro]);
        var info8TF = ComponentManager.getTextField(info8Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info8TF.y = info7TF.y + info7TF.height + 10;
        info8TF.x = info1TF.x;
        info8TF.width = 480;
        info8TF.lineSpacing = 5;
        this.addChildToContainer(info8TF);
        var info6Str = LanguageManager.getlocal("allianceFindInfo6", [this._allianceInfo.mn + "/" + this._allianceInfo.maxmn]);
        var info6TF = ComponentManager.getTextField(info6Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info6TF.y = bg1.y + bg1.height + 10;
        info6TF.x = info1TF.x;
        this.addChildToContainer(info6TF);
        var bg2 = BaseBitmap.create("public_9_probiginnerbg");
        bg2.width = 500;
        bg2.height = 250;
        bg2.setPosition(this.viewBg.width / 2 - bg2.width / 2, bg1.y + bg1.height + 40);
        this.addChildToContainer(bg2);
        var titleBg = BaseBitmap.create("dinner_rank_titlebg");
        titleBg.width = bg2.width;
        titleBg.height = 36;
        titleBg.setPosition(bg2.x, bg2.y);
        this.addChildToContainer(titleBg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(120, titleBg.y + titleBg.height / 2 - nameText.height / 2);
        this.addChildToContainer(nameText);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(387, titleBg.y + titleBg.height / 2 - scoreText.height / 2);
        this.addChildToContainer(scoreText);
        var dataList = this._allianceMemberInfo;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 10, bg2.height - 50);
        var scrollList = ComponentManager.getScrollList(AllianceShowInfoScrollItem, dataList, rect);
        this.addChildToContainer(scrollList);
        scrollList.x = bg1.x + 5;
        scrollList.y = titleBg.y + titleBg.height + 3;
    };
    /**
     * 获取
     */
    AllianceShowInfoPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETDETAILS, requestData: { allianceId: this.param.data.aid } };
    };
    //请求回调
    AllianceShowInfoPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETDETAILS) {
            this._allianceInfo = data.data.data.falliance;
            this._allianceMemberInfo = data.data.data.falliancemember;
            this._allianceMemberInfo.sort(function (a, b) {
                return Number(a.po) - Number(b.po);
                // return 0;
            });
        }
    };
    AllianceShowInfoPopupView.prototype.getTitleStr = function () {
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    };
    AllianceShowInfoPopupView.prototype.dispose = function () {
        // this.removeTouchTap();
        this._allianceInfo = null;
        this._allianceMemberInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceShowInfoPopupView;
}(PopupView));
__reflect(AllianceShowInfoPopupView.prototype, "AllianceShowInfoPopupView");
var AllianceShowInfoScrollItem = (function (_super) {
    __extends(AllianceShowInfoScrollItem, _super);
    function AllianceShowInfoScrollItem() {
        return _super.call(this) || this;
    }
    AllianceShowInfoScrollItem.prototype.initItem = function (index, rankData) {
        this.width = 510;
        this.height = 50 + this.getSpaceY();
        var nameTF = ComponentManager.getTextField(rankData.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        nameTF.x = 118 - nameTF.width / 2;
        nameTF.y = 5;
        this.addChild(nameTF);
        var poStr = LanguageManager.getlocal("allianceMemberPo" + rankData.po);
        var poTF = ComponentManager.getTextField(poStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        poTF.x = 368 - poTF.width / 2;
        poTF.y = 5;
        this.addChild(poTF);
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = 40;
        this.addChild(lineImg);
    };
    AllianceShowInfoScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceShowInfoScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceShowInfoScrollItem;
}(ScrollListItem));
__reflect(AllianceShowInfoScrollItem.prototype, "AllianceShowInfoScrollItem");

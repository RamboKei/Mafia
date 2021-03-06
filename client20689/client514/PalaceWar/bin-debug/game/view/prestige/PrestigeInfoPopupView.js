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
var PrestigeInfoPopupView = (function (_super) {
    __extends(PrestigeInfoPopupView, _super);
    function PrestigeInfoPopupView() {
        return _super.call(this) || this;
    }
    PrestigeInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_explain_bg", "prestige_info_bg"
        ]);
    };
    PrestigeInfoPopupView.prototype.getTitleStr = function () {
        return "prestigeInfo";
    };
    PrestigeInfoPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 524;
        typeBg.height = 441;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var topPic = BaseBitmap.create("prestige_info_bg");
        topPic.setPosition(this.viewBg.width / 2 - topPic.width / 2, typeBg.y + 4);
        this.addChildToContainer(topPic);
        //奖励
        var awardRank = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoReward"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        awardRank.setPosition(topPic.x + 5, topPic.y + topPic.height + 8);
        this.addChildToContainer(awardRank);
        var rankBg = BaseBitmap.create("atkracecross_explain_bg");
        rankBg.width = 518;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, awardRank.y + awardRank.height + 8);
        this.addChildToContainer(rankBg);
        var rankDesc = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        rankDesc.setPosition(rankBg.x + 20, rankBg.y + 8);
        rankDesc.width = rankBg.width - 40;
        rankDesc.lineSpacing = 6;
        this.addChildToContainer(rankDesc);
        rankBg.height = rankDesc.height + 20;
        //规则
        var ruleText = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRule"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        ruleText.setPosition(awardRank.x, rankBg.y + rankBg.height + 12);
        this.addChildToContainer(ruleText);
        var persionBg = BaseBitmap.create("atkracecross_explain_bg");
        persionBg.width = 518;
        persionBg.setPosition(this.viewBg.width / 2 - persionBg.width / 2, ruleText.y + ruleText.height + 8);
        this.addChildToContainer(persionBg);
        var persionDesc = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRuleDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        persionDesc.setPosition(persionBg.x + 20, persionBg.y + 12);
        persionDesc.width = rankBg.width - 40;
        persionDesc.lineSpacing = 6;
        this.addChildToContainer(persionDesc);
        persionBg.height = persionDesc.height + 20;
        var closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysConfirm", this.hide, this);
        closeButton.setPosition(this.viewBg.width / 2 - closeButton.width / 2, typeBg.y + typeBg.height + 20);
        this.addChildToContainer(closeButton);
    };
    PrestigeInfoPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    return PrestigeInfoPopupView;
}(PopupView));
__reflect(PrestigeInfoPopupView.prototype, "PrestigeInfoPopupView");

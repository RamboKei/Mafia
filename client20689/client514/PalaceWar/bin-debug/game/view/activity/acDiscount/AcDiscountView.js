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
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
var AcDiscountView = (function (_super) {
    __extends(AcDiscountView, _super);
    function AcDiscountView() {
        var _this = _super.call(this) || this;
        _this._activeCfgList = [];
        return _this;
    }
    AcDiscountView.prototype.initView = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("forpeople_top");
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = -50;
        //描述 
        var acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_desc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(acDescTxt);
        acDescTxt.x = 30;
        acDescTxt.y = 20;
        acDescTxt.width = 550;
        var startY = 115;
        // vip折扣
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "1") && Api.acVoApi.getActivityVoByAidAndCode("discount", "1").isStart) {
            //vip背景图片
            var vipBg = BaseBitmap.create("acdiscountviewbg1");
            this.addChildToContainer(vipBg);
            vipBg.y = startY;
            //倒计时文本 
            var acCDTxt = ComponentManager.getTextField(Api.acVoApi.getActivityVoByAidAndCode(this.aid, "1").getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            this.addChildToContainer(acCDTxt);
            acCDTxt.x = 30;
            acCDTxt.y = vipBg.y + 227;
            //vip描述 
            var acVipDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_vipDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this.addChildToContainer(acVipDescTxt);
            acVipDescTxt.x = 30;
            acVipDescTxt.y = vipBg.y + 270;
            acVipDescTxt.width = 420;
            // 前往vip
            var goVipBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goVip", this.goVipHandler, this);
            goVipBtn.x = 473;
            goVipBtn.y = vipBg.y + 265;
            goVipBtn.name = "goVipBtn";
            this.addChildToContainer(goVipBtn);
            //vip 1折
            var vip1zheBg = BaseBitmap.create("acdiscount1zhe");
            this.addChildToContainer(vip1zheBg);
            vip1zheBg.x = 563;
            vip1zheBg.y = vipBg.y + 213;
            startY = vipBg.y + vipBg.height;
        }
        //------------------------------------------------
        // 终身卡打折
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            //终身卡背景图片
            var yearCardBg = BaseBitmap.create("acdiscountviewbg2");
            this.addChildToContainer(yearCardBg);
            yearCardBg.y = startY;
            //倒计时文本 
            var acCDTxt = ComponentManager.getTextField(Api.acVoApi.getActivityVoByAidAndCode(this.aid, "2").getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            this.addChildToContainer(acCDTxt);
            acCDTxt.x = 30;
            acCDTxt.y = yearCardBg.y + 227;
            //终身卡描述 
            var acYearCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_yearcardDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this.addChildToContainer(acYearCardDescTxt);
            acYearCardDescTxt.x = 30;
            acYearCardDescTxt.y = yearCardBg.y + 270;
            acYearCardDescTxt.width = 420;
            // 前往福利
            var goYearCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goYearCard", this.goYearCardHandler, this);
            goYearCardBtn.x = 473;
            goYearCardBtn.y = yearCardBg.y + 265;
            goYearCardBtn.name = "goYearCardBtn";
            this.addChildToContainer(goYearCardBtn);
            //终身卡价格
            var yearcardJiage = BaseBitmap.create("acdiscount_zhongshenkajiage");
            this.addChildToContainer(yearcardJiage);
            yearcardJiage.x = 553;
            yearcardJiage.y = yearCardBg.y + 204;
            startY = yearCardBg.y + yearCardBg.height;
        }
    };
    AcDiscountView.prototype.goVipHandler = function () {
        if (Api.acVoApi.getActivityVoByAidAndCode(this.aid, "1").isStart == false) {
            //活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
    };
    AcDiscountView.prototype.goYearCardHandler = function () {
        if (Api.acVoApi.getActivityVoByAidAndCode(this.aid, "2").isStart == false) {
            //活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
    };
    AcDiscountView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    AcDiscountView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_top", "acdiscountviewbg1", "acdiscount1zhe", "acdiscountviewbg2", "acdiscount_zhongshenkajiage"
        ]);
    };
    AcDiscountView.prototype.useCallback = function (event) {
        for (var i = 0; i < this._activeCfgList.length; i++) {
            var acLimitedRewardScrollItem = this._scrollList.getItemByIndex(i);
            if (acLimitedRewardScrollItem) {
                acLimitedRewardScrollItem.checkBtnState();
            }
        }
    };
    AcDiscountView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        this._scrollList = null;
        this._activeCfgList = null;
        _super.prototype.dispose.call(this);
    };
    return AcDiscountView;
}(AcCommonView));
__reflect(AcDiscountView.prototype, "AcDiscountView");

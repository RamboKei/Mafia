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
var CommonRewardPopupView = (function (_super) {
    __extends(CommonRewardPopupView, _super);
    function CommonRewardPopupView() {
        var _this = _super.call(this) || this;
        _this.rewardArrList = [];
        return _this;
    }
    CommonRewardPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    CommonRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    CommonRewardPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    CommonRewardPopupView.prototype.initView = function () {
        this.titleTF.visible = false;
        var re_data = this.param.data;
        //"6_1150_4|6_1710_1";
        if (re_data) {
            if (typeof (re_data) == "string") {
                this.rewardArrList = GameData.formatRewardItem(re_data);
            }
            else {
                this.rewardArrList = re_data;
            }
        }
        var itemContainer = new BaseDisplayObjectContainer();
        var l = this.rewardArrList.length;
        var scaleNum = 0.88;
        var newnum = 0;
        for (var i = 0; i < l; i++) {
            var icon = GameData.getItemIcon(this.rewardArrList[i]);
            var num = i % 5;
            icon.setPosition((icon.width + 20) * num, (icon.height + 20) * Math.floor(i / 5));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            itemContainer.addChild(icon);
            newnum = (icon.height + 20) * Math.floor(i / 5);
        }
        itemContainer.setPosition(this.viewBg.x + (this.viewBg.width - itemContainer.width) / 2, 50);
        this.addChildToContainer(itemContainer);
    };
    CommonRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var common_reward = BaseBitmap.create("common_reward");
        common_reward.setPosition(this.viewBg.x + (this.viewBg.width - common_reward.width) / 2, this.viewBg.y - common_reward.height / 2);
        this.addChild(common_reward);
    };
    CommonRewardPopupView.prototype.touchHandler = function () {
        ViewController.getInstance().hideView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW);
    };
    CommonRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_reward",
        ]);
    };
    CommonRewardPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this.rewardArrList = [];
        _super.prototype.dispose.call(this);
    };
    return CommonRewardPopupView;
}(PopupView));
__reflect(CommonRewardPopupView.prototype, "CommonRewardPopupView");

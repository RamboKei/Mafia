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
var WelfareViewSignin = (function (_super) {
    __extends(WelfareViewSignin, _super);
    function WelfareViewSignin() {
        return _super.call(this) || this;
    }
    WelfareViewSignin.prototype.init = function () {
        _super.prototype.init.call(this);
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN, this.clickItemHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL), this.useCallback, this);
        var totalDayTF = ComponentManager.getTextField(totalSignDay + "", TextFieldConst.FONTSIZE_TITLE_SMALL);
        totalDayTF.x = 105 - totalDayTF.width / 2;
        totalDayTF.y = 205 - totalDayTF.height / 2;
        this.addChild(totalDayTF);
        if (PlatformManager.checkIsKRSp()) {
            totalDayTF.x = 130 - totalDayTF.width / 2;
        }
        this._signRewardList = Api.arrivalVoApi.getSignRewardList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 312 - 40);
        this._scrollList = ComponentManager.getScrollList(WelfareViewSignScrollItem, this._signRewardList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, 223 + 20);
        var showIndex = Api.arrivalVoApi.getIndexByCurday();
        showIndex = showIndex > 2 ? showIndex - 1 : 1;
        this._scrollList.setScrollTopByIndex(showIndex);
    };
    WelfareViewSignin.prototype.useCallback = function (event) {
        var welfareViewSignScrollItem = this._scrollList.getItemByIndex(this._index);
        if (welfareViewSignScrollItem) {
            welfareViewSignScrollItem.updateButtonState();
        }
        // let rewardList = this._signRewardList[this._index].rewardList;
        // if(rewardList)
        // {
        // 	let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
        // 	App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
        // }
    };
    WelfareViewSignin.prototype.clickItemHandler = function (event) {
        this._index = Number(event.data.index);
        // let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
        // if(welfareViewSignScrollItem)
        // {
        // 	welfareViewSignScrollItem.updateButtonState();
        // }
        NetManager.request(NetRequestConst.REQUEST_USER_ARRIVAL, null);
    };
    WelfareViewSignin.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL), this.useCallback, this);
        _super.prototype.dispose.call(this);
    };
    return WelfareViewSignin;
}(WelfareViewTab));
__reflect(WelfareViewSignin.prototype, "WelfareViewSignin");

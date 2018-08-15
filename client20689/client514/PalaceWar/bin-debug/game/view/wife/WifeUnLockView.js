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
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeUnLockView
 */
var WifeUnLockView = (function (_super) {
    __extends(WifeUnLockView, _super);
    function WifeUnLockView() {
        return _super.call(this) || this;
    }
    WifeUnLockView.prototype.initView = function () {
        this._wifVoApi = Api.wifeVoApi;
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        // if(unlockList.length <= 0 )
        // {
        // 	return;
        // }
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth;
        bottomBg.x = 0;
        bottomBg.y = -15;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 0, GameConfig.stageHeigth - this.container.y + 20);
        var scrollList = ComponentManager.getScrollList(WifeScrollItem2, unlockList, rect);
        scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChildToContainer(scrollList);
        scrollList.setPosition(0, -15);
    };
    WifeUnLockView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeUnLockView;
}(CommonView));
__reflect(WifeUnLockView.prototype, "WifeUnLockView");

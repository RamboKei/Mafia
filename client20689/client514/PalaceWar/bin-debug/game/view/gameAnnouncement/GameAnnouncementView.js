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
var GameAnnouncementView = (function (_super) {
    __extends(GameAnnouncementView, _super);
    function GameAnnouncementView() {
        var _this = _super.call(this) || this;
        _this._announcementList = [];
        _this._notice = null;
        return _this;
    }
    GameAnnouncementView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_9_bg4",
            "uncompress",
        ]);
    };
    GameAnnouncementView.prototype.initView = function () {
        this.showBg();
        this.showList();
    };
    GameAnnouncementView.prototype.resetBgSize = function () {
        this.viewBg.height = 590;
        this.viewBg.x = 30;
        this.viewBg.y = 210;
        this.closeBtn.y = this.viewBg.y - 50;
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - 80;
        this.titleTF.y = this.viewBg.y + 15;
    };
    GameAnnouncementView.prototype.showBg = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 518;
        bg.height = 496;
        bg.x = 55;
        bg.y = this.viewBg.y + 220;
        this.addChildToContainer(bg);
    };
    GameAnnouncementView.prototype.showList = function () {
        if (this.param.data.name == "login") {
            if (this.param.data && this.param.data.notice) {
                this._notice = this.param.data.notice;
                this._announcementList = this._notice;
                GameAnnouncementView.NOTICE_LIST = this._announcementList;
            }
            else {
                this._announcementList = GameAnnouncementView.NOTICE_LIST;
            }
        }
        else {
            this._announcementList = this.param.data;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 518, 468);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(60, 240);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        var _announcementScrollItem = this._scrollList.getItemByIndex(0);
        _announcementScrollItem.itemListType = true;
        _announcementScrollItem.touchNum += 1;
        this._scrollList.refreshData(this._announcementList);
    };
    GameAnnouncementView.prototype.clickItemHandler = function (event) {
        GameAnnouncementView.currNum = event.data;
        var _announcementScrollItem = this._scrollList.getItemByIndex(event.data);
        _announcementScrollItem.touchNum += 1;
        if (_announcementScrollItem.touchNum % 2 == 0) {
            _announcementScrollItem.itemListType = false;
        }
        else {
            _announcementScrollItem.itemListType = true;
        }
        this._scrollList.refreshData(this._announcementList);
        // this._scrollList.setScrollTopByIndex(event.data);
    };
    GameAnnouncementView.prototype.getSheepType = function () {
        return 1;
    };
    GameAnnouncementView.prototype.dispose = function () {
        this._announcementList = [];
        _super.prototype.dispose.call(this);
    };
    GameAnnouncementView.currNum = 0;
    GameAnnouncementView.NOTICE_LIST = null;
    return GameAnnouncementView;
}(PopupView));
__reflect(GameAnnouncementView.prototype, "GameAnnouncementView");

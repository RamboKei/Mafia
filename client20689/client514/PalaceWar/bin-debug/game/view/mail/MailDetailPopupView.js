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
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
var MailDetailPopupView = (function (_super) {
    __extends(MailDetailPopupView, _super);
    function MailDetailPopupView() {
        var _this = _super.call(this) || this;
        // 领取按钮
        _this._collectFlag = null;
        _this._index = 0;
        // private _contentTF:BaseTextField = null;
        _this._txtCountainer = null;
        return _this;
    }
    MailDetailPopupView.prototype.initView = function () {
        this._txtCountainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._txtCountainer);
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        this._index = Number(this.param.data.index);
        var temX = 40;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 600;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this.addChildToContainer(bg);
        this._bg = bg;
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("title") + "：" + this._mailInfoVo.title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.x = temX;
        titleTF.y = 30;
        this.addChildToContainer(titleTF);
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("time") + "：" + this._mailInfoVo.timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeTF.x = temX;
        timeTF.y = 60;
        this.addChildToContainer(timeTF);
        var temH = 410;
        var touch = this._mailInfoVo.touch;
        if (touch == "") {
            bg.height = 660;
            temH = 508 + 60;
        }
        var bg2 = BaseBitmap.create("public_9_bg1");
        bg2.width = 496;
        bg2.height = temH;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = timeTF.y + timeTF.height + 10;
        this.addChildToContainer(bg2);
        var contentTF;
        if (this._mailInfoVo.content) {
            contentTF = ComponentManager.getTextField(this._mailInfoVo.content, TextFieldConst.FONTSIZE_CONTENT_SMALL - 2);
            contentTF.x = 0;
            contentTF.y = 5;
            contentTF.width = bg2.width - 20;
            contentTF.lineSpacing = 5;
            contentTF.cacheAsBitmap = true;
            contentTF.touchEnabled = true;
            // this.addChildToContainer(contentTF);
            this._txtCountainer.addChild(contentTF);
            // this.addChild(contentTF);
            var scrollRect = new egret.Rectangle(0, 0, bg2.width - 20, 390);
            var scrollView = ComponentManager.getScrollView(this._txtCountainer, scrollRect);
            scrollView.x = 50;
            scrollView.y = 100; //250;
            this.addChildToContainer(scrollView);
            // this.addChild(scrollView);
            scrollView.height = temH - 20;
        }
        if (touch != "") {
            var rewardVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS), this.useCallback, this);
            var rect = egret.Rectangle.create();
            if (rewardVoList.length > 5) {
                bg2.height -= 100;
                // if(contentTF)
                // {
                // 	let scrollRect:egret.Rectangle = new egret.Rectangle(contentTF.x,contentTF.y,contentTF.width,bg2.height - 20);
                // 	contentTF.scrollRect = scrollRect;
                // }
                rect.setTo(0, 0, bg2.width, 200);
            }
            else {
                rect.setTo(0, 0, bg2.width, 110);
            }
            var scrollListContainer = new BaseDisplayObjectContainer();
            scrollListContainer.width = rect.width;
            scrollListContainer.height = rect.height;
            scrollListContainer.x = bg2.x + 2;
            scrollListContainer.y = bg2.y + bg2.height + 5;
            this.addChildToContainer(scrollListContainer);
            this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
            scrollListContainer.addChild(this._scrollList);
        }
        if (this._mailInfoVo.istouch == 1) {
            if (this._mailInfoVo.hadget == 0) {
                // this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.getRewardHanlder,this)
                // this._getBtn.x = this.viewBg.x + this.viewBg.width/2 - this._getBtn.width/2;
                // this._getBtn.y = bg.x + bg.height - this._getBtn.height - 20;
                // this.addChildToContainer(this._getBtn);
            }
            else {
                // let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
                var hasGetSp = BaseBitmap.create("collectflag");
                hasGetSp.setScale(0.6);
                hasGetSp.x = this.width / 2 - hasGetSp.width / 2 * 0.6;
                hasGetSp.y = GameConfig.stageHeigth / 2 + this.getShowHeight() / 2 - hasGetSp.height * 0.6 - 10;
                this.addChild(hasGetSp);
            }
        }
    };
    MailDetailPopupView.prototype.clickConfirmHandler = function (data) {
        NetManager.request(NetRequestConst.REQUEST_MAIL_GET_REWARDS, { "mailId": this.param.data.mid });
        // this.playGetRewardAni();
    };
    MailDetailPopupView.prototype.getShowHeight = function () {
        return 750;
    };
    MailDetailPopupView.prototype.getBgExtraHeight = function () {
        if (this._mailInfoVo.touch == "") {
            return 30;
        }
        return 86;
    };
    MailDetailPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    MailDetailPopupView.prototype.getConfirmBtnStr = function () {
        if (this._mailInfoVo.istouch == 1) {
            if (this._mailInfoVo.hadget == 0) {
                return "taskCollect";
            }
        }
        return "";
    };
    MailDetailPopupView.prototype.useCallback = function (event) {
        this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
        if (this._mailInfoVo && this._mailInfoVo.hadget == 1) {
            this.playGetRewardAni();
        }
    };
    MailDetailPopupView.prototype.playGetRewardAni = function () {
        this.setConfirmBtnVisible(false);
        if (this._collectFlag == null) {
            // let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this.width / 2;
            // this._collectFlag.y = pt.y + this._bg.height + 105 - 63;
            this._collectFlag.y = GameConfig.stageHeigth / 2 + this.getShowHeight() / 2 - this._collectFlag.height * 0.6 * 0.5 - 10;
            this.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.2);
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.6, scaleY: 0.6 }, 400).wait(600);
        var rewardVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
        if (rewardVoList) {
            // this._scrollList.refreshData(rewardVoList);
            var runPos = new egret.Point(this._collectFlag.x, this._collectFlag.y - 40);
            App.CommonUtil.playRewardFlyAction(rewardVoList, runPos);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH, null);
    };
    MailDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL), this.useCallback, this);
        this._collectFlag = null;
        this._mailInfoVo = null;
        this._bg = null;
        this._scrollList = null;
        this._index = 0;
        this._txtCountainer = null;
        _super.prototype.dispose.call(this);
    };
    return MailDetailPopupView;
}(PopupView));
__reflect(MailDetailPopupView.prototype, "MailDetailPopupView");

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
 * 聊天
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
var ChatScrollItem = (function (_super) {
    __extends(ChatScrollItem, _super);
    function ChatScrollItem() {
        return _super.call(this) || this;
    }
    ChatScrollItem.prototype.initItem = function (index, chatData) {
        this.width = 590;
        // let chatList = Api.chatVoApi.getChatList();
        // let chatData = chatList[index];
        this._chatData = chatData;
        //头像背景
        this._posContainer = new BaseDisplayObjectContainer();
        var posStr = "public_chatheadbg";
        if (chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()) {
            posStr = chatData.content.headBg;
        }
        var posBg = BaseBitmap.create(posStr);
        this._posContainer.addChild(posBg);
        this.addChild(this._posContainer);
        //  this._posContainer.setPosition(-30,-30)
        this._posContainer.addTouch(this.eventHandler, this, null);
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(chatData.content.pic), rect1);
        posBB.x = 0;
        posBB.y = -7;
        posBB.setScale(2 / 3);
        this._posContainer.addChild(posBB);
        var itemBgPic = "public_chatbg3";
        //自己说的话
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            itemBgPic = "public_chatbg2";
        }
        var itemBg = BaseBitmap.create(itemBgPic);
        itemBg.width = 404;
        itemBg.x = 98;
        itemBg.y = 40;
        this.addChild(itemBg);
        //名字
        var chatName = "<font u ='true'>" + chatData.sendername + "</font>";
        this._userName = ComponentManager.getTextField(chatName, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._userName.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._userName.x = itemBg.x + 10;
        this._userName.y = 10;
        this.addChild(this._userName);
        this._userName.addTouchTap(this.showUserInfo, this, null);
        var dis = 0;
        var vipFlag;
        if (chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()) {
            vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
            vipFlag.setScale(0.65);
            vipFlag.x = this._userName.x + this._userName.width + 10;
            vipFlag.y = this._userName.y;
            this.addChild(vipFlag);
            dis = 68 + 5;
        }
        var officerImg;
        if (chatData.content.title && chatData.content.title > 0) {
            officerImg = BaseLoadBitmap.create("user_title_" + chatData.content.title + "_3");
            officerImg.x = this._userName.x + this._userName.width + dis - 15;
            officerImg.y = this._userName.y + this._userName.height / 2 - 33;
            this.addChild(officerImg);
            dis = dis + 110 + 5;
        }
        //时间
        var timeDis = GameData.serverTime - chatData.ts;
        var timeTF = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(timeDis, 4), TextFieldConst.FONTSIZE_TITLE_SMALL);
        timeTF.textColor = TextFieldConst.COLOR_BROWN;
        // timeTF.x = this._userName.x + this._userName.width + dis + 5;
        timeTF.x = this.width - timeTF.width - 5;
        timeTF.y = this._userName.y;
        this.addChild(timeTF);
        //内容
        var messageTF = ComponentManager.getTextField(chatData.content.message, TextFieldConst.FONTSIZE_TITLE_SMALL);
        messageTF.textColor = TextFieldConst.COLOR_BLACK;
        messageTF.x = itemBg.x + 20;
        messageTF.y = itemBg.y + 12;
        this.addChild(messageTF);
        if (messageTF.width > 370) {
            messageTF.width = 370;
        }
        var bgHeight = messageTF.height + 20;
        if (bgHeight < 50) {
            itemBg.width = messageTF.width + 30;
            itemBg.height = 47;
        }
        else {
            itemBg.width = 404;
            itemBg.height = messageTF.height + 20;
        }
        //自己说的话
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            this._posContainer.x = this.width - this._posContainer.width;
            itemBg.skewY = 180;
            itemBg.x = this._posContainer.x - 12;
            this._userName.x = itemBg.x - this._userName.width - 8;
            if (vipFlag) {
                vipFlag.x = this._userName.x - 68 - 10;
            }
            if (officerImg) {
                if (vipFlag) {
                    officerImg.x = this._userName.x - dis - 25;
                }
                else {
                    officerImg.x = this._userName.x - 110 - 25;
                }
            }
            // timeTF.x = this._userName.x - timeTF.width - dis - 30;
            timeTF.x = 5;
            messageTF.x = itemBg.x - messageTF.width - 20;
        }
        //  let itemBg2 = BaseBitmap.create(itemBgPic);
        // itemBg2.width = this.width;
        // itemBg2.height = this.height;
        // itemBg2.x = 0
        // itemBg2.y = 0;
        // this.addChild(itemBg2);
        this.cacheAsBitmap = true;
    };
    ChatScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        if (!Api.switchVoApi.checkOpenShenhe()) {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    ChatScrollItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._chatData.sender });
    };
    ChatScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                // egret.Tween.get(this._posContainer,{loop:false}).to({scaleX:0.8,ScaleY:0.8},200);
                this.showUserInfo();
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
        }
    };
    ChatScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    ChatScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        this.cacheAsBitmap = true;
        this._userName.removeTouchTap();
        this._userName = null;
        this._posContainer.removeTouch();
        this._posContainer = null;
        _super.prototype.dispose.call(this);
    };
    return ChatScrollItem;
}(ScrollListItem));
__reflect(ChatScrollItem.prototype, "ChatScrollItem");

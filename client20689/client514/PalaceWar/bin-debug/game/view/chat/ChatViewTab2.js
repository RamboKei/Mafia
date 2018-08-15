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
var ChatViewTab2 = (function (_super) {
    __extends(ChatViewTab2, _super);
    function ChatViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    ChatViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.refreshChat, this);
        var chatList = Api.chatVoApi.getAllianceList();
        //下面属性背景
        var bottomBg = BaseBitmap.create("wifeview_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 96;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - 240;
        this.addChild(bottomBg);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = GameConfig.stageHeigth - 260;
        listBg.x = 15;
        listBg.y = 12;
        this.addChild(listBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 50, GameConfig.stageHeigth - 263);
        this._scrollList = ComponentManager.getScrollList(ChatScrollItem, chatList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(25, 12);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        if (chatList.length > 0) {
            this._scrollList.setScrollTopByIndex(chatList.length - 1);
        }
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 468, 48, "public_chatinputbg", LanguageManager.getlocal("chatMaxLength"), 0xa4917f);
        inputTF.x = 15;
        inputTF.y = bottomBg.y + bottomBg.height / 2 - inputTF.height / 2;
        this.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.maxChars = 40;
        // this._inputTextField.
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatViewSend", this.sentBtnClick, this);
        sendBtn.x = inputTF.x + inputTF.width + 10;
        sendBtn.y = bottomBg.y + bottomBg.height / 2 - sendBtn.height / 2;
        sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(sendBtn);
        if (Api.switchVoApi.checkVip1Privilege()) {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
    };
    ChatViewTab2.prototype.refreshChat = function () {
        var chatList = Api.chatVoApi.getAllianceList();
        this._scrollList.refreshData(chatList);
        this._scrollList.setScrollTopByIndex(chatList.length - 1);
    };
    ChatViewTab2.prototype.sentBtnClick = function () {
        if (Api.switchVoApi.checkVip1Privilege()) {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
                return;
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
                return;
            }
        }
        if (!this._inputTextField.bindData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
            return;
        }
        if (this._inputTextField.text.length <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
            return;
        }
        if (GameData.serverTime - Api.chatVoApi._lastTime < 5) {
            var times = String(Api.chatVoApi._lastTime - GameData.serverTime + 5);
            // Api.chatVoApi._lastTime = GameData.serverTime;
            App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip", [times]));
            return;
        }
        Api.chatVoApi._lastTime = GameData.serverTime;
        if (Config.ShieldCfg.checkShield(this._inputTextField.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (App.StringUtil.checkChar(this._inputTextField.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        var txtStr = this._inputTextField.text;
        var chatData = {};
        chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        chatData.message = txtStr;
        this._inputTextField.text = "";
        NetManager.requestChat(chatData);
    };
    ChatViewTab2.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.refreshChat, this);
        _super.prototype.dispose.call(this);
    };
    return ChatViewTab2;
}(CommonViewTab));
__reflect(ChatViewTab2.prototype, "ChatViewTab2");

/**
 * 聊天系统api
 * author dky
 * date 2017/9/26
 * @class ChallengeVoApi
 */
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
var ChatVoApi = (function (_super) {
    __extends(ChatVoApi, _super);
    function ChatVoApi() {
        var _this = _super.call(this) || this;
        _this._lastMessage = "";
        _this._lastTime = 0;
        _this._chatID = 0;
        _this._lastAllianceId = 0;
        return _this;
    }
    ChatVoApi.prototype.formatData2 = function (data) {
        if (this.chatblockVo == null) {
            var className = this.getClassName();
            var voClassName = "ChatblockVo";
            var voClass = egret.getDefinitionByName(voClassName);
            this.chatblockVo = new voClass();
            // this.chatblockVo.initData(data);
            this[App.StringUtil.firstCharToLower(voClassName)] = this.chatblockVo;
        }
        this.chatblockVo.initData(data);
    };
    ChatVoApi.prototype.getChatBlockVo = function () {
        return this.chatblockVo;
    };
    ChatVoApi.prototype.getIsBlock = function (uid) {
        for (var index = 0; index < this.chatblockVo.info.length; index++) {
            var element = this.chatblockVo.info[index];
            if (element == uid) {
                return true;
            }
        }
        return false;
    };
    ChatVoApi.prototype.getChatList = function () {
        return this.chatVo ? this.chatVo.chatVoObj : [];
    };
    ChatVoApi.prototype.getWorldList = function () {
        return this.chatVo ? this.chatVo.worldVoObj : [];
    };
    ChatVoApi.prototype.getAllianceList = function () {
        return this.chatVo ? this.chatVo.allianceVoObj : [];
    };
    ChatVoApi.prototype.setLastMessage = function (message) {
        this._lastMessage = message;
    };
    ChatVoApi.prototype.refreshLastMessage = function () {
        if (Api.playerVoApi.getPlayerAllianceId() == 0 && this.chatVo && this.chatVo.worldVoObj.length > 0) {
            var data = this.chatVo.worldVoObj[this.chatVo.worldVoObj.length - 1];
            var titleStr = LanguageManager.getlocal("chatWorldTitle");
            var chatMesaage = titleStr + "<font color=" + TextFieldConst.COLOR_LIGHT_YELLOW + ">" + data.sendername + "</font>" + ":" + data.content.message;
            this._lastMessage = chatMesaage;
        }
    };
    ChatVoApi.prototype.getLastMessage = function () {
        return this._lastMessage;
    };
    ChatVoApi.prototype.getChatSign = function () {
        this._chatID++;
        return this._chatID.toString() + GameData.serverTime + Api.playerVoApi.getPlayerID().toString();
    };
    ChatVoApi.prototype.clearChat = function () {
        if (this.chatVo) {
            this.chatVo.worldVoObj = [];
            this.chatVo.chatVoObj = [];
            this.chatVo.allianceVoObj = [];
        }
    };
    ChatVoApi.prototype.dispose = function () {
        this.chatVo = null;
        this._lastMessage = "";
        this._lastTime = null;
        this.chatblockVo = null;
        _super.prototype.dispose.call(this);
    };
    return ChatVoApi;
}(BaseVoApi));
__reflect(ChatVoApi.prototype, "ChatVoApi");

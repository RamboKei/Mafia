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
 * date 2017/10/25
 * @class ChatView
 */
var ChatView = (function (_super) {
    __extends(ChatView, _super);
    function ChatView() {
        return _super.call(this) || this;
    }
    ChatView.prototype.initView = function () {
        NetManager.chat.checkAndReConnect();
        var lisetBg = BaseBitmap.create("servant_bottombg");
        lisetBg.width = GameConfig.stageWidth + 14;
        lisetBg.height = GameConfig.stageHeigth - 150;
        lisetBg.x = -7;
        lisetBg.y = -70;
        this.addChildToContainer(lisetBg);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE, this.doDinnerGuide, this);
    };
    ChatView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg",
            "wifeview_bottombg", "shield_cn"
        ]);
    };
    ChatView.prototype.getTabbarTextArr = function () {
        var tab = ["chatViewTab1Title"];
        if (!Api.switchVoApi.checkOpenShenhe()) {
            tab.push("chatViewTab2Title");
        }
        return tab;
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    ChatView.prototype.checkTabCondition = function (index) {
        if (index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance"));
            return false;
        }
        return true;
    };
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    ChatView.prototype.doDinnerGuide = function () {
        this.hide();
    };
    ChatView.prototype.doQuickAlliance = function () {
        this.hide();
        App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
    };
    ChatView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE, this.doDinnerGuide, this);
        _super.prototype.dispose.call(this);
    };
    return ChatView;
}(CommonView));
__reflect(ChatView.prototype, "ChatView");

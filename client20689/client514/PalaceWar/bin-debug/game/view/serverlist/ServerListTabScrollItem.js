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
 * 服务器列表标签
 * author dky
 * date 2017/11/3
 * @class ServerListTabScrollItem
 */
var ServerListTabScrollItem = (function (_super) {
    __extends(ServerListTabScrollItem, _super);
    function ServerListTabScrollItem() {
        return _super.call(this) || this;
    }
    ServerListTabScrollItem.prototype.initItem = function (index, zidStr) {
        this.width = 158;
        this.height = 60 + this.getSpaceY();
        var itemBg = BaseBitmap.create("serverbtn_tab");
        itemBg.x = this.width / 2 - itemBg.width / 2;
        itemBg.y = this.height / 2 - itemBg.height / 2;
        itemBg.name = "itemBg";
        this.addChild(itemBg);
        // let tabIdEnd = tabId * 10;
        // let zidStr =  tabIdEnd - 9 + "-" + tabIdEnd +  LanguageManager.getlocal("serverListServer") ;
        var serverIdTF = ComponentManager.getTextField(zidStr, TextFieldConst.FONTSIZE_TITLE_SMALL);
        serverIdTF.textColor = TextFieldConst.COLOR_BLACK;
        serverIdTF.x = this.width / 2 - serverIdTF.width / 2;
        ;
        serverIdTF.y = this.height / 2 - serverIdTF.height / 2;
        this.addChild(serverIdTF);
    };
    ServerListTabScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ServerListTabScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServerListTabScrollItem;
}(ScrollListItem));
__reflect(ServerListTabScrollItem.prototype, "ServerListTabScrollItem");

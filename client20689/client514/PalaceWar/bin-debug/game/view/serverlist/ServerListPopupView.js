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
var ServerListPopupView = (function (_super) {
    __extends(ServerListPopupView, _super);
    function ServerListPopupView() {
        var _this = _super.call(this) || this;
        _this._tabIndex = -1;
        _this._allServerList = [];
        return _this;
    }
    ServerListPopupView.prototype.preInit = function () {
        var _this = this;
        var ths = this;
        var reqData = { t: "getserverlist", pid: LoginManager.getLocalUserName() };
        if (ServerCfg.checkServerDebug()) {
            reqData.debug = 1;
        }
        var version = PlatformManager.getAppVersion();
        var channel = PlatformManager.getAppid();
        if (version) {
            reqData.version = version;
        }
        if (channel) {
            reqData.channel = channel;
        }
        if (PlatformManager.checkIsIOSShenheSp()) {
            reqData.isShenhe = "1";
        }
        NetManager.http.get(ServerCfg.svrCfgUrl, reqData, function (data) {
            ServerCfg.myserver = data.myserver;
            ServerCfg.serverlist = data.serverlist;
            _super.prototype.preInit.call(_this);
        }, function () {
            ths.preInit();
        }, this);
    };
    ServerListPopupView.prototype.initView = function () {
        var titleBg = BaseBitmap.create("public_9_bg3");
        titleBg.width = 250;
        titleBg.x = this.viewBg.x + this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = 20;
        this.addChildToContainer(titleBg);
        var lastLoginTF = ComponentManager.getTextField(LanguageManager.getlocal("serverListLastLogin"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        lastLoginTF.x = titleBg.x + titleBg.width / 2 - lastLoginTF.width / 2;
        lastLoginTF.y = titleBg.y + titleBg.height / 2 - lastLoginTF.height / 2;
        this.addChildToContainer(lastLoginTF);
        var myBg = BaseBitmap.create("public_9_bg4");
        myBg.width = 518;
        myBg.height = 140;
        myBg.x = this.viewBg.x + this.viewBg.width / 2 - myBg.width / 2;
        myBg.y = 75;
        this.addChildToContainer(myBg);
        var rect = egret.Rectangle.create();
        var myserverList = ServerCfg.myserver;
        rect.setTo(0, 0, 410, myBg.height - 20);
        var myScrollList = ComponentManager.getScrollList(ServerListMyScrollItem, myserverList, rect);
        this.addChildToContainer(myScrollList);
        myScrollList.x = myBg.x + myBg.width / 2 - myScrollList.width / 2;
        myScrollList.y = myBg.y + myBg.height / 2 - myScrollList.height / 2;
        myScrollList.addTouchTap(this.clickItemHandler3, this);
        var titleBg2 = BaseBitmap.create("public_9_bg3");
        titleBg2.width = 250;
        titleBg2.x = this.viewBg.x + this.viewBg.width / 2 - titleBg2.width / 2;
        titleBg2.y = myBg.y + myBg.height + 10;
        this.addChildToContainer(titleBg2);
        var listTF = ComponentManager.getTextField(LanguageManager.getlocal("serverList"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        listTF.x = titleBg2.x + titleBg2.width / 2 - listTF.width / 2;
        listTF.y = titleBg2.y + titleBg2.height / 2 - listTF.height / 2;
        this.addChildToContainer(listTF);
        var bottomBg = BaseBitmap.create("public_9_bg4");
        bottomBg.width = 518;
        bottomBg.height = 386;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 275;
        this.addChildToContainer(bottomBg);
        var lineBB = BaseBitmap.create("serverlist_line");
        lineBB.x = 203;
        lineBB.y = bottomBg.y + bottomBg.height / 2 - lineBB.height / 2;
        this.addChildToContainer(lineBB);
        var rect2 = egret.Rectangle.create();
        // let test = ServerCfg.serverlist;
        // ServerCfg.serverlist = [
        // {"sname":"30服","zid":"1","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"29服","zid":"4","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"28服","zid":"2","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"27服","zid":"3","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"26服","zid":"5","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"25服","zid":"6","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"24服","zid":"7","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"23服","zid":"8","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"22服","zid":"9","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"21服","zid":"10","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"20服","zid":"11","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"19服","zid":"12","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"18服","zid":"13","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"17服","zid":"14","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"16服","zid":"15","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"15服","zid":"16","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"14服","zid":"17","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"13服","zid":"18","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"12服","zid":"19","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"11服","zid":"20","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"10服","zid":"21","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"9服","zid":"22","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"8服","zid":"23","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"7服","zid":"24","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"6服","zid":"25","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"5服","zid":"26","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"4服","zid":"27","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"3服","zid":"28","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"2服","zid":"29","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"1服","zid":"30","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // ]
        var test = ServerCfg.serverlist;
        var tabList = this.getTabList(test);
        rect2.setTo(0, 0, 160, bottomBg.height - 20);
        this._tabScrollList = ComponentManager.getScrollList(ServerListTabScrollItem, tabList, rect2);
        this.addChildToContainer(this._tabScrollList);
        this._tabScrollList.x = bottomBg.x + 10;
        this._tabScrollList.y = bottomBg.y + bottomBg.height / 2 - this._tabScrollList.height / 2;
        this._tabScrollList.addTouchTap(this.clickItemHandler, this);
        this.setSelect(0);
        var rect3 = egret.Rectangle.create();
        var serverList = this.getServerListByIndex(0);
        rect3.setTo(0, 0, 320, bottomBg.height - 20);
        this._serverScrollList = ComponentManager.getScrollList(ServerListServerScrollItem, serverList, rect3);
        this.addChildToContainer(this._serverScrollList);
        this._serverScrollList.x = 214;
        this._serverScrollList.y = bottomBg.y + bottomBg.height / 2 - this._tabScrollList.height / 2;
        this._serverScrollList.addTouchTap(this.clickItemHandler2, this);
    };
    ServerListPopupView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.setSelect(index);
        var serverList = this.getServerListByIndex(index);
        this._serverScrollList.setScrollTop(0);
        this._serverScrollList.refreshData(serverList);
    };
    ServerListPopupView.prototype.clickItemHandler2 = function (event) {
        var index = Number(event.data);
        // this.setSelect(index);
        ServerCfg.setSelectServer(this._curServerList[index].zid);
        this.hide();
    };
    ServerListPopupView.prototype.clickItemHandler3 = function (event) {
        var index = Number(event.data);
        // this.setSelect(index);
        var myserverList = ServerCfg.myserver;
        ServerCfg.setSelectServer(myserverList[index].zid);
        this.hide();
    };
    ServerListPopupView.prototype.getTabList = function (data) {
        // let tabList: Array<number> = new Array();
        // let tabNum = Math.ceil(data.length/10);
        // for (var index = tabNum; index > 0; index--) {
        // 	tabList.push(index);
        // }
        data.sort(function (a, b) {
            return Number(b.zid) - Number(a.zid);
        });
        var list = [];
        var i = 0;
        var l = data.length;
        var pageIndex = 0;
        var startIndex = -1;
        for (i; i < l; i++) {
            var czid = Number(data[i].zid);
            if (i == 0) {
                if (czid % 10 == 0) {
                    startIndex = czid;
                }
                else {
                    startIndex = Math.ceil(czid / 10) * 10;
                }
                if (this._allServerList[pageIndex] == null) {
                    this._allServerList[pageIndex] = [data[i]];
                }
                if (i == l - 1) {
                    list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                }
            }
            else {
                if (czid <= (startIndex - 10)) {
                    list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    if (czid % 10 == 0) {
                        startIndex = czid;
                    }
                    else {
                        startIndex = Math.ceil(czid / 10) * 10;
                    }
                    pageIndex++;
                    if (this._allServerList[pageIndex] == null) {
                        this._allServerList[pageIndex] = [data[i]];
                    }
                    if (i == l - 1) {
                        list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    }
                }
                else if (i == l - 1) {
                    list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    if (this._allServerList[pageIndex]) {
                        this._allServerList[pageIndex].push(data[i]);
                    }
                }
                else {
                    if (this._allServerList[pageIndex]) {
                        this._allServerList[pageIndex].push(data[i]);
                    }
                }
            }
        }
        return list;
    };
    ServerListPopupView.prototype.getServerListByIndex = function (tabIndex) {
        this._curServerList = this._allServerList[tabIndex];
        return this._curServerList;
        // let test = ServerCfg.serverlist;
        // // tabIndex = Math.ceil(test.length/10) - tabIndex -1;
        // let aNum = test.length%10;
        // if(test.length>0&&aNum==0)
        // {
        // 	aNum=10;
        // }
        // let startNum:number=tabIndex*10;
        // let endNum:number=tabIndex*10+aNum+10-aNum;
        // if(tabIndex==0)
        // {
        // 	startNum=tabIndex*10;
        // 	endNum=startNum+aNum;
        // }
        // else
        // {
        // 	startNum=tabIndex*10-10+aNum;
        // 	endNum=tabIndex*10+aNum;
        // }
        // endNum=Math.min(test.length,endNum);
        // if(endNum == 0){
        // 	endNum = 10;
        // }
        // let serverList: Array<any> = new Array();
        // for(startNum;startNum<endNum;startNum++)
        // {
        // 	serverList.push(test[startNum]);
        // }
        // this._curServerList = serverList;
        // return serverList;
    };
    //刷新选中状态
    ServerListPopupView.prototype.setSelect = function (tabIndex) {
        // let curTabIndex = this._tabIndex;
        if (this._tabIndex == tabIndex) {
            return;
        }
        this._tabIndex = tabIndex;
        if (this._tabScrollItem) {
            if (this._tabScrollItem.getChildByName("itemBg")) {
                var baseBitmap_1 = this._tabScrollItem.getChildByName("itemBg");
                baseBitmap_1.texture = ResourceManager.getRes("serverbtn_tab");
            }
        }
        this._tabScrollItem = this._tabScrollList.getItemByIndex(tabIndex);
        var baseBitmap = this._tabScrollItem.getChildByName("itemBg");
        baseBitmap.texture = ResourceManager.getRes("serverbtn_tab_down");
    };
    ServerListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "serverlist_line", "serverlist_usericon", "public_9_bg3", "public_9_bg4",
            "serverbtn_tab", "serverbtn_tab_down", "public_9_probiginnerbg"
        ]);
    };
    ServerListPopupView.prototype.dispose = function () {
        this._tabIndex = -1;
        this._tabScrollList = null;
        this._serverScrollList = null;
        this._tabScrollItem = null;
        this._allServerList.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ServerListPopupView;
}(PopupView));
__reflect(ServerListPopupView.prototype, "ServerListPopupView");

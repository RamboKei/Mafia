var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 服务器列表配置
 */
var ServerCfg = (function () {
    function ServerCfg() {
    }
    ;
    /**
     * 设置登录的服务器数据
     * @param zid
     */
    ServerCfg.setLoginServer = function (zid) {
        if (ServerCfg.lastServer.zid != zid) {
            var l = ServerCfg.serverlist.length;
            for (var i = 0; i < l; i++) {
                var item = ServerCfg.serverlist[i];
                if (item.zid == zid) {
                    for (var key in item) {
                        ServerCfg.lastServer[key] = item[key];
                    }
                    break;
                }
            }
        }
    };
    /**
     * 选择的服务器数据
     * @param zid
     */
    ServerCfg.setSelectServer = function (zid) {
        if (ServerCfg.selectServer.zid != zid) {
            var l = ServerCfg.serverlist.length;
            for (var i = 0; i < l; i++) {
                var item = ServerCfg.serverlist[i];
                if (item.zid == zid) {
                    ServerCfg.setServerData(item);
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
        }
    };
    ServerCfg.setServerData = function (data) {
        ServerCfg.selectServer = {};
        for (var key in data) {
            if (PlatformManager.getSpid() == "locals" && (key == "ip_server" || key == "ip_chat")) {
                ServerCfg.selectServer[key] = ServerCfg.getHost();
            }
            else {
                ServerCfg.selectServer[key] = data[key];
            }
        }
    };
    ServerCfg.initSvrUrl = function () {
        var hosturl = ServerCfg.getHost();
        this.svrCfgUrl = "//" + hosturl + "/tank-global/index.php/";
        this.baseUrl = "//" + hosturl + "/gucenter/";
    };
    ServerCfg.getHost = function () {
        if (App.DeviceUtil.IsHtml5()) {
            if (PlatformManager.checkIsLocal()) {
                if (App.CommonUtil.getOption("testplat") && ServerCfg.allHost[App.CommonUtil.getOption("testplat")]) {
                    return ServerCfg.allHost[App.CommonUtil.getOption("testplat")];
                }
            }
        }
        return ServerCfg.allHost[PlatformManager.getSpid()];
        //  return ServerCfg.allHost["tw"];
    };
    ServerCfg.checkServerDebug = function () {
        var isDebug = false;
        if (App.DeviceUtil.IsHtml5()) {
            var baseUrl = document.baseURI;
            if (baseUrl.indexOf("gt_test") > -1) {
                isDebug = true;
            }
        }
        else if (PlatformManager.checkIsTest() || PlatformManager.checkIsLocal()) {
            isDebug = true;
        }
        if (App.CommonUtil.getOption("testplat") && ServerCfg.allHost[App.CommonUtil.getOption("testplat")]) {
            isDebug = false;
        }
        return isDebug;
    };
    ServerCfg.checkTestByBaseDiv = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var baseUrl = document.baseURI;
            if (baseUrl.indexOf("gt_test") > -1) {
                return true;
            }
        }
        return false;
    };
    // 获取微信小游戏资源url
    ServerCfg.getWxGameResourceUrl = function () {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wxgameclient/resource/";
    };
    // 获取玩一玩资源url
    ServerCfg.getWywResourceUrl = function () {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wywclient/resource/";
    };
    ServerCfg.allHost = {
        "wanba": "5a26626c-0.gz.1251001051.clb.myqcloud.com",
        "3k": "gt-cn-in.raygame3.com",
        "local": "192.168.8.82",
        "locals": "local-test-82.raygame3.com",
        "test": "gt-test.raygame3.com",
        "yyb": "gt-yyb-web01.raygame3.com",
        "tw": "gd-game.heyyogame.com",
        "fkylc": "gt-fkylc-web01.raygame3.com",
        "xly": "gt-xly-web01.raygame3.com",
        "xzy": "gt-xzy-web01.raygame3.com",
        "iosshenhe": "gt-shenhe.raygame3.com",
        "zjlx": "gt-zjly-web01.raygame3.com",
        "ewan": "gt-ewan-web01.raygame3.com",
        "49y": "gt-49y-web01.raygame3.com",
        "sf": "gt-sf-web01.raygame3.com",
        "kr": "gt-kr-web01.mayngames.co.kr",
        "fkcw": "gt-fkcw-web01.raygame3.com",
        "en": "gt-shenhe.raygame3.com",
        "9130": "gt-9130-web01.raygame3.com",
        "cps": "gt-cps-web01.raygame3.com",
        "wxgame": "gt-wanba-web01.raygame3.com",
        "wyw": "gt-wanba-web01.raygame3.com",
    };
    // {sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    ServerCfg.lastServer = {};
    /**
     * 当前选择的服务器，选择后可用
     */
    ServerCfg.selectServer = {};
    ServerCfg.baseUrl = "//192.168.8.82/gucenter/";
    ServerCfg.serverTokenUrl = "getaccess_token.php";
    ServerCfg.svrCfgUrl = "//192.168.8.82/tank-global/index.php/";
    return ServerCfg;
}());
__reflect(ServerCfg.prototype, "ServerCfg");
var ServerItemCfg = (function () {
    function ServerItemCfg() {
    }
    ServerItemCfg.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    return ServerItemCfg;
}());
__reflect(ServerItemCfg.prototype, "ServerItemCfg");

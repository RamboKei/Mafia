/**
 * 网络通信管理
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
var NetManager;
(function (NetManager) {
    NetManager.curReceiveCmd = "";
    var requestNum = 0;
    /**
     * 发送socket请求
     * @param data 数据
     */
    function request(cmd, data) {
        requestNum++;
        data = formatRequest(cmd, data);
        NetManager.socket.send(data, formatReceive, NetManager);
    }
    NetManager.request = request;
    function requestChat(chatData) {
        var channel = chatData.channel;
        var senderName = Api.playerVoApi.getPlayerName();
        var reciverName = "";
        var message = chatData.message;
        var sendTime = GameData.serverTime;
        var data = {};
        data.type = "chat";
        data.channel = channel;
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = senderName;
        // data.reciver = reciver;
        data.recivername = reciverName;
        data.content =
            {
                "message": message,
                "pic": Api.playerVoApi.getPlayePicId(),
                "vip": Api.playerVoApi.getPlayerVipLevel(),
                "title": Api.playerVoApi.getTitleid(),
                "headBg": Api.playerVoApi.getVipHeadBg(),
                "sign": Api.chatVoApi.getChatSign()
                // "ts" : GameData.serverTime
            };
        data.ts = GameData.serverTime;
        data.zoneid = GameData.curZoneID;
        // function callback(e:egret.Event)
        // {
        //     var sData: any = e.data;
        //     data.mkey = sData.chatStr;
        //     data.ts = sendTime;
        // 	chat.send(data);
        // }
        // let typeKey:string=getMessageName(NetRequestConst.REQUEST_CHAT_ENCRYPT);
        // if(!App.MessageHelper.hasEventListener(typeKey))
        // {
        // 	App.MessageHelper.addEventListener(typeKey,callback,NetManager)
        // }
        // request(NetRequestConst.REQUEST_CHAT_ENCRYPT,{});
        App.LogUtil.log("发送聊天数据", data);
        NetManager.chat.send(data);
    }
    NetManager.requestChat = requestChat;
    function chatServerLogout(callback, callbackThisObj) {
        var tb = {};
        tb["type"] = "quit";
        tb["uid"] = Api.playerVoApi.getPlayerID();
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token;
        tb["ts"] = GameData.logints;
        // var aid = Api.playerVoApi.getPlayerAllianceId();
        // var aid = LocalStorageManager.get("lastAllianceId")
        var aid = Api.chatVoApi._lastAllianceId;
        if (aid != 0) {
            tb["channel"] = Number(aid);
        }
        App.LogUtil.log("登出聊天服务器", tb);
        NetManager.chat.send(tb, callback, callbackThisObj);
    }
    NetManager.chatServerLogout = chatServerLogout;
    function chatServerLogin(callback, callbackThisObj) {
        var tb = {};
        tb["type"] = "login";
        tb["uid"] = (Api.playerVoApi.getPlayerID() ? Api.playerVoApi.getPlayerID() : 0); //Base.curUid;//uid;
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token; //token;
        tb["ts"] = GameData.logints; //ts;
        var aid = Api.playerVoApi.getPlayerAllianceId();
        if (aid != 0) {
            tb["channel"] = aid;
        }
        var timeStr = Base64.encode(App.MathUtil.getRandom(10, 99) + GameData.logints.toString());
        var qStr = timeStr.substr(0, 2);
        var hStr = timeStr.substr(2);
        var keyStrs = Base64.encode((App.MathUtil.getRandom(5, 1000000) * 2.3).toString());
        var urlParm = qStr + keyStrs.substr(0, 5) + hStr;
        tb["pstr"] = urlParm;
        App.LogUtil.log("登陆聊天服务器", tb);
        NetManager.chat.send(tb);
        // LocalStorageManager.set("lastAllianceId", String(aid));
        Api.chatVoApi._lastAllianceId = aid;
    }
    NetManager.chatServerLogin = chatServerLogin;
    /**
     * 处理发送数据
     * @param data json对象
     */
    function formatRequest(cmd, data) {
        var result = {};
        var params = data ? data : {};
        if (cmd != NetRequestConst.REQUEST_CLIENT_CHAT) {
            switch (cmd) {
                case NetRequestConst.REQUEST_USER_LOGIIN:
                    params["client_ip"] = GameData.client_ip;
                    params["pid"] = PlatformManager.userId;
                    // params["bindid"] = 
                    // params["buidtype"] = 
                    // params["deviceid"] = 
                    break;
            }
            result["cmd"] = cmd;
            result["params"] = params;
            // 添加公共数据start
            result["uid"] = GameData.userId;
            result["ts"] = GameData.serverTime;
            result["logints"] = GameData.logints;
            result["rnum"] = requestNum;
            result["zoneid"] = GameData.curZoneID;
            result["access_token"] = GameData.access_token;
            // 添加公共数据end	
        }
        else {
            // todo聊天数据
        }
        return result;
    }
    /**
     * 处理接收数据
     * @param data json对象
     */
    function formatReceive(data, callbackAction) {
        if (data) {
            if (data.cmd) {
                NetManager.curReceiveCmd = data.cmd;
            }
            var rData = data.data;
            var isLogin = false;
            if (data.cmd && data.cmd == NetRequestConst.REQUEST_USER_LOGIIN) {
                //todo
                LocalStorageManager.set(LocalStorageConst.LOCAL_USER_NAME, PlatformManager.userId);
                LocalStorageManager.set(LocalStorageConst.LOCAL_PASSWORD, GameData.tmpUserPassword);
                if (!callbackAction) {
                    return GameConfig.switchNewOrOldCfg(rData && rData.newCfgFlag != null, function () {
                        formatReceive(data, true);
                    }, NetManager);
                }
                if (rData && rData.notices) {
                    GameData.announcementData = data.data.notices;
                }
                // rData.wbrewards = "6_1004_4|6_1302_4|6_1301_4|6_1303_4";
                // rData.wbrewardsFlag = true;
                //玩吧礼包
                if (rData && rData.wbrewards != null) {
                    GameData.wbrewards = rData.wbrewards;
                }
                /**
                 * 玩吧礼包
                 */
                if (rData && rData.wbrewardsFlag != null) {
                    GameData.wbrewardsFlag = rData.wbrewardsFlag;
                }
                /**
                 *openShenhe 是否开启审核 1:开启审核、屏蔽排行榜  0:打开排行榜关闭审核
                 */
                // if(rData&&rData.switch&&rData.switch.openShenhe)
                // {
                // 	GameData.openShenhe =rData.switch.openShenhe;
                // }
                /**
                 * 糖果屋登录
                 */
                if (rData && rData.candyflag != null) {
                    GameData.candyflag = rData.candyflag;
                }
                /**
                 * 玩吧数据上报
                 */
                if (rData && rData.closeSource != null) {
                    GameData.closeSource = rData.closeSource;
                }
                /**
                 * 玩吧，设置分享信息
                 */
                // alert("checkIsFkylcSp:" + PlatformManager.checkIsFkylcSp());
                // if (RSDKHelper.isInit && (PlatformManager.checkIsWanbaSp() || PlatformManager.checkIs4399Sp() || PlatformManager.checkIsAiweiyouSp() || PlatformManager.checkIsFkylcSp())) {
                if (RSDKHelper.isInit) {
                    var tmpUid_1 = data.uid;
                    egret.callLater(function () {
                        // alert("RSDKHelper.setShareInfo:"+ tmpUid);
                        RSDKHelper.setShareInfo(tmpUid_1);
                    }, null, data.uid);
                }
                isLogin = true;
            }
            if (rData && rData.limitVipLv) {
                GameData.limitVipLv = rData.limitVipLv;
                GameData.limitVipLv.sort(function (a, b) {
                    return a - b;
                });
            }
            /**
             * 聊天等级
             */
            if (rData && rData.chatlevel != null) {
                GameData.chatlevel = rData.chatlevel;
            }
            //推送消息
            if (rData && rData.gamebarmsg != null) {
                PlatformManager.pushMsg(rData.gamebarmsg);
            }
            if (data.timezone != null) {
                GameData.timeZone = data.timezone;
            }
            var checkData = checkServerData(data);
            if (checkData.ret == false) {
                if (checkData.data.ret == -125) {
                    ViewController.getInstance().openView(ViewConst.POPUP.OFFLINEVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: LanguageManager.getlocal("accountprompting"),
                        callback: this.refreshHandler,
                        handler: this,
                        needCancel: false
                    });
                }
                if (checkData.data.ret == -999) {
                    var rewardStr = LanguageManager.getlocal("accountLock");
                    // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: rewardStr,
                        callback: this.doDis,
                        handler: this,
                        needCancel: false
                    });
                    NetLoading.hide();
                    return;
                }
            }
            else {
                Api.formatData(rData, data.cmd);
                if (rData.unlockServant && !rData.unlockWife) {
                    if (data.cmd == NetRequestConst.REQUEST_USER_UPGRADE) {
                        var data_1 = { unlockServant: rData.unlockServant };
                        Api.servantVoApi.setWaitShowData(data_1);
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, rData.unlockServant);
                    }
                }
                if (rData.unlockWife && data.cmd != NetRequestConst.REQUEST_USER_LOGIIN) {
                    if (data.cmd == NetRequestConst.REQUEST_USER_UPGRADE || data.cmd == NetRequestConst.REQUEST_SEARCH_PLAY) {
                        var data_2 = { unlockWife: rData.unlockWife, unlockServant: rData.unlockServant };
                        Api.wifeVoApi.setWaitShowWife(data_2);
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW, { wifeIdList: rData.unlockWife, servantId: rData.unlockServant });
                    }
                }
                if (isLogin && Config.AcCfg.isGetAll == false) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, {});
                }
            }
            // 解析公共数据start
            if (data.ts) {
                TickManager.startTick();
                GameData.serverTime = data.ts;
                // 计算服务器和客户端时间差
                GameData.serverClientTimeDt = data.ts - new Date().getTime() / 1000;
            }
            // 版本踢人
            if (data.data && data.data.verinfo && data.data.verinfo.ver && window["VERINFO_VER"] && data.data.verinfo.ver > window["VERINFO_VER"]) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: data.data && data.data.verinfo && data.data.verinfo.msg ? data.data.verinfo.msg : LanguageManager.getlocal("versionCompareInfo"),
                    callback: function (dlg) {
                        window.location.reload();
                    },
                    handler: null,
                    clickNotAutoHide: true,
                    inLayer: LayerManager.maskLayer
                });
            }
            // 解析公共数据end
            //上面填解析data代码
            var requestType = (data && data.cmd) ? data.cmd : NetRequestConst.REQUEST_CLIENT_CHAT;
            App.MessageHelper.dispatchEvent(getMessageName(requestType), checkData);
        }
    }
    function refreshHandler() {
        LoginManager.changeAccount();
    }
    NetManager.refreshHandler = refreshHandler;
    function formatPushData(data) {
        formatReceive(data);
    }
    NetManager.formatPushData = formatPushData;
    /**
     * 处理聊天数据
     * @param data
     */
    function formatReceiveChat(data) {
        if (data.type != "chat") {
            return;
        }
        Api.formatChatData(data);
    }
    NetManager.formatReceiveChat = formatReceiveChat;
    /**
     * 检查数据是否有报错
     * @param data
     */
    function checkServerData(data) {
        var ret = true;
        if (data.ret < 0) {
            ret = false;
        }
        return { data: data, ret: ret };
    }
    NetManager.checkServerData = checkServerData;
    /**
     * 根据请求cmd
     * @param requestType
     */
    function getMessageName(requestType) {
        return "socket_receivedata_" + requestType;
    }
    NetManager.getMessageName = getMessageName;
    /**
     * 检测是否是https连接
     */
    function checkHttps() {
        return Http.getProtocol() == "https:";
    }
    NetManager.checkHttps = checkHttps;
})(NetManager || (NetManager = {}));

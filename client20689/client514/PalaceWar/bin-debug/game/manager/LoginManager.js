/**
 * 游戏登陆管理
 * author dmj
 * date 2017/9/12
 * @namespace LoginManager
 */
var LoginManager;
(function (LoginManager) {
    LoginManager.isCreateScene = false;
    var isNewGuideComplete = false;
    var isShowLoginLoading = false;
    LoginManager.waitToCheckLoadGuide = false;
    LoginManager.isLoginSuccess = false;
    /**
     * 是否是新用户，是对pid来说，所有服都没有账号的情况
     */
    LoginManager.isNewUser = false;
    function showLoginLoading() {
        if (!isShowLoginLoading) {
            NetLoading.show();
            isShowLoginLoading = true;
        }
    }
    LoginManager.showLoginLoading = showLoginLoading;
    function hideLoginLoading() {
        if (isShowLoginLoading) {
            NetLoading.hide();
            isShowLoginLoading = false;
        }
    }
    LoginManager.hideLoginLoading = hideLoginLoading;
    function login() {
        if (App.LoginResLoader.isLoginResLoaded) {
            showLoginLoading();
        }
        else {
            showLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
        }
        if (NetManager.socket.isConnected()) {
            gameSocketConnectSuccessHandler();
        }
        else {
            GameData.curZoneID = Number(ServerCfg.selectServer.zid);
            // ServerCfg.baseUrl="//"+ServerCfg.selectServer.ip_server+"/gucenter/";
            App.LogUtil.log("loginmanager开始连接游戏socket");
            NetManager.socket.connect(ServerCfg.selectServer.ip_server, Number(ServerCfg.selectServer.port_server), gameSocketConnectSuccessHandler, LoginManager);
        }
        App.LoginResLoader.loadPublicRes();
    }
    LoginManager.login = login;
    function getLocalUserName() {
        var localName = LocalStorageManager.get(LocalStorageConst.LOCAL_USER_NAME);
        return PlatformManager.userId ? PlatformManager.userId : localName;
    }
    LoginManager.getLocalUserName = getLocalUserName;
    function getUserPassword() {
        var password = LocalStorageManager.get(LocalStorageConst.LOCAL_PASSWORD);
        return password ? password : GameData.tmpUserPassword;
    }
    LoginManager.getUserPassword = getUserPassword;
    function gameSocketConnectSuccessHandler() {
        App.LogUtil.log("游戏Socket连接成功");
        //以下调用http获取uid和token
        var uname, upwd, gaccount;
        uname = PlatformManager.userId;
        upwd = GameData.tmpUserPassword;
        var urlStr = ServerCfg.baseUrl + ServerCfg.serverTokenUrl + "?pm=";
        var accessZoneid = GameData.curZoneID;
        if (GameData.curOldZoneID != null && GameData.curOldZoneID != 0) {
            accessZoneid = GameData.curOldZoneID;
        }
        var tmpTsStr = Date.now().toString();
        var urlParm = "username=" + uname + "&zoneid=" + accessZoneid + "&newzoneid=" + GameData.curZoneID + "&password=" + upwd + "&ts=" + tmpTsStr; //+Date.now();//os.time()
        // if(GlobalData.isTest==true)
        // {
        //     urlParm = urlParm+"&local=1";
        // }
        var platform = GameData.getCurPlatName();
        var device = App.DeviceUtil.isIOS() ? "IOS" : "Android";
        var area = GameData.getCountry();
        if (gaccount != null && gaccount != "") {
            urlParm = urlParm + "&gaccount=" + gaccount;
        }
        urlParm = urlParm + "&platform=" + platform + "&device=" + device + "&area=" + area + "&rayparms=1";
        // urlParm=  urlParm+"&platform="+platform+"&device="+device+"&area="+area+"&rayparms=1"+"&spid="+PlatformManager.getSpidStr(true);
        App.LogUtil.log("加密前 " + urlParm);
        urlParm = Base64.encode(urlParm);
        App.LogUtil.log("截取之前 " + urlParm);
        var qStr = urlParm.substr(0, 2);
        App.LogUtil.log("取到的qStr " + qStr);
        var hStr = urlParm.substr(2);
        App.LogUtil.log("截取后的hStr" + hStr);
        App.LogUtil.log("时间戳加密前 " + tmpTsStr);
        var timeStr = Base64.encode(tmpTsStr);
        App.LogUtil.log("时间戳加密后 " + timeStr);
        urlParm = qStr + timeStr.substr(0, 5) + hStr;
        App.LogUtil.log("组合之后", urlParm);
        App.LogUtil.log("组合的各个部分", qStr, timeStr.substr(0, 5), hStr);
        urlStr = urlStr + urlParm;
        App.LogUtil.log("getAccessToken:" + urlStr);
        // getAssessTokenFromHttp(urlStr, this.getTokenSuccess, this);
        NetManager.http.post(urlStr, null, getTokenSuccessHandler, ioerrorHandler, null);
        // NetManager.http.post(urlStr,null,ioerrorHandler,getTokenSuccessHandler,null);
    }
    function getTokenSuccessHandler(data) {
        var sData = NetManager.checkServerData(data);
        var ret = sData.ret;
        if (ret == false) {
            hideLoginLoading();
            App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
            // todo弹错误面板
            // App.MessageCenter.dispatch(MessageConst.MESSAGE_SHOW_LOGIN_BTNS,{notice:true});
            return;
        }
        sData = sData.data;
        if (sData.access_token) {
            GameData.access_token = sData.access_token;
        }
        if (sData.logints) {
            GameData.logints = sData.logints;
            GameData.serverTime = sData.logints;
        }
        if (sData.statisticsId) {
            GameData.statisticsId = sData.statisticsId;
        }
        var cuid = sData.uid;
        GameData.userId = cuid;
        var isMaintain = false;
        if (sData.hasOwnProperty("gconfig") && sData.gconfig != null && sData.gconfig.hasOwnProperty("zoneid") && sData.gconfig.zoneid != null) {
            if (typeof sData.gconfig.zoneid == typeof {}) {
                var index = 0;
                var k;
                for (k in sData.gconfig.zoneid) {
                    index++;
                }
                if (index == 0) {
                    isMaintain = true;
                }
                else {
                    for (k in sData.gconfig.zoneid) {
                        if (sData.gconfig.zoneid[k] == GameData.curZoneID) {
                            isMaintain = true;
                            break;
                        }
                    }
                }
                if (isMaintain == true && sData.gconfig && sData.gconfig.status == -9999) {
                    // Global.G_cancleLoginLoading();
                    // if(sData.gconfig.content&&sData.gconfig.content!="")
                    // {
                    //     smallDialog.showSure(this,GlobalData.G_UI_SmallDialogBg,new CCSize(550,400),new egret.Rectangle(0, 0, 400, 350),new egret.Rectangle(168, 86, 10, 10),Global.getlocal("dialog_title_prompt"),sData.gconfig.content,null,200);
                    //     return;
                    // }
                    // if(sData.gconfig.st==0&&sData.gconfig.et==0)
                    // {
                    //     smallDialog.showSure(this,GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain1"), null, 200);
                    // }
                    // else
                    // {
                    //     var str:string = activityVoApi.getInstance().getActivityTimeStr(sData.gconfig.st, sData.gconfig.et);
                    //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain2", [str]), null, 200);
                    // }
                    return;
                }
                if (isMaintain == true && sData.gconfig && sData.gconfig.status == -9998) {
                    // Global.G_cancleLoginLoading();
                    // if(sData.gconfig.content&&sData.gconfig.content!="")
                    // {
                    //     let reloadserverlist = function()
                    //     {
                    //         Base.getSvrConfigFromHttpSuccess = false;
                    //         //Global.getServerListCfgFromHttp();
                    //         Global.G_getServerCfgFromHttp(false,null,null);
                    //     }
                    //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), sData.gconfig.content, false, 0, null, reloadserverlist);
                    // }
                }
            }
        }
        if (sData.gconfig != null && sData.gconfig.status == -9999) {
            // if(sData.gconfig.st==0&&sData.gconfig.et==0)
            // {
            //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain1"), null, 200);
            // }
            // else
            // {
            //     var str:string = activityVoApi.getInstance().getActivityTimeStr(sData.gconfig.st, sData.gconfig.et);
            //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain2", [str]), null, 200);
            // }
            return;
        }
        if (ret == true) {
            // var chatSvrTb:any=null;
            // if(ServerCfg.allChatServer[GameData.getCountry()])
            // {
            //     for(var k1 in ServerCfg.allChatServer[GameData.getCountry()])
            //     {
            //         if(ServerCfg.allChatServer[GameData.getCountry()][k1].name==GameData.curArea)
            //         {
            //             chatSvrTb=ServerCfg.allChatServer[GameData.getCountry()][k1];
            //             break;
            //         }
            //     }
            // }
            // if(chatSvrTb!=null)
            // {
            // 	NetManager.chat.connect(chatSvrTb.ip,chatSvrTb.port,null,null);
            // }
            // else
            // {
            //     return;
            // }
        }
        if (sData.client_ip != null) {
            GameData.client_ip = sData.client_ip;
        }
        //以上调用http获取uid和token
        requestUseLogin();
    }
    function requestUseLogin() {
        if (GameConfig.isLoaded) {
            if (App.MessageHelper.hasEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED)) {
                App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED, requestUseLogin, LoginManager);
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), userLoginRequestHandler, null);
            var parms = { plat: PlatformManager.getAppid(), enter: true };
            var giftId = PlatformManager.getGiftId();
            if (giftId) {
                parms["giftid"] = giftId;
            }
            //test code
            // parms["giftid"] = "101";
            if (PlatformManager.getCandyFlag()) {
                parms["candyflag"] = PlatformManager.getCandyFlag();
            }
            if (PlatformManager.checkIsWanbaSp()) {
                parms["source"] = PlatformManager.getFromQZonePet();
            }
            if (PlatformManager.checkUseRSDKSocket()) {
                parms.clientSocket = "1";
            }
            if (LoginManager.isNewUser) {
                parms.isnewuser = 1;
            }
            var spName = PlatformManager.getSpName();
            if (spName) {
                parms.platName = spName;
            }
            if (PlatformManager.checkIs3KSp()) {
                var channelId = PlatformManager.getChannelId();
                if (channelId) {
                    parms.channel_id = channelId;
                }
                console.log("channelid:" + channelId);
            }
            // 微端的一些验证，由于历史原因，微端叫app，其它均叫pc
            if (PlatformManager.checkIsTWBSp()) {
                if (PlatformManager.checkIsTwWeb()) {
                    parms.downType = "pc";
                }
                else {
                    parms.downType = "app";
                }
            }
            if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid()) {
                if (!qqwanbaplugin.checkIsFromMicroEnd()) {
                    parms.downType = "nwd";
                }
                else {
                    parms.downType = "wd";
                }
            }
            // 邀请者信息
            if (PlatformManager.inviter_uid) {
                parms.inviteUid = PlatformManager.inviter_uid;
                if (!PlatformManager.checkIsFkylcSp()) {
                    parms.platUrl = PlatformManager.avatar;
                }
                parms.inviter_pid = PlatformManager.inviter_pid;
            }
            NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN, parms);
        }
        else {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED, requestUseLogin, LoginManager);
        }
    }
    function reLoginGame() {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_LOGIIN, reLoginGameSuccess, LoginManager);
        var parms = {};
        var spName = PlatformManager.getSpName();
        if (spName) {
            parms.platName = spName;
        }
        if (PlatformManager.getCandyFlag()) {
            parms["candyflag"] = PlatformManager.getCandyFlag();
        }
        if (PlatformManager.checkIs3KSp()) {
            var channelId = PlatformManager.getChannelId();
            if (channelId) {
                parms.channel_id = channelId;
            }
        }
        if (PlatformManager.checkUseRSDKSocket()) {
            parms.clientSocket = "1";
        }
        NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN, parms);
    }
    LoginManager.reLoginGame = reLoginGame;
    function reLoginGameSuccess(e) {
        NetLoading.hide();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_LOGIIN, reLoginGameSuccess, LoginManager);
        userLoginRequestHandler(e);
    }
    function userLoginRequestHandler(event) {
        //致劲老用户导入
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), userLoginRequestHandler, null);
        if (PlatformManager.checkIs3kQianYiSp() && Api.switchVoApi.checkOpen3kQianYi()) {
            hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.SETPASSWORDPOPUPVIEW);
            return;
        }
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret) {
            hideLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
            if (!Api.playerVoApi.getPlayerName()) {
                PlatformManager.analyticsRegister();
            }
            PlatformManager.analyticsLogin();
            LoginManager.isLoginSuccess = true;
            if (Api.playerVoApi.getPlayerName() == "") {
                StatisticsHelper.reportLoadData(15);
                App.LoginResLoader.setNeedLoadGuideRes();
                ViewController.getInstance().openView(ViewConst.COMMON.GUIDECREATEUSERVIEW);
            }
            else {
                //中断新手引导的
                if (Api.gameinfoVoApi.getGuideStep() != 9999 && !Api.rookieVoApi.isInGuiding) {
                    PlatformManager.analyticsNewGuide(RookieCfg.getRookieCfg("guideSteps"));
                    NetManager.request(NetRequestConst.REQUEST_USER_NEWERGUILD, { step: 9999 });
                }
                if (LoginManager.waitToCheckLoadGuide) {
                    LoginManager.waitToCheckLoadGuide = false;
                    App.LoginResLoader.isLoginResLoaded = true;
                }
                if (App.LoginResLoader.isLoginResLoaded) {
                    StatisticsHelper.reportLoadData(15);
                }
                completeGuideForLogin();
            }
            // completeGuideForLogin();
            // checkAndCreateScene();
            connectChat();
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            hideLoginLoading();
            NetManager.socket.dispose();
            ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { msg: LanguageManager.getlocal("loginFailDesc") });
            // let loginView =  <LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
            //  App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,loginView.refresh,loginView);
            // loginView.showLogoAndLoginBtn();
        }
    }
    function reLoginChat() {
        Api.chatVoApi.clearChat();
        connectChatSuccess();
    }
    LoginManager.reLoginChat = reLoginChat;
    //连接聊天服务器
    function connectChat() {
        if (ServerCfg.selectServer) {
            // if(ServerCfg.selectServer.port_chat.toString()=="3001")
            // {
            //     ServerCfg.selectServer.port_chat="3002";
            // }
            if (!NetManager.chat.isConnected()) {
                NetManager.chat.connect(ServerCfg.selectServer.ip_chat, Number(ServerCfg.selectServer.port_chat), connectChatSuccess, LoginManager);
            }
        }
        else {
            return;
        }
    }
    //连接聊天服务器成功
    function connectChatSuccess() {
        NetManager.chatServerLogin(null, null);
    }
    function ioerrorHandler(data) {
        // smallDialogManager.showTopSure(Global.getlocal("dialog_title_prompt"), Global.getlocal("netiswrong"), retry, Global);
        // function retry(): void
        // {
        //     Global.getAssessTokenFromHttp(url, callback, callbackObj, ioerrorCallback);
        // }
        hideLoginLoading();
        NetManager.socket.dispose();
        ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { msg: LanguageManager.getlocal("loginFailDesc"), callback: gameSocketConnectSuccessHandler });
        // gameSocketConnectSuccessHandler();
    }
    function checkAndCreateScene() {
        console.log("checkAndCreateScene" + App.LoginResLoader.isLoginResLoaded + LoginManager.isLoginSuccess + isNewGuideComplete);
        if (App.LoginResLoader.isLoginResLoaded && LoginManager.isLoginSuccess && isNewGuideComplete) {
            if (!LoginManager.isCreateScene) {
                SceneController.getInstance().goHome();
                MainUI.getInstance().show();
            }
            LoginLoading.hide();
            LoginManager.isCreateScene = true;
        }
    }
    LoginManager.checkAndCreateScene = checkAndCreateScene;
    function completeGuideForLogin() {
        if (!isNewGuideComplete) {
            isNewGuideComplete = true;
        }
        if (isNewGuideComplete) {
            checkAndCreateScene();
        }
    }
    LoginManager.completeGuideForLogin = completeGuideForLogin;
    function changeServer() {
        // SceneController.getInstance().hideScene
        App.LoginResLoader.dispose();
        Config.AcCfg.isGetAll = false;
        LoginManager.waitToCheckLoadGuide = false;
        LoginManager.isNewUser = false;
        // egret.Tween.removeAllTweens();
        SceneController.getInstance().dispose();
        MainUI.getInstance().hide();
        ViewController.getInstance().hideAllView();
        NetManager.socket.dispose();
        NetManager.chat.dispose();
        NetManager.http.dispose();
        TickManager.stopTick();
        App.DragonBonesUtil.clear();
        Api.dispose();
        GameData.dispose();
        StatisticsHelper.clearReportData();
        LoginManager.isLoginSuccess = false;
        NetLoading.hideForChangeAccount();
        var loginView = ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        if (loginView) {
            if (loginView.isInit()) {
                // loadLoginViewRes();
            }
            else {
                if (!loginView.isShow()) {
                    ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
                }
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
        }
        LoginManager.isCreateScene = false;
    }
    LoginManager.changeServer = changeServer;
    function changeAccount() {
        PlatformManager.isLogin = false;
        GameData.kkkIsBindIos = "0";
        changeServer();
        // PlatformManager.login();
    }
    LoginManager.changeAccount = changeAccount;
})(LoginManager || (LoginManager = {}));

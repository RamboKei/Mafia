var RSDKHelper;
(function (RSDKHelper) {
    RSDKHelper.isInit = false;
    function init() {
        // if(window.location.search=="")
        // {
        //     let searchParam = {
        //         "appid":"20120011",
        //         "appkey":"9fc114c245a6c4f8d6c244d861738ed3",
        //         "login_plugin":["rsdkclient"],//["rgame"],
        //         // "login_trade_type":""
        //         "pay_plugin":["rsdkclient"],//["rgame"],
        //         "analytics_plugin":["pttracker"],
        //         "resbaseurl":"//192.168.101.67/rsdk/",
        //         "baseserverurl":"//123.207.90.81/gamesdk-server",
        //         "order_url":"//devsdk.raysns.com/cuiwenjian/rsdk-base-server/src/pay/create_order/devsdk/h5test/v1",
        //         "token_url":"http://devsdk.raysns.com/cuiwenjian/rsdk-base-server/src/user/login"
        //     };
        //     searchParam.appid="9991001001";
        //     searchParam.appkey="axw8o51698e3f208czd8d26cw0fdyb57";
        //     window.location.search="?rsdk_param="+JSON.stringify(searchParam);
        // }
        if (App.DeviceUtil.IsHtml5() && PlatformManager.checkIsFkylcSp()) {
            var content = LanguageManager.getShareDesc();
            window["shareTitle"] = content.title || "想成就一番伟业么？";
            window["shareDesc"] = content.desc || "开服是个芝麻官，七天之后当王爷！";
            window["shareImgUrl"] = "http://gt-fkylc-cdn.raygame3.com/gt_fkylc/shareicon.png";
        }
        RSDK.init({ privateKey: "8505ED51CF9A766254A39F5762030153", debug: false }, function (code, data) {
            RSDKHelper.isInit = true;
            console.log("初始化结果" + code);
            // login();
            if (App.LoginResLoader.isDefaultResLoaded) {
                App.LoginResLoader.initPlatCfg();
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS);
            PlatformManager.client.setAppForegroundStatusChange();
            PlatformManager.analyticsLoadEnd();
        }); //测试
    }
    RSDKHelper.init = init;
    function login() {
        RSDK.login("", function (code, data) {
            console.log("登录::" + code + "::" + App.StringUtil.toString(data));
            if (Number(code) == 0) {
                PlatformManager.userId = data.userId;
                PlatformManager.prefix = data.prefix;
                PlatformManager.userType = data.userType;
                PlatformManager.token = data.token;
                PlatformManager.isLogin = true;
                PlatformManager.nickname = data.nickname;
                PlatformManager.avatar = data.avatar;
                PlatformManager.inviter_pid = data.inviter_pid;
                PlatformManager.inviter_uid = data.inviter_uid;
                // alert("头像::"+data.avatar + "登录::"+code+"::"+App.StringUtil.toString(data));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS);
            }
            else if (Number(code) == -1) {
            }
            else if (Number(code) == -2) {
            }
            else if (Number(code) == 1001) {
                if (PlatformManager.isSupportBindPhone()) {
                    GameData.kkkIsBindIos = String(data.msg);
                    //是否绑定过手机 1已绑定,0未绑定
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_IOS_BINDPHONE, { "result": String(data.msg) });
                }
            }
            else if (Number(code) == 1002) {
                PlatformManager.kkk_age = Number(data.msg);
            }
            else if (Number(code) == 1003) {
                console.log("检查服务器:" + code + "  " + data.msg);
                if (Number(data.msg) == 1) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
                }
            }
            else if (Number(code) == 1004) {
                console.log("检查账号绑定:" + code + "  " + data.msg);
                // if (Number(data.msg) == 1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BIND, data.msg);
                // }
            }
        }, function (code, data) {
            console.log("登出::" + code);
            if (Number(code) == 0) {
                PlatformManager.isLogin = false;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_LOGOUT);
                // if(!LoginView.isShowed)
                // {
                LoginManager.changeAccount();
                // }
            }
        });
    }
    RSDKHelper.login = login;
    function logout() {
        RSDK.logout();
    }
    RSDKHelper.logout = logout;
    function pay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (PlatformManager.checkIsWanbaSp()) {
            var data = window["OPEN_DATA"];
            var platform = data.platform;
            var app = data.qua.app;
            productId = Config.RechargeCfg.wanbaCfg[productId]["pid" + platform];
            window["__payError"] = function () {
                //支付失败执行
                App.CommonUtil.showTip(LanguageManager.getlocal("payFailTip"));
            };
            window["__payClose"] = function () {
                //关闭对话框执行,IOS下无效
                App.CommonUtil.showTip(LanguageManager.getlocal("payCancelTip"));
            };
        }
        else {
            if (itemCfg.orderid) {
                productId = itemCfg.orderid;
            }
        }
        var payInfo = new productInfo();
        payInfo.coinNum = itemCfg.gemCost.toString();
        payInfo.currency = "CNY";
        if (PlatformManager.checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                payInfo.currency = "KRW";
            }
            else if (App.DeviceUtil.isIOS()) {
                payInfo.currency = "USD";
            }
        }
        payInfo.gameUserId = GameData.userId.toString();
        payInfo.gameUserName = Api.playerVoApi.getPlayerName();
        payInfo.price = itemCfg.cost.toString();
        if (checkWifeABTest()) {
            var data = { channelId: "17003002", allProductId: Config.RechargeCfg.getAllProductid().join(",") };
            payInfo.privateData = JSON.stringify(data);
            ;
        }
        else {
            payInfo.privateData = JSON.stringify({ allProductId: Config.RechargeCfg.getAllProductid().join(",") });
        }
        payInfo.productCount = "1";
        payInfo.productId = productId;
        payInfo.productName = itemCfg.gemCost + LanguageManager.getlocal("gemName");
        payInfo.productType = "1";
        payInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        payInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        payInfo.serverId = ServerCfg.selectServer.zid;
        payInfo.serverName = ServerCfg.selectServer.sname ? ServerCfg.selectServer.sname : ServerCfg.selectServer.zid;
        RSDK.pay(payInfo, function (code, data) {
            if (PlatformManager.checkIsWanbaSp()) {
                if (data && data.balance != null) {
                    var balance = Number(data.balance);
                    if (isNaN(balance) == false) {
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, { msg: LanguageManager.getlocal("paySuccessLeftMoneyTip", [String(itemCfg.cost * 10), String(itemCfg.gemCost), String(balance), Config.RechargeCfg.getMoneyName()]), title: "itemUseConstPopupViewTitle", touchMaskClose: true });
                    }
                }
            }
        });
    }
    RSDKHelper.pay = pay;
    function share(callback) {
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "想成就一番伟业么？", desc: desc.desc || "开服是个芝麻官，七天之后当王爷！" };
        RSDK.share(content, callback);
    }
    RSDKHelper.share = share;
    // 设置分享信息
    function setShareInfo(shareInfo) {
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "想成就一番伟业么？", desc: desc.desc || "开服是个芝麻官，七天之后当王爷！" };
        RSDK.setShareInfo(content, shareInfo);
    }
    RSDKHelper.setShareInfo = setShareInfo;
    function fbShare(callback) {
        console.log("QAZ fbShare");
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "一個官人七個妻 真實體驗古風官場生活",
            desc: desc.desc || "好男兒生當作人傑，三妻四妾，封王拜侯，爭雄稱霸!\n春風得意馬蹄疾，一日看盡長安花！快意一生！",
            imageurl: "http://pic.heyyogame.com/panwuxi/picture/201711220fa85dce39574e4e3640ad85370e16ed.jpg",
            link: "https://adv.heyyogame.com/adv.jsp?gamecode=GD&partnerName=share&advcode=GD_yypV_414" };
        RSDK.share(content, callback);
    }
    RSDKHelper.fbShare = fbShare;
    function krShare(callback) {
        console.log("QAZ krShare");
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "역천인 - 이제까지 없던 정통 사극 RPG!",
            desc: desc.desc || "역사 속 위대한 위인, 경국지색의 미녀들과 함께 써나가는 당신만의 장대한 서사시. 신분의 한계를 뛰어넘어 왕이 되어라!",
            imageurl: "https://yccs.mayngames.co.kr/img/fbshare1.jpg",
            link: "https://yccs.mayngames.co.kr/fbshare" };
        RSDK.share(content, callback);
    }
    RSDKHelper.krShare = krShare;
    /**
     *
     * @param code -1 登录统计  -2新手引导步数 -3 注册统计 -4 支付统计 -5 升级统计 -6 loading完成统计
     * @param info
     */
    function trackEvent(code, info) {
        if (PlatformManager.checkIsKRShenhe()) {
            return;
        }
        try {
            var isABTest = checkWifeABTest();
            if (isABTest) {
                switch (code) {
                    case TRACK_LOGIN:
                    case TRACK_NEW_GUIDE:
                    case TRACK_REGISTER:
                    case LEVEL_UP:
                        info.channelId = "17003002";
                    default:
                }
            }
            RSDK.trackEvent(code, info);
            if (checkApenAutoLoginABtest()) {
                switch (code) {
                    case TRACK_LOGIN:
                    case TRACK_NEW_GUIDE:
                    case TRACK_REGISTER:
                    case LEVEL_UP:
                        info.channelId = "17999001";
                    default:
                }
                RSDK.trackEvent(code, info);
            }
        }
        catch (e) {
            App.LogUtil.log("前端统计报错:" + code);
        }
    }
    function checkWifeABTest() {
        return Api.switchVoApi.checkWifeAni() && Api.switchVoApi.checkOpenWifeAbTest();
    }
    function checkApenAutoLoginABtest() {
        return Api.switchVoApi.checkApenAutoLoginABtest() && Api.otherInfoVoApi.isnewuser();
    }
    function analyticsLogin() {
        try {
            if (PlatformManager.checkIsWanbaSp()) {
                var isReport = true;
                // if(GameData.wanbaEvenyNumReport)
                // {
                //     if(GameData.userId%GameData.wanbaEvenyNumReport==0)
                //     {
                //         isReport=true;
                //     }
                // }
                // else
                // {
                //     isReport=true;
                // }
                if (GameData.closeSource == 1) {
                    isReport = false;
                }
                if (isReport && window && window["reportLogin"]) {
                    window["reportLogin"]();
                }
            }
        }
        catch (e) {
        }
        var eventInfo = {};
        eventInfo.userId = PlatformManager.userId;
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName() ? Api.playerVoApi.getPlayerName() : GameData.userId.toString();
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType = 0;
        trackEvent(TRACK_LOGIN, eventInfo);
    }
    RSDKHelper.analyticsLogin = analyticsLogin;
    function analyticsNewGuide(step) {
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.step = String(step);
        trackEvent(TRACK_NEW_GUIDE, eventInfo);
    }
    RSDKHelper.analyticsNewGuide = analyticsNewGuide;
    function analyticsRegister() {
        if (PlatformManager.checkIsWanbaSp()) {
            var isReport = true;
            // if(GameData.wanbaEvenyNumReport)
            // {
            //     if(GameData.userId%GameData.wanbaEvenyNumReport==0)
            //     {
            //         isReport=true;
            //     }
            // }
            // else
            // {
            //     isReport=true;
            // }
            if (GameData.closeSource == 1) {
                isReport = false;
            }
            console.log('report' + (isReport ? 1 : 0));
            if (isReport && window && window["reportRegister"]) {
                window["reportRegister"]();
            }
        }
        var eventInfo = {};
        eventInfo.userId = PlatformManager.userId;
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName() ? Api.playerVoApi.getPlayerName() : GameData.userId.toString();
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType = 1;
        trackEvent(TRACK_REGISTER, eventInfo);
        console.log("QAZ analyticsRegister TRACK_REGISTER " + TRACK_REGISTER);
        if (PlatformManager.checkIsTWBSp() && !PlatformManager.checkIsTest()) {
            StatisticsHelper.report_register_tw();
        }
    }
    RSDKHelper.analyticsRegister = analyticsRegister;
    function analyticsPay(id, orderId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(id);
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName();
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.orderId = orderId;
        eventInfo.price = itemCfg.cost;
        eventInfo.coinNum = itemCfg.gemCost;
        eventInfo.productCount = "1";
        eventInfo.productType = "1";
        eventInfo.currency = "CNY";
        if (PlatformManager.checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                eventInfo.currency = "KRW";
            }
            else if (App.DeviceUtil.isIOS()) {
                eventInfo.currency = "USD";
            }
        }
        trackEvent(TRACK_PAY, eventInfo);
        if (PlatformManager.checkIsTWBSp() && !PlatformManager.checkIsTest()) {
            StatisticsHelper.report_pay_tw(itemCfg.cost);
        }
    }
    RSDKHelper.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        App.LogUtil.log("__levelup_event__");
        var gameuserInfo = {};
        gameuserInfo.userName = "";
        gameuserInfo.userId = PlatformManager.userId;
        gameuserInfo.serverId = ServerCfg.selectServer.zid;
        gameuserInfo.serverName = ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName = Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId = GameData.userId.toString();
        gameuserInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        gameuserInfo.loginType = 2;
        trackEvent(LEVEL_UP, gameuserInfo);
        if (PlatformManager.checkIsTWBSp() && PlatformManager.checkIsTest() == false && Api.playerVoApi.getPlayerLevel() == 4) {
            StatisticsHelper.report_uplevel4_tw();
        }
    }
    RSDKHelper.analyticsLevelup = analyticsLevelup;
    function analyticsLoadEnd() {
        var eventInfo = {};
        // eventInfo.gameUserId=GameData.userId.toString();
        // eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():GameData.userId.toString();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        // eventInfo.serverId=ServerCfg.selectServer.zid;
        // eventInfo.serverName=ServerCfg.selectServer.sname;
        // eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        // eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        // eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        // eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        // eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        // eventInfo.loginType=0;
        trackEvent(TRACK_LOAD_END, eventInfo);
    }
    RSDKHelper.analyticsLoadEnd = analyticsLoadEnd;
    function analyticsCompleteNewGuide() {
        if (PlatformManager.checkIsKRSp() && Number(PlatformManager.getAppVersion()) > 14) {
            var eventInfo = {};
            eventInfo.gameUserId = GameData.userId.toString();
            eventInfo.serverId = ServerCfg.selectServer.zid;
            try {
                trackEvent(TRACK_TUTORIAL_END, eventInfo);
            }
            catch (e) {
                console.log("analyticsCompleteNewGuide error");
            }
        }
    }
    RSDKHelper.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
    /**
     * 登录统计
     */
    var TRACK_LOGIN = "-1";
    /**
     * 新手引导步数统计
     */
    var TRACK_NEW_GUIDE = "-2";
    /**
     * 注册统计
     */
    var TRACK_REGISTER = "-3";
    /**
     * 支付统计
     */
    var TRACK_PAY = "-4";
    /**
     * 升级统计
     */
    var LEVEL_UP = "-5";
    /**
     * 游戏loading完成统计
     */
    var TRACK_LOAD_END = "-6";
    /**
     * 新手引导完成
     */
    var TRACK_TUTORIAL_END = "-7";
    function checkAttention() {
        try {
            return RSDK.checkFollow();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.checkAttention = checkAttention;
    function attention(callback) {
        try {
            RSDK.requestFollow(callback);
        }
        catch (e) {
            console.log("调用RSDK.requestFollow");
        }
    }
    RSDKHelper.attention = attention;
    /** 实名认证开关 */
    function checkRealname(callback) {
        try {
            RSDK.callSdk("checkRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/checkRealNameAuth error");
        }
    }
    RSDKHelper.checkRealname = checkRealname;
    /** 实名认证  是否认证过 */
    function ifRealNameAuth(callback) {
        try {
            RSDK.callSdk("ifRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/ifRealNameAuth error");
        }
    }
    RSDKHelper.ifRealNameAuth = ifRealNameAuth;
    /** 实名认证调起注册界面 */
    function getRealNameAuth(callback) {
        try {
            RSDK.callSdk("getRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/getRealNameAuth error");
        }
    }
    RSDKHelper.getRealNameAuth = getRealNameAuth;
    function callSdk(action, data, callback) {
        RSDK.callSdk(action, data, callback);
    }
    RSDKHelper.callSdk = callSdk;
    /** 查询账号绑定状态 */
    function bindAccountStatus() {
        rsdkclientplugin.bindAccountStatus();
    }
    RSDKHelper.bindAccountStatus = bindAccountStatus;
    /** 调用cover的设置背景 */
    function callBackDrop() {
        try {
            RSDK.callSdk("callBackDrop", { url: "https://h5.qzone.qq.com/bgstore/detail/130859?_wv=2098179&from=adv&page=1&router=detail&coverid=130859&_proxy=1" }, null);
        }
        catch (e) {
            console.log("调用RSDK.callSdk callBackDrop error");
        }
    }
    RSDKHelper.callBackDrop = callBackDrop;
    /**
     * 检测是否已设置了cover背景
     */
    function checkBackDrop(callback) {
        try {
            RSDK.callSdk("checkBackDrop", { cover_id: "130859" }, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk checkBackDrop error");
        }
    }
    RSDKHelper.checkBackDrop = checkBackDrop;
    /**
     * 返回值：0：不显示分享按钮，1：显示分享按钮；2，显示分享按钮,游戏内指向右上角；3，显示分享按钮，点击分享按钮调用cp的默认提示分享方法；
     */
    function checkShare() {
        try {
            return RSDK.checkShare();
        }
        catch (e) {
            return 0;
        }
    }
    RSDKHelper.checkShare = checkShare;
    /**
     *  获取渠道客服类型：0：游戏自己处理；1：sdk客服页面（游戏调用 customerService）；2：返回qq客服信息，（游戏调用 getCustomerServiceData）
     */
    function getCustomerServiceType() {
        try {
            return RSDK.getCustomerServiceType();
        }
        catch (e) {
            return 0;
        }
    }
    RSDKHelper.getCustomerServiceType = getCustomerServiceType;
    /**
     * 是否能创建应用桌面快捷方式，true：显示发送桌面按钮，false：不显示按钮
     */
    function checkDesktop() {
        try {
            return RSDK.checkDesktop();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.checkDesktop = checkDesktop;
    /**
     * * 是否已经关注过，true：有关注功能；false：无关注功能
     */
    function hasFollow() {
        try {
            console.log("QAZ hasFollow " + RSDK.hasFollow());
            return RSDK.hasFollow();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.hasFollow = hasFollow;
    /**
     *  callback 返回 data 格式{gameName:"游戏名称",tel:"客服电话",qq:"qq群号"}
     */
    function getCustomerService(callback) {
        try {
            RSDK.getCustomerServiceData(callback);
        }
        catch (e) {
            console.log("调用RSDK.getCustomerServiceData error");
        }
    }
    RSDKHelper.getCustomerService = getCustomerService;
    function requestDesktop(data, callback, callbackThisObj) {
        try {
            return RSDK.requestDesktop(data, callback.bind(callbackThisObj));
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.requestDesktop = requestDesktop;
    function openUrl(url, callback, callbackThisObj) {
        try {
            RSDK.callSdk("openlink", { url: url }, null);
            // return RSDK.requestDesktop(data,callback.bind(callbackThisObj));
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.openUrl = openUrl;
})(RSDKHelper || (RSDKHelper = {}));

var PlatformManager;
(function (PlatformManager) {
    PlatformManager.isLogin = false;
    PlatformManager.kkk_age = 0;
    function getAppVersion() {
        try {
            if (rsdkclientplugin) {
                return rsdkclientplugin.getVersion();
            }
        }
        catch (e) {
            return "0";
        }
        return "0";
    }
    PlatformManager.getAppVersion = getAppVersion;
    function getAppid() {
        try {
            if (RSDK && RSDK.getAppid) {
                return RSDK.getAppid();
            }
        }
        catch (e) {
            try {
                if (SDK && SDK.CommonUtil && SDK.CommonUtil.appId) {
                    return SDK.CommonUtil.appId;
                }
            }
            catch (e) {
                return "";
            }
        }
    }
    PlatformManager.getAppid = getAppid;
    function getBigAppid() {
        if (App.DeviceUtil.isWyw()) {
            return "0";
        }
        var bigAppid = App.CommonUtil.getOption("r_bid");
        if (!bigAppid) {
            var appid = Number(getAppid());
            bigAppid = String(Math.floor(appid / 1000) * 1000);
        }
        return String(bigAppid);
    }
    PlatformManager.getBigAppid = getBigAppid;
    function getContact() {
        if (PlatformCfg.contactCfg[PlatformManager.getAppid()]) {
            return PlatformCfg.contactCfg[PlatformManager.getAppid()];
        }
        else if (PlatformCfg.contactCfg[PlatformManager.getBigAppid()]) {
            return PlatformCfg.contactCfg[PlatformManager.getBigAppid()];
        }
        else {
            for (var key in PlatformCfg.contactCfg) {
                if (key.indexOf("-") > -1) {
                    var keys = key.split("-");
                    var appid = Number(PlatformManager.getAppid());
                    var bigAppid = Number(PlatformManager.getBigAppid());
                    if (appid >= Number(keys[0]) && appid <= Number(keys[1])) {
                        return PlatformCfg.contactCfg[key];
                    }
                }
            }
        }
        return [];
    }
    PlatformManager.getContact = getContact;
    function getSpid() {
        var spid;
        if (App.DeviceUtil.isWXgame()) {
            spid = "wxgame";
        }
        if (App.DeviceUtil.isWyw()) {
            spid = "wyw";
        }
        else if (checkIsLocal()) {
            if (checkIsWeiduan()) {
                spid = "3k";
            }
            else {
                if (NetManager.checkHttps()) {
                    spid = "locals";
                }
                else {
                    spid = "local";
                }
            }
        }
        else if (checkIsIOSShenheSp()) {
            spid = "iosshenhe";
        }
        else if (checkIsWanbaSp()) {
            spid = "wanba";
        }
        else if (checkIs3KSp()) {
            spid = "3k";
        }
        else if (checkIsYYBSp()) {
            spid = "yyb";
        }
        else if (checkIsTWBSp()) {
            spid = "tw";
        }
        else if (checkIsFkylcSp()) {
            spid = "fkylc";
        }
        else if (checkIsXlySp()) {
            spid = "xly";
        }
        else if (checkIsXzySp()) {
            spid = "xzy";
        }
        else if (checkIsZjlxSp()) {
            spid = "zjlx";
        }
        else if (checkIsEwanSp()) {
            spid = "ewan";
        }
        else if (checkIs49ySp()) {
            spid = "49y";
        }
        else if (checkIsSfSp()) {
            spid = "sf";
        }
        else if (checkIsKRSp()) {
            spid = "kr";
        }
        else if (checkIsFkcwSp()) {
            spid = "fkcw";
        }
        else if (checkIsEnSp()) {
            spid = "en";
        }
        else if (checkIs9130Sp()) {
            spid = "9130";
        }
        else if (checkIsCpsSp()) {
            spid = "cps";
        }
        else if (checkIsTestSp()) {
            spid = "test";
        }
        else {
            spid = "3k";
        }
        var tmpName = getPlatName();
        if (tmpName && !checkIsIOSShenheSp()) {
            spid = tmpName;
        }
        return spid;
    }
    PlatformManager.getSpid = getSpid;
    function checkIsUseSDK() {
        try {
            App.LogUtil.log("getSpid" + getSpid());
            App.LogUtil.log("checkIsWeiduan" + checkIsWeiduan());
            console.log("getAppid" + getAppid());
            console.log("getBigAppid" + getBigAppid());
        }
        catch (e) {
            console.log("checkIsUseSDK log error");
        }
        if (App.DeviceUtil.isWXgame()) {
            return false;
        }
        if (App.DeviceUtil.isWyw()) {
            return false;
        }
        if (App.CommonUtil.getOption("r_plat")) {
            return true;
        }
        if (PlatformCfg.useSDK[getBigAppid()] || PlatformCfg.useSDK[getAppid()]) {
            return true;
        }
        if (getSpid().indexOf("local") > -1) {
            if (checkIsWeiduan()) {
                return true;
            }
            return false;
        }
        else if (getSpid() == "3k") {
            if (checkIsTest() == true) {
                if (checkIsWeiduan()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else if (getSpid() == "wanba") {
            if (checkIsTest() == true) {
                if (ServerCfg.checkTestByBaseDiv()) {
                    if (document.location.search) {
                        return true;
                    }
                }
                return false;
                //test code
                // return true;
            }
        }
        else if (getSpid() == "test") {
            // if(checkIsWeiduan())
            // {
            // 	return true;
            // }
            return false;
        }
        else {
            if (checkIsTest() == true) {
                return false;
            }
        }
        return true;
    }
    PlatformManager.checkIsUseSDK = checkIsUseSDK;
    function getPlatName() {
        var platName = PlatformCfg.platNameCfg[getBigAppid()];
        if (!platName) {
            platName = PlatformCfg.platNameCfg[getAppid()];
        }
        return platName;
    }
    PlatformManager.getPlatName = getPlatName;
    function checkIsIOSShenheSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("iosshenhe") > -1;
        }
        return false;
    }
    PlatformManager.checkIsIOSShenheSp = checkIsIOSShenheSp;
    function checkIsFkylcSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("fkylc") > -1;
        }
        return false;
    }
    PlatformManager.checkIsFkylcSp = checkIsFkylcSp;
    function checkIsAiweiyouSp() {
        if (PlatformManager.getAppid() == "17007002") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsAiweiyouSp = checkIsAiweiyouSp;
    function checkIsTWShenheSp() {
        if (PlatformManager.getAppid() == "17004001") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsTWShenheSp = checkIsTWShenheSp;
    function checkIsKRShenhe() {
        if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS() && Api.switchVoApi.checkOpenShenhe()) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsKRShenhe = checkIsKRShenhe;
    function checkIsXlySp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("xly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsXlySp = checkIsXlySp;
    function checkIsXzySp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("xzy") > -1;
        }
        return false;
    }
    PlatformManager.checkIsXzySp = checkIsXzySp;
    function checkIsZjlxSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("zjly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsZjlxSp = checkIsZjlxSp;
    function checkIsEwanSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("ewan") > -1;
        }
        return false;
    }
    PlatformManager.checkIsEwanSp = checkIsEwanSp;
    function checkIs49ySp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("49y") > -1;
        }
        return false;
    }
    PlatformManager.checkIs49ySp = checkIs49ySp;
    function checkIsSfSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_sf") > -1 || pathname.indexOf("_testsf") > -1;
        }
        return false;
    }
    PlatformManager.checkIsSfSp = checkIsSfSp;
    function checkIsFkcwSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_fkcw") > -1 || pathname.indexOf("_testfkcw") > -1;
        }
        return false;
    }
    PlatformManager.checkIsFkcwSp = checkIsFkcwSp;
    //检测文字显示是水平显示
    function checkIsTextHorizontal() {
        if (App.DeviceUtil.IsHtml5()) {
            //检测是否是英文  App.CommonUtil.getOption("language")=="en" url参数有language = en
            return App.CommonUtil.getOption("language") == "en" || checkIsEnSp();
        }
        return false;
    }
    PlatformManager.checkIsTextHorizontal = checkIsTextHorizontal;
    function checkIsEnSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return App.CommonUtil.getOption("language") == "en" || pathname.indexOf("_en") > -1 || pathname.indexOf("_testen") > -1;
        }
        return false;
    }
    PlatformManager.checkIsEnSp = checkIsEnSp;
    function checkIs9130Sp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_9130") > -1 || pathname.indexOf("_test9130") > -1;
        }
        return false;
    }
    PlatformManager.checkIs9130Sp = checkIs9130Sp;
    function checkIsCpsSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_cps") > -1 || pathname.indexOf("_testcps") > -1;
        }
        return false;
    }
    PlatformManager.checkIsCpsSp = checkIsCpsSp;
    function getSpFile() {
        if (App.DeviceUtil.IsHtml5()) {
            var fileName = void 0;
            var pathname = window.location.pathname;
            if (pathname.substr(pathname.length) != "/") {
                fileName = pathname.substr(pathname.lastIndexOf("/") + 1);
                if (fileName && fileName.indexOf(".") > -1) {
                    fileName = pathname.substring(0, pathname.lastIndexOf("/"));
                    fileName = fileName.substr(pathname.lastIndexOf("/") + 1);
                }
            }
            else {
                fileName = pathname.substring(0, pathname.length);
                fileName = fileName.substr(pathname.lastIndexOf("/") + 1);
            }
            return fileName.replace("gt_test", "").replace("gt_", "");
        }
        return "local";
    }
    PlatformManager.getSpFile = getSpFile;
    function checkIsTest() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_test") > -1;
        }
        return false;
    }
    PlatformManager.checkIsTest = checkIsTest;
    function checkUseRSDKSocket() {
        var useRSDKSocket = false;
        if (App.DeviceUtil.IsHtml5()) {
            if (window["RSDKPlatform"]) {
                useRSDKSocket = true;
            }
            if (window["RSDKWebSocket"]) {
                useRSDKSocket = true;
            }
            else {
                useRSDKSocket = false;
            }
        }
        if (useRSDKSocket && PlatformManager.client.getAndroidAPILevel() > 0 && PlatformManager.client.getAndroidAPILevel() < 21) {
            useRSDKSocket = true;
        }
        else {
            useRSDKSocket = false;
        }
        return useRSDKSocket;
    }
    PlatformManager.checkUseRSDKSocket = checkUseRSDKSocket;
    function checkIsWeiduan() {
        var weiduan = false;
        if (App.DeviceUtil.IsHtml5()) {
            if (window) {
                if (window["RSDKPlatform"]) {
                    weiduan = true;
                }
                else if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.RSDKLogin) {
                    weiduan = true;
                }
            }
        }
        return weiduan;
    }
    PlatformManager.checkIsWeiduan = checkIsWeiduan;
    function checkIsTWBSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_tw") > -1 || pathname.indexOf("_testtw") > -1;
        }
        return false;
    }
    PlatformManager.checkIsTWBSp = checkIsTWBSp;
    function checkIsKRSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_kr") > -1 || pathname.indexOf("_testkr") > -1;
        }
        return false;
    }
    PlatformManager.checkIsKRSp = checkIsKRSp;
    // export function checkIsKrSp():boolean
    // {
    // 	if(App.DeviceUtil.IsHtml5())
    // 	{
    // 		let pathname:string=window.location.pathname;
    // 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
    // 	}
    // 	return false;
    // }
    //港台官网包
    function checkIsTWMCSp() {
        if (PlatformManager.getAppid() == "17004004") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsTWMCSp = checkIsTWMCSp;
    //4399
    function checkIs4399Sp() {
        if (PlatformManager.getAppid() == "17007003") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs4399Sp = checkIs4399Sp;
    function checkIsYYBSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var host = window.location.host;
            return host.indexOf("yyb") > -1;
        }
        return false;
    }
    PlatformManager.checkIsYYBSp = checkIsYYBSp;
    function checkIsTestSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var host = window.location.host;
            return host.indexOf("gt-test") > -1;
        }
        return false;
    }
    PlatformManager.checkIsTestSp = checkIsTestSp;
    function checkIsWanbaSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            var host = window.location.host;
            return pathname.indexOf("wanba") > -1 || host.indexOf("urlshare") > -1 || host.indexOf("qzone") > -1;
        }
        return false;
    }
    PlatformManager.checkIsWanbaSp = checkIsWanbaSp;
    function checkIs11WanSp() {
        if (PlatformManager.getAppid() == "17001002") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs11WanSp = checkIs11WanSp;
    function checkIs3kShenHaiSp() {
        if (PlatformManager.getAppid() == "17001195" || PlatformManager.getAppid() == "17001196" || PlatformManager.getAppid() == "17001197" || PlatformManager.getAppid() == "17001198") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs3kShenHaiSp = checkIs3kShenHaiSp;
    function checkIs3KSp() {
        if (checkIsLocal() && checkIsWeiduan()) {
            return true;
        }
        if (App.DeviceUtil.IsHtml5()) {
            return window.location.pathname.indexOf("3k") > -1;
        }
        return false;
    }
    PlatformManager.checkIs3KSp = checkIs3KSp;
    function checkIs3KSubSp() {
        return getAppid() == "17001001" || getAppid() == "17001186" || getAppid() == "17001187" || getAppid() == "17001185" || getSpName() == "h5ios3kwan" || getSpName() == "h5iosshiyiwan" || getSpName() == "h5iosyinhu";
    }
    PlatformManager.checkIs3KSubSp = checkIs3KSubSp;
    function checkIsLocal() {
        return GameData.isLocal();
    }
    PlatformManager.checkIsLocal = checkIsLocal;
    function isSupportDesktopIcon() {
        // if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
        // 	return true;
        // }
        // else {
        // 	return false;
        // }
        console.log("QAZ fkcw checkDesktop" + PlatformManager.checkDesktop());
        return PlatformManager.checkDesktop();
    }
    PlatformManager.isSupportDesktopIcon = isSupportDesktopIcon;
    /**
     * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版
     */
    function getWanbaQua() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var platform = data.platform;
                var app = data.qua.app;
                return app;
            }
        }
        return "";
    }
    function getIsWanbaSQ() {
        return getWanbaQua() == "SQ";
        // return checkIsUseSDK();
    }
    PlatformManager.getIsWanbaSQ = getIsWanbaSQ;
    /**
     * 是不是来自 h5qzonepet
     */
    function getFromQZonePet() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var via = data.via;
                egret.log("ssSource" + data.via);
                // alert(data.via)
                return via;
            }
        }
        return "";
    }
    PlatformManager.getFromQZonePet = getFromQZonePet;
    function isSupportShare() {
        console.log("QAZ fkcw checkShare" + PlatformManager.checkShare());
        return PlatformManager.checkShare() == 1 || PlatformManager.checkShare() == 2 || PlatformManager.checkShare() == 3;
        // return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
    }
    PlatformManager.isSupportShare = isSupportShare;
    function isSupportAttention() {
        return (checkIsFkylcSp() && !checkIs4399Sp()) || PlatformManager.hasFollow();
    }
    PlatformManager.isSupportAttention = isSupportAttention;
    function isSupportBindPhone() {
        return PlatformCfg.bindPhone[getAppid()];
    }
    PlatformManager.isSupportBindPhone = isSupportBindPhone;
    function sendToDesktop(callback, callbackThisObj) {
        if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
            window.open("resource/other/一個官人七個妻.url");
        }
        else {
            // qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
            PlatformManager.requestDesktop({ title: "极品大官人", desc: "" }, callback, callbackThisObj);
        }
        // callback.apply(callbackThisObj);
    }
    PlatformManager.sendToDesktop = sendToDesktop;
    function sendCandy(num, callback, callbackThisObj) {
        //signin
        qqwanbaplugin.sendCandy("signin", num, callback.bind(callbackThisObj));
    }
    PlatformManager.sendCandy = sendCandy;
    function share(callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            if (checkIsTWBSp() == true) {
                RSDKHelper.fbShare(function (code, data) {
                    if (Number(code) == 16) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                    else {
                        console.log("分享失败 " + code);
                    }
                });
            }
            else if (checkIsKRSp() == true) {
                RSDKHelper.krShare(function (code, data) {
                    if (Number(code) == 16) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                    else {
                        console.log("分享失败 " + code);
                    }
                });
            }
            else {
                RSDKHelper.share(function (code, data) {
                    if (Number(code) == 0) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                });
            }
        }
        // else
        // {
        // 	if(callback)
        // 	{
        // 		callback.apply(callbackThisObj);
        // 	}
        // }
    }
    PlatformManager.share = share;
    function checkIsLoginPlat() {
        var loginResult = false;
        if (checkIsUseSDK()) {
            loginResult = PlatformManager.isLogin;
        }
        else {
            loginResult = true;
        }
        return loginResult;
    }
    PlatformManager.checkIsLoginPlat = checkIsLoginPlat;
    function init() {
        if (checkIsUseSDK()) {
            RSDKHelper.init();
        }
    }
    PlatformManager.init = init;
    function login() {
        if (RSDKHelper.isInit) {
            RSDKHelper.login();
        }
    }
    PlatformManager.login = login;
    function logout() {
        PlatformManager.isLogin = false;
        if (RSDKHelper.isInit) {
            RSDKHelper.logout();
            if (PlatformManager.checkIsKRSp()) {
                return true;
            }
            return false;
        }
        else {
            LoginManager.changeAccount();
            return true;
        }
    }
    PlatformManager.logout = logout;
    function pay(productId) {
        if (PlatformManager.checkIsUseSDK()) {
            if (RSDKHelper.isInit) {
                RSDKHelper.pay(productId);
            }
        }
        else {
            if (GameData.isLocal()) {
                testPay(productId);
            }
        }
    }
    PlatformManager.pay = pay;
    function testPay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (GameData.isLocal() || GameData.isTest()) {
            var order_id = String(new Date().getTime() + Math.random() * 99999999);
            NetManager.request(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT, { order_id: order_id, gold_num: itemCfg.gemCost, platform: "h5", name: itemCfg.id });
        }
        else {
            App.CommonUtil.showTip("购买元宝:" + itemCfg.gemCost);
        }
    }
    function analyticsLogin() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLogin();
        }
    }
    PlatformManager.analyticsLogin = analyticsLogin;
    function analyticsNewGuide(step) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsNewGuide(step);
        }
    }
    PlatformManager.analyticsNewGuide = analyticsNewGuide;
    function analyticsPay(id, orderId) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsPay(id, orderId);
        }
    }
    PlatformManager.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLevelup();
        }
    }
    PlatformManager.analyticsLevelup = analyticsLevelup;
    function analyticsRegister() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsRegister();
        }
    }
    PlatformManager.analyticsRegister = analyticsRegister;
    function analyticsLoadEnd() {
        console.log("QAZ analyticsLoadEnd " + RSDKHelper.isInit);
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLoadEnd();
        }
    }
    PlatformManager.analyticsLoadEnd = analyticsLoadEnd;
    function analyticsCompleteNewGuide() {
        console.log("analyticsCompleteNewGuide");
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsCompleteNewGuide();
        }
    }
    PlatformManager.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
    function pushMsg(data) {
        if (getIsWanbaSQ() == true) {
            var msg = LanguageManager.getlocal("wanbaPushMsg" + data.type);
            qqwanbaplugin.sendMessage(data.frd, "1", msg, null);
        }
    }
    PlatformManager.pushMsg = pushMsg;
    function getGiftId() {
        var gid = null;
        if (checkIsWanbaSp() == true && checkIsUseSDK()) {
            gid = qqwanbaplugin.getGiftId();
        }
        // return "502";
        return gid;
    }
    PlatformManager.getGiftId = getGiftId;
    function giftExchange(callback, callbackThisObj) {
        var gid = null;
        if (checkIsWanbaSp() == true && checkIsUseSDK()) {
            qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
        }
        // return gid;
    }
    PlatformManager.giftExchange = giftExchange;
    /**
     * 获取是不是从糖果屋登录
     */
    function getCandyFlag() {
        // if (PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
        // {
        // 	return qqwanbaplugin.sendCandyStatus();
        // }
        return false;
    }
    PlatformManager.getCandyFlag = getCandyFlag;
    function checkCrossDomon() {
        if (App.DeviceUtil.IsHtml5()) {
            try {
                var host = window.location.host;
                var baseURI = document.baseURI;
                if (baseURI && baseURI.indexOf(host) > -1) {
                    return false;
                }
                else {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }
    PlatformManager.checkCrossDomon = checkCrossDomon;
    function getSpName() {
        var spName = "";
        if (App.DeviceUtil.IsHtml5()) {
            spName = App.CommonUtil.getOption("r_plat");
        }
        return spName;
    }
    PlatformManager.getSpName = getSpName;
    function attention(callback, callbackThisObj) {
        console.log("attention:" + RSDKHelper.isInit);
        if (RSDKHelper.isInit) {
            // RSDKHelper.attention();
            RSDKHelper.attention(function (data) {
                if (Number(data) == 1) {
                    if (callback) {
                        callback.apply(callbackThisObj);
                    }
                }
            });
        }
    }
    PlatformManager.attention = attention;
    function checkAttention() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkAttention();
        }
        else {
            return false;
        }
    }
    PlatformManager.checkAttention = checkAttention;
    function getChannelId() {
        try {
            return RSDK.getChannelId();
        }
        catch (e) {
            return "";
        }
    }
    PlatformManager.getChannelId = getChannelId;
    function openUserCenter() {
        if (rsdkclientplugin) {
            rsdkclientplugin.openUserCenter();
        }
    }
    PlatformManager.openUserCenter = openUserCenter;
    function getMoneySign() {
        if (checkIsTWBSp()) {
            return "$";
        }
        else if (checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                return "원";
            }
            else {
                return "$";
            }
        }
        else {
            return "￥";
        }
    }
    PlatformManager.getMoneySign = getMoneySign;
    function checkIsUseBigCfg() {
        // return getBigAppid()=="17001000";
        return checkIsTWBSp();
    }
    PlatformManager.checkIsUseBigCfg = checkIsUseBigCfg;
    function checkIs3kQianYiSp() {
        if (PlatformManager.getAppid() == "17001001" || PlatformManager.getAppid() == "17001051" || PlatformManager.getAppid() == "17001188") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs3kQianYiSp = checkIs3kQianYiSp;
    function checkIsShowWarning() {
        if (checkIsTWBSp() || checkIsKRSp()) {
            return false;
        }
        else {
            return true;
        }
    }
    PlatformManager.checkIsShowWarning = checkIsShowWarning;
    function getStatement() {
        var appid = PlatformManager.getAppid();
        var bigAppid = PlatformManager.getBigAppid();
        var spName = PlatformManager.getSpName();
        if (PlatformCfg.statementCfg[appid]) {
            return PlatformCfg.statementCfg[appid];
        }
        else if (PlatformCfg.statementCfg[bigAppid]) {
            return PlatformCfg.statementCfg[bigAppid];
        }
        else if (PlatformCfg.statementCfg[spName]) {
            return PlatformCfg.statementCfg[spName];
        }
        return "";
    }
    PlatformManager.getStatement = getStatement;
    function checkShare() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkShare();
        }
        else {
            return 0;
        }
    }
    PlatformManager.checkShare = checkShare;
    function checkDesktop() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkDesktop();
        }
        else {
            return false;
        }
    }
    PlatformManager.checkDesktop = checkDesktop;
    function hasFollow() {
        if (RSDKHelper.isInit) {
            console.log("QAZ hasFollow " + RSDKHelper.hasFollow());
            return RSDKHelper.hasFollow();
        }
        else {
            return false;
        }
    }
    PlatformManager.hasFollow = hasFollow;
    function getCustomerServiceType() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.getCustomerServiceType();
        }
        else {
            return 0;
        }
    }
    PlatformManager.getCustomerServiceType = getCustomerServiceType;
    function getCustomerServiceData(callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDKHelper.getCustomerService(function (data) {
                if (callback) {
                    GameData.customerServiceData = data;
                    callback.apply(callbackThisObj);
                }
            });
        }
    }
    PlatformManager.getCustomerServiceData = getCustomerServiceData;
    function requestDesktop(data, callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            return RSDKHelper.requestDesktop(data, callback, callbackThisObj);
        }
        else {
            return false;
        }
    }
    PlatformManager.requestDesktop = requestDesktop;
    var client;
    (function (client) {
        function checkServerState(serverId) {
            if (checkIsWeiduan()) {
                rsdkclientplugin.checkServerState(serverId);
            }
            else {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
            }
        }
        client.checkServerState = checkServerState;
        function checkPurchase(serverId) {
            if (App.DeviceUtil.isAndroid()) {
                rsdkclientplugin.checkPurchase(serverId);
            }
        }
        client.checkPurchase = checkPurchase;
        function checkPerson() {
            return PlatformManager.kkk_age > 0;
        }
        client.checkPerson = checkPerson;
        function showPersonView(callback) {
            if (rsdkclientplugin) {
                return rsdkclientplugin.showPersonView(callback);
            }
        }
        client.showPersonView = showPersonView;
        function getAndroidAPILevel() {
            try {
                if (App.DeviceUtil.isAndroid()) {
                    App.LogUtil.log("getAndroidAPILevel" + rsdkclientplugin.getAndroidAPILevel());
                    return Number(rsdkclientplugin.getAndroidAPILevel());
                }
            }
            catch (e) {
                return 0;
            }
            return 0;
        }
        client.getAndroidAPILevel = getAndroidAPILevel;
        function getGUID() {
            if (rsdkclientplugin) {
                return rsdkclientplugin.getGUID();
            }
            return null;
        }
        client.getGUID = getGUID;
        function openServiceCenter() {
            // if(rsdkclientplugin)
            // {
            // 	rsdkclientplugin.openServiceCenter();
            // }
            RSDK.customerService("");
        }
        client.openServiceCenter = openServiceCenter;
        function showBindPhoneView(callback, callbackThisObj) {
            if (rsdkclientplugin) {
                return rsdkclientplugin.showBindPhoneView(callback.bind(callbackThisObj));
            }
            // if(callback)
            // {
            // 	callback.apply(callbackThisObj);
            // }
        }
        client.showBindPhoneView = showBindPhoneView;
        function checkBindPhone() {
            if (rsdkclientplugin) {
                return rsdkclientplugin.checkBindPhone();
            }
            return false;
        }
        client.checkBindPhone = checkBindPhone;
        function setAppForegroundStatusChange() {
            if (checkIsWeiduan() && rsdkclientplugin) {
                try {
                    console.log("QAZ setAppForeground ");
                    rsdkclientplugin.setAppForegroundStatusChangeCallback(function (msg) {
                        console.log("QAZ setAppForeground Callback " + msg);
                        if (Number(msg) == 1) {
                            SoundManager.resumeBg();
                        }
                        else {
                            SoundManager.pauseBg();
                        }
                    });
                }
                catch (e) {
                    App.LogUtil.log("setAppForegroundStatusChange error");
                }
            }
        }
        client.setAppForegroundStatusChange = setAppForegroundStatusChange;
        // export function getAppVersion():number
        // {
        // 	try
        // 	{
        // 		if(rsdkclientplugin)
        // 		{
        // 			return rsdkclientplugin.getVersion();
        // 		}
        // 	}
        // 	catch(e)
        // 	{
        // 		return 0;
        // 	}
        // 	return 0;
        // }
        function checkWeiduanUpgrade() {
            if (PlatformManager.checkIs3KSp() && App.DeviceUtil.IsHtml5()) {
                try {
                    var version = Number(rsdkclientplugin.getVersion());
                    var channelId = PlatformManager.getChannelId();
                    var appid = rsdkclientplugin.getSubAppId();
                    var phpurl = ServerCfg.baseUrl + "getversion.php";
                    var host = window.location.host;
                    if (host.indexOf("127.0.0.1") != -1 || host.indexOf("192.168.") != -1) {
                        phpurl = "http://192.168.8.82/gt_h5/getversion.php";
                    }
                    NetLoading.show();
                    NetManager.http.get(phpurl, { version: version, appid: channelId + "_" + appid }, function (data) {
                        NetLoading.hide();
                        if (data && data.gameurl) {
                            ViewController.getInstance().openView(ViewConst.POPUP.WEIDUANUPGRADEPOPUPVIEW, data.gameurl);
                        }
                    }, function () {
                        NetLoading.hide();
                    }, PlatformManager);
                }
                catch (e) {
                    NetLoading.hide();
                }
            }
        }
        client.checkWeiduanUpgrade = checkWeiduanUpgrade;
    })(client = PlatformManager.client || (PlatformManager.client = {}));
    // 是否是港台web
    function checkIsTwWeb() {
        return PlatformManager.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatformManager.getAppid() == "17004003");
    }
    PlatformManager.checkIsTwWeb = checkIsTwWeb;
    function checkDownloadApp() {
        try {
            if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd") {
                qqwanbaplugin.checkDownloadApp(function (isDownloadApp) {
                    App.DeviceUtil.wanbaIsDownloadApp = isDownloadApp;
                    if (isDownloadApp) {
                        // 玩吧，如果还没有用微端登录过，并且已经安装了微端
                        ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADVIEW, {});
                    }
                });
            }
        }
        catch (e) {
            console.log("checkDownloadApp error");
        }
    }
    PlatformManager.checkDownloadApp = checkDownloadApp;
    function checkIsShenHeYiWan() {
        var bigappid_arr = [17013000];
        var appid_arr = [17001263, 17014002, 17001274];
        var bigAppid = Number(PlatformManager.getBigAppid());
        var isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
        var appId = Number(PlatformManager.getAppid());
        var isApp = appid_arr.indexOf(appId) > -1;
        // return true;
        return (PlatformManager.checkIsIOSShenheSp() && (isApp || isBigApp));
    }
    PlatformManager.checkIsShenHeYiWan = checkIsShenHeYiWan;
    function checkHideSwitchAccountBtn() {
        return (PlatformManager.checkIs11WanSp() ||
            PlatformManager.checkIs3kShenHaiSp() ||
            (PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()] && !PlatformManager.checkIsTest()) ||
            String(PlatformManager.getAppid()) == "17001213") ||
            String(PlatformManager.getBigAppid()) == "17017000" ||
            (String(PlatformManager.getBigAppid()) == "17015000" && String(PlatformManager.getAppid()) != "17015009") ||
            PlatformManager.checkIsCpsSp() || String(PlatformManager.getBigAppid()) == "17018000";
    }
    PlatformManager.checkHideSwitchAccountBtn = checkHideSwitchAccountBtn;
    /** 是否有特殊关闭按钮（其实就是指的微信小游戏和qq玩一玩 */
    function hasSpcialCloseBtn() {
        return App.DeviceUtil.isWXgame() || App.DeviceUtil.isWyw();
    }
    PlatformManager.hasSpcialCloseBtn = hasSpcialCloseBtn;
})(PlatformManager || (PlatformManager = {}));

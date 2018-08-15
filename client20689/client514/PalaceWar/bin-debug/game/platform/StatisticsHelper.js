/**
 * 统计类，具体方法先留空
 * author dmj
 * date 2017/9/15
 * @namespace StatisticsHelper
 */
var StatisticsHelper;
(function (StatisticsHelper) {
    /**
     * 玩家创角统计
     */
    function report_register_tw() {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "slGECLnNt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
            !function (f, b, e, v, n, t, s) {
                if (f.fbq)
                    return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq)
                    f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '234770090424672');
            window["fbq"]('track', 'CompleteRegistration');
        }
    }
    StatisticsHelper.report_register_tw = report_register_tw;
    /**
     * 玩家完成"购买"行为完成后
     */
    function report_pay_tw(cost) {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "DvFdCNGFu34Q4Iv5hgM";
            window["google_conversion_value"] = cost ? cost : 3.00;
            window["google_conversion_currency"] = "USD";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
            !function (f, b, e, v, n, t, s) {
                if (f.fbq)
                    return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq)
                    f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '179480206020479');
            window["fbq"]('track', 'Purchase', { value: String(cost), currency: 'USD' });
        }
    }
    StatisticsHelper.report_pay_tw = report_pay_tw;
    /**
     * 等级达到正八品
     */
    function report_uplevel4_tw() {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "Nx93CKDPt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
        }
    }
    StatisticsHelper.report_uplevel4_tw = report_uplevel4_tw;
    /**
     * 统计加载步骤
     */
    function reportLoadData(step) {
        if (App.DeviceUtil.IsHtml5()) {
            if (window["requestGetStep"]) {
                try {
                    window["requestGetStep"](step);
                }
                catch (e) {
                    console.log("requestGetStep error");
                }
            }
        }
    }
    StatisticsHelper.reportLoadData = reportLoadData;
    function clearReportData() {
        if (App.DeviceUtil.IsHtml5()) {
            if (window["requestGetStepData"]) {
                window["requestGetStepData"] = {};
            }
        }
    }
    StatisticsHelper.clearReportData = clearReportData;
})(StatisticsHelper || (StatisticsHelper = {}));
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var data = {
        platform: PlatformManager.getBigAppid(),
        uid: Api.playerVoApi.getPlayerID(),
        zid: GameData.curZoneID,
        logstr: ""
    };
    if (!errorObj) {
        errorObj = {};
        errorObj.error = errorMsg;
        errorObj.script = url;
        errorObj.line = lineNumber;
        errorObj.column = column;
    }
    else {
        var tmpData = {};
        for (var _i = 0, _a = Object.getOwnPropertyNames(errorObj); _i < _a.length; _i++) {
            var key = _a[_i];
            tmpData[key] = errorObj[key];
        }
        errorObj = tmpData;
    }
    data.logstr = JSON.stringify(errorObj);
    NetManager.http.post("//gt-clientlog.raygame3.com/create_clientlog.php", data, null, null, null);
};

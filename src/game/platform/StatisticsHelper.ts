/**
 * 统计类，具体方法先留空
 * author dmj
 * date 2017/9/15
 * @namespace StatisticsHelper
 */
namespace StatisticsHelper {

    /**
     * 玩家创角统计
     */
	export function report_register_tw():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "slGECLnNt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");

            !function(f:any,b,e,v,n,t,s)
            {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            }(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '234770090424672'); 
            window["fbq"]('track', 'CompleteRegistration');

        }
    }

    /**
     * 玩家完成"购买"行为完成后
     */
    export function report_pay_tw(cost:number|string):void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "DvFdCNGFu34Q4Iv5hgM";
            window["google_conversion_value"] = cost?cost:3.00;
            window["google_conversion_currency"] = "USD";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");

            !function(f:any,b,e,v,n,t,s)
            {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            }(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '179480206020479');
            window["fbq"]('track', 'Purchase',{value:String(cost),currency:'USD'});

        }
    }

    /**
     * 等级达到正八品
     */
    export function report_uplevel4_tw():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "Nx93CKDPt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
        }
    }

    /**
     * 统计加载步骤
     */
    export function reportLoadData(step:number|string):void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(window["requestGetStep"])
            {
                try
                {
                    window["requestGetStep"](step);
                }
                catch(e)
                {
                    console.log("requestGetStep error");
                }
            }
        }
    }
    export function clearReportData():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(window["requestGetStepData"])
            {
                window["requestGetStepData"]={};
            }
        }
    }

    /**
     * 
     * 游戏内异常上报
     * @param info json对象 或者字符串都可以
     */
    export function reportGameError(info:any):void
    {
        let data:{platform:string,uid:number,zid:number,logstr:string}={
            platform:PlatformManager.getBigAppid(),
            uid:Api.playerVoApi.getPlayerID(),
            zid:GameData.curZoneID,
            logstr:""
        };
        data.logstr=App.StringUtil.toString(info);
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_clientlog.php",data);
    }
}


window.onerror = function (errorMsg, url, lineNumber, column, errorObj:any)
{
    if(!errorObj)
    {
        errorObj={};
        errorObj.error=errorMsg;
        errorObj.script=url;
        errorObj.line=lineNumber;
        errorObj.column=column;
        try
        {
            if(errorMsg=="Script error"&&!url)
            {
                console.log("game error: "+JSON.stringify(errorObj));
                return;
            }
        }
        catch(e)
        {

        }
    }
    else
    {
        let tmpData:any={};
        for(let key of Object.getOwnPropertyNames(errorObj))
        {
            tmpData[key]=errorObj[key];
        }
        errorObj=tmpData;
    }
    StatisticsHelper.reportGameError(errorObj);
}
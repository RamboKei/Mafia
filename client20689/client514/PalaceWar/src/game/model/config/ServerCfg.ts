/**
 * 服务器列表配置
 */
class ServerCfg
{
    public constructor()
    {
    };
    public static allHost={
        "wanba":"5a26626c-0.gz.1251001051.clb.myqcloud.com",
        "3k":"gt-cn-in.raygame3.com",
        "local":"192.168.8.82",
        "locals":"local-test-82.raygame3.com",
        "test":"gt-test.raygame3.com",
        "yyb":"gt-yyb-web01.raygame3.com",
        "tw":"gd-game.heyyogame.com",
        "fkylc":"gt-fkylc-web01.raygame3.com",
        "xly":"gt-xly-web01.raygame3.com",
        "xzy":"gt-xzy-web01.raygame3.com",
        "iosshenhe":"gt-shenhe.raygame3.com",
        "zjlx":"gt-zjly-web01.raygame3.com",
        "ewan":"gt-ewan-web01.raygame3.com",
        "49y":"gt-49y-web01.raygame3.com",
        "sf":"gt-sf-web01.raygame3.com",
        "kr":"gt-kr-web01.mayngames.co.kr",
        "fkcw":"gt-fkcw-web01.raygame3.com",
        "en":"gt-shenhe.raygame3.com",
        "9130":"gt-9130-web01.raygame3.com",
        "cps":"gt-cps-web01.raygame3.com",
        "wxgame":"gt-wanba-web01.raygame3.com",
        "wyw":"gt-wanba-web01.raygame3.com",
    }

    // {sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    public static lastServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}=<any>{};
    /**
     * 已经有账号的所有服务器列表
     */
    public static myserver:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}[];
    /**
     * 所有服务器列表
     */
    public static serverlist:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}[];

    /**
     * 当前选择的服务器，选择后可用
     */
    public static selectServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}=<any>{};
    /**
     * 设置登录的服务器数据
     * @param zid 
     */
    public static setLoginServer(zid:string):void
    {
        if(ServerCfg.lastServer.zid!=zid)
        {
            let l:number=ServerCfg.serverlist.length;
            for(let i:number=0;i<l;i++)
            {
                let item=ServerCfg.serverlist[i];
                if(item.zid==zid)
                {
                    for(let key in item)
                    {
                        ServerCfg.lastServer[key]=item[key];
                    }
                    break;
                }
            }
        }
    }

    /**
     * 选择的服务器数据
     * @param zid 
     */
    public static setSelectServer(zid:string):void
    {
        if(ServerCfg.selectServer.zid!=zid)
        {
            let l:number=ServerCfg.serverlist.length;
            for(let i:number=0;i<l;i++)
            {
                let item=ServerCfg.serverlist[i];
                if(item.zid==zid)
                {
                    ServerCfg.setServerData(item);
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
        }
    }

    public static setServerData(data:any):void
    {
        ServerCfg.selectServer = <any>{};
        for(let key in data)
        {
            if(PlatformManager.getSpid()=="locals"&&(key=="ip_server"||key=="ip_chat"))
            {
                ServerCfg.selectServer[key]=ServerCfg.getHost();
            }
            else
            {
                ServerCfg.selectServer[key]=data[key];
            }
        }
    }

    public static baseUrl="//192.168.8.82/gucenter/";
    public static serverTokenUrl="getaccess_token.php";

    public static svrCfgUrl: string = "//192.168.8.82/tank-global/index.php/";

    public static initSvrUrl():void
    {
        var hosturl:string=ServerCfg.getHost();
        this.svrCfgUrl = "//"+hosturl+"/tank-global/index.php/";
        this.baseUrl="//"+hosturl+"/gucenter/";
    }

    private static getHost():string
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(PlatformManager.checkIsLocal())
            {
                if(App.CommonUtil.getOption("testplat")&&ServerCfg.allHost[App.CommonUtil.getOption("testplat")])
                {
                    return ServerCfg.allHost[App.CommonUtil.getOption("testplat")];
                }
            }
        }
        return ServerCfg.allHost[PlatformManager.getSpid()];
        //  return ServerCfg.allHost["tw"];
    }

    public static checkServerDebug():boolean
    {
        let isDebug:boolean=false;
        if(App.DeviceUtil.IsHtml5())
        {
            let baseUrl:string = document.baseURI;
            if(baseUrl.indexOf("gt_test")>-1)
            {
                isDebug=true;
            }
        }
        else if(PlatformManager.checkIsTest() || PlatformManager.checkIsLocal())
        {
            isDebug=true;
        }
        if(App.CommonUtil.getOption("testplat")&&ServerCfg.allHost[App.CommonUtil.getOption("testplat")])
        {
            isDebug = false;
        }
        return isDebug;
    }

    public static checkTestByBaseDiv():boolean
    {
        if(App.DeviceUtil.IsHtml5())
        {
            let baseUrl:string = document.baseURI;
            if(baseUrl.indexOf("gt_test")>-1)
            {
                return true;
            }
        }
        return false;
    }
    // 获取微信小游戏资源url
    public static getWxGameResourceUrl():string
    {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wxgameclient/resource/";
    }
    // 获取玩一玩资源url
    public static getWywResourceUrl():string
    {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wywclient/resource/";
    }
}

class ServerItemCfg
{
    public sname:string;
    public zid:string;
    public ip_server:string;
    public port_server:string;
    public ip_chat:string;
    public port_chat:string;
    public initData(data:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}):void
    {
        for(let key in data)
        {
            this[key]=data[key];
        }
    }
}

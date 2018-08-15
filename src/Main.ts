class Main extends egret.DisplayObjectContainer 
{

    private _loadingView:LoginView;
    private _testBtn:BaseButton;
    private _tabbarGroup:TabBarGroup;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this); 
    }
    
    private onAddToStage(event: egret.Event) 
    {
        if (App.DeviceUtil.isWXgame()) {
            window["__WXGAME_OS__"] = window["wx"].getSystemInfoSync().platform;
            console.log("main", window["__WXGAME_OS__"]);
        }
        // 微信小游戏，需要将类包放到window下
        if (App.DeviceUtil.isWXgame()) {
            WxGameInclude.include();
        }

        // 微个小游戏，热启动时的更新处理
        if (App.DeviceUtil.isWXgame()) {
            if (typeof window["wx"].getUpdateManager === 'function') {
                const updateManager = window["wx"].getUpdateManager()

                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log("in main检查新版本", res.hasUpdate)
                })

                updateManager.onUpdateReady(function () {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    console.log("in main新的版本已经下载好，调用 applyUpdate 应用新版本并重启");
                    // window["wxgameCleanCacheImage"]();
                    // window["wxgameCleanCacheText"]();
                    updateManager.applyUpdate()
                })

                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log("in main新的版本下载失败");
                })
            }
        }
        // egret.lifecycle.addLifecycleListener((context) => {
        //     context.onUpdate = () => {
        //     }
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        if(PlatformManager.checkCrossDomon())
        {
            egret.ImageLoader.crossOrigin = "anonymous";
        }
        RES.setMaxLoadingThread(4);
        this.stage.maxTouches=1;
        PlatformManager.init();
        GameConfig.stage = egret.MainContext.instance.stage;
        GameConfig.stageWidth = egret.MainContext.instance.stage.stageWidth;
        GameConfig.stageHeigth = egret.MainContext.instance.stage.stageHeight;
        if(App.DeviceUtil.checkIsFullscreen())
        {
            GameConfig.stageHeigth=1136;
        }
        if(window["RSDKPlatform"])
        {
            GameData.isLoadCrossImageError=window["RSDKPlatform"].getDisableCache?window["RSDKPlatform"].getDisableCache()=="1":false;
            GameData.isLoadedSuccessImage=window["RSDKPlatform"].getEnableCacheForver?window["RSDKPlatform"].getEnableCacheForver()=="1":false;
        }
        LayerManager.initLayer(this);
        Api.init();
        SoundManager.init();
        ServerCfg.initSvrUrl();
        App.LogUtil.show("size:",GameConfig.stageWidth,"x",GameConfig.stageHeigth);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if(App.DeviceUtil.IsHtml5())
        {
            let date:Date=new Date();
            let t =  window["mainJsonVersion"]?window["mainJsonVersion"]:Math.floor(date.getTime()/1000);
            RES.loadConfig((App.DeviceUtil.isWyw()?"gt_lm/resource2":"resource") + "/default.res.json?vs="+t, App.DeviceUtil.isWyw()?"gt_lm/resource2/":"resource/");
        }
        else if (App.DeviceUtil.isWXgame())
        {
            // let date:Date=new Date();
            // let t =  window["mainJsonVersion"]?window["mainJsonVersion"]:Math.floor(date.getTime()/1000);
            RES.loadConfig("resource/default.res.json", ServerCfg.getWxGameResourceUrl());
        }
        else
        {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
        // 新手引导处理关闭按钮的引导位置
        if (PlatformManager.hasSpcialCloseBtn()) {
            RookieCfg.getRookieCfg("14_5").clickRect.x = 20;
            RookieCfg.getRookieCfg("14_5").handPos.x = 43;
            RookieCfg.getRookieCfg("14_5").handPos.flip = false;
            RookieCfg.getRookieCfg("106_1").clickRect.x = 20;
            RookieCfg.getRookieCfg("106_1").handPos.x = 43;
            RookieCfg.getRookieCfg("106_1").handPos.flip = false;
            RookieCfg.getRookieCfg("126").clickRect.x = 20;
            RookieCfg.getRookieCfg("126").handPos.x = 43;
            RookieCfg.getRookieCfg("126").handPos.flip = false;
        }
        if(PlatformManager.checkIsXlSp())
        {
            let text1:BaseTextField=ComponentManager.getTextField("<font color=0xb0faff  size=30>健康游戏忠告</font>\n<font color=0x6ebdc6  size=26>抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防上当受骗。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。</font>",TextFieldConst.FONTSIZE_TITLE_COMMON);
            text1.lineSpacing=5;
            text1.textAlign=egret.HorizontalAlign.CENTER;
            text1.setPosition((GameConfig.stageWidth-text1.width)/2,GameData.layerPosY+(GameConfig.stageHeigth-text1.height)/2);
            GameConfig.stage.addChild(text1);
            text1.name="xlTxt";

            let refreshTxt:BaseTextField=ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
            refreshTxt.stroke=1;
            refreshTxt.strokeColor=0;
            refreshTxt.textFlow = new Array<egret.ITextElement>(
                { text: "如果无法进入游戏，请", style: { "textColor": 0xffffff} },
                { text: "点击刷新", style: { "textColor": 0xff0000,"underline":true, "href": "event:text event triggered"} });
            refreshTxt.touchEnabled = true;
            refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
                if(App.DeviceUtil.IsHtml5())
                {
                    StatisticsHelper.reportLoadData("reload_2");
                    window.location.reload();
                }
            }, this);
            refreshTxt.setPosition(GameConfig.stageWidth*0.5 - refreshTxt.width*0.5,GameData.layerPosY+GameConfig.stageHeigth-130);
            GameConfig.stage.addChild(refreshTxt);
            refreshTxt.name="xlrefreshTxt";
        }
    }

    

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void 
    {
        //处理九宫格开始
        // let cfg = event.target.resConfig.keyMap;
        // if(cfg)
        // {
        //     let scaleCfg={};
        //     for(var key in cfg)
        //     {
        //         if(cfg[key]&&cfg[key].scale9grid)
        //         {
        //             scaleCfg[key]={scale9grid:cfg[key].scale9grid};
        //         }
        //     }
        //     App.LogUtil.log(scaleCfg);
        // }
        //处理九宫格结束
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        App.LoginResLoader.loadLoginBgRes();
        App.LoginResLoader.isDefaultResLoaded=true;
        if(RSDKHelper.isInit)
        {
            App.LoginResLoader.initPlatCfg();
        }
    }
}
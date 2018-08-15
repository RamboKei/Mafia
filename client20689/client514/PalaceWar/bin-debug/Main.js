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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // 微信小游戏，需要将类包放到window下
        if (App.DeviceUtil.isWXgame() || App.DeviceUtil.isWyw()) {
            WxGameInclude.include();
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
        if (PlatformManager.checkCrossDomon()) {
            egret.ImageLoader.crossOrigin = "anonymous";
        }
        RES.setMaxLoadingThread(4);
        this.stage.maxTouches = 1;
        PlatformManager.init();
        LayerManager.initLayer(this);
        GameConfig.stage = egret.MainContext.instance.stage;
        GameConfig.stageWidth = egret.MainContext.instance.stage.stageWidth;
        GameConfig.stageHeigth = egret.MainContext.instance.stage.stageHeight;
        Api.init();
        SoundManager.init();
        ServerCfg.initSvrUrl();
        App.LogUtil.show("size:", GameConfig.stageWidth, "x", GameConfig.stageHeigth);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if (App.DeviceUtil.IsHtml5()) {
            var date = new Date();
            var t = window["mainJsonVersion"] ? window["mainJsonVersion"] : Math.floor(date.getTime() / 1000);
            RES.loadConfig("resource/default.res.json?vs=" + t, "resource/");
        }
        else if (App.DeviceUtil.isWXgame()) {
            RES.loadConfig("resource/default.res.json", ServerCfg.getWxGameResourceUrl());
        }
        else if (App.DeviceUtil.isWyw()) {
            RES.loadConfig("GameRes://resource/default.res.json", ServerCfg.getWywResourceUrl());
        }
        else {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
        // 新手引导处理关闭按钮的引导位置
        if (PlatformManager.hasSpcialCloseBtn()) {
            RookieCfg.getRookieCfg("14_5").clickRect.x = 20;
            RookieCfg.getRookieCfg("14_5").handPos.x = 57;
            RookieCfg.getRookieCfg("14_5").handPos.flip = false;
            RookieCfg.getRookieCfg("106_1").clickRect.x = 20;
            RookieCfg.getRookieCfg("106_1").handPos.x = 57;
            RookieCfg.getRookieCfg("106_1").handPos.flip = false;
            RookieCfg.getRookieCfg("126").clickRect.x = 20;
            RookieCfg.getRookieCfg("126").handPos.x = 57;
            RookieCfg.getRookieCfg("126").handPos.flip = false;
        }
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
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
        App.LoginResLoader.isDefaultResLoaded = true;
        if (RSDKHelper.isInit) {
            App.LoginResLoader.initPlatCfg();
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");

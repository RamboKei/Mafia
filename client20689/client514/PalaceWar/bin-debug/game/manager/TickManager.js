var TickManager;
(function (TickManager) {
    var isTicking = false;
    var tickList = [];
    /**
     * 开始tick 一秒一次
     */
    function startTick() {
        if (isTicking) {
            return;
        }
        isTicking = true;
        TimerManager.doTimer(1000, 0, tick, TickManager);
    }
    TickManager.startTick = startTick;
    /**
     * 停止tick 一秒一次
     */
    function stopTick() {
        isTicking = false;
        TimerManager.remove(tick, this);
    }
    TickManager.stopTick = stopTick;
    /**
     * 添加tick监听
     * @param callback
     * @param callbackThisObj
     * @param callbackParams
     */
    function addTick(callback, callbackThisObj, callbackParams) {
        if (callback) {
            tickList.push({ callback: callback, callbackThisObj: callbackThisObj, callbackParams: callbackParams });
        }
    }
    TickManager.addTick = addTick;
    /**
     * 移除tick监听
     * @param callback
     * @param callbackThisObj
     */
    function removeTick(callback, callbackThisObj) {
        var l = tickList.length;
        for (var i = l - 1; i >= 0; i--) {
            var callData = tickList[i];
            if (callData.callback == callback && callData.callbackThisObj == callbackThisObj) {
                tickList.splice(i, 1);
                break;
            }
        }
    }
    TickManager.removeTick = removeTick;
    function tick() {
        if (GameData.serverTime) {
            if (GameData.lastAutoSyncTime == 0) {
                GameData.lastAutoSyncTime = GameData.serverTime;
            }
            if (GameData.pauseSync == false) {
                //检查心跳
                if ((GameData.serverTime - GameData.lastAutoSyncTime) >= 60) {
                    GameData.lastAutoSyncTime = GameData.serverTime;
                    if (Api.rookieVoApi.isInGuiding == false) {
                        NetManager.request(NetRequestConst.REQUEST_USER_SYNC, null);
                    }
                }
                else {
                    //是否跨天，跨天后需要同步数据
                    if (App.DateUtil.checkIsToday(GameData.lastAutoSyncTime) == false && Api.rookieVoApi.isInGuiding == false) {
                        GameData.lastAutoSyncTime = GameData.serverTime;
                        NetManager.request(NetRequestConst.REQUEST_USER_SYNC, null);
                    }
                }
            }
            GameData.serverTime = Math.floor(new Date().getTime() / 1000 + GameData.serverClientTimeDt);
        }
        if (tickList) {
            var l = tickList.length;
            for (var i = l - 1; i >= 0; i--) {
                var callData = tickList[i];
                if (callData.callback) {
                    callData.callback.apply(callData.callbackThisObj, callData.callbackParams);
                }
            }
        }
    }
})(TickManager || (TickManager = {}));

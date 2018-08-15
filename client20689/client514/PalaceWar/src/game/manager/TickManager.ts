namespace TickManager 
{
	let isTicking:boolean=false;
	let tickList:{callback:Function,callbackThisObj:any,callbackParams:any[]}[]=[];
	/**
	 * 开始tick 一秒一次
	 */
	export function startTick():void
	{
		if(isTicking)
		{
			return;
		}
		isTicking=true;
		TimerManager.doTimer(1000,0,tick,TickManager);
	}

	/**
	 * 停止tick 一秒一次
	 */
	export function stopTick():void
	{
		isTicking=false;
		TimerManager.remove(tick,this);
	}

	/**
	 * 添加tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 * @param callbackParams 
	 */
	export function addTick(callback:Function,callbackThisObj:any,callbackParams?:any[]):void
	{
		if(callback)
		{
			tickList.push({callback:callback,callbackThisObj:callbackThisObj,callbackParams:callbackParams});
		}
	}

	/**
	 * 移除tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 */
	export function removeTick(callback:Function,callbackThisObj:any):void
	{
		let l:number=tickList.length;
		for(var i:number=l-1;i>=0;i--)
		{
			let callData=tickList[i];
			if(callData.callback==callback&&callData.callbackThisObj==callbackThisObj)
			{
				tickList.splice(i,1);
				break;
			}
		}
	}

	function tick():void
	{
		if(GameData.serverTime)
		{
			
			if(GameData.lastAutoSyncTime == 0)
			{
				GameData.lastAutoSyncTime = GameData.serverTime;
			}
			if(GameData.pauseSync == false)
			{
				//检查心跳
				if((GameData.serverTime - GameData.lastAutoSyncTime) >= 60)
				{
					GameData.lastAutoSyncTime = GameData.serverTime;
					if(Api.rookieVoApi.isInGuiding == false)
					{
						NetManager.request(NetRequestConst.REQUEST_USER_SYNC,null);
					}
				}
				else
				{
					//是否跨天，跨天后需要同步数据
					if(App.DateUtil.checkIsToday(GameData.lastAutoSyncTime) == false && Api.rookieVoApi.isInGuiding == false)
					{
						GameData.lastAutoSyncTime = GameData.serverTime;
						NetManager.request(NetRequestConst.REQUEST_USER_SYNC,null);
					}
				}
			}
			GameData.serverTime = Math.floor(new Date().getTime()/1000 + GameData.serverClientTimeDt);
		}
		if(tickList)
		{
			let l:number=tickList.length;
			for(var i:number=l-1;i>=0;i--)
			{
				let callData=tickList[i];
				if(callData.callback)
				{
					callData.callback.apply(callData.callbackThisObj,callData.callbackParams);
				}
			}
		}
	}
}
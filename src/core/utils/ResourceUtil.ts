/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceUtil
 */
namespace App
{
	export class ResourceUtil
	{

		/*****资源组加载相关开始*****/
		private static _groupList:any={};
		private static _isGroupInit:boolean=false;

		private static initGroup():void
		{
			if(ResourceUtil._isGroupInit==false)
			{
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,ResourceUtil.onGroupLoadProgress,ResourceUtil);
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,ResourceUtil.onGroupLoadComplete,ResourceUtil);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,ResourceUtil.onGroupLoadError,ResourceUtil);
				ResourceUtil._isGroupInit=true;
			}
		}

		/**
		 * 加载资源组
		 * @param groupName 资源组名称
		 * @param onLoadComplete 资源加载完成回调
		 * @param onLoadProgress 资源加载进度回调
		 * @param onLoadThisObj 资源加载回调所属对象 
		 */
		public static loadGroup(groupName:string,onLoadComplete:Function,onLoadProgress:(e:RES.ResourceEvent)=>void,onLoadThisObj:Function,onLoadError:(e:RES.ResourceEvent)=>void):void
		{
			ResourceUtil.initGroup();
			ResourceUtil._groupList[groupName]=[onLoadComplete,onLoadProgress,onLoadThisObj,onLoadError];
			RES.loadGroup(groupName);
		}

		public static onGroupLoadProgress(e:RES.ResourceEvent):void
		{
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadProgress:Function=ResourceUtil._groupList[groupName][1];
				let loadProgressTarget:any = ResourceUtil._groupList[groupName][2];
				if(loadProgress)
				{
					loadProgress.call(loadProgressTarget,e);
				}
			}
		}
		public static onGroupLoadComplete(e:RES.ResourceEvent):void
		{
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadComplete:Function=ResourceUtil._groupList[groupName][0];
				let loadCompleteTarget:any = ResourceUtil._groupList[groupName][2];
				if(loadComplete)
				{
					loadComplete.call(loadCompleteTarget);
				}
				ResourceUtil._groupList[groupName]=null;
				delete ResourceUtil._groupList[groupName];
			}
		}
		public static onGroupLoadError(e:RES.ResourceEvent):void
		{
			console.log("res loaderror",e.groupName);
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadErrorTarget:any = ResourceUtil._groupList[groupName][2];
				let loadError:Function=ResourceUtil._groupList[groupName][3];
				if(loadError)
				{
					loadError.call(loadErrorTarget);
				}
				ResourceUtil._groupList[groupName]=null;
				delete ResourceUtil._groupList[groupName];
			}
		}

		private static _groupIndex:number=0;

		/** 创建资源组，不自动加载
		 * @param  resources 资源组
		 */ 
		public static createGroup(resources:any[] = []):string
		{
			var groupName:string = "loadGroup" + ResourceUtil._groupIndex++;
			RES.createGroup(groupName, resources, true);
			return groupName;
		}

		/*****资源组加载相关结束*****/

		/*****单资源加载相关开始*****/
		private static _isItemLoadInit:boolean=false;

		private static initItemLoad():void
		{
			if(ResourceUtil._isItemLoadInit==false)
			{
				ResourceUtil._isItemLoadInit=true;
				RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,ResourceUtil.onItemLoadError,ResourceUtil);
			}
		}

		public static loadItem(key:string,onLoadComplete:(value?: any, key?: string)=>any,thisObj:any):void
		{
			ResourceUtil.initItemLoad();
			RES.getResAsync(key,onLoadComplete,thisObj);
		}

		public static loadItemByUrl(url:string,onLoadComplete:Function,thisObj:any,type?:string):void
		{
			ResourceUtil.initItemLoad();
			RES.getResByUrl(url,onLoadComplete,thisObj,type);
		}

		private static onItemLoadError(e:RES.ResourceEvent):void
		{
			if(e.resItem.name.indexOf("gameconfig_")>-1&&!GameConfig.isLoaded)
			{
				GameConfig.loadConfig();
			}
			App.LogUtil.show("缺资源or断网",e.resItem.name);
		}
		/*****单资源加载相关结束*****/

		/**
		 * 加载混合资源
		 * @param resources 资源数组
		 * @param groups 资源组数组
		 * @param onResourceLoadComplete 资源加载完成执行函数
		 * @param onResourceLoadProgress 资源加载进度监听函数
		 * @param onResourceLoadTarget 资源加载监听函数所属对象
		 */
		public static loadResource(resources = [], groups = [], onResourceLoadComplete:Function, onResourceLoadProgress:(e:RES.ResourceEvent)=>void, onResourceLoadTarget:any,onLoadError:(e:RES.ResourceEvent)=>void):string
		{
			let needLoadArr = groups?resources.concat(groups):resources;
			let autoAddResArr:string[]=[];
			for(var i:number=needLoadArr.length-1;i>=0;i--)
			{
				let key:string=needLoadArr[i];
				key=App.ResourceUtil.getReskey(key);
				needLoadArr[i]=key;
				let isGroup:boolean=false;
				if(RES["config"]&&RES["config"].config&&RES["config"].config.groups)
				{
					if(RES["config"].config.groups[key])
					{
						isGroup=true;
					}
				}
				else
				{
					if(RES.getGroupByName(key))
					{
						isGroup=true;
					}
				}
				if(!key||(RES.hasRes(key)==false&&!isGroup))
				{
					App.LogUtil.warn("资源配置缺少",key,"跳过加载此文件");
					needLoadArr.splice(i,1);
				}
				else
				{
					if(key.indexOf("btn")>-1)
					{
						let btnDownName:string=key+"_down";
						if(RES.hasRes(btnDownName))
						{
							if(needLoadArr.indexOf(btnDownName)<0)
							{
								autoAddResArr.push(btnDownName);
							}
						}
					}
					else if(key.indexOf("progress")>-1)
					{
						let progressBgName:string=key+"_bg";
						if(RES.hasRes(progressBgName))
						{
							if(needLoadArr.indexOf(progressBgName)<0)
							{
								autoAddResArr.push(progressBgName);
							}
						}
					}
					else if(key.indexOf("shield")>-1)
					{
						let shieldName:string="shield_"+GameData.getCountry();
						if(RES.hasRes(shieldName))
						{
							needLoadArr[i] = shieldName;
						}
					}
				}
			}
			needLoadArr = needLoadArr.concat(autoAddResArr);
			let groupName:string = ResourceUtil.createGroup(needLoadArr);
			ResourceUtil.loadGroup(groupName,onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget,onLoadError);
			return groupName;
		}

		public static loadSingleScript(jsSrc:string)
		{
			var s = document.createElement('script');
			s.async = false;
			s.src = jsSrc;
			s.addEventListener('load', function loadcomplete () {
				s.parentNode.removeChild(s);
				s.removeEventListener('load', loadcomplete, false);
				// callback();
			}, false);
			document.body.appendChild(s);
		};

		public static getReskey(key:string):string
		{
			let osStr:string=App.DeviceUtil.isIOS()?"ios":(App.DeviceUtil.isAndroid()?"and":"h5");
			let spid:string=PlatformManager.getSpid();
			if(RES.hasRes(key+"_"+spid+"type"))
			{
				key=key+"_"+spid+"type";
			}
			else
			{
				if(RES.hasRes(key+"_"+spid+osStr+"type"))
				{
					key=key+"_"+spid+osStr+"type";
				}
			}
			return key;
		}

		/**
		 * 检查资源key是否在对应组里面
		 */
		public static checkResInGroupByKey(resKey:string,groupName:string):boolean
		{
			let resCfg:RES.ResourceConfig;
			if(RES["configInstance"])
			{
				resCfg = RES["configInstance"];
				let resArr:{name:string}[]=resCfg.getRawGroupByName(groupName);
				if(resArr)
				{
					let l:number=resArr.length;
					for(let i:number=l-1;i>=0;i--)
					{
						if(resArr[i]&&resArr[i].name&&resArr[i].name==resKey)
						{
							return true;
						}
					}
				}
			}
			else
			{
				return false;
			}
		}
	}
}
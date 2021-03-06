namespace Config
{
	export namespace MaintaskCfg 
	{
		let mainTaskList:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:MaintaskItemCfg;
				if(!mainTaskList.hasOwnProperty(String(key)))
				{
					mainTaskList[String(key)]=new MaintaskItemCfg();
				}
				itemCfg=mainTaskList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.taskId=String(key);
			}
		}
		export function getTaskCfgByTaskId(taskId:string)
		{
			return mainTaskList[taskId];
		}
	}
	class MaintaskItemCfg extends BaseItemCfg
	{
		/**
		 * 任务id
		 */
		public taskId:string;
		/**
		 * 后续任务Id
		 */
		public unlockId:string;
		/**
		 * 任务类型
		 */
		public questType:string;
		/**
		 * 特殊处理参数
		 */
		public need:string;
		public openNeed:string;
		/**
		 * 进度
		 */
		public value:string
		/**
		 * 奖励
		 */
		public reward:string;
		/**
		 * 跳转
		 */
		public openType:string;
	}

}
namespace Config
{
	export namespace GameprojectCfg 
	{
		 
		export let rewardArr:Array<number>=[2,3,7];
		/**
		 * 签到2天额外奖励红颜
		 */
		export let sign2DayReward:string;
		/**
		 * 签到3天额外奖励红颜
		 */
		export let sign3DayReward:string;
		/**
		 * 签到7天额外奖励红颜
		 */
		export let sign7DayReward:string;
		/**
		 * 关卡、副本恢复门客出战次数所需道具
		 */
		export let needItem:string;

		/**
		 * 3K手机绑定的奖励
		 */
		export let reward3K:string;

		/** 
		 * 3K手机绑定持续时间 单位：天
		 */
		export let reward3KlastTime:number;

		/**
		 * 玩吧发送桌面奖励
		 */
		export let rewardWB1:string;

		/**
		 * 玩吧每日分享奖励
		 */
		export let rewardWB2:string;

		/**
		 * 实名认证
		 */
		export let rewardID3K:string;

		/**
		 * 疯狂游乐场关注奖励
		 */
		export let rewardFKYLC1:string;

		/**
		 * 疯狂游乐场分享奖励(每日)
		 */
		export let rewardFKYLC2:any;
		/**
		 * 疯狂、爱微游实名验证奖励
		 */
		export let rewardFKYLC3:any;

		/**
		 * 下载微端奖励
		 */
		export let rewardGT:any;
		/**
		 * 玩吧下载微端奖励
		 */
		export let rewardWB4:any;
		/**
		 * 玩吧cover奖励
		 */
		export let rewardWB5:any;
		/**
		 * 港台绑定奖励
		 */
		export let rewardGT1:any;
		
		export let shareShowZJ:string;
		
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key]=data[key];
			}
		}
	}
}

namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 擂台配置
		 */
		export class CrossServerAtkRaceCfg
		{	
			/**
			 * 解锁条件  拥有 X 个门客
			 */
			private unlock:number;

			/**
			 * 门客等级
			 */
			private servantLv:number;

			
			private dailyNum:number;

			/**
			 * 每次间隔时间 单位（秒）
			 */
			private intervalTime:number;

			/**
			 * 出使消耗道具
			 */
			private fightAdd:string;

			/**
			 * 复仇消耗道具
			 */
			private revenge:string;

			/**
			 * 挑战消耗道具
			 */
			private challenge:string;

			/**
			 * 追杀消耗道具 暂用道具
			 */
			private hunt:string;

			/**
			 * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
			 */
			private parameter1:number;
			private parameter3:number;

			private iniAtt:Object;
			private juniorAtt:Object;
			private mediumAtt:Object;
			private seniorAtt:Object;

			public winServer:string;
			public loseServer:string;
			public rankList:{string:{rank:number[],reward:string}}[];
			public formatData(data:any):void
			{
				this.unlock = data.unlock;
				this.servantLv = data.servantLv;
				this.dailyNum = data.dailyNum;
				this.intervalTime = data.intervalTime;
				this.fightAdd = data.fightAdd;
				this.revenge = data.revenge;
				this.challenge = data.challenge;
				this.hunt = data.hunt;
				this.parameter1 = data.parameter1;
				this.parameter3 = data.parameter3;

				this.iniAtt = data.iniAtt;
				this.juniorAtt = data.juniorAtt;
				this.mediumAtt = data.mediumAtt;
				this.seniorAtt = data.seniorAtt;
				this.winServer = data.winServer;
				this.loseServer = data.loseServer;
				this.rankList = data.rankList;
			}
			/**
			 * 每日武馆次数
			 */
			public getDailyNum():number
			{
				return this.dailyNum;
			}

			/**
			 * 额外出战系数
			 */
			public getParameter1():number
			{
				return this.parameter1;
			}

			/**
			 * 门客等级限制
			 */
			public getServantLv():number
			{
				return this.servantLv;
			}

			/**
			 * 每次间隔时间 单位（秒）
			 */
			public getIntervalTime():number
			{
				return this.intervalTime;
			}

			/**
			 * 解锁条件  拥有 X 个门客
			 */
			public getUnlock():number
			{
				return this.unlock;
			}

			/**
			 * 初始属性
			 */
			public getInitAtt(key:string):Object
			{
				return this.iniAtt[key];
			}
			/**
			 * 初级属性
			 */
			public getJuniorAtt(key:string):Object
			{
				return this.juniorAtt[key];
			}
			/**
			 * 中级属性
			 */
			public getMediumAtt(key:string):Object
			{
				return this.mediumAtt[key];
			}
			/**
			 * 高级属性
			 */
			public getSeniorAtt(key:string):Object
			{
				return this.seniorAtt[key];
			}

			public getFightAdd():string
			{
				return this.fightAdd;
			}
			/**
			 * 上榜条件 击败多少名
			 */
			public getbeatNum():number
			{
				return this.parameter3;
			}
			
			public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this.winServer,true,true);
			}
			public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this.loseServer,true,true);
			}

			public getServerRankRewards()
			{
				return this.rankList;
			}
		}
	}
}

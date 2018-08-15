

namespace Config {
	/**
	 * 擂台配置
	 */
	export namespace AtkraceCfg
	{	
		/**
		 * 解锁条件  拥有 X 个门客
		 */
		let unlock:number;

		/**
		 * 门客等级
		 */
		let servantLv:number;

		
		let dailyNum:number;

		/**
		 * 每次间隔时间 单位（秒）
		 */
		let intervalTime:number;

		/**
		 * 出使消耗道具
		 */
		let fightAdd:string;

		/**
		 * 复仇消耗道具
		 */
		let revenge:string;

		/**
		 * 挑战消耗道具
		 */
		let challenge:string;

		/**
		 * 追杀消耗道具 暂用道具
		 */
		let hunt:string;

		/**
		 * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
		 */
		let parameter1:number;
		let parameter3:number;

		let iniAtt:Object;
		let juniorAtt:Object;
		let mediumAtt:Object;
		let seniorAtt:Object;

		export function formatData(data:any):void
		{
			unlock = data.unlock;
			servantLv = data.servantLv;
			dailyNum = data.dailyNum;
			intervalTime = data.intervalTime;
			fightAdd = data.fightAdd;
			revenge = data.revenge;
			challenge = data.challenge;
			hunt = data.hunt;
			parameter1 = data.parameter1;
			parameter3 = data.parameter3;

			iniAtt = data.iniAtt;
			juniorAtt = data.juniorAtt;
			mediumAtt = data.mediumAtt;
			seniorAtt = data.seniorAtt;
		}
		/**
		 * 每日武馆次数
		 */
		export function getDailyNum():number
		{
			return dailyNum;
		}

		/**
		 * 额外出战系数
		 */
		export function getParameter1():number
		{
			return parameter1;
		}

		/**
		 * 门客等级限制
		 */
		export function getServantLv():number
		{
			return servantLv;
		}

		/**
		 * 每次间隔时间 单位（秒）
		 */
		export function getIntervalTime():number
		{
			return intervalTime;
		}

		/**
		 * 解锁条件  拥有 X 个门客
		 */
		export function getUnlock():number
		{
			return unlock;
		}

		/**
		 * 初始属性
		 */
		export function getInitAtt(key:string):Object
		{
			return iniAtt[key];
		}
		/**
		 * 初级属性
		 */
		export function getJuniorAtt(key:string):Object
		{
			return juniorAtt[key];
		}
		/**
		 * 中级属性
		 */
		export function getMediumAtt(key:string):Object
		{
			return mediumAtt[key];
		}
		/**
		 * 高级属性
		 */
		export function getSeniorAtt(key:string):Object
		{
			return seniorAtt[key];
		}

		export function getFightAdd():string
		{
			return fightAdd;
		}
		/**
		 * 上榜条件 击败多少名
		 */
		export function getbeatNum():number
		{
			return parameter3;
		}
		
	}
}

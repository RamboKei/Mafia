namespace Config
{
	/**
	 * 充值配置
	 */
	export namespace RechargeCfg 
	{
		let moneyNameCfg={
			wanba:{QZ1:"星币",SQ1:"星币",QZ2:"星币",SQ2:"秀币"}
		};

		export function getMoneyName():string
		{
			let moneyName:string;
			if(PlatformManager.checkIsWanbaSp())
			{
				try
				{
					let data=window["OPEN_DATA"];
					let platform:string=data.platform;
					let app:string=data.qua.app;
					moneyName=moneyNameCfg.wanba[app+platform];
				}
				catch(e)
				{
					
				}
			}
			return moneyName;
		}

		export let wanbaCfg={
			"g1":{
				"pid1":21237,"pid2":21229
			},
			"g2":{
				"pid1":21238,"pid2":21230
			},
			"g3":{
				"pid1":21239,"pid2":21231
			},
			"g4":{
				"pid1":21240,"pid2":21232
			},
			"g5":{
				"pid1":21241,"pid2":21233
			},
			"g6":{
				"pid1":21242,"pid2":21234
			},
			"g7":{ 
				"pid1":21243,"pid2":21235
			},
			"g8":{
				"pid1":21244,"pid2":21236
			},
			"g11":{
				"pid1":25196,"pid2":25197
			},
			"g12":{
				"pid1":25751,"pid2":25755
			},
			"g13":{
				"pid1":25752,"pid2":25756
			},
			"g14":{
				"pid1":25749,"pid2":25753
			},
			"g15":{
				"pid1":25750,"pid2":25754
			}
		};

		export function getAllProductid():string[]
		{
			let idArr:string[]=[];
			let orderidArr:string[]=[];
			try
			{
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					
					if(PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
					{
						let data=window["OPEN_DATA"];
						let platform:string=data.platform;
						let app:string=data.qua.app;
						let productId=Config.RechargeCfg.wanbaCfg[itemCfg.id]["pid"+platform];
						orderidArr.push(productId);
					}
					else
					{
						if(itemCfg.orderid)
						{
							orderidArr.push(itemCfg.orderid);
						}
						else
						{
							idArr.push(itemCfg.id);
						}
					}
				}
			}
			catch(e)
			{

			}
			if(orderidArr&&orderidArr.length>0)
			{
				return orderidArr;
			}
			return idArr;
		}

		let normalRechargeListCfg:RechargeItemCfg[];
		let rechargeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:RechargeItemCfg;
				if(!rechargeListCfg.hasOwnProperty(String(key)))
				{
					rechargeListCfg[String(key)]=new RechargeItemCfg();
				}
				itemCfg=rechargeListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
			}
		}

		/**
		 * 获取普通充值档
		 */
		export function getNormalRechargeCfg():RechargeItemCfg[]
		{
			if(normalRechargeListCfg==null)
			{
				normalRechargeListCfg=[];
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					let gemCost = Number(itemCfg.gemCost);
					if(PlatformManager.checkIsShenHeYiWan() && (key=="g7"||key=="g8")){
						itemCfg.sortId = key=="g7" ? 9 : 10;
						
					}
					if(itemCfg.sortId)
					{
						normalRechargeListCfg.push(itemCfg);
					}
					
				}
				normalRechargeListCfg.sort((a:RechargeItemCfg,b:RechargeItemCfg)=>{
					return a.sortId<b.sortId?1:-1;
				});
			}
			return normalRechargeListCfg;
		}

		/**
		 * 根据key取对应档位的配置
		 * @param key 
		 */
		export function getRechargeItemCfgByKey(id:string):RechargeItemCfg
		{
			for(let key in rechargeListCfg)
			{
				let itemCfg:RechargeItemCfg=rechargeListCfg[key];
				if(itemCfg.id == id)
				{
					return itemCfg;
				}
			}
			return null;
		}

		/**
		 * 获取第一个充值宝箱
		 */
		export function rewardList1():Array<RewardItemVo>
		{
			// let rewardStr = rechargeListCfg["g9"].getReward;
			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			let rewards =  "1_1_"  +cfg11.gemCost + "|" + cfg11.getReward;
			return GameData.formatRewardItem(rewards);
		}

		/**
		 * 获取第二个充值宝箱
		 */
		export function rewardList2():Array<RewardItemVo>
		{
			// let rewardStr = rechargeListCfg["g10"].getReward;
			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
			let rewards =  "1_1_"  +cfg11.gemCost + "|" + cfg11.getReward;
			return GameData.formatRewardItem(rewards);
		}
	}

	export class RechargeItemCfg extends BaseItemCfg
	{
		/**
		 * 充值档位
		 */
		public id:string;
		
		/**
		 * 价格
		 */
		public cost:number;

		/**
		 * 购买钻石
		 */
		public gemCost:number;

		/**
		 * 首充赠送
		 */
		public firstGet:number;

		/**
		 * 首充之后赠送
		 */
		public secondGet:number;

		/**
		 * 月卡天数
		 */
		public dayCount:number;

		/**
		 * 每日获得
		 */
		public dayGet:number;

		/**
		 * 购买上限
		 */
		public dayLimit:number;

		/**
		 * 显示顺序
		 */
		public sortId:number;

		/**
		 * 推荐 0,1
		 */
		public recommend:number;

		/**
		 * 渠道对应的充值档id
		 */
		public orderid:string;

		/**
		 * 权势礼包奖励
		 */
		public getReward:string;

		/**
		 * 权势礼包奖励持续时间
		 */
		public lastTime:number;

		public constructor()
		{
			super();	
		}
	}
}
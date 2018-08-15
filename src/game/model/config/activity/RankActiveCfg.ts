namespace Config
{
	export namespace AcCfg
	{
		export class RankActiveCfg 
		{
			/**
			 * 类型 1：势力冲榜 2：关卡冲榜
			 */
			public type:number;
			public title:string;
			private rankList:Object={};
				
			//是否跨服  1：跨服，活动结束后产出跨服资格  0：不跨服 
			private isCross:number = 0;
			public formatData(data:any):void
			{
				for(var key in data)
				{
					if(key=="rankList")
					{
						for(let rankKey in data[key])
						{
							let itemCfg:RankActiveItemCfg;
							if(!this.rankList.hasOwnProperty(String(rankKey)))
							{
								this.rankList[String(rankKey)]=new RankActiveItemCfg();
							}
							itemCfg=this.rankList[String(rankKey)];
							itemCfg.initData(data[key][rankKey]);
							itemCfg.id=String(rankKey);
						}
					}
					else
					{
						this[key]=data[key];
					}
				}
			}
			public getRankList()
			{
				return this.rankList;
			}

			public getMaxRangValue()
			{
				let lastKList = Object.keys(this.rankList);
				return this.rankList[lastKList[lastKList.length-1]].rank[1];
			}

			public get helpInfo():string
			{
				let helpStr:string = undefined;
				// if(this.type == 11)
				// {
					helpStr = "acRankActive-"+ this.type + "_Desc";
				// }
				return helpStr;
			}
		}
		export class RankActiveItemCfg extends BaseItemCfg
		{
			public id:string;
			/**
			 * 排名上下限
			 */
			private rank:[number,number];
		
			/**
			 * 奖励
			 */
			public reward:string = "";
			public reward1:string = "";
			public get minRank():number
			{
				return this.rank[0];
			}
			public get maxRank():number
			{
				return this.rank[1];
			}

			public get rewardIcons():BaseDisplayObjectContainer[]
			{
				return GameData.getRewardItemIcons(this.reward,true,true);
			}
			public get reward1Icons():BaseDisplayObjectContainer[]
			{
				return GameData.getRewardItemIcons(this.reward1,true,true);
			}

			
		}
	}
}
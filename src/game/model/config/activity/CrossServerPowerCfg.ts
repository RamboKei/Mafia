
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 亲密配置
		 */
		export class CrossServerPowerCfg
		{	
           //获胜区奖励
			private _winServer:string;
			//败区奖励
			private _loseServer:string;
			//排名奖励
			private _rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			private _rankList1:{string:{rank:number[],reward:string}}[];
			//多区服区服奖励
			private _serverList1:{string:{rank:number[],reward:string}}[];
			
			public formatData(data:any):void
			{
				this._winServer = data.winServer;
				this._loseServer = data.loseServer;
				this._rankList = data.rankList;
				this._rankList1 = data.rankList1;
				this._serverList1 = data.serverList1;
			}
			
			public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this._winServer,true,true);
			}
			
			public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this._loseServer,true,true);
			}

			public getMulServerRewards(zonenum)
			{
				this.judgeParam(zonenum);
				return this._serverList1;
			}

			public getMulServerPRankRewards()
			{
				return this._rankList1;
			}

			private judgeParam(zonenum){
				for(var i in this._serverList1){
					let unit : any = this._serverList1[i];
					if(zonenum <= Number(unit.rank[1])){
						unit.rank[1] = zonenum;
						break;
					}
				}
				for(let j in this._serverList1){
					if(Number(i) < Number(j)){
						delete this._serverList1[j];
					}
				}
			}
			
			public getServerRankRewards()
			{
				return this._rankList;
			}
		}
	}
}

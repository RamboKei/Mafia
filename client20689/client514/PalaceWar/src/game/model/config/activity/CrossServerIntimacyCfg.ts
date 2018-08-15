
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 擂台配置
		 */
		export class CrossServerIntimacyCfg
		{	
            //获胜区奖励
            private _winServer:string;
            //败区奖励
            private _loseServer:string;
            //排名奖励
            private _rankList:{string:{rank:number[],reward:string}}[];
            
			public formatData(data:any):void
			{
				this._winServer = data.winServer;
				this._loseServer = data.loseServer;
				this._rankList = data.rankList;
			}
            
            public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this._winServer,true,true);
			}
            
            public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this._loseServer,true,true);
            }
            
			public getServerRankRewards()
			{
				return this._rankList;
			}
		}
	}
}

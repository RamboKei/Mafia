namespace Config
{
	export namespace AcCfg
	{
		export class TailorCfg 
		{
            public showList:{string:number}[];
            //单抽消耗：X元宝
            public cost:number
            
            //单抽获得道具：银票*1  十连抽获得道具 = getReward * 10
            public getReward:string;
            
            //十连抽元宝打折：十连抽所需元宝 = cost * 10 * discount 
            public discount:number;
            
            //抽奖奖池  {奖励，权重}
            public tailorPool:{string,number}[];
            
            //兑换所需道具（皮肤券）  已拥有此皮肤后，不可再次兑换
            public shop:{string:number}[];
            
            public formatData(data:any):void
			{
				if(data)
				{
					for(var key in data)
					{
						this[key]=data[key];
					}
				}
			}

        }
	}
}
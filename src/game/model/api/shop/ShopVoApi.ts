/**
 * 商店api
 * author dmj
 * date 2017/10/28
 * @class ShopVoApi
 */
class ShopVoApi extends BaseVoApi
{
	private shopVo:ShopVo;
	public constructor() 
	{
		super();
	}

	public getVersion()
	{
		return  String(this.shopVo.version);
	}
	public getst()
	{
		return  this.shopVo.st;
	}

	public getet()
	{
		return  this.shopVo.et;
	}
	/**
	 * 根据类型获取商店info数组
	 * @param type 
	 */
	public getShopInfoListByType(type:number):Array<any>
	{
		let arr:Array<any> = new Array();
		let vrson = this.getVersion()
		if(this.getet() < GameData.serverTime ){
			vrson = "0";
		}
		arr = Config.ShopCfg.getShopItemCfgListByType(type,vrson);
		return arr;
	}

	/**
	 * 根据商品id获取商品vo
	 * @param id 
	 */
	public getShopInfoVoById(id:number):ShopInfoVo
	{
		if(this.shopVo)
		{
			let shopInfoVoObj = this.shopVo.shopInfoVoObj;
			if(shopInfoVoObj && shopInfoVoObj[id.toString()])
			{
				return shopInfoVoObj[id.toString()];
			}
		}
		return null;
	}
	/**
	 * 通过商品id获取商品配置
	 * @param id 
	 */
	public getShopItemCfgById(id:number):Config.ShopItemCfg
	{
		let v = this.getVersion();
		if( Number(v) > 0 && this.getet() < GameData.serverTime)
		{
			v = "0"
		}
		return Config.ShopCfg.getShopItemCfgById(id,v);
	} 
	
	/**
	 * 根据商品id获取该商品能够购买的次数
	 * @param id 商品id
	 */
	public getCanBuyNumById(id:number):number
	{
		let shopItemCfg = this.getShopItemCfgById(id);
		if(shopItemCfg.limitNum > 0)
		{
			let shopInfoVoObj = this.shopVo.shopInfoVoObj;
			if(shopInfoVoObj && shopInfoVoObj[id.toString()])
			{
				let num = shopItemCfg.limitNum - shopInfoVoObj[id.toString()].buyNum;
				return num < 0?0:num;
			}
		}
		return shopItemCfg.limitNum;
	}

	//获取已经购买过的次数
	public getNewShopBuyNumById(id:number):number
	{
		let buyNum=0; 
		if(this.shopVo&&this.shopVo.hinfo&&this.shopVo.hinfo[id])
		{
			 buyNum = this.shopVo.hinfo[id];
		}
		return buyNum;
	}



	public checkIfNeedRequest():boolean
	{
		if(this.shopVo.lastUpdateTime > 0 )
		{
			return true;
		}
		return false;
	}

	/**
	 * 充值type 0未充值过,1已首充,2已领取
	 */
	public getPayFlag():number
	{
		return this.shopVo?this.shopVo.payflag:0;
	}

	public getPayInfoById(id:string):boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay?this.shopVo.pay[id]:0);
	}

	public getPayInfoById2(id:string):any
	{
		return this.shopVo.pay[id];
	}

	//12元礼包1
	public getPayInfo1():boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay&&this.shopVo.pay["g9"]&&this.shopVo.pay["g9"].isbuy?this.shopVo.pay["g9"].isbuy:0);
	}
	//12元礼包2
	public getPayInfo2():boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay&&this.shopVo.pay["g10"]&&this.shopVo.pay["g10"].isbuy?this.shopVo.pay["g10"].isbuy:0);
	}

	//12元礼包1时间
	public getPayInfo1Time():number
	{
		let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
		let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
		let lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime


		return lt
	}

	/**
	 * 是否已购买终身卡
	 */
	public ifBuyYearCard():boolean
	{
		if(this.shopVo.yearcard && this.shopVo.yearcard.et > GameData.serverTime)
		{
			return true;
		}
		return false;
	}

	/**
	 * 是否已购买月卡
	 */
	public ifBuyMonthCard():boolean
	{
		if(this.shopVo.monthcard && this.shopVo.monthcard.et > GameData.serverTime)
		{
			return true;
		}
		return false;
	}

	public getVipRewardInfo(vipLevel:number):boolean
	{
		return this.shopVo?this.shopVo.vipInfo[vipLevel]:false;
	}
	public getMonthcardet():number
	{
			return  this.shopVo.monthcard.et;
	}
	public getInterday():boolean
	{
		if(this.shopVo&&this.shopVo.hinfo)
		{
			if(Object.keys(this.shopVo.hinfo).length==0)
			{
				return true;
			}
			else
			{
				return false;
			}
		} 
	}

	public getfourRateCharge():boolean
	{
		if(this.shopVo.fourRateCharge==null)
		{
			return true;
		}
		return false ;
	}
	public dispose():void
	{
		super.dispose();
	}
}
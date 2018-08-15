class AcDailyChargeVo extends AcBaseVo
{
	public v:number=0;
	public flags={};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		let oldV = this.v;
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V);
	}
	public get isShowRedDot():boolean
	{
		let dailyVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
		let cfgObj = <Config.AcCfg.DailyChargeCfg>Config.AcCfg.getCfgByActivityIdAndCode("dailyCharge",dailyVo.code);
		if(!cfgObj)
		{
			return false;
		}
		let _seprateNum = 0;
		let list = cfgObj.getList();
		for (var key in list) {
			let tmpCfg = list[key]; 
			if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
			{
				if(Api.switchVoApi.checkSpecialChargeReward() && !this.flags[key] &&this.v >= list[key]["needGem"] )
				{
					return true;
				}
			}else{
				_seprateNum = tmpCfg.needGem;
				if (!this.flags[key] && list[key]["needGem"] <= this.v)
				{
					return true;
				}
			}
		}
		return false;
	}
	public dispose():void
	{
		this.v = 0;
		this.flags = {};
	}
}
/**
 * 门客系统api
 * author dmj
 * date 2017/9/22
 * @class ServantVoApi
 */
class ServantVoApi extends BaseVoApi
{
	private servantVo:ServantVo;
	private waitShowData:any;
	public isShowAtkraceGuide = false;
	public isCheckGuide = false;
	public constructor() 
	{
		super();
	}

	public setWaitShowData(data:any)
	{
		this.waitShowData = data;
	}
	public getWaitShowData()
	{
		let data = this.waitShowData
		this.waitShowData = null;
		return data;
	}

	// todo 
	public getServantCount():number
	{
		return Object.keys(this.servantVo.servantInfoVoObj).length;
	}

	public getServantInfoList():Object
	{
		return this.servantVo.servantInfoVoObj;
	}

	public getServantObj(servantId:string):any
	{
		return this.servantVo.servantInfoVoObj[servantId];
	}
	
	//返回排序后的servantInfo 列表，结构为数组
	public getServantInfoListWithSort(sortType:number):any
	{
		sortType = sortType ? sortType : 1;
		let idList = this.getServantInfoIdListWithSort(sortType);
		
		let result = [];
		for (var index = 0; index < idList.length; index++) {
			result.push(this.servantVo.servantInfoVoObj[idList[index]]);
		}
		return result;
	}
	//返回经过排序后的id
	public getServantInfoIdListWithSort(sortType:number)
	{
		//排序数据，刷新列表
		let servantListObj= this.servantVo.servantInfoVoObj
		let keys:string[] = Object.keys(servantListObj);
		//默认排序
		if (sortType == 1)
		{
			// keys.sort((a:string,b:string)=>{
			// 	return Number(a) - Number(b) ;
			// });
		}
		//总属性排序
		if (sortType == 2)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (servantA.total == servantB.total)
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(Number(servantB.total) ==  Number(servantA.total))
					{
						return Number(b) - Number(a)  ;
					}
					return Number(servantB.total) -  Number(servantA.total) ;
				}
				// return 0;
			});
		}
		//资质排序, 第一版不做
		if (sortType == 4)
		{
			// 
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				let bookAv =servantA.getTotalBookValue() ;
				let bookBv =servantB.getTotalBookValue() ;
				if ( bookAv ==  bookBv )
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(bookBv  == bookAv )
					{
						return Number(b) - Number(a)  ;
					}
					return bookBv  -bookAv   ;
				}
				// return 0;
			});
		}
		//等级排序
		if (sortType == 3)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (servantA.level == servantB.level)
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(Number(servantB.level) ==  Number(servantA.level) )
					{
						return Number(b) - Number(a)  ;
					}
					return Number(servantB.level) -  Number(servantA.level) ;
				}
				// return 0;
			});
		}
		return keys;
	}

	/**
	 * 属性排序后的id  
	 * @param sortType 1武力 2智力 ，3政治  4魅力
	 */
	public getServantInfoIdListByProperty(sortType:number):string[]
	{
		//排序数据，刷新列表
		let servantListObj= this.servantVo.servantInfoVoObj
		let keys:string[] = Object.keys(servantListObj);

		keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];

				let valueA:number;
				let valueB:number;
				
				switch (sortType) 
				{
					case 1:
						valueA = servantA.attrVo.forceTotal;
						valueB = servantB.attrVo.forceTotal;
						break;
					case 2:
						valueA = servantA.attrVo.brainsTotal;
						valueB = servantB.attrVo.brainsTotal;
						break;
					case 4:
						valueA = servantA.attrVo.charmTotal;
						valueB = servantB.attrVo.charmTotal;
						break;
					case 3:
						valueA = servantA.attrVo.politicsTotal;
						valueB = servantB.attrVo.politicsTotal;
						break;
				}

				if (valueA == valueB)
				{
					return Number(Number(b) - Number(a)) ;
				}else
				{
					return Number(valueB - valueA);
				}
			});

		return keys;
	}

	public getServantProByType(servnatId:string,proType:number)
	{
		let servantA = this.servantVo.servantInfoVoObj[servnatId];
		let valuePro:number;
		switch (proType) 
		{
			case 1:
				valuePro = servantA.attrVo.forceTotal;
				break;
			case 2:
				valuePro = servantA.attrVo.brainsTotal;
				break;
			case 4:
				valuePro = servantA.attrVo.charmTotal;
				break;
			case 3:
				valuePro = servantA.attrVo.politicsTotal;
				break;
		}
		return valuePro;
	}
	/**
	 * 获取门客战斗力
	 *  门客武力资质 * 5000 * 门客等级 + 门客的武力属性
	 */
	public getServantCombatWithId(servantId:string):number
	{
		let infoVo= this.servantVo.servantInfoVoObj[servantId];
		let value:number = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);

		return value;
	}
	/**
	 * 获取门客武力资质
	 * @param servantId 
	 */
	public getServantForceTotalById(servantId:string):number
	{
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		let ability = servantcfg.ability;
		 let infoVo= this.servantVo.servantInfoVoObj[servantId];
		 let abilityCfg = GameConfig.config.abilityCfg;
		 let value = 0;
		 for (var index = 0; index < ability.length; index++) {
			 let abilityItem = abilityCfg[String(ability[index])];
			 if(abilityItem.type == 1)
			 {
				 value += abilityItem.num*infoVo.ability[index];
			 }
		 }
		return value
	}

	public getServantStarsNumWithId(servantId:string):number
	{
		let servantCfg = GameConfig.config.servantCfg[servantId];
        let ability = servantCfg.ability
        let starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
			let tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }
		return starNum;
	}

	public getFullImgPathWithId(servantId):string{
		return "servant_full_" + servantId;
	}

	/**
	 * 大于60级门客数量
	 */
	public getServantCountLevel60Plus():number
	{	
		let count:number = 0;
		let needLv:number = Config.AtkraceCfg.getServantLv();
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.level >= needLv) {
				count++;
			}
		}
		return count;
	}


	/**
	 * 获取大于60级的门客 属性最高在上
	 */
	public getServantCountLevel60PlusList()
	{	

		let keyArr:Array<any> = [];
		let needLv:number = Config.AtkraceCfg.getServantLv();
		let arr =this.getServantInfoIdListWithSort(2);
		for (let key in arr)
		{	
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[arr[key]];
			if (servant.level >= needLv) {
				keyArr.push(arr[key])
			}
		}
		return keyArr;
	}

	public checkRedPoint():boolean
    {   
		if(this.isShowRedForItem())
			return true;
			
        for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.isShowRedInServantList()) {
				return true;
			}
		}
        return false;
    }

	public isShowRedForItem()
	{
		let attItem = GameConfig.config.servantbaseCfg.attItem;
		for (var index = 0; index < attItem.length; index++) {
			let id = attItem[index];
			let itemVO = Api.itemVoApi.getItemInfoVoById(id);
			if(itemVO && itemVO.num > 0)
			{
				return true;
			}
		}

		return false;
	}

	public isOwnServantDailyBoss()
	{
		if (this.getServantObj("1051")) {
			return true ;
		}
		return false;
	}

	public getDecreePolicyAddAttrInfo(){
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("servant",0);
	}

	public dispose():void
	{
		this.isShowAtkraceGuide = false;
		this.isCheckGuide = false;
		this.waitShowData = null;
		super.dispose();
	}
}
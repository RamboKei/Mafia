/**
 * 门客vo
 * author dmj
 * date 2017/9/22
 * @class ServantInfoVo
 */
class ServantInfoVo  extends BaseVo
{
	// 等级
	public level:number = 0;
	// 已升级经验
	public hasexp:number = 0;
	// 总属性
	public total:number = 0;
	// 属性vo
	public attrVo:ServantAttrVo;
	// 资质todo，第一版不升级，等级默认为1
	public servantId:string = "";

	public skillExp:number = 0; 
	public clv:number = 0; 
	public ability:{}; 
	public skill=[];
	public abilityExp:number = 0;
	/**
	 * 特殊门客的光环信息
	 */
	public aura:{} = 0; 
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.lv != null)
			{
				this.level = Number(data.lv);
			}
			if(data.hasexp != null)
			{
				this.hasexp = Number(data.hasexp);
			}
			if(data.total != null)
			{
				let curTotal = this.total;
				this.total = Number(data.total);
				// if(curTotal!=0 && this.total - curTotal >0){
				// 	let dis = this.total - curTotal;
				// 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
				// 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
				// 	let powerFly = new PowerFly();
				// 	powerFly.init(dis);
					
				// 	LayerManager.msgLayer.addChild(powerFly);	
				// }
			}
			if(this.attrVo == null)
			{
				this.attrVo = new ServantAttrVo();
			}

			if(data.skillExp != null)
			{
				this.skillExp = data.skillExp;
			}
			if(data.clv != null)
			{
				this.clv = data.clv;
			}
			if(data.ability != null)
			{
				this.ability = data.ability;
			}
			if(data.skill != null)
			{
				this.skill = data.skill;
			}
			if(data.abilityExp != null)
			{
				this.abilityExp = data.abilityExp;
			}
			if(data.aura != null)
			{
				this.aura = data.aura;
			}
			
			this.attrVo.initData(data);
		}
	}

	//获取头像资源
	public get halfImgPath():string{
		return "servant_half_" + this.servantId;
	}
	//获取全身像资源
	public get fullImgPath():string{
		return "servant_full_" + this.servantId;
	}
	// //获取名字资源
	// public get nameImgPath():string{
	// 	return "name_" + this.servantId;
	// }
	//获取品质框资源
	public get qualityBoxImgPath():string{
		return "servant_cardbg_" + this.clv;
	}
	//获取门客名字
	public get servantName():string
	{
		return LanguageManager.getlocal("servant_name"+this.servantId);
	}
	//获取声音
	public get sound():string{
		return  "effect_servant_"+this.servantId;
	}
	public isAtMaxLv()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level == topLV  && !  servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}

	public isAtTopLv()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV )
		{
			return true;
		}
		return false;
	}
	public isLvEnableForAdvance()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV && servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}
	public isAdvanceEnable()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		
		if(this.level >= topLV && servantLvList[String(this.clv+1)])
		{
			let needItem = servantLvList[String(this.clv+1)].needItem;
			for (var key in needItem) {
				let ownNum = Api.itemVoApi.getItemNumInfoVoById(Number(key));
				if(ownNum < needItem[key])
					return false;
			}
			//判断道具
			return true;
		}
		return false;
	}
	/**
	 * 技能是否可升级
	 */
	public isSkillLvUpEnable()
	{
		let baseCfg = GameConfig.config.servantbaseCfg
		let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
		let maxLv =  baseCfg.skillLvLimit;
		// baseCfg.servantLvList[String(this.clv)].upLv
		for (var index = 0; index < this.skill.length; index++) {
			let skillLv = this.skill[index];
			if(skillLv < maxLv && this.skillExp >= skillUpgradeExp[skillLv-1])
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 红颜技能是否可升级，可以则返回aid
	 */
	public isBookLvUpEnable()
	{
		let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;
        let numList = abilitybaseCfg.numList ;
		let idxList = {};
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
            let aLv:number = this.ability[String(index2)];
			let curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
			let abilityExp = numList[String(tmpAcfg.num)].abilityExp ;

			if (aLv < curClvCfg.abilityLv)
        	{
				let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
				if(abilityExp<= this.abilityExp || ownNum1 >= 1)
				{
					idxList[String(index2)] = index2;
				}
			}
        }

		if(Object.keys(idxList).length > 0)
		{
			return idxList;
		}else
		{
			return false;
		}
	}
	
	/**
	 * 是否在门客列表中显示红点
	 */
	public isShowRedInServantList()
	{
		if(Api.servantVoApi.isShowRedForItem() || this.isAdvanceEnable() || this.isSkillLvUpEnable() || this.isBookLvUpEnable() || this.isShowRedForaura() )
		{
			return true;
		}
		return false;
	}
	public getTotalBookValue()
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
            let aLv:number = this.ability[String(index2)];
            let txtIdx = index2*2 
			totalBookV += aLv * tmpAcfg.num;
        }
		return totalBookV;
	}
	
	public isShowRedForaura()
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId]; 
		if(servantCfg.aura )
		{
			let aura2 = servantCfg.aura["2"];
			if(aura2.maxLv > this.aura["2"])
			{
				let growNeed2 = aura2.growNeed2;
				let resTab = App.StringUtil.splitString(growNeed2,"_");
				if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
				{
					return true;
				}
			}
		}

		return false;
	}


	public dispose():void
	{
		this.level = 0;
		this.hasexp = 0;
		this.total = 0;
		this.skillExp = 0; 
		this.clv = 0; 
		this.ability={}; 
		this.skill=[];
		this.abilityExp = 0;
		this.aura = {};

		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
	}
}
/**
 * 红颜皮肤系统api
 * author dky
 * date 2018/3/2
 * @class WifeSkinVoApi
 */
class WifeskinVoApi extends BaseVoApi
{
	private wifeskinVo:WifeskinVo;
	public constructor() 
	{
		super();
	}

	// 获取皮肤数量
	public getWifeNum():number
	{
		let obj:Object = this.wifeskinVo.wifeSkinInfoVoObj;
		return Object.keys(obj).length
	}



	/**
	 * 获取红颜对应的皮肤列表
	 */
	public getWifeSkinListById(id:String):Array<Config.WifeSkinItemCfg>
	{
		let arr:Array<Config.WifeSkinItemCfg> = new Array();
		let wifeListCfg = Config.WifeskinCfg.getWifeCfgList();

		for(let key in wifeListCfg)
		{
			var curr_wifeItemCfg=wifeListCfg[key];
			if(id == curr_wifeItemCfg.wifeId)
			{	
				if (curr_wifeItemCfg.id == "1012")
				{
					if (Api.switchVoApi.checkOpenPrestige() == true)
					{
						arr.push(curr_wifeItemCfg);
					}
				}
				else 
				{
					arr.push(curr_wifeItemCfg);
				}
			}
		}

		return arr;
	}

	/**获取红颜是不是有皮肤(配置里是否有) */
	public isHaveSkin(wifeId):boolean
    {
		let wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for(let key in wifeListCfg)
		{
			var curr_wifeItemCfg=wifeListCfg[key];
			if(wifeId == curr_wifeItemCfg.wifeId)
			{
				return true;
			}
		}
        return false;
	}

	/**获取红颜列表 */
	public getWifeInfoVoList():Array<WifeskinInfoVo>
	{
		let arr:Array<WifeskinInfoVo> = new Array();
		let wifeSkinInfoVoObj:Object = this.wifeskinVo.wifeSkinInfoVoObj;
		for(let key in wifeSkinInfoVoObj)
		{
			arr.push(wifeSkinInfoVoObj[key]);
		}
		return arr;
	}

	
	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
	}

	/**
	 * 根据红颜id获取皮肤vo
	 * @param id 红颜id
	 */
	public getWifeskinInfoVoById(id:number|string):WifeskinInfoVo
	{
		let wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
		if(wifeSkinInfoVoObj && wifeSkinInfoVoObj[id.toString()])
		{
			return wifeSkinInfoVoObj[id.toString()];
		}
		return null;
	}

	/**
	 * 根据皮肤id获取红颜列表位置
	 * @param id 红颜id
	 */
	public getWifeSkinIndexVoById(skinId:string):number
	{
		let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
		let skinCfgList = this.getWifeSkinListById(wifeId);

		for (var i = 0; i < skinCfgList.length; i ++) {
			if(skinId == skinCfgList[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 获取所有红颜是否换肤红点

	 */
	public getSkinRedAll():boolean
	{	
		let skinList = this.getWifeInfoVoList();
		for (var index = 0; index < skinList.length; index++) {
			var element = skinList[index];
			if(element)
			{
				for(let key in element.skin)
				{
					// arr.push(elementObj[key]);
					if(element.skin[key].red == 1)
					{
						return true;
					}
				}
			}		
		}

		
		return false;
	}

	/**
	 * 获取某个红颜是否换肤红点

	 */
	public getSkinRed(wifeId):boolean
	{	
		let wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
		if(wifeSkinInfoVo)
		{
			// for (var index = 0; index < wifeSkinInfoVo.skin.length; index++) {
			// 	var element = wifeSkinInfoVo.skin[index];
			// 	// if(element.red == 1)
			// 	// {
			// 	// 	return true;
			// 	// }
			// 	for(let key in element)
			// {
			// 	// arr.push(wifeSkinInfoVoObj[key]);
			// 	if(element[key].red == 1)
			// 	{
			// 		return true;
			// 	}
			// }
				
			// }
			for(let key in wifeSkinInfoVo.skin)
			{
				// arr.push(wifeSkinInfoVoObj[key]);
				if(wifeSkinInfoVo.skin[key].red == 1)
				{
					return true;
				}
			}
		}
		
		return false;
	}

	/**
	 * 获取某个皮肤是否换肤红点

	 */
	public getSkinOneRed(wifeId,skinId):boolean
	{	
		let wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
		if(wifeSkinInfoVo)
		{
			if(wifeSkinInfoVo.skin[skinId]&&wifeSkinInfoVo.skin[skinId].red == 1)
			{
				return true;
			}
		}
		
		return false;
	}

	public isOwnSkinOfSkinId(skinId)
    {
        let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        if(this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        {
            return true;
        }
        return false;
    }
	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
	}
}
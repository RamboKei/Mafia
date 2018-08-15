/**
 * 红颜系统api
 * author dmj
 * date 2017/9/22
 * @class WifeVoApi
 */
class WifeVoApi extends BaseVoApi
{
	private wifeVo:WifeVo;
	private waitShowWife:any;
	public constructor() 
	{
		super();
	}


	public checkNpcMessage():boolean
	{
		if(this.getEnergyNum() > 0||Api.wifestatusVoApi.getIsConfer()){
			// return LanguageManager.getlocal("wifeTipMessage");
			return true;
		}
		return false;
	}

	public setWaitShowWife(data:any)
	{
		this.waitShowWife = data;
	}
	public getWaitShowWife()
	{
		let wafe = this.waitShowWife
		this.waitShowWife = null;
		return wafe;
	}

	// 
	public getWifes():Array<string>
	{
		let obj:Object = this.wifeVo.wifeInfoVoObj;
		return Object.keys(obj)
	}
	// 获取妻子数量
	public getWifeNum():number
	{
		let obj:Object = this.wifeVo.wifeInfoVoObj;
		return Object.keys(obj).length
	}
	// 获取孩子数量
	public getChildrenNum():number
	{
		let num = 0;
		for (var key in this.wifeVo.wifeInfoVoObj) {
			num  += this.wifeVo.wifeInfoVoObj[key].child;
		}
		return num;
	}
	/**获取红颜列表 */
	public getWifeInfoVoList():Array<WifeInfoVo>
	{
		let arr:Array<WifeInfoVo> = new Array();
		let wifeInfoVoObj:Object = this.wifeVo.wifeInfoVoObj;
		for(let key in wifeInfoVoObj)
		{
			arr.push(wifeInfoVoObj[key]);
		}
		return arr;
	}

	/**
	 * 获取未解锁红颜列表
	 */
	public getUnlockWifeInfoVoList():Array<Config.WifeItemCfg>
	{
		let arr:Array<Config.WifeItemCfg> = new Array();
		let wifeListCfg = Config.WifeCfg.getWifeCfgList();
		// let vipBoo = Api.switchVoApi.checkVip1Privilege();
		
		for(let key in wifeListCfg)
		{
			if(this.getWifeInfoVoById(Number(key)) == null)
			{	
				var curr_wifeItemCfg=wifeListCfg[key];

				if(curr_wifeItemCfg.unlock&&curr_wifeItemCfg.unlock["needVip"])
				{
					 let needVip:number =curr_wifeItemCfg.unlock["needVip"];
					 let openVipNum:number =Api.vipVoApi.getMaxbtnNum();

					 if(openVipNum>=needVip)
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
		
		arr.sort((a:Config.WifeItemCfg,b:Config.WifeItemCfg)=>{
			
				return  a.sortId -  b.sortId;
			});
		return arr;
	}

	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		// return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
		if(this.getWifeNum()<=0)
		{
			return false;
		}
		return true;
	}

	/**
	 * 检测是否有有骨骼
	 */
	public isHaveBone(boneName:string):boolean
	{
		if(PlatformManager.checkIsKRSp()){
			let krBones = {
				"wife_full_310_ske":1,
				"wife_full2_310_ske":1,
				"wife_full3_1011_ske":1,
				"wife_full4_1011_ske":1,
				"wife_full3_3101_ske":1,
				"wife_full3_3041_ske":1,
				"wife_full4_2071_ske":1,
				"wife_full3_2071_ske":1,
				"wife_full3_1012_ske":1,
				"wife_full4_1012_ske":1,
			}
			if(!krBones[boneName]){
				return false;
			}
		}
		// if(PlatformManager.checkIsThSp()){
		// 	let thBones = {
		// 		"wife_full_310_ske":1,
		// 		"wife_full2_310_ske":1,
		// 		"wife_full3_3101_ske":1,
		// 		"wife_full4_3101_ske":1,
		// 		"wife_full_303_ske":1,
		// 		"wife_full2_303_ske":1,
		// 		"wife_full3_3031_ske":1,
		// 		"wife_full4_3031_ske":1,
		// 		"wife_full_304_ske":1,
		// 		"wife_full2_304_ske":1,
		// 		"wife_full3_3041_ske":1,
		// 		"wife_full4_3041_ske":1,
		// 		"wife_full_305_ske":1,
		// 		"wife_full2_305_ske":1,
		// 		"wife_full3_3051_ske":1,
		// 		"wife_full4_3051_ske":1,
		// 	}
		// 	if(thBones[boneName]){
		// 		return false;
		// 	}
		// }
		if(RES.hasRes(boneName)&&App.CommonUtil.check_dragon()&&!Api.switchVoApi.checkCloseBone()){
			return true;
		}
		return false;
	}
	/**
	 * 根据红颜id获取红颜vo
	 * @param id 红颜id
	 */
	public getWifeInfoVoById(id:number|string):WifeInfoVo
	{
		let wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
		if(wifeInfoVoObj && wifeInfoVoObj[id.toString()])
		{
			return wifeInfoVoObj[id.toString()];
		}
		return null;
	}

	/**
	 * 根据红颜id获取红颜列表位置
	 * @param id 红颜id
	 */
	public getWifeIndexVoById(id:number):number
	{
		let wifeVolist = this.getWifeInfoVoList();

		for (var i = 0; i < wifeVolist.length; i ++) {
			if(id == wifeVolist[i].id ){
				return i
			}
		}
		return 0;
	}
	/**获取剩余精力次数 */
	public getEnergyNum():number
	{	
		let num:number = this.wifeVo.energy_num;
		let maxNum = this.getEnergyMaxNum();
		let serverTime = GameData.serverTime;
		let needTime = GameConfig.config.wifebaseCfg.needTime;
		if(num >= maxNum)
		{
			num = maxNum;
		}
		else
		{
			let count = Math.floor((serverTime - this.wifeVo.energy_st)/needTime);
			if((num + count) >= maxNum)
			{
				num = maxNum;
			}
			else
			{
				num += count;
			}
		}
		return num;
	}
	/**获取精力最大次数 */
	public getEnergyMaxNum():number
	{
		let num:number = GameConfig.config.vipCfg[Api.playerVoApi.getPlayerVipLevel()].maxEnergy;
		return num;
	}

	/**获取恢复精力倒计时 */
	public getRecoverEnergyTime():number
	{
		let time:number = 0;
		let needTime = GameConfig.config.wifebaseCfg.needTime;
		let st:number = this.wifeVo.energy_st;
		if((st + needTime) > GameData.serverTime)
		{
			time = st + needTime - GameData.serverTime;
		}
		return time;
	}

	/**
	 * 宠幸消耗的元宝公式（跟亲密度相关）
	 * 亲密度 * 10 最大值为1000元宝
	 * @param intimacy 亲密度
	 */
	public getLoveNeedGem(intimacy:number):number
	{
		let needGem:number = intimacy * 10
		if (needGem > 1000){
			needGem = 1000
		}
		return needGem
	}

	/**
	 * 获取红颜赏赐红点

	 */
	public getGiveRed():boolean
	{
		let cfg = Config.WifebaseCfg.wifeGift;
		for (var index = 1; index < 5; index++) {
			let key = index.toString();
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
			if(hasNum > 0 ){
				return true;
			}
		}
		return false;
	}
	/**
	 * 获取红颜技能红点

	 */
	public getSkillRed(wifeId):boolean
	{	
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
		let list = wifeVo.cfg.wifeSkill;
		for (var index = 0; index < list.length; index++) {
			var element = list[index];
			if(element.condition <= wifeVo.intimacy){
				//解锁了

				let needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index]-1];
				let hasNum:number = wifeVo.exp;
				if(needExp <= hasNum)
				{
					return true;
				}

			}
			
		}
		return false;
	}

	public getWifeIcon(wifeId:string):string
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let icon = wifeCfg.icon;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeId))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				icon = skinCfg.icon;
			}
		}
		return icon;
	}
	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
	}

	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("wife",7);
	}
	public getDecreePolicyAddAttrInfo2()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("",7);
	}
	public getDecreePolicyAddAttrInfo3()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("wife",0);
	}
}
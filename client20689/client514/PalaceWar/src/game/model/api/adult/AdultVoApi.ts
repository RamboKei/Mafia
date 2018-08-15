/**
 * 子嗣系统api
 * author dky
 * date 2017/10/28
 * @class AdultVoApi
 */
class AdultVoApi extends BaseVoApi
{
	private _adultVo:AdultVo;
	private _adultMarryVo:AdultMarryVo;
	public _marryList:any[];
	public _refuseData:any;
	// 子嗣扩展槽
	public posnum:number = 0;
	public constructor() 
	{
		super();
	}



	public checkNpcMessage():boolean
	{
		if(this._marryList.length && this._marryList.length > 0){
			// return LanguageManager.getlocal("adultTipMessage");
			return true;
		}
		return false;
	}

	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		if(this.getAdultNum()>0 || this.getAdultMarryNum()>0)
		{
			return true;
		}
		else{
			return false;
		}
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("reachConditionsUnlockDesc");
	}

	public formatData(data:any)
	{

		if(this._adultVo == null)
		{
			this._adultVo = new AdultVo();
		}

		if(this._adultMarryVo == null)
		{
			this._adultMarryVo = new AdultMarryVo();
		}

		this._adultVo.initData(data.info)
		this._adultMarryVo.initData(data.minfo)
		this._marryList = data.marry;
		this._refuseData = data.refuse;
		super.formatData(data)
	}
	// 获取子嗣扩展槽
	public getChildPosNum():number
	{
		let num:number = Api.childVoApi.getChildPosNum();
		return num;
	}
	// 获取成年子嗣数量
	public getAdultNum():number
	{
		let num:number = this.getAdultVoList().length;
		return num;
	}

	// 获取成年结婚子嗣数量
	public getAdultMarryNum():number
	{
		let num:number = this.getAdultMarryVoList().length;
		return num;
	}
	// 获取子嗣数组
	public getAdultVoList():Array<AdultInfoVo>
	{
		let adultInfoVoObj = this._adultVo.adultInfoVoObj;
		let arr:Array<AdultInfoVo> = new Array();
		for(let key in adultInfoVoObj)
		{
			arr.push(adultInfoVoObj[key]);
		}

		// todo对数组进行排序
		arr.sort((a:AdultInfoVo,b:AdultInfoVo)=>{
			
				if (a.aquality == b.aquality)
				{
					return Number(a.ts) - Number(b.ts)  ;
				}else
				{
					return Number(b.aquality) -  Number(a.aquality) ;
				}
				// return 0;
			});

		return arr;
	}

		// 获取成亲子嗣数组
	public getAdultMarryVoList():Array<AdultMarryInfoVo>
	{
		let adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
		let arr:Array<AdultMarryInfoVo> = new Array();
		for(let key in adultInfoVoObj)
		{
			arr.push(adultInfoVoObj[key]);
		}

		arr.sort((a:AdultMarryInfoVo,b:AdultMarryInfoVo)=>{
			
				return Number(b.mts) - Number(a.mts)  ;
				// return 0;
			});

		return arr;
	}

	/**
	 * 根据性别资质获取可以联姻的子嗣列表
	 * @param id 子嗣id
	 */
	public getAdultVoListById(quality:number,sex:number):Array<AdultInfoVo>
	{

		let arr = this.getAdultVoList()
		let arr2:Array<AdultInfoVo> = new Array();
		for (var index = 0; index < arr.length; index++) {
			var element = arr[index];
			if(element.aquality == quality && element.sex != sex && !this.getAdultIsInMarry(element.id))
			{
				arr2.push(element)
			}
		}

		return arr2;
	}

	/**
	 * 根据性别资质获取可以联姻的子嗣列表/属性降序
	 * @param id 子嗣id
	 */
	public getAdultVoListByIdByAttr(quality:number,sex:number):Array<AdultInfoVo>
	{

		let arr = this.getAdultVoListById(quality,sex);
		arr.sort((a:AdultInfoVo,b:AdultInfoVo)=>{
			
				return Number(b.attrVo.attTotal) -  Number(a.attrVo.attTotal) ;
				// return 0;
			});

		return arr;
	}

	/**
	 * 根据子嗣id获取子嗣vo
	 * @param id 子嗣id
	 */
	public getAdultInfoVoById(id:string):AdultInfoVo
	{
		let adultInfoVoObj = this._adultVo.adultInfoVoObj;
		if(adultInfoVoObj && adultInfoVoObj[id])
		{
			return adultInfoVoObj[id];
		}
		return null;
	}
	/**
	 * 根据子嗣id获取成亲子嗣vo
	 * @param id 子嗣id
	 */
	public getAdultMarryInfoVoById(id:string):AdultMarryInfoVo
	{
		let adultInfoVoObj = this._adultMarryVo.adultInfoVoObj;
		if(adultInfoVoObj && adultInfoVoObj[id])
		{
			return adultInfoVoObj[id];
		}
		return null;
	}
	/**
	 * 根据子嗣id获取子嗣列表位置
	 * @param id 子嗣id
	 */
	public getAdultIndexVoById(id:string):number
	{
		let adultVolist = this.getAdultVoList();

		for (var i = 0; i < adultVolist.length; i ++) {
			if(id == adultVolist[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 根据子嗣id获取结婚子嗣列表位置
	 * @param id 子嗣id
	 */
	public getAdultMarryIndexVoById(id:string):number
	{
		let adultVolist = this.getAdultMarryVoList();

		for (var i = 0; i < adultVolist.length; i ++) {
			if(id == adultVolist[i].id ){
				return i
			}
		}
		return 0;
	}
	
		// 获取子嗣是否在提亲

	public getAdultIsInMarry(id):boolean
	{
		let adultInfoVo = this.getAdultInfoVoById(id);

		let lastTime = 0;
		if(adultInfoVo.pro && adultInfoVo.pro[0]){
			
			lastTime = adultInfoVo.pro[0] - GameData.serverTime;
		}

		if(lastTime > 0){
			return true;
		}else{
			return false;
		}
	
		
	}
	
	// 获取子嗣图片

	public getAdultPic(id):string
	{
		let adultInfoVo = this.getAdultInfoVoById(id);

		let childPic = "adult_boy";
		if(adultInfoVo.sex == 2){
			childPic = "adult_girl"
		}
	
		return childPic;
	}
	// 获取子嗣说的话
	public getAdultWord(id):string
	{
		let childInfoVo = this.getAdultInfoVoById(id);
		let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
		//刷新等级
		let childState =  childInfoVo.level / childCfg.lv
		let childWords = "";
		let wordIndex = 1 ;
        

		if(childState < 0.4){
			wordIndex = App.MathUtil.getRandom(1,3);
			childWords = LanguageManager.getlocal("child_words1_" + wordIndex);
		}
		else if(childState >= 0.4 || childState < 1){
			wordIndex = App.MathUtil.getRandom(1,5);
			childWords = LanguageManager.getlocal("child_words2_" + wordIndex);
		}else{
			
		}
		return childWords;
	}

	public dispose():void
	{
		this._adultVo = null;
		this.posnum = 0;
		this._marryList = null;
		this._refuseData = null;
		super.dispose();
	}
}
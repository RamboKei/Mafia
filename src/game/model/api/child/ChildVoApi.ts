/**
 * 子嗣系统api
 * author dmj
 * date 2017/9/23
 * @class ChildVoApi
 */
class ChildVoApi extends BaseVoApi
{
	private childVo:ChildVo;
	// 子嗣扩展槽
	public posnum:number = 0;
	public constructor() 
	{
		super();
	}

	public checkNpcMessage():boolean
	{
		let childList = this.getChildrenVoList();
		for (var index = 0; index < childList.length; index++) {
			let childVo = childList[index];
			if(this.getChildrenVigourById(childVo.id) > 0){
				let childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
				if (childVo.level < childCfg.lv) // 到达最高等级上限
				{
					// return LanguageManager.getlocal("child_words2_3");
					return true;
				}
			}
		}
		
		return false;
	}
	// 获取子嗣扩展槽
	public getChildPosNum():number
	{
		let num:number = this.childVo.posnum;
		return num;
	}
	// 获取子嗣数量
	public getChildNum():number
	{
		let num:number = this.getChildrenVoList().length;
		return num;
	}
	// 获取子嗣数组
	public getChildrenVoList():Array<ChildInfoVo>
	{
		let childInfoVoObj = this.childVo.childInfoVoObj;
		let arr:Array<ChildInfoVo> = new Array();
		for(let key in childInfoVoObj)
		{
			arr.push(childInfoVoObj[key]);
		}

		// todo对数组进行排序
		arr.sort((a:ChildInfoVo,b:ChildInfoVo)=>{
			
				if (a.quality == b.quality)
				{
					return Number(a.bts) - Number(b.bts)  ;
				}else
				{
					return Number(b.quality) -  Number(a.quality) ;
				}
				// return 0;
			});

		return arr;
	}

	/**
	 * 根据子嗣id获取子嗣vo
	 * @param id 子嗣id
	 */
	public getChildrenInfoVoById(id:string):ChildInfoVo
	{
		let childInfoVoObj = this.childVo.childInfoVoObj;
		if(childInfoVoObj && childInfoVoObj[id])
		{
			return childInfoVoObj[id];
		}
		return null;
	}
	/**
	 * 根据子嗣id获取子嗣列表位置
	 * @param id 子嗣id
	 */
	public getChildIndexVoById(id:string):number
	{
		let childVolist = this.getChildrenVoList();

		for (var i = 0; i < childVolist.length; i ++) {
			if(id == childVolist[i].id ){
				return i
			}
		}
		return 0;
	}
	/**
	 * 根据子嗣id获取子嗣活力
	 * @param id 子嗣id
	 */
	public getChildrenVigourById(id:string):number
	{
		let childInfoVoObj = this.childVo.childInfoVoObj;
		let vNum = 0;
		let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
		let childrenInfoVo = childInfoVoObj[id]
		vNum = Math.floor((GameData.serverTime - childrenInfoVo.vigour.st)/GameConfig.config.childbaseCfg.needTime) 
		if(vNum + childrenInfoVo.vigour.num > maxV){
			vNum = maxV
		} else{
			vNum = vNum +childrenInfoVo.vigour.num;
		}
		return vNum;
	}
	/**
	 * 根据子嗣id获取子嗣活力恢复时间
	 * @param id 子嗣id
	 */
	public getChildrenVigourTimeById(id:string):number
	{
		let time:number = 0;
		let needTime = Config.ChildbaseCfg.needTime;
		let childInfoVoObj = this.childVo.childInfoVoObj;
		let childrenInfoVo = childInfoVoObj[id]
		let st:number = childrenInfoVo.vigour.st;
		if((st + needTime) > GameData.serverTime)
		{
			time = st + needTime - GameData.serverTime;
		}
		return time;
	}

	/**
	 * 获取恢复所有子嗣体力需要的道具数量
	 */
	public getChildrenVigourItemCount():number
	{
		
		let num = 0;
		let childVolist = this.getChildrenVoList();

		for (var i = 0; i < childVolist.length; i ++) {
		
			if(this.getChildrenVigourById(childVolist[i].id) < 2)
			{
				let childCfg = GameConfig.config.childCfg[childVolist[i].quality.toString()];
				if(childVolist[i].level < childCfg.lv)
				{
					num ++;
				}
				
			}
		}
		return num;
	}

	/**
	 * 获取可以培养的子嗣数量
	 */
	public getChildrenCanUpdCount():number
	{

		let num = 0;
		let childVolist = this.getChildrenVoList();

		for (var i = 0; i < childVolist.length; i ++) {
		
			if(this.getChildrenVigourById(childVolist[i].id) > 0)
			{
				let childCfg = GameConfig.config.childCfg[childVolist[i].quality.toString()];
				if(childVolist[i].level < childCfg.lv && childVolist[i].name != "")
				{
					num ++;
				}
				
			}
		}
		return num;
	}
	/*

	/**
	 * 子嗣位置扩展所需元宝  超过最大值取最大值
	 * 
	 */
	public getAddPosNeedGem():number
	{
		let needGem:number = 0;
		
		let childNum = Api.childVoApi.getChildPosNum() ;
		let posInex = childNum - Config.ChildbaseCfg.iniPos;
		if(posInex >= Config.ChildbaseCfg.needGem.length -1) 
		{
			posInex = Config.ChildbaseCfg.needGem.length -1
		}
		needGem = Config.ChildbaseCfg.needGem[posInex];
		return needGem
	}
	// 获取子嗣图片

	public getChildPic(id):string
	{
		function abcdd() {
			
		}
		let childInfoVo = this.getChildrenInfoVoById(id);
		let childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
		//刷新等级
		let childState =  childInfoVo.level / childCfg.lv
		let childPic = "child_state_1";
		if(childState < 0.4){
			childPic = "child_state_1"
		}
		else if(childState >= 0.4 && childState < 1){
			childPic = "child_state_2_" + childInfoVo.sex + "_" + (childInfoVo.character?childInfoVo.character:1);
		}else{
			childPic = "child_state_3_" + childInfoVo.sex;
		}
		return childPic;
	}
	// 获取子嗣说的话
	public getChildWord(id):string
	{
		let childInfoVo = this.getChildrenInfoVoById(id);
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

	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		return this.childVo?this.childVo.cnum>0:(this.getChildNum()>0?true:false);
	}
	//当前子嗣的数量
	public getCnum():number
	{
		return this.childVo.cnum;
	} 

	public dispose():void
	{
		super.dispose();
	}
}
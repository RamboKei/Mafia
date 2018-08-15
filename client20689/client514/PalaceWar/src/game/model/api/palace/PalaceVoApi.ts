/**
 * 皇宫api
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVoApi
 */
class PalaceVoApi extends BaseVoApi
{
	private palaceVo:PalaceVo;
	public constructor() 
	{
		super();
	}

	public getRoleInfoByTitleId(id:string)
	{
		return this.palaceVo.palace[id];
	}
	public getRoleInfoList()
	{
		return this.palaceVo.palace;
	}
	public updateRoleSign(titleId:string,sign:string)
	{
		 this.palaceVo.palace[titleId].sign = sign;
	}
	/**
	 * 判断自己是否在宫殿之中
	 */
	public isInThePalace()
	{
		 for (var key in this.palaceVo.palace) {
			var element:PalaceRoleInfoVo = this.palaceVo.palace[key];
		    if(element.uid == Api.playerVoApi.getPlayerID() )
			{
				return key;
			}
		 }
		 return false;
	}
	
	public checkNpcMessage():boolean
	{
		return Api.otherInfoVoApi.getOtherInfo().palace_flag == 0 ;
	}

	public isDataInit()
	{	
		return  (this.palaceVo && this.palaceVo.isInit);
	}
	/**
	 * 是否开启跨服职称
	 */
	public isCrossOpen()
	{
		return Api.switchVoApi.isCrossOpen();
	}
	public openMainView()
	{
		if(!this.isCrossOpen()){
			ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
		}	
		
	}

	/**
	 *  是否显示特殊标示
	 */
	public isShowBuildingFlag(buildingId:string)
	{
		let resList = [];
		let buicfg = GameConfig.config.buildingCfg[buildingId];
		let title = buicfg.title;
		for (var key in title) {
			let rinfo = this.palaceVo.palace[title[key]];
			if (rinfo && rinfo.uid) {
				return true;
			}
		}
		return false;
	}

}
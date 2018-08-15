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
		// if(!this.isCrossOpen()){
			// ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
		// }
		// else{
		// 	ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
		// }	
		ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
	}

	/**
	 *  是否显示特殊标示
	 */
	public isShowBuildingFlag(buildingId:string)
	{
		if(buildingId == "31")
		{
			return  Api.promoteVoApi._ishaveking == 1;
		}
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
	//自己是否在金銮殿中
	public isInKingsHouse()
	{
		let titleId = "3201"
		let rinfo = this.palaceVo.palace[titleId];
		if (rinfo && rinfo.uid == Api.playerVoApi.getPlayerID()) {
			return true;
		}
		return true;
	}

	public enterKingsHouse(tid:string="3201",buildingId:string="31")
	{
		if(Api.promoteVoApi.isKing() ){
			ViewController.getInstance().openView(ViewConst.COMMON.PALACEKINGSHOUSEGROUPVIEW,{titleId:tid,buildingId:buildingId});
		} else{
			ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:tid,buildingId:buildingId});
		}
	}
	
}
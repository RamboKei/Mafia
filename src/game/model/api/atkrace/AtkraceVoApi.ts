
/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
 */

class AtkraceVoApi extends BaseVoApi
{
	private atkraceVo:AtkraceVo;

	public constructor() {
		super();
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():AtkraceAtkInfoVo
	{
		return this.atkraceVo.ainfo;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo():AtkraceInfoVo
	{
		return this.atkraceVo.info;
	}

	public isShowNpc():boolean
	{
		return Api.servantVoApi.getServantCountLevel60Plus()>=1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
		// return true;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("atkraceUnlcok",[Config.AtkraceCfg.getUnlock().toString()]);
	}

	public getPoint():number
	{
		return this.atkraceVo.point;
	}

	public getRewardc():any
	{
		return this.atkraceVo.rewardc;
	}

	
	public checkNpcMessage():boolean
	{	
		let flag:boolean = false;
		if (this.isShowNpc()) {
			if (this.atkraceVo.ainfo && this.atkraceVo.ainfo.mesid ) {
				flag = true;
			}
			else {
				let maxCount:number = Config.AtkraceCfg.getDailyNum();
				let myNum:number = this.atkraceVo.info.num;
				if (myNum < maxCount) {
					let countDownTime:number = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime; 
					if (countDownTime<=0) {
						flag = true;
					}
				}
			}
		}
		return flag;
	}

	public dispose():void
	{
		super.dispose();
	}

	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace",5);
	}
}
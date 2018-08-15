class SwitchVoApi extends BaseVoApi
{
	private switchVo:SwitchVo;
	public constructor()
	{
		super();
	}

	/**
	 * 检测功能开关
	 * @param functionName 
	 */
	private checkSwitchByName(functionName:string):boolean
	{
		return Boolean(this.switchVo&&this.switchVo.switchList[functionName]);
	}

	/**
	 * 检测是否打开了媒婆功能
	 */
	public checkAudlt():boolean
	{
		return this.checkSwitchByName("funAdult");
	}

	/**
	 * 检测是否打开了惩戒女囚
	 */
	public checkPunishAllianceRank():boolean
	{
		return this.checkSwitchByName("closePunish");
	}

	/**
	 * 惩戒女囚的元宝购买次数随VIP等级增多的开关
	 */
	public checkPunishVip():boolean
	{
		return this.checkSwitchByName("openPunishVip");
	}

	/**
	 * 检测是否关闭了宠幸拖衣服
	 */
	public checkWifeAni():boolean
	{
		return this.checkSwitchByName("closeWifeAni");
	}

	/**
	 * 检测是否关闭被和谐文字
	 */
	public checkCloseText():boolean
	{
		return this.checkSwitchByName("closeText");
	}
	/**
	 * 检测是否挂机收取资源
	 */
	public checkAutoResManage():boolean
	{
		return this.checkSwitchByName("funAutoResManage");
	}
 
	/**
	 * 检测 是否开启审核 true:开启审核、屏蔽排行榜  false:打开排行榜关闭审核
	 */
	public checkOpenShenhe():boolean
	{
		return this.checkSwitchByName("openShenhe");
	}
 
	/**
	 * 检测是否挂机收取资源
	 */
	public checkTWShenhe():boolean
	{
		return this.checkSwitchByName("twShenhe");
	}

	public checkOpenTalkDialog():boolean
	{
		return this.checkSwitchByName("openTalkDialog");
	}


	/**
	 * 关卡跳过开关
	 */
	public checkJumpBattle():boolean
	{
		return this.checkSwitchByName("openJumpBattle");
	}

	/**
	 * 一键扫荡关卡
	 */
	public checkAutoMopup():boolean
	{
		return this.checkSwitchByName("openAutoMopup");
	}

	/**
	 * 疯狂游乐场 检测VIP 根据渠道做限制
	 */
	public checkVip1Privilege():boolean
	{
		// return this.checkSwitchByName("openVip1Privilege");
		// 这个开关不用了，以后永远开
		return true;
	}

	/**
	 * 首冲后礼包开关
	 */
	public checkOpenNewCharge():boolean
	{
		return this.checkSwitchByName("openNewCharge");
	}
	
	/**
	 * 充值奖励特殊档 是否开启
	 */
	public checkSpecialChargeReward():boolean
	{
		return this.checkSwitchByName("openSpecialChargeReward");
	}
	

	/**
	 * 玩吧脱衣AB测试
	 */
	public checkOpenWifeAbTest():boolean
	{
		return this.checkSwitchByName("openWifeAbTest");
	}
	/**
	 * 新版牢房开关
	 */
	public checkOpenNewPrison():boolean
	{
		return this.checkSwitchByName("openNewPrison");
	}
	/**
	 * 邀请有礼开关
	 */
	public checkOpenInvite():boolean
	{
		return this.checkSwitchByName("openInvite");
	}
	/**
	 * 新首次充值开关 true=新版本 
	 */
	public checknewRecharge():boolean
	{
		return this.checkSwitchByName("newRecharge");
	}

	/**
	 * q群福利 开关  true新版本 
	 */
	public checkopenQQqun():boolean
	{
		return this.checkSwitchByName("openQQqun");
	}


	/**
	 * 是否关闭骨骼
	 */
	public checkCloseBone():boolean
	{
		return this.checkSwitchByName("closeBone");
		// return false;
	}
	
	/**
	 * 是否关闭宴会新功能
	 */
	public checkCloseDinnerNewFunc():boolean
	{
		return this.checkSwitchByName("closeDinnerNewFunc");
	}

	/**
	 * 3k迁移面板的开关
	 */
	public checkOpen3kQianYi():boolean
	{
		return this.checkSwitchByName("open3kqianyi");
	}
	/**
	 * 红颜视频开关
	 */
	public checkOpenWifeVideo():boolean
	{
		return this.checkSwitchByName("openWifeVideo");
	}

	public isCrossOpen()
	{
		return this.checkSwitchByName("openCrossPalace");
	}

	/**
	 * 名望开关 本服称帝
	 */
	public checkOpenPrestige():boolean
	{
		return this.checkSwitchByName("openPrestige");
	}

	public checkClosePay():boolean
	{
		if(PlatformManager.checkIsIOSShenheSp()&&Number(PlatformManager.getAppid())==17001213)
		{
			return true;
		}
		return false;
	}

	public checkAutoLoadDefaultRes():boolean
	{
		return this.checkSwitchByName("autoloadres");
	}
	/**
	 * cover
	 */
	public checkOpenCover():boolean
	{
		return this.checkSwitchByName("openCover");
	}
	// 至劲测试充值返利 
	public checkOpenRechargeRebate():boolean
	{
		return this.checkSwitchByName("openRechargeRebate");
	}
	// 实名认证开关
	public checkOpenCertification():boolean
	{
		return this.checkSwitchByName("openCertification");
	}
	// 绑定有礼开关
	public checkOpenFbBind():boolean
	{
		return this.checkSwitchByName("openFbBind");
	}

	//修身是否开启
	public isPracticeOPen():boolean
	{
		return this.checkSwitchByName("openPractice")
	}

	/**
	 * 册封是否开启
	 */
	public checkOpenWifeStatus():boolean
	{
		return this.checkSwitchByName("openWifestatus");
	}

	/**
	 * 自动登录AB测试开关
	 */
	public checkApenAutoLoginABtest():boolean
	{
		return this.checkSwitchByName("openAutoLoginABtest");
	}
}
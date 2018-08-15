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
	 * 检测是否关闭被和谐文字2 。
	 * 为true 开启和谐版2 开关 
	 * 为false 。为关闭 和谐版2 开关
	 */
	public checkCloseText2():boolean
	{
		return this.checkSwitchByName("closeText2");
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
	 * 是否关闭红颜皮肤
	 */
	public checkCloseWifeskin():boolean
	{
		return this.checkSwitchByName("closeWifeskin");
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
		// if(PlatformManager.checkIsIOSShenheSp()&&Number(PlatformManager.getAppid())==17001213)
		// {
		// 	return true;
		// }
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

	// 至劲测试充值返利 2倍
	public checkOpenRechargeRebate2():boolean
	{
		return this.checkSwitchByName("openRechargeRebate2");
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

	// 粤语 开关
	public checkOpenVoice():boolean
	{
		return this.checkSwitchByName("openVoice");
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
	/**
	 * 八王夺帝开关
	 */
	public checkEmperorOpen():boolean
	{
		return this.checkSwitchByName("emperorOpen");
	}
	
	/**
	 * 500元宝赴宴，vip限制开关
	 */
	public checkOpenDinnerLimit():boolean
	{
		return this.checkSwitchByName("openDinnerLimit");
		// return true;
	}

	public checkOpenGDTStatistics():boolean
	{
		return this.checkSwitchByName("openGDTStatistics");
	}
	/**
	 * 贸易开关
	 */
	public checkOpenTrade():boolean
	{
		return this.checkSwitchByName("openTrade");
	}
	/**
	 * 帮会踢人限制和退帮会限制
	 */
	public checkOpenKickLimit():boolean
	{
		return this.checkSwitchByName("openKickLimit");
	}
	//征伐按钮
	public checkOpenConquest():boolean
	{
		return this.checkSwitchByName("openConquest");
	}

	/**
	 * 检测是否使用艺术字
	 */
	public checkOpenBMFont():boolean
	{
		if(PlatformManager.checkIsThSp())
		{
			return false;
		}
		return true;
	}
	

	//新手引导去掉任务引导
	public checkRookieDelTask():boolean
	{
		return this.checkSwitchByName("delTask");
	}
	//获得门客，红颜等分享开关
	public checkOpenShareGate():boolean
	{
		return this.checkSwitchByName("openShareGate");
	}
	//获得门客，红颜等分享是否能获得奖励开关
	public checkOpenShareReward():boolean
	{
		return this.checkSwitchByName("openShareReward");
	}

	//检测红颜是否通过GM开启，true为已开启
	public checkIsWifeLocked(wifeId:string)
	{
		return this.checkSwitchByName("wifeName_"+wifeId ) ;
	}
	//检测门客是否通过GM开启，true为已开启
	public checkIsServantLocked(servantId:string)
	{
		return this.checkSwitchByName( "servant_name"+servantId);
	}
	//检测建筑是否通过GM开启，true为已开启
	public checkIsBuildingState(buildingId:string)
	{
		 return this.checkSwitchByName("building_name"+buildingId ) ;

	}
	//检测称号是否通过GM开启，true为已开启
	public checkIsTitleState(titleId:string)
	{
		return this.checkSwitchByName("title_name"+titleId );
	}

	public checkOpenFriendsSend()
	{
		return this.checkSwitchByName("openFriensSend"); 
	}

	/**
	 * 检测是否打开了私聊功能
	 */
	public openChatType3():boolean
	{
		return this.checkSwitchByName("openChatType3");
	}

	/**
	 * 检测是否打开了跨服聊天功能
	 */
	public openCrossChat():boolean
	{
		return this.checkSwitchByName("openCrossChat");
	}
	
	public checkOpenCrossRank()
	{
		return this.checkSwitchByName("openCrossRank");
	}
	/**是否开启  关闭充值系统  */
	public checkClosePaySys():boolean
	{
		return this.checkSwitchByName("closePaySys");
	}

	//是否开启了帮会建设
	public checkOpenAllianceTask():boolean
	{
		return this.checkSwitchByName("openAllianceTask");
	}

	/**是否开启  亲家系统  */
	public checkopenSadun():boolean
	{
		return this.checkSwitchByName("openSadun");
	}
	/**
	 * 是否开启强制分享
	 */
	public checkOpenForcedShare():boolean
	{
		return this.checkSwitchByName("openForcedShare");
	}
	/**是否开启  玩吧八月签到  */
	public checkOpenAugustsign():boolean
	{
		return this.checkSwitchByName("openAugustsign");
		// return true;
	} 
	
	// 新首充值界面开关，单独页面基于小程序开发 不在福利页面内。
	public checkWeChatFirstcharge():boolean
	{
		return this.checkSwitchByName("weChatFirstcharge"); 
	} 
	/**
	 * 开启新版的月卡和终身卡界面
	 */
	public checkOpenNewMonthCardAndYearCard():boolean
	{
		return this.checkSwitchByName("openNewMonthCardAndYearCard");
	} 
 
	/**是否开启 新光环
	 * id: 1:四大谋士  2:巾帼五虎 3:四答奸臣 4:蛮王 5:五虎上将
	 */
	public checkOpenNewAura(id:string | number):boolean
	{
		return this.checkSwitchByName("openAura"+id);
	}
	
	/**是否开启  气泡  */
	public checkopenBubble():boolean
	{
		return this.checkSwitchByName("openBubble");
	} 

	/**春节的二次弹框开关 */
	public checkOpenNewYearActiveTwoConfirm()
	{
		return this.checkSwitchByName("openNewYearActiveTwoConfirm");
	}

	//根据名字检查是否打开开关
	public checkOpenByName(funcName: string):boolean
	{
		return this.checkSwitchByName(funcName);
	}

	/**
	 * 擂台一键战斗
	 */
	public checkAutoAtkrace():boolean
	{
		return this.checkSwitchByName("openAutoAtkrace");
	}
}
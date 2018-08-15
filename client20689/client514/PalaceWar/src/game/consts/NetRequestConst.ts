/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
namespace NetRequestConst 
{
	// 前端聊天请求类型(不是接口)
	export const REQUEST_CLIENT_CHAT:string = "request_client_chat";
	// 用户登录请求
	export const REQUEST_USER_LOGIIN:string = "user.login";
	// gettoken
	export const HTTP_GETACCESS_TOKEN:string = "getToken";
	// 同步请求
	export const REQUEST_USER_SYNC:string = "user.sync";
	// 门客升级
	export const REQUEST_UPGRADE_SERVANT:string = "servant.upgrade";
	// 门客升级10级
	export const REQUEST_UPGRADE_SERVANT_TEN:string = "servant.upgradeten";

	// 红颜召唤、一键召唤
	export const REQUEST_WIFE_CALL:string = "wife.call";
	// 恢复红颜精力
	export const REQUEST_WIFE_RECOVERENERGY:string = "wife.recoverenergy";
	// 红颜宠幸
	export const REQUEST_WIFE_LOVE:string = "wife.love";
	// 红颜赏赐
	export const REQUEST_WIFE_AWARD:string = "wife.award";
	// 红颜技能升级
	export const REQUEST_WIFE_UPGRADESKILL:string = "wife.upgradeskill";

	// 道具使用
	export const REQUEST_USE_ITEM:string = "item.use";
	// 道具称号装配
	export const REQUEST_ITEM_TITLE:string = "item.title";
	// 商城购买道具
	export const REQUEST_SHOP_BUY_ITEM:string = "shop.buyitem";
	export const REQUEST_SHOP_GETSHOPCFG:string = "shop.getshopcfg";
	
	// 兑换四大谋士
	export const REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE:string = "activity.exchangefourpeople";
	// 牢房惩罚
	export const REQUEST_PRISON_PUNISH:string = "prison.punish";

	/**
	 * 领取首冲奖励
	 */
	export const REQUEST_SHOP_FIRSTCHARGEREWARD:string = "shop.firstchargereward";
	/**
	 * 发起寻访
	 */
	export const REQUEST_SEARCH_PLAY:string = "search.play";
	/**
	 * 使用体力丹
	 */
	export const REQUEST_SEARCH_PILL:string = "search.pill";
	/**
	 * 关卡 发起战斗
	 */
	export const REQUEST_CHALLENGE_ATTACK:string = "challenge.attack";
	/**
	 * 关卡 恢复攻击次数
	 */
	export const REQUEST_CHALLENGE_RECOVER:string="challenge.recover";
	/**
	 * 一键扫荡关卡
	 */
	export const REQUEST_CHALLENGE_AUTOATTACK:string="challenge.autoattack";
	// 扩展子嗣位置
	export const REQUEST_CHILD_ADDPOSNUM:string = "child.addposnum";
	// 修改子嗣名称
	export const REQUEST_CHILD_RENAME:string = "child.rename";
	// 子嗣培养
	export const REQUEST_CHILD_TRAIN:string = "child.train";
	// 子嗣一键培养
	export const REQUEST_CHILD_AUTOTRAIN:string = "child.autotrain";
	// 子嗣一键恢复活力
	export const REQUEST_CHILD_AUTORECOVER:string = "child.autorecover";
	// 恢复活力
	export const REQUEST_CHILD_RECOVER:string = "child.recover";
	// 科举考试/子嗣成年
	export const REQUEST_CHILD_EXAMINATION:string = "child.examination";
	// 处理政务
	export const REQUEST_MANAGE_DEALAFFAIR:string = "manage.dealaffair";
	// 使用政务令
	export const REQUEST_MANAGE_ADDAFFAIR:string = "manage.addaffair";
	/**
	 * 经营资产
	 */
	export const REQUEST_MANAGE_DEALFINANCE:string = "manage.dealfinance";
	/**
	 * 一键经营资产
	 */
	export const REQUEST_MANAGE_BATCHDEALFINANCE:string = "manage.batchdealfinance";

	// 使用征收令
	export const REQUEST_MANAGE_ADDFINANCE:string = "manage.addfinance";
	// 领取主线任务奖励
	export const REQUEST_TASK_GETMAINTASK:string = "task.getmaintask";
	// 领取每日任务奖励
	export const REQUEST_TASK_GETDAILYTASK:string = "task.getdailytask";
	// 领取活跃奖励
	export const REQUEST_TASK_GETLIVENESS:string = "task.getliveness";
	/**
	 * 获取离线奖励
	 */
	export const REQUEST_MANAGE_AUTOFINANCE:string="manage.autofinance";

	/**
	 * 获取离线资源和当前经营信息
	 */
	export const REQUEST_MANAGE_GETAUTOANDFINANCE:string="manage.getautoandfinance";
	//玩家升官
	export const REQUEST_USER_UPGRADE:string="user.upgrade";

	//检测游戏名称是否存在
	export const REQUEST_USER_CHECKNAME:string="user.checkname";
	
	//修改游戏名称
	export const REQUEST_USER_CHANGENAME:string="user.changename";

	//创建游戏角色
	export const REQUEST_USER_CREATEUSER:string="user.createuser";

	/**
	 * 聊天加密
	 */
	export const REQUEST_CHAT_ENCRYPT:string="chat.encrypt";
	
	/**
	 * 排行榜相关接口
	 */
	export const REQUEST_RANK_INDEX:string="rank.index";
	export const REQUEST_RANK_VISIT:string="rank.visit";
	export const REQUEST_RANK_USERSHOT:string="rank.usershot";


	/**
	 * 媒婆榜相关接口
	 */
	/**
	 * 定向提亲
	 */
	export const REQUEST_RADULT_PROPOSE:string="adult.propose";

	/**
	 * 全服提亲
	 */
	export const REQUEST_RADULT_PROPOSEALL:string="adult.proposeall";


	/**
	 * 获取向我提亲信息
	 */
	export const REQUEST_RADULT_GETPROPOSEE:string="adult.getpropose";

	/**
	 * 获取区服所有的提亲信息
	 */
	export const REQUEST_RADULT_GETALLPROPOSE:string="adult.getallpropose";

	/**
	 * 同意联姻
	 */
	export const REQUEST_RADULT_AGREEPROPOSE:string="adult.agreepropose";


	/**
	 * 取消提亲
	 */
	export const REQUEST_RADULT_CANCELPROPOSE:string="adult.cancelpropose";

	/**
	 * 一键/拒绝提亲请求
	 * 
	 */
	export const REQUEST_RADULT_REFUSEPROPOSE:string="adult.refusepropose";

	/**
	 * 获取媒婆结婚信息
	 */
	export const REQUEST_RADULT_GETADULTINFO:string="adult.getadultinfo";


	/**
	 * 每日任务相关接口
	 */
	export const REQUEST_DAILYTASK_GET:string="task.getdailytask";
	export const REQUEST_DAILYLIVENESS_GET:string="task.getliveness";
	export const REQUEST_DAILYTASK_GETLIVENESS:string="task.getliveness";

	/**
	 * 我的邮件列表
	 */
	export const REQUEST_MAIL_GET_MYMAILLIST:string = "mail.getmymaillist";
	/**
	 * 查看邮件的详细内容
	 */
	export const REQUEST_MAIL_GET_DETAIL:string = "mail.getdetail";
	/**
	 * 获取邮件中的附件奖励
	 */
	export const REQUEST_MAIL_GET_REWARDS:string = "mail.getrewardsbymail";
	

	/**
	 * 皇宫接口
	 * "获取皇宫具体信息",
	 * "领取俸禄",
	 * "修改签名",
	 */ 
	export const REQUEST_PALACE_GETPALACEINFO:string="palace.getpalaceinfo";
	export const REQUEST_PALACE_GETSALARY:string="palace.getsalary";
	export const REQUEST_PALACE_SIGN:string="palace.sign";
	/**
	 * 宴会接口
	 */
	export const REQUEST_DINNER_GETDINNER:string="dinner.getdinner";
	export const REQUEST_DINNER_GETDINNERDETAIL:string="dinner.getdinnerdetail";
	export const REQUEST_DINNER_JOINDINNER:string="dinner.joindinner";
	export const REQUEST_DINNER_CREATDINNER:string="dinner.createdinner";
	export const REQUEST_DINNER_CANVIEWDINNER:string="dinner.canviewdinner";
	export const REQUEST_DINNER_FEFRESHITEM:string="dinner.refreshitem";
	export const REQUEST_DINNER_SHOPITEM:string="dinner.shopitem";
	export const REQUEST_DINNER_SCOREDINNER:string="dinner.scoretoitem";
	export const REQUEST_DINNER_HISTORY:string="dinner.history";
	export const REQUEST_DINNER_TOP:string="dinner.top";
	export const REQUEST_DINNER_SHAREDINNER:string="dinner.sharedinner";
	export const REQUEST_DINNER_USEITEM:string="dinner.useitem";

	/**
	 * 签到接口
	 */
	export const REQUEST_USER_ARRIVAL:string = "user.arrival";

	/**
	 * 获取活动配置
	 */
	export const REQUEST_ACTIVITY_GETACTIVECFG:string="activity.getactivecfg";

	/**
	 * 领取成就奖励
	 */
	export const REQUEST_ACHIEVEMENT_GETREWARDS:string="achievement.getrewards";
	/**
	 * 充值接口
	 */
	export const REQUEST_PAY_RROCCESSPAYMENT:string = "pay.processpayment";

	/**
	 * 冲榜活动获取排行榜
	 */
	 export const REQUEST_ACTIVITY_GETRANKACTIVE:string="activity.getrankactive";
	 /**
	  * 充值活动接口
	  "领取每日充值活动奖励",
	  参数 activeId 活动ID  rkey 领取的是第几档
	  参数 activeId 活动ID  rkey 领取的是第几档
	  */
	  export const REQUEST_RECHARGE_GETDAILYREWARD:string = "activity.getdailychargereward";
	  export const REQUEST_RECHARGE_GETTOTALDAILYREWARD:string = "activity.gettotaldayrechargereward";
	  export const REQUEST_RECHARGE_GETTOTALREWARD:string = "activity.gettotalrechargereward";

	  /**
	   * 狂欢节活动
	   * 狂欢节充值
	   * 狂欢节消费
	   * 参数
	   *	参数 activeId 活动ID  rkey 领取的是第几档
	   *	参数 activeId 活动ID  rkey 领取的是第几档
	   */
	  export const REQUEST_ACTIVITY_GETCARNIVALCHARGE = "activity.getcarnivalcharge";
	  export const REQUEST_ACTIVITY_GETCARNIVALCOST = "activity.getcarnivalcost";

	  /**
	   * 米莎来了活动
	   * 
	   */
	  export const REQUEST_ACTIVITY_GETWIFECOMEREWARD = "activity.getwifecomereward";

	 /**
	  * 领取限时活动奖励
	  */
	export const REQUEST_ACTIVITY_GETLIMITEDREWARD:string = "activity.getlimitedreward";
	/**
	  * 领取vip奖励
	  */
	export const REQUEST_VIP_VIPWELFARE:string = "shop.vipwelfare";
	/**
	  * 兑换礼包码
	  */
	export const REQUEST_USER_EXCHANGECARD:string = "user.exchangecard";

	export const REQUEST_SERVANT_UPABILITY:string = "servant.upability";
	
	export const REQUEST_SERVANT_UPSKILL:string = "servant.upskill";

	/**
	 * 获取惩戒女囚活动信息
	 */
	 export const REQUEST_ACTIVITY_GETPUNISHACTIVE:string="activity.getpunishactive";
	/**
	 * 西域商店
	 */
	 export const ACTIVITY_BUYVIPSHOP:string = "activity.buyvipshop";	
	
	 /**
	 * 春季庆典 春季典庆-春季送礼"
	 */
	 export const ACTIVITY_GETSPRINGITEMA:string = "activity.getspringitema";	

	 /**
	 * 春季庆典 春季典庆-春季兑换"
	 */
	 export const ACTIVITY_GETSPRINGITEMB:string = "activity.getspringitemb";	
	
	 /**
	 * 春季庆典 春季典庆-踏青狂欢"
	 */
	 export const ACTIVITY_GETSPRINGITEMC:string = "activity.getspringitemc";	
	  
	  /**
	 * 春季庆典 春季典庆-折扣特惠"
	 */
	 export const ACTIVITY_GETSPRINGITEMD:string = "activity.getspringitemd";	

	 

	 /**
	 * 购买惩戒道具
	 */
	 export const REQUEST_ACTIVITY_BUYPUNISHITEM:string="activity.buypunishitem";

	 /**
	 * 使用惩戒道具
	 */
	 export const REQUEST_ACTIVITY_USEPUNISHITEM:string="activity.usepunishitem";
	 export const REQUEST_ACTIVITY_AUTOPUNISH:string = "activity.autopunish";

	 /**
	 * 使用积分购买活动商店物品
	 */
	 export const REQUEST_ACTIVITY_BUYPUNISHSHOP:string="activity.buypunishshop";
	/**
	 * 领取击杀奖励
	 */
	 export const REQUEST_ACTIVITY_GETPUNISHREWARD:string="activity.getpunishreward";


	 /**
	 * 领取奖励春节攀升
	 */
	 export const REQUEST_ACTIVITY_GETNEWYEARREWARD:string="activity.getnewyearreward";

	/**
	 * 领取奖励春节攀升 每天第一个元宝购买任务
	 */
	 export const REQUEST_ACTIVITY_BUYNEWYEARGIFT:string="activity.buynewyeargift";
	
	 /**
	 * 领取解锁功能奖励
	 */
	 export const  REQUEST_OTHERINFO_GETUNLOCKLISTREWARD:string="otherinfo.getunlocklistreward";

	 /**
	 * 领取实名认证奖励（非3k）
	 */
	 export const  REQUEST_OTHERINFO_GETCERTIFICATION:string="otherinfo.getcertification";




	 export const REQUEST_SERVANT_UPAURA:string = "servant.upaura";
	 export const REQUEST_SERVANT_CHANGE:string = "servant.change";
	/**
	 * 设置自动捐款信息
	 */
	export const REQUEST_SEARCH_SET:string="search.set";

	/**
	 * vip免费/花费捐款信息接口
	 */
	export const REQUEST_SEARCH_BUY:string="search.buy";

	/**
	 * 擂台接口
	 */
	export const REQUEST_ATKRACE_INDEX:string="atkrace.index";
	export const REQUEST_ATKRACE_ATTRBUY:string="atkrace.attrbuy";
	export const REQUEST_ATKRACE_FIGHT:string="atkrace.fight";
	export const REQUEST_ATKRACE_REVENGE:string="atkrace.revenge";
	export const REQUEST_ATKRACE_KILL:string="atkrace.kill";
	export const REQUEST_ATKRACE_CHALLENGE:string="atkrace.challenge";
	export const REQUEST_ATKRACE_RANDREWARD:string="atkrace.randreward";
	export const REQUEST_ATKRACE_GETINFO:string="atkrace.getinfo";
	export const REQUEST_ATKRACE_LIST:string="atkrace.list";
	export const REQUEST_ATKRACE_RANK:string="atkrace.rank";
	export const REQUEST_ATKRACE_HANDLE:string="atkrace.handle";
	export const REQUEST_ATKRACE_ATTRBUYLIST:string="atkrace.attrlist";
	export const REQUEST_ATKRACE_GETMODEL:string="atkrace.getmodel";
	export const REQUEST_ATKRACE_USEEXTRA:string="atkrace.useextra";
	export const REQUEST_ATKRACE_REFRESH:string="atkrace.refresh";

	/**
	 * 跨服擂台接口
	 */
	export const REQUEST_ATKRACECROSS_INDEX:string="atkraceg.index";
	export const REQUEST_ATKRACECROSS_ATTRBUY:string="atkraceg.attrbuy";
	export const REQUEST_ATKRACECROSS_FIGHT:string="atkraceg.fight";
	export const REQUEST_ATKRACECROSS_REVENGE:string="atkraceg.revenge";
	export const REQUEST_ATKRACECROSS_KILL:string="atkraceg.kill";
	export const REQUEST_ATKRACECROSS_CHALLENGE:string="atkraceg.challenge";
	export const REQUEST_ATKRACECROSS_RANDREWARD:string="atkraceg.randreward";
	export const REQUEST_ATKRACECROSS_GETINFO:string="atkraceg.getinfo";
	export const REQUEST_ATKRACECROSS_LIST:string="atkraceg.list";
	export const REQUEST_ATKRACECROSS_RANK:string="atkraceg.rank";
	export const REQUEST_ATKRACECROSS_HANDLE:string="atkraceg.handle";
	export const REQUEST_ATKRACECROSS_ATTRBUYLIST:string="atkraceg.attrlist";
	export const REQUEST_ATKRACECROSS_GETMODEL:string="atkraceg.getmodel";
	export const REQUEST_ATKRACECROSS_USEEXTRA:string="atkraceg.useextra";
	export const REQUEST_ATKRACECROSS_REFRESH:string="atkraceg.refresh";
	export const REQUEST_ATKRACECROSS_GETACTIVITYATK:string="atkraceg.getactivityatk";
	
	/**
	 * 获取道具合成配置
	 */
	export const REQUEST_ITEM_GETCOMPOSE:string="item.getcompose";

	/**
	 * 获取道具合成配置
	 */
	export const REQUEST_ITEM_GETMODEL:string="item.getmodel";

	

	/**
	 * 合成道具
	 */
	export const REQUEST_ITEM_DOCOMPOSE:string="item.docompose"
	/**
	 * 联盟模块
	 */
	export const REQUEST_ALLIANCE_INITALLIANCE:string="alliance.initalliance"
	export const REQUEST_ALLIANCE_CREATEALLIANCE:string="alliance.createalliance"
	export const REQUEST_ALLIANCE_JOINRANDALLIANCE:string="alliance.joinrandalliance"
	export const REQUEST_ALLIANCE_FINDALLIANCE:string="alliance.findalliance"
	export const REQUEST_ALLIANCE_GETALLIANCELIST:string="alliance.getalliancelist"
	export const REQUEST_ALLIANCE_APPLYALLIANCE:string="alliance.applyalliance"
	export const REQUEST_ALLIANCE_CANCELAPPLY:string="alliance.cancelapply"
	export const REQUEST_ALLIANCE_ACCEPT:string="alliance.accept"
	export const REQUEST_ALLIANCE_REFUSEAPPLY:string="alliance.refuseapply"
	export const REQUEST_ALLIANCE_REFUSEALLAPPLY:string="alliance.refuseallapply"
	export const REQUEST_ALLIANCE_RENAME:string="alliance.rename"
	export const REQUEST_ALLIANCE_MODINFO:string="alliance.modinfo"
	export const REQUEST_ALLIANCE_SETSWITCH:string="alliance.setswitch"
	export const REQUEST_ALLIANCE_EXITALLIANCE:string="alliance.exitalliance"
	export const REQUEST_ALLIANCE_GETALLIANCEAPPLY:string="alliance.getallianceapply"
	export const REQUEST_ALLIANCE_GETMEMBER:string="alliance.getmember"
	export const REQUEST_ALLIANCE_SETPOS:string="alliance.setpos"
	export const REQUEST_ALLIANCE_GETDETAILS:string="alliance.getdetails"
	export const REQUEST_ALLIANCE_TRANSFER:string="alliance.transfer"
	export const REQUEST_ALLIANCE_KICKALLIANCE:string="alliance.kickalliance"
	export const REQUEST_ALLIANCE_DISBAND:string="alliance.disband"
	export const REQUEST_ALLIANCE_DONATE:string="alliance.donate"
	export const REQUEST_ALLIANCE_SHOPBUY:string="alliance.shopbuy"

	export const REQUEST_ALLIANCE_ATTACK:string="alliance.attack"
	export const REQUEST_ALLIANCE_OPENBOSS:string="alliance.openboss"
	export const REQUEST_ALLIANCE_RECOVER:string="alliance.recover"
	export const REQUEST_ALLIANCE_GETBOSSLOG:string="alliance.getbosslog"
	export const REQUEST_ALLIANCE_GETBOSSRANK:string="alliance.getbossrank"
	
	/**
	 * "书院入席学习接口",
	 */
	export const REQUEST_BOOKROOM_STUDY:string = "bookroom.study";
	/**
	 * "书院学习(一键)完成接口",
	 */
	export const REQUEST_BOOKROOM_FINISH:string = "bookroom.finish";
	/**
	 * "书院购买席位接口",
	 */
	export const REQUEST_BOOKROOM_BUY:string = "bookroom.buy";

	/**
	 * 练武场相关接口
	 */
	export const REQUEST_STUDYATK_INDEX:string="studyatk.index";
	export const REQUEST_STUDYATK_CREATE:string="studyatk.create";
	export const REQUEST_STUDYATK_JOIN:string="studyatk.join";
	export const REQUEST_STUDYATK_GOAWAY:string="studyatk.goaway";
	export const REQUEST_STUDYATK_GETATKDETAIL:string="studyatk.getatkdetail";
	export const REQUEST_STUDYATK_GETATK:string="studyatk.getatk";
	export const REQUEST_STUDYATK_UPGRADE:string="studyatk.upgrade";

	/**
	 * 副本 获取基本信息
	 */
	export const REQUEST_DAILYBOSS_GET:string="dailyboss.get";

	/**
	 * 副本 购买商店信息
	 */
	export const REQUEST_DAILYBOSS_BUY:string="dailyboss.buy";

	/**
	 * 获取副本排行榜
	 */
	export const REQUEST_DAILYBOSS_GETRANK:string="dailyboss.getrank";

	/**
	 * 获取副本具体详细信息
	 */
	export const REQUEST_DAILYBOSS_GETDETAILS:string="dailyboss.getdetails";

	/**
	 * 副本 攻击
	 */
	export const REQUEST_DAILYBOSS_ATTACK:string="dailyboss.attack";

	/**
	 * 副本 恢复攻击次数
	 */
	export const REQUEST_DAILYBOSS_RECOVER:string="dailyboss.recover";

	/**
	 * 副本 获取蛮王伤害排行榜
	 */
	export const REQUEST_DAILYBOSS_GETATTACKRANK:string="dailyboss.getattackrank";

	/**
	 * 玩吧发送桌面奖励
	 */
	export const REQUEST_OTHERINFO_GETWBSENDREWARD:string="otherinfo.getwbsendreward";

	/**
	 * 玩吧每日分享奖励
	 */
	export const REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD:string="otherinfo.getwbdailysharereward";

	/**
	 * 领取手机绑定奖励
	 */
	export const REQUEST_OTHERINFO_GETBINDREWARD:string = "otherinfo.getbindreward";
	/**
	 * 领取实名认证奖励
	 */
	export const REQUEST_OTHERINFO_GETAUTHOR3KREWARD:string = "otherinfo.getauthor3kreward";
	/**
	 * 修改形象
	 */
	export const REQUEST_USER_CHANGEPIC:string = "user.changepic";

	/**
	 * 分阶段引导记录
	 */
	export const REQUEST_USER_STEPGUILD:string = "user.stepguild";
	/**
	 * 征伐接口
	 */
	export const REQUEST_CONQUEST_INDEX:string = "conquest.index";
	export const REQUEST_CONQUEST_FIGHT:string = "conquest.fight";
	export const REQUEST_CONQUEST_RANK:string = "conquest.rank";
	export const REQUEST_CONQUEST_BATCHFIGHT:string = "conquest.batchfight";

	//"通商随机对手接口",
	//"通商战斗接口",
	//"通商排行榜接口",
	//"一键通商战斗接口",
	export const REQUEST_TRADE_INDEX:string = "trade.index";
	export const REQUEST_TRADE_FIGHT:string = "trade.fight";
	export const REQUEST_TRADE_RANK:string = "trade.rank";
	export const REQUEST_TRADE_BATCHFIGHT:string = "trade.batchfight";

	//玩吧领取糖果活动奖励
	export const REQUEST_OTHERINFO_GETCANDYREWARD:string = "otherinfo.getcandyreward";
	//疯狂游乐场关注领取奖励
	export const REQUEST_OTHERINFO_GETFKFOCUSREWARD:string = "otherinfo.getfkfocusreward";
	//疯狂游乐场分享成功
	export const REQUEST_OTHERINFO_FKSHARE:string = "otherinfo.fkshare";
	//疯狂游乐场领取分享奖励
	export const REQUEST_OTHERINFO_GETFKSHAREREWARD:string = "otherinfo.getfksharereward";

	//获取玩吧积分奖励
	export const REQUEST_OTHERINFO_GETWBSCOREREWARD:string = "otherinfo.getwbscorereward";

	//新手引导步骤记录
	export const REQUEST_USER_NEWERGUILD:string = "user.newerguild";
	//记录门客排序id
	export const REQUEST_OTHER_RECORDSERVANTSORT:string = "otherinfo.recordservantsort";

	//宫廷裁缝抽奖,兑换皮肤
	export const REQUEST_OTHER_ACTIVITY_USETAILOR:string = "activity.usetailor";
	export const REQUEST_OTHER_ACTIVITY_USETENTAILOR:string = "activity.usetentailor";
	export const REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN:string = "activity.exchangeskin";

	//红颜装配皮肤
	export const REQUEST_WIFE_EQUIP:string = "wife.equip";
	export const REQUEST_WIFE_READSKINRED:string = "wife.readskinred";

	/**
	 * 跨服领取活动奖励
	 */
	export const REQUEST_ATKRACEG_WINZIDREWARD:string = "atkraceg.winzidreward";
	
	/**
	 * 邀请好友领取人数奖励接口
	 */
	export const REQUEST_INVITE_GETINVITEREWARD:string = "invite.getinvitereward";
	
	/**
	 * 邀请好友领取权势奖励接口
	 */
	export const REQUEST_INVITE_GETPOWERREWARD:string = "invite.getpowerreward";
	/**
	 * 邀请好友领取充值奖励接口
	 */
	export const REQUEST_INVITE_GETRECHARGEREWARD:string = "invite.getrechargereward";
	/**
	 * 邀请好友,获取数据
	 */
	export const REQUEST_INVITE_GETINFO:string = "invite.getinfo";

	//聊天屏蔽
	export const REQUEST_CHAT_LIST:string = "chat.list";
	export const REQUEST_CHAT_BLOCK:string = "chat.block";
	export const REQUEST_CHAT_UNBLOCK:string = "chat.unblock";

	export const REQUEST_ACTIVITY_EXCHANGEWIFE:string="activity.exchangewife";
	export const REQUEST_USER_GETKFMSG:string="user.getkfmsg";
	export const REQUEST_USER_GETKFCARDMSG:string="user.getkfcardmsg";

	export const REQUEST_PALACE_GETCROSSPALACE:string="palace.getcrosspalace";
	export const REQUEST_PALACE_GETPALACERANK:string="palace.getpalacerank";

	//称帝
	export const REQUEST_PRESTIGE_INDEX:string = "prestige.index";
	/**
	 * 设置cover成功
	 */
	export const REQUEST_OTHERINFO_SETCOVER:string = "otherinfo.setcover";
	/**
	 * 领取cover奖励
	 */
	export const REQUEST_OTHERINFO_GETCOVERREWARD:string = "otherinfo.getcoverreward";
	/**
	 * 领取绑定有礼奖励
	 */
	export const REQUEST_OTHERINFO_GETGTFBREWARD:string = "otherinfo.getgtfbreward";
	/*
	 *五一活动
	 */
	export const REQUEST_ACTIVITY_GETMAYDAYITEMA : string = "activity.getmaydayitema";//"五一转盘领取次数奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYITEMB : string = "activity.getmaydayitemb";//"五一转盘充值奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYITEMC : string = "activity.getmaydayitemc";//"五一转盘任务奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYRANK : string = "activity.getmaydayrank";//五一转盘排行榜
	export const REQUEST_ACTIVITY_GETMAYDAYLOTTERY : string = "activity.getmaydaylottery";//五一转盘抽奖

	/**
	 * 修身
	 */
	export const REQUEST_REQUEST_INDEX :string="practice.index";
	export const REQUEST_REQUEST_UPGRADE :string="practice.upgrade";
	export const REQUEST_REQUEST_UNLOCK :string="practice.unlock";
	export const REQUEST_REQUEST_COLLECT :string="practice.collect";
	export const REQUEST_PRACTICE_UPSTORAGE :string="practice.upstorage";
	/**
	 * 册封
	 */
	export const REQUEST_WIFESTATUS_CONFER :string="wifestatus.confer";
	export const REQUEST_WIFESTATUS_AUTOCONFER :string="wifestatus.autoconfer";

	/*
	 *跨服亲密
	 */
	export const REQUEST_ACTIVITY_CROSSIMACY_PRANK : string = "imacy.prank";//个人排行
	export const REQUEST_ACTIVITY_CROSSIMACY_ZRANK : string = "imacy.zrank";//跨服区排行
	export const REQUEST_ACTIVITY_CROSSIMACY_AWARD : string = "imacy.winzidreward";//跨服区排行
	export const REQUEST_ACTIVITY_GERACTIVITYIMACY : string = "imacy.getactivityimacy";

	export const REQUEST_REQUEST_BUY :string="practice.buy";

	/*
	 *称帝战
	 */
	export const REQUEST_EMPEROR_GETACTIVE : string = "emperor.getactive";//个人排行
}
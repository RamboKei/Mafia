/**
 * author 陈可
 * date 2017/9/11
 * @class ViewConst
 */
namespace ViewConst
{
	/**
	 * 全屏界面，继承commView的界面
	 */
	export namespace COMMON
	{
		/** 用户信息界面 */
		export const PLAYERVIEW:string = "PlayerView";
		/** 打开道具 */
		export const ITEMVIEW_TAB1:string = "ItemView";
		export const ITEMVIEW_TAB2:string = "ItemView|1";
		export const ITEMVIEW_TAB3:string = "ItemView|2";
		/**打开红颜已迎娶 */
		export const WIFEVIEW_TAB1:string = "WifeView|1";
		/**打开红颜未迎娶 */
		export const WIFEVIEW_TAB2:string = "WifeView|2";
		export const WIFEUNLOCKVIEW:string = "WifeUnLockView";
		export const WIFESTATUSVIEW:string = "WifestatusView";

		/**
		 * 称帝界面 纪录
		 */
		// export const MONARCHRECORDdVIEW:string="MonarchRecordView";
		
		// /**
		//  * 称帝界面
		//  */
		// export const MONARCHVIEW:string="MonarchView";
		/**
		 * 经营界面
		 */
		export const MANAGEVIEW:string="ManageView";

		/**
		 * 关卡界面
		 */
		export const CHALLENGEVIEW:string="ChallengeView";

		//门客
		export const SERVANTVIEW:string="ServantView";
		export const SERVANTINFOVIEW:string="ServantInfoView";

		//升官
		export const PROMOTIONVIEW:string="PromotionView";
		/**升官成功 */
		export const PROMOTIONSUCCESSVIEW:string="PromotionSuccessView";

		//政务
		export const AFFAIRVIEW:string="AffairView";
		
		//红颜操作
		export const WIFEOPTVIEW:string="WifeOptView";

		/**
		 * 子嗣
		 */
		export const CHILDVIEW:string="ChildView";

		/**
		 * 创建角色
		 */
		export const GUIDECREATEUSERVIEW:string="GuideCreateUserView";

		/**
		 * 排行
		 */
		export const RANKVIEW:string="RankView";

		/**
		 * 聊天
		 */
		export const CHATVIEW:string="ChatView";
		/**
		 * 帮会聊天
		 */
		export const CHATVIEWTAB1:string="ChatView|1";
		
		/**
		 * 媒婆界面
		 */
		export const ADULTVIEW:string="AdultView";
		/**商店热卖页签 */
		export const SHOPVIEW_TAB1:string="ShopView";
		
		/**商店特惠礼包页签 */
		export const SHOPVIEW_TAB2:string="ShopView|1";
		/**商店道具页签 */
		export const SHOPVIEW_TAB3:string="ShopView|2";
		
		/**
		 * 提亲列表界面
		 */
		export const ADULTMARRYVIEW:string="AdultMarryView";

		/**
		 * 每日任务
		 */
		export const DAILYTASKVIEW:string="DailyTaskView";
		/**
		 * 充值界面
		 */
		// export const RECHARGEVIEW:string="RechargeView";

		/**
		 * vip界面
		 */
		export const VIPVIEW:string="VipView";
		/**
		 * 福利界面--首冲
		 */
		export const WELFAREVIEWFIRSTRECHARGE:string = "WelfareView|FirstRecharge";
		/**
		 * 福利界面--微信关注
		 */
		export const WELFAREVIEWOFFICIALWECHAT:string = "WelfareView|OfficialWeChat";
		/**
		 * 福利界面--签到
		 */
		export const WELFAREVIEWSIGNIN:string = "WelfareView|Signin";
		/**
		 * 福利界面--实名
		 */
		export const WELFAREVIEWREALNAME:string = "WelfareView|Realname";
		/**
		 * 福利界面--功能介绍
		 */
		export const WELFAREVIEWFUNCTIONPREVIEW :string = "WelfareView|FunctionPreview";
		/**
		 * 福利界面--q群福利
		 */
		export const WELFAREVIEWQGROUP :string = "WelfareView|Qgroup";
		/**
		 * 福利界面--1.5倍返利
		 */
		export const WELFAREVIEWREBATE :string = "WelfareView|Rebate";

		

		
		/**
		 * 四大谋士
		 */
		export const ACFOURPEOPLEVIEW:string = "AcFourPeopleView";

		/**
		 * 春季庆典
		 */
		export const ACSPRINGCELEBRATE:string = "AcSpringCelebrateView";
		export const ACSPRINGCELEBRATE_TAB1:string = "AcSpringCelebrateView|1";
		export const ACSPRINGCELEBRATE_TAB2:string = "AcSpringCelebrateView|2";
		export const ACSPRINGCELEBRATE_TAB3:string = "AcSpringCelebrateView|3";
		export const ACSPRINGCELEBRATE_TAB4:string = "AcSpringCelebrateView|4";
		/**
		 * 充值＋特权
		 */
		export const RECHARGEVIPVIEW:string = "RechargeVipView";
		export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
		/**
		 * 福利界面--月卡
		 */
		export const WELFAREVIEWMONTHCARD:string = "WelfareView|MonthCard";
		/**
		 * 福利界面--终身卡
		 */
		export const WELFAREVIEWYEARCARD:string = "WelfareView|YearCard";
		/**
		 * 福利界面--天恩赐福
		 */
		export const WELFAREVIEWGODBLESS:string = "WelfareView|GodBless";

		/**
		 * 福利界面--12
		 */
		export const WELFAREVIEWRECHARGEBOX:string = "WelfareView|RechargeBox";
		/**
		 * 成就界面
		 */
		export const ACHIEVEMENTVIEW:string="AchievementView";
		/**
		 * 公告
		 */
		export const GAMEANNOUNCEMENtVIEW:string="GameAnnouncementView";
		/**
		 * 感恩回馈
		 */
		export const THANKSGIVINGVIEW:string="ThanksgivingView";
		/**
		 * 牢房
		 */
		export const PRISONVIEW:string="PrisonView";
		 
 

		export const ACRANKACTIVEVIEW:string="AcRankActiveView";

	
		/**
		 *  宴会详情界面
		 */
		export const DINNERDETAILVIEW:string="DinnerDetailView";

		/**
		 *  宴会奖励界面
		 */
		export const DINNERREWARDVIEW:string="DinnerRewardView";

		/**
		 * 充值奖励
		 */
		export const ACRECHARGEVIEW:string="AcRechargeView";

		/**
		 * 神秘商店
		 */
		export const ACVIPSHOPVIEW:string="AcVipShopView";

		/**
		 * 春节攀升
		 */
		export const ACNEWYEARVIEW:string="AcNewYearView";
		export const ACNEWYEARVIEW_TAB1:string="AcNewYearView|1";
		export const ACNEWYEARVIEW_TAB2:string="AcNewYearView|2";
		// export const ACNEWYEARVIEWTAB2:string="AcNewYearViewTab2";

		


		// export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
	
		

		

		/**
		 *  惩戒女囚界面
		 */
		export const ACPUNISHVIEW:string="AcPunishView";

		/**
		 *  擂台主界面
		 */
		export const ATKRACEVIEW:string="AtkraceView";

		export const ATKRACEARRESTVIEW:string="AtkraceArrestView";

		/**
		 *  擂台/来访消息
		 */
		export const ATKRACEVISITVIEW:string="AtkraceVisitView";
		/**
		 *  跨服擂台/来访消息
		 */
		export const ATKRACECROSSVISITVIEW:string="AtkraceCrossVisitView";
		
		/**
		 *  擂台/排行榜
		 */
		export const ATKRACERANKLISTVIEW:string="AtkraceRankListView";
			

		/**
		 *  军团主界面
		 */
		export const ALLIANCEVIEW:string="AllianceView";

		/**
		 *  没有军团界面
		 */
		export const ALLIANCECREATEVIEW:string="AllianceCreateView";
		export const BOOKROOMVIEW:string = "BookroomView";

		/**
		 * 练武场
		 */
		export const STUDYATKDETAILVIEW:string = "StudyatkDetailView";

		/**
		 * 练武场战斗
		 */
		export const STUDYBATTLEVIEW:string="StudyatkBattleView";
		export const STUDYATKVIEW:string = "StudyatkView"

		/**
		 * 征伐
		 */
		export const CONQUESTVIEW:string = "ConquestView";

		export const TRADEVIEW:string = "TradeView";
		export const TRADERANKLISTVIEW:string = "TradeRankListView";

		/**
		 * 跨服擂台 
		 */
		
		export const ATKRACECROSSSUMMARYVIEW:string = "AtkracecrossSummaryView";
		export const ATKRACECROSSVIEW:string = "AtkracecrossView";
		export const ATKRACECROSSCHALLENGEVIEW:string="AtkraceCrossChallengeView";
		export const ATKRACECROSSRANKLISTVIEW:string="AtkraceCrossRankListView";
		export const ATKRACECROSSARRESTVIEW:string="AtkracecrossArrestView";
		export const ATKRACECROSSACTIVITYREWARDVIEW:string="AtkracecrossActivityRewardView";

		
		/**
		 * 贸易战斗
		 */
		export const TRADEFIGHTVIEW:string = "TradeFightView";
		/**
		 * 贸易胜利
		 */
		export const TRADEINFOPOPUPVIEW:string = "TradeInfoPopupView";
		
		/**
		 * 宫廷皮肤兑换
		 */
		export const ACTAILOREXCHANGEVIEW:string="AcTailorExchangeView";

		export const CHATBLOCKVIEW:string="ChatblockView";
		
		export const ACWISHTREEEXCHANGEVIEW:string = "AcWishTreeExchangeView";
		/**
		 * 寻访
		 */
		export const SEARCHVIEW:string = "SearchView";
		/**
		 * 称帝
		 */
		export const PRESTIGEVIEW:string = "PrestigeView";
		export const PALACEHOUSEVIEW:string = "PalaceHouseView";
		export const PALACECROSSVIEW:string = "PalaceCrossView";
		export const PALACEVIEW:string = "PalaceView";
		export const PALACEHOUSEGROUPVIEW:string = "PalaceHouseGroupView";
		/**
		 * 修身
		 */
		export const PRACTICEVIEW:string="PracticeView";
		export const PRACTICEABILITYVIEW:string="PracticeAbilityView";
		/*
		*跨服亲密活动主界面
		*/
		export const ACCROSSSERVERINTIMACYENTERVIEW:string="AcCrossServerIntimacyEnterView";
		/**
		 * 称帝战
		*/
		export const EMPERORWARENTERVIEW:string="EmperorWarEnterView";	
		
	}

	/**
	 * 小弹窗，继承popupview的界面
	 */
	export namespace POPUP
	{

		/** 分享奖励面板 */
		export const SHAREPOPUPVIEW:string = "SharePopupView";
		/** 公共奖励面板 */
		export const COMMONREWARDPOPUPVIEW:string = "CommonRewardPopupView";
		/** 道具、物品详情弹板 */
		export const ITEMINFOPOPUPVIEW:string = "ItemInfoPopupView";
		/** 使用道具弹板 */
		export const ITEMUSEPOPUPVIEW:string = "ItemUsePopupView";
		/** 道具跳转弹板 */
		export const ITEMJUMPPOPUPVIEW:string = "ItemJumpPopupView";
		/**错误弹板 *
		export const ERRORPOPUPVIEW:string = "ErrorPopupView";
		/**规则说明弹板 */
		export const RULEINFOPOPUPVIEW:string = "RuleInfoPopupView";
		//门客详情
		export const SERVANTATTRDETAILPOPUPVIEW:string="ServantAttrDetailPopupView";

		/**
		 * 离线自动获得资源弹窗
		 */
		export const AUTORESPOPUPVIEW:string="AutoResPopupView";
		/**选择门客界面 */
		export const SERVANTSELECTEDPOPUPVIEW:string = "ServantSelectedPopupView";
		/**西域商店VIP不足弹窗 */
		export const ACVIPSHOPPOPUPVIEW:string = "AcVipShopPopupView";
		
		/**
		 *  擂台挑战
		 */
		export const ATKRACECHALLENGEVIEW:string="AtkraceChallengeView";
		/**
		 *  跨服擂台挑战
		 */
		export const ATKRACECROSSCHALLENGEVIEW:string="AtkraceCrossChallengeView";
		
		/**使用道具确认取消弹板 */
		export const ITEMUSECONSTPOPUPVIEW:string = "ItemUseConstPopupView";

		/**
		 * 确认是否消耗元宝购买物品提示弹出框
		 */
		export const COSTGEMBUYITEMPOPUPVIEW:string = "CostGemBuyItemPopupView";
		/**
		 * 查看寻访建筑信息弹窗
		 */
		export const SEARCHBUILDPOPUPVIEW:string="SearchBuildPopupView";

		/**
		 * 寻访结果弹窗
		 */
		export const SEARCHRESULTPOPUPVIEW:string="SearchResultPopupView";

		/**
		 *主线任务详情弹窗
		 */
		export const MainTASKPOPUPVIEW:string="MainTaskPopupView";

		/** 起名字面板 */
		export const NAMEPOPUPVIEW:string = "NamePopupView";

		/** 玩家改名 */
		export const USERNAMEPOPUPVIEW:string = "UserNamePopupView";

		/**
		 * 排行榜玩家信息弹窗
		 */
		export const RANKUSERINGOPOPUPVIEW:string = "RankUserinfoPopupView";


		/**
		 * 子嗣联姻选择道具
		 */
		export const ADULTCHOOSETYPEVIEW:string = "AdultChooseTypeView";

		/**
		 * 提亲请求列表
		 */
		export const ADULTMARRYREQUESTVIEW:string = "AdultMarryRequestView";

		/**
		 * 选择孩子
		 */
		export const ADULTCHOOSECHILDVIEW:string = "AdultChooseChildView";


		/**
		 * 每日任务宝箱奖励预览
		 */
		export const DAILYTASK_REWARDPREVIEWPOPUPVIEW:string = "DailyTaskRewardPreviewPopuiView";
		/**
		 * 每日任务宝箱奖励预览
		 */
		export const ACNEWYEARPOPUPVIEW:string = "AcNewYearPopupView";

		
		/**
		 * 邮件列表弹板
		 */
		export const MAILPOPUPVIEW:string = "MailPopupView";
		/**
		 * 邮件详情弹板
		 */
		export const MAILDETAILPOPUPVIEW:string = "MailDetailPopupView";
		/**
		 * 举办宴会
		 */
		export const HOLDDINNERPOPUPVIEW:string = "HoldDinnerPopupView";

		/**
		 * 查找宴会
		 */
		export const DINNERFINDPOPUPVIEW:string = "DinnerFindPopupView";

		/**
		 * 宴会积分兑换
		 */
		export const DINNEREXCHANGEPOPUPVIEW:string = "DinnerExchangePopupView";
		/**
		 * 宴会排行榜
		 */
		export const DINNERRANKPOPUPVIEW:string = "DinnerRankPopupView";

		/**
		 * 选宴会type
		 */
		export const DINNERTYPEPOPUPVIEW:string="DinnerTypePopupView";

		/**
		 * 宴会离线消息
		 */
		export const DINNERMESSAGEPOPUPVIEW:string="DinnerMessagePopupView";

		/**
		 * 宴会消息
		 */
		export const DINNERMSGPOPUPVIEW:string = "DinnerMsgPopupView";

		/**
		 * 宴会分享
		 */
		export const DINNERSHAREPOPUPVIEW:string = "DinnerSharePopupView";
		
		/**
		 * 皇宫历史
		 */
		export const PALACEHISTORYPOPUPVIEW:string = "PalaceHistoryPopupView";
		export const PALACEEDITSIGNPOPUPVIEW:string = "PalaceEditSignPopupView";

		/**
		 * 选服列表
		 */
		export const SERVERLISTPOPUPVIEW:string="ServerListPopupView";

		export const ACRANKLISTPOPUPVIEW:string="AcRankListPopupView";
		/**
		 * 成就详情列表
		 */
		export const ACHIEVEMENTDETAILPOPUPVIEW:string="AchievementDetailPopupView";

		/**
		 * 限时活动详情列表
		 */
		export const ACLIMITEDREWARDDETAILPOPUPVIEW:string="AcLimitedRewardDetailPopupView";

		/**
		 * 设置页面
		 */
		export const SettingPopopView:string="SettingPopopView";

		/**
		 * 联系我们
		 */
		export const SETTINGCONTACTPOPUPVIEW:string="SettingContactPopupView";
		/**
		 * 兑换码
		 */
		export const SettingCDKPopupView:string="SettingCDKPopupView";

		/**
		 * 登录失败弹板
		 */
		export const ERRORPOPUPVIEW:string="ErrorPopupView";

		export const SERVANTBOOKLEVELUPPOPUPVIEW:string="ServantBookLevelupPopupView";
		/**
		 * 红颜赏赐
		 */
		export const WIFEGIVEPOPUPVIEW:string="WifeGivePopupView";

		/**
		 * 寻访运势
		 */
		export const SEARCHLUCKPOPUPVIEW:string="SearchLuckPopupView";

		/**
		 * 红颜技能
		 */
		export const WIFESKILLPOPUPVIEW:string="WifeSkillPopupView";
		/**
		 * 红颜皮肤
		 */
		export const WIFESKINVIEW:string="WifeskinView";
		/**
		 * 牢房犯人详情
		 */
		export const PRISONDETAILSPOPUPVIEW:string="PrisonDetailsPopupView";
		/**
		 * 囚犯主图
		 */
		export const PRISONPOPVIEW:string = "PrisonPopView";

		/**
		 * 惩戒女囚买道具
		 */
		export const ACPUNISHBUYITEMPOPUPVIEW:string="AcPunishBuyItemPopupView";

		/**
		 * 惩戒女囚排名奖励
		 */
		export const ACPUNISHRANKREWARDPOPUPVIEW:string="AcPunishRankRewardPopupView";

		export const SERVANTADVANCEPOPUPVIEW:string = "ServantAdvancePopupView";
		/**
		 * 惩戒女囚排行榜
		 */
		export const ACPUNISHRANKPOPUPVIEW:string="AcPunishRankPopupView";

		/**
		 * 惩戒女囚兑换奖励
		 */
		export const ACPUNISHEXPOPUPVIEW:string="AcPunishExPopupView";

		export const BOOKROOMSERVANTSELECTPOPUPVIEW:string="BookroomServantSelectPopupView";


		/**
		 * 通用确认面板
		 */
		export const CONFIRMPOPUPVIEW:string="ConfirmPopupView";

		/**
		 * 下线面板
		 */
		export const OFFLINEVIEW:string="OfflineView";
		

		/**
		 * 合成道具详情界面
		 */
		export const COMPOSEPOPUPVIEW:string="ComposePopupView";
		/**
		 * 创建军团界面
		 */
		export const ALLIANCECREATEPOPUPVIEW:string="AllianceCreatePopupView";


		/**
		 * 副本攻击奖励
		 */
		export const ALLIANCEBOSSATTACKEDPOPUPVIEW:string="AllianceBossAttackedPopupView";
		
		/**
		 * 擂台通用小弹版
		 */
		export const ATKRACEAGREEPOPUPVIEW:string="AtkraceAgreePopupDialog";
		export const ATKRACECROSSAGREEPOPUPDIALOG:string="AtkracecrossAgreePopupDialog";

		/**
		 * 擂台购买属性小弹版
		 */
		export const ATKRACEBUYPOPUPVIEW:string="AtkraceBuyPopupView";
		export const ATKRACECROSSBUYPOPUPVIEW:string="AtkracecrossBuyPopupView";
		
		export const STUDYATKFINDPOPUPVIEW:string="StudyatkFindPopupView";

		export const STUDYATKCREATEPOPUPVIEW:string="StudyatkCreatePopupView";

		export const STUDYATKBOOKPOPUPVIEW:string="StudyatkBookPopupView";
		export const STUDYATKFAILEDPOPUPVIEW:string="StudyatkFailedPopupView";

		/**
		 * 擂台抽奖
		 */
		export const ATKRACEREWARDPOPUPVIEW:string="AtkraceRewardPopupView";
		export const ATKRACECROSSREWARDPOPUPVIEW:string="AtkracecrossRewardPopupView";
		export const ATKRACECROSSDETAILPOPUPVIEW:string="AtkracecrossDetailPopupView";

		/**
		 * 帮会榜单
		 */
		export const ALLIANCERANKPOPUPVIEW:string="AllianceRankPopupView";

		/**
		 * 帮会管理
		 */
		export const ALLIANCEMANAGEPOPUPVIEW:string="AllianceManagePopupView";

		/**
		 * 帮会申请
		 */
		export const ALLIANCEAPPLYPOPUPVIEW:string="AllianceApplyPopupView";
		/**
		 * 副本积分兑换
		 */
		export const DAILYBOSSSCROEPOPUPVIEW:string="DailybossScroePopupView";

		/**
		 * 副本排行榜
		 */
		export let DAILYBOSSRANKPOPUPVIEW:string="DailybossRankPopupView";

		/**
		 * 副本奖励
		 */
		export let DAILYBOSSATTACKEDPOPUPVIEW:string="DailybossAttackedPopupView";

		/**
		 * 副本伤害排行
		 */
		export let DAILYBOSSDAMAGERANKPOPUPVIEW:string="DailybossDamageRankPopupView";

			
		/**
		 * 帮会成员
		 */
		export const ALLIANCEMEMBERPOPUPVIEW:string="AllianceMemberPopupView";
		/**
		 * 帮会查询
		 */
		export const ALLIANCEFINDPOPUPVIEW:string="AllianceFindPopupView";
		/**
		 * 帮会信息
		 */
		export const ALLIANCEINFOPOPUPVIEW:string="AllianceInfoPopupView";
		/**
		 * 设置职位
		 */
		export const ALLIANCESETPOPOPUPVIEW:string="AllianceSetPoPopupView";
		/**
		 * 其他帮会信息
		 */
		export const ALLIANCESHOWINFOPOPUPVIEW:string="AllianceShowInfoPopupView";
		/**
		 * 转移帮主
		 */
		export const ALLIANCETURNPOPUPVIEW:string="AllianceTurnPopupView";
		/**
		 * 帮会倒计时
		 */
		export const ALLIANCETIMEPOPUPVIEW:string="AllianceTimePopupView";
		

		/**
		 * 中午副本战斗结算界面
		 */
		export const DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW:string="DailybossType1BattleResultPopupView";

		/**
		 * 副本排名奖励
		 */
		export const DAILYBOSSRANKREWARDPOPUPVIEW:string="DailybossRankRewardPopupView";
		/**
		 * 帮会密码
		 */
		export const ALLIANCEPSWDPOPUPVIEW:string="AlliancePswdPopupView";
		/**
		 * 帮会建设
		 */
		export const ALLIANCEBUILDPOPUPVIEW:string="AllianceBuildPopupView";
		/**
		 * 帮会兑换
		 */
		export const ALLIANCEEXPOPUPVIEW:string="AllianceExPopupView";

		export const ALLIANCEBOSSPOPUPVIEW:string = "AllianceBossPopupView";
		export const ALLIANCEBOSSOPENPOPUPVIEW:string = "AllianceBossOpenPopupView";
		export const ALLIANCEBOSSRANKOPUPVIEW:string="AllianceBossRankPopupView";

		/**
		 * 抓住囚犯
		 */
		export const CATCHPRISONPUPUPVIEW:string="CatchPrisonPopupView";
		
		/**
		 * 副本 最后一击奖励
		 */
		export const DAILYBOSSLASTATTACKPOPUPVIEW:string="DailybossLastAttackPopupView";

		/**
		 * 网络报错界面
		 */
		export const NETERRORPOPUPVIEW:string="NetErrorPopupView";

		/**
		 * 强制升级界面
		 */
		export const WEIDUANUPGRADEPOPUPVIEW:string="WeiduanUpgradePopupView";
		
		/**
		 * 玩吧领奖
		 */
		export const GETGIFTPOPUPVIEW:string="GetGiftPopupView";
		/**
		 * 玩吧兑换奖
		 */
		export const BUYGIFTPOPUPVIEW:string="BuyGiftPopupView";
		/**
		 * 征伐排行
		 */
		export const CONQUESTRANKPOPUPVIEW:string="ConquestRankPopupView";
		/**
		 * 一键征伐
		 */
		export const CONQUESTBATCHPOPUPVIEW:string="ConquestBatchPopupView";

		/**
		 * 征伐胜利
		 */
		export const CONQUESTWINPOPUPVIEW:string="ConquestWinPopupView";
		/**
		 * 一键征伐奖励纪录
		 */
		export const CONQUESTINFOPOPUPVIEW:string="ConquestInfoPopupView";
		/**
		 * 一键贸易
		 */
		export const TRADEONEKEYPOPUPVIEW:string="TradeOneKeyPopupView";

		/**
		 * 领取糖果
		 */
		export const CANDYGETPOPUPVIEW:string="CandyGetPopupView";

		/**
		 * 关注界面
		 */
		export const ATTENTIONPOPUPVIEW:string="AttentionPopupView";
		
		/**
		 * 一键推关
		 */
		export const CHALLENGEAUTOPOPUPVIEW:string="ChallengeAutoPopupView";

		/**
		 * 一键推关奖励
		 */
		export const CHALLENGEAUTOREWARDSPOPUOVIEW:string="ChallengeAutoRewardsPopupView";
		
		export const ACTAILORREWARDPOPUPVIEW:string="AcTailorRewardPopupView";

		/**
		 * 至劲重置密码
		 */
		export const SETPASSWORDPOPUPVIEW:string="SetPasswordPopupView";
		/**
		 * 至劲重置密码
		 */
		export const DOWNLOADPACKAGEPOPUPVIEW:string="DownloadPackagePopupView";

		/**
		 * 下载微端
		 */
		export const DOWNLOADVIEW:string="DownloadView";

		/**
		 * 称帝详情
		 */
		export const PRESTIGEINFOPOPUPVIEW:string="PrestigeInfoPopupView";

		/**
		 * 声望日志
		 */
		export const PRESTIGELOFPOPUPVIEW:string="PrestigeLogPopupView";

		/**
		 * 特权详情
		 */
		export const PRESTIGEITEMPOPUPVIEW:string="PrestigeItemPopupView";

		export const PRACTICEABILITYDETAILSPOPUPVIEW:string="PracticeAbilityDetailsPopupView";
		export const PRACTICESTORAGEPOPIPVIEW:string="PracticeStoragePopupView";
		export const PRACTICEGETPOPUPVIEW:string="PracticeGetPopupView";
		/**
		 *  五一转盘排行榜
		 */
		export const ACTMAYDAYRANKPOPUPVIEW:string="AcMayDayRankPopupView";
		/**
		 * 转盘奖励物品
		 */
		export const ACMAYDAYREWARDPOPUPVIEW:string="AcMayDayRewardPopupView";

		/**
		 * 实名认证奖励面板
		 */
		export const REAlNAMEPOPUPVIEW:string="RealnamePopupView";


		/**
		 * 册封选择位分面板
		 */
		export const WIFESTATUSPOPUPVIEW:string="WifestatusPopupView";
		/**
		 * 册封红颜属性面板
		 */
		export const WIFESTATUSWIFEPOPUPVIEW:string="WifestatusWifePopupView";
		

		/**
		 *  跨服亲密奖励一览弹窗
		 */
		export const ACCROSSSERVERINTIMACYREWARDVIEW:string="AcCrossServerIntimacyRewardView";
		export const ACCROSSSERVERINTIMACYRANKLISTVIEW:string="AcCrossServerIntimacyRankListView";
		export const ACCROSSSERVERDETAILPOPUPVIEW:string="AcCrossServerDetailPopupView";

		export const WIFEORSERVANTINFOPOPUPVIEW:string="WifeORServantInfoPopupView";

		export const PRACTICEBATCHBUYPOPUPVIEW:string="PracticeBatchBuyPopupView";
		export const PRACTICEBUYPOPUPVIEW:string="PracticeBuyPopupView";
		export const PRACTICEEXPANDPOPUPVIEW:string="PracticeExpandPopupView";

		/**
		 * 八王争帝报名弹窗
		*/
		export const EMPERORWARSIGNPOPVIEW:string="EmperorWarSignPopView";
		export const EMPERORWARBMCEVIEW:string="EmperorWarBmceView";
		export const EMPERORWARREWARDVIEW:string="EmperorWarRewardView";	
		export const EMPERORWARREPLAYPOPUPVIEW:string="EmperorwarReplayPopupView";	
	}

	/**
	 * 直接继承BaseView的界面
	 */
	export namespace BASE
	{

		/** 
		 * 登陆界面
		 **/
		export const LOGINVIEW:string="LoginView";

		/**
		 *  战斗结算 胜利
		 */
		export const BATTLEWIN:string="BattleWin";

		/**
		 *  温馨提示 1，战斗失败， 2，没钱了
		 */
		export const PROMPTVIEW:string="PromptView";

		/**
		 *  宠幸得到孩子
		 */
		export const WIFEGETCHILDVIEW:string="WifeGetChildView";

		/**
		 *  宠幸红颜动画
		 */
		export const WIFELOVEANIVIEW:string="WifeLoveAniView";

		/**
		 * 获得红颜
		 */
		export const WIFEGETVIEW:string="WifeGetView";


		/**
		 * 关卡剧情
		 */
		export const CHALLENGESTORY:string="ChallengeStory";
		/**
		 * 新手引导
		 */
		export const ROOKIEVIEW:string="RookieView";

		/**
		 * 获得门客
		 */
		export const SERVANTGETVIEW:string="ServantGetView";

		/**
		 * 膜拜弹出UI
		 */
		export const RANKWORSHIPVIEW:string="RankWorshipView";

		/**
		 *  孩子金榜题名界面
		 */
		export const CHILDUPDVIEW:string="ChildUpdView";

		/**
		 *  结婚成功界面
		 */
		export const ADULTMARRYSUCCESSVIEW:string="AdultMarrySuccessView";
		
		/**
		 *  宴会成功界面
		 */
		export const DINNEROPENEDVIEW:string="DinnerOpenedView";

		/**
		 *  宴会结束界面
		 */
		export const DINNERFINISHVIEW:string="DinnerFinishView";

		/**
		 *  前往宴会界面
		 */
		export const GOTODINNEREDVIEW:string="GotoDinnerView";

		/**
		 *  惩戒女囚官报界面
		 */
		export const ACPUNISHREPORTVIEW:string="AcPunishReportView";
		/**
		 * 门客升爵
		 */
		export const SERVANTADVANCEVIEW:string="ServantAdvanceView";
		export const STUDYATKSUCCESSVIEW:string="StudyatkSuccessView";
		export const STUDYATKBOOLLVUPSUCCESSVIEW:string="StudyAtkBookLvupSuccessView";
		export const WIFECALLBATCHSUCCESSVIEW:string="WifeCallBatchSuccessView";

		export const STUDYATKBATTLERESULEVIEW:string="StudyatkBattleResultView";
		/**
		 * 加入帮会动画
		 */
		export const ALLIANCECREATEANIVIEW:string="AllianceCreateAniView";

		export const ITEMUSESUCCESSVIEW:string="ItemUseSuccessView";

		/**
		 *  韩国条款界面
		 */
		export const KRAGREEMENTVIEW:string="KRAgreementView";
		

		/**
		 *  册封成功界面
		 */
		export const WIFESTATUSSHOWVIEW:string="WifestatusShowView";
	}

	/**
	 * 直接继承BaseBattleView的界面
	 */
	export namespace BATTLE
	{
		/**
		 * 擂台战斗
		 */
		export const ATKRACEBATTLEVIEW:string="AtkraceBattleView";

		/**
		 * 跨服擂台战斗
		 */
		export const ATKRACECROSSBATTLEVIEW:string="AtkracecrossBattleView";
		

		/**
		 * 关卡boss
		 */
		export const BOSSBATTLEVIEW:string="BossBattleView";

		/**
		 * 副本 战斗界面
		 */
		export const DAILYBOSSBATTLEVIEW:string="DailybossBattleView";

		/**
		 * 军团副本 战斗界面
		 */
		export const ALLIANCEBOSSBATTLEVIEW:string="AllianceBossBattleView";

		/**
		 * 战斗视图
		 */
		export const BATTLEVIEW:string="BattleView";

		/**
		 * 关卡战斗视图
		 */
		export const FIGHTVIEW:string="FightView";

		/**
		 * 关卡战斗视图
		 */
		export const CONQUESTFIGHTVIEW:string="ConquestFightView";
		/**
		 * 称帝战斗视图
		 */
		export const EMPERORWARBATTLEVIEW:string="EmperorwarBattleView";	
	}
}
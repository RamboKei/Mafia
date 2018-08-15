/**
 * author 陈可
 * date 2017/9/11
 * @class ViewConst
 */
var ViewConst;
(function (ViewConst) {
    /**
     * 全屏界面，继承commView的界面
     */
    var COMMON;
    (function (COMMON) {
        /** 用户信息界面 */
        COMMON.PLAYERVIEW = "PlayerView";
        /** 打开道具 */
        COMMON.ITEMVIEW_TAB1 = "ItemView";
        COMMON.ITEMVIEW_TAB2 = "ItemView|1";
        COMMON.ITEMVIEW_TAB3 = "ItemView|2";
        /**打开红颜已迎娶 */
        COMMON.WIFEVIEW_TAB1 = "WifeView|1";
        /**打开红颜未迎娶 */
        COMMON.WIFEVIEW_TAB2 = "WifeView|2";
        COMMON.WIFEUNLOCKVIEW = "WifeUnLockView";
        COMMON.WIFESTATUSVIEW = "WifestatusView";
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
        COMMON.MANAGEVIEW = "ManageView";
        /**
         * 关卡界面
         */
        COMMON.CHALLENGEVIEW = "ChallengeView";
        //门客
        COMMON.SERVANTVIEW = "ServantView";
        COMMON.SERVANTINFOVIEW = "ServantInfoView";
        //升官
        COMMON.PROMOTIONVIEW = "PromotionView";
        /**升官成功 */
        COMMON.PROMOTIONSUCCESSVIEW = "PromotionSuccessView";
        //政务
        COMMON.AFFAIRVIEW = "AffairView";
        //红颜操作
        COMMON.WIFEOPTVIEW = "WifeOptView";
        /**
         * 子嗣
         */
        COMMON.CHILDVIEW = "ChildView";
        /**
         * 创建角色
         */
        COMMON.GUIDECREATEUSERVIEW = "GuideCreateUserView";
        /**
         * 排行
         */
        COMMON.RANKVIEW = "RankView";
        /**
         * 聊天
         */
        COMMON.CHATVIEW = "ChatView";
        /**
         * 帮会聊天
         */
        COMMON.CHATVIEWTAB1 = "ChatView|1";
        /**
         * 媒婆界面
         */
        COMMON.ADULTVIEW = "AdultView";
        /**商店热卖页签 */
        COMMON.SHOPVIEW_TAB1 = "ShopView";
        /**商店特惠礼包页签 */
        COMMON.SHOPVIEW_TAB2 = "ShopView|1";
        /**商店道具页签 */
        COMMON.SHOPVIEW_TAB3 = "ShopView|2";
        /**
         * 提亲列表界面
         */
        COMMON.ADULTMARRYVIEW = "AdultMarryView";
        /**
         * 每日任务
         */
        COMMON.DAILYTASKVIEW = "DailyTaskView";
        /**
         * 充值界面
         */
        // export const RECHARGEVIEW:string="RechargeView";
        /**
         * vip界面
         */
        COMMON.VIPVIEW = "VipView";
        /**
         * 福利界面--首冲
         */
        COMMON.WELFAREVIEWFIRSTRECHARGE = "WelfareView|FirstRecharge";
        /**
         * 福利界面--微信关注
         */
        COMMON.WELFAREVIEWOFFICIALWECHAT = "WelfareView|OfficialWeChat";
        /**
         * 福利界面--签到
         */
        COMMON.WELFAREVIEWSIGNIN = "WelfareView|Signin";
        /**
         * 福利界面--实名
         */
        COMMON.WELFAREVIEWREALNAME = "WelfareView|Realname";
        /**
         * 福利界面--功能介绍
         */
        COMMON.WELFAREVIEWFUNCTIONPREVIEW = "WelfareView|FunctionPreview";
        /**
         * 福利界面--q群福利
         */
        COMMON.WELFAREVIEWQGROUP = "WelfareView|Qgroup";
        /**
         * 福利界面--1.5倍返利
         */
        COMMON.WELFAREVIEWREBATE = "WelfareView|Rebate";
        /**
         * 四大谋士
         */
        COMMON.ACFOURPEOPLEVIEW = "AcFourPeopleView";
        /**
         * 春季庆典
         */
        COMMON.ACSPRINGCELEBRATE = "AcSpringCelebrateView";
        COMMON.ACSPRINGCELEBRATE_TAB1 = "AcSpringCelebrateView|1";
        COMMON.ACSPRINGCELEBRATE_TAB2 = "AcSpringCelebrateView|2";
        COMMON.ACSPRINGCELEBRATE_TAB3 = "AcSpringCelebrateView|3";
        COMMON.ACSPRINGCELEBRATE_TAB4 = "AcSpringCelebrateView|4";
        /**
         * 充值＋特权
         */
        COMMON.RECHARGEVIPVIEW = "RechargeVipView";
        COMMON.RECHARGEVIPVIEWTAB2 = "RechargeVipView|1";
        /**
         * 福利界面--月卡
         */
        COMMON.WELFAREVIEWMONTHCARD = "WelfareView|MonthCard";
        /**
         * 福利界面--终身卡
         */
        COMMON.WELFAREVIEWYEARCARD = "WelfareView|YearCard";
        /**
         * 福利界面--天恩赐福
         */
        COMMON.WELFAREVIEWGODBLESS = "WelfareView|GodBless";
        /**
         * 福利界面--12
         */
        COMMON.WELFAREVIEWRECHARGEBOX = "WelfareView|RechargeBox";
        /**
         * 成就界面
         */
        COMMON.ACHIEVEMENTVIEW = "AchievementView";
        /**
         * 公告
         */
        COMMON.GAMEANNOUNCEMENtVIEW = "GameAnnouncementView";
        /**
         * 感恩回馈
         */
        COMMON.THANKSGIVINGVIEW = "ThanksgivingView";
        /**
         * 牢房
         */
        COMMON.PRISONVIEW = "PrisonView";
        COMMON.ACRANKACTIVEVIEW = "AcRankActiveView";
        /**
         *  宴会详情界面
         */
        COMMON.DINNERDETAILVIEW = "DinnerDetailView";
        /**
         *  宴会奖励界面
         */
        COMMON.DINNERREWARDVIEW = "DinnerRewardView";
        /**
         * 充值奖励
         */
        COMMON.ACRECHARGEVIEW = "AcRechargeView";
        /**
         * 神秘商店
         */
        COMMON.ACVIPSHOPVIEW = "AcVipShopView";
        /**
         * 春节攀升
         */
        COMMON.ACNEWYEARVIEW = "AcNewYearView";
        COMMON.ACNEWYEARVIEW_TAB1 = "AcNewYearView|1";
        COMMON.ACNEWYEARVIEW_TAB2 = "AcNewYearView|2";
        // export const ACNEWYEARVIEWTAB2:string="AcNewYearViewTab2";
        // export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
        /**
         *  惩戒女囚界面
         */
        COMMON.ACPUNISHVIEW = "AcPunishView";
        /**
         *  擂台主界面
         */
        COMMON.ATKRACEVIEW = "AtkraceView";
        COMMON.ATKRACEARRESTVIEW = "AtkraceArrestView";
        /**
         *  擂台/来访消息
         */
        COMMON.ATKRACEVISITVIEW = "AtkraceVisitView";
        /**
         *  跨服擂台/来访消息
         */
        COMMON.ATKRACECROSSVISITVIEW = "AtkraceCrossVisitView";
        /**
         *  擂台/排行榜
         */
        COMMON.ATKRACERANKLISTVIEW = "AtkraceRankListView";
        /**
         *  军团主界面
         */
        COMMON.ALLIANCEVIEW = "AllianceView";
        /**
         *  没有军团界面
         */
        COMMON.ALLIANCECREATEVIEW = "AllianceCreateView";
        COMMON.BOOKROOMVIEW = "BookroomView";
        /**
         * 练武场
         */
        COMMON.STUDYATKDETAILVIEW = "StudyatkDetailView";
        /**
         * 练武场战斗
         */
        COMMON.STUDYBATTLEVIEW = "StudyatkBattleView";
        COMMON.STUDYATKVIEW = "StudyatkView";
        /**
         * 征伐
         */
        COMMON.CONQUESTVIEW = "ConquestView";
        COMMON.TRADEVIEW = "TradeView";
        COMMON.TRADERANKLISTVIEW = "TradeRankListView";
        /**
         * 跨服擂台
         */
        COMMON.ATKRACECROSSSUMMARYVIEW = "AtkracecrossSummaryView";
        COMMON.ATKRACECROSSVIEW = "AtkracecrossView";
        COMMON.ATKRACECROSSCHALLENGEVIEW = "AtkraceCrossChallengeView";
        COMMON.ATKRACECROSSRANKLISTVIEW = "AtkraceCrossRankListView";
        COMMON.ATKRACECROSSARRESTVIEW = "AtkracecrossArrestView";
        COMMON.ATKRACECROSSACTIVITYREWARDVIEW = "AtkracecrossActivityRewardView";
        /**
         * 贸易战斗
         */
        COMMON.TRADEFIGHTVIEW = "TradeFightView";
        /**
         * 贸易胜利
         */
        COMMON.TRADEINFOPOPUPVIEW = "TradeInfoPopupView";
        /**
         * 宫廷皮肤兑换
         */
        COMMON.ACTAILOREXCHANGEVIEW = "AcTailorExchangeView";
        COMMON.CHATBLOCKVIEW = "ChatblockView";
        COMMON.ACWISHTREEEXCHANGEVIEW = "AcWishTreeExchangeView";
        /**
         * 寻访
         */
        COMMON.SEARCHVIEW = "SearchView";
        /**
         * 称帝
         */
        COMMON.PRESTIGEVIEW = "PrestigeView";
        COMMON.PALACEHOUSEVIEW = "PalaceHouseView";
        COMMON.PALACECROSSVIEW = "PalaceCrossView";
        COMMON.PALACEVIEW = "PalaceView";
        COMMON.PALACEHOUSEGROUPVIEW = "PalaceHouseGroupView";
        /**
         * 修身
         */
        COMMON.PRACTICEVIEW = "PracticeView";
        COMMON.PRACTICEABILITYVIEW = "PracticeAbilityView";
        /*
        *跨服亲密活动主界面
        */
        COMMON.ACCROSSSERVERINTIMACYENTERVIEW = "AcCrossServerIntimacyEnterView";
        /**
         * 称帝战
        */
        COMMON.EMPERORWARENTERVIEW = "EmperorWarEnterView";
    })(COMMON = ViewConst.COMMON || (ViewConst.COMMON = {}));
    /**
     * 小弹窗，继承popupview的界面
     */
    var POPUP;
    (function (POPUP) {
        /** 分享奖励面板 */
        POPUP.SHAREPOPUPVIEW = "SharePopupView";
        /** 公共奖励面板 */
        POPUP.COMMONREWARDPOPUPVIEW = "CommonRewardPopupView";
        /** 道具、物品详情弹板 */
        POPUP.ITEMINFOPOPUPVIEW = "ItemInfoPopupView";
        /** 使用道具弹板 */
        POPUP.ITEMUSEPOPUPVIEW = "ItemUsePopupView";
        /** 道具跳转弹板 */
        POPUP.ITEMJUMPPOPUPVIEW = "ItemJumpPopupView";
        /**错误弹板 *
        export const ERRORPOPUPVIEW:string = "ErrorPopupView";
        /**规则说明弹板 */
        POPUP.RULEINFOPOPUPVIEW = "RuleInfoPopupView";
        //门客详情
        POPUP.SERVANTATTRDETAILPOPUPVIEW = "ServantAttrDetailPopupView";
        /**
         * 离线自动获得资源弹窗
         */
        POPUP.AUTORESPOPUPVIEW = "AutoResPopupView";
        /**选择门客界面 */
        POPUP.SERVANTSELECTEDPOPUPVIEW = "ServantSelectedPopupView";
        /**西域商店VIP不足弹窗 */
        POPUP.ACVIPSHOPPOPUPVIEW = "AcVipShopPopupView";
        /**
         *  擂台挑战
         */
        POPUP.ATKRACECHALLENGEVIEW = "AtkraceChallengeView";
        /**
         *  跨服擂台挑战
         */
        POPUP.ATKRACECROSSCHALLENGEVIEW = "AtkraceCrossChallengeView";
        /**使用道具确认取消弹板 */
        POPUP.ITEMUSECONSTPOPUPVIEW = "ItemUseConstPopupView";
        /**
         * 确认是否消耗元宝购买物品提示弹出框
         */
        POPUP.COSTGEMBUYITEMPOPUPVIEW = "CostGemBuyItemPopupView";
        /**
         * 查看寻访建筑信息弹窗
         */
        POPUP.SEARCHBUILDPOPUPVIEW = "SearchBuildPopupView";
        /**
         * 寻访结果弹窗
         */
        POPUP.SEARCHRESULTPOPUPVIEW = "SearchResultPopupView";
        /**
         *主线任务详情弹窗
         */
        POPUP.MainTASKPOPUPVIEW = "MainTaskPopupView";
        /** 起名字面板 */
        POPUP.NAMEPOPUPVIEW = "NamePopupView";
        /** 玩家改名 */
        POPUP.USERNAMEPOPUPVIEW = "UserNamePopupView";
        /**
         * 排行榜玩家信息弹窗
         */
        POPUP.RANKUSERINGOPOPUPVIEW = "RankUserinfoPopupView";
        /**
         * 子嗣联姻选择道具
         */
        POPUP.ADULTCHOOSETYPEVIEW = "AdultChooseTypeView";
        /**
         * 提亲请求列表
         */
        POPUP.ADULTMARRYREQUESTVIEW = "AdultMarryRequestView";
        /**
         * 选择孩子
         */
        POPUP.ADULTCHOOSECHILDVIEW = "AdultChooseChildView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW = "DailyTaskRewardPreviewPopuiView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.ACNEWYEARPOPUPVIEW = "AcNewYearPopupView";
        /**
         * 邮件列表弹板
         */
        POPUP.MAILPOPUPVIEW = "MailPopupView";
        /**
         * 邮件详情弹板
         */
        POPUP.MAILDETAILPOPUPVIEW = "MailDetailPopupView";
        /**
         * 举办宴会
         */
        POPUP.HOLDDINNERPOPUPVIEW = "HoldDinnerPopupView";
        /**
         * 查找宴会
         */
        POPUP.DINNERFINDPOPUPVIEW = "DinnerFindPopupView";
        /**
         * 宴会积分兑换
         */
        POPUP.DINNEREXCHANGEPOPUPVIEW = "DinnerExchangePopupView";
        /**
         * 宴会排行榜
         */
        POPUP.DINNERRANKPOPUPVIEW = "DinnerRankPopupView";
        /**
         * 选宴会type
         */
        POPUP.DINNERTYPEPOPUPVIEW = "DinnerTypePopupView";
        /**
         * 宴会离线消息
         */
        POPUP.DINNERMESSAGEPOPUPVIEW = "DinnerMessagePopupView";
        /**
         * 宴会消息
         */
        POPUP.DINNERMSGPOPUPVIEW = "DinnerMsgPopupView";
        /**
         * 宴会分享
         */
        POPUP.DINNERSHAREPOPUPVIEW = "DinnerSharePopupView";
        /**
         * 皇宫历史
         */
        POPUP.PALACEHISTORYPOPUPVIEW = "PalaceHistoryPopupView";
        POPUP.PALACEEDITSIGNPOPUPVIEW = "PalaceEditSignPopupView";
        /**
         * 选服列表
         */
        POPUP.SERVERLISTPOPUPVIEW = "ServerListPopupView";
        POPUP.ACRANKLISTPOPUPVIEW = "AcRankListPopupView";
        /**
         * 成就详情列表
         */
        POPUP.ACHIEVEMENTDETAILPOPUPVIEW = "AchievementDetailPopupView";
        /**
         * 限时活动详情列表
         */
        POPUP.ACLIMITEDREWARDDETAILPOPUPVIEW = "AcLimitedRewardDetailPopupView";
        /**
         * 设置页面
         */
        POPUP.SettingPopopView = "SettingPopopView";
        /**
         * 联系我们
         */
        POPUP.SETTINGCONTACTPOPUPVIEW = "SettingContactPopupView";
        /**
         * 兑换码
         */
        POPUP.SettingCDKPopupView = "SettingCDKPopupView";
        /**
         * 登录失败弹板
         */
        POPUP.ERRORPOPUPVIEW = "ErrorPopupView";
        POPUP.SERVANTBOOKLEVELUPPOPUPVIEW = "ServantBookLevelupPopupView";
        /**
         * 红颜赏赐
         */
        POPUP.WIFEGIVEPOPUPVIEW = "WifeGivePopupView";
        /**
         * 寻访运势
         */
        POPUP.SEARCHLUCKPOPUPVIEW = "SearchLuckPopupView";
        /**
         * 红颜技能
         */
        POPUP.WIFESKILLPOPUPVIEW = "WifeSkillPopupView";
        /**
         * 红颜皮肤
         */
        POPUP.WIFESKINVIEW = "WifeskinView";
        /**
         * 牢房犯人详情
         */
        POPUP.PRISONDETAILSPOPUPVIEW = "PrisonDetailsPopupView";
        /**
         * 囚犯主图
         */
        POPUP.PRISONPOPVIEW = "PrisonPopView";
        /**
         * 惩戒女囚买道具
         */
        POPUP.ACPUNISHBUYITEMPOPUPVIEW = "AcPunishBuyItemPopupView";
        /**
         * 惩戒女囚排名奖励
         */
        POPUP.ACPUNISHRANKREWARDPOPUPVIEW = "AcPunishRankRewardPopupView";
        POPUP.SERVANTADVANCEPOPUPVIEW = "ServantAdvancePopupView";
        /**
         * 惩戒女囚排行榜
         */
        POPUP.ACPUNISHRANKPOPUPVIEW = "AcPunishRankPopupView";
        /**
         * 惩戒女囚兑换奖励
         */
        POPUP.ACPUNISHEXPOPUPVIEW = "AcPunishExPopupView";
        POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW = "BookroomServantSelectPopupView";
        /**
         * 通用确认面板
         */
        POPUP.CONFIRMPOPUPVIEW = "ConfirmPopupView";
        /**
         * 下线面板
         */
        POPUP.OFFLINEVIEW = "OfflineView";
        /**
         * 合成道具详情界面
         */
        POPUP.COMPOSEPOPUPVIEW = "ComposePopupView";
        /**
         * 创建军团界面
         */
        POPUP.ALLIANCECREATEPOPUPVIEW = "AllianceCreatePopupView";
        /**
         * 副本攻击奖励
         */
        POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW = "AllianceBossAttackedPopupView";
        /**
         * 擂台通用小弹版
         */
        POPUP.ATKRACEAGREEPOPUPVIEW = "AtkraceAgreePopupDialog";
        POPUP.ATKRACECROSSAGREEPOPUPDIALOG = "AtkracecrossAgreePopupDialog";
        /**
         * 擂台购买属性小弹版
         */
        POPUP.ATKRACEBUYPOPUPVIEW = "AtkraceBuyPopupView";
        POPUP.ATKRACECROSSBUYPOPUPVIEW = "AtkracecrossBuyPopupView";
        POPUP.STUDYATKFINDPOPUPVIEW = "StudyatkFindPopupView";
        POPUP.STUDYATKCREATEPOPUPVIEW = "StudyatkCreatePopupView";
        POPUP.STUDYATKBOOKPOPUPVIEW = "StudyatkBookPopupView";
        POPUP.STUDYATKFAILEDPOPUPVIEW = "StudyatkFailedPopupView";
        /**
         * 擂台抽奖
         */
        POPUP.ATKRACEREWARDPOPUPVIEW = "AtkraceRewardPopupView";
        POPUP.ATKRACECROSSREWARDPOPUPVIEW = "AtkracecrossRewardPopupView";
        POPUP.ATKRACECROSSDETAILPOPUPVIEW = "AtkracecrossDetailPopupView";
        /**
         * 帮会榜单
         */
        POPUP.ALLIANCERANKPOPUPVIEW = "AllianceRankPopupView";
        /**
         * 帮会管理
         */
        POPUP.ALLIANCEMANAGEPOPUPVIEW = "AllianceManagePopupView";
        /**
         * 帮会申请
         */
        POPUP.ALLIANCEAPPLYPOPUPVIEW = "AllianceApplyPopupView";
        /**
         * 副本积分兑换
         */
        POPUP.DAILYBOSSSCROEPOPUPVIEW = "DailybossScroePopupView";
        /**
         * 副本排行榜
         */
        POPUP.DAILYBOSSRANKPOPUPVIEW = "DailybossRankPopupView";
        /**
         * 副本奖励
         */
        POPUP.DAILYBOSSATTACKEDPOPUPVIEW = "DailybossAttackedPopupView";
        /**
         * 副本伤害排行
         */
        POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW = "DailybossDamageRankPopupView";
        /**
         * 帮会成员
         */
        POPUP.ALLIANCEMEMBERPOPUPVIEW = "AllianceMemberPopupView";
        /**
         * 帮会查询
         */
        POPUP.ALLIANCEFINDPOPUPVIEW = "AllianceFindPopupView";
        /**
         * 帮会信息
         */
        POPUP.ALLIANCEINFOPOPUPVIEW = "AllianceInfoPopupView";
        /**
         * 设置职位
         */
        POPUP.ALLIANCESETPOPOPUPVIEW = "AllianceSetPoPopupView";
        /**
         * 其他帮会信息
         */
        POPUP.ALLIANCESHOWINFOPOPUPVIEW = "AllianceShowInfoPopupView";
        /**
         * 转移帮主
         */
        POPUP.ALLIANCETURNPOPUPVIEW = "AllianceTurnPopupView";
        /**
         * 帮会倒计时
         */
        POPUP.ALLIANCETIMEPOPUPVIEW = "AllianceTimePopupView";
        /**
         * 中午副本战斗结算界面
         */
        POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW = "DailybossType1BattleResultPopupView";
        /**
         * 副本排名奖励
         */
        POPUP.DAILYBOSSRANKREWARDPOPUPVIEW = "DailybossRankRewardPopupView";
        /**
         * 帮会密码
         */
        POPUP.ALLIANCEPSWDPOPUPVIEW = "AlliancePswdPopupView";
        /**
         * 帮会建设
         */
        POPUP.ALLIANCEBUILDPOPUPVIEW = "AllianceBuildPopupView";
        /**
         * 帮会兑换
         */
        POPUP.ALLIANCEEXPOPUPVIEW = "AllianceExPopupView";
        POPUP.ALLIANCEBOSSPOPUPVIEW = "AllianceBossPopupView";
        POPUP.ALLIANCEBOSSOPENPOPUPVIEW = "AllianceBossOpenPopupView";
        POPUP.ALLIANCEBOSSRANKOPUPVIEW = "AllianceBossRankPopupView";
        /**
         * 抓住囚犯
         */
        POPUP.CATCHPRISONPUPUPVIEW = "CatchPrisonPopupView";
        /**
         * 副本 最后一击奖励
         */
        POPUP.DAILYBOSSLASTATTACKPOPUPVIEW = "DailybossLastAttackPopupView";
        /**
         * 网络报错界面
         */
        POPUP.NETERRORPOPUPVIEW = "NetErrorPopupView";
        /**
         * 强制升级界面
         */
        POPUP.WEIDUANUPGRADEPOPUPVIEW = "WeiduanUpgradePopupView";
        /**
         * 玩吧领奖
         */
        POPUP.GETGIFTPOPUPVIEW = "GetGiftPopupView";
        /**
         * 玩吧兑换奖
         */
        POPUP.BUYGIFTPOPUPVIEW = "BuyGiftPopupView";
        /**
         * 征伐排行
         */
        POPUP.CONQUESTRANKPOPUPVIEW = "ConquestRankPopupView";
        /**
         * 一键征伐
         */
        POPUP.CONQUESTBATCHPOPUPVIEW = "ConquestBatchPopupView";
        /**
         * 征伐胜利
         */
        POPUP.CONQUESTWINPOPUPVIEW = "ConquestWinPopupView";
        /**
         * 一键征伐奖励纪录
         */
        POPUP.CONQUESTINFOPOPUPVIEW = "ConquestInfoPopupView";
        /**
         * 一键贸易
         */
        POPUP.TRADEONEKEYPOPUPVIEW = "TradeOneKeyPopupView";
        /**
         * 领取糖果
         */
        POPUP.CANDYGETPOPUPVIEW = "CandyGetPopupView";
        /**
         * 关注界面
         */
        POPUP.ATTENTIONPOPUPVIEW = "AttentionPopupView";
        /**
         * 一键推关
         */
        POPUP.CHALLENGEAUTOPOPUPVIEW = "ChallengeAutoPopupView";
        /**
         * 一键推关奖励
         */
        POPUP.CHALLENGEAUTOREWARDSPOPUOVIEW = "ChallengeAutoRewardsPopupView";
        POPUP.ACTAILORREWARDPOPUPVIEW = "AcTailorRewardPopupView";
        /**
         * 至劲重置密码
         */
        POPUP.SETPASSWORDPOPUPVIEW = "SetPasswordPopupView";
        /**
         * 至劲重置密码
         */
        POPUP.DOWNLOADPACKAGEPOPUPVIEW = "DownloadPackagePopupView";
        /**
         * 下载微端
         */
        POPUP.DOWNLOADVIEW = "DownloadView";
        /**
         * 称帝详情
         */
        POPUP.PRESTIGEINFOPOPUPVIEW = "PrestigeInfoPopupView";
        /**
         * 声望日志
         */
        POPUP.PRESTIGELOFPOPUPVIEW = "PrestigeLogPopupView";
        /**
         * 特权详情
         */
        POPUP.PRESTIGEITEMPOPUPVIEW = "PrestigeItemPopupView";
        POPUP.PRACTICEABILITYDETAILSPOPUPVIEW = "PracticeAbilityDetailsPopupView";
        POPUP.PRACTICESTORAGEPOPIPVIEW = "PracticeStoragePopupView";
        POPUP.PRACTICEGETPOPUPVIEW = "PracticeGetPopupView";
        /**
         *  五一转盘排行榜
         */
        POPUP.ACTMAYDAYRANKPOPUPVIEW = "AcMayDayRankPopupView";
        /**
         * 转盘奖励物品
         */
        POPUP.ACMAYDAYREWARDPOPUPVIEW = "AcMayDayRewardPopupView";
        /**
         * 实名认证奖励面板
         */
        POPUP.REAlNAMEPOPUPVIEW = "RealnamePopupView";
        /**
         * 册封选择位分面板
         */
        POPUP.WIFESTATUSPOPUPVIEW = "WifestatusPopupView";
        /**
         * 册封红颜属性面板
         */
        POPUP.WIFESTATUSWIFEPOPUPVIEW = "WifestatusWifePopupView";
        /**
         *  跨服亲密奖励一览弹窗
         */
        POPUP.ACCROSSSERVERINTIMACYREWARDVIEW = "AcCrossServerIntimacyRewardView";
        POPUP.ACCROSSSERVERINTIMACYRANKLISTVIEW = "AcCrossServerIntimacyRankListView";
        POPUP.ACCROSSSERVERDETAILPOPUPVIEW = "AcCrossServerDetailPopupView";
        POPUP.WIFEORSERVANTINFOPOPUPVIEW = "WifeORServantInfoPopupView";
        POPUP.PRACTICEBATCHBUYPOPUPVIEW = "PracticeBatchBuyPopupView";
        POPUP.PRACTICEBUYPOPUPVIEW = "PracticeBuyPopupView";
        POPUP.PRACTICEEXPANDPOPUPVIEW = "PracticeExpandPopupView";
        /**
         * 八王争帝报名弹窗
        */
        POPUP.EMPERORWARSIGNPOPVIEW = "EmperorWarSignPopView";
        POPUP.EMPERORWARBMCEVIEW = "EmperorWarBmceView";
        POPUP.EMPERORWARREWARDVIEW = "EmperorWarRewardView";
        POPUP.EMPERORWARREPLAYPOPUPVIEW = "EmperorwarReplayPopupView";
    })(POPUP = ViewConst.POPUP || (ViewConst.POPUP = {}));
    /**
     * 直接继承BaseView的界面
     */
    var BASE;
    (function (BASE) {
        /**
         * 登陆界面
         **/
        BASE.LOGINVIEW = "LoginView";
        /**
         *  战斗结算 胜利
         */
        BASE.BATTLEWIN = "BattleWin";
        /**
         *  温馨提示 1，战斗失败， 2，没钱了
         */
        BASE.PROMPTVIEW = "PromptView";
        /**
         *  宠幸得到孩子
         */
        BASE.WIFEGETCHILDVIEW = "WifeGetChildView";
        /**
         *  宠幸红颜动画
         */
        BASE.WIFELOVEANIVIEW = "WifeLoveAniView";
        /**
         * 获得红颜
         */
        BASE.WIFEGETVIEW = "WifeGetView";
        /**
         * 关卡剧情
         */
        BASE.CHALLENGESTORY = "ChallengeStory";
        /**
         * 新手引导
         */
        BASE.ROOKIEVIEW = "RookieView";
        /**
         * 获得门客
         */
        BASE.SERVANTGETVIEW = "ServantGetView";
        /**
         * 膜拜弹出UI
         */
        BASE.RANKWORSHIPVIEW = "RankWorshipView";
        /**
         *  孩子金榜题名界面
         */
        BASE.CHILDUPDVIEW = "ChildUpdView";
        /**
         *  结婚成功界面
         */
        BASE.ADULTMARRYSUCCESSVIEW = "AdultMarrySuccessView";
        /**
         *  宴会成功界面
         */
        BASE.DINNEROPENEDVIEW = "DinnerOpenedView";
        /**
         *  宴会结束界面
         */
        BASE.DINNERFINISHVIEW = "DinnerFinishView";
        /**
         *  前往宴会界面
         */
        BASE.GOTODINNEREDVIEW = "GotoDinnerView";
        /**
         *  惩戒女囚官报界面
         */
        BASE.ACPUNISHREPORTVIEW = "AcPunishReportView";
        /**
         * 门客升爵
         */
        BASE.SERVANTADVANCEVIEW = "ServantAdvanceView";
        BASE.STUDYATKSUCCESSVIEW = "StudyatkSuccessView";
        BASE.STUDYATKBOOLLVUPSUCCESSVIEW = "StudyAtkBookLvupSuccessView";
        BASE.WIFECALLBATCHSUCCESSVIEW = "WifeCallBatchSuccessView";
        BASE.STUDYATKBATTLERESULEVIEW = "StudyatkBattleResultView";
        /**
         * 加入帮会动画
         */
        BASE.ALLIANCECREATEANIVIEW = "AllianceCreateAniView";
        BASE.ITEMUSESUCCESSVIEW = "ItemUseSuccessView";
        /**
         *  韩国条款界面
         */
        BASE.KRAGREEMENTVIEW = "KRAgreementView";
        /**
         *  册封成功界面
         */
        BASE.WIFESTATUSSHOWVIEW = "WifestatusShowView";
    })(BASE = ViewConst.BASE || (ViewConst.BASE = {}));
    /**
     * 直接继承BaseBattleView的界面
     */
    var BATTLE;
    (function (BATTLE) {
        /**
         * 擂台战斗
         */
        BATTLE.ATKRACEBATTLEVIEW = "AtkraceBattleView";
        /**
         * 跨服擂台战斗
         */
        BATTLE.ATKRACECROSSBATTLEVIEW = "AtkracecrossBattleView";
        /**
         * 关卡boss
         */
        BATTLE.BOSSBATTLEVIEW = "BossBattleView";
        /**
         * 副本 战斗界面
         */
        BATTLE.DAILYBOSSBATTLEVIEW = "DailybossBattleView";
        /**
         * 军团副本 战斗界面
         */
        BATTLE.ALLIANCEBOSSBATTLEVIEW = "AllianceBossBattleView";
        /**
         * 战斗视图
         */
        BATTLE.BATTLEVIEW = "BattleView";
        /**
         * 关卡战斗视图
         */
        BATTLE.FIGHTVIEW = "FightView";
        /**
         * 关卡战斗视图
         */
        BATTLE.CONQUESTFIGHTVIEW = "ConquestFightView";
        /**
         * 称帝战斗视图
         */
        BATTLE.EMPERORWARBATTLEVIEW = "EmperorwarBattleView";
    })(BATTLE = ViewConst.BATTLE || (ViewConst.BATTLE = {}));
})(ViewConst || (ViewConst = {}));

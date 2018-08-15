/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
var NetRequestConst;
(function (NetRequestConst) {
    // 前端聊天请求类型(不是接口)
    NetRequestConst.REQUEST_CLIENT_CHAT = "request_client_chat";
    // 用户登录请求
    NetRequestConst.REQUEST_USER_LOGIIN = "user.login";
    // gettoken
    NetRequestConst.HTTP_GETACCESS_TOKEN = "getToken";
    // 同步请求
    NetRequestConst.REQUEST_USER_SYNC = "user.sync";
    // 门客升级
    NetRequestConst.REQUEST_UPGRADE_SERVANT = "servant.upgrade";
    // 门客升级10级
    NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN = "servant.upgradeten";
    // 红颜召唤、一键召唤
    NetRequestConst.REQUEST_WIFE_CALL = "wife.call";
    // 恢复红颜精力
    NetRequestConst.REQUEST_WIFE_RECOVERENERGY = "wife.recoverenergy";
    // 红颜宠幸
    NetRequestConst.REQUEST_WIFE_LOVE = "wife.love";
    // 红颜赏赐
    NetRequestConst.REQUEST_WIFE_AWARD = "wife.award";
    // 红颜技能升级
    NetRequestConst.REQUEST_WIFE_UPGRADESKILL = "wife.upgradeskill";
    // 道具使用
    NetRequestConst.REQUEST_USE_ITEM = "item.use";
    // 道具称号装配
    NetRequestConst.REQUEST_ITEM_TITLE = "item.title";
    // 商城购买道具
    NetRequestConst.REQUEST_SHOP_BUY_ITEM = "shop.buyitem";
    NetRequestConst.REQUEST_SHOP_GETSHOPCFG = "shop.getshopcfg";
    // 兑换四大谋士
    NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE = "activity.exchangefourpeople";
    // 牢房惩罚
    NetRequestConst.REQUEST_PRISON_PUNISH = "prison.punish";
    /**
     * 领取首冲奖励
     */
    NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD = "shop.firstchargereward";
    /**
     * 发起寻访
     */
    NetRequestConst.REQUEST_SEARCH_PLAY = "search.play";
    /**
     * 使用体力丹
     */
    NetRequestConst.REQUEST_SEARCH_PILL = "search.pill";
    /**
     * 关卡 发起战斗
     */
    NetRequestConst.REQUEST_CHALLENGE_ATTACK = "challenge.attack";
    /**
     * 关卡 恢复攻击次数
     */
    NetRequestConst.REQUEST_CHALLENGE_RECOVER = "challenge.recover";
    /**
     * 一键扫荡关卡
     */
    NetRequestConst.REQUEST_CHALLENGE_AUTOATTACK = "challenge.autoattack";
    // 扩展子嗣位置
    NetRequestConst.REQUEST_CHILD_ADDPOSNUM = "child.addposnum";
    // 修改子嗣名称
    NetRequestConst.REQUEST_CHILD_RENAME = "child.rename";
    // 子嗣培养
    NetRequestConst.REQUEST_CHILD_TRAIN = "child.train";
    // 子嗣一键培养
    NetRequestConst.REQUEST_CHILD_AUTOTRAIN = "child.autotrain";
    // 子嗣一键恢复活力
    NetRequestConst.REQUEST_CHILD_AUTORECOVER = "child.autorecover";
    // 恢复活力
    NetRequestConst.REQUEST_CHILD_RECOVER = "child.recover";
    // 科举考试/子嗣成年
    NetRequestConst.REQUEST_CHILD_EXAMINATION = "child.examination";
    // 处理政务
    NetRequestConst.REQUEST_MANAGE_DEALAFFAIR = "manage.dealaffair";
    // 使用政务令
    NetRequestConst.REQUEST_MANAGE_ADDAFFAIR = "manage.addaffair";
    /**
     * 经营资产
     */
    NetRequestConst.REQUEST_MANAGE_DEALFINANCE = "manage.dealfinance";
    /**
     * 一键经营资产
     */
    NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE = "manage.batchdealfinance";
    // 使用征收令
    NetRequestConst.REQUEST_MANAGE_ADDFINANCE = "manage.addfinance";
    // 领取主线任务奖励
    NetRequestConst.REQUEST_TASK_GETMAINTASK = "task.getmaintask";
    // 领取每日任务奖励
    NetRequestConst.REQUEST_TASK_GETDAILYTASK = "task.getdailytask";
    // 领取活跃奖励
    NetRequestConst.REQUEST_TASK_GETLIVENESS = "task.getliveness";
    /**
     * 获取离线奖励
     */
    NetRequestConst.REQUEST_MANAGE_AUTOFINANCE = "manage.autofinance";
    /**
     * 获取离线资源和当前经营信息
     */
    NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE = "manage.getautoandfinance";
    //玩家升官
    NetRequestConst.REQUEST_USER_UPGRADE = "user.upgrade";
    //检测游戏名称是否存在
    NetRequestConst.REQUEST_USER_CHECKNAME = "user.checkname";
    //修改游戏名称
    NetRequestConst.REQUEST_USER_CHANGENAME = "user.changename";
    //创建游戏角色
    NetRequestConst.REQUEST_USER_CREATEUSER = "user.createuser";
    /**
     * 聊天加密
     */
    NetRequestConst.REQUEST_CHAT_ENCRYPT = "chat.encrypt";
    /**
     * 排行榜相关接口
     */
    NetRequestConst.REQUEST_RANK_INDEX = "rank.index";
    NetRequestConst.REQUEST_RANK_VISIT = "rank.visit";
    NetRequestConst.REQUEST_RANK_USERSHOT = "rank.usershot";
    /**
     * 媒婆榜相关接口
     */
    /**
     * 定向提亲
     */
    NetRequestConst.REQUEST_RADULT_PROPOSE = "adult.propose";
    /**
     * 全服提亲
     */
    NetRequestConst.REQUEST_RADULT_PROPOSEALL = "adult.proposeall";
    /**
     * 获取向我提亲信息
     */
    NetRequestConst.REQUEST_RADULT_GETPROPOSEE = "adult.getpropose";
    /**
     * 获取区服所有的提亲信息
     */
    NetRequestConst.REQUEST_RADULT_GETALLPROPOSE = "adult.getallpropose";
    /**
     * 同意联姻
     */
    NetRequestConst.REQUEST_RADULT_AGREEPROPOSE = "adult.agreepropose";
    /**
     * 取消提亲
     */
    NetRequestConst.REQUEST_RADULT_CANCELPROPOSE = "adult.cancelpropose";
    /**
     * 一键/拒绝提亲请求
     *
     */
    NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE = "adult.refusepropose";
    /**
     * 获取媒婆结婚信息
     */
    NetRequestConst.REQUEST_RADULT_GETADULTINFO = "adult.getadultinfo";
    /**
     * 每日任务相关接口
     */
    NetRequestConst.REQUEST_DAILYTASK_GET = "task.getdailytask";
    NetRequestConst.REQUEST_DAILYLIVENESS_GET = "task.getliveness";
    NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS = "task.getliveness";
    /**
     * 我的邮件列表
     */
    NetRequestConst.REQUEST_MAIL_GET_MYMAILLIST = "mail.getmymaillist";
    /**
     * 查看邮件的详细内容
     */
    NetRequestConst.REQUEST_MAIL_GET_DETAIL = "mail.getdetail";
    /**
     * 获取邮件中的附件奖励
     */
    NetRequestConst.REQUEST_MAIL_GET_REWARDS = "mail.getrewardsbymail";
    /**
     * 皇宫接口
     * "获取皇宫具体信息",
     * "领取俸禄",
     * "修改签名",
     */
    NetRequestConst.REQUEST_PALACE_GETPALACEINFO = "palace.getpalaceinfo";
    NetRequestConst.REQUEST_PALACE_GETSALARY = "palace.getsalary";
    NetRequestConst.REQUEST_PALACE_SIGN = "palace.sign";
    /**
     * 宴会接口
     */
    NetRequestConst.REQUEST_DINNER_GETDINNER = "dinner.getdinner";
    NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL = "dinner.getdinnerdetail";
    NetRequestConst.REQUEST_DINNER_JOINDINNER = "dinner.joindinner";
    NetRequestConst.REQUEST_DINNER_CREATDINNER = "dinner.createdinner";
    NetRequestConst.REQUEST_DINNER_CANVIEWDINNER = "dinner.canviewdinner";
    NetRequestConst.REQUEST_DINNER_FEFRESHITEM = "dinner.refreshitem";
    NetRequestConst.REQUEST_DINNER_SHOPITEM = "dinner.shopitem";
    NetRequestConst.REQUEST_DINNER_SCOREDINNER = "dinner.scoretoitem";
    NetRequestConst.REQUEST_DINNER_HISTORY = "dinner.history";
    NetRequestConst.REQUEST_DINNER_TOP = "dinner.top";
    NetRequestConst.REQUEST_DINNER_SHAREDINNER = "dinner.sharedinner";
    NetRequestConst.REQUEST_DINNER_USEITEM = "dinner.useitem";
    /**
     * 签到接口
     */
    NetRequestConst.REQUEST_USER_ARRIVAL = "user.arrival";
    /**
     * 获取活动配置
     */
    NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG = "activity.getactivecfg";
    /**
     * 领取成就奖励
     */
    NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS = "achievement.getrewards";
    /**
     * 充值接口
     */
    NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT = "pay.processpayment";
    /**
     * 冲榜活动获取排行榜
     */
    NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE = "activity.getrankactive";
    /**
     * 充值活动接口
     "领取每日充值活动奖励",
     参数 activeId 活动ID  rkey 领取的是第几档
     参数 activeId 活动ID  rkey 领取的是第几档
     */
    NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD = "activity.getdailychargereward";
    NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD = "activity.gettotaldayrechargereward";
    NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD = "activity.gettotalrechargereward";
    /**
     * 狂欢节活动
     * 狂欢节充值
     * 狂欢节消费
     * 参数
     *	参数 activeId 活动ID  rkey 领取的是第几档
     *	参数 activeId 活动ID  rkey 领取的是第几档
     */
    NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE = "activity.getcarnivalcharge";
    NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST = "activity.getcarnivalcost";
    /**
     * 米莎来了活动
     *
     */
    NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD = "activity.getwifecomereward";
    /**
     * 领取限时活动奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD = "activity.getlimitedreward";
    /**
      * 领取vip奖励
      */
    NetRequestConst.REQUEST_VIP_VIPWELFARE = "shop.vipwelfare";
    /**
      * 兑换礼包码
      */
    NetRequestConst.REQUEST_USER_EXCHANGECARD = "user.exchangecard";
    NetRequestConst.REQUEST_SERVANT_UPABILITY = "servant.upability";
    NetRequestConst.REQUEST_SERVANT_UPSKILL = "servant.upskill";
    /**
     * 获取惩戒女囚活动信息
     */
    NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE = "activity.getpunishactive";
    /**
     * 西域商店
     */
    NetRequestConst.ACTIVITY_BUYVIPSHOP = "activity.buyvipshop";
    /**
    * 春季庆典 春季典庆-春季送礼"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMA = "activity.getspringitema";
    /**
    * 春季庆典 春季典庆-春季兑换"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMB = "activity.getspringitemb";
    /**
    * 春季庆典 春季典庆-踏青狂欢"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMC = "activity.getspringitemc";
    /**
   * 春季庆典 春季典庆-折扣特惠"
   */
    NetRequestConst.ACTIVITY_GETSPRINGITEMD = "activity.getspringitemd";
    /**
    * 购买惩戒道具
    */
    NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM = "activity.buypunishitem";
    /**
    * 使用惩戒道具
    */
    NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM = "activity.usepunishitem";
    NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH = "activity.autopunish";
    /**
    * 使用积分购买活动商店物品
    */
    NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP = "activity.buypunishshop";
    /**
     * 领取击杀奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD = "activity.getpunishreward";
    /**
    * 领取奖励春节攀升
    */
    NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD = "activity.getnewyearreward";
    /**
     * 领取奖励春节攀升 每天第一个元宝购买任务
     */
    NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT = "activity.buynewyeargift";
    /**
    * 领取解锁功能奖励
    */
    NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD = "otherinfo.getunlocklistreward";
    /**
    * 领取实名认证奖励（非3k）
    */
    NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION = "otherinfo.getcertification";
    NetRequestConst.REQUEST_SERVANT_UPAURA = "servant.upaura";
    NetRequestConst.REQUEST_SERVANT_CHANGE = "servant.change";
    /**
     * 设置自动捐款信息
     */
    NetRequestConst.REQUEST_SEARCH_SET = "search.set";
    /**
     * vip免费/花费捐款信息接口
     */
    NetRequestConst.REQUEST_SEARCH_BUY = "search.buy";
    /**
     * 擂台接口
     */
    NetRequestConst.REQUEST_ATKRACE_INDEX = "atkrace.index";
    NetRequestConst.REQUEST_ATKRACE_ATTRBUY = "atkrace.attrbuy";
    NetRequestConst.REQUEST_ATKRACE_FIGHT = "atkrace.fight";
    NetRequestConst.REQUEST_ATKRACE_REVENGE = "atkrace.revenge";
    NetRequestConst.REQUEST_ATKRACE_KILL = "atkrace.kill";
    NetRequestConst.REQUEST_ATKRACE_CHALLENGE = "atkrace.challenge";
    NetRequestConst.REQUEST_ATKRACE_RANDREWARD = "atkrace.randreward";
    NetRequestConst.REQUEST_ATKRACE_GETINFO = "atkrace.getinfo";
    NetRequestConst.REQUEST_ATKRACE_LIST = "atkrace.list";
    NetRequestConst.REQUEST_ATKRACE_RANK = "atkrace.rank";
    NetRequestConst.REQUEST_ATKRACE_HANDLE = "atkrace.handle";
    NetRequestConst.REQUEST_ATKRACE_ATTRBUYLIST = "atkrace.attrlist";
    NetRequestConst.REQUEST_ATKRACE_GETMODEL = "atkrace.getmodel";
    NetRequestConst.REQUEST_ATKRACE_USEEXTRA = "atkrace.useextra";
    NetRequestConst.REQUEST_ATKRACE_REFRESH = "atkrace.refresh";
    /**
     * 跨服擂台接口
     */
    NetRequestConst.REQUEST_ATKRACECROSS_INDEX = "atkraceg.index";
    NetRequestConst.REQUEST_ATKRACECROSS_ATTRBUY = "atkraceg.attrbuy";
    NetRequestConst.REQUEST_ATKRACECROSS_FIGHT = "atkraceg.fight";
    NetRequestConst.REQUEST_ATKRACECROSS_REVENGE = "atkraceg.revenge";
    NetRequestConst.REQUEST_ATKRACECROSS_KILL = "atkraceg.kill";
    NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE = "atkraceg.challenge";
    NetRequestConst.REQUEST_ATKRACECROSS_RANDREWARD = "atkraceg.randreward";
    NetRequestConst.REQUEST_ATKRACECROSS_GETINFO = "atkraceg.getinfo";
    NetRequestConst.REQUEST_ATKRACECROSS_LIST = "atkraceg.list";
    NetRequestConst.REQUEST_ATKRACECROSS_RANK = "atkraceg.rank";
    NetRequestConst.REQUEST_ATKRACECROSS_HANDLE = "atkraceg.handle";
    NetRequestConst.REQUEST_ATKRACECROSS_ATTRBUYLIST = "atkraceg.attrlist";
    NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL = "atkraceg.getmodel";
    NetRequestConst.REQUEST_ATKRACECROSS_USEEXTRA = "atkraceg.useextra";
    NetRequestConst.REQUEST_ATKRACECROSS_REFRESH = "atkraceg.refresh";
    NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK = "atkraceg.getactivityatk";
    /**
     * 获取道具合成配置
     */
    NetRequestConst.REQUEST_ITEM_GETCOMPOSE = "item.getcompose";
    /**
     * 获取道具合成配置
     */
    NetRequestConst.REQUEST_ITEM_GETMODEL = "item.getmodel";
    /**
     * 合成道具
     */
    NetRequestConst.REQUEST_ITEM_DOCOMPOSE = "item.docompose";
    /**
     * 联盟模块
     */
    NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE = "alliance.initalliance";
    NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE = "alliance.createalliance";
    NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE = "alliance.joinrandalliance";
    NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE = "alliance.findalliance";
    NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST = "alliance.getalliancelist";
    NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE = "alliance.applyalliance";
    NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY = "alliance.cancelapply";
    NetRequestConst.REQUEST_ALLIANCE_ACCEPT = "alliance.accept";
    NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY = "alliance.refuseapply";
    NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY = "alliance.refuseallapply";
    NetRequestConst.REQUEST_ALLIANCE_RENAME = "alliance.rename";
    NetRequestConst.REQUEST_ALLIANCE_MODINFO = "alliance.modinfo";
    NetRequestConst.REQUEST_ALLIANCE_SETSWITCH = "alliance.setswitch";
    NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE = "alliance.exitalliance";
    NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY = "alliance.getallianceapply";
    NetRequestConst.REQUEST_ALLIANCE_GETMEMBER = "alliance.getmember";
    NetRequestConst.REQUEST_ALLIANCE_SETPOS = "alliance.setpos";
    NetRequestConst.REQUEST_ALLIANCE_GETDETAILS = "alliance.getdetails";
    NetRequestConst.REQUEST_ALLIANCE_TRANSFER = "alliance.transfer";
    NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE = "alliance.kickalliance";
    NetRequestConst.REQUEST_ALLIANCE_DISBAND = "alliance.disband";
    NetRequestConst.REQUEST_ALLIANCE_DONATE = "alliance.donate";
    NetRequestConst.REQUEST_ALLIANCE_SHOPBUY = "alliance.shopbuy";
    NetRequestConst.REQUEST_ALLIANCE_ATTACK = "alliance.attack";
    NetRequestConst.REQUEST_ALLIANCE_OPENBOSS = "alliance.openboss";
    NetRequestConst.REQUEST_ALLIANCE_RECOVER = "alliance.recover";
    NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG = "alliance.getbosslog";
    NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK = "alliance.getbossrank";
    /**
     * "书院入席学习接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_STUDY = "bookroom.study";
    /**
     * "书院学习(一键)完成接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_FINISH = "bookroom.finish";
    /**
     * "书院购买席位接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_BUY = "bookroom.buy";
    /**
     * 练武场相关接口
     */
    NetRequestConst.REQUEST_STUDYATK_INDEX = "studyatk.index";
    NetRequestConst.REQUEST_STUDYATK_CREATE = "studyatk.create";
    NetRequestConst.REQUEST_STUDYATK_JOIN = "studyatk.join";
    NetRequestConst.REQUEST_STUDYATK_GOAWAY = "studyatk.goaway";
    NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL = "studyatk.getatkdetail";
    NetRequestConst.REQUEST_STUDYATK_GETATK = "studyatk.getatk";
    NetRequestConst.REQUEST_STUDYATK_UPGRADE = "studyatk.upgrade";
    /**
     * 副本 获取基本信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_GET = "dailyboss.get";
    /**
     * 副本 购买商店信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_BUY = "dailyboss.buy";
    /**
     * 获取副本排行榜
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETRANK = "dailyboss.getrank";
    /**
     * 获取副本具体详细信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS = "dailyboss.getdetails";
    /**
     * 副本 攻击
     */
    NetRequestConst.REQUEST_DAILYBOSS_ATTACK = "dailyboss.attack";
    /**
     * 副本 恢复攻击次数
     */
    NetRequestConst.REQUEST_DAILYBOSS_RECOVER = "dailyboss.recover";
    /**
     * 副本 获取蛮王伤害排行榜
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETATTACKRANK = "dailyboss.getattackrank";
    /**
     * 玩吧发送桌面奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD = "otherinfo.getwbsendreward";
    /**
     * 玩吧每日分享奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD = "otherinfo.getwbdailysharereward";
    /**
     * 领取手机绑定奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETBINDREWARD = "otherinfo.getbindreward";
    /**
     * 领取实名认证奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD = "otherinfo.getauthor3kreward";
    /**
     * 修改形象
     */
    NetRequestConst.REQUEST_USER_CHANGEPIC = "user.changepic";
    /**
     * 分阶段引导记录
     */
    NetRequestConst.REQUEST_USER_STEPGUILD = "user.stepguild";
    /**
     * 征伐接口
     */
    NetRequestConst.REQUEST_CONQUEST_INDEX = "conquest.index";
    NetRequestConst.REQUEST_CONQUEST_FIGHT = "conquest.fight";
    NetRequestConst.REQUEST_CONQUEST_RANK = "conquest.rank";
    NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT = "conquest.batchfight";
    //"通商随机对手接口",
    //"通商战斗接口",
    //"通商排行榜接口",
    //"一键通商战斗接口",
    NetRequestConst.REQUEST_TRADE_INDEX = "trade.index";
    NetRequestConst.REQUEST_TRADE_FIGHT = "trade.fight";
    NetRequestConst.REQUEST_TRADE_RANK = "trade.rank";
    NetRequestConst.REQUEST_TRADE_BATCHFIGHT = "trade.batchfight";
    //玩吧领取糖果活动奖励
    NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD = "otherinfo.getcandyreward";
    //疯狂游乐场关注领取奖励
    NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD = "otherinfo.getfkfocusreward";
    //疯狂游乐场分享成功
    NetRequestConst.REQUEST_OTHERINFO_FKSHARE = "otherinfo.fkshare";
    //疯狂游乐场领取分享奖励
    NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD = "otherinfo.getfksharereward";
    //获取玩吧积分奖励
    NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD = "otherinfo.getwbscorereward";
    //新手引导步骤记录
    NetRequestConst.REQUEST_USER_NEWERGUILD = "user.newerguild";
    //记录门客排序id
    NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT = "otherinfo.recordservantsort";
    //宫廷裁缝抽奖,兑换皮肤
    NetRequestConst.REQUEST_OTHER_ACTIVITY_USETAILOR = "activity.usetailor";
    NetRequestConst.REQUEST_OTHER_ACTIVITY_USETENTAILOR = "activity.usetentailor";
    NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN = "activity.exchangeskin";
    //红颜装配皮肤
    NetRequestConst.REQUEST_WIFE_EQUIP = "wife.equip";
    NetRequestConst.REQUEST_WIFE_READSKINRED = "wife.readskinred";
    /**
     * 跨服领取活动奖励
     */
    NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD = "atkraceg.winzidreward";
    /**
     * 邀请好友领取人数奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETINVITEREWARD = "invite.getinvitereward";
    /**
     * 邀请好友领取权势奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETPOWERREWARD = "invite.getpowerreward";
    /**
     * 邀请好友领取充值奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETRECHARGEREWARD = "invite.getrechargereward";
    /**
     * 邀请好友,获取数据
     */
    NetRequestConst.REQUEST_INVITE_GETINFO = "invite.getinfo";
    //聊天屏蔽
    NetRequestConst.REQUEST_CHAT_LIST = "chat.list";
    NetRequestConst.REQUEST_CHAT_BLOCK = "chat.block";
    NetRequestConst.REQUEST_CHAT_UNBLOCK = "chat.unblock";
    NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE = "activity.exchangewife";
    NetRequestConst.REQUEST_USER_GETKFMSG = "user.getkfmsg";
    NetRequestConst.REQUEST_USER_GETKFCARDMSG = "user.getkfcardmsg";
    NetRequestConst.REQUEST_PALACE_GETCROSSPALACE = "palace.getcrosspalace";
    NetRequestConst.REQUEST_PALACE_GETPALACERANK = "palace.getpalacerank";
    //称帝
    NetRequestConst.REQUEST_PRESTIGE_INDEX = "prestige.index";
    /**
     * 设置cover成功
     */
    NetRequestConst.REQUEST_OTHERINFO_SETCOVER = "otherinfo.setcover";
    /**
     * 领取cover奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD = "otherinfo.getcoverreward";
    /**
     * 领取绑定有礼奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD = "otherinfo.getgtfbreward";
    /*
     *五一活动
     */
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA = "activity.getmaydayitema"; //"五一转盘领取次数奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB = "activity.getmaydayitemb"; //"五一转盘充值奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMC = "activity.getmaydayitemc"; //"五一转盘任务奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRANK = "activity.getmaydayrank"; //五一转盘排行榜
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY = "activity.getmaydaylottery"; //五一转盘抽奖
    /**
     * 修身
     */
    NetRequestConst.REQUEST_REQUEST_INDEX = "practice.index";
    NetRequestConst.REQUEST_REQUEST_UPGRADE = "practice.upgrade";
    NetRequestConst.REQUEST_REQUEST_UNLOCK = "practice.unlock";
    NetRequestConst.REQUEST_REQUEST_COLLECT = "practice.collect";
    NetRequestConst.REQUEST_PRACTICE_UPSTORAGE = "practice.upstorage";
    /**
     * 册封
     */
    NetRequestConst.REQUEST_WIFESTATUS_CONFER = "wifestatus.confer";
    NetRequestConst.REQUEST_WIFESTATUS_AUTOCONFER = "wifestatus.autoconfer";
    /*
     *跨服亲密
     */
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK = "imacy.prank"; //个人排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK = "imacy.zrank"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD = "imacy.winzidreward"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY = "imacy.getactivityimacy";
    NetRequestConst.REQUEST_REQUEST_BUY = "practice.buy";
    /*
     *称帝战
     */
    NetRequestConst.REQUEST_EMPEROR_GETACTIVE = "emperor.getactive"; //个人排行
})(NetRequestConst || (NetRequestConst = {}));

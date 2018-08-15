var MessageConst;
(function (MessageConst) {
    MessageConst.MESSAGE_GAMECONFIG_LOADED = "message_gameconfig_loaded";
    /**选择门客列表中点击门客 */
    MessageConst.MESSAGE_SELECTED_SERVANT = "message_selected_servant";
    /**
     * 通知刷新主UI，mainUI
     */
    MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI = "message_notice_refresh_mainui";
    /**
     * 通知关闭上一个场景
     */
    MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE = "message_notice_hide_last_scene";
    /**
     * 主线任务进度更新通知刷新主UI，mainUI
     */
    MessageConst.MESSAGE_NOTICE_MAINTASK_REFRESH_UI = "message_notice_maintask_refresh_mainui";
    /**
     * 新手引导下一步通知
     */
    MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP = "message_notice_rookie_next_step";
    /**
     * 排行榜刷新选中行
     */
    MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM = "message_notice_refresh_rankitem";
    /**
     * 道具合成
     */
    MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND = "message_notice_item_compound";
    /**
     * 来聊天
     */
    MessageConst.MESSAGE_NOTICE_CHAT_COME = "message_notice_chat_come";
    /**
     * 商城购买道具
     */
    MessageConst.MESSAGE_NOTICE_SHOP_BUY = "message_notice_shop_buy";
    /**
     * 跑马灯
     */
    MessageConst.MESSAGE_NOTICE_SHOW_LAMP = "message_notice_show_lamp";
    /**
     * 在联姻列表点击联姻
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY = "message_notice_adult_clickmarry";
    /**
     * 打开邮件详情
     */
    MessageConst.MESSAGE_NOTICE_MAIL_DETAIL = "message_notice_mail_detail";
    /**
     * 刷新邮件列表数据
     */
    MessageConst.MESSAGE_NOTICE_MAIL_REFRESH = "message_notice_mail_refresh";
    /**
     * 在联姻请求列表点击拒绝
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY = "message_notice_adult_refusemarry";
    /**
     * 在联姻请求列表点击选择孩子
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD = "message_notice_adult_choosechild";
    /**
     * 在选择孩子界面点击联姻
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY = "message_notice_adult_childmarry";
    /**
     * 刷新联姻请求列表
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY = "message_notice_adult_refreshchildmarry";
    /**
     * 刷新成年子嗣列表
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFRESHADULTVIEW = "message_notice_adult_refreshadultview";
    /**
     * 编辑签名后刷新
     */
    MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT = "message_notice_refreshsign_after_edit";
    /**
     * 选服后通知
     */
    MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST = "message_notice_select_serverlist";
    /**
     * 签到
     */
    MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN = "message_notice_welfare_signin";
    /**
     * 领取成就奖励
     */
    MessageConst.MESSAGE_NOTICE_ACH_GETREWARD = "message_notice_ach_getreward";
    /**
     * 领取成就详情奖励
     */
    MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD = "message_notice_ach_getdetailreward";
    /**
     * 刷新成就外面的列表
     */
    MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST = "message_notice_ach_refreshlist";
    /**
     * 领取限时活动奖励
     */
    MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD = "message_notice_activity_limitedreward";
    /**
     * 宴会加入后刷新
     */
    MessageConst.MESSAGE_NOTICE_DINNER = "message_notice_dinner";
    /**
     * 用户信息model
     */
    MessageConst.MESSAGE_MODEL_USERINFO = "userinfo";
    /**
     * 道具model
     */
    MessageConst.MESSAGE_MODEL_ITEM = "item";
    /**
     * 门客model
     */
    MessageConst.MESSAGE_MODEL_SERVANT = "servant";
    /**
     * 红颜系统model
     */
    MessageConst.MESSAGE_MODEL_WIFE = "wife";
    /**
     * 红颜皮肤系统model
     */
    MessageConst.MESSAGE_MODEL_WIFESKIN = "wifeskin";
    /**
     * 红颜册封系统model
     */
    MessageConst.MESSAGE_MODEL_WIFESTATUS = "wifestatus";
    /**
     * 子嗣系统model
     */
    MessageConst.MESSAGE_MODEL_CHILD = "child";
    /**
     * 成年子嗣／媒婆系统model
     */
    MessageConst.MESSAGE_MODEL_ADULT = "adult";
    /**
     * 商城系统model
     */
    MessageConst.MESSAGE_MODEL_SHOP = "shop";
    /**
     * 关卡系统model
     */
    MessageConst.MESSAGE_MODEL_CHALLENGE = "challenge";
    /**
     * 寻访系统model
     */
    MessageConst.MESSAGE_MODEL_SEARCH = "search";
    /**
     * 资产经营，政务 model
     */
    MessageConst.MESSAGE_MODEL_MANAGE = "manage";
    /**
     * 主线任务系统model
     */
    MessageConst.MESSAGE_MODEL_MAINTASK = "maintask";
    /**
     *每日任务系统model
     */
    MessageConst.MESSAGE_MODEL_DAILYTASK = "dailytask";
    /**
     * 成就系统model
     */
    MessageConst.MESSAGE_MODEL_ACHIEVEMENT = "achievement";
    /**
     * 福利签到model
     */
    MessageConst.MESSAGE_MODEL_ARRIVAL = "arrival";
    /**
     * 其他杂项model
     */
    MessageConst.MESSAGE_MODEL_OTHERINFO = "otherinfo";
    /**
     * 开关系统model
     */
    MessageConst.MESSAGE_MODEL_SWITCH = "switch";
    /**
     * 邮件model
     */
    MessageConst.MESSAGE_MODEL_MYMAIL = "mymail";
    /**
     * 宴会信息model
     */
    MessageConst.MESSAGE_MODEL_DINNER = "dinner";
    /**
     * 活动model
     */
    MessageConst.MESSAGE_MODEL_ACTIVITY = "activity";
    /**
     * 支付model
     */
    MessageConst.MESSAGE_MODEL_PAYMENT = "payment";
    /**
     * 帮会model
     */
    MessageConst.MESSAGE_MODEL_ALLIANCE = "alliance";
    /**
     * 刷新model通知
     */
    MessageConst.MESSAGE_REFRESH_MODE = "message_mode_refresh";
    /**
     * 人望model
     */
    MessageConst.MESSAGE_MODEL_PRESTIGE = "prestige";
    /**
     * 渠道登录成功
     */
    MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS = "message_plat_login_success";
    /**
     * 赏赐红颜
     */
    MessageConst.MESSAGE_NOTICE_WIFE_GIVE = "message_notice_wife_give";
    /**
     * 红颜技能升级
     */
    MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD = "message_notice_wife_skillupd";
    MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST = "message_refresh_servant_itemlist";
    MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE = "message_refresh_servant_itemUse";
    /**
     * 购买惩戒道具
     */
    MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM = "message_notice_punish_buyitem";
    /**
     * 使用积分购买活动商店物品
     */
    MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM = "message_notice_punish_exitem";
    /**
     * 刷新道具合成界面
     */
    MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2 = "message_refresh_itemviewtab2";
    /**
     * 申请军团
     */
    MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE = "message_alliance_applyalliance";
    /**
     * 取消申请
     */
    MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE = "message_alliance_cancelapplyalliance";
    /**
     * 在军团申请列表点击拒绝
     */
    MessageConst.MESSAGE_ALLIANCE_REFUSEAPPLY = "message_alliance_refuseapply";
    /**
     * 在军团申请列表点击同意
     */
    MessageConst.MESSAGE_ALLIANCE_AGREEAPPLY = "message_alliance_agreeapply";
    /**
     * 重置擂台通知
     */
    MessageConst.MESSAGE_RESET_ATKRACE = "message_reset_atkrace";
    MessageConst.MESSAGE_RESET_ATKRACECROSS = "message_reset_atkracecross";
    MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND = "message_atkracecross_fightend";
    /**
     * 转让帮主
     */
    MessageConst.MESSAGE_ALLIANCE_TRANSFER = "message_alliance_transfer";
    /**
     * 退出军团
     */
    MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE = "message_alliance_exitalliance";
    /**
     * 被批准入团
     */
    MessageConst.MESSAGE_ALLIANCE_BEJOIN = "message_alliance_bejoin";
    /**
     * 被踢出团
     */
    MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK = "message_alliance_bekick";
    MessageConst.MESSAGE_STUDYATK_FINISH = "message_studyatk_finish";
    /**
     * 解散军团
     */
    MessageConst.MESSAGE_ALLIANCE_DISBAND = "message_alliance_disband";
    /**
     * 军团建设
     */
    MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD = "message_notice_alliance_build";
    MessageConst.MESSAGE_NOTICE_ALLIANCE_BOSSITEM = "message_notice_alliance_bossitem";
    /**
     * 登出消息
     */
    MessageConst.MESSAGE_NOTICE_LOGOUT = "message_notice_logout";
    MessageConst.MESSAGE_NOTICE_CHANGE_IMG = "message_notice_change_img";
    /**
     * rsdk初始化成功通知
     */
    MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS = "message_notice_rsdk_init_success";
    MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC = "message_notice_refresh_dailytask_afrer_sync";
    /**
     * 新手引导下一步
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_NEXT = "message_notice_guide_next";
    /**
     * 新手引导显示手
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND = "message_notice_guide_showhand";
    /**
     * 充值页面跳转
     */
    MessageConst.MESSAGE_RECHARFGE_RE = "message_recharfge_re";
    /**
     * 关闭牢房黑色背景
     */
    MessageConst.MESSAGE_CLOSE_BLACKPANEL = "message_close_blackPanel";
    /**
     * 生孩子触发引导
     */
    MessageConst.MESSAGE_CHILD_GUIDE = "message_child_guide";
    /**
     * 酒楼触发引导
     */
    MessageConst.MESSAGE_DINNER_GUIDE = "message_dinner_guide";
    MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT = "message_refresh_trade_after_fight";
    /**
     * 通知检测关注状态
     */
    // export let MESSAGE_CHECK_ATTENTION_ICON:string="message_check_attention_icon";
    /**
     * 玩吧分享成功
     */
    MessageConst.MESSAGE_WANBA_SHARE_SUCCESS = "message_wanba_share_success";
    /**
     * 港台登录通知
     */
    MessageConst.MESSAGE_NOTICE_TWLOGIN = "message_notice_twlogin";
    /**
     * 绑定账号查询结果通知
     */
    MessageConst.MESSAGE_NOTICE_BIND = "message_notice_bind";
    MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR = "message_notice_refresh_special_avatar";
    /**
     * IOS绑定手机
     */
    MessageConst.MESSAGE_IOS_BINDPHONE = "message_ios_bindphone";
    /**
     * 通知游戏登录背景加载完成了
     */
    MessageConst.MESSAGE_NOTICE_LOGINBG_LOAD_COMPLETE = "message_notice_loginbg_load_complete";
    /**
     * 充值礼包到期
     */
    MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT = "message_recharfge_box_timeout";
    /**
     * 刷新充值界面
     */
    MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW = "message_refresh_recharge_view";
    /**
     * 刷新终身卡界面
     */
    MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW = "message_refresh_yearcard_view";
    /**
     * 刷新功能预览文字
     */
    MessageConst.MESSAGE_REFRESH_FUNCTION_TXT = "message_refresh_function_txt";
    MessageConst.MESSAGE_REFRESH_SKIN_HEADBG = "message_refresh_skin_headbg";
    /**
     * 关闭牢房详情界面
     */
    MessageConst.MESSAGE_CLOSE_POPUPVIEW = "message_close_popupview";
    /**
     * 取消屏蔽
     */
    MessageConst.MESSAGE_CANCEBLOCK = "message_canceblock";
    /**
     * 宠幸完成
     */
    MessageConst.MESSAGE_WIFE_LOVECOM = "message_wife_lovecom";
    /**
     * 红颜许愿跨天
     */
    MessageConst.MESSAGE_WISHTRER_NEXTDAY = "message_wishtree_nextday";
    /**
     * 商城热卖跨天
     */
    MessageConst.MESSAGE_SHOP_NEXTDAY = "message_shop_nextday";
    /**
     * 隐藏显示NPC
     */
    MessageConst.MESSAGE_CHECKNPC_SHOW = "message_checknpc_show";
    /**
     * 狂欢节活动消费金额更改消息
     */
    MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE = "message_accarnival_change_charge";
    MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST = "message_accarnival_change_cost";
    /**
     * 米莎来了活动vo消息更改
     */
    MessageConst.MESSAGE_ACWIFECOME_VOCHANGE = "message_acwifecome_vochange";
    MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V = "message_dailycharge_refresh_v";
    /**
     * 五一活动数据刷新
     */
    MessageConst.MESSAGE_MAYDAY_FRESH_ITEM = "message_mayday_fresh_item";
    MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE = "message_mayday_freshturntable";
    /**
     * 刷新实名认证
     */
    MessageConst.MESSAGE_REALNAME = "message_realname";
    MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM = "message_notice_refresh_newyear_item";
    MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST = "message_refresh_newyear_list";
    MessageConst.MESSAGE_RESFESH_SPRING_ITEM = "message_refresh_spring_item";
    MessageConst.RESFESH_SPRING_TAB = "refresh_spring_tab";
    MessageConst.MESSAGE_RESFESH_SPRING_TAB = "message_refresh_spring_TAB";
    /**
     * 仕途红点
     */
    MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT = "message_refresh_newyear_redhot";
    /**
     * 关闭册封成功界面
     */
    MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE = "message_wifestatus_showclose";
    /**
     * 计算册封
     */
    MessageConst.MESSAGE_WIFESTATUS_STATE = "message_wifestatus_state";
    MessageConst.MESSAGE_REFRESH_PRACTICE_RED = "message_refresh_practice_red";
    MessageConst.MESSAGE_REFRESH_STORAGE = "message_refresh_storafe";
})(MessageConst || (MessageConst = {}));

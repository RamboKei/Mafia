--[[
模型规则
@author hyf
]]
local modelCfg = {
--模型
["model"] = "模型",
--用户信息
["model.userinfo"] = "用户信息",
["model.userinfo.uid"] = "用户游戏ID",
["model.userinfo.pic"] = "头像",
["model.userinfo.name"] = "用户名称",
["model.userinfo.level"] = "等级/官职",
["model.userinfo.exp"] = "经验/政绩",
["model.userinfo.vip"] = "VIP等级",
["model.userinfo.vipexp"] = "VIP经验",
["model.userinfo.gem"] = "钻石/元宝",
["model.userinfo.gold"] = "银两",
["model.userinfo.mygid"] = "帮派ID",
["model.userinfo.mygname"] = "帮派名称",
["model.userinfo.title"] = "装配称号id",
["model.userinfo.atk"] = "武力",
["model.userinfo.inte"] = "智力",
["model.userinfo.politics"] = "政治",
["model.userinfo.charm"] = "魅力",
["model.userinfo.power"] = "势力值",
["model.userinfo.buyg"] = "购买元宝数量",
["model.userinfo.buyt"] = "最户购买元宝时间",
["model.userinfo.freeg"] = "免费获得元宝",
["model.userinfo.tcost"] = "总共消耗元宝",
["model.userinfo.olt"] = "最后在线时间",
["model.userinfo.updated_at"] = "数据上次更新时间",

--用户其他一些游戏内的信息 客户端无视
["model.gameinfo"] = "用户一些其他信息",
["model.gameinfo.pid"] = "用户外部ID或者平台ID",
["model.gameinfo.regdt"] = "注册时间",
["model.gameinfo.logindt"] = "最户登录时间",
["model.gameinfo.ip"] = "ip",
["model.gameinfo.logdc"] = "累计登录天数",
["model.gameinfo.plat"] = "平台",
["model.gameinfo.packver"] = "版本号",
["model.gameinfo.luaver"] = "lua版本号",
["model.gameinfo.bindid"] = "绑定ID",
["model.gameinfo.bindtype"] = "绑定手机类型",
["model.gameinfo.stepguild"] = "分阶段引导的步骤",
["model.gameinfo.newerflag"] = "新手引导完成的标记",
["model.gameinfo.lastday"] = "特殊数据重置时间",
["model.gameinfo.updated_at"] = "数据上次更新时间",

--道具信息
["model.item"] = "道具信息",
["model.item.info"]="道具信息",
["model.item.info.*"]="道具id及数量",
["model.item.tinfo.*"]="获得的称号{titleid:1}",
["model.item.cinfo.*"]="道具合成记录 version:版本，st:开始时间,info{itemId:合成次数},ismodify:是否修改",
["model.item.cinfo.version"]="道具合成开启版本",
["model.item.cinfo.st"]="道具合成版本开启时间",
["model.item.cinfo.et"]="道具合成版本结束时间",
["model.item.updated_at"] = "数据上次更新时间",

--门客系统
["model.servant"] = "门客系统信息",
["model.servant.info.*"] = "门客类型及具体信息",
["model.servant.info.*.lv"] = "门客等级",
["model.servant.info.*.clv"] = "门客突破等级 解锁对应的等级上限",
["model.servant.info.*.ability"] = "门客书籍资质对应的技能",
["model.servant.info.*.abilityExp"] = "门客书籍经验",
["model.servant.info.*.skillExp"] = "门客技能经验",
["model.servant.info.*.skill"] = "门客技能等级信息",
["model.servant.info.*.hasexp"] = "门客已升级经验",
["model.servant.info.*.total"] = "门客的总属性",
["model.servant.info.*.attr"] = "门客的四种属性最终值",
["model.servant.info.*.attr.[1]"] = "门客的武力",--js 里为0 1 2 3
["model.servant.info.*.attr.[2]"] = "门客的智力",
["model.servant.info.*.attr.[3]"] = "门客的政治",
["model.servant.info.*.attr.[4]"] = "门客的魅力",
["model.servant.info.*.attrAdd"] = "门客的四种属性详情",
["model.servant.info.*.attrAdd.[1]"] = "门客的武力增加详情",
["model.servant.info.*.attrAdd.[1].[1]"] = "门客的武力增加资质增加",
["model.servant.info.*.attrAdd.[1].[2]"] = "门客的武力增加丹药增加",
["model.servant.info.*.aura"] = "门客的光环",
["model.servant.info.*.aura.[1]"] = "门客的光环等级",
["model.servant.info.*.aura.[2]"] = "门客的光环等级",

--红颜系统
["model.wife"] = "红颜系统信息",
["model.wife.info"] = "红颜类型及具体信息",
["model.wife.info.*"] = "红颜类型及具体信息",
["model.wife.info.*.intimacy"] = "红颜的亲密度",
["model.wife.info.*.exp"] = "红颜的经验",
["model.wife.info.*.glamour"] = "红颜的魅力",
["model.wife.info.*.child"] = "红颜的儿子数量",
["model.wife.info.*.skill"] = "红颜的技能信息",

--红颜装饰系统
["model.wifeskin"] = "红颜装饰系统信息",
["model.wifeskin.info"] = "红颜装饰具体信息",
["model.wifeskin.info.*"] = "红颜装饰具体信息",
["model.wifeskin.info.*.skin"] = "具体红颜的具体皮肤信息",
["model.wifeskin.info.*.skin.*"] = "具体红颜的具体皮肤有哪些",
["model.wifeskin.info.*.skin.*.red"] = "具体红颜的具体皮肤是否有红点 1有 0没有",
["model.wifeskin.info.*.equip"] = "红颜装配的皮肤ID ''为默认皮肤",

--子嗣系统
["model.child"] = "子嗣系统信息",
["model.child.posnum"] = "子嗣的扩展位置",
["model.child.cnum"] = "当前子嗣的数量",
["model.child.info"] = "子嗣ID及具体信息",
["model.child.info.*"] = "子嗣ID及具体信息",
["model.child.info.*.mother"] = "子嗣的母亲ID",
["model.child.info.*.name"] = "子嗣的名称",
["model.child.info.*.vigour"] = "子嗣的活力",
["model.child.info.*.lv"] = "子嗣的等级",
["model.child.info.*.attr"] = "子嗣的属性",
["model.child.info.*.sex"] = "子嗣的性别1 男 2女",
["model.child.info.*.quality"] = "子嗣的品质",
["model.child.info.*.exp"] = "子嗣当前的经验",
["model.child.info.*.bts"] = "子嗣的出生时间",

--成年子嗣／媒婆系统
["model.adult"] = "成年子嗣系统信息",
["model.adult.info"] = "未婚子嗣ID及具体信息",
["model.adult.info.*"] = "未婚子嗣ID及具体信息",
["model.adult.info.*.quality"] = "资质",
["model.adult.info.*.aquality"] = "身份",
["model.adult.info.*.attr"] = "四种属性",
["model.adult.info.*.lv"] = "等级",
["model.adult.info.*.sex"] = "性别1 男 2女",
["model.adult.info.*.name"] = "子嗣的名称",
["model.adult.info.*.mother"] = "子嗣的母亲ID",
["model.adult.info.*.pro"] = "提亲请求的截止时间及提亲方式[et,1/2]",
["model.adult.info.*.total"] = "自己孩子总属性值",
["model.adult.info.*.ts"] = "自己孩子成年的时间",

["model.adult.minfo"] = "已婚子嗣ID及具体信息",
["model.adult.minfo.*"] = "已婚子嗣ID及具体信息",
["model.adult.minfo.*.quality"] = "资质",
["model.adult.minfo.*.aquality"] = "身份",
["model.adult.minfo.*.attr"] = "四种属性",
["model.adult.minfo.*.total"] = "自己孩子总属性值",
["model.adult.minfo.*.ftotal"] = "伴侣总属性值",
["model.adult.minfo.*.lv"] = "等级",
["model.adult.minfo.*.sex"] = "自己孩子性别1 男 2女",
["model.adult.minfo.*.name"] = "子嗣的名称",
["model.adult.minfo.*.mother"] = "子嗣的母亲ID",
["model.adult.minfo.*.fname"] = "伴侣的名字",
["model.adult.minfo.*.funame"] = "伴侣父亲的名字",
["model.adult.minfo.*.fuid"] = "伴侣父亲的uid",
["model.adult.minfo.*.fattr"] = "伴侣属性",
["model.adult.minfo.*.mts"] = "结婚的时间",

["model.adult.marry"] = "通知我结婚的子嗣ID",
["model.adult.refuse"] = "通知我拒绝提亲返还的道具或者钻石",

--商城系统
["model.shop"] = "商城信息",
["model.shop.info"] = "用户商城购买信息及版本信息",
["model.shop.info.sinfo.*"]="商城特惠礼包购买shopid及数量{shopid:num}",
["model.shop.info.hinfo.*"]="商城热卖购买shopid及数量{shopid:num}",
["model.shop.info.version"]="商城购买配置版本",
["model.shop.info.st"]="商城购买配置版本开启时间",
["model.shop.info.et"]="商城购买配置结束",
["model.shop.vipinfo.*"]="vip奖励领取信息{vip_level:1}",
["model.shop.pay.*"]="充值购买信息{gemType充值档位:1}",
["model.shop.payflag"]="是否首冲过 0未首冲 1已首冲 2已领取",
["model.shop.monthcard"]="月卡购买{et=月卡结束时间，gett=月卡上次领取时间}",
["model.shop.yearcard"]="年卡购买{et=年卡结束时间，gett=年卡上次领取时间}",
["model.shop.lastday"] = "服务端时间变化标识",

--关卡系统 方便以后扩展
["model.challenge"] = "关卡信息",
["model.challenge.cid"] = "目前通过的关卡ID",
["model.challenge.ksoldier"] = "正在战斗的关卡已经消灭的士兵数／boss已经消灭的血量",
["model.challenge.info"] = "攻击过的门客信息 1001 ＝ 1已攻击过 可恢复 2攻击过 不可恢复",

--寻访系统
["model.search"] = "寻访信息",
["model.search.strength"] = "玩家体力信息",
["model.search.strength.*"] = "玩家体力值及玩家上次寻访时间",
["model.search.info"] = "玩家获取红颜进度信息",
["model.search.info.*"] = "获取红颜id及红颜进度值",
["model.search.lucky.*"] = "运势相关信息",
["model.search.lucky.st"] = "上次恢复运势时间",
["model.search.lucky.num"] = "当前运势值",
["model.search.lucky.vipfree"] = "vip免费使用逆天运势次数",
["model.search.lucky.buynum"] = "当日捐款购买次数",
["model.search.lucky.foodopen"] = "是否开启自动粮食捐款",
["model.search.lucky.goldopen"] = "是否开启自动银两捐款",
["model.search.lucky.autoset"] = "自动设置运势值",
["model.search.updated_at"] = "数据上次更新时间",

--资产经营，政务
["model.manage"] = "资产经营，政务信息",
["model.manage.finfo"] = "资产信息",
["model.manage.finfo.*"] = "资产信息",
["model.manage.finfo.gold"] = "商产信息",
["model.manage.finfo.gold.num"] = "当前可用商产次数",
["model.manage.finfo.gold.st"] = "商产计时时间",
["model.manage.finfo.food"] = "农产信息",
["model.manage.finfo.food.num"] = "当前可用农产次数",
["model.manage.finfo.food.st"] = "农产计时时间",
["model.manage.finfo.soldier"] = "招募士兵信息",
["model.manage.finfo.soldier.num"] = "当前可用招兵次数",
["model.manage.finfo.soldier.st"] = "招兵计时时间",
["model.manage.ainfo"] = "政务信息",
["model.manage.ainfo.num"] = "当前可用政务次数",
["model.manage.ainfo.st"] = "政务计时时间",
["model.manage.ainfo.opt"] = "待处理政务id",

--主线任务系统
["model.maintask"] = "主线任务信息",
["model.maintask.info"] = "主线任务信息",
["model.maintask.info.id"] = "主线任务Id",
["model.maintask.info.v"] = "主线任务值",

--每日任务系统
["model.dailytask"] = "每日任务信息",
["model.dailytask.liveness"] = "每日任务活跃度",
["model.dailytask.rewards"] = "每日任务活跃奖励领取信息",
["model.dailytask.info"] = "每日任务信息",
["model.dailytask.info.*"] = "每日任务ID",
["model.dailytask.info.*.f"] = "每日任务领取情况0未完成 1已完成 2已领取",
["model.dailytask.info.*.v"] = "每日任务值",

--成就系统
["model.achievement"] = "成就信息",
["model.achievement.info"] = "成就信息",
["model.achievement.info.*"] = "成就信息ID",
["model.achievement.info.*.stage"] = "成就阶段",
["model.achievement.info.*.v"] = "成就达成的值",
["model.achievement.info.*.f"] = "成就领取情况0未完成 1已完成 2已领取",

--福利签到
["model.arrival"] = "签到信息",
["model.arrival.info"] = "是否已领奖 1已领奖 0未领奖",
["model.arrival.arrival_count"] = "累计签到天数",
["model.arrival.updated_at"] = "数据上次更新时间",

--其他杂项
["model.otherinfo"] = "其他杂项信息",
["model.otherinfo.rv_info"] = "排行榜膜拜信息",
["model.otherinfo.rv_info.power"] = "是否势力膜拜 1=已膜拜 0=未膜拜",
["model.otherinfo.rv_info.challenge"] = "是否关卡膜拜 1=已膜拜 0=未膜拜",
["model.otherinfo.rv_info.imacy"] = "是否亲密度膜拜 1=已膜拜 0=未膜拜",

["model.otherinfo.palace"] = "领取俸禄信息",
["model.otherinfo.palace.flag"] = "今日是否领取俸禄 0未领取 1已领取",

["model.otherinfo.info"] = "其他杂项标记信息",
["model.otherinfo.info.bindFlag"] = "手机绑定标记 0未领取 1已领取",
["model.otherinfo.info.wbsendFlag"] = "玩吧发送桌面标记 0未发送 1已发送",
["model.otherinfo.info.wbdailyshareFlag"] = "玩吧每日分享标记 0未分享 1已分享",
["model.otherinfo.banet"] = "禁言玩家时间",
["model.otherinfo.info.wbGiftinfo"] = "玩吧奖励领取{'201':1} 1代表已领取 0可以领取",
["model.otherinfo.info.unlockList"] = "功能解锁奖励领取信息 1代表已领取",

["model.otherinfo.info.candy"] = "玩吧糖果活动信息",
["model.otherinfo.info.candy.today"] = "玩吧糖果活动上次领取0点时间",
["model.otherinfo.info.candy.get"] = "玩吧糖果活动已经领取天数",

["model.otherinfo.info.author3k"] = "3k实名认证已领取 不存在即未领取",

["model.otherinfo.info.fkFocus"] = "疯狂游乐场关注奖励已领取 不存在即未领取",
["model.otherinfo.info.fkShare"] = "疯狂游乐场关分享信息",
["model.otherinfo.info.fkShare.n"] = "疯狂游乐场关分享次数",
["model.otherinfo.info.fkShare.get"] = "疯狂游乐场关分享奖励领取信息",

["model.otherinfo.info.sortId"] = "门客排序ID 不存在即默认情况",

["model.otherinfo.info.certification"] = "实名认证奖励已领取 不存在即未领取",
["model.otherinfo.info.shareguide"] = "分享引导领取奖励次数",

--开关系统
["model.switch"] = "开关系统 0关闭 1开启",
["model.switch.funAdult"] = "媒婆开关系统",
["model.switch.funAutoResManage"] = "自动挂机开关",
--邮件
["model.mymail"] = "我的邮件model",
["model.mymail.info"] = "我的邮件的相关信息（暂时不用）",
["model.mymail.system"] = "系统邮件",
["model.mymail.system.st"] = "收件时间",
["model.mymail.system.istouch"] = "是否有附件",
["model.mymail.system.isread"] = "是否读过 0未读  1已读",
["model.mymail.system.mid"] = "邮件库id",
["model.mymail.system.title"] = "邮件名称",
["model.mymail.system.touch"] = "附件内容",
["model.mymail.system.ruid"] = "系统",
["model.mymail.system.hadget"] = "是否领过 0未领 1已领取",
["model.mymail.lastday"] = "特殊数据重置时间",

--宴会信息
["model.dinner"] = "宴会模型",
["model.dinner.num"] = "当前宴会人数",
["model.dinner.point"] = "当前宴会分数",
["model.dinner.is_full"] = "宴会是否人数已满",
["model.dinner.dtype"] = "当前宴会类型： 1家宴 2官宴",
["model.dinner.is_open"] = "宴会是否公开 1公开 0不公开",
["model.dinner.end_time"] = "宴会结束时间",
["model.dinner.day_num"] = "参宴次数",
["model.dinner.jinfo.*"] = "当前举办宴会的来宾信息",
["model.dinner.jinfo.*.name"] = "来宾name",
["model.dinner.jinfo.*.type"] = "来宾赴宴方式",
["model.dinner.jinfo.*.join_time"] = "来宾赴宴时间",
["model.dinner.total_score"] = "总积分",
["model.dinner.shop_num"] = "商店刷新次数",
["model.dinner.shop_last_time"] = "记录自动刷新时间",
["model.dinner.shop_info"] = "积分商店道具信息[shop1,shop2]",
["model.dinner.buy_info"] = "积分购买的道具信息[posid1:1,posid2:1]",
["model.dinner.other_info.*"] = "杂项",
["model.dinner.other_info.isshare"] = "上次分享到聊天的时间",
["model.dinner.lastday"] = "请求处理最后时间",

["model.activity"] = "活动信息",
["model.activity.info"] = "活动信息",
["model.activity.info.*.st"] = "活动开始时间",
["model.activity.info.*.et"] = "活动结束时间",
["model.activity.info.*.aid"] = "活动的类型",
["model.activity.info.*.code"] = "活动的版本",
["model.activity.info.*.v"] = "活动的值",
["model.activity.info.*.atype"] = "活动的具体的类型",
["model.activity.info.*.red"] = "限时类活动是否有红点奖励 true 有 false 没有",

["model.activity.info.dailyCharge-*"] = "每日充值",
["model.activity.info.totalDayRecharge-*"] = "累天充值",
["model.activity.info.totalRecharge-*"] = "累计充值",
["model.activity.info.fourPeople-*"] = "四大活动",
["model.activity.info.limitedReward-*"] = "限时奖励",
["model.activity.info.rankActive-*"] = "冲榜活动",
["model.activity.info.punish-*"] = "惩戒女囚",

["model.activity.info.punish-*.item"] = "惩戒女囚:每日道具购买信息",
["model.activity.info.punish-*.shop"] = "惩戒女囚:商店购买信息",
["model.activity.info.punish-*.score"] = "惩戒女囚:商店积分",
["model.activity.info.punish-*.v"] = "惩戒女囚:活跃积分",
["model.activity.info.punish-*.get"] = "惩戒女囚:今日击杀奖励是否已领取",

["model.activity.info.wifeCome-*.v"] = "红颜销售活动 充值元宝数量",
["model.activity.info.wifeCome-*.get"] = "红颜销售活动:红颜奖励是否已领取 0 未领取 1已领取",



--书院
["model.bookroom.pos_num"] = "书院席位数",
["model.bookroom.info.*"] = "书院席位学习情况info{pos:{servantid:xx,et:xx}}",
["model.bookroom.info.*.servantid"] = "门客id",
["model.bookroom.info.*.et"] = "结束时间",

--翰林/练武场模型
["model.studyatk"] = "练武场模型",
["model.studyatk.minfo"] = "房间人员信息",
["model.studyatk.minfo.pos.*"] = "房间位置信息",
["model.studyatk.minfo.pos.*.uid"] = "位置上的uid",
["model.studyatk.minfo.pos.*.pro_et"] = "保护截止时间",
["model.studyatk.minfo.pos.*.join_st"] = "入场时间",
["model.studyatk.minfo.pos.*.atkinfo.*"] = "被攻击信息",
["model.studyatk.minfo.pos.*.atkinfo.*.uid"] = "被uid攻击",
["model.studyatk.minfo.pos.*.atkinfo.*.st"] = "被uid攻击时间",
["model.studyatk.minfo.atkinfo.*"] = "房间争斗日志",
["model.studyatk.minfo.atkinfo.*.name1"] = "攻击者uid",
["model.studyatk.minfo.atkinfo.*.ret"] = "结果 -1失败 1成功",
["model.studyatk.minfo.atkinfo.*.name2"] = "被攻击者uid",
["model.studyatk.skillinfo.*"] = "翰林经验信息",
["model.studyatk.skillinfo.total"] = "总经验积分",
["model.studyatk.skillinfo.levle"] = "当前翰林技能关卡",
["model.studyatk.minfo.finishinfo"] = "结算信息",
["model.studyatk.minfo.finishinfo.ret"] = "-1失败被踢出 1成功修行",
["model.studyatk.minfo.finishinfo.uname"] = "攻击者",
["model.studyatk.minfo.finishinfo.studytime"] = "学习时间",
["model.studyatk.minfo.finishinfo.getskill"] = "获取技能",
["model.studyatk.create_time"] = "房间创建时间",
["model.studyatk.skillrate"] = "房间翰林获取速率",
["model.studyatk.join_uid"] = "当前参加的练武场uid",
["model.studyatk.join_st"] = "加入练武场的创建时间",
["model.studyatk.goout_time"] = "上次被驱赶时间",


--牢房
["model.prison"] = "牢房模型",
["model.prison.info"] = "牢房信息",
["model.prison.info.*"] = "牢房中囚犯id和惩罚次数",
["model.prison.mypre"] = "我的名望",
["model.prison.dailypre"] = "每日产出",
["model.prison.maxpre"] = "名望上限",

--副本
["model.dailyboss"] = "副本模型",
["model.dailyboss.info"] = "",
["model.dailyboss.shop"] = "每日商店购买信息购买key及数量",
["model.dailyboss.score"] = "副本商店积分",
["model.dailyboss.tscore"] = "副本活动积分",
["model.dailyboss.servant"] = "门客是否攻击过具体信息{'1001':1} 1已经攻击过 可以恢复 2已经攻击过且不能恢复",
["model.dailyboss.info.clearFlag"] = "通关奖励是否领取过 true 领取过",

-- 帮派model
["model.alliance"] = "帮派model",
["model.alliance.id"] = "帮派id",
["model.alliance.creator"] = "帮派创建者uid",
["model.alliance.creatorname"] = "帮派创建者名称",
["model.alliance.exp"] = "帮派经验",
["model.alliance.list"] = "玩家成员",
["model.alliance.mn"] = "帮派总人数",
["model.alliance.maxmn"] = "帮派当前最大人数",
["model.alliance.name"] = "帮派名称",
["model.alliance.cqq"] = "qq",
["model.alliance.pswd"] = "密码",
["model.alliance.cweixin"] = "微信",
["model.alliance.level"] = "帮派等级",
["model.alliance.intro"] = "对外公告",
["model.alliance.message"] = "对内公告",
["model.alliance.log"] = "帮派日志",
["model.alliance.wealth"] = "帮派财富",
["model.alliance.affect"] = "帮派势力",
["model.alliance.switch"] = "招募是否开启0随机加入 1拒绝随机加入",
["model.alliance.boss"] = "开启的帮派boss情况",
["model.alliance.info"] = "帮派的一些杂项信息",
["model.alliance.info.donateNum"] = "帮派已捐献次数 不存在即为0",
["model.alliance.info.kickNum"] = "帮派今日踢人次数 不存在即为0",
["model.alliance.lastday"] = "特殊数据重置时间",
["model.alliance.updated_at"] = "数据上次更新时间",

["model.alliancemember"] = "帮派成员model",
["model.alliancemember.*"] = "帮派成员ID",
["model.alliancemember.*.name"] = "帮派成员名称",
["model.alliancemember.*.pic"] = "帮派成员头像",
["model.alliancemember.*.level"] = "帮派成员官职",
["model.alliancemember.*.ctv"] = "帮派成员当前贡献值",
["model.alliancemember.*.tctv"] = "帮派成员总贡献值",
["model.alliancemember.*.po"] = "帮派成员职位",
["model.alliancemember.*.donate"] = "捐献的ID",
["model.alliancemember.*.logindt"] = "帮派成员最后登录时间",

["model.allianceapply"] = "帮派申请名单",
["model.allianceapply.*"] = "帮派申请名单",
["model.allianceapply.*.name"] = "申请成员名称",
["model.allianceapply.*.pic"] = "申请成员头像",
["model.allianceapply.*.level"] = "申请成员官职",
["model.allianceapply.*.power"] = "帮派成员势力",

-- 我与帮派的关系model
["model.myalliance"] = "我与帮派的关系model",
["model.myalliance.uid"] = "玩家uid",
["model.myalliance.info"] = "记录玩家的杂项信息",
["model.myalliance.info.joinFlag"] = "1加入军团的标记",
["model.myalliance.apply"] = "玩家申请信息",
["model.myalliance.po"] = "玩家职位 4普通成员 3精英 2副盟主 1盟主",
["model.myalliance.tctv"] = "总贡献值",
["model.myalliance.ctv"] = "当前贡献值",
["model.myalliance.donate"] = "捐献信息",
["model.myalliance.donate.et"] = "上次捐献时间",
["model.myalliance.donate.id"] = "捐献的类别ID",
["model.myalliance.joint"] = "加入帮派时间",
["model.myalliance.nextt"] = "下次可以加入帮派的时间",
["model.myalliance.servant"] = "攻击帮派boss的门客信息情况{'1001':1} 1已经攻击过 可以恢复 2已经攻击过且不能恢复",
["model.myalliance.lastday"] = "特殊数据重置时间",
["model.myalliance.updated_at"] = "数据上次更新时间",

-- 征伐信息模型model
["model.conquest"] = "征伐信息模型",
["model.conquest.uid"] = "玩家uid",
["model.conquest.point"] = "征伐分数",
["model.conquest.tnum"] = "累计征伐次数",
["model.conquest.info.*"] = "征伐战斗相关信息",
["model.conquest.info.cid"] = "当前征伐的波数",
["model.conquest.info.cinfo"] = "征伐战斗对手相关信息",
["model.conquest.info.cinfo.*.rewards.*"] = "随机对手的奖励信息(奖励格式)",
["model.conquest.lastday"] = "特殊数据重置时间",
["model.conquest.updated_at"] = "数据上次更新时间",

-- 通商信息模型model
["model.trade"] = "通商信息模型",
["model.trade.uid"] = "玩家uid",
["model.trade.point"] = "通商分数",
["model.trade.flag"] = "是否开启一键通商",
["model.trade.info.*"] = "通商战斗相关信息",
["model.trade.info.cid"] = "当前通商的波数",
["model.trade.info.rewards.*"] = "随机对手的奖励信息(奖励格式)",
["model.trade.lastday"] = "特殊数据重置时间",
["model.trade.updated_at"] = "数据上次更新时间",

-- 邀请好友模型model
["model.invite"] = "邀请信息模型",
["model.invite.info"] = "邀请的好友信息",
["model.invite.info.*"] = "邀请的好友信息",
["model.invite.info.*.[1]"] = "好友用户ID",
["model.invite.info.*.[2]"] = "好友用户服号",
["model.invite.info.*.[3]"] = "好友用户势力",
["model.invite.info.*.[4]"] = "好友用户充值",
["model.invite.info.*.[5]"] = "好友用户头像",
["model.invite.info.*.[6]"] = "好友用户昵称",
["model.invite.info.*.[7]"] = "好友邀请时间戳",
["model.invite.rinfo"] = "邀请系统奖励信息",
["model.invite.rinfo.invite"] = "邀请奖励信息",
["model.invite.rinfo.invite.*"] = "邀请奖励信息是否领取",
["model.invite.rinfo.power"] = "邀请用户势力奖励信息",
["model.invite.rinfo.power.*"] = "邀请用户势力奖励信息对应配置已领取数量",
["model.invite.rinfo.recharge"] = "邀请用户充值奖励信息",
["model.invite.rinfo.recharge.*"] = "邀请用户充值奖励信息对应配置已领取数量",
["model.invite.iinfo"] = "邀请者信息",
["model.invite.platname"] = "自己平台昵称",
["model.invite.platurl"] = "自己平台头像",

-- 聊天屏蔽信息模型model
["model.chatblock"] = "通商信息模型",
["model.chatblock.uid"] = "玩家uid",
["model.chatblock.info.*"] = "通商战斗相关信息[uid1,uid2]",

-- 声望模型 prestige
["model.prestige"] = "通商信息模型",
["model.prestige.uid"] = "玩家uid",
["model.prestige.pem"] = "声望币",
["model.prestige.info.*"] = "声望阶段信息{pid:声望阶段,v:声望值}",
["model.prestige.log"] = "声望日志{type:类型,st:时间,v:值} 0每日任务；冲榜atype",

-- 修身模型 practice
["model.practice"] = "修身信息模型",
["model.practice.attr"] = "修身属性",
["model.practice.attr.[0]"] = "修身属性:武力",
["model.practice.attr.[1]"] = "修身属性:智力",
["model.practice.attr.[2]"] = "修身属性:政治",
["model.practice.attr.[3]"] = "修身属性:魅力",
["model.practice.level"] = "修身等级",
["model.practice.exp"] = "修身阅历",
["model.practice.spd"] = "修身阅历生产速度",
["model.practice.storage"] = "修身阅历仓库",
["model.practice.storage.num"] = "修身阅历仓库上次存储数量",
["model.practice.storage.st"] = "修身阅历仓库上次存储时间",
["model.practice.ability"] = "修身资质信息",
["model.practice.ability.[0]"] = "修身资质属性:武力",
["model.practice.ability.[1]"] = "修身资质属性:智力",
["model.practice.ability.[2]"] = "修身资质属性:政治",
["model.practice.ability.[3]"] = "修身资质属性:魅力",
["model.practice.task"] = "资质任务详情",
["model.practice.task.*.stage"] = "成就阶段",
["model.practice.task.*.v"] = "成就达成的值",
["model.practice.task.*.f"] = "成就领取情况0未完成 1已完成",
["model.practice.info"] = "修身杂项详情",
["model.practice.info.buynum"] = "今日修身阅历购买次数",

-- 位分模型
["model.wifestatus"] = "位分信息模型",
["model.wifestatus.star"] = "星星数值",
["model.wifestatus.level"] = "解锁到的位分位置",
["model.wifestatus.info"] = "位分详情",
["model.wifestatus.info.*"] = "位分的位置",
["model.wifestatus.info.*.*"] = "位分的红颜ID",

-- 分封&国策&政令模型
["model.promote"] = "分封模型",
["model.promote.king"] = "是否是皇帝1:是",
["model.promote.position"] = "分封的官职",
["model.promote.version"] = "分封的期号(服务端用)",
["model.promote.et"] = "皇帝结束时间",
["model.promote.info"] = "其他",
["model.promote.spinfo.*"] = "国策信息",
["model.promote.spinfo.spid"] = "国策id",
["model.promote.spinfo.effinfo.*"] = "对应国策的使用情况",
["model.promote.spinfo.nextinfo.spid"] = "下个国策id",
["model.promote.spinfo.nextinfo.num"] = "国策刷新次数",
["model.promote.spinfo.isread"] = "新国策是否已读",
["model.promote.gdinfo.*"] = "政令信息",
["model.promote.gdinfo.gdid"] = "政令id",
["model.promote.gdinfo.gdtypes"] = "上次政令类型",
["model.promote.gdinfo.num"] = "刷新次数",
["model.promote.gdinfo.effinfo.*"] = "政令使用情况",
["model.promote.gdinfo.ismore"] = "政令是否早朝发布",
["model.promote.gdinfo.zan"] = "政令是否已赞",


    --[[
    ---- 模型数据 --------
    userinfo :个人信息
    item : 道具及称号
    gameinfo:基础信息
    servant:门客
    wife:红颜
    child:子嗣
    manage:经营与政务
    search:寻访
    challenge:关卡
    maintask:主线任务
    mymail:我的邮件
    otherinfo:杂项信息 俸禄领取 膜拜等
    adult:成年子嗣即媒婆
    dailytask:每日任务
    shop:商城
    dinner:酒楼
    achievement:成就
    activity:活动
    arrival:每日签到


    ----- 非模型数据 -----
    switch:开关
    activecfg:奖励配置
    marry:结婚的子嗣
    --pinfo:全服提亲对象
    --minfo:定向提亲对象
    maildetail:邮件详情
    palace:皇宫信息
    payment:支付回调信息
    dinnerinfo:编号查询玩家宴会概括信息
    dinnerdetail：其他人的dinner模型
    dinnerReport：婚宴结算结果
    resReport：离线宾客信息
    joindetail：参加宴会后的宴会信息
    vdinfo：看到的宴会列表信息
    merank ：我的排名
    dinnertop：宴会分数排行榜
    historydinfo：我的历史宴会消息
    pinfo{} 势力榜信息
    --cinfo{} 关卡榜信息
    -- iinfo{} 亲密度榜信息
    --minfo{} 我的排名信息
    autoRes：经营离线资源
    rewards：奖励内容
    isLucky：是否暴击
    typeNum：本次经营类型获得数
    ]]

}
return modelCfg
--[[
    接口说明文档 统一参数uid
    所有除uid以外的参数 都在params下面  
    向下解释
]]
local interfaceCfg = {
    --不确定接口
    --特殊返回
    --unlockWife 解锁新的红颜ID
    --unlockServant 解锁新的门客

    --用户模块
    ["user.login"] = "用户登录",
    --参数
    -- client_ip 用户Ip
    -- pid 用户外部ID
    -- packageVersion 大版本
    -- luaVersion 更新版本号
    -- bindid绑定ID
    -- bindtype 绑定类型
    -- deviceid 设备ID
    -- candyflag 玩吧糖果标记
    -- giftId  玩吧礼包标记

    --参数 inviteUid 邀请者的内部游戏ID
    --参数 platUrl 自己的平台头像地址
    --参数 platNickname 自己的平台头昵称
    --返回
    --返回 candyflag true 开启糖果活动
    --各个model数据

    ["user.checkname"] = "检测游戏名称是否存在",
    --参数 name 修改的用户名称
    --返回 nameflag 1 名称已存在  2 名称长度不匹配 3 名称存在非法字符

    ["user.createuser"] = "创建游戏角色",
    --参数 name 修改的用户名称 pic 选择用户的头像
    --返回 nameflag 1 名称已存在  2 名称长度不匹配 3 名称存在非法字符

    ["user.changename"] = "修改游戏名称",
    --参数 name 修改的用户名称
    --返回 nameflag 1 名称已存在  2 名称长度不匹配 3 名称存在非法字符

    ["user.changepic"] = "修改游戏头像",
    --参数 pic 头像ID
    --返回

    ["user.sync"] = "同步请求",
    --参数 无
    --返回 model(userinfo)
    --返回 data.lamp{} 滚动公告 {uid:玩家id, msg:无/公告内容，st:产生时间， dtype:类型，need:值}
    --返回 model(shop)

    ["user.upgrade"] = "升级/升职官阶",
    --参数 无
    --返回 model userinfo servant

    --福利模块
    ["user.arrival"] = '领取签到奖励',
    --参数 无
    --返回 model arrival
    --返回 rewards 奖励内容
    
    ["user.newerguild"] = "新手引导步骤记录",
    --参数
    --step  新手引导的走到的部数
    --返回
    ["user.stepguild"] = "分阶段引导记录",
    --参数 step 分阶段引导步骤
    --返回 gameinfo


    --门客模块
    ["servant.upgrade"] = "门客升级",
    --参数 servantId 门客ID
    --返回 model userinfo servant

    ["servant.change"] = "门客突破",
    --参数 servantId 门客ID
    --返回 model item servant

    ["servant.upgradeten"] = "门客升级十次",
    --参数 servantId 门客ID
    --返回 model userinfo servant

    ["servant.upability"] = "升级书籍资质",
    --参数 servantId 门客ID pos 第几个资质 0开始
    --参数 upType 升级方式 1道具升级 2 经验升级
    --返回 model userinfo servant

    ["servant.upskill"] = "升级技能等级",
    --参数 servantId 门客ID pos 第几个技能 0开始
    --返回 model userinfo servant

    ["servant.upaura"] = "门客升级光环",
    --参数servantId 门客ID auraId 光环ID
    --返回model userinfo item

    --红颜模块
    ["wife.call"] = "红颜召唤/一键召唤",
    --参数 autoFlag true 一键召唤 false 单次召唤
    --返回 model wife 
    --返回 callWife 召唤的红颜列表
    --返回 autoCallWife 一键召唤的具体信息{{wifeId,addExp,false}}
    --返回 红颜Id  增加的经验  是否触发天赐红颜

    ["wife.recoverenergy"] = "恢复精力",
    --参数 无
    --返回 model wife item

    ["wife.love"] = "红颜宠幸",
    --参数 wifeId 红颜ID
    --返回 model wife userinfo (child)
    --返回 childArr 如果不为空数组 就说明生下小孩 数组的大小为生下小孩的数量

    ["wife.award"] = "红颜赏赐",
    --参数 wifeId 赏赐的红颜ID key 赏赐的道具配置位置
    --参数 rnum 赏赐的数量 不传默认为1
    --返回 model wife item rewards

    ["wife.upgradeskill"] = "红颜技能升级",
    --参数 wifeId 升级的红颜 skillId 升级的技能 0,1,2
    --返回 model wife

    ["wife.equip"] = "红颜装配皮肤",
    --参数 wifeId 红颜ID 
    --参数 wifeSkinId 装配的皮肤ID ""为默认原始皮肤
    --返回 model wifeskin

    ["wife.readskinred"] = "红颜皮肤红点读取",
    --参数 wifeId 红颜ID 
    --参数 wifeSkinId 皮肤ID
    --返回 model wifeskin

    ["item.use"] = "道具使用",
    --参数
    --itemId 道具id
    --itemNum 使用道具数量
    --servantId 门客Id,非必需
    --返回 model item (servant,userinfo)
    --可能返回 rewards 奖励内容 attrAdd {0,0,0,0} 四种属性分别增加

    ["item.title"] = "道具使用/装配称号",
    --参数
    --titleid 称号id
    --status 1使用 2装配
    --返回 model userinfo

    ["item.getcompose"] = "获取道具合成配置",
    --参数 无
    --返回 data.composeinfo.st 开始时间
    --返回 data.composeinfo.version 版本
    --返回 data.composeinfo.et 结束时间

    ["item.docompose"] = "合成道具",
    --参数 version  道具合成的版本
    --参数 composeid 合成配置id
    --返回 model(item)

    ["shop.getshopcfg"] = "商城购买的配置版本信息",
    --参数
    --返回 model(shop)

    ["shop.buyitem"] = "商城购买道具",
    --参数 version 版本信息
    --参数 shopId 商城物品id
    --参数 dtype 1热卖 2特惠
    --返回 model userinfo,item,shop

    ["shop.firstchargereward"] = "领取首冲奖励",
    --参数
    --返回 model shop rewards

    ["search.play"] = "发起寻访",
    --参数
    --isbatch 是否一键寻访(0,1)
    --返回 model personId,rewards userinfo/wife

    ["search.pill"] = '使用体力丹',
    --参数
    --返回 model search, item

    ["search.set"] = '设置自动捐款信息',
    --参数  luckynum 设置自动运势值
    --参数  foodopen 是否开启自动粮食捐款 0否 1是
    --参数  goldopen 是否开启自动银两捐款 0否 1是
    --返回 model(search)

    ["search.buy"] = 'vip免费/花费捐款信息接口',
    --参数  useflag 1银两 2粮食 3元宝
    --返回 model(search,userinfo)

    --关卡模块
    ["challenge.attack"] = '攻打关卡',
    --参数 boss战时 需要参数servantId 使用的门客ID
    --[[返回 model challenge rewards
        battleReport 战斗结果｛success 战斗是否成功
        boss战存在字段dps 此门客的伤害
        ｝
    --]]
    ["challenge.recover"] = "恢复特定门客战斗次数",
    --参数 servantId 恢复门客的Id
    --返回 model challenge
    ["challenge.autoattack"] = '一键扫荡关卡',
    --参数 无
    --返回 rewardsArr {"41"="2_1_1"}

    --子嗣模块
    ["child.addposnum"] = "扩展子嗣位置",
    --参数无
    --返回 model userinfo child

    ["child.rename"] = "修改子嗣名称",
    --参数 childId 子嗣ID name 要修改的名称
    --返回 model userinfo child
    --返回 samename true 说明重名

    ["child.train"] = "子嗣培养",
    --参数 childId 子嗣ID
    --返回 model child

    ["child.autotrain"] = "子嗣一键培养",
    --参数 childId 子嗣ID
    --返回 model child

    ["child.recover"] = "恢复活力",
    --参数 childId 子嗣ID
    --返回 model child item

    ["child.autorecover"] = "一键恢复活力",
    --参数 
    --返回 model child item

    ["child.examination"] = "科举考试/子嗣成年",
    --参数 childId
    --返回 model child  adult

    --成年子嗣模块
    ["adult.propose"] = "定向提亲",
    --参数 childId 自己子嗣ID
    --参数 fuid 定向提亲的ID
    --参数 protype 使用元宝还是使用道具 1使用元宝 2 使用道具
    --返回 model  adult（userinfo item）
    --返回 proflag  1 uid不存在 2数据发生变化重新拉取请求

    ["adult.proposeall"] = "全服提亲",
    --参数 childId 要提亲的子嗣ID
    --参数 protype 使用元宝还是使用道具 1使用元宝 2 使用道具
    --返回 model  adult（userinfo item）

    ["adult.getpropose"] = "获取向我提亲信息",
    --参数 无
    --返回 data.minfo{}  {aid:提亲请求id,uid：发起提亲的用户id，childId：发起提亲的孩子id，fatherName：发起提亲的孩子父亲名字，aquality：提亲子嗣的身份，name:提亲子嗣名字，needGem：消耗的元宝，needItemId：消耗的道具}

    ["adult.getallpropose"] = "获取区服所有的提亲信息",
    --参数  childId 选择孩子id
    --参数  freshFlag 是否刷新数据
    --返回 data.pinfo.d{} 招亲对象{id:提亲id, name:子嗣名字,fatherName:父亲名字,aquality:子嗣品质，total:总属性}
    --返回 data.pinfo.ft 下次刷新时间

    ["adult.agreepropose"] = "同意联姻",
    --参数 aid 提请id
    --参数 childId 我的孩子id
    --参数 protype 联姻方式 1使用元宝 2 使用道具
    --返回 model(userinfo, adult)
    --返回 adultId 结婚的id
    --返回 proflag  1 uid不存在 2数据发生变化重新拉取请求

    ["adult.cancelpropose"] = "取消提亲",
    --参数
    --参数 childId 取消的孩子id
    --返回 无

    ["adult.refusepropose"] = "一键/拒绝提亲请求",
    --参数 aid 提请id
    --参数 isBatch 是否一键：1是 0否
    --参数
    --返回 无

    ["adult.getadultinfo"] = "获取媒婆结婚信息",
    --参数
    --返回 model adult

    --资产经营，政务模块
    ["manage.dealaffair"] = '处理政务',
    --参数
    --optid 选择奖励项id
    --无
    --返回 model manage,userinfo,(item)

    ["manage.addaffair"] = '使用政务令',
    --参数
    --num 使用政务令个数
    --返回 model manage,item

    ["manage.dealfinance"] = '经营资产',
    --参数
    --type 类型 1商产 2农产 3士兵
    --返回 model userinfo,manage
    --返回 lucky.v 暴击倍率
    --返回 typeNum 本次经营类型获得数

    ["manage.batchdealfinance"] = '一键经营资产',
    --参数
    --返回 model userinfo,manage
    --返回 luckys{5,10,10} 多个暴击倍率
    --返回 type1Num 商产获得数
    --返回 type2Num 农产获得数
    --返回 type3Num 士兵获得数

    ["manage.addfinance"] = '使用征收令',
    --参数
    --num 使用征收令个数
    --type 类型 1商产 2农产 3士兵
    --返回 model item, manage

    ["manage.autofinance"] = '获取离线，挂机资源',
    --参数 无
    --返回 model userinfo,manage (autoRes)

    ["manage.getfinance"] = '获取当前经营信息',
    --参数 无
    --返回 model manage

    ["manage.getautoandfinance"] = '获取当前经营信息挂机信息',
    --参数 无
    --返回 model manage (userinfo,autoRes)

    --任务/每日任务/成就 系统
    ["task.getmaintask"] = '领取主线任务奖励',
    --参数
    --taskId 任务ID
    --返回 model userinfo,maintask
    --返回 rewards 奖励内容

    ["task.getdailytask"] = '领取每日任务奖励',
    --参数
    --taskId 任务ID
    --返回 model userinfo,dailytask
    --返回 rewards 奖励内容

    ["task.getliveness"] = '领取活跃奖励',
    --参数 liveKey 活跃奖励ID
    --返回 model userinfo,dailytask
    --返回 rewards 奖励内容

    ["achievement.getrewards"] = '领取成就奖励',
    --参数
    --aid 成就ID
    --返回 model userinfo,achievement
    --返回 rewards 奖励内容

    --宴会模块
    ["dinner.getdinner"] = '编号查询玩家宴会概括信息',
    --参数
    --getuid 用户id
    --返回 proflag =1 用户不存在
    --返回 data.dinnerinfo{name,dtype,join_num,start_time}

    ["dinner.getdinnerdetail"] = '玩家宴会详细信息',
    --参数
    --getuid 用户id
    --返回 data.dinnerdetail =model(dinner)
    --返回 可能有 dinnerReport婚宴结算结果
    --返回 可能有 resReport离线宾客信息

    ["dinner.joindinner"] = '参加宴会',
    --参数
    --joinuid 目标uid
    --dtype 参加方式
    --返回 data.joindetail = {}

    ["dinner.createdinner"] = '举办宴会',
    --参数
    --dtype 举办宴会类型
    --isopen 是否公开(仅家宴)： 1公开 0不公开
    --返回 model(dinner)

    ["dinner.canviewdinner"] = '看到的宴会列表信息',
    --参数
    --返回 data.vdinfo{0:{uid=玩家id,name=name,dtype=宴会类型,num:宴会人数}

    ["dinner.refreshitem"] = '手动刷新积分可兑换的道具列表',
    --参数
    --返回 model(dinner)

    ["dinner.shopitem"] = "积分获取道具列表",
    --参数 无
    --返回 model(dinner)

    ["dinner.scoretoitem"] = '宴会积分兑换道具',
    --参数
    --posId 商品位置id
    --返回 data.model.(dinner,item)

    ["dinner.top"] = '宴会榜',
    --参数 无
    --返回 data.dinnertop{[name:name,point:分数]}
    --返回 data.merank 我的排名

    ["dinner.history"] = '我的历史宴会消息',
    --参数 无
    --返回 data.historydinfo{0:{}}

    ["dinner.sharedinner"] = '分享宴会到聊天',
    --参数 无
    --返回 model(dinner)

    ["shop.vipwelfare"] = '领取vip福利奖励',
    --参数 vip 领取的vip等级
    --返回 model(shop,item,wife)
    --返回 rewards 获取的奖励

    ["rank.index"] = '获取排行榜信息',
    --参数 无
    --返回 model(otherinfo)
    --返回 pinfo{} 势力榜信息 uid,name名字,level等级,vip,power势力,title称号
    --返回 cinfo{} 关卡榜信息 uid,name名字,vip,cid当前关卡
    --返回 iinfo{} 亲密度榜信息 uid,name名字,vip,total_imacy亲密度
    --返回 minfo{} 我的排名信息 name名字,level,vip,power势力,title称号,cid当前关卡，imacy当前亲密度，prank势力排名, crank关卡排名，irank亲密度排名

    ["rank.visit"] = '排行榜膜拜',
    --参数 dtype  1=势力膜拜  2=关卡膜拜  3=亲密度膜拜
    --返回 model(otherinfo),
    --返回 visit_uid 被膜拜uid
    --返回 name 用户名
    --返回 lv 被膜拜用户等级
    --返回 title 被膜拜用户称号
    --返回 lucky.v 可能有 暴击倍率

    ["rank.usershot"] = '排行榜玩家信息快照',
    --参数 ruid
    --返回 name, vip,level,exp ,atk ,inte ,politics,charm ,power ,childnum, wifenum, imacy, cid
    --返回 ishavedinner 是否有宴会 0无 1有

    ["mail.getmymaillist"] = '我的邮件列表',
    --参数 无
    --返回 邮件列表maillist[title,mid,st]  resarr[0,0]

    ["mail.getdetail"] = '查看邮件的详细内容',
    --参数 mailId 邮件id
    --返回 maildetail[content邮件内容 mid邮件id touch附件奖励]

    ["mail.getrewardsbymail"] = '获取邮件中的附件奖励',
    --参数 mailId 邮件id
    --返回 邮件mymail model

    --皇宫信息
    ["palace.getpalaceinfo"] = "获取皇宫具体信息",
    --参数 无
    --返回 palace
    --返回 palace = {uid:用户ID,sign:签名,vip:vip,level:等级,pic:头像 
    --返回  rank ={uid,name,时间}}

    ["palace.getcrosspalace"] = "获取跨服皇宫具体信息",
    --参数 无
    --返回 palace
    --返回 palace = {uid:用户ID,sign:签名,vip:vip,level:等级,pic:头像 zid 几服 
    --返回  rank ={uid,name,时间}}

    ["palace.getpalacerank"] = "获取皇宫称号排名",
    --参数 titleId
    --返回 palacerank = {uid,name,时间}}
    

    ["palace.getsalary"] = "领取俸禄",
    --参数 无
    --返回 model{userinfo}

    ["palace.sign"] = "修改签名",
    --参数 sign 签名内容  titleId对应的称号
    --返回

    --活动模块
    ["activity.getactivecfg"] = "获取活动配置",
    --参数 activeId 如果存在此参数 即查询对应活动配置
    --参数 activeArr 活动数组{"active-3","active-4"}
    --返回 

    ["activity.getdailychargereward"] = "领取每日充值活动奖励",
    --参数 activeId 活动ID  rkey 领取的是第几档
    --返回

    ["activity.gettotaldayrechargereward"] = "领取累天充值活动奖励",
    --参数 activeId 活动ID  rkey 领取的是第几档
    --返回

    ["activity.gettotalrechargereward"] = "领取累计充值活动奖励",
    --参数 activeId 活动ID  rkey 领取的是第几档
    --返回

    ["activity.getlimitedreward"] = "领取限时活动奖励",
    --参数 activeId 活动ID  rkey 领取的是第几档
    --返回

    ["activity.exchangefourpeople"] = "兑换四大人物",
    --参数 activeId 活动ID  rkey 领取的是第几档
    --返回
    ["activity.getrankactive"] = "获取冲榜活动排行榜",
    --参数 activeId 活动Id
    --返回 rankList排行榜列表 myrank我的排名

    ["activity.getpunishactive"] = "获取惩戒女囚活动信息",
    --参数 activeId 活动Id
    --返回 punishActive = {hp = 222,log={}} 女囚雪亮 记录信息

    ["activity.buypunishitem"] = "购买惩戒道具",
    --参数 activeId 活动Id itemKey 购买的道具位置 配置里的key
    --返回 model activity item

    ["activity.usepunishitem"] = "使用惩戒道具",
    --参数 activeId 活动Id itemKey 购买的道具位置 配置里的key
    --返回 model activity
    --返回 hasKill boss已经被击杀

    ["activity.autopunish"] = "一键惩戒",
    --参数 activeId 活动Id
    --返回 model activity
    --返回 hasKill boss已经被击杀

    ["activity.buypunishshop"] = "使用积分购买活动商店物品",
    --参数 activeId 活动Id itemKey 购买的商店道具位置 配置里的key
    --返回 model activity item

    ["activity.getpunishreward"] = "领取击杀奖励",
    --参数 activeId 活动Id
    --返回 model activity

    ["activity.usetailor"] = "裁缝抽取一次",
    --参数 activeId 活动ID
    --返回 rewards

    ["activity.usetentailor"] = "裁缝抽取十次",
    --参数 activeId 活动ID
    --返回 rewards

    ["activity.exchangeskin"] = "兑换红颜皮肤",
    --参数 activeId 活动ID
    --参数 shopId 兑换的商品ID
    --返回 rewards

    ["activity.exchangewife"] = "红颜许愿活动兑换红颜",
    --参数 activeId 活动ID
    --参数 shopId 兑换的商品ID
    --返回

    ["activity.buyvipshop"] = "vip神秘商城购买接口",
    --参数 activeId 活动Id
    --参数 shopId vip商品id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getspringitema"] = "春季典庆-春季送礼",
    --参数 activeId 活动Id
    --参数 rechargeId  充值id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getspringitemb"] = "春季典庆-典庆兑换",
    --参数 activeId 活动Id
    --参数 exchangeId  兑换id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getspringitemc"] = "春季典庆-踏青狂欢",
    --参数 activeId 活动Id
    --参数 taskId   活动任务id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getspringitemd"] = "春季典庆-折扣特惠",
    --参数 activeId 活动Id
    --参数 shopId  活动商品id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getcarnivalcharge"] = "狂欢充值领奖",
    --参数 activeId 活动Id
    --参数 rkey  活动档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getcarnivalcost"] = "狂欢消费领奖",
    --参数 activeId 活动Id
    --参数 rkey  活动档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getwifecomereward"] = "领取红颜售卖活动奖励",
    --参数 activeId 活动ID
    --返回 data.rewards 奖励
    --返回 model(activity,wife)

    ["activity.getmaydaylottery"] = "五一转盘抽奖",
    --参数 activeId 活动Id
    --参数 isTenPlay  是否10连抽 0否 1是
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getmaydayitema"] = "五一转盘领取次数奖励",
    --参数 activeId 活动Id
    --参数 lotteryId  次数档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getmaydayitemb"] = "五一转盘充值奖励",
    --参数 activeId 活动Id
    --参数 rechargeId  充值奖励档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getmaydayitemc"] = "五一转盘任务奖励",
    --参数 activeId 活动Id
    --参数 taskId 任务档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getmaydayrank"] = "五一转盘排行榜",
    --返回 data.rankArr 所有人排行信息
    --返回 data.myrankArr 我的排行信息

    --划龙舟活动
    ["activity.getdragoninfo"] = "划龙舟基本信息",
    --参数 activeId 活动Id
    --返回 model activity
    --返回 riceNumber 总的米数

    ["activity.getdragonitema"] = "划龙舟活动划船奖励",
    --参数 activeId 活动Id
    --参数 rechargeId  充值奖励档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getdragonitemb"] = "划龙舟活动充值奖励",
    --参数 activeId 活动Id
    --参数 rechargeId  充值奖励档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getdragonitemc"] = "划龙舟活动任务奖励",
    --参数 activeId 活动Id
    --参数 taskId 任务档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励

    ["activity.getdragonrank"] = "划龙舟活动排行榜",
    --返回 data.rankArr 所有人排行信息
    --返回 data.myrankArr 我的排行信息

    ["activity.buydragonshop"] = "购买划龙舟商店物品",
    --参数 activeId 活动Id
    --参数 shopId 商品Id

    ["imacy.prank"] = "跨服亲密个人排行榜",
    --返回 data.atkranks 排行信息
    --返回 data.merank 我的名词
    --返回 data.mepoint 我的分数

    ["imacy.zrank"] = "跨服亲密区服排行榜",
    --返回 data.atkranks 排行信息
    --返回 data.iszonewin 是否胜利服 1胜 0败

    ["imacy.winzidreward"] = "跨服亲密区服领奖",
    --参数 activeId 活动id
    --返回 data.rewards 奖励

    -- 兑换礼包码
    ["user.exchangecard"] = "兑换礼包码",
    -- 参数 id 礼包码
    -- 返回 flag 0 成功 1此类兑换码类型不对 2此兑换码已经被你使用过 3此类兑换码已经被你使用过 4兑换码已过期

    --书院模块
    ["bookroom.study"] = "书院入席学习",
    --参数 servantid 选择门客id
    --参数 pos 选择的入席位置id，从1开始
    --返回 model(bookroom)
    --返回 data.bookroompos 位置id

    ["bookroom.finish"] = "书院学习(一键)完成",
    --参数 pos 选择位置id
    --参数 isbatch 是否一键 0否 1是
    --返回 model(bookroom,servant)
    --返回 可能有 bookroom_poss 一键完成返回的完成位置及暴击倍率
    --返回 data.bookroompos 位置id

    ["bookroom.buy"] = "书院购买席位接口",
    --参数 无
    --返回 model(bookroom,userinfo)

    --练武场
    ["studyatk.index"] = '练武场入口面板',
    --参数 无
    --可能返回 atklist练武场列表
    --可能返回 model(studyatk)
    --可能返回结算信息 finishinfo

    ["studyatk.create"] = '创建练武场',
    --参数 无
    --返回 model(studyatk)

    ["studyatk.newguide"] = '练武场新手引导',
    --参数 num 1列表数据 2房间详情数据
    --返回 model(studyatk)

    ["studyatk.join"] = '加入练武场',
    --参数 fuid 要加入的房主id
    --参数 pos 选择的位置
    --返回 model(studyatk)

    ["studyatk.goaway"] = '练武场驱赶',
    --参数 fuid 要加入的房主id
    --参数 pos 指定位置
    --返回 model(studyatk)
    --返回 data.goawaycode 是否驱赶成功 1成功 -1失败

    ["studyatk.getatkdetail"] = '练武场详情',
    --参数 fuid
    --返回 data.getatkdetail{} 详情信息=model(studyatk)

    ["studyatk.getatk"] = '根据编号查询练武场信息',
    --参数 fuid 查询编号
    --返回 model(studyatk)
    --返回 data.getatk{} 详情信息=model(studyatk)

    ["studyatk.upgrade"] = '升级练武书籍经验',
    --参数 无
    --返回 model(studyatk)
    --返回 data.upservants  升级的门客信息及对应的增长属性变化{1001:xx,1002:xx,1003:xx}

    ["studyatk.usearmor"] = '演武场-使用金钟罩',
    --参数 fuid 房主uid
    --返回 model(item,studyatk)
    --返回 data.getatkdetail 房间详情

    ["prison.punish"] = "惩罚/一键惩罚",
    --参数 prisonId 囚犯id  isbatch 1一键惩罚
    --返回 prison的model

      --联盟模块
    ["alliance.createalliance"] = "创建联盟",
    --参数 name 联盟名称
    --参数 cweixin 微信名称
    --参数 cqq qq名称
    --参数 pswd 联盟密码
    --参数 intro 联盟对外公告
    --参数 switch 联盟是否自动加入0自由加入 1否
    --返回 nameFlag 1军团名称已存在
    ["alliance.joinrandalliance"] = "随机加入联盟",
    --参数 无
    --返回
    ["alliance.findalliance"] = "查询联盟",
    --参数 aid 查询的联盟ID
    --返回 allianceFlag=4 军团不存在
    ["alliance.getalliancelist"] = "联盟榜单",
    --参数 无
    --返回 alliancelist 榜单列表
    ["alliance.initalliance"] = "初始化军团信息",
    --参数
    --无
    ["alliance.getmember"] = "获取帮派成员列表",
    --参数
    --
    ["alliance.getallianceapply"] = "获取申请名单",
    --参数 无
    --返回 allianceapply 申请列表

    ["alliance.donate"] = "帮派捐献",
    --参数 donatetype 捐献类型 配置里的key
    --返回 model myalliance alliance
    --返回 donateMaxFlag true  不增加帮派财富和经验

    ["alliance.shopbuy"] = "帮派商店兑换",
    --参数shopkey 商店商品的key
    --返回 model myalliance

    ["alliance.applyalliance"] = "申请加入",
    --参数 aid 申请加入的联盟ID
    --返回 allianceFlag = 1 数据已发生变化
    --返回 allianceFlag = 2 帮派不存在
    --返回 allianceFlag = 3 申请的军团申请名单已达上限
    --返回 allianceFlag = 4 随机加入军团不存在

    ["alliance.cancelapply"] = "取消申请",
    --参数 aid 取消申请的军团ID
    --返回
    ["alliance.accept"] = "同意申请",
    --参数 auid 申请人的ID
    --返回
    ["alliance.refuseapply"] = "拒绝申请",
    --参数 auid 申请人的ID
    --返回
    ["alliance.refuseallapply"] = "拒绝所有申请",
    --参数
    --返回
    ["alliance.rename"] = "修改联盟名称",
    --参数 name 新的名称
    --返回
    ["alliance.modinfo"] = "修改联盟基础信息",
    --参数 cweixin 微信名称
    --参数 cqq qq名称
    --参数 message 联盟对内公告
    --参数 intro 联盟对外公告
    ["alliance.setswitch"] = "修改军团自由加入开关",
    --参数 switch 开关0 随意加入 1 拒绝加入
    --返回
    ["alliance.exitalliance"] = "退出联盟",
    --参数
    --返回
    ["alliance.kickalliance"] = "退出联盟",
    --参数 auid  被踢的用户ID
    --返回

    ["alliance.transfer"] = "转让盟主",
    --参数 auid

    ["alliance.setpos"] = "修改成员职位",
    --参数 auid 修改的成员ID  pos设置的职位ID
    --返回

    ["alliance.getdetails"] = "获取军团详情",
    --参数 allianceId 查询的军团ID
    --返回 falliance
    --返回 falliancemember

    ["alliance.disband"] = "解散帮会",
    --参数 pswd 密码
    --返回 model 

    ["alliance.openboss"] = "开启军团boss",
    --参数 bossId 选择的门客ID
    --参数 openType 1财富开启 2元宝开启
    --返回 model alliance

    ["alliance.attack"] = "攻击军团boss",
    --参数 bossId 选择的门客ID
    --参数 servantId 选择的门客ID
    --返回 model alliance
    --返回 response.data.hasKill = 1--Boss已经被击杀
    --[[返回  bossInfo = {
        damage = damage,伤害
        killFlag = killFlag,击杀boss
        rewards = rewards, 奖励
        ctv = ctv, 获得积分
    }--]] 

    ["alliance.recover"] = "恢复攻击次数",
    --参数 servantId 选择的门客ID
    --返回 model myalliance

    ["alliance.getbosshp"] = "获取帮派boss血量",
    --参数 bossId  帮派boss的ID
    --返回 model alliance
    
    ["alliance.getbosslog"] = "获取帮派副本log",
    --参数 bossId  军团boss的ID
    --返回 allianceBossLog

    ["alliance.getbossrank"] = "获取帮派boss排行",
    --参数 bossId 获取军团boss的排行榜
    --返回 allianceBossRank

    --武馆/衙门模块
    ["atkrace.index"] = "武馆入口面板",
    --参数
    --返回fightflag 是否可战斗 0否 1是
    --返回 model(atkrace)

    ["atkrace.handle"] = '武馆请求处理',
    --参数 hadle 处理 -1再议 1准奏
    --返回 model(atkrace)

    ["atkrace.getmodel"] = '武馆请求获取Model',
    --参数 无
    --返回 model(atkrace)


    ["atkrace.attrlist"] = "临时属性列表接口",
    --参数 无
    --返回 model(atkrace)

    ["atkrace.attrbuy"] = "临时属性购买接口",
    --参数 atttype临时属性级别 1初始 2初级 3中级 4高级
    --参数 attid 临时属性id
    --返回 model(atkrace)

    ["atkrace.fight"] = "随机出使:选择门客,开始战斗接口",
    --参数 servantid 选择门客id
    --返回 data.atkreports = {}战斗报告
    --返回 model(atkrace)
    --返回 战斗结局 win 1胜利 2失败

    ["atkrace.revenge"] = "复仇接口",
    --参数 fuid 指定复仇人
    --参数 servantid 选择自己门客id
    --返回 model(atkrace)

    ["atkrace.kill"] = "追杀接口",
    --参数 fuid 指定追杀人
    --参数 servantid 选择自己门客id
    --返回 model(atkrace)

    ["atkrace.challenge"] = "挑战接口",
    --参数 fuid 指定挑战人
    --参数 servantid 选择自己门客id
    --返回 model(atkrace)

    ["atkrace.randreward"] = "获取连胜翻牌奖励",
    --参数 pos 翻牌位置id
    --返回 rewards
    --返回 pos 位置id
    --返回 randcards = [0:itemid,1:itemid]

    ["atkrace.useextra"] = "使用额外次数",
    --参数 无
    --返回 model(atkrace)

    ["atkrace.getinfo"] = '根据编号查询武馆信息',
    --参数 fuid 查询玩家id
    --返回 data.atkraceinfo{name,level,snum,power,pic,point,rank}
    --返回 iscankill  0不可追杀 1可追杀

    ["atkrace.list"] = '榜单记录接口',
    --参数 无
    --返回 data.atklist = {0:{uid,name,sid,uid2,num,st,title,rankover}}

    ["atkrace.rank"] = '排行榜接口',
    --参数 无
    --返回 data.atkrank = {0:{uid,name,level,title,point}}
    --返回 data.merank = 我的排名
    --返回 data.mepoint = 我的分数

    --副本系统
    ["dailyboss.get"] = "获取基本信息",
    --参数
    --response.data.bossData = {
    --   isDead = true 已击杀
    --   endFlag = true 副本活动已结束
    --   killName = "",  击杀者名称
    --}

    ["dailyboss.getdetails"] = "获取具体详细信息",
    --参数
    --参数
    --返回 endFlag true 活动已结束
    
     --[[response.data.lastReward = {
            score = score, 增加的分数分数
            myrank = myrank, 我的排名
            joinNum = redis:zcard(key) 参加人数
            rewards = 获得奖励
        }
    --[[response.data.bossData = {
            hp = hp, boss剩余血量
            totalHp = totalHp, boss总血量
            bossLv = bossLv, boss等级
            myrank = myrank, 我的排名 
            rankList = rankList 排名
            isDead = isDead, 已击杀
            killName = killName, 击杀者名称
            joinNum = joinNum 参与人数
            logInfo = logInfo 副本攻击记录
        }
        
    --]]

    ["dailyboss.attack"] = "攻击",
    --参数 servantId 选择的门客ID
    --返回
    --[[
        response.data.bossData = {
            score = score, 获得分数
            damage = damage, 伤害
            hp = hp, boss剩余血量
            totalHp = totalHp, boss总血量
            killFlag = killFlag  boss已经被击杀 击杀当时状态 只有一次
            logInfo = logInfo 副本攻击记录
        }
    ]]

    ["dailyboss.recover"] = "恢复攻击次数",
    --参数 servantId 选择的门客ID
    --返回 model dailyboss
    
    ["dailyboss.buy"] = "购买商店信息",
    --参数 itemKey 商店配置的key
    --返回 model dailyboss

    ["dailyboss.getrank"] = "获取副本排行榜",
    --参数 
    --返回 acrank 积分排行榜
    --返回 killrank 击杀排行榜
    ["dailyboss.getattackrank"] = "获取蛮王伤害排行榜",
    --参数 无
    --[[返回response.data.bossData = {
            
            myrank = myrank, 我的排名 
            rankList = rankList 排名
           
        }
    ]]
    ["dailyboss.getclearreward"] = "雁门关领取通关奖励",
    --参数 无
    --返回 rewards 奖励

    --杂项接口
    ["otherinfo.getbindreward"] = "领取手机绑定奖励",
    --参数 一些杂想信息
    ["otherinfo.getwbsendreward"] = "玩吧发送桌面奖励",
    --参数  无
    --返回 otherinfo的model  rewards奖励
    ["otherinfo.getwbdailysharereward"] = "玩吧每日分享奖励",
    --参数  无
    --返回 otherinfo的model  rewards奖励
    ["otherinfo.getcandyreward"] = "玩吧领取糖果活动奖励",
    --参数 无
    --返回
    ["otherinfo.getauthor3kreward"] = "领取3k实名认证奖励",
    --参数 无
    --返回 model oherinfo rewards
    ["otherinfo.getfkfocusreward"] = "疯狂游乐场关注领取奖励",
    --参数 无
    --返回
    ["otherinfo.fkshare"] = "疯狂游乐场分享成功",
    --参数 无
    --返回 无
    ["otherinfo.getfksharereward"] = "疯狂游乐场领取分享奖励",
    --参数 key 1  5 10 领取几次奖励
    --返回 
    ["otherinfo.recordservantsort"] = "记录门客排序标记",
    --参数 sortId
    --返回
    ["otherinfo.getwbscorereward"] = "获取玩吧积分奖励",
    --参数 giftId
    --返回 rewards
    ["otherinfo.getunlocklistreward"] = "领取解锁功能奖励",
    --参数 unlockKey 功能解锁配置key
    --返回
    ["otherinfo.setcover"] = "玩吧设置cover",
    --参数 
    --返回 otherinfo的model
    ["otherinfo.getcoverreward"] = "玩吧领取设置cover奖励",
    --参数 
    --返回 rewards  otherinfo的model
    ["otherinfo.getgtfbreward"] = "港台fb绑定有礼",
    --参数
    --返回 rewards  otherinfo的model
    ["otherinfo.getcertification"] = "领取实名认证奖励",
    --参数
    --返回 rewards  otherinfo的model
    ["otherinfo.getjdreward"] = "领取京东618奖励",
    --参数
    --返回 

    --征伐接口
    ["conquest.index"] = "征伐随机对手接口",
    --参数  无
    --返回 model(conquest)

    ["conquest.fight"] = "征伐战斗接口",
    --参数  num 选择对手号 1,2,3
    --返回 model(conquest)
    --返回 data.fightflag 胜利/失败
    --返回 data.rewards 可能有 胜利奖励
    --返回 data.refreshdata 可能有 跨天数据有变化

    ["conquest.rank"] = "征伐排行榜接口",
    --参数  无
    --返回 data.conrank 排行榜信息
    --返回 data.merank 我的排名
    --返回 data.mepoint 我的分数

    ["conquest.batchfight"] = "一键征伐战斗接口",
    --参数  cid 选择一键的波数
    --返回 model(conquest)
    --返回 rewards 奖励
    --返回 batchpoint 总积分
    --返回 fightnum 征伐波数

    --通商接口
    ["trade.index"] = "通商随机对手接口",
    --参数  无
    --返回 model(trade)

    ["trade.fight"] = "通商战斗接口",
    --参数  无
    --返回 model(trade)
    --返回 data.fightflag 胜利/失败
    --返回 data.rewards 可能有 胜利奖励
    --返回 data.refreshdata 可能有 跨天数据有变化

    ["trade.rank"] = "通商排行榜接口",
    --参数  无
    --返回 data.conrank 排行榜信息
    --返回 data.merank 我的排名
    --返回 data.mepoint 我的分数

    ["trade.batchfight"] = "一键通商战斗接口",
    --参数  cid 选择一键的波数
    --返回 model(trade)
    --返回 rewards 奖励
    --返回 batchpoint 总积分
    --返回 fightnum 通商波数

    --
    ["invite.getinvitereward"] = "领取邀请奖励",
    --参数 ikey 邀请奖励的key
    --返回 model invite 
    --返回 rewards
    ["invite.getpowerreward"] = "领取邀请势力奖励",
    --参数 ikey 邀请奖励的key
    --返回 model invite 
    --返回 rewards
    ["invite.getrechargereward"] = "领取邀请充值奖励",
    --参数 ikey 邀请奖励的key
    --返回 model invite 
    --返回 rewards
    ["invite.getinfo"] = "获取邀请好友信息",
    --参数 无
    --返回 model invite

    ["chat.list"] = "屏蔽列表",
    --参数 无
    --返回 data.list = {uid,olt,level,power,name,pic,mygname}
    --返回 model(chatblock)

    ["chat.block"] = "加入屏蔽",
    --参数 fuid 要加入的uid
    --返回 model(chatblock)

    ["chat.unblock"] = "取消屏蔽",
    --参数 fuid 要取消的uid
    --返回 data.list = {uid,olt,level,power,name,pic,mygname}
    --返回 model(chatblock)
    ["user.getkfmsg"] = "获取客服设置信息",
    --参数   无
    --返回 msg 信息内容
    ["user.getkfcardmsg"] = "获取Q群礼包信息",
    --参数   无
    --返回 msg 信息内容

    --声望
    ["prestige.index"] = "声望入口",
    --参数   无
    --返回 rewards 可能有 声望奖励
    --返回 model(prestige)
    --声望

    ["prestige.up"] = "声望点亮",
    --参数 upid 升级档位id
    --返回 rewards 可能有 声望奖励
    --返回 model(prestige,userinfo)

    --修身
    ["practice.index"] = "修身入口",
    --参数   无
    --返回 model practice
    ["practice.upgrade"] = "修身升级",
    --参数   无
    --返回 model practice
    ["practice.unlock"] = "修身解锁",
    --参数  taskId  修身资质任务ID
    --返回 model practice
    ["practice.collect"] = "收集阅历",
    --参数   无
    --返回 model practice
    ["practice.buy"] = "购买阅历",
    --参数   无
    --返回   practice
    ["practice.upstorage"] = "修身仓库扩容",
    --参数 无
    --返回 userinfo practice

    --本服称帝
    ["emperor.bm"] = "称帝报名",
    --参数 version 版本
    --参数 pem 消耗人望币
    --返回 model(myemperor,prestige)

    ["emperor.bmlist"] = "报名列表",
    --参数 version 版本
    --参数 sort  排序 1报名时间排序 2消耗人望币排序
    --返回 model(myemperor)
    --返回  bmlist

    ["emperor.cheer"] = "助威",
    --参数 fuid 助威对象id
    --返回 model(userinfo,myemperor)

    ["emperor.getactive"] = "获取称帝活动",
    --参数 fuid 助威对象id
    --返回 可能有 startactive 正在进行的活动
    --返回 可能有 newactive 将要进行的活动
    --返回 可能有 recentactive 最近的过期活动

    ["emperor.setpos"] = "设置阵型",
    --参数 setArr 门客阵型设置
    --返回 model(myemperor)

    ["emperor.buy"] = "称帝-商城购买",
    --参数 version 期号
    --参数 shopId 商城shopId
    --返回 model(myemperor,userinfo)
    --返回 rewards

    --位分
    ["wifestatus.confer"] = "册封",
    --参数   position
    --参数   wifeId
    --返回 model wifestatus
    ["wifestatus.autoconfer"] = "一键册封",
    --参数   无
    --返回 model wifestatus

    --分封
    ["promote.index"] = "获取军机处列表",
    --参数 无
    --返回 promoteList {1 = {uid = 10001,vip = 1,level =3,pic = 4,name = "aa",position =1,phototitle="4001" }}
    --返回 position 分封的官职 phototitle 头像框 vip level 官职  pic 头像 name 名称
    ["promote.getlist"] = "获取可分封的列表信息",
    --参数 sortKey 1:帮派列表 2 助威列表 3 权势列表
    --返回 userList = { 1 = {uid,权势,名称,称号,头像,头像框}}

    ["promote.appoint"] = "分封大臣",
    --参数 position 分封官职 1 2 auid 被分封的玩家ID
    --返回

    ["promote.cancel"] = "解除分封",
    --参数 position 解封官职 1 2
    --返回

    ["promote.find"] = "查找分封列表",
    --参数 name 被查找的玩家名称
    --返回 同 rank.usershot 接口返回

    ["policy.index"] = "皇宫&国政入口页&历代君王列表",
    --参数
    --返回 model(promote)
    --返回kinglist 历代君王
    --返回 sign 君王话语

    ["policy.setsign"] = "设置话语",
    --参数 sign
    --返回 无

    ["policy.zangd"] = "赞新政令",
    --参数 sign
    --返回 model(promote)

    ["policy.setread"] = "新国策/政令已读",
    --参数 dtype 1国策 2政令
    --返回 model(promote)

    ["policy.setsp"] = "设置国策",
    --参数 spid 国策id
    --返回 model(promote)

    ["policy.setgd"] = "设置政令",
    --参数 gdid 政令id
    --参数 gdtype 政令类型
    --返回 model(promote)

    ["policy.refreshgd"] = "刷新政令",
    --参数
    --返回 model(promote)
    ["user.getshareguide"] = "引导分享",
    --参数
    --返回 shareguide
    ["otherinfo.getshareguidereward"] = "获取分享引导奖励",
    --参数 无
    --返回 rewards奖励
}
return interfaceCfg
--武馆（衙门、擂台）配置
local atkRaceCfg={
    --解锁条件  拥有 X 个门客
    unlock=15,
    
    --门客等级限制
    servantLv=60,
    
    --每日武馆次数
    dailyNum=4,
    
    --每次间隔时间 单位（秒）
    intervalTime=3600,
    
    --选取敌方角色的随机波动名次
    rankRange={-50,50},
    
    --出使消耗道具
    fightAdd="1551",
    
    --复仇消耗道具
    revenge="1552",
    
    --挑战消耗道具
    challenge="1552",
    
    --追杀消耗道具
    hunt="1553",
    
    --额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
    parameter1=5,
    
    --击杀对方门客数量大于等于 parameter2 ，会被记入仇人列表
    parameter2=5,
    
    --击杀大于等于20名门客，可上榜
    parameter3=20,
    
    --每击杀3个门客，获得一个翻牌奖励
    rewardTurn=3,
    
    --每次获胜奖励  score衙门积分  abilityExp书籍经验  ponit士气数量
    victory={
        ["score"]=2,["abilityExp"]=2,["point"]=1,
    },
    
    --每次失败  衙门分数-1
    fail=-1,
    
    --追杀时，战胜敌方，敌方分数-2
    huntScore=-2,
    
    --翻牌奖励  在翻牌时，随机1个奖励  其余5张牌，1张和随机出的奖励一样  其余4张再随4个不重复的（和已获得的也不重复）
    rewardPool={
        {"6_1551_1",6},
        {"14_1_4",23},
        {"14_1_8",15},
        {"14_1_12",9},
        {"15_1_4",23},
        {"15_1_8",15},
        {"15_1_12",9},
    },
    
    --机器人分数
    robotScore=10,
    
      --attr  血量 相当于总属性
      --fullattr  初始满血
      --ability  资质  用于攻击
      --lv  门客等级
      --s1lv  门客技能1的等级
      --s2lv  门客技能2的等级
      --clv  门客爵位
    robot={
        ["1001"]={       ----元芳
            ["attr"]=2910,["fullattr"]=2910,["ability"]=8,["lv"]=59,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1002"]={       ----苏乞儿
            ["attr"]=3638,["fullattr"]=3638,["ability"]=10,["lv"]=59,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1003"]={       ----纪晓岚
            ["attr"]=3638,["fullattr"]=3638,["ability"]=10,["lv"]=59,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1004"]={       ----刘墉
            ["attr"]=3638,["fullattr"]=3638,["ability"]=10,["lv"]=59,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1005"]={       ----曹雪芹
            ["attr"]=3638,["fullattr"]=3638,["ability"]=10,["lv"]=59,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1006"]={       ----年羹尧
            ["attr"]=5266,["fullattr"]=5266,["ability"]=12,["lv"]=65,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1007"]={       ----韦小宝
            ["attr"]=5266,["fullattr"]=5266,["ability"]=12,["lv"]=65,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1008"]={       ----吴三桂
            ["attr"]=5266,["fullattr"]=5266,["ability"]=12,["lv"]=65,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1009"]={       ----蒲松龄
            ["attr"]=5266,["fullattr"]=5266,["ability"]=12,["lv"]=65,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1023"]={       ----洪承畴
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1024"]={       ----郑成功
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1025"]={       ----和珅
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1026"]={       ----司马光
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1027"]={       ----欧阳修
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1028"]={       ----张三丰
            ["attr"]=6588,["fullattr"]=6588,["ability"]=13,["lv"]=70,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1029"]={       ----陈近南
            ["attr"]=8117,["fullattr"]=8117,["ability"]=14,["lv"]=75,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1030"]={       ----唐伯虎
            ["attr"]=8117,["fullattr"]=8117,["ability"]=14,["lv"]=75,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1031"]={       ----徐福
            ["attr"]=9209,["fullattr"]=9209,["ability"]=14,["lv"]=80,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
        ["1032"]={       ----曹植
            ["attr"]=9209,["fullattr"]=9209,["ability"]=14,["lv"]=80,["s1lv"]=20,["s2lv"]=20,["clv"]=0,
        },
    },
    
      --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
      --effect  加成值
      --costPoint  消耗士气点数
      --costGem  消耗元宝
    iniAtt={
        ["1"]={       ----攻击加成 50%
            ["att"]=1,["effect"]=0.5,["costPoint"]=3,
        },
        ["2"]={       ----攻击加成 100%
            ["att"]=1,["effect"]=1,["costGem"]=50,
        },
        ["3"]={       ----攻击加成 200%
            ["att"]=1,["effect"]=2,["costGem"]=100,
        },
    },
    
      --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
      --effect  加成值
      --costPoint  消耗士气点数
      --weight  权重
    juniorAtt={
        ["1"]={       ----攻击加成
            ["att"]=1,["effect"]=0.05,["costPoint"]=1,["weight"]=10,
        },
        ["2"]={       ----攻击加成
            ["att"]=1,["effect"]=0.06,["costPoint"]=1,["weight"]=10,
        },
        ["3"]={       ----攻击加成
            ["att"]=1,["effect"]=0.07,["costPoint"]=1,["weight"]=10,
        },
        ["4"]={       ----攻击加成
            ["att"]=1,["effect"]=0.08,["costPoint"]=1,["weight"]=10,
        },
        ["5"]={       ----攻击加成
            ["att"]=1,["effect"]=0.09,["costPoint"]=1,["weight"]=10,
        },
        ["6"]={       ----技能加成
            ["att"]=2,["effect"]=0.07,["costPoint"]=1,["weight"]=10,
        },
        ["7"]={       ----技能加成
            ["att"]=2,["effect"]=0.08,["costPoint"]=1,["weight"]=10,
        },
        ["8"]={       ----技能加成
            ["att"]=2,["effect"]=0.09,["costPoint"]=1,["weight"]=10,
        },
        ["9"]={       ----技能加成
            ["att"]=2,["effect"]=0.1,["costPoint"]=1,["weight"]=10,
        },
        ["10"]={       ----技能加成
            ["att"]=2,["effect"]=0.11,["costPoint"]=1,["weight"]=10,
        },
        ["11"]={       ----技能加成
            ["att"]=2,["effect"]=0.12,["costPoint"]=1,["weight"]=10,
        },
        ["12"]={       ----血量恢复
            ["att"]=3,["effect"]=0.03,["costPoint"]=1,["weight"]=10,
        },
        ["13"]={       ----血量恢复
            ["att"]=3,["effect"]=0.04,["costPoint"]=1,["weight"]=10,
        },
        ["14"]={       ----血量恢复
            ["att"]=3,["effect"]=0.05,["costPoint"]=1,["weight"]=10,
        },
        ["15"]={       ----血量恢复
            ["att"]=3,["effect"]=0.06,["costPoint"]=1,["weight"]=10,
        },
    },
    
      --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
      --effect  加成值
      --costPoint  消耗士气点数
      --weight  权重
    mediumAtt={
        ["1"]={       ----攻击加成
            ["att"]=1,["effect"]=0.1,["costPoint"]=2,["weight"]=10,
        },
        ["2"]={       ----攻击加成
            ["att"]=1,["effect"]=0.11,["costPoint"]=2,["weight"]=10,
        },
        ["3"]={       ----攻击加成
            ["att"]=1,["effect"]=0.12,["costPoint"]=2,["weight"]=10,
        },
        ["4"]={       ----攻击加成
            ["att"]=1,["effect"]=0.13,["costPoint"]=2,["weight"]=10,
        },
        ["5"]={       ----攻击加成
            ["att"]=1,["effect"]=0.14,["costPoint"]=2,["weight"]=10,
        },
        ["6"]={       ----技能加成
            ["att"]=2,["effect"]=0.13,["costPoint"]=2,["weight"]=10,
        },
        ["7"]={       ----技能加成
            ["att"]=2,["effect"]=0.14,["costPoint"]=2,["weight"]=10,
        },
        ["8"]={       ----技能加成
            ["att"]=2,["effect"]=0.15,["costPoint"]=2,["weight"]=10,
        },
        ["9"]={       ----技能加成
            ["att"]=2,["effect"]=0.16,["costPoint"]=2,["weight"]=10,
        },
        ["10"]={       ----技能加成
            ["att"]=2,["effect"]=0.17,["costPoint"]=2,["weight"]=10,
        },
        ["11"]={       ----血量恢复
            ["att"]=3,["effect"]=0.07,["costPoint"]=2,["weight"]=10,
        },
        ["12"]={       ----血量恢复
            ["att"]=3,["effect"]=0.08,["costPoint"]=2,["weight"]=10,
        },
        ["13"]={       ----血量恢复
            ["att"]=3,["effect"]=0.09,["costPoint"]=2,["weight"]=10,
        },
        ["14"]={       ----血量恢复
            ["att"]=3,["effect"]=0.1,["costPoint"]=2,["weight"]=10,
        },
    },
    
      --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
      --effect  加成值
      --costGem  消耗元宝
      --weight  权重
    seniorAtt={
        ["1"]={       ----攻击加成
            ["att"]=1,["effect"]=0.15,["costGem"]=20,["weight"]=10,
        },
        ["2"]={       ----攻击加成
            ["att"]=1,["effect"]=0.16,["costGem"]=20,["weight"]=10,
        },
        ["3"]={       ----攻击加成
            ["att"]=1,["effect"]=0.17,["costGem"]=20,["weight"]=10,
        },
        ["4"]={       ----攻击加成
            ["att"]=1,["effect"]=0.18,["costGem"]=20,["weight"]=10,
        },
        ["5"]={       ----攻击加成
            ["att"]=1,["effect"]=0.19,["costGem"]=20,["weight"]=10,
        },
        ["6"]={       ----攻击加成
            ["att"]=1,["effect"]=0.2,["costGem"]=20,["weight"]=10,
        },
        ["7"]={       ----技能加成
            ["att"]=2,["effect"]=0.18,["costGem"]=20,["weight"]=10,
        },
        ["8"]={       ----技能加成
            ["att"]=2,["effect"]=0.19,["costGem"]=20,["weight"]=10,
        },
        ["9"]={       ----技能加成
            ["att"]=2,["effect"]=0.2,["costGem"]=20,["weight"]=10,
        },
        ["10"]={       ----技能加成
            ["att"]=2,["effect"]=0.21,["costGem"]=20,["weight"]=10,
        },
        ["11"]={       ----技能加成
            ["att"]=2,["effect"]=0.22,["costGem"]=20,["weight"]=10,
        },
        ["12"]={       ----技能加成
            ["att"]=2,["effect"]=0.23,["costGem"]=20,["weight"]=10,
        },
        ["13"]={       ----技能加成
            ["att"]=2,["effect"]=0.24,["costGem"]=20,["weight"]=10,
        },
        ["14"]={       ----技能加成
            ["att"]=2,["effect"]=0.25,["costGem"]=20,["weight"]=10,
        },
        ["15"]={       ----血量恢复
            ["att"]=3,["effect"]=0.11,["costGem"]=20,["weight"]=10,
        },
        ["16"]={       ----血量恢复
            ["att"]=3,["effect"]=0.12,["costGem"]=20,["weight"]=10,
        },
        ["17"]={       ----血量恢复
            ["att"]=3,["effect"]=0.13,["costGem"]=20,["weight"]=10,
        },
        ["18"]={       ----血量恢复
            ["att"]=3,["effect"]=0.14,["costGem"]=20,["weight"]=10,
        },
        ["19"]={       ----血量恢复
            ["att"]=3,["effect"]=0.15,["costGem"]=20,["weight"]=10,
        },
    },
}
return atkRaceCfg

--每日任务配置
local dailyTaskCfg={
      --sortId  排序
      --icon  图标
      --openType  跳转
      --questType  任务类型
      --openNeed  福利的特殊跳转参数
      --value  进度
      --liveness  活跃度
      --reward  奖励
    task = {
        ["1"]={       ----经营商产----经营商产 12 次
            ["sortId"]=1,["icon"]="101",["openType"]="manage",["questType"]=101,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["2"]={       ----经营农产----经营农产 12 次
            ["sortId"]=2,["icon"]="102",["openType"]="manage",["questType"]=102,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["3"]={       ----招募士兵----招募士兵 12 次
            ["sortId"]=3,["icon"]="103",["openType"]="manage",["questType"]=103,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["4"]={       ----处理政务----处理政务 12 次
            ["sortId"]=4,["icon"]="104",["openType"]="affair",["questType"]=104,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["5"]={       ----门客升级----门客升级 10 次
            ["sortId"]=5,["icon"]="203",["openType"]="servant",["questType"]=202,["value"]=10,["liveness"]=10,["reward"]="5_1_10",
        },
        ["6"]={       ----推图过关----推图过关 16 关
            ["sortId"]=6,["icon"]="106",["openType"]="challenge",["questType"]=106,["value"]=16,["liveness"]=10,["reward"]="5_1_10",
        },
        ["7"]={       ----每日膜拜----每日膜拜 1 次
            ["sortId"]=7,["icon"]="114",["openType"]="rank",["questType"]=114,["value"]=1,["liveness"]=5,["reward"]="5_1_5",
        },
        ["8"]={       ----领取俸禄----领取俸禄 1 次
            ["sortId"]=8,["icon"]="115",["openType"]="palace",["questType"]=115,["value"]=1,["liveness"]=5,["reward"]="5_1_5",
        },
        ["9"]={       ----随机传唤----随机传唤 12 次
            ["sortId"]=9,["icon"]="301",["openType"]="wife",["questType"]=301,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["10"]={       ----每日寻访----每日寻访 12 次
            ["sortId"]=10,["icon"]="303",["openType"]="search",["questType"]=303,["value"]=12,["liveness"]=10,["reward"]="5_1_10",
        },
        ["11"]={       ----宴会赴宴----宴会赴宴 3 次
            ["sortId"]=11,["icon"]="119",["openType"]="dinner",["questType"]=119,["value"]=3,["liveness"]=5,["reward"]="5_1_10",
        },
        ["12"]={       ----培养子嗣----培养子嗣 4 次
            ["sortId"]=12,["icon"]="401",["openType"]="child",["questType"]=402,["value"]=4,["liveness"]=10,["reward"]="5_1_10",
        },
        ["13"]={       ----领取月卡----领取月卡 1 次
            ["sortId"]=13,["icon"]="801",["openType"]="welfare",["questType"]=801,["openNeed"]="MonthCard",["value"]=1,["liveness"]=10,["reward"]="1_1_100",
        },
        ["14"]={       ----领取终身卡----领取终身卡 1 次
            ["sortId"]=14,["icon"]="802",["openType"]="welfare",["questType"]=802,["openNeed"]="YearCard",["value"]=1,["liveness"]=10,["reward"]="1_1_100",
        },
        ["15"]={       ----强化书籍----强化书籍 1 次
            ["sortId"]=15,["icon"]="204",["openType"]="servant",["questType"]=207,["value"]=1,["liveness"]=10,["reward"]="5_1_10",
        },
        ["16"]={       ----擂台出战----擂台出战 4 次
            ["sortId"]=16,["icon"]="601",["openType"]="atkrace",["questType"]=601,["value"]=4,["liveness"]=10,["reward"]="5_1_10",
        },
        ["17"]={       ----书院学习----书院学习 4 次
            ["sortId"]=17,["icon"]="501",["openType"]="bookroom",["questType"]=502,["value"]=4,["liveness"]=10,["reward"]="5_1_10",
        },
        ["18"]={       ----惩戒犯人----惩戒犯人 35 次
            ["sortId"]=18,["icon"]="116",["openType"]="prison",["questType"]=116,["value"]=35,["liveness"]=10,["reward"]="5_1_10",
        },
        ["19"]={       ----帮会建设----帮会建设 1 次
            ["sortId"]=19,["icon"]="701",["openType"]="alliance",["questType"]=703,["value"]=1,["liveness"]=10,["reward"]="5_1_10",
        },
        ["20"]={       ----出兵讨伐----出兵讨伐 10 次
            ["sortId"]=20,["icon"]="117",["openType"]="conquest",["questType"]=117,["value"]=10,["liveness"]=5,["reward"]="5_1_10",
        },
        ["21"]={       ----世界通商----世界通商 1 次
            ["sortId"]=21,["icon"]="118",["openType"]="trade",["questType"]=118,["value"]=1,["liveness"]=5,["reward"]="5_1_10",
        },
    },
    
      --needLiveness  所需活跃度
      --base  资源基础奖励
      --mustReward  必给奖励
      --canRatio  概率奖励的权重
      --canReward  概率奖励
    rewards = {
        ["1"]={
            ["needLiveness"]=10,["base"]=20000,["mustReward"]={2,1},
        },
        ["2"]={
            ["needLiveness"]=30,["base"]=20000,["mustReward"]={4,1},
        },
        ["3"]={
            ["needLiveness"]=60,["base"]=20000,["mustReward"]={2,2},["canRatio"]={10},["canReward"]={"17_1_5"},
        },
        ["4"]={
            ["needLiveness"]=100,["base"]=20000,["mustReward"]={4,2},["canRatio"]={20,30,30,20},["canReward"]={"6_1102_1","6_1301_1","6_1302_1","17_1_5"},
        },
        ["5"]={
            ["needLiveness"]=140,["base"]=20000,["mustReward"]={2,3},["canRatio"]={30,20,10,10,10,10,10},["canReward"]={"6_1020_1","6_1004_1","6_1151_1","6_1152_1","6_1153_1","6_1154_1","17_1_5"},
        },
    },
}
return dailyTaskCfg

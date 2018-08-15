--春节活动配置
local newYearCfg={
    [1]={    --版本一：春节除夕
        --活跃点奖励
        --needScore : 所需活跃度
        --reward : 奖励
        totalScoreReward={
            ["1"]={
                ["needScore"]=500,["reward"]="6_1004_2|6_1301_5|6_1302_5|6_1303_5",
            },
            ["2"]={
                ["needScore"]=1000,["reward"]="6_1004_3|6_1501_5|6_1502_5|6_1201_5",
            },
            ["3"]={
                ["needScore"]=1500,["reward"]="6_1004_5|6_1090_3|6_1501_10|6_1502_10",
            },
            ["4"]={
                ["needScore"]=2100,["reward"]="6_2001_1|6_2002_1|6_1511_2|6_1512_2",
            },
            ["5"]={
                ["needScore"]=3200,["reward"]="6_2001_2|6_2002_2|6_1511_3|6_1512_3",
            },
        },
        
        --每日任务
        --questType:任务类型
        --value:任务的进度值
        --getScore:完成任务，获得 X 分数
        --openType:跳转参数
        --reward:任务奖励
        dailyTask={
            --第1天
            ["1"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2001_1|6_1201_20",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1150_2",
                },
                --202 : 升级门客 X 次
                ["t3"]={
                    ["questType"]="202",["sortId"]=3,["value"]=10,["getScore"]=50,["openType"]="servant",["reward"]="6_1206_1|6_1001_1",
                },
                --207 : 强化门客书籍 X 次
                ["t4"]={
                    ["questType"]="207",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="servant",["reward"]="6_1021_1|6_1001_1",
                },
                --101 : 经营商产 X 次
                ["t5"]={
                    ["questType"]="101",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1030_1|6_1001_1",
                },
            },
            --第2天
            ["2"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2002_1|6_1361_5",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2001_1|6_1362_5",
                },
                --301 : 随机传唤 X 次
                ["t3"]={
                    ["questType"]="301",["sortId"]=3,["value"]=6,["getScore"]=50,["openType"]="wife",["reward"]="6_1354_1|6_1353_1",
                },
                --303 : 每日寻访 X 次
                ["t4"]={
                    ["questType"]="303",["sortId"]=4,["value"]=6,["getScore"]=50,["openType"]="search",["reward"]="6_1352_1|6_1351_1",
                },
                --306 : 赏赐红颜 X 次
                ["t5"]={
                    ["questType"]="306",["sortId"]=5,["value"]=2,["getScore"]=50,["openType"]="wife",["reward"]="6_1354_1|6_1353_1",
                },
            },
            --第3天
            ["3"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2001_1|6_1303_5",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1303_5",
                },
                --402 : 子嗣培养 X 次
                ["t3"]={
                    ["questType"]="402",["sortId"]=3,["value"]=4,["getScore"]=50,["openType"]="child",["reward"]="6_1303_1|6_1351_1",
                },
                --110 : 使用活力丹 X 次
                ["t4"]={
                    ["questType"]="110",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="child",["reward"]="6_1303_1|6_1351_1",
                },
                --403 : 联姻 X 次
                ["t5"]={
                    ["questType"]="403",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="adult",["reward"]="6_1303_1|6_1351_1",
                },
            },
            --第4天
            ["4"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2002_1|6_1552_2",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2001_1|6_1552_2",
                },
                --601 : 衙门出战 X 次
                ["t3"]={
                    ["questType"]="601",["sortId"]=3,["value"]=2,["getScore"]=50,["openType"]="atkrace",["reward"]="6_1030_1|6_1001_1",
                },
                --603 : 衙门使用挑战书 X 次
                ["t4"]={
                    ["questType"]="603",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="atkrace",["reward"]="6_1029_1|6_1001_1",
                },
                --202 : 升级门客 X 次
                ["t5"]={
                    ["questType"]="202",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="servant",["reward"]="6_1206_1|6_1001_1",
                },
            },
            --第5天
            ["5"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2001_1|6_1090_2",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1090_2",
                },
                --106 : 关卡胜利 X 次
                ["t3"]={
                    ["questType"]="106",["sortId"]=3,["value"]=8,["getScore"]=50,["openType"]="challenge",["reward"]="6_1207_1|6_1003_1",
                },
                --114 : 膜拜 X 次
                ["t4"]={
                    ["questType"]="114",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="rank",["reward"]="6_1207_1|6_1003_1",
                },
                --115 : 请安 X 次
                ["t5"]={
                    ["questType"]="115",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="palace",["reward"]="6_1207_1|6_1003_1",
                },
            },
            --第6天
            ["6"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2002_1|6_1523_1",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2001_1|6_1521_1",
                },
                --119 : 宴会赴宴 X 次
                ["t3"]={
                    ["questType"]="119",["sortId"]=3,["value"]=1,["getScore"]=50,["openType"]="dinner",["reward"]="6_1102_1|1_1_20",
                },
                --102 : 经营农产 X 次
                ["t4"]={
                    ["questType"]="102",["sortId"]=4,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1101_1|1_1_20",
                },
                --103 : 招募士兵 X 次
                ["t5"]={
                    ["questType"]="103",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1302_1|1_1_20",
                },
            },
            --第7天
            ["7"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1010_2|6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=1000,["getScore"]=150,["openType"]="recharge",["reward"]="6_2001_1|6_1201_20",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1751_1",
                },
                --104 : 处理政务 X 次
                ["t3"]={
                    ["questType"]="104",["sortId"]=3,["value"]=6,["getScore"]=50,["openType"]="affair",["reward"]="6_1301_1|6_1003_1",
                },
                --116 : 惩罚犯人 X 次
                ["t4"]={
                    ["questType"]="116",["sortId"]=4,["value"]=10,["getScore"]=50,["openType"]="prison",["reward"]="6_1302_1|6_1003_1",
                },
                --703 : 联盟建设 X 次
                ["t5"]={
                    ["questType"]="703",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="alliance",["reward"]="6_1303_1|6_1003_1",
                },
            },
        },
    },
    [2]={    --版本二：常规版本
        --活跃点奖励
        --needScore : 所需活跃度
        --reward : 奖励
        totalScoreReward={
            ["1"]={
                ["needScore"]=500,["reward"]="6_1004_1|6_1301_2|6_1302_2|6_1303_2",
            },
            ["2"]={
                ["needScore"]=1000,["reward"]="6_1004_2|6_1701_1|6_1702_1|6_1703_1",
            },
            ["3"]={
                ["needScore"]=1500,["reward"]="6_1004_3|6_1090_1|6_1501_2|6_1502_2",
            },
            ["4"]={
                ["needScore"]=2100,["reward"]="6_2002_1|6_1004_4|6_1501_3|6_1502_3",
            },
            ["5"]={
                ["needScore"]=3200,["reward"]="6_2002_2|6_1151_1|6_1152_1|6_1004_5",
            },
        },
        
        --每日任务
        --questType:任务类型
        --value:任务的进度值
        --getScore:完成任务，获得 X 分数
        --openType:跳转参数
        --reward:任务奖励
        dailyTask={
            --第1天
            ["1"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1150_1|6_1201_10",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1201_3",
                },
                --202 : 升级门客 X 次
                ["t3"]={
                    ["questType"]="202",["sortId"]=3,["value"]=10,["getScore"]=50,["openType"]="servant",["reward"]="6_1206_1|6_1001_1",
                },
                --207 : 强化门客书籍 X 次
                ["t4"]={
                    ["questType"]="207",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="servant",["reward"]="6_1021_1|6_1001_1",
                },
                --101 : 经营商产 X 次
                ["t5"]={
                    ["questType"]="101",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1030_1|6_1001_1",
                },
            },
            --第2天
            ["2"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1361_5|6_1362_5",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1362_2",
                },
                --301 : 随机传唤 X 次
                ["t3"]={
                    ["questType"]="301",["sortId"]=3,["value"]=6,["getScore"]=50,["openType"]="wife",["reward"]="6_1354_1|6_1353_1",
                },
                --303 : 每日寻访 X 次
                ["t4"]={
                    ["questType"]="303",["sortId"]=4,["value"]=6,["getScore"]=50,["openType"]="search",["reward"]="6_1352_1|6_1351_1",
                },
                --306 : 赏赐红颜 X 次
                ["t5"]={
                    ["questType"]="306",["sortId"]=5,["value"]=2,["getScore"]=50,["openType"]="wife",["reward"]="6_1354_1|6_1353_1",
                },
            },
            --第3天
            ["3"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1402_1|6_1303_5",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1303_2",
                },
                --402 : 子嗣培养 X 次
                ["t3"]={
                    ["questType"]="402",["sortId"]=3,["value"]=4,["getScore"]=50,["openType"]="child",["reward"]="6_1352_1|6_1351_1",
                },
                --110 : 使用活力丹 X 次
                ["t4"]={
                    ["questType"]="110",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="child",["reward"]="6_1352_1|6_1351_1",
                },
                --403 : 联姻 X 次
                ["t5"]={
                    ["questType"]="403",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="adult",["reward"]="6_1303_1|6_1351_1",
                },
            },
            --第4天
            ["4"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1553_1|6_1552_1",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1552_1",
                },
                --601 : 衙门出战 X 次
                ["t3"]={
                    ["questType"]="601",["sortId"]=3,["value"]=2,["getScore"]=50,["openType"]="atkrace",["reward"]="6_1030_1|6_1001_1",
                },
                --603 : 衙门使用挑战书 X 次
                ["t4"]={
                    ["questType"]="603",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="atkrace",["reward"]="6_1029_1|6_1001_1",
                },
                --202 : 升级门客 X 次
                ["t5"]={
                    ["questType"]="202",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="servant",["reward"]="6_1206_1|6_1001_1",
                },
            },
            --第5天
            ["5"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1150_1|6_1090_1",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1090_1",
                },
                --106 : 关卡胜利 X 次
                ["t3"]={
                    ["questType"]="106",["sortId"]=3,["value"]=8,["getScore"]=50,["openType"]="challenge",["reward"]="6_1207_1|6_1003_1",
                },
                --114 : 膜拜 X 次
                ["t4"]={
                    ["questType"]="114",["sortId"]=4,["value"]=1,["getScore"]=50,["openType"]="rank",["reward"]="6_1207_1|6_1003_1",
                },
                --115 : 请安 X 次
                ["t5"]={
                    ["questType"]="115",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="palace",["reward"]="6_1207_1|6_1003_1",
                },
            },
            --第6天
            ["6"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1004_3|6_1010_3",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1010_1",
                },
                --119 : 宴会赴宴 X 次
                ["t3"]={
                    ["questType"]="119",["sortId"]=3,["value"]=1,["getScore"]=50,["openType"]="dinner",["reward"]="6_1102_1|1_1_20",
                },
                --102 : 经营农产 X 次
                ["t4"]={
                    ["questType"]="102",["sortId"]=4,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1101_1|1_1_20",
                },
                --103 : 招募士兵 X 次
                ["t5"]={
                    ["questType"]="103",["sortId"]=5,["value"]=10,["getScore"]=50,["openType"]="manage",["reward"]="6_1302_1|1_1_20",
                },
            },
            --第7天
            ["7"]={
                --1001 : 完成每日所有任务
                ["t0"]={
                    ["questType"]="1001",["value"]=5,["reward"]="6_1701_1|6_1702_1|6_1703_1",
                },
                --1002 : 花费 X 元宝购买
                ["t1"]={
                    ["questType"]="1002",["sortId"]=1,["value"]=500,["getScore"]=150,["openType"]="recharge",["reward"]="6_1751_1|6_1201_5",
                },
                --1003 : 单日充值 X 元，单位：RMB
                ["t2"]={
                    ["questType"]="1003",["sortId"]=2,["value"]=30,["getScore"]=200,["openType"]="recharge",["reward"]="6_2002_1|6_1201_3",
                },
                --104 : 处理政务 X 次
                ["t3"]={
                    ["questType"]="104",["sortId"]=3,["value"]=6,["getScore"]=50,["openType"]="affair",["reward"]="6_1301_1|6_1003_1",
                },
                --116 : 惩罚犯人 X 次
                ["t4"]={
                    ["questType"]="116",["sortId"]=4,["value"]=10,["getScore"]=50,["openType"]="prison",["reward"]="6_1302_1|6_1003_1",
                },
                --703 : 联盟建设 X 次
                ["t5"]={
                    ["questType"]="703",["sortId"]=5,["value"]=1,["getScore"]=50,["openType"]="alliance",["reward"]="6_1303_1|6_1003_1",
                },
            },
        },
    },
}
return newYearCfg

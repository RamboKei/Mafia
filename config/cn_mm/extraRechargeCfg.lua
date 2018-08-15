local extraRechargeCfg={
      -- cost 单位：点卡面额
      -- gemCost 购买钻石
      -- firstGet 首充赠送
      -- secondGet 后续充值赠送
      -- dayCount 月卡天数
      -- dayGet 每日获得
      -- dayLimit 购买上限
      -- sortId 显示顺序
      -- recommend 推荐
    ["g1"]={       ----42陌陌币 42档位
        ["cost"]=42,["gemCost"]=42,["firstGet"]=42,["sortId"]=1,["recommend"]=0,
    },
    ["g2"]={       ----210陌陌币 210档位
        ["cost"]=210,["gemCost"]=210,["firstGet"]=210,["sortId"]=2,["recommend"]=0,
    },
    ["g3"]={       ----476陌陌币 476档位
        ["cost"]=476,["gemCost"]=476,["firstGet"]=476,["sortId"]=3,["recommend"]=0,
    },
    ["g4"]={       ----1386陌陌币 1386档位
        ["cost"]=1386,["gemCost"]=1386,["firstGet"]=1386,["sortId"]=4,["recommend"]=0,
    },
    ["g5"]={       ----2296陌陌币 2296档位
        ["cost"]=2296,["gemCost"]=2296,["firstGet"]=2296,["sortId"]=5,["recommend"]=0,
    },
    ["g6"]={       ----4536陌陌币 4536档位
        ["cost"]=4536,["gemCost"]=4536,["firstGet"]=4536,["sortId"]=6,["recommend"]=0,
    },
    ["g7"]={       ----28元 月卡
        ["cost"]=196,["gemCost"]=196,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["recommend"]=0,
    },
    ["g8"]={       ----288元 终身卡
        ["cost"]=2016,["gemCost"]=2016,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["recommend"]=0,
    },
    ["g9"]={       ----12元关卡礼包
        ["cost"]=84,["gemCost"]=84,["recommend"]=0,["lastTime"]=7200,["getReward"]="6_1151_2|6_1202_25|4_1_2000000",
    },
    ["g10"]={       ----12元权势礼包
        ["cost"]=84,["gemCost"]=84,["recommend"]=0,["lastTime"]=7200,["getReward"]="6_1150_2|6_1020_25|2_1_2000000",
    },
    ["g11"]={       ----98元 【终身卡打折版】
        ["cost"]=686,["gemCost"]=686,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["recommend"]=0,
    },
    ["g12"]={       ----6986陌陌币 6986档位
        ["cost"]=6986,["gemCost"]=6986,["firstGet"]=6986,["sortId"]=7,["recommend"]=0,
    },
    ["g13"]={       ----20986陌陌币 20986档位
        ["cost"]=20986,["gemCost"]=20986,["firstGet"]=20986,["sortId"]=8,["recommend"]=0,
    },
    ["g14"]={       ----许愿活动打折
        ["cost"]=7,["gemCost"]=0,["recommend"]=0,["getReward"]="6_2102_1",
    },
    ["g15"]={       ----许愿活动正常
        ["cost"]=42,["gemCost"]=0,["recommend"]=0,["getReward"]="6_2102_1",
    },
}
return extraRechargeCfg

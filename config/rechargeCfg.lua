local rechargeCfg={
      -- cost RMB花费
      -- gemCost 购买钻石
      -- firstGet 首充赠送
      -- dayCount 月卡天数
      -- dayGet 每日获得
      -- dayLimit 购买上限
      -- sortId 显示顺序
      -- recommend 推荐
      -- lastTime 付费礼包持续时间 单位：秒
      -- getReward 付费礼包奖励
    ["g1"]={       ----6元 60档位
        ["cost"]=6,["gemCost"]=60,["firstGet"]=60,["sortId"]=1,["recommend"]=0
    },
    ["g2"]={       ----30元 300档位
        ["cost"]=30,["gemCost"]=300,["firstGet"]=300,["sortId"]=2,["recommend"]=0
    },
    ["g3"]={       ----68元 680档位
        ["cost"]=68,["gemCost"]=680,["firstGet"]=680,["sortId"]=3,["recommend"]=0
    },
    ["g4"]={       ----198元 1980档位
        ["cost"]=198,["gemCost"]=1980,["firstGet"]=1980,["sortId"]=4,["recommend"]=0
    },
    ["g5"]={       ----328元 3280档位
        ["cost"]=328,["gemCost"]=3280,["firstGet"]=3280,["sortId"]=5,["recommend"]=0
    },
    ["g6"]={       ----648元 6480档位
        ["cost"]=648,["gemCost"]=6480,["firstGet"]=6480,["sortId"]=6,["recommend"]=0
    },
    ["g7"]={       ----28元 月卡
        ["cost"]=28,["gemCost"]=280,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["recommend"]=0
    },
    ["g8"]={       ----288元 终身卡
        ["cost"]=288,["gemCost"]=2880,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["recommend"]=0
    },
    ["g9"]={       ----12元关卡礼包
        ["cost"]=12,["gemCost"]=120,["recommend"]=0,["lastTime"]=7200,["getReward"]="6_1151_2|6_1202_25|4_1_2000000"
    },
    ["g10"]={       ----12元权势礼包
        ["cost"]=12,["gemCost"]=120,["recommend"]=0,["lastTime"]=7200,["getReward"]="6_1150_2|6_1020_25|2_1_2000000"
    },
    ["g11"]={       ----98元 【终身卡打折版】
        ["cost"]=98,["gemCost"]=980,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["recommend"]=0
    },
    ["g12"]={       ----998元 9980档位
        ["cost"]=998,["gemCost"]=9980,["firstGet"]=9980,["sortId"]=7,["recommend"]=0
    },
    ["g13"]={       ----2998元 29980档位
        ["cost"]=2998,["gemCost"]=29980,["firstGet"]=29980,["sortId"]=8,["recommend"]=0
    },
    ["g14"]={       ----许愿活动打折
        ["cost"]=1,["gemCost"]=0,["recommend"]=0,["getReward"]="6_2102_1"
    },
    ["g15"]={       ----许愿活动正常
        ["cost"]=6,["gemCost"]=0,["recommend"]=0,["getReward"]="6_2102_1"
    },
}
return rechargeCfg

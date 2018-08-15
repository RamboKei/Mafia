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
    ["g1"]={       ----30泰铢 90档位
        ["cost"]=0.99,["costT2"]=30,["gemCost"]=90,["firstGet"]=90,["sortId"]=1,["recommend"]=0
    },
    ["g2"]={       ----120泰铢 360档位
        ["cost"]=3.99,["costT2"]=120,["gemCost"]=360,["firstGet"]=360,["sortId"]=2,["recommend"]=0
    },
    ["g3"]={       ----300泰铢 900档位
        ["cost"]=9.99,["costT2"]=300,["gemCost"]=900,["firstGet"]=900,["sortId"]=3,["recommend"]=0
    },
    ["g4"]={       ----600泰铢 1800档位
        ["cost"]=19.99,["costT2"]=600,["gemCost"]=1800,["firstGet"]=1800,["sortId"]=4,["recommend"]=0
    },
    ["g5"]={       ----1500泰铢 4500档位
        ["cost"]=49.99,["costT2"]=1500,["gemCost"]=4500,["firstGet"]=4500,["sortId"]=5,["recommend"]=0
    },
    ["g6"]={       ----3000泰铢 9000档位
        ["cost"]=99.99,["costT2"]=3000,["gemCost"]=9000,["firstGet"]=9000,["sortId"]=6,["recommend"]=0
    },
    ["g7"]={       ----5500泰铢 月卡
        ["cost"]=3.99,["costT2"]=120,["gemCost"]=360,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["recommend"]=0
    },
    ["g8"]={       ----55000泰铢 终身卡
        ["cost"]=49.99,["costT2"]=1500,["gemCost"]=4500,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=365,["recommend"]=0
    },
}
return rechargeCfg

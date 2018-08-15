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
    ["g1"]={       ----1100韩元 60档位
        ["cost"]=1.09,["costK2"]=1100,["gemCost"]=60,["firstGet"]=60,["sortId"]=1,["recommend"]=0
    },
    ["g2"]={       ----4400韩元 240档位
        ["cost"]=4.39,["costK2"]=4400,["gemCost"]=240,["firstGet"]=240,["sortId"]=2,["recommend"]=0
    },
    ["g3"]={       ----11000韩元 600档位
        ["cost"]=10.99,["costK2"]=11000,["gemCost"]=600,["firstGet"]=600,["sortId"]=3,["recommend"]=0
    },
    ["g4"]={       ----22000韩元 1200档位
        ["cost"]=21.99,["costK2"]=22000,["gemCost"]=1200,["firstGet"]=1200,["sortId"]=4,["recommend"]=0
    },
    ["g5"]={       ----55000韩元 3000档位
        ["cost"]=54.99,["costK2"]=55000,["gemCost"]=3000,["firstGet"]=3000,["sortId"]=5,["recommend"]=0
    },
    ["g6"]={       ----110000韩元 6000档位
        ["cost"]=109.99,["costK2"]=110000,["gemCost"]=6000,["firstGet"]=6000,["sortId"]=6,["recommend"]=0
    },
    ["g7"]={       ----5500韩元 月卡
        ["cost"]=5.49,["costK2"]=5500,["gemCost"]=300,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["recommend"]=0
    },
    ["g8"]={       ----55000韩元 终身卡
        ["cost"]=54.99,["costK2"]=55000,["gemCost"]=3000,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=365,["recommend"]=0
    },
}
return rechargeCfg

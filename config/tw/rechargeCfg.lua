local rechargeCfg={
      -- cost RMB花费
      -- gemCost 购买钻石
      -- firstGet 首充赠送
	  -- secondGet 首充翻倍后，部分档位下一次充值赠送元宝
      -- dayCount 月卡天数
      -- dayGet 每日获得
      -- dayLimit 购买上限
      -- sortId 显示顺序
      -- recommend 推荐
    ["g1"]={       ----0.99美元 60档位
        ["cost"]=0.99,["gemCost"]=60,["firstGet"]=60,["sortId"]=1,["recommend"]=0
    },
    ["g2"]={       ----3.99美元 240档位
        ["cost"]=3.99,["gemCost"]=240,["firstGet"]=240,["sortId"]=2,["recommend"]=0
    },
    ["g3"]={       ----9.99美元 600档位
        ["cost"]=9.99,["gemCost"]=600,["firstGet"]=600,["secondGet"]=36,["sortId"]=3,["recommend"]=0
    },
    ["g4"]={       ----19.99美元 1200档位
        ["cost"]=19.99,["gemCost"]=1200,["firstGet"]=1200,["secondGet"]=84,["sortId"]=4,["recommend"]=0
    },
    ["g5"]={       ----49.99美元 3000档位
        ["cost"]=49.99,["gemCost"]=3000,["firstGet"]=3000,["secondGet"]=390,["sortId"]=5,["recommend"]=0
    },
    ["g6"]={       ----99.99美元 6000档位
        ["cost"]=99.99,["gemCost"]=6000,["firstGet"]=6000,["secondGet"]=900,["sortId"]=6,["recommend"]=0
    },
    ["g7"]={       ----4.99美元 300档位
        ["cost"]=4.99,["gemCost"]=300,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["recommend"]=0
    },
    ["g8"]={       ----49.99美元 3000档位
        ["cost"]=49.99,["gemCost"]=3000,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["recommend"]=0
    },
}
return rechargeCfg

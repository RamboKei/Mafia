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
    ["D10"]={       ----1
        ["cost"]=5,["gemCost"]=10,["firstGet"]=10,["sortId"]=1,["recommend"]=0,
    },
    ["D20"]={       ----2
        ["cost"]=10,["gemCost"]=20,["firstGet"]=20,["sortId"]=2,["recommend"]=0,
    },
    ["D24"]={       ----2.4
        ["cost"]=12,["gemCost"]=24,["firstGet"]=24,["sortId"]=3,["recommend"]=0,
    },
    ["D42"]={       ----4.2
        ["cost"]=21,["gemCost"]=42,["firstGet"]=42,["sortId"]=4,["recommend"]=0,
    },
    ["D44"]={       ----4.4
        ["cost"]=22,["gemCost"]=44,["firstGet"]=44,["sortId"]=5,["recommend"]=0,
    },
    ["D50"]={       ----5
        ["cost"]=25,["gemCost"]=50,["firstGet"]=50,["sortId"]=6,["recommend"]=0,
    },
    ["D60"]={       ----6
        ["cost"]=30,["gemCost"]=60,["firstGet"]=60,["sortId"]=7,["recommend"]=0,
    },
    ["D70"]={       ----7
        ["cost"]=35,["gemCost"]=70,["firstGet"]=70,["sortId"]=8,["recommend"]=0,
    },
    ["D100"]={       ----10
        ["cost"]=50,["gemCost"]=100,["firstGet"]=100,["sortId"]=9,["recommend"]=0,
    },
    ["D120"]={       ----12
        ["cost"]=60,["gemCost"]=120,["firstGet"]=120,["sortId"]=10,["recommend"]=0,
    },
    ["D140"]={       ----14
        ["cost"]=70,["gemCost"]=140,["firstGet"]=140,["sortId"]=11,["recommend"]=0,
    },
    ["D180"]={       ----18
        ["cost"]=90,["gemCost"]=180,["firstGet"]=180,["sortId"]=12,["recommend"]=0,
    },
    ["D230"]={       ----23
        ["cost"]=115,["gemCost"]=230,["firstGet"]=230,["sortId"]=13,["recommend"]=0,
    },
    ["D240"]={       ----24
        ["cost"]=120,["gemCost"]=240,["firstGet"]=240,["sortId"]=14,["recommend"]=0,
    },
    ["D250"]={       ----25
        ["cost"]=125,["gemCost"]=250,["firstGet"]=250,["sortId"]=15,["recommend"]=0,
    },
    ["D280"]={       ----28
        ["cost"]=140,["gemCost"]=280,["firstGet"]=280,["sortId"]=16,["recommend"]=0,
    },
    ["D300"]={       ----30
        ["cost"]=150,["gemCost"]=300,["firstGet"]=300,["sortId"]=17,["recommend"]=0,
    },
    ["Y300"]={       ----30
        ["cost"]=150,["gemCost"]=300,["dayCount"]=30,["dayGet"]=100,["dayLimit"]=30,["sortId"]=18,["recommend"]=0,
    },
    ["D360"]={       ----36
        ["cost"]=180,["gemCost"]=360,["firstGet"]=360,["sortId"]=19,["recommend"]=0,
    },
    ["D420"]={       ----42
        ["cost"]=210,["gemCost"]=420,["firstGet"]=420,["sortId"]=20,["recommend"]=0,
    },
    ["D460"]={       ----46
        ["cost"]=230,["gemCost"]=460,["firstGet"]=460,["sortId"]=21,["recommend"]=0,
    },
    ["D500"]={       ----50
        ["cost"]=250,["gemCost"]=500,["firstGet"]=500,["sortId"]=22,["recommend"]=0,
    },
    ["D560"]={       ----56
        ["cost"]=280,["gemCost"]=560,["firstGet"]=560,["sortId"]=23,["recommend"]=0,
    },
    ["D600"]={       ----60
        ["cost"]=300,["gemCost"]=600,["firstGet"]=600,["secondGet"]=36,["sortId"]=24,["recommend"]=0,
    },
    ["D700"]={       ----70
        ["cost"]=350,["gemCost"]=700,["firstGet"]=700,["secondGet"]=42,["sortId"]=25,["recommend"]=0,
    },
    ["D800"]={       ----80
        ["cost"]=400,["gemCost"]=800,["firstGet"]=800,["secondGet"]=48,["sortId"]=26,["recommend"]=0,
    },
    ["D900"]={       ----90
        ["cost"]=450,["gemCost"]=900,["firstGet"]=900,["secondGet"]=54,["sortId"]=27,["recommend"]=0,
    },
    ["D920"]={       ----92
        ["cost"]=460,["gemCost"]=920,["firstGet"]=920,["secondGet"]=55,["sortId"]=28,["recommend"]=0,
    },
    ["D1000"]={       ----100
        ["cost"]=500,["gemCost"]=1000,["firstGet"]=1000,["secondGet"]=60,["sortId"]=29,["recommend"]=0,
    },
    ["D1200"]={       ----120
        ["cost"]=600,["gemCost"]=1200,["firstGet"]=1200,["secondGet"]=84,["sortId"]=30,["recommend"]=0,
    },
    ["D1380"]={       ----138
        ["cost"]=690,["gemCost"]=1380,["firstGet"]=1380,["secondGet"]=97,["sortId"]=31,["recommend"]=0,
    },
    ["D1400"]={       ----140
        ["cost"]=700,["gemCost"]=1400,["firstGet"]=1400,["secondGet"]=98,["sortId"]=32,["recommend"]=0,
    },
    ["D1500"]={       ----150
        ["cost"]=750,["gemCost"]=1500,["firstGet"]=1500,["secondGet"]=210,["sortId"]=33,["recommend"]=0,
    },
    ["D1800"]={       ----180
        ["cost"]=900,["gemCost"]=1800,["firstGet"]=1800,["secondGet"]=252,["sortId"]=34,["recommend"]=0,
    },
    ["D2000"]={       ----200
        ["cost"]=1000,["gemCost"]=2000,["firstGet"]=2000,["secondGet"]=280,["sortId"]=35,["recommend"]=0,
    },
    ["D2300"]={       ----230
        ["cost"]=1150,["gemCost"]=2300,["firstGet"]=2300,["secondGet"]=322,["sortId"]=36,["recommend"]=0,
    },
    ["D2400"]={       ----240
        ["cost"]=1200,["gemCost"]=2400,["firstGet"]=2400,["secondGet"]=336,["sortId"]=37,["recommend"]=0,
    },
    ["D2800"]={       ----280
        ["cost"]=1400,["gemCost"]=2800,["firstGet"]=2800,["secondGet"]=392,["sortId"]=38,["recommend"]=0,
    },
    ["D2980"]={       ----298
        ["cost"]=1490,["gemCost"]=2980,["firstGet"]=2980,["secondGet"]=417,["sortId"]=39,["recommend"]=0,
    },
    ["D3000"]={       ----300
        ["cost"]=1500,["gemCost"]=3000,["firstGet"]=3000,["secondGet"]=420,["sortId"]=40,["recommend"]=0,
    },
    ["Y3000"]={       ----300
        ["cost"]=1500,["gemCost"]=3000,["dayCount"]=9999,["dayGet"]=100,["dayLimit"]=9999,["sortId"]=41,["recommend"]=0,
    },
    ["D3600"]={       ----360
        ["cost"]=1800,["gemCost"]=3600,["firstGet"]=3600,["secondGet"]=504,["sortId"]=42,["recommend"]=0,
    },
    ["D4000"]={       ----400
        ["cost"]=2000,["gemCost"]=4000,["firstGet"]=4000,["secondGet"]=600,["sortId"]=43,["recommend"]=0,
    },
    ["D4200"]={       ----420
        ["cost"]=2100,["gemCost"]=4200,["firstGet"]=4200,["secondGet"]=630,["sortId"]=44,["recommend"]=0,
    },
    ["D4600"]={       ----460
        ["cost"]=2300,["gemCost"]=4600,["firstGet"]=4600,["secondGet"]=690,["sortId"]=45,["recommend"]=0,
    },
    ["D6000"]={       ----600
        ["cost"]=3000,["gemCost"]=6000,["firstGet"]=6000,["secondGet"]=900,["sortId"]=46,["recommend"]=0,
    },
    ["D7000"]={       ----700
        ["cost"]=3500,["gemCost"]=7000,["firstGet"]=7000,["secondGet"]=1050,["sortId"]=47,["recommend"]=0,
    },
    ["D7200"]={       ----720
        ["cost"]=3600,["gemCost"]=7200,["firstGet"]=7200,["secondGet"]=1080,["sortId"]=48,["recommend"]=0,
    },
    ["D10000"]={       ----1000
        ["cost"]=5000,["gemCost"]=10000,["firstGet"]=10000,["secondGet"]=1500,["sortId"]=49,["recommend"]=0,
    },
    ["D20000"]={       ----2000
        ["cost"]=10000,["gemCost"]=20000,["firstGet"]=20000,["secondGet"]=3600,["sortId"]=50,["recommend"]=0,
    },
    ["D40000"]={       ----4000
        ["cost"]=20000,["gemCost"]=40000,["firstGet"]=40000,["secondGet"]=8000,["sortId"]=51,["recommend"]=0,["getReward1"]="6_1150_1|6_1004_1|6_1102_1|6_1301_1|6_1302_1|6_1303_1|6_1001_10|6_1003_10|6_1701_2|6_1702_2|6_1703_2",
    },
    ["D60000"]={       ----6000
        ["cost"]=30000,["gemCost"]=60000,["firstGet"]=60000,["secondGet"]=12000,["sortId"]=52,["recommend"]=0,["getReward1"]="6_1150_2|6_1010_1|6_1004_3|6_1102_3|6_1552_1|6_1301_3|6_1302_3|6_1303_3|6_1001_30|6_1003_30|6_1701_3|6_1702_3|6_1703_3",
    },
    ["D100000"]={       ----10000
        ["cost"]=50000,["gemCost"]=100000,["firstGet"]=100000,["secondGet"]=20000,["sortId"]=53,["recommend"]=0,["getReward1"]="6_1150_3|6_1010_2|6_1004_5|6_1102_5|6_1552_2|6_1301_5|6_1302_5|6_1303_5|6_1001_50|6_1003_50|6_1701_5|6_1702_5|6_1703_5",
    },
}
return extraRechargeCfg

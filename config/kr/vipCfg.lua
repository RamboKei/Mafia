--VIP配置
local vipCfg={
      --needGem  所需充值额度  单位是元宝数量  单位：元宝
      --birthRatio  增加红颜生孩子概率  0.1代表10%
      --maxStrength  寻访体力上限  
      --maxEnergy  随机传唤精力上限
      --maxVigour  子嗣培养活力上限
      --searchLuckFree  寻访每日的逆天转运免费次数
      --dailyLuckNum  天恩赐福每日次数
      --getWife  获得红颜  充值奖励
      --getServant  获得门客  充值奖励
      --reward  获得奖励  充值额外奖励
    
    ["0"]={       ----vip0
        ["needGem"]=0,["birthRatio"]=0,["maxStrength"]=3,["maxEnergy"]=3,["maxVigour"]=2,["searchLuckFree"]=0,["dailyLuckNum"]=1,
    },
    ["1"]={       ----vip1
        ["needGem"]=300,["birthRatio"]=0.1,["maxStrength"]=4,["maxEnergy"]=4,["maxVigour"]=2,["searchLuckFree"]=0,["dailyLuckNum"]=1,["reward"]="11_4001_1|6_1150_1|6_1001_5|6_1003_5",
    },
    ["2"]={       ----vip2
        ["needGem"]=1000,["birthRatio"]=0.1,["maxStrength"]=5,["maxEnergy"]=5,["maxVigour"]=2,["searchLuckFree"]=0,["dailyLuckNum"]=1,["getWife"]="303",["reward"]="6_1150_4|6_1352_10|6_1354_10|6_1303_10",
    },
    ["3"]={       ----vip3
        ["needGem"]=2560,["birthRatio"]=0.2,["maxStrength"]=6,["maxEnergy"]=6,["maxVigour"]=3,["searchLuckFree"]=1,["dailyLuckNum"]=2,["getServant"]="1034",["reward"]="6_1150_4|6_1911_1|6_1501_5|6_1502_5",
    },
    ["4"]={       ----vip4
        ["needGem"]=5800,["birthRatio"]=0.2,["maxStrength"]=7,["maxEnergy"]=7,["maxVigour"]=3,["searchLuckFree"]=1,["dailyLuckNum"]=3,["getWife"]="302",["reward"]="6_1150_4|6_1403_1|6_1402_2|6_1401_3",
    },
    ["5"]={       ----vip5
        ["needGem"]=10000,["birthRatio"]=0.3,["maxStrength"]=8,["maxEnergy"]=8,["maxVigour"]=4,["searchLuckFree"]=2,["dailyLuckNum"]=3,["getServant"]="1035",["reward"]="6_1150_4|6_1701_1|6_1702_1|6_1703_1",
    },
    ["6"]={       ----vip6
        ["needGem"]=40000,["birthRatio"]=0.3,["maxStrength"]=9,["maxEnergy"]=9,["maxVigour"]=4,["searchLuckFree"]=2,["dailyLuckNum"]=3,["getWife"]="304",["reward"]="6_1150_4|6_1704_1|6_1705_1|6_1706_1",
    },
    ["7"]={       ----vip7
        ["needGem"]=100000,["birthRatio"]=0.4,["maxStrength"]=10,["maxEnergy"]=10,["maxVigour"]=5,["searchLuckFree"]=3,["dailyLuckNum"]=3,["getServant"]="1036",["reward"]="6_1150_4|6_1707_1|6_1708_1|6_1709_1",
    },
    ["8"]={       ----vip8
        ["needGem"]=300000,["birthRatio"]=0.4,["maxStrength"]=11,["maxEnergy"]=11,["maxVigour"]=5,["searchLuckFree"]=3,["dailyLuckNum"]=3,["getWife"]="305",["reward"]="6_1150_4|6_1710_1|6_1711_1|6_1712_1",
    },
    ["9"]={       ----vip9
        ["needGem"]=1000000,["birthRatio"]=0.5,["maxStrength"]=12,["maxEnergy"]=12,["maxVigour"]=5,["searchLuckFree"]=4,["dailyLuckNum"]=3,["getWife"]="306",["getServant"]="1037",["reward"]="6_1150_4|6_1713_1|6_1714_1|6_1715_1",
    },
    ["10"]={       ----vip10
        ["needGem"]=2000000,["birthRatio"]=0.5,["maxStrength"]=13,["maxEnergy"]=13,["maxVigour"]=5,["searchLuckFree"]=4,["dailyLuckNum"]=3,["getWife"]="307",["getServant"]="1038",["reward"]="6_1150_4|6_1716_1|6_1717_1|6_1718_1",
    },
    ["11"]={       ----vip11
        ["needGem"]=4000000,["birthRatio"]=0.5,["maxStrength"]=14,["maxEnergy"]=14,["maxVigour"]=5,["searchLuckFree"]=4,["dailyLuckNum"]=3,
    },
}
return vipCfg

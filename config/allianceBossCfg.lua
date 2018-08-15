--联盟BOSS配置
local allianceBossCfg={
      --needAllianceLv  开启BOSS所需联盟等级
      --bossPic  联盟BOSS图资源
      --needAsset  开启BOSS消耗联盟资产
      --needGem  开启BOSS消耗元宝
      --attribution  BOSS总贡献  计算贡献奖励时的系数
      --addAsset  击杀BOSS增加联盟财富
      --addExp  击杀BOSS增加联盟经验
      --bossHp  BOSS的血量
      --drop  击杀BOSS概率掉落
    ["1"]={       ----1级BOSS
        ["drop"]={
            {"6_1701_1",10},
            {"6_1702_1",10},
            {"6_1703_1",10},
        },
        ["needAllianceLv"]=1,["bossPic"]=1,["needAsset"]=200,["needGem"]=100,["attribution"]=200,["addAsset"]=200,["addExp"]=100,["bossHp"]=400000000,
    },
    ["2"]={       ----2级BOSS
        ["drop"]={
            {"6_1701_1",10},
            {"6_1702_1",10},
            {"6_1703_1",10},
        },
        ["needAllianceLv"]=1,["bossPic"]=1,["needAsset"]=400,["needGem"]=200,["attribution"]=500,["addAsset"]=500,["addExp"]=200,["bossHp"]=1000000000,
    },
    ["3"]={       ----3级BOSS
        ["drop"]={
            {"6_1701_1",10},
            {"6_1702_1",10},
            {"6_1703_1",10},
        },
        ["needAllianceLv"]=2,["bossPic"]=2,["needAsset"]=800,["needGem"]=400,["attribution"]=1200,["addAsset"]=1200,["addExp"]=400,["bossHp"]=2400000000,
    },
    ["4"]={       ----4级BOSS
        ["drop"]={
            {"6_1701_1",10},
            {"6_1702_1",10},
            {"6_1703_1",10},
        },
        ["needAllianceLv"]=3,["bossPic"]=2,["needAsset"]=1200,["needGem"]=600,["attribution"]=2100,["addAsset"]=2100,["addExp"]=600,["bossHp"]=4200000000,
    },
    ["5"]={       ----5级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=4,["bossPic"]=3,["needAsset"]=1600,["needGem"]=800,["attribution"]=3200,["addAsset"]=3200,["addExp"]=800,["bossHp"]=6400000000,
    },
    ["6"]={       ----6级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=5,["bossPic"]=3,["needAsset"]=2000,["needGem"]=1000,["attribution"]=4500,["addAsset"]=4500,["addExp"]=1000,["bossHp"]=9000000000,
    },
    ["7"]={       ----7级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=6,["bossPic"]=4,["needAsset"]=2400,["needGem"]=1200,["attribution"]=6000,["addAsset"]=6000,["addExp"]=1200,["bossHp"]=12000000000,
    },
    ["8"]={       ----8级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=7,["bossPic"]=4,["needAsset"]=2800,["needGem"]=1400,["attribution"]=7700,["addAsset"]=7700,["addExp"]=1400,["bossHp"]=16800000000,
    },
    ["9"]={       ----9级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=8,["bossPic"]=5,["needAsset"]=3200,["needGem"]=1600,["attribution"]=9600,["addAsset"]=9600,["addExp"]=1600,["bossHp"]=22400000000,
    },
    ["10"]={       ----10级BOSS
        ["drop"]={
            {"6_1704_1",10},
            {"6_1705_1",10},
            {"6_1706_1",10},
        },
        ["needAllianceLv"]=9,["bossPic"]=5,["needAsset"]=3600,["needGem"]=1800,["attribution"]=11700,["addAsset"]=11700,["addExp"]=1800,["bossHp"]=28800000000,
    },
}
return allianceBossCfg

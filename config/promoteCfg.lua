--分封配置
local promoteCfg={
    --分封消耗 单位：元宝  首次分封是免费的，撤销分封是消耗元宝的
    promoteCost=500,
    
    --分封的官职限制 官职大于X才能被分封
    needLv=7,
    
      --type  职位类型
      --effect1  每日前X次，门客升级消耗降低X%  加法加成  门客升级消耗 = 原升级消耗 * （1- 国策1 - effect1）
      --effect2  每日前X次赏赐红颜可获得双倍效果  加法加成  次数+1
      --effect3  擂台攻击时，每日前X个门客的攻击力增加X  加法加成  攻击提升 = 国策3 + effect3
      --effect4  打联盟BOSS时，前X个门客伤害提升X  加法加成  伤害提升 = 国策4 + effect4
    positionList={
        [1]={       ----军机大臣
            ["type"]=1,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [2]={       ----大将军
            ["type"]=2,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [3]={       ----尚书
            ["type"]=3,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [4]={       ----提督
            ["type"]=4,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [5]={       ----大学士
            ["type"]=5,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [6]={       ----总督
            ["type"]=6,["effect1"]=0.005,["effect2"]=1,["effect3"]=0.02,["effect4"]=0.01,
        },
        [7]={       ----太监总管
            ["type"]=7,
        },
    },
}
return promoteCfg

--红颜位分配置
local wifestatusCfg={
      --needStar  解锁需要星数
      --maxNum  位置上限
      --needIntimacy  该位置所需亲密度
      --needGlamour  该位置所需魅力值
      --getStar  每个位置获得星数
    
    ["1"]={       ----丫鬟
        ["needStar"]=0,
    },
    ["2"]={       ----婢女
        ["needStar"]=0,
        ["maxNum"]=10,
        ["needIntimacy"]=100,
        ["needGlamour"]=500,
        ["getStar"]=1,
    },
    ["3"]={       ----侍婢
        ["needStar"]=2,
        ["maxNum"]=9,
        ["needIntimacy"]=200,
        ["needGlamour"]=1000,
        ["getStar"]=2,
    },
    ["4"]={       ----小妾
        ["needStar"]=5,
        ["maxNum"]=8,
        ["needIntimacy"]=300,
        ["needGlamour"]=2000,
        ["getStar"]=3,
    },
    ["5"]={       ----侍妾
        ["needStar"]=10,
        ["maxNum"]=7,
        ["needIntimacy"]=500,
        ["needGlamour"]=3000,
        ["getStar"]=4,
    },
    ["6"]={       ----庶夫人
        ["needStar"]=20,
        ["maxNum"]=6,
        ["needIntimacy"]=1000,
        ["needGlamour"]=4000,
        ["getStar"]=5,
    },
    ["7"]={       ----贵夫人
        ["needStar"]=30,
        ["maxNum"]=5,
        ["needIntimacy"]=2000,
        ["needGlamour"]=6000,
        ["getStar"]=10,
    },
    ["8"]={       ----大夫人
        ["needStar"]=50,
        ["maxNum"]=4,
        ["needIntimacy"]=3000,
        ["needGlamour"]=8000,
        ["getStar"]=15,
    },
    ["9"]={       ----庶福晋
        ["needStar"]=70,
        ["maxNum"]=3,
        ["needIntimacy"]=5000,
        ["needGlamour"]=10000,
        ["getStar"]=25,
    },
    ["10"]={       ----贵福晋
        ["needStar"]=100,
        ["maxNum"]=2,
        ["needIntimacy"]=8000,
        ["needGlamour"]=15000,
        ["getStar"]=50,
    },
    ["11"]={       ----大福晋
        ["needStar"]=150,
        ["maxNum"]=1,
        ["needIntimacy"]=12000,
        ["needGlamour"]=20000,
        ["getStar"]=105,
    },
}
return wifestatusCfg

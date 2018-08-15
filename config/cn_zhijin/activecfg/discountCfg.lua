--VIP打折与年卡打折配置  年卡打折后ID=g11
local discountCfg={
      --needGem  打折后所需充值额度  单位是RMB数量  单位：元
    
    [1]={  --VIP打折
        ["0"]={       ----vip0
            ["needGem"]=0,
        },
        ["1"]={       ----vip1
            ["needGem"]=12,
        },
        ["2"]={       ----vip2
            ["needGem"]=60,
        },
        ["3"]={       ----vip3
            ["needGem"]=128,
        },
        ["4"]={       ----vip4
            ["needGem"]=256,
        },
        ["5"]={       ----vip5
            ["needGem"]=500,
        },
        ["6"]={       ----vip6
            ["needGem"]=2000,
        },
        ["7"]={       ----vip7
            ["needGem"]=5000,
        },
        ["8"]={       ----vip8
            ["needGem"]=20000,
        },
        ["9"]={       ----vip9
            ["needGem"]=50000,
        },
        ["10"]={       ----vip10
            ["needGem"]=100000,
        },
        ["11"]={       ----vip11
            ["needGem"]=200000,
        },
        ["12"]={       ----vip12
            ["needGem"]=400000,
        },
    },
    [2]={  --年卡打折
    },
}
return discountCfg

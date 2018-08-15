--子嗣基础配置
local childBaseCfg={
    
    --恢复1点活力所需时间 单位：秒
    needTime=10800,
    
    -- 恢复活力所需道具
    needItem="1303",
    
    --子嗣修改名字所需元宝
    renameGem=20,
    
    --子嗣位置扩展所需元宝  超过最大值取最大值
    needGem={300,500,1000,2000,3000,4000,5000,5000},
    
    --最多子嗣席位
    maxPos=10,
    
    --初始子嗣席位
    iniPos=2,
    
    --解锁一键培养所需席位数量
    needPos=5,
    
    --每点活力增加经验
    addExp=10,
    
    --权重列表
      --minIntimacy  亲密度下限
      --maxIntimacy  亲密度上限
      --weight  权重  对应不同品质孩子  笨拙
    weightList={
        ["1"]={       ----
            ["minIntimacy"]=0,
            ["maxIntimacy"]=20,
            ["weight"]={100,0,0,0,0},
        },
        ["2"]={       ----
            ["minIntimacy"]=20,
            ["maxIntimacy"]=35,
            ["weight"]={80,20,0,0,0},
        },
        ["3"]={       ----
            ["minIntimacy"]=35,
            ["maxIntimacy"]=50,
            ["weight"]={50,50,0,0,0},
        },
        ["4"]={       ----
            ["minIntimacy"]=50,
            ["maxIntimacy"]=70,
            ["weight"]={20,70,10,0,0},
        },
        ["5"]={       ----
            ["minIntimacy"]=70,
            ["maxIntimacy"]=100,
            ["weight"]={10,60,30,0,0},
        },
        ["6"]={       ----
            ["minIntimacy"]=100,
            ["maxIntimacy"]=120,
            ["weight"]={0,40,55,5,0},
        },
        ["7"]={       ----
            ["minIntimacy"]=120,
            ["maxIntimacy"]=150,
            ["weight"]={0,15,70,15,0},
        },
        ["8"]={       ----
            ["minIntimacy"]=150,
            ["maxIntimacy"]=160,
            ["weight"]={0,0,60,35,5},
        },
        ["9"]={       ----
            ["minIntimacy"]=160,
            ["maxIntimacy"]=180,
            ["weight"]={0,0,50,40,10},
        },
        ["10"]={       ----
            ["minIntimacy"]=180,
            ["maxIntimacy"]=200,
            ["weight"]={0,0,35,50,15},
        },
        ["11"]={       ----
            ["minIntimacy"]=200,
            ["maxIntimacy"]=220,
            ["weight"]={0,0,0,80,20},
        },
        ["12"]={       ----
            ["minIntimacy"]=220,
            ["maxIntimacy"]=240,
            ["weight"]={0,0,0,75,25},
        },
        ["13"]={       ----
            ["minIntimacy"]=240,
            ["maxIntimacy"]=260,
            ["weight"]={0,0,0,70,30},
        },
        ["14"]={       ----
            ["minIntimacy"]=260,
            ["maxIntimacy"]=280,
            ["weight"]={0,0,0,60,40},
        },
        ["15"]={       ----
            ["minIntimacy"]=280,
            ["maxIntimacy"]=300,
            ["weight"]={0,0,0,50,50},
        },
        ["16"]={       ----
            ["minIntimacy"]=300,
            ["maxIntimacy"]=350,
            ["weight"]={0,0,0,40,60},
        },
        ["17"]={       ----
            ["minIntimacy"]=350,
            ["maxIntimacy"]=400,
            ["weight"]={0,0,0,30,70},
        },
        ["18"]={       ----
            ["minIntimacy"]=400,
            ["maxIntimacy"]=450,
            ["weight"]={0,0,0,20,80},
        },
        ["19"]={       ----
            ["minIntimacy"]=450,
            ["maxIntimacy"]=500,
            ["weight"]={0,0,0,10,90},
        },
        ["20"]={       ----
            ["minIntimacy"]=500,
            ["weight"]={0,0,0,0,100},
        },
    },
}
return childBaseCfg

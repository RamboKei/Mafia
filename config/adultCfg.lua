--子嗣成年联姻配置
local adultCfg={
    --提亲的持续时间 单位:秒
    lastTime=172800,
    
    --刷新时间 单位:秒
    freshTime=3600,
    
    --刷新消耗  消耗元宝
    freshGem=100,
    
    --子嗣身份列表
      --lower  属性下限  大于等于lower  小于等于upper
      --upper  属性上限
      --quality  品质
      --needGem  联姻所需元宝
      --needItem  联姻所需道具  道具和元宝二选一
      --returnGem  返还元宝  自己取消，道具全返还，元宝返还部分
    adultQuality={
        ["1"]={       ----童生
            ["lower"]=0,
            ["upper"]=999,
            ["quality"]=1,
            ["needGem"]=80,
            ["needItem"]="1401",
            ["returnGem"]=64,
        },
        ["2"]={       ----秀才
            ["lower"]=1000,
            ["upper"]=2999,
            ["quality"]=2,
            ["needGem"]=180,
            ["needItem"]="1401",
            ["returnGem"]=144,
        },
        ["3"]={       ----举人
            ["lower"]=3000,
            ["upper"]=4999,
            ["quality"]=3,
            ["needGem"]=320,
            ["needItem"]="1401",
            ["returnGem"]=256,
        },
        ["4"]={       ----进士
            ["lower"]=5000,
            ["upper"]=9999,
            ["quality"]=4,
            ["needGem"]=450,
            ["needItem"]="1402",
            ["returnGem"]=360,
        },
        ["5"]={       ----探花
            ["lower"]=10000,
            ["upper"]=14999,
            ["quality"]=5,
            ["needGem"]=560,
            ["needItem"]="1402",
            ["returnGem"]=448,
        },
        ["6"]={       ----榜眼
            ["lower"]=15000,
            ["upper"]=19999,
            ["quality"]=6,
            ["needGem"]=700,
            ["needItem"]="1403",
            ["returnGem"]=560,
        },
        ["7"]={       ----状元
            ["lower"]=20000,
            ["quality"]=7,
            ["needGem"]=1000,
            ["needItem"]="1403",
            ["returnGem"]=800,
        },
    },
}
return adultCfg

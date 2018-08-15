--红颜许愿配置
local wishTreeCfg={
      --wifeId  红颜ID
      --needItem  兑换消耗道具ID  信物
      --needNum  兑换消耗道具数量
    
    [1]={
        cost1="g14",  ----每日首次打折时，所调用的充值ID
        
        cost2="g15",  ----每日正常时，所调用的充值ID
        
        shop={    ----兑换列表
            ["1"]={       ----董小宛
                ["wifeId"]="201",["needItem"]="2102",["needNum"]=1,
            },
            ["2"]={       ----柳如是
                ["wifeId"]="202",["needItem"]="2102",["needNum"]=1,
            },
            ["3"]={       ----薛宝钗
                ["wifeId"]="203",["needItem"]="2102",["needNum"]=1,
            },
        },
    },
    [2]={
        cost1="g14",  ----每日首次打折时，所调用的充值ID
        
        cost2="g15",  ----每日正常时，所调用的充值ID
        
        shop={    ----兑换列表
            ["1"]={       ----董小宛
                ["wifeId"]="201",["needItem"]="2102",["needNum"]=1,
            },
            ["2"]={       ----柳如是
                ["wifeId"]="202",["needItem"]="2102",["needNum"]=1,
            },
            ["3"]={       ----薛宝钗
                ["wifeId"]="203",["needItem"]="2102",["needNum"]=1,
            },
            ["4"]={       ----陈圆圆
                ["wifeId"]="108",["needItem"]="2102",["needNum"]=1,
            },
            ["5"]={       ----颜如玉
                ["wifeId"]="109",["needItem"]="2102",["needNum"]=1,
            },
        },
    },
}
return wishTreeCfg

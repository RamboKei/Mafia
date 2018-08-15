--四大活动配置
local fourPeopleCfg={
    [1]={    --四大谋臣
          --getServant  兑换的门客ID
          --getWife  兑换的红颜ID
          --needItem  兑换所需道具
          --needNum  兑换所需数量
        
        ["1"]={       ----诸葛亮----2005
            ["getServant"]="2005",["needItem"]="2001",["needNum"]=10,
        },
        ["2"]={       ----庞统----2006
            ["getServant"]="2006",["needItem"]="2001",["needNum"]=10,
        },
        ["3"]={       ----司马懿----2007
            ["getServant"]="2007",["needItem"]="2001",["needNum"]=10,
        },
        ["4"]={       ----郭嘉----2008
            ["getServant"]="2008",["needItem"]="2001",["needNum"]=10,
        },
    },
    [2]={    --四大奸臣
          --getServant  兑换的门客ID
          --getWife  兑换的红颜ID
          --needItem  兑换所需道具
          --needNum  兑换所需数量
        
        ["1"]={       ----秦桧----2001
            ["getServant"]="2001",["needItem"]="2002",["needNum"]=10,
        },
        ["2"]={       ----赵高----2002
            ["getServant"]="2002",["needItem"]="2002",["needNum"]=10,
        },
        ["3"]={       ----李莲英----2003
            ["getServant"]="2003",["needItem"]="2002",["needNum"]=10,
        },
        ["4"]={       ----魏忠贤----2004
            ["getServant"]="2004",["needItem"]="2002",["needNum"]=10,
        },
    },
}
return fourPeopleCfg

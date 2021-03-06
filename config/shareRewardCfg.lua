﻿--分享奖励配置
local shareRewardCfg={
    --分享奖励每日最大领取次数
    maxReward=1,
    
    --分享奖励内容
    shareReward="6_1201_1",
    
    --type  类型
    --condition  条件  不同类型的条件不同
    shareList={
        ["1"]={       ----达到指定官职----1
            ["type"]=1,["condition"]={"2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"},
        },
        ["2"]={       ----获得指定门客----2
            ["type"]=2,["condition"]={"1006","1007","1008","1009","1010","1011","1012","1013","1014","1015","1016","1017","1018","1019","1020","1021","1022","1023","1024","1025","1026","1027","1028","1029","1030","1031","1032","1049","2005","2006","2007","2008","1050","1051","2001","2002","2003","2004","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","1033","1034","1035","1036","1037","1038","1039"},
        },
        ["3"]={       ----获得指定红颜----3
            ["type"]=3,["condition"]={"102","103","104","105","106","107","108","109","201","202","203","204","205","206","207","208","209","210","211","212","213","214","303","302","304","305","306","307","308","310"},
        },
        ["4"]={       ----获得指定红颜皮肤----4
            ["type"]=4,["condition"]={"1011","1012","1021","1031","2021","2071","3021","3031","3041","3051","3101"},
        },
        ["5"]={       ----获得子嗣----5
            ["type"]=5,
        },
        ["6"]={       ----子嗣联姻----6
            ["type"]=6,
        },
        ["7"]={       ----获得指定委任状----7
            ["type"]=7,["condition"]={"3000","3001","3002","3003","3004","3005","3006","3007","3008","3009","3010","3101","3102","3103","3104","3105","3106","3201","3202","3203","3204","3205","3301","3302","3303","3304","3305","3306","3307","3401","3402","3403","3404","3801"},
        },
    },
}
return shareRewardCfg

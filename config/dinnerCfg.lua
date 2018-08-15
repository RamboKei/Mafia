--酒楼(宴会)配置
local dinnerCfg={
    --宴会解锁所需官职
    needLv=5,
    
    --每日赴宴的次数上限
    goToFeastNum=3,
    
    --商店刷新时间 单位:秒
    shopReTime=7200,
    
    --宴会分享间隔时间  单位:秒
    shareTime=1800,
    
    --宴会增加赴宴次数所需道具
    needItem="1523",
    
    --宴会结束时,每个空位置补偿玩家X积分与分数
    addScore=50,
    
    --商店每次刷新物品 相同物品可重复
    shopItemNum=9,
    
    --商店刷新次数   每日重置
    shopReset=10,
    
    --商店刷新消耗
    shopNeedGem={10,20,30,40,50,60,70,80,90,100},
    
    --高级赴宴VIP限制1：vip等级2
    needVip=2,
    
    --高级赴宴VIP限制2：关卡80章
    needChallenge=80,
    
    --宴会列表
      --contain  可容纳人数
      --lastTime  持续时间
      --needGem  花费元宝
      --needItem  花费食材  元宝和食材都需要
    feast={
        ["1"]={       ----家宴
            ["contain"]=10,["lastTime"]=86400,["needGem"]=100,["needItem"]={["1501"]=5,["1502"]=5},
        },
        ["2"]={       ----官宴
            ["contain"]=50,["lastTime"]=86400,["needGem"]=500,["needItem"]={["1511"]=5,["1512"]=5},
        },
    },
    
    --赴宴列表
      --needGem  赴宴所需元宝
      --needItem  赴宴可用道具
      --getPoint  宴会分数  宴会分数是给举办宴会的玩家  在捣乱时，注意有负数！
      --getScore  宴会积分  宴会积分是给赴宴的自己
      --getItemRatio  赴宴获得食材奖励的几率
    goToFeast={
        ["1"]={       ----普通赴宴
            ["needGem"]=100,["getPoint"]=100,["getScore"]=100,["getItemRatio"]=0.5,
        },
        ["2"]={       ----高级赴宴
            ["needGem"]=500,["getPoint"]=500,["getScore"]=500,["getItemRatio"]=0.8,
        },
        ["3"]={       ----道具赴宴
            ["needItem"]="1521",["getPoint"]=1000,["getScore"]=1000,["getItemRatio"]=1,
        },
        ["4"]={       ----捣乱
            ["needItem"]="1522",["getPoint"]=-1000,["getScore"]=1000,["getItemRatio"]=1,
        },
    },
    --商店列表
      --weight  随机出物品的权重  随机方式：用整个列表进行随机出物品，然后随机X次
      --cost  兑换所需积分
      --content  商店内容
    shop={
        ["1"]={       ----政绩礼包
            ["weight"]=10,["cost"]="100",["content"]="6_1004_1",
        },
        ["2"]={       ----政绩礼盒
            ["weight"]=6,["cost"]="1000",["content"]="6_1007_1",
        },
        ["3"]={       ----属性丹
            ["weight"]=4,["cost"]="100",["content"]="6_1201_1",
        },
        ["4"]={       ----武力丹
            ["weight"]=4,["cost"]="100",["content"]="6_1202_1",
        },
        ["5"]={       ----智力丹
            ["weight"]=4,["cost"]="100",["content"]="6_1203_1",
        },
        ["6"]={       ----政治丹
            ["weight"]=4,["cost"]="100",["content"]="6_1204_1",
        },
        ["7"]={       ----魅力丹
            ["weight"]=4,["cost"]="100",["content"]="6_1205_1",
        },
        ["8"]={       ----属性果
            ["weight"]=4,["cost"]="500",["content"]="6_1216_1",
        },
        ["9"]={       ----武力果
            ["weight"]=4,["cost"]="500",["content"]="6_1217_1",
        },
        ["10"]={       ----智力果
            ["weight"]=4,["cost"]="500",["content"]="6_1218_1",
        },
        ["11"]={       ----政治果
            ["weight"]=4,["cost"]="500",["content"]="6_1219_1",
        },
        ["12"]={       ----魅力果
            ["weight"]=4,["cost"]="500",["content"]="6_1220_1",
        },
        ["13"]={       ----活力丹
            ["weight"]=8,["cost"]="100",["content"]="6_1303_1",
        },
        ["14"]={       ----连理枝
            ["weight"]=6,["cost"]="500",["content"]="6_1401_1",
        },
        ["15"]={       ----翰林令牌
            ["weight"]=8,["cost"]="2000",["content"]="6_1751_1",
        },
        ["16"]={       ----卷轴残卷
            ["weight"]=6,["cost"]="250",["content"]="6_1161_1",
        },
        ["17"]={       ----出战令
            ["weight"]=4,["cost"]="200",["content"]="6_1090_1",
        },
        ["18"]={       ----精力丹
            ["weight"]=6,["cost"]="100",["content"]="6_1301_1",
        },
        ["19"]={       ----体力丹
            ["weight"]=6,["cost"]="100",["content"]="6_1302_1",
        },
    },
}
return dinnerCfg

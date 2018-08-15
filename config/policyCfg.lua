--金銮殿功能配置
local policyCfg={
    --早朝时间
    leveeTime={6,12},
    
    --早朝时间元宝消耗折扣
    leveeGemDiscount=0.9,
    
    --一个政令组合包含政令数目
    gdNum=3,
    
    --每天最多发布政令次数
    maxIssuegd=1,
    
    --修改国策后新国策生效时间，次日0点
    newspFromDate=0,
    
    --刷新政令所需元宝（超过最大值取最大值,次日0点重置）
    refreshgdNeedGem={0,200,400,600,800,1000,1300,1600,2000},
    
    --修改国策所需元宝（超过最大值取最大值）
    amendspNeedGem={500,600,700,800,900,1000,900,1000},
    
    --政令列表
      --type  政令类型
      --type2  类型2
      --sort  政令选项
      --gdCost  政令花费
      --addTimes1  加成次数  皇帝
      --addExtent1  加成幅度  皇帝
      --leveeTimeEff1  早朝时间效果  皇帝
      --addTimes2  加成次数  非皇帝
      --addExtent2  加成幅度  非皇帝
      --leveeTimeEff2  早朝时间效果  非皇帝
    
    governmentDecreeList={
        [1]={
            ["11"]={       ----发展商贸----每日前X次经营银两，产量增加Y
                ["type"]=1,["type2"]="manage",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["12"]={       ----发展商贸----每日前X次经营银两，产量增加Y
                ["type"]=1,["type2"]="manage",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["13"]={       ----发展商贸----每日前X次经营银两，产量增加Y
                ["type"]=1,["type2"]="manage",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["14"]={       ----发展商贸----每日前X次经营银两，产量增加Y
                ["type"]=1,["type2"]="manage",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
        [2]={
            ["21"]={       ----开垦良田----每日前X次经营粮食，产量增加Y
                ["type"]=2,["type2"]="manage",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["22"]={       ----开垦良田----每日前X次经营粮食，产量增加Y
                ["type"]=2,["type2"]="manage",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["23"]={       ----开垦良田----每日前X次经营粮食，产量增加Y
                ["type"]=2,["type2"]="manage",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["24"]={       ----开垦良田----每日前X次经营粮食，产量增加Y
                ["type"]=2,["type2"]="manage",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
        [3]={
            ["31"]={       ----扩充武备----每日前X次经营士兵，产量增加Y
                ["type"]=3,["type2"]="manage",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["32"]={       ----扩充武备----每日前X次经营士兵，产量增加Y
                ["type"]=3,["type2"]="manage",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["33"]={       ----扩充武备----每日前X次经营士兵，产量增加Y
                ["type"]=3,["type2"]="manage",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["34"]={       ----扩充武备----每日前X次经营士兵，产量增加Y
                ["type"]=3,["type2"]="manage",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
        [4]={
            ["41"]={       ----厉兵秣马----每日前X次关卡，自身武力增加Y
                ["type"]=4,["type2"]="challenge",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["42"]={       ----厉兵秣马----每日前X次关卡，自身武力增加Y
                ["type"]=4,["type2"]="challenge",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["43"]={       ----厉兵秣马----每日前X次关卡，自身武力增加Y
                ["type"]=4,["type2"]="challenge",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["44"]={       ----厉兵秣马----每日前X次关卡，自身武力增加Y
                ["type"]=4,["type2"]="challenge",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
        [5]={
            ["51"]={       ----过关斩将----每日前X次，擂台/跨服擂台攻击方攻击力增加Y
                ["type"]=5,["type2"]="atkrace",["sort"]=1,["gdCost"]=1000,["addTimes1"]=5,["addExtent1"]=0.25,["leveeTimeEff1"]=0.27,["addTimes2"]=5,["addExtent2"]=0.15,["leveeTimeEff2"]=0.17,
            },
            ["52"]={       ----过关斩将----每日前X次，擂台/跨服擂台攻击方攻击力增加Y
                ["type"]=5,["type2"]="atkrace",["sort"]=2,["gdCost"]=1000,["addTimes1"]=5,["addExtent1"]=0.2,["leveeTimeEff1"]=0.22,["addTimes2"]=5,["addExtent2"]=0.2,["leveeTimeEff2"]=0.22,
            },
            ["53"]={       ----过关斩将----每日前X次，擂台/跨服擂台攻击方攻击力增加Y
                ["type"]=5,["type2"]="atkrace",["sort"]=3,["gdCost"]=500,["addTimes1"]=2,["addExtent1"]=0.25,["leveeTimeEff1"]=0.27,["addTimes2"]=2,["addExtent2"]=0.15,["leveeTimeEff2"]=0.17,
            },
            ["54"]={       ----过关斩将----每日前X次，擂台/跨服擂台攻击方攻击力增加Y
                ["type"]=5,["type2"]="atkrace",["sort"]=4,["gdCost"]=500,["addTimes1"]=2,["addExtent1"]=0.2,["leveeTimeEff1"]=0.22,["addTimes2"]=2,["addExtent2"]=0.2,["leveeTimeEff2"]=0.22,
            },
        },
        [6]={
            ["61"]={       ----开疆扩土----每日前X次征伐，武力提升Y
                ["type"]=6,["type2"]="conquest",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["62"]={       ----开疆扩土----每日前X次征伐，武力提升Y
                ["type"]=6,["type2"]="conquest",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["63"]={       ----开疆扩土----每日前X次征伐，武力提升Y
                ["type"]=6,["type2"]="conquest",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["64"]={       ----开疆扩土----每日前X次征伐，武力提升Y
                ["type"]=6,["type2"]="conquest",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
        [7]={
            ["71"]={       ----红颜知己----每日前X次宠幸红颜，减少Y的元宝消耗
                ["type"]=7,["type2"]="wife",["sort"]=1,["gdCost"]=1000,["addTimes1"]=5,["addExtent1"]=0.25,["leveeTimeEff1"]=0.27,["addTimes2"]=5,["addExtent2"]=0.15,["leveeTimeEff2"]=0.17,
            },
            ["72"]={       ----红颜知己----每日前X次宠幸红颜，减少Y的元宝消耗
                ["type"]=7,["type2"]="wife",["sort"]=2,["gdCost"]=1000,["addTimes1"]=5,["addExtent1"]=0.2,["leveeTimeEff1"]=0.22,["addTimes2"]=5,["addExtent2"]=0.2,["leveeTimeEff2"]=0.22,
            },
            ["73"]={       ----红颜知己----每日前X次宠幸红颜，减少Y的元宝消耗
                ["type"]=7,["type2"]="wife",["sort"]=3,["gdCost"]=500,["addTimes1"]=2,["addExtent1"]=0.25,["leveeTimeEff1"]=0.27,["addTimes2"]=2,["addExtent2"]=0.15,["leveeTimeEff2"]=0.17,
            },
            ["74"]={       ----红颜知己----每日前X次宠幸红颜，减少Y的元宝消耗
                ["type"]=7,["type2"]="wife",["sort"]=4,["gdCost"]=500,["addTimes1"]=2,["addExtent1"]=0.2,["leveeTimeEff1"]=0.22,["addTimes2"]=2,["addExtent2"]=0.2,["leveeTimeEff2"]=0.22,
            },
        },
        [8]={
            ["81"]={       ----生财有道----每日前X次商贸，智力提升Y
                ["type"]=8,["type2"]="trade",["sort"]=1,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=10,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["82"]={       ----生财有道----每日前X次商贸，智力提升Y
                ["type"]=8,["type2"]="trade",["sort"]=2,["gdCost"]=1000,["addTimes1"]=10,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=10,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
            ["83"]={       ----生财有道----每日前X次商贸，智力提升Y
                ["type"]=8,["type2"]="trade",["sort"]=3,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.12,["leveeTimeEff1"]=0.13,["addTimes2"]=4,["addExtent2"]=0.08,["leveeTimeEff2"]=0.09,
            },
            ["84"]={       ----生财有道----每日前X次商贸，智力提升Y
                ["type"]=8,["type2"]="trade",["sort"]=4,["gdCost"]=500,["addTimes1"]=4,["addExtent1"]=0.1,["leveeTimeEff1"]=0.11,["addTimes2"]=4,["addExtent2"]=0.1,["leveeTimeEff2"]=0.11,
            },
        },
    },
    
    --国策列表
      --type  国策类型
      --type2  类型2  不知道干啥的
      --addTimes  加成次数
      --addExtent  加成幅度
    
    statePolicyList={
        ["1"]={       ----大兴文教----每日前X次，门客升级消耗降低X%
            ["type"]=1,["type2"]="servant",["addTimes"]=5,["addExtent"]=0.025,
        },
        ["2"]={       ----倾国倾城----每日前X次赏赐红颜可获得双倍效果
            ["type"]=2,["type2"]="wife",["addTimes"]=5,["addExtent"]=1,
        },
        ["3"]={       ----国士无双----擂台/跨服擂台攻击时，每日前X个门客的攻击力增加X
            ["type"]=3,["type2"]="atkrace",["addTimes"]=5,["addExtent"]=0.1,
        },
        ["4"]={       ----万众一心----打联盟BOSS时，前X个门客伤害提升X
            ["type"]=4,["type2"]="alliance",["addTimes"]=5,["addExtent"]=0.05,
        },
    },
    
}
return policyCfg

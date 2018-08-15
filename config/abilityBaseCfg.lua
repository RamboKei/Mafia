--资质提升（书籍提升）基础配置
local abilityBaseCfg={
    --门客资质提升所需道具
    --1：武力 2：智力 3：政治 4：魅力    值是道具ID
    typeList={
        ["1"]="1151",    ---武力强化卷轴
        ["2"]="1152",    ---智力强化卷轴
        ["3"]="1153",    ---政治强化卷轴
        ["4"]="1154",    ---魅力强化卷轴
    },
    
    --不同星级书籍（资质）升级对应的成功率以及书籍经验
    --ratio:卷轴强化成功的几率
    --ratioNum:卷轴强化的保底数量  分不同星级的书籍  连续失败X次后必然强化成功
    --abilityExp:书籍经验强化所需的书籍经验   书籍经验强化必然成功
    numList={
        ["1"]={
            ["ratio"]=1,["ratioNum"]=1,["abilityExp"]=200,
        },
        ["2"]={
            ["ratio"]=0.5,["ratioNum"]=3,["abilityExp"]=400,
        },
        ["3"]={
            ["ratio"]=0.33,["ratioNum"]=5,["abilityExp"]=600,
        },
        ["4"]={
            ["ratio"]=0.25,["ratioNum"]=7,["abilityExp"]=800,
        },
        ["5"]={
            ["ratio"]=0.2,["ratioNum"]=8,["abilityExp"]=1000,
        },
        ["6"]={
            ["ratio"]=0.17,["ratioNum"]=10,["abilityExp"]=1200,
        },
        ["7"]={
            ["ratio"]=0.14,["ratioNum"]=12,["abilityExp"]=1400,
        },
    },
    
}
return abilityBaseCfg

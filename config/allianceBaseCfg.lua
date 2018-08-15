--联盟基础信息配置
local allianceBaseCfg={
    --联盟功能解锁所需官职
    unlock=6,
    
    --创建军团需要元宝
    createNeedGem=1000,
    
    --修改军团名称需要元宝
    renameNeedGem=500,
    
    --军团名称不能超过X个字符
    nameLimit=12,
    
    --退出军团后，再加入军团需要的时间 单位（秒）
    rejoinNeedTime=86400,
    
    --个人申请上限
    personMaxApply=5,
    
    --帮主转让的二次确认时间 单位（秒）
    transfertime=300,
    
    --主动转让帮会帮主扣除帮会财富
    transferAsset=10000,
    
    --军团最大申请人数
    maxApplyPersonNum=50,
    
    --离开帮会扣除贡献比例
    reduceContribution=0.5,
    
    --打帮会BOSS恢复性道具
    resetAttackItem="1090",
    
    --帮会每日T人限制
    fireNum=3,
    
    --新号注册7天后，才入帮成员，48小时不让退帮 单位：秒
    quitNeedTime=172800,
    
    --新号注册7天内，不受这个限制  单位：秒
    freeTime=604800,
    
      --联盟建设
      --needGem  消耗元宝
      --needItem  消耗道具
      --exp  联盟增加经验
      --asset  联盟增加财富
      --contribution  个人获得贡献
    contributeList={
        ["1"]={       ----初级建设
            ["needGem"]=10,["exp"]=10,["asset"]=10,["contribution"]=10,
        },
        ["2"]={       ----中级建设
            ["needGem"]=50,["exp"]=50,["asset"]=50,["contribution"]=50,
        },
        ["3"]={       ----高级建设
            ["needGem"]=200,["exp"]=200,["asset"]=200,["contribution"]=200,
        },
        ["4"]={       ----道具建设
            ["needItem"]="1911",["exp"]=400,["asset"]=400,["contribution"]=400,
        },
        ["5"]={       ----高级道具建设
            ["needItem"]="1912",["exp"]=1200,["asset"]=1200,["contribution"]=1200,
        },
    },
    
      --联盟商店
      --needContribution  兑换所需贡献
      --needAllianceLv  兑换所需联盟等级
      --content  物品内容  注：每日可兑换次数 = 当前联盟等级 - needAllianceLv + 1
    allianceShop={
        ["1"]={       ----银票
            ["needContribution"]=10,["needAllianceLv"]=1,["content"]="6_1001_1",
        },
        ["2"]={       ----兵符
            ["needContribution"]=10,["needAllianceLv"]=1,["content"]="6_1003_1",
        },
        ["3"]={       ----技能经验包
            ["needContribution"]=100,["needAllianceLv"]=1,["content"]="6_1030_1",
        },
        ["4"]={       ----男爵服饰
            ["needContribution"]=100,["needAllianceLv"]=2,["content"]="6_1701_1",
        },
        ["5"]={       ----男爵发冠
            ["needContribution"]=100,["needAllianceLv"]=2,["content"]="6_1702_1",
        },
        ["6"]={       ----男爵衿带
            ["needContribution"]=100,["needAllianceLv"]=2,["content"]="6_1703_1",
        },
        ["7"]={       ----书籍经验包
            ["needContribution"]=125,["needAllianceLv"]=3,["content"]="6_1020_1",
        },
        ["8"]={       ----政绩礼包
            ["needContribution"]=200,["needAllianceLv"]=4,["content"]="6_1004_1",
        },
        ["9"]={       ----子爵服饰
            ["needContribution"]=290,["needAllianceLv"]=5,["content"]="6_1704_1",
        },
        ["10"]={       ----子爵发冠
            ["needContribution"]=290,["needAllianceLv"]=5,["content"]="6_1705_1",
        },
        ["11"]={       ----子爵衿带
            ["needContribution"]=290,["needAllianceLv"]=5,["content"]="6_1706_1",
        },
        ["12"]={       ----伯爵服饰
            ["needContribution"]=850,["needAllianceLv"]=7,["content"]="6_1707_1",
        },
        ["13"]={       ----伯爵发冠
            ["needContribution"]=850,["needAllianceLv"]=7,["content"]="6_1708_1",
        },
        ["14"]={       ----伯爵衿带
            ["needContribution"]=850,["needAllianceLv"]=7,["content"]="6_1709_1",
        },
    },
    
}
return allianceBaseCfg

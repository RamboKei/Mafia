--联盟权限配置
local allianceRightCfg={
      --recruit  修改公告&招募设置
      --turnBoss  转移团长
      --manageDeputy  提升&解除副团长
      --manageOfficer  提升&解除官员
      --promotion  被提升职务
      --deletePerson  踢人
      --addPerson  招人（通过申请）
      --quit  退出军团
      --dissolve  解散军团
      --bossCostAsset  消耗联盟财富开BOSS
      --bossCostGem  消耗元宝开BOSS
    ["1"]={       ----盟主
        ["recruit"]=1,["turnBoss"]=1,["manageDeputy"]=1,["manageOfficer"]=1,["promotion"]=0,["deletePerson"]=1,["addPerson"]=1,["quit"]=0,["dissolve"]=1,["bossCostAsset"]=1,["bossCostGem"]=1,
    },
    ["2"]={       ----副盟主
        ["recruit"]=0,["turnBoss"]=0,["manageDeputy"]=0,["manageOfficer"]=0,["promotion"]=1,["deletePerson"]=1,["addPerson"]=1,["quit"]=1,["dissolve"]=0,["bossCostAsset"]=1,["bossCostGem"]=1,
    },
    ["3"]={       ----精英
        ["recruit"]=0,["turnBoss"]=0,["manageDeputy"]=0,["manageOfficer"]=0,["promotion"]=1,["deletePerson"]=0,["addPerson"]=0,["quit"]=1,["dissolve"]=0,["bossCostAsset"]=0,["bossCostGem"]=1,
    },
    ["4"]={       ----成员
        ["recruit"]=0,["turnBoss"]=0,["manageDeputy"]=0,["manageOfficer"]=0,["promotion"]=1,["deletePerson"]=0,["addPerson"]=0,["quit"]=1,["dissolve"]=0,["bossCostAsset"]=0,["bossCostGem"]=0,
    },
}
return allianceRightCfg

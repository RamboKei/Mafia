--经营配置
local manageCfg={
    
    --恢复1次经营所需道具
    needItem="1101",
    
    --解锁自动经营所需官职  levelCfg中的等级  
    needLv=18,
    
    --解锁自动经营所需Vip等级
    needVip=2,
    
    --一键经营所需官职  levelCfg中的等级  正五品
    autoNeedLv=10,
    
    --招募1个士兵需要的粮草数量
    needFood=1,
    
    --最大的恢复时间 单位：秒
    maxTime=1800,
    
    --非挂机，点击收获的暴击几率与倍率   {几率，倍率}
    getCrit={0,1},
    
}
return manageCfg

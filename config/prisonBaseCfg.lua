--牢房基础信息配置
local prisonBaseCfg={
    --牢房解锁条件  通关第X关
    unlock=82,
    
    --每通关一章，每日声望产出增加值，同时，会立刻获得 X 声望
    getPrestige=25,
    
    --声望上限  声望上限永远是每日声望产出的 X 倍
    prestigeLimit=2,
    
}
return prisonBaseCfg

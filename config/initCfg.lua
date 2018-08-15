--[[
所有游戏初始化数据
游戏初始化对应的model的数据
]]
local initCfg =
{
    --初始化用户表信息
    userinfo = {
        gem = 0,
        gold = 5000,
        food = 5000,
        soldier = 5000
    },

    --初始化经营次数上限，政务次数上限
    manage = {
        gold = 3,
        food = 3,
        soldier = 3,
        affair = 3,
    },
    
    --初始化门客信息
    servant ={"1001","1002","1003","1004","1005"},


	--初始道具信息
	item={

	},

}

return initCfg
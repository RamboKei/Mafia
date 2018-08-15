--首充配置
local firstchargeCfg={

	--getservant:门客ID
    --r:额外奖励
	needRecharge={"g1","g2","g3","g4"},
	
	--（前端展示倍数）
	extraClient = 4,

	--（后端使用）首充档位共享的奖励倍数  例：充值g1档位，获得的元宝数量 = g1.gemCost + g1.firstGet + g1.gemCost * extra
	extraServer=2,
	
	rewards={
		getServant="1033",r="6_1150_4|6_1001_10|6_1003_10"
	},

}
return firstchargeCfg

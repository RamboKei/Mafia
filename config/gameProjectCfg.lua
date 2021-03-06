--[[
游戏基础配置
]]
local gameProjectCfg =
{
   
	--关卡、副本恢复门客出战次数所需道具
	needItem="1090",
	
	--签到第七天额外红颜奖励
	sign7DayReward="10_310_1",

	--签到第二天额外门客奖励
	sign2DayReward="8_1050_1",

	--签到第三天额外兵符奖励
	sign3DayReward="6_1003_30",

	--疯狂、爱微游实名验证奖励
	rewardFKYLC3="6_1150_1|6_1001_1|6_1003_1",
	
	--疯狂游乐场关注奖励
	rewardFKYLC1="6_1201_1|6_1001_2|6_1003_2",

	--疯狂游乐场分享奖励(每日)
	rewardFKYLC2={
		["1"]="6_1211_1|6_1212_1|6_1212_1",
		["3"]="6_1030_1|6_1001_1|6_1003_1",
		["5"]="6_1020_1|6_1352_1|6_1354_1",
	},

	--3K关注微信激活码的奖励显示
	shareShow3K="6_1206_1|2_1_300000|4_1_300000",

	--3K手机绑定的奖励
	reward3K="6_1201_1|6_1001_1|6_1003_1",

	--3K实名认证的奖励
	rewardID3K="6_1201_1|6_1352_1|6_1354_1",

	--3K手机绑定持续时间  单位：天
	reward3KlastTime=30,

	--港台下载有礼
	rewardGT="6_1150_1|6_1001_1|6_1003_1",

	--港台绑定FB的奖励
	rewardGT1="6_1150_1|6_1201_3|6_1206_3|6_1211_3",

	--至敬加入Q群激活码奖励显示
	shareShowZJ="6_1150_1|6_1001_3|6_1003_3",
	
	--京东618奖励
	rewardJD="6_1150_1|6_1207_1|6_1208_1",

	--玩吧发送桌面奖励
	rewardWB1="6_1150_1|6_1001_1|6_1003_1",

	--玩吧每日分享奖励
	rewardWB2="6_1211_1|6_1212_1|6_1213_1",

	--玩吧下载微端奖励
	rewardWB4="6_1201_5|6_1001_1|6_1003_1",

	--玩吧COVER设置奖励
	rewardWB5="6_1150_1|6_1201_1|6_1207_1|6_1208_1|6_1209_1|6_1210_1|6_1001_5|6_1003_5",

	--玩吧糖果
	rewardWB3={
		--登录每天送的糖果数量
		loginReward={40,50,50,100,100,100,150},
		--每日任务  questType：任务类型（参考每日任务） value：完成任务所需  num：奖励糖果数量
		taskReward={
			["1"]={
				["questType"]=301,["value"]=6,["num"]=20,
			},
			["2"]={
				["questType"]=402,["value"]=4,["num"]=20,
			},
			["3"]={
				["questType"]=303,["value"]=6,["num"]=20,
			},
		},
	},
}

return gameProjectCfg
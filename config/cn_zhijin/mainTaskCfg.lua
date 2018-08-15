--任务配置
local mainTaskCfg={
      --unlockId  后续任务ID
      --questType  任务类型
      --openType  跳转
      --openNeed  特殊跳转参数
      --need  特殊处理参数
      --value  进度
      --reward  奖励
    
    ["1"]={       ----养精蓄锐----经营商产次数达3次
        ["unlockId"]="2",["questType"]=101,["openType"]="manage",["value"]=3,["reward"]="2_1_100000",
    },
    ["2"]={       ----五谷丰登----经营农产次数达3次
        ["unlockId"]="3",["questType"]=102,["openType"]="manage",["value"]=3,["reward"]="3_1_100000",
    },
    ["3"]={       ----兵甲富足----招募士兵次数达3次
        ["unlockId"]="4",["questType"]=103,["openType"]="manage",["value"]=3,["reward"]="4_1_100000",
    },
    ["4"]={       ----提拔元芳----元芳等级达10级
        ["unlockId"]="5",["questType"]=201,["openType"]="servant",["need"]="1001",["value"]=10,["reward"]="2_1_100000",
    },
    ["5"]={       ----提拔乞儿----苏乞儿等级达10级
        ["unlockId"]="6",["questType"]=201,["openType"]="servant",["need"]="1002",["value"]=10,["reward"]="2_1_100000",
    },
    ["6"]={       ----提拔晓岚----纪晓岚等级达10级
        ["unlockId"]="7",["questType"]=201,["openType"]="servant",["need"]="1003",["value"]=10,["reward"]="2_1_100000",
    },
    ["7"]={       ----提拔刘墉----刘墉等级达10级
        ["unlockId"]="8",["questType"]=201,["openType"]="servant",["need"]="1004",["value"]=10,["reward"]="2_1_100000",
    },
    ["8"]={       ----提拔雪芹----曹雪芹等级达10级
        ["unlockId"]="9",["questType"]=201,["openType"]="servant",["need"]="1005",["value"]=10,["reward"]="2_1_100000",
    },
    ["9"]={       ----处理政务----处理政务次数达3次
        ["unlockId"]="10",["questType"]=104,["openType"]="affair",["value"]=3,["reward"]="4_1_100000",
    },
    ["10"]={       ----新官上任----累计关卡战斗胜利16次
        ["unlockId"]="11",["questType"]=106,["openType"]="challenge",["value"]=16,["reward"]="2_1_100000|3_1_100000|4_1_100000",
    },
    ["11"]={       ----养精蓄锐----经营商产次数达6次
        ["unlockId"]="12",["questType"]=101,["openType"]="manage",["value"]=6,["reward"]="2_1_100000",
    },
    ["12"]={       ----五谷丰登----经营农产次数达6次
        ["unlockId"]="13",["questType"]=102,["openType"]="manage",["value"]=6,["reward"]="3_1_100000",
    },
    ["13"]={       ----兵甲富足----招募士兵次数达6次
        ["unlockId"]="14",["questType"]=103,["openType"]="manage",["value"]=6,["reward"]="4_1_100000",
    },
    ["14"]={       ----升级门客----至少1名门客等级达到20级
        ["unlockId"]="15",["questType"]=202,["openType"]="servant",["need"]=20,["value"]=1,["reward"]="6_1101_2",
    },
    ["15"]={       ----势不可挡----势力达到4000
        ["unlockId"]="16",["questType"]=107,["openType"]="servant",["value"]=4000,["reward"]="8_1023_1|6_1102_1",
    },
    ["16"]={       ----勤政爱民----使用1次政务令
        ["unlockId"]="17",["questType"]=108,["openType"]="affair",["value"]=1,["reward"]="4_1_100000",
    },
    ["17"]={       ----新官上任----累计关卡战斗胜利32次
        ["unlockId"]="18",["questType"]=106,["openType"]="challenge",["value"]=32,["reward"]="2_1_100000|3_1_100000|4_1_100000",
    },
    ["18"]={       ----升级门客----至少3名门客等级达到20级
        ["unlockId"]="19",["questType"]=202,["openType"]="servant",["need"]=20,["value"]=3,["reward"]="6_1101_2",
    },
    ["19"]={       ----智擒巡检----累计关卡战斗胜利49次
        ["unlockId"]="20",["questType"]=106,["openType"]="challenge",["value"]=49,["reward"]="2_1_100000|3_1_100000|4_1_100000",
    },
    ["20"]={       ----升官发财----官品等级达正九品2
        ["unlockId"]="21",["questType"]=105,["openType"]="level",["value"]=2,["reward"]="6_1001_1|6_1002_1|6_1003_1",
    },
    ["21"]={       ----随机传唤----随机传唤红颜次数达到3次
        ["unlockId"]="22",["questType"]=301,["openType"]="wife",["value"]=3,["reward"]="2_1_100000",
    },
    ["22"]={       ----宠爱有加----宠幸红颜次数达1次
        ["unlockId"]="23",["questType"]=302,["openType"]="wife",["value"]=1,["reward"]="6_1301_3",
    },
    ["23"]={       ----喜得贵子----子嗣数量达1个
        ["unlockId"]="24",["questType"]=401,["openType"]="wife",["value"]=1,["reward"]="6_1303_3",
    },
    ["24"]={       ----养儿育女----子嗣培养次数达2次
        ["unlockId"]="25",["questType"]=402,["openType"]="child",["value"]=2,["reward"]="6_1352_1|6_1354_1",
    },
    ["25"]={       ----升级门客----至少5名门客等级达到20级
        ["unlockId"]="26",["questType"]=202,["openType"]="servant",["need"]=20,["value"]=5,["reward"]="6_1101_2",
    },
    ["26"]={       ----势不可挡----势力达到8000
        ["unlockId"]="27",["questType"]=107,["openType"]="servant",["value"]=8000,["reward"]="8_1024_1|6_1102_1",
    },
    ["27"]={       ----智擒巡检----累计关卡战斗胜利82次
        ["unlockId"]="28",["questType"]=106,["openType"]="challenge",["value"]=82,["reward"]="2_1_100000",
    },
    ["28"]={       ----膜拜大神----膜拜次数达3次
        ["unlockId"]="29",["questType"]=114,["openType"]="rank",["value"]=3,["reward"]="4_1_100000",
    },
    ["29"]={       ----每日签到----累计签到1天
        ["unlockId"]="30",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=1,["reward"]="2_1_100000",
    },
    ["30"]={       ----升级门客----至少7名门客等级达到20级
        ["unlockId"]="31",["questType"]=202,["openType"]="servant",["need"]=20,["value"]=7,["reward"]="6_1101_2",
    },
    ["31"]={       ----司狱暴乱----累计关卡战斗胜利123次
        ["unlockId"]="32",["questType"]=106,["openType"]="challenge",["value"]=123,["reward"]="6_1301_1|6_1303_3|6_1102_1",
    },
    ["32"]={       ----养精蓄锐----经营商产次数达20次
        ["unlockId"]="33",["questType"]=101,["openType"]="manage",["value"]=20,["reward"]="2_1_100000",
    },
    ["33"]={       ----五谷丰登----经营农产次数达20次
        ["unlockId"]="34",["questType"]=102,["openType"]="manage",["value"]=20,["reward"]="3_1_100000",
    },
    ["34"]={       ----兵甲富足----招募士兵次数达20次
        ["unlockId"]="35",["questType"]=103,["openType"]="manage",["value"]=20,["reward"]="4_1_100000",
    },
    ["35"]={       ----升级门客----至少1名门客等级达到30级
        ["unlockId"]="36",["questType"]=202,["openType"]="servant",["need"]=30,["value"]=1,["reward"]="6_1101_2",
    },
    ["36"]={       ----主簿请柬----累计关卡战斗胜利147次
        ["unlockId"]="37",["questType"]=106,["openType"]="challenge",["value"]=147,["reward"]="2_1_100000",
    },
    ["37"]={       ----升官发财----官品等级达从八品3
        ["unlockId"]="38",["questType"]=105,["openType"]="level",["value"]=3,["reward"]="6_1150_1|6_1151_1|6_1102_1",
    },
    ["38"]={       ----培养门客----使用强化卷轴升级门客书籍1次
        ["unlockId"]="39",["questType"]=204,["openType"]="servant",["value"]=1,["reward"]="2_1_100000",
    },
    ["39"]={       ----势不可挡----势力达到15000
        ["unlockId"]="40",["questType"]=107,["openType"]="servant",["value"]=15000,["reward"]="8_1025_1|6_1102_1",
    },
    ["40"]={       ----游历寻访----寻访次数达3次
        ["unlockId"]="41",["questType"]=303,["openType"]="search",["value"]=3,["reward"]="6_1302_2",
    },
    ["41"]={       ----体力恢复----使用体力丹1次
        ["unlockId"]="42",["questType"]=109,["openType"]="search",["value"]=1,["reward"]="2_1_100000",
    },
    ["42"]={       ----升级门客----至少3名门客等级达到30级
        ["unlockId"]="43",["questType"]=202,["openType"]="servant",["need"]=30,["value"]=3,["reward"]="4_1_100000|6_1303_3",
    },
    ["43"]={       ----活力恢复----使用活力丹6次
        ["unlockId"]="44",["questType"]=110,["openType"]="child",["value"]=6,["reward"]="6_1303_1",
    },
    ["44"]={       ----勤政爱民----累计使用5次政务令
        ["unlockId"]="45",["questType"]=108,["openType"]="affair",["value"]=5,["reward"]="6_1010_1",
    },
    ["45"]={       ----主簿请柬----累计关卡战斗胜利164次
        ["unlockId"]="46",["questType"]=106,["openType"]="challenge",["value"]=164,["reward"]="2_1_100000",
    },
    ["46"]={       ----养精蓄锐----经营商产次数达40次
        ["unlockId"]="47",["questType"]=101,["openType"]="manage",["value"]=40,["reward"]="2_1_100000",
    },
    ["47"]={       ----五谷丰登----经营农产次数达40次
        ["unlockId"]="48",["questType"]=102,["openType"]="manage",["value"]=40,["reward"]="3_1_100000",
    },
    ["48"]={       ----兵甲富足----招募士兵次数达40次
        ["unlockId"]="49",["questType"]=103,["openType"]="manage",["value"]=40,["reward"]="4_1_100000",
    },
    ["49"]={       ----升级门客----至少5名门客等级达到30级
        ["unlockId"]="50",["questType"]=202,["openType"]="servant",["need"]=30,["value"]=5,["reward"]="6_1101_2",
    },
    ["50"]={       ----严惩贪官----惩罚犯人次数达10次
        ["unlockId"]="51",["questType"]=116,["openType"]="prison",["value"]=10,["reward"]="6_1352_1|6_1354_1",
    },
    ["51"]={       ----势不可挡----势力达到25000
        ["unlockId"]="52",["questType"]=107,["openType"]="servant",["value"]=25000,["reward"]="8_1026_1|6_1102_1",
    },
    ["52"]={       ----鸿门宴----累计关卡战斗胜利205次
        ["unlockId"]="53",["questType"]=106,["openType"]="challenge",["value"]=205,["reward"]="6_1301_1|6_1302_1|6_1102_1",
    },
    ["53"]={       ----处理政务----处理政务次数达6次
        ["unlockId"]="54",["questType"]=104,["openType"]="affair",["value"]=6,["reward"]="6_1004_1",
    },
    ["54"]={       ----升级门客----至少7名门客等级达到30级
        ["unlockId"]="55",["questType"]=202,["openType"]="servant",["need"]=30,["value"]=7,["reward"]="6_1101_2",
    },
    ["55"]={       ----领取俸禄----皇宫请安次数达到1次
        ["unlockId"]="56",["questType"]=115,["openType"]="palace",["value"]=1,["reward"]="2_1_100000",
    },
    ["56"]={       ----书院学习----书院学习次数达到1次
        ["unlockId"]="57",["questType"]=502,["openType"]="bookroom",["value"]=1,["reward"]="3_1_100000",
    },
    ["57"]={       ----随机传唤----随机传唤红颜次数达到12次
        ["unlockId"]="58",["questType"]=301,["openType"]="wife",["value"]=12,["reward"]="6_1352_1|6_1354_1",
    },
    ["58"]={       ----赏赐红颜----红颜赏赐次数达3次
        ["unlockId"]="59",["questType"]=306,["openType"]="wife",["value"]=3,["reward"]="6_1302_2",
    },
    ["59"]={       ----游历寻访----寻访次数达12次
        ["unlockId"]="60",["questType"]=303,["openType"]="search",["value"]=12,["reward"]="4_1_100000",
    },
    ["60"]={       ----清缴余孽----累计关卡战斗胜利246次
        ["unlockId"]="61",["questType"]=106,["openType"]="challenge",["value"]=246,["reward"]="2_1_100000",
    },
    ["61"]={       ----升级门客----至少1名门客等级达到40级
        ["unlockId"]="62",["questType"]=202,["openType"]="servant",["need"]=40,["value"]=1,["reward"]="6_1101_2",
    },
    ["62"]={       ----势不可挡----势力达到30000
        ["unlockId"]="63",["questType"]=107,["openType"]="servant",["value"]=40000,["reward"]="8_1027_1|6_1102_1",
    },
    ["63"]={       ----每日签到----累计签到2天
        ["unlockId"]="64",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=2,["reward"]="6_1361_1|6_1362_1",
    },
    ["64"]={       ----养精蓄锐----经营商产次数达80次
        ["unlockId"]="65",["questType"]=101,["openType"]="manage",["value"]=80,["reward"]="2_1_200000",
    },
    ["65"]={       ----五谷丰登----经营农产次数达80次
        ["unlockId"]="66",["questType"]=102,["openType"]="manage",["value"]=80,["reward"]="3_1_200000",
    },
    ["66"]={       ----兵甲富足----招募士兵次数达80次
        ["unlockId"]="67",["questType"]=103,["openType"]="manage",["value"]=80,["reward"]="4_1_200000",
    },
    ["67"]={       ----声名鹊起----累计关卡战斗胜利287次
        ["unlockId"]="68",["questType"]=106,["openType"]="challenge",["value"]=287,["reward"]="4_1_200000",
    },
    ["68"]={       ----升官发财----官品等级达正八品4
        ["unlockId"]="69",["questType"]=105,["openType"]="level",["value"]=4,["reward"]="6_1301_1|6_1302_1|6_1303_1",
    },
    ["69"]={       ----喜得贵子----子嗣数量达2个
        ["unlockId"]="70",["questType"]=401,["openType"]="wife",["value"]=2,["reward"]="6_1352_1|6_1354_1",
    },
    ["70"]={       ----升级门客----至少3名门客等级达到40级
        ["unlockId"]="71",["questType"]=202,["openType"]="servant",["need"]=40,["value"]=3,["reward"]="6_1101_2",
    },
    ["71"]={       ----升级门客----至少5名门客等级达到40级
        ["unlockId"]="72",["questType"]=202,["openType"]="servant",["need"]=40,["value"]=5,["reward"]="6_1010_1",
    },
    ["72"]={       ----赏赐红颜----红颜赏赐次数达6次
        ["unlockId"]="73",["questType"]=306,["openType"]="wife",["value"]=6,["reward"]="6_1020_1|6_1030_1",
    },
    ["73"]={       ----势不可挡----势力达到60000
        ["unlockId"]="74",["questType"]=107,["openType"]="servant",["value"]=60000,["reward"]="8_1028_1|6_1102_1",
    },
    ["74"]={       ----严惩贪官----惩罚犯人次数达30次
        ["unlockId"]="75",["questType"]=116,["openType"]="prison",["value"]=30,["reward"]="2_1_200000",
    },
    ["75"]={       ----升级门客----至少7名门客等级达到40级
        ["unlockId"]="76",["questType"]=202,["openType"]="servant",["need"]=40,["value"]=7,["reward"]="4_1_200000",
    },
    ["76"]={       ----升级门客----至少1名门客等级达到50级
        ["unlockId"]="77",["questType"]=202,["openType"]="servant",["need"]=50,["value"]=1,["reward"]="2_1_200000",
    },
    ["77"]={       ----升级门客----至少3名门客等级达到50级
        ["unlockId"]="78",["questType"]=202,["openType"]="servant",["need"]=50,["value"]=3,["reward"]="4_1_200000",
    },
    ["78"]={       ----升级门客----至少5名门客等级达到50级
        ["unlockId"]="79",["questType"]=202,["openType"]="servant",["need"]=50,["value"]=5,["reward"]="2_1_200000",
    },
    ["79"]={       ----升级门客----至少7名门客等级达到50级
        ["unlockId"]="80",["questType"]=202,["openType"]="servant",["need"]=50,["value"]=7,["reward"]="4_1_200000",
    },
    ["80"]={       ----庄头行贿----累计关卡战斗胜利328次
        ["unlockId"]="81",["questType"]=106,["openType"]="challenge",["value"]=328,["reward"]="6_1101_2",
    },
    ["81"]={       ----膜拜大神----膜拜次数达6次
        ["unlockId"]="82",["questType"]=114,["openType"]="rank",["value"]=6,["reward"]="6_1102_2",
    },
    ["82"]={       ----勤政爱民----累计使用10次政务令
        ["unlockId"]="83",["questType"]=108,["openType"]="affair",["value"]=10,["reward"]="6_1302_2",
    },
    ["83"]={       ----养精蓄锐----经营商产次数达110次
        ["unlockId"]="84",["questType"]=101,["openType"]="manage",["value"]=110,["reward"]="6_1303_2",
    },
    ["84"]={       ----五谷丰登----经营农产次数达110次
        ["unlockId"]="85",["questType"]=102,["openType"]="manage",["value"]=110,["reward"]="6_1301_2",
    },
    ["85"]={       ----兵甲富足----招募士兵次数达110次
        ["unlockId"]="86",["questType"]=103,["openType"]="manage",["value"]=110,["reward"]="6_1401_1",
    },
    ["86"]={       ----势不可挡----势力达到80000
        ["unlockId"]="87",["questType"]=107,["openType"]="servant",["value"]=80000,["reward"]="8_1029_1|6_1102_1",
    },
    ["87"]={       ----升级门客----至少1名门客等级达到60级
        ["unlockId"]="88",["questType"]=202,["openType"]="servant",["need"]=60,["value"]=1,["reward"]="6_1352_1|6_1354_1",
    },
    ["88"]={       ----危机四伏----累计关卡战斗胜利369次
        ["unlockId"]="89",["questType"]=106,["openType"]="challenge",["value"]=369,["reward"]="2_1_200000",
    },
    ["89"]={       ----书院学习----书院学习次数达到4次
        ["unlockId"]="90",["questType"]=502,["openType"]="bookroom",["value"]=4,["reward"]="6_1020_1|6_1301_2",
    },
    ["90"]={       ----随机传唤----随机传唤红颜次数达到40次
        ["unlockId"]="91",["questType"]=301,["openType"]="wife",["value"]=40,["reward"]="6_1030_1",
    },
    ["91"]={       ----赏赐红颜----红颜赏赐次数达10次
        ["unlockId"]="92",["questType"]=306,["openType"]="wife",["value"]=10,["reward"]="6_1004_1|6_1302_2",
    },
    ["92"]={       ----游历寻访----寻访次数达40次
        ["unlockId"]="93",["questType"]=303,["openType"]="search",["value"]=40,["reward"]="6_1010_1",
    },
    ["93"]={       ----衙门出战----衙门出战1次
        ["unlockId"]="94",["questType"]=601,["openType"]="atkrace",["value"]=1,["reward"]="6_1020_1|6_1030_1",
    },
    ["94"]={       ----不畏强权----累计关卡战斗胜利410次
        ["unlockId"]="95",["questType"]=106,["openType"]="challenge",["value"]=410,["reward"]="2_1_200000",
    },
    ["95"]={       ----升级门客----至少2名门客等级达到60级
        ["unlockId"]="96",["questType"]=202,["openType"]="servant",["need"]=60,["value"]=2,["reward"]="4_1_200000",
    },
    ["96"]={       ----处理政务----处理政务次数达20次
        ["unlockId"]="97",["questType"]=104,["openType"]="affair",["value"]=20,["reward"]="4_1_200000",
    },
    ["97"]={       ----势不可挡----势力达到100000
        ["unlockId"]="98",["questType"]=107,["openType"]="servant",["value"]=100000,["reward"]="8_1030_1|6_1102_1",
    },
    ["98"]={       ----升级门客----至少4名门客等级达到60级
        ["unlockId"]="99",["questType"]=202,["openType"]="servant",["need"]=60,["value"]=4,["reward"]="2_1_200000",
    },
    ["99"]={       ----主持公道----累计关卡战斗胜利451次
        ["unlockId"]="100",["questType"]=106,["openType"]="challenge",["value"]=451,["reward"]="6_1101_2",
    },
    ["100"]={       ----升官发财----官品等级达从七品5
        ["unlockId"]="101",["questType"]=105,["openType"]="level",["value"]=5,["reward"]="6_1301_2|6_1302_2|6_1303_2",
    },
    ["101"]={       ----领取俸禄----皇宫请安次数达到2次
        ["unlockId"]="102",["questType"]=115,["openType"]="palace",["value"]=2,["reward"]="2_1_200000",
    },
    ["102"]={       ----升级门客----至少6名门客等级达到60级
        ["unlockId"]="103",["questType"]=202,["openType"]="servant",["need"]=60,["value"]=6,["reward"]="4_1_200000",
    },
    ["103"]={       ----升级门客----至少1名门客等级达到70级
        ["unlockId"]="104",["questType"]=202,["openType"]="servant",["need"]=70,["value"]=1,["reward"]="4_1_200000",
    },
    ["104"]={       ----衙门出战----衙门出战2次
        ["unlockId"]="105",["questType"]=601,["openType"]="atkrace",["value"]=2,["reward"]="6_1020_1|6_1030_1",
    },
    ["105"]={       ----不打不相识----累计关卡战斗胜利492次
        ["unlockId"]="106",["questType"]=106,["openType"]="challenge",["value"]=492,["reward"]="6_1101_2",
    },
    ["106"]={       ----养精蓄锐----经营商产次数达140次
        ["unlockId"]="107",["questType"]=101,["openType"]="manage",["value"]=140,["reward"]="2_1_200000",
    },
    ["107"]={       ----五谷丰登----经营农产次数达140次
        ["unlockId"]="108",["questType"]=102,["openType"]="manage",["value"]=140,["reward"]="3_1_200000",
    },
    ["108"]={       ----兵甲富足----招募士兵次数达140次
        ["unlockId"]="109",["questType"]=103,["openType"]="manage",["value"]=140,["reward"]="4_1_200000",
    },
    ["109"]={       ----养儿育女----子嗣培养次数达20次
        ["unlockId"]="110",["questType"]=402,["openType"]="child",["value"]=20,["reward"]="6_1352_1|6_1354_1",
    },
    ["110"]={       ----势不可挡----势力达到120000
        ["unlockId"]="111",["questType"]=107,["openType"]="servant",["value"]=120000,["reward"]="8_1031_1|6_1102_1",
    },
    ["111"]={       ----衙门出战----衙门出战3次
        ["unlockId"]="112",["questType"]=601,["openType"]="atkrace",["value"]=3,["reward"]="6_1020_1|6_1030_1",
    },
    ["112"]={       ----每日签到----累计签到3天
        ["unlockId"]="113",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=3,["reward"]="6_1301_1|6_1302_1|6_1303_1",
    },
    ["113"]={       ----结成同盟----累计关卡战斗胜利533次
        ["unlockId"]="114",["questType"]=106,["openType"]="challenge",["value"]=533,["reward"]="6_1101_2",
    },
    ["114"]={       ----升级门客----至少2名门客等级达到70级
        ["unlockId"]="115",["questType"]=202,["openType"]="servant",["need"]=70,["value"]=2,["reward"]="2_1_300000",
    },
    ["115"]={       ----升级门客----至少4名门客等级达到70级
        ["unlockId"]="116",["questType"]=202,["openType"]="servant",["need"]=70,["value"]=4,["reward"]="3_1_300000",
    },
    ["116"]={       ----升级门客----至少6名门客等级达到70级
        ["unlockId"]="117",["questType"]=202,["openType"]="servant",["need"]=70,["value"]=6,["reward"]="4_1_300000",
    },
    ["117"]={       ----膜拜大神----膜拜次数达9次
        ["unlockId"]="118",["questType"]=114,["openType"]="rank",["value"]=9,["reward"]="6_1102_2",
    },
    ["118"]={       ----严惩贪官----惩罚犯人次数达70次
        ["unlockId"]="119",["questType"]=116,["openType"]="prison",["value"]=70,["reward"]="2_1_300000",
    },
    ["119"]={       ----书院学习----书院学习次数达到8次
        ["unlockId"]="120",["questType"]=502,["openType"]="bookroom",["value"]=8,["reward"]="6_1301_3",
    },
    ["120"]={       ----随机传唤----随机传唤红颜次数达到60次
        ["unlockId"]="121",["questType"]=301,["openType"]="wife",["value"]=60,["reward"]="6_1302_3",
    },
    ["121"]={       ----游历寻访----寻访次数达80次
        ["unlockId"]="122",["questType"]=303,["openType"]="search",["value"]=80,["reward"]="6_1303_2",
    },
    ["122"]={       ----结交百总----累计关卡战斗胜利574次
        ["unlockId"]="123",["questType"]=106,["openType"]="challenge",["value"]=574,["reward"]="6_1090_1",
    },
    ["123"]={       ----衙门出战----衙门出战4次
        ["unlockId"]="124",["questType"]=601,["openType"]="atkrace",["value"]=4,["reward"]="6_1020_1|6_1030_1",
    },
    ["124"]={       ----勤政爱民----使用20次政务令
        ["unlockId"]="125",["questType"]=108,["openType"]="affair",["value"]=20,["reward"]="2_1_300000",
    },
    ["125"]={       ----势不可挡----势力达到140000
        ["unlockId"]="126",["questType"]=107,["openType"]="servant",["value"]=140000,["reward"]="8_1032_1|6_1102_1",
    },
    ["126"]={       ----养儿育女----子嗣培养次数达30次
        ["unlockId"]="127",["questType"]=402,["openType"]="child",["value"]=30,["reward"]="6_1352_1|6_1354_1",
    },
    ["127"]={       ----升级门客----至少1名门客等级达到80级
        ["unlockId"]="128",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=1,["reward"]="6_1101_2",
    },
    ["128"]={       ----夜闯兵营----累计关卡战斗胜利615次
        ["unlockId"]="129",["questType"]=106,["openType"]="challenge",["value"]=615,["reward"]="6_1150_1",
    },
    ["129"]={       ----增添席位----扩建子嗣席位至3个
        ["unlockId"]="130",["questType"]=404,["openType"]="child",["value"]=3,["reward"]="6_1010_1",
    },
    ["130"]={       ----喜得贵子----子嗣数量达3个
        ["unlockId"]="131",["questType"]=401,["openType"]="wife",["value"]=3,["reward"]="6_1303_2",
    },
    ["131"]={       ----书院席位----扩建书院席位至2个
        ["unlockId"]="132",["questType"]=501,["openType"]="bookroom",["value"]=2,["reward"]="6_1551_1",
    },
    ["132"]={       ----养精蓄锐----经营商产次数达170次
        ["unlockId"]="133",["questType"]=101,["openType"]="manage",["value"]=170,["reward"]="2_1_300000",
    },
    ["133"]={       ----五谷丰登----经营农产次数达170次
        ["unlockId"]="134",["questType"]=102,["openType"]="manage",["value"]=170,["reward"]="3_1_300000",
    },
    ["134"]={       ----兵甲富足----招募士兵次数达170次
        ["unlockId"]="135",["questType"]=103,["openType"]="manage",["value"]=170,["reward"]="4_1_300000",
    },
    ["135"]={       ----衙门出战----衙门出战6次
        ["unlockId"]="136",["questType"]=601,["openType"]="atkrace",["value"]=6,["reward"]="6_1020_1|6_1030_1",
    },
    ["136"]={       ----势不可挡----势力达到150000
        ["unlockId"]="137",["questType"]=107,["openType"]="servant",["value"]=150000,["reward"]="6_1090_1",
    },
    ["137"]={       ----秉烛夜谈----累计关卡战斗胜利656次
        ["unlockId"]="138",["questType"]=106,["openType"]="challenge",["value"]=656,["reward"]="2_1_300000",
    },
    ["138"]={       ----升级门客----至少2名门客等级达到80级
        ["unlockId"]="139",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=2,["reward"]="2_1_300000",
    },
    ["139"]={       ----升级门客----至少3名门客等级达到80级
        ["unlockId"]="140",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=3,["reward"]="4_1_300000",
    },
    ["140"]={       ----势不可挡----势力达到160000
        ["unlockId"]="141",["questType"]=107,["openType"]="servant",["value"]=160000,["reward"]="6_1303_3|6_1102_1",
    },
    ["141"]={       ----三人行----累计关卡战斗胜利697次
        ["unlockId"]="142",["questType"]=106,["openType"]="challenge",["value"]=697,["reward"]="6_1552_1",
    },
    ["142"]={       ----唯我独尊----衙门使用挑战书1次
        ["unlockId"]="143",["questType"]=603,["openType"]="atkrace",["value"]=1,["reward"]="6_1101_2",
    },
    ["143"]={       ----购买道具----商城购买任意道具1次
        ["unlockId"]="144",["questType"]=121,["openType"]="shop",["value"]=1,["reward"]="6_1004_1",
    },
    ["144"]={       ----升级门客----至少4名门客等级达到80级
        ["unlockId"]="145",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=4,["reward"]="2_1_300000",
    },
    ["145"]={       ----升级门客----至少5名门客等级达到80级
        ["unlockId"]="146",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=5,["reward"]="4_1_300000",
    },
    ["146"]={       ----升级门客----至少6名门客等级达到80级
        ["unlockId"]="147",["questType"]=202,["openType"]="servant",["need"]=80,["value"]=6,["reward"]="4_1_300000",
    },
    ["147"]={       ----剿灭异己----累计关卡战斗胜利738次
        ["unlockId"]="148",["questType"]=106,["openType"]="challenge",["value"]=738,["reward"]="6_1303_3",
    },
    ["148"]={       ----养精蓄锐----经营商产次数达200次
        ["unlockId"]="149",["questType"]=101,["openType"]="manage",["value"]=200,["reward"]="2_1_300000",
    },
    ["149"]={       ----五谷丰登----经营农产次数达200次
        ["unlockId"]="150",["questType"]=102,["openType"]="manage",["value"]=200,["reward"]="3_1_300000",
    },
    ["150"]={       ----兵甲富足----招募士兵次数达200次
        ["unlockId"]="151",["questType"]=103,["openType"]="manage",["value"]=200,["reward"]="4_1_300000",
    },
    ["151"]={       ----一网打尽----累计关卡战斗胜利779次
        ["unlockId"]="152",["questType"]=106,["openType"]="challenge",["value"]=779,["reward"]="6_1551_1",
    },
    ["152"]={       ----技能升级----门客技能升级次数达20次
        ["unlockId"]="153",["questType"]=205,["openType"]="servant",["value"]=20,["reward"]="6_1303_3",
    },
    ["153"]={       ----活力恢复----使用活力丹20次
        ["unlockId"]="154",["questType"]=110,["openType"]="child",["value"]=20,["reward"]="6_1401_1",
    },
    ["154"]={       ----喜结良缘----联姻次数达1次
        ["unlockId"]="155",["questType"]=403,["openType"]="adult",["value"]=1,["reward"]="6_1004_1",
    },
    ["155"]={       ----强敌来袭----累计关卡战斗胜利820次
        ["unlockId"]="156",["questType"]=106,["openType"]="challenge",["value"]=820,["reward"]="6_1010_1",
    },
    ["156"]={       ----升官发财----官品等级达正七品6
        ["unlockId"]="157",["questType"]=105,["openType"]="level",["value"]=6,["reward"]="6_1301_1|6_1302_1|6_1303_1",
    },
    ["157"]={       ----领取俸禄----皇宫请安次数达3次
        ["unlockId"]="158",["questType"]=115,["openType"]="palace",["value"]=3,["reward"]="2_1_300000",
    },
    ["158"]={       ----每日签到----累计签到4天
        ["unlockId"]="159",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=4,["reward"]="6_1004_1",
    },
    ["159"]={       ----升级门客----至少1名门客等级达到90级
        ["unlockId"]="160",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=1,["reward"]="2_1_400000",
    },
    ["160"]={       ----势不可挡----势力达到180000
        ["unlockId"]="161",["questType"]=107,["openType"]="servant",["value"]=180000,["reward"]="6_1303_3|6_1102_1",
    },
    ["161"]={       ----膜拜大神----膜拜次数达12次
        ["unlockId"]="162",["questType"]=114,["openType"]="rank",["value"]=12,["reward"]="6_1102_2",
    },
    ["162"]={       ----严惩贪官----惩罚犯人次数达120次
        ["unlockId"]="163",["questType"]=116,["openType"]="prison",["value"]=120,["reward"]="6_1101_2",
    },
    ["163"]={       ----来龙去脉----累计关卡战斗胜利861
        ["unlockId"]="164",["questType"]=106,["openType"]="challenge",["value"]=861,["reward"]="6_1010_1",
    },
    ["164"]={       ----养精蓄锐----经营商产次数达230次
        ["unlockId"]="165",["questType"]=101,["openType"]="manage",["value"]=230,["reward"]="2_1_400000",
    },
    ["165"]={       ----五谷丰登----经营农产次数达230次
        ["unlockId"]="166",["questType"]=102,["openType"]="manage",["value"]=230,["reward"]="3_1_400000",
    },
    ["166"]={       ----兵甲富足----招募士兵次数达230次
        ["unlockId"]="167",["questType"]=103,["openType"]="manage",["value"]=230,["reward"]="4_1_400000",
    },
    ["167"]={       ----书院学习----书院学习次数达到12次
        ["unlockId"]="168",["questType"]=502,["openType"]="bookroom",["value"]=12,["reward"]="6_1302_2",
    },
    ["168"]={       ----随机传唤----随机传唤红颜次数达到90次
        ["unlockId"]="169",["questType"]=301,["openType"]="wife",["value"]=90,["reward"]="6_1301_2",
    },
    ["169"]={       ----游历寻访----寻访次数达120次
        ["unlockId"]="170",["questType"]=303,["openType"]="search",["value"]=120,["reward"]="6_1303_2",
    },
    ["170"]={       ----衙门出战----衙门出战8次
        ["unlockId"]="171",["questType"]=601,["openType"]="atkrace",["value"]=8,["reward"]="6_1020_1|6_1030_1",
    },
    ["171"]={       ----升级门客----至少2名门客等级达到90级
        ["unlockId"]="172",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=2,["reward"]="2_1_400000",
    },
    ["172"]={       ----公然抗命----累计关卡战斗胜利902次
        ["unlockId"]="173",["questType"]=106,["openType"]="challenge",["value"]=902,["reward"]="6_1551_1",
    },
    ["173"]={       ----势不可挡----势力达到200000
        ["unlockId"]="174",["questType"]=107,["openType"]="servant",["value"]=200000,["reward"]="6_1552_1",
    },
    ["174"]={       ----唯我独尊----衙门使用挑战书2次
        ["unlockId"]="175",["questType"]=603,["openType"]="atkrace",["value"]=2,["reward"]="6_1101_2",
    },
    ["175"]={       ----衙门出战----衙门出战10次
        ["unlockId"]="176",["questType"]=601,["openType"]="atkrace",["value"]=10,["reward"]="6_1020_1|6_1030_1",
    },
    ["176"]={       ----技能升级----门客技能升级次数达30次
        ["unlockId"]="177",["questType"]=205,["openType"]="servant",["value"]=30,["reward"]="6_1303_2",
    },
    ["177"]={       ----升级门客----至少3名门客等级达到90级
        ["unlockId"]="178",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=3,["reward"]="2_1_400000",
    },
    ["178"]={       ----升级门客----至少4名门客等级达到90级
        ["unlockId"]="179",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=4,["reward"]="3_1_400000",
    },
    ["179"]={       ----栽赃陷害----累计关卡战斗胜利943次
        ["unlockId"]="180",["questType"]=106,["openType"]="challenge",["value"]=943,["reward"]="4_1_400000",
    },
    ["180"]={       ----喜得贵子----子嗣数量达4个
        ["unlockId"]="181",["questType"]=401,["openType"]="wife",["value"]=4,["reward"]="6_1101_2",
    },
    ["181"]={       ----红颜技能----升级红颜技能1次
        ["unlockId"]="182",["questType"]=305,["openType"]="wife",["value"]=1,["reward"]="6_1352_1|6_1354_1",
    },
    ["182"]={       ----仇深似海----累计关卡战斗胜利984次
        ["unlockId"]="183",["questType"]=106,["openType"]="challenge",["value"]=984,["reward"]="6_1201_1",
    },
    ["183"]={       ----势不可挡----势力达到220000
        ["unlockId"]="184",["questType"]=107,["openType"]="servant",["value"]=220000,["reward"]="6_1010_1",
    },
    ["184"]={       ----领取俸禄----皇宫请安次数达到4次
        ["unlockId"]="185",["questType"]=115,["openType"]="palace",["value"]=4,["reward"]="6_1102_2",
    },
    ["185"]={       ----养精蓄锐----经营商产次数达260次
        ["unlockId"]="186",["questType"]=101,["openType"]="manage",["value"]=260,["reward"]="2_1_400000",
    },
    ["186"]={       ----五谷丰登----经营农产次数达260次
        ["unlockId"]="187",["questType"]=102,["openType"]="manage",["value"]=260,["reward"]="3_1_400000",
    },
    ["187"]={       ----兵甲富足----招募士兵次数达260次
        ["unlockId"]="188",["questType"]=103,["openType"]="manage",["value"]=260,["reward"]="4_1_400000",
    },
    ["188"]={       ----每日签到----累计签到5天
        ["unlockId"]="189",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=5,["reward"]="6_1020_3|6_1030_3",
    },
    ["189"]={       ----县令的愤怒----累计关卡战斗胜利1025次
        ["unlockId"]="190",["questType"]=106,["openType"]="challenge",["value"]=1025,["reward"]="6_1303_2",
    },
    ["190"]={       ----膜拜大神----膜拜次数达15次
        ["unlockId"]="191",["questType"]=114,["openType"]="rank",["value"]=15,["reward"]="6_1102_2",
    },
    ["191"]={       ----升级门客----至少5名门客等级达到90级
        ["unlockId"]="192",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=5,["reward"]="2_1_500000",
    },
    ["192"]={       ----升级门客----至少6名门客等级达到90级
        ["unlockId"]="193",["questType"]=202,["openType"]="servant",["need"]=90,["value"]=6,["reward"]="4_1_500000",
    },
    ["193"]={       ----书院学习----书院学习次数达到16次
        ["unlockId"]="194",["questType"]=502,["openType"]="bookroom",["value"]=16,["reward"]="6_1301_2",
    },
    ["194"]={       ----随机传唤----随机传唤红颜次数达到120次
        ["unlockId"]="195",["questType"]=301,["openType"]="wife",["value"]=120,["reward"]="6_1302_2",
    },
    ["195"]={       ----游历寻访----寻访次数达150次
        ["unlockId"]="196",["questType"]=303,["openType"]="search",["value"]=150,["reward"]="6_1303_2",
    },
    ["196"]={       ----暴风雨来临----累计关卡战斗胜利1066次
        ["unlockId"]="197",["questType"]=106,["openType"]="challenge",["value"]=1066,["reward"]="6_1101_2",
    },
    ["197"]={       ----红颜技能----升级红颜技能5次
        ["unlockId"]="198",["questType"]=305,["openType"]="wife",["value"]=5,["reward"]="6_1352_1|6_1354_1",
    },
    ["198"]={       ----势不可挡----势力达到240000
        ["unlockId"]="199",["questType"]=107,["openType"]="servant",["value"]=240000,["reward"]="6_1010_1",
    },
    ["199"]={       ----衙门出战----衙门出战12次
        ["unlockId"]="200",["questType"]=601,["openType"]="atkrace",["value"]=12,["reward"]="6_1020_1|6_1030_1",
    },
    ["200"]={       ----神秘人----累计关卡战斗胜利1107次
        ["unlockId"]="201",["questType"]=106,["openType"]="challenge",["value"]=1107,["reward"]="6_1201_1",
    },
    ["201"]={       ----严惩贪官----惩罚犯人次数达200次
        ["unlockId"]="202",["questType"]=116,["openType"]="prison",["value"]=200,["reward"]="2_1_500000",
    },
    ["202"]={       ----升级门客----至少1名门客等级达到100级
        ["unlockId"]="203",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=1,["reward"]="4_1_500000",
    },
    ["203"]={       ----入伙条件----累计关卡战斗胜利1148次
        ["unlockId"]="204",["questType"]=106,["openType"]="challenge",["value"]=1148,["reward"]="6_1303_2",
    },
    ["204"]={       ----养精蓄锐----经营商产次数达290次
        ["unlockId"]="205",["questType"]=101,["openType"]="manage",["value"]=290,["reward"]="2_1_500000",
    },
    ["205"]={       ----五谷丰登----经营农产次数达290次
        ["unlockId"]="206",["questType"]=102,["openType"]="manage",["value"]=290,["reward"]="3_1_500000",
    },
    ["206"]={       ----兵甲富足----招募士兵次数达290次
        ["unlockId"]="207",["questType"]=103,["openType"]="manage",["value"]=290,["reward"]="4_1_500000",
    },
    ["207"]={       ----技能升级----门客技能升级次数达40次
        ["unlockId"]="208",["questType"]=205,["openType"]="servant",["value"]=40,["reward"]="6_1102_2",
    },
    ["208"]={       ----升级门客----至少2名门客等级达到100级
        ["unlockId"]="209",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=2,["reward"]="6_1101_2",
    },
    ["209"]={       ----你的疑问----累计关卡战斗胜利1189次
        ["unlockId"]="210",["questType"]=106,["openType"]="challenge",["value"]=1189,["reward"]="6_1303_2",
    },
    ["210"]={       ----势不可挡----势力达到260000
        ["unlockId"]="211",["questType"]=107,["openType"]="servant",["value"]=260000,["reward"]="6_1010_1",
    },
    ["211"]={       ----活力恢复----使用活力丹30次
        ["unlockId"]="212",["questType"]=110,["openType"]="child",["value"]=30,["reward"]="6_1361_1",
    },
    ["212"]={       ----喜结良缘----联姻次数达2次
        ["unlockId"]="213",["questType"]=403,["openType"]="adult",["value"]=2,["reward"]="6_1004_1",
    },
    ["213"]={       ----新的认识----累计关卡战斗胜利1230次
        ["unlockId"]="214",["questType"]=106,["openType"]="challenge",["value"]=1230,["reward"]="6_1090_1",
    },
    ["214"]={       ----处理政务----处理政务次数达80次
        ["unlockId"]="215",["questType"]=104,["openType"]="affair",["value"]=80,["reward"]="2_1_500000",
    },
    ["215"]={       ----衙门出战----衙门出战14次
        ["unlockId"]="216",["questType"]=601,["openType"]="atkrace",["value"]=14,["reward"]="6_1020_1|6_1030_1",
    },
    ["216"]={       ----拨云见日----累计关卡战斗胜利1271次
        ["unlockId"]="217",["questType"]=106,["openType"]="challenge",["value"]=1271,["reward"]="6_1101_2",
    },
    ["217"]={       ----领取俸禄----皇宫请安次数达5次
        ["unlockId"]="218",["questType"]=115,["openType"]="palace",["value"]=5,["reward"]="6_1102_2",
    },
    ["218"]={       ----每日签到----累计签到6天
        ["unlockId"]="219",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=6,["reward"]="6_1150_1",
    },
    ["219"]={       ----树倒猢狲散----累计关卡战斗胜利1312次
        ["unlockId"]="220",["questType"]=106,["openType"]="challenge",["value"]=1312,["reward"]="2_1_600000",
    },
    ["220"]={       ----膜拜大神----膜拜次数达18次
        ["unlockId"]="221",["questType"]=114,["openType"]="rank",["value"]=18,["reward"]="4_1_600000",
    },
    ["221"]={       ----书院学习----书院学习次数达到20次
        ["unlockId"]="222",["questType"]=502,["openType"]="bookroom",["value"]=20,["reward"]="6_1301_2",
    },
    ["222"]={       ----随机传唤----随机传唤红颜次数达到150次
        ["unlockId"]="223",["questType"]=301,["openType"]="wife",["value"]=150,["reward"]="6_1302_2",
    },
    ["223"]={       ----游历寻访----寻访次数达180次
        ["unlockId"]="224",["questType"]=303,["openType"]="search",["value"]=180,["reward"]="6_1303_2",
    },
    ["224"]={       ----红颜技能----升级红颜技能10次
        ["unlockId"]="225",["questType"]=305,["openType"]="wife",["value"]=10,["reward"]="6_1352_1|6_1354_1",
    },
    ["225"]={       ----知府密函----累计关卡战斗胜利1353次
        ["unlockId"]="226",["questType"]=106,["openType"]="challenge",["value"]=1353,["reward"]="6_1551_1",
    },
    ["226"]={       ----衙门出战----衙门出战16次
        ["unlockId"]="227",["questType"]=601,["openType"]="atkrace",["value"]=16,["reward"]="6_1020_1|6_1030_1",
    },
    ["227"]={       ----升级门客----至少3名门客等级达到100级
        ["unlockId"]="228",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=3,["reward"]="6_1101_2",
    },
    ["228"]={       ----势不可挡----势力达到280000
        ["unlockId"]="229",["questType"]=107,["openType"]="servant",["value"]=280000,["reward"]="2_1_600000",
    },
    ["229"]={       ----精心策划----累计关卡战斗胜利1394次
        ["unlockId"]="230",["questType"]=106,["openType"]="challenge",["value"]=1394,["reward"]="4_1_600000",
    },
    ["230"]={       ----严惩贪官----惩罚犯人次数达300次
        ["unlockId"]="231",["questType"]=116,["openType"]="prison",["value"]=300,["reward"]="6_1303_2",
    },
    ["231"]={       ----养精蓄锐----经营商产次数达320次
        ["unlockId"]="232",["questType"]=101,["openType"]="manage",["value"]=320,["reward"]="2_1_600000",
    },
    ["232"]={       ----五谷丰登----经营农产次数达320次
        ["unlockId"]="233",["questType"]=102,["openType"]="manage",["value"]=320,["reward"]="3_1_600000",
    },
    ["233"]={       ----兵甲富足----招募士兵次数达320次
        ["unlockId"]="234",["questType"]=103,["openType"]="manage",["value"]=320,["reward"]="4_1_600000",
    },
    ["234"]={       ----培养门客----使用强化卷轴升级门客书籍10次
        ["unlockId"]="235",["questType"]=204,["openType"]="servant",["value"]=10,["reward"]="6_1201_1|6_1206_1|6_1010_1",
    },
    ["235"]={       ----茶楼的主人----累计关卡战斗胜利1435次
        ["unlockId"]="236",["questType"]=106,["openType"]="challenge",["value"]=1435,["reward"]="6_1004_1",
    },
    ["236"]={       ----升官发财----官品等级达从六品7
        ["unlockId"]="237",["questType"]=105,["openType"]="level",["value"]=7,["reward"]="6_1301_1|6_1302_1|6_1303_1",
    },
    ["237"]={       ----领取俸禄----皇宫请安次数达6次
        ["unlockId"]="238",["questType"]=115,["openType"]="palace",["value"]=6,["reward"]="6_1101_2",
    },
    ["238"]={       ----衙门出战----衙门出战18次
        ["unlockId"]="239",["questType"]=601,["openType"]="atkrace",["value"]=18,["reward"]="6_1552_1",
    },
    ["239"]={       ----唯我独尊----衙门使用挑战书3次
        ["unlockId"]="240",["questType"]=603,["openType"]="atkrace",["value"]=3,["reward"]="6_1020_1|6_1030_1",
    },
    ["240"]={       ----偷天换日----累计关卡战斗胜利1476次
        ["unlockId"]="241",["questType"]=106,["openType"]="challenge",["value"]=1476,["reward"]="2_1_600000",
    },
    ["241"]={       ----升级门客----至少4名门客等级达到100级
        ["unlockId"]="242",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=4,["reward"]="6_1303_2",
    },
    ["242"]={       ----势不可挡----势力达到300000
        ["unlockId"]="243",["questType"]=107,["openType"]="servant",["value"]=300000,["reward"]="6_1010_1",
    },
    ["243"]={       ----活力恢复----使用活力丹40次
        ["unlockId"]="244",["questType"]=110,["openType"]="child",["value"]=40,["reward"]="6_1090_1",
    },
    ["244"]={       ----技能升级----门客技能升级次数达50次
        ["unlockId"]="245",["questType"]=205,["openType"]="servant",["value"]=50,["reward"]="4_1_600000",
    },
    ["245"]={       ----拿到账本----累计关卡战斗胜利1517次
        ["unlockId"]="246",["questType"]=106,["openType"]="challenge",["value"]=1517,["reward"]="2_1_600000",
    },
    ["246"]={       ----喜得贵子----子嗣数量达5个
        ["unlockId"]="247",["questType"]=401,["openType"]="wife",["value"]=5,["reward"]="6_1352_1|6_1354_1",
    },
    ["247"]={       ----处理政务----处理政务次数达120次
        ["unlockId"]="248",["questType"]=104,["openType"]="affair",["value"]=120,["reward"]="6_1101_2",
    },
    ["248"]={       ----每日签到----累计签到7天
        ["unlockId"]="249",["questType"]=113,["openType"]="welfare",["openNeed"]="Signin",["value"]=7,["reward"]="6_1216_1",
    },
    ["249"]={       ----膜拜大神----膜拜次数达21次
        ["unlockId"]="250",["questType"]=114,["openType"]="rank",["value"]=21,["reward"]="4_1_700000",
    },
    ["250"]={       ----艺苑听戏----累计关卡战斗胜利1558次
        ["unlockId"]="251",["questType"]=106,["openType"]="challenge",["value"]=1558,["reward"]="2_1_700000",
    },
    ["251"]={       ----书院学习----书院学习次数达24次
        ["unlockId"]="252",["questType"]=502,["openType"]="bookroom",["value"]=24,["reward"]="6_1301_2",
    },
    ["252"]={       ----随机传唤----随机传唤红颜次数达到180次
        ["unlockId"]="253",["questType"]=301,["openType"]="wife",["value"]=180,["reward"]="6_1302_2",
    },
    ["253"]={       ----游历寻访----寻访次数达210次
        ["unlockId"]="254",["questType"]=303,["openType"]="search",["value"]=210,["reward"]="6_1303_2",
    },
    ["254"]={       ----升级门客----至少5名门客等级达到100级
        ["unlockId"]="255",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=5,["reward"]="6_1102_2",
    },
    ["255"]={       ----势不可挡----势力达到320000
        ["unlockId"]="256",["questType"]=107,["openType"]="servant",["value"]=320000,["reward"]="6_1010_1",
    },
    ["256"]={       ----嫌疑人----累计关卡战斗胜利1599次
        ["unlockId"]="257",["questType"]=106,["openType"]="challenge",["value"]=1599,["reward"]="2_1_700000",
    },
    ["257"]={       ----衙门出战----衙门出战20次
        ["unlockId"]="258",["questType"]=601,["openType"]="atkrace",["value"]=20,["reward"]="6_1101_2",
    },
    ["258"]={       ----领取俸禄----皇宫请安次数达到7次
        ["unlockId"]="259",["questType"]=115,["openType"]="palace",["value"]=7,["reward"]="6_1090_1",
    },
    ["259"]={       ----养精蓄锐----经营商产次数达350次
        ["unlockId"]="260",["questType"]=101,["openType"]="manage",["value"]=350,["reward"]="2_1_700000",
    },
    ["260"]={       ----五谷丰登----经营农产次数达350次
        ["unlockId"]="261",["questType"]=102,["openType"]="manage",["value"]=350,["reward"]="3_1_700000",
    },
    ["261"]={       ----兵甲富足----招募士兵次数达350次
        ["unlockId"]="262",["questType"]=103,["openType"]="manage",["value"]=350,["reward"]="4_1_700000",
    },
    ["262"]={       ----严惩贪官----惩罚犯人次数达400次
        ["unlockId"]="263",["questType"]=116,["openType"]="prison",["value"]=400,["reward"]="6_1303_2",
    },
    ["263"]={       ----红颜技能----升级红颜技能20次
        ["unlockId"]="264",["questType"]=305,["openType"]="wife",["value"]=20,["reward"]="6_1352_1|6_1354_1",
    },
    ["264"]={       ----暗中绑人----累计关卡战斗胜利1640次
        ["unlockId"]="265",["questType"]=106,["openType"]="challenge",["value"]=1640,["reward"]="2_1_700000",
    },
    ["265"]={       ----衙门出战----衙门出战22次
        ["unlockId"]="266",["questType"]=601,["openType"]="atkrace",["value"]=22,["reward"]="6_1552_1",
    },
    ["266"]={       ----唯我独尊----衙门使用挑战书4次
        ["unlockId"]="267",["questType"]=603,["openType"]="atkrace",["value"]=4,["reward"]="6_1020_1|6_1030_1",
    },
    ["267"]={       ----升级门客----至少6名门客等级达到100级
        ["unlockId"]="268",["questType"]=202,["openType"]="servant",["need"]=100,["value"]=6,["reward"]="6_1102_2",
    },
    ["268"]={       ----势不可挡----势力达到340000
        ["unlockId"]="269",["questType"]=107,["openType"]="servant",["value"]=340000,["reward"]="6_1010_1",
    },
    ["269"]={       ----酷刑逼供----累计关卡战斗胜利1681次
        ["unlockId"]="270",["questType"]=106,["openType"]="challenge",["value"]=1681,["reward"]="2_1_700000",
    },
    ["270"]={       ----处理政务----处理政务次数达160次
        ["unlockId"]="271",["questType"]=104,["openType"]="affair",["value"]=160,["reward"]="6_1701_1|6_1702_1|6_1703_1",
    },
    ["271"]={       ----门客封爵----至少1名门客爵位达到男爵
        ["unlockId"]="272",["questType"]=206,["openType"]="servant",["need"]=1,["value"]=1,["reward"]="4_1_700000",
    },
    ["272"]={       ----活力恢复----使用活力丹50次
        ["unlockId"]="273",["questType"]=110,["openType"]="child",["value"]=50,["reward"]="6_1090_1",
    },
    ["273"]={       ----喜得贵子----子嗣数量达6个
        ["unlockId"]="274",["questType"]=401,["openType"]="wife",["value"]=6,["reward"]="6_1303_2",
    },
    ["274"]={       ----喜结良缘----联姻次数达4次
        ["unlockId"]="275",["questType"]=403,["openType"]="adult",["value"]=4,["reward"]="6_1004_1",
    },
    ["275"]={       ----血肉模糊----累计关卡战斗胜利1722次
        ["unlockId"]="276",["questType"]=106,["openType"]="challenge",["value"]=1722,["reward"]="2_1_700000",
    },
    ["276"]={       ----势不可挡----势力达到360000
        ["unlockId"]="277",["questType"]=107,["openType"]="servant",["value"]=360000,["reward"]="6_1701_1|6_1702_1|6_1703_1",
    },
    ["277"]={       ----门客封爵----至少2名门客爵位达到男爵
        ["unlockId"]="278",["questType"]=206,["openType"]="servant",["need"]=1,["value"]=2,["reward"]="6_1150_1",
    },
    ["278"]={       ----升级门客----至少1名门客等级达120级
        ["unlockId"]="279",["questType"]=202,["openType"]="servant",["need"]=120,["value"]=1,["reward"]="6_1303_3",
    },
    ["279"]={       ----获得人证----累计关卡战斗胜利1763次
        ["unlockId"]="280",["questType"]=106,["openType"]="challenge",["value"]=1763,["reward"]="2_1_700000",
    },
    ["280"]={       ----衙门出战----衙门出战32次
        ["unlockId"]="281",["questType"]=601,["openType"]="atkrace",["value"]=32,["reward"]="6_1552_1",
    },
    ["281"]={       ----唯我独尊----衙门使用挑战书5次
        ["unlockId"]="282",["questType"]=603,["openType"]="atkrace",["value"]=5,["reward"]="6_1020_1|6_1030_1",
    },
    ["282"]={       ----书院学习----书院学习次数达到28次
        ["unlockId"]="283",["questType"]=502,["openType"]="bookroom",["value"]=28,["reward"]="6_1301_2",
    },
    ["283"]={       ----技能升级----门客技能升级次数达60次
        ["unlockId"]="284",["questType"]=205,["openType"]="servant",["value"]=60,["reward"]="4_1_700000",
    },
    ["284"]={       ----寻找鸦片----累计关卡战斗胜利1804次
        ["unlockId"]="285",["questType"]=106,["openType"]="challenge",["value"]=1804,["reward"]="2_1_700000",
    },
    ["285"]={       ----升级门客----至少2名门客等级达120级
        ["unlockId"]="286",["questType"]=202,["openType"]="servant",["need"]=120,["value"]=2,["reward"]="6_1020_1|6_1030_1",
    },
    ["286"]={       ----加入联盟----成功加入联盟
        ["unlockId"]="287",["questType"]=604,["openType"]="alliance",["value"]=1,["reward"]="2_1_700000",
    },
    ["287"]={       ----联盟建设----联盟建设次数达1次
        ["unlockId"]="288",["questType"]=703,["openType"]="alliance",["value"]=1,["reward"]="2_1_700000",
    },
    ["288"]={       ----联盟兑换----联盟兑换次数达1次
        ["unlockId"]="289",["questType"]=701,["openType"]="alliance",["value"]=1,["reward"]="6_1302_2",
    },
    ["289"]={       ----游历寻访----寻访次数达250次
        ["unlockId"]="290",["questType"]=303,["openType"]="search",["value"]=250,["reward"]="6_1301_2",
    },
    ["290"]={       ----随机传唤----随机传唤红颜次数达到210次
        ["unlockId"]="291",["questType"]=301,["openType"]="wife",["value"]=210,["reward"]="6_1303_2",
    },
    ["291"]={       ----红颜技能----升级红颜技能50次
        ["unlockId"]="292",["questType"]=305,["openType"]="wife",["value"]=50,["reward"]="6_1354_1|6_1353_1",
    },
    ["292"]={       ----养儿育女----子嗣培养次数达200次
        ["unlockId"]="293",["questType"]=402,["openType"]="child",["value"]=200,["reward"]="4_1_700000",
    },
    ["293"]={       ----升级门客----至少3名门客等级达120级
        ["unlockId"]="294",["questType"]=202,["openType"]="servant",["need"]=120,["value"]=3,["reward"]="6_1020_1|6_1030_1",
    },
    ["294"]={       ----xxxx----累计关卡战斗胜利1845次
        ["unlockId"]="295",["questType"]=106,["openType"]="challenge",["value"]=1845,["reward"]="2_1_700000",
    },
    ["295"]={       ----严惩贪官----惩罚犯人次数达500次
        ["unlockId"]="296",["questType"]=116,["openType"]="prison",["value"]=500,["reward"]="6_1102_2",
    },
    ["296"]={       ----处理政务----处理政务次数达200次
        ["unlockId"]="297",["questType"]=104,["openType"]="affair",["value"]=200,["reward"]="2_1_800000",
    },
    ["297"]={       ----势不可挡----势力达到1000000
        ["unlockId"]="298",["questType"]=107,["openType"]="servant",["value"]=1000000,["reward"]="6_1150_1",
    },
    ["298"]={       ----升级门客----至少1名门客等级达150级
        ["unlockId"]="299",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=1,["reward"]="6_1020_1|6_1030_1",
    },
    ["299"]={       ----zzzz----累计关卡战斗胜利1886次
        ["unlockId"]="300",["questType"]=106,["openType"]="challenge",["value"]=1886,["reward"]="2_1_800000",
    },
    ["300"]={       ----衙门出战----衙门出战40次
        ["unlockId"]="301",["questType"]=601,["openType"]="atkrace",["value"]=40,["reward"]="6_1551_1",
    },
    ["301"]={       ----书院学习----书院学习次数达32次
        ["unlockId"]="302",["questType"]=502,["openType"]="bookroom",["value"]=32,["reward"]="6_1101_2",
    },
    ["302"]={       ----技能升级----门客技能升级次数达80次
        ["unlockId"]="303",["questType"]=205,["openType"]="servant",["value"]=80,["reward"]="4_1_800000",
    },
    ["303"]={       ----人赃俱获----累计关卡战斗胜利1927次
        ["unlockId"]="304",["questType"]=106,["openType"]="challenge",["value"]=1927,["reward"]="2_1_800000",
    },
    ["304"]={       ----升级门客----至少2名门客等级达150级
        ["unlockId"]="305",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=2,["reward"]="6_1020_1|6_1030_1",
    },
    ["305"]={       ----联盟建设----联盟建设次数达2次
        ["unlockId"]="306",["questType"]=703,["openType"]="alliance",["value"]=2,["reward"]="2_1_800000",
    },
    ["306"]={       ----联盟兑换----联盟兑换次数达2次
        ["unlockId"]="307",["questType"]=701,["openType"]="alliance",["value"]=2,["reward"]="6_1302_2",
    },
    ["307"]={       ----严惩贪官----惩罚犯人次数达600次
        ["unlockId"]="308",["questType"]=116,["openType"]="prison",["value"]=600,["reward"]="4_1_800000",
    },
    ["308"]={       ----平步青云----累计关卡战斗胜利1968次
        ["unlockId"]="309",["questType"]=106,["openType"]="challenge",["value"]=1968,["reward"]="2_1_800000",
    },
    ["309"]={       ----游历寻访----寻访次数达300次
        ["unlockId"]="310",["questType"]=303,["openType"]="search",["value"]=300,["reward"]="6_1301_2",
    },
    ["310"]={       ----随机传唤----随机传唤红颜次数达250次
        ["unlockId"]="311",["questType"]=301,["openType"]="wife",["value"]=250,["reward"]="6_1303_2",
    },
    ["311"]={       ----升级门客----至少3名门客等级达150级
        ["unlockId"]="312",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=3,["reward"]="6_1020_1|6_1030_1",
    },
    ["312"]={       ----红颜技能----升级红颜技能80次
        ["unlockId"]="313",["questType"]=305,["openType"]="wife",["value"]=80,["reward"]="6_1354_1|6_1353_1",
    },
    ["313"]={       ----喜得贵子----子嗣数量达10个
        ["unlockId"]="314",["questType"]=401,["openType"]="wife",["value"]=10,["reward"]="6_1402_1",
    },
    ["314"]={       ----喜结良缘----联姻次数达8次
        ["unlockId"]="315",["questType"]=403,["openType"]="adult",["value"]=8,["reward"]="6_1004_1",
    },
    ["315"]={       ----巡抚大人----累计关卡战斗胜利2009次
        ["unlockId"]="316",["questType"]=106,["openType"]="challenge",["value"]=2009,["reward"]="2_1_800000",
    },
    ["316"]={       ----严惩贪官----惩罚犯人次数达700次
        ["unlockId"]="317",["questType"]=116,["openType"]="prison",["value"]=700,["reward"]="6_1102_2",
    },
    ["317"]={       ----处理政务----处理政务次数达250次
        ["unlockId"]="318",["questType"]=104,["openType"]="affair",["value"]=250,["reward"]="2_1_800000",
    },
    ["318"]={       ----升级门客----至少4名门客等级达150级
        ["unlockId"]="319",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=4,["reward"]="6_1020_1|6_1030_1",
    },
    ["319"]={       ----知府邀约----累计关卡战斗胜利2050次
        ["unlockId"]="320",["questType"]=106,["openType"]="challenge",["value"]=2050,["reward"]="2_1_800000",
    },
    ["320"]={       ----衙门出战----衙门出战45次
        ["unlockId"]="321",["questType"]=601,["openType"]="atkrace",["value"]=45,["reward"]="6_1551_1",
    },
    ["321"]={       ----书院学习----书院学习次数达到36次
        ["unlockId"]="322",["questType"]=502,["openType"]="bookroom",["value"]=36,["reward"]="6_1030_1",
    },
    ["322"]={       ----技能升级----门客技能升级次数达100次
        ["unlockId"]="323",["questType"]=205,["openType"]="servant",["value"]=100,["reward"]="4_1_800000",
    },
    ["323"]={       ----联盟建设----联盟建设次数达3次
        ["unlockId"]="324",["questType"]=703,["openType"]="alliance",["value"]=3,["reward"]="2_1_1000000",
    },
    ["324"]={       ----前来赴约----累计关卡战斗胜利2091次
        ["unlockId"]="325",["questType"]=106,["openType"]="challenge",["value"]=2091,["reward"]="2_1_800000",
    },
    ["325"]={       ----游历寻访----寻访次数达350次
        ["unlockId"]="326",["questType"]=303,["openType"]="search",["value"]=350,["reward"]="6_1301_2",
    },
    ["326"]={       ----随机传唤----随机传唤红颜次数达300次
        ["unlockId"]="327",["questType"]=301,["openType"]="wife",["value"]=300,["reward"]="6_1303_2",
    },
    ["327"]={       ----红颜技能----升级红颜技能110次
        ["unlockId"]="328",["questType"]=305,["openType"]="wife",["value"]=110,["reward"]="6_1354_1|6_1353_1",
    },
    ["328"]={       ----升级门客----至少5名门客等级达150级
        ["unlockId"]="329",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=5,["reward"]="6_1020_1|6_1030_1",
    },
    ["329"]={       ----派系纷争----累计关卡战斗胜利2132次
        ["unlockId"]="330",["questType"]=106,["openType"]="challenge",["value"]=2132,["reward"]="2_1_1000000",
    },
    ["330"]={       ----领取俸禄----皇宫请安次数达10次
        ["unlockId"]="331",["questType"]=115,["openType"]="palace",["value"]=10,["reward"]="6_1090_1",
    },
    ["331"]={       ----养精蓄锐----经营商产次数达650次
        ["unlockId"]="332",["questType"]=101,["openType"]="manage",["value"]=650,["reward"]="2_1_1000000",
    },
    ["332"]={       ----五谷丰登----经营农产次数达650次
        ["unlockId"]="333",["questType"]=102,["openType"]="manage",["value"]=650,["reward"]="3_1_1000000",
    },
    ["333"]={       ----兵甲富足----招募士兵次数达650次
        ["unlockId"]="334",["questType"]=103,["openType"]="manage",["value"]=650,["reward"]="4_1_1000000",
    },
    ["334"]={       ----升级门客----至少6名门客等级达150级
        ["unlockId"]="335",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=6,["reward"]="6_1020_1|6_1030_1",
    },
    ["335"]={       ----势不可挡----势力达到1200000
        ["unlockId"]="336",["questType"]=107,["openType"]="servant",["value"]=1200000,["reward"]="6_1150_1",
    },
    ["336"]={       ----知府的担忧----累计关卡战斗胜利2173次
        ["unlockId"]="337",["questType"]=106,["openType"]="challenge",["value"]=2173,["reward"]="2_1_1000000",
    },
    ["337"]={       ----联盟建设----联盟建设次数达4次
        ["unlockId"]="338",["questType"]=703,["openType"]="alliance",["value"]=4,["reward"]="2_1_1000000",
    },
    ["338"]={       ----联盟兑换----联盟兑换次数达4次
        ["unlockId"]="339",["questType"]=701,["openType"]="alliance",["value"]=4,["reward"]="6_1302_2",
    },
    ["339"]={       ----严惩贪官----惩罚犯人次数达800次
        ["unlockId"]="340",["questType"]=116,["openType"]="prison",["value"]=800,["reward"]="6_1102_2",
    },
    ["340"]={       ----处理政务----处理政务次数达300次
        ["unlockId"]="341",["questType"]=104,["openType"]="affair",["value"]=300,["reward"]="2_1_1000000",
    },
    ["341"]={       ----升级门客----至少7名门客等级达150级
        ["unlockId"]="342",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=7,["reward"]="6_1020_1|6_1030_1",
    },
    ["342"]={       ----先下手为强----累计关卡战斗胜利2214次
        ["unlockId"]="343",["questType"]=106,["openType"]="challenge",["value"]=2214,["reward"]="2_1_1000000",
    },
    ["343"]={       ----书院学习----书院学习次数达40次
        ["unlockId"]="344",["questType"]=502,["openType"]="bookroom",["value"]=40,["reward"]="6_1030_1",
    },
    ["344"]={       ----技能升级----门客技能升级次数达120次
        ["unlockId"]="345",["questType"]=205,["openType"]="servant",["value"]=120,["reward"]="6_1551_1",
    },
    ["345"]={       ----衙门出战----衙门出战50次
        ["unlockId"]="346",["questType"]=601,["openType"]="atkrace",["value"]=50,["reward"]="2_1_1000000",
    },
    ["346"]={       ----游历寻访----寻访次数达400次
        ["unlockId"]="347",["questType"]=303,["openType"]="search",["value"]=400,["reward"]="6_1301_2",
    },
    ["347"]={       ----随机传唤----随机传唤红颜次数达350次
        ["unlockId"]="348",["questType"]=301,["openType"]="wife",["value"]=350,["reward"]="6_1303_2",
    },
    ["348"]={       ----红颜技能----升级红颜技能140次
        ["unlockId"]="349",["questType"]=305,["openType"]="wife",["value"]=140,["reward"]="6_1354_1|6_1353_1",
    },
    ["349"]={       ----升级门客----至少8名门客等级达150级
        ["unlockId"]="350",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=8,["reward"]="6_1020_1|6_1030_1",
    },
    ["350"]={       ----设计全套----累计关卡战斗胜利2255次
        ["unlockId"]="351",["questType"]=106,["openType"]="challenge",["value"]=2255,["reward"]="2_1_1000000",
    },
    ["351"]={       ----严惩贪官----惩罚犯人次数达900次
        ["unlockId"]="352",["questType"]=116,["openType"]="prison",["value"]=900,["reward"]="6_1102_2",
    },
    ["352"]={       ----处理政务----处理政务次数达350次
        ["unlockId"]="353",["questType"]=104,["openType"]="affair",["value"]=350,["reward"]="6_1101_5",
    },
    ["353"]={       ----养精蓄锐----经营商产次数达700次
        ["unlockId"]="354",["questType"]=101,["openType"]="manage",["value"]=700,["reward"]="2_1_1000000",
    },
    ["354"]={       ----五谷丰登----经营农产次数达700次
        ["unlockId"]="355",["questType"]=102,["openType"]="manage",["value"]=700,["reward"]="3_1_1000000",
    },
    ["355"]={       ----兵甲富足----招募士兵次数达700次
        ["unlockId"]="356",["questType"]=103,["openType"]="manage",["value"]=700,["reward"]="4_1_1000000",
    },
    ["356"]={       ----联盟建设----联盟建设次数达5次
        ["unlockId"]="357",["questType"]=703,["openType"]="alliance",["value"]=5,["reward"]="2_1_1000000",
    },
    ["357"]={       ----升级门客----至少9名门客等级达150级
        ["unlockId"]="358",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=9,["reward"]="6_1020_1|6_1030_1",
    },
    ["358"]={       ----势不可挡----势力达到1500000
        ["unlockId"]="359",["questType"]=107,["openType"]="servant",["value"]=1500000,["reward"]="6_1150_1",
    },
    ["359"]={       ----猎物入网----累计关卡战斗胜利2296次
        ["unlockId"]="360",["questType"]=106,["openType"]="challenge",["value"]=2296,["reward"]="2_1_1000000",
    },
    ["360"]={       ----书院学习----书院学习次数达到50次
        ["unlockId"]="361",["questType"]=502,["openType"]="bookroom",["value"]=50,["reward"]="6_1030_1",
    },
    ["361"]={       ----技能升级----门客技能升级次数达150次
        ["unlockId"]="362",["questType"]=205,["openType"]="servant",["value"]=150,["reward"]="6_1551_1",
    },
    ["362"]={       ----衙门出战----衙门出战55次
        ["unlockId"]="363",["questType"]=601,["openType"]="atkrace",["value"]=55,["reward"]="2_1_1000000",
    },
    ["363"]={       ----升级门客----至少10名门客等级达150级
        ["unlockId"]="364",["questType"]=202,["openType"]="servant",["need"]=150,["value"]=10,["reward"]="6_1020_1|6_1030_1",
    },
    ["364"]={       ----游历寻访----寻访次数达450次
        ["unlockId"]="365",["questType"]=303,["openType"]="search",["value"]=450,["reward"]="6_1301_2",
    },
    ["365"]={       ----随机传唤----随机传唤红颜次数达400次
        ["unlockId"]="366",["questType"]=301,["openType"]="wife",["value"]=400,["reward"]="6_1303_2",
    },
    ["366"]={       ----红颜技能----升级红颜技能180次
        ["unlockId"]="367",["questType"]=305,["openType"]="wife",["value"]=180,["reward"]="6_1354_1|6_1353_1",
    },
    ["367"]={       ----联盟建设----联盟建设次数达6次
        ["unlockId"]="368",["questType"]=703,["openType"]="alliance",["value"]=6,["reward"]="2_1_1000000",
    },
    ["368"]={       ----联盟等级----所在联盟等级达2级
        ["unlockId"]="369",["questType"]=702,["openType"]="alliance",["value"]=2,["reward"]="6_1301_3|6_1302_3|6_1303_3",
    },
    ["369"]={       ----捉拿上官修----累计关卡战斗胜利2337次
        ["unlockId"]="370",["questType"]=106,["openType"]="challenge",["value"]=2337,["reward"]="2_1_1000000",
    },
    ["370"]={       ----升级门客----至少1名门客等级达200级
        ["unlockId"]="371",["questType"]=202,["openType"]="servant",["need"]=200,["value"]=1,["reward"]="6_1020_1|6_1030_1",
    },
    ["371"]={       ----喜结良缘----联姻次数达12次
        ["unlockId"]="372",["questType"]=403,["openType"]="adult",["value"]=12,["reward"]="6_1004_1",
    },
    ["372"]={       ----严惩贪官----惩罚犯人次数达1000次
        ["unlockId"]="373",["questType"]=116,["openType"]="prison",["value"]=1000,["reward"]="6_1102_2",
    },
    ["373"]={       ----处理政务----处理政务次数达400次
        ["unlockId"]="374",["questType"]=104,["openType"]="affair",["value"]=400,["reward"]="6_1101_5",
    },
    ["374"]={       ----养精蓄锐----经营商产次数达750次
        ["unlockId"]="375",["questType"]=101,["openType"]="manage",["value"]=750,["reward"]="2_1_1000000",
    },
    ["375"]={       ----五谷丰登----经营农产次数达750次
        ["unlockId"]="376",["questType"]=102,["openType"]="manage",["value"]=750,["reward"]="3_1_1000000",
    },
    ["376"]={       ----兵甲富足----招募士兵次数达750次
        ["unlockId"]="377",["questType"]=103,["openType"]="manage",["value"]=750,["reward"]="4_1_1000000",
    },
    ["377"]={       ----升级门客----至少2名门客等级达200级
        ["unlockId"]="378",["questType"]=202,["openType"]="servant",["need"]=200,["value"]=2,["reward"]="6_1020_1|6_1030_1",
    },
    ["378"]={       ----书院学习----书院学习次数达60次
        ["unlockId"]="379",["questType"]=502,["openType"]="bookroom",["value"]=60,["reward"]="6_1030_1",
    },
    ["379"]={       ----技能升级----门客技能升级次数达210次
        ["unlockId"]="380",["questType"]=205,["openType"]="servant",["value"]=210,["reward"]="6_1551_1",
    },
    ["380"]={       ----衙门出战----衙门出战60次
        ["unlockId"]="381",["questType"]=601,["openType"]="atkrace",["value"]=60,["reward"]="2_1_1000000",
    },
    ["381"]={       ----游历寻访----寻访次数达500次
        ["unlockId"]="382",["questType"]=303,["openType"]="search",["value"]=500,["reward"]="6_1301_2",
    },
    ["382"]={       ----随机传唤----随机传唤红颜次数达450次
        ["unlockId"]="383",["questType"]=301,["openType"]="wife",["value"]=450,["reward"]="6_1303_2",
    },
    ["383"]={       ----红颜技能----升级红颜技能220次
        ["unlockId"]="384",["questType"]=305,["openType"]="wife",["value"]=220,["reward"]="6_1354_1|6_1353_1",
    },
    ["384"]={       ----联盟建设----联盟建设次数达7次
        ["unlockId"]="385",["questType"]=703,["openType"]="alliance",["value"]=7,["reward"]="2_1_1000000",
    },
    ["385"]={       ----一头雾水----累计关卡战斗胜利2378次
        ["unlockId"]="386",["questType"]=106,["openType"]="challenge",["value"]=2378,["reward"]="2_1_1000000",
    },
    ["386"]={       ----升级门客----至少3名门客等级达200级
        ["unlockId"]="387",["questType"]=202,["openType"]="servant",["need"]=200,["value"]=3,["reward"]="6_1020_1|6_1030_1",
    },
    ["387"]={       ----严惩贪官----惩罚犯人次数达1200次
        ["unlockId"]="388",["questType"]=116,["openType"]="prison",["value"]=1200,["reward"]="6_1102_2",
    },
    ["388"]={       ----处理政务----处理政务次数达500次
        ["unlockId"]="389",["questType"]=104,["openType"]="affair",["value"]=500,["reward"]="6_1101_5",
    },
    ["389"]={       ----养精蓄锐----经营商产次数达850次
        ["unlockId"]="390",["questType"]=101,["openType"]="manage",["value"]=850,["reward"]="2_1_1000000",
    },
    ["390"]={       ----五谷丰登----经营农产次数达850次
        ["unlockId"]="391",["questType"]=102,["openType"]="manage",["value"]=850,["reward"]="3_1_1000000",
    },
    ["391"]={       ----兵甲富足----招募士兵次数达850次
        ["unlockId"]="392",["questType"]=103,["openType"]="manage",["value"]=850,["reward"]="4_1_1000000",
    },
    ["392"]={       ----书院学习----书院学习次数达100次
        ["unlockId"]="393",["questType"]=502,["openType"]="bookroom",["value"]=100,["reward"]="6_1030_1",
    },
    ["393"]={       ----技能升级----门客技能升级次数达270次
        ["unlockId"]="394",["questType"]=205,["openType"]="servant",["value"]=270,["reward"]="6_1551_1",
    },
    ["394"]={       ----衙门出战----衙门出战80次
        ["unlockId"]="395",["questType"]=601,["openType"]="atkrace",["value"]=80,["reward"]="2_1_1000000",
    },
    ["395"]={       ----游历寻访----寻访次数达600次
        ["unlockId"]="396",["questType"]=303,["openType"]="search",["value"]=600,["reward"]="6_1301_2",
    },
    ["396"]={       ----随机传唤----随机传唤红颜次数达520次
        ["unlockId"]="397",["questType"]=301,["openType"]="wife",["value"]=520,["reward"]="6_1303_2",
    },
    ["397"]={       ----红颜技能----升级红颜技能280次
        ["unlockId"]="398",["questType"]=305,["openType"]="wife",["value"]=280,["reward"]="6_1354_1|6_1353_1",
    },
    ["398"]={       ----联盟建设----联盟建设次数达8次
        ["unlockId"]="399",["questType"]=703,["openType"]="alliance",["value"]=8,["reward"]="2_1_1000000",
    },
    ["399"]={       ----升级门客----至少4名门客等级达200级
        ["unlockId"]="400",["questType"]=202,["openType"]="servant",["need"]=200,["value"]=4,["reward"]="6_1020_1|6_1030_1",
    },
    ["400"]={       ----恼羞成怒----累计关卡战斗胜利2419次
        ["unlockId"]="401",["questType"]=106,["openType"]="challenge",["value"]=2419,["reward"]="2_1_1000000",
    },
    ["401"]={       ----严惩贪官----惩罚犯人次数达1400次
        ["unlockId"]="402",["questType"]=116,["openType"]="prison",["value"]=1400,["reward"]="6_1102_2",
    },
    ["402"]={       ----处理政务----处理政务次数达600次
        ["unlockId"]="403",["questType"]=104,["openType"]="affair",["value"]=600,["reward"]="6_1101_5",
    },
    ["403"]={       ----养精蓄锐----经营商产次数达1000次
        ["unlockId"]="404",["questType"]=101,["openType"]="manage",["value"]=1000,["reward"]="2_1_1000000",
    },
    ["404"]={       ----五谷丰登----经营农产次数达1000次
        ["unlockId"]="405",["questType"]=102,["openType"]="manage",["value"]=1000,["reward"]="3_1_1000000",
    },
    ["405"]={       ----兵甲富足----招募士兵次数达1000次
        ["unlockId"]="406",["questType"]=103,["openType"]="manage",["value"]=1000,["reward"]="4_1_1000000",
    },
    ["406"]={       ----书院学习----书院学习次数达150次
        ["unlockId"]="407",["questType"]=502,["openType"]="bookroom",["value"]=150,["reward"]="6_1030_1",
    },
    ["407"]={       ----技能升级----门客技能升级次数达350次
        ["unlockId"]="408",["questType"]=205,["openType"]="servant",["value"]=350,["reward"]="6_1551_1",
    },
    ["408"]={       ----衙门出战----衙门出战100次
        ["unlockId"]="409",["questType"]=601,["openType"]="atkrace",["value"]=100,["reward"]="2_1_1000000",
    },
    ["409"]={       ----游历寻访----寻访次数达700次
        ["unlockId"]="410",["questType"]=303,["openType"]="search",["value"]=700,["reward"]="6_1301_2",
    },
    ["410"]={       ----随机传唤----随机传唤红颜次数达600次
        ["unlockId"]="411",["questType"]=301,["openType"]="wife",["value"]=600,["reward"]="6_1303_2",
    },
    ["411"]={       ----红颜技能----升级红颜技能350次
        ["unlockId"]="412",["questType"]=305,["openType"]="wife",["value"]=350,["reward"]="6_1354_1|6_1353_1",
    },
    ["412"]={       ----上官修的底牌----累计关卡战斗胜利2460次
        ["unlockId"]="413",["questType"]=106,["openType"]="challenge",["value"]=2460,["reward"]="2_1_1000000",
    },
    ["413"]={       ----升官发财----官品等级达正六品8
        ["unlockId"]="414",["questType"]=105,["openType"]="level",["value"]=8,["reward"]="6_1301_5|6_1302_5|6_1303_5",
    },
    ["414"]={       ----升级门客----至少5名门客等级达200级
        ["unlockId"]="415",["questType"]=202,["openType"]="servant",["need"]=200,["value"]=5,["reward"]="6_1020_1|6_1030_1",
    },
    ["415"]={       ----势不可挡----势力达到2000000
        ["questType"]=107,["openType"]="servant",["value"]=2000000,["reward"]="6_1150_1",
    },
}
return mainTaskCfg

﻿--商店配置
local shopCfg={
      --sheetType  类型  1.热卖  2.道具  3：礼包
      --shopGiftName  礼包名字ID
      --limit  购买限制 {限制类型，限制数量}  限制类型：-1 无限制 1 日限制 2 周限制  限制数量：-1 无限制 x 限制的具体数量
      --sortId  显示顺序 
      --preCost  道具原价
      --buyCost  实际购买的价格
      --discount  折扣
      --needVip  购买所需Vip等级
      --content  内容和数量
    
    [0]={
        ["3001"]={       ----新手礼包
            ["sheetType"]=3,["shopGiftName"]=1,["limit"]={1,100},["sortId"]=3001,["preCost"]=576,["buyCost"]=288,["discount"]=0.5,["needVip"]=1,["content"]="6_1201_1|6_1206_1|6_1005_1|6_1006_1",
        },
    },
    [1]={
        ["3001"]={       ----新手礼包
            ["sheetType"]=3,["shopGiftName"]=2,["limit"]={1,100},["sortId"]=3001,["preCost"]=576,["buyCost"]=288,["discount"]=0.5,["content"]="6_1201_1|6_1206_1|6_1005_1|6_1006_1",
        },
        ["3002"]={       ----潜力礼包
            ["sheetType"]=3,["shopGiftName"]=3,["limit"]={1,100},["sortId"]=3002,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1803_1|6_1201_1|6_1206_1|6_1001_10|6_1003_10|6_1005_3|6_1006_3",
        },
        ["3003"]={       ----超级潜力礼包
            ["sheetType"]=3,["shopGiftName"]=4,["limit"]={1,100},["sortId"]=3003,["preCost"]=3776,["buyCost"]=1888,["discount"]=0.5,["content"]="6_1150_3|6_1803_2|6_1001_50|6_1003_50|6_1202_2|6_1203_2|6_1204_2|6_1205_2",
        },
        ["3004"]={       ----家宴礼包
            ["sheetType"]=3,["shopGiftName"]=5,["limit"]={1,1},["sortId"]=3004,["preCost"]=970,["buyCost"]=388,["discount"]=0.4,["needVip"]=1,["content"]="6_1501_5|6_1502_5|6_1090_1|6_1301_1|6_1302_1|6_1303_1",
        },
    },
    [2]={
        ["3001"]={       ----冲榜礼包
            ["sheetType"]=3,["shopGiftName"]=6,["limit"]={1,50},["sortId"]=3001,["preCost"]=776,["buyCost"]=388,["discount"]=0.5,["content"]="6_1001_20|6_1005_5|6_1203_1|6_1208_1",
        },
        ["3002"]={       ----豪华礼包
            ["sheetType"]=3,["shopGiftName"]=7,["limit"]={1,50},["sortId"]=3002,["preCost"]=3376,["buyCost"]=1688,["discount"]=0.5,["content"]="6_1150_1|6_1152_1|6_1001_70|6_1003_70|6_1010_1|6_1218_1|6_1203_1|6_1208_1",
        },
    },
    [3]={
        ["3001"]={       ----升级礼包
            ["sheetType"]=3,["shopGiftName"]=8,["limit"]={1,100},["sortId"]=0,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1010_1|6_1005_5|6_1006_5",
        },
        ["3002"]={       ----帮会礼包
            ["sheetType"]=3,["shopGiftName"]=9,["limit"]={1,100},["sortId"]=0,["preCost"]=4444,["buyCost"]=2222,["discount"]=0.5,["content"]="6_1151_1|6_1152_1|6_1153_1|6_1154_1|6_1216_1|6_1201_1|6_1001_50|6_1003_50",
        },
    },
    [4]={
        ["3001"]={       ----冲榜礼包
            ["sheetType"]=3,["shopGiftName"]=10,["limit"]={1,50},["sortId"]=3001,["preCost"]=1552,["buyCost"]=388,["discount"]=0.25,["content"]="6_1006_5|6_1205_1|6_1210_1|6_1003_20",
        },
        ["3002"]={       ----魅力礼包
            ["sheetType"]=3,["shopGiftName"]=11,["limit"]={1,50},["sortId"]=3002,["preCost"]=8440,["buyCost"]=1688,["discount"]=0.2,["content"]="6_1150_1|6_1154_1|6_1010_1|6_1220_1|6_1205_1|6_1210_1|6_1001_70|6_1003_70",
        },
    },
    [5]={
        ["3001"]={       ----战力礼包
            ["sheetType"]=3,["shopGiftName"]=12,["limit"]={1,100},["sortId"]=3001,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1803_1|6_1201_1|6_1001_50|6_1003_50",
        },
        ["3002"]={       ----衙门冲榜礼包
            ["sheetType"]=3,["shopGiftName"]=13,["limit"]={1,100},["sortId"]=3002,["preCost"]=5976,["buyCost"]=2988,["discount"]=0.5,["content"]="6_1150_5|6_1803_2|6_1552_1|6_1020_5|6_1030_5|6_1216_1|6_1216_1|6_1216_1",
        },
    },
    [6]={
        ["3001"]={       ----提升礼包
            ["sheetType"]=3,["shopGiftName"]=14,["limit"]={1,1},["sortId"]=3001,["preCost"]=776,["buyCost"]=388,["discount"]=0.5,["content"]="6_1101_1|6_1204_1|6_1209_1|6_1001_50",
        },
        ["3002"]={       ----晋升礼包
            ["sheetType"]=3,["shopGiftName"]=15,["limit"]={1,1},["sortId"]=3002,["preCost"]=2576,["buyCost"]=1288,["discount"]=0.5,["content"]="6_1150_1|6_1153_1|6_1101_5|6_1010_1|6_1302_1|6_1219_1|6_1204_1|6_1209_1",
        },
    },
    [7]={
        ["3001"]={       ----新手亲密礼包
            ["sheetType"]=3,["shopGiftName"]=16,["limit"]={1,100},["sortId"]=3001,["preCost"]=2576,["buyCost"]=1288,["discount"]=0.5,["content"]="6_1150_2|6_1803_1|6_1352_10|6_1354_10",
        },
        ["3002"]={       ----亲密冲榜礼包
            ["sheetType"]=3,["shopGiftName"]=17,["limit"]={1,100},["sortId"]=3002,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_4|6_1804_1|6_1803_1|6_1010_1|6_1352_40|6_1354_40|6_1351_20|6_1353_20",
        },
        ["3003"]={       ----亲密幸运礼包
            ["sheetType"]=3,["shopGiftName"]=29,["limit"]={1,5},["sortId"]=3003,["preCost"]=480,["buyCost"]=288,["discount"]=0.6,["content"]="6_1361_1|6_1362_1|6_1302_1|6_1206_1",
        },
    },
    [8]={
        ["3001"]={       ----小补给包
            ["sheetType"]=3,["shopGiftName"]=18,["limit"]={1,100},["sortId"]=3001,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1001_100|6_1002_100|6_1003_100",
        },
        ["3002"]={       ----大补给包
            ["sheetType"]=3,["shopGiftName"]=19,["limit"]={1,100},["sortId"]=3002,["preCost"]=4776,["buyCost"]=2388,["discount"]=0.5,["content"]="6_1151_1|6_1152_1|6_1153_1|6_1154_1|6_1217_1|6_1218_1|6_1219_1|6_1220_1",
        },
    },
    [9]={
        ["3001"]={       ----新手礼包
            ["sheetType"]=3,["shopGiftName"]=20,["limit"]={1,100},["sortId"]=3001,["preCost"]=576,["buyCost"]=288,["discount"]=0.5,["content"]="6_1201_1|6_1206_1|6_1005_1|6_1006_1",
        },
        ["3002"]={       ----潜力礼包
            ["sheetType"]=3,["shopGiftName"]=21,["limit"]={1,100},["sortId"]=3002,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1803_1|6_1201_1|6_1206_1|6_1001_10|6_1003_10|6_1005_3|6_1006_3",
        },
        ["3003"]={       ----超级潜力礼包
            ["sheetType"]=3,["shopGiftName"]=22,["limit"]={1,100},["sortId"]=3003,["preCost"]=3776,["buyCost"]=1888,["discount"]=0.5,["content"]="6_1150_3|6_1803_2|6_1001_50|6_1003_50|6_1202_2|6_1203_2|6_1204_2|6_1205_2",
        },
        ["3004"]={       ----家宴礼包
            ["sheetType"]=3,["shopGiftName"]=23,["limit"]={1,1},["sortId"]=3004,["preCost"]=970,["buyCost"]=388,["discount"]=0.4,["needVip"]=1,["content"]="6_1501_5|6_1502_5|6_1090_1|6_1301_1|6_1302_1|6_1303_1",
        },
    },
    [10]={
        ["3001"]={       ----增强版2--1
            ["sheetType"]=3,["shopGiftName"]=24,["limit"]={1,100},["sortId"]=3001,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_4|6_1804_1|6_1803_1|6_1302_5|6_1352_40|6_1354_40|6_1351_20|6_1353_20",
        },
        ["3002"]={       ----亲密幸运礼包
            ["sheetType"]=3,["shopGiftName"]=29,["limit"]={1,5},["sortId"]=3002,["preCost"]=480,["buyCost"]=288,["discount"]=0.6,["content"]="6_1361_1|6_1362_1|6_1302_1|6_1206_1",
        },
    },
    [11]={
        ["3001"]={       ----增强版3--1
            ["sheetType"]=3,["shopGiftName"]=25,["limit"]={1,100},["sortId"]=3001,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_4|6_1020_4|6_1010_1|6_1090_1|6_1216_3|6_1201_5|6_1001_60|6_1003_60",
        },
    },
    [12]={
        ["3001"]={       ----增强版4--1
            ["sheetType"]=3,["shopGiftName"]=26,["limit"]={1,100},["sortId"]=3001,["preCost"]=2576,["buyCost"]=1288,["discount"]=0.5,["content"]="6_1150_2|6_1552_1|6_1803_1|6_1802_1",
        },
        ["3002"]={       ----增强版4--2
            ["sheetType"]=3,["shopGiftName"]=27,["limit"]={1,100},["sortId"]=3002,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_5|6_1804_1|6_1803_1|6_1552_2|6_1030_5|6_1216_5|6_1201_5|6_1206_5",
        },
        ["3003"]={       ----增强版4--3
            ["sheetType"]=3,["shopGiftName"]=28,["limit"]={1,100},["sortId"]=3003,["preCost"]=3376,["buyCost"]=1688,["discount"]=0.5,["content"]="6_1150_1|6_1154_1|6_1010_1|6_1220_1|6_1205_1|6_1210_1|6_1006_10|6_1003_70",
        },
    },
    [13]={
        ["3001"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=26,["limit"]={1,100},["sortId"]=3001,["preCost"]=2576,["buyCost"]=1288,["discount"]=0.5,["content"]="6_1150_2|6_1552_1|6_1803_1|6_1802_1",
        },
        ["3002"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=27,["limit"]={1,100},["sortId"]=3002,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_5|6_1804_1|6_1803_1|6_1552_2|6_1030_5|6_1216_5|6_1201_5|6_1206_5",
        },
        ["3003"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=28,["limit"]={1,100},["sortId"]=3003,["preCost"]=3376,["buyCost"]=1688,["discount"]=0.5,["content"]="6_1150_1|6_1154_1|6_1010_1|6_1220_1|6_1205_1|6_1210_1|6_1006_10|6_1003_70",
        },
    },
    [14]={
        ["3001"]={       ----新手礼包
            ["sheetType"]=3,["shopGiftName"]=20,["limit"]={1,100},["sortId"]=3001,["preCost"]=576,["buyCost"]=288,["discount"]=0.5,["content"]="6_1201_1|6_1206_1|6_1005_1|6_1006_1",
        },
        ["3002"]={       ----潜力礼包
            ["sheetType"]=3,["shopGiftName"]=21,["limit"]={1,100},["sortId"]=3002,["preCost"]=1776,["buyCost"]=888,["discount"]=0.5,["content"]="6_1150_1|6_1803_1|6_1201_1|6_1206_1|6_1001_10|6_1003_10|6_1005_3|6_1006_3",
        },
        ["3003"]={       ----超级潜力礼包
            ["sheetType"]=3,["shopGiftName"]=22,["limit"]={1,100},["sortId"]=3003,["preCost"]=3776,["buyCost"]=1888,["discount"]=0.5,["content"]="6_1150_3|6_1803_2|6_1001_50|6_1003_50|6_1202_2|6_1203_2|6_1204_2|6_1205_2",
        },
        ["3004"]={       ----家宴礼包
            ["sheetType"]=3,["shopGiftName"]=23,["limit"]={1,1},["sortId"]=3004,["preCost"]=970,["buyCost"]=388,["discount"]=0.4,["needVip"]=1,["content"]="6_1501_5|6_1502_5|6_1090_1|6_1301_1|6_1302_1|6_1303_1",
        },
    },
    [15]={
        ["3001"]={       ----增强版2--1
            ["sheetType"]=3,["shopGiftName"]=24,["limit"]={1,100},["sortId"]=3001,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_4|6_1804_1|6_1803_1|6_1302_5|6_1352_40|6_1354_40|6_1351_20|6_1353_20",
        },
        ["3002"]={       ----亲密幸运礼包
            ["sheetType"]=3,["shopGiftName"]=29,["limit"]={1,5},["sortId"]=3002,["preCost"]=480,["buyCost"]=288,["discount"]=0.6,["content"]="6_1361_1|6_1362_1|6_1302_1|6_1206_1",
        },
    },
    [16]={
        ["3001"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=26,["limit"]={1,100},["sortId"]=3001,["preCost"]=2576,["buyCost"]=1288,["discount"]=0.5,["content"]="6_1150_2|6_1552_1|6_1803_1|6_1802_1",
        },
        ["3002"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=27,["limit"]={1,100},["sortId"]=3002,["preCost"]=5776,["buyCost"]=2888,["discount"]=0.5,["content"]="6_1150_5|6_1804_1|6_1803_1|6_1552_2|6_1030_5|6_1216_5|6_1201_5|6_1206_5",
        },
        ["3003"]={       ----擂台冲榜--跨服资格
            ["sheetType"]=3,["shopGiftName"]=28,["limit"]={1,100},["sortId"]=3003,["preCost"]=3376,["buyCost"]=1688,["discount"]=0.5,["content"]="6_1150_1|6_1154_1|6_1010_1|6_1220_1|6_1205_1|6_1210_1|6_1006_10|6_1003_70",
        },
    },
}
return shopCfg

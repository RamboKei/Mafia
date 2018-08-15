--【韩国】称号配置
local titleCfg={
      --type  类型  3：时装
      --isTitle  类型标识  1：称号 2：头像框
      --titleType  称号类型  1：帝 2：王 3：公 4：侯
      --unlock  是否开放  1：开放  0：不开放
      --isCross  是否跨服  1：跨服 0：不跨服
      --quality  品质
      --sortId  排序
      --isOnly  是否唯一  唯一的称号，在他人获得时，会取缔上一个获得者
      --effect1  效果值1  角色的武力、智力、政治、魅力各增加X
      --effect2  效果值2  角色的武力、智力、政治、魅力各增加X%
    
    ["3000"]={       ----武帝委任状----使用后获得称号【武帝】
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=1,["isCross"]=1,["quality"]=7,["sortId"]=7,["isOnly"]=1,
    },
    ["3001"]={       ----摄政王委任状----使用后获得称号【摄政王】
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=12,["isOnly"]=1,
    },
    ["3002"]={       ----文宣王委任状----使用后获得称号【文宣王】
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=13,["isOnly"]=1,
    },
    ["3003"]={       ----平西王委任状----使用后获得称号【平西王】
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=14,["isOnly"]=1,
    },
    ["3004"]={       ----镇南王委任状----使用后获得称号【镇南王】
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=15,["isOnly"]=1,
    },
    ["3005"]={       ----武成王委任状----使用后获得称号【武成王】
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=16,["isOnly"]=1,
    },
    ["3006"]={       ----武成公委任状----使用后获得称号【武成公】
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=51,["isOnly"]=0,
    },
    ["3007"]={       ----富国公委任状----使用后获得称号【富国公】
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=52,["isOnly"]=0,
    },
    ["3008"]={       ----政国公委任状----使用后获得称号【政国公】
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=53,["isOnly"]=0,
    },
    ["3009"]={       ----护国公委任状----使用后获得称号【护国公】
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=54,["isOnly"]=0,
    },
    ["3010"]={       ----贤国公委任状----使用后获得称号【贤国公】
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=55,["isOnly"]=0,
    },
    ["3101"]={       ----千古一帝委任状----获得【千古一帝】称号
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=1,["isOnly"]=1,
    },
    ["3102"]={       ----仁帝委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=2,["isOnly"]=1,
    },
    ["3103"]={       ----政帝委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=3,["isOnly"]=1,
    },
    ["3104"]={       ----礼帝委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=4,["isOnly"]=1,
    },
    ["3105"]={       ----文帝委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=5,["isOnly"]=1,
    },
    ["3106"]={       ----义帝委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=1,["quality"]=7,["sortId"]=6,["isOnly"]=1,
    },
    ["3201"]={       ----真龙天子委任状----获得【真龙天子】称号
        ["type"]=3,["isTitle"]=1,["titleType"]=1,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=11,["isOnly"]=1,
    },
    ["3202"]={       ----靖安王委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=17,["isOnly"]=1,
    },
    ["3203"]={       ----八贤王委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=18,["isOnly"]=1,
    },
    ["3204"]={       ----逍遥王委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=19,["isOnly"]=1,
    },
    ["3205"]={       ----宣烈王委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=20,["isOnly"]=1,
    },
    ["3301"]={       ----逍遥公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=56,["isOnly"]=0,
    },
    ["3302"]={       ----八贤公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=57,["isOnly"]=0,
    },
    ["3303"]={       ----靖安公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=58,["isOnly"]=0,
    },
    ["3304"]={       ----辅政公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=60,["isOnly"]=1,
    },
    ["3305"]={       ----文渊公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=61,["isOnly"]=1,
    },
    ["3306"]={       ----定西公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=62,["isOnly"]=1,
    },
    ["3307"]={       ----定南公委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=3,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=63,["isOnly"]=1,
    },
    ["3401"]={       ----佐政侯委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=4,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=64,["isOnly"]=1,
    },
    ["3402"]={       ----文博侯委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=4,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=101,["isOnly"]=1,
    },
    ["3403"]={       ----安西侯委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=4,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=102,["isOnly"]=1,
    },
    ["3404"]={       ----安南侯委任状----
        ["type"]=3,["isTitle"]=1,["titleType"]=4,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=103,["isOnly"]=1,
    },
    ["3801"]={       ----江湖侠士委任状----
        ["type"]=3,["isTitle"]=1,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=104,["isOnly"]=0,
    },
    ["4001"]={       ----贵族金框----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=1,["isCross"]=0,["quality"]=7,["sortId"]=1001,["effect1"]=2500,["effect2"]=0.01,
    },
    ["4002"]={       ----春季庆典----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=1005,["effect1"]=20000,
    },
    ["4003"]={       ----声名鹊起----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=1004,["effect1"]=10000,
    },
    ["4004"]={       ----大唐盛世----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=1002,["effect1"]=10000,["effect2"]=0.01,
    },
    ["4005"]={       ----劳动先锋----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=0,["isCross"]=0,["quality"]=6,["sortId"]=1006,["effect1"]=20000,
    },
    ["4006"]={       ----真龙天子----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=0,["isCross"]=0,["quality"]=7,["sortId"]=1003,
    },
    ["4007"]={       ----端午龙舟----默认使用
        ["type"]=3,["isTitle"]=2,["unlock"]=1,["isCross"]=0,["quality"]=6,["sortId"]=1007,["effect1"]=20000,
    },
}
return titleCfg

--声望进度配置
local prestigeCfg={
      --isSpecial  1:大点  0：小点
      --prestige  达到这个进度所需要的名望
      --position  坐标
      --addType  属性增加的类型  1：武力 2：智力 3：政治 4：魅力   增加人物属性，不受皮肤、称号的加成影响。
      --effect  属性增加的值
      --canEmperor  是否具备称帝资格竞拍的资格  1：可参与竞拍  0：不可参与
      --getReward  达到进度的奖励
    [1]={       ----激活1
        ["isSpecial"]=0,["prestige"]=40,["position"]={130,830},["addType"]={1},["effect"]=200,
    },
    [2]={       ----激活2
        ["isSpecial"]=0,["prestige"]=80,["position"]={118,970},["addType"]={2},["effect"]=200,
    },
    [3]={       ----激活3
        ["isSpecial"]=0,["prestige"]=120,["position"]={244,969},["addType"]={3},["effect"]=200,
    },
    [4]={       ----激活4
        ["isSpecial"]=0,["prestige"]=160,["position"]={312,1015},["addType"]={4},["effect"]=200,
    },
    [5]={       ----激活5
        ["isSpecial"]=1,["prestige"]=200,["position"]={398,953},["getReward"]="11_4003_1",
    },
    [6]={       ----激活6
        ["isSpecial"]=0,["prestige"]=240,["position"]={583,908},["addType"]={1},["effect"]=200,
    },
    [7]={       ----激活7
        ["isSpecial"]=0,["prestige"]=280,["position"]={485,817},["addType"]={2},["effect"]=200,
    },
    [8]={       ----激活8
        ["isSpecial"]=0,["prestige"]=320,["position"]={557,772},["addType"]={3},["effect"]=200,
    },
    [9]={       ----激活9
        ["isSpecial"]=0,["prestige"]=360,["position"]={509,626},["addType"]={4},["effect"]=200,
    },
    [10]={       ----激活10
        ["isSpecial"]=1,["prestige"]=400,["position"]={345,563},["getReward"]="16_1012_1",
    },
    [11]={       ----激活11
        ["isSpecial"]=0,["prestige"]=460,["position"]={225,550},["addType"]={1},["effect"]=200,
    },
    [12]={       ----激活12
        ["isSpecial"]=0,["prestige"]=520,["position"]={279,454},["addType"]={2},["effect"]=200,
    },
    [13]={       ----激活13
        ["isSpecial"]=0,["prestige"]=580,["position"]={132,426},["addType"]={3},["effect"]=200,
    },
    [14]={       ----激活14
        ["isSpecial"]=0,["prestige"]=640,["position"]={206,326},["addType"]={4},["effect"]=200,
    },
    [15]={       ----激活15
        ["isSpecial"]=1,["prestige"]=700,["position"]={101,206},["getReward"]="11_3801_1",
    },
    [16]={       ----激活16
        ["isSpecial"]=0,["prestige"]=760,["position"]={107,106},["addType"]={1},["effect"]=200,
    },
    [17]={       ----激活17
        ["isSpecial"]=0,["prestige"]=820,["position"]={259,84},["addType"]={2},["effect"]=200,
    },
    [18]={       ----激活18
        ["isSpecial"]=0,["prestige"]=880,["position"]={371,193},["addType"]={3},["effect"]=200,
    },
    [19]={       ----激活19
        ["isSpecial"]=0,["prestige"]=940,["position"]={499,202},["addType"]={4},["effect"]=200,
    },
    [20]={       ----激活20
        ["isSpecial"]=1,["prestige"]=1000,["position"]={514,34},["canEmperor"]=1,
    },
    [21]={       ----激活21
        ["isSpecial"]=0,["prestige"]=1200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [22]={       ----激活22
        ["isSpecial"]=0,["prestige"]=1400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [23]={       ----激活23
        ["isSpecial"]=0,["prestige"]=1600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [24]={       ----激活24
        ["isSpecial"]=0,["prestige"]=1800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [25]={       ----激活25
        ["isSpecial"]=1,["prestige"]=2000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [26]={       ----激活26
        ["isSpecial"]=0,["prestige"]=2200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [27]={       ----激活27
        ["isSpecial"]=0,["prestige"]=2400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [28]={       ----激活28
        ["isSpecial"]=0,["prestige"]=2600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [29]={       ----激活29
        ["isSpecial"]=0,["prestige"]=2800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [30]={       ----激活30
        ["isSpecial"]=1,["prestige"]=3000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [31]={       ----激活31
        ["isSpecial"]=0,["prestige"]=3200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [32]={       ----激活32
        ["isSpecial"]=0,["prestige"]=3400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [33]={       ----激活33
        ["isSpecial"]=0,["prestige"]=3600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [34]={       ----激活34
        ["isSpecial"]=0,["prestige"]=3800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [35]={       ----激活35
        ["isSpecial"]=1,["prestige"]=4000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [36]={       ----激活36
        ["isSpecial"]=0,["prestige"]=4200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [37]={       ----激活37
        ["isSpecial"]=0,["prestige"]=4400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [38]={       ----激活38
        ["isSpecial"]=0,["prestige"]=4600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [39]={       ----激活39
        ["isSpecial"]=0,["prestige"]=4800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [40]={       ----激活40
        ["isSpecial"]=1,["prestige"]=5000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [41]={       ----激活41
        ["isSpecial"]=0,["prestige"]=5200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [42]={       ----激活42
        ["isSpecial"]=0,["prestige"]=5400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [43]={       ----激活43
        ["isSpecial"]=0,["prestige"]=5600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [44]={       ----激活44
        ["isSpecial"]=0,["prestige"]=5800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [45]={       ----激活45
        ["isSpecial"]=1,["prestige"]=6000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [46]={       ----激活46
        ["isSpecial"]=0,["prestige"]=6200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [47]={       ----激活47
        ["isSpecial"]=0,["prestige"]=6400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [48]={       ----激活48
        ["isSpecial"]=0,["prestige"]=6600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [49]={       ----激活49
        ["isSpecial"]=0,["prestige"]=6800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [50]={       ----激活50
        ["isSpecial"]=1,["prestige"]=7000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [51]={       ----激活51
        ["isSpecial"]=0,["prestige"]=7200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [52]={       ----激活52
        ["isSpecial"]=0,["prestige"]=7400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [53]={       ----激活53
        ["isSpecial"]=0,["prestige"]=7600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [54]={       ----激活54
        ["isSpecial"]=0,["prestige"]=7800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [55]={       ----激活55
        ["isSpecial"]=1,["prestige"]=8000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [56]={       ----激活56
        ["isSpecial"]=0,["prestige"]=8200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [57]={       ----激活57
        ["isSpecial"]=0,["prestige"]=8400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [58]={       ----激活58
        ["isSpecial"]=0,["prestige"]=8600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [59]={       ----激活59
        ["isSpecial"]=0,["prestige"]=8800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [60]={       ----激活60
        ["isSpecial"]=1,["prestige"]=9000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [61]={       ----激活61
        ["isSpecial"]=0,["prestige"]=9200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [62]={       ----激活62
        ["isSpecial"]=0,["prestige"]=9400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [63]={       ----激活63
        ["isSpecial"]=0,["prestige"]=9600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [64]={       ----激活64
        ["isSpecial"]=0,["prestige"]=9800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [65]={       ----激活65
        ["isSpecial"]=1,["prestige"]=10000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [66]={       ----激活66
        ["isSpecial"]=0,["prestige"]=10200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [67]={       ----激活67
        ["isSpecial"]=0,["prestige"]=10400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [68]={       ----激活68
        ["isSpecial"]=0,["prestige"]=10600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [69]={       ----激活69
        ["isSpecial"]=0,["prestige"]=10800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [70]={       ----激活70
        ["isSpecial"]=1,["prestige"]=11000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [71]={       ----激活71
        ["isSpecial"]=0,["prestige"]=11200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [72]={       ----激活72
        ["isSpecial"]=0,["prestige"]=11400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [73]={       ----激活73
        ["isSpecial"]=0,["prestige"]=11600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [74]={       ----激活74
        ["isSpecial"]=0,["prestige"]=11800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [75]={       ----激活75
        ["isSpecial"]=1,["prestige"]=12000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [76]={       ----激活76
        ["isSpecial"]=0,["prestige"]=12200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [77]={       ----激活77
        ["isSpecial"]=0,["prestige"]=12400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [78]={       ----激活78
        ["isSpecial"]=0,["prestige"]=12600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [79]={       ----激活79
        ["isSpecial"]=0,["prestige"]=12800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [80]={       ----激活80
        ["isSpecial"]=1,["prestige"]=13000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [81]={       ----激活81
        ["isSpecial"]=0,["prestige"]=13200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [82]={       ----激活82
        ["isSpecial"]=0,["prestige"]=13400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [83]={       ----激活83
        ["isSpecial"]=0,["prestige"]=13600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [84]={       ----激活84
        ["isSpecial"]=0,["prestige"]=13800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [85]={       ----激活85
        ["isSpecial"]=1,["prestige"]=14000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [86]={       ----激活86
        ["isSpecial"]=0,["prestige"]=14200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [87]={       ----激活87
        ["isSpecial"]=0,["prestige"]=14400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [88]={       ----激活88
        ["isSpecial"]=0,["prestige"]=14600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [89]={       ----激活89
        ["isSpecial"]=0,["prestige"]=14800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [90]={       ----激活90
        ["isSpecial"]=1,["prestige"]=15000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [91]={       ----激活91
        ["isSpecial"]=0,["prestige"]=15200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [92]={       ----激活92
        ["isSpecial"]=0,["prestige"]=15400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [93]={       ----激活93
        ["isSpecial"]=0,["prestige"]=15600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [94]={       ----激活94
        ["isSpecial"]=0,["prestige"]=15800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [95]={       ----激活95
        ["isSpecial"]=1,["prestige"]=16000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [96]={       ----激活96
        ["isSpecial"]=0,["prestige"]=16200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [97]={       ----激活97
        ["isSpecial"]=0,["prestige"]=16400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [98]={       ----激活98
        ["isSpecial"]=0,["prestige"]=16600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [99]={       ----激活99
        ["isSpecial"]=0,["prestige"]=16800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [100]={       ----激活100
        ["isSpecial"]=1,["prestige"]=17000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [101]={       ----激活101
        ["isSpecial"]=0,["prestige"]=17200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [102]={       ----激活102
        ["isSpecial"]=0,["prestige"]=17400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [103]={       ----激活103
        ["isSpecial"]=0,["prestige"]=17600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [104]={       ----激活104
        ["isSpecial"]=0,["prestige"]=17800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [105]={       ----激活105
        ["isSpecial"]=1,["prestige"]=18000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [106]={       ----激活106
        ["isSpecial"]=0,["prestige"]=18200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [107]={       ----激活107
        ["isSpecial"]=0,["prestige"]=18400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [108]={       ----激活108
        ["isSpecial"]=0,["prestige"]=18600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [109]={       ----激活109
        ["isSpecial"]=0,["prestige"]=18800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [110]={       ----激活110
        ["isSpecial"]=1,["prestige"]=19000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [111]={       ----激活111
        ["isSpecial"]=0,["prestige"]=19200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [112]={       ----激活112
        ["isSpecial"]=0,["prestige"]=19400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [113]={       ----激活113
        ["isSpecial"]=0,["prestige"]=19600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [114]={       ----激活114
        ["isSpecial"]=0,["prestige"]=19800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [115]={       ----激活115
        ["isSpecial"]=1,["prestige"]=20000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [116]={       ----激活116
        ["isSpecial"]=0,["prestige"]=20200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [117]={       ----激活117
        ["isSpecial"]=0,["prestige"]=20400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [118]={       ----激活118
        ["isSpecial"]=0,["prestige"]=20600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [119]={       ----激活119
        ["isSpecial"]=0,["prestige"]=20800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [120]={       ----激活120
        ["isSpecial"]=1,["prestige"]=21000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [121]={       ----激活121
        ["isSpecial"]=0,["prestige"]=21200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [122]={       ----激活122
        ["isSpecial"]=0,["prestige"]=21400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [123]={       ----激活123
        ["isSpecial"]=0,["prestige"]=21600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [124]={       ----激活124
        ["isSpecial"]=0,["prestige"]=21800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [125]={       ----激活125
        ["isSpecial"]=1,["prestige"]=22000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [126]={       ----激活126
        ["isSpecial"]=0,["prestige"]=22200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [127]={       ----激活127
        ["isSpecial"]=0,["prestige"]=22400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [128]={       ----激活128
        ["isSpecial"]=0,["prestige"]=22600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [129]={       ----激活129
        ["isSpecial"]=0,["prestige"]=22800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [130]={       ----激活130
        ["isSpecial"]=1,["prestige"]=23000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [131]={       ----激活131
        ["isSpecial"]=0,["prestige"]=23200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [132]={       ----激活132
        ["isSpecial"]=0,["prestige"]=23400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [133]={       ----激活133
        ["isSpecial"]=0,["prestige"]=23600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [134]={       ----激活134
        ["isSpecial"]=0,["prestige"]=23800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [135]={       ----激活135
        ["isSpecial"]=1,["prestige"]=24000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [136]={       ----激活136
        ["isSpecial"]=0,["prestige"]=24200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [137]={       ----激活137
        ["isSpecial"]=0,["prestige"]=24400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [138]={       ----激活138
        ["isSpecial"]=0,["prestige"]=24600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [139]={       ----激活139
        ["isSpecial"]=0,["prestige"]=24800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [140]={       ----激活140
        ["isSpecial"]=1,["prestige"]=25000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [141]={       ----激活141
        ["isSpecial"]=0,["prestige"]=25200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [142]={       ----激活142
        ["isSpecial"]=0,["prestige"]=25400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [143]={       ----激活143
        ["isSpecial"]=0,["prestige"]=25600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [144]={       ----激活144
        ["isSpecial"]=0,["prestige"]=25800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [145]={       ----激活145
        ["isSpecial"]=1,["prestige"]=26000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [146]={       ----激活146
        ["isSpecial"]=0,["prestige"]=26200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [147]={       ----激活147
        ["isSpecial"]=0,["prestige"]=26400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [148]={       ----激活148
        ["isSpecial"]=0,["prestige"]=26600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [149]={       ----激活149
        ["isSpecial"]=0,["prestige"]=26800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [150]={       ----激活150
        ["isSpecial"]=1,["prestige"]=27000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [151]={       ----激活151
        ["isSpecial"]=0,["prestige"]=27200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [152]={       ----激活152
        ["isSpecial"]=0,["prestige"]=27400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [153]={       ----激活153
        ["isSpecial"]=0,["prestige"]=27600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [154]={       ----激活154
        ["isSpecial"]=0,["prestige"]=27800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [155]={       ----激活155
        ["isSpecial"]=1,["prestige"]=28000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [156]={       ----激活156
        ["isSpecial"]=0,["prestige"]=28200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [157]={       ----激活157
        ["isSpecial"]=0,["prestige"]=28400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [158]={       ----激活158
        ["isSpecial"]=0,["prestige"]=28600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [159]={       ----激活159
        ["isSpecial"]=0,["prestige"]=28800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [160]={       ----激活160
        ["isSpecial"]=1,["prestige"]=29000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [161]={       ----激活161
        ["isSpecial"]=0,["prestige"]=29200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [162]={       ----激活162
        ["isSpecial"]=0,["prestige"]=29400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [163]={       ----激活163
        ["isSpecial"]=0,["prestige"]=29600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [164]={       ----激活164
        ["isSpecial"]=0,["prestige"]=29800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [165]={       ----激活165
        ["isSpecial"]=1,["prestige"]=30000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [166]={       ----激活166
        ["isSpecial"]=0,["prestige"]=30200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [167]={       ----激活167
        ["isSpecial"]=0,["prestige"]=30400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [168]={       ----激活168
        ["isSpecial"]=0,["prestige"]=30600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [169]={       ----激活169
        ["isSpecial"]=0,["prestige"]=30800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [170]={       ----激活170
        ["isSpecial"]=1,["prestige"]=31000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [171]={       ----激活171
        ["isSpecial"]=0,["prestige"]=31200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [172]={       ----激活172
        ["isSpecial"]=0,["prestige"]=31400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [173]={       ----激活173
        ["isSpecial"]=0,["prestige"]=31600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [174]={       ----激活174
        ["isSpecial"]=0,["prestige"]=31800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [175]={       ----激活175
        ["isSpecial"]=1,["prestige"]=32000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [176]={       ----激活176
        ["isSpecial"]=0,["prestige"]=32200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [177]={       ----激活177
        ["isSpecial"]=0,["prestige"]=32400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [178]={       ----激活178
        ["isSpecial"]=0,["prestige"]=32600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [179]={       ----激活179
        ["isSpecial"]=0,["prestige"]=32800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [180]={       ----激活180
        ["isSpecial"]=1,["prestige"]=33000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
    [181]={       ----激活181
        ["isSpecial"]=0,["prestige"]=33200,["position"]={543,83},["addType"]={1},["effect"]=500,
    },
    [182]={       ----激活182
        ["isSpecial"]=0,["prestige"]=33400,["position"]={394,151},["addType"]={2},["effect"]=500,
    },
    [183]={       ----激活183
        ["isSpecial"]=0,["prestige"]=33600,["position"]={275,177},["addType"]={3},["effect"]=500,
    },
    [184]={       ----激活184
        ["isSpecial"]=0,["prestige"]=33800,["position"]={134,120},["addType"]={4},["effect"]=500,
    },
    [185]={       ----激活185
        ["isSpecial"]=1,["prestige"]=34000,["position"]={98,261},["addType"]={1,2,3,4},["effect"]=500,
    },
    [186]={       ----激活186
        ["isSpecial"]=0,["prestige"]=34200,["position"]={205,317},["addType"]={1},["effect"]=500,
    },
    [187]={       ----激活187
        ["isSpecial"]=0,["prestige"]=34400,["position"]={119,413},["addType"]={2},["effect"]=500,
    },
    [188]={       ----激活188
        ["isSpecial"]=0,["prestige"]=34600,["position"]={238,438},["addType"]={3},["effect"]=500,
    },
    [189]={       ----激活189
        ["isSpecial"]=0,["prestige"]=34800,["position"]={363,334},["addType"]={4},["effect"]=500,
    },
    [190]={       ----激活190
        ["isSpecial"]=1,["prestige"]=35000,["position"]={342,445},["addType"]={1,2,3,4},["effect"]=500,
    },
    [191]={       ----激活191
        ["isSpecial"]=0,["prestige"]=35200,["position"]={471,440},["addType"]={1},["effect"]=500,
    },
    [192]={       ----激活192
        ["isSpecial"]=0,["prestige"]=35400,["position"]={558,530},["addType"]={2},["effect"]=500,
    },
    [193]={       ----激活193
        ["isSpecial"]=0,["prestige"]=35600,["position"]={414,592},["addType"]={3},["effect"]=500,
    },
    [194]={       ----激活194
        ["isSpecial"]=0,["prestige"]=35800,["position"]={513,628},["addType"]={4},["effect"]=500,
    },
    [195]={       ----激活195
        ["isSpecial"]=1,["prestige"]=36000,["position"]={431,742},["addType"]={1,2,3,4},["effect"]=500,
    },
    [196]={       ----激活196
        ["isSpecial"]=0,["prestige"]=36200,["position"]={305,725},["addType"]={1},["effect"]=500,
    },
    [197]={       ----激活197
        ["isSpecial"]=0,["prestige"]=36400,["position"]={318,871},["addType"]={2},["effect"]=500,
    },
    [198]={       ----激活198
        ["isSpecial"]=0,["prestige"]=36600,["position"]={167,769},["addType"]={3},["effect"]=500,
    },
    [199]={       ----激活199
        ["isSpecial"]=0,["prestige"]=36800,["position"]={118,906},["addType"]={4},["effect"]=500,
    },
    [200]={       ----激活200
        ["isSpecial"]=1,["prestige"]=37000,["position"]={36,780},["addType"]={1,2,3,4},["effect"]=500,
    },
}
return prestigeCfg

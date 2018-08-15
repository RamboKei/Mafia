--官职配置
local levelCfg={
      --exp  所需政绩
      --servant  解锁门客
      --wife  解锁红颜
      --gold  商产上限
      --food  农产上限
      --soldier  士兵上限
      --affair  政务上限
      --gem  每日俸禄
    
    ["1"]={       ----从九品
        ["exp"]=0,["gold"]=3,["food"]=3,["soldier"]=3,["affair"]=3,["gem"]=10,
    },
    ["2"]={       ----正九品
        ["exp"]=240,["servant"]="1006",["wife"]="101",["gold"]=4,["food"]=4,["soldier"]=4,["affair"]=4,["gem"]=20,
    },
    ["3"]={       ----从八品
        ["exp"]=480,["servant"]="1007",["gold"]=5,["food"]=5,["soldier"]=5,["affair"]=5,["gem"]=30,
    },
    ["4"]={       ----正八品
        ["exp"]=720,["servant"]="1008",["gold"]=6,["food"]=6,["soldier"]=6,["affair"]=6,["gem"]=40,
    },
    ["5"]={       ----从七品
        ["exp"]=1200,["servant"]="1009",["gold"]=7,["food"]=7,["soldier"]=7,["affair"]=7,["gem"]=50,
    },
    ["6"]={       ----正七品
        ["exp"]=1920,["servant"]="1010",["gold"]=8,["food"]=8,["soldier"]=8,["affair"]=8,["gem"]=60,
    },
    ["7"]={       ----从六品
        ["exp"]=3120,["servant"]="1011",["gold"]=9,["food"]=9,["soldier"]=9,["affair"]=9,["gem"]=70,
    },
    ["8"]={       ----正六品
        ["exp"]=5520,["servant"]="1012",["gold"]=10,["food"]=10,["soldier"]=10,["affair"]=10,["gem"]=80,
    },
    ["9"]={       ----从五品
        ["exp"]=9600,["servant"]="1013",["gold"]=11,["food"]=11,["soldier"]=11,["affair"]=11,["gem"]=90,
    },
    ["10"]={       ----正五品
        ["exp"]=16800,["servant"]="1014",["gold"]=12,["food"]=12,["soldier"]=12,["affair"]=12,["gem"]=100,
    },
    ["11"]={       ----从四品
        ["exp"]=25680,["servant"]="1015",["gold"]=13,["food"]=13,["soldier"]=13,["affair"]=13,["gem"]=110,
    },
    ["12"]={       ----正四品
        ["exp"]=39500,["servant"]="1016",["gold"]=14,["food"]=14,["soldier"]=14,["affair"]=14,["gem"]=120,
    },
    ["13"]={       ----从三品
        ["exp"]=58800,["servant"]="1017",["gold"]=15,["food"]=15,["soldier"]=15,["affair"]=15,["gem"]=130,
    },
    ["14"]={       ----正三品
        ["exp"]=88200,["servant"]="1018",["gold"]=16,["food"]=16,["soldier"]=16,["affair"]=16,["gem"]=140,
    },
    ["15"]={       ----从二品
        ["exp"]=132300,["servant"]="1019",["gold"]=17,["food"]=17,["soldier"]=17,["affair"]=17,["gem"]=150,
    },
    ["16"]={       ----正二品
        ["exp"]=198450,["servant"]="1020",["gold"]=18,["food"]=18,["soldier"]=18,["affair"]=18,["gem"]=160,
    },
    ["17"]={       ----从一品
        ["exp"]=2026540,["servant"]="1021",["gold"]=19,["food"]=19,["soldier"]=19,["affair"]=19,["gem"]=170,
    },
    ["18"]={       ----正一品
        ["exp"]=4928110,["servant"]="1022",["gold"]=20,["food"]=20,["soldier"]=20,["affair"]=20,["gem"]=180,
    },
}
return levelCfg

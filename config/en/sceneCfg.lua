local sceneCfg={
    npcnameRect={x=0,y=0,w=148,h=30},
    homeScene={
        posCfg={
            affair={x=0,y=657,scale=4,alpha=0},
            adult={x=40,y=412,w=130,h=170,scale=4,alpha=0},
            manage={x=320,y=638,w=150,h=350,touchDown=false,dragonBones={x=54,y=336}},
            wife={x=515,y=515,w=115,h=270,touchDown=false,dragonBones={x=35,y=221}},
            child={x=253,y=559,w=100,h=220,touchDown=false,dragonBones={x=44,y=184}}
        },
        shadowCfg={
            manage={x=319,y=973},
            wife={x=512,y=705},
            child={x=190,y=705}
        },
        namePosCfg={
            managename={x=308,y=608},
            adultname={x=34,y=594},
            affairname={x=22,y=754},
            wifename={x=480,y=486},
            childname={x=216,y=530}
        },
        reddotPosCfg={
            manage={x=442,y=602},
            adult={x=168,y=587},
            affair={x=156,y=748},
            wife={x=587,y=482},
            child={x=349,y=526}
        },
        npcMessageCfg={
            affair={x=299,y=-16,posR=true},
            adult={x=578,y=7,posR=true},
            manage={x=145,y=116,posR=true},
            wife={x=378,y=105},
            child={x=480,y=196}
        },
        guideNeedTouchCfg={
		    manage=1,
            wife=1
	    }
    },
    cityScene={
        posCfg={
            challenge={x=180,y=594,scale=4,alpha=0},
            search={x=468,y=347,scale=4,alpha=0},
            dinner={x=413,y=544,scale=4,alpha=0},
            palace={x=32,y=225,scale=4,alpha=0},
            rank={x=103,y=525,scale=4,alpha=0},
            dailyboss={x=453, y=279,scale=4,alpha=0},
            atkrace={x=328, y=428,scale=4,alpha=0},
            studyatk={x=506, y=462,scale=4,alpha=0},
            alliance={x=469, y=711,scale=4,alpha=0},
            prison={x=251, y=474,scale=4,alpha=0},
            bookroom={x=11, y=426,scale=4,alpha=0},
            conquest={x=0, y=379,scale=4,alpha=0},
            trade={x=355, y=320,scale=4,alpha=0}
        },
        namePosCfg={
            palacename={x=54, y=194},
            dailybossname={x=440, y=242},
            searchname={x=444, y=326},
            studyatkname={x=490, y=450},
            dinnername={x=446, y=550},
            alliancename={x=478, y=728},
            challengename={x=260, y=600},
            rankname={x=110, y=520},
            prisonname={x=234, y=456},
            atkracename={x=336, y=402},
            bookroomname={x=58, y=428},
            conquestname={x=0, y=350},
            tradename={x=316, y=290}
        },
        reddotPosCfg={
            palace={x=161, y=190},
            dailyboss={x=572, y=238},
            search={x=541, y=322},
            studyatk={x=588, y=444},
            dinner={x=554, y=549},
            alliance={x=576, y=725},
            challenge={x=368, y=596},
            rank={x=217, y=518},
            prison={x=332, y=452},
            atkrace={x=434, y=397},
            bookroom={x=166, y=422},
            conquest={x=110, y=346},
            trade={x=425, y=286}
        },
        guideNeedTouchCfg={
            challenge=1
        },
    },
    searchScene={
        buildBgCfg={
            ['1']={x=277,y=842},
            ['2']={x=261,y=717},
            ['3']={x=0,y=662}
        },
        cheCfg={{x=482,y=944},{x=111,y=782},{x=685,y=627.55}},
        posCfg={
            ['1']={x=297,y=410,scale=4,alpha=0},
            ['2']={x=277,y=842,scale=4,alpha=0},
            ['3']={x=0,y=662,scale=4,alpha=0},
            ['4']={x=127,y=360,scale=4,alpha=0},
            ['5']={x=492,y=328,scale=4,alpha=0},
            ['6']={x=189,y=438,scale=4,alpha=0},
            ['7']={x=154,y=536,scale=4,alpha=0},
            ['8']={x=482,y=480,scale=4,alpha=0},
            ['9']={x=260,y=503,scale=4,alpha=0},
            ['10']={x=0,y=425,scale=4,alpha=0},
            ['11']={x=391,y=711,scale=4,alpha=0}
        },
        namePosCfg={
            ['11']={x=434,y=740},
            ['1']={x=268,y=380},
            ['2']={x=330,y=904},
            ['3']={x=22,y=698},
            ['4']={x=104,y=330},
            ['5']={x=474,y=328},
            ['6']={x=174,y=440},
            ['7']={x=142,y=538},
            ['8']={x=488,y=464},
            ['9']={x=290,y=500},
            ['10']={x=0,y=420},
        }
    },
    manageScene={
        posCfg={
            gold={x=20,y=658},
            food={x=388,y=520},
            soldier={x=415,y=855},
            practice={x=123,y=409},
        },
    },
}
return sceneCfg
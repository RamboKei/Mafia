local sceneCfg={
    homeScene={
        posCfg={
            affair={x=0,y=657,scale=4,alpha=0},
            adult={x=40,y=412,w=130,h=170,scale=4,alpha=0},
            manage={x=320,y=638,w=150,h=350,touchDown=false,dragonBones={x=54,y=336}},
            wife={x=515,y=495,w=115,h=270,touchDown=false,dragonBones={x=35,y=221},scale:1.1},
            child={x=253,y=559,w=100,h=220,touchDown=false,dragonBones={x=44,y=184}}
        },
        shadowCfg={
            manage={x=319,y=973},
            wife={x=512,y=705},
            child={x=190,y=705}
        },
        namePosCfg={
            managename={x=430,y=606},
            adultname={x=145,y=475},
            affairname={x=145,y=632},
            wifename={x=579,y=454},
            childname={x=224,y=517}
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
            palacename={x=192, y=195},
            dailybossname={x=443, y=217},
            searchname={x=550, y=320},
            studyatkname={x=603, y=407},
            dinnername={x=440, y=518},
            alliancename={x=491, y=733},
            challengename={x=224, y=635},
            rankname={x=110, y=506},
            prisonname={x=251, y=424},
            atkracename={x=431, y=387},
            bookroomname={x=153, y=396},
            conquestname={x=11, y=304},
            tradename={x=329, y=291}
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
            ['11']={x=481,y=680},
            ['1']={x=352,y=349},
            ['2']={x=352,y=857},
            ['3']={x=72,y=672},
            ['4']={x=110,y=328},
            ['5']={x=478,y=314},
            ['6']={x=262,y=397},
            ['7']={x=154,y=520},
            ['8']={x=534,y=479},
            ['9']={x=391,y=472},
            ['10']={x=37,y=388},
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
return sceneCfg;
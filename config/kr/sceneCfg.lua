local sceneCfg={
    homeScene={
        posCfg={
            affair={x=107,y=435,scale=4,alpha=0},
            adult={x=484,y=480,w=140,h=170,scale=4,alpha=0},
            manage={x=120,y=550,w=150,h=350,touchDown=false,dragonBones={x=54,y=336}},
            wife={x=320,y=568,w=115,h=270,touchDown=false,dragonBones={x=35,y=221}},
            child={x=447,y=718,w=100,h=220,touchDown=false,dragonBones={x=44,y=184}}
        },
        shadowCfg={
            manage={x=152,y=752},
            wife={x=320,y=738},
            child={x=452,y=795}
        },
        namePosCfg={
            managename={x=88,y=536},
            adultname={x=505,y=440},
            affairname={x=399,y=384},
            wifename={x=407,y=530},
            childname={x=527,y=684}
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
            challenge={x=188,y=598,scale=4,alpha=0},
            search={x=452,y=353,scale=4,alpha=0},
            dinner={x=416,y=511,scale=4,alpha=0},
            palace={x=32,y=237,scale=4,alpha=0},
            rank={x=97,y=518,scale=4,alpha=0},
            dailyboss={x=469, y=277,scale=4,alpha=0},
            atkrace={x=329, y=429,scale=4,alpha=0},
            studyatk={x=506, y=465,scale=4,alpha=0},
            alliance={x=469, y=711,scale=4,alpha=0},
            prison={x=251, y=474,scale=4,alpha=0},
            bookroom={x=10, y=429,scale=4,alpha=0},
            conquest={x=0, y=375,scale=4,alpha=0},
            trade={x=372, y=309,scale=4,alpha=0}
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
            tradename={x=335, y=291}
        },
        guideNeedTouchCfg={
            challenge=1
        }
    },
    searchScene={
        buildBgCfg={
            ['1']={x=0,y=666},
            ['2']={x=309,y=874},
            ['3']={x=263,y=718}
        },
        cheCfg={{x=482,y=944},{x=111,y=782},{x=685,y=627.55}},
        posCfg={
            ['1']={x=296,y=411,scale=4,alpha=0},
            ['2']={x=309,y=874,scale=4,alpha=0},
            ['3']={x=0,y=666,scale=4,alpha=0},
            ['4']={x=96,y=359,scale=4,alpha=0},
            ['5']={x=455,y=371,scale=4,alpha=0},
            ['6']={x=192,y=446,scale=4,alpha=0},
            ['7']={x=143,y=556,scale=4,alpha=0},
            ['8']={x=480,y=482,scale=4,alpha=0},
            ['9']={x=270,y=505,scale=4,alpha=0},
            ['10']={x=0,y=410,scale=4,alpha=0},
            ['11']={x=390,y=725,scale=4,alpha=0}
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
            gold={x=26,y=654},
            food={x=414,y=536},
            soldier={x=415,y=831},
            practice={x=207,y=447},
        },
    },
}
return sceneCfg;
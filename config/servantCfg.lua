﻿--门客配置
local servantCfg={
      --quality  品质
      --speciality  特长  1：武力 2：智力 3：政治 4：魅力 5：均衡 6：全能
      --dialogue  代入对话的ID
      --exchange  重复获得转换成道具_数量
      --wifeId  对应红颜
      --ability  资质
      --aura  门客光环  att加成属性  growAtt每级增加  growNeed1升级所需  growNeed2升级所需  maxLv光环最大等级  att  加成属性
    
    ["1001"]={       ----元芳----5
        ["quality"]=1,
        ["speciality"]={5},
        ["wifeId"]="101",
        ["ability"]={"201","221","241","261"},
    },
    ["1002"]={       ----苏乞儿----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="102",
        ["ability"]={"401","201","121","141","261"},
    },
    ["1003"]={       ----纪晓岚----2
        ["quality"]=1,
        ["speciality"]={2},
        ["wifeId"]="103",
        ["ability"]={"101","521","241","261"},
    },
    ["1004"]={       ----刘墉----3
        ["quality"]=1,
        ["speciality"]={3},
        ["wifeId"]="104",
        ["ability"]={"101","221","441","241","161"},
    },
    ["1005"]={       ----曹雪芹----4
        ["quality"]=1,
        ["speciality"]={4},
        ["dialogue"]="1_2",
        ["wifeId"]="105",
        ["ability"]={"101","221","141","461","261"},
    },
    ["1006"]={       ----年羹尧----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="106",
        ["ability"]={"501","201","221","141","261"},
    },
    ["1007"]={       ----小宝----2
        ["quality"]=1,
        ["speciality"]={2},
        ["wifeId"]="107",
        ["ability"]={"101","421","321","241","261"},
    },
    ["1008"]={       ----吴三桂----3
        ["quality"]=1,
        ["speciality"]={3},
        ["wifeId"]="108",
        ["ability"]={"201","221","453","345","161"},
    },
    ["1009"]={       ----蒲松龄----4
        ["quality"]=1,
        ["speciality"]={4},
        ["wifeId"]="109",
        ["ability"]={"101","221","241","661","161"},
    },
    ["1010"]={       ----李广----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="211",
        ["ability"]={"502","301","221","141","468"},
    },
    ["1011"]={       ----苏秦----2
        ["quality"]=1,
        ["speciality"]={2},
        ["wifeId"]="212",
        ["ability"]={"101","522","322","453","261"},
    },
    ["1012"]={       ----张仪----3
        ["quality"]=1,
        ["speciality"]={3},
        ["wifeId"]="214",
        ["ability"]={"101","429","541","341","261"},
    },
    ["1013"]={       ----杜甫----4
        ["quality"]=1,
        ["speciality"]={4},
        ["wifeId"]="215",
        ["ability"]={"408","221","141","561","363"},
    },
    ["1014"]={       ----孙武----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="213",
        ["ability"]={"503","405","321","141","361"},
    },
    ["1015"]={       ----张良----2
        ["quality"]=1,
        ["speciality"]={2},
        ["ability"]={"101","537","429","341","361"},
    },
    ["1016"]={       ----萧何----3
        ["quality"]=1,
        ["speciality"]={3},
        ["ability"]={"301","321","555","453","161"},
    },
    ["1017"]={       ----苏轼----4
        ["quality"]=1,
        ["speciality"]={4},
        ["ability"]={"301","121","341","571","468"},
    },
    ["1018"]={       ----荆轲----1
        ["quality"]=1,
        ["speciality"]={1},
        ["ability"]={"518","409","101","429","141","572"},
    },
    ["1019"]={       ----王羲之----2
        ["quality"]=1,
        ["speciality"]={2},
        ["ability"]={"101","532","430","121","550","468"},
    },
    ["1020"]={       ----曹操----3
        ["quality"]=1,
        ["speciality"]={3},
        ["ability"]={"405","536","554","457","141","161"},
    },
    ["1021"]={       ----司马迁----4
        ["quality"]=1,
        ["speciality"]={4},
        ["ability"]={"519","121","453","573","471","161"},
    },
    ["1022"]={       ----岳飞----1
        ["quality"]=1,
        ["speciality"]={1},
        ["ability"]={"601","405","321","341","666","468"},
    },
    ["1023"]={       ----洪承畴----1,2
        ["quality"]=1,
        ["speciality"]={1,2},
        ["wifeId"]="201",
        ["ability"]={"504","321","221","141","261"},
    },
    ["1024"]={       ----郑成功----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["wifeId"]="202",
        ["ability"]={"505","121","341","241","261"},
    },
    ["1025"]={       ----和珅----2,3
        ["quality"]=1,
        ["speciality"]={2,3},
        ["wifeId"]="203",
        ["ability"]={"201","429","121","543","161"},
    },
    ["1026"]={       ----司马光----2,4
        ["quality"]=1,
        ["speciality"]={2,4},
        ["wifeId"]="204",
        ["ability"]={"101","525","241","465","161"},
    },
    ["1027"]={       ----欧阳修----3,4
        ["quality"]=1,
        ["speciality"]={3,4},
        ["wifeId"]="205",
        ["ability"]={"101","221","453","141","563"},
    },
    ["1028"]={       ----张三丰----1,4
        ["quality"]=1,
        ["speciality"]={1,4},
        ["wifeId"]="206",
        ["ability"]={"506","221","141","361","261"},
    },
    ["1029"]={       ----陈近南----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="207",
        ["ability"]={"507","301","221","141","361"},
    },
    ["1030"]={       ----唐伯虎----2
        ["quality"]=1,
        ["speciality"]={2},
        ["wifeId"]="208",
        ["ability"]={"101","526","325","241","361"},
    },
    ["1031"]={       ----徐福----3
        ["quality"]=1,
        ["speciality"]={3},
        ["wifeId"]="209",
        ["ability"]={"101","221","544","346","364"},
    },
    ["1032"]={       ----曹植----4
        ["quality"]=1,
        ["speciality"]={4},
        ["wifeId"]="210",
        ["ability"]={"101","321","241","564","365"},
    },
    ["1049"]={       ----屈原----2,4
        ["quality"]=1,
        ["speciality"]={2,4},
        ["ability"]={"301","539","321","341","577","361"},
    },
    ["2005"]={       ----诸葛亮----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"513","405","221","456","341","161"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.1875,
                ["growNeed1"]={"2005","2006","2007","2008"},
                ["maxLv"]=4,
                ["auraIcon"]=1,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2001_10",
                ["maxLv"]=10,
                ["auraIcon"]=2,
            },
        },
    },
    ["2006"]={       ----庞统----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"514","405","221","456","341","261"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.1875,
                ["growNeed1"]={"2005","2006","2007","2008"},
                ["maxLv"]=4,
                ["auraIcon"]=1,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2001_10",
                ["maxLv"]=10,
                ["auraIcon"]=2,
            },
        },
    },
    ["2007"]={       ----司马懿----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"515","405","321","456","241","261"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.1875,
                ["growNeed1"]={"2005","2006","2007","2008"},
                ["maxLv"]=4,
                ["auraIcon"]=1,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2001_10",
                ["maxLv"]=10,
                ["auraIcon"]=2,
            },
        },
    },
    ["2008"]={       ----郭嘉----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"608","405","321","456","341","161"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.1875,
                ["growNeed1"]={"2005","2006","2007","2008"},
                ["maxLv"]=4,
                ["auraIcon"]=1,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2001_10",
                ["maxLv"]=10,
                ["auraIcon"]=2,
            },
        },
    },
    ["1050"]={       ----魏徵----2,3
        ["quality"]=1,
        ["speciality"]={2,3},
        ["wifeId"]="310",
        ["ability"]={"301","527","428","545","451","361"},
    },
    ["1051"]={       ----蛮王----1
        ["quality"]=1,
        ["speciality"]={1},
        ["ability"]={"520","405","201","534","553","574"},
        ["aura"]={
            ["1"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.3,
                ["growNeed1"]={"1051"},
                ["maxLv"]=1,
                ["auraIcon"]=7,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_1950_1",
                ["maxLv"]=10,
                ["auraIcon"]=8,
            },
        },
    },
    ["2001"]={       ----秦桧----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"510","301","221","452","343","161"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.15,
                ["growNeed1"]={"2001","2002","2003","2004"},
                ["maxLv"]=4,
                ["auraIcon"]=3,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2002_10",
                ["maxLv"]=10,
                ["auraIcon"]=4,
            },
        },
    },
    ["2002"]={       ----赵高----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"511","301","121","452","344","261"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.15,
                ["growNeed1"]={"2001","2002","2003","2004"},
                ["maxLv"]=4,
                ["auraIcon"]=3,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2002_10",
                ["maxLv"]=10,
                ["auraIcon"]=4,
            },
        },
    },
    ["2003"]={       ----高俅----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"512","301","221","452","241","261"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.15,
                ["growNeed1"]={"2001","2002","2003","2004"},
                ["maxLv"]=4,
                ["auraIcon"]=3,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2002_10",
                ["maxLv"]=10,
                ["auraIcon"]=4,
            },
        },
    },
    ["2004"]={       ----魏忠贤----1,3
        ["quality"]=1,
        ["speciality"]={1,3},
        ["ability"]={"607","301","121","452","341","161"},
        ["aura"]={
            ["1"]={
                ["att"]={1,3},
                ["growAtt"]=0.15,
                ["growNeed1"]={"2001","2002","2003","2004"},
                ["maxLv"]=4,
                ["auraIcon"]=3,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2002_10",
                ["maxLv"]=10,
                ["auraIcon"]=4,
            },
        },
    },
    ["2009"]={       ----樊梨花----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2003_10",
        ["ability"]={"593","303","429","241","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2009","2010","2011","2012","2013"},
                ["maxLv"]=5,
                ["auraIcon"]=5,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2003_10",
                ["maxLv"]=10,
                ["auraIcon"]=6,
            },
        },
    },
    ["2010"]={       ----花木兰----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2003_10",
        ["ability"]={"590","303","321","241","468"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2009","2010","2011","2012","2013"},
                ["maxLv"]=5,
                ["auraIcon"]=5,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2003_10",
                ["maxLv"]=10,
                ["auraIcon"]=6,
            },
        },
    },
    ["2011"]={       ----梁红玉----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2003_10",
        ["ability"]={"594","303","321","453","261"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2009","2010","2011","2012","2013"},
                ["maxLv"]=5,
                ["auraIcon"]=5,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2003_10",
                ["maxLv"]=10,
                ["auraIcon"]=6,
            },
        },
    },
    ["2012"]={       ----穆桂英----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2003_10",
        ["ability"]={"591","303","221","341","468"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2009","2010","2011","2012","2013"},
                ["maxLv"]=5,
                ["auraIcon"]=5,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2003_10",
                ["maxLv"]=10,
                ["auraIcon"]=6,
            },
        },
    },
    ["2013"]={       ----秦良玉----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2003_10",
        ["ability"]={"592","303","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2009","2010","2011","2012","2013"},
                ["maxLv"]=5,
                ["auraIcon"]=5,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2003_10",
                ["maxLv"]=10,
                ["auraIcon"]=6,
            },
        },
    },
    ["2014"]={       ----关羽----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2004_10",
        ["ability"]={"613","410","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2014","2015","2016","2017","2018"},
                ["maxLv"]=5,
                ["auraIcon"]=9,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2004_10",
                ["maxLv"]=10,
                ["auraIcon"]=10,
            },
        },
    },
    ["2015"]={       ----张飞----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2004_10",
        ["ability"]={"614","410","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2014","2015","2016","2017","2018"},
                ["maxLv"]=5,
                ["auraIcon"]=9,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2004_10",
                ["maxLv"]=10,
                ["auraIcon"]=10,
            },
        },
    },
    ["2016"]={       ----赵云----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2004_10",
        ["ability"]={"615","410","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2014","2015","2016","2017","2018"},
                ["maxLv"]=5,
                ["auraIcon"]=9,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2004_10",
                ["maxLv"]=10,
                ["auraIcon"]=10,
            },
        },
    },
    ["2017"]={       ----马超----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2004_10",
        ["ability"]={"616","410","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2014","2015","2016","2017","2018"},
                ["maxLv"]=5,
                ["auraIcon"]=9,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2004_10",
                ["maxLv"]=10,
                ["auraIcon"]=10,
            },
        },
    },
    ["2018"]={       ----黄忠----1
        ["quality"]=1,
        ["speciality"]={1},
        ["exchange"]="6_2004_10",
        ["ability"]={"617","410","321","341","361"},
        ["aura"]={
            ["1"]={
                ["att"]={1},
                ["growAtt"]=0.2,
                ["growNeed1"]={"2014","2015","2016","2017","2018"},
                ["maxLv"]=5,
                ["auraIcon"]=9,
            },
            ["2"]={
                ["att"]={1,2,3,4},
                ["growAtt"]=0.05,
                ["growNeed2"]="6_2004_10",
                ["maxLv"]=10,
                ["auraIcon"]=10,
            },
        },
    },
    ["1033"]={       ----吕布----1,4
        ["quality"]=1,
        ["speciality"]={1,4},
        ["wifeId"]="302",
        ["ability"]={"508","405","321","341","565","468"},
    },
    ["1034"]={       ----范蠡----6
        ["quality"]=1,
        ["speciality"]={6},
        ["wifeId"]="303",
        ["ability"]={"604","528","121","546","141","568","161"},
    },
    ["1035"]={       ----霍去病----1,2
        ["quality"]=1,
        ["speciality"]={1,2},
        ["wifeId"]="305",
        ["ability"]={"606","301","201","535","429","221","341","361"},
    },
    ["1036"]={       ----李白----1,4
        ["quality"]=1,
        ["speciality"]={1,4},
        ["wifeId"]="304",
        ["ability"]={"605","405","301","321","241","575","468","361"},
    },
    ["1037"]={       ----周瑜----1
        ["quality"]=1,
        ["speciality"]={1},
        ["wifeId"]="306",
        ["ability"]={"702","610","517","405","301","201","101","531","429","321","221","548","453","341","241","570","468","361","261"},
    },
    ["1038"]={       ----孙策----1,4
        ["quality"]=1,
        ["speciality"]={1,4},
        ["wifeId"]="307",
        ["ability"]={"701","609","516","405","301","201","101","624","530","429","321","221","121","642","547","453","341","241","141","761","664","569","468","361","261","161"},
    },
    ["1039"]={       ----李世民----1,2
        ["quality"]=1,
        ["speciality"]={1,2},
        ["wifeId"]="308",
        ["ability"]={"703","612","611","595","405","301","201","101","721","626","625","538","429","321","221","121","643","556","453","341","241","141","667","576","468","361","261","161"},
    },
}
return servantCfg
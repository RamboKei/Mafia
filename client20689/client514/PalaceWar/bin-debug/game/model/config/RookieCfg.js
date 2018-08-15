/**
 * 新手引导配置
 */
var RookieCfg;
(function (RookieCfg) {
    /**
     * 新手引导配置
     * "nextId" 下一步ID
     * "nameId"  标题ID
     * "descId" 描述ID
     * "personPic"  人物形象的图片名   1,是自己
     * "bgId" 背景图片ID
     * 	"clickRect" 点击区域 {"y":645,"x":42,"h":122,"w": 150}
     * 	"tipText"  悬浮提示文字
     * 	delayTime  延迟 显示
     *
     * "clickContinue
     */
    var rookieCfg = {
        "storyEndId": "26",
        "storyEndId2": "14",
        "storyStartId2": "15",
        "guideStartId": "101",
        "storyMusicStart": "4",
        "storyMusicEnd": "11",
        "guideSteps": 64,
        "fogId": "1",
        "shakeId": "4",
        //做梦
        "1": { "guideId": 4, "nextId": "2", "descId": 1, "bgId": 9, "nameId": "storyNPCName30", "clickContinue": true },
        "2": { "guideId": 5, "nextId": "3", "descId": 2, "bgId": 9, "clickContinue": true },
        "3": { "guideId": 6, "nextId": "4", "descId": 3, "bgId": 9, "clickContinue": true },
        //破屋
        "4": { "guideId": 7, "nextId": "5", "descId": 4, "bgId": 2, "clickContinue": true },
        "5": { "guideId": 8, "nextId": "6", "descId": 5, "bgId": 2, "clickContinue": true, },
        "6": { "guideId": 9, "nextId": "7", "descId": 6, "bgId": 2, "personPic": 999, "nameId": "storyNPCName1", "clickContinue": true, },
        // 分支
        "7": { "guideId": 10, "bgId": 2, "branch": { "1": "8", "2": "8" }, "clickContinue": false, "nextId": "8" },
        "8": { "guideId": 11, "nextId": "9", "descId": 8, "bgId": 2, "clickContinue": true, },
        "9": { "guideId": 12, "nextId": "10", "descId": 9, "bgId": 1, "personPic": 999, "nameId": "storyNPCName1", "clickContinue": true, },
        "10": { "guideId": 13, "nextId": "11", "descId": 10, "bgId": 1, "personPic": "wife_full_101", "nameId": "wifeName_101", "clickContinue": true, },
        //发榜
        "11": { "guideId": 14, "nextId": "12", "descId": 11, "bgId": 4, "clickContinue": true, },
        "12": { "guideId": 15, "nextId": "13", "descId": 12, "bgId": 5, "clickContinue": true, },
        //婚礼
        "13": { "guideId": 16, "nextId": "14", "descId": 13, "bgId": 7, "clickContinue": true, },
        "14": { "guideId": 17, "nextId": "14_1", "descId": 14, "bgId": 7, "clickContinue": true, "isCallback": true, },
        //红颜
        "14_1": { "guideId": 18, "nextId": "14_2", "clickRect": { "x": 490, "y": 370, "w": 130, "h": 270, "fromBottom": 670 }, "handPos": { x: 535, y: 500, "fromBottom": 558 }, "isScenePos": "homeScene", "sceneKey": "wife" },
        "14_2": { "guideId": 19, "nextId": "14_3", "clickRect": { "x": 170, "y": 692, "w": 145, "h": 40 }, "tipId": "wife_2", "tipPos": { x: 130, y: 460 }, "touchAll": true },
        "14_3": { "guideId": 20, "nextId": "14_4", "clickRect": { "x": 330, "y": 692, "w": 145, "h": 40 }, "tipId": "wife_3", "tipPos": { x: 130, y: 460 }, "touchAll": true },
        "14_4": { "guideId": 21, "nextId": null, "clickRect": { "x": 420, "y": 318, "w": 170, "h": 70, "fromBottom": 73 }, "handPos": { x: 520, y: 500, "fromBottom": 35, "flipXY": true }, "tipId": "wife_4", "tipPos": { x: 130, y: 660 }, "waitNext": "14_5" },
        "14_5": { "guideId": 22, "nextId": "15", "clickRect": { "x": 565, "y": 12, "w": 75, "h": 100 }, "handPos": { x: 612, y: 52, "flip": true }, "checkNpc": "manage" },
        //府邸
        "15": { "guideId": 23, "nextId": "16", "descId": 15, "bgId": 6, "clickContinue": true, },
        "16": { "guideId": 24, "nextId": "17", "descId": 16, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, },
        "17": { "guideId": 25, "nextId": "18", "descId": 17, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, },
        "18": { "guideId": 26, "nextId": "19", "descId": 18, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, },
        "19": { "guideId": 27, "nextId": "20", "descId": 19, "bgId": 6, "clickContinue": true, },
        "20": { "guideId": 28, "nextId": "21", "descId": 20, "bgId": 6, "clickContinue": true, },
        "21": { "guideId": 29, "nextId": "22", "descId": 21, "bgId": 6, "personPic": "servant_full_1002", "nameId": "servant_name1002", "clickContinue": true, },
        "22": { "guideId": 30, "nextId": "23", "descId": 22, "bgId": 6, "personPic": "servant_full_1003", "nameId": "servant_name1003", "clickContinue": true, },
        "23": { "guideId": 31, "nextId": "24", "descId": 23, "bgId": 6, "personPic": "servant_full_1004", "nameId": "servant_name1004", "clickContinue": true, },
        "24": { "guideId": 32, "nextId": "25", "descId": 24, "bgId": 6, "personPic": "servant_full_1005", "nameId": "servant_name1005", "clickContinue": true, },
        "25": { "guideId": 33, "nextId": "26", "descId": 25, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, },
        "26": { "guideId": 34, "nextId": "101", "descId": 26, "bgId": 6, "clickContinue": true, "waitNext": 101 },
        // "27":{"guideId":18,"nextId":"28", "descId":27, "bgId":2,"personPic":999,"nameId":"storyNPCName1","clickContinue":true,},
        // "28":{"guideId":19,"nextId":"29", "descId":28, "bgId":2,"personPic":"story_man2","nameId":"storyNPCName26","clickContinue":true,},
        // "29":{"guideId":20,"nextId":"30", "descId":29, "bgId":3,"clickContinue":true,},
        // "30":{"guideId":21,"nextId":"31", "descId":30, "bgId":3,"clickContinue":true},
        // "31":{"guideId":22,"nextId":"32", "descId":31, "bgId":4,"clickContinue":true},
        // "32":{"guideId":23,"nextId":"33", "descId":32, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true},
        // "33":{"guideId":24,"nextId":"34", "descId":33, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
        // "34":{"guideId":25,"nextId":"33_1", "descId":34, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "35":{"guideId":30,"nextId":"36", "descId":35, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
        // "36":{"guideId":31,"nextId":"37", "descId":36, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
        // "37":{"guideId":32,"nextId":"38", "descId":37, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "38":{"guideId":33,"nextId":"39", "descId":38, "bgId":6,"clickContinue":true},
        // "33_1":{"guideId":26,"bgId":5,"branch":{"3":"33_2","4":"33_6"},"clickContinue":false,"nextId":"33_2"},
        // // 分支1	
        // "33_2":{"guideId":27,"nextId":"33_3", "descId":3401, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "33_3":{"guideId":28,"nextId":"33_4", "descId":3402, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "33_4":{"guideId":29,"nextId":"33_5", "descId":3403, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "33_5":{"guideId":30,"nextId":"39", "descId":3404, "bgId":6,"clickContinue":true},
        // // 分支2	
        // "33_6":{"guideId":27,"nextId":"33_7", "descId":3405, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "33_7":{"guideId":28,"nextId":"33_8", "descId":3406, "bgId":5,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,},
        // "33_8":{"guideId":29,"nextId":"33_9", "descId":3407, "bgId":5,"personPic":1,"nameId":"storyNPCName1","clickContinue":true,},
        // "33_9":{"guideId":30,"nextId":"39", "descId":3408, "bgId":6,"clickContinue":true},
        // "39":{"guideId":31,"nextId":"40", "descId":39, "bgId":6,"personPic":"servant_full_1002","nameId":"servant_name1002","clickContinue":true,},
        // "40":{"guideId":32,"nextId":"41", "descId":40, "bgId":6,"personPic":"servant_full_1003","nameId":"servant_name1003","clickContinue":true},
        // "41":{"guideId":33,"nextId":"42", "descId":41, "bgId":6,"personPic":"servant_full_1004","nameId":"servant_name1004","clickContinue":true},
        // "42":{"guideId":34,"nextId":"43", "descId":42, "bgId":6,"personPic":"servant_full_1005","nameId":"servant_name1005","clickContinue":true,},
        // "43":{"guideId":35,"nextId":"44", "descId":43, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
        // "44":{"guideId":36,"nextId":"101", "descId":44, "bgId":6,"clickContinue":true,"isCallback":true,"waitNext":101},
        "101": { "guideId": 35, "nextId": "102", "descId": 101, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "resEndId": "105" },
        "102": { "guideId": 36, "nextId": "103", "clickRect": { "x": 290, "y": 370, "w": 190, "h": 350, "fromBottom": 550 }, "handPos": { x: 370, y: 400, "fromBottom": 400 }, "isScenePos": "homeScene", "sceneKey": "manage" },
        "103": { "guideId": 37, "nextId": "104", "clickRect": { "x": 60, "y": 423, "w": 250, "h": 290, "fromBottom": 590 }, "handPos": { x: 180, y: 580, "fromBottom": 440 }, "tipId": "103", "tipPos": { x: 160, y: 600, "fromBottom": 240 }, },
        "104": { "guideId": 38, "nextId": "105", "clickRect": { "x": 360, "y": 193, "w": 250, "h": 290, "fromBottom": 700 }, "handPos": { x: 450, y: 355, "fromBottom": 570 }, "tipId": "104", "tipPos": { x: 150, y: 510, "fromBottom": 350 }, },
        "105": { "guideId": 39, "nextId": "106_1", "clickRect": { "x": 365, "y": 653, "w": 240, "h": 320, "fromBottom": 440 }, "handPos": { x: 520, y: 810, "fromBottom": 260 }, "tipId": "105", "tipPos": { x: 130, y: 450, "fromBottom": 540 }, },
        "106_1": { "guideId": 40, "nextId": "106", "clickRect": { "x": 565, "y": 12, "w": 75, "h": 100 }, "handPos": { x: 617, y: 45, "flip": true } },
        "106": { "guideId": 41, "nextId": "107", "descId": 106, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "resEndId": "109" },
        "107": { "guideId": 42, "nextId": "108", "clickRect": { "x": 165, "y": 850, "w": 100, "h": 100, "fromBottom": 107 }, "handPos": { x: 198, y: 880, "fromBottom": 73 } },
        "108": { "guideId": 43, "nextId": "108_1", "clickRect": { "x": 10, "y": 167, "w": 200, "h": 190 }, "handPos": { x: 97, y: 260 } },
        "108_1": { "guideId": 44, "nextId": "108_2", "clickRect": { "x": 14, "y": 550, "w": 420, "h": 90 }, "tipId": "1081", "tipPos": { x: 130, y: 360 }, "touchAll": true },
        "108_2": { "guideId": 45, "nextId": "108_3", "clickRect": { "x": 20, "y": 795, "w": 600, "h": 85 }, "tipId": "1082", "tipPos": { x: 130, y: 600 }, "touchAll": true, "needLocalPos": true },
        "108_3": { "guideId": 46, "nextId": "109", "clickRect": { "x": 60, "y": 490, "w": 510, "h": 240, "fromCenter": 0.5 }, "tipId": "1083", "tipPos": { x: 130, y: 320 }, "touchAll": true, "needPush": true },
        "109": { "guideId": 47, "nextId": null, "clickRect": { "x": 470, "y": 600, "w": 165, "h": 70 }, "handPos": { x: 540, y: 620 }, "tipId": "109", "tipPos": { x: 130, y: 450 }, "waitNext": 111, "needPush": true, "showCloseHand": true },
        "111": { "guideId": 48, "nextId": "112", "descId": 111, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "resEndId": "120" },
        "112": { "guideId": 49, "nextId": "113", "clickRect": { "x": 10, "y": 850, "w": 140, "h": 100, "fromBottom": 107 }, "handPos": { x: 70, y: 890, "fromBottom": 70 } },
        "113": { "guideId": 50, "nextId": "114", "clickRect": { "x": 190, "y": 580, "w": 220, "h": 160 }, "handPos": { x: 285, y: 660 } },
        "114": { "guideId": 51, "nextId": "115", "clickRect": { "x": 169, "y": 645, "w": 110, "h": 110, "fromCenter": 0.5 }, "handPos": { x: 210, y: 695, "fromCenter": 0.5 } },
        "115": { "guideId": 52, "nextId": "116", "descId": 115, "bgId": 5, "clickContinue": true, "resEndId": "120" },
        "116": { "guideId": 53, "nextId": "117", "descId": 116, "bgId": 5, "clickContinue": true, },
        "117": { "guideId": 54, "nextId": "118", "descId": 117, "bgId": 5, "personPic": "story_npc_4", "nameId": "storyNPCName3", "clickContinue": true, },
        "118": { "guideId": 55, "nextId": "119", "descId": 118, "bgId": 5, "personPic": "story_npc_18", "nameId": "storyNPCName2", "clickContinue": true, },
        "119": { "guideId": 56, "nextId": "120", "descId": 119, "bgId": 5, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, },
        "120": { "guideId": 57, "nextId": null, "clickRect": { "x": 210, "y": 390, "w": 220, "h": 220, "fromCenter": 0.5 }, "handPos": { x: 320, y: 500, "fromCenter": 0.5 }, "waitNext": 123 },
        "123": { "guideId": 58, "nextId": "124", "descId": 123, "bgId": 5, "clickContinue": true, "resEndId": "128" },
        "124": { "guideId": 59, "nextId": "125", "descId": 124, "bgId": 5, "personPic": "story_npc_4", "nameId": "storyNPCName3", "clickContinue": true, },
        "125": { "guideId": 60, "nextId": "126", "descId": 125, "bgId": 5, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, },
        // "125":{"guideId":61,"nextId":"126", "clickRect":{"x":565,"y":12,"w":75,"h":100},"handPos":{x:602,y:62}},//箭头指向关闭按钮
        "126": { "guideId": 61, "nextId": "127", "clickRect": { "x": 565, "y": 12, "w": 75, "h": 100 }, "handPos": { x: 612, y: 52, "flip": true } },
        "127": { "guideId": 62, "nextId": "128", "clickRect": { "x": 10, "y": 850, "w": 140, "h": 100, "fromBottom": 107 }, "handPos": { x: 70, y: 890, "fromBottom": 70 } },
        "128": { "guideId": 64, "nextId": null, "clickRect": { "x": 0, "y": 850, "w": 170, "h": 70, "fromBottom": 222 }, "handPos": { x: 73, y: 878, "fromBottom": 199 } },
        //分阶段引导
        //子嗣
        "child_1": { "otherId": "child_1", "nextId": "child_2", "clickRect": { "x": 220, "y": 350, "w": 130, "h": 270, "fromBottom": 640 }, "handPos": { x: 270, y: 400, "fromBottom": 508 }, "isScenePos": "homeScene", "sceneKey": "child" },
        "child_2": { "otherId": "child_2", "nextId": "child_3", "clickRect": { "x": 14, "y": 420, "w": 420, "h": 90 }, "tipId": "child_2", "tipPos": { x: 130, y: 600 }, "touchAll": true },
        "child_3": { "otherId": "child_3", "nextId": "child_4", "clickRect": { "x": 475, "y": 470, "w": 160, "h": 70 }, "tipId": "child_3", "tipPos": { x: 130, y: 590 }, "touchAll": true },
        "child_4": { "otherId": "child_4", "nextId": null, "clickRect": { "x": 170, "y": 638, "w": 140, "h": 40 }, "tipId": "child_4", "tipPos": { x: 130, y: 500 }, "touchAll": true },
        //联姻
        "adult_1": { "otherId": "adult_1", "nextId": "adult_2", "clickRect": { "x": 70, "y": 320, "w": 130, "h": 170, "fromBottom": 690 }, "handPos": { x: 110, y: 340, "fromBottom": 618 }, "isScenePos": "homeScene", "sceneKey": "adult" },
        "adult_2": { "otherId": "adult_2", "nextId": "adult_3", "clickRect": { "x": 220, "y": 698, "w": 160, "h": 40 }, "tipId": "adult_2", "tipPos": { x: 130, y: 560 }, "touchAll": true },
        "adult_3": { "otherId": "adult_3", "nextId": "adult_4", "clickRect": { "x": 390, "y": 470, "w": 175, "h": 75 }, "tipId": "adult_3", "tipPos": { x: 130, y: 620 }, "touchAll": true },
        "adult_4": { "otherId": "adult_4", "nextId": null, "clickRect": { "x": 10, "y": 230, "w": 620, "h": 210 }, "tipId": "adult_4", "tipPos": { x: 130, y: 510 }, "touchAll": true, "needPush": true },
        //寻访
        "search_1": { "otherId": "search_1", "nextId": "search_2", "clickRect": { "x": 480, "y": 300, "w": 100, "h": 160 }, "handPos": { x: 510, y: 370 }, },
        "search_2": { "otherId": "search_2", "nextId": "search_3", "clickRect": { "x": 454, "y": 318, "w": 160, "h": 70, "fromBottom": 95 }, "tipId": "search_2", "tipPos": { x: 130, y: 690 }, "touchAll": true },
        "search_3": { "otherId": "search_3", "nextId": null, "clickRect": { "x": 50, "y": 313, "w": 540, "h": 540, "fromCenter": 0.5 }, "tipId": "search_3", "tipPos": { x: 130, y: 220 }, "touchAll": true, "needPush": true },
        //牢房
        "prison_1": { "otherId": "prison_1", "nextId": "prison_2", "clickRect": { "x": 240, "y": 420, "w": 150, "h": 150 }, "handPos": { x: 310, y: 490 } },
        "prison_2": { "otherId": "prison_2", "nextId": "prison_3", "clickRect": { "x": 40, "y": 270, "w": 540, "h": 500 }, "tipId": "prison_2", "tipPos": { x: 130, y: 800 }, "touchAll": true },
        "prison_3": { "otherId": "prison_3", "nextId": null, "clickRect": { "x": 113, "y": 93, "w": 80, "h": 80 }, "tipId": "prison_3", "tipPos": { x: 130, y: 240 }, "touchAll": true },
        //擂台
        "atkrace_1": { "otherId": "atkrace_1", "nextId": "atkrace_2", "clickRect": { "x": 330, "y": 350, "w": 160, "h": 160 }, "handPos": { x: 410, y: 410 }, },
        "atkrace_2": { "otherId": "atkrace_2", "nextId": "atkrace_3", "clickRect": { "x": 120, "y": 698, "w": 400, "h": 450, "fromBottom": 530 }, "tipId": "atkrace_2", "tipPos": { x: 130, y: 250 }, "touchAll": true },
        "atkrace_3": { "otherId": "atkrace_3", "nextId": "atkrace_4", "clickRect": { "x": 40, "y": 730, "w": 560, "h": 75, "fromCenter": 0.5 }, "tipId": "atkrace_3", "tipPos": { x: 130, y: 620 }, "touchAll": true, "needPush": true },
        "atkrace_4": { "otherId": "atkrace_4", "nextId": null, "clickRect": { "x": 10, "y": 140, "w": 620, "h": 210 }, "tipId": "atkrace_4", "tipPos": { x: 130, y: 410 }, "touchAll": true, "needPush": true },
        //酒楼
        "dinner_1": { "otherId": "dinner_1", "nextId": "dinner_2", "clickRect": { "x": 430, "y": 530, "w": 200, "h": 160 }, "handPos": { x: 530, y: 610 }, },
        "dinner_2": { "otherId": "dinner_2", "nextId": "dinner_3", "clickRect": { "x": 230, "y": 300, "w": 180, "h": 150 }, "tipId": "dinner_2", "tipPos": { x: 130, y: 500 }, "touchAll": true },
        "dinner_3": { "otherId": "dinner_3", "nextId": "dinner_4", "clickRect": { "x": 50, "y": 600, "w": 540, "h": 250 }, "tipId": "dinner_3", "tipPos": { x: 130, y: 440 }, "touchAll": true },
        "dinner_4": { "otherId": "dinner_4", "nextId": null, "clickRect": { "x": 48, "y": 115, "w": 540, "h": 230, "fromCenter": 0.5 }, "tipId": "dinner_4", "tipPos": { x: 130, y: 460 }, "touchAll": true, "needPush": true },
    };
    function getRookieCfg(key) {
        return rookieCfg[key];
    }
    RookieCfg.getRookieCfg = getRookieCfg;
})(RookieCfg || (RookieCfg = {}));

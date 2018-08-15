namespace Config
{
	export namespace AcCfg
	{
        export class DoubleSeventhCfg 
		{
	    	/**
			 * --活动期间累计充值奖励 
             *  --needGem：所需额度：单位（元宝）
                --getReward：奖励
			 */
			public recharge:Object={};
            
            public formatData(data:any):void
            {
                for(var key in data.recharge)
                {
                    let itemCfg:SevenRechargeItemCfg;
                    if(!this.recharge.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.recharge[Number(key) + 1] = new SevenRechargeItemCfg();
                    }
                    itemCfg = this.recharge[Number(key) + 1];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = Number(key) + 1;
                }
            }  
            
            private AVGDialog = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":"3", "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                    "3":{"nextId":null, "descId":5, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":6, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":"3", "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                    "3":{"nextId":null, "descId":8, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                },
                buildId4 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":13, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":14, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":15, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":16, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":17, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":18, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
            };
    
            public getDialogByBuildId(id):any{
                return this.AVGDialog[`buildId${id}`]
            }
        }

        class SevenRechargeItemCfg extends BaseItemCfg
        {
            public id:Number;
            /**
             * 所需额度：单位（元宝）
             */
            public needGem:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
	}
}
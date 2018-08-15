/**
 * 游戏全局的数据或者方法，能归类的按类放入不同的文件，不能归类的放这里，如:
 * DeviceUtil.ts     设备相关的数据
 * DisplayUtil.ts    显示相关的方法等
 * GameConfig.ts     全局的游戏配置
 * author dmj
 * date 2017/9/15
 * @namespace GameData
 */
namespace GameData {
	// 服务器时间
	export let serverTime:number;

	/**
	 * 时区
	 */
	export let timeZone:number;
	// 本地服务器时间
	export let localServerTime:number;
	// 服务器id
	export let curZoneID:number = 1;
	// 合服前服务器id
	export let curOldZoneID:number = null;
	// 登录时临时存放的用户填写的绑定过的用户名
	// export let tmpUserName:string = "";
	// 登录时临时存放的用户填写的绑定过的用户密码
	export let tmpUserPassword:string = "";
	// 统计id
	export let statisticsId:number = 0;
	// 当前服务器名称
	export let curArea:string = "CN-15001";
	// 用户客户端ip
	export let client_ip:string = "127.0.0.1";
	// 用户平台id
	export let platId:string = "";
	// 用户uid
	export let userId:number = null;
	export let access_token:string = "0";

	export let logints:number = 0;

	export let localCfg: string[] = ["192.168", "localhost","127.0.0.1","local-test-82.raygame3.com"];

	export let testCfg:string[]=["gt_test"];

	/**暂停心跳同步 默认false */
	export let pauseSync:boolean = false;
	/**心跳同步数据时间戳 */
	export let lastAutoSyncTime:number = 0;
	/**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
	export let serverClientTimeDt:number = 0;

	/**公告数据 */
	export let announcementData:any = {};

	/**玩吧礼包 */
	export let wbrewards:string = null;

	/**
	 * 玩吧礼包状态 true 可领取 false 已领取
	 */
	export let wbrewardsFlag:boolean;

	/**
	 * 是不是从糖果屋登录 true 是 false 不是
	 */
	export let candyflag:boolean;

	/**
	 * 玩吧是不是需要上报数据 true 是 false 不是
	 */
	export let closeSource:number;

	/**
	 * 玩吧数据上报每多少个人上报一次
	 */
	export let wanbaEvenyNumReport:number=3;

	/**
	 * h5渠道限制vip等级显示
	 */
	export let limitVipLv:number[];

	/**
	 * 3kios 是否绑定手机 
	 */
	export let kkkIsBindIos:string="0";

	/**
	 * 聊天等级限制
	 */
	export let chatlevel:number = 4;
	/**
	 * 英文限制名字长度
	 */
	export let nameLength:number = 10;

	/**
	 * 客服信息
	 */
	export let customerServiceData:any = null;

	/**
	 * 是否使用新的UI
	 */
	// export let isUseNewUI:boolean=false;


	///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 

	// 解析model.gameinfo
	export function formatGameInfo(data:any):void
	{
		if(data.statisticsId)
		{
			statisticsId = Number(data.statisticsId);
		}
		if(data.pid)
		{
			platId = data.pid;
		}
	}

	// 获取国家，
	export function getCountry():string
	{	
		if (PlatformManager.checkIsTWBSp() == true) 
		{
			return "tw";
		}
		else if (PlatformManager.checkIsKRSp() == true) 
		{
			return "kr";
		}
		else 
		{
			return "cn";
		}
		
	}
	// 当前的渠道id
	export function getCurPlatName():string
	{
		return "0";
	}
	/**判断是否为本地地址 */
	export function isLocal():boolean
    {
        var result: boolean = false;
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        {
            var url: string = window.location.href;
            for (var i: number = 0; i < localCfg.length;i++)
            {
                var str: string = localCfg[i];
                if(url.indexOf(str)>-1)
                {
                    result = true;
                    break;
                }
            }
        } else if (App.DeviceUtil.isWXgame()) {
			result = true;
		} else if (App.DeviceUtil.isWyw()) {
			result = true;
		}
        return result;
    }

	export function isTest():boolean
	{
		var result: boolean = false;
        if(App.DeviceUtil.IsHtml5())
        {
            var url: string = window.location.href;
            for (var i: number = 0; i < testCfg.length;i++)
            {
                var str: string = testCfg[i];
                if(url.indexOf(str)>-1)
                {
                    result = true;
                    break;
                }
            }
        }
        return result;
	}

	/**
	 * 解析奖励物品格式
	 * @param rewards 奖励原始数据
	 */
	export function formatRewardItem(rewards:string):Array<RewardItemVo>
	{
		let arr:Array<RewardItemVo> = new Array();
		// 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
		if(rewards)
		{
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++)
			{
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				 //如果不开称帝，前端屏蔽人望奖励
				if (!Api.switchVoApi.checkOpenPrestige())
				{
					if (rewardItemVo.type == 17)
					{
						continue;
					}
				}
				arr.push(rewardItemVo);
			}
		}

		return arr;
	}

	/**
	 * 解析奖励物品格式 返回奖励文本 金币+100 粮食+100 士兵 +100
	 * @param rewards 奖励原始数据
	 */
	export function getRewardsStr(rewards:string):string
	{
		let rewardsStr = "";
		// 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
		if(rewards)
		{
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++)
			{
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				if(rewardsStr == "")
				{
					rewardsStr = rewardItemVo.message;
				}
				else{
					rewardsStr = rewardsStr + " " + rewardItemVo.message;
				}
				
			}
		}

		return rewardsStr;
	}

	/**
	 * 获取物品Icon
	 * @param itemVo 物品模型
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
	 */
	export function getItemIcon(itemVo:RewardItemVo|Config.ItemItemCfg,isTouchShowInfo?:boolean,isShowEffect:boolean = false):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		
		var iconBg:BaseBitmap = BaseBitmap.create(itemVo.iconBg);
		container.addChild(iconBg);
		container.width = iconBg.width;
		container.height = iconBg.height;
		
		let icon:BaseLoadBitmap = BaseLoadBitmap.create(itemVo.icon);
		let firstChar:string = itemVo.icon.substr(0,13);
		if (firstChar == "servant_half_")
		{
			icon.setScale(100/180);
		}
		if(itemVo.type==10)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);

		}
		if(itemVo.type==12)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);

		}
		if(itemVo.type==16)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);

		}
		
		container.addChild(icon);
		container.bindData=itemVo;

		icon.setPosition(4,3);

		if(itemVo.type==12)
		{
			icon.x = 0;

		}

		if((itemVo instanceof RewardItemVo) &&itemVo.num)
		{	
			if (itemVo.type == 15 || itemVo.type == 14|| itemVo.type == 16) {
				
				let numbg:BaseBitmap = BaseBitmap.create("public_itemtipbg2");
				numbg.width = 100;
				numbg.scaleY = 22/numbg.height;
				numbg.setPosition(container.width/2-numbg.width/2 , container.height - 22);
				container.addChild(numbg);
				let numberstr:string = LanguageManager.getlocal("itemName_"+itemVo.type)+itemVo.num;
				if(itemVo.id >10){
					numberstr = itemVo.num.toString();
					numbg.visible = false;
				}
				
				let numLb:BaseTextField = ComponentManager.getTextField( numberstr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
				numLb.name="numLb";
				numLb.setPosition(iconBg.width/2-numLb.width/2, iconBg.height - 3 - numLb.height );
				container.addChild(numLb);
				if(itemVo.id >10){
					numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				}
			}
			else {
				let numLb:BaseTextField = ComponentManager.getTextField( itemVo.num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				numLb.name="numLb";
				numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				container.addChild(numLb);
			}
		}
		if(isTouchShowInfo)
		{
			iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
		}

		if(isShowEffect)
		{
			let temScale = 1/0.74;
			let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			effectClip.x = icon.x + 50 - 198*temScale/2;
			effectClip.y = icon.y + 52 - 197*temScale/2;
			container.addChild(effectClip);
			effectClip.scaleX = effectClip.scaleY = temScale;
			effectClip.playWithTime(-1);
		}

		return container;
	}

	/**
	 * 获取奖励物品Icon
	 * @param rewards 奖励原始数据
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效
	 */
	export function getRewardItemIcons(rewards:string,isTouchShowInfo?:boolean,isShowEffect:boolean = false):Array<BaseDisplayObjectContainer>
	{
		let arr:Array<BaseDisplayObjectContainer> = new Array();
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(rewards);
		for(let i:number = 0;i < rewardsArr.length;i++)
		{
			let rewardItemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardsArr[i],isTouchShowInfo,isShowEffect);
			arr.push(rewardItemIcon);
		}
		return arr;
	}

	export function getRewardItemVoByIdAndType(type:number|string,id?:number|string):RewardItemVo
	{
		if(type)
		{
			return formatRewardItem(type+"_"+id+"_0")[0];
		}
		return null;
	}

	export function getRewardItemIconByIdAndType(type:number|string,id?:number|string,isTouchShowInfo?:boolean,num?:number):BaseDisplayObjectContainer
	{
		if(type)
		{
			return getRewardItemIcons(type+"_"+id+"_"+String(num?num:0),isTouchShowInfo)[0];
		}
		return null;
	}

	/**
	 * 根据icon名字和背景名字获取icon图标
	 * @param iconName 
	 * @param iconBgName 
	 */
	export function getIconContainer(iconName:string,iconBgName:string):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let bg:BaseBitmap=BaseBitmap.create(iconBgName);
		container.addChild(bg);
		bg.name="iconBg";
		let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconName,null,{callback:(container:BaseDisplayObjectContainer)=>{
			if(container)
			{
				let bg:BaseBitmap=<BaseBitmap>container.getChildByName("iconBg");
				let icon:BaseLoadBitmap=<BaseLoadBitmap>container.getChildByName("icon");
				if(bg&&icon)
				{
					icon.setPosition((bg.width-icon.width)/2,(bg.height-icon.height)/2);
				}
			}
		},callbackThisObj:GameData,callbackParams:[container]});
		container.addChild(icon);
		icon.name="icon";
		return container;
	}

	export function dispose():void
	{
		limitVipLv=null;
		closeSource=NaN;
		customerServiceData = null;
	}

}
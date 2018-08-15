/**
 * 跨服活动聊天
 * author qianjun
 */
class ChatActivityCrossView extends CommonView
{

	public constructor() 
	{
		super();
	}
	public initView():void
	{
		//NetManager.chat.checkAndReConnect();

		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");

		bottom.height = 200;
		
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
		this.addChildToContainer(bottom);

		let lisetBg = BaseBitmap.create("servant_bottombg");
		lisetBg.width = GameConfig.stageWidth+14;
		lisetBg.height = GameConfig.stageHeigth - 250;
		lisetBg.x = -7;
		lisetBg.y = -70;
		this.addChildToContainer(lisetBg);
	}

    public get activeID():string{
        let view = this;
        return view.param.data.activeID;
    } 

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn",
					"chatview_arrow","chatview_bottom",
					"chatview_inputbg","mainui_missionIcon1","prichatview_bottom","chatlaba"
					]);
	}


	protected getTabbarTextArr():Array<string>
	{
		let tab = [];
		tab.push(`chatViewTab4Title`);	
		//openChatType3		
		// tab.push("chatViewTab3Title");
			//tab.push("chatViewTab4Title");
		return tab;
	}

	public dispose():void
	{
		super.dispose();
	}
}
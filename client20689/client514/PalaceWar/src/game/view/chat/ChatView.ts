/**
 * 聊天
 * author dky
 * date 2017/10/25
 * @class ChatView
 */
class ChatView extends CommonView
{
   
	public constructor() 
	{
		super();
	}
	public initView():void
	{
		NetManager.chat.checkAndReConnect();
		let lisetBg = BaseBitmap.create("servant_bottombg");
		lisetBg.width = GameConfig.stageWidth+14;
		lisetBg.height = GameConfig.stageHeigth - 150;
		lisetBg.x = -7;
		lisetBg.y = -70;
		this.addChildToContainer(lisetBg);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		
	}

    

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn"
					]);
	}


	protected getTabbarTextArr():Array<string>
	{
		let tab = ["chatViewTab1Title"];
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			tab.push("chatViewTab2Title");
		}
		return tab
	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{	
		if(index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance") );
			return false;
		}
		return true;
	}

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }
	private doDinnerGuide()
	{
		this.hide();
	}
	protected doQuickAlliance()
	{
		this.hide();
		App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		super.dispose();
	}
}
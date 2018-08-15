/**
 * 聊天
 * author dky
 * date 2017/10/25
 * @class ChatView
 */
class ChatView extends CommonView
{
	private _public_dot3 : BaseBitmap = null;
	private _unreadNum : BaseTextField = null;
	private _prichatbottom : BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	public initView():void
	{
		NetManager.chat.checkAndReConnect();

		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");

		bottom.height = 200;
		
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
		this.addChildToContainer(bottom);
		
		let pribottom = BaseBitmap.create('prichatview_bottom');
		this.setLayoutPosition(LayoutConst.horizontalCentertop, pribottom, bottom, [0,24]);
		this.addChildToContainer(pribottom);
		this._prichatbottom = pribottom;

		let lisetBg = BaseBitmap.create("servant_bottombg");
		lisetBg.width = GameConfig.stageWidth+14;
		lisetBg.height = GameConfig.stageHeigth - 250;
		lisetBg.x = -7;
		lisetBg.y = -70;
		this.addChildToContainer(lisetBg);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.fresh_red,this);
		//红点3
        let public_dot3 = BaseBitmap.create("public_dot2");
		this.addChild(public_dot3); ;
		public_dot3.scaleX = public_dot3.scaleY = 1.5;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-5;
		public_dot3.y = this.tabbarGroup.y; 
		public_dot3.visible = false;
		this._public_dot3 = public_dot3; 

        let unreadTxt = ComponentManager.getTextField('', 17, TextFieldConst.COLOR_QUALITY_WHITE);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unreadTxt, public_dot3);
		this.addChild(unreadTxt);
		this._unreadNum = unreadTxt;
        unreadTxt.visible = public_dot3.visible;
		this.fresh_red();
	}

    public get tabHeight():number{
        let view = this;
        return view.tabViewData[0].height;
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
		let tab = ["chatViewTab1Title"];
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			tab.push("chatViewTab2Title");
			tab.push("chatViewTab3Title");
			if(Api.switchVoApi.openCrossChat()){
				tab.push(`chatViewTab4Title`);
			}
		}
		// let Max = 5;
		// for(let i = 4; i < Max; ++ i){
		// 	if(Api.switchVoApi[`openChatType${i}`]()){
		// 		tab.push(`chatViewTab${i}Title`);
		// 	}
		// }
		//openChatType3		
		// tab.push("chatViewTab3Title");
			//tab.push("chatViewTab4Title");
		return tab;
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

	private fresh_red():void{
         //第三页 红点
         if(this._public_dot3)
         {
			this._unreadNum.visible = this._public_dot3.visible = Api.chatVoApi.isNewMsg();
			this._unreadNum.text =  Api.chatVoApi.getUnreadMsgNum().toString();
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._unreadNum,this._public_dot3);
         } 
	}

	protected clickTabbarHandler(data:any){
		this._prichatbottom.alpha = data.index == 2 ? 1 : 0;
		super.clickTabbarHandler(data);
		if(data.index != 3){
			let chatviewtab : any = this.tabViewData[3];
			if(chatviewtab){
				chatviewtab.closeTimer();
			}
		}
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
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.fresh_red,this);
		this._public_dot3 = null;
		super.dispose();
	}
}
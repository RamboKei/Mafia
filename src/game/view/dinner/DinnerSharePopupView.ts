

class DinnerSharePopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "dinner_share";
	}

	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		let btnArray:string[] = ["share_to_world"];
		if (Api.playerVoApi.getPlayerAllianceId() > 0) {
			btnArray.push("share_to_alliance");
		}

		for (let i:number = 0; i < btnArray.length; i++)
		{
			let item:BaseDisplayObjectContainer = this.getItem(btnArray[i],i);
			item.setPosition(this.viewBg.width/2-item.width/2, 40 + i * 82);
			this.addChildToContainer(item);
		}

	}

	private getItem(text:string,idx:number):BaseDisplayObjectContainer
	{
		let container = new BaseDisplayObjectContainer();
		let itemBg = BaseBitmap.create("public_9_bg28");
		itemBg.width = 500;
		container.addChild(itemBg);

		let extendTf  = ComponentManager.getTextField(LanguageManager.getlocal(text),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		extendTf.x = container.width/2 - extendTf.width/2;
		extendTf.y = container.height/2 - extendTf.height/2;
		container.addChild(extendTf);

		itemBg.addTouch(this.eventHandler,this,[idx,itemBg]);	
		
		return container;
	}

	private doShareDinner(idx:number):void
	{
		if(GameData.serverTime - Api.dinnerVoApi.lastShareTime[idx] < 5)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip"));
			return;
		}

		Api.dinnerVoApi.lastShareTime[idx] = GameData.serverTime;

		let chatData:any = {};
		if (idx == 0) {
			 chatData.channel = 1;
		}
		else {
			 chatData.channel = Api.playerVoApi.getPlayerAllianceId();
		}
		
		let typeStr:string = LanguageManager.getlocal("dinnerTitle"+[Api.dinnerVoApi.getDtype().toString()]);
		chatData.message = LanguageManager.getlocal("dinner_share_text",[Api.playerVoApi.getPlayerName(),typeStr]);

        NetManager.requestChat(chatData);

		App.CommonUtil.showTip(LanguageManager.getlocal("share_success"));

		NetManager.request(NetRequestConst.REQUEST_DINNER_SHAREDINNER,{});

		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		
		this.hide();
		
		if ( !NetManager.chat.isConnected())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_fail"));
			return;
		}
	}

	protected eventHandler(event:egret.TouchEvent,idx,itemBg)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				itemBg.texture = ResourceManager.getRes("public_9_bg28");
				this.doShareDinner(idx);
				break;
        }
    }

	public dispose():void
	{	 	
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}
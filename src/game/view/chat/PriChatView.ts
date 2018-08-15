/**
 * 私聊
 * author qianjun
 */
class PriChatView extends CommonView
{
   
	public constructor() 
	{
		super();
    }

    private _inputTextField:BaseTextField;
    // 滑动列表
	private _scrollList:ScrollList;
    private _openTime : number = 0;
	protected initView():void
	{
		let view = this;
		view._openTime = GameData.serverTime;
		let data = view.param.data;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.refreshChat,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		let chatList = Api.chatVoApi.getPriChatList(data.sender);
		// data = chatList
		//下面属性背景
		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
		bottom.height = 200;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottom, view);
		view.addChild(bottom);

		let bottomBg:BaseBitmap = BaseBitmap.create("chatview_inputbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bottomBg, bottom);
        view.addChild(bottomBg);

		let Bg:BaseBitmap = BaseBitmap.create("public_9_bg22"); 
		Bg.width = GameConfig.stageWidth - 30;
        Bg.height = GameConfig.stageHeigth - view.titleBg.height - bottom.height + 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.titleBg, [0,view.titleBg.height - 5]);
		view.addChild(Bg);
		view.swapChildren(Bg, view.container);	

        let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
        listBg.height = Bg.height - 40;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listBg, Bg);
		view.addChild(listBg);
        
        let maskBg:BaseBitmap = BaseBitmap.create("public_9_bg33");
		maskBg.width = listBg.width;
		maskBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg);
        view.addChild(maskBg);

        let nameTxt = ComponentManager.getTextField(data.sendername, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, maskBg);
        view.addChild(nameTxt);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 50,listBg.height - 50);
		view._scrollList = ComponentManager.getScrollList(ChatScrollItem, chatList, rect);
		view.addChild(view._scrollList);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view._scrollList, maskBg, [0,maskBg.height]);
		view._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		if(chatList.length > 0 ){
			view._scrollList.moveToButtom();
		}
		view._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
        //输入框
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,463,48,"public_chatinputbg",LanguageManager.getlocal("chatMaxLength"),0xa4917f);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, inputTF, bottomBg, [20,0])
		view.addChild(inputTF);

		view._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		view._inputTextField.maxChars = PlatformManager.checkIsThSp()?60:40;
        // this._inputTextField.

   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, sendBtn, inputTF, [inputTF.width + 10,0])
		sendBtn.setColor(TextFieldConst.COLOR_BLACK);
		view.addChild(sendBtn);
		if(Api.switchVoApi.checkVip1Privilege()){
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
				App.DisplayUtil.changeToGray(sendBtn);
			}

		}
		else{
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
				App.DisplayUtil.changeToGray(sendBtn);
			}
		}
		view.checkShowMoreTip();
    }
    
    protected getTitleStr():string{
        return 'chatViewTab3Title';
    }

	private refreshChatByScroll():void
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			this._openTime = GameData.serverTime;
			// let chatList = Api.chatVoApi.getPriChatList(this.param.sender);

			// this._scrollList.refreshData(chatList);
			// this._scrollList.moveToButtom();
			// let moreBtn:BaseButton=<BaseButton>this.getChildByName("moreBtn");
			// if(this._scrollList&&this._scrollList.checkIsAtButtom())
			// {
			// 	if(moreBtn)
			// 	{
			// 		moreBtn.visible=false;
			// 	}
			// }
		}
	}

	private sendMsgCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.ret >= 0){
			Api.chatVoApi.setPriChatList(evt.data.data.data[0]);
		}
		// if(evt.data.data.data && evt.data.data.data[0] == 'Success'){
			
		// 	// NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
		// 	// 	isall : 0
		// 	// });
		// }
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn",
					"chatview_arrow","chatview_bottom",
					"chatview_inputbg"
					]);
	}

	private refreshChat()
	{ 
		let view = this;
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		let chatList = Api.chatVoApi.getPriChatList(this.param.data.sender);
		this._scrollList.refreshData(chatList);
		if(isButtom)
		{
			this._scrollList.moveToButtom();
			view._openTime = GameData.serverTime;
		}
		this.checkShowMoreTip();
	}

	private checkShowMoreTip():void
	{
		let view = this;
		let moreBtn:BaseButton=<BaseButton>this.getChildByName("moreBtn");
		if(this._scrollList&&this._scrollList.checkIsAtButtom())
		{
			if(moreBtn)
			{
				moreBtn.visible=false;
			}
		}
		else
		{
			if(!moreBtn)
			{
				let moreBtn = new BaseDisplayObjectContainer();
				moreBtn.width = 610;
				moreBtn.height = 40;
				moreBtn.name = "moreBtn";
				moreBtn.x = 640/2- 610/2;
				moreBtn.y = this._scrollList.y + this._scrollList.height - moreBtn.height + 5;
				moreBtn.addTouchTap(this.scrollToButtom,this);

				let moreBtnImg: BaseBitmap = BaseBitmap.create("public_9_bg33");
				moreBtnImg.width = 610;
				moreBtnImg.height = 40;
				moreBtnImg.scaleY = -1;
				moreBtnImg.x = 0;
				moreBtnImg.y = 0 + moreBtnImg.height;
				
				moreBtn.addChild(moreBtnImg);

				let moreBtnText: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("chatHaveNewMsg"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				moreBtnText.x = moreBtn.width / 2 - moreBtnText.width / 2;
				moreBtnText.y = moreBtn.height / 2 - moreBtnText.height/2;
				moreBtn.addChild(moreBtnText);

				let moreBtnArrow: BaseBitmap = BaseBitmap.create("chatview_arrow");
				moreBtnArrow.x = moreBtnText.x + moreBtnText.width + 5;
				moreBtnArrow.y = moreBtnText.y + moreBtnText.height/2 - moreBtnArrow.height/2;
				moreBtn.addChild(moreBtnArrow);

				this.addChild(moreBtn);
				moreBtn.visible = Api.chatVoApi.judgeIsHaveNewMsg(this.param.data.sender, view._openTime);

			}
			else
			{
				moreBtn.visible = Api.chatVoApi.judgeIsHaveNewMsg(this.param.data.sender, view._openTime);
			}
		}
	}

	private scrollToButtom():void
	{
		let view = this;
		view._scrollList.moveToButtom();
		view._openTime = GameData.serverTime;
		view.refreshChat();
	}

    private sentBtnClick()
    {

		if(Api.switchVoApi.checkVip1Privilege()){
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
				App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2",[Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
				return;
			}

		}
		else{
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
				App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
				return;
			}

		}
		if(!this._inputTextField.bindData)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
			return;
		}	
		 if(this._inputTextField.text.length <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
			return;
		}	
		if(GameData.serverTime - Api.chatVoApi._lastTime < 5)
		{
			let times = String( Api.chatVoApi._lastTime - GameData.serverTime + 5);
			// Api.chatVoApi._lastTime = GameData.serverTime;
			App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip",[times]));
			return;
		}

		Api.chatVoApi._lastTime = GameData.serverTime;

		if(Config.ShieldCfg.checkShield(this._inputTextField.text)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		if(App.StringUtil.checkChar(this._inputTextField.text))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
        let txtStr:string=this._inputTextField.text;
        let chatData:any = {};
        chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        chatData.message = txtStr;

		this._inputTextField.text = "";

		NetManager.request(NetRequestConst.REQUEST_PRICHAT_SENDMSG, {
			receiveuid : this.param.data.sender,
			content : txtStr,
		});
		// NetManager.requestChat(chatData);

    }
	public dispose():void
	{
        // this._inputTextField.removeEventListener();
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.refreshChat,this);
		let view = this;
		if(Api.chatVoApi.getUnreadMsgNum(view.param.data.sender)){
			NetManager.request(NetRequestConst.REQUEST_PRICHAT_SETREAD, {
				receiveuid : view.param.data.sender 
			});
		}
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		super.dispose();
	}
}
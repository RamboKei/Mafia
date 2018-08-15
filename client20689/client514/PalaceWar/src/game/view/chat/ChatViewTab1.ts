class ChatViewTab1 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
    // 滑动列表
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
        this.initView();
	}

	protected initView():void
	{


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);


        let chatList = Api.chatVoApi.getWorldList();

       
        //下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("wifeview_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = 96;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth -240 ;
		this.addChild(bottomBg);

		let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
		listBg.height = GameConfig.stageHeigth - 260;
		listBg.x = 15;
		listBg.y = 12 ;
		this.addChild(listBg);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 50,GameConfig.stageHeigth - 263);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,chatList,rect);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this.addChild(this._scrollList);
		this._scrollList.setPosition(25,12);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		if(chatList.length > 0 ){
			this._scrollList.setScrollTopByIndex(chatList.length-1);
		}
		


          //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,468,48,"public_chatinputbg",LanguageManager.getlocal("chatMaxLength"),0xa4917f);

		inputTF.x = 15;
		inputTF.y = bottomBg.y + bottomBg.height/2 - inputTF.height/2;
		this.addChild(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 40;
        // this._inputTextField.

   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width + 10;
		sendBtn.y = bottomBg.y + bottomBg.height/2 - sendBtn.height/2;
		sendBtn.setColor(TextFieldConst.COLOR_BLACK);

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
		
		this.addChild(sendBtn);
	}

	private refreshChat()
	{
		 let chatList = Api.chatVoApi.getWorldList();
		 this._scrollList.refreshData(chatList);
		 this._scrollList.setScrollTopByIndex(chatList.length-1);
	}

    private sentBtnClick()
    {	
		if(Api.otherInfoVoApi.getBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getBanet(),2)]));
			return;

		}
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

		Api.chatVoApi._lastTime = GameData.serverTime;
		
        let txtStr:string=this._inputTextField.text;
        let chatData:any = {};
        chatData.channel = 1;
        chatData.message = txtStr;

		this._inputTextField.text = "";

        NetManager.requestChat(chatData);

    }
	public dispose():void
	{
        // this._inputTextField.removeEventListener();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		super.dispose();
	}
}
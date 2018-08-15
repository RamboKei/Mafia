/**
 * 聊天
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
class ChatScrollItem extends ScrollListItem {

    private _userName:BaseTextField;
    private _posContainer:BaseDisplayObjectContainer;
    private _chatData:any;
    public constructor() {
        super();
    }

    public initItem(index: number, chatData: any): void {

        
        this.width = 590;
        

        // let chatList = Api.chatVoApi.getChatList();


        // let chatData = chatList[index];
        this._chatData = chatData;

        //头像背景
        this._posContainer = new BaseDisplayObjectContainer();
        let posStr = "public_chatheadbg";
        if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()){
            posStr = chatData.content.headBg;
        }
        let posBg:BaseBitmap = BaseBitmap.create(posStr);
        this._posContainer.addChild(posBg)
		this.addChild(this._posContainer);

        //  this._posContainer.setPosition(-30,-30)

        this._posContainer.addTouch(this.eventHandler,this,null);	

		let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(chatData.content.pic),rect1);
		posBB.x = 0;
		posBB.y = -7;
        posBB.setScale(2/3);
		this._posContainer.addChild(posBB);



        let itemBgPic = "public_chatbg3";
        //自己说的话
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            itemBgPic = "public_chatbg2";
        }


        let itemBg = BaseBitmap.create(itemBgPic);
        itemBg.width = 404;
        
        itemBg.x = 98;
        itemBg.y = 40;
        this.addChild(itemBg);

        //名字

        let chatName = "<font u ='true'>" + chatData.sendername + "</font>";

        this._userName = ComponentManager.getTextField(chatName, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._userName.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._userName.x = itemBg.x + 10;
        this._userName.y = 10;
        this.addChild(this._userName);
        this._userName.addTouchTap(this.showUserInfo,this,null);

        let dis = 0;
        let vipFlag;
        if(chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()){
            vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
            vipFlag.setScale(0.65);
            vipFlag.x =  this._userName.x + this._userName.width + 10;
            vipFlag.y = this._userName.y ;
            this.addChild(vipFlag);
            dis = 68 + 5;
        }
        let officerImg;
        if(chatData.content.title && chatData.content.title > 0){

            officerImg = BaseLoadBitmap.create("user_title_" + chatData.content.title+"_3");
            officerImg.x =  this._userName.x + this._userName.width + dis - 15; 
            officerImg.y = this._userName.y + this._userName.height/2 -  33 ;
            this.addChild(officerImg);
            dis = dis + 110 + 5;
         }
       
      
        //时间
        let timeDis = GameData.serverTime - chatData.ts;
        let timeTF = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(timeDis,4), TextFieldConst.FONTSIZE_TITLE_SMALL);
        timeTF.textColor = TextFieldConst.COLOR_BROWN
        // timeTF.x = this._userName.x + this._userName.width + dis + 5;
         timeTF.x = this.width - timeTF.width -5;
        timeTF.y = this._userName.y;
        this.addChild(timeTF);

        //内容
        let messageTF = ComponentManager.getTextField(chatData.content.message, TextFieldConst.FONTSIZE_TITLE_SMALL);
        
        messageTF.textColor = TextFieldConst.COLOR_BLACK;
        messageTF.x = itemBg.x + 20;
        messageTF.y = itemBg.y + 12;
        this.addChild(messageTF);





        if(messageTF.width > 370)
        {
           messageTF.width = 370; 
        }
        
        let bgHeight =  messageTF.height + 20;

        if (bgHeight < 50)
        {
            itemBg.width = messageTF.width + 30;
            itemBg.height = 47;

        }
        else{
             itemBg.width = 404;
             itemBg.height = messageTF.height + 20;

        }

                //自己说的话
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            this._posContainer.x = this.width - this._posContainer.width;
            itemBg.skewY = 180;
            itemBg.x = this._posContainer.x - 12;
            this._userName.x = itemBg.x - this._userName.width - 8;
            if(vipFlag){
                vipFlag.x = this._userName.x - 68 - 10;
            }

            if(officerImg){
                if(vipFlag)
                {
                    officerImg.x = this._userName.x - dis - 25;
                }else{
                    officerImg.x = this._userName.x - 110 - 25;
                }
                
            }

            // timeTF.x = this._userName.x - timeTF.width - dis - 30;
            timeTF.x = 5;
            
            messageTF.x = itemBg.x - messageTF.width - 20;
        }

        //  let itemBg2 = BaseBitmap.create(itemBgPic);
        // itemBg2.width = this.width;
        // itemBg2.height = this.height;
        // itemBg2.x = 0
        // itemBg2.y = 0;
        // this.addChild(itemBg2);
       this.cacheAsBitmap=true;
    }
    protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        if(!Api.switchVoApi.checkOpenShenhe())
		{
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
         
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
    private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._chatData.sender});
    }
    protected eventHandler(event:egret.TouchEvent)
    {

        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				
                // egret.Tween.get(this._posContainer,{loop:false}).to({scaleX:0.8,ScaleY:0.8},200);
                this.showUserInfo();
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				// this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                
				break;
        }
    }

    public getSpaceY(): number {
        return 0;
    }

    public dispose(): void {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        this.cacheAsBitmap=true;
        this._userName.removeTouchTap();
        this._userName = null;
        this._posContainer.removeTouch();
        this._posContainer = null;
        super.dispose();
    }
}
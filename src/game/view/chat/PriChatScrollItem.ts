/**
 * 私聊
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
class PriChatScrollItem extends ScrollListItem {

    public constructor() {
        super();
    }

    private _redpot : BaseBitmap = null;
    private _data : any = null;
    public initItem(index: number, chatData: any): void {

        let view = this;
        view._data = chatData;
        view.width = 604;
        view.height = 129;
        //let data = chatData[0];

        let bg = BaseBitmap.create('public_9_bg35');
        bg.width = 604;
        bg.height = 129;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let title = chatData.content.title;
        if (chatData.sender == Api.playerVoApi.getPlayerID())
        {
            title = "-1"
        }
        else if (title==null)
        {
            title = "0";
        }
        //头像背景
        let posStr = "public_chatheadbg";
        if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege() && chatData.content.headBg != 'head_circle_bg'){
            posStr = chatData.content.headBg;
        }
        let posBg:BaseBitmap = BaseBitmap.create(posStr);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, posBg, bg, [30,0]);
        view.addChild(posBg);

        let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let headImg = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(chatData.content.pic), rect1);
        // headImg.x = 0;
        // headImg.y = -7;
        headImg.width = 136;
        headImg.height = 143;
        headImg.setScale(2/3);
		//this._posContainer.addChild(headImg);
        //let headImg = Api.playerVoApi.getPlayerCircleHead(chatData.content.pic, title);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headImg, posBg, [-5,-7]);
        view.addChild(headImg);

        let redpot = BaseBitmap.create("public_dot2");
        redpot.scaleX = redpot.scaleY = 1.5;
        view.setLayoutPosition(LayoutConst.lefttop, redpot, headImg, [-10,5]);
        view.addChild(redpot);
        view._redpot = redpot;
        redpot.visible = Api.chatVoApi.getUnreadMsgNum(chatData.sender) > 0;

        let num = Api.chatVoApi.getUnreadMsgNum(chatData.sender);
        let unreadTxt = ComponentManager.getTextField(num.toString(), 17, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unreadTxt, redpot);
        view.addChild(unreadTxt);
        unreadTxt.visible = redpot.visible;

        let nameTxt = ComponentManager.getTextField(chatData.sendername, 24, 0xa87e00);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headImg, [headImg.width * headImg.scaleX + 20,20]);
        view.addChild(nameTxt);

        let msg : string = chatData.content.message;//chatData.content.message.length > 15 ? (chatData.content.message) : chatData.content.message;
        if(msg.length > 10){
            msg = msg.substring(0, 11) + '...';
        }
        let newTxt = ComponentManager.getTextField(msg, 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, newTxt, nameTxt, [0, nameTxt.textHeight + 20]);
        view.addChild(newTxt);

        view.cacheAsBitmap=true;
        view.addTouchTap(view.clickPriChat, view);
    }

    private clickPriChat(){
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, view._data);
    }

    public getSpaceY(): number {
        return 0;
    }

    public dispose(): void {
        this.cacheAsBitmap = true;
        this._redpot = null;
        super.dispose();
    }
}
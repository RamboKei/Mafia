/**
 * 政务
 * author yanyuling
 * date 2017/11/24
 * @class BookroomView
 */
class BookroomView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _nodeContainer2:BaseDisplayObjectContainer;
    public constructor() {
		super();
	}

    public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);

        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        this._nodeContainer2 = new  BaseDisplayObjectContainer();
		

        let bg = BaseBitmap.create("bookroom_bg");
        this._nodeContainer.addChild(bg);

        let posNum =  Api.bookroomVoApi.getSeatNum();

        let curPosNumTxt = ComponentManager.getTextField("",20);
        curPosNumTxt.x = 30;
        curPosNumTxt.y = 10;
        curPosNumTxt.name = "curPosNumTxt";
        this._nodeContainer2.addChild(curPosNumTxt);
        
        let addBtn = ComponentManager.getButton("mainui_btn1","",this.addBtnClickHandler,this);
		addBtn.x = 180;
		addBtn.y =curPosNumTxt.y - 7;
        addBtn.visible = false;
        addBtn.name = "addBtn";
        this._nodeContainer2.addChild(addBtn);

        if (posNum < 5)
        {
            let batchTipTxt = ComponentManager.getTextField(LanguageManager.getlocal('bookRoomServant_batchTip'),20);
            batchTipTxt.x = GameConfig.stageWidth - batchTipTxt.width - 30 ;
            batchTipTxt.y = curPosNumTxt.y;
            batchTipTxt.name = "batchTipTxt";
            this._nodeContainer2.addChild(batchTipTxt);
        }
        

        this.makeBatchBtn(posNum);
        for (var index = 0; index < posNum; index++) {
            this.makeSeatItem(index);
        }

        let scrollH = GameConfig.stageHeigth - this.container.y+10;
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);
        let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
        scrollView.y = -15;
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        let mask = BaseLoadBitmap.create("servant_mask");
        mask.width = GameConfig.stageWidth;
        mask.scaleY = -1;
        mask.y = 120;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);
    }
    protected makeSeatItem(index:number)
    {
        let bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index+1);
        
        let posX = 20;
        if((index%2) == 1)
        {
        //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
        //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        let posY = 500 + Math.floor(index/2)* 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
    }
    protected makeBatchBtn(posNum)
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        if (posNum >= 5 && !this._nodeContainer2.getChildByName("bookroom_batch") )
        {
            let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
            forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
            forpeople_bottom.y = 5;
            // forpeople_bottom.x = 15;
            // forpeople_bottom.y = 45;
            this._nodeContainer2.addChild(forpeople_bottom);
            // forpeople_bottom.addTouchTap(this.batchHandler,this);

            let bookroom_batch = ComponentManager.getButton("bookroom_visitIcon","",this.batchHandler,this);
            // bookroom_batch.anchorOffsetX = bookroom_batch.width/2;
            // bookroom_batch.anchorOffsetY = bookroom_batch.height/2;
            let batchFlag =  BaseBitmap.create("bookroom_batch");
            batchFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - batchFlag.width/2;
            batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
            
            bookroom_batch.x = forpeople_bottom.x + forpeople_bottom.width/2 - bookroom_batch.width/2;
            bookroom_batch.y = forpeople_bottom.y + forpeople_bottom.height/2 - bookroom_batch.height/2;
            bookroom_batch.name = "bookroom_batch";
            this._nodeContainer2.addChild(bookroom_batch);
            this._nodeContainer2.addChild(batchFlag);
        }
        let batchTipTxt = this._nodeContainer2.getChildByName("batchTipTxt");
        if (posNum >= 5 && batchTipTxt )
        {
            batchTipTxt.visible = false;
        }

        this.refreshSeatNum();
        if (posNum == bookroomCfg.maxPos)
        {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }else
        {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
        
    }
    protected batchHandler()
    {
       let keys =  Api.bookroomVoApi.getPosListInStudy();
       if (keys.length > 0 )
       {
           if(Api.bookroomVoApi.isBatchenable() == false)
           {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                return;
           }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{isbatch:1,pos:0});
       }else{
           App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchEmptyTip"));
       }

    }
    protected refreshSeatNum(event?:egret.Event)
    {
        if(event)
        {
            let rdata = event.data.data.data;
            let luckys = rdata.luckys;
            // luckys = [1,2,3];
            if( luckys)
            {
                let luckLen = luckys.length
                if(luckLen > 0)
                {
                    let num =0;
                    let ths =this;
                    let timerNum:number =egret.setInterval(()=> 
                    {
                        num+=1;
                        this.playLucky();
                        if(num >= luckLen)
                        {
                            egret.clearInterval(timerNum);
                        }
                            
                    } ,ths, 1500,1);
                }
            }
        }
        let posNum = Api.bookroomVoApi.getSeatNum();
        let curPosNumTxt = <BaseTextField>this._nodeContainer2.getChildByName("curPosNumTxt");
        let posStr =  Api.bookroomVoApi.getPosListInStudy().length  + "/" +posNum;
        curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm",[posStr]);
    }
    protected buySeatHandlerCallback(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            let posNum = Api.bookroomVoApi.getSeatNum();
            this.makeSeatItem(posNum -1);
            this.makeBatchBtn(posNum);
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip1"));
        }else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip2"));
        }
       
        /**
         * 扩充席位后，需要调整展示
         */
    }
    protected buySeatHandler()
    {
         NetManager.request(NetRequestConst.REQUEST_BOOKROOM_BUY,{});
    }
    protected addBtnClickHandler()
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let needNum = bookroomCfg.needGem[Api.bookroomVoApi.getSeatNum()-1];
        // if (Api.playerVoApi.getPlayerGem() < needNum)
        // {
        //     App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_gemNotEncouch"));
        //     return;
        // }
		let message = LanguageManager.getlocal("bookRoomServant_buySeat",[String(needNum)]);
		let mesObj = {
			 confirmCallback: this.buySeatHandler, 
			 handler: this, 
			 icon:  "itemicon1",
			 iconBg: "itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
             useNum:needNum,
             msg: message ,
             id : 1,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
    }

    private playLucky():void
	{
		let boomPic:BaseBitmap = BaseBitmap.create("manage_boomtext");
		boomPic.anchorOffsetX=boomPic.width/2;
		boomPic.anchorOffsetY=boomPic.height/2;
		let picX = 500;
		let picY = 250;
		boomPic.setPosition(picX,picY);
		LayerManager.msgLayer.addChild(boomPic);
		egret.Tween.get(boomPic).to({scaleX:1.1,scaleY:1.1},50).to({scaleX:1,scaleY:1},70).to({y:picY-50,alpha:0.7},600).call(function(boomPic:BaseTextField){
			boomPic.dispose();
		}.bind(this,boomPic),this);
		App.CommonUtil.showGodbless("bookRoom");
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "bookroom_batch","bookroom_bg","bookroom_cdbg","bookroom_desk",
            "bookroom_tipbg","bookroom_visitIcon","forpeople_bottom","bookroom_visitIcon_down"
		]);
	}
    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);

        this._nodeContainer = null;
        this._nodeContainer2 = null;
        super.dispose();
    }
}
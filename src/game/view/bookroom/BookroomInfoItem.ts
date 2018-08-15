/**
 * 书院 各作为部分部分
 * author yanyuling
 * date 2017/11/23
 * @class BookroomInfoItem
 */
class BookroomInfoItem extends BaseDisplayObjectContainer
{
    private _posId:number = 0;
    private _desk:BaseBitmap;
    private _tipTxt:BaseTextField;
    private _cdTxt:BaseTextField;
    private _bRoomInfoVo:BookroomInfoVo
    private _tipNode:BaseDisplayObjectContainer;
    public constructor()
	{
		super();
	}
	public init(posId:number):void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);

        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);

        this._posId = posId;
        let desk = BaseBitmap.create("bookroom_desk");
        this._desk = desk;
        this.addChild(desk);

        let bookroom_tipbg = BaseBitmap.create("bookroom_tipbg");
        bookroom_tipbg.x = desk.x + desk.width /2 - bookroom_tipbg.width/2;
        bookroom_tipbg.y = desk.y - 40;
        this._tipNode.addChild(bookroom_tipbg);
        bookroom_tipbg.name = "bookroom_tipbg";

        let tipTxt = ComponentManager.getTextField("",20);
        tipTxt.text = LanguageManager.getlocal("bookRoomClickTip");
        tipTxt.x = bookroom_tipbg.x + bookroom_tipbg.width /2 - tipTxt.width/2;
        tipTxt.y = bookroom_tipbg.y  +bookroom_tipbg.height/2 - tipTxt.height/2-5;
        this._tipNode.addChild(tipTxt);
        this._tipTxt = tipTxt;

        this.addTouchTap(this.bookRoomHandler,this);
        this.refreshUI();
    }
    protected refreshUI(event?:egret.Event)
    {
        if(event && this._bRoomInfoVo )
        {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            let rData = event.data.data.data;
            let cmd = event.data.data.cmd
            let pos = rData.bookroompos;
            let poss = rData.bookroom_poss;  
            //批量完成，
            if(pos == 0 && this._bRoomInfoVo)
            {
                return;
            }
            if(pos > 0 && pos != this._posId)
            {
                return;
            }
            let bookCfg = GameConfig.config.bookroomCfg;
            /**
             * 完成学习飘文字
             */

            if (cmd == "bookroom.finish"  && ! this._bRoomInfoVo)
            {
                let rate = 1;
                let addStr = "";
                if(pos == 0 && poss[this._posId] &&  poss[this._posId].pos )
                {
                    rate = poss[this._posId].pos
                }else{
                    if(poss &&  poss.pos)
                    {
                        rate = poss.pos
                    }
                }
               
                
                let strList = [];
                // for (var index = 0; index < rate; index++) {
                    let flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1",[String(bookCfg.getBookExp*rate)]);
                    let flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2",[String(bookCfg.getSkillExp*rate)]);
                    strList.push({tipMessage:flyStr1});
                    strList.push({tipMessage:flyStr2});
                // }
              
                //  strList = [{tipMessage:flyStr1},{tipMessage:flyStr2}];
                let pos2 = this.localToGlobal(this._desk.x +  this._desk.width/2,this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList,pos2);
                // App.CommonUtil.showTip( LanguageManager.getlocal("bookRoomServant_completeFly",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]) );

                // let eData:any=event.data?event.data.data:null;
                // if(eData&&eData.lucky)
				// {
                //     App.CommonUtil.showGodbless("bookRoom");
                // }
            }
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if(this._bRoomInfoVo )
        {
            this._tipTxt.visible = false;
            let servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);
            let servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            let deltaScale = 0.5;
            servantFullImg.setScale(deltaScale);
            servantFullImg.width = 405;
		    servantFullImg.height = 467;
            let maskH = 400;
            servantFullImg.mask = new egret.Rectangle(0,0,servantFullImg.width,maskH);
            servantFullImg.x = this._desk.x + this._desk.width/2 - servantFullImg.width/2*deltaScale;
            servantFullImg.y =  - maskH*deltaScale+30;
            this.addChildAt(servantFullImg,0);
            servantFullImg.name = "servantFullImg";
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;

            let cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.x = this._desk.x + this._desk.width/2 - cdBg.width/2;
            cdBg.y = -40;
            cdBg.name = "cdBg";
            this.addChild(cdBg);

            this._cdTxt = ComponentManager.getTextField("",20);
            this._cdTxt.y = cdBg.y  + 10;
            this.addChild(this._cdTxt);

            if(this._bRoomInfoVo.et < GameData.serverTime)
            {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
            }else
            {
			    let leftTimt =   this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                // this.tick()
                TickManager.removeTick(this.tick,this);
                TickManager.addTick(this.tick,this);
            }
            this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2;
        }else
        {
            let servantFullImg = this.getChildByName("servantFullImg");
            let cdBg = this.getChildByName("cdBg");
            if(cdBg){
                this.removeChild(cdBg);
            }
            if (servantFullImg){
                this.removeChild(servantFullImg);
            }
            this._tipNode.visible = true;
            egret.Tween.get(this._tipNode,{loop:true}).to({y:-10},1000).to({y:0},1000);
            if (this._cdTxt){
                this.removeChild(this._cdTxt);
                this._cdTxt = null;
            }
                
            this._tipTxt.visible = true;
        }
    }

    public tick():boolean
	{   
        if (this._bRoomInfoVo)
        {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            if ( this._bRoomInfoVo.et > GameData.serverTime){
                let leftTimt =  this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                //  LanguageManager.getlocal("affair_cdTip",[]) ;
                let cdBg = this.getChildByName("cdBg");
                this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2;
                cdBg = null;
                return true;
            }else
            {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                return false;
            }
        }
        return false;
	}

    protected bookRoomHandler()
    {
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime)
        {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{pos:this._posId,isbatch:0});
        }
         if (!this._bRoomInfoVo ){
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW,this._posId);
        }
    }

    public dispose()
    {
        TickManager.removeTick(this.tick,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);

        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;

        super.dispose();
    }
}
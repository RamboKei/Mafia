/**
 * 排行列表节点
 * author yanyuling
 * date 2017/10/25
 * @class RankScrollItem
 */
class RankScrollItem  extends ScrollListItem
{
    private _maskImg:BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

        this._rowIdx = index
        this._uiData = data;

        this.width = 602;
        this.height = 52;
        this.addTouch(this.eventHandler,this,null,true);
        let tarColor = TextFieldConst.COLOR_BROWN
        if(this._uiData.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        if (this._rowIdx < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(this._rowIdx+1))
            rankImg.x = 70-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x = 70 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  this._uiData.name;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

        //亲密榜
        if (this._uiData.total_imacy)
        {
            nameTxt.x =  235-nameTxt.width/2;
            let imacyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            imacyTxt.text = this._uiData.total_imacy;//LanguageManager.getlocal("officialTitle"+ this._uiData.level);
            imacyTxt.x = 495-imacyTxt.width/2;
            imacyTxt.y = nameTxt.y;
            this.addChild(imacyTxt);
        }
        else if (this._uiData.cid)  //关卡榜
        {
            nameTxt.x =  235-nameTxt.width/2;
            let bcid:number =  Api.challengeVoApi.getBigChannelIdByCid(this._uiData.cid);
            let challengeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            // challengeTxt.text = this._uiData.cid +"."+ LanguageManager.getlocal("challengeTitle"+ bcid);
            // challengeTxt.x = 480-challengeTxt.width/2;
            challengeTxt.text = bcid +"."+ LanguageManager.getlocal("challengeTitle"+ bcid);
            challengeTxt.x = 430;
            challengeTxt.y = nameTxt.y;
            this.addChild(challengeTxt);
        }
        else //势力榜
        {
            nameTxt.x =  205-nameTxt.width/2;
            if (!this._uiData.zid && this._uiData.title != "")
            {
                let officerImg = BaseLoadBitmap.create("user_title_" + this._uiData.title+"_3");
                let deltaV = 0.8;
				officerImg.width = 155 * deltaV;
				officerImg.height = 59 * deltaV;
                officerImg.x =  320; 
                // officerImg.y = nameTxt.y +nameTxt.height/2 -  30;
                 officerImg.y = nameTxt.y +nameTxt.height/2 -  officerImg.height/2;
                this.addChild(officerImg);
            }
            else
            {
                let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
                if (this._uiData.zid ){
                    officerTxt.text = LanguageManager.getlocal("ranserver2",[this._uiData.zid]);
                }else{
                    officerTxt.text = LanguageManager.getlocal("officialTitle"+ this._uiData.level);
                }
                
                officerTxt.x = 380-officerTxt.width/2;
                officerTxt.y = nameTxt.y;
                this.addChild(officerTxt);
            }
            let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
            powerTxt.x = 530 - powerTxt.width/2;
            powerTxt.y = nameTxt.y;
            this.addChild(powerTxt);
        }

        
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        let lineImg = BaseBitmap.create("rank_line");
        lineImg.x = GameConfig.stageWidth /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);

        let maskImg = BaseBitmap.create("rank_select_mask")
        maskImg.x = GameConfig.stageWidth /2 - maskImg.width/2;
        maskImg.y = 0;
        maskImg.visible = false;
        this._maskImg = maskImg;
        this.addChild(maskImg);
        this.cacheAsBitmap=true;
    }

    protected eventHandler(event:egret.TouchEvent)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
			case egret.TouchEvent.TOUCH_END:
				this._maskImg.visible = false;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this._rowIdx);
                if(this._uiData.zid){
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._uiData.uid,rzid:this._uiData.zid});
                }else{
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                }
                break;
        }
    }
    protected refreshSelectStatus(event: egret.Event )
    {
        let idx = event.data;
        if (this._rowIdx != idx)
        {
            this._maskImg.visible = false;
        }
    }
    
    protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(String(data.ruid) == this._uiData.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = this._uiData.zid;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }
    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap=false;

        super.dispose();
    }
}

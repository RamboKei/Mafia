/**
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class BookroomServantScrollItem
 */
class BookroomServantScrollItem  extends ScrollListItem
{
    private _servantId:string ="";
    static _posId:number = 0;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,servantId:any)
    {
        this._servantId = servantId;
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);

        let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);

        let deltaScale = 0.55;
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);

        let servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath );
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2-5;
        servantImg.y = cardbg.y+ cardbg.height/2-servantImg.height/2-2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);

        let nameTxt = ComponentManager.getTextField("",20);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = 140;
        nameTxt.y = 30;
        this.addChild(nameTxt);

        let skillExpTxt = ComponentManager.getTextField("",20);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp",[String(servantInfoObj.skillExp)]);
        // String(servantInfoObj.skillExp);
        skillExpTxt.x = nameTxt.x;
        skillExpTxt.y = nameTxt.y + 30;
        this.addChild(skillExpTxt);

        // 
       if(Api.bookroomVoApi.isStudying( this._servantId)){
            let flagTxt = ComponentManager.getTextField("",24);
            flagTxt.text = LanguageManager.getlocal("bookRoomServant_studyingTxt");
            flagTxt.x = bottomBg.x + bottomBg.width - 130;
            flagTxt.y = bottomBg.y + bottomBg.height/2 - flagTxt.height/2;;
            this.addChild(flagTxt);
        }else{
            let studyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"bookRoomServant_study",this.studyHandler,this);
            studyBtn.x = bottomBg.x + bottomBg.width - 150;
            studyBtn.y = bottomBg.y + bottomBg.height/2 - studyBtn.height/2;
            this.addChild(studyBtn);
        }
    }

    protected studyHandler()
    {
        if (Api.bookroomVoApi.isStudying(this._servantId))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studying"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{servantid:this._servantId,pos:BookroomServantScrollItem._posId});
    }

    public getSpaceX():number
	{
		return 0;
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
        this._servantId ="";
        super.dispose();
    }

}
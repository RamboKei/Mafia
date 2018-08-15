
class AtkraceChallengeItem extends ScrollListItem
{
    //挑战界面的Itme
    private _needNum:number =0;
    private _itemNum:number =0;
    private _servantId:string ="";
    private haveNumber:number =0;
    private servantid:string ="";
    public static  data:any=[];
	public constructor() 
    {
		super();
	} 

	protected initItem(index:number,servantId:any)
    {

        this._needNum =1;//需要的挑战书数量
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

        //名字
        let nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_QUALITY_BLUE);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = 140;
        nameTxt.y = 10;
        this.addChild(nameTxt);

        //等级
        let levelTxt = ComponentManager.getTextField("atkraceChallengeleve",20);
        levelTxt.text = LanguageManager.getlocal("atkraceChallengeleve",[servantInfoObj.level+""]);
        levelTxt.width=200;
        levelTxt.x = nameTxt.x;
        levelTxt.y = nameTxt.y + 25;
        this.addChild(levelTxt);

        //资质
        let qualityTxt = ComponentManager.getTextField("atkraceChallengequality",20);
        qualityTxt.text = LanguageManager.getlocal("atkraceChallengequality",[servantInfoObj.getTotalBookValue()+""]);
        qualityTxt.x = levelTxt.x;
        qualityTxt.y = levelTxt.y + 25;
        this.addChild(qualityTxt);

        //属性
        let infoAttrTxt = ComponentManager.getTextField("atkraceChallengeinfoAttr",20);
        infoAttrTxt.text = LanguageManager.getlocal("atkraceChallengeinfoAttr",[servantInfoObj.total+""]);
        infoAttrTxt.x = qualityTxt.x;
        infoAttrTxt.y = qualityTxt.y + 25;
        this.addChild(infoAttrTxt);

        //type 1挑战按钮  //2复仇   //3追杀
        var obj:any =[];
        obj._servantId =servantId;
        let challengeBtn:BaseButton;
        if(AtkraceChallengeItem.data.type==1)
        {
        	challengeBtn= ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceChallenge",this.challengBtnHandler,this,obj);
        }
        else if(AtkraceChallengeItem.data.type==2)
        {
            challengeBtn= ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.challengBtnHandler,this,obj);
        }
        else if(AtkraceChallengeItem.data.type==3)
        {
            challengeBtn= ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceVisitTab3",this.challengBtnHandler,this,obj);
        }

    	challengeBtn.setScale(0.85);
		challengeBtn.x = 400;
		challengeBtn.y = 45;
		this.addChild(challengeBtn);
        challengeBtn.visible = this.isBattleing(servantId);
        if(challengeBtn.visible==false)
        {
            //已出使
            let usedTxt = ComponentManager.getTextField("gonetowar2",20,0xff0000);
            usedTxt.text = LanguageManager.getlocal("gonetowar2");
            usedTxt.width=200;
            usedTxt.x = 410;
            usedTxt.y = 50;
            this.addChild(usedTxt);
        }
	}

    public  challengBtnHandler(curr):void
    {
    	// console.log(AtkraceChallengeItem.data.uid+"a~~~~~~~~~~~~~~");
        let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
        if(myAtkInfo&&myAtkInfo.mesid&&myAtkInfo.mesid.sid)
        {
            // let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(myAtkInfo.mesid.sid);
            let str = LanguageManager.getlocal("atkraceHisbattledes");
            App.CommonUtil.showTip(str);
        }
        else
        {   //追杀状态下
            if(AtkraceChallengeItem.data.type==3)
            {
                let haveNumber= Api.itemVoApi.getItemNumInfoVoById(1553);
                this.haveNumber = haveNumber;
                let message: string = LanguageManager.getlocal("atkraceKillbook",[1+""]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon1553", iconBg: "itembg_1", num: haveNumber, msg: message, id : 1553, useNum:1});
   
            }
            else
            {
                let haveNumber= Api.itemVoApi.getItemNumInfoVoById(1552);
                this.haveNumber = haveNumber;
                let message: string = LanguageManager.getlocal("atkraceUseChallengebook",[1+""]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon1552", iconBg: "itembg_1", num: haveNumber, msg: message, id : 1552, useNum:1});
   
            }
       }
    
    }

    private confirmCallbackHandler():void
    {
            // 挑战接口
            // 参数 fuid 指定挑战人
            // --参数 servantid 选择自己门客

            // let maxCount:number = Config.AtkraceCfg.getDailyNum();
			// let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();

        
            
            if(AtkraceChallengeItem.data.type==1)
            { 
                if(this.haveNumber >=this._needNum)
                 {
                    NetManager.request(NetRequestConst.REQUEST_ATKRACE_CHALLENGE, {"fuid":AtkraceChallengeItem.data.uid,"servantid":this._servantId});
                    // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
                 }
                 else
                 {  //挑战令不足
                  	App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
                 }
            }
            //复仇接口
            else if(AtkraceChallengeItem.data.type==2)    
            {   
                if(this.haveNumber >=this._needNum)
                 {
                    NetManager.request(NetRequestConst.REQUEST_ATKRACE_REVENGE, {"fuid":AtkraceChallengeItem.data.uid,"servantid":this._servantId});
                    // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
                 }
                 else
                 {
                       //挑战令不足
                     App.CommonUtil.showTip(LanguageManager.getlocal("challengedes"));
                 }
             }
            //追杀接口
            else if(AtkraceChallengeItem.data.type==3)
            {
                //追杀令牌
                if(Api.itemVoApi.getItemNumInfoVoById(1553)>=1)
                { 
                    NetManager.request(NetRequestConst.REQUEST_ATKRACE_KILL, {"fuid":AtkraceChallengeItem.data.uid,"servantid":this._servantId});
                    // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
                }
                else
                {
                    //追杀令不足
                    App.CommonUtil.showTip(LanguageManager.getlocal("killdes"));
                }

            }
    }
    //查看更多 挑战回调
    private challengeCallback(data:any):void
    {
        
    }

	public dispose():void
    {
      
        this._needNum =0;
        this._itemNum =0;
        this._servantId ="";
        this.servantid ="";
        this.haveNumber =0;
        AtkraceChallengeItem.data =[];
        super.dispose();
     
    }
    public isBattleing(servantId:string)
   	{
		let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        for (var key in myInfo.asids) {
            if(myInfo.asids[key] == servantId)
                return false;
        }
        return true;
    }
}
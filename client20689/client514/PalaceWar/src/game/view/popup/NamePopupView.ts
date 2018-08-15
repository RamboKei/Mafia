/**
 * 起名改名
 * author dky
 * date 201710/13
 * @class NamePopupView
 * 1赐名 2小孩改名 3大孩改名 4帮会改名
 */
class NamePopupView  extends PopupView
{   
    private _type:number;
	private _useCallback:Function;
	private _handler:any;

	private _inputTextField:BaseTextField;

    private _cancelBtn:BaseButton;
	private _errorText:string;
	private _randomBtn:BaseButton;
	private _initName = "";

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

        let curName = this.param.data.name
		let disAdd = 0;
        if(curName){

        }else{
            curName = "测试测试";
        }
       
		if(this._type == 2){
			disAdd = 20;
		}

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

        //笔
		let penIcon:BaseBitmap = BaseBitmap.create("public_pen_icon");
		penIcon.x = 100;
		penIcon.y = bg.y + bg.height/2 - penIcon.height/2 - disAdd;
		this.addChildToContainer(penIcon);

  
        //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,200,45,"public_9_bg5");

		inputTF.x = this.viewBg.x + this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = bg.y + bg.height/2 - inputTF.height/2 - disAdd;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 6;
		

		this._randomBtn = ComponentManager.getButton("btn_random","",this.clickRanomHandler,this);
		this._randomBtn.x = 400;
		this._randomBtn.y = bg.y + bg.height/2 - this._randomBtn.height/2 - disAdd;
		this._randomBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._randomBtn);


		if(this._type == 1){
			this.clickRanomHandler();
		}	
		else if(this._type == 2 ){
			let childInfoVo = Api.childVoApi.getChildrenInfoVoById(this.param.data.childId)
			this._inputTextField.text = childInfoVo.name;
			this._initName = childInfoVo.name;
			
			let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
			changeName1.x = 140;
			changeName1.y = 170;
			this.addChildToContainer(changeName1);

			let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			gemIcon.x = changeName1.x + changeName1.width + 20;
			gemIcon.y = changeName1.y - 10;
			this.addChildToContainer(gemIcon);

			let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
			numTf.text = Config.ChildbaseCfg.renameGem.toString();
			numTf.x = gemIcon.x + gemIcon.width + 20;
			numTf.y = changeName1.y;
			this.addChildToContainer(numTf);

			let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName2.text = LanguageManager.getlocal("namePopupChangeName2");
			changeName2.x = numTf.x + numTf.width + 20;;
			changeName2.y = changeName1.y;
			this.addChildToContainer(changeName2);

		}
		else if(this._type == 3 ){
			let adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId)
			this._inputTextField.text = adultInfoVo.name;
			this._initName = adultInfoVo.name;
			
			let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
			changeName1.x = 140;
			changeName1.y = 170;
			this.addChildToContainer(changeName1);

			let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			gemIcon.x = changeName1.x + changeName1.width + 20;
			gemIcon.y = changeName1.y - 10;
			this.addChildToContainer(gemIcon);

			let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
			numTf.text = Config.ChildbaseCfg.renameGem.toString();
			numTf.x = gemIcon.x + gemIcon.width + 20;
			numTf.y = changeName1.y;
			this.addChildToContainer(numTf);

			let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName2.text = LanguageManager.getlocal("namePopupChangeName2");
			changeName2.x = numTf.x + numTf.width + 20;;
			changeName2.y = changeName1.y;
			this.addChildToContainer(changeName2);

		}

		else if(this._type == 4 ){
			let allianceVo = Api.allianceVoApi.getAllianceVo();
			this._inputTextField.text = allianceVo.name;
			this._initName = allianceVo.name;
			
			let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName1.text = LanguageManager.getlocal("namePopupChangeName1");
			changeName1.x = 140;
			changeName1.y = 170;
			this.addChildToContainer(changeName1);

			let gemIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			gemIcon.x = changeName1.x + changeName1.width + 20;
			gemIcon.y = changeName1.y - 10;
			this.addChildToContainer(gemIcon);

			let numTf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
			numTf.text = Config.AlliancebaseCfg.renameNeedGem.toString();
			numTf.x = gemIcon.x + gemIcon.width + 20;
			numTf.y = changeName1.y;
			this.addChildToContainer(numTf);

			let changeName2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			changeName2.text = LanguageManager.getlocal("namePopupChangeName3");
			changeName2.x = numTf.x + numTf.width + 20;;
			changeName2.y = changeName1.y;
			this.addChildToContainer(changeName2);

			this._randomBtn.visible = false;

		}

        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.y = bg.y + bg.height + 15;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}

	private clickRanomHandler():void
	{
		let firstName = "";
		if(this._type == 1||this._type == 2||this._type == 3)
		{
			firstName = Api.playerVoApi.getPlayerName().substring(0,1)
		}
		else
		{
			firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1,604)) ;
		}
		
		let sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1,3763)) ;
		this._inputTextField.text = firstName + sercondName;
	}

	protected clickConfirmHandler(data:any):void
	{
		let txtStr:string=this._inputTextField.text;
		if(txtStr.length > 8)
		{
			this._errorText = "名字不能超过8位字符";
			App.CommonUtil.showTip(this._errorText);
			return;
		}
		else if(txtStr.length <= 0)
		{
			
			this._errorText = "名字不能为空";
			App.CommonUtil.showTip(this._errorText);
			return;
		}	
		//正则表达式
		if(!App.StringUtil.userNameCheck(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		if( txtStr.length < 2 || txtStr.length > 6)
		{

			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
			return;
		}
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			return;
		}
		// if(this._type == 2 ){
		// 	let childInfoVo = Api.childVoApi.getChildrenInfoVoById(this.param.data.childId)
		// 	if(txtStr == childInfoVo.name)
		// 	{
		// 		this.hide();
		// 		return;
		// 	}
		// }
		
		if(Config.ChildbaseCfg.renameGem > Api.playerVoApi.getPlayerGem() && this._type == 2 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		if(Config.AlliancebaseCfg.renameNeedGem > Api.playerVoApi.getPlayerGem() && this._type == 4 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}

		if(this._initName == this._inputTextField.text ){
			App.CommonUtil.showTip(LanguageManager.getlocal("nameUnChanged"));
			return;
		}

		if(this._type == 1 || this._type == 2|| this._type == 3){
			this.request(NetRequestConst.REQUEST_CHILD_RENAME,{childId:this.param.data.childId,name:this._inputTextField.text});
		}
		if(this._type == 4){
			this.request(NetRequestConst.REQUEST_ALLIANCE_RENAME,{name:this._inputTextField.text});
		}
		
		// this.hide();
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.cmd == NetRequestConst.REQUEST_CHILD_RENAME){
			// App.LogUtil.log("123123")
			if(data.data.data.samename == true){
				App.CommonUtil.showTip(LanguageManager.getlocal("namePopupTip1"))
				return;
			}
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				App.CommonUtil.showTip(LanguageManager.getlocal("child_nameTip"));
			}
	
			this.hide();
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_RENAME){
			// App.LogUtil.log("123123")
			if(data.data.data.samename == true){
				App.CommonUtil.showTip(LanguageManager.getlocal("namePopupTip1"))
				return;
			}
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_nameTip"));
			this.hide();
		}
		
	}
    private clickCancelHandler(param:any):void
	{
		// if(this._cancelCallback)
		// {
		// 	this._cancelCallback.apply(this._handler,[]);
		// }


		this.hide();
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }
    protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

    protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
    protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
    protected getTitleStr(){
         this._type = this.param.data.type 
        return "namePopupTitle" + this._type
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["shield_cn"]);
	}
	
	public dispose():void
	{
		this._type = null;
		this._useCallback = null;
		this._handler = null;

		this._inputTextField = null;

		this._cancelBtn = null;
		this._errorText = null;
		this._randomBtn = null;
		this._initName = "";
		super.dispose();
	}
}
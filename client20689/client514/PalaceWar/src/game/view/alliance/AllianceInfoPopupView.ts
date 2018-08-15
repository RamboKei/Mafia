/**
 * 帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceInfoPopupView
 */
class AllianceInfoPopupView  extends PopupView
{   

	private _inputWeixin:BaseTextField;
	private _inputQQ:BaseTextField;
	private _inputNotice:BaseTextField;
	private _inputMsg:BaseTextField;
	private _penIcon:BaseBitmap;
	private _nameTF:BaseTextField;


	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 643;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
		

		let nameStr = LanguageManager.getlocal("allianceInfoName",[allianceVo.name])
		this._nameTF = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._nameTF.x = 50;
		this._nameTF.y = 45;
		this.addChildToContainer(this._nameTF);

		//笔
		this._penIcon = BaseBitmap.create("public_pen_icon");
		this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
		this._penIcon.y = this._nameTF.y + this._nameTF.height/2 - this._penIcon.height/2;
		this.addChildToContainer(this._penIcon);
		this._penIcon.addTouchTap(this.reNameCilck, this);

		let info2Str = LanguageManager.getlocal("allianceFindInfo2",[allianceVo.creatorname])
		let info2TF:BaseTextField = ComponentManager.getTextField(info2Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info2TF.y = this._nameTF.y + this._nameTF.height + 10;
		info2TF.x = this._nameTF.x;
		this.addChildToContainer(info2TF);

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
		let info3Str = LanguageManager.getlocal("allianceInfoLevel",[allianceVo.level.toString(),allianceVo.exp.toString(), allianceCfg.exp.toString()])
		let info3TF:BaseTextField = ComponentManager.getTextField(info3Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info3TF.y = info2TF.y + info2TF.height + 10;
		info3TF.x = this._nameTF.x;
		this.addChildToContainer(info3TF);

		let info4Str = LanguageManager.getlocal("allianceFindInfo6",[allianceVo.mn + "/" + allianceVo.maxmn])
		let info4TF:BaseTextField = ComponentManager.getTextField(info4Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info4TF.y = info3TF.y + info3TF.height + 10;
		info4TF.x = this._nameTF.x;
		this.addChildToContainer(info4TF);

		let info5Str = LanguageManager.getlocal("allianceFindInfo4",[allianceVo.wealth.toString()])
		let info5TF:BaseTextField = ComponentManager.getTextField(info5Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info5TF.y = info4TF.y + info4TF.height + 10;
		info5TF.x = this._nameTF.x;
		this.addChildToContainer(info5TF);

		//联盟微信
		let weixinText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateWeixinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		weixinText.x = 50;
		weixinText.y = info5TF.y + info5TF.height + 10;
		this.addChildToContainer(weixinText);
		let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_9_bg5",LanguageManager.getlocal("allianceCreateWeixinholder"),0xb1b1b1,allianceVo.cweixin);
		inputTF2.x = 50;
		inputTF2.y = weixinText.y + weixinText.height + 10;
		this.addChildToContainer(inputTF2);
		this._inputWeixin = <BaseTextField>inputTF2.getChildByName("textField");
		this._inputWeixin.maxChars = 15;


		//联盟Q群
		let qqText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateQQTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		qqText.x = 50;
		qqText.y = inputTF2.y + inputTF2.height + 10;
		this.addChildToContainer(qqText);
		let inputTF3 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_9_bg5",LanguageManager.getlocal("allianceCreateQQholder"),0xb1b1b1,allianceVo.cqq);
		inputTF3.x = 50;
		inputTF3.y = qqText.y + qqText.height + 10;
		this.addChildToContainer(inputTF3);
		this._inputQQ = <BaseTextField>inputTF3.getChildByName("textField");
		this._inputQQ.maxChars = 15;


		//对内公告
		let noticeText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateNoticeTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		noticeText.x = 50;
		noticeText.y = inputTF3.y + inputTF3.height + 10;
		this.addChildToContainer(noticeText);
		let inputTF4 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,100,"public_9_probiginnerbg",LanguageManager.getlocal("allianceCreateMsgholder"),0xb1b1b1,allianceVo.message);
		inputTF4.x = 50;
		inputTF4.y = noticeText.y + noticeText.height + 15;
		this.addChildToContainer(inputTF4);
		this._inputNotice = <BaseTextField>inputTF4.getChildByName("textField");
		this._inputNotice.y = 10;
        this._inputNotice.height = 90;
        this._inputNotice.width = 456;
		this._inputNotice.maxChars = 40;
		this._inputNotice.multiline = true;

		//联盟公告
		let msgText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateMsgTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		msgText.x = 50;
		msgText.y = inputTF4.y + inputTF4.height + 10;
		this.addChildToContainer(msgText);
		let inputTF5 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,100,"public_9_probiginnerbg",LanguageManager.getlocal("allianceCreateMsgholder"),0xb1b1b1,allianceVo.intro);
		inputTF5.x = 50;
		inputTF5.y = msgText.y + msgText.height + 15;
		this.addChildToContainer(inputTF5);
		this._inputMsg = <BaseTextField>inputTF5.getChildByName("textField");
		this._inputMsg.y = 10;
        this._inputMsg.height = 90;
        this._inputMsg.width = 456;
		this._inputMsg.maxChars = 40;
		this._inputMsg.multiline = true;
		// if(allianceVo.intro != ""){
		// 	this._inputMsg.text = allianceVo.intro;
		// 	this._inputMsg.textColor = TextFieldConst.COLOR_WHITE;
		// 	this._inputMsg.bindData = true;
		// }


        let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceInfoSave",this.createHandler,this);
		changeBtn.x = this.viewBg.width/2 - changeBtn.width/2;
		changeBtn.y = inputTF5.y + inputTF5.height + 15;
		changeBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(changeBtn);


		
	}

	private reNameCilck()

	{
		ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 4,confirmCallback: this.reNameCallBack, handler: this});
	}

	private reNameCallBack()
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let nameStr = LanguageManager.getlocal("allianceInfoName",[allianceVo.name])
		this._nameTF.text = nameStr;
		this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
	}

    private createHandler(param:any):void
	{


		// //名字检测
		// let txtStr:string=this._inputName.text;
		// if(!App.StringUtil.userNameCheck(txtStr))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
		// 	return;
		// }
		// if( txtStr.length < 2 || txtStr.length > 6)
		// {

		// 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
		// 	return;
		// }
		// if(Config.ShieldCfg.checkShield(txtStr)==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
		// 	return;
		// }
		

		//公告检查
		let msg:string=this._inputMsg.text;
		 if(Config.ShieldCfg.checkOnlyShield(msg)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		let weixin  = this._inputWeixin.text;
		let qq = this._inputQQ.text;
		let notice = this._inputNotice.text;
		 if(Config.ShieldCfg.checkOnlyShield(msg)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		 if(Config.ShieldCfg.checkOnlyShield(qq)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		 if(Config.ShieldCfg.checkOnlyShield(notice)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		if(!this._inputNotice.bindData){
			notice  = "";
		}
		if(!this._inputQQ.bindData){
			qq  = "";
		}
		if(!this._inputWeixin.bindData){
			weixin  = "";
		}
		if(!this._inputMsg.bindData){
			msg  = "";
		}
		let joinSwitch = 0;



		this.request(NetRequestConst.REQUEST_ALLIANCE_MODINFO, { cweixin:weixin,cqq:qq,message:notice,intro:msg });
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_MODINFO) {
			if(this.param.data.callback){
				// this.param.data.callback.apply(this.param.data.handler,[]);
				// this.hide();
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceInfoSaveTip"));
		}
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"shield_cn"
					]);
	}

	
    protected getTitleStr(){
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    }


	public dispose():void
	{

		// this.removeTouchTap();
		this._inputWeixin = null;
		this._inputQQ = null;
		this._inputNotice = null;
		this._inputMsg = null;
		this._penIcon = null;
		this._nameTF = null;
		super.dispose();
	}
}
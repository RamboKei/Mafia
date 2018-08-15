/**
 * 登录错误弹板
 * author dmj
 * date 2017/9/20
 * @class ErrorPopupView
 */
class ErrorPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 124;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		let messageStr:string = this.param.data.msg;

		let messageTF:BaseTextField = new BaseTextField();
		messageTF.text = messageStr;
		messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		messageTF.x = this.getShowWidth()/2 - messageTF.width/2;
		messageTF.y = 30;
		this.height = 200;
		this.addChildToContainer(messageTF);
	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,70);
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
        
        return "loginFail"
    }
	protected getCloseBtnName():string
	{
		return  null;
	}

	public hide()
	{
		if(this.param.data.callback){
			this.param.data.callback.apply();
		}
		super.hide()
	}

	public dispose():void
	{
		this._callback = null;
		super.dispose();
	}
}
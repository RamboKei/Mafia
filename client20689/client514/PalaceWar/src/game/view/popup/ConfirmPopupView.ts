/**
 * 通用确认面板
 * author dky
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class ConfirmPopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
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
		bg.height = 150;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;

		let messageStr:string = this.param.data.msg;

		let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = bg.y + bg.height/2 - msgTF.height/2;
		msgTF.lineSpacing = 10;
		this.addChildToContainer(msgTF);


		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"confirmBtn",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = this.getShowWidth()/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
		

		if(this.param.data.needCancel)
		{
			let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);	
			cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
			cancelBtn.x = 80;
			cancelBtn.y = bg.y + bg.height + 20;
			this.addChildToContainer(cancelBtn);
			conBtn.x = 330;
		}
		

	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		
	}

	protected isTouchMaskClose():boolean
	{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void
	{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}
	protected clickCancelHandler(data:any):void
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply(this.param.data.handler,null);
		// }
		this.hide();
	}
    // protected getConfirmBtnStr():string
	// {
	// 	return "sysConfirm";
	// }
    // protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }
    protected getTitleStr(){
        
        return this.param.data.title;
    }
	protected getCloseBtnName():string
	{
		return  null;
	}

	public hide()
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply();
		// }
		super.hide()
	}
	protected getParent():egret.DisplayObjectContainer
	{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}
	public dispose():void
	{
		this._callback = null;
		super.dispose();
	}
}
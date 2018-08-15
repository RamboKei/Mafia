/**
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
class ItemUseConstPopupView extends PopupView
{
	private _cancelCallback:Function;
	private _confirmCallback:Function;
	private _handler:any;
	private _cancelBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let data = this.param.data;
		let itemid = data.id;
		if(data.cancelCallback)
		{
			this._cancelCallback = data.cancelCallback;
		}
		
		this._confirmCallback = data.confirmCallback;
		this._handler = data.handler;
		let iconPic:string = data.icon;
		let iconBg:string = data.iconBg;
		let msg:string = data.msg;
		let num = data.num;
		let useNum = data.useNum || 0;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = data.height || 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let temX = this.viewBg.x + this.viewBg.width/2 - 50;
		let temY = 29;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(iconBg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemid));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true);
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);
		//中间改为消耗数量
		let numTF:BaseTextField = ComponentManager.getTextField(useNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		numTF.x = temX + 98 - numTF.width;
		numTF.y = temY + 98 - numTF.height;
		this.addChildToContainer(numTF);
		//换行添加当前拥有数目
		// msg += `\n${cur_have}`;
		let msgTF:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = temY + temH + 25;
		msgTF.lineSpacing = 6;
		this.addChildToContainer(msgTF);

		let cur_have = LanguageManager.getlocal(num >= useNum ? "itemUseNewTip" : "itemUseNewTip2",[itemCfg.name,App.StringUtil.toString(num)]);
		let haveTxt:BaseTextField = ComponentManager.getTextField(cur_have,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		haveTxt.width = 480;
		haveTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		haveTxt.x = this.viewBg.x + this.viewBg.width/2 - haveTxt.width/2;
		haveTxt.y = msgTF.y + msgTF.textHeight + 25;
		this.addChildToContainer(haveTxt);
		// msgTF.lineSpacing = data.linespacing || 20;


		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.y = bg.y + bg.height + 15;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{
		if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		{
			if(this.param.data.icon == "itemicon1"){
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
			}
			
			this.hide();
			return;
		}
		App.LogUtil.log("clickConfirmHandler");
		if(this._confirmCallback)
		{
			this._confirmCallback.apply(this._handler,[]);
		}
		
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		if(this._cancelCallback)
		{
			this._cancelCallback.apply(this._handler,[]);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		this._cancelCallback = null;
		this._confirmCallback = null;
		this._handler = null;
		this._cancelBtn = null;
		super.dispose();
	}
}
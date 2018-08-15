class PrestigeItemPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "prestigeItemName"+this.param.data.itemId;
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 390;
		bg.height = 170;
		bg.x = 158;
		bg.y = 70-this.getContainerY();
		this.addChildToContainer(bg);
		
		let itemId:number = this.param.data.itemId;

		let tequanIconBg:BaseBitmap = BaseBitmap.create("itembg_7"); //prestige_circle
		tequanIconBg.setPosition(30, bg.y+bg.height/2-tequanIconBg.height/2);
		this.addChildToContainer(tequanIconBg);

		let prerogativeBtn:BaseBitmap = BaseBitmap.create("prestige_prerogative"+itemId);        
		prerogativeBtn.setPosition(tequanIconBg.x+tequanIconBg.width/2 -prerogativeBtn.width/2, tequanIconBg.y+tequanIconBg.height/2-prerogativeBtn.height/2);
		this.addChildToContainer(prerogativeBtn);

		let prerogativeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("prestigeItemDesc"+itemId),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		prerogativeDesc.setPosition(25+bg.x,bg.y+20);
		prerogativeDesc.width = 310;
		prerogativeDesc.lineSpacing = 6;
		this.addChildToContainer(prerogativeDesc);
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}
}
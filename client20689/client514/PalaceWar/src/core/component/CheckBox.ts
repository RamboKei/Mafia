class CheckBox extends BaseDisplayObjectContainer
{
	private _isSelected:boolean=false;
	private _selectBox:BaseBitmap;
	private _txt:BaseTextField;
	public constructor() 
	{
		super();
	}

	public init(desc:string):void
	{
		this._selectBox=BaseBitmap.create("public_select");
		this._selectBox.addTouchTap(this.selectHandler,this);
		this.addChild(this._selectBox);

		if(desc)
		{
			this._txt=ComponentManager.getTextField(desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
			this._txt.setPosition(this._selectBox.x+this._selectBox.width+5,this._selectBox.y+(this._selectBox.height-this._txt.height)/2);
			this.addChild(this._txt);
		}
	}
	private selectHandler():void
	{
		this.isSelected=!this.isSelected;
		SoundManager.playEffect(SoundConst.EFFECT_CLICK);
	}

	private set isSelected(_isSelected:boolean)
	{
		this._isSelected=_isSelected;
		this._selectBox.texture=ResourceManager.getRes(this._isSelected?"public_select_down":"public_select");
	}
	private get isSelected():boolean
	{
		return this._isSelected;
	}

	public checkSelected():boolean
	{
		return this.isSelected;
	}

	public setSelected(_isSelected:boolean):void
	{
		this.isSelected=Boolean(_isSelected);
	}

	public dispose():void
	{
		this._isSelected=false;
		this._selectBox=null;
		this._txt=null;
		super.dispose();
	}
}
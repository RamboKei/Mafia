
class AnnouncementScrollItem extends ScrollListItem {


	private bg1: BaseBitmap = null;
	private bg2: BaseBitmap = null;
	public itemListType: boolean = false;
	public touchNum: number = 0;
	private _titleText: BaseTextField = null;
	private _contentText: BaseTextField = null;
	private currData: any = {};
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any) {

		this.currData = data;

		this.bg1 = BaseBitmap.create("public_9_bg35");
		this.bg1.width = 506;
		this.bg1.height = 60;
		this.addChild(this.bg1);

		if (this.itemListType) {
			if(GameAnnouncementView.currNum ==index)
			{
				this.touchNum+=1;
				this.showDes();
			}
		}
		else {
			this.closeDes();
		}
		
		this.showText();
	}
	public showText(): void {
		this._titleText = ComponentManager.getTextField(this.currData.title , TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._titleText.x = this.bg1.x + 30;
		this._titleText.y = this.bg1.y + 20;
		this.addChild(this._titleText);
	}
	public showDes(): void {

		this.bg2 = BaseBitmap.create("public_9_probiginnerbg");
		this.bg2.width = 502;
		this.bg2.height = 220;
		this.bg2.x=this.bg2.x+2;
		this.bg2.y = this.bg1.height-12;
		this.addChild(this.bg2);
		this.setChildIndex(this.bg2,0);

		this._contentText = ComponentManager.getTextField(this.currData.content, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._contentText.x = this.bg1.x + 20;
		this._contentText.y = this.bg1.y + 65;
		this._contentText.lineSpacing =6;
		this._contentText.width = this.bg2.width - 30;
		// this._contentText.height = this.bg2.height - 20;
		this.addChild(this._contentText);
		this.bg2.height =this._contentText.textHeight+30;
		
	}

	public closeDes(): void 
	{
		this.bg2 =null;
		this._contentText =null;
		
		// if (this.bg2) {
		// 	this.removeChild(this.bg2);
		// }
		// if(this._contentText)
		// {
		//  this.removeChild(this._contentText)
		// }
	}
	
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		this.bg1 = null;
		this.bg2 = null;
		this._titleText = null;
		this._contentText = null
		super.dispose();
	}
}
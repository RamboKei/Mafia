/**
 *招亲的子嗣列表
 * author dky
 * date 2017/10/30
 * @class AdultMarryScrollItem
 */
class AdultMarryScrollItem extends ScrollListItem
{

	private _childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}):void
	{
		this.width = 618;
		this.height = 208 ;
		
		// childInfo.total
		this._childInfo = childInfo;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg31");
		bg.width = this.width;
		bg.height = this.height;
		bg.x = 5;
		// nameBg.x = 25;
		// nameBg.y = 40;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_smallbg");
		this.addChild(childbg);
		childbg.x = bg.x + 10;
		childbg.y = bg.y + bg.height/2 - childbg.height/2;

		let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
		bg2.width = 370;
		bg2.height = 100;
		bg2.x = childbg.x + childbg.width + 10;
		bg2.y = childbg.y + 10;
		this.addChild(bg2);
		let iconStr = "adult_boy";
		if(childInfo.sex == 2){
			iconStr = "adult_girl";
		}	


		let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
		qualityBg.x = childbg.x + 10;
		qualityBg.y = childbg.y + 10;
		this.addChild(qualityBg);

		let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + childInfo.aquality);
		qualityBB.x = childbg.x + 10;
		qualityBB.y = childbg.y + 15;
		qualityBB.setScale(0.7);
		this.addChild(qualityBB);

		let icon:BaseBitmap = BaseBitmap.create(iconStr);
		icon.x = bg.x + 40;
		icon.y = 20;
		icon.setScale(0.45)
		this.addChild(icon);

		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		nameTF.x = bg2.x + 5;
		nameTF.y = bg2.y + 7;
		this.addChild(nameTF);

		let fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
		let fatherTF = ComponentManager.getTextField(fatherStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		fatherTF.x = nameTF.x;
		fatherTF.y = nameTF.y + nameTF.height + 10;
		this.addChild(fatherTF);

		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		attrTF.x = nameTF.x;
		attrTF.y = fatherTF.y + nameTF.height + 10;
		this.addChild(attrTF);

		//联姻
		let marrmyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultMarry",this.marryBtnClick,this);
		marrmyBtn.x = 450;
		marrmyBtn.y = bg2.y + bg2.height + 12;
		// marrmyBtn.
		this.addChild(marrmyBtn);
		marrmyBtn.setColor(TextFieldConst.COLOR_BLACK);
		
	}

    private marryBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._childInfo.id,"childId":this._childInfo.id});
    }

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._childInfo = null;
		super.dispose();
	}
}
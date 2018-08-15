/**
 *选孩子结婚
 * author dky
 * date 2017/11/1
 * @class AdultChooseChildScrollItem
 */
class AdultChooseChildScrollItem extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	private _childInfo:AdultInfoVo;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,childInfo:AdultInfoVo):void
	{
		this.width = 244 + this.getSpaceX();
		this.height = 292 ;
		
		// childInfo.total
		this._childInfo = childInfo;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg31");
		bg.width = 244;
		bg.height = 292;
		bg.x = 5;
		// nameBg.x = 25;
		// nameBg.y = 40;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_smallbg");
		this.addChild(childbg);
		childbg.x = bg.x + 15;
		childbg.y = 40;

		// let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
		// bg2.width = 370;
		// bg2.height = 100;
		// bg2.x = childbg.x + childbg.width + 10;
		// bg2.y = childbg.y + 10;
		// this.addChild(bg2);
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
		icon.y = 40;
		icon.setScale(0.45)
		this.addChild(icon);

		// adult_attbg

		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		nameTF.x = this.width/2 - nameTF.width/2;
		nameTF.y =  15;
		this.addChild(nameTF);


		let attrBg:BaseBitmap = BaseBitmap.create("adult_attbg");
		attrBg.x = childbg.x + 40;
		attrBg.y = childbg.y + childbg.height - attrBg.height;
		this.addChild(attrBg);


		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.attrVo.attTotal;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		attrTF.x = attrBg.x + attrBg.width/2 - attrTF.width/2;
		attrTF.y = attrBg.y + attrBg.height/2 - attrTF.height/2;
		this.addChild(attrTF);

		
		//choose
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"adultMarryViewTitle",this.chooseBtnClick,this);
		chooseBtn.x = this.width/2 - chooseBtn.width/2;
		chooseBtn.y = childbg.y + childbg.height + 9;
		this.addChild(chooseBtn);
		chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		
	}


	  private chooseBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,{"childId":this._childInfo.id});
    }

	public getSpaceY():number
	{
		return 10;
	}
	public getSpaceX():number
	{
		return 10;
	}

	public dispose():void
	{
		this._intimacyTF = null;
		this._childInfo = null;
		super.dispose();
	}
}
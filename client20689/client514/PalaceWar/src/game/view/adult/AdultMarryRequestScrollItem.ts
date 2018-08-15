/**
 *向我提亲的子嗣列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
class AdultMarryRequestScrollItem extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	private _childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}):void
	{
		this.width = 500;
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
		icon.y = 20;
		icon.setScale(0.45)
		this.addChild(icon);

		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		nameTF.x = childbg.x + childbg.width + 10;
		nameTF.y = childbg.y + 7;
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

		let costStr = LanguageManager.getlocal("adultMarryRequestCost");
		let costTF = ComponentManager.getTextField(costStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		costTF.x = nameTF.x;
		costTF.y = attrTF.y + nameTF.height + 10;
		this.addChild(costTF);


		let gemBg = BaseLoadBitmap.create("itemicon1");
		gemBg.setScale(0.45);
		gemBg.x = costTF.x + costTF.width - 7;
		gemBg.y = 100;
		this.addChild(gemBg);

		let costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;

		let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

		let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
		let costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
		let costNum = costGem + "/" + itemCfg.name;

		let costNumTF = ComponentManager.getTextField(costNum,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);
		costNumTF.x = nameTF.x + 105;
		costNumTF.y = attrTF.y + nameTF.height + 10;
		this.addChild(costNumTF);

		//拒绝
		let refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"adultMarryRequestRefuse",this.refuseBtnClick,this);
		refuseBtn.x = nameTF.x;
		refuseBtn.y = costTF.y + costTF.height + 7;
		this.addChild(refuseBtn);
		refuseBtn.setColor(TextFieldConst.COLOR_BLACK);

		//choose
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"adultMarryRequestChooseChild",this.chooseBtnClick,this);
		chooseBtn.x = refuseBtn.x + refuseBtn.width + 5;
		chooseBtn.y = costTF.y + costTF.height + 7;
		this.addChild(chooseBtn);
		chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		
	}

    private refuseBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,{"id":this._childInfo.id,"childId":this._childInfo.id});
    }

	  private chooseBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,{"childInfo":this._childInfo});
    }

	public getSpaceY():number
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
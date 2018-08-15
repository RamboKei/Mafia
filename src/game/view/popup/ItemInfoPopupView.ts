/**
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
class ItemInfoPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 390;
		bg.height = 170;
		bg.x = 158;
		bg.y = 70-this.getContainerY();
		this.addChildToContainer(bg);
		
		let itemCfg:Config.ItemItemCfg|RewardItemVo = null;
		if(typeof(this.param.data)=="string"||typeof(this.param.data)=="number")
		{
			itemCfg=Config.ItemCfg.getItemCfgById(Number(this.param.data));
			if(!itemCfg)
			{
				App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
				return;
			}
		}
		else if(this.param.data instanceof RewardItemVo)
		{
			itemCfg=this.param.data;
		}
		else if(this.param.data.dType && this.param.data.dType == "json") 
		{
			itemCfg=this.param.data;
		}
		else
		{
			App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
			return;
		}
		let itemName:string = itemCfg.name;
		let iconPic:string = itemCfg.icon;
		let effectDesc:string = itemCfg.desc;
		let dropDesc:string = itemCfg.dropDesc;
		let effectTitle:string = LanguageManager.getlocal("effectTitle");
		let dropTitle:string = LanguageManager.getlocal("dropTitle");

		this.titleTF.text = itemName;
		let icon=GameData.getItemIcon(itemCfg,false);
		let numLb:BaseTextField=<BaseTextField>icon.getChildByName("numLb");
		if(numLb)
		{
			numLb.visible=false;
		}
		icon.x = 40;
		icon.y = 95-this.getContainerY();
		this.addChildToContainer(icon);

		// let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		// bg1.width = 370;
		// bg1.height = icon.height + 30;
		// bg1.x = icon.x + icon.width + 5;
		// bg1.y = icon.y - 15;
		// this.addChildToContainer(bg1);

		// let nameTF:BaseTextField = new BaseTextField();
		// nameTF.text = itemName;
		// nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
		// nameTF.x = bg1.x + bg1.width/2 - nameTF.width/2;
		// nameTF.y = bg1.y + bg1.height/2 - nameTF.height/2;
		// this.addChildToContainer(nameTF);

		

		let effectTitleTF:BaseTextField = ComponentManager.getTextField(effectTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		effectTitleTF.x = 163 + 8;
		effectTitleTF.y = 29 + 8;
		this.addChildToContainer(effectTitleTF);

		let effectDescTF:BaseTextField = ComponentManager.getTextField(effectDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
		effectDescTF.y = effectTitleTF.y;
		effectDescTF.width = 300;
		this.addChildToContainer(effectDescTF);

		let dropTitleTF:BaseTextField = ComponentManager.getTextField(dropTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		dropTitleTF.x = 163 + 8;
		dropTitleTF.y = 29 + 80;
		this.addChildToContainer(dropTitleTF);

		let dropDescTF:BaseTextField = ComponentManager.getTextField(dropDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
		dropDescTF.y = dropTitleTF.y;
		dropDescTF.width = 300;
		this.addChildToContainer(dropDescTF);
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}

	public dispose():void
	{

		super.dispose();
	}
}
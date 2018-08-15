/**
 * 每日建设
 * author dky
 * date 2017/12/6
 * @class AllianceBuildScrollItem
 */
class AllianceBuildScrollItem extends ScrollListItem
{

	// 数量
	private _itemIndex:number;

	private _key :string;
	private _itemData:any;
	private _numTF:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		// let cfg = Config.WifebaseCfg.wifeGift

		this._itemIndex = index;
		this._itemData = data;
		this.width = 525;
		this.height = 126 + this.getSpaceY();

		let key = (index+1).toString();

		let bgBg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bgBg.width = this.width;
		bgBg.height = 148;
		bgBg.scaleY = 126/148;
		this.addChild(bgBg);

		this._key = key;
		
		let textColor = TextFieldConst.COLOR_WARN_GREEN2;
			if(key == "1")
			{
				textColor = TextFieldConst.COLOR_WARN_GREEN2;
			}else if(key == "2"){
				textColor = TextFieldConst.COLOR_QUALITY_BLUE;
			}else if(key == "3"){
				textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
			}else if(key == "4"){
				textColor = TextFieldConst.COLOR_WARN_RED2;
			}else if(key == "5"){
				textColor = TextFieldConst.COLOR_WARN_YELLOW2;
			}
		let itemName:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW2);
		itemName.text = LanguageManager.getlocal("allianceBuildName" + key);
		// itemName.textColor = textColor;
		itemName.setPosition(120 + 10,10);
		this.addChild(itemName);

		let score = LanguageManager.getlocal("allianceBuildCost") ;
		let itemScore:BaseTextField = ComponentManager.getTextField(score,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		itemScore.setPosition(itemName.x,itemName.y + itemName.height + 7);
		this.addChild(itemScore);

		if(index < 3){

			let iconBg:BaseBitmap = BaseBitmap.create("itembg_5");
			iconBg.setPosition(15, bgBg.height/2*bgBg.scaleY - iconBg.width/2);
			this.addChild(iconBg);


			let itemBB:BaseBitmap = BaseBitmap.create("dinner_gems_" + key);
			itemBB.setPosition(18, bgBg.height/2*bgBg.scaleY - itemBB.width/2);
			this.addChild(itemBB);

			let costIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1");
			costIcon.x = 190;
			costIcon.y = 28;
			costIcon.setScale(0.4)
			this.addChild(costIcon);
			let costNum:BaseTextField = ComponentManager.getTextField(data.needGem.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			costNum.setPosition(235,itemScore.y );
			costNum.width = 260; 
			this.addChild(costNum);
		}
		else{
			let itemCfg = Config.ItemCfg.getItemCfgById(data.needItem);
			let itemIcon:BaseDisplayObjectContainer = itemCfg.getIconContainer(true);
			itemIcon.setPosition(15, bgBg.height/2*bgBg.scaleY - itemIcon.width/2 + 1);
			itemIcon.name = "icon";
			this.addChild(itemIcon);

			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.needItem));
			this._numTF = ComponentManager.getTextField( hasNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width,itemIcon.y + itemIcon.height - 8 - this._numTF.height );
			this.addChild(this._numTF);
			// itemName.text = itemCfg.name;

			// let score =  ;
			let it:BaseTextField = ComponentManager.getTextField(itemCfg.name + "x1",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);
			it.setPosition(itemScore.x + itemScore.width + 0,itemName.y + itemName.height + 7);
			this.addChild(it);

		}



		let itemDescStr = LanguageManager.getlocal("allianceBuildGet",[data.exp,data.asset,data.contribution])

		//acPunishBuyItemGet
		let itemDesc:BaseTextField = ComponentManager.getTextField(itemDescStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		itemDesc.setPosition(itemName.x,itemScore.y + itemScore.height + 7);
		itemDesc.width = 375; 
		this.addChild(itemDesc);

		
		if(Api.allianceVoApi.getIsDonatet()){
			let mVo = Api.allianceVoApi.getMyAllianceVo();
			if(this._key == mVo.donate.id){
				let donatetDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceBuildToday"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
				donatetDesc.x = 400;
				donatetDesc.y = 25;
				this.addChild(donatetDesc);
			}
		
		}
		else{
			let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBuild",this.chooseBtnClick,this);
			chooseBtn.x = 390;
			chooseBtn.y = 10;
			this.addChild(chooseBtn);
			chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		}
		

	}

	private chooseBtnClick(){

		if(this._itemIndex > 2){
			let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(this._itemData.needItem));
			if(hasNum <= 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
				return ;
			}
		}
		else{
			let cost = this._itemData.needGem.toString();

			if(cost > Api.playerVoApi.getPlayerGem()){
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return ;
			}
		}

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let bNum = allianceVo.info.donateNum?allianceVo.info.donateNum:0;
		if(bNum >= allianceVo.maxmn)
			{
				let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
				let msg = LanguageManager.getlocal("allianceBuildTip")
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"dailyTaskName19",
					msg:msg,
					callback:this.doBuild,
					handler:this,
					needCancel:true
				});
			return ;	
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,{"key":this._key,"index":this._itemIndex});
		
	}
	private doBuild()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,{"key":this._key,"index":this._itemIndex});
	}




	private getBtnClickHandler()
	{
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this._key = null;
		this._itemData = null;
		this._itemIndex = null;
		this._numTF = null;

		super.dispose();
	}
}
class ComposePopupView extends PopupView
{
	private _itemCfg:Config.ComposeItemCfg;
	private _numTxtArr:BaseTextField[]=[];
	private _leftTimeTxt:BaseTextField;
	private _composeLimitTxt:BaseTextField;
	public constructor()
	{
		super();
	}
	protected initView():void
	{
		this._itemCfg=Config.ComposeCfg.getItemCfgById(this.getId(),Api.itemVoApi.getComposeVersion());
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width=528;
		bg.height=292;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);

		let txtBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		txtBg.width = 502;
		txtBg.height = 142;
		txtBg.setPosition(bg.x+(bg.width-txtBg.width)/2,bg.y+10);
		this.addChildToContainer(txtBg);

		let icon:BaseDisplayObjectContainer=this._itemCfg.getIconContainer();
		icon.setPosition(txtBg.x+10,txtBg.y+(txtBg.height-icon.height)/2);
		this.addChildToContainer(icon);

		let nameTxt:BaseTextField=this._itemCfg.nameTxt;
		nameTxt.setPosition(icon.x+icon.width+10,icon.y);
		this.addChildToContainer(nameTxt);

		if(this._itemCfg.timeLimit)
		{
			let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
			this._leftTimeTxt=ComponentManager.getTextField(LanguageManager.getlocal("endTimeDesc",[App.DateUtil.getFormatBySecond(leftTime,1)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			this._leftTimeTxt.setPosition(txtBg.x+txtBg.width-200,nameTxt.y+(nameTxt.height-this._leftTimeTxt.height)/2);
			this.addChildToContainer(this._leftTimeTxt);
			if(leftTime<=0)
			{
				this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");
			}
		}

		let offY:number=nameTxt.y+nameTxt.height;
		if(this._itemCfg.composeLimit)
		{
			this._composeLimitTxt=ComponentManager.getTextField(LanguageManager.getlocal("composeItemMaxNumDesc",[Api.itemVoApi.getComposeNumById(this._itemCfg.id)+"/"+this._itemCfg.composeLimit]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			this._composeLimitTxt.setPosition(nameTxt.x,nameTxt.y+nameTxt.height+10);
			this.addChildToContainer(this._composeLimitTxt);
			offY=this._composeLimitTxt.y+this._composeLimitTxt.height;
		}

		let descTxt:BaseTextField=this._itemCfg.getDescTxt(true);
		descTxt.width=txtBg.width-icon.x+txtBg.x-icon.width-10-10;
		descTxt.setPosition(nameTxt.x,offY+10);
		this.addChildToContainer(descTxt);

		let composeUseTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		composeUseTxt.setPosition(icon.x+20,txtBg.y+txtBg.height+10);
		this.addChildToContainer(composeUseTxt);

		let needItemCfgList:Config.ItemItemCfg[]=this._itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer = needItemCfgList[i].getIconContainer(true);
			icon.setPosition(composeUseTxt.x+composeUseTxt.width+10+(icon.width+5)*i,txtBg.y+txtBg.height+5);
			this.addChildToContainer(icon);
			// let iconBg:BaseBitmap=<BaseBitmap>icon.getChildByName("iconBg");
			// if(iconBg)
			// {
			// 	iconBg.addTouchTap((event:egret.TouchEvent,itemId:number|string)=>{
			// 		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,itemId);
			// 	},GameData,[needItemCfgList[i].id]);
			// }
			let num:number=Api.itemVoApi.getItemNumInfoVoById(needItemCfgList[i].id);
			let numTxt:BaseTextField=ComponentManager.getTextField(this.getComposeItemNumLocalStr(needItemCfgList[i].id),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// numTxt.width=icon.width+10;
			if(numTxt.width>icon.width+10)
			{
				numTxt.scaleX=(icon.width+10)/numTxt.width;
			}
			numTxt.textAlign=egret.HorizontalAlign.CENTER;
			numTxt.setPosition(icon.x+(icon.width-numTxt.width*numTxt.scaleX)/2,icon.y+icon.height+2);
			numTxt.bindData=needItemCfgList[i].id;
			this.addChildToContainer(numTxt);
			this._numTxtArr.push(numTxt);
		}

		if(this._itemCfg.needGem)
		{
			let icon:BaseDisplayObjectContainer=GameData.getRewardItemIconByIdAndType(ItemEnums.gem,null,true);
			icon.setPosition(composeUseTxt.x+composeUseTxt.width+10+(icon.width+5)*(needItemCfgList.length),txtBg.y+txtBg.height+5);
			this.addChildToContainer(icon);

			let num:number=Api.playerVoApi.getPlayerGem();
			let str:string="";
			let ownNum:number=num;
			let needNum:number=this._itemCfg.needGem
			str="("+ownNum+"/"+needNum+")"
			if(ownNum>=needNum)
			{
				str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_GREEN);
			}
			else
			{
				str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_RED);
			}
			let numTxt:BaseTextField=ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// numTxt.width=icon.width+10;
			if(numTxt.width>icon.width+10)
			{
				numTxt.scaleX=(icon.width+10)/numTxt.width;
			}
			numTxt.textAlign=egret.HorizontalAlign.CENTER;
			numTxt.setPosition(icon.x+(icon.width-numTxt.width*numTxt.scaleX)/2,icon.y+icon.height+2);
			numTxt.bindData=ItemEnums.gem;
			this.addChildToContainer(numTxt);
			this._numTxtArr.push(numTxt);
		}
		
		let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"composeBtn",this.composeHandler,this);
		composeBtn.setPosition(bg.x+(bg.width-composeBtn.width)/2,bg.y+bg.height+10);
		this.addChildToContainer(composeBtn);
	}

	private tick():void
	{
		let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
		if(leftTime>0)
		{
			if(this._leftTimeTxt)
			{
				this._leftTimeTxt.text = LanguageManager.getlocal("endTimeDesc",[App.DateUtil.getFormatBySecond(leftTime,1)]);
			}
		}
		else
		{
			if(this._leftTimeTxt)
			{
				this._leftTimeTxt.dispose();
				this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");			
			}
		}
	}

	private composeHandler():void
	{
		let needItemNameStr:string=this.checkNeedItemName();
		if(needItemNameStr)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("resNotEnoughDesc",[needItemNameStr]));
			return;
		}
		else
		{
			if(this._itemCfg.composeLimit)
			{
				if(Api.itemVoApi.getComposeNumById(this._itemCfg.id)>=this._itemCfg.composeLimit)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxNumDesc"));
					return;
				}
			}
			if(this._itemCfg.timeLimit)
			{
				let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
				if(leftTime<=0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
					return;
				}
			}
			let version = Api.itemVoApi.getComposeVersion();
			this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,{version:version,composeid:this._itemCfg.id});
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.data.rewards)
			{
				App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
			}
			App.MessageHelper.dispatchNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE+this._itemCfg.id);
			this.refresh();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,{});
		}
	}

	private refresh():void
	{
		if(this._numTxtArr)
		{
			let l:number=this._numTxtArr.length;
			for(let i:number=0;i<l;i++)
			{
				if(Number(this._numTxtArr[i].bindData)==1)
				{
					let num:number=Api.playerVoApi.getPlayerGem();
					let str:string="";
					let ownNum:number=num;
					let needNum:number=this._itemCfg.needGem
					str="("+ownNum+"/"+needNum+")"
					if(ownNum>=needNum)
					{
						str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_GREEN);
					}
					else
					{
						str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_RED);
					}
					this._numTxtArr[i].text=str;
				}
				else
				{
					this._numTxtArr[i].text=this.getComposeItemNumLocalStr(this._numTxtArr[i].bindData);
				}
			}
		}
		if(this._composeLimitTxt)
		{
			this._composeLimitTxt.text=LanguageManager.getlocal("composeItemMaxNumDesc",[Api.itemVoApi.getComposeNumById(this._itemCfg.id)+"/"+this._itemCfg.composeLimit]);
		}
	}

	private checkNeedItemName():string
	{
		let needItemCfgList:Config.ItemItemCfg[]=this._itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		let isEnough:boolean=true;
		let needItemNameStr:string="";
		for(let i:number=0;i<l;i++)
		{
			let itemId=needItemCfgList[i].id;
			let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
			let needNum:number=this._itemCfg.getNeedItemNumById(itemId);
			if(ownNum<needNum)
			{
				if(needItemNameStr=="")
				{
					needItemNameStr+=needItemCfgList[i].name;
				}
				else
				{
					needItemNameStr+=","+needItemCfgList[i].name;
				}
			}
		}
		if(this._itemCfg.needGem)
		{
			let ownNum:number=Api.playerVoApi.getPlayerGem();
			let needNum:number=this._itemCfg.needGem;
			if(ownNum<needNum)
			{
				if(needItemNameStr=="")
				{
					needItemNameStr+=Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
				}
				else
				{
					needItemNameStr+=","+Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
				}
			}
		}
		return needItemNameStr;
	}

	private getComposeItemNumLocalStr(itemId:string|number):string
	{
		let str:string="";
		let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
		let needNum:number=this._itemCfg.getNeedItemNumById(itemId);
		str="("+ownNum+"/"+needNum+")"
		if(ownNum>=needNum)
		{
			str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_GREEN);
		}
		else
		{
			str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_RED);
		}
		return str;
	}

	private getId():string|number
	{
		return this.param.data;
	}

	public dispose():void
	{
		if(this._itemCfg.timeLimit)
		{
			let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
			if(leftTime<=0)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
			}
		}
		this._itemCfg=null;
		this._numTxtArr.length=0;
		this._leftTimeTxt=null;
		this._composeLimitTxt=null;
		super.dispose();
	}
}
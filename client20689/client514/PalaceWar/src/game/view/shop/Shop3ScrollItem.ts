/**
 * 商店滑动item
 * author yanyuling
 * date 2017/12/09
 * @class Shop3ScrollItem
 */
class Shop3ScrollItem  extends ScrollListItem
{
	//商品id
	private _shopid:number = 0;
	//限购数文本
	private _limitNumTF:BaseTextField;
	//购买按钮
	private _buyBtn:BaseButton;
	//限购描述文本
	private _limitDescTF:BaseTextField;
	private _selectedIndex:number = 0;
	private _shopItemCfg:Config.ShopItemCfg;
	private _isRequesting:boolean = false;
	private itemList = [];
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.buyHandlerCallback,this);
		let temW = 600;
		let temH = 178;
		this._shopid = data.id;
		this._selectedIndex = index;
		
		let shopItemCfg:Config.ShopItemCfg = Api.shopVoApi.getShopItemCfgById(this._shopid);
		this._shopItemCfg = shopItemCfg;
		// 显示道具列表
		let contentList:Array<RewardItemVo> = shopItemCfg.contentList;
		// 购买价格
		let buyCost:number = shopItemCfg.buyCost;
		// 限制类型
		let limitDesc:string = "";
		// 限制购买数量
		let limitNum = Api.shopVoApi.getCanBuyNumById(shopItemCfg.id);
		if(limitNum >= 0)
		{
			limitDesc = LanguageManager.getlocal("shopLimitBuy2",[limitNum.toString()]);
		}
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = temW;
		bg.height= temH
		this.addChild(bg);

		let charge_redBg = BaseBitmap.create("common_titlebg");
        charge_redBg.y = 5;
        this.addChild(charge_redBg);

		if(shopItemCfg.needVip > 0)
		{
			let limitbg = BaseBitmap.create("public_9_probiginnerbg");
			limitbg.width = 140;
			// limitbg.height = 40;
			limitbg.x = bg.x + bg.width - limitbg.width - 10;
			limitbg.y = bg.y + 10 ;
			this.addChild(limitbg);

			let vipLimit_img =  BaseBitmap.create("vipLimit_img");
			vipLimit_img.x = limitbg.x + limitbg.width - vipLimit_img.width - 10;
			vipLimit_img.y = limitbg.y + limitbg.height/2 - vipLimit_img.height/2 ;
			this.addChild(vipLimit_img);
			
			let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(shopItemCfg.needVip).icon);
			vipImg.width = 77;
			vipImg.height = 29;
			vipImg.x = vipLimit_img.x - vipImg.width+2;
			vipImg.y = vipLimit_img.y;
			this.addChild(vipImg);
		}

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = shopItemCfg.name;
		Txt1.x = charge_redBg.x+20;
        Txt1.name = shopItemCfg.name;
        Txt1.y = charge_redBg.y + 10;
        this.addChild(Txt1);

		let rewardBg = BaseBitmap.create("public_9_managebg");
		rewardBg.width = 425;
		rewardBg.height = 107;
		rewardBg.x = bg.x +15;
		rewardBg.y = charge_redBg.y + charge_redBg.height + 5;
		this.addChild(rewardBg);

		let reward = ""
		let scroStartY = rewardBg.y + 5;
        let tmpX = rewardBg.x+8;
		let deltaS = 0.88;
        for (var index = 0; index < contentList.length; index++) {
			let tmpData = contentList[index];
			if( tmpData.id >= 1801 && tmpData.id <= 1804)
			{
				tmpData.id += 4;
			}
			let iconItem = GameData.getItemIcon(tmpData,true);
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+7);
			
            if (tmpX > rewardBg.x+ rewardBg.width -5)
            {
                tmpX = rewardBg.x+8;
                scroStartY += iconItem.height*deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+7);
            }
			this.addChild(iconItem);
			this.itemList.push(iconItem);
		}
        scroStartY += 100;
		rewardBg.height = scroStartY - rewardBg.y + 2;
		rewardBg.width -= 5;
        bg.height = rewardBg.y + rewardBg.height + 23;

		let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acPunishBuyItemBuy",this.buyHandler ,this);        
		buyBtn.setText(shopItemCfg.buyCost.toString(),false);
		buyBtn.addTextIcon("public_icon1");
		buyBtn.x = bg.x +bg.width - buyBtn.width - 20;
		buyBtn.y =  rewardBg.y + rewardBg.height - buyBtn.height - 30;
		buyBtn.name = "buyBtn";
		this.addChild(buyBtn);

		if(limitDesc != "")
		{
			this._limitNumTF = ComponentManager.getTextField(limitDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
			// this._limitNumTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,0xA67D1A);
			this.update();
			this._limitNumTF.x = buyBtn.x+ buyBtn.width/2 - this._limitNumTF.width/2;
			this._limitNumTF.y = rewardBg.y + rewardBg.height  - this._limitNumTF.height;
			this.addChild(this._limitNumTF);
		}

		let originalPriceTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle")+":",18,TextFieldConst.COLOR_BLACK);
		originalPriceTF.x =  buyBtn.x;
		originalPriceTF.y = buyBtn.y -25;
		this.addChild(originalPriceTF);

		let goldIcon1 = BaseBitmap.create("public_icon1");
		goldIcon1.scaleX = 30/goldIcon1.width;
		goldIcon1.scaleY = 30/goldIcon1.height;
		goldIcon1.x = originalPriceTF.x +originalPriceTF.width;
		goldIcon1.y = buyBtn.y -30;
		this.addChild(goldIcon1);

		let oldPriceTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        oldPriceTxt.text = String(shopItemCfg.preCost);
		oldPriceTxt.x = goldIcon1.x + 35;
        oldPriceTxt.y = originalPriceTF.y ;
        this.addChild(oldPriceTxt);

		let discountSp:BaseBitmap = BaseBitmap.create("shopview_line");
		discountSp.x = originalPriceTF.x ;
		discountSp.y = oldPriceTxt.y + 7;
		this.addChild(discountSp);
	
	}

	public update():void
	{
		if(this._limitNumTF)
		{
			let limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
			this._limitNumTF.text = LanguageManager.getlocal("shopLimitBuy",[limitNum.toString()]);
		}
	}
	protected playSuccessAction():void
	{
		if(this._shopItemCfg)
		{
			let contentList:Array<RewardItemVo> = this._shopItemCfg.contentList;
			let len = contentList.length
			for (var index = contentList.length-1; index >= 0 ; index--) {
				let rewardItemVo = contentList[index];
				let icon = GameData.getItemIcon(rewardItemVo,true);
				let tmpNode = this.itemList[index];
				icon.setScale(tmpNode.scaleX);
				let p = tmpNode.localToGlobal()
				let x1 =  p.x;
				let y1 = p.y;
				icon.x = p.x;
				icon.y = p.y;
				let x2 = GameConfig.stageWidth/2 + icon.width/2;
				let y2 = GameConfig.stageHeigth - 10 ;
				GameConfig.stage.addChild(icon);
				egret.Tween.get(icon).wait(200*index).to({x:x2,y:y2},500).call(this.onComplete,this,[icon]);
			}
		}
	}
	private onComplete(icon:BaseDisplayObjectContainer):void
	{
		if(icon)
		{
			icon.dispose();
		}
	}

	private buyHandlerCallback(event:egret.Event):void
	{
		if(this._isRequesting == false)
		{
			return;
		}
		this._isRequesting = false;
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
			this.update();
			this.playSuccessAction();
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOP_BUY + 3,{"index":this._selectedIndex,"shopId":this._shopid});
		}else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
		}
		
	}
	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		//判断元宝数是否足够
		if(this._shopItemCfg.buyCost > Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		this._isRequesting = true;
		//发送购买请求
		NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM,{"shopId":this._shopid,version:Api.shopVoApi.getVersion(),"dtype":"2"});
	}

	//检查是否需要弹出消费提示框
	private checkNeedWarnPopup(): void{
		//物品价格
		let costNum = this._shopItemCfg.buyCost;
		//检查价格是否超过购买警告阈值
		if (costNum >= Config.ShopCfg.buyItemCheckVal)
		{
			//展示信息
			let message:string = LanguageManager.getlocal("shopBuyUseGem",[costNum.toString(),this._shopItemCfg.name]);

			//玩家所持有的元宝数
			let playerGem = Api.playerVoApi.getPlayerGem();

			//显示弹出框
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
				useNum: costNum,								//物品价格
				confirmCallback: this.confirmCallbackHandler,	//确认回调函数
				handler: this,									//target
				num: playerGem,									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});
		} else {
			//没有超过阈值，直接调用购买代码
			this.confirmCallbackHandler();

		}
	}
	private buyHandler(param:any):void
	{

		
		if(this._shopItemCfg.needVip > Api.playerVoApi.getPlayerVipLevel())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("vipLvNotEnough"));
			return;
		}
		let limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
		if(limitNum == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("shopNumNotEnough"));
			return;
		}
		//检查是否需要弹出消费提示框
		this.checkNeedWarnPopup();
	}

	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.buyHandlerCallback,this);

		this._shopid = 0;
		this._limitNumTF = null;
		this._buyBtn = null;
		this._limitDescTF = null;
		this._selectedIndex = 0;
		this._shopItemCfg = null;
		this.itemList = [];
		this._isRequesting = false;
		super.dispose();
	}
}
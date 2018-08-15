/**
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
class AcDiscountView extends AcCommonView
{
	private _scrollList:ScrollList;
	private _activeCfgList:Array<any> = [];
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = -50;

		//描述 
		let desckey:string = null;
		desckey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard()?"acDiscount_newdesc":"acDiscount_desc"
		let acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(acDescTxt);
		acDescTxt.x = 30;
		acDescTxt.y = 20;
		acDescTxt.width = 550;
		
		let startY = 115;

		// vip折扣
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
			//vip背景图片
			let vipBg: BaseBitmap = BaseBitmap.create("acdiscountviewbg1");
			this.addChildToContainer(vipBg);
			vipBg.y = startY;

			//倒计时文本 
			let acCDTxt = ComponentManager.getTextField(Api.acVoApi.getActivityVoByAidAndCode(this.aid,"1").getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			this.addChildToContainer(acCDTxt);
			acCDTxt.x = 30;
			acCDTxt.y = vipBg.y + 227;

			//vip描述 
			let acVipDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_vipDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(acVipDescTxt);
			acVipDescTxt.x = 30;
			acVipDescTxt.y = vipBg.y + 270;
			acVipDescTxt.width = 420;

			// 前往vip
			let goVipBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"acDiscount_goVip",this.goVipHandler ,this);        
			goVipBtn.x = 473;
			goVipBtn.y = vipBg.y +265;
			goVipBtn.name = "goVipBtn";
			this.addChildToContainer(goVipBtn);

			//vip 1折
			let vip1zheBg: BaseBitmap = BaseBitmap.create(PlatformManager.checkIsZjlySp()?"acdiscount4zhe":"acdiscount1zhe");
			this.addChildToContainer(vip1zheBg);
			vip1zheBg.x = 563;
			vip1zheBg.y = vipBg.y + 213;

			startY = vipBg.y + vipBg.height;
		}

		//------------------------------------------------

		// 终身卡打折
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			//终身卡背景图片
			let yearCardBg: BaseBitmap = BaseBitmap.create("acdiscountviewbg2");
			this.addChildToContainer(yearCardBg);
			yearCardBg.y = startY;

			//倒计时文本 
			let acCDTxt = ComponentManager.getTextField(Api.acVoApi.getActivityVoByAidAndCode(this.aid,"2").getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			this.addChildToContainer(acCDTxt);
			acCDTxt.x = 30;
			acCDTxt.y = yearCardBg.y + 227;

			//终身卡描述 
			let yearkey:string = null;
			yearkey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard()?"acDiscount_newyearcardDesc":"acDiscount_yearcardDesc";
			let acYearCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(yearkey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(acYearCardDescTxt);
			acYearCardDescTxt.x = 30;
			acYearCardDescTxt.y = yearCardBg.y + 270;
			acYearCardDescTxt.width = 420;

			// 前往福利
			let goYearCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"acDiscount_goYearCard",this.goYearCardHandler ,this);        
			goYearCardBtn.x = 473;
			goYearCardBtn.y = yearCardBg.y +265;
			goYearCardBtn.name = "goYearCardBtn";
			this.addChildToContainer(goYearCardBtn);

			//终身卡价格
			let yearStr:string = null;
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				yearStr = "acdiscount_zhongshenkajiage_newdiscount";
			}
			else
			{
				yearStr = PlatformManager.checkIsXlSp()?"acdiscount_zhongshenkajiage_xianlaiType":"acdiscount_zhongshenkajiage"
			}
			let yearcardJiage: BaseBitmap = BaseBitmap.create(yearStr);
			this.addChildToContainer(yearcardJiage);
			yearcardJiage.x = 553;
			yearcardJiage.y = yearCardBg.y + 204;

			startY = yearCardBg.y + yearCardBg.height;
		}
	}

	private goVipHandler() 
	{		
        if(Api.acVoApi.getActivityVoByAidAndCode(this.aid,"1").isStart==false)
        {
			//活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }	
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}
	private goYearCardHandler() 
	{		
        if(Api.acVoApi.getActivityVoByAidAndCode(this.aid,"2").isStart==false)
        {
			//活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }	
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
	}
	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}


	protected getResourceList():string[]
	{
		let diconut:string = null;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			diconut = "acdiscount_zhongshenkajiage_newdiscount"
		}
		else
		{
			diconut =(PlatformManager.checkIsXlSp()?"acdiscount_zhongshenkajiage_xianlaiType":"acdiscount_zhongshenkajiage")
		}
		return super.getResourceList().concat([
			"forpeople_top","acdiscountviewbg1",(PlatformManager.checkIsZjlySp()?"acdiscount4zhe":"acdiscount1zhe"),"acdiscountviewbg2",diconut
					]);
	}

	private useCallback(event:egret.Event):void
	{
		for(let i=0;i<this._activeCfgList.length;i++)
		{
			let acLimitedRewardScrollItem = <AcLimitedRewardScrollItem>this._scrollList.getItemByIndex(i);
			if(acLimitedRewardScrollItem)
			{
				acLimitedRewardScrollItem.checkBtnState();
			}
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		this._scrollList = null;
		this._activeCfgList = null;
		super.dispose();
	}
}
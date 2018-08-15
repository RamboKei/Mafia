/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItemScrollItem
 */

class ServantInfoFourItemScrollItem extends ScrollListItem
{
    public static servantId = "";
	private _auarKey:string = "";
	private _levelupTipStr = "";
	private _itemList:RewardItemVo[] = [];
	private _isRequsting:boolean = false;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshAfterLv,this);
        let auarKey = data;
		this._auarKey = auarKey;

        let bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = 592;
        bottomBg.height = 126;
        bottomBg.y = 0;
        this.addChild(bottomBg);

		let auraList = Config.ServantCfg.getServantItemById(ServantInfoFourItemScrollItem.servantId).aura;

		let icon = BaseLoadBitmap.create("servant_aura_Icon"+ auraList[this._auarKey].auraIcon);
		icon.x = icon.y = 10;
		icon.width = icon.height = 108;
		this.addChild(icon);

        let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
        skillName.x = icon.x + icon.width + 10;
        skillName.y = icon.y+3;
		skillName.name = "skillName";
        this.addChild(skillName);

		let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 25;
        this.addChild(curValueTxt);
		curValueTxt.name = "curValueTxt";

        let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
		nextValueTxt.name = "nextValueTxt";
		
		let upNeedTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
		upNeedTxt.name = "upNeedTxt";

		let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantFour_goBtn",this.goBtnHandler,this);
		goBtn.x = bottomBg.x + bottomBg.width - 140;
		goBtn.y = bottomBg.y + bottomBg.height/2 - goBtn.height/2;
		goBtn.visible = false;
		this.addChild(goBtn);
		goBtn.name = "goBtn"

		let topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
		topLvTxt.x = goBtn.x + goBtn.width/2 - topLvTxt.width/2;
		topLvTxt.y = goBtn.y + goBtn.height/2 - topLvTxt.height/2;
		topLvTxt.visible = false;
		topLvTxt.name = "topLvTxt"
		this.addChild(topLvTxt);

		this.refreshAfterLv();

	}

	protected refreshAfterLv(event?:egret.Event)
	{
		if(event && !this._isRequsting)
		{
			this._isRequsting = false;
			return;
		}
		
		if(event && event.data.data.ret == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			let servObj:ServantInfoVo = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
			if(servObj && servObj.isShowRedForaura())
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
			}
		}
		let servantId = ServantInfoFourItemScrollItem.servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);
        let auraList = servantcfg.aura;
		let keysList = Object.keys(auraList);
		let curData = auraList[this._auarKey];
		let servantObj = Api.servantVoApi.getServantObj(servantId);
		

		let skillName = <BaseTextField>this.getChildByName("skillName");
		let curValueTxt = <BaseTextField>this.getChildByName("curValueTxt");
		let nextValueTxt = <BaseTextField>this.getChildByName("nextValueTxt");
		let upNeedTxt = <BaseTextField>this.getChildByName("upNeedTxt");
		let goBtn = this.getChildByName("goBtn");
		let topLvTxt = this.getChildByName("topLvTxt");

        //是否解锁
		let str1 = ""
		let str2 = ""
		let str3 = ""
		let attStr = ""

		if(curData.att.length == 4){
			attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < curData.att.length; index1++) {
				var element = curData.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		
		let add1 = ""
		let addNum1 = "";
		let addNum2 = "";
		let nextLvAdd = 1;

		let auarV = servantObj.aura[this._auarKey] ;
		if(!auarV)
		{
			auarV = 0;
		}
		if(curData.growAtt < 1){
			addNum1 = (curData.growAtt*100* auarV) + "%"
			addNum2 = (curData.growAtt*100*( auarV +nextLvAdd)) + "%"
		}else{
			addNum1 = (curData.growAtt* auarV ).toString();
			addNum2 = (curData.growAtt*( auarV + nextLvAdd)).toString();
		}
		add1 = addNum1;
		str1  = LanguageManager.getlocal("servant_fourlevelupTxt1",[ attStr + addNum1]);
		str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[attStr + addNum2]);
		
		let goBtnAvaiable = false;
		let isAtTopLv = false;
		if(curData.growNeed1 && curData.growNeed1.length > 0){
			goBtnAvaiable = false;
			//是否满级,满级则隐藏该行
			if(auarV >= curData.maxLv){
				isAtTopLv = true;
				nextLvAdd = 0;
				str3 = "";
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
			}else
			{
				let sid = curData.growNeed1[auarV];
				// let auraV = servantObj.aura[this._auarKey]
				let str4 = LanguageManager.getlocal("servant_fourPeopleaura"+(curData.auraIcon));
				let tmpStr = LanguageManager.getlocal("servantWife_fourUpCost2",[auarV+1,auarV,auarV+1,str4]);
				str3 = LanguageManager.getlocal("servant_fourlevelupTxt7",[tmpStr]);

				// str3 = LanguageManager.getlocal("servant_fourlevelupTxt2",[LanguageManager.getlocal("servant_name"+sid)]);
			}
		}
		else{
			this._levelupTipStr = "";
			goBtnAvaiable = true;
			if(auarV >= curData.maxLv){
				isAtTopLv = true;
				str3 = "";
				this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
			}else
			{
				let itemList:RewardItemVo[] = GameData.formatRewardItem(curData.growNeed2);
				this._itemList = itemList;
				let item:RewardItemVo = this._itemList[0];
				// for (var index = 0; index < itemList.length; index++) {
					// let item:RewardItemVo = itemList[index];
					let ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
					str3 += item.name + "("+ ownNum +"/" +item.num+ ")  ";
					if (ownNum < item.num && this._levelupTipStr == "")
					{
						this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
						str3 = LanguageManager.getlocal("servant_fourlevelupTxt3",[str3]) ;
					}else
					{
						str3 = LanguageManager.getlocal("servant_fourlevelupTxt6",[str3]) ;
					}
				// }
			}
		}

        let nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : "+ auarV ;
		
        skillName.text = nameStr;
		curValueTxt.text = str1;
		nextValueTxt.text = str2;
		upNeedTxt.text = str3;
		
		if(isAtTopLv){
			if(this._auarKey == "2" && goBtn.visible == true && auraList["3"] &&   Api.switchVoApi.checkOpenNewAura(auraList["3"].auraIcon )  )
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW);
			}
			topLvTxt.visible = true;
			goBtn.visible = false;
		}else{
			topLvTxt.visible = false;
			if (goBtnAvaiable)
			{
			goBtn.visible = true;
			}else{
				goBtn.visible = false;
			}
		}
    }

	protected doRequest()
	{
		let servantId = ServantInfoFourItemScrollItem.servantId;
		let auarKey = this._auarKey;
		this._isRequsting = true;
		NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAURA,{auraId:auarKey,servantId:servantId})
		
	}
    protected goBtnHandler()
    {
		if (this._levelupTipStr != "")
		{
			App.CommonUtil.showTip(this._levelupTipStr);
			return;
		}

		let itemInfo = this._itemList[0];
		let itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id)
		let tmpStr = itemInfo.name + "*" + itemInfo.num + " ";

		let message: string = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
		let mesObj = {
			 confirmCallback: this.doRequest, 
			 handler: this, 
			 icon:  itemcfg.icon, 
			 iconBg: itemcfg.iconBg, 
			 num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id), 
			 msg: message ,
			 id : itemInfo.id,
			 useNum : itemInfo.num
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );		
		
	}
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshAfterLv,this);
        this._auarKey =  null;
		this._isRequsting = false;
		super.dispose();
	}
}
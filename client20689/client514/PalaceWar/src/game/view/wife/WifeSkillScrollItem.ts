/**
 * 红颜技能Item
 * author dky
 * date 2017/11/18
 * @class WifeSkillScrollItem
 */
class WifeSkillScrollItem extends ScrollListItem
{


	private _itemIndex:number;

	private _key :string;
	private _wifeInfoVo: WifeInfoVo;

	//属性1
	private _att1TF:BaseTextField;
	//属性2
	private _att2TF:BaseTextField;
	//属性3
	private _att3TF:BaseTextField;
	private _skillLevelTF:BaseTextField;
	private _cfgData:any;
	private _updBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		// let cfg = data
		this._cfgData = data;
		this._itemIndex = index;
		this.width = 525;
		this.height = 126 + this.getSpaceY();

		let key = (index+1).toString();


		let id = WifeSkillPopupView.wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let skillIndex = index + 1
		let skillNameStr = skillIndex + "." + LanguageManager.getlocal("wifeSkill_" + id + "_"+ skillIndex);
		
		let skillNameTF:BaseTextField = ComponentManager.getTextField(skillNameStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		skillNameTF.setPosition(10 ,10);
		this.addChild(skillNameTF);

		let skillLevelStr = "(Lv." + this._wifeInfoVo.skill[index] + ")";
		this._skillLevelTF = ComponentManager.getTextField(skillLevelStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._skillLevelTF.setPosition(skillNameTF.x + skillNameTF.width + 10 ,skillNameTF.y);
		this.addChild(this._skillLevelTF);


		WifeSkillPopupView.wifeId = id;

		let cfg = Config.WifeCfg.getWifeCfgById(id);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)

		//是否解锁
		let str1 = ""
		let str2 = ""
		let str3 = ""
		let attStr = ""

		if(data.att.length == 4){
			attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < data.att.length; index1++) {
				var element = data.att[index1];
				if(index1 == 0){
					// if(data.att.length == 1){
						attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
					// }else{
					// 	attStr = LanguageManager.getlocal("servantInfo_speciality" + element) + "、";
					// }
					
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		
		//是否解锁
		let textColor = 0xb1b1b1;
		let textColor2 = TextFieldConst.COLOR_WARN_GREEN;
		let add1 = ""
		if(data.condition <= this._wifeInfoVo.intimacy){
			textColor = TextFieldConst.COLOR_WHITE;
			let addNum1 = "";
			let addNum2 = "";

			let nextIndex = index + 1;
			let nextLvAdd = 1;
			//是否满级
			if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
				nextIndex = index;
				nextLvAdd = 0;
			}

			if(data.growAtt < 1){
				addNum1 = (data.growAtt*100*this._wifeInfoVo.skill[index]) + "%"
				addNum2 = (data.growAtt*100*(this._wifeInfoVo.skill[index]+nextLvAdd)) + "%"
			}else{
				addNum1 = (data.growAtt*this._wifeInfoVo.skill[index]).toString();
				addNum2 = (data.growAtt*(this._wifeInfoVo.skill[index] + nextLvAdd)).toString();
			}

			let needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex]-1];

			add1 = addNum1;
			str1  = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
			str2  = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
			str3  = LanguageManager.getlocal("wifeSkillUpdNeed",[needExp]) ;
		}
		else{
			let addNum1 = "";
			if(data.growAtt < 1){
				addNum1 = (data.growAtt*100*this._wifeInfoVo.skill[index]) + "%"
			}else{
				addNum1 = (data.growAtt*this._wifeInfoVo.skill[index]).toString();
			}
			textColor2 = 0xb1b1b1;
			str1  = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
			str2 = "1";
			str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
		}

		this._att1TF = ComponentManager.getTextField(str1,TextFieldConst.FONTSIZE_CONTENT_SMALL,textColor);
		this._att1TF.x = skillNameTF.x;
		this._att1TF.y = skillNameTF.y + skillNameTF.height + 10;
		this.addChild(this._att1TF);

		this._att2TF = ComponentManager.getTextField(str2,TextFieldConst.FONTSIZE_CONTENT_SMALL,textColor);
		this._att2TF.x = skillNameTF.x;
		this._att2TF.y = this._att1TF.y + this._att1TF.height + 5;
		this.addChild(this._att2TF);

		this._att3TF = ComponentManager.getTextField(str3,TextFieldConst.FONTSIZE_CONTENT_SMALL,textColor2);
		this._att3TF.x = skillNameTF.x;
		this._att3TF.y = this._att2TF.y + this._att2TF.height + 5;
		this.addChild(this._att3TF);
		

		if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
		
			let donatetDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
			donatetDesc.x = 400;
			donatetDesc.y = this.height/2 - donatetDesc.height/2;
			this.addChild(donatetDesc);
		
		}
		else{
			this._updBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.updBtnClick,this);
			this._updBtn.x = 400;
			this._updBtn.y = this.height/2 - this._updBtn.height/2;
			this.addChild(this._updBtn);
			this._updBtn.setColor(TextFieldConst.COLOR_BLACK);
		}

	

		if(data.condition > this._wifeInfoVo.intimacy){
			this._att2TF.visible = false;
			this._updBtn.visible = false;
			this._skillLevelTF.visible = false;
		}

		//是否满级
		if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
			this._att2TF.visible = false;
			this._att3TF.visible = false;
		}
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.x = this.width/2 - lineSp.width/2;
		lineSp.y = this.height - 15;
		this.addChild(lineSp);

	}

	private updBtnClick(){
		
		let cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)

		if(!Api.servantVoApi.getServantObj(cfg.servantId))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeServantNotGet",[serCfg.name]));
			return ;

		}

		if(this._wifeInfoVo.skill[this._itemIndex] >= Config.WifebaseCfg.wifeSkillMax){
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillMax"));
			return ;
		}
		let needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex]-1];
		let hasNum:number = this._wifeInfoVo.exp;
		if(needExp > hasNum)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeExpNumNotEnough"));
			return ;
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,{"index":this._itemIndex});
	}

	public refreshData(index:number)
	{	
		let id = WifeSkillPopupView.wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let skillLevelStr = "(Lv." + this._wifeInfoVo.skill[this._itemIndex] + ")";
		// let skiL
		WifeSkillPopupView.wifeId = id;

		let cfg = Config.WifeCfg.getWifeCfgById(id);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)

		//是否解锁
		let str1 = ""
		let str2 = ""
		let str3 = ""
		let attStr = ""

		if(this._cfgData.att.length == 4){
			attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < this._cfgData.att.length; index1++) {
				var element = this._cfgData.att[index1];
				if(index1 == 0){
					// if(this._cfgData.att.length == 1){
						attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
					// }else{
					// 	attStr = LanguageManager.getlocal("servantInfo_speciality" + element) + "、";
					// }
					
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		
		//是否解锁
		let textColor = 0xb1b1b1;
		let textColor2 = TextFieldConst.COLOR_WARN_GREEN;
		let add1 = ""
		if(this._cfgData.condition <= this._wifeInfoVo.intimacy){
			textColor = TextFieldConst.COLOR_WHITE;
			let addNum1 = "";
			let addNum2 = "";

			let nextIndex = index + 1;
			let nextLvAdd = 1;
			//是否满级
			if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
				nextIndex = index;
				nextLvAdd = 0;
			}

			if(this._cfgData.growAtt < 1){
				addNum1 = (this._cfgData.growAtt*100*this._wifeInfoVo.skill[index]) + "%"
				addNum2 = (this._cfgData.growAtt*100*(this._wifeInfoVo.skill[index]+nextLvAdd)) + "%"
			}else{
				addNum1 = (this._cfgData.growAtt*this._wifeInfoVo.skill[index]).toString();
				addNum2 = (this._cfgData.growAtt*(this._wifeInfoVo.skill[index] + nextLvAdd)).toString();
			}
			
			add1 = addNum1;
			str1  = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
			str2  = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
			// str3  = LanguageManager.getlocal("wifeSkillUpdNeed",[Config.WifebaseCfg["wifeSkill" + (index + 1)][nextIndex-1]]) ;
			let needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex]-1];
			str3  = LanguageManager.getlocal("wifeSkillUpdNeed",[needExp])
	}
		else{
			let addNum1 = "";
			if(this._cfgData.growAtt < 1){
				addNum1 = (this._cfgData.growAtt*100*this._wifeInfoVo.skill[index]) + "%"
			}else{
				addNum1 = (this._cfgData.growAtt*this._wifeInfoVo.skill[index]).toString();
			}
			textColor2 = 0xb1b1b1;
			str1  = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
			str2 = "1";
			str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + this._cfgData.condition;
		}

		this._att1TF.text = str1;
		this._att2TF.text = str2;
		this._att3TF.text = str3;
		
		this._skillLevelTF.text = skillLevelStr;

		if(this._cfgData.condition > this._wifeInfoVo.intimacy){
			this._att2TF.visible = false;
			this._updBtn.visible = false;
			this._skillLevelTF.visible = false;
		}
		//是否满级
		if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
			this._att2TF.visible = false;
			this._att3TF.visible = false;
		}

		if(this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax){
		
			let donatetDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
			donatetDesc.x = 400;
			donatetDesc.y = this.height/2 - donatetDesc.height/2 - 10;
			this.addChild(donatetDesc);
			this._updBtn.visible = false;
		}
		else{
			
		}

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
		
		// this._numTF = null;
		this._itemIndex = null;

		this._key = null;
		this._wifeInfoVo = null;

		//属性1
		this._att1TF = null;
		//属性2
		this._att2TF = null;
		//属性3
		this._att3TF = null;
		this._skillLevelTF = null;
		this._updBtn = null;
		super.dispose();
	}
}
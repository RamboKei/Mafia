/**
 * 奖励物品vo
 * author dmj
 * date 2017/9/26
 * @class RewardItemVo
 */
class RewardItemVo extends BaseVo 
{
	/**
	 * 奖励物品类型：1 元宝  2 银两  3 粮食  4 士兵 5 政绩  6 道具  7 门客属性 8 门客  9亲密度 10红颜  11 称号  12红颜魅力 13 红颜经验值 14 门客书籍经验  15  门客技能经验
	 */ 
	public type:number = 0;
	/**
	 * 物品id
	 */
	public id:number = 0;
	/**
	 * 数量
	 */
	public num:number = 0;

	private _name:string = "";
	private _tipName:string = "";
	private _desc:string="";
	private _icon:string = "";
	private _iconbg:string = "";
	// 品质
	private _quality:number = 1;
	public constructor() 
	{
		super();
	}
	public initData(data:string):void
	{
		let itemArr:Array<string> = data.split("_");
		this.type = Number(itemArr[0]);
		this.id = Number(itemArr[1]);
		this.num = Number(itemArr[2]);
		let itemCfg:any=Config.ItemCfg.getItemCfgById(this.id);

		this._tipName = "";
		if(this.type == 1)
		{
			this._name = LanguageManager.getlocal("gemName");
			this._icon = "itemicon1";
		}
		else if(this.type == 2)
		{
			this._name = LanguageManager.getlocal("playerview_gold").replace(":  ","");
			this._icon = "itemicon2";
		}
		else if(this.type == 3)
		{
			this._name = LanguageManager.getlocal("playerview_food").replace(":  ","");
			this._icon = "itemicon3";
		}
		else if(this.type == 4)
		{
			this._name = LanguageManager.getlocal("playerview_soldier").replace(":  ","");
			this._icon = "itemicon4";
		}
		else if(this.type == 5)
		{
			this._name = LanguageManager.getlocal("playerview_exp").replace(":  ","");
			this._icon = "itemicon5";
		}
		else if(this.type == 6)
		{
			this._name = LanguageManager.getlocal("itemName_" + this.id);
			this._icon = "itemicon"+this.id;
		}
		else if(this.type == 7)
		{
			if(this.id == 1)
			{
				this._name = LanguageManager.getlocal("playerview_forceAtt").replace(":  ","");
			}
			else if(this.id == 2)
			{
				this._name = LanguageManager.getlocal("playerview_inteAtt").replace(":  ","");
			}
			else if(this.id == 3)
			{
				this._name = LanguageManager.getlocal("playerview_policyAtt").replace(":  ","");
			}
			else if(this.id == 4)
			{
				this._name = LanguageManager.getlocal("playerview_charmAtt").replace(":  ","");
			}
			this._tipName = this._name;
		}
		else if(this.type==8)
		{
			this._icon = "servant_half_"+this.id;
			this._name = LanguageManager.getlocal("servant_name" + this.id);
		}
		else if(this.type==9)
		{
			this._name=LanguageManager.getlocal("wifeIntimacy").replace(" :","");
			this._tipName = this._name;
		}
		else if(this.type==10)
		{
			let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.id);
			if(wifeCfg)
			{
				this._icon =wifeCfg.icon;
				this._name=wifeCfg.name;
			}
		}
		else if(this.type==11)
		{
			this._name = LanguageManager.getlocal("itemName_" + this.id);
			this._icon = "itemicon"+this.id;
			itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
		}

		else if(this.type==12)
		{
			let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.id);
			this._name=LanguageManager.getlocal("wifeCharm").replace(" :","");
			this._tipName = this._name;
			if(wifeCfg){
				this._icon = wifeCfg.icon;
			}
			
		}

		else if(this.type==13)
		{
			this._name=LanguageManager.getlocal("wifeExp").replace(" :","");
			this._tipName = this._name;
		}
		else if(this.type==14)
		{	
			
			if(this.id > 10){
				let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
				this._icon = itemCfg.halfIcon;
			}
			else{
				this._icon = "itemicon14";
			}
			
			this._name=LanguageManager.getlocal("itemName_" + this.type);
		}
		else if(this.type==15)
		{	
			if(this.id > 10){
				let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
				this._icon = itemCfg.halfIcon;
			}
			else{
				this._icon = "itemicon15";
			}
			
			this._name=LanguageManager.getlocal("itemName_" + this.type);
		}

		else if(this.type==16)
		{	
			let itemCfg=Config.WifeskinCfg.getWifeCfgById(this.id.toString());
			this._icon = itemCfg.icon;
			
			this._name=itemCfg.name;
		}
		else if(this.type==17)
		{	
			this._icon = "itemicon17";			
			this._name = LanguageManager.getlocal("itemName_17");
		}
		else if(this.type==18)
		{	
			this._icon = "itemicon17";			
			this._name = LanguageManager.getlocal("itemName_18");
		}
		else if(this.type==19){	
			this._icon = "dragonboatitem"+AcDragonBoatDayView.CODE;			
			this._name = LanguageManager.getlocal("DragonBoatZongziItem_"+AcDragonBoatDayView.CODE);
		}

		this._quality = (itemCfg?itemCfg.quality:1)
		this._iconbg="itembg_"+this._quality;
		if(this.type==8)
		{
			this._iconbg="itembg_"+7;
		}
		if(this.type==14||this.type==15)
		{
			this._iconbg="itembg_"+1;
		}

	}

	public get name():string
	{
		return this._name;
	}

	/**根据品质取颜色 */
	public get nameColor():number
	{
		let color:number = TextFieldConst.COLOR_QUALITY_WHITE;
		if(this._quality == 2)
		{
			color = TextFieldConst.COLOR_QUALITY_GREEN;
		}
		else if(this._quality == 3)
		{
			color = TextFieldConst.COLOR_QUALITY_BLUE;
		}
		else if(this._quality == 4)
		{
			color = TextFieldConst.COLOR_QUALITY_PURPLE;
		}
		else if(this._quality == 5)
		{
			color = TextFieldConst.COLOR_QUALITY_ORANGE;
		}
		return color;
	}

	public get icon():string
	{
		return this._icon;
	}

	public get iconBg():string
	{
		return this._iconbg;
	}

	public get message():string
	{
		return this.name+(this.num<0?this.num:"+"+this.num);
	}

	public get tipMessage():string
	{
		return this._tipName + (this.num<0?String(this.num):"+"+this.num);
	}

	public get desc():string
	{
		let desc:string="";
		if(this.type==6)
		{
			let itemCfg=Config.ItemCfg.getItemCfgById(this.id);
			if(itemCfg)
			{
				desc = itemCfg.desc;
			}
		}
		else if(this.type==8)
		{
			let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
			if(itemCfg)
			{
				desc = itemCfg.desc;
			}
		}
		else if(this.type==10)
		{
			let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.id);
			desc = wifeCfg.name+"*1";
		}
		else if(this.type == 11)
		{
			let itemCfg=Config.TitleCfg.getTitleCfgById(this.id);
			if(itemCfg)
			{
				desc = itemCfg.desc;
			}
		}

		else if(this.type == 12)
		{
			let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.id);
			desc = LanguageManager.getlocal("itemDesc_12",[wifeCfg.name]);
		}
		else if(this.type == 14)
		{
			let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
			desc = LanguageManager.getlocal("itemDesc_14",[itemCfg.name]);
		}
		else if(this.type == 15)
		{
			let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
			desc = LanguageManager.getlocal("itemDesc_15",[itemCfg.name]);
		}
		else if(this.type == 16)
		{
			let itemCfg=Config.WifeskinCfg.getWifeCfgById(this.id.toString());
			desc = itemCfg.desc2;
		}
		else if(this.type == 19)
		{
			desc = LanguageManager.getlocal("DragonBoatZongziItemDesc_"+AcDragonBoatDayView.CODE);
		}
		else
		{
			desc = LanguageManager.getlocal("itemDesc_"+this.type);
		}
		return desc;
	}
	public get dropDesc():string
	{
		let dropDesc:string="";
		if(this.type==6)
		{
			let itemCfg=Config.ItemCfg.getItemCfgById(this.id);
			if(itemCfg)
			{
				dropDesc = itemCfg.dropDesc;
			}
		}
		else if(this.type==8)
		{
			let itemCfg=Config.ServantCfg.getServantItemById(this.id.toString());
			if(itemCfg)
			{
				dropDesc = itemCfg.dropDesc;
			}
		}
		else if(this.type==10)
		{
			dropDesc = LanguageManager.getlocal("wifeDropDesc_"+this.id);
		}
		else if(this.type == 11)
		{
			let itemCfg=Config.TitleCfg.getTitleCfgById(this.id);
			if(itemCfg)
			{
				dropDesc = itemCfg.dropDesc;
			}
		}
		else if(this.type == 16)
		{
			let itemCfg=Config.WifeskinCfg.getWifeCfgById(this.id.toString());
			dropDesc = itemCfg.dropDesc;
		}
		else if(this.type == 19)
		{
			dropDesc = LanguageManager.getlocal("DragonBoatZongziDropDesc_"+AcDragonBoatDayView.CODE);
		}
		else
		{
			dropDesc = LanguageManager.getlocal("itemDropDesc_"+this.type);
		}
		return dropDesc;
	}
	

	public dispose():void
	{
		this.type = 0;
		this.id = 0;
		this.num = 0;
		this._name = "";
		this._tipName = "";
		this._desc="";
		this._icon = "";
		this._iconbg = "";
		this._quality = 1;
	}
}
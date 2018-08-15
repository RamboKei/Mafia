/**
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeskinInfoVo
 */
class WifeskinInfoVo extends BaseVo
{
	// 红颜id
	public id:string = "";
	// 具体红颜的具体皮肤信息
	public skin:any;
	//红颜装配的皮肤ID
	public equip:string;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.skin != null)
			{
				this.skin = data.skin;
			}
			if(data.equip != null)
			{
				this.equip = data.equip;
			}
		
		}
	}

	/**红颜名称 */
	public get name():string
	{
		return this.cfg.name;
	}
	/**红颜描述 */
	public get desc():string
	{			
		return this.cfg.desc;
	}
	/**红颜说的话 */
	public get words():string
	{
		return this.cfg.words;
	}


	public get cfg()
	{

		return Config.WifeskinCfg.getWifeCfgById(this.id.toString());
	}

	public dispose():void
	{
		this.id = "";
		this.skin = 0;
		this.equip = null;
	}
}
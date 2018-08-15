/**
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeInfoVo
 */
class WifeInfoVo extends BaseVo
{
	// id
	public id:number = 0;
	// 亲密度
	public intimacy:number = 0;
	// 魅力
	public glamour:number = 0;
	// 经验
	public exp:number = 0;
	// 儿子数量
	public child:number = 0;
	// 技能信息
	public skill:number[] ;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.intimacy != null)
			{
				this.intimacy = Number(data.intimacy);
			}
			if(data.exp != null)
			{
				this.exp = Number(data.exp);
			}
			if(data.child != null)
			{
				this.child = Number(data.child);
			}
			if(data.skill != null)
			{
				this.skill = data.skill;
			}
			if(data.glamour != null)
			{
				this.glamour = Number(data.glamour);
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
	/**红颜解锁条件 */
	public get unlock():string
	{
		
		return this.cfg.wifeunlock;
	}
	/**红颜背景 */
	public get bg():string
	{
		return this.cfg.bg;
	}

	/**红颜icon */
	public get icon():string
	{
		return this.cfg.icon;
	}

	/**红颜半身像 */
	public get body():string
	{
		return this.cfg.body;
	}

		/**红颜脱衣半身像 */
	public get body2():string
	{
		return this.cfg.body2;
	}

		/**红颜骨骼 */
	public get bone():string
	{
		return this.cfg.bone;
	}
		/**红颜脱衣服骨骼 */
	public get bone2():string
	{
		return this.cfg.bone2;
	}
	public get sound():string
	{
		return this.cfg.sound;
	}


	public get cfg()
	{

		return Config.WifeCfg.getWifeCfgById(this.id.toString());
	}

	public dispose():void
	{
		this.id = 0;
		this.intimacy = 0;
		this.exp = 0;
		this.child = 0;
		this.skill = null;
		this.glamour = 0;
	}
}
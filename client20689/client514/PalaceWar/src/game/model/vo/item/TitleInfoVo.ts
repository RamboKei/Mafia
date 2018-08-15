/**
 * 称号道具vo
 * author shaoliang
 * date 2017/10/28
 * @class TitleInfoVo
 */

class TitleInfoVo extends BaseVo
{
	// 道具id
	public id:number = 0;
	// 道具状态 -1 没有 0 有， 1，已使用 ，2已装配
	public num:number = -1;

	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data.id != null)
		{
			this.id = Number(data.id);
		}
		else {

		}
		if(data.num != null)
		{
			this.num = Number(data.num);
		}
		else {
			this.num = -1;
		}
	}
	// 道具名称
	public get name():string
	{
		return this.itemCfg.name;
	}

	// 道具描述
	public get desc():string
	{
		return this.itemCfg.desc;
	}

	public get dropDesc():string
	{
		return this.itemCfg.dropDesc;
	}

	// icon图
	public get icon():string
	{
		return this.itemCfg.icon;
	}

	// 背景图片
	public get iconBg():string
	{
		return this.itemCfg.iconBg;
	}
	// 资质
	public get quality():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.quality;
		}
		return 1;
	}
	// 是否显示使用按钮
	public get isShowUseBtn():boolean
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isUse==1;
		}
		return false;
	}

	// 是否是全服唯一称号
	public get isOnly():boolean
	{
		if(this.itemCfg)
		{
			return this.itemCfg.isOnly==1;
		}
		return false;
	}

	// 排序id
	public get sortId():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.sortId;
		}
		return 0;
	}



	// 类型，1：道具 2：合成 3：时装
	public get type():number
	{
		if(this.itemCfg)
		{
			return this.itemCfg.type;
		}
		return 0;
	}

	// 该道具配置
	private get itemCfg()
	{
		return Config.TitleCfg.getTitleCfgById(this.id);
	}

	public dispose():void
	{
		this.id = 0;
		this.num = -1;
	}
}
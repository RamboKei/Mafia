class GameinfoVo extends BaseVo
{
	public regdt:number;
	public ip:string;
	public newerflag:number;
	public info:{downType?:string};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data)
		{
			for(let key in data)
			{
				this[key]=data[key];
			}
		}
	}
	public dispose():void
	{
		this.newerflag = 0;
	}
}
class SwitchVo extends BaseVo
{
	public switchList:any={};
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			if(key != "lockinfo"){
				this.switchList[key]=data[key]?Number(data[key]):0;
			}else{
				this.switchList[key]=data[key] ;
			}
		}
	}

	public dispose():void
	{
		this.switchList={};
	} 
}
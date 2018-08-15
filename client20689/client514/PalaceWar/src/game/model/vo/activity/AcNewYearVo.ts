class AcNewYearVo extends AcBaseVo
{

	public taskinfo:any=null;
	public scoreinfo:any =null;
	public diffday:number =0; 
	public score:number=0;
	 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		if(data.taskinfo)
		{
			this.taskinfo=data.taskinfo;
		}
		if(data.scoreinfo)
		{
			this.scoreinfo=data.scoreinfo;
		}
		if(data.diffday)
		{
			this.diffday = data.diffday;
		}
		if(data.taskinfo.dayFlag&&data.taskinfo.dayFlag==1)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
  
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public get isShowRedDot(): boolean 
	{
		if(this.taskinfo&&this.taskinfo.dayFlag&&this.taskinfo.dayFlag==1)
		{
			return true;
		}
		return false; 
	}

	//获取当前分数
	public getScore():number
	{
		return 	this.scoreinfo.score;
	}
	// 第一页面礼包是否领取
	public getBtnType(num:number=0):boolean
	{
		if(this.scoreinfo.info)
		{
			if(this.scoreinfo.info[num]&&this.scoreinfo.info[num]==1)
			{
				return true;
			} 
			else
			{
				return false
			}
		}
	
	}

	//  0不可领 1未领取 2已领取
	public  getIdflag(questType:number=0):number
	{	
		if(this.taskinfo.info[questType])
		{
			return this.taskinfo.info[questType].flag;
		}
	}
	//当前任务进度
	public  getTaskLength():number
	{
		let arr=[];
		for(let key in this.taskinfo.info)
		{
			if(this.taskinfo.info[key].flag==2)
			{
				arr.push(this.taskinfo.info[key]);
			} 
		}
		return arr.length;
	}
	
	 
	public dispose():void 
	{ 
	 	this.taskinfo=null;
		this.scoreinfo =null;
		this.diffday=0;
		this.score =0;
	}
}
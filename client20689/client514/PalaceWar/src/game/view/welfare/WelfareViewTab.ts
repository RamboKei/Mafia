/**
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
abstract class WelfareViewTab extends BaseLoadDisplayObjectContiner
{
	public bottomBg:BaseBitmap; 
	public isWanbaBoo:boolean = false;
	public constructor() 
	{
		super();
	}

	protected init():void
	{	
		this.isWanbaBoo =Api.switchVoApi.checknewRecharge();		
		var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		if(totalSignDay<=6&&this.getResPreName()=="signin")
		{
			logdStr =BaseBitmap.create(this.getResPreName() + "2_bg");
			if(totalSignDay<=2)
			{
				logdStr =BaseBitmap.create(this.getResPreName() + "3_bg");
			}
		} else if (this.getResPreName()=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			// vip折扣
			let picname = this.getResPreName() + "_discount_bg";
			logdStr =BaseBitmap.create(picname);
		}else if(this.isWanbaBoo&&this.getResPreName()=="firstrecharge")
		{
			let picname = "firstrecharge2_bg";
			logdStr =BaseBitmap.create(picname);
		}
		 
	
		var bg:BaseBitmap =logdStr;  
		this.addChild(bg); 

		this.bottomBg = BaseBitmap.create("common_9_bg");
		this.bottomBg.y = bg.height;
		this.bottomBg.height = GameConfig.stageHeigth - 89 - bg.height;
		this.addChild(this.bottomBg);


	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	protected getResourceList():string[]
	{
		let preName:string = this.getResPreName();
		let arr:string[] = [];
		arr.push(preName + "_btn");
		if (preName=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			arr.push(preName + "_discount_bg");
		} else {
			arr.push(preName + "_bg");
		}
		let descImage = preName + "_desc";
		let iconImage = preName + "_icon";
		if(RES.hasRes(descImage))
		{
			arr.push(descImage);
		}
		if(RES.hasRes(iconImage))
		{
			arr.push(iconImage);
		}
		return arr;
	}

	protected getResPreName():string
	{
		let className:string = egret.getQualifiedClassName(this);
		let preName:string = className.substring(11,className.length);
		return preName.toLowerCase();
	}

	public dispose():void
	{
		if(this.bottomBg)
		{
			this.removeChild(this.bottomBg);
			this.bottomBg.dispose();
			this.bottomBg = null;
		}
		super.dispose();
	}
}
abstract class AcCommonView extends CommonView
{
	/**
	 * 当前活动的Id
	 */
	protected aid:string;
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		if(this.code&&ResourceManager.hasRes(String(this.aid).toLowerCase()+this.code))
		{
			resArr.push(String(this.aid).toLowerCase()+this.code);
		}
		return super.getResourceList().concat(resArr);
	}

	protected get code():string
	{
		return this.param?this.param.data:"";
	}

	protected get acVo():AcBaseVo
	{
		return Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}

	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.acVo.aidAndCode)+"_Title";
	}
	protected getTitleParams():string[]
	{
		return null;
	}
	
}
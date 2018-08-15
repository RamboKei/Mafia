class RechargeVoApi extends BaseVoApi
{
	public constructor() 
	{
		super();
	}

	/**
	 * 检测是否还有首充
	 */
	public checkFirstRecharge():boolean
	{
		return Api.shopVoApi.getPayFlag()==0;
	}
}
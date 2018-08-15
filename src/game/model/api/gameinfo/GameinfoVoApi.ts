class GameinfoVoApi extends BaseVoApi
{
	private gameinfoVo:GameinfoVo;
	public constructor() 
	{
		super();
	}

	public getRegdt():number
	{
		return this.gameinfoVo?this.gameinfoVo.regdt:0;
	}
	public getGuideStep():number
	{
		return this.gameinfoVo?this.gameinfoVo.newerflag:0;
	}
	public getDownType():string {
		if (this.gameinfoVo && this.gameinfoVo.info && this.gameinfoVo.info.downType) {
			return this.gameinfoVo.info.downType;
		} else {
			return "";
		}
	} 
}
/**
 * 排行榜Api
 * author yanyuling
 * date 2017/10/26
 * @class RankVoApi
 */
class RankVoApi extends BaseVoApi
{
	private rankVo:RankVo;
	public constructor() 
	{
		super();
	}

	public getRankListByTabIdx(idx:number)
	{
		if(idx == 0){
			return this.rankVo.pinfoList;
		}else if(idx == 1){
			return this.rankVo.cinfoList;
		}else if(idx == 2){
			return this.rankVo.iinfoList;
		}
		return  this.rankVo.pinfoList;
	}
	
	public getcInfoList()
	{
		return this.rankVo.cinfoList;
	}

	public getiInfoList()
	{
		return this.rankVo.iinfoList;
	}

	public getpInfoList()
	{
		return this.rankVo.pinfoList;
	}
	public getcRank()
	{
		return this.rankVo.crank;
	}
	
	public getimacy()
	{
		return this.rankVo.imacy;
	}
	public getcid()
	{
		return this.rankVo.cid;
	}
	public getprank()
	{
		return this.rankVo.prank;
	}
	public getirank()
	{
		return this.rankVo.irank;
	}

	 public checkNpcMessage():boolean
	{
		for (let index = 0; index < 3; index++) {
			let V = Api.otherInfoVoApi.isRankVisited(index);
			if(V == 0)
			{
				return true;
			}
		}
		return false;
	}

}
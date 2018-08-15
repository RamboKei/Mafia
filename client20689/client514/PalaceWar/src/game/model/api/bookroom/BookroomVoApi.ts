/**
 * 书院api
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVoApi
 */
class BookroomVoApi extends BaseVoApi
{
	private bookroomVo:BookroomVo;
	public constructor() 
	{
		super();
	}
    public getSeatNum()
    {
        return this.bookroomVo.pos_num;
    }
    public getSeatInfoByPosId(posId:number)
    {
        return this.bookroomVo.infoList[String(posId)];
    }
    public isStudying(servantId:string)
    {
        for (var key in this.bookroomVo.infoList) {
            if(this.bookroomVo.infoList[key].servantid == servantId)
                return true;
        }
        return false;
    }
    public getPosListInStudy()
    {
        let keys = Object.keys(this.bookroomVo.infoList);
        return keys
    }
    public isBatchenable()
    {
        for (let key in this.bookroomVo.infoList) {
            if(this.bookroomVo.infoList[key].et <= GameData.serverTime)
                return true;
        }
        return false;
    }
    public checkNpcMessage():boolean
    {
        let len = Object.keys(this.getPosListInStudy()).length
        if(this.isBatchenable() || len < this.getSeatNum())
        {
            return true;
        }
        return false;
    }
}
/**
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomInfoVo
 */
class BookroomInfoVo extends BaseVo
{  
    public servantid:string = "";
    public et:number=0; 
    public posId:string;

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
        {
            this.servantid = data.servantid;
            this.et = data.et;
        }
    }
    public isStudyOver()
    {
        if( this.et > 0 && this.et <= GameData.serverTime)
        {
            return true;
        }else
        {
            return false;
        }
    }
    public dispose()
    {
         this.servantid = "";
         this.et = 0;
         this.posId = "";
    }
}
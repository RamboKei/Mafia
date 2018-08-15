/**
 * 排行榜vo
 * author yanyuling
 * date 2017/10/26
 * @class RankVo
 */
class RankVo extends BaseVo
{   
    /**
     * 关卡榜信息
     */
    public cinfoList = [];
    /**
     * 亲密度榜信息
     */
    public iinfoList = [];
    /**
     * 势力榜信息
     */
    public pinfoList = [];

    /**
     * 个人排行信息
     */
    public crank:number = 0;
    public lv:number = 0;
    public imacy:number = 0;
    public name:string = "";
    public cid:number = 0;
    public power:number =0;
    public irank:number = 0;
    public prank:number = 0;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data.minfo)
        {
            this.crank = data.minfo.crank;
            this.lv =Number( data.minfo.lv);
            this.imacy = data.minfo.imacy;
            this.name = data.minfo.name;
            this.cid = data.minfo.cid;
            this.power = data.minfo.power;
            this.prank = data.minfo.prank;
             this.irank = data.minfo.irank;
        }
        if(data.pinfo)
        {
            this.initMyData(data.pinfo,this.pinfoList);
        }
        if(data.iinfo)
        {
            this.initMyData(data.iinfo,this.iinfoList);
        }
        if(data.cinfo)
        {
            this.initMyData(data.cinfo,this.cinfoList);
        }
        
    }

    public initMyData(dataInfo,rankUVoList)
    {
        for (var index = 0; index < dataInfo.length; index++) {
            var element = dataInfo[index];
            let tmpVo:RankUserVo = rankUVoList[index]
            if (!tmpVo)
            {
                tmpVo = new RankUserVo();
                rankUVoList.push(tmpVo);
            }
            tmpVo.initData(element);
        }
    }

    public dispose():void
	{
        this.crank = 0;
        this.lv = 0;
        this.imacy = 0;
        this.name = "";
        this.cid = 0;
        this.power = 0;
        this.irank = 0;
        this.prank = 0;
        this.cinfoList = [];
        this.iinfoList = [];
        this.pinfoList = [];
    }

}
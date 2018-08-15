/**
 * 其他杂项vo
 * author yanyuling
 * date 2017/10/27
 * @class OtherInfoVo
 */
class OtherInfoVo extends BaseVo
{  
    public imacy:number=0;
    public power:number=0;
    public challenge:number = 0;
    public palace_flag:number =0;
    public banet:number =0;//禁言时间
    public info:any;
    public certification:any=null;
    public jd618:{st:number,et:number,flag:number}=null;
    public gpower:number=0;
    public galliance:number=0;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if (data.rv_info)
        {
            if(data.rv_info.imacy)
            {
                this.imacy = data.rv_info.imacy;
            }
            if(data.rv_info.power)
            {
                this.power = data.rv_info.power;
            }
            if(data.rv_info.challenge)
            {
                this.challenge = data.rv_info.challenge;
            }
            if(data.rv_info.gpower)
            {
                this.gpower = data.rv_info.gpower;
            }
            if(data.rv_info.galliance)
            {
                this.galliance = data.rv_info.galliance;
            }
        }
        if(data.palace)
        {
            this.palace_flag = data.palace.flag;
        }
        if(data.info)
        {
            this.info=data.info;
        }
        if(data.banet)
        {
            this.banet=data.banet;
        }
        if(data.info&&data.info.certification)
        {
            this.certification = data.info.certification;
        }
        if(data.info&&data.info.jd618 != null)
        {
            this.jd618 = data.info.jd618;
        }
    }

    public dispose()
    {
       this.imacy = 0;
       this.power = 0;
       this.challenge = 0;
       this.palace_flag = 0;
       this.banet = 0;
       this.info = null;
       this.certification =null;
       this.jd618 = null;
    }
}

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
    }
}

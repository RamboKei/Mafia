/**
 * 邮件详情
 * author dmj
 * date 2017/10/31
 * @class MailInfoVo
 */
class MailInfoVo extends BaseVo
{
	/**收件时间 */
	public st:number = 0;
	/**是否有附件 */
	public istouch:number = 0;
	/**是否读过 */
	public isread:number = 0;
	/**邮件库id */
	public mid:number = 0;
	/**邮件标题 */
	public title:string = "";
	/**邮件奖励 */
	public touch:string = "";
	/**是否领过奖励 */
	public hadget:number = 0;
	/**邮件内容 */
	public content:string = null;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data.st != null)
		{
			this.st = Number(data.st);
		}
		if(data.istouch != null)
		{
			this.istouch = Number(data.istouch);
		}
		if(data.isread != null)
		{
			this.isread = Number(data.isread);
		}
		if(data.mid != null)
		{
			this.mid = Number(data.mid);
		}
		if(data.title != null)
		{
			this.title = String(data.title);
		}
		if(data.touch != null)
		{
			this.touch = String(data.touch);
		}
		if(data.hadget != null)
		{
			this.hadget = Number(data.hadget);
		}
		if(data.content != null)
		{
			this.content = String(data.content);
			if(this.content=="xinshoufuli1")
			{
				this.content=LanguageManager.getlocal("xinshoufuli1");
			}
			else if(this.content=="xinshoufuli2")
			{
				this.content=LanguageManager.getlocal("xinshoufuli2");
			}
		}
		if(data.extra!=null)
		{
			if(data.extra.mt!=null)
			{
				this.title=LanguageManager.getlocal("systemMailTitleType"+data.extra.mt);
				let strTab:string[] = App.StringUtil.formatStringParms(data.extra.pa);
				this.content=LanguageManager.getlocal("systemMailContentType"+data.extra.mt,strTab);
			}
		}
	}
	/**接收邮件的时间 */
	public get timeStr():string
	{
		return App.DateUtil.getFormatBySecond(this.st,6);
	}
	public dispose():void
	{
		this.st = 0;
		this.istouch = 0;
		this.isread = 0;
		this.mid = 0;
		this.title = "";
		this.touch = "";
		this.hadget = 0;
		this.content = null;
	}
}
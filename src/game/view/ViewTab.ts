abstract class ViewTab extends BaseLoadDisplayObjectContiner
{
	public constructor() 
	{
		super();
	}

	protected abstract initView():void;

	protected init():void
	{

	}

	/**
	 * 切换页签
	 */
	public refreshWhenSwitchBack():void
	{

	}

	protected getViewTitleButtomY():number
	{
		let className:string=this.getClassName();
		className = this.getClassName().substring(0,className.indexOf("Tab"));
		let view:CommonView=<CommonView>ViewController.getInstance().getView(className);
		return view["getTitleButtomY"]();
	}

	protected getViewBg():BaseBitmap
	{
		let className:string=this.getClassName();
		className = this.getClassName().substring(0,className.indexOf("Tab"));
		let view:CommonView=<CommonView>ViewController.getInstance().getView(className);
		return view["getViewBg"]();
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	protected getResourceList():string[]
	{
		return [];
	}

}
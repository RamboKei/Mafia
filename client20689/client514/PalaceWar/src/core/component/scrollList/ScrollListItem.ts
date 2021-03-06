/**
 * 滑动列表元素类
 * author 陈可
 * date 2017/9/22
 * @class ScrollListItem
 */
class ScrollListItem extends BaseDisplayObjectContainer
{
	private static scrollListItemPool:any = {};
	private static isCanNew:boolean=false;
	private _index:number=NaN;
	private __data:any=null;
	public constructor()
	{
		super();
	}
	private init(index:number,data:any):void
	{
		this._index=index;
		this.__data=data;
		this.initItem(index,data);
		this.initBg();
	}

	private initBg():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_alphabg");
		let rect = this.getBounds();
		bg.width=this.width+this.getSpaceX();
		bg.height=this.height+this.getSpaceY();
		this.addChildAt(bg,0);
	}

	protected initItem(index:number,data:any):void
	{
	}

	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 5;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this.__data=null;
		this._index=NaN;
		super.dispose();
	}
	/**
	 * 对象池取
	 * @param index 索引
	 * @param data 数据
	 */
	public static create<T extends ScrollListItem>(classDomin:{new():T},index:number,data:any):T 
	{
		let targetClassName:string = egret.getQualifiedClassName(classDomin);
		if(ScrollListItem.scrollListItemPool[targetClassName]==null)
		{
			ScrollListItem.scrollListItemPool[targetClassName]=[];
		}
		let scrollListItem = ScrollListItem.scrollListItemPool[targetClassName].pop();
		if (!scrollListItem)
		{
			ScrollListItem.isCanNew=true;
			scrollListItem = new classDomin();
			ScrollListItem.isCanNew=false;
		}
		scrollListItem.init(index,data);
		return scrollListItem;
	}

	/**
	 * 对象池存
	 * @param scrollListItem 
	 */
	public static release(scrollListItem:ScrollListItem):void 
	{
		if(!scrollListItem)
		{
			return;
		}
		scrollListItem.dispose();
		scrollListItem.setPosition(0,0);
		scrollListItem.setScale(1);
		scrollListItem.rotation=0;
		scrollListItem.alpha=1;
		scrollListItem.width=NaN;
		scrollListItem.height=NaN;
		scrollListItem.mask=null;
		scrollListItem.scrollRect=null;
		scrollListItem.filters=null;
		let targetClassName:string = egret.getQualifiedClassName(scrollListItem);
		if(ScrollListItem.scrollListItemPool[targetClassName]==null)
		{
			ScrollListItem.scrollListItemPool[targetClassName]=[];
		}
		let targetPool:ScrollListItem[]=ScrollListItem.scrollListItemPool[targetClassName];
		if(targetPool.indexOf(scrollListItem)<0)
		{
			targetPool.push(scrollListItem);
		}
	}
}
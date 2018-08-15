/**
 * author 陈可
 * date 2017/9/20
 * @class ScrollView
 */
class ScrollView extends egret.ScrollView implements base.Ibase
{
	protected content:egret.DisplayObject=undefined;
	protected _touchTapHelper: TouchHelper.Touch = null;
	private _touchHelper:TouchHelper.Touch=null;
	public constructor(content?:egret.DisplayObject)
	{
		super(content);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStageHandler,this);
	}

	private removeFromStageHandler(e:egret.Event):void
	{
		egret.ScrollTween.removeTweens(this);
	}

	public setContent(content?:egret.DisplayObject):void
	{
		super.setContent(content);
		this.content=content;
	}

	public removeContent():egret.DisplayObject
	{
		egret.ScrollTween.removeTweens(this);
		super.removeContent();
		let content:egret.DisplayObject=this.content;
		this.content=null;
		return content;
	}

	public setPosition(x:number,y:number):void
	{
		this.x=x;
		this.y=y;
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchTapHandler:(evet:egret.TouchEvent,...args)=>void,touchTapHandlerThisObj:any,touchTapHandlerParams?:any[])
    {
		let ths=this;
        if(this._touchTapHelper==null)
        {
			//局部调用，勿改
			let tapHandler=function(event:egret.TouchEvent,...args):void
			{
				if(event.type==egret.TouchEvent.TOUCH_END)
				{
					if(touchTapHandler)
					{
						let params:any[]=[event];
						if(args&&args.length>0)
						{
							params.concat(args);
						}
						touchTapHandler.apply(touchTapHandlerThisObj,params);
					}
				}
			}
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler,this,touchTapHandlerParams);
        }
    }

	/**
     * 移除触摸
     */
    public removeTouchTap()
    {
        if(this._touchTapHelper)
        {
            this._touchTapHelper.removeTouch();
            this._touchTapHelper = null;
        }
    }

	public addTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams?:any[]):void
	{
		if(!this._touchHelper)
		{
			this._touchHelper = TouchHelper.addTouch(this.content,touchHandler,touchHandlerThisObj,touchHandlerParams);
		}
	}

	public removeTouch():void
	{
		if(this._touchHelper)
		{
			this._touchHelper.removeTouch();
			this._touchHelper=null;
		}
	}

	public dispose():void
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStageHandler,this);
		try
		{
			this._removeEvents();
			this._onTouchEnd(null);
		}
		catch(e)
		{
			
		}
		egret.ScrollTween.removeTweens(this);
		if(this.numChildren>0)
		{
			let content:egret.DisplayObject = this.removeContent();
			if(content instanceof egret.DisplayObjectContainer)
			{
				App.DisplayUtil.destory(content);
			}
		}
		this._content=null;
	}
}
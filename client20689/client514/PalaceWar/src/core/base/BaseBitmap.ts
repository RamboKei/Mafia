/**
 * author 陈可
 * date 2017/9/11
 * @class BaseBitmap
 */
class BaseBitmap extends egret.Bitmap implements base.Iinteractive,base.Ibase
{
	public bindData: any = null;
    private _touchTapHelper: TouchHelper.Tap = null;
	private _touchHelper:TouchHelper.Touch=null;

	private static baseBitmapPool:BaseBitmap[] = [];
	private static isCanNew:boolean=false;
	public constructor(value?: egret.Texture) 
	{
		super(value);
		if(!BaseBitmap.isCanNew&&this.getClassName()=="BaseBitmap")
		{
			let errorStr:string="请使用BaseBitmap.create创建";
			App.LogUtil.error(errorStr)
			throw new Error(errorStr);
		}
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerThisObj:any,touchHandlerParams?:any[])
    {
        if(this._touchTapHelper==null)
        {
			this.touchEnabled=true;
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler,touchHandlerThisObj,touchHandlerParams);
        }
    }
    /**
     * 移除触摸
     */ 
    public removeTouchTap()
    {
        if(this._touchTapHelper)
        {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    }

	public get width():number
	{
		return egret.superGetter(BaseBitmap,this,"width");
	}

	public set width(value:number)
	{
		if(this.texture)
		{
			if(this.texture["scale9Grid"])
			{
				if(value<this.texture.textureWidth)
				{
					value=this.texture.textureWidth;
					if(DEBUG)
					{
						App.LogUtil.warn("九宫格宽度高于原始图片宽度，已重置为原始宽度");
					}
				}
			}
		}
		egret.superSetter(BaseBitmap,this,"width",value);
	}

	public get height():number
	{
		return egret.superGetter(BaseBitmap,this,"height");
	}

	public set height(value:number)
	{
		if(this.texture)
		{
			if(this.texture["scale9Grid"])
			{
				if(value<this.texture.textureHeight)
				{
					value=this.texture.textureHeight;
					if(DEBUG)
					{
						App.LogUtil.warn("九宫格的高度高于原始图片高度，已重置为原始高度");
					}
				}
			}
		}
		egret.superSetter(BaseBitmap,this,"height",value);
	}

	public get scale9Grid(): egret.Rectangle 
	{
		return egret.superGetter(BaseBitmap,this,"scale9Grid");
    }

	public set scale9Grid(value: egret.Rectangle)
	{
		egret.superSetter(BaseBitmap,this,"scale9Grid",value);
		if(DEBUG)
		{
			throw new Error("请通过default.res.json来设置九宫格，不允许在游戏内使用九宫格");
		}
	}

	public addTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams?:any[],isMoveCancel?:boolean):void
	{
		if(!this._touchHelper)
		{
			this._touchHelper = TouchHelper.addTouch(this,touchHandler,touchHandlerThisObj,touchHandlerParams,isMoveCancel);
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

	/**
     * 设置坐标
     */ 
    public setPosition(posX:number,posY:number)
    {
        this.x = posX;
        this.y = posY;
    }

	public stopAllActions() 
    {
        egret.Tween.removeTweens(this);
    }

	public setVisible(visible:boolean)
	{
		this.visible=visible;
	}

    public setScale(scale:number):void
    {
        this.scaleX=this.scaleY=scale;
    }

	protected getClassName():string
	{
		return egret.getQualifiedClassName(this);
	}

	public dispose():void
	{
		this.stopAllActions();
        this.removeTouchTap();
		this.removeTouch();
        this.bindData=null;
		if(this.parent)
		{
			this.parent.removeChild(this);
		}
	}

	/**
	 * 对象池取
	 * @param value 支持传输BitmapData，Texture或者资源名
	 */
	public static create(value?:egret.Texture | string):BaseBitmap 
	{
		let baseBitmap = BaseBitmap.baseBitmapPool.pop();
		let showValue:egret.Texture=undefined;
		if(typeof(value)=="string")
		{
			showValue=ResourceManager.getRes(value);
		}
		else
		{
			showValue=value;
		}
		if (!baseBitmap)
		{
			BaseBitmap.isCanNew=true;
			baseBitmap = new BaseBitmap(showValue);
			BaseBitmap.isCanNew=false;
		}
		else
		{
			if(egret.is(showValue,"egret.Texture"))
			{
				baseBitmap.texture=<egret.Texture>showValue;
			}
		}
		return baseBitmap;
	}

	/**
	 * 对象池存
	 * @param value 
	 */
	public static release(baseBitmap:BaseBitmap):void 
	{
		if(!baseBitmap)
		{
			return;
		}
		if(baseBitmap instanceof BaseLoadBitmap)
		{
			BaseLoadBitmap.release(baseBitmap);
			return;
		}
		baseBitmap.dispose();
		if(baseBitmap.texture)
		{
			baseBitmap.texture=null;
		}
		egret.Tween.removeTweens(baseBitmap);
		baseBitmap.setPosition(0,0);
		baseBitmap.setScale(1);
		baseBitmap.rotation=0;
		baseBitmap.alpha=1;
		baseBitmap.width=NaN;
		baseBitmap.height=NaN;
		baseBitmap.mask=null;
		baseBitmap.scrollRect=null;
		baseBitmap.filters=null;
		baseBitmap.anchorOffsetX=0;
		baseBitmap.anchorOffsetY=0;
		baseBitmap.visible=true;
		baseBitmap.name=null;
		baseBitmap.touchEnabled=false;
		baseBitmap.skewX=baseBitmap.skewY=0;
		baseBitmap.blendMode=egret.BlendMode.NORMAL;
		// baseBitmap.scale9Grid=null;
		if(BaseBitmap.baseBitmapPool.indexOf(baseBitmap)<0)
		{
			BaseBitmap.baseBitmapPool.push(baseBitmap);
		}
	}
}
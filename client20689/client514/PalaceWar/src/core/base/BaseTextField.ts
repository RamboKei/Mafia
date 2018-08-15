/**
 * author ck
 * date 2017/8/9
 * @class BaseTextField
 */
class BaseTextField extends egret.TextField implements base.Iinteractive,base.Ibase
{
	public bindData: any = null;
    private _touchTapHelper: TouchHelper.Tap = null;
	public constructor() 
	{
		super();
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerThisObj:any,touchHandlerParams:any[])
    {
        if(this._touchTapHelper==null)
        {
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
    
    private removeStageHandler(event:egret.Event)
    {
        this.dispose();
    }
    
    /**
     * 设置坐标
     */ 
    public setPosition(posX:number,posY:number)
    {
        this.x = posX;
        this.y = posY;
    }

    public setColor(color:number)
    {
        this.textColor=color;
    }

    public setVisible(v:boolean)
    {
        this.visible=v;
    }

    public setString(str:string)
    {
        this.text=str;
    }

    public stopAllActions() 
    {
        egret.Tween.removeTweens(this);
    }

    public setScale(scale:number):void
    {
        this.scaleX=this.scaleY=scale;
    }

    public set text(value:string)
    {
        value=String(value);
        let reg=new RegExp("\\s","g");
        let tmpvalue = value.replace(reg,"");
        if(value&&tmpvalue.indexOf("<")>-1 && tmpvalue.indexOf(">")>-1)
        {
            try
            {
                this.textFlow = (new egret.HtmlTextParser).parser(value);
            }
            catch(e)
            {
                egret.superSetter(BaseTextField,this,"text",value);
            }
        }
        else
        {
            egret.superSetter(BaseTextField,this,"text",value);
        }
    }

    public get text():string
    {
        return egret.superGetter(BaseTextField,this,"text");
    }

    /**
     * 销毁对象
     */ 
    public dispose()
    {
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
        this.stopAllActions();
        this.removeTouchTap();
        this.bindData=null;
    }
}
/** 
 * 加载基类容器类
 * author 陈可
 * date 2017/9/11
 * @class BaseLoadDisplayObjectContiner
 */
abstract class BaseLoadDisplayObjectContiner extends BaseDisplayObjectContainer
{
	private _isLoaded:boolean=false;
	private _groupName:string=undefined;
	private _isShow:boolean=false;
	private _isInit:boolean=false;

	/**
	 * 加载资源重试次数
	 */
	private _loadResTryNum:number=0;
	private static _loadingWait:NetLoadingWait.LoadingWait;
	/**
	 * 请求type列表
	 */
	private _requestTypeList:string[]=[];

	/**
	 * 是否已经请求过
	 */
	private _isRequesed:boolean=false;

	private _curRequestData:{requestType:string,requestData:any};
	public constructor()
	{
		super();
	}

	protected abstract init():void;
	protected abstract getResourceList():string[];
	protected abstract getParent():egret.DisplayObjectContainer;

	public show(data?:any):void
	{
		if(this.isShow())
		{
			return;
		}
		let equestData=this.getRequestData();
		if(equestData)
		{
			this.request(equestData.requestType,equestData.requestData);
		}
		else
		{
			this._isRequesed=true;
		}
		this.showLoadingMask();
		// App.LogUtil.show("displayshow");
		this._isShow=true;
		this.loadRes();
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return null;
	}

	protected request(requestType:string,requestData:any):void
	{
		if(!requestType)
		{
			return;
		}
		this._curRequestData={requestType:requestType,requestData:requestData};
		let eventType:string=NetManager.getMessageName(requestType);
		if(this._requestTypeList.indexOf(eventType)<0)
		{
			App.MessageHelper.addEventListener(eventType,this.receiveEvent,this);
			this._requestTypeList.push(requestType);
		}
		NetManager.request(requestType,requestData);
	}
	private receiveEvent(event:egret.Event):void
	{

		let requestData=this._curRequestData;

		if(requestData)
		{
			if(event.type==NetManager.getMessageName(requestData.requestType))
			{
				if(event.data&&event.data.ret==false)
				{
					if(this._isRequesed==false)
					{//首次
						this.requestLoadError();
					}
					return;
				}
			}
		}

		this.receiveData(event.data);
		if(requestData)
		{
			if(event.type==NetManager.getMessageName(requestData.requestType))
			{
				if(this._isRequesed==false&&this.isShow())
				{//首次
					this._isRequesed=true;
					if(this.isLoaded&&this._isRequesed)
					{
						this.preInit();
					}
				}
			}
		}
	}

	private removeAllRequestEvents():void
	{
		let l:number=this._requestTypeList.length;
		if(l>0)
		{
			for(let i:number=l-1;i>=0;i--)
			{
				this.removeRequestEvent(this._requestTypeList[i]);
			}
		}
	}

	private removeRequestEvent(requestType:string):void
	{
		let index:number=this._requestTypeList.indexOf(requestType);
		if(index>-1)
		{
			App.MessageHelper.removeEventListener(NetManager.getMessageName(requestType),this.receiveEvent,this);
			this._requestTypeList.splice(index,1);
		}
	}


	protected receiveData(data:{ret:boolean,data:any}):void
	{

	}

	/**
	 * 是否已经调用show方法，在调用show之后到hide之前show为true
	 */
	public isShow():boolean
	{
		return this._isShow;
	}

	public isInit():boolean
	{
		return this._isInit;
	}

	public hide():void
	{
		if(this.isShow())
		{
			this.dispose();
		}
	}

	private loadRes():void
	{
		let resouceList:string[]=this.getResourceList();
		if(this._isLoaded==false && resouceList && resouceList.length>0)
		{
			this._groupName = ResourceManager.loadResources(resouceList,null,this.delayLoadComplete,null,this,this.resGroupLoadError);
		}
		else
		{
			this.delayLoadComplete();
		}
	}

	protected isShowLoadingMask():boolean
	{
		return true;
	}

	protected showLoadingMask():void
	{
		if(!this.isShowLoadingMask())
		{
			return;
		}
		if(!BaseLoadDisplayObjectContiner._loadingWait)
		{
			BaseLoadDisplayObjectContiner._loadingWait=NetLoadingWait.showMask(500);
		}
		else
		{
			BaseLoadDisplayObjectContiner._loadingWait.showMask();
		}
	}

	protected hideLoadingMask():void
	{
		if(!this.isShowLoadingMask())
		{
			return;
		}
		if(BaseLoadDisplayObjectContiner._loadingWait)
		{
			// App.LogUtil.show("displayhide");
			BaseLoadDisplayObjectContiner._loadingWait.hideMask();
		}
	}

	protected requestLoadError():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
		this.hideLoadingMask();
		this.hide();
	}

	protected resGroupLoadError():void
	{
		if(this._groupName)
		{
			ResourceManager.destroyRes(this._groupName);
			this._groupName=undefined;
		}
		if(PlatformManager.checkIsThSp()&&this._loadResTryNum<5)
		{
			this._loadResTryNum++;
			console.log("loadres "+this.getClassName()+" error retry-"+this._loadResTryNum);
			this.loadRes();
		}
		else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
			this.hideLoadingMask();
			this.hide();
			this._loadResTryNum=0;
		}
	}

	/**
	 * 为了处理多个界面切换闪到主场景的问题，资源加载回调强制延迟一帧
	 */
	private delayLoadComplete():void
	{
		if(this.isShow())
		{
			egret.callLater(this.loadComplete,this);
		}
	}

	private loadComplete():void
	{
		if(this.isShow())
		{
			this._isLoaded=true;
			if(this.isLoaded&&this._isRequesed)
			{
				this.preInit();
			}
		}
	}

	protected preInit():void
	{
		if(this.isLoaded&&this._isRequesed)
		{
			this._isInit=true;
			this.init();
			let className:string=this.getClassName();
			if(this.getParent())
			{
				if(this.getClassName()=="PracticeView"||className=="PrestigeView"||className=="PlayerView"){

				
					if(PlayerBottomUI.checkInstance()&&this.getParent().contains(PlayerBottomUI.getInstance()))
					{
						let childIdex:number=this.getParent().getChildIndex(PlayerBottomUI.getInstance());
						this.getParent().addChildAt(this,childIdex);
					}
					else
					{
						this.getParent().addChild(this);

					}
				} else {
					this.getParent().addChild(this);
				}
				
			}
			this.hideLoadingMask();
		}
	}

	protected hideScene():boolean
	{
		return true;
	}

	protected get isLoaded():boolean
	{
		return this._isLoaded;
	}

	public dispose():void
	{
		this.removeAllRequestEvents();
		if(this._isLoaded)
		{
			if(this._groupName)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=undefined;
			}
			this._isLoaded=false;
		}
		this._isShow=false;
		this._isInit=false;
		this._isRequesed=false;
		this._curRequestData=null;
		this._loadResTryNum=0;
		super.dispose();
	}
}
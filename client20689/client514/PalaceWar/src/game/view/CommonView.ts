/**
 * 通用大面板的父类
 * author dmj
 * date 2017/9/16
 * @class CommonView
 */
abstract class CommonView extends BaseView
{
	private static showedViewNameList:string[]=[];
	
	// 规则说明按钮
	private _ruleBtn:BaseButton;

	private static _waitHideList:Object={};
	
	/**
	 * 正在加载的界面数量
	 */
	private static _showloadingCount:number=0;
	public constructor() 
	{
		super();
	}

	/**
	 * 
	 * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
	 */
	public show(data?:{tab?:string}):void
	{
		if(this.isShow())
		{
			return;
		}
		CommonView._showloadingCount++;
		App.LogUtil.log("commonview.showCount:",CommonView._showloadingCount);
		super.show(data);
	}
	public hide():void
	{
		if(!this.isShow())
		{
			return;
		}
		if(!this.isInit())
		{
			this.removeLoadingCount();
		}
		if(CommonView._showloadingCount>0)
		{
			let thisName:string=this.getClassName();
			let hideData:{hide:Function,hideThisObj:any}=CommonView._waitHideList[thisName];
			if(hideData==null)
			{
				hideData={hide:this.hide,hideThisObj:this};
				CommonView._waitHideList[thisName]=hideData;
				App.LogUtil.log(thisName,"等待关闭");
				return;
			}
		}
		super.hide();
		let idx:number=CommonView.showedViewNameList.indexOf(this.getClassName());
		if(idx>-1)
		{
			CommonView.showedViewNameList.splice(idx,1);
		}
		if(CommonView.showedViewNameList.length<1)
		{
			SceneController.getInstance().showScene();
		}
	}
	protected preInit():void
	{
		let thisName:string=this.getClassName();
		let idx:number=CommonView.showedViewNameList.indexOf(thisName);
		if(idx<0)
		{
			CommonView.showedViewNameList.push(thisName);
		}
		super.preInit();
		if(CommonView.showedViewNameList.length<2 && thisName != "RookieView" )
		{
			SceneController.getInstance().hideScene();
		}
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(bgName=="commonview_bg1"&&(this.viewBg instanceof BaseBitmap))
			{
				this.viewBg.fillMode=egret.BitmapFillMode.REPEAT;
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			this.viewBg.width = GameConfig.stageWidth;
			this.viewBg.height = GameConfig.stageHeigth;
		}
	}

	private removeLoadingCount():void
	{
		CommonView._showloadingCount--;
		App.LogUtil.log("commonview.hideCount:",CommonView._showloadingCount);
		if(CommonView._showloadingCount==0)
		{
			for(let key in CommonView._waitHideList)
			{
				let hideData:{hide:Function,hideThisObj:any}=CommonView._waitHideList[key];
				if(hideData)
				{
					hideData.hide.call(hideData.hideThisObj);
					hideData.hide=null;
					hideData.hideThisObj=null;
					delete CommonView._waitHideList[key];
					App.LogUtil.log(this.getClassName()+"初始化完成,关闭界面"+key);
				}
			}
		}
	}

	protected init():void
	{
		this.removeLoadingCount();
		super.init();
		this.initRuleBtn();
	}
	protected initTitle():void
	{
		super.initTitle();
		if(this.titleBg)
		{
			let titleBgShadow:BaseBitmap=BaseBitmap.create("commonview_titlebgshadow");
			titleBgShadow.width=this.titleBg.width;
			titleBgShadow.setPosition(0,this.titleBg.y+this.titleBg.height);
			this.addChild(titleBgShadow);
		}
	}
	protected initViewBg():void
	{
		super.initViewBg();
		
	}

	private initRuleBtn():void
	{
		if(this.getRuleInfo())
		{
			this._ruleBtn = ComponentManager.getButton("btn_rule","",this.clickRuleBtnHandler,this);
			this._ruleBtn.x = 12 + (PlatformManager.hasSpcialCloseBtn()?80:0);
			this._ruleBtn.y = 22;
			this.addChild(this._ruleBtn);
		}
	}

	private clickRuleBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,LanguageManager.getlocal(this.getRuleInfo()));
	}
	
	// 需要加载的资源
	protected getResourceList():string[]
	{
		let titleBgName:string=this.getTitleBgName();
		let resArr:string[]=super.getResourceList().concat([
			this.getBgName(),
			titleBgName,
			this.getCloseBtnName()
		]);
		if(titleBgName&&RES.hasRes(titleBgName+"shadow"))
		{
			resArr[resArr.length]=titleBgName+"shadow";
		}
		let lowClassName:string=this.getClassName().toLowerCase();
		if(RES.hasRes(lowClassName))
		{
			resArr[resArr.length]=lowClassName;
		}
		return resArr;
	}

	// 背景图名称
	protected getBgName():string
	{
		return "commonview_bg1";
	}
	
	// 标题背景名称
	protected getTitleBgName():string
	{
		return "commonview_titlebg";
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return ButtonConst.COMMON_CLOSE_1;
	}
	

	// 规则说明内容
	protected getRuleInfo():string
	{
		let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo";
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			
		}
		return "";
	}

	protected getRuleBtnName():string
	{
		return "btn_rule"
	}

	public dispose():void
	{
		
		if(this._ruleBtn)
		{
			this.removeChild(this._ruleBtn);
			this._ruleBtn.dispose();
			this._ruleBtn = null;
		}
		
		super.dispose();
	}
}
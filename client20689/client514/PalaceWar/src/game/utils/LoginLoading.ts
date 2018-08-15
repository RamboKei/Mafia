class LoginLoading extends BaseLoadDisplayObjectContiner
{
	private static _loginLoading:LoginLoading;
	private _progressBar:ProgressBar;
	private _loadImg:BaseLoadBitmap;
	private _bg:BaseBitmap;
	private _loadNumBMTxt:BaseBitmapText;
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return [];
	}

	protected init():void
	{
		let progressBarBg:BaseBitmap=BaseBitmap.create("loginbg_progressbg");
		progressBarBg.setPosition(GameConfig.stageWidth/2 - progressBarBg.width/2,GameConfig.stageHeigth - 128.8);
		this.addChild(progressBarBg);
		this._progressBar = ComponentManager.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1,ProgressBarConst.IMAGE_PROGRESS1_Bg);
		this._progressBar.x = GameConfig.stageWidth/2 - this._progressBar.getBgWidth()/2;
		this._progressBar.y = GameConfig.stageHeigth - 100;
		this.addChild(this._progressBar);
		this.setPercentage(0);

		let loginLoadingTxt:BaseBitmap=BaseBitmap.create("login_loading");
		loginLoadingTxt.setPosition(GameConfig.stageWidth*0.5 - loginLoadingTxt.width*0.5,this._progressBar.y-loginLoadingTxt.height-5);
		this.addChild(loginLoadingTxt);

		let loadNumBMTxt:BaseBitmapText=ComponentManager.getBitmapText("0%","loadnum_fnt");
		loadNumBMTxt.width=100;
		loadNumBMTxt.textAlign=egret.HorizontalAlign.CENTER;
		loadNumBMTxt.setPosition(GameConfig.stageWidth*0.5 - loadNumBMTxt.width*0.5,this._progressBar.y+this._progressBar.getBgHeight()+5);
		this.addChild(loadNumBMTxt);
		this._loadNumBMTxt=loadNumBMTxt;
		App.CommonUtil.formatSeaScreen(this);
	}

	private showBg():void
	{
		App.LogUtil.log("开始显示loginLoading的bg");
		LoginLoading.hideDivLoading();
		if(this._loadImg)
		{
			BaseLoadBitmap.release(this._loadImg);
			this._loadImg=null;
		}
		if(!this._bg)
		{
			this._bg=BaseBitmap.create(PlatCfg.loginBg);
			this.addChildAt(this._bg,0);
		}
	}

	public setPercentage(percent:number,textStr?:string,textColor?:number):void
	{
		if(this._progressBar)
		{
			this._progressBar.setPercentage(percent);
			if(this._loadNumBMTxt)
			{
				this._loadNumBMTxt.text=Math.floor(percent*100)+"%";
			}
		}
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.panelLayer;
	}

	public dispose():void
	{
		LoginLoading.hideDivLoading();
		this._progressBar=null;
		this._loadImg=null;
		this._loadNumBMTxt=null;
		super.dispose();
	}

	public static show():void
	{
		if(!LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading=new LoginLoading();
			LoginLoading._loginLoading.show();
		}
		else
		{
			if(!LoginLoading._loginLoading.parent)
			{
				LoginLoading._loginLoading.getParent().addChild(LoginLoading._loginLoading);
			}
		}
	}

	public static hide():void
	{
		if(LoginLoading._loginLoading)
		{
			if(LoginLoading._loginLoading.parent)
			{
				LoginLoading._loginLoading.parent.removeChild(LoginLoading._loginLoading);
			}
			LoginLoading.hideDivLoading();
			LoginLoading._loginLoading.setPercentage(0);
		}
	}

	public static showBg():void
	{
		if(LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading.showBg();
		}
	}

	public static setPercentage(percent:number,textStr?:string,textColor?:number):void
	{
		if(LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading.setPercentage(percent,textStr,textColor);
		}
	}

	public static hideDivLoading():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			var my = document.getElementById("alertdiv");
			if (my != null)
			{
				App.LogUtil.log("htmlloding移除完成");
				my.parentNode.removeChild(my);
			}
		}
	}
}
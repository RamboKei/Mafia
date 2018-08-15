class ScorePopupView extends PopupView
{
	private _leftScoreTxt:BaseTextField;
	
	/**
	 * 滑动列表
	 */
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.initMessage();
		this._leftScoreTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._leftScoreTxt.setPosition(this.viewBg.x+(this.viewBg.width-this._leftScoreTxt.width)/2,10);
		this.addChildToContainer(this._leftScoreTxt);

		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.width=540;
		bg.height=610+27;
		bg.setPosition(15,this._leftScoreTxt.y+this._leftScoreTxt.height+10);
		this.addChildToContainer(bg);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,600+25);
		this._scrollList = ComponentManager.getScrollList(this.getListItemClass(),this.getScoreDataList(),rect);
		this._scrollList.setPosition(bg.x+5,bg.y+5+3);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		this.addChildToContainer(this._scrollList);
	}


	protected initMessage():void
	{
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e?e.data:null;
		if(data.data.data&&data.data.data.rewards)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
		}
		if(this._leftScoreTxt)
		{
			this._leftScoreTxt.text =LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]);
		}
	}

	protected getListItemClass():any
	{
		return ScorePopupListItem;
	}

	protected getScoreDataList():any[]
	{
		return [];
	}

	protected getTitleStr():string
	{
		return "dinnerExchangePopupViewTitle";
	}

	protected getOwnScoreNum():number
	{
		return 0;
	}

	protected getBgExtraHeight():number
	{
		return 30;
	}

	public dispose():void
	{
		super.dispose();
	}
}

class ScorePopupListItem extends ScrollListItem
{
	protected _data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number,limit?:number};
	protected _needTxt:BaseTextField=null;
	protected _canNumTxt:BaseTextField=null;
	protected _idx:number = 0;
	public constructor()
	{
		super();
	}
	protected initItem(index:number,data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number}):void
	{
		App.MessageHelper.addNetMessage(this.getRequestType(),this.refresh,this);

		this._data=data;
		this._idx = index;
		let bg:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		bg.width=530;
		bg.height=120;
		this.addChild(bg);

		let icon:BaseDisplayObjectContainer=data.iconContainer;
		icon.setPosition(10,bg.y+(bg.height-icon.height)/2);
		this.addChild(icon);

		let nameTxt:BaseTextField=ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		nameTxt.setPosition(icon.x+icon.width+10,icon.y+10);
		this.addChild(nameTxt);

		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._needTxt.setPosition(nameTxt.x,nameTxt.y+nameTxt.height+10);
		this.addChild(this._needTxt);

		this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+10);
		this.addChild(this._canNumTxt);

		let btn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"exchange",this.exchangeHandler,this);
		btn.setPosition(bg.x+bg.width-btn.width-20,bg.y+(bg.height-btn.height)/2);
		this.addChild(btn);
	}

	protected needScore():number
	{
		return 0;
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit;
		}
		return 1;
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}

	private exchangeHandler():void
	{
		if(this.getOwnScoreNum()<this.needScore())
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		if(this.canExchangeNum()<=0)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}
		NetManager.request(this.getRequestType(),{itemKey:this._data.id});
	}

	protected refresh():void
	{	
		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt.text = LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]);
		this._canNumTxt.text = LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]);
	}

	protected getRequestType():string
	{
		return "重写getRequestType方法，返回cmd";
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(this.getRequestType(),this.refresh,this);
		this._needTxt = null;
		this._canNumTxt = null;
		this._idx = 0;

		super.dispose();
	}
}
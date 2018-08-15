class WelfareViewSignin extends WelfareViewTab
{
	private _scrollList:ScrollList;
	private _signRewardList:{index:number,rewardList:Array<RewardItemVo>,flag:number}[];
	private _index:number;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();

		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN,this.clickItemHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL),this.useCallback,this);
		
		let totalDayTF:BaseTextField = ComponentManager.getTextField(totalSignDay + "",TextFieldConst.FONTSIZE_TITLE_SMALL);
		totalDayTF.x = 105 - totalDayTF.width/2;
		totalDayTF.y = 205 - totalDayTF.height/2;
		this.addChild(totalDayTF);

		if(PlatformManager.checkIsKRSp())
		{
			totalDayTF.x = 130 - totalDayTF.width/2;
		}
		

		this._signRewardList = Api.arrivalVoApi.getSignRewardList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 312 - 40);
		this._scrollList = ComponentManager.getScrollList(WelfareViewSignScrollItem,this._signRewardList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0,223 + 20);
		let showIndex = Api.arrivalVoApi.getIndexByCurday();
		showIndex = showIndex > 2?showIndex - 1:1;
		this._scrollList.setScrollTopByIndex(showIndex);
	}

	private useCallback(event:egret.Event):void
	{
		
		let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
		if(welfareViewSignScrollItem)
		{
			welfareViewSignScrollItem.updateButtonState();
		}
		// let rewardList = this._signRewardList[this._index].rewardList;
		// if(rewardList)
		// {
		// 	let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
		// 	App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
		// }
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		this._index = Number(event.data.index);

		// let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
		// if(welfareViewSignScrollItem)
		// {
		// 	welfareViewSignScrollItem.updateButtonState();
		// }

		NetManager.request(NetRequestConst.REQUEST_USER_ARRIVAL,null);

	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN,this.clickItemHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL),this.useCallback,this);
		super.dispose();
	}
}
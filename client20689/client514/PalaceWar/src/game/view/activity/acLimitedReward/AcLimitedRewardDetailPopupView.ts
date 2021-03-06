class AcLimitedRewardDetailPopupView extends PopupView
{
	private _aid:string = "";
	private _code:string = "";
	private _scrollList:ScrollList;
	private _limitedRewardInfoVoList:Array<AcLimitedRewardInfoVo> = [];
	private _index:number;
	public constructor() 
	{
		super();
		
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD,this.clickItemHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		let acLimitedRewardVo = <AcLimitedRewardVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		this._limitedRewardInfoVoList = acLimitedRewardVo.getLimitedRewardInfoVoList();

		if(this._limitedRewardInfoVoList&&this._limitedRewardInfoVoList.length>0)
		{
			var num = acLimitedRewardVo.getShowNum();
			this._limitedRewardInfoVoList.splice(num,this._limitedRewardInfoVoList.length-num);
		}

	
		
		let rewardGradeTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rewardGradeTitle"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		rewardGradeTF.x = 20;
		rewardGradeTF.y = 10;
		this.addChildToContainer(rewardGradeTF);


		let temW = this.viewBg.width - 40;
		let temH = this.getShowHeight() - 180;
		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = temW;
		bg.height = temH;
		bg.x = 20;
		bg.y = rewardGradeTF.y + rewardGradeTF.height + 10;
		this.addChildToContainer(bg);
 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,temW - 10,temH - 20);
		this._scrollList = ComponentManager.getScrollList(AcLimitedRewardDetailScrollItem,this._limitedRewardInfoVoList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(25,bg.y + 10);

		let maxGrade = acLimitedRewardVo.getMaxGrade();
		let len = this._limitedRewardInfoVoList.length;
		maxGrade = (maxGrade + 2) > len?maxGrade-2:maxGrade;
		// 档位小于3挡会有问题
		maxGrade = maxGrade<=0 ?0:maxGrade;
		this._scrollList.setScrollTopByIndex(maxGrade);
	}

	private useCallback(event:egret.Event):void
	{
		
		let limitedrewardDetailScrollItem = <AcLimitedRewardDetailScrollItem>this._scrollList.getItemByIndex(this._index);
		if(limitedrewardDetailScrollItem)
		{
			let acLimitedRewardVo = <AcLimitedRewardVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
			limitedrewardDetailScrollItem.updateButtonState();
		}
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		this._index = Number(event.data.index);
		let rkey = Number(event.data.rkey);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD,{"activeId":(this._aid + "-" + this._code),"rkey":rkey});

	}

	/**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		this._aid = String(this.param.data.aid);
		this._code = String(this.param.data.code);
		if(this._aid == "" || this._code == "")
		{
			return null
		}
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,requestData:{activeId:this._aid+"-"+this._code}};
	}

	protected getTitleStr():string
	{
		let rRewardVo = <AcLimitedRewardVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		return "ac"+App.StringUtil.firstCharToUper(this._aid+"-"+ rRewardVo.atype)+"_Title";
	}

	// protected clickConfirmHandler(data:any):void
	// {
	// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANKLISTPOPUPVIEW,{"aid":this._aid,"code":this._code});
	// }

	protected getShowHeight():number
	{
		return 750;
	}
	

	// protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }

	// protected getConfirmBtnStr():string
	// {
	// 	return "userProgressTitle";
	// }

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD,this.clickItemHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		this._aid = null;
		this._code = null;
		this._scrollList = null;
		this._limitedRewardInfoVoList = null;
		this._index = null;
		
		super.dispose();
	}
}
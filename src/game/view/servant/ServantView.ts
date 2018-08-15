/**
 * 门客
 * author yanyuling
 * date 2017/9/25
 * @class ItemView
 */

class ServantView  extends CommonView
{
	static  DROPBTN_COLOR1:number = 0xfffcd8;
	static  DROPBTN_COLOR2:number = 0x99a3b4;
	private _nodeContainer:BaseDisplayObjectContainer;
	private _dropDownContainer:BaseDisplayObjectContainer;
	private _dropDownBtn:BaseButton;
	private _dropDownFlag:BaseBitmap;
	private _dropBtnList:BaseButton[];
	private _lastDropIdx:number=1;
	private _scrollList:ScrollList = null;
	public constructor() {
		super();
	}

	public initView():void
	{
		this._dropBtnList = [];
		this._nodeContainer = new BaseDisplayObjectContainer();
		// this._nodeContainer.y = -20;
		this.addChildToContainer(this._nodeContainer);

		this._lastDropIdx = Api.otherInfoVoApi.getServantSortId();
		let topBg = BaseBitmap.create("public_bg6");
		topBg.y = -20;
		this._nodeContainer.addChild(topBg);

		//门客滚顶区域
		let scroY = topBg.height - topBg.y;
		let innerbg =  BaseBitmap.create("public_9_bg24");
		innerbg.width = GameConfig.stageWidth-10;
		innerbg.height = GameConfig.stageHeigth - scroY-80;
		innerbg.x = 5;
		innerbg.y = scroY-35;
		this._nodeContainer.addChild(innerbg);

		let servantNumBg = BaseBitmap.create("servant_topnumbg");
		servantNumBg.x = 20;
		servantNumBg.y = topBg.y + topBg.height/2 - servantNumBg.height/2;
		this._nodeContainer.addChild(servantNumBg);

		let servantNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		servantNumTxt.textColor = TextFieldConst.COLOR_WHITE;
		servantNumTxt.size = 24;
		servantNumTxt.text = LanguageManager.getlocal("servant_count") + Api.servantVoApi.getServantCount();
		servantNumTxt.x = servantNumBg.x + servantNumBg.width/2 - servantNumTxt.width/2;
		servantNumTxt.y = topBg.y + topBg.height/2 - servantNumTxt.height/2;
		this._nodeContainer.addChild(servantNumTxt);

		this._dropDownBtn = ComponentManager.getButton("servant_dropBtn","",this.dropDownBtnClickHandler,this,[0]);
		this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 20;
		this._dropDownBtn.y = servantNumTxt.y + servantNumTxt.height/2 - this._dropDownBtn.height/2;
		this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
		this._nodeContainer.addChild(this._dropDownBtn);
		this._dropDownBtn.setText("servant_dropTxt"+this._lastDropIdx);
		this._dropBtnList.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("servant_dropIcon");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2 -10;
		this._nodeContainer.addChild(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer()
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
		this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
		
		let dropCfg=[
			// "servant_dropTxt1","servant_dropTxt2","servant_dropTxt3"
			"servant_dropTxt1","servant_dropTxt2","servant_dropTxt3","servant_dropTxt4"
		]

		for (var index = 1; index <=dropCfg.length; index++) {
			let tmpBtn = ComponentManager.getButton("servant_dropBtn","",this.dropDownBtnClickHandler,this,[index]);
			this._dropBtnList.push(tmpBtn);
			tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
			tmpBtn.y = tmpBtn.height*(index-1);
			this._dropDownContainer.addChild(tmpBtn);
			tmpBtn.setText(dropCfg[index-1]);
		}
		
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-scroY-100);
		let keys = Api.servantVoApi.getServantInfoIdListWithSort(this._lastDropIdx);
		this._scrollList = ComponentManager.getScrollList(ServantScrollItem,[],rect);
		this._scrollList.y = scroY-25;
		this._nodeContainer.addChild(this._scrollList);
		this._scrollList.refreshData(keys);	
		this._nodeContainer.addChild(this._dropDownContainer);

		Api.rookieVoApi.checkNextStep();
		
	}

	public dropDownBtnClickHandler(btnIdx:number)
	{
		let tmpIdx = this._lastDropIdx;
		for (var index = 1; index < this._dropBtnList.length; index++) {
			this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
		}
		this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;
		}
		if (btnIdx > 0 )
		{
			this._dropDownBtn.setText("servant_dropTxt"+btnIdx);
			this._lastDropIdx = btnIdx;
		}

		if(tmpIdx == this._lastDropIdx)
		{
			return;
		}
		
		//排序数据，刷新列表
		let keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
		this._scrollList.refreshData(keys);	
		NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});	
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_namebg","servant_dropBtn","servant_dropBtn_down","servant_dropIcon","servant_namebg",
			"servant_star",
			"servant_cardbg_selected","servant_topnumbg",
			"servant_lvbg","servant_starbg"
		]);
	}
	public hide():void
	{
		if(this._lastDropIdx != Api.otherInfoVoApi.getServantSortId())
		{
			NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});
		}
		super.hide();
	}
	protected getRuleInfo():string
	{
		return "servant_description";
	}

	public dispose():void
	{
		// this._nodeContainer.removeChildren();
		// this._nodeContainer.dispose()
		// this._dropDownContainer.removeChildren();
		// this._dropDownContainer.dispose()
		this._nodeContainer = null;
		this._dropDownContainer = null;
		this._scrollList = null;
		this. _dropDownBtn = null;
		this. _dropDownFlag = null;
		this._dropBtnList = null;
		this._lastDropIdx = 1;
		super.dispose();
	}
}
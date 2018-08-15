/**
 * 选择孩子列表
 * author dky
 * date 2017/10/31
 * @class AdultChooseChildView
 */
class AdultChooseChildView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _selectChildId:any;

	private _childInfo:any;

	private _sortBtn:BaseButton;

	private _sortType:number = 1;//"adultChooseSort1":"属性降序", "adultChooseSort2":"默认排序",

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,this.doMarry,this);


		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;
		this._childInfo = this.param.data.childInfo;
		// this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);

		let gemBgIcon = BaseBitmap.create("mainui_topresbg");
		gemBgIcon.x = 250;
		gemBgIcon.y = 21;
		this.addChildToContainer(gemBgIcon);

		let gemBg = BaseLoadBitmap.create("itemicon1");
		gemBg.setScale(0.5);
		gemBg.x = 230;
		gemBg.y = gemBgIcon.y + gemBgIcon.height/2 - 100/2 + 23;
		this.addChildToContainer(gemBg);

		let gem = Api.playerVoApi.getPlayerGem();
		let gemText = ComponentManager.getTextField(gem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		gemText.x = 280;
		gemText.y = gemBgIcon.y + gemBgIcon.height/2 - gemText.height/2;
		this.addChildToContainer(gemText);

		let bottomBg = BaseBitmap.create("public_9_bg4");
		bottomBg.width = 520;
		bottomBg.height = GameConfig.stageHeigth - 500;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = 75;
		this.addChildToContainer(bottomBg);

		
	
		let childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,508,bottomBg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AdultChooseChildScrollItem,childList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 7 ,bottomBg.y + 10);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip3"))

		//排序
		this._sortBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultChooseSort1",this.refreshHandler,this);
		this._sortBtn.x = bottomBg.x + bottomBg.width/2 - this._sortBtn.width/2;
		this._sortBtn.y = bottomBg.y + bottomBg.height + 12;
		// this._sortBtn.
		this.addChildToContainer(this._sortBtn);
		this._sortBtn.setColor(TextFieldConst.COLOR_BLACK);



	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_RADULT_AGREEPROPOSE) {
			if(data.data.data.proflag == 2){
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4") );


				if(this.param.data.confirmCallback){
					this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				}

				this.hide();
				return;
			}
			// this._scrollList.refreshData(data.data.data.minfo)
			let childId = data.data.data.adultId;
			ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId,confirmCallback: null, handler: this });
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,null);
			this.hide();
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE) {
			
		}
	}
	private refreshHandler()
	{
		let childInfoList;
		if(this._sortType == 1){
			this._sortType = 2;
			childInfoList = Api.adultVoApi.getAdultVoListByIdByAttr(this._childInfo.aquality,this._childInfo.sex);
			this._sortBtn.setText("adultChooseSort2");
		}else{
			this._sortType = 1;
			childInfoList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);
			this._sortBtn.setText("adultChooseSort1");
		}
		this._scrollList.refreshData(childInfoList);
	}

	//选择联姻
	private doMarry(event:egret.Event)
	{
		this._selectChildId = event.data.childId;
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId,confirmCallback: this.selectMarryHander, handler: this });
		// this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id,isBatch:0 });
	}

	//选好了道具
	private selectMarryHander(type:number)
	{
		this.request(NetRequestConst.REQUEST_RADULT_AGREEPROPOSE, { aid: this._childInfo.id ,childId: this._selectChildId ,protype:type});
	}




	private marryOneHandler()
	{
		
		// ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.chooseOneCallBack, handler: this });
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
	}
	private chooseAllCallBack(type:number)
	{
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSEALL, { childId: this._adultInfoVo.id ,protype:type});
		
	}
	private chooseOneCallBack(type:number)
	{
		App.LogUtil.log(type);
		
	}


	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	public dispose():void
	{

		// 未婚滑动列表
		this._scrollList = null;


		this._confirmCallback = null;
		this._handler = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._selectChildId = null;

		this._childInfo = null;

		this._sortBtn = null;

		this._sortType = 1;

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,this.doMarry,this);
		super.dispose();
	}
}
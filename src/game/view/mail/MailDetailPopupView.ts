/**
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
class MailDetailPopupView extends PopupView
{
	private _mailInfoVo:MailInfoVo;
	// 领取按钮
	private _collectFlag:BaseBitmap = null;
	private _bg:BaseBitmap;
	private _scrollList:ScrollList;
	private _index:number = 0;
	// private _contentTF:BaseTextField = null;
	private _txtCountainer:BaseDisplayObjectContainer =null;

	/**存储门口的奖励信息 */
	private _rewardItemVoList : RewardItemVo[];
	/**是否拥有了这个门客 */
	private _isHavehero:boolean[] = [];

	private _strTotch:string = "";
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		
		
		this._txtCountainer=new BaseDisplayObjectContainer();
		this.addChildToContainer(this._txtCountainer);

		this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
		this._index = Number(this.param.data.index);
		let temX = 40;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 600;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);
		this._bg = bg;

		let titleTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("title")+"："+this._mailInfoVo.title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.x = temX;
		titleTF.y = 30;
		this.addChildToContainer(titleTF);

		let timeTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("time")+"："+this._mailInfoVo.timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		timeTF.x = temX;
		timeTF.y = 60;
		this.addChildToContainer(timeTF);

		let temH = 410;
		let touch = this._mailInfoVo.touch
		if(touch == "")
		{
			bg.height = 660;
			temH = 508 + 60;
		}
		let bg2:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg2.width = 496;
		bg2.height = temH;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = timeTF.y + timeTF.height + 10;
		this.addChildToContainer(bg2);
		let contentTF:BaseTextField;
		if(this._mailInfoVo.content)
		{
			contentTF = ComponentManager.getTextField((App.DeviceUtil.isWyw()?"\n":"") + this._mailInfoVo.content,TextFieldConst.FONTSIZE_CONTENT_SMALL-2);
			contentTF.x = 0;
			contentTF.y = App.DeviceUtil.isWyw()?-13:5;
			contentTF.width = bg2.width - 20;
			contentTF.lineSpacing = 5;
			contentTF.cacheAsBitmap = true;
			contentTF.touchEnabled = true;
			// this.addChildToContainer(contentTF);
			this._txtCountainer.addChild(contentTF);
			// this.addChild(contentTF);
			
			var  scrollRect = new egret.Rectangle(0,0,bg2.width - 20,390);
			var	scrollView =ComponentManager.getScrollView(this._txtCountainer,scrollRect);
			scrollView.x=50;
			scrollView.y=100;//250;
			this.addChildToContainer(scrollView);
			// this.addChild(scrollView);
			scrollView.height =temH-20;
			
	
		}
		
		if(touch != "")
		{
			let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(this._mailInfoVo.touch);

			this._rewardItemVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
			for(var i = 0;i < this._rewardItemVoList.length;i++)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				if(Api.servantVoApi.getServantObj(String(rewardItemvo.id)) != null)
				{
					this._isHavehero.push(true);
				}
				else{
					this._isHavehero.push(false);
				}
				
			}
			

			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS),this.useCallback,this);


			let rect = egret.Rectangle.create();
			if(rewardVoList.length > 5)
			{
				bg2.height -= 100;
				// if(contentTF)
				// {
				// 	let scrollRect:egret.Rectangle = new egret.Rectangle(contentTF.x,contentTF.y,contentTF.width,bg2.height - 20);
				// 	contentTF.scrollRect = scrollRect;
				// }
				rect.setTo(0,0,bg2.width,200);
			}
			else
			{
				rect.setTo(0,0,bg2.width,110);
			}
			
			
			let scrollListContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			scrollListContainer.width = rect.width;
			scrollListContainer.height = rect.height;
			scrollListContainer.x = bg2.x + 2;
			scrollListContainer.y = bg2.y + bg2.height + 5;
			this.addChildToContainer(scrollListContainer);

			this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardVoList,rect);
			scrollListContainer.addChild(this._scrollList);
		}
		if(this._mailInfoVo.istouch == 1)
		{
			if(this._mailInfoVo.hadget == 0)
			{
				// this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.getRewardHanlder,this)
				// this._getBtn.x = this.viewBg.x + this.viewBg.width/2 - this._getBtn.width/2;
				// this._getBtn.y = bg.x + bg.height - this._getBtn.height - 20;
				// this.addChildToContainer(this._getBtn);
			}
			else
			{
				// let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
				let hasGetSp:BaseBitmap = BaseBitmap.create("collectflag");
				hasGetSp.setScale(0.6);
				hasGetSp.x = this.width/2 - hasGetSp.width/2*0.6;
				hasGetSp.y = GameConfig.stageHeigth/2 + this.getShowHeight()/2 - hasGetSp.height*0.6 - 10;
				this.addChild(hasGetSp);
			}
			
		}

	}

	protected clickConfirmHandler(data:any):void
	{
		NetManager.request(NetRequestConst.REQUEST_MAIL_GET_REWARDS,{"mailId":this.param.data.mid});
	}

	protected getShowHeight():number
	{
		return 750;
	}

	protected getBgExtraHeight():number
	{
		if(this._mailInfoVo.touch == "")
		{
			return 30;
		}
		return 86;
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	protected getConfirmBtnStr():string
	{
		if(this._mailInfoVo.istouch == 1)
		{
			if(this._mailInfoVo.hadget == 0)
			{
				return "taskCollect"
			}
		}
		return "";
	}
	private useCallback(event:egret.Event):void
	{

		this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);

		this.openRewardView();

		if(this._mailInfoVo && this._mailInfoVo.hadget == 1)
		{
			this.playGetRewardAni();
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
		
	}

	private openRewardView()
	{
		var touch:string = "";
		var servantName:string = "";
		var servantList:string[] = [];
		let rewardsArr:Array<string> = this._mailInfoVo.touch.split("|");
		for(var i = 0;i < this._rewardItemVoList.length;i++)
		{
			if (this._rewardItemVoList[i].type == 8 && this._isHavehero[i])
			{

				let rewardItemvo = this._rewardItemVoList[i];
				let servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
				if(servantReward.exchange != null)
				{
					
					servantName = servantName + servantReward.name + ",";
					servantList.push(servantReward.id);
					touch = servantReward.exchange;
					// rewardsArr[i] = servantReward.exchange;
					rewardsArr[i] = "";
				}

			}
			if(rewardsArr[i] != "")
				this._strTotch = this._strTotch + rewardsArr[i] + "|";
		}
		
		if(servantList.length > 0)
		{
			touch = touch.substr(0,7) + String(servantList.length * 10);
			ViewController.getInstance().openView(ViewConst.POPUP.MAILREWARDDETAILPOPUPVIEW,{"name":servantName.substring(0,servantName.length - 1),"touch":touch })
			// this._mailInfoVo.touch = touch;
			this._strTotch = this._strTotch + touch;
		}
		else{
			this._strTotch = this._strTotch.substring(0,this._strTotch.length - 1);
		}
		
	}
	private playGetRewardAni():void
	{
		this.setConfirmBtnVisible(false);
		if(this._collectFlag == null)
		{
			// let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
			this._collectFlag = BaseBitmap.create("collectflag")
			this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
			this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
			this._collectFlag.x = this.width/2;
			// this._collectFlag.y = pt.y + this._bg.height + 105 - 63;
			this._collectFlag.y = GameConfig.stageHeigth/2 + this.getShowHeight()/2 - this._collectFlag.height*0.6*0.5 - 10;
			this.addChild(this._collectFlag);
		}
		
		this._collectFlag.setScale(1.2);
		egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.6,scaleY:0.6},400).wait(600);
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(this._strTotch);
		
		if(rewardVoList)
		{
			// this._scrollList.refreshData(rewardVoList);
			let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
			App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,null);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL),this.useCallback,this);
		this._collectFlag = null;
		this._mailInfoVo = null;
		this._bg = null;
		this._scrollList = null;
		this._index = 0;
		this._txtCountainer=null;
		this._isHavehero = [];
		this._rewardItemVoList = null;
		this._strTotch ="";
		super.dispose();
	}

}
class RechargeVipView  extends CommonView
{
    //充值与VIP
	private _progressBar:ProgressBar;
	private _leftVip:BaseLoadBitmap;
	private _rightVip:BaseLoadBitmap;
	private _upTxt:BaseTextField;
	private _gemTxt:BaseTextField;
	private  _greenarrow:BaseBitmap=null;
	private _currMaxVip:number =0;
	private public_dot2:any =null;
	/** 闲徕钻石txt */
	private xldiaTxt:BaseTextField = null;
	private _hasFirstInited:boolean=false;

	/**
	 * 当前帧是否已经获取过闲来钻石
	 */
	private _hasGetXlDiamondInFrame:boolean=false;
	public constructor() 
	{
		super();
	}

	protected getTabbarGroupY():number
	{
		return 40;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[ 
			"recharge_fnt",
			"rechargeview_greenarrow",
			"rechargevie_topbar",
			"common_left_bg",
			"common_9_bg",
			"rechargevie_close",
			"rechargevie_down",
			"rechargevie_open",
			"achievement_state3",
			"servant_topresbg", 
			"progress7",
			"progress7_bg",
			"itemeffect",
			"rechargevie_btn",
			"rechargevie_btn_down",
			"rechargevie_receivebtn_down",
			"rechargevie_receivebtn",
			"rechargevie_received",
			"rechargevie_receiveImg",
			"rechargevie_effects", 
			"recharge_discount_left",
			"recharge_discount_right",
			"btn_small_orange_down",
			"btn_small_orange",
			"recharge2big",
			"recharge4",
			"rechargelistimg",
			"rechargetitlenewbg", 
			"recharge2_fnt",
			"rechargetitlle",
			"welfare_hasbuy",
			"rechargevie_give"
			]);
	}
	private hideAndShowVip(){
		this.hide();		
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}
	public initView():void
	{
		
		if (PlatformManager.checkIsUseSDK()&& PlatformManager.checkIsWeiduan()==true && App.DeviceUtil.isAndroid() &&(PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true)) 
		{
			//漏单处理
			PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
			console.log("QAZ checkPurchase");
		}

		let public_dot2 =BaseBitmap.create("public_dot2");
		this.addChild(public_dot2);
		public_dot2.x =295;
		public_dot2.y =this.tabbarGroup.y;
		this.public_dot2 = public_dot2;
	

	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_RE,this.rechargeHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW,this.hideAndShowVip,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refreshXlDiamondNum,this);
		if(PlatformManager.checkIsXlSp&&this._hasFirstInited==false)
		{
			this._hasFirstInited=true;
			document.addEventListener("XLH5SDKdiamondchanged",(e:any)=>{
				if(e&&e.data)
				{
					this.refreshXlDiamondNum(e.data.balance);
				}
			},false);
		}
		
		
		let goldBg = BaseBitmap.create("servant_topresbg");
		goldBg.width = 100
		goldBg.x = 50 + (PlatformManager.hasSpcialCloseBtn()?100:0);
		goldBg.y = 55 + (PlatformManager.hasSpcialCloseBtn()?35:0);
		this.addChild(goldBg);

		let gemIcon:BaseLoadBitmap=BaseLoadBitmap.create("itemicon1");
		gemIcon.setPosition(goldBg.x-42,goldBg.y-20);
		gemIcon.setScale(0.6);
		this.addChild(gemIcon);

		//金币文字
		let gemTxt:BaseTextField=ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		gemTxt.setPosition(gemIcon.x+100*gemIcon.scaleX,gemIcon.y+(100*gemIcon.scaleY-gemTxt.height)/2+5);
		this.addChild(gemTxt);
		this._gemTxt=gemTxt;


		//黑色长条
		let bgBlackBar:BaseBitmap=BaseBitmap.create("public_9_viewmask");
		bgBlackBar.width =640;
		bgBlackBar.height =30;
		bgBlackBar.setPosition(0,90);
		this.addChild(bgBlackBar);
		this.setChildIndex(bgBlackBar,this.getChildIndex(this.closeBtn)-1);

		if(PlatformManager.checkIsXlSp()&&PlatformManager.checkIsUseSDK())
		{
			if(this.titleTF)
			{
				this.titleTF.visible=false;
			}
			RSDKHelper.getXlSpDiamondNum((diaNum:number)=>{
				let xldiaBg:BaseLoadBitmap=BaseLoadBitmap.create("recharge_xldiabg");
				xldiaBg.setPosition(200,50-7);
				this.addChild(xldiaBg);
				let xldia:BaseLoadBitmap=BaseLoadBitmap.create("recharge_xldia");
				xldia.setPosition(180,42-7);
				this.addChild(xldia);
				let xldiaTxt:BaseTextField=ComponentManager.getTextField(String(diaNum),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
				xldiaTxt.width=160;
				xldiaTxt.textAlign=egret.HorizontalAlign.CENTER;
				xldiaTxt.setPosition(200+60,62-7);
				this.addChild(xldiaTxt);
				this.xldiaTxt = xldiaTxt;
			});
		}

		//再充值多少解锁特权
		let upTxt:BaseTextField=ComponentManager.getTextField("1",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		upTxt.setPosition(PlatformManager.hasSpcialCloseBtn()?(goldBg.x + goldBg.width + 10):((GameConfig.stageWidth-upTxt.width)*0.5),95);
		this.addChild(upTxt);
	    this._upTxt=upTxt;


		let progressBar:ProgressBar=ComponentManager.getProgressBar("progress7","progress7_bg",316);
		progressBar.setPosition(160+(GameConfig.stageWidth-progressBar.width)*0.5,upTxt.y+upTxt.height+40);
		this.addChild(progressBar);
		this._progressBar=progressBar;
		let leftVip:BaseLoadBitmap=null;
		if(Api.vipVoApi.getCurLevelVipCfg().level!=0)
		{
			let currLeftVip:any =Api.vipVoApi.getCurLevelVipCfg().icon;
	     	leftVip=BaseLoadBitmap.create(currLeftVip);
			leftVip.setPosition(380,progressBar.y-29);
			this.addChild(leftVip);
			leftVip.bindData=currLeftVip;
			this._leftVip=leftVip;
			
		    this._greenarrow=BaseBitmap.create("rechargeview_greenarrow");
			this._greenarrow.setPosition(this._leftVip.x+this._leftVip.width+80,this._leftVip.y+5);
			this.addChild(this._greenarrow);

			var currRightIcon =Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
			let rightVip:BaseLoadBitmap=BaseLoadBitmap.create(currRightIcon);
			rightVip.setPosition(this._leftVip.x+110,this._leftVip.y);
			this.addChild(rightVip);
			rightVip.bindData=currRightIcon;
			this._rightVip=rightVip;
		}
		else
		{
			leftVip=BaseLoadBitmap.create("");
			leftVip.setPosition(380,progressBar.y-32);
			this.addChild(leftVip);
			this._leftVip=leftVip;
		
			if(this._greenarrow)
			{
			this._greenarrow.setPosition(430,progressBar.y-27);
			}else
			{
				this._greenarrow=BaseBitmap.create("rechargeview_greenarrow");
				this._greenarrow.setPosition(420,progressBar.y-27);
				this.addChild(this._greenarrow)
			}
			this._greenarrow.visible =false;

			let rightVip:BaseLoadBitmap=BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon);
			rightVip.bindData=currRightIcon;
			this.addChild(rightVip);
			this._rightVip=rightVip;
		}

		//rechargevie_topbar  上边长条
		let rechargevie_topbar:BaseLoadBitmap=BaseLoadBitmap.create("rechargevie_topbar");
		rechargevie_topbar.setPosition(0,this._progressBar.y+30);
		this.addChild(rechargevie_topbar);
		this.refresh();
	
		

	}
	private rechargeHandler():void
	{
		var data:any =[];
		data.index =0;
		this.clickTabbarHandler(data);
		this.tabbarGroup.selectedIndex = data.index;
	}

	private refresh():void
	{
		this.public_dot2.visible = Api.vipVoApi.getReddot();

		this._currMaxVip =Api.playerVoApi.getPlayerMaxVip();
		if(this._progressBar)
		{
			let nextVipNeedGem:number=Api.vipVoApi.getNextVipNeedGemNum();
			let nextVipLeftGem:number=Api.vipVoApi.getNextVipLvNeedRechargeGemNum();
			let nextVipHasRechargeGem:number=nextVipNeedGem-nextVipLeftGem;
			let nextVipLevel:number=Math.min(Config.VipCfg.getMaxLevel(),Api.playerVoApi.getPlayerVipLevel()+1);
			if(Api.playerVoApi.getPlayerVipLevel()==this._currMaxVip)
			{
				this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipMaxDesc");
				this._progressBar.setPercentage(1,nextVipNeedGem+"/"+nextVipNeedGem);
			}
			else
			{
				this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipDesc",[nextVipLeftGem.toString(),nextVipLevel.toString(),Api.playerVoApi.getPlayerVipLevel()+""]);
				this._progressBar.setPercentage(nextVipHasRechargeGem/nextVipNeedGem,nextVipHasRechargeGem+"/"+nextVipNeedGem);
				
			}
			if (!PlatformManager.hasSpcialCloseBtn()) {
				this._upTxt.setPosition((GameConfig.stageWidth-this._upTxt.width)*0.5,95);
			}
		
			
			if(this._gemTxt)
			{
				this._gemTxt.text=Api.playerVoApi.getPlayerGem().toString();
			}
			

			if(Api.vipVoApi.getCurLevelVipCfg().level!=0&&Api.playerVoApi.getPlayerVipLevel()!=this._currMaxVip)
			{
				let currLevip:any =	Api.vipVoApi.getCurLevelVipCfg().icon;
				this._greenarrow.visible =true;

				if(this._leftVip.bindData!=currLevip)
				{
				this._leftVip.setload(currLevip);
				this._leftVip.bindData=currLevip;
				}
			
			  if(this._greenarrow)
			  {
			   this._greenarrow.setPosition(460,this._leftVip.y+5);
			  }

			  var currRightIcon:any = Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
				if(this._rightVip)
				{
					if(this._rightVip.bindData==currRightIcon)
					{
						this._rightVip.setPosition(this._leftVip.x+110,this._leftVip.y);
					}
					else
					{ 
						 this._rightVip.setload(currRightIcon);
						 this._rightVip.bindData =currRightIcon
				   }
				   this._rightVip.setPosition(this._leftVip.x+110,this._leftVip.y);
				 }
			}
			else
			{
				if(Api.playerVoApi.getPlayerVipLevel()==this._currMaxVip)
				{
					this._leftVip.visible =false;
					this._greenarrow.visible =false;
					this._rightVip.setPosition(this._leftVip.x+60,this._leftVip.y+3);
				}
				else
				{
					this._rightVip.setPosition(this._leftVip.x+60,this._leftVip.y+3);
				}
			}
		}
	}

	private refreshXlDiamondNum(diamondNum?):void
	{
		if(typeof(diamondNum)=="number"&&isNaN(diamondNum)==false)
		{
			if (this.xldiaTxt) 
			{
				this.xldiaTxt.text = String(diamondNum);
			}
			return;
		}
		if(this._hasGetXlDiamondInFrame)
		{
			return;
		}
		this._hasGetXlDiamondInFrame=true;
		// 刷新闲徕钻石数量
		if(PlatformManager.checkIsXlSp()&&PlatformManager.checkIsUseSDK())
		{
			RSDKHelper.getXlSpDiamondNum((diaNum:number)=>{
				if (this.xldiaTxt) {
					this.xldiaTxt.text = String(diaNum);
				}
			});
		}
		egret.callLater(()=>{
			this._hasGetXlDiamondInFrame=false;
		},this);
	}

	 protected receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{
			// if(data.data.data.payment)
			// {
			// 	let itemid=data.data.data.payment.itemId;
			// 	App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1"));
			// 	let doubleIcon:BaseBitmap=<BaseBitmap>this.getChildByName(itemid+"doubleIcon");
			// 	if(doubleIcon)
			// 	{
			// 		BaseBitmap.release(doubleIcon);
			// 	}
			// }
			this.refresh();
			this.refreshXlDiamondNum();
		}
	}

	private useVipCallback(event: egret.Event): void {
		if (event.data.ret) 
		{
			this.public_dot2.visible = Api.vipVoApi.getReddot();
		}
	}

    protected getTabbarTextArr():Array<string>
	{
		return ["rechargeVipViewTitle",
	            "vipBtn"
		];
	}

	private tick() {
		if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
			this.getSelectedTab()["tick"].call(this.getSelectedTab());
		}
	}
    public dispose():void
	{

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_RE,this.rechargeHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW,this.hideAndShowVip,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refreshXlDiamondNum,this);
		this._progressBar=null;
		this._rightVip=null;
		this._upTxt =null;
		this. _gemTxt =null;
		this._leftVip =null
		this._greenarrow =null;
		this._currMaxVip =0;
		this.public_dot2=null;
		this.xldiaTxt=null;
		this._hasGetXlDiamondInFrame=false;
		super.dispose();
	}
}

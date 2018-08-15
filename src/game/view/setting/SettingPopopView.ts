/**
 * 设置
 * author dky
 * date 201711/10
 * @class SettingPopopView
 */
class SettingPopopView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _voiceText:BaseTextField;
	private _nationalText:BaseTextField;
	private _serviceType:number = 0;
	private _checkFlag:BaseBitmap;
	private _checkFlag2:BaseBitmap;
	private _cantoneseText:BaseTextField;
	/**策略的开关 */
	private _strategySwitch:BaseBitmap;

	private _strategyText:BaseTextField;
	/**策略的 on or off */
	private _strategyState:BaseTextField;
	/**策略的本地数据 */
	private _strategyType:string = "";

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[
			"hold_dinner_box", 
			"hold_dinner_check",
			]);
	}

	protected initView():void
	{

		
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 520;
		bg.height = 300;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
		
		let descText = ComponentManager.getTextField(LanguageManager.getlocal("settingAcountInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descText.x = 50;
		descText.y = bg.y + 20;
		this.addChildToContainer(descText);

		let nameTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTitleText.x = descText.x;
		nameTitleText.y = descText.y + nameTitleText.height + 15;
		this.addChildToContainer(nameTitleText);

		let nameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		nameText.x = nameTitleText.x + nameTitleText.width;
		nameText.y = nameTitleText.y ;
		this.addChildToContainer(nameText);


		if(PlatformManager.checkIs3KSubSp()&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let guidTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserGUID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			guidTitleText.textFlow=new Array<egret.ITextElement>({text:LanguageManager.getlocal("settingUserGUID"),style:{underline:true}});
			guidTitleText.x = 300;
			guidTitleText.y = nameTitleText.y ;
			guidTitleText.addTouchTap(this.idTouchHandler,this,null);
			this.addChildToContainer(guidTitleText);

			// let guidText = ComponentManager.getTextField(PlatformManager.client3k.getGUID(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			// guidText.x = guidTitleText.x + guidTitleText.width;
			// guidText.y = guidTitleText.y ;
			// this.addChildToContainer(guidText);
			// guidText.addTouchTap(this.idTouchHandler,this,null);
		}
		

		let idTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		idTitleText.x = descText.x;
		idTitleText.y = nameTitleText.y + idTitleText.height + 15;
		this.addChildToContainer(idTitleText);

		let idText = ComponentManager.getTextField(Api.playerVoApi.getPlayerID().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		idText.x = idTitleText.x + idTitleText.width;
		idText.y = idTitleText.y ;
		this.addChildToContainer(idText);

		let zoneTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingZone"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		zoneTitleText.x = descText.x;
		zoneTitleText.y = idText.y + zoneTitleText.height + 15;
		this.addChildToContainer(zoneTitleText);

		let zoneText = ComponentManager.getTextField(GameData.curZoneID.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		zoneText.x = zoneTitleText.x + zoneTitleText.width;
		zoneText.y = zoneTitleText.y ;
		this.addChildToContainer(zoneText);


		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("settingSound"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundText.x = descText.x;
		this._soundText.y = zoneText.y + this._soundText.height + 30;
		this.addChildToContainer(this._soundText); 

		this._soundBB = BaseBitmap.create("btn_swicth");
		this._soundBB.x = this._soundText.x + this._soundText.width + 10;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundState.x = this._soundBB.x + 15;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == ""){
			this._type = "ON";
		}
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = 0xb1b1b1;
		}else{
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
		
		let btnIndex:number=0;
		let btnX:number=bg.x+5;
		let btnY:number=bg.y + bg.height + 15;
		let setBtnPos=function(btn:BaseButton)
		{
			btn.x = btnX+(btnIndex%3)*(btn.width + 30);
			btn.y = btnY+Math.floor(btnIndex/3)*70;
			btnIndex++;
		};
		let btnList:BaseButton[] = []
		// if(PlatformManager.checkIsLocal())
		// {
			let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingChangeAchount",this.changeHandler,this);
			setBtnPos(changeBtn);
			changeBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(changeBtn);
			btnList.push(changeBtn);
			// btnX=changeBtn.x + changeBtn.width + 30;
		// }

 
		if(Api.switchVoApi.checkOpenShenhe()==false&& Api.switchVoApi.checkTWShenhe()==false)
		{	
			let cdkBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingCDK",this.cdkHander,this);
			setBtnPos(cdkBtn);
			cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(cdkBtn);
			btnList.push(cdkBtn);
		}
	
	
		let contact:string[]=PlatformManager.getContact();
		this._serviceType = PlatformManager.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+this._serviceType);
		if( this._serviceType>0 || ((contact&&contact.length>0) || PlatformManager.checkIsTWBSp()||PlatformManager.checkIsThSp() || PlatformManager.checkIs3KSubSp())&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingContact",this.contackHander,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
			btnList.push(contactBtn);
		}

		if((PlatformManager.checkIsTWBSp()==true ||PlatformManager.checkIsThSp()==true) && PlatformManager.checkIsWeiduan()==true)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingUserCenter",this.openUserCenter,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
			btnList.push(contactBtn);
		}

		// let chatblockBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatblockViewTitle",this.blockHander,this);
		// setBtnPos(chatblockBtn);
		// chatblockBtn.setColor(TextFieldConst.COLOR_BLACK);
		// this.addChildToContainer(chatblockBtn);
		if(PlatformManager.checkIsTWBSp() && Api.switchVoApi.checkTWShenhe()==false)
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("FB粉絲頁",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);
		}

		if(PlatformManager.checkIsKRSp())
		{
			let urlBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpKR1,this);
			urlBtn1.setText("고객센터",false);
			setBtnPos(urlBtn1);
			urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn1);
			btnList.push(urlBtn1);
			if(App.DeviceUtil.isIOS()&& Api.switchVoApi.checkOpenShenhe())
			{

			}
			else{
				let urlBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpKR2,this);
				urlBtn2.setText("역천 카페",false);
				setBtnPos(urlBtn2);
				urlBtn2.setColor(TextFieldConst.COLOR_BLACK);
				this.addChildToContainer(urlBtn2);
				btnList.push(urlBtn2);
			}
			
		}

		if(PlatformManager.checkIsKRSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpKakao,this,null,);
			setBtnPos(urlBtn);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);

			let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,34,34);
			let icon:BaseLoadBitmap = BaseLoadBitmap.create("kakaoicon",rect1);
			icon.setPosition(urlBtn.width - rect1.width - 6,urlBtn.height/2 - rect1.height/2);
			urlBtn.addChild(icon);

			let urlText = ComponentManager.getTextField("카톡문의", 20, TextFieldConst.COLOR_BLACK);
			urlText.setPosition(urlBtn.width/2 - urlText.width/2 - 15,urlBtn.height/2 - urlText.height/2);
			urlBtn.addChild(urlText);
		}
		//泰国的FB粉丝 链接
		if(PlatformManager.checkIsThSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("เพจเฟสบุ๊ค",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
			btnList.push(urlBtn);
		}
		//屏蔽按钮
		// if(1)
		// {
		// 	let pbiBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.blockHander,this);
		// 	pbiBtn.setText(LanguageManager.getlocal('chatShield'),false);
		// 	setBtnPos(pbiBtn);
		// 	pbiBtn.setColor(TextFieldConst.COLOR_BLACK);
		// 	this.addChildToContainer(pbiBtn);
		// 	btnList.push(pbiBtn);
		// }
		//适配只有两个按钮的情况
		if(btnList.length == 2)
		{
			let btn1 = btnList[0];
			let btn2 = btnList[1];
			btn1.x = this.viewBg.width/2 - btn1.width - 30;
			btn2.x = this.viewBg.width/2 + 30;
		}
		if(Api.switchVoApi.checkOpenVoice()&&PlatformManager.checkIsTWSoundType()!=2)
		{
			this.showSoundType();
		}
		// 游戏策略相关
		this._strategyText = ComponentManager.getTextField(LanguageManager.getlocal("setfqStrategySwitch"),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._strategyText.setPosition(this._soundText.x,this._soundText.y + this._soundText.height + 30);
		this.addChildToContainer(this._strategyText);

		this._strategySwitch = BaseBitmap.create("btn_swicth");
		this._strategySwitch.setPosition(this._strategyText.x + this._strategyText.width + 10,this._strategyText.y + this._strategyText.height / 2 - this._strategySwitch.height / 2);
		this.addChildToContainer(this._strategySwitch);
		this._strategySwitch.addTouchTap(this.strategySwitchClick,this);
		
		this._strategyState = ComponentManager.getTextField("ON",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._strategyState.setPosition(this._strategySwitch.x + this._strategySwitch.width / 4 - this._strategyState.width / 2,this._strategySwitch.y + this._strategySwitch.height / 2 - this._strategyState.height / 2);
		this.addChildToContainer(this._strategyState);

		this._strategyType = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
		if(this._strategyType == "OFF")
		{
			this._strategySwitch.skewY = 180;
			this._strategyState.x = this._strategySwitch.x + 3 * this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategySwitch.x = this._strategySwitch.x + this._strategySwitch.width;
			this._strategyState.text = "OFF";
			this._strategyState.setColor(0xb1b1b1);	
		}

	}
	/**策略开关的监听事件 */
	private strategySwitchClick()
	{
		if(this._strategyType == "OFF")
		{
			this._strategySwitch.skewY = 0;
			this._strategySwitch.x = this._strategyText.x + this._strategyText.width + 10;
			this._strategyState.x = this._strategySwitch.x + this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategyState.text = "ON";
			this._strategyState.setColor(TextFieldConst.COLOR_WARN_GREEN);
			this._strategyType = "ON";
		}
		else
		{
			this._strategySwitch.skewY = 180;
			this._strategyState.x = this._strategySwitch.x + 3 * this._strategySwitch.width / 4 - this._strategyState.width / 2;
			this._strategySwitch.x = this._strategySwitch.x + this._strategySwitch.width;
			this._strategyState.text = "OFF";
			this._strategyState.setColor(0xb1b1b1);
			this._strategyType = "OFF";
		}
		

	}
	private jumpKakao():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("http://pf.kakao.com/_kJxkxmC");
		}
	}

	private changeCheckFlagStatus(evt:egret.TouchEvent):void
	{
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;  
		if (this._checkFlag.alpha == 1)
		{
			SoundManager.setVoiceOn(false);
			LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"false");
			this._checkFlag2.alpha =0; 
			App.CommonUtil.showTip(LanguageManager.getlocal("national"));
		} 
		 
	}
	private showSoundType():void
	{

		let type = LocalStorageManager.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);  
		//声音
		this._voiceText = ComponentManager.getTextField(LanguageManager.getlocal("voice"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._voiceText.x =270;
		this._voiceText.y = this._soundText.y;
		this.addChildToContainer(this._voiceText);
	 
		//国语
		this._nationalText = ComponentManager.getTextField(LanguageManager.getlocal("national"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._nationalText.x = this._voiceText.x+this._voiceText.width+10;
		this._nationalText.y = this._soundText.y; 
		this.addChildToContainer(this._nationalText);

		//勾选底
		let probg = BaseBitmap.create("hold_dinner_box")
		probg.x = this._nationalText.x+this._nationalText.width+10;
		probg.y = this._voiceText.y-10;
		this.addChildToContainer(probg);

		this._checkFlag = BaseBitmap.create("hold_dinner_check");
		this._checkFlag.x = probg.x+3;
		this._checkFlag.y =	probg.y;
		if(type==""||type=="false")
		{
			this._checkFlag.alpha =1;
		}
		else
		{
			this._checkFlag.alpha =0;
		}
		this.addChildToContainer(this._checkFlag);
		probg.addTouchTap(this.changeCheckFlagStatus,this);


		//粤语
		this._cantoneseText = ComponentManager.getTextField(LanguageManager.getlocal("cantonese"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cantoneseText.x = probg.x+probg.width+10;
		this._cantoneseText.y = this._soundText.y; 
		this.addChildToContainer(this._cantoneseText);

		//勾选底
		let probg2 = BaseBitmap.create("hold_dinner_box")
		probg2.x = this._cantoneseText.x+this._cantoneseText.width+10;
		probg2.y = this._voiceText.y-10;
		this.addChildToContainer(probg2);

		this._checkFlag2 = BaseBitmap.create("hold_dinner_check");
		this._checkFlag2.x = probg2.x+3;
		this._checkFlag2.y =probg2.y;
		
		if(type=="false"||type=="")
		{
			this._checkFlag2.alpha =0;
		}
		else if(type=="true")
		{
			this._checkFlag2.alpha =1;
		} 
		else
		{
			this._checkFlag2.alpha =0;
		}
		this.addChildToContainer(this._checkFlag2);
		probg2.addTouchTap(this.changeCheckFlagStatus2,this);
	}
	private changeCheckFlagStatus2(evt:egret.TouchEvent):void
	{
		this._checkFlag2.alpha = (this._checkFlag2.alpha+1)%2;  
		if (this._checkFlag2.alpha == 1)
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH,"true");
			SoundManager.setVoiceOn(true);
			this._checkFlag.alpha =0;
			App.CommonUtil.showTip(LanguageManager.getlocal("cantonese"));
		} 
	} 

	private jumpFacebook():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(PlatformManager.checkIsThSp())
			{
				window.open("https://www.facebook.com/com.heyyogame.gdth/?modal=admin_todo_tour");
			}
			else if(PlatformManager.checkIsTWBSp())
			{
				window.open("https://www.facebook.com/com.heyyogame.gd/");
			}
			
		}
	}

	private jumpKR1():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://yccs.mayngames.co.kr/support");
		}
	}
	private jumpKR2():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://cafe.naver.com/yeokcheon");
		}
	}

	protected idTouchHandler() {
		PlatformManager.client.getGUID();
	}

	protected openUserCenter() {
		PlatformManager.openUserCenter();
	}

    private changeHandler(param:any):void
	{
		LoginManager.changeServer();
	}
	private contackHander():void
	{
		// if(PlatformManager.checkIs3KSubSp())
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else if (PlatformManager.checkIsTWBSp()) 
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {});
		// }

		if (this._serviceType == 0)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:0});
		}
		else if (this._serviceType == 1)
		{
			PlatformManager.client.openServiceCenter();
		}
		else {
			RSDKHelper.getCustomerService((data:any)=>{
				console.log("QAZ fkcw getCustomerService 结果"+data);
				if (data) {
					ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
				} 
			});
		}

	}
	private blockHander():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATBLOCKVIEW, {});
	}
	private cdkHander():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingCDKPopupView, {});
	}
	private sonndHander(param:any):void
	{
		
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == "" || this._type == "ON" ){
			this._type = "OFF";
		}
		else{
			this._type = "ON";
		}
		LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = 0xb1b1b1;
			SoundManager.pauseBg()
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 15;
			SoundManager.resumeBg();
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
	}
	

	
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }


	public dispose():void
	{
		//有变化才存
		if(this._strategyType != "" &&this._strategyType != LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH))
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH,this._strategyType);
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FQSTRATEG_SWITCH);
		}
		this._strategyState = null;
		this._strategyText = null;
		this._strategySwitch = null;
		this._strategyType = "";


		this._type = null;

		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		// this.removeTouchTap();
		this._serviceType = 0;
		this._voiceText=null;

		super.dispose();
	}
}
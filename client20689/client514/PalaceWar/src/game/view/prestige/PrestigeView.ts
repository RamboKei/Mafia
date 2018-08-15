
/**
 * author shaoliang
 * date 2018/04/08
 * @class PrestigeView
 */

class PrestigeView extends CommonView
{	
	private _scrollContiner:BaseDisplayObjectContainer=null;
	private _pillar:BaseBitmap = null;

	

	public constructor() {
		super();
	}


	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_PRESTIGE_INDEX,requestData:{}};
	}
	
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if( data.ret && data.data.data.rewards)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));

			if(data.data.data.rewards=="11_4003_1")
            {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            }
		}
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifeskin_barbg",
			"prestige_pillar_base",
			"prestige_pillar1",
			"prestige_pillar2",
			"prestige_bg",
			"prestige_black_bg",
			"prestige_chair",
			"prestige_circle_bg",
			"prestige_circle",
			"prestige_cur",
			"prestige_flag1",
			"prestige_flag2",
			"prestige_light",
			"prestige_fnt",
			"prestige_prerogative1","prestige_prerogative2","prestige_prerogative3",
		]);
	}

	

	public initView():void
	{	
		this.container.y = this.getTitleButtomY();
		this._scrollContiner = new BaseDisplayObjectContainer();

		let bHeight = PlayerBottomUI.getInstance().showHeight;
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,(GameConfig.stageHeigth-this.getTitleButtomY() - 45-bHeight));
		
		let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this.addChildToContainer(scrollView);
		let darkBg:BaseBitmap = BaseBitmap.create("prestige_bg");
		this._scrollContiner.addChild(darkBg);
		scrollView.bounces = false;

		let pillar1:BaseBitmap = BaseBitmap.create("prestige_pillar1");
		pillar1.x = 0;
		pillar1.y = 42;
		this._scrollContiner.addChild(pillar1);

		let pillarBase:BaseBitmap = BaseBitmap.create("prestige_pillar_base");
		pillarBase.height = pillar1.height + pillarBase.height - 10;
		this._scrollContiner.addChild(pillarBase);
		
		let zhuziHeight:number = pillar1.height;
		let item1 = Config.PrestigeCfg.getPrestigeCfgById(3);
		let curPrestige:number = Api.prestigeVoApi.getInfo()["v"];

		if (curPrestige>item1.prestige)
		{
			curPrestige=item1.prestige;
		}
		this._pillar = BaseBitmap.create("prestige_pillar2");
		this._pillar.setPosition(pillar1.x,pillar1.y);
		this._scrollContiner.addChild(this._pillar);
		let mask = egret.Rectangle.create();
		let curProportion:number = curPrestige/item1.prestige;
		mask.setTo(0,(1-curProportion)*zhuziHeight,this._pillar.width,zhuziHeight*curProportion);
		this._pillar.mask = mask;

		//当前人望
		let pillarLight:BaseBitmap = BaseBitmap.create("prestige_light");
		pillarLight.setPosition(0,pillar1.y+mask.y - pillarLight.height/2);
		this._scrollContiner.addChild(pillarLight);

		let pillarText:BaseBitmapText = ComponentManager.getBitmapText(String(Api.prestigeVoApi.getInfo()["v"]),"prestige_fnt");
		pillarText.setPosition(pillarLight.x+pillarLight.width/2-pillarText.width/2,pillarLight.y - pillarText.height+20);
		this._scrollContiner.addChild(pillarText);

		let pillarCur:BaseBitmap = BaseBitmap.create("prestige_cur");
		pillarCur.x = pillarLight.x+pillarLight.width/2-pillarCur.width/2;
		if (curPrestige/item1.prestige>0.9)
		{
			pillarCur.y = pillarLight.y + pillarLight.height/2;
		}
		else 
		{
			pillarCur.y = pillarText.y - pillarCur.height;
		}
		
		this._scrollContiner.addChild(pillarCur);

		//四个旗子
		
		

		let flagY1:number = pillar1.y - 10;
		let flagY2:number = flagY1+zhuziHeight*0.3;
		let flagY3:number = flagY1+zhuziHeight*0.6;
		let flagY4:number = flagY1+zhuziHeight*0.8;

		//1
		
		let flag1:BaseBitmap = BaseBitmap.create(this.getFlagPicStr(curPrestige,item1.prestige));
		flag1.setPosition(142,flagY1);
		this._scrollContiner.addChild(flag1);

		let nameTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName4",[String(item1.prestige)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt1.setPosition(flag1.x+flag1.width/2-nameTxt1.width/2, flag1.y+18);
        this._scrollContiner.addChild(nameTxt1);
		if (curPrestige < item1.prestige)
		{
			nameTxt1.textColor = 0xa1a1a1;
		}
		let chairBg:BaseBitmap = BaseBitmap.create("prestige_circle_bg");
		chairBg.setPosition(flag1.x+flag1.width/2-chairBg.width/2, flag1.y+flag1.height);
		this._scrollContiner.addChild(chairBg);

		let chairIcon:BaseBitmap = BaseBitmap.create("prestige_chair");
		chairIcon.setPosition(chairBg.x+chairIcon.width/2-chairIcon.width/2, chairBg.y+chairIcon.height/2-chairIcon.height/2);
		this._scrollContiner.addChild(chairIcon);

		let zigeBg:BaseBitmap = BaseBitmap.create("prestige_black_bg");
		zigeBg.setPosition(chairBg.x+chairBg.width/2-zigeBg.width/2, chairBg.y+chairIcon.height-zigeBg.height+2);
		this._scrollContiner.addChild(zigeBg);

		let zigeText = ComponentManager.getTextField(LanguageManager.getlocal("restige_qualification"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		zigeText.setPosition(zigeBg.x+zigeBg.width/2-zigeText.width/2, zigeBg.y+zigeBg.height/2-zigeText.height/2);
        this._scrollContiner.addChild(zigeText);

		let tequanBg:BaseBitmap = BaseBitmap.create("prestige_black_bg");
		tequanBg.setPosition(flag1.x, 220);
		tequanBg.width = flag1.width;
		tequanBg.height = 84;
		this._scrollContiner.addChild(tequanBg);

		let tequanText = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelDesc4"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		tequanText.textAlign = egret.HorizontalAlign.CENTER;
		tequanText.lineSpacing =5;
		tequanText.setPosition(tequanBg.x+100-tequanText.width/2, tequanBg.y+tequanBg.height/2-tequanText.height/2);
        this._scrollContiner.addChild(tequanText);

			//三个特权
		for (let i:number = 1; i<=3; i++)
		{
			let tequanIconBg:BaseBitmap = BaseBitmap.create("prestige_circle");
			tequanIconBg.setPosition(tequanBg.x+55 + 105*i, tequanBg.y);
			this._scrollContiner.addChild(tequanIconBg);

			let prerogativeBtn = ComponentManager.getButton("prestige_prerogative"+i,null,this.prerogativeHandle ,this,[i],3);        
			prerogativeBtn.setPosition(tequanIconBg.x+tequanIconBg.width/2 -prerogativeBtn.width/2, tequanIconBg.y+tequanIconBg.height/2-prerogativeBtn.height/2);
			this._scrollContiner.addChild(prerogativeBtn);
		}

		//2
		let item2 = Config.PrestigeCfg.getPrestigeCfgById(2);
		let flag2:BaseBitmap = BaseBitmap.create(this.getFlagPicStr(curPrestige,item2.prestige));
		flag2.setPosition(flag1.x,flagY2);
		this._scrollContiner.addChild(flag2);

		let nameTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName3",[String(item2.prestige)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt2.setPosition(flag2.x+flag2.width/2-nameTxt2.width/2, flag2.y+18);
        this._scrollContiner.addChild(nameTxt2);
		if (curPrestige < item2.prestige)
		{
			nameTxt2.textColor = 0xa1a1a1;
		}
		this.setAwardsBgStr(item2.getReward,flag2.y,curPrestige,item2.prestige);

		//3
		let item3 = Config.PrestigeCfg.getPrestigeCfgById(1);
		let flag3:BaseBitmap = BaseBitmap.create(this.getFlagPicStr(curPrestige,item3.prestige));
		flag3.setPosition(flag1.x,flagY3);
		this._scrollContiner.addChild(flag3);

		let nameTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName2",[String(item3.prestige)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt3.setPosition(flag3.x+flag3.width/2-nameTxt3.width/2, flag3.y+18);
        this._scrollContiner.addChild(nameTxt3);
		if (curPrestige < item3.prestige)
		{
			nameTxt3.textColor = 0xa1a1a1;
		}
		this.setAwardsBgStr(item3.getReward,flag3.y,curPrestige,item3.prestige);

		//4
		let item4 = Config.PrestigeCfg.getPrestigeCfgById(0);
		let flag4:BaseBitmap = BaseBitmap.create(this.getFlagPicStr(curPrestige,item4.prestige));
		flag4.setPosition(flag1.x,flagY4);
		this._scrollContiner.addChild(flag4);

		let nameTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("prestigeLevelName1",[String(item4.prestige)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt4.setPosition(flag4.x+flag4.width/2-nameTxt4.width/2, flag4.y+18);
        this._scrollContiner.addChild(nameTxt4);
		if (curPrestige < item4.prestige)
		{
			nameTxt4.textColor = 0xa1a1a1;
		}
		this.setAwardsBgStr(item4.getReward,flag4.y,curPrestige,item4.prestige);

		//底部
		let bottomBg:BaseBitmap = BaseBitmap.create("wifeskin_barbg");
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - bHeight;
		this.addChildToContainer(bottomBg);

		// 称帝详情
		let prestigeInfoBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"prestigeInfo",this.prestigeInfoHandle ,this);        
		prestigeInfoBtn.setPosition(GameConfig.stageWidth/2 -prestigeInfoBtn.width/2 - 180, bottomBg.y+bottomBg.height/2-prestigeInfoBtn.height/2);
		this.addChildToContainer(prestigeInfoBtn);

		// 名望日志
		let prestigeLogBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"prestigeLog",this.prestigeLogHandle ,this);        
		prestigeLogBtn.setPosition(GameConfig.stageWidth/2 -prestigeLogBtn.width/2 + 180, prestigeInfoBtn.y);
		this.addChildToContainer(prestigeLogBtn);
	}

	private prerogativeHandle(i:number):void
	{
		
		ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW,{itemId:i});
	}

	private getFlagPicStr(v1:number,v2:number):string
	{
		if (v1>=v2)
		{
			return "prestige_flag2";
		}
		else
		{
			return "prestige_flag1";
		}
	}

	private setAwardsBgStr(str:string,posY:number,v1:number,v2:number):void
	{
		
		let icons:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(str,true);
		let itemsVo:RewardItemVo[]= GameData.formatRewardItem(str);
		let l:number=icons.length;
		let rewardContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		for(let i:number=0;i<l;i++)
		{
			icons[i].setPosition((icons[i].width+10)*i,0);
			rewardContainer.addChild(icons[i]);
			let nameTxt = ComponentManager.getTextField(itemsVo[i].name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			nameTxt.setPosition(icons[i].x+icons[i].width/2-nameTxt.width/2, icons[i].y+icons[i].height+4);
			rewardContainer.addChild(nameTxt);
		}
		rewardContainer.setPosition(327,posY+50);
		this._scrollContiner.addChild(rewardContainer);

		if (v1>=v2)
		{
			for(let i:number=0;i<l;i++)
			{
				let maskBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
				maskBg.height = icons[i].height;
				maskBg.width = icons[i].width;
				icons[i].addChild(maskBg);
		
				let gotTxt = ComponentManager.getTextField(LanguageManager.getlocal("candyGetAlready"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
				gotTxt.setPosition(icons[i].x+icons[i].width/2-gotTxt.width/2, icons[i].y+icons[i].height/2-gotTxt.height/2);
				rewardContainer.addChild(gotTxt);
			}
		}
	}

	private prestigeInfoHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEINFOPOPUPVIEW,{});
	}

	private prestigeLogHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGELOFPOPUPVIEW,{});
	}

	public closeHandler():void
	{
		if (Api.practiceVoApi.isPracticeOPen() ){
			PlayerBottomUI.getInstance().hide(true);
		}
		// else{
		// 	PlayerBottomUI.getInstance().btnHandler(1);
		// }

		super.hide();
	}
	public dispose():void
	{	
		this._scrollContiner = null;
		this._pillar = null;
		super.dispose();
	}
}
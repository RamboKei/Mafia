class AtkracecrossArrestView extends CommonView
{	
	private _callbackF:Function = null;
	private _obj:any = null;
	private _infoText1:BaseTextField;
	private _infoText2:BaseTextField;
	private _infoText3:BaseTextField;
	private _servantCount:BaseTextField;
	private _scoreText:BaseTextField;
	private _servantInfoArray:BaseDisplayObjectContainer[] = [];
	private _progressBar:ProgressBar;
	private _isShowBuy:boolean = false;
	private _key:string;
	private _playerScore:BaseTextField;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkrace_arrest_bg","atkrace_enemy_bg","atkrace_my_bg","atkrace_name_bg",
			"atkrace_one_key","atkrace_temp_property","atkrace_text_bg","atkrace_vs","progress7_bg","progress8",
			"signin_had_get"
		]);
	}

	protected getTitleStr():string
	{
		return "atkraceArrestViewTitle";
	}

	public initView():void
	{	

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		this.container.y = this.getTitleButtomY();
		let containerHeight:number = GameConfig.stageHeigth - this.container.y;
		//中间的对战
		let middleBg:BaseBitmap = BaseBitmap.create("atkrace_arrest_bg");
		middleBg.y = containerHeight/2 - middleBg.height/2;
		this.addChildToContainer(middleBg);

		let middleVs:BaseBitmap = BaseBitmap.create("atkrace_vs");
		middleVs.setPosition( GameConfig.stageWidth/2 - middleVs.height/2 +41, containerHeight/2 - middleVs.height/2);
		this.addChildToContainer(middleVs);

		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();

		//顶部敌人信息
		let topBg = BaseBitmap.create("atkrace_enemy_bg");
		this.addChildToContainer(topBg);


		this._scoreText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._scoreText.setPosition(22, 22);
		this.addChildToContainer(this._scoreText);

		let curcount:number = Object.keys(myAtkInfo.sids).length;
		let total:number = myAtkInfo.total;
		this._servantCount = ComponentManager.getTextField(LanguageManager.getlocal("servant_count")+"("+curcount+"/"+total+")",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._servantCount.setPosition(GameConfig.stageWidth - this._servantCount.width - 22 , this._scoreText.y);
		this.addChildToContainer(this._servantCount);

			//门客形象
		this.resetServantInfo();


	
		let tempProperty:BaseButton = ComponentManager.getButton("atkrace_text_bg",null,this.tempPropertyClick,this);
		tempProperty.setPosition(19,295);
		this.addChildToContainer(tempProperty);

		let tempPropertyText = BaseBitmap.create("atkrace_temp_property");
		tempPropertyText.setPosition(tempProperty.width/2 - tempPropertyText.width/2, tempProperty.height/2 - tempPropertyText.height/2)
		tempProperty.addChild(tempPropertyText);

		// let oneKey:BaseButton = ComponentManager.getButton("atkrace_text_bg",null,this.oneKeyClick,this);
		// oneKey.setPosition(GameConfig.stageWidth - tempProperty.x - oneKey.width,tempProperty.y);
		// this.addChildToContainer(oneKey);

		// let oneKeyText = BaseBitmap.create("atkrace_one_key");
		// oneKeyText.setPosition(oneKey.width/2 - oneKeyText.width/2, oneKey.height/2 - oneKeyText.height/2)
		// oneKey.addChild(oneKeyText);

		
		//底部我方信息
		let bottomBg = BaseBitmap.create("atkrace_my_bg");
		bottomBg.y = containerHeight - bottomBg.height;
		this.addChildToContainer(bottomBg);


		let nameBg = BaseBitmap.create("atkrace_name_bg");
		nameBg.width = 270;
		nameBg.height = 35;
		nameBg.setPosition(320, bottomBg.y + 23);
		this.addChildToContainer(nameBg);
		
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;
		
		this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score",[Api.playerVoApi.getPlayerName(),Api.atkracecrossVoApi.getPoint().toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._playerScore.setPosition(345, nameBg.y+ nameBg.height/2 - this._playerScore.height/2);
		this.addChildToContainer(this._playerScore);

		let servantName:string = LanguageManager.getlocal("servant_name"+myInfo.sid);
		let servantLv:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_level",[servantName,myInfo.lv.toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		servantLv.setPosition(this._playerScore.x, this._playerScore.y+ 50);
		this.addChildToContainer(servantLv);

		let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		infoDesc1.setPosition(this._playerScore.x, servantLv.y+ 40);
		this.addChildToContainer(infoDesc1);

		let infoDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		infoDesc2.setPosition(this._playerScore.x, infoDesc1.y+ 35);
		this.addChildToContainer(infoDesc2);

		let infoDesc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		infoDesc3.setPosition(this._playerScore.x, infoDesc2.y+ 35);
		this.addChildToContainer(infoDesc3);

		this._infoText1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
		this.addChildToContainer(this._infoText1);

		this._infoText2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,this._infoText1.textColor);
		this._infoText2.setPosition(infoDesc2.x + infoDesc2.width , infoDesc2.y);
		this.addChildToContainer(this._infoText2);

		this._infoText3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,this._infoText1.textColor);
		this._infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
		this.addChildToContainer(this._infoText3);

		let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(myInfo.sid));
		servantFullImg.width = 405*0.8;
		servantFullImg.height = 467*0.8;
		servantFullImg.y = containerHeight - servantFullImg.height - 25;
		this.addChildToContainer(servantFullImg);


		this._progressBar=ComponentManager.getProgressBar("progress8","progress7_bg",GameConfig.stageWidth);
		this._progressBar.y = containerHeight - this._progressBar.height;
		this.addChildToContainer(this._progressBar);

		

		this.resetInfoText();
	}

	private resetServantInfo():void
	{

		if (this._servantInfoArray.length>0) {
			for (let k in this._servantInfoArray)
			{
				this._servantInfoArray[k].dispose();
			}
			this._servantInfoArray.length = 0;
		}

		let index:number = 0;
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		for (let key in myAtkInfo.fids)
		{
			let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(container);
			this._servantInfoArray.push(container);


			let sinfo:AtkraceServantVo = myAtkInfo.fids[key];
			let tmpCfg = Config.ServantCfg.getServantItemById(key);
			let cardbg = BaseLoadBitmap.create( "servant_cardbg_" + sinfo.clv );
			cardbg.width = 194; 
			cardbg.height = 192; 
			cardbg.setPosition(15 + (cardbg.width+14)*index,62);
			container.addChild(cardbg);
			index++;
			cardbg.addTouchTap(this.vsClick,this,[key]);
		
			let servantImg = BaseLoadBitmap.create(tmpCfg.halfIcon );
			servantImg.width = 180;
			servantImg.height = 177;
			servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2;
			servantImg.y = cardbg.y+ cardbg.height/2-servantImg.height/2-2;
			container.addChild(servantImg);


		}
	}

	private resetInfoText():void
	{	
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;
		this._infoText1.text = myInfo.ability.toString();


		let tmpatt:any = myAtkInfo.tmpattr;
		let atkAdd:number =  0;
		let skillAdd:number = 0;
		if (tmpatt) {
			if (tmpatt.atk) {
				atkAdd=Math.floor(tmpatt.atk*100);
			}
			if (tmpatt.skill) {
				skillAdd=Math.floor(tmpatt.skill*100);
			}
		}
	
		this._infoText2.text = atkAdd.toString() + "%";
		this._infoText3.text = skillAdd.toString() + "%";
		
		
		let total:number = myAtkInfo.total;
		let curcount:number = total - myAtkInfo.fightnum;
		this._servantCount.text = LanguageManager.getlocal("servant_count")+"("+curcount+"/"+total+")";
		let nameStr:string = myAtkInfo.fname;
		if (myAtkInfo.uid == "robot") {
			nameStr =  LanguageManager.getlocal("atkRaceRobotName"+myAtkInfo.fname);
		}
		this._scoreText.text =LanguageManager.getlocal("atkrace_score",[nameStr,myAtkInfo.fpoint.toString()]);

		this._progressBar.setText( myInfo.attr + "/"+ myInfo.fullattr);
		this._progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
		this._playerScore.text = LanguageManager.getlocal("atkrace_score",[Api.playerVoApi.getPlayerName(),Api.atkracecrossVoApi.getPoint().toString()]);
	}



	//临时属性
	private tempPropertyClick():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSBUYPOPUPVIEW,{f:this.resetInfoText,o:this});
	}

	//一键缉捕
	private oneKeyClick():void
	{
		//test code
		// ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW,{f:this.resetInfoText,o:this});
		// ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{f:this.oneKeyClick,o:this,type:2});
		// ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:4,f:this.oneKeyClick,o:this});
		 ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW,{});

	}

	//开始对战
	private vsClick(event:egret.Event,key:string):void
	{	
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		this._key = key;
		if (myAtkInfo.fightnum == 0 && this._isShowBuy==false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk ==0 && myAtkInfo.tmpattr.blood ==0))) {
			this._isShowBuy=true;
			let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace", 1);
			let itemId:string = itemCfg.getFightAdd();

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"itemUseConstPopupViewTitle",
			msg:LanguageManager.getlocal("atkrace_no_property"),
			callback:this.realFight,
			handler:this,
			needCancel:true
			});
		}
		else {
			this.realFight()
		}

		
	}

	private realFight():void
	{
		ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACECROSSBATTLEVIEW,{f:this.resetBattleInfo,o:this,servantid: this._key ,f2:this.battleEnd});
	}

	//战斗胜利回调 刷新 打开购买属性
	private resetBattleInfo():void
	{
		
		this.resetInfoText();
		this.resetServantInfo();

		this.tempPropertyClick();
	}
	//战斗结束回掉 关掉板子
	private battleEnd():void
	{
		this.hide();
	}

	public hide():void
	{	
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void 
	{

	}

	public dispose():void
	{	
		
		this._infoText1 = null;
		this._infoText2 = null;
		this._infoText3 = null;
		this._servantCount = null;
		this._servantInfoArray.length = 0;
		this._scoreText =null;
		this._progressBar =null;
		this._isShowBuy = false;
		this._key = null;
		this._playerScore = null;
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}

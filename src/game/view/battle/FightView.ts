/**
 * 关卡战斗view
 * author shaoliang
 * date 2018/1/3
 * @class FightView
 */

class FightView extends BattleView
{

	/**
	 * 当前第几关的小点点
	 */
	private _dotBar:BattleDotBar = undefined;
	private _rattle:BattleRattle = undefined;
	private _countDown:BaseDisplayObjectContainer = undefined;
	// private _countDownLb:BaseTextField = undefined;
	protected _challengeConfig:any = undefined;

	private _timeDesc:BaseTextField;
	
	/**
	 * 倒计时 0时候出发事件，默认-1
	 */
	private _countDownTime:number = -1;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"hero_anim_1",
				"npc_anim_1",
				"battlebg",
				ButtonConst.BATTLE_START_BTN_1,
				"exp_progress_bg",
				"battle_dot_none",
				"battle_dot_full",
				"battle_hero_bar",
				"battle_info_bg",
				"battle_npc_bar",
				"battle_luanz",
				"promotion_officerbg1",
				"atkrace_skip"
		]);
	}

	/**
	 * 胜利之后刷新 战斗view
	 */
	protected resetGameAfterWin():void
	{	
		this.resetConfig();
		this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();

		for (var k1 in this._leftSoldiers) {
            var v1 = this._leftSoldiers[k1];
            v1.dispose();
        }
        for (var k2 in this._rightSoldiers) {
            var v2 = this._rightSoldiers[k2];
            v2.dispose();
        }
		this._curLost.length = 0;
		this._curLost = [0,0];

		this._leftSoldiers.length = 0;
		this._rightSoldiers.length = 0;
		this._meetPointTab.length = 0;

		this.calculateSoldierNumber();
		this.initRightSoldiers();
		this.initLeftSoldiers();
		this.calculateMeetPoint();

		this.removeChild(this._battleInfoTab[0]);
		this.addChild(this._battleInfoTab[0]);

		this._gameBtn.touchEnabled = true;
		this._gameBtn.visible = true;
		for (var k8 in this._battleInfoTab) {
            var v8 = this._battleInfoTab[k8];
            v8.resetInfo(this._totalOldNum[k8]);
			this._battleInfoTab[k8].curNumber = this._totalNum[k8];
        }
		this._rattle = new BattleRattle();
		this._rattle.init(this);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();


		if (Api.playerVoApi.getSoldier() > 0 && Api.rookieVoApi.isInGuiding!=true ) {
			this.resetCountDown();
		}
	}

	protected init():void
	{	
		super.init();

		//初始化 双方信息
		for (let i:number = 0; i<=1; i++) 
		{
			this._battleInfoTab[i] = new BattleInfo();
			this._battleInfoTab[i].init(this._totalOldNum[i],i==0);
			if (i == 0) {
				this._battleInfoTab[i].x = 15;
				this._battleInfoTab[i].y = GameConfig.stageHeigth - 35 - this._battleInfoTab[i].height;
			}
			else {
				this._battleInfoTab[i].x = GameConfig.stageWidth - 13 -this._battleInfoTab[i].width;
				this._battleInfoTab[i].y = 195;
			}
			
			this.addChild(this._battleInfoTab[i]);
			this._battleInfoTab[i].curNumber = this._totalNum[i];
		}

		this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
		this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);


		this._dotBar = new BattleDotBar();
		this._dotBar.init(8);
		this.addChildToContainer(this._dotBar);
		this.container.y = this.getTitleButtomY()-3;
		this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();

		this._rattle = new BattleRattle();
		this._rattle.init(this);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();

		if (Api.playerVoApi.getSoldier() > 0  && Api.rookieVoApi.isInGuiding!=true ) {
			this.resetCountDown();
		}
		Api.rookieVoApi.checkNextStep();

		this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,GameConfig.stageHeigth - 115);
		this.addChild(this._skipBtn);	
		this._skipBtn.visible = false;
	}

	

	private resetCountDown():void
	{
		this._countDownTime = 1;
		if (!this._countDown) {
			this._countDown = new BaseDisplayObjectContainer();
			let countDownBg:BaseBitmap = BaseBitmap.create("promotion_officerbg1");
			this._countDown.addChild(countDownBg);
			this._countDown.setPosition(GameConfig.stageWidth/2-countDownBg.width/2 + 20, this._gameBtn.y + 98);

			this._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDown",[this._countDownTime.toPrecision()]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._timeDesc.setPosition(countDownBg.width/2 -this._timeDesc.width/2, countDownBg.height/2 - this._timeDesc.height/2);
			this._countDown.addChild(this._timeDesc);

			// this._countDownLb = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_BIG);
			// this._countDownLb.setPosition(countDownBg.width/2 -timeDesc.width/2 - 30 , countDownBg.height/2 - this._countDownLb.height/2);
			// this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
			// this._countDown.addChild(this._countDownLb);
			
		}
		// this._countDownLb.text = "1";


		this.addChild(this._countDown);
	}

	protected resetConfig():void
	{
		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		this._totalOldNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier];
		this._totalNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier - Api.challengeVoApi.getCurKilledNum()];
	}

	protected btnClick():void
	{	
		if (Api.playerVoApi.getSoldier() <= 0) {

			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:3,f:this.hide,o:this});
			App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));

			return;
		}
		this.closeBtn.setEnable(false);

		this._countDownTime = -1;

		if (this._countDown) {
			this.removeChild(this._countDown);
			this._countDown=null;
		}
		Api.rookieVoApi.checkNextStep();
		
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK,null);

		// this._isAttackWin = true;
		// this._lostNum = [ 10000, this._totalOldNum[1]];
		// this.calculateLostSoldierNumber();
		// this.calculateLostTab();
		// this.gameBegin();
		// this._gameBtn.touchEnabled = false;
		// this._gameBtn.visible = false;

		// //制作死亡频率，防止动画过快
		// let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
		// this._deathRate = Math.ceil(3000/(totolCount+1));
		// if (this._deathRate > 1000) {
		// 	this._deathRate = 1000;
		// }
		// this._lastDeathTime = egret.getTimer() + this._deathRate *3;

		//👇 test code
		// ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:"5_1_5",f:this.resetGameAfterWin,o:this,type:1});
		// ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:2});
	}

	private intoBattle(p:any):void
	{
		if (p.data.ret == true) {

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);


			this._isAttackWin = p.data.data.data.battleReport.success;
			this._rewards = p.data.data.data.rewards;

			let myLostSoldier:number = this._totalNum[0] - Api.playerVoApi.getSoldier();

			let npcOldLost:number = this._totalNum[1];

			if (this._isAttackWin) {
				this._lostNum = [ myLostSoldier, npcOldLost];
			}
			else {
				this._lostNum = [ myLostSoldier, Api.challengeVoApi.getCurKilledNum() - (this._challengeConfig.soldier - npcOldLost)];
			}

			this.calculateLostSoldierNumber();
			this.calculateLostTab();
			this.gameBegin();
			this._gameBtn.touchEnabled = false;
			this._gameBtn.visible = false;

			if (Api.switchVoApi.checkJumpBattle() && Api.rookieVoApi.isInGuiding == false) {

				this._skipBtn.visible = true;

				let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
				let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
				if (isBuyMonthCard || isBuyYearCard) 
				{
					// this._skipBtn.setEnable(true);
				}
				else 
				{
					App.DisplayUtil.changeToGray(this._skipBtn);
				}

			}

			//制作死亡频率，防止动画过快
			let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
			this._deathRate = Math.ceil(3000/(totolCount+1));
			if (this._deathRate > 600) {
				this._deathRate = 600;
			}
			this._lastDeathTime = egret.getTimer() + this._deathRate *2;
		}
	}

	protected skipBattle():void
	{	
		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if (isBuyMonthCard || isBuyYearCard) 
		{
			this.gameEnd(true);
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("challengeSkipInfo"));
		}
	}

	protected endCallBack():void
	{	
		if(Api.rookieVoApi.isInGuiding)
		{
			this.hide(true);
			return;
		}
		if (this._isAttackWin) {
			let smallChannel:number = Api.challengeVoApi.getCurSmallChannelId();
			if (smallChannel == 0 ) {
				this.hide();
			}
			// 关卡版本2
			// else if (smallChannel == 7) {
			// 	let f:Function = this._callbackF;
			// 	let o:any = this._obj;
			// 	ViewController.getInstance().openView(ViewConst.BASE.BOSSVIEW,{f:f,o:o});
			// 	this.hide();
			// }
			else {
				this.resetGameAfterWin();
			}
			
		}
		else {
			this.hide();
		}
	}

	protected showResultView():void
	{
		if (this._isAttackWin) {
			ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:this._rewards,f:this.endCallBack,o:this,type:1});
		}
		else {
			 ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:1,f:this.endCallBack,o:this});
		}
	}

	private tick():void
	{
		if (this._countDownTime >0) {
			this._countDownTime--;
			// this._countDownLb.text = this._countDownTime.toPrecision();
			this._timeDesc.setString(LanguageManager.getlocal("countDown",[this._countDownTime.toPrecision()]));
		}
		else if ( this._countDownTime == 0 ) {
			this.btnClick();
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);

		this._dotBar = null;
		this._rattle.dispose();
		this._rattle = undefined;

		if (this._countDown) {
			this._countDown.dispose();
		}
		this._countDown = undefined;
		// this._countDownLb = undefined;
		this._timeDesc = null;
		this._countDownTime = -1;
		this._challengeConfig = undefined;
		

		super.dispose();
	}

}
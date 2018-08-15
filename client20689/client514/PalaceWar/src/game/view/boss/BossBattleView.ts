class BossBattleView extends BaseBattleView
 {

	private _callbackF:Function = null;
	private _obj:any = null;
	
	private _rewards:string = null;
	private _curKey:string = null;

	private _challengeConfig:any = null;

	// 开始按钮
	private _gameBtn:BaseButton;
	private _isAttackWin:boolean;

	
	//门客战斗力
	private _allServantInfo:Object = null;	
	private _dps:number = 0;

	//总血量
	private _bossValue:number = 0;
	private _heroValue:number = 0;

	private _isBattling:boolean = false;
	private _cid:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let tempArray:string[] = super.getResourceList()

		return tempArray.concat([
				"bossbg",
				ButtonConst.BATTLE_START_BTN_1,
				"progress7_bg","progress8",
		]);
	}

	protected getBgName():string
	{
		return "bossbg";
	}

	// 标题背景名称
	protected getTitleStr():string
	{				
		return "bossViewTitle1";
	}

	//重置默认选中的门客 和 当前属性
	private resetTopKey():void
	{
		
		//初始化门客信息 key: 门客ID，value: 门客战斗力
		if (this._allServantInfo == null) {
			this._allServantInfo = {};
			let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
			for (let k in allKey)
			{
				let key:string = allKey[k];
				this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
			}
		}

		this._curKey = null;
		this._heroValue = 0;
		let allKeys:string[] = Object.keys(this._allServantInfo);
		allKeys.sort((a:string,b:string)=>{
				
				let valueA:number = Api.challengeVoApi.getServantInfoValue(a);
				let valueB:number = Api.challengeVoApi.getServantInfoValue(b);

				if (valueA == valueB)
				{
					return Number(this._allServantInfo[b] - this._allServantInfo[a]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		if (Api.challengeVoApi.getServantInfoValue(allKeys[0]) == 0) {
			this._curKey = allKeys[0];
			this._heroValue = this._allServantInfo[this._curKey];
		}
	}

	protected initView():void
	{	
		this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
		this.titleTF.x = this.width/2 - this.titleTF.width/2;

		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		this._cid = Api.challengeVoApi.getCurChannelId();

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBossBattle,this);
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		this._bossValue = this._challengeConfig.value;
		this.resetTopKey();
			
		this.setTopProgress(this._bossValue -Api.challengeVoApi.getCurKilledNum() , this._bossValue , GameConfig.stageWidth - 100);
		this._topProgress.y = 10;

		let upHeroPic:string = "story_npc_"+this._challengeConfig.showBoss;
		this.setUpHero(upHeroPic,[[LanguageManager.getlocal("BossName"+this._challengeConfig.showBoss),TextFieldConst.COLOR_WARN_RED2]],2);
		this._upHero.x = 17;

		let downHeroPic:string = null;
		let downInfo:any = null;

		if (this._curKey) {
			downHeroPic = "servant_full_"+this._curKey;
			let power:number = this._allServantInfo[this._curKey];
			downInfo = [[LanguageManager.getlocal("fightForce")+":"+power,TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];
		}
		else {
			downHeroPic = "servant_empty";
			downInfo = [["empty",TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];
		}
		this.setDownHero(downHeroPic,downInfo,2);
		this._downHero.x = 280;
		this._downHero.y = GameConfig.stageHeigth - this._downHero.height - 20 -10;//- this.getTitleButtomY()

		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._downHero.addTouchTap(this.clickChangeHero,this);
		// 开始游戏
		this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1,null,this.btnClick,this);
		this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 + 20);
		this._gameBtn.anchorOffsetX = this._gameBtn.width/2;
		this._gameBtn.anchorOffsetY = this._gameBtn.height/2;
		this.addChild(this._gameBtn);	
		this.btnAnim();

		if (this._curKey == null) {
			this._gameBtn.visible = false;
		}

	}

	private clickChangeHero():void
	{
		if (this._isBattling == true) {
			return;
		}

		let allKeys:string[] = Object.keys(this._allServantInfo);
		let showTab:any[] = [];
		for (let k in allKeys)
		{
			let key:string = allKeys[k];
			showTab.push([key,Api.challengeVoApi.getServantInfoValue(key),this._allServantInfo[key]]);
		}


		showTab.sort((a:any[],b:any[])=>{
				
				let valueA:number = a[1];
				let valueB:number = b[1];

				if (valueA == valueB)
				{
					return Number(b[2] - a[2]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_BATTLE,"info":showTab,callback:this.sendRequest,handler:this});
	}

	private sendRequest(params:any):void
	{	
		let clickKey:any = params.key;
		if (clickKey != this._curKey) {
			this._curKey = clickKey;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(clickKey);		

			this._downHero.resetHero("servant_full_"+servant.servantId,this._allServantInfo[clickKey]);
			this._gameBtn.visible = true;
		}
	}


	private btnClick():void
	{
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK,{"servantId":this._curKey});
	}

	private btnAnim():void
	{
		if (this._gameBtn) {
			egret.Tween.get(this._gameBtn).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600).call(this.btnAnim,this);
		}
	}


	private intoBossBattle(p:any):void
	{
		App.LogUtil.log(p.data);

		
		if (p.data.ret == true) {
			
			this._rewards= p.data.data.data.rewards;
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
			this._isAttackWin = p.data.data.data.battleReport.success;
			this._dps = p.data.data.data.battleReport.dps;
			
			this._isBattling = true;
			this._gameBtn.visible = false;

			this.gameBegin();
		}
	}

	private gameBegin():void
	{
		this.attackHandle(1,this._dps);
	}

	private showEndGame():void
	{
		ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:this._rewards,f:this.hide,o:this,type:3,cid:this._cid});
	}

	protected atkEndCallback():void
	{	
		
		if (this._isAttackWin) {
			egret.Tween.get(this._upHero).to({alpha:0},800).call(this.showEndGame,this);
		}
		else {
			this._isBattling = false;
			this.closeBtn.setEnable(true);
			this.resetTopKey();
			if (this._curKey) {
				
				let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
				
				this._downHero.resetHero("servant_full_"+servant.servantId,this._allServantInfo[this._curKey]);

				TimerManager.doTimer(100,1,this.showGameBtn,this);
			}
			else {
				this._downHero.resetHero();
			}
		}
	}

	private showGameBtn():void
	{
		if (this._gameBtn) {
			this._gameBtn.visible = (this._curKey != null);
		}
	}

	public hide():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBossBattle,this);

		this._challengeConfig = null;
		this._callbackF = null;
		this._obj = null;
		this._rewards =null;
		this._curKey = null;
		this._isBattling = false;
		this._gameBtn = null;
		this._isAttackWin = null;
		this._allServantInfo = null;
		this._dps = 0;
		this._cid = 0;

		super.dispose();
	}
}
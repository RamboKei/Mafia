/**
 *副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossScrollItem
 */
class AllianceBossScrollItem extends ScrollListItem
{
	private _bossCfgData:any = null;
	private _bossId:string;
	private _mask:BaseBitmap;
	private _logBtn:BaseButton;
	private _enterBtn:BaseButton;
	private _rankBtn:BaseButton;
	private _openBtn:BaseButton;
	private _progress:ProgressBar;
	private _cdTxt:BaseTextField;
	private _leftHp:number;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);

		this._bossId = data;
		this._bossCfgData = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);
		
		let bg:BaseBitmap =  BaseBitmap.create("allianceBossbg");
		this.addChild(bg);

		let monsterImg = BaseLoadBitmap.create("alliance_monster" + this._bossCfgData.bossPic);
		monsterImg.width = 405;
		monsterImg.height = 467;
		let scaV = 0.5
		monsterImg.setScale(scaV);
		monsterImg.x = 132 - monsterImg.width/2*scaV;
		monsterImg.y =  bg.height/2 - monsterImg.height/2*scaV;
		this.addChild(monsterImg);

		let nameTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.textColor = 0xFCD64A;
		nameTF.text =LanguageManager.getlocal("allianceBoss_monsterName"+(this._bossId));
		nameTF.x = 265;
		nameTF.y = 35;
		this.addChild(nameTF);

		let rewardTF = ComponentManager.getTextField("",18);
		rewardTF.text = LanguageManager.getlocal("allianceBoss_rewardTxt");
		rewardTF.x = nameTF.x ;
		rewardTF.y = nameTF.y + 30;
		this.addChild(rewardTF);

		let rewardTF2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rewardTF2.text = LanguageManager.getlocal("allianceBoss_rewardTxt2",[this._bossCfgData.addAsset,this._bossCfgData.addExp]);
		rewardTF2.x = rewardTF.x +rewardTF.width;
		rewardTF2.y = rewardTF.y;
		this.addChild(rewardTF2);

	
		//伤害排行
		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"allianceBoss_btn1",this.rankBtnhandler,this);
		rankBtn.x = bg.width -143 - rankBtn.width;
		rankBtn.y = 156;
		this.addChild(rankBtn);
		this._rankBtn = rankBtn;
		if(Api.switchVoApi.checkOpenShenhe()&&this._rankBtn)
		{
		   this._rankBtn.visible=false;
		}
		 

		//进入副本
		let enterBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn2",this.enterBtnhandler,this);
		enterBtn.x = bg.width -143 + 5;
		enterBtn.y = 156;//rankBtn.y;
		this.addChild(enterBtn);
		this._enterBtn = enterBtn;

		
		let logBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn3",this.logBtnhandler,this);
		logBtn.x = bg.width -143 -logBtn.width/2 ;
		logBtn.y = 156;
		this.addChild(logBtn);
		this._logBtn = logBtn;
		if(Api.switchVoApi.checkOpenShenhe())
		{
			this._logBtn.visible=false;
		}

		let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn4",this.openBtnhandler,this);
		openBtn.x = logBtn.x ;
		openBtn.y = logBtn.y;
		this.addChild(openBtn);
		this._openBtn = openBtn;
		
		this._cdTxt = ComponentManager.getTextField("",18);
		this._cdTxt.text = this.getEndStr();
		this._cdTxt.x = bg.width -148 -this._cdTxt.width/2 -10 ;
		this._cdTxt.y = this._openBtn.y + 57;
		this._cdTxt.visible = false;
		this.addChild(this._cdTxt);

		let progress = ComponentManager.getProgressBar("progress5","progress3_bg",510);
        progress.x = 5;
		progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",["100"]));
        progress.y = bg.height - 35;
		this._progress = progress;

        this.addChild(progress);

		this._mask = BaseBitmap.create("alliance_effect");
		this._mask.width = bg.width;
		this._mask.height = bg.height;
		this._mask.visible = false;
		this.addChild(this._mask);
		/**
		 * 23:30 以后
		 */
		let lastS = GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime) ;
		if(lastS  > 84600 )
		{
			openBtn.setEnable(false);
			enterBtn.setEnable(false);
		}else{
			openBtn.setEnable(true);
			enterBtn.setEnable(true);
		}
		TimerManager.doTimer(1000,0,this.tick,this);
		this.refreshUI();
	}

	protected refreshUI()
	{
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		this._cdTxt.visible = false;
		this._leftHp = 0;
		if(this._bossCfgData.needAllianceLv <= alliVo.level)
		{
			let boss = alliVo.boss;
			let leftHp = boss[this._bossCfgData.id];
			this._leftHp = leftHp;
			if(leftHp != null)
			{
				this._openBtn.visible = false;
				let perc = leftHp/this._bossCfgData.bossHp; 
				this._progress.setPercentage(perc);
				if(leftHp == 0)
				{
					this._mask.visible = false;
					if(!Api.switchVoApi.checkOpenShenhe())
					{
						this._logBtn.visible = true;
					}
			
					this._rankBtn.visible = false;
					this._enterBtn.visible = false;
					this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt2"));
				}else{
					this._mask.visible = true;
					this._logBtn.visible = false;
					if(!Api.switchVoApi.checkOpenShenhe())
					{
						this._rankBtn.visible = true;
					}
			
					this._enterBtn.visible = true;
					this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",[(perc*100).toFixed(0)+"%"]));
					this._cdTxt.visible = true;
				}
			}else
			{
				this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",["100%"]));
				this._progress.setPercentage(1.0);
				this._openBtn.visible = true;
				this._logBtn.visible = false;
				this._rankBtn.visible = false;
				this._enterBtn.visible = false;
				this._mask.visible = false;
			}
		}else
		{
			this._logBtn.visible = false;
			this._enterBtn.visible = false;
			this._rankBtn.visible = false;
			this._openBtn.visible = true;
		}
	}

	protected getEndStr()
	{
		
		let ZeroStr = App.DateUtil.getWeeTs(GameData.serverTime) + 84600 - GameData.serverTime
		if(ZeroStr >= 0 )
		{
			let timeStr = App.DateUtil.getFormatBySecond(ZeroStr,8);
			return LanguageManager.getlocal("allianceBoss_endTimeStr",[timeStr]);
		}else
		{
			return ""
		}
	}
	public tick(): boolean {
		let str = this.getEndStr();
		if(str != "" && this._leftHp > 0)
		{
			this._cdTxt.text = this.getEndStr();
			this._cdTxt.visible = true;
			return true;
		}else{
			this._cdTxt.visible = false;
			return false;
		}
	}
	protected openBtnHandlerCallBack(event:egret.Event)
	{
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
			this.refreshUI();
		}
	}
	
	protected openBtnhandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSOPENPOPUPVIEW,this._bossId);
	}
	protected rankBtnhandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW,this._bossId);
	}
	protected enterBtnhandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{bossId:String(this._itemIndex+1),servantId:"1001"});
		ViewController.getInstance().openView(ViewConst.BATTLE.ALLIANCEBOSSBATTLEVIEW,{idx:this._bossId,f:this.refreshUI,o:this});
	}
	protected logBtnhandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG,{bossId:String(this._itemIndex+1)});
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW,this._bossId);
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);
		TimerManager.remove(this.tick,this);
		this._bossCfgData = null;
		this._bossId = null;
		this._mask = null;
		this._logBtn = null;
		this._enterBtn = null;
		this._rankBtn = null;
		this._openBtn = null;
		this._progress = null;
		this._cdTxt = null;
		this._leftHp = 0;
		super.dispose();
	}
}
/**
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardScrollItem
 */
class AllianceTaskRewardScrollItem extends ScrollListItem
{
	private _progress:ProgressBar;
	private _taskId:string;
	private _requsting:boolean = false;
	private _collectBtn:BaseButton;
	private _collectFlag:BaseBitmap;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD),this.collectCallBack,this);
		this._taskId = data;

		let cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 524;
        bg.height= 130;
        bg.x = 3;
        this.addChild(bg);

		let attrbg = BaseBitmap.create("alliance_taskAttrbg"+cfgData.type);
		attrbg.x = bg.x+3;
		attrbg.y = bg.y + 5 ;
		this.addChild(attrbg);

		let taskNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskName" + this._taskId),18);
		taskNameTxt.x = attrbg.x + 10;
		taskNameTxt.y = attrbg.y + attrbg.height/2 - taskNameTxt.height/2;
		this.addChild(taskNameTxt);

		let startX = 15;
		let startY = attrbg.y + attrbg.height + 2;

		let rewardBg = BaseBitmap.create("public_9_managebg");
		rewardBg.width = 275;
		rewardBg.height = 107;
		rewardBg.x = startX;
		rewardBg.y = startY;
		this.addChild(rewardBg);

		startX +=5;
		startY += 5;
		let rewardStr = cfgData.completeReward ;
		let rewardArr = GameData.getRewardItemIcons(rewardStr ,true);
		let deltalW = 90;
		let deltaH = 90;
		for (var index = 0; index < rewardArr.length; index++) {
			var element = rewardArr[index];
			element.setScale(0.78);
			if(index%4 == 0 && index > 0){
				startX = 20;
				startY += deltaH;
			}
			element.x = startX;
			element.y = startY;
			startX += deltalW;
			this.addChild(element);
		}
		startY += deltaH;
		rewardBg.height = startY - rewardBg.y;
		
		this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",488);
		this._progress.setTextSize(18);
		this._progress.x = rewardBg.x+5;
		this._progress.y = rewardBg.y + rewardBg.height + 5;
		this._progress.setPercentage(0.5);
		this.addChild(this._progress);
		bg.height = this._progress.y + this._progress.height + 15;

		let collectBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectBtnHandler,this);
		collectBtn.x = bg.x + bg.width - 137;
		collectBtn.y = bg.y + bg.height/2 - collectBtn.height/2+15 ;
		this.addChild(collectBtn);
		this._collectBtn = collectBtn;

		let rewardTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		rewardTxt.text = LanguageManager.getlocal("allianceBuildGet2") + "+" + cfgData.completeAsset;
		rewardTxt.x = collectBtn.x + collectBtn.width/2 - rewardTxt.width/2;
		rewardTxt.y = collectBtn.y -25;
		this.addChild(rewardTxt);


		this.refreshCollectStatus();
	}
	protected refreshCollectStatus()
	{
		let cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		let taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
		let flag = 0;
		if(taskinfo){
			flag = taskinfo.flag ;
			this._progress.setPercentage(taskinfo.v/cfgData.value);
			if(taskinfo.v >= cfgData.value){
				this._progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
			}else{
				this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt",[taskinfo.v + "/"+cfgData.value]));
			}
		}else{
			this._progress.setPercentage(0);
			this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt",[ "0/"+cfgData.value]));
		}

		if(flag == 2)
		{
			this._collectBtn.visible = false;
			this.makeCollectFlag();
			this._collectFlag.setScale(0.7);
			// this._collectBtn.setText("friendsBtnTxt3");
			// App.DisplayUtil.changeToGray(this._collectBtn);
		}else if(flag == 1)
		{
			this._collectBtn.setText("taskCollect");
			App.DisplayUtil.changeToNormal(this._collectBtn);
		}else if(flag == 0)
		{
			this._collectBtn.setText("taskCollect");
			App.DisplayUtil.changeToGray(this._collectBtn);
		}
	}

	protected makeCollectFlag()
	{
		if(this._collectFlag == null)
		{
			this._collectFlag = BaseBitmap.create("collectflag")
			this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
			this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
			this._collectFlag.x = this._collectBtn.x + this._collectBtn.width/2 ;
			this._collectFlag.y = this._collectBtn.y + this._collectBtn.height/2 ;
			this.addChild(this._collectFlag);
		}
	}

	protected collectCallBack(event:egret.Event)
	{
		if(!this._requsting)
		{
			return;
		}
		let rdata = event.data.data;
		if(rdata.ret != 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
			return;
		}
		this._requsting = false;
		this.refreshCollectStatus();
		this.makeCollectFlag();
		this._collectFlag.setScale(1.3);
		this._collectFlag.visible = true;
		egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},400).wait(600);

		let cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		let rewardStr = GameData.formatRewardItem(cfgData.completeReward);
		App.CommonUtil.playRewardFlyAction(rewardStr);
	}

	protected collectBtnHandler()
	{
		if(Api.allianceVoApi.getMyAllianceVo().po > 2){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_rewardTip1"));
			return;
		}
		let taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
		if(!taskinfo || taskinfo.flag != 1)
		{
			return;
		}
		this._requsting = true;
		NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_REWARD,{tid:this._taskId});
	}

	public getSpaceY():number
	{
		return 2;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD),this.collectCallBack,this);
		this._progress = null;
		this._taskId = null;
		this._requsting = false;
		this._collectBtn = null;
		this._collectFlag = null;

		super.dispose();
	}
}
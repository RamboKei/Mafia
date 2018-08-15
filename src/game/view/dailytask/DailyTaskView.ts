/**
 * 任务
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskView
 */

class DailyTaskView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList = null;
	private _progress:ProgressBar;
	private _curLivenessTxt:BaseTextField;
	private _maxLivenessValue:number=0;
	private _curRewardBoxId:string;
	public constructor() {
		super();
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let topBg = BaseBitmap.create("dailytask_topbg");
		topBg.y = -15;
		this._nodeContainer.addChild(topBg);
		let scroY =  topBg.y+ topBg.height;
		//活跃度信息

		let livenessIcon = BaseBitmap.create("dailytask_liveness")
		livenessIcon.x = 40;
		livenessIcon.y = topBg.y + topBg.height/2 - livenessIcon.height/2+10;
		this._nodeContainer.addChild(livenessIcon);

		let livenessTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        livenessTxt.text = LanguageManager.getlocal("dailyTask_todayliveness");
        livenessTxt.x = livenessIcon.x +livenessIcon.width/2 - livenessTxt.width/2 ;
        livenessTxt.y = livenessIcon.y -25;
        this._nodeContainer.addChild(livenessTxt);

		this._curLivenessTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curLivenessTxt.x = 80 - this._curLivenessTxt.width/2 ;
        this._curLivenessTxt.y = livenessIcon.y + livenessIcon.height +5;
        this._nodeContainer.addChild(this._curLivenessTxt);

		this._progress = ComponentManager.getProgressBar("progress4","progress4_bg",488);
		this._progress.x = livenessIcon.x + livenessIcon.width + 5;
		this._progress.y = livenessIcon.y + livenessIcon.height/2 - this._progress.height/2;
		this._progress.setPercentage(this.getProgressPercent());
		this._nodeContainer.addChild(this._progress);

		//初始化宝箱
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let perWidth = 470/rkeys.length;
		let startX = this._progress.x;
		this._maxLivenessValue = rewardList[String(rkeys.length)].needLiveness;
		for (var index = 0; index < rkeys.length; index++) {

			let tmprcfg = rewardList[String(index+1)];
			let perX = startX + (index+1) * perWidth;
			// let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
			let arrowImg = BaseBitmap.create("dailytask_arrow");
			arrowImg.x = perX - arrowImg.width/2+2;
			arrowImg.y = this._progress.y - arrowImg.height+4;
			this._nodeContainer.addChild(arrowImg);

			let rStatus = this.getBoxStatusById(rkeys[index]);
			let imgres = "dailytask_box1_";
			if (index >2){
				imgres = "dailytask_box2_";
			}
			let boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
			boxImg.anchorOffsetX = 53/2;
			boxImg.anchorOffsetY = 51/2;
			boxImg.name = "boxImg"+rkeys[index];
			boxImg.x = perX;
			boxImg.y = this._progress.y - 51/2-5;
			
			let lightImg =  BaseLoadBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 67/2;
			lightImg.anchorOffsetY = 65/2;
			lightImg.x = perX;
			lightImg.name = "lightImg"+rkeys[index]
			lightImg.y = this._progress.y - 30;
			lightImg.visible = false;
			this._nodeContainer.addChild(lightImg);
			
			this._nodeContainer.addChild(boxImg);
			boxImg.addTouchTap(this.rewardBoxClickhandler,this,[rkeys[index]]);

			let livenuseeBg =  BaseBitmap.create("dailytask_liveness_numbg");
			livenuseeBg.width = 85;
			livenuseeBg.x = perX - 40;
			livenuseeBg.y = this._progress.y +35;
			this._nodeContainer.addChild(livenuseeBg);

			let numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness + LanguageManager.getlocal("dailyTask_liveness"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			numTxt.x = perX - numTxt.width/2;
			numTxt.y = this._progress.y +42;
			this._nodeContainer.addChild(numTxt);
			
		}
		this.refreshProfress();

		//底部列表
		let innerbg1 = BaseBitmap.create("public_9_bg24");
		innerbg1.width = GameConfig.stageWidth;
		innerbg1.height = GameConfig.stageHeigth - scroY - this.container.y;
		innerbg1.x = 0;
		innerbg1.y = scroY;
		this._nodeContainer.addChild(innerbg1);

		let innerbg2 = BaseBitmap.create("public_9_bg23");
		innerbg2.width = GameConfig.stageWidth-4;
		innerbg2.height = innerbg1.height - 4;
		innerbg2.x = 2;
		innerbg2.y = innerbg1.y +2;
		this._nodeContainer.addChild(innerbg2);

		//门客滚顶区域
		let scrollH = GameConfig.stageHeigth-innerbg2.y  - this.container.y - 20;
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);

		let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		this._scrollList = ComponentManager.getScrollList(DailyTaskScrollItem,list ,rect);
		this._scrollList.y = innerbg2.y+10;
		this._nodeContainer.addChild(this._scrollList);
	}
	//每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress()
	{	
		let newPro =  this.getProgressPercent();
		let oldPro = this._progress.getPercent();
		egret.Tween.get(this._progress,{loop:false}).to({percent:newPro},(newPro-oldPro)*5000);
		this._curLivenessTxt.text = String(Api.dailytaskVoApi.getCurLivenessValue());
		this._curLivenessTxt.x = 80 - this._curLivenessTxt.width/2 ;
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		let startX = this._progress.x;
		for (var index = 0; index < rkeys.length; index++) {

			let tmpK = String(rkeys[index]);
			let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
			let boxImg = this._nodeContainer.getChildByName("boxImg"+tmpK);
			let lightImg =  this._nodeContainer.getChildByName("lightImg"+ tmpK);

			let rStatus = this.getBoxStatusById(tmpK);
			let imgres = "dailytask_box1_";
			if (index >2){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
	}
	/**
	 * 处理进度条进度值
	 */
	protected getProgressPercent()
	{
		let curLiveness = Api.dailytaskVoApi.getCurLivenessValue();
		let rewardList = Config.DailytaskCfg.getDailyRewardsList();
		let rkeys = Object.keys(rewardList);
		
		if (curLiveness == 0)
			return 0;
		if (curLiveness >= rewardList[String(rkeys.length)].needLiveness)
			return 100;

		let perV = 1/rkeys.length;
		for (var index = 1; index <= rkeys.length; index++) {
			if(curLiveness <= rewardList[String(index)].needLiveness)
			{
				let result = perV *(index-1);
				let tmpV1 = 0;
				if(index > 1)
				{
					tmpV1 = rewardList[String(index-1)].needLiveness;
				}
				let tmpV2 = rewardList[String(index)].needLiveness;
				result += (curLiveness-tmpV1)/(tmpV2 - tmpV1)*perV;
				return result;
			}
		}
	}
	protected getBoxStatusById(boxId:string)
	{
		let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
		let rStatus = 1;
		if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId( boxId))
		{
			rStatus = 3;
		}else
		{
			if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
				rStatus = 2;
		}
		return rStatus;
	}
	//宝箱奖励领取回调
	protected rewardBoxClickhandlerCallBack(event:egret.Event)
	{
		let data = event.data.data.data;
		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
		
		let boxImg = this._nodeContainer.getChildByName("boxImg"+this._curRewardBoxId);
		let pos = boxImg.localToGlobal(boxImg.width/2,50);
		App.CommonUtil.playRewardFlyAction(rList,pos);
		this.refreshProfress();
	}

	protected rewardBoxClickhandler(obj:any,param:any)
	{
		let boxRewardId = param;
		let status = this.getBoxStatusById(boxRewardId);
		/**
		 *  1未完成 2可领取 3已领取
		 */
		if (status == 2)
		{
			this._curRewardBoxId = boxRewardId;
			NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS,{liveKey:boxRewardId });
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{type : 'Daily', id : boxRewardId});
		}
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "dailytask_topbg","dailytask_icon1","dailytask_topbg","progress4","progress4_bg",
			"dailytask_liveness","dailytask_box1_1","dailytask_box1_2","dailytask_box1_3","dailytask_liveness_numbg",
			"dailytask_arrow","dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",
			"progress6_bg",
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.refreshProfress,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS),this.rewardBoxClickhandlerCallBack,this);

		this._nodeContainer = null;
		this._scrollList = null;
		this._progress = null;
		this._curLivenessTxt = null;
		this._curRewardBoxId = null;

		super.dispose();
	}
}
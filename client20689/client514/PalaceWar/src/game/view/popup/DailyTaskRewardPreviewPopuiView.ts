/**
 * 每日奖励宝箱奖励预览弹板
 * author yanyuling qianjun 通用于转盘宝箱
 * date 2017/10/30
 * @class DailyTaskRewardPreviewPopuiView
 */
class DailyTaskRewardPreviewPopuiView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let data = this.param.data;
        let rewardId = data.id;
        let rewardCfg = null;
        let need : number = 0;
        let mustStr = '';
        let canReward = null;
        if(data.type == AcMayDayView.AID){
            let cfg : Config.AcCfg.MayDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
            rewardCfg = cfg.getBoxRewardById(rewardId);
            need = rewardCfg.needNum;
            mustStr = rewardCfg.getReward;
        }
        else{
            rewardCfg = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(rewardId);
            need = rewardCfg.needLiveness;
            let mustReward = rewardCfg.mustReward;
            mustStr = mustReward[0] + "_" + mustReward[1]+ "_0";
            canReward = rewardCfg.canReward;
        }
        
        let ofy:number=51;
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 205;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 116-ofy;
		this._nodeContainer.addChild(bg);

        let topBg = BaseBitmap.create("public_9_bg3");
        topBg.width = 272;
        topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        topBg.y = 65-ofy;
        this._nodeContainer.addChild(topBg)

        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(data.type == 'Daily' ? "dailyTask_rewardCase" : 'acMayDayBoxDesc',[String(need)]);
        tipTxt1.x = topBg.x + topBg.width/2 - tipTxt1.width/2;
        tipTxt1.y =topBg.y + topBg.height/2 - tipTxt1.height/2;
        this._nodeContainer.addChild(tipTxt1);
        
        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        tipTxt2.text = LanguageManager.getlocal(data.type == 'Daily' ? "dailyTask_rewardTip" : 'acMayDayBoxDesc1');
        tipTxt2.x = bg.x+10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        
        if (!canReward){
            canReward = [];
        }
        let resultStr = mustStr;
        for (var index = 0; index < canReward.length; index++) {
            resultStr = resultStr + "|" + canReward[index];
        }
        let rewardArr = GameData.formatRewardItem(resultStr);
        let lineNum = Math.ceil(rewardArr.length / 4);
        let rbg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		rbg.width = bg.width-20;
		rbg.height = 120*lineNum;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
		this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        let rewardX = rbg.x + (data.type == AcMayDayView.AID ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        let rewardY = rbg.y +10;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true);
            let numLb = iconItem.getChildByName("numLb");
            if(numLb)
            {
                numLb.visible = false;
            }
            if (index > 0 )
            {   
                rewardX +=  (iconItem.width+10);
                if( index%4 == 0){
                    rewardX = rewardX = rbg.x + (data.type == AcMayDayView.AID ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);
                    rewardY += iconItem.height + 5;
                }
            }
			iconItem.x =  rewardX ;
            iconItem.y = rewardY;
            
			this._nodeContainer.addChild(iconItem);
		}
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{
        this._nodeContainer = null
        super.dispose();
    }
}
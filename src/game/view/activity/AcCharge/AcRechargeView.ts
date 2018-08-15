/**
 * 充值奖励
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeView
 */
class AcRechargeView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _rechargeItemList=[];
    private _wordTipImg:BaseBitmap;
    private _cdTxt:BaseTextField;
    private _activityDurTxt:BaseTextField
    private _rechargeTxt:BaseTextField
    private _tmpVo;
    private _redImgList = [];
    public constructor() {
		super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD),this.checkRedpoints,this);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.checkRedpoints,this);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD),this.checkRedpoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD),this.checkRedpoints,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let topBg:BaseBitmap = BaseBitmap.create("activity_charge_topbg");
        topBg.width = GameConfig.stageWidth+18;
        topBg.y = -13;
		this._nodeContainer.addChild(topBg);

        this._wordTipImg = BaseBitmap.create("activity_charge_word1");
        this._wordTipImg.anchorOffsetY = this._wordTipImg.height/2;
        this._wordTipImg.y = 40;
        this._wordTipImg.x = 20;
        this._nodeContainer.addChild(this._wordTipImg);

        let timeBg = BaseBitmap.create("public_9_bg38");
        timeBg.width = 400;
        timeBg.x = 0;
        timeBg.y = 70;
        this._nodeContainer.addChild(timeBg);

        this._activityDurTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._activityDurTxt.x = 30;
        this._activityDurTxt.y = timeBg.y + timeBg.height/2 - 10 ;
        this._nodeContainer.addChild(this._activityDurTxt);
        
        this._cdTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.x = this._activityDurTxt.x;
        this._cdTxt.y = this._activityDurTxt.y + 40 ;
        this._nodeContainer.addChild(this._cdTxt);

        this._rechargeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rechargeTxt.x = this._activityDurTxt.x;
        this._rechargeTxt.y = this._cdTxt.y + 30 ;
        this._rechargeTxt.visible = false;
        this._nodeContainer.addChild(this._rechargeTxt);
        
        if (PlatformManager.checkIsTWBSp() == true) 
        {   
            let rechargeNotFree = ComponentManager.getTextField(LanguageManager.getlocal("rechargeNotContainPresent"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
            rechargeNotFree.x = this._activityDurTxt.x;
            rechargeNotFree.y = this._cdTxt.y + 60 ;
            this._nodeContainer.addChild(rechargeNotFree);
        }

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+5;
        bottomBg.x = -8;
        bottomBg.y = topBg.height + topBg.y;
		this._nodeContainer.addChild(bottomBg);

        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 110;
        bottomBg2.width = bottomBg.width - 40;
        bottomBg2.x = bottomBg.x+20;
        bottomBg2.y = bottomBg.y + 85;
		this._nodeContainer.addChild(bottomBg2);
        let tabName = [];
        let tmpRect =  new egret.Rectangle(0,0,bottomBg2.width,bottomBg2.height-10);
        // let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height);
        let tabY = bottomBg.y + 24;
        let tabX = 15;
        let dailyVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
        if (dailyVo)
        {
            let redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "dailyCharge_"+ dailyVo.code;
            redPoint.y = tabY;
            redPoint.x = tabX+125;
            this._redImgList.push(redPoint);
            this._nodeContainer.addChild(redPoint);

            tabName.push("acCharge_tab1")
            let rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y =bottomBg2.y+5;
            rechargeItem.init("dailyCharge",dailyVo.code,tmpRect);
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        if (totalVo)
        {
            let redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "totalRecharge_" + totalVo.code;
            this._redImgList.push(redPoint);
            redPoint.y = tabY;
            redPoint.x = tabX+280;
            this._nodeContainer.addChild(redPoint);

            tabName.push("acCharge_tab2")
            let rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name
            rechargeItem.init("totalRecharge",totalVo.code,tmpRect);
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y =bottomBg2.y+5;
            rechargeItem.visible = false;
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
        let totalDVo = Api.acVoApi.getActivityVoByAidAndCode("totalDayRecharge");
        if (totalDVo)
        {
            let redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "totalDayRecharge_" + totalDVo.code;
            this._redImgList.push(redPoint);
            redPoint.y = tabY;
            redPoint.x = tabX+455;
            this._nodeContainer.addChild(redPoint);

            tabName.push("acCharge_tab3")
            let rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name
            rechargeItem.init("totalDayRecharge",totalDVo.code,tmpRect);
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y =bottomBg2.y+5;
            rechargeItem.visible = false;
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
//  
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = tabX;
        tabbarGroup.y = tabY;
        this._nodeContainer.addChild(tabbarGroup);
        for (var key in this._redImgList) {
            let red:BaseBitmap = this._redImgList[key];
            red.visible = false;
            if(key == "0")
                red.x = tabX+122;
            if(key == "1")
                red.x = tabX+280;
            if(key == "2")
                red.x = tabX+437;
            this._nodeContainer.addChild(red);
        }

        this.tabBtnClickHandler({index:0});
        this.checkRedpoints();
    }

    protected tabBtnClickHandler(params:any)
    {
        let idx = params.index;

        for (var index = 0; index < this._rechargeItemList.length; index++) {
            this._rechargeItemList[index].visible = false;
        }
         this._rechargeItemList[idx].visible = true;
        let nameStr = this._rechargeItemList[idx].name;
        let nameTab = App.StringUtil.splitString(nameStr,"_");
       
        this._wordTipImg.texture = ResourceManager.getRes("activity_charge_"+nameTab[0]);
        this._wordTipImg.anchorOffsetY = this._wordTipImg.height/2;
        this._wordTipImg.y = 40;
        let tmpVo = undefined;
        this._rechargeTxt.visible = false;

       
        tmpVo = <AcBaseVo>Api.acVoApi.getActivityVoByAidAndCode(nameTab[0]);

        if (nameTab[0] == "dailyCharge" )
        {
            this._rechargeTxt.visible = true;
        }
       
        this._tmpVo = tmpVo;
        this._rechargeTxt.text = LanguageManager.getlocal("acrecharge_todayRecharge",[String(this._tmpVo.v)]);

        let timeStr = App.DateUtil.getOpenLocalTime(tmpVo.st,tmpVo.et,true);
        this._activityDurTxt.text = this._tmpVo.getAcLocalTime(true);
 
       this.tick();
    }

    public tick():boolean
	{
        let deltaT = this._tmpVo.et - GameData.serverTime;
		if (this._cdTxt && deltaT > 0){
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
			return true;
        }else{
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD",[LanguageManager.getlocal("acRank_acCDEnd")]);
		}
		return false;
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "activity_charge_topbg","activity_charge_red",
            "activity_charge_dailyCharge","activity_charge_totalDayRecharge","activity_charge_totalRecharge","activity_charge_word4",
            "activity_charge_word5","servant_bottombg",
            "progress3_bg","progress5","recharge_fnt",
            "itemeffect",
         ]);
	}
    private checkRedpoints()
    {
        for (var index = 0; index < this._redImgList.length; index++) {
            var redImg:BaseBitmap = this._redImgList[index];
            let name = redImg.name ;//= "totalDayRecharge_1";
            let tmpStr = name.split("_");
            let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(tmpStr[0],tmpStr[1]);
            if (tmpVo.isShowRedDot) {
                redImg.visible = true;
            }else{
                redImg.visible = false;
            }
        }
    }

	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD),this.checkRedpoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD),this.checkRedpoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD),this.checkRedpoints,this);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.checkRedpoints,this);

        this._nodeContainer = null;
        this._rechargeItemList = [];
        this._wordTipImg = null;
        this._cdTxt = null;
        this._activityDurTxt = null;
        this._rechargeTxt = null;
        this._tmpVo = null;
        this._redImgList = [];
        
        super.dispose();
    }
}
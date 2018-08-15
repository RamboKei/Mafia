/*
author : qianjun
date : 2018.4.14
desc : 转盘活动
*/
class AcMayDayView extends AcCommonView{
    public constructor(){
        super();
    }

    private _nodeContainer:BaseDisplayObjectContainer;
    private _activityTimerText: BaseTextField = null;
    private _activityDescText: BaseTextField = null;
    private _topBg : BaseLoadBitmap = null;
    private _topMan : BaseLoadBitmap = null;
    private _topName : BaseLoadBitmap = null;
    private _descBg : BaseLoadBitmap = null;
    private _bottomBg : BaseLoadBitmap = null;
    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;

    public static AID:string=null;
    public static CODE:string =null;
    private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get typeCode():string
    {
        let code = this.code;
        if(code == "5")
        {
            code ="3"
        }
        if(code == "6")
        {
            code ="4"
        }
        return code;

    }

    public initView(){

        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
        AcMayDayView.AID = view.aid;
        AcMayDayView.CODE = view.code; 
        view._nodeContainer = new BaseDisplayObjectContainer(); 
        view.addChildToContainer(view._nodeContainer);
        //top背景图
        let _topBg:BaseLoadBitmap = null;
        if(ResourceManager.getRes(`acturntable_top_bg1_${this.typeCode}`)){
            _topBg = BaseLoadBitmap.create(`acturntable_top_bg1_${this.typeCode}`);
        }
        else{
            _topBg = BaseLoadBitmap.create(`acturntable_top_bg1_1`);
        }
        _topBg.y = -241;
        view.addChildToContainer(_topBg);
        view._topBg = _topBg;
        //武将
        view._topMan = BaseLoadBitmap.create(this.typeCode == '1' || this.typeCode == '3' ? `acmaydayman1_1` : `acmaydayman1_${this.typeCode}`);//
        view._topMan.x = 0;
        view._topMan.y = this.typeCode == '1' || this.typeCode == '3'  ? -225 : -240;
        this.addChildToContainer(view._topMan);
        //武将名
        let _topName:BaseLoadBitmap = null;
        if(ResourceManager.getRes(`acturntable_tab1_${this.typeCode}text`)){
            _topName = BaseLoadBitmap.create(`acturntable_tab1_${this.typeCode}text`);
        }
        else{
            _topName = BaseLoadBitmap.create(`acturntable_tab1_1text`);
        }
        _topName.x = GameConfig.stageWidth - 351 - 19;
        _topName.y = (Number(this.typeCode) == 1 || Number(this.typeCode) == 4 || Number(this.typeCode) == 3) ? -245 : -210;
        this.addChildToContainer(_topName);
        this._topName = _topName;
        //descbg
        let descbg:BaseLoadBitmap =  BaseLoadBitmap.create("acturntabletop_descbg");
        descbg.width = Number(this.typeCode) == 1 || Number(this.typeCode) == 3 ? 456 : 440;
        descbg.x = GameConfig.stageWidth - descbg.width - 5;
        descbg.y = -150;
        descbg.height = 122;
        this.addChildToContainer(descbg);
        this._descBg = descbg;
        //活动时间   
        let vo = this.vo;
        let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
		let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	view._activityTimerText.x = descbg.x + 20;
		view._activityTimerText.y = -140;
        view.addChildToContainer(view._activityTimerText);
        //活动描述
        view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTabDesc1_${this.typeCode}`), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        view._activityDescText.width = 456 - 24; 
        view._activityDescText.lineSpacing = 6;
        view._activityDescText.x = descbg.x + 15;
		view._activityDescText.y = -110;
        view.addChildToContainer(view._activityDescText);
        //最底部背景
        let bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.x = -8; 
        bottomBg.y = -30; 
        bottomBg.height = GameConfig.stageHeigth - _topBg.height + _topBg.y - 60;
        view._nodeContainer.addChild(bottomBg); 
        view._bottomBg = bottomBg;
        //红点1
        let public_dot1 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot1); ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        public_dot1.y = this.tabbarGroup.y; 
		this.public_dot1 = public_dot1;

        //红点2
        let public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2); ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-5;
        public_dot2.y = this.tabbarGroup.y; 
		this.public_dot2 = public_dot2;

         //红点3
        let public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3); ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-5;
        public_dot3.y = this.tabbarGroup.y; 
        this.public_dot3 = public_dot3; 
        _topBg = null;
        _topName = null;
        descbg = null;
        bottomBg = null;
        public_dot1 = public_dot2 = public_dot3 = null;
        this.update();
    }

    protected clickTabbarHandler(data:any):void
	{    
        let view = this;
        super.clickTabbarHandler(data);
        let picNmae = Number(data.index) + 1;
        view._topName.visible = false;
        view._descBg.visible = view._topMan.visible = (picNmae == 1);
        if(ResourceManager.getRes(`acturntable_top_bg${picNmae}_${this.typeCode}`)){
            view._topBg.setload(`acturntable_top_bg${picNmae}_${this.typeCode}`);
        }
        else{
            view._topBg.setload(`acturntable_top_bg${picNmae}_1`);
        }
        
        view._activityDescText.text =  LanguageManager.getlocal(`AcTurnTableViewTabDesc${picNmae}_${this.typeCode}`);
        if(ResourceManager.getRes(`acturntable_tab${picNmae}_${this.typeCode}text`)){
            view._topName.setload(`acturntable_tab${picNmae}_${this.typeCode}text`, null, {callback : ()=>{
                view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
                if(Number(this.typeCode) == 1 || Number(this.typeCode) == 4 || Number(this.typeCode) == 3){
                    view._topName.y = picNmae == 1 ? -245 : -210;
                }
                else{
                    view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 340) : (GameConfig.stageWidth - 351 - 19);
                    view._topName.y = picNmae == 3 ? -230 : -210;
                }
                
                view._topName.visible = true;
            },callbackThisObj : this});
        }
        else{
            view._topName.setload(`acturntable_tab${picNmae}_1text`, null, {callback : ()=>{
                view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
                view._topName.y = picNmae == 1 ? -245 : -210;
                view._topName.visible = true;
            },callbackThisObj : this});
        }
        view._activityTimerText.y = picNmae == 1 ? -140 : -150;
        view._activityDescText.y = picNmae == 1 ? -110 : -120;
    } 
    
    protected getTabbarTextArr():Array<string>
	{
		return [`AcTurnTableViewTab1_${this.typeCode}`, 
                `AcTurnTableViewTab2_${this.typeCode}`,
                `AcTurnTableViewTab3_${this.typeCode}`
		];
	}
 
    protected getTabbarGroupY():number
	{
		return 232;
    }
    
    protected getTitleButtomY():number
	{
		return 335;
	}

    protected getRuleInfo():string
	{
		return "acMatDatRule" + this.typeCode;
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "activity_charge_red","shopview_corner","servant_bottombg","recharge_fnt","itemeffect","public_9_bg43","accarnivalview_tab_red","accarnivalview_tab_green","collectflag","wifeview_bottombg","mainui_bottombtnbg","progress5","progress3_bg",
            "acturantable_task_arrow","acturantable_task_box1_1","acturantable_task_box1_2","acturantable_task_box1_3","acturantable_task_box2_1","acturantable_task_box2_2","acturantable_task_box2_3","acturantable_taskbox_light","acturntable_tab1_1text","acturntable_bg","acturntable_line","acturntable_point","acturntable_rankicon","acturntable_tab2_1text","acturntable_tjbg","acturntable_top_bg1_1","acturntable_top_bg2_1","acturntable_top_bg3_1","acturntabletop_descbg",
            "public_dot2","progress10","progress10_bg","btn_upgrade_yellow","btn_upgrade_yellow_down","public_9_bg14", "public_9_bg4", "shopview_line", "acturntable_rankicon_down", "acmaydayman1_1", "acturntable_tab3_1text", "acturntable_tab1_2text","acturntable_tab2_2text","acturntable_tab3_2text","acturntable_top_bg2_2","acturntable_top_bg3_2","acmaydayman1_2",
            "acturntable_tab1_4text","acturntable_top_bg1_4","acturntable_top_bg2_4","acturntable_top_bg3_4"
        ]);
    } 


    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
         if(this.public_dot1)
         {
             this.public_dot1.visible = vo.getpublicRedhot1();
         }
         //第二页 红点
         if(this.public_dot2)
         {
              this.public_dot2.visible =  vo.getpublicRedhot2();
         }    
 
         //第三页 红点
         if(this.public_dot3)
         {
              this.public_dot3.visible =  vo.getpublicRedhot3();
         }    
    }
    protected getTitleStr():string
	{
		return "acMayDay-"+ this.typeCode + "_Title";
	}
    public dispose():void
	{   
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
        let view = this;
        view._topBg = null;
        view._topName = null;
        view._descBg = null;
        view._activityDescText = view._activityTimerText = null;
        view._nodeContainer = null;
        view._activityTimerText = null;
        view._activityDescText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._bottomBg = null;
        super.dispose();
    }
}
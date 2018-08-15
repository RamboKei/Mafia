/*
author : qianjun
date : 2018.4.14
desc : 龙舟活动
*/
class AcDragonBoatDayView extends AcCommonView{
    public constructor(){
        super();
    }
    private _activityTimerText: BaseTextField = null;
    private _activityDescText: BaseTextField = null;
    private _topBg : BaseBitmap = null;
    private _bottomBg : BaseBitmap = null;

    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;

    public static AID:string=null;
    public static CODE:string =null;

    private get cfg() : Config.AcCfg.DragonBoatDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcDragonBoatDayView.AID, AcDragonBoatDayView.CODE);
    }

    private get vo() : AcDragonBoatDayVo{
        return <AcDragonBoatDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcDragonBoatDayView.AID, AcDragonBoatDayView.CODE);
    }

    private get acTivityId() : string{
        return `${AcDragonBoatDayView.AID}-${AcDragonBoatDayView.CODE}`;
	}
    //

    public initView(){
        let view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
        AcDragonBoatDayView.AID = view.aid;
        AcDragonBoatDayView.CODE = view.code; 
        //top背景图
        let _topBg:BaseBitmap = BaseBitmap.create(`dragonboatmanbg-${view.code}`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0,view.titleBg.height]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);
       
        //活动时间   
        let vo = this.vo;
        if(this.code=="1")
        {
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
            view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _topBg, [197,110]);
            view.addChild(view._activityTimerText);
            //活动描述
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(`DragonBoatDayDesc-${this.code}`), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            view._activityDescText.width = 456 - 24; 
            view._activityDescText.lineSpacing = 6;
            view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, view._activityTimerText, [0,2+view._activityTimerText.textHeight]);
            view.addChild(view._activityDescText);

        } 
        //targroup
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, _topBg, [0,_topBg.height + 11]);
        let tarGroupBg:BaseBitmap = BaseBitmap.create('dragonboattarbg');
        tarGroupBg.width = view.width;
        tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0,_topBg.height]);
        view.addChild(tarGroupBg);
        view.swapChildren(view.tabbarGroup, tarGroupBg);
        if(this.code=="2")
        {
             view.setChildIndex(tarGroupBg,3); 
             view.setChildIndex(this.tabbarGroup,4);
             tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15+19;
             view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0,_topBg.height-19]);
        }
      
        //bottombg
        let _bottomBg:BaseBitmap = BaseBitmap.create(`dragonboattab1bg`);
        _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y - view.tabbarGroup.height;
        view._bottomBg = _bottomBg;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view);
        if(this.code=="2")
        {
            _bottomBg.y = 142;
            //  view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view,[0,142]);
        }
        _bottomBg.x = 0;
        view.addChild(_bottomBg);

        view.container.width = tarGroupBg.width;
        view.container.height = tarGroupBg.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view.tabbarGroup, [0,view.tabbarGroup.height + 13]);
        //红点1
        let public_dot1 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot1); ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        public_dot1.y = this.tabbarGroup.y; 
		this.public_dot1 = public_dot1;

        //红点2
        let public_dot2 =BaseBitmap.create("public_dot2");
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
        this.update();
    }

    protected clickTabbarHandler(data:any):void
	{    
        let view = this;
        super.clickTabbarHandler(data);
        let tabView : any = view.getSelectedTab();
        tabView.x = 0;
    } 
   
    protected getTabbarTextArr():Array<string>
	{
		return [`DragonBoatDayViewTab1_${this.code}`, 
                `DragonBoatDayViewTab2_${this.code}`,
                `DragonBoatDayViewTab3_${this.code}`,
                `DragonBoatDayViewTab4_${this.code}`
		];
	} 


    protected getRuleInfo():string
	{
		return "DragonBoatDayRuleInfo-" + this.code;
    } 



    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "dragonboatbg","dragonboatitem1","dragonboatitem2","dragonboatmanbg-1","dragonboatnumbg","dragonboatprogress_bg","dragonboatprogress","dragonboattab1bg","dragonboattarbg",
            "dragonboatrank","dragonboatrank_down","dragonboathead1","dragonboathead2","dragonboat1","dragonboat2","dragonboatbg2","acturntable_rankicon_down","acturntable_rankicon","btn_leftpage","btn_leftpage_down",
            "activity_charge_red","collectflag",
            "accarnivalview_tab_red","progress5","progress3_bg","accarnivalview_tab_green",
            "shopview_corner","shopview_line",
            "dblamp1","dblamp2",
            "lihua_hong0001","lihua_hong0002","lihua_hong0003","lihua_hong0004","lihua_hong0005",
            "lihua_hong0006","lihua_hong0007","lihua_hong0008","lihua_hong0009",
            "lihua_huang0001","lihua_huang0002","lihua_huang0003","lihua_huang0004","lihua_huang0005",
            "lihua_huang0006","lihua_huang0007","lihua_huang0008","lihua_huang0009",
            "lihua_lan0001","lihua_lan0002","lihua_lan0003","lihua_lan0004","lihua_lan0005",
            "lihua_lan0006","lihua_lan0007","lihua_lan0008","lihua_lan0009",
        ]);
    }
    
    public get tabHeight():number{
        let view = this;
        return view._bottomBg.height;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
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
     
    
    public dispose():void
	{   
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
        let view = this;
        view._activityDescText = view._activityTimerText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        super.dispose();
    }
}
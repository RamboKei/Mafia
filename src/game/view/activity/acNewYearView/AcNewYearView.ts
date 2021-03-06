/**
 * 春节活动
 */
class AcNewYearView extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer; 
	private _activityTimerText: BaseTextField = null;
    private _activityDesText1: BaseTextField = null; 
    private _activityDesText2: BaseTextField = null; 
    private _chineseknot:BaseBitmap =null;
    public static AID:string=null;
    public static CODE:string =null;
    
    private lastType:number=0; 
    private _topBg:BaseBitmap =null;
    private _topBg2:BaseBitmap =null;
 
    public static topBgHeight:number=0; 
    private curr_acNewYearVo:AcNewYearVo =null;
    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    
    public constructor() {
		super();
	}
   	 
	public initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.isShowRedhot,this);  
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.isShowRedhot,this);

      
        AcNewYearView.AID = this.aid;
        AcNewYearView.CODE =this.code;
        
        let curr_acNewYearVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid); 
        this.curr_acNewYearVo =curr_acNewYearVo;  
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
   
        
        let topBg:BaseBitmap = BaseBitmap.create("acnewyear_topbg_"+this.code);
        topBg.width = GameConfig.stageWidth+18;
        topBg.y =-286;
        this.addChild(topBg);
		this._nodeContainer.addChild(topBg);
        this._topBg =topBg;

        let topBg2:BaseBitmap = BaseBitmap.create("acnewyear_topbg2_"+this.code);
        topBg2.width = GameConfig.stageWidth+18;
        topBg2.y =-286;
		this._nodeContainer.addChild(topBg2);
        this._topBg2 =topBg2;
        this._topBg2.visible =false; 
        AcNewYearView.topBgHeight =GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+5;
        

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+9;
        bottomBg.x = -8; 
        bottomBg.y = topBg.height + topBg.y-4; 
		this._nodeContainer.addChild(bottomBg);

    	//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._activityTimerText.x = 80
		this._activityTimerText.y = -142; 
		this._activityTimerText.text = curr_acNewYearVo.acTimeAndHour;
		this.addChildToContainer(this._activityTimerText);

        //攀升描述  1 
        this._activityDesText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityDesText1.x = 80
		this._activityDesText1.y = -102;
		this._activityDesText1.text = LanguageManager.getlocal("newayearactivityDes_"+this.code+"_1");
		this.addChildToContainer(this._activityDesText1);

 

        
        //中国结
        let chineseknot = BaseBitmap.create("acnewyear_chineseknot2_"+this.code);
        chineseknot.x = this._activityDesText1.x + this._activityDesText1.width; 
        chineseknot.y = -118;
        this._chineseknot =chineseknot;
		this._nodeContainer.addChild(chineseknot);

        //攀升描述   2
        this._activityDesText2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityDesText2.x = chineseknot.x + chineseknot.width;
		this._activityDesText2.y = -102;
		this._activityDesText2.text = LanguageManager.getlocal("newayearactivityDes_"+this.code+"_2");
		this.addChildToContainer(this._activityDesText2);
        
        
        let tabName = [];
        let tabY = bottomBg.y + 24;
        let tabX = 15;  


       
        this.public_dot1 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot1);
		this.public_dot1.x =135;
		this.public_dot1.y = this.tabbarGroup.y;  
        this.public_dot1.visible = this.curr_acNewYearVo.firstRed();

        this.public_dot2 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot2);
		this.public_dot2.x =295;
		this.public_dot2.y = this.tabbarGroup.y;
        this.public_dot2.visible = this.curr_acNewYearVo.secondRed();
    }   

    private isShowRedhot():void
    {   
        // if(AcNewYearViewTab2.isStarBoo==true)
        // { 
           this.public_dot1.visible = this.curr_acNewYearVo.firstRed();
           this.public_dot2.visible = this.curr_acNewYearVo.secondRed();
        // }
        // else
        // {
        //     this.public_dot2.visible = false; 
        // }
    }
    protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
        this.acEnd();
        if(data.index==1)
        {
           this._topBg2.visible =true;
           this._topBg.visible =true;
           this._activityTimerText.visible =false;
           this._chineseknot.visible =false;
           this._activityDesText1.visible =false;
           this._activityDesText2.visible =false;
        }
        else
        {
            this._topBg2.visible =false;
            this._topBg.visible =true;
            this._activityTimerText.visible =true;
            this._chineseknot.visible =true;
            this._activityDesText1.visible =true;
            this._activityDesText2.visible =true;
        }
        
    }
    private  acEnd():void
	{
		if(this.curr_acNewYearVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
	}

    protected getTabbarTextArr():Array<string>
	{
		return ["acNewYearViewTab1",
                "acNewYearViewTab2_"+this.code,
		];
	}
 
    protected getTabbarGroupY():number
	{
		return 235;
	} 

    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    } 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "acnewyear_big_package", 
            "acnewyear_bottom", 
            "acnewyear_bottom2", 
            "acnewyear_bottom3", 
            "acnewyear_chineseknot_1",
            "acnewyear_chineseknot_2",  
            "acnewyear_box",  
            "acnewyear_chineseknot2_1", 
            "acnewyear_chineseknot2_2", 
            "acnewyear_look", 
            "acnewyear_small_package", 
            "acnewyear_topbg_1", 
            "acnewyear_topbg2_1",  
            "acnewyear_topbg_2", 
            "acnewyear_topbg2_2",  
            "progress3",
            "progress3_bg",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
            "common_titlebg"
            
         ]);
	} 
	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.isShowRedhot,this);

        this._nodeContainer = null;
        AcVipShopView.AID=null;
        AcVipShopView.CODE=null;  
        this.lastType =0;
        this._activityTimerText =null;  
        this._activityDesText1 =null;
        this._activityDesText2 =null;
        this._chineseknot =null;
        this._topBg =null;
        this._topBg2 =null;
        AcNewYearView.topBgHeight =0; 
        this.public_dot2 =null;

        super.dispose();
    }
}
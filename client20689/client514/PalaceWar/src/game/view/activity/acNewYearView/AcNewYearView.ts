/**
 * 春节活动
 */
class AcNewYearView extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer; 
	private _activityTimerText: BaseTextField = null;
    private _activityDesText: BaseTextField = null; 
    private _chineseknot:BaseBitmap =null;
    public static AID:string=null;
    public static CODE:string =null;
    
    private lastType:number=0; 
    private _topBg:BaseBitmap =null;
    private _topBg2:BaseBitmap =null;
 
    public static topBgHeight:number=0; 
    private curr_acNewYearVo:AcNewYearVo =null;
    private public_dot1:BaseBitmap =null;
    
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
		this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._activityTimerText.x = 80
		this._activityTimerText.y = -142; 
		this._activityTimerText.text = curr_acNewYearVo.acTimeAndHour;
		this.addChildToContainer(this._activityTimerText);

        //攀升描述   
        this._activityDesText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityDesText.x = 80
		this._activityDesText.y = -102;
		this._activityDesText.text = LanguageManager.getlocal("newayearactivityDes_"+this.code);
		this.addChildToContainer(this._activityDesText);

        
        //中国结
        let chineseknot = BaseBitmap.create("acnewyear_chineseknot2_"+this.code);
        chineseknot.x = 280; 
        chineseknot.y =-118;
        this._chineseknot =chineseknot;
		this._nodeContainer.addChild(chineseknot);
        
        
        let tabName = [];
        let tabY = bottomBg.y + 24;
        let tabX = 15;  


        this.public_dot1 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot1);
		this.public_dot1.x =295;
		this.public_dot1.y =this.tabbarGroup.y;  
        this.public_dot1.visible = this.curr_acNewYearVo.isShowRedDot;
    }   

    private isShowRedhot():void
    {   
        if(AcNewYearViewTab2.isStarBoo==true)
        {
           this.public_dot1.visible = this.curr_acNewYearVo.isShowRedDot;
        }
        else
        {
            this.public_dot1.visible = false;
        }
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
           this._activityDesText.visible =false;
        }
        else
        {
            this._topBg2.visible =false;
            this._topBg.visible =true;
            this._activityTimerText.visible =true;
            this._chineseknot.visible =true;
            this._activityDesText.visible =true;
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
        this._activityDesText =null;
        this._chineseknot =null;
        this._topBg =null;
        this._topBg2 =null;
        AcNewYearView.topBgHeight =0; 

        super.dispose();
    }
}
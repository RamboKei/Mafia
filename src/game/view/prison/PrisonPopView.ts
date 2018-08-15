class PrisonPopView extends PopupView
{
    //囚犯主图
    private prisonerDescribe:BaseTextField= null;
    private currContainer:BaseDisplayObjectContainer =null;
 

    public constructor() 
	{
		super();
	}

	protected initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
 
         

        this.touchEnabled =false;
        let bg:BaseBitmap = BaseBitmap.create("prisonview_small_bg");
        bg.x+=13;
        this.addChildToContainer(bg);
        // this.currContainer.addChild(bg);
           

        //人物大头像  story_npc_
        var currNum= Api.prisonVoApi.getCurrPrisonId()+20;
        let prisonHead:BaseBitmap = BaseLoadBitmap.create("story_npc_"+ currNum);
        prisonHead.x+=100;
        prisonHead.y+=15;
        
        prisonHead.scaleX =0.8;
        prisonHead.scaleY =0.8;
        this.addChildToContainer(prisonHead);
        // this.currContainer.addChild(prisonHead);
    
        var bg2:BaseBitmap = BaseBitmap.create("prisonview_itembg"); 
        bg2.x+=15;
        this.addChildToContainer(bg2); 

        //人物描述
	    this.prisonerDescribe =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription"+Api.prisonVoApi.getCurrPrisonId());
		this.prisonerDescribe.setPosition(bg2.x+20,bg2.y+bg2.height-60);
        this.prisonerDescribe.width=bg.width-30;
		this.addChildToContainer(this.prisonerDescribe);
        // this.currContainer.addChild(this.prisonerDescribe);
        
        this.y =-200;
        this.alpha=0;
        egret.Tween.get(this).to({alpha:1,y:0},800).call(this.remove,this);
        
    }

    public hide():void
    {
        
         if(this.touchEnabled==true)
         {
           super.hide();
           App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_BLACKPANEL);	
         }
    }
   
    protected isShowMask():boolean
	{
		return false;
	}
    private remove():void
	{
        //  this.drawblackMask();
         this.touchEnabled =true; 
         this.addTouchTap(this.hide,this); 
	}

    protected getShowHeight():number
	{
		return 510;
	}

    protected getTitleStr():string
    {
       return  Api.prisonVoApi.getPrisonTitleStr();
    }
    public dispose(): void
    {
        this.prisonerDescribe =null;
        this.currContainer=null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
        super.dispose();
    }
   
}
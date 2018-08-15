class CommonRewardPopupView  extends PopupView
{


  
    private _scrollList: ScrollList;
    private rewardArrList:Array<any> =[];
    public constructor() {
		super();
	}

    protected getBgName():string
    {
        return "public_9_wordbg";
    }

    protected getCloseBtnName():string
    {
        return null;
    }

    protected isTouchMaskClose():boolean
    {
        return true;
    }
    
	protected initView():void
	{
      
        this.titleTF.visible =false;
     
        let re_data = this.param.data;
        //"6_1150_4|6_1710_1";
       
        if(re_data)
        {
            if(typeof(re_data)=="string")
            {
                this.rewardArrList = GameData.formatRewardItem(re_data);
            }
            else
            {   
               this.rewardArrList = re_data;
            }
        }

        let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        let l:number=this.rewardArrList.length;
        let scaleNum:number=0.88;
        var newnum :number =0;
        for(let i:number=0;i<l;i++)
        {
            let icon:BaseDisplayObjectContainer=GameData.getItemIcon(this.rewardArrList[i]);
             var num= i%5;
            icon.setPosition((icon.width+20)*num,(icon.height+20)*Math.floor(i/5));
            icon.scaleX =scaleNum;
            icon.scaleY =scaleNum;
            itemContainer.addChild(icon);
            newnum =(icon.height+20)*Math.floor(i/5);
        }
        itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,50);
        this.addChildToContainer(itemContainer);

    }

    protected resetBgSize():void
    {
        super.resetBgSize();
        let  common_reward=BaseBitmap.create("common_reward");
        common_reward.setPosition(this.viewBg.x+(this.viewBg.width-common_reward.width)/2,this.viewBg.y-common_reward.height/2);
        this.addChild(common_reward);
    }
    
    private touchHandler():void
    {
        ViewController.getInstance().hideView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW);
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "common_reward",
		]);
	}
   
        

    public dispose()
    {
        this._scrollList =null;
        this.rewardArrList =[];
        super.dispose()
    }
}
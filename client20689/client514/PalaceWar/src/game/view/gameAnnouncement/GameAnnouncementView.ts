class GameAnnouncementView extends PopupView {

    private _scrollList: ScrollList;
    private _announcementList: Array<any> = [];
    public static currNum:number =0;
    private _notice = null;
    public static  NOTICE_LIST = null
    public constructor() {
        super();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"public_9_bg4",
            "uncompress",
		]);
	}

    protected initView(): void {
        this.showBg();
        this.showList();
    }
    protected resetBgSize(): void {
        this.viewBg.height = 590;
        this.viewBg.x = 30;
        this.viewBg.y = 210;
        this.closeBtn.y = this.viewBg.y-50;
        this.closeBtn.x =this.viewBg.x +this.viewBg.width-80;
        this.titleTF.y = this.viewBg.y + 15;
    }
    public showBg():void
    {
        let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 518;
	    bg.height = 496;
        bg.x =55;
        bg.y = this.viewBg.y+220;
		this.addChildToContainer(bg);
    }
    private showList(): void {
        if(this.param.data.name=="login")
        {   
            if(this.param.data&&this.param.data.notice)
            {
                this._notice =this.param.data.notice;
                this._announcementList  = this._notice;
                GameAnnouncementView.NOTICE_LIST =  this._announcementList; 
            } 
            else
            {
                 this._announcementList = GameAnnouncementView.NOTICE_LIST;
            } 
        }
        else
        {
             this._announcementList = this.param.data;
        }
      
        let rect = egret.Rectangle.create();
        rect.setTo(0, 0, 518, 468);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
      
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(60, 240);
        this._scrollList.addTouchTap(this.clickItemHandler, this);

        var _announcementScrollItem: AnnouncementScrollItem = <AnnouncementScrollItem>this._scrollList.getItemByIndex(0);
         _announcementScrollItem.itemListType =true;
         _announcementScrollItem.touchNum += 1;
         this._scrollList.refreshData(this._announcementList);
    }
    public clickItemHandler(event: egret.TouchEvent): void {
        
        GameAnnouncementView.currNum =event.data;
        var _announcementScrollItem: AnnouncementScrollItem = <AnnouncementScrollItem>this._scrollList.getItemByIndex(event.data);
        _announcementScrollItem.touchNum += 1;
        if (_announcementScrollItem.touchNum % 2 == 0) {
            _announcementScrollItem.itemListType = false;
        }
        else {
            _announcementScrollItem.itemListType = true;
        }
        this._scrollList.refreshData(this._announcementList);
        // this._scrollList.setScrollTopByIndex(event.data);
    }
    
    protected getSheepType(): number {
        return 1;
    }
    public dispose(): void {
        this._announcementList = [];
        super.dispose();
    }

}
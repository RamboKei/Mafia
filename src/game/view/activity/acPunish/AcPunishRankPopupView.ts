/**
 * 排名
 * author dky
 * date 2017/11/23
 * @class AcPunishRankPopupView
 */
class AcPunishRankPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _acData :any;

	private _acVo :AcPunishVo;
    private _titleTF:BaseTextField;
    private _nickNameTF:BaseTextField;
    private _myRankTF:BaseTextField;
    private _scoreTF:BaseTextField;
	// private _punishRewardList: any = {};
    static aid:string ="";
	static code:string="";

    private _allianceRankTip:BaseTextField;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		
        
		// this._acData = this.param.data.acData;
		this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(AcPunishRankPopupView.aid, AcPunishRankPopupView.code);

		let tabName = ["acPunishRankTab1","acPunishRankTab2"];
        if(Api.switchVoApi.checkPunishAllianceRank()){
           tabName = ["acPunishRankTab1"];
        }
       
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 35;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);

		let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 600;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this.addChildToContainer(bg2);

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);

        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        this._titleTF.x = bg2.x+175;
        this._titleTF.y = titleTxt1.y;
        this.addChildToContainer(this._titleTF);

        // let titleStr3:string;
        // if(acRankInfoVo.getProgressTitle()=="")
        // {
        //     titleStr3 = LanguageManager.getlocal("pointNumber");
        // }
        // else
        // {
        //     titleStr3 = acRankInfoVo.getProgressTitle();
        // }
        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = bg2.x+430 - titleTxt3.width/2;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);

        let bg3= BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);

		this._nickNameTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        this._nickNameTF.x = bg3.x+20;
        this._nickNameTF.y = bg3.y + 20;
        this.addChildToContainer(this._nickNameTF);
		let rankV = "10000+";
        let addV = 0;
        if(this._acData.myrank.myrank)
        {
            rankV = String(this._acData.myrank.myrank);
            addV = this._acData.myrank.value;
        }
        this._myRankTF = ComponentManager.getTextField("",this._nickNameTF.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        this._myRankTF.x = this._nickNameTF.x;
        this._myRankTF.y = this._nickNameTF.y+40;
        this.addChildToContainer(this._myRankTF);

        // let addStr = ""
        // if(this._acData.getProgressDesc() == "")
        // {
        //     addStr  = LanguageManager.getlocal("acRankPop_title3_"+this._code);
        // }
        // else
        // {
        //     addStr  = this._acData.getProgressDesc();
        // }
        this._scoreTF = ComponentManager.getTextField( "",this._nickNameTF.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        this._scoreTF.x = this._myRankTF.x + 240;
        this._scoreTF.y = this._myRankTF.y ;
        this.addChildToContainer(this._scoreTF);
		
		let dataList = this._acData.rankList;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,this.viewBg.width,bg1.height - 70);
		this._scrollList = ComponentManager.getScrollList(AcPunishRankScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.y  = bg2.y+50;

		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )

        if(this.param.data.tt == 1){
            this._curTabIdx = 0;
            tabbarGroup.selectedIndex = 0;
        }
        else{
            this._curTabIdx = 1;
            tabbarGroup.selectedIndex = 1;
        }
        if(!this.param.data.tt){
             this._curTabIdx = 0;
            tabbarGroup.selectedIndex = 0;
        }

        this._allianceRankTip = ComponentManager.getTextField( "",19,TextFieldConst.COLOR_BROWN)
        this._allianceRankTip.text = LanguageManager.getlocal("acPunishRankTip");
        this._allianceRankTip.x = this.viewBg.x + this.viewBg.width/2 - this._allianceRankTip.width/2 ;
        this._allianceRankTip.y = this._myRankTF.y + 55;
        this._allianceRankTip.visible = false;
        this.addChildToContainer(this._allianceRankTip);
        
        this.refreshRankList();

        // this.tabBtnClickHandler(null);;
	}

	/**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE,requestData:{activeId: AcPunishRankPopupView.aid+"-"+ AcPunishRankPopupView.code}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE)
		{
			this._acData  = data.data.data.punishActive;
			this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode( AcPunishRankPopupView.aid, AcPunishRankPopupView.code);
		}

		
	}


	private rankBtnClick()
	{

	}

	protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
    }
    protected refreshRankList()
    {
        let dataList = this._acData.rankList;
        if(this._curTabIdx == 0){
            this._allianceRankTip.visible = false;
            let rankV = "10000+";
            let addV = 0;
            this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName()
            
            this._titleTF.text = LanguageManager.getlocal("acRankPop_title2");

            if(this._acData.myrank.myrank)
            {
                rankV = String(this._acData.myrank.myrank);
                addV = this._acData.myrank.value;
            }
            this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);

            this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        }
        else{
            this._allianceRankTip.visible = true;
            dataList = this._acData.arankList
            this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");

            let aName = LanguageManager.getlocal("allianceRankNoAlliance");
            let rankV = LanguageManager.getlocal("nothing");
            let score = LanguageManager.getlocal("nothing");
            let addV = 0;
            this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + rankV;
            
            this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");

            if(this._acData.amyrank.myrank)
            {
                rankV = String(this._acData.amyrank.myrank);
                score = String(this._acData.amyrank.value);
                
                // addV = this._acData.myrank.value;
            }
            if(Api.playerVoApi.getPlayerAllianceId() != 0){
                aName = Api.playerVoApi.getPlayerAllianceName();
            }
            this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + aName;
            this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[score]);
            this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);

            
        }
        this._scrollList.refreshData(dataList);
	}


	public hide():void
	{
		super.hide();
	}


	public dispose():void
	{

		
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
        this._allianceRankTip = null;

		super.dispose();
	}
}
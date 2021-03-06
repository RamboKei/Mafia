/**
 * 跨服擂台排行榜
 */

class AtkraceCrossRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _scrollList2:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;
	private _mepoint:number =0;
	private atkracedes5:any =null;
	private isShowTextBoo:boolean =false;
	private _curTabIdx : number = 0;
	private _nickName : BaseTextField = null;
	private _nickNameTxt : BaseTextField = null;
	private _serverTxt : BaseTextField = null;
	private _playerName : BaseTextField = null;
	private _playerServer : BaseTextField = null;
	private _playerRank : BaseTextField = null;
	private _playerScore : BaseTextField = null;
	private _atkracedes5 : BaseTextField = null;

    public constructor() 
	{
		super();
	}

	private get api() : AtkracecrossVoApi{
        return Api.atkracecrossVoApi;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			"rankinglist_rank1",
			"rankinglist_rank2",
			"rankinglist_rank3",
			
        ]);
	}
    public initView():void
	{
	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
		let tabName = ["crossServerImacyRankListViewTab1","atkraceRank"];

		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);


		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 526;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(rankBg);


		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg37");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);


		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(AtkraceCorssRankItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 516;
		bottomBg.height = 84;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, rankBg.y + rankBg.height+8);
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(160 , rankText.y);
		this.addChildToContainer(nameText); 
		this._nickNameTxt = nameText;
		this._nickNameTxt.visible = false;

		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(300 , rankText.y);
		this.addChildToContainer(quText); 
		this._serverTxt = quText;

		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(407 , rankText.y);
		this.addChildToContainer(scoreText);

		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nickName.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 -5 -nickName.height);
		this.addChildToContainer(nickName);
		this._nickName = nickName;
		this._nickName.visible = false;
		
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankText2.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 +5);
		this.addChildToContainer(rankText2);

		//玩家名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);
		this._playerName = name;
		this._playerName.visible = false;

		//描述
		let atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes5.x =250;
		atkracedes5.y =GameConfig.stageHeigth -530;
		this.addChild(atkracedes5);
		atkracedes5.visible =this.isShowTextBoo;
		this._atkracedes5 = atkracedes5;

		let rankStr:string;
		if(this._merank)
		{
			if (this._merank>300) {
			rankStr = "10000+";
			}
			else {
				rankStr = this._merank.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);
		this._playerRank = rank;

		//擂台分数
		let str:string ="";
		if(this._mepoint)
		{
			str	=this._mepoint+"";
		}else
		{
			str ="0";
		}
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(bottomBg.x + bottomBg.width - 20 -  socre.width, rankText2.y);
		this.addChildToContainer(socre);
		this._playerScore = socre;
		
		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		socreText.setPosition(socre.x - 20 -  socreText.width, rankText2.y);
		this.addChildToContainer(socreText);


		//玩家区服
		let serveText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranserver"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serveText.setPosition(socreText.x,name.y); 
		let currZid:any = Api.mergeServerVoApi.getTrueZid(); 
		serveText.text = LanguageManager.getlocal("ranserver",[currZid+""]);
		this.addChildToContainer(serveText);
		this._playerServer = serveText;

		this._infoList = [];
		for(let i in this.api.zonerankinfos){
			let unit = this.api.zonerankinfos[i];
			this._infoList.push({
				zid : unit.zid,
				point : unit.point,
				type : 'rank',
				acid : 'crossServerAtkRace'
			});
		}
		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList = ComponentManager.getScrollList(AtkracecrossServerItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

		
		this._scrollList2 = ComponentManager.getScrollList(AtkraceCorssRankItem,[],this._scroRect);
		this._scrollList2.x = titleBg.x;
		this._scrollList2.y = titleBg.y + titleBg.height;
		this._scrollList2.visible = false;
		this.addChildToContainer(this._scrollList2);

		this._atkracedes5.visible = this._infoList.length == 0;

		this.fresh_view(null);
    }
	
	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_RANK,requestData:{}};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	if(data.ret==true&&data.data&&data.data.data.atkrank)	
	// 	{
	// 		//this.fresh_view(data.data.data);
	// 		this._infoList = data.data.data.atkrank;
	// 		this._merank = data.data.data.merank;
	// 		this._mepoint = data.data.data.mepoint;
	// 		this.isShowTextBoo =false;
	// 	}
	// 	else
	// 	{	
	// 		this.isShowTextBoo =true;		
	// 	}
	// }

	private fresh_view(evt):void{
		this._scrollList.visible = this._curTabIdx == 0;
		this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
		let rankStr:string;
		let score:any = 0;
		this._infoList = [];
		if(this._curTabIdx == 0){
			let rankOrder = 0;
			for(let i in this.api.zonerankinfos){
				let unit = this.api.zonerankinfos[i];
				this._infoList.push({
					zid : unit.zid,
					point : unit.point,
					type : 'rank',
					acid : 'crossServerAtkRace'
				});
				if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
					rankOrder = Number(i) + 1;
					score = Number(unit.point).toString();
				}
			}
			this._scrollList.refreshData(this._infoList);
			if(rankOrder)
			{
				if (rankOrder > 300) {
				rankStr = "10000+";
				}
				else {
					rankStr = rankOrder.toString();
				}
			}
			else
			{	//未上榜
				rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
			}
		}
		else{
			//this.api.setPRankInfo(event.data.data.data);
			let data = evt.data;
			this._merank = data.data.data.merank;
			this._mepoint = data.data.data.mepoint;
			this.isShowTextBoo =false;
			for(let i in data.data.data.atkrank){
				let unit = data.data.data.atkrank[i];
				this._infoList.push(unit);
			}
			this._scrollList2.refreshData(this._infoList);
			let meRank = this._merank ;
			score = this._mepoint || '0';
			if(meRank)
			{
				if (meRank > 300) {
					rankStr = "10000+";
				}
				else {
					rankStr = meRank.toString();
				}
			}
			else
			{	//未上榜
				let crossVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
				rankStr =LanguageManager.getlocal((crossVo.info && crossVo.info.iscanjoin == 1) ? "atkracedes4" : `crossImacyNoAccess`);// this._merank.toString();
			}
		}
		this._atkracedes5.visible = this._infoList.length == 0;
		this._playerRank.text = rankStr;
		this._playerScore.text = Number(score).toString();
		this._serverTxt.x = this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2) : 300;
		this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94);
	}

	private tabBtnClickHandler(params : any) : void{
		this._curTabIdx = params.index;
		if(this._curTabIdx == 0){
			this.fresh_view(null);
		}
		else{
			NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_RANK, {});
		}
		
		//NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
	}
	
 
    public dispose():void
	{	
		this._merank  =0;
		this._scrollList = null;
		this._scrollList2 = null;
		this. _scroRect = null;
		this._nickName = null;
		this._nickNameTxt = null;
	 	this._serverTxt = null;
		this._playerName = null;
		this._playerServer = null;
		this._playerRank = null;
		this._playerScore = null;
		this._atkracedes5  = null;
		this._infoList = [];
		this._curTabIdx = 0;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
		super.dispose();
	}
}
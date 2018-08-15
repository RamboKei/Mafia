/**
 * 宴会详情 带桌子的 view
 * author shaoliang
 * date 2017/11/6
 * @class DinnerDetailView
 */

class DinnerDetailView extends CommonView
{
	private voApi:DinnerVoApi = null;
	private _uid:number = 0;
	private _seatText:BaseTextField = null;
	private _scoreText:BaseTextField = null;
	private _timeText:BaseTextField = null;
	private _scrollList:ScrollList = null;
	private _scrollView:ScrollView = null;
	protected _scroRect:egret.Rectangle;
	private _scrollContiner:BaseDisplayObjectContainer=null;
	private _intoSeatBtn:BaseButton = null;
	private _headTab:BaseDisplayObjectContainer[]=[];

	private _bgPreStr:string;
	private _joinedDtype:number = 0;
	private _clickUid:number = 0;

	private _canShare:boolean = true;
	private _shareCDtime:number = 1800;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "dinnerTitle"+this.voApi.getDtype();
	}

	protected getResourceList():string[]
	{
		
		this.voApi = new DinnerVoApi();
		this.voApi.formatData(this.param.data.info.dinnerdetail);
		this._uid = Number(this.param.data.uid);

		if (this.voApi.getDtype() == 1) {
			this._bgPreStr = "dinner_scroll_";
		}
		else {
			this._bgPreStr = "dinner_scroll2_";
		}

		return super.getResourceList().concat([
			"dinner_head_arrow",
			this._bgPreStr+"1",
			this._bgPreStr+"2",
			this._bgPreStr+"3",
			"palace_titlebg",
		]);
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_JOINDINNER),this.requiestCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_USEITEM),this.useItemCallback,this);

		this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,(GameConfig.stageHeigth - 238 - this.getTitleButtomY()));

		this._scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this._scrollView.y = -13;
		this._scrollView.bounces = false;
		this.addChildToContainer(this._scrollView);

		//上部玩家信息
		let playerInfoBg:BaseBitmap = BaseBitmap.create("palace_titlebg");
		// playerInfoBg.width = 540;
		// playerInfoBg.height = 150;
		playerInfoBg.setPosition(GameConfig.stageWidth/2 - playerInfoBg.width/2,-10);
		this.addChildToContainer(playerInfoBg);

		let playerName:BaseTextField = ComponentManager.getTextField(this.voApi.getName(),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		playerName.setPosition(playerInfoBg.x + playerInfoBg.width/2 - playerName.width/2, playerInfoBg.y + 30);
		this.addChildToContainer(playerName);

		let dinnerSeat:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerSeat")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		dinnerSeat.setPosition(playerInfoBg.x + 43, playerInfoBg.y + 64);
		this.addChildToContainer(dinnerSeat);

		this._seatText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._seatText.setPosition(dinnerSeat.x + dinnerSeat.width+10, dinnerSeat.y);
		this.addChildToContainer(this._seatText);
		this.resetSeatText();

		let playerId:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerId",[this._uid.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		playerId.setPosition(dinnerSeat.x , dinnerSeat.y + 32);
		this.addChildToContainer(playerId);

		let playerScore:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		playerScore.setPosition(dinnerSeat.x + 248, dinnerSeat.y);
		this.addChildToContainer(playerScore);

		this._scoreText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);
		this._scoreText.setPosition(playerScore.x + playerScore.width+10, playerScore.y);
		this.addChildToContainer(this._scoreText);
		this.resetScoreText();

		let donwTime:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryTime"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		donwTime.setPosition(playerScore.x , playerId.y);
		this.addChildToContainer(donwTime);

		this._timeText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._timeText.setPosition(donwTime.x + donwTime.width, donwTime.y);
		this.addChildToContainer(this._timeText);
		
		

		let topSeat:BaseBitmap = BaseBitmap.create(this._bgPreStr+"2");
		this._scrollContiner.addChild(topSeat);

		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
		let posY:number = topSeat.height;
		let middleNum:number = (totalNum-4)/2;
		for (let i = 1; i<=middleNum; i++ )
		{	
			let middleSeat:BaseBitmap = BaseBitmap.create(this._bgPreStr+"1");
			middleSeat.y = posY;
			this._scrollContiner.addChild(middleSeat);
			posY += middleSeat.height;
		}
		let bottomSeat:BaseBitmap = BaseBitmap.create(this._bgPreStr+"3");
		bottomSeat.y = posY;
		this._scrollContiner.addChild(bottomSeat);

		this.initBottom();
		this.initPlayerInfo();


		if (this.param.data.info.resReport && this.param.data.info.resReport.length>0) {
			ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW,{info:this.param.data.info.resReport});
		}

		//test code 
		// let hahah = [{"join_time":1510028530,"uid":1000788,"dtype":4,"name":"夹谷思嘉","pic":3},{"join_time":1510028719,"uid":1000566,"dtype":2,"name":"相里斌蔚","pic":3},{"join_time":1510042954,"pic":4,"dtype":2,"name":"郦元纬","uid":1000534}
		// 	,{"join_time":1510028530,"uid":1000788,"dtype":4,"name":"夹谷思嘉","pic":3},{"join_time":1510028719,"uid":1000566,"dtype":2,"name":"相里斌蔚","pic":3},{"join_time":1510042954,"pic":4,"dtype":2,"name":"郦元纬","uid":1000534}];
		// 	ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW,{info:hahah});
		if ( this.param.data.needOpen) {
			ViewController.getInstance().openView(ViewConst.BASE.DINNEROPENEDVIEW, { type:this.param.data.needOpen.type});		
		}

		this.tick();
	}

	private resetSeatText():void
	{	
		let num:number = this.voApi.getNum();
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
		this._seatText.text =num + "/" + totalNum;
	}

	private resetScoreText():void
	{	
		this._scoreText.text = this.voApi.getPoint().toString();
	}

	private tick():void
	{	
		let time:number = this.voApi.getEndTime() - GameData.serverTime ;//+ Config.DinnerCfg.getFeastItemCfg(this.voApi.()).lastTime
		if (time < 0) {
			time = 0;
		}
		this._timeText.text =  App.DateUtil.getFormatBySecond(time);

		if (this._uid == Api.playerVoApi.getPlayerID()) {

			let lastShareTime:number = Api.dinnerVoApi.getShareTime();
			if (GameData.serverTime - lastShareTime >= this._shareCDtime) {
				if (this._canShare == false) {
					this._canShare = true;
					App.DisplayUtil.changeToNormal(this._intoSeatBtn);
				}
			}
			else {	
				if (this._canShare == true) {
					this._canShare = false;
					App.DisplayUtil.changeToGray(this._intoSeatBtn);
				}
			}
		}

	}

	private setBottomButton():void
	{	
		if (this._intoSeatBtn)
		{	
			this.removeChildFromContainer(this._intoSeatBtn);
			this._intoSeatBtn = null;
		}
		let btnStr:string;
		let btnpic:string;
		if (this._uid == Api.playerVoApi.getPlayerID()) {
			btnStr = "dinner_share";
			btnpic = ButtonConst.BTN_NORMAL_BLUE;
		}
		else {
			let numJoin:number = Api.dinnerVoApi.getDayNum();
			let numJoinTotal:number = Config.DinnerCfg.getGoToFeastNum();
			if (numJoin >= numJoinTotal) {
				btnStr = "manageRecoveryBtn";
				btnpic = ButtonConst.BTN_NORMAL_RED;
			}
			else {
				btnStr = "intoSeat";
				btnpic = ButtonConst.BTN_NORMAL_BLUE;
			}
			
		}

		this._intoSeatBtn=ComponentManager.getButton(btnpic,btnStr,this.intoSeat,this);
		this._intoSeatBtn.setPosition(GameConfig.stageWidth/2 - this._intoSeatBtn.width/2, GameConfig.stageHeigth - 238 - this.getTitleButtomY() -12 -20-this._intoSeatBtn.height);
		this.addChildToContainer(this._intoSeatBtn);
	}

	private initBottom():void
	{
		let buttomContiner:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		buttomContiner.y = GameConfig.stageHeigth - 238 - this.getTitleButtomY() -12;
		this.addChildToContainer(buttomContiner);

		this.setBottomButton();

		let buttomBg:BaseBitmap=BaseBitmap.create("public_9_bg22");
		buttomBg.setPosition(0, 0);
		buttomBg.width = GameConfig.stageWidth;
		buttomBg.height = 238;
		buttomContiner.addChild(buttomBg);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = 35;
		buttomContiner.addChild(line1);

		let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerInfo"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BLACK);
		titleText.setPosition(GameConfig.stageWidth/2 - titleText.width/2, 32);
		buttomContiner.addChild(titleText);


		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg21");
		bottomBg.width = 590;
		bottomBg.height = 150;
		bottomBg.setPosition(GameConfig.stageWidth/2  - bottomBg.width/2, 60);
		buttomContiner.addChild(bottomBg);


		this._scroRect = new egret.Rectangle(bottomBg.x,  0, bottomBg.width,bottomBg.height - 10);
		this._scrollList  = ComponentManager.getScrollList(DinnerInfoItem,this.voApi.getJinfo(),this._scroRect);
		this._scrollList.x = bottomBg.x;
		this._scrollList.y = bottomBg.y+5;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
		buttomContiner.addChild(this._scrollList);
	}

	private initPlayerInfo():void
	{
		let hostHead:BaseDisplayObjectContainer = this.getPlayerInfo(this.voApi.getName(),this.voApi.getPic(),this._uid,this.voApi.getPhototitle()); 
		hostHead.setPosition(GameConfig.stageWidth/2-hostHead.width/2 +4, 205);
		this._scrollContiner.addChild(hostHead);

		let heightEach:number;
		if (this.voApi.getDtype() == 1) {
			heightEach = 180;
		}
		else {
			heightEach = 153;
		}
		let dis = 310;
		if(PlatformManager.checkIsKRSp())
		{
			dis = dis + heightEach + 10;
		}
		let jinfo = this.voApi.getJinfo();
		for (let k in jinfo) 
		{	
			let info = jinfo[k];
			let guestHead:BaseDisplayObjectContainer = this.getPlayerInfo(info.name,info.pic,info.uid,info.phototitle);
			guestHead.setPosition(70 + (Number(k)%2*344) , dis + Math.floor(Number(k)/2)*heightEach);
			this._scrollContiner.addChild(guestHead);
			this._headTab.push(guestHead);

			if (info.uid == Api.playerVoApi.getPlayerID()) {
				this._intoSeatBtn.visible = false;
				this._scrollView.setScrollTop(guestHead.y -180);
			}
		}
	}

	private resetPlayerInfo():void
	{
		let jinfo:any[] = this.voApi.getJinfo();

		let heightEach:number;
		if (this.voApi.getDtype() == 1) {
			heightEach = 180;
		}
		else {
			heightEach = 153;
		}

		let dis = 310;
		if(PlatformManager.checkIsKRSp())
		{
			dis = dis + heightEach + 10;
		}
		for (let k:number= this._headTab.length; k<jinfo.length; k++ ) 
		{	
			let info = jinfo[k];
			let guestHead:BaseDisplayObjectContainer = this.getPlayerInfo(info.name,info.pic,info.uid,info.phototitle);
			guestHead.setPosition(70 + (Number(k)%2*344) , dis + Math.floor(Number(k)/2)*heightEach);
			this._scrollContiner.addChild(guestHead);		
			this._headTab.push(guestHead);

			egret.Tween.get(guestHead).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},200).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},200);

			this._scrollView.setScrollTop(guestHead.y -180);

			if (info.uid == Api.playerVoApi.getPlayerID()) {
				this._intoSeatBtn.visible = false;
			}
		}
	}


	private getPlayerInfo(name:string,pic:number,uid:number,title:string):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let nameBg:BaseBitmap = BaseBitmap.create("public_numbg");
		nameBg.width = 160;
		bgContainer.addChild(nameBg);
		
		if (uid == Api.playerVoApi.getPlayerID())
		{
			title = "-1"
		}
		else if (title==null)
		{
			title = "0"
		}
		let playerHead = Api.playerVoApi.getPlayerCircleHead(pic,title);
		playerHead.x = nameBg.width/2 - playerHead.width/2;
		bgContainer.addChild(playerHead);
		nameBg.y = playerHead.height;

		let headArrow:BaseBitmap = BaseBitmap.create("dinner_head_arrow");
		headArrow.setPosition(playerHead.x + 45 - headArrow.width/2,playerHead.height -14);
		bgContainer.addChild(headArrow);


		let nameText:BaseTextField = ComponentManager.getTextField(name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		nameText.setPosition(nameBg.width/2 - nameText.width/2, nameBg.y + nameBg.height/2 - nameText.height/2);
		bgContainer.addChild(nameText);
		bgContainer.addTouchTap(this.clickHead,this,[uid]);
		return bgContainer;
	}

	private clickHead(event: egret.TouchEvent,uid:number):void
	{	
		this._clickUid = uid;
		 App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:uid});
	}
	protected userShotCallback(event:egret.Event)
    {
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			let data:any = event.data.data.data;
			if (this._uid == this._clickUid) {
				data["isDinnerHost"] = true;
			}
			data["isFromDinner"] = true;
			ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
		}
        
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
   
	private shareCallback():void
	{
		this.tick();
	}

	private intoSeat():void
	{	
		if (this._uid == Api.playerVoApi.getPlayerID()) {
			//分享
			let lastShareTime:number = Api.dinnerVoApi.getShareTime();
			if (GameData.serverTime - lastShareTime >= this._shareCDtime) {
				ViewController.getInstance().openView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW,{f:this.shareCallback,o:this});
			}
			else {
				let timeStr:string = App.DateUtil.getFormatBySecond(this._shareCDtime - GameData.serverTime + lastShareTime);
				App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_time",[timeStr]));
			}
		}
		else {
			let num:number = this.voApi.getNum();
			let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this.voApi.getDtype()).contain;
			if (num >= totalNum) {
				App.CommonUtil.showTip(LanguageManager.getlocal("dinnerSeatFull"));
				return;
			}
			let numJoin:number = Api.dinnerVoApi.getDayNum();
			let numJoinTotal:number = Config.DinnerCfg.getGoToFeastNum();
			if (numJoin >= numJoinTotal) {

				let itemId:string=Api.dinnerVoApi.getNeedItem();
				let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
				if(hasNum>0)
				{	
					let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
					 let tipMsg = LanguageManager.getlocal("dinnerTimesExtra",[itemInfoVo.name]);
						ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{
							title:"itemUseConstPopupViewTitle",
							msg:tipMsg,
							icon:itemInfoVo.icon,
							iconBg:itemInfoVo.iconBg,num:itemInfoVo.num,
							confirmCallback:this.useItemExtra,
							handler:this,
							needCancel:true,
							id : Number(itemId),
							useNum:1,
           			 });
				}
				else
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("dinnerTimesFull"));
				}
				return;
			}

			ViewController.getInstance().openView(ViewConst.POPUP.DINNERTYPEPOPUPVIEW,{o:this,f:this.joinDinnerRequest});
		}
		
	}

	private useItemExtra():void
	{	
		NetManager.request(NetRequestConst.REQUEST_DINNER_USEITEM,{});
	}
	private useItemCallback(p:any):void
	{
		if (p.data.ret == true) {
			App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
			this.setBottomButton();
		}
	}


	private joinDinnerRequest(dtype:number):void
	{	
		this._joinedDtype = dtype;
		NetManager.request(NetRequestConst.REQUEST_DINNER_JOINDINNER,{"joinuid":this._uid,"dtype":dtype});
	}

	private getRewardCallback():void
	{
		this.resetPlayerInfo();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
	}
	


	private requiestCallback(p:any):void
	{
		if (p.data.ret == true) {
			this.voApi.formatData(p.data.data.data.joindetail);
			this.resetSeatText();
			this.resetScoreText();
			this._scrollList.refreshData(this.voApi.getJinfo());
			let totalNum:number = Config.DinnerCfg.getGoToFeastItemCfg(this._joinedDtype).getScore;
			let rewards:string = p.data.data.data.reward;

			ViewController.getInstance().openView(ViewConst.COMMON.DINNERREWARDVIEW,{o:this,f:this.getRewardCallback,reward:rewards,name:this.voApi.getName(),
				pic:this.voApi.getPic(),level:this.voApi.getLevel(),title:this.voApi.getTitle(),point:totalNum});
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
			this.hide();
		}
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_JOINDINNER),this.requiestCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_USEITEM),this.useItemCallback,this);
		if (this._intoSeatBtn) {
			App.DisplayUtil.changeToNormal(this._intoSeatBtn);
		} 
	
		this.voApi.dispose();
		this.voApi = null;
		this._seatText = null;
		this._scoreText = null;
		this._timeText = null;
		this._scroRect = null;
		this._uid = 0;
		this._scrollContiner = null;
		this._intoSeatBtn = null;
		this._headTab.length = 0;
		this._bgPreStr = null;
		this._joinedDtype = 0;
		this._scrollView = null;
		this._clickUid = 0;
		this._canShare = true;

		super.dispose();
	}
}
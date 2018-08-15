
class ActrackMoreItem extends ScrollListItem {


	private uid:number =0;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {
		
		this.uid =data.info.uid;

		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");  
		wordsBg.width = 640;
		wordsBg.height =124;
		wordsBg.x=0;
		wordsBg.y=0;
		wordsBg.visible =false;
		this.addChild(wordsBg);

	 
		let rankinglist_line:BaseBitmap = BaseBitmap.create("rankinglist_line");
		rankinglist_line.y =128;
		rankinglist_line.x =15;
		this.addChild(rankinglist_line);
		
		let rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = 50-rankImg.width/2-20;
        rankImg.y = 26;//15;
        this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		rankTxt.text = String(index+1);
		rankTxt.x = 50 - rankTxt.width/2-20;
		rankTxt.y = this.height/2 - rankTxt.height/2-20;
		this.addChild(rankTxt);
			
		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTxt.text = data.info.name;
		nameTxt.x = rankImg.x+50;
		nameTxt.y = rankTxt.y;
		this.addChild(nameTxt);

		//击败｜｜全歼
		let str = "";
		if(data.info.type==1){
			str =LanguageManager.getlocal("atkracebeat")
		}
		else
		{
			str =LanguageManager.getlocal("atkraceAnnihilation")
		}
		
		//描述    
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		var servantName =Config.ServantCfg.getServantItemById(data.info.sid).name;
		describeTxt.text ="";

		//  (1随机 2复仇 3挑战 4追杀 5出师令)
		if(data.info.atype&&data.info.atype==2)
		{
			if(data.info.streak&&data.info.streak>=3)
			{
				describeTxt.text =LanguageManager.getlocal("actrackStraight_1",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{
				describeTxt.text =LanguageManager.getlocal("actrackDescription_1",[servantName,str,data.info.uname2,data.info.fightnum]);
			}
		}
		else if(data.info.atype==4)
		{
			if(data.info.streak&&data.info.streak>=3)
			{
				describeTxt.text =LanguageManager.getlocal("actrackStraight_4_2",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{
				describeTxt.text =LanguageManager.getlocal("actrackDescription_4",[servantName,str,data.info.uname2,data.info.fightnum]);
			}
		}
		else
		{
			if(data.info.streak&&data.info.streak>=3)
			{
				describeTxt.text =LanguageManager.getlocal("actrackStraight",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{
				describeTxt.text =LanguageManager.getlocal("actrackDescription",[servantName,str,data.info.uname2,data.info.fightnum]);
			}
		}
		
		describeTxt.width=450;
		describeTxt.x = nameTxt.x;
		describeTxt.y = nameTxt.y+30;
		this.addChild(describeTxt);
		
	
		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		timerTxt.text =App.DateUtil.getFormatBySecond(data.info.st, 2);
		timerTxt.x =describeTxt.x;
		timerTxt.y = describeTxt.y+40;
		this.addChild(timerTxt);

		//挑战按钮
		let challengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceChallenge",this.challengBtnHandler,this);
		challengeBtn.setScale(0.85);
		challengeBtn.x = 530;
		challengeBtn.y = 70;
		this.addChild(challengeBtn);
		if(Api.playerVoApi.getPlayerID()==data.info.uid)
		{
			challengeBtn.visible =false;
		}

	}
	//挑战
	private challengBtnHandler(evt:egret.TouchEvent):void
	{
		var data:any =[];
		data.type=1;//挑战
		data.uid=this.uid;
		AtkraceChallengeItem.data =data;
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
	}
    
	public getSpaceY(): number {
		return 1;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		this.uid =0;
		super.dispose();
	}
}
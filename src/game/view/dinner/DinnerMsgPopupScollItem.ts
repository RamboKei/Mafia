
class DinnerMsgPopupScollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 502;
        this.height = 124;

         let rankImg = BaseBitmap.create("dinner_rankbg")
		rankImg.x = 37-rankImg.width/2;
		rankImg.y = 20;
		this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x + rankImg.width/2 - rankTxt.width/2;
		rankTxt.y = rankImg.y + rankImg.height/2 - rankTxt.height/2;
		this.addChild(rankTxt);
		
		let type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
		let descStr = LanguageManager.getlocal("dinnerMsgDesc",[type,data.num,data.enemy_num])
        let descTxt = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descTxt.x = 70;
        descTxt.y =  20;
        this.addChild(descTxt);


		let timeStr = LanguageManager.getlocal("dinnerMsgTime",[App.DateUtil.getFormatBySecond(data.start_time,2)]) ;
		let timeTxt = ComponentManager.getTextField(timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		timeTxt.x = descTxt.x;
        timeTxt.y =  descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);

		let score1 = data.point;
		let score2 = data.score;
		if(score1 >= 0){
			score1 = "+" + score1; 
		}
		if(score2 >= 0){
			score2 = "+" + score2; 
		}

		let scoreStr = LanguageManager.getlocal("dinnerMsgInfo",[score1,score2]);
		let scoreTxt = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		scoreTxt.x = descTxt.x;
		scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y =  timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
		

        let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);

	}

	public dispose():void
    {
        super.dispose();
    }
}
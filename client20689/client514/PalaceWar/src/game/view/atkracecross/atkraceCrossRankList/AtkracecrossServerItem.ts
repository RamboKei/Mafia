class AtkracecrossServerItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = GameConfig.stageWidth;
        this.height = 40;

		let rankTxt = ComponentManager.getTextField(String(index+1),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.setPosition(GameConfig.stageWidth/2 - 155 - rankTxt.width/2, this.height/2 - rankTxt.height/2);
        this.addChild(rankTxt);
       
        let nameTxt = ComponentManager.getTextField(data.zid+LanguageManager.getlocal("serverListServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = GameConfig.stageWidth/2 - nameTxt.width/2;
        nameTxt.y =  rankTxt.y;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(String(data.point),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = GameConfig.stageWidth/2 + 155 - scoreTxt.width/2;
        scoreTxt.y =  rankTxt.y;
        this.addChild(scoreTxt);

	}

	public dispose():void
    {
        super.dispose();
    }
}
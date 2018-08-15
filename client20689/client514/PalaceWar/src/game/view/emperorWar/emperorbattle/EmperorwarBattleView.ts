class EmperorwarBattleView extends BaseBattleView
{
	private _leftHeadTab:BaseDisplayObjectContainer[] = [];
	private _rightHeadTab:BaseDisplayObjectContainer[] = [];
	private _roundText:BaseBitmapText = null;
	private _curRound:number = 1;

	private _leftMaskTab:BaseBitmap[] = [];
	private _rightMaskTab:BaseBitmap[] = [];

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"emperor_battle_lost_bg","emperor_battle_lost","emperor_battle_round","emperor_battle_top_bg","emperor_battle_win_bg","emperor_battle_win","emperor_hero_bg",
			"emperor_hero_empty","emperor_round_1","emperor_round_2","emperor_round_3","emperor_round_4","emperor_round_5",
		]);
	}

	protected getBgName():string
	{
		return "arena_bg";
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,0);
			this.addChild(this.viewBg); 
		}
	}

	protected getCloseBtnName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getTitleBgName():string
	{
		return null;
	}


	protected initView():void
	{
		this.initTopInfo();
	}

	private initTopInfo():void
	{
		let topBg:BaseBitmap = BaseBitmap.create("emperor_battle_top_bg");
		this.addChild(topBg);

		let playerHead1 = Api.playerVoApi.getPlayerCircleHead(1,"-1");
		playerHead1.setPosition(8 ,8);
		this.addChild(playerHead1);

		let playerHead2 = Api.playerVoApi.getPlayerCircleHead(1,"-1");
		playerHead2.setPosition(GameConfig.stageWidth-playerHead1.x - playerHead2.width,playerHead1.y);
		this.addChild(playerHead2);

		this._leftHeadTab.push(playerHead1);
		this._rightHeadTab.push(playerHead2);

		let maskHead1:BaseBitmap = BaseBitmap.create("public_9_bg11");
		maskHead1.width = playerHead1.width;
		maskHead1.height = playerHead1.height-10;
		maskHead1.x = playerHead1.x;
		maskHead1.y = playerHead1.y;
		this.addChild(maskHead1);

		let maskHead2:BaseBitmap = BaseBitmap.create("public_9_bg11");
		maskHead2.width = playerHead2.width;
		maskHead2.height = playerHead2.height-10;
		maskHead2.x = playerHead2.x;
		maskHead2.y = playerHead2.y;
		this.addChild(maskHead2);

		this._leftMaskTab.push(maskHead1);
		this._rightMaskTab.push(maskHead2);

		for (let i = 0; i<4; i++)
		{
			let leftHeroContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			leftHeroContainer.setPosition(107 + i*45 ,8);
			this.addChild(leftHeroContainer);

			let heroBg:BaseBitmap = BaseBitmap.create("emperor_hero_bg");
			leftHeroContainer.addChild(heroBg);

			let rect = egret.Rectangle.create();
			rect.setTo(0,0,180,177);
			let servantIcon = BaseLoadBitmap.create("servant_half_1006",rect);
			servantIcon.setScale((heroBg.height-4)/servantIcon.height);
			servantIcon.setPosition(-64*servantIcon.scaleX,2);
			let mask = egret.Rectangle.create();
			mask.setTo(90-heroBg.width/2,0,(heroBg.width-4)/servantIcon.scaleX,(heroBg.height-5)/servantIcon.scaleY);
			servantIcon.mask = mask;
			leftHeroContainer.addChild(servantIcon);

			this._leftHeadTab.push(leftHeroContainer);
			
			let maskHero1:BaseBitmap = BaseBitmap.create("public_9_bg11");
			maskHero1.width = heroBg.width;
			maskHero1.height = heroBg.height;
			maskHero1.x = heroBg.x;
			maskHero1.y = heroBg.y;
			leftHeroContainer.addChild(maskHero1);
		}

		let roundBg:BaseBitmap = BaseBitmap.create("emperor_battle_round");
		roundBg.setPosition(GameConfig.stageWidth/2 - roundBg.width/2 ,0);
		this.addChild(roundBg);

		this._roundText = ComponentManager.getBitmapText("2",TextFieldConst.FONTNAME_BOSS_SCORE);
		this._roundText.setPosition(GameConfig.stageWidth/2 - this._roundText.width/2 ,45);
		this.addChild(this._roundText);

 
	}

	public dispose():void
	{
		this._leftHeadTab.length = 0;
		this._rightHeadTab.length = 0;
		this._leftMaskTab.length = 0;
		this._rightMaskTab.length = 0;
		this._roundText = null;
		this._curRound = 0;

		super.dispose();
	}
}
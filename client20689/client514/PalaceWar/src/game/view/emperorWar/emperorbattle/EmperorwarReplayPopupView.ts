

class EmperorwarReplayPopupView extends PopupView
{
    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "emphfangbg",
			"atkrace_vs",
			"atkracecross_win",
			"atkracecross_loss",
        ]);
	}

    protected initView():void
	{
		let replayBg:BaseBitmap = BaseBitmap.create("emphfangbg");
		replayBg.setPosition(this.viewBg.width/2  - replayBg.width/2, 0);
		this.addChildToContainer(replayBg);

		let vsIcon:BaseBitmap = BaseBitmap.create("atkrace_vs");
		vsIcon.setScale(130/vsIcon.width);
		vsIcon.setPosition(this.viewBg.width/2  - vsIcon.width/2*vsIcon.scaleX, replayBg.y+30);
		this.addChildToContainer(vsIcon);

		let someFight:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarSomeFight",[String(12)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		someFight.setPosition(this.viewBg.width/2  - someFight.width/2, replayBg.y+15);
		this.addChildToContainer(someFight);

		let resultIcon1:string ;
		let resultIcon2:string ;
		if ( 1==1)
		{
			resultIcon1 = "atkracecross_win";
			resultIcon2 = "atkracecross_loss";
		}
		else 
		{
			resultIcon2 = "atkracecross_win";
			resultIcon1 = "atkracecross_loss";
		}
		let result1:BaseBitmap = BaseBitmap.create(resultIcon1);
		result1.setPosition(185, replayBg.y+120);
		this.addChildToContainer(result1);

		let result2:BaseBitmap = BaseBitmap.create(resultIcon2);
		result2.setPosition(350, result1.y);
		this.addChildToContainer(result2);

		let playerHead1 = Api.playerVoApi.getPlayerCircleHead(1,"-1");
		playerHead1.setPosition(25 ,replayBg.y+35);
		this.addChildToContainer(playerHead1);

		let playerHead2 = Api.playerVoApi.getPlayerCircleHead(1,"-1");
		playerHead2.setPosition(this.viewBg.width-playerHead2.width-25 ,playerHead1.y);
		this.addChildToContainer(playerHead2);

		let playerName1:BaseTextField = ComponentManager.getTextField("12334",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		playerName1.setPosition(25, replayBg.y+140);
		this.addChildToContainer(playerName1);

		let playerName2:BaseTextField = ComponentManager.getTextField("12334",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		playerName2.setPosition(this.viewBg.width-playerName2.width-25, playerName1.y);
		this.addChildToContainer(playerName2);

		
		let rankpower1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankpower")+":"+"123",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankpower1.setPosition(replayBg.x+142-rankpower1.width/2, replayBg.y+184);
		this.addChildToContainer(rankpower1);

		let rankpower2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankpower")+":"+"123",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankpower2.setPosition(replayBg.x+replayBg.width-142-rankpower2.width/2, rankpower1.y);
		this.addChildToContainer(rankpower2);

		let popular1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular")+":"+"123",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		popular1.setPosition(replayBg.x+142-popular1.width/2,  replayBg.y+208);
		this.addChildToContainer(popular1);

		let popular2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular")+":"+"123",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		popular2.setPosition(replayBg.x+replayBg.width-142-popular2.width/2, popular1.y);
		this.addChildToContainer(popular2);

		let beat:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBeat",["123","qwe"]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		beat.width = 520;
		beat.textAlign = egret.HorizontalAlign.CENTER;
		beat.setPosition(this.viewBg.width/2-beat.width/2, replayBg.y+265);
		this.addChildToContainer(beat);

		let replayBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"emperorWarReplay",this.doReplay,this);
		replayBtn.setPosition(this.viewBg.width/2-replayBtn.width/2, beat.y+beat.height+21);
		this.addChildToContainer(replayBtn);
    }

	private doReplay():void
	{
		ViewController.getInstance().openView(ViewConst.BATTLE.EMPERORWARBATTLEVIEW,{});
	}

	protected getTitleStr():string
	{
		return "emperorWarReplay";
	}
	

	protected getBgExtraHeight():number
	{
		return 0;
	}

}
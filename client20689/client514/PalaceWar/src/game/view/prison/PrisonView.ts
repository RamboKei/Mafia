class PrisonView  extends CommonView
{
	private prisonDesBg:BaseBitmap =null;
	private prisonDesBgcorner:BaseBitmap =null;
	private punishprisoners:BaseBitmap =null;
	private _prisonerTxt:BaseTextField= null;
	private _PrisonInfoVoList:Array<any> =[];
	private _progressBar:ProgressBar =null;
	private _nameTxt:BaseTextField= null;
	private _renownTxt:BaseTextField= null;
	private _dailyoutputTxt:BaseTextField= null;
	private _prisonDesc:BaseTextField= null;
	private prisonDesTxt:BaseTextField= null;
	private prisonId:number =0;
	private _scrollContainer:BaseDisplayObjectContainer =null;

	private dailypreNum:number =0;
	private getMaxpreNum:number =0;
	private getMypreNum:number =0;
	private getPrisonInfoArr:Array<number> =[];
	private _bubbleContainer:BaseDisplayObjectContainer =null;
	private dialogueContainer:BaseDisplayObjectContainer =null;
	

	private isOpenOnekey:Boolean =false;
	private  prisonerImage:BaseBitmap =null;
	private currPrisonNumber:number=0;//当前可以惩罚的犯人数
	
	private listContainerArr = [];
	private hold_dinner_check:BaseLoadBitmap =null;
	private touchIndex:number =0;
	public static INFINITE_NUM:number =0;
	private currIcon:BaseDisplayObjectContainer =null;
	private currIconArr:Array<any> =[];
	private hold_dinner_box =null;
	private _punishmentputTxt:BaseTextField= null;
	private prisonerHeadImage:BaseBitmap =null;
	private retBoo:boolean =false;
	private nameBg:BaseBitmap =null;
	// private tokenClip:CustomMovieClip =null;
	private _PrisonPopView :PrisonPopView =null;
	private  curr_maskBmp:BaseBitmap =null;

	private _dialogueBg:BaseBitmap =null;
	private _dialogueBg2:BaseBitmap =null;
	private rewardsData:any =null;
	public  _newPrisonBoo:boolean = Api.switchVoApi.checkOpenNewPrison();
	private _hexieType:string="";
    public constructor() 
	{
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[
			"prisonview_bg",
			"prisonview_progress",
			"progress3_bg",
			"prisonview_font",
			"prisonview_redx",
			"prisonview_itembg",
			"prisonview_small_bg",
			"searchbinfowifebg",
			"prisonview_namebg",
			"prison_head1",
			"prison_head2",
			"prison_body",
			"prison_bottom",
			"tokenAnimation",
			"punish_ani1","punish_ani2","punish_ani3","punish_ani4","punish_light",
			"prisonview_bg_2",
			"prison_head1_2",
			"prison_head2_2",
			"forpeople_top",
			"prisonview_font_2",

			]);
	}
	protected getRuleInfo():string
	{
		return super.getRuleInfo()+this._hexieType;
	}
	protected getBgName():string
	{
		if(this._newPrisonBoo==false)
		{
			return "prisonview_bg";
		}
		else
		{
			return "prisonview_bg_2";
		}
	
	}
	protected getTitleStr():string
	{
		 if(this._newPrisonBoo)
		 {
			 return "prisonViewTitle_laoyiType";
		 }
		 else
		 { 
			return "prisonViewTitle";
		 }
	}
    public initView():void
	{
		Api.rookieVoApi.checkNextStep();
		
		this.refresh();
		 

		this._bubbleContainer = new BaseDisplayObjectContainer();
		this.addChild(this._bubbleContainer);

		this.dialogueContainer = new BaseDisplayObjectContainer();
		this.addChild(this.dialogueContainer);
	
	

		if(this._newPrisonBoo)
		{
			let headbg=BaseBitmap.create("forpeople_top");
			headbg.setPosition(0,-30); 
			headbg.height=108;
			this.addChildToContainer(headbg);
		}
		this._prisonerTxt =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._prisonerTxt.text = LanguageManager.getlocal("prisonerTxtDesc"+this._hexieType,[this.currPrisonNumber+"",this.getPrisonInfoArr.length+""]);
		this._prisonerTxt.setPosition(20,0);
		this.addChildToContainer(this._prisonerTxt);
	
	 
		this.showList();
		this.refreshHead();
	

		if(this.prisonId!=10)
		{	
			let progressNum:number= 410;
			let progressBar:ProgressBar=ComponentManager.getProgressBar("prisonview_progress","progress3_bg",progressNum);
			progressBar.setPosition(110,GameConfig.stageHeigth-275);
			this.addChildToContainer(progressBar);
			this._progressBar = progressBar;
			if(this.prisonId!=0)
			{
				this.showProgress();
			}
		 }


		let nameBg:BaseBitmap=BaseBitmap.create("public_infobg2");
		if(this._newPrisonBoo)
		{
			nameBg.setPosition(240,GameConfig.stageHeigth-300);
		}
		else
		{
			nameBg.setPosition(240,700);
		}
		nameBg.rotation=-90;
		this.addChildToContainer(nameBg);
		this.nameBg =nameBg;

		this._nameTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		var prisoner:string =LanguageManager.getlocal("prisonPrisoner"+this._hexieType); 
		this._nameTxt.text =prisoner+LanguageManager.getlocal(Api.prisonVoApi.getPrisonName()); 
		this._nameTxt.setPosition(nameBg.x+nameBg.width/2-this._nameTxt.width/2+40,nameBg.y-50);
		this.addChildToContainer(this._nameTxt);

		 
		//底部背景
		var bottomStr = "prison_bottom";
		let prison_bottom:BaseBitmap=BaseBitmap.create(bottomStr);
		prison_bottom.y = GameConfig.stageHeigth-220;  
		this.addChildToContainer(prison_bottom);
		
		//固定描述
		this._prisonDesc =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._prisonDesc.text = LanguageManager.getlocal("prisonDesc"+this._hexieType);
		this._prisonDesc.setPosition(50,GameConfig.stageHeigth-130);
		this.addChildToContainer(this._prisonDesc);

		//名望背景
		let public_9_bg5:BaseBitmap=BaseBitmap.create("public_9_bg5");
		public_9_bg5.width=540;
		public_9_bg5.x=	this._prisonDesc.x;
		public_9_bg5.y= GameConfig.stageHeigth-200; 
		this.addChildToContainer(public_9_bg5);

		//当前名望
		this._renownTxt =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._renownTxt.text = LanguageManager.getlocal("renownTxtDesc",[this.getMypreNum+"",this.getMaxpreNum+""]);
		this._renownTxt.setPosition(80,GameConfig.stageHeigth-190);
		this.addChildToContainer(this._renownTxt);

		//每日产出声望
		this._dailyoutputTxt =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._dailyoutputTxt.text = LanguageManager.getlocal("dailyoutputDesc",[this.dailypreNum+""]);
		this._dailyoutputTxt.setPosition(this._renownTxt.x+300,GameConfig.stageHeigth-190);
		this.addChildToContainer(this._dailyoutputTxt);
		
		if(this.getPrisonInfoArr.length>=4)
		{
			this.showOnekeypenalty();
		}

		this.showTxt();
		this.showDialogue();
		this.showDead();		

    }
	private refreshHead():void
	{
		if(this._newPrisonBoo)
		{
			this.prisonerImage=BaseBitmap.create("prison_head1_2");
			this.prisonerImage.setPosition(90,this._scrollContainer.y+202);
		}
		else
		{
			this.prisonerImage=BaseBitmap.create("prison_body");
			this.prisonerImage.setPosition(200,this._scrollContainer.y+50);
		}
	
	
		this.prisonerImage.touchEnabled =true;
		this.addChildToContainer(this.prisonerImage);
		this.prisonerImage.addTouchTap(this.touchPunishHandler,this,null);

		if(this._newPrisonBoo)
		{
			this.prisonerImage.alpha=0;  
			this.prisonerHeadImage=BaseBitmap.create("prison_head1_2");
			this.prisonerHeadImage.setPosition(80,this._scrollContainer.y+202);
			this.prisonerHeadImage.touchEnabled =false;
			this.addChildToContainer(this.prisonerHeadImage); 
		}
		else
		{
			this.prisonerImage.alpha=1;
			//囚犯头像
			this.prisonerHeadImage=BaseBitmap.create("prison_head1");
			// 255  232
			this.prisonerHeadImage.setPosition(this.prisonerImage.x+55,this.prisonerImage.y+152);
			this.addChildToContainer(this.prisonerHeadImage); 

		}
	}
	private showDead():void
	{
		//死亡状态
		if(Api.prisonVoApi.getcurrPrisonNumber()==0)
		{
			this.nameBg .visible =false;
			this.prisonerHeadImage.visible =false;
			this.prisonerImage.visible =false;
			this._nameTxt.visible =false;
			this._progressBar.visible =false;
			this.prisonDesTxt.visible =true;
			let overTxt  =ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			overTxt.text = LanguageManager.getlocal("prisondes");
			overTxt.width = this.punishprisoners.width;
			overTxt.x=245;
			overTxt.y=235;   
			this.prisonDesBg.height = overTxt.textHeight+30;
			if(this.prisonDesBg.width<200||this.prisonDesBg.height<76)
			{
				this.prisonDesBg.width=200;
				this.prisonDesBg.height =76; 
			}
			this.prisonDesBgcorner.y = this.prisonDesBg.y + this.prisonDesBg.height - 3;
			this._bubbleContainer.addChild(overTxt);
			this.punishprisoners.visible =false;
			this._bubbleContainer.visible =true;
		}
	}
	//	求饶气泡
	private showDialogue():void
	{
		var _dialogueBgStr:string = "public_9_bg42";

		//求饶文字底图
		this._dialogueBg = BaseBitmap.create(_dialogueBgStr);
		this.dialogueContainer.addChild(this._dialogueBg);
		this._dialogueBg.width = 220;
		this._dialogueBg.height = 83;
		this._dialogueBg.x=50;
		this._dialogueBg.y=300;
		
		this._dialogueBg2 = BaseBitmap.create("public_9_bg42_tail");
		this.dialogueContainer.addChild(this._dialogueBg2);
		this._dialogueBg2.scaleX =-1;
		this._dialogueBg2.x =this._dialogueBg.x+this._dialogueBg.width;
		this._dialogueBg2.y =this._dialogueBg.y+this._dialogueBg.height-5;
	
	 
		// 求饶文字
		this.prisonDesTxt =	ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this.prisonDesTxt.text = LanguageManager.getlocal("PrisonDesTxt"+App.MathUtil.getRandom(1,5)+this._hexieType);
		this.prisonDesTxt.width =this._dialogueBg.width-15;
		this.prisonDesTxt.setPosition(this._dialogueBg.x+10,this._dialogueBg.y+15);
		this.dialogueContainer.addChild(this.prisonDesTxt);
		this.dialogueContainer.visible =false;
	}
	private showOnekeypenalty():void
	{
	
		let hold_dinner_box:BaseLoadBitmap=BaseLoadBitmap.create("hold_dinner_box");
		hold_dinner_box.x=580;
		hold_dinner_box.y=GameConfig.stageHeigth-255; 
		
		this.addChildToContainer(hold_dinner_box);
		hold_dinner_box.addTouchTap(this.holdHandler,this);

     	this.hold_dinner_check=BaseLoadBitmap.create("hold_dinner_check");
		this.hold_dinner_check.x=hold_dinner_box.x;
		this.hold_dinner_check.y=hold_dinner_box.y; 
		this.addChildToContainer(this.hold_dinner_check);
		this.hold_dinner_check.visible =false;

		//一键惩罚文字
		this._punishmentputTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._punishmentputTxt.text = LanguageManager.getlocal("prisonPunishment"); 
		this._punishmentputTxt.setPosition(480,hold_dinner_box.y+8);
		this.addChildToContainer(this._punishmentputTxt);
	 
	
	}
	private holdHandler(evt:egret.TouchEvent):void
	{
		this.touchIndex+=1;
		if(this.touchIndex%2==0)
		{
			this.hold_dinner_check.visible =false;
			this.isOpenOnekey =false;
		 
		}
		else
		{
			this.hold_dinner_check.visible =true;
			this.isOpenOnekey =true;
		}
	}
	//气泡
	public showTxt():void
	{
		var str = "public_9_bg25";
		
		this.prisonDesBg = BaseBitmap.create(str); 
		this.prisonDesBg.y = 220; 
		this.addChildToContainer(this.prisonDesBg);
		this._bubbleContainer.addChild(this.prisonDesBg);
		
		this.prisonDesBg.width = 200;
		this.prisonDesBg.height = 76;
		this.prisonDesBg.x = 230;
		this.prisonDesBgcorner = BaseBitmap.create("public_9_bg25_tail");
		this.prisonDesBgcorner.x = this.prisonDesBg.x;
		this.prisonDesBgcorner.y = this.prisonDesBg.y + this.prisonDesBg.height - 3;
		this.addChildToContainer(this.prisonDesBgcorner);
		this._bubbleContainer.addChild(this.prisonDesBgcorner);  
		
		if(this._newPrisonBoo)
		{
			this.prisonDesBgcorner.scaleX=-1;
			this.prisonDesBgcorner.x =this.prisonDesBg.x+this.prisonDesBg.width/2+this.prisonDesBgcorner.width/2;
		}
		
		//美术字体，点击犯人
		if(this._newPrisonBoo)
		{
			this.punishprisoners= BaseBitmap.create("prisonview_font_2");
		}
		else
		{
			this.punishprisoners= BaseBitmap.create("prisonview_font");
		}
		
		this.punishprisoners.x= this.prisonDesBg.x+18;
		this.punishprisoners.y= this.prisonDesBg.y+this.prisonDesBg.height/4;
		this.addChildToContainer(this.punishprisoners);
		this._bubbleContainer.addChild(this.punishprisoners); 

		let currY:number =this._scrollContainer.y+50-130;
		if(this._newPrisonBoo)
		{
			currY=this._scrollContainer.y+50-100;
		}
		this._bubbleContainer.y =currY;

		//上下浮动
		let moveCall:()=>void=()=>
		{
			egret.Tween.get(this._bubbleContainer).to({y:currY+5},1000).to({y:currY-5},1000).call(moveCall,this);
		};
		moveCall();

		var num =this.getChildIndex (this._bubbleContainer);
		if(this.curr_maskBmp)
		{
			this.setChildIndex(this.curr_maskBmp,num+1);
		}
	

	}
	public clearListContainerArr():void
	{
		for(var i:number=this.listContainerArr.length;i>=0;i--)
		{
			if(this.listContainerArr[i]&&this.listContainerArr[i].parent)
			{
				this.listContainerArr[i].parent.removeChild(this.listContainerArr[i]);
				this.listContainerArr.splice(i,1);
			}
		}
		this.listContainerArr =[];
	}
	
	public touchPunishHandler(event:egret.TouchEvent):void
	{
		
		// this._bubbleContainer.visible =false;
		// --参数 prisonId 囚犯id  isbatch 1一键惩罚
		//   this.prisonId=0
		this.getMypreNum =0;
		this.getMypreNum =Api.prisonVoApi.getMypre();

		this.prisonerImage.touchEnabled=false;
		if(this.prisonId!=0)
		{
			var PrisonItemCfg =Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
		}
		if(PrisonItemCfg)
		{
			if(this.getMypreNum>=PrisonItemCfg.cost)
			{
			

				let isbatch=0;
				if(this.isOpenOnekey)
				{
					isbatch=1;
				}
				else
				{
					isbatch=0;
				}
				NetManager.request(NetRequestConst.REQUEST_PRISON_PUNISH, { "prisonId": this.prisonId+"", "isbatch":isbatch });
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
		
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("prison_token"));
				this.prisonerImage.touchEnabled=true;
			}
		}
	}

	private playAnimation():void
	{
		//播放动画 tokenAnimation
		SoundManager.playEffect(SoundConst.EFFECT_PRISON_HIT);
		// this.tokenClip = ComponentManager.getCustomMovieClip("tokenAnimation",4,150);
		// this.tokenClip.x = 260;
		// this.tokenClip.y = 320;
		// this.tokenClip .playWithTime(1);
		// this.addChild(this.tokenClip);
		// this.tokenClip.setEndCallBack(this.clipCallback,this);
		let rnd =  App.MathUtil.getRandom(1,4);
		let container = new BaseDisplayObjectContainer();
		let aniBB: BaseBitmap = BaseBitmap.create("punish_ani" + rnd );
        container.setScale(2.5);
        this.addChildToContainer(container);
		container.addChild(aniBB)

		container.anchorOffsetX = container.width/2;
        container.anchorOffsetY = container.height/2;
        let posX = [280,320,280,340];
        let posY = [400,400,380,440];
        container.x = posX[rnd-1];
        container.y = posY[rnd-1];

		egret.Tween.get(container).to({scaleX:1,scaleY:1},200).call(function(m:BaseDisplayObjectContainer){
		if(m)
		{
			this.nextAni2(m);
			this.clipCallback();
		}
        }.bind(this,container),this);

	}
	private nextAni2(m:any)
	{
		let aniBB: BaseBitmap = BaseBitmap.create("punish_light");
		m.addChildAt(aniBB,0)
		egret.Tween.removeTweens(m);
		egret.Tween.get(m).wait(200).to({alpha:0},500).call(function(m:BaseDisplayObjectContainer){
            if(m)
            {
                egret.Tween.removeTweens(m);
                m.dispose();
				
            }
        }.bind(this,m),this);
	}
	private clipCallback():void
	{
	
		// egret.Tween.get(this.tokenClip).to({alpha:0},1000).call(this.onComplete2,this);
		if(this.retBoo)
		{	
			if(this._newPrisonBoo)
			{
				this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head2_2");
			}
			else
			{
				this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head2");
			}
		
			if(this.prisonDesTxt)
			{
				this.prisonDesTxt.text = LanguageManager.getlocal("PrisonDesTxt"+App.MathUtil.getRandom(1,5),);
			}
			if(	this._bubbleContainer)
			{
				this._bubbleContainer.visible =false;
			}
			if(this.dialogueContainer)
			{
				this.dialogueContainer.visible =true;
			}
	
			if(this.rewardsData)
			{
				App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(this.rewardsData.rewards));
				this.showRewards(this.rewardsData);
			}
		}
	}
	private onComplete2():void
	{
		// if(this.tokenClip&&this.tokenClip.parent)
		// {	
		
		// 	this.tokenClip.parent.removeChild(this.tokenClip);
		// 	this.tokenClip.dispose();
			
		// }
	}
	private death:boolean =false;
	public useCallback(event: egret.Event): void {		
	    App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
		
		//跨天处理
		if(event.data.data.ret==0&&event.data.data.data.prisonFlag ==true)
		{	
			let ths =this;
			ths.prisonerImage.visible =true;
			ths.prisonerHeadImage.visible =true; 
			 if(ths._nameTxt)
			 {
				 ths._nameTxt.visible =true;
			 }
			 if(ths.nameBg)
			 {
				ths.nameBg.visible =true;
			 } 
			ths.refresh(); 

			ths.death =false;
			this.restPrisonView(); 
			if(this.prisonId!=10)
			{
				let progressBar:ProgressBar=ComponentManager.getProgressBar("prisonview_progress","progress3_bg",410);
				progressBar.setPosition(110,GameConfig.stageHeigth-275);
				this.addChildToContainer(progressBar);
				this._progressBar = progressBar;
				if(this.prisonId!=0)
				{
					this.showProgress();
				}
			 }
			return
		}
		else if (event.data.ret == true) 
		{
			this.rewardsData=event.data.data.data;
			
			this.retBoo =true;
			
			if(this._newPrisonBoo)
			{
				this.clipCallback();
			}else
			{
				this.playAnimation();	
			}

			let ths=this;	
		
			// this.clipCallback();
			let timerNum2:number =egret.setTimeout(()=> 
			{
				if(!ths.isInit())
				{
					egret.clearTimeout(timerNum2);
					return;
				}
			// 死亡
			if(this.prisonId!=0&&Api.prisonVoApi.getIndexPrisonNum(this.prisonId)==0)
			{
				this.death =true;
				this.prisonerImage.visible =false;
				this.prisonerHeadImage.visible =false;
				this._nameTxt.visible =false;
				this._progressBar.visible =false;
				this.nameBg.visible =false;
				this.dialogueContainer.visible =false;
				
				let timerNum:number =egret.setTimeout(()=> 
				{
					if(!ths.isInit())
					{
						egret.clearTimeout(timerNum);
						return;
					}
					//最后一个犯人的时候
					if(ths.currPrisonNumber<=1&&event.data.prisonFlag!=true)
					{
						ths.refresh();
						ths.prisonDesTxt.visible =true;
						let overTxt  =ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
						overTxt.text = LanguageManager.getlocal("prisondes");
						overTxt.width = this.punishprisoners.width;
						overTxt.x=245;
						overTxt.y=235;
						this._bubbleContainer.addChild(overTxt);
						this.prisonDesBg.width = overTxt.textWidth;
						this.prisonDesBg.height = overTxt.textHeight;
						if(this.prisonDesBg.width<200||this.prisonDesBg.height<76)
						{
							this.prisonDesBg.width=200;
							this.prisonDesBg.height =76; 
						}
									
						ths.punishprisoners.visible =false;
						this._bubbleContainer.visible =true;

					}else
					{	 
						ths.prisonerImage.visible =true;
						ths.prisonerHeadImage.visible =true;
						if(this._newPrisonBoo)
						{
							ths.prisonerHeadImage.texture =ResourceManager.getRes("prison_head1_2");
						}
						else
						{
							ths.prisonerHeadImage.texture =ResourceManager.getRes("prison_head1");
						}
						
						ths._nameTxt.visible =true;
						ths._progressBar.visible =true;
						ths.nameBg.visible =true;
						ths.refresh();
					}
				},ths, 1300,1);
			}
			else
			{   	
				ths.death =false;
				ths.refresh();	 
			}
			},ths, 800,1);
		} 
		else
		{
			this.retBoo =false;
		}
	}
 
	private showRewards(data:any):void
	{
			this.currIconArr=[];
			let contentList:Array<RewardItemVo> =GameData.formatRewardItem(data.rewards);
			for(var i:number =0;i<contentList.length;i++)
			{
				let icon = GameData.getItemIcon(contentList[i],true);
				icon.anchorOffsetX=icon.width/2;
				icon.anchorOffsetY=icon.height/2;
				icon.scaleX=0.5;
				icon.scaleY=0.5;
				icon.x= 300;
				icon.y= GameConfig.stageHeigth/2-70;
				this.addChild(icon);
				App.DisplayUtil.addFactorFunc(BaseDisplayObjectContainer);
			    let currX = App.MathUtil.getRandom(500);
				if(this._newPrisonBoo)
				{
					icon.y= GameConfig.stageHeigth-300;
					icon.x= 180; 
				 	icon["tweenMoveList"]=[egret.Point.create(icon.x,icon.y),egret.Point.create(currX,400),egret.Point.create(currX,900)];
				}
				else
				{
				 	icon["tweenMoveList"]=[egret.Point.create(icon.x,icon.y),egret.Point.create(currX,200),egret.Point.create(currX,800)];
				}
			
				egret.Tween.get(icon).to({}).call(this.onComplete,this,[icon]);
				this.addChild(icon);
				this.currIconArr.push(icon);

		}
	}


	private onComplete(icon:BaseDisplayObjectContainer=null):void
	{
	    	let l=this.currIconArr.length;
			for(var i:number=l-1;i>=0;i--)
			{
				egret.Tween.removeTweens(this.currIconArr[i]);
				egret.Tween.get(this.currIconArr[i]).wait(100).to({factor:1},700).call(function(icon:BaseDisplayObjectContainer){
					
					let timerNum:number =egret.setTimeout(()=> 
					{
						if(!this.isInit())
						{
							egret.clearTimeout(timerNum);
							return;
						}
						this.restPrisonView();
						icon.dispose();
						icon["tweenMoveList"]=undefined;
						this.currIconArr.splice(i,1);
					},this, 800);
								
				}.bind(this,this.currIconArr[i]));
			}
	}
	private restPrisonView():void
	{
		if(!this.death)
		{	
			if(this.dialogueContainer)
			{
				this.dialogueContainer.visible =true;
			}
			if(this.prisonerHeadImage)
			{
				if(this._newPrisonBoo)
				{
					this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1_2");
				}
				else
				{
					this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1");
				}
			
			}
			if(this.prisonerImage)
			{
				this.prisonerImage.visible =true;
			}
		}
		
		if(this._bubbleContainer)
		{
			this._bubbleContainer.visible =true;
		}
		if(this.dialogueContainer)
		{
			this.dialogueContainer.visible =false;
		}
		if(this.prisonDesTxt)
		{
			this.prisonDesTxt.text ="";
		}
		if(this.prisonerImage)
		{
			this.prisonerImage.touchEnabled=true;
		}
	}
	
	private getRandom():number
	{
		return App.MathUtil.getRandom(100,540);
	}

	//显示头像列表
	private showList():void
	{
		this.clearListContainerArr();
		
		this._scrollContainer=null;
		this._scrollContainer = new BaseDisplayObjectContainer();
		for(var i:number=0;i<this.getPrisonInfoArr.length;i++)
		{
			var prisonHeadView:PrisonHeadView = new PrisonHeadView();
			prisonHeadView.showHead(i,this.getPrisonInfoArr[i]);
			prisonHeadView.x= 80*i+4;
			this.listContainerArr.push(prisonHeadView);
			this._scrollContainer.addChild(prisonHeadView);
		}
		
		this.addChild(this._scrollContainer);
		let rect2:egret.Rectangle=egret.Rectangle.create();
		rect2.setTo(120,-10,470,400);
		let scrollView = ComponentManager.getScrollView(this._scrollContainer,rect2);
		if(this.getPrisonInfoArr.length>=6&&this.prisonId>6)
		{
			scrollView.setScrollLeft(500);
		}

		this.addChildToContainer(scrollView);
		this._scrollContainer.setPosition(30, 30);
		this.listContainerArr.push(scrollView);
	}
	public showProgress ():void
	{
	
			if(this.prisonId!=0&&this.prisonId!=10)
			{
				var currPrisonItemCfg =Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
				var currpunishment:number = Api.prisonVoApi.getIndexPrisonNum(this.prisonId);
				var percent:number = 0;
				percent =(currpunishment)/currPrisonItemCfg.num;
				var outPut:string =	LanguageManager.getlocal("prisonOutput")+": ";
				this._progressBar.setPercentage(percent,outPut+ Math.floor(percent*100)+"%");
			}
			else
			{
				if(this._progressBar&&this._progressBar.parent)
				{
					this._progressBar.parent.removeChild(this._progressBar);
					this._progressBar.dispose();
					this._progressBar =null;
				}			
		}
	}
	private refresh():void
	{
		this.retBoo =false;
		this.dailypreNum = Api.prisonVoApi.getDailypre();
		this.getMaxpreNum= Api.prisonVoApi.getMaxpre();
		this.getMypreNum= Api.prisonVoApi.getMypre();
		this.getPrisonInfoArr =Api.prisonVoApi.getPrisonInfo();
		this.prisonId = Api.prisonVoApi.getCurrPrisonId();
		this.currPrisonNumber = Api.prisonVoApi.getcurrPrisonNumber();
		
		if(this.prisonId!=0)
		{
			var currpunishment:number = Api.prisonVoApi.getIndexPrisonNum(this.prisonId);
			var currPrisonItemCfg =Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
			var percent:number =((currpunishment)/currPrisonItemCfg.num);
		}
		
		if(percent==1)
		{	
			if(Api.rookieVoApi.isGuiding)
			{
				return
			}
			this.drawblackMask();
			if(PrisonView.INFINITE_NUM==0&&this.prisonId==1)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.PRISONPOPVIEW);		
			}
			else
			{	
				ViewController.getInstance().openView(ViewConst.POPUP.PRISONPOPVIEW);
			}
			this._PrisonPopView = <PrisonPopView>ViewController.getInstance().getView(ViewConst.POPUP.PRISONPOPVIEW);
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_BLACKPANEL,this._closeHandler,this);
		}
		

		if(this._renownTxt)
		{
			this._renownTxt.text = LanguageManager.getlocal("renownTxtDesc",[this.getMypreNum+"",this.getMaxpreNum+""]);
		}
		if(this._progressBar)
		{
			this.showProgress();
		}
		if(	this._prisonerTxt)
		{
			this._prisonerTxt.text = LanguageManager.getlocal("prisonerTxtDesc"+this._hexieType,[this.currPrisonNumber+"",this.getPrisonInfoArr.length+""]);
		}

		if(this._nameTxt)
		{	
			var prisoner:string =LanguageManager.getlocal("prisonPrisoner"+this._hexieType); 
			this._nameTxt.text =prisoner+ LanguageManager.getlocal(""+Api.prisonVoApi.getPrisonName()); 
		}
		this.showList();
	}

	 private drawblackMask():void
    {
        this.curr_maskBmp= BaseBitmap.create("public_9_viewmask");
		this.curr_maskBmp.width=GameConfig.stageWidth;
		this.curr_maskBmp.height=GameConfig.stageHeigth;
		this.curr_maskBmp.touchEnabled = true;
		this.curr_maskBmp.addTouchTap(this.closePrisonHead,this);
		this.addChild(this.curr_maskBmp);
	
    }
	private closePrisonHead():void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_POPUPVIEW); 
	}

	private _closeHandler():void
	{
		if(this.curr_maskBmp&&this.curr_maskBmp.parent)
		{
			this.removeChild(this.curr_maskBmp);
			this.curr_maskBmp =null;
		}
		
		if(	this._PrisonPopView!=null)
		{
			this._PrisonPopView.removeEventListener("closeEvent",this._closeHandler,this);
		}
	}
	
	protected getShowHeight():number
	{
		return 200;
	}
	
	public dispose(): void {
	
		 
		PrisonView.INFINITE_NUM =0;
		this.touchIndex =0;
		this.prisonDesBg =null;
		this.prisonDesBgcorner =null;
		this.punishprisoners =null;
		this._prisonerTxt= null;
		this._PrisonInfoVoList=[];
		this._progressBar =null;
		this._nameTxt= null;
		this._renownTxt= null;
		this._dailyoutputTxt= null;
		this._prisonDesc= null;
		this.prisonId =0;
		this.dailypreNum =0;
		this.getMaxpreNum =0;
		this.getMypreNum=0;
		this.getPrisonInfoArr=[];
		this.isOpenOnekey=false;
		this.prisonerHeadImage =null;
		
	    this.prisonerImage.removeTouch();
		this._scrollContainer.dispose();
		this._PrisonInfoVoList =[];
		this._scrollContainer =null;
		this._bubbleContainer.dispose();
		this._bubbleContainer= null;
		this.prisonerImage =null;
		this.getPrisonInfoArr =[];
		this.currIconArr =[];
		this._punishmentputTxt =null;
		this.curr_maskBmp =null;
		this.dialogueContainer = null;
		this.rewardsData =null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_BLACKPANEL,this._closeHandler,this);
		super.dispose();
	}
}
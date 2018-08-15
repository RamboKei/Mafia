class SearchView extends CommonView
{
	private _sceneLayer:BaseDisplayObjectContainer;
	private _mapLayer:BaseBitmap;
	private _npcList:string[]=[];
	private _leftText:BaseTextField;
	private _searchBtn:BaseButton;
	private _buyBtn:BaseButton;
	private _personId:string;
	private _rewards:string;
	private _bgResGroupName:string;
	private _isbgResLoaded:boolean=false;
	private _luckProgress:ProgressBar;
	private _checkBox:CheckBox;
	private _isCfgInit:boolean=false;
	private buildBgCfg:Object={};
	private cheCfg:{x:number,y:number}[]=[];
	private posCfg:Object={};
	private namePosCfg:Object={};
	private _oneKeySearchStatus:boolean=false; //这个不需要关闭清除
	public constructor() 
	{
		super();
	}

	private initCfg():void
	{
		if(this._isCfgInit==false)
		{
			let curCfg=Config.SceneCfg.getSceneCfgBySceneName("searchScene");
			this._isCfgInit=true;
			if(curCfg)
			{
				if(curCfg.posCfg)
				{
					this.posCfg=curCfg.posCfg;
				}
				if(curCfg.namePosCfg)
				{
					this.namePosCfg=curCfg.namePosCfg;
				}
				if(curCfg.cheCfg)
				{
					this.cheCfg=curCfg.cheCfg;
				}
				if(curCfg.buildBgCfg)
				{
					this.buildBgCfg=curCfg.buildBgCfg;
				}
			}
		}
	}

	protected initView():void
	{	
		this.initCfg();
		Api.rookieVoApi.checkNextStep();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SEARCH,this.refreshByModel,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this.container.y=0;
		let sceneTopSpaceY:number=105;
		this._sceneLayer=new BaseDisplayObjectContainer();
		this.addChildToContainer(this._sceneLayer);
		let playerInfo:MainUITop = new MainUITop({showName:false});
		playerInfo.y=this.getTitleButtomY();
		this.addChildToContainer(playerInfo);

		let buttomBg:BaseBitmap=BaseBitmap.create("common_buttombigbg");
		// buttomBg.width=GameConfig.stageWidth;
		// buttomBg.height=96;
		buttomBg.touchEnabled=true;
		buttomBg.setPosition(0,GameConfig.stageHeigth-this.container.y-buttomBg.height);
		this.addChildToContainer(buttomBg);

		let luckText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuck")+LanguageManager.getlocal("syscolonDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		luckText.setPosition(20,buttomBg.y+25);
		this.addChildToContainer(luckText);

		let luckProgress:ProgressBar=ComponentManager.getProgressBar("progress3","progress3_bg",300);
		luckProgress.setPosition(luckText.x+luckText.width,luckText.y+(luckText.height-luckProgress.height)/2);
		this.addChildToContainer(luckProgress);
		let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
		luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		this._luckProgress=luckProgress;

		let addLuckBtn:BaseButton=ComponentManager.getButton("button_add1","",this.openLuckView,this);
		addLuckBtn.setPosition(luckProgress.x+luckProgress.width+5,luckProgress.y+(luckProgress.height-addLuckBtn.height)/2);
		this.addChildToContainer(addLuckBtn);

		let leftText:BaseTextField=ComponentManager.getTextField(Api.searchVoApi.getSearchNumLocalStr(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		leftText.setPosition(luckText.x,buttomBg.y+buttomBg.height-leftText.height-25);
		this.addChildToContainer(leftText);
		this._leftText=leftText;

		if(!Api.searchVoApi.checkOneKey())
		{
			let oneKeyTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckUnlockDesc",[Api.searchVoApi.getOneKeyNeedVipLevel().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			oneKeyTxt.setPosition(luckProgress.x+luckProgress.width/2,leftText.y);
			oneKeyTxt.name="onekeyTxt";
			this.addChildToContainer(oneKeyTxt);
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
		}
		else
		{
			let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
			checkBox.setPosition(luckProgress.x+luckProgress.width/2+60,leftText.y+(leftText.height-checkBox.height)/2);
			checkBox.name="onekeyCheckBox"
			this.addChildToContainer(checkBox);
			checkBox.setSelected(this._oneKeySearchStatus);
			this._checkBox=checkBox;
		}

		let searchBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,this.getTitleStr(),this.lookforHandler,this);
		searchBtn.setPosition(GameConfig.stageWidth-searchBtn.width-30,App.CommonUtil.getCenterY(buttomBg,searchBtn,false));
		this.addChildToContainer(searchBtn);
		this._searchBtn=searchBtn;

		let buyBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"recoverLeftBtn",this.recoverLeftHandler,this);
		buyBtn.setPosition(searchBtn.x,searchBtn.y);
		this.addChildToContainer(buyBtn);
		this._buyBtn=buyBtn;
		if(Api.searchVoApi.getSearchNum()>0)
		{
			searchBtn.visible=true;
			buyBtn.visible=false;
		}
		else
		{
			searchBtn.visible=false;
			buyBtn.visible=true;
		}
		
		let sceneButtomSpaceY:number=buttomBg.height;

		if(!this._sceneLayer)
		{
			this._sceneLayer=new BaseDisplayObjectContainer();
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-this.container.y-sceneTopSpaceY-sceneButtomSpaceY);
		if(!this._mapLayer)
		{
			this._mapLayer=BaseBitmap.create("searchbg1");
			let mapY:number=GameConfig.stageHeigth-this._mapLayer.height+50;
			mapY=Math.min(0,mapY);
			this._mapLayer.setPosition(0,mapY);
			this._sceneLayer.addChild(this._mapLayer);
		}

		// this._sceneLayer.y=GameConfig.stageHeigth-this._sceneLayer.height-this.container.y;
		this.initNPC();
		this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null,true);
		this._bgResGroupName = ResourceManager.loadResources(["search_che","searchbuildbg1","searchbuildbg2","searchbuildbg3"],[],this.cheLoadCompleteHandler,null,this);
	}

	private refreshByModel():void
	{
		if(this._luckProgress)
		{
			let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
			this._luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		}
	}

	private checkOnekeySearchHandler():void
	{
		if(Api.searchVoApi.checkOneKey())
		{
			if(this.container)
			{
				let onekeyTxt:BaseTextField=<BaseTextField>this.container.getChildByName("onekeyTxt");
				if(onekeyTxt)
				{
					onekeyTxt.dispose();
				}
				if(!this._checkBox)
				{
					let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
					checkBox.setPosition(this._luckProgress.x+this._luckProgress.width/2+60,this._leftText.y+(this._leftText.height-checkBox.height)/2);
					checkBox.name="onekeyCheckBox";
					this.addChildToContainer(checkBox);
					checkBox.setSelected(this._oneKeySearchStatus);
					this._checkBox=checkBox;
				}
				App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
			}
		}
	}

	private cheLoadCompleteHandler():void
	{
		this._isbgResLoaded=true;
		let che:CustomMovieClip=ComponentManager.getCustomMovieClip("search_che",6,100);
		this._sceneLayer.addChildAt(che,this._sceneLayer.getChildIndex(this._mapLayer)+1);
		che.setPosition(this._mapLayer.x+this.cheCfg[0].x,this._mapLayer.y+this.cheCfg[0].y);
		let time=9000;
		egret.Tween.get(che,{loop:true}).call(function(che:CustomMovieClip){che.scaleX=1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[1].x,y:this._mapLayer.y+this.cheCfg[1].y},time).call(function(che:CustomMovieClip){che.scaleX=-1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[2].x,y:this._mapLayer.y+this.cheCfg[2].y},time).wait(1000);
		che.texture=ResourceManager.getRes("search_che1");
		che.anchorOffsetX=che.width/2;
		che.anchorOffsetY=che.height/2;
		che.play();
		let cheIndex:number=this._sceneLayer.getChildIndex(che)+1;
		for(let key in this.buildBgCfg)
		{
			let bmp:BaseLoadBitmap=BaseLoadBitmap.create("searchbuildbg"+key);
			bmp.setPosition(this._mapLayer.x+this.buildBgCfg[key].x,this._mapLayer.y+this.buildBgCfg[key].y);
			this._sceneLayer.addChildAt(bmp,cheIndex);
			// 524,141
		}
	}

	private initNPC():void
	{
		for(var key in this.posCfg)
		{
			let {x,y,scale,close,alpha}=<{x:number,y:number,scale?:number,alpha?:number,close?:boolean}>this.posCfg[key];
			this._npcList.push(key);
			let npc:BaseLoadBitmap=undefined;
			npc=BaseLoadBitmap.create("searchnpc"+key);
			npc.name=key;
			// npc.addTouch(this.touchNpcHandler,this,[key]);
			if(!isNaN(scale))
			{
				npc.setScale(scale);
			}
			if(!isNaN(alpha))
			{
				npc.alpha=alpha;
			}
			npc.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
			this._sceneLayer.addChild(npc);
		}
		for(var key in this.namePosCfg)
		{
			let {x,y,scale,close}=<{x:number,y:number,scale?:number,close?:boolean}>this.namePosCfg[key];
			this._npcList.push(key);
			let npcName:BaseLoadBitmap=undefined;
			npcName=BaseLoadBitmap.create("searchnpcname"+key);
			npcName.name=key+"name";
			npcName.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
			if(scale)
			{
				npcName.setScale(scale);
			}
			this._sceneLayer.addChild(npcName);
			if(close)
			{
				App.DisplayUtil.changeToGray(npcName);
			}
			else
			{
				let nameY:number=npcName.y;
				let moveCall:()=>void=()=>{
					egret.Tween.get(npcName).to({y:nameY+5},1000).to({y:nameY-5},1000).call(moveCall,this);
				};
				moveCall();
			}
		}
		// this._sceneLayer.touchEnabled=true;
		let ths=this;
	}

	private recoverLeftHandler():void
	{
		let itemId:string=Api.searchVoApi.getNeedItem();
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		// if(hasNum>0)
		// {
			// ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{itemId:itemId,callback:this.usePropHandler,handler:this});
			let itemUseCount = 1;
			let itemCount = hasNum;
			// let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(Config.ChildbaseCfg.needItem));
			// let itemName = Config.ItemCfg.getItemNameById(Config.ChildbaseCfg.needItem)
			let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
			let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" +itemUseCount, LanguageManager.getlocal("sysStrengDesc")]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.usePropHandler, handler: this, icon: itemCfg.icon,iconBg: itemCfg.iconBg, num: itemCount, useNum:itemUseCount,msg: message, id : Number(itemId)});
		// }
		// else
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
		// }
	}
	private usePropHandler(num:number):void
	{
		let itemId:string=Api.searchVoApi.getNeedItem();
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		if(hasNum>0)
		{
			this.request(NetRequestConst.REQUEST_SEARCH_PILL,{});
		}
	}

	private _clickNpc:BaseBitmap;
	private onNPCTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
		{
			return;
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			let hitKey:string=null;
			for(var key in this._npcList)
			{
				let b=this._sceneLayer.getChildByName(this._npcList[key]);
				let p = this._sceneLayer.globalToLocal(e.stageX,e.stageY);
				let hitMaxY:number=-9999;
				if(b.hitTestPoint(Math.floor(e.localX),Math.floor(e.localY),true))
				{
					//处理点击逻辑
					// alert(this._npcList[key]);
					if(b.y>hitMaxY)
					{
						hitMaxY=b.y;
						hitKey=this._npcList[key];
					}
				}
			}
			let clickNpc:BaseBitmap=null;
			if(hitKey)
			{
				if(hitKey.indexOf("name")>-1)
				{
					hitKey=hitKey.substring(0,hitKey.indexOf("name"));
				}
				this._clickNpc=<BaseBitmap>this._sceneLayer.getChildByName(hitKey);
			}
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			if(this._clickNpc)
			{
				if(this.posCfg[this._clickNpc.name].touchDown===false)
				{}
				else
				{
					this._clickNpc.alpha=0.3;
				}
			}
		}
		else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
			if(this._clickNpc)
			{
				if(this.posCfg[this._clickNpc.name].touchDown===false)
				{}
				else
				{
					this._clickNpc.alpha=0;
				}
				this._clickNpc=null;
			}
		}
		if(e.type==egret.TouchEvent.TOUCH_END)
		{
			if(this._clickNpc)
			{
				if(this._clickNpc)
				{
					if(this.posCfg[this._clickNpc.name].touchDown===false)
					{}
					else
					{
						this._clickNpc.alpha=0;
					}
				}
				let hitKey=this._clickNpc.name;
				if(hitKey)
				{
					if(this.posCfg[hitKey].close)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
					}
					else
					{
						ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBUILDPOPUPVIEW,hitKey);

					}
				}
				this._clickNpc=null;
			}
		}
	}

	private lookforHandler():void
	{
		if(this._checkBox)
		{
			this._oneKeySearchStatus=this._checkBox.checkSelected();
		}
		this.request(NetRequestConst.REQUEST_SEARCH_PLAY,{isbatch:this._oneKeySearchStatus?1:0});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_SEARCH_PLAY)
		{
			let personIds:string[]=rData.data.personId;
			if(personIds.length>1)
			{
				this._rewards=rData.data.rewards;
				let rewardStrArr:string[]=this._rewards?this._rewards.split("|"):[];
				if(rewardStrArr.length<1)
				{
					for(let ii:number=0;ii<personIds.length;ii++)
					{
						rewardStrArr.push("");
					}
				}
				let l:number=rewardStrArr.length;
				let rewardsShowArr:string[]=[];
				for(let i:number=0;i<l;i++)
				{
					if(rewardStrArr[i]=="")
					{
						let localStr:string=Api.searchVoApi.getPersonValueLocalStr(personIds[i]);
						if(localStr)
						{
							rewardsShowArr.push(App.StringUtil.formatStringColor(localStr,TextFieldConst.COLOR_WARN_YELLOW));
						}
					}
					else
					{
						if(rewardStrArr[i].indexOf(RewardItemConst.TYPE_INTIMACY.toString())==0)
						{
							let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
							if(itemCfg&&itemCfg.wifeId)
							{
								rewardsShowArr.push(App.StringUtil.formatStringColor(Config.WifeCfg.getWifeCfgById(itemCfg.wifeId).name+GameData.formatRewardItem(rewardStrArr[i])[0].message,TextFieldConst.COLOR_WARN_GREEN));
							}
						}
						else
						{
							let rewardItem:RewardItemVo=GameData.formatRewardItem(rewardStrArr[i])[0];
							if(!rewardItem.num)
							{
								let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
								rewardsShowArr.push(LanguageManager.getlocal("searchBuildTalk"+itemCfg.build));
							}
							else
							{
								rewardsShowArr.push(rewardItem.message);
							}
						}
					}
				}
				this.playRewardTip(rewardsShowArr);
			}
			else
			{
				this._personId=rData.data.personId[0];
				this._rewards=rData.data.rewards;
				// this._scrollView.addEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
				this.container.touchChildren=false;
				let buildId=Config.SearchCfg.getPersonItemCfgByPersonId(this._personId).build;
				let build:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(String(buildId));
				// this._scrollView.setScrollLeft(build.x+build.width/2-320,1000);
				this.moveCompleteHandler();
			}
		}
		else if(rData.cmd==NetRequestConst.REQUEST_SEARCH_PILL)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
		}
		this.refresh();
	}

	private _tipTipTimeOut:number=-1;
	private _tipMask:BaseBitmap;
	private playRewardTip(str:string[]):void
	{
		if(!this._tipMask)
		{
			this._tipMask = BaseBitmap.create("public_9_bg8");
			this._tipMask.width=GameConfig.stageWidth;
			this._tipMask.height=GameConfig.stageHeigth;
			this._tipMask.touchEnabled=true;
			LayerManager.msgLayer.addChild(this._tipMask);
		}
		//一键寻访奖励飘字
		let strArr:string[]=str;
		let offY:number=200;
		let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let tipBg:BaseBitmap=BaseBitmap.create("public_itemtipbg2");
		tipContainer.addChild(tipBg);

		let tipTxt:BaseTextField=ComponentManager.getTextField(strArr.shift(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		tipBg.width=tipBg.width+tipTxt.width;
		tipTxt.setPosition((tipBg.width-tipTxt.width)/2,(tipBg.height-tipTxt.height)/2);
		tipContainer.addChild(tipTxt);

		tipContainer.setPosition((GameConfig.stageWidth-tipContainer.width)/2,(GameConfig.stageHeigth-tipContainer.height)/2+offY);
		LayerManager.msgLayer.addChild(tipContainer);
		if(this._tipMask["count"]==null)
		{
			this._tipMask["count"]=0;
		}
		this._tipMask["count"]++;
		let ths=this;
		egret.Tween.get(tipContainer).to({y:tipContainer.y-offY*2},3000).call(function(tipContainer:BaseDisplayObjectContainer){
			if(tipContainer)
			{
				tipContainer.dispose();
			}
			if(ths._tipMask)
			{
				ths._tipMask["count"]--;
				if(!ths._tipMask["count"])
				{
					BaseBitmap.release(ths._tipMask);
					ths._tipMask=null;

					let rData = Api.wifeVoApi.getWaitShowWife();
					if(rData){
						
						ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
					}

				}
			}
		},this,[tipContainer]);
		if(this._tipTipTimeOut<0)
		{
			this._tipTipTimeOut=egret.setInterval(this.playRewardTip,this,300,strArr);
		}
		if(strArr.length<1)
		{
			if(this._tipTipTimeOut>-1)
			{
				egret.clearInterval(this._tipTipTimeOut);
				this._tipTipTimeOut=-1;
			}
		}
	}

	private moveCompleteHandler():void
	{
		// this._scrollView.removeEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
		let build=Config.SearchCfg.getPersonItemCfgByPersonId(this._personId).build;
		let npc:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(String(build));
		if(npc)
		{
			egret.Tween.get(npc).to({alpha:0.3},100).to({alpha:0},200).to({alpha:0.3},100).to({alpha:0},200).call(this.showResult,this,[this._personId]);
		}
	}

	private showResult(personId:number):void
	{
		this.container.touchChildren=true;
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHRESULTPOPUPVIEW,{personId:personId,rewards:this._rewards});
	}

	private refresh():void
	{
		if(this._leftText)
		{
			this._leftText.text=Api.searchVoApi.getSearchNumLocalStr();
			if(Api.searchVoApi.getSearchNum()>0)
			{
				this._searchBtn.visible=true;
				this._buyBtn.visible=false;
			}
			else
			{
				this._searchBtn.visible=false;
				this._buyBtn.visible=true;
			}
		}
		this.refreshByModel();
	}

	private doGuide()
    {
       this.openLuckView();
    }
	private openLuckView():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHLUCKPOPUPVIEW);
	}

	private tick():void
	{
		if(Api.searchVoApi.getSearchNum()<Api.searchVoApi.getMaxSearchNum())
		{
			// if(Api.searchVoApi.getSearchNum()<1)
			// {
				this.refresh();
			// }
		}
		if(this._luckProgress)
		{
			let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
			this._luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"searchbg1",
			"progress3",
			"common_buttombigbg"
		]);
	}

	// protected getBgName():string
	// {
	// 	return null;
	// }

	protected getButtomLineBg():string
	{
		return null;
	}

	protected getRuleInfo():string
	{
		return "searchViewRuleInfo";
	}

	public dispose():void
	{
		if(this._checkBox)
		{
			this._oneKeySearchStatus=this._checkBox.checkSelected();
		}
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SEARCH,this.refreshByModel,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this.container.touchChildren=true;
		this._sceneLayer=null;
		this._mapLayer=null;
		this._npcList.length=0;
		this._leftText=null;
		this._searchBtn=null;
		this._buyBtn=null;
		this._personId=null;
		this._rewards=null;
		this._clickNpc=null;
		this._luckProgress=null;
		this._checkBox=null;
		this._isCfgInit=false;
		if(this._isbgResLoaded)
		{
			if(this._bgResGroupName)
			{
				ResourceManager.destroyRes(this._bgResGroupName);
				this._bgResGroupName=null;
			}
			this._isbgResLoaded=false;
		}
		super.dispose();
	}
}
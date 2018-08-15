class SearchResultPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=["progress3","progress3_bg"];
		let buildId:number = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
		resArr.push("searchnpcbg"+buildId);
		return super.getResourceList().concat(resArr);
	}

	protected initView():void
	{
		let spaceBuild=this.checkSpaceBuild();
		let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
		let buildId:number = itemCfg.build;
		let bg:BaseBitmap = BaseBitmap.create("searchnpcbg"+buildId);
		this.addChildToContainer(bg);
		bg.setPosition(App.CommonUtil.getCenterX(this.viewBg,bg,true),0);
		
		if(!spaceBuild)
		{
			let iconKey:string = itemCfg.personFullIcon;
			let icon:BaseBitmap=BaseLoadBitmap.create(iconKey);
			let size=itemCfg.fullIconSize;
			if(itemCfg.wifeId)
			{
				icon.setScale(340/size.width);
				icon.setPosition((this.viewBg.width-330)/2,bg.y+bg.height-size.height*icon.scaleY);


				this.checkDro(itemCfg.wifeId,icon);
			}else{
				icon.setScale(390/size.width);
				icon.setPosition((this.viewBg.width-360)/2,bg.y+bg.height-size.height*icon.scaleY);
			}
			
			
			if(itemCfg.type==2)
			{
				// icon.setScale(0.6);
				// icon.y = bg.y+bg.height-size.height*icon.scaleY + 50;
			}
			// else
			// {
			// 	icon.setPosition(140,20);
			// }
			this.addChildToContainer(icon);

			let nameBg:BaseBitmap=BaseBitmap.create("public_infobg2");

			nameBg.setPosition(100,30);


			this.addChildToContainer(nameBg);

			let fontSize:number=30;
			let nameTxt:BaseTextField=ComponentManager.getTextField(itemCfg.name,fontSize);
			if(PlatformManager.checkIsTextHorizontal())
			{
				nameTxt.setPosition(bg.x + bg.width / 2 - nameTxt.width / 2, 2 * bg.height / 3 + 20);
				nameBg.width = nameTxt.width + 20;

				nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 - 5,nameTxt.y + nameTxt.height / 2 - nameBg.height / 2)
			}
			else
			{	
				nameTxt.width=fontSize+2;
				let pos=App.CommonUtil.getCenterPos(nameBg,nameTxt,false);

				nameTxt.setPosition(pos.x+4,pos.y-3);
			}

			this.addChildToContainer(nameTxt);
		}

		let buttomBg:BaseBitmap=BaseBitmap.create("public_9_bg20");
		buttomBg.width=bg.width;
		buttomBg.height=78;
		buttomBg.setPosition(bg.x,bg.y+bg.height-buttomBg.height);
		this.addChildToContainer(buttomBg);
		let talkStr:string;
		if(spaceBuild)
		{
			talkStr = LanguageManager.getlocal("searchBuildTalk"+spaceBuild);
		}
		else
		{
			talkStr = LanguageManager.getlocal("searchPersonTalk"+this.getPersonId());
		}
		let descTxt:BaseTextField=ComponentManager.getTextField(talkStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descTxt.width=buttomBg.width-20;
		descTxt.setPosition(App.CommonUtil.getCenterX(buttomBg,descTxt,false),App.CommonUtil.getCenterY(buttomBg,descTxt,false));
		this.addChildToContainer(descTxt);

		if(itemCfg.wifeId&&itemCfg.value)
		{
			let buttomBg1:BaseBitmap;
			for(var i:number=0;i<2;i++)
			{
				buttomBg1=BaseBitmap.create("public_9_bg20");
				buttomBg1.width=bg.width;
				buttomBg1.height=30;
				buttomBg1.setPosition(buttomBg.x,buttomBg.y+buttomBg.height);
				this.addChildToContainer(buttomBg1);
			}
			
			// let prograssBar=ComponentManager.getProgressBar("progress3","progress3_bg",this.viewBg.width-40);
			

			if(!this.checkGetWife())
			{
				let lastValue:number=Math.max(0,Api.searchVoApi.getWifeValueById(this.getPersonId())-1);
				let tmpValue=lastValue/itemCfg.value;
				// prograssBar.setPercentage(tmpValue,lastValue+"/"+itemCfg.value);
				// egret.Tween.get(prograssBar).to({percent:value},800).call(function(prograssBar:ProgressBar){
				// 	egret.Tween.removeTweens(prograssBar);
				// 	prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
				// }.bind(this,prograssBar))
			}
			else
			{
				// prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
			}

		}


		this.showRewards();
		this.addTouchTap(this.removeTween,this);
		this.container.alpha=0;
		let ths=this;
		egret.Tween.get(this.container).to({alpha:1},500).call(function(){
			ths.removeTouchTap();
			ths.addTouchTap(ths.hide,ths);
		});
	}

	private checkDro(wifeId:any,wifeIcon:any)
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId)
		let droWifeIcon;
		let bg2Index = this.container.getChildIndex(wifeIcon);
		if(Api.wifeSkinVoApi.isHaveSkin(wifeIcon))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeIcon);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					this.container.addChildAt(droWifeIcon,bg2Index);
					wifeIcon.visible = false;
				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske"))
				{

					droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
					this.container.addChildAt(droWifeIcon,bg2Index);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske"))
			{

				droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
				this.container.addChildAt(droWifeIcon,bg2Index);
				wifeIcon.visible = false;
			}
		}
		if(droWifeIcon)
		{
			droWifeIcon.setScale(0.7)
			droWifeIcon.x = wifeIcon.x + 180;
			droWifeIcon.y = wifeIcon.y + 760*0.7 - 120;
		}
		else{
			wifeIcon.visible = true;
		}
	}
	private removeTween():void
	{
		if(this.container)
		{
			egret.Tween.removeTweens(this.container);
			this.container.alpha=1;
		}
		this.removeTouchTap();
		this.addTouchTap(this.hide,this);
	}
	protected resetBgSize():void
	{
		super.resetBgSize();
		let personValueLocalStr:string=Api.searchVoApi.getPersonValueLocalStr(this.getPersonId())
		let rewards=this.getRewards();
		if(rewards)
		{
			let l:number = rewards.length;
			for(let i:number=l-1;i>=0;i--)
			{
				if(!rewards[i].num)
				{
					let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
					personValueLocalStr=null;
					break;
				}
			}
		}
		if(personValueLocalStr)
		{	
			let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
			if(itemCfg.wifeId)
			{
				if(Api.wifeVoApi.getWifeInfoVoById(itemCfg.wifeId)){
					if(!this.checkGetWife())
					{
						return;
					}
					
				}
			}
			let descContainer = new BaseDisplayObjectContainer();
			this.addChild(descContainer);
			

			let descBg=BaseBitmap.create("public_searchdescbg");
			// descBg.x = GameConfig.stageWidth/2 - descBg.width/2;
			// descBg.y = this.viewBg.y + this.viewBg.height + 30;
			descContainer.addChild(descBg);

			let descTxt:BaseTextField=ComponentManager.getTextField(personValueLocalStr,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
			descTxt.x = descBg.width/2 - descTxt.width/2;
			descTxt.y = descBg.y + descBg.height/2 - descTxt.height/2;
			descContainer.addChild(descTxt);
			descContainer.x = GameConfig.stageWidth/2 - descContainer.width/2;
			descContainer.y = this.viewBg.y + this.viewBg.height + 30;
			descContainer.alpha = 0;
			egret.Tween.get(descContainer,{loop:false}).wait(1000).to({alpha:1},500);
		}
	}

	private checkSpaceBuild():string|number
	{
		let buildId:string|number=null;
		let rewards=this.getRewards();
		if(rewards)
		{
			let l:number = rewards.length;
			for(let i:number=l-1;i>=0;i--)
			{
				if(!rewards[i].num)
				{
					let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
					buildId=itemCfg.build;
					break;
				}
			}
		}
		return buildId;
	}

	private checkGetWife():string
	{
		let rewards=this.getRewards();
		if(!rewards)
		{
			let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
			if(itemCfg.type==2)
			{
				if(Api.searchVoApi.getWifeValueById(this.getPersonId())>=itemCfg.value)
				{
					//得到红颜
					if(itemCfg.wifeId)
					{
						return itemCfg.wifeId;
					}
				}
			}
		}
		return null;
	}
	public hide():void
	{
		// let wifeId=this.checkGetWife();
		// if(wifeId)
		// {
		// 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,wifeId);
		// }
		let rData = Api.wifeVoApi.getWaitShowWife();
		if(rData){
			
			ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
		}

		super.hide();
	}

	private showRewards():void
	{
		let ths=this;
		let rewards:RewardItemVo[]=ths.getRewards();
		if(!rewards)
		{
			return;
		}
		let l:number = rewards.length;
		for(let i:number=l-1;i>=0;i--)
		{
			if(!rewards[i].num)
			{
				rewards.splice(i,1);
			}
		}
		let timeNum:number=egret.setTimeout(function() {
			if(rewards&&rewards.length>0)
			{
				App.CommonUtil.playRewardFlyAction(rewards);
			}
			if(timeNum)
			{
				egret.clearTimeout(timeNum);
				timeNum=NaN;
			}
		},this, 300);
	}

	protected getBgExtraHeight():number
	{
		return 0;
	}

	private getPersonId():string
	{
		return this.param.data.personId;
	}
	public getRewards():RewardItemVo[]
	{
		if(this.param.data.rewards)
		{
			return GameData.formatRewardItem(this.param.data.rewards);
		}
		return null;
	}

	protected getTitleStr():string
	{
		let buildId:number=Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
		return "searchBuild"+buildId;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	public dispose():void
	{
		super.dispose();
	}
}
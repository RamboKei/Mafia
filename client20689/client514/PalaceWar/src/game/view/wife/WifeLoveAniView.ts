/**
 * 宠幸动画界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeLoveAniView
 */

class WifeLoveAniView extends BaseView
{

	// id 红颜ID
	private _wifeId:number = null;

	private _wifePic:BaseLoadBitmap;

	//_type 类型 1随机宠幸 2 元宝宠幸
	private _type:number = null;

	private _taoxinParticle:particle.GravityParticleSystem;
	// private _wifeScrollItem1:WifeScrollItem1;
	private _container:BaseDisplayObjectContainer;

	private _wifeContainer:BaseDisplayObjectContainer;

	// 遮罩层
	private _wifeMaskBmp:BaseBitmap; 

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._wifeId = this.param.data.id;
			this._type = this.param.data.type;
		}

		return rewardPic.concat(["taoxin","taoxin_json","taoxinani",
        "wifeview_lovebg","wifeview_lovewordsbg",
				"wifeview_namebg"
		]);
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "wifeview_lovebg";
	}

	protected initView():void
	{
		let id = this._wifeId;
		if (id == 211 && Api.switchVoApi.checkOpenWifeVideo()) {
			// 随机视频列表
			let videoList = [
				"001003",
				"001004",
				"001005",
				"001006",
				"001007",
				"001008"
			]
			App.VideoUtil.play("resource/other/wifeVideo/"+id+"/"+videoList[Math.floor(Math.random()*videoList.length)]+".mp4", this.initView2.bind(this));
		} else {
			this.initView2();
		}
	}
	protected initView2():void
	{
		SoundManager.pauseBg()
		SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);

		this._wifeMaskBmp = BaseBitmap.create("public_9_viewmask");
		this._wifeMaskBmp.width=GameConfig.stageWidth;
		this._wifeMaskBmp.height=GameConfig.stageHeigth;
		this._wifeMaskBmp.touchEnabled = true;
		this._wifeMaskBmp.alpha = 0;
		this.addChild(this._wifeMaskBmp);
		// 
		this._wifeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._wifeContainer);

		if(this._type == 1){
			let id = this._wifeId


			this.viewBg.visible = false;

			let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			let wifeScrollItem1 = new WifeScrollItem1();
			wifeScrollItem1.initItem(id,wifeInfoVo);
		
			// this.addChild(wifeScrollItem1);
			this._container = new BaseDisplayObjectContainer();
			this.addChild(this._container);

			wifeScrollItem1.setPosition(-wifeScrollItem1.width/2,-wifeScrollItem1.height/2);
			this._container.addChild(wifeScrollItem1);

			// this._container.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );

			// egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );

			let posX = this.param.data.x;
			let posY = this.param.data.y;

			 var targetPoint: egret.Point = this.globalToLocal(posX,posY);
			 this._container.setPosition(targetPoint.x + wifeScrollItem1.width/2 , targetPoint.y + wifeScrollItem1.height/2);

			egret.Tween.get(this._container)
			.to({scaleX: 0.8,scaleY: 0.8}, 500)
			.to({scaleX: 1,scaleY: 1}, 500)
			// .to({scaleX: 0.5,scaleY: 0.5}, 300)
			// .to({scaleX: 0.5,scaleY: 0.5}, 300)
			.wait(300)
			.call(this.showWifeAni,this);
		}else{
			this.showWifeAni();
		}
        
	}

	private showWifeAni():void
	{		
		if (this._container){
			this.removeChild(this._container);
		}




		this.viewBg.visible = true;

		let id = this._wifeId
		let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		 //妻子图片

		 	let wifePicStr = wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
			}
			
		}
        this._wifePic = BaseLoadBitmap.create(wifePicStr);
		// this._wifePic.scaleX = 1.5;
		// this._wifePic.scaleY = 1.5;
		this._wifePic.setPosition(0, GameConfig.stageHeigth - 760*this._wifePic.scaleY);
		// this._wifePic.setPosition(GameConfig.stageWidth/2 - 540*this._wifePic.scaleX/2, GameConfig.stageHeigth - 760*this._wifePic.scaleY);
		// this._wifePic.alpha = 0;
		this._wifeContainer.alpha = 0;
	
		this._wifeContainer.addChild(this._wifePic);



		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				// if(RES.hasRes(skinCfg.bone + "_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					droWifeIcon.setScale(1.3)
					droWifeIcon.x = this._wifePic.x + 340;
					droWifeIcon.y = this._wifePic.y + 848  - 30;
					this._wifeContainer.addChild(droWifeIcon);
					this._wifePic.visible = false;
				}
				
			}else{
				
				if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
					droWifeIcon.setScale(1.3)
					droWifeIcon.x = this._wifePic.x + 340;
					droWifeIcon.y = this._wifePic.y + 848  - 30;
					// this.addChildToContainer(droWifeIcon);
					this._wifeContainer.addChild(droWifeIcon);
					this._wifeContainer.visible = true
					this._wifePic.visible = false;
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske"))
			{

				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
				droWifeIcon.setScale(1.3)
				droWifeIcon.x = this._wifePic.x + 340;
				droWifeIcon.y = this._wifePic.y + 848  - 30;;
				// this.addChildToContainer(droWifeIcon);
				this._wifeContainer.addChild(droWifeIcon);
				this._wifePic.visible = false;
			}
			
		}


		// egret.Tween.get( this._wifePic ).to( { alpha:1 }, 1000 ).wait(700).call(this.changePic,this);
		// egret.Tween.get( this._wifePic ).wait(1200).call(this.changePic2,this);
		egret.Tween.get( this._wifeContainer ).to( { alpha:1 }, 1000 ).wait(700).call(this.changePic,this);
		egret.Tween.get( this._wifeContainer ).wait(1200).call(this.changePic2,this);

		egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );

		//红颜名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
	
		this.addChild(nameBg);
		//红颜名字
		let nameTF = ComponentManager.getTextField(wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
		

		if(PlatformManager.checkIsTextHorizontal()){
			
			nameBg.width = nameTF.width + 40;
			nameBg.x = this.width/2 - nameBg.width/2;
			nameBg.y = this.height - 100;

			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;

		} else {
			nameBg.x = 25;
			nameBg.y = 200;
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
		}


		this.addChild(nameTF);




		//红颜说的话背景
		let wordsBg:BaseBitmap = BaseBitmap.create("wifeview_lovewordsbg");
		// wordsBg.width = 430;
		// wordsBg.height = 90;
		wordsBg.x = 140;
		wordsBg.y = this._wifePic.y - 170;
		this.addChild(wordsBg);

		//红颜说的话
		// wifeInfoVo.words

		let wifeWordsText:BaseTextField = ComponentManager.getTextField(wifeInfoVo.words ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeWordsText.setColor(0x6d2939);
		wifeWordsText.x = 153;
		wifeWordsText.y = this._wifePic.y - 130;
		wifeWordsText.width = 320;
		this.addChild(wifeWordsText);

		// //脱衣前桃心
		// this._taoxinParticle = App.ParticleUtil.getParticle("taoxin");
		// this._taoxinParticle.x = -450;
		// this._taoxinParticle.y = 150;
		// this._taoxinParticle.start();
		// this.addChild(this._taoxinParticle);
	
	}
	private changePic2():void
	{
		let upgradeClip = ComponentManager.getCustomMovieClip("taoxinani_",13,100);
		upgradeClip.setScale(2);
		upgradeClip.x = 0;
		upgradeClip.y = 320;
		this.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
	}

	private changePic():void
	{
		if (this._wifePic) {

		if(this.param.data.rewards)
		{
			let rewards= GameData.formatRewardItem(this.param.data.rewards);
			if(rewards&&rewards.length>0)
			{
				App.CommonUtil.playRewardFlyAction(rewards);
			}
		}	


		if(!Api.switchVoApi.checkWifeAni()){
				let id = this._wifeId
				let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

				// egret.Tween.get( this._wifePic ).to( { alpha:0 }, 2000 );
				egret.Tween.get( this._wifeContainer ).to( { alpha:0 }, 2000 );
				// .call(this.changePic,this);

				

				if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone2 + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone2);
					droWifeIcon.setScale(1.3)
					droWifeIcon.x = this._wifePic.x + 340;
					droWifeIcon.y = this._wifePic.y + 848  - 30;
					this.addChild(droWifeIcon);
					// this._wifeContainer.addChild(droWifeIcon);
					// this._wifePic.visible = false;
					droWifeIcon.alpha = 0;
					egret.Tween.get( droWifeIcon ).to( { alpha:1 }, 2000 );
				}
				else{
					//妻子脱衣图片
					let wifePic = BaseLoadBitmap.create(wifeInfoVo.body2);
					// wifePic.scaleX = 1.5;
					// wifePic.scaleY = 1.5;
					wifePic.setPosition(0, GameConfig.stageHeigth - 760*wifePic.scaleY);
					wifePic.alpha = 0;
				
					this.addChild(wifePic);

					egret.Tween.get( wifePic ).to( { alpha:1 }, 2000 );

					let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
					if(wifeSkinVo && wifeSkinVo.equip != "")
					{
						let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
						if(Api.wifeVoApi.isHaveBone(skinCfg.bone2 + "_ske"))
						{

							let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone2);
							droWifeIcon.setScale(1.3)
							droWifeIcon.x = this._wifePic.x + 340;
							droWifeIcon.y = this._wifePic.y + 848  - 30;
							// this._wifeContainer.addChild(droWifeIcon);
							this.addChild(droWifeIcon);
							droWifeIcon.alpha = 0;
							egret.Tween.get( droWifeIcon ).to( { alpha:1 }, 2000 );
							wifePic.visible = false;
						}
						else{
							if(RES.hasRes(skinCfg.body2))
							{
								wifePic.setload(skinCfg.body2);
							}
						}
						
					}



				}
		}
			

			
			// .call(this.changePic,this);

			// this.removeChild(this._taoxinParticle);

			//脱衣后桃心
			let taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
			taoxinFullParticle.x = -450 ;
			taoxinFullParticle.y = GameConfig.stageHeigth - 860;
			taoxinFullParticle.start();
			// taoxinFullParticle.scaleX = 2;
			// taoxinFullParticle.scaleY = 2;
			this.addChild(taoxinFullParticle);
			WifeView.isMoveing = false;
			this.addTouchTap(this.touchTap,this,null);
		}
	}

	private touchTap():void
	{
		this.hide();
		SoundManager.resumeBg()
		if (this.param.data.childData){
			ViewController.getInstance().openView(ViewConst.BASE.WIFEGETCHILDVIEW,this.param.data.childData);
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
		if(Api.rookieVoApi.isInGuiding){
			Api.rookieVoApi.checkWaitingGuide();
			// Api.rookieVoApi.checkNextStep();
		}
		
	}

	public dispose():void
	{
		this._wifeId = null;
		egret.Tween.removeTweens(this._wifePic);
		this._container = null;
		this._wifeContainer = null;
		this._wifeId = null;
		this._wifePic = null;
		this._type = null;
		this._taoxinParticle = null;
		this._wifeMaskBmp = null;
		super.dispose();
	}

}
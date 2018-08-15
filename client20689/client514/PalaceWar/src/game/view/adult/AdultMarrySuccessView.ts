/**
 * 结婚成功
 * author dukunayng
 * date 2017/11/1
 * @class AdultMarrySuccessView
 */

class AdultMarrySuccessView extends BaseView
{

	// id 孩子ID
	private _childId:string = null;
	private _confirmCallback:Function;
	

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._childId = this.param.data;
		}

		return rewardPic.concat(["childview_getgirl",
		"childview_boyicon","childview_girlicon",
		"wifeget_bg"
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
		return "public_9_bg8";
	}

	protected initView():void
	{

		this._confirmCallback = this.param.data.confirmCallback;
		this.addTouchTap(this.touchTap,this,null);

		SoundManager.playEffect(SoundConst.EFFECT_UPD);
		this._childId = this.param.data.childId
        let id = this._childId
		let adultInfoVo:AdultMarryInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(id);


		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChildToContainer(bg);

		// lizi.x = 100;
		
		bg.y = 260;

        let myIcon = "adult_boy"
		let otherIcon = "adult_girl"
		if(adultInfoVo.sex == 2){
			myIcon = "adult_girl"
			otherIcon = "adult_boy"
		}

		//获得图片
        let getPic:BaseBitmap = BaseBitmap.create("adult_lovebg");
		getPic.setPosition(this.viewBg.width/2 - getPic.width/2, 100);
		this.addChild(getPic);

        //孩子图片
        let childPic1:BaseBitmap = BaseBitmap.create(myIcon);
		childPic1.setPosition(40, getPic.y + getPic.height + 10);
		this.addChild(childPic1);

		//对面孩子图片
        let childPic2:BaseBitmap = BaseBitmap.create(otherIcon);
		childPic2.setPosition(260, getPic.y + getPic.height + 10);
		this.addChild(childPic2);

		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 200;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, childPic1.y + childPic1.height);
		this.addChild(lookBg);


		//孩子名字
		let nameTf1:BaseTextField = ComponentManager.getTextField( adultInfoVo.name,TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf1.setPosition(100, lookBg.y + 40);
		this.addChild(nameTf1);

		//lookTip1查看孩子文字
		let f1Str = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
		let matherTF:BaseTextField = ComponentManager.getTextField( f1Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		matherTF.setPosition(nameTf1.x, nameTf1.y + nameTf1.height + 20);
		this.addChild(matherTF);

		let att1Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.total;
		let att1TF:BaseTextField = ComponentManager.getTextField( att1Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		att1TF.setPosition(nameTf1.x, matherTF.y + matherTF.height + 20);
		this.addChild(att1TF);

		//孩子名字
		let nameTf2:BaseTextField = ComponentManager.getTextField( adultInfoVo.fname,TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf2.setPosition(400, lookBg.y + 40);
		this.addChild(nameTf2);

		let f2Str = LanguageManager.getlocal("adultMarryFather") + adultInfoVo.funame;
		let matherTF2:BaseTextField = ComponentManager.getTextField( f2Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		matherTF2.setPosition(nameTf2.x, nameTf2.y + nameTf2.height + 20);
		this.addChild(matherTF2);

		let att2Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.ftotal;
		let att2TF:BaseTextField = ComponentManager.getTextField( att2Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		att2TF.setPosition(nameTf2.x, matherTF2.y + matherTF2.height + 20);
		this.addChild(att2TF);

		let dis = adultInfoVo.ftotal;
		let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
		// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
		let powerFly = new PowerFly();
		powerFly.init(dis);
		
		LayerManager.msgLayer.addChild(powerFly);

		if(adultInfoVo.sex == 2){
			childPic1.anchorOffsetX = childPic1.width/2;
			childPic2.anchorOffsetX = childPic2.width/2;
			childPic1.x = childPic1.x + childPic1.width/2;
			childPic2.x = childPic2.x + childPic2.width/2;
			childPic1.skewY = 180;
			childPic2.skewY = 180;
		}


	}

	private sureBtnClick():void
	{
		ViewController.getInstance().hideAllView();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		this._childId = this.param.data;
		ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW,{childId:this._childId});
	}

    private noBtnClick():void
	{
		this.hide();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
	}

	private touchTap():void
	{
		this.hide();
	}

	public hide()
	{
		super.hide();
		if(this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
		}
		
	}
	public dispose():void
	{
		this._childId = null;
		super.dispose();
	}

}
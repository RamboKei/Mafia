/**
 * 皇宫
 * author yanyuling
 * date 2017/11/01
 * @class PalaceRoleInfoItem
 */
class PalaceRoleInfoItem extends BaseDisplayObjectContainer
{
	private _roleImg:BaseLoadBitmap;
	private _headImg:BaseLoadBitmap;
	private _titleImg:BaseLoadBitmap;
	private _nameBg:BaseBitmap;
	private _nameTxt:BaseTextField;
	private _roleUid:number;
	private _roleTitleId:string;
	private _shadowImg:BaseBitmap;
	private _topTxtBg:BaseBitmap;
	private _signTxt:BaseTextField;
	private _tailImg:BaseBitmap
	public constructor()
	{
		super();
		this.init();
	}
	private init():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT,this.showSignAfterEdit,this);
		this.width = GameConfig.stageWidth;
		
		let nameBg = BaseLoadBitmap.create("servant_attributemap");
		nameBg.width = 265;
		nameBg.height = 52;
		nameBg.name = "nameBg";
		nameBg.scaleX = 0.8;
		nameBg.x = this.width/2 -nameBg.width/2*0.8 ;
		nameBg.y = 0;
		this.addChild(nameBg);
		this._nameBg = nameBg;

		let nameTxt = ComponentManager.getTextField("1",24,TextFieldConst.COLOR_WARN_YELLOW);
		this._nameTxt = nameTxt;
		this._nameTxt.anchorOffsetX = this._nameTxt.width/2;
		nameTxt.x = GameConfig.stageWidth/2;
		nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2+2;
		this.addChild(nameTxt);
		
		let roleImg = BaseLoadBitmap.create("palace_role_empty");
		roleImg.width = 382;
		roleImg.height = 712;
		roleImg.x = this.width/2 -roleImg.width/2 ;
		roleImg.y = 60;
		roleImg.visible = false;
		roleImg.addTouchTap(this.roleImgClickHandler,this);
		this.addChild(roleImg);
		this._roleImg = roleImg;

		let topTxtBg = BaseBitmap.create("public_9_bg25");
		topTxtBg.x = this.width/2 + 110;
		topTxtBg.height = 100;
		topTxtBg.width = 200;
		// topTxtBg.height = 70;
		// topTxtBg.x = this.width/2 + 60;
		// topTxtBg.y = roleImg.y -10;
		this._topTxtBg = topTxtBg;
		this._topTxtBg.alpha = 0;
		this.addChild(topTxtBg);
		
		let tailImg =  BaseBitmap.create("public_9_bg42_tail");
		tailImg.x = topTxtBg.x + 20;
		tailImg.y = topTxtBg.y +topTxtBg.height-4;
		this.addChild(tailImg);
		this._tailImg = tailImg;
		this._tailImg.alpha = 0;

		let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		txt.multiline = true;
		txt.lineSpacing = 5;
		txt.width = topTxtBg.width - 40;
		txt.x = topTxtBg.x + 20;
		txt.y = topTxtBg.y + 20;
		this._signTxt =txt;
		this._signTxt.alpha = 0;
		this.addChild(txt);

		let shadowImg = BaseBitmap.create("palace_role_shadow");
		shadowImg.x = roleImg.x + roleImg.width/2 - shadowImg.width/2;
		shadowImg.y = roleImg.y+roleImg.height - shadowImg.height/2 - 40;
		this.addChildAt(shadowImg,0)
		this._shadowImg = shadowImg;
		
		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal()){
			let titleImg = BaseLoadBitmap.create("user_title_3000_2");
			titleImg.width = 213;
			titleImg.height = 47;
			titleImg.x = this.width/2 - titleImg.width/2;
			titleImg.y = this.height - 230;
			this.addChild(titleImg)
			this._titleImg = titleImg;

		} else {
			let titleImg = BaseLoadBitmap.create("user_title_3000_2");
			titleImg.width = 47;
			titleImg.height = 103;
			titleImg.x = this.width/2 -  235;
			// titleImg.y = 30;
			this.addChild(titleImg)
			this._titleImg = titleImg;
		}
    }
	/**
	 * 刷新展示
	 */
	public refreshUIWithData(data:any)
	{
		
		this._roleTitleId = data.titleId;
		let titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
        let isCross = titlecfg.isCross;
		let oldroleNode = this.getChildByName("roleNode");
		let nameBg = <BaseBitmap>this.getChildByName("nameBg");
		nameBg.width = 265;
		if (oldroleNode)
			this.removeChild(oldroleNode);

		if(data instanceof PalaceRoleInfoVo && data.uid > 0)
		{
			this.showRoleSign(data.sign);
			this._roleUid = data.uid;
			let roleNode = Api.playerVoApi.getPlayerPortrait(Number(data.titleId),data.pic );
			roleNode.name = "roleNode";
			roleNode.y = 40;
			roleNode.x = this.width/2 - roleNode.width/2;
			let idx = this.getChildIndex(this._nameBg);
			this.addChildAt(roleNode,idx);
			
			this._nameTxt.visible = true;
			this._shadowImg.visible = true;
			this._roleImg.visible = false;
			this._titleImg.setload("user_title_" + data.titleId + "_2");
			this._nameTxt.text = data.name;
			
			if(isCross == 1)
			{
				nameBg.width = 300;
			}
			this._nameTxt.anchorOffsetX = this._nameTxt.width/2;
			this._nameTxt.y = this._nameBg.y + this._nameBg.height/2 - this._nameTxt.height/2;
		}else
		{
			this._roleUid = 0;
			this._shadowImg.visible = false;
			this._roleImg.y = 60;
			this._roleImg.visible = true;
			this._nameTxt.text = LanguageManager.getlocal("palace_titleTip_"+data.titleId)
			this._nameTxt.anchorOffsetX = this._nameTxt.width/2;
			this._titleImg.setload("user_title_" + data.titleId + "_2");
		}
	}
	protected showRoleSign(signStr:string)
	{
		if (signStr != "")
		{
			egret.Tween.removeTweens(this._topTxtBg);
			egret.Tween.removeTweens(this._signTxt);
			egret.Tween.removeTweens(this._tailImg);
			this._topTxtBg.alpha = 1;
			this._signTxt.alpha = 1;
			this._tailImg.alpha = 1;
			this._signTxt.text = signStr;
			egret.Tween.get(this._topTxtBg,{loop:false}).wait(3000).to({alpha:0},1000);
			egret.Tween.get(this._signTxt,{loop:false}).wait(3000).to({alpha:0},1000);
			egret.Tween.get(this._tailImg,{loop:false}).wait(3000).to({alpha:0},1000);
		}
	}
	protected showSignAfterEdit(event:egret.Event)
	{
		let data = event.data;
		if (this._roleTitleId == data)
		{
			let str = Api.palaceVoApi.getRoleInfoByTitleId(this._roleTitleId).sign;
			this.showRoleSign(str);
		}
	}
	protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(data.ruid == this._roleUid)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }
	public getHeight()
	{
		return 832;
	}
	protected roleImgClickHandler()
	{
		if(this._roleUid == 0)
		{
			return ;
		}
		 NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._roleUid});
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT,this.showSignAfterEdit,this);

		this._roleImg = null;
		this._titleImg = null;
		this._nameBg = null;
		this._nameTxt = null;
		this._shadowImg = null;
		this._headImg = null;
		this._roleUid = null;
		this._topTxtBg = null;
		this._signTxt = null;
		this._roleTitleId = null;

		super.dispose();
	}
}
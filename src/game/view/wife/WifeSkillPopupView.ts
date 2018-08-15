/**
 * 红颜技能
 * author dky
 * date 2017/11/18
 * @class WifeSkillPopupView
 */
class WifeSkillPopupView extends PopupView
{
	
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _wifeInfoVo: WifeInfoVo;

	private _text1:BaseTextField;
	// private _text2:BaseTextField;

	private _index:number = 0;

	public static wifeId:string = null;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);

		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;

		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		WifeSkillPopupView.wifeId = id;

		let cfg = Config.WifeCfg.getWifeCfgById(id);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)


		let serBg = serCfg.qualityBoxImgPath;
		if(Api.servantVoApi.getServantObj(cfg.servantId)){
			let serVo = Api.servantVoApi.getServantObj(cfg.servantId);
			serBg = serVo.qualityBoxImgPath;
		}
		let temW:number = 108;
		let iconBgBt:BaseBitmap = BaseLoadBitmap.create(serBg);
		iconBgBt.x = 30;
		iconBgBt.y = 15;
		this.addChildToContainer(iconBgBt);
		iconBgBt.scaleX = temW/194;
		iconBgBt.scaleY = temW/192;

		let iconBt:BaseBitmap = BaseLoadBitmap.create(serCfg.halfIcon);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChildToContainer(iconBt);
		iconBt.scaleX = (temW-10)/180;
		iconBt.scaleY = (temW-10)/177;

		let nameStr = LanguageManager.getlocal("wifeSkillServant",[serCfg.name]);
		let nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		nameTF.x = 150;
		nameTF.y = 20;
		this.addChildToContainer(nameTF);

		if(!Api.servantVoApi.getServantObj(cfg.servantId))
		{
			let getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
			getTF.x = nameTF.x + nameTF.width + 5;
			getTF.y = nameTF.y;
			this.addChildToContainer(getTF);

			let maskBt:BaseBitmap = BaseBitmap.create("wifeview_mask");
			maskBt.x = iconBgBt.x;
			maskBt.y = iconBgBt.y;
			this.addChildToContainer(maskBt);
		

		}
		
		let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
		this._text1 = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		this._text1.x = nameTF.x;
		this._text1.y = nameTF.y + nameTF.height + 15;
		this.addChildToContainer(this._text1);

		let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
		tipTF.x = nameTF.x;
		tipTF.y = this._text1.y + this._text1.height + 15;
		this.addChildToContainer(tipTF);


		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 535;
		bottomBg.height = 535;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = 135;
		this.addChildToContainer(bottomBg);

		// let list1: Array<number> = new Array();

		// for (var index = 0; index < this._wifeInfoVo.cfg.wifeSkill.length; index++) {
		// 	list1.push(index)
			
		// }


		let list =this._wifeInfoVo.cfg.wifeSkill;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,525,535);
		this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem,list,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 5 ,bottomBg.y + 5);

	}

	private doGive(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(),key:data.index});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <WifeSkillScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
			this._text1.text = expStr;
			// this._text2.text = this._wifeInfoVo.glamour.toString();
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			
		}

		
	}
	private refreshHandler()
	{

	}


	public hide():void
	{
		super.hide();
	}
	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	public dispose():void
	{
	
		
		// 未婚滑动列表
		this._scrollList = null;


		this._confirmCallback = null;
		this._handler = null;
		this._wifeInfoVo = null;
		this._text1 = null;
		// this._text2 = null;
		this._index = null;

		WifeSkillPopupView.wifeId = null;

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);

		super.dispose();
	}
}
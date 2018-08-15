/**
 * 限时活动奖励
 * author dmj
 * date 2017/11/07
 * @class AcLimitedRewardView
 */
class AcLimitedRewardView extends AcCommonView
{
	private _scrollList:ScrollList;
	private _activeCfgList:Array<any> = [];
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		this._activeCfgList = Api.acVoApi.getActivityVoListByAid(this.aid);
		this._activeCfgList.sort((a:AcLimitedRewardVo,b:AcLimitedRewardVo)=>{
			// 有红点的在前，没红点的在后
			if (a.red != b.red) {
				return a.red?-1:1;
			}
			return a.code - b.code;
		});
		// let cfg:Config.AcCfg.LimitedRewardCfg = <Config.AcCfg.LimitedRewardCfg>this.acVo.config;
		// this._activeCfgList = cfg.getLimitedRewardItemList();
		let temW = GameConfig.stageWidth - 10;
		let temH = GameConfig.stageHeigth - 160;
		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("limitedRewardDesc"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		descTF.x = GameConfig.stageWidth/2 - descTF.width/2;
		descTF.y = 5;
		this.addChildToContainer(descTF);

		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = temW;
		bg.height = temH;
		bg.x = 5;
		bg.y = descTF.y + descTF.height + 15;
		this.addChildToContainer(bg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,temW - 10,temH - 10);
		this._scrollList = ComponentManager.getScrollList(AcLimitedRewardScrollItem,this._activeCfgList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(10,bg.y + 10);
	}


	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"progress6_bg","dinner_rankbg","dinnerrankpopupview","dinner_rank_titlebg","achievement_state3",
					"common_titlebg","signin_had_get"
					]);
	}

	private useCallback(event:egret.Event):void
	{
		for(let i=0;i<this._activeCfgList.length;i++)
		{
			let acLimitedRewardScrollItem = <AcLimitedRewardScrollItem>this._scrollList.getItemByIndex(i);
			if(acLimitedRewardScrollItem)
			{
				acLimitedRewardScrollItem.checkBtnState();
			}
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		this._scrollList = null;
		this._activeCfgList = null;
		super.dispose();
	}
}
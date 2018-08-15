/**
 * 充值活动
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeItem
 */
class AcRechargeItem extends BaseDisplayObjectContainer
{
	private _aid:string;
	private _code:string;
	private _scrollList:ScrollList;
	private _seprateNum:number = 0;
	private _isSpecial:boolean = false;
    public constructor()
	{
		super();
	}
	public init(aid:string,code:string|number,rect:egret.Rectangle):void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshAfterRecharge,this);


		this._aid = aid;
		this._code = String(code);
		this.refreshList(rect);
    }
	protected refreshAfterRecharge()
	{
		/**有特殊档 */
		if(this._isSpecial )
		{
			let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
			if( tmpVo.v >= this._seprateNum && Api.switchVoApi.checkSpecialChargeReward())
			{
				// this.refreshList();
				egret.callLater(this.refreshList,this);
				// egret.Tween.get(this).wait(800).call(this.refreshList,this);
			}
		}
	}
	protected refreshList(rect?:egret.Rectangle)
	{
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
		
		let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		let objList = cfgObj.getList();
		let terList = {};

		for (var key in objList) {
			let tmpCfg = objList[key];
			if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
			{
				if(Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum )
				{
					this._isSpecial = true;
					terList[key] = tmpCfg;
				}
			}else
			{
				this._seprateNum = tmpCfg.needGem;
				terList[key] = tmpCfg;
			}
		}
		
		let keys = Object.keys(terList);
		keys.sort((a:string,b:string)=>{
			return Number(a) - Number(b) ;
		});

		let scrolItem = undefined;
		if (this._aid == "dailyCharge")
		{
			scrolItem = AcDailyChargeScrollItem;
		}
		else if (this._aid == "totalRecharge")
		{
			scrolItem = AcTotalRechargeScrollItem;
		}
		else if (this._aid == "totalDayRecharge")
		{
			scrolItem = AcTotalDayRechargeScrollItem;
			let num = tmpVo.getShowNum(1);
			if(keys.length>0)
			{
				keys.splice(num,keys.length-num);	
			}
		}
		if(rect)
		{
			let scrollList = ComponentManager.getScrollList(scrolItem,keys,rect);
			this.addChild(scrollList);
			this._scrollList = scrollList ;
		}else{
			this._scrollList.refreshData(keys);
		}
		
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshAfterRecharge,this);

		this._aid = null;
		this._code = null;
		this._scrollList = null;
		this._seprateNum = 0;
		this._isSpecial = null;

		super.dispose();
	}
}
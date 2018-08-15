/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab2 累计充值
*/
class AcMayDayViewTab2 extends CommonViewTab
{ 
	private _scrollList:ScrollList = null; 
	private _isSpecial : boolean = false;
	private _seprateNum : number = 0;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	protected initView():void
	{
		let bottomBg = BaseBitmap.create("public_9_bg43");
		bottomBg.width=625;
		bottomBg.height=GameConfig.stageHeigth-410;
		bottomBg.x=5;
		bottomBg.y=-180; 
		this.addChild(bottomBg);
		let aid = AcMayDayView.AID;
		let code = AcMayDayView.CODE;
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);

		let objList = this.cfg.recharge;
		let terList = {};

		// for (var key in objList) {
		// 	let tmpCfg = objList[key];

			
		// 		this._seprateNum = tmpCfg.needGem;
		// 		terList[key] = tmpCfg;
			
		// }
		
		let keys = Object.keys(objList);
		keys.sort((a:string,b:string)=>{
			return Number(a) - Number(b) ;
		});

 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 430);
		let scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem,keys,tmpRect);
		scrollList.setPosition(20,-170); 
		this.addChild(scrollList);
		this._scrollList = scrollList;
	}

	private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
	}

	protected getSheepType():number
	{
		return 2;
	}
	
	public dispose():void
	{	 
		this._scrollList =null;
		super.dispose();
	}
}
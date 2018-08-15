/**
 * 来访消息主界面
 */

class AtkraceVisitView extends PopupView
{	

    public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rankinglist_rankbg",
			"atkraceVisitbg",
			"atkracevipbg",
			"office_fnt",
			
		]);
	}

    protected getShowHeight():number
	{
		return 750;
	}
    public initView():void
	{
	
    }
 

    protected getTabbarTextArr():Array<string>
	{
		return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
		];
	}

    public dispose():void
	{	
		super.dispose();
	}
}
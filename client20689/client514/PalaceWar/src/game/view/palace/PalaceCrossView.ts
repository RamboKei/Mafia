/**
 * 跨服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceCrossView
 *  与 PalaceView 的差异仅表现在posCfg 和背景图上，无它
 */

class PalaceCrossView extends PalaceView
{
    constructor()
    {
        super();
    }
    protected initView():void
	{
        super.initView();
    }

    public initPosCfg()
    {
        this._posList = [
            {x:141, y:281, width:280, heigh:200 ,shadowId:6 ,flagId:5 ,ennameX:236 ,ennameY:290},
            {x:78, y:579, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:96 ,ennameY:560},
            {x:372, y:579, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:390 ,ennameY:560},
            {x:64, y:742, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:82 ,ennameY:718},
            {x:389, y:742, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:406 ,ennameY:718},
            {x:49, y:890, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:68 ,ennameY:864},
            {x:407, y:890, width:170, heigh:100 ,shadowId:7  ,flagId:5 ,ennameX:424 ,ennameY:864},
        ];
    }
    protected getStartIdx():number
    {
        return 0;
    }
    protected getCorssBtnPath()
    {
        return "palacve_backBtn";
    }
    protected crossBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
        this.hide();
    }

    public getBgRes():string
    {
        return "palace_bg3";
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "palace_bg3",
            "palace_shadow6","palace_shadow7",
            "palace_building_flag5",
        ]);
	};
    
    protected getRequestData():{requestType:string,requestData:any}
	{ 
        return {requestType:NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,requestData:{}};
	}
    public dispose():void
	{
        super.dispose();
    }
}
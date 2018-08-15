/**
 * 称帝入口界面
 * author qianjun
 */
class EmperorWarEnterView extends CommonView {
    public constructor() {
		super();
    }

    private _timeDesc : BaseTextField = null;
    private _midBtn : BaseButton = null;
    private _time : number = 0;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "emparena_bottom", "empdetail_down", "empdetail", "empgodbless_tip_bg", "empjzdhua", "emprankinglist_line",
            "boss_start_war","boss_start_war_down","empenter","empenter_down","empbming","empbming_down",
            "empgquan","empzli","empzzhi","empwli","emptquan","empupbg","empmanbg","empmli","emphfangbg","uncompress"
        ]);
    }

    protected getRequestData():{requestType:string,requestData:any}{
		return {requestType:NetRequestConst.REQUEST_EMPEROR_GETACTIVE,requestData:{}};
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        let view = this;
        let cmd = data.data.cmd;
        if(cmd == NetRequestConst.REQUEST_EMPEROR_GETACTIVE){
            if (data.data.data.activeinfo)
            {
                Api.emperorwarVoApi.setActiveInfo(data.data.data.activeinfo);
            }
        }
	}
    
    protected initView():void{
        let view = this;
        //活动详情
        let detailBtn = ComponentManager.getButton(`empdetail`, ``, view.clickDetail, this);
        view.setLayoutPosition(LayoutConst.lefttop, detailBtn, view.titleBg, [10,view.titleBg.height + 10]);
        view.addChild(detailBtn);
        //倒计时提示
        let timeBg = BaseBitmap.create(`empgodbless_tip_bg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, view.titleBg, [0,view.titleBg.height + 12]);
        view.addChild(timeBg);
        view._time = 86400;
        view._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal(`emperorTimeDesc`, [App.DateUtil.getFormatBySecond(view._time)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, timeBg);
        view.addChild(view._timeDesc);
        
        //报名按钮 按时间段显示
        let tiemParam = Math.floor(Math.random() * 2);
        view._midBtn = ComponentManager.getButton(tiemParam == 1 ? "empbming" : "empenter","",this.enterHandle,this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._midBtn, view);
        view.addChild(view._midBtn);
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);

        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorReward`, view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, rewardBtn, emparena_bottom, [50,0]);
        view.addChild(rewardBtn);

        let bmcBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorBmc`, view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, bmcBtn, emparena_bottom, [50,0]);
        view.addChild(bmcBtn);
    }
    //活动详情弹窗
    private clickDetail():void{
        let view = this;
    }

    protected tick():void{
        let view = this;
        -- view._time;
        view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc`, [App.DateUtil.getFormatBySecond(view._time)]);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
    }
    //中部按钮
    private enterHandle():void{
        let view = this;
        if(view._midBtn.resourceName == `empenter`){

        }
        else if(view._midBtn.resourceName == `empbming`){
            //报名弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSIGNPOPVIEW);
        }
    }
    //奖励弹窗
    private rewardClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
        
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW);
    }
    //报名册弹窗
    private bmcClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    }

    public dispose():void{
        let view = this;
        view._timeDesc = null;
        super.dispose();
    }
}
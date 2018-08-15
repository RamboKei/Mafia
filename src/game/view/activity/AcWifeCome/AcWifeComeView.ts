// TypeScript file
/**
 * 网红来了活动
 */
class AcWifeComeView extends CommonView
{
    //活动model对应vo
    private _dataVo: any = null;

    //活动配置的cfg
    private _dataCfg: any = null;

    //是否已经领取
    private _isCollected: boolean = false;

    //容器
    private _nodeContainer: BaseDisplayObjectContainer = null;

    //top背景图片
    private _topBgImg: BaseBitmap = null;

    //bottom背景图片
    private _bottomBgImg: BaseBitmap = null;

    //活动时间title文字
    private _actTimeTitleText: BaseTextField = null;

    //活动时间文本
    private _actTimeText: BaseTextField = null;

    //绝版活动限时的文本
    private _actDescText: BaseTextField = null;

    //活动详情文本
    private _actDetailText: BaseTextField = null;

    //照片
    private _contentImg: BaseBitmap = null;

    //真人入住的标识
    private _misaJoinImg: BaseBitmap = null;

    //进度条
    private _progress: ProgressBar = null;

    //进度条文字
    private _progressText: BaseTextField = null;

    //已经领取标识
    private _collectFlag: BaseBitmap = null;

    //领取按钮
    private _collectBtn: BaseButton = null;

    //充值按钮
    private _chargeBtn: BaseButton = null;

    


    public constructor() 
    {
        super();
    }

    //init view 
    public initView(): void
    {
        //初始化数据
        if(this._dataVo == null)
        {
            this._dataVo = Api.acVoApi.getActivityVoByAidAndCode("wifeCome");
        }

        if(this._dataCfg == null)
        {
            this._dataCfg = Config.AcCfg.getCfgByActivityIdAndCode("wifeCome",this._dataVo.code);
        }
        //初始化已经领取标识
        this._isCollected = this._dataVo.get == 1 ? true : false;


        //初始化界面
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = GameConfig.stageHeigth - 104;
        this.addChildToContainer(this._nodeContainer);

        this._topBgImg = BaseBitmap.create("forpeople_top");
        this._topBgImg.y = -82;
        this._nodeContainer.addChild(this._topBgImg);

        this._actTimeTitleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._actTimeTitleText.text = LanguageManager.getlocal("acWifeComeTimeTitle");       
        this._actTimeTitleText.x = 10;
        this._actTimeTitleText.y = this._topBgImg.y + 75;
        this._nodeContainer.addChild(this._actTimeTitleText);

        this._actTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        this._actTimeText.text = this._dataVo.acTimeAndHour;//"11月20日－11月22日(每日9-22点)";
        this._actTimeText.x = 110;
        this._actTimeText.y = this._topBgImg.y + 75;
        this._nodeContainer.addChild(this._actTimeText);

        this._actDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._actDescText.text = LanguageManager.getlocal("acWifeComeDesc");//"绝版活动限时来袭，快来与Misa缔结良缘";
        this._actDescText.x= 10;
        this._actDescText.y = this._topBgImg.y + 105;
        this._nodeContainer.addChild(this._actDescText);

        this._actDetailText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        this._actDetailText.text = LanguageManager.getlocal("acWifeComeDetail",[this._dataCfg.exchange,this._dataCfg.need]);//"活动期间，每充值1元会赠送给红颜1朵花，满99朵获得米莎公主";
        this._actDetailText.x = 10;
        this._actDetailText.y = this._topBgImg.y + 135;
        this._nodeContainer.addChild(this._actDetailText);
        
        this._contentImg = BaseBitmap.create("acwifecomeview_content");
        this._contentImg.y = -82 + this._topBgImg.height;
        this._nodeContainer.addChild(this._contentImg);

        //网红名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
		nameBg.x = 20;
		nameBg.y = 285;
		this.addChildToContainer(nameBg);

        //网红名字
		let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeName"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
		nameTF.width = 27;
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
		nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
		this.addChildToContainer(nameTF);

        this._bottomBgImg = BaseBitmap.create("wifeskin_barbg");
        this._bottomBgImg.y = this._nodeContainer.height - this._bottomBgImg.height+13;
        this._nodeContainer.addChild(this._bottomBgImg);
        
        this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",this._nodeContainer.width - 60);
        this._progress.y = this._bottomBgImg.y - 50;
        this._progress.x = 40;
        this._nodeContainer.addChild(this._progress);

        this._progressText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
        this._progressText.text = "0/0";
        
        this._progressText.textAlign = egret.HorizontalAlign.CENTER;
        this._progressText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._progressText.x = this._nodeContainer.width/2 - this._progressText.width/2;
        this._progressText.y = this._progress.y + 4;
        this._nodeContainer.addChild(this._progressText);

        //花
        let flowerImg = BaseBitmap.create("acwifecomeview_flower");
        flowerImg.x = 17;
        flowerImg.y = this._bottomBgImg.y - 65;
        this._nodeContainer.addChild(flowerImg);
        //添加vo数据更改的消息监听
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE,this.refreshDataStatus,this);

        //刷新数据状态
        this.refreshDataStatus();

    }


    //刷新按钮初始化状态
    private refreshDataStatus()
    {
       
        //刷新进度条上的文本进度显示
        this._progressText.text = (this._dataVo.v > this._dataCfg.need ? this._dataCfg.need : this._dataVo.v) + "/" + this._dataCfg.need;
        this._progressText.x = this._nodeContainer.width/2 - this._progressText.width/2;
        this._progress.setPercentage(this._dataVo.v/this._dataCfg.need);
        
        //实际数值和需要数值的差
        let val = this._dataVo.v - this._dataCfg.need;
        let showMark = 0;  //1->显示充值按钮  2->显示领取按钮  3->显示标识
        if (val < 0){
            //没有达成需求，显示去充值按钮
            showMark = 1;
        } else {
            //已经达成需求，显示 领取按钮 或者显示 已经领取标识
            if (this._dataVo.get == 0){
                //没领取 显示 领取按钮
                showMark = 2;
            } /*else if(this._dataVo.get == 1 ){
                //已经领取 显示 已经领取标识
                showMark = 3;
            }*/
        }
        //刷新按钮状态
        this.refreshBtnStatus(showMark);

    }
    // private checkOwnWife():boolean{
    //     if(Api.wifeVoApi.getWifeInfoVoById(Number(213)))
    //     {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    //显示按钮
    //1->显示充值按钮  2->显示领取按钮  3->显示标识
    private refreshBtnStatus(showMar:number)
    {
        //创建按钮
        if(this._chargeBtn == null){
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler,this);
            this._chargeBtn.x = this._nodeContainer.width / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._chargeBtn);
        }

        if(this._collectBtn == null){
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.collectBtnHandler ,this);
            this._collectBtn.x = this._nodeContainer.width / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._collectBtn);
        }

        if(this._collectFlag == null){
            this.createCollectFlag();
        }
        //1->显示充值按钮  2->显示领取按钮  3->显示标识
        switch(showMar){
            case 1:
                this._chargeBtn.visible = true;
                this._collectBtn.visible = false;
                this._collectFlag.visible = false;
                break;
            case 2:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = true;
                this._collectFlag.visible = false;
                break;
            case 3:
                // this._chargeBtn.visible = false;
                // this._collectBtn.visible = false;
                // this.checkShowCollectAnim();
                // break;
            default:
                break;

        }

    }
    //创建已领取标识
    private createCollectFlag()
    {
        this._collectFlag = BaseBitmap.create("collectflag")
        this._collectFlag.setScale(0.7);
        this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
        
        this._collectFlag.x = this._nodeContainer.width / 2 ;
        this._collectFlag.y = this._bottomBgImg.y + 50;
        
        this._nodeContainer.addChild(this._collectFlag);

    }
    //判断是否播放标识动画
    private checkShowCollectAnim()
    {
        //刚刚领取 播放动画
        if(!this._isCollected)
        {
            this._isCollected = true;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},300);
        } else {
            this._collectFlag.visible = true;
        }
    }
    //点击领取按钮
    private collectBtnHandler()
    {
      

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD,{activeId:"wifeCome-"+this._dataVo.code})
        
    }
    //领取请求返回
    private collectBtnHandlerCallback(event: egret.Event)
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);
        let ret = event.data.data.ret;
        // let data = {get:1,v:this._dataVo.v};
        // this._dataVo.testFunc(data);
        console.log(event);
        

        //领取失败
        if(ret != 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        } else {
            // if (event.data.rewards == "10_213_1"){
            this.checkRewardSuccess();
            // }
        }
    }
    //成功获取 隐藏按钮
    private checkRewardSuccess(){
        //创建按钮
        if(this._chargeBtn == null){
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler,this);
            this._chargeBtn.x = this._nodeContainer.width / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._chargeBtn);
        }

        if(this._collectBtn == null){
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.collectBtnHandler ,this);
            this._collectBtn.x = this._nodeContainer.width / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._collectBtn);
        }

        if(this._collectFlag == null){
            this.createCollectFlag();
        }
       

        this._chargeBtn.visible = false;
        this._collectBtn.visible = false;
        this.checkShowCollectAnim();
   
  
    }

    //跳转充值界面
    private goRechargeHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    //加载资源
    protected getResourceList(): string[]
    {
        return super.getResourceList().concat([
            "forpeople_top",
            "acwifecomeview_content",
            "wifeskin_barbg",
            "progress3",
            "progress3_bg",
            "acwifecomeview_flower",
            "wifeview_namebg"
        ]);

    }
    public dispose(): void
    {
        
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE,this.refreshDataStatus,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);

        this._dataVo = null;
        this._dataCfg = null;
        this._isCollected = false;
        this._nodeContainer = null;
        this._topBgImg = null;
        this._bottomBgImg = null;
        this._actTimeTitleText = null;
        this._actTimeText = null;
        this._actDescText = null;
        this._actDetailText = null;
        this._contentImg = null;
        this._misaJoinImg = null;
        this._progress = null;
        this._progressText = null;
    
        this._collectFlag = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        
        
        super.dispose();
    }

}

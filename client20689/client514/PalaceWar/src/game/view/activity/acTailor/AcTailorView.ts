/**
 * 裁缝
 * author yanyuling
 * date 2018/03/01
 * @class AcTailorView
 */
class AcTailorView  extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _goldNumTxt:BaseTextField;
    private _skinNumTxt:BaseTextField;

	public constructor() 
	{
		super();
	}
    public initView()
    { 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN),this.refreshSkinNum,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETENTAILOR),this.buyCallbackHandler,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETAILOR),this.buyCallbackHandler,this);

        this._nodeContainer = new  BaseDisplayObjectContainer();
		// this._nodeContainer.y = 100;
        this.addChildToContainer(this._nodeContainer);
        let tailorCfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,String(this.code));


        let bg = BaseBitmap.create("tailor_bg");
        bg.y = -100;
        this._nodeContainer.addChild(bg);

        let tailor_word = BaseBitmap.create("tailor_word");
        tailor_word.y = 50;
        tailor_word.x = 270
        this._nodeContainer.addChild(tailor_word);

        let resIcon1 = BaseBitmap.create("public_icon1");
        resIcon1.x = 120;
        resIcon1.y =  -10;
        this._nodeContainer.addChild(resIcon1);

        this._goldNumTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),18);
        this._goldNumTxt.x = resIcon1.x + 50;
        this._goldNumTxt.y = resIcon1.y + 15;
        this._nodeContainer.addChild(this._goldNumTxt);

        let resIcon2 = BaseBitmap.create("tailor_icon2");
        resIcon2.x = 380;
        resIcon2.y = resIcon1.y+5;
        this._nodeContainer.addChild(resIcon2);

        this._skinNumTxt = ComponentManager.getTextField("",18);
        this._skinNumTxt.text = Api.itemVoApi.getItemNumInfoVoById("2101").toString();
        this._skinNumTxt.x = resIcon2.x + 50;
        this._skinNumTxt.y = this._goldNumTxt.y ;
        this._nodeContainer.addChild(this._skinNumTxt);

        
        let stTxt = App.DateUtil.getFormatBySecond(this.acVo.st,9);
        let etTxt = App.DateUtil.getFormatBySecond(this.acVo.et,9);
        let acCDTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_QUALITY_GREEN);
        acCDTxt.text = LanguageManager.getlocal("acPunishDate",[stTxt,etTxt]);
		acCDTxt.x = 330;
		acCDTxt.y = 145;
        this._nodeContainer.addChild(acCDTxt);

        let illustratedBtn = ComponentManager.getButton("tailor_btn2","",this.illuHandler,this);
        illustratedBtn.x = 10;
        illustratedBtn.y = 50;
        this._nodeContainer.addChild(illustratedBtn);

        let rewardBtn = ComponentManager.getButton("tailor_btn1","",this.rewardHandler,this);
        rewardBtn.x = 130;
        rewardBtn.y = illustratedBtn.y;
        this._nodeContainer.addChild(rewardBtn);

        let tailor_namebg1 = BaseBitmap.create("tailor_btn1_txt");
        tailor_namebg1.x = illustratedBtn.x + illustratedBtn.width/2 - tailor_namebg1.width/2;
        tailor_namebg1.y = illustratedBtn.y + rewardBtn.height - 30;
        this._nodeContainer.addChild(tailor_namebg1);

        let tailor_namebg2 = BaseBitmap.create("tailor_btn2_txt");
        tailor_namebg2.x = rewardBtn.x + rewardBtn.width/2 - tailor_namebg2.width/2;
        tailor_namebg2.y = tailor_namebg1.y;
        this._nodeContainer.addChild(tailor_namebg2);

        /**
         * 中间展示区域,如果数量过少，无法铺满横屏，则应不滚动
         */

         let keys = Object.keys(tailorCfg.showList);
         let showList = tailorCfg.showList;

         let len = showList.length;
         for (var index = 0; index < len; index++) {
             let card = new AcTailorSkinItem();
             let skininfo = showList[index];
             card.init(skininfo,this.aid,this.code);
             let movX = card.width* index;
             let tarLen = card.width* len ;
             card.x = movX;
             card.y = 200-5;
             let perT = 4500;
             egret.Tween.get(card,{loop:true}).to({x:-card.width},(index+1)*perT).set({x:card.width* (len-1) },card).to({x:movX},(len-index-1)*perT),
            this._nodeContainer.addChild(card);
         }

        let buyTip = ComponentManager.getTextField(LanguageManager.getlocal("acTailBuyTip"),20);
        buyTip.x = GameConfig.stageWidth/2 - buyTip.width/2;
        buyTip.y = 710;
        this._nodeContainer.addChild(buyTip);

        let sliverIcon = BaseLoadBitmap.create("itemicon1001");
        sliverIcon.x = buyTip.x + 160;
        sliverIcon.y = buyTip.y-18;
        sliverIcon.setScale(0.5);
        this._nodeContainer.addChild(sliverIcon);
        
       
        let buyOnceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acTailorBtnOne",this.buyHandler,this,[1]);
        
        buyOnceBtn.x = 100;
        buyOnceBtn.y = 770;
        this._nodeContainer.addChild(buyOnceBtn);

        let oneCostIcon = BaseBitmap.create("public_icon1");
        oneCostIcon.x = buyOnceBtn.x + 30;
        oneCostIcon.y = buyOnceBtn.y - 30;
        oneCostIcon.name = "oneCostIcon";
        oneCostIcon.setScale(0.7);
        this._nodeContainer.addChild(oneCostIcon);

        let vo = <AcTailorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
       
        let oneCostTxt = ComponentManager.getTextField(String(tailorCfg.cost),18);
        oneCostTxt.name = "oneCostTxt";
        oneCostTxt.x = oneCostIcon.x + oneCostIcon.width-5;
        oneCostTxt.y = oneCostIcon.y +oneCostIcon.height/2 - oneCostTxt.height/2-5;
        this._nodeContainer.addChild(oneCostTxt);

        let freeTxtStr = "acTailorFree"; 
        // // if(PlatformManager.checkIsTWBSp())
        // {
        //     freeTxtStr = "acTailorFree";
        // }
        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal("sysFreeDesc"),18,TextFieldConst.COLOR_WARN_GREEN);
        freeTxt.name = "freeTxt";
        freeTxt.text = LanguageManager.getlocal(freeTxtStr);
        freeTxt.x = buyOnceBtn.x + buyOnceBtn.width/2 - freeTxt.width/2;
        freeTxt.y = oneCostTxt.y;
        freeTxt.visible = false;
        this._nodeContainer.addChild(freeTxt);
        if(vo.getFreeNum() == 1)
        {
            oneCostTxt.visible = false;
            oneCostIcon.visible = false;
            freeTxt.visible = true;
        }

        let buyTeneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acTailorBtnTen",this.buyHandler,this,[10]);
        buyTeneBtn.x = 400;
        buyTeneBtn.y = buyOnceBtn.y;
        this._nodeContainer.addChild(buyTeneBtn);
        // if(PlatformManager.checkIsTWBSp())
        // {
            let oneStr = LanguageManager.getlocal("acTailorBtnTW",["1"]);
            let tenStr = LanguageManager.getlocal("acTailorBtnTW",["10"]);
            buyTeneBtn.setText(tenStr,false);
            buyOnceBtn.setText(oneStr,false);
            
            let sliver1 = BaseLoadBitmap.create("itemicon1001");
            sliver1.x = buyOnceBtn.x + 65;
            sliver1.y = buyOnceBtn.y+5;
            sliver1.setScale(0.4);
            this._nodeContainer.addChild(sliver1);

            let sliver2 = BaseLoadBitmap.create("itemicon1001");
            sliver2.x = buyTeneBtn.x + 60;
            sliver2.y = sliver1.y ;
            sliver2.setScale(0.4);
            this._nodeContainer.addChild(sliver2);
        // }

        let tenCostIcon = BaseBitmap.create("public_icon1");
        tenCostIcon.x = buyTeneBtn.x + 30;
        tenCostIcon.y = oneCostIcon.y;
        tenCostIcon.setScale(0.7);
        this._nodeContainer.addChild(tenCostIcon);

        let tenCostTxt = ComponentManager.getTextField(String(tailorCfg.cost * tailorCfg.discount*10),18);
        tenCostTxt.x = tenCostIcon.x + tenCostIcon.width-5;
        tenCostTxt.y = oneCostTxt.y ;
        this._nodeContainer.addChild(tenCostTxt);

        let tenTip = ComponentManager.getTextField(LanguageManager.getlocal("acTailTenTip"),18);
        tenTip.x = buyTeneBtn.x + buyTeneBtn.width/2 - tenTip.width/2;
        tenTip.y = buyTeneBtn.y +60;
        this._nodeContainer.addChild(tenTip);

    }

    protected buyHandler(param:number)
    {
         /**
         * 活动已结束
         */
        if(Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code).isStart==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }

        let tailorCfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,String(this.code));
       
        if(param == 1)
        {
            let vo = <AcTailorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
            if(vo.getFreeNum() != 1 && Api.playerVoApi.getPlayerGem() < tailorCfg.cost)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETAILOR,{activeId:this.aid + "-"+this.code});
        }else
        {
            if(Api.playerVoApi.getPlayerGem() < tailorCfg.cost* tailorCfg.discount * 10)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETENTAILOR,{activeId:this.aid + "-"+this.code});
        }
    }
     protected buyCallbackHandler(event:egret.Event)
    {
        let rdata = event.data.data
        if(rdata.ret != 0)
        {
            return;
        }

        let vo = <AcTailorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if(vo.getFreeNum() == 1)
        {
            this._nodeContainer.getChildByName("oneCostTxt").visible = false;
            this._nodeContainer.getChildByName("oneCostIcon").visible = false;
            this._nodeContainer.getChildByName("freeTxt").visible = true;
        }else{
            this._nodeContainer.getChildByName("oneCostTxt").visible = true;
            this._nodeContainer.getChildByName("oneCostIcon").visible = true;
            this._nodeContainer.getChildByName("freeTxt").visible = false;
        }
        this._goldNumTxt.text  = Api.playerVoApi.getPlayerGemStr() ;
        this._skinNumTxt.text = Api.itemVoApi.getItemNumInfoVoById("2101").toString();

        let tailorCfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,String(this.code));
        let rewards = rdata.data.rewards ; //6_1212_1
        let buyCost = tailorCfg.cost
        if(rewards.indexOf("|") != -1)
        {
            buyCost = buyCost * tailorCfg.discount*10
        }
        ViewController.getInstance().openView("AcTailorGetView",
        {
            rewards:rdata.data.rewards,
            buyCost:buyCost,
            callback:this.buyHandler,
            handler:this,
        });

    }

    protected refreshSkinNum()
    {
        this._skinNumTxt.text = Api.itemVoApi.getItemNumInfoVoById("2101").toString();
    }
    protected  rewardHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.ACTAILOREXCHANGEVIEW,{aid:this.aid,code:this.code});
    }

    protected illuHandler()
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACTAILORREWARDPOPUPVIEW,{aid:this.aid,code:this.code});
    }

    protected getResourceList():string[]
    {
        return super.getResourceList().concat([
            "tailor_bg","tailor_box","tailor_clothes","tailor_icon1","tailor_icon", "tailor_iconBtn_down", "tailor_iconBtn","tailor_mask","tailor_namebg",
            "tailor_icon2","tailor_word","tailor_skinMask","tailor_btn1","tailor_btn2",
            "tailor_btn1_down","tailor_btn2_down","tailor_btn1_txt","tailor_btn2_txt",
        ]);
    }

    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN),this.refreshSkinNum,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETENTAILOR),this.buyCallbackHandler,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_USETAILOR),this.buyCallbackHandler,this);
        this._nodeContainer = null;
        this._goldNumTxt = null;
        this._skinNumTxt = null;

		super.dispose();
	}
}
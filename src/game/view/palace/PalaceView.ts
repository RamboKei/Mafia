/**
 * 本服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceView
 */

class PalaceView extends CommonView
{
    /**
     * 配置点击位置及跳转关系
     * 650 765
     */
    protected _posList = [];
    private _nodeContainer:BaseDisplayObjectContainer;
    private _bg:BaseBitmap;
    private _touchCancel:boolean = false;
    private _hitKey:string  = "";
    private _shadowList=[];
    private _curTouchShadow:BaseBitmap;
    constructor()
    {
        super();
    }
    protected initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX,{});//分封的相关数据

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this.initPosCfg();
        let bg = BaseLoadBitmap.create(this.getBgRes());
        bg.width = 640;
        bg.height = 1136;
        this._nodeContainer.addChild(bg);
        this._bg = bg;
        this._bg.y =  GameConfig.stageHeigth - this._bg.height - this.container.y;
        this._bg.addTouch(this.onBgTouchHandler,this,null,true);

        let buiCfg = GameConfig.config.buildingCfg;
        let buiIdlist = Object.keys(buiCfg);
        buiIdlist.sort((dataA,dataB)=>{
            return Number(dataA) - Number(dataB);
        })
        
        // for (var key in this._posList) {
        let starIdx = this.getStartIdx();
        for (let index = 0; index < this._posList.length; index++) {
            let poscfg =this._posList[index];
            let buildId= buiIdlist[index+starIdx];
            let cfg = buiCfg[buildId];

            if (Api.palaceVoApi.isShowBuildingFlag(buildId))
            {
                let flagImg = BaseBitmap.create("palace_building_flag"+poscfg.flagId);
                flagImg.x = this._bg.x + poscfg.x;
                flagImg.y = this._bg.y + poscfg.y;
                this._nodeContainer.addChild(flagImg);
            }

            let shadowImg =  BaseBitmap.create("palace_shadow"+poscfg.shadowId);
            shadowImg.x = this._bg.x + poscfg.x;
            shadowImg.y = this._bg.y + poscfg.y;
            shadowImg.setScale(4);
            shadowImg.alpha = 0.5;
            shadowImg.visible = false;
            this._nodeContainer.addChild(shadowImg);
            shadowImg.name = buildId;
            this._shadowList.push(shadowImg);

            let buildingFlag = BaseLoadBitmap.create("palace_build_"+buildId);
            if (this.isLockedWithSwitch(buildId) )
            {
                App.DisplayUtil.changeToGray(buildingFlag);
            }

            //英文版本位置
            if(PlatformManager.checkIsTextHorizontal()){
                buildingFlag.width = 148;
                buildingFlag.height = 30;

                buildingFlag.x = this._bg.x + poscfg.ennameX;
                buildingFlag.y = this._bg.y + poscfg.ennameY;
                

            } else {
                buildingFlag.width = 35;
                buildingFlag.height = 96;
                buildingFlag.setScale(1.2);
                buildingFlag.x = this._bg.x + poscfg.x + poscfg.width;
                buildingFlag.y = this._bg.y + poscfg.y-20;
                

            }

            this._nodeContainer.addChild(buildingFlag);
        }
        this.initBottomView();
    }
    
    protected isLockedWithSwitch(buiId:string)
    {
        if( (buiId == "31" || buiId == "62") && !Api.switchVoApi.checkEmperorOpen())
        {
            return true;
        }

        let buildcfg = GameConfig.config.buildingCfg[buiId];
        if(buildcfg.state == 0 && !Api.switchVoApi.checkIsBuildingState(buiId))
        {
            return true;
        }

        if(buildcfg.state == 1)
        {
            return false;
        }

        return false
    }

    public initBottomView()
    {
        
        let corssPath = this.getCorssBtnPath();
        if(corssPath)
        {
            let crossBtn = ComponentManager.getButton(corssPath,"",this.crossBtnHandler,this);
            crossBtn.x = 10;
            crossBtn.y = 10;
            this._nodeContainer.addChild(crossBtn);
        }

        if(Api.promoteVoApi._showNotice){
			Api.promoteVoApi._showNotice = false;
			ViewController.getInstance().openView('PromoteNoticeView');
		}
        //ViewController.getInstance().openView(ViewConst.POPUP.PROMOTENOTICEVIEW);
    }
    protected getStartIdx():number
    {
        return 7;
    }
    protected getCorssBtnPath()
    {
        if(Api.palaceVoApi.isCrossOpen()){
            return "palacve_goBtn";
        }
    }
    public initPosCfg()
    {
        this._posList = [
            {x:208, y:297, width:237, heigh:127,  shadowId:1,flagId:6, ennameX:244, ennameY:272},
            
            {x:46, y:529, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:38, ennameY:506},
            {x:256, y:543, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:244, ennameY:520},
            {x:459, y:532, width:128, heigh:77, shadowId:2 ,flagId:1 , ennameX:448, ennameY:508},
            
            {x:46, y:690, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:26, ennameY:664},
            {x:256, y:667, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:244, ennameY:644},
            {x:470, y:690, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:460, ennameY:664},
            
            {x:43, y:821, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:22, ennameY:794},
            {x:256, y:787, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:244, ennameY:760},
            {x:475, y:821, width:128, heigh:77,  shadowId:2 ,flagId:1 , ennameX:464, ennameY:794},
            
            {x:19, y:955, width:128, heigh:77, shadowId:4 ,flagId:3 , ennameX:18, ennameY:930},
            {x:233, y:975, width:193, heigh:145, shadowId:3 ,flagId:2 , ennameX:244, ennameY:952},
            {x:469, y:960, width:128, heigh:77, shadowId:5 ,flagId:4 , ennameX:466, ennameY:936},
        ];
    }
    public getBgRes():string
    {
        return "palace_bg2";
    }

    protected crossBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
        this.hide();
    }

    private onBgTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
            let hitPos = new egret.Point(Math.floor(e.localX),Math.floor(e.localY));
            this._hitKey = "";
            for (let key = 0; key < this._posList.length; key++)
			{
				let cfgPos =this._posList[key];
                if(cfgPos.x <= hitPos.x && hitPos.x <= cfgPos.x + cfgPos.width)
                {
                   if(cfgPos.y <= hitPos.y && hitPos.y <= cfgPos.y + cfgPos.heigh)
                    {
                        this._curTouchShadow = this._shadowList[key];
                        let buiId = this._curTouchShadow.name;
                        this._curTouchShadow.visible = true;
                        let bcfg = GameConfig.config.buildingCfg[buiId];
                      
                        if(this.isLockedWithSwitch(buiId)  )
                        {
                            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
                        }else{
                            this._hitKey = this._curTouchShadow.name;
                        }
                        break;
                    } 
                }
			}
		}

		if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
            this._touchCancel = true;
            this._hitKey = "";
            if(this._curTouchShadow){
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
		}

		if(e.type==egret.TouchEvent.TOUCH_END)
		{
            if(!this._touchCancel && this._hitKey != ""){
                // this._hitKey 处理点击
                this.doHitProcess(this._hitKey);
            }
            this._touchCancel = false;
            this._hitKey = "";
             if(this._curTouchShadow){
                this._curTouchShadow.visible = false;
             }
            this._curTouchShadow = null;
		}
	}

    protected doHitProcess(key:string)
    {
        let buildcfg = GameConfig.config.buildingCfg[key];
        
        let titleId = buildcfg.title;
        let buildingId = key;
        if(buildingId == '62'){
            ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
            return;
        }
        if(Object.keys(titleId).length == 1)
        {
            let tid = titleId[0];
            let titlecfg = Config.TitleCfg.getTitleCfgById(tid);
            if(!Config.TitleCfg.isTitleOPend(tid) )
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                return;
            }
            
            if(Config.TitleCfg.isTheKingTitleId(tid))
            {
                Api.palaceVoApi.enterKingsHouse(tid,buildingId);
            }else{
                ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:tid,buildingId:buildingId});
            }
        }
        else{
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEGROUPVIEW,{buildingId:buildingId});
        }
    }

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_PALACE;
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "palace_bg2","palace_bg3",
            "palace_hisBtn1","palace_hisBtn1_down",
            "palace_hisBtn2","palace_hisBtn2_down",
            "palace_hisBtn3","palace_hisBtn3_down",
            "palacve_goBtn","palacve_goBtn_down",
            "palacve_backBtn","palacve_backBtn_down",
            "palace_shadow1","palace_shadow2","palace_shadow3","palace_shadow4","palace_shadow5",
            "palace_building_flag1","palace_building_flag2","palace_building_flag3","palace_building_flag4",,"palace_building_flag6",
        ]);
    };
    
    protected getRequestData():{requestType:string,requestData:any}
	{ 
        return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    }
    
    // protected receiveData(data: { ret: boolean, data: any }):void
	// { 
    //     // data: { ret: boolean, data: any }
    //     // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    //     if(data.data.promoteFlag){
    //         Api.promoteVoApi._showNotice = true;
    //     }
    // }
    protected getPromoteList(evt : egret.Event):void{
        let list = evt.data.data.data.promoteList;
        if(list){
             Api.promoteVoApi.initListData(list);
        }
        Api.promoteVoApi._ishaveking = evt.data.data.data.ishaveking;
    }
    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);

        this._bg.removeTouch();
        this._posList = [];
        this._bg = null;
        this._touchCancel = null;
        this._hitKey = "";
        this._shadowList= [];
        this._curTouchShadow = null;

        super.dispose();
    }
}
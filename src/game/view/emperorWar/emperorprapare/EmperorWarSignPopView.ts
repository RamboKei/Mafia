/**
 * 称帝报名弹窗
 * author qianjun
 */
class EmperorWarSignPopView extends PopupView{
    
    public constructor(){
        super();
    }

    private _bmcBg : BaseBitmap = null;
    private _costText : BaseTextField = null;
    private _signBtn : BaseButton = null;
    private _ybMing : BaseBitmap = null;
    private _curRWB : number = 0;
    private _empMax : BaseTextField = null;
    private _empProgress : DragProgressBar = null;
    private _sign_g : BaseDisplayObjectContainer = null;
    private _ruleText2 : BaseTextField = null;
    private canTouch : boolean = false;

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"empbmcbg","empbmce_down","empbmce","emptdtiao", "empybmyin","progress2_bg","empjzdhua"
		]);
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    private get cfg(){
        return Config.EmperorwarCfg;
    }
    
    protected initView():void{
        let view = this;
        view._maskBmp.height = GameConfig.stageHeigth + 200;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BM),this.bmCallBack,this);
        
        let sign_g = new BaseDisplayObjectContainer();
        sign_g.width = 640;
        sign_g.height = 584;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sign_g, view);
        sign_g.alpha = 0;
        view.addChild(sign_g);
        view._sign_g = sign_g;

        let bmcbg = BaseBitmap.create('empbmcbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bmcbg, sign_g, [0,0]);
        view.addChild(bmcbg);
        bmcbg.mask = egret.Rectangle.create().setTo(320,0,0,GameConfig.stageHeigth);
        view._bmcBg = bmcbg;

        view.swapChildren(sign_g, bmcbg);

        view.closeBtn.visible = false;
        view.setLayoutPosition(LayoutConst.righttop, view.closeBtn, bmcbg, [0,0]);
        view.swapChildren(view.closeBtn, bmcbg);

        //描述规则
        let ruleText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorRuleDesc1`), 22);
        ruleText.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText, sign_g, [0,100], true);
        ruleText.lineSpacing = 6;
        //ruleText.y = (GameConfig.stageHeigth - view.viewBg.height) / 2 + 100;
        sign_g.addChild(ruleText);
        
        let ruleText2 = ComponentManager.getTextField(LanguageManager.getlocal(`emperorRuleDesc2`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleText2.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText2, ruleText, [0,ruleText.textHeight + 50]);
        ruleText2.lineSpacing = 6;
        sign_g.addChild(ruleText2);
        view._ruleText2 = ruleText2;

        let have = this.getCoin();
        view._curRWB = have;
        view._costText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorCost`, [`${view.cfg.enterMin}`]), 22);
        view.setLayoutPosition(LayoutConst.lefttop, view._costText, ruleText2, [0,ruleText2.textHeight+50]);
        sign_g.addChild(view._costText);

        let emperorMax = ComponentManager.getTextField(LanguageManager.getlocal(`emperorMax`, [`${have}`]), 22);
        view.setLayoutPosition(LayoutConst.righttop, emperorMax, ruleText2, [0,ruleText2.textHeight+50]);
        sign_g.addChild(emperorMax);
        view._empMax = emperorMax;

        let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("emptdtiao","progress2_bg",this.getCoin(),this.dragCallback,this,null,1,GameConfig.stageWidth - 80);
        if(have < this.cfg.enterMin){
            dragProgressBar.touchEnabled = false;
        }
        dragProgressBar.setDragPercent(have,have);
        dragProgressBar.setBtnVisible(false);

        view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view._costText, [-12,39]);
        sign_g.addChild(dragProgressBar);
        view._empProgress = dragProgressBar;

        let bmcBtn = ComponentManager.getButton(`empbmce`, ``, view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.leftbottom, bmcBtn, sign_g, [40,50], true);
        sign_g.addChild(bmcBtn);

        view._signBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorSign`, view.signClick, view);
        view._signBtn.visible = false;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._signBtn, sign_g, [0,80], true);
        sign_g.addChild(view._signBtn);

        view._ybMing = BaseBitmap.create(`empybmyin`);
        view._ybMing.visible = false;
        view._ybMing.anchorOffsetX = view._ybMing.width / 2;
        view.anchorOffsetY = view._ybMing.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, sign_g, [view._ybMing.width / 2,50], true);
        sign_g.addChild(view._ybMing);
        view.setBtnVisible();

        let juanzhou1 = BaseBitmap.create('empjzdhua');
        juanzhou1.setScale(1);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou1, sign_g, [0 - 17 * juanzhou1.scaleX,10 * juanzhou1.scaleY]);
        juanzhou1.alpha = 0;
        view.addChild(juanzhou1);

        let juanzhou2 = BaseBitmap.create('empjzdhua');
        juanzhou2.setScale(1);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou2, sign_g, [17 * juanzhou2.scaleY,10 * juanzhou2.scaleY]);
        juanzhou2.alpha = 0;
        view.addChild(juanzhou2);

        view._maskBmp.alpha = 1;
        egret.Tween.get(juanzhou1,{onChange : ()=>{
            if(juanzhou1 && juanzhou1.scaleX != 1){
                juanzhou1.x = sign_g.x + (sign_g.width - juanzhou1.width * juanzhou1.scaleX)/2 - 17 * juanzhou1.scaleX;
                juanzhou1.y = sign_g.y + (sign_g.height - juanzhou1.height * juanzhou1.scaleY)/2 + 10 * juanzhou1.scaleY;
            }
        }, onChangeObj : view}).to({scaleX : 3, scaleY : 3, alpha : 0} , 10).to({scaleX : 0.7, scaleY : 0.7, alpha : 1} , 400).to({scaleX : 1, scaleY : 1} , 200).call(()=>{
            juanzhou1.x = sign_g.x + (sign_g.width - 33)/2 - 17;
            juanzhou1.y = sign_g.y + (sign_g.height - juanzhou1.height * juanzhou1.scaleY)/2 + 10;
        },view).wait(500).to({x : 0}, 1000).call(()=>{
            juanzhou1.visible = false;
            egret.Tween.removeTweens(juanzhou1);
            view.removeChild(juanzhou1);
            juanzhou1 = null;
        },view);

        egret.Tween.get(juanzhou2,{onChange : ()=>{
            if(juanzhou2 && juanzhou2.scaleX != 1){
                juanzhou2.x = sign_g.x + (sign_g.width - juanzhou2.width * juanzhou2.scaleX)/2 + 17 * juanzhou2.scaleX;;
                juanzhou2.y = sign_g.y + (sign_g.height - juanzhou2.height * juanzhou2.scaleY)/2 + 10 * juanzhou2.scaleY;
            }
        }, onChangeObj : view}).to({scaleX : 3, scaleY : 3, alpha : 0} , 10).to({scaleX : 0.7, scaleY : 0.7, alpha : 1} , 400).to({scaleX : 1, scaleY : 1} , 200).call(()=>{
            juanzhou2.x = sign_g.x + (sign_g.width - juanzhou2.width * juanzhou2.scaleX)/2 + 17 * juanzhou2.scaleX;;
                juanzhou2.y = sign_g.y + (sign_g.height - juanzhou2.height * juanzhou2.scaleY)/2 + 10 * juanzhou2.scaleY;
        },view).wait(500).to({x : GameConfig.stageWidth - 33}, 1000).call(()=>{
            juanzhou2.visible = false;
            egret.Tween.removeTweens(juanzhou2);
            view.removeChild(juanzhou2);
            juanzhou2 = null;
        },view);
        
        egret.Tween.get(view._maskBmp).to({'alpha' : 1} , 1100).call(()=>{
            //播放卷轴动画
            egret.Tween.get(bmcbg.mask,{onChange : ()=>{
                if(bmcbg.mask){
                    bmcbg.mask.x = (640 - bmcbg.mask.width) / 2;
                }
            }, onChangeObj : view}).to({width : 640}, 1000).call(()=>{
                //文字出现
                view.canTouch = true;
                bmcbg.mask = null;
                egret.Tween.get(sign_g).to({alpha : 1}, 300).call(()=>{
                    view.closeBtn.visible = true;
                },view);
            },view);
        });
    }

    private dragCallback(curNum : number):void{
        let view = this;
        if(view.canTouch){
            view._curRWB = curNum;
            view._empMax.text = LanguageManager.getlocal(`emperorMax`, [`${curNum}`]);
            view.setLayoutPosition(LayoutConst.righttop, view._empMax, view._ruleText2, [0,view._ruleText2.textHeight+50]);
        }
    }
    //报名册弹窗
    private bmcClick():void{
        let view = this;
        if(view.canTouch){
            ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
        }
    }

    protected tick():void{
		let view = this;
		if(view.api.isInCalSignTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarPrepareTimeTip"));
            view.hide();
            return;
        }
	}

    private signClick():void{
        let view = this;
        if(view.api.isInCalSignTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarPrepareTimeTip"));
            view.hide();
            return;
        }
        if(view.canTouch){
            if(Api.prestigeVoApi.canEmperor()){
                if(view._curRWB < view.cfg.enterMin){
                    App.CommonUtil.showTip(LanguageManager.getlocal("emprorTip1"));
                }
                else{
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        title:"itemUseConstPopupViewTitle",
                        msg:LanguageManager.getlocal("emprorSignTipConfirm",[view._curRWB.toString()]),
                        callback:this.sendSignCall,
                        handler:this,
                        needCancel:true
                    });
                }
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarRule6"));
            }
        }
    }

    private sendSignCall():void{
        let view = this;
        if(view.canTouch){
            if(view.api.type > 2){
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarBMError"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_EMPEROR_BM, {
                version : view.api.getVersion(),
                pem : view._curRWB
            });
        }
    }

    private bmCallBack(evt : egret.Event):void{
        let view = this;
        if(view.canTouch){
            if(evt.data.data.ret < 0){
                App.CommonUtil.showTip(LanguageManager.getlocal('emperorWarSignFail'));
                return;
            }
            let data = evt.data.data.data;
            view.api.setDataInfo(data.myemperor);
            view.api.setActiveInfo(data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BM),this.bmCallBack,this);
            view._signBtn.visible = false;
            view._ybMing.alpha = 0;
            //view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, view.viewBg, [0,50]);
            view._ybMing.visible = true;
            egret.Tween.get(view._ybMing).to({scaleX : 1.3, scaleY : 1.3}, 50).
            to({scaleX : 1, scaleY : 1, alpha : 1}, 500);
            view._empMax.text = LanguageManager.getlocal(`emperorMax`, [`${view.api.getCurSignRWB()}`]);
            view.setLayoutPosition(LayoutConst.righttop, view._empMax, view._ruleText2, [0,view._ruleText2.textHeight+50]);
            view._empProgress.visible = false; 
        }
    }

    private getCoin():number{
        return Api.prestigeVoApi.getPem();
    }

    private setBtnVisible():void{
        let view = this;
        let isSign = view.api.isSignForWar();
        view._signBtn.visible = !isSign;
        view._ybMing.visible = isSign;
        view._empProgress.visible = !isSign;
        if(isSign){
            view._empMax.text = LanguageManager.getlocal(`emperorMax`, [`${view.api.getCurSignRWB()}`]);
            view.setLayoutPosition(LayoutConst.righttop, view._empMax, view._ruleText2, [0,view._ruleText2.textHeight+50]);
        } 
    }

    // 背景图名称
	protected getBgName():string{
		return null;
    }
    
    protected initTitle():void{
        return null;
    }

    protected getCloseBtnName(){
        return 'popupview_closebtn1';
    }

    protected isTouchMaskClose():boolean{
		return false;
    }
    
    public hide():void{
        let view = this;
        if(view.canTouch){
            super.hide();
        }
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BM),this.bmCallBack,this);
        egret.Tween.removeTweens(view._ybMing);
        egret.Tween.removeTweens(view._maskBmp);
        egret.Tween.removeTweens(view._bmcBg);
        egret.Tween.removeTweens(view._sign_g);
        view._bmcBg = null;
        view._costText = null;
        view._signBtn = null;
        view._ybMing = null;
        view._curRWB = 0;
        view._empMax = null;
        view._empProgress = null;
        view._sign_g = null;
        view._ruleText2 = null;
        super.dispose();
    }
}
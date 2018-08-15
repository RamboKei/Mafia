/**
 * 称帝报名弹窗
 * author qianjun
 */
class EmperorWarSignPopView extends PopupView{
    
    public constructor(){
        super();
    }

    private _costText : BaseTextField = null;
    private _signBtn : BaseButton = null;
    private _ybMing : BaseBitmap = null;
    private _curRWB : number = 0;

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"empbmcbg","empbmce_down","empbmce","emptdtiao", "empybmyin","progress2_bg"
		]);
    }

    private get cfg(){
        return Config.EmperorwarCfg;
    }
    
    protected initView():void{
        let view = this;
        view.viewBg.y = GameConfig.stageHeigth/2 - this.viewBg.height/2;
        view._curRWB = Math.floor(Math.random() * (view.cfg.enterMin * 2));
        //描述规则
        let ruleText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorRuleDesc1`), 22);
        ruleText.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText, view.viewBg, [0,100]);
        ruleText.lineSpacing = 6;
        //ruleText.y = (GameConfig.stageHeigth - view.viewBg.height) / 2 + 100;
        view.addChild(ruleText);
        
        let ruleText2 = ComponentManager.getTextField(LanguageManager.getlocal(`emperorRuleDesc2`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleText2.width = GameConfig.stageWidth - 100;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, ruleText2, ruleText, [0,ruleText.textHeight + 50]);
        ruleText2.lineSpacing = 6;
        view.addChild(ruleText2);

        let have = this.getCoin();
        view._costText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorCost`, [`${have}`]), 22);
        view.setLayoutPosition(LayoutConst.lefttop, view._costText, ruleText2, [0,ruleText2.textHeight+50]);
        view.addChild(view._costText);

        let emperorMax = ComponentManager.getTextField(LanguageManager.getlocal(`emperorMax`, [`${have}`]), 22);
        view.setLayoutPosition(LayoutConst.righttop, emperorMax, ruleText2, [0,ruleText2.textHeight+50]);
        view.addChild(emperorMax);

        let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("emptdtiao","progress2_bg",this.getCoin(),this.dragCallback,this,null,1,GameConfig.stageWidth - 80);
        dragProgressBar.setDragPercent(this.getCoin(),this.getCoin());
        dragProgressBar.setBtnVisible(false);
        view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view._costText, [-12,39]);
		view.addChild(dragProgressBar);

        let bmcBtn = ComponentManager.getButton(`empbmce`, ``, view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.leftbottom, bmcBtn, view.viewBg, [40,50]);
        view.addChild(bmcBtn);

        view._signBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorSign`, view.signClick, view);
        view._signBtn.visible = false;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._signBtn, view.viewBg, [0,80]);
        view.addChild(view._signBtn);

        view._ybMing = BaseBitmap.create(`empybmyin`);
        view._ybMing.visible = false;
        view._ybMing.anchorOffsetX = view._ybMing.width / 2;
        view.anchorOffsetY = view._ybMing.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, view.viewBg, [view._ybMing.width / 2,50]);
        view.addChild(view._ybMing);
        view.setBtnVisible();
    }

    private dragCallback(curNum : number):void{
        let view = this;
        view._costText.text = LanguageManager.getlocal(`emperorCost`, [`${curNum}`]);
    }
    //报名册弹窗
    private bmcClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    }

    private signClick():void{
        let view = this;
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

    private sendSignCall():void{
        //盖章动画
        let view = this;
        view._signBtn.visible = false;
        view._ybMing.alpha = 0;
        //view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._ybMing, view.viewBg, [0,50]);
        view._ybMing.visible = true;
        egret.Tween.get(view._ybMing).to({scaleX : 1.3, scaleY : 1.3}, 50).
        to({scaleX : 1, scaleY : 1, alpha : 1}, 500);
    }

    private getCoin():number{
        let view = this;
        return view._curRWB;
    }

    private setBtnVisible():void{
        let view = this;
        let isSign = Math.floor(Math.random() * 2) == 1;
        view._signBtn.visible = isSign;
        view._ybMing.visible = !isSign;
    }

    // 背景图名称
	protected getBgName():string{
		return "empbmcbg";
    }
    
    protected initTitle():void{
        return null;
    }

    protected getCloseBtnName(){
        return null;
    }

    protected isTouchMaskClose():boolean{
		return true;
	}

    public dispose():void{
        let view = this;
        egret.Tween.removeTweens(view._ybMing);
        super.dispose();
    }
}
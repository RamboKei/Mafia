/*
author : qianjun
desc : 七夕活动
*/
class AcDoubleSeventhView extends AcCommonView{
    public constructor(){
        super();
    }

    public static AID:string = null;
    public static CODE:string = null;

    private _lqbtn : BaseButton = null;
    private _lqjindu : number = 1;
    private _acchargetipTxt : BaseTextField = null;
    private _build1 : BaseBitmap = null;
    private _build1name : BaseBitmap = null;
    private _build2 : BaseBitmap = null;
    private _build2name : BaseBitmap = null;
    private _build3 : BaseBitmap = null;
    private _build3name : BaseBitmap = null;
    private _build4 : BaseBitmap = null;
    private _build4name : BaseBitmap = null;
    private _build5 : BaseBitmap = null;
    private _build5name : BaseBitmap = null;
    private _build6 : BaseBitmap = null;
    private _build6name : BaseBitmap = null;
    private _build7 : BaseBitmap = null;
    private _build7name : BaseBitmap = null;
    private _build8 : BaseBitmap = null;
    private _build8name : BaseBitmap = null;
    private _dliangfont : BaseBitmap = null;


    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
    }

    private get acTivityId() : string{
        return `${AcDoubleSeventhView.AID}-${AcDoubleSeventhView.CODE}`;
    }

    protected getTitleStr():string{
        return 'acDoubleSeventhViewTitle';
    }

     // 背景图名称
	protected getBgName():string
	{
        return 'acsevenbg';
    }
    
    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;

            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = Math.floor(GameConfig.stageHeigth - 1136);
		}
	}
    //
    public initView(){
        let view = this;
        AcDoubleSeventhView.AID = view.aid;
		AcDoubleSeventhView.CODE = view.code;
        view.width = GameConfig.stageWidth;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 

        let top = BaseBitmap.create('acseventopbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, top, view.titleBg, [0,view.titleBg.height]);
        view.addChild(top);

        let man = BaseBitmap.create('wife_skinhalf_1091');
        man.setScale(0.9);
        view.setLayoutPosition(LayoutConst.leftbottom, man, top, [0,30]);
        view.addChild(man);
        //活动时间
        let ac_timeTF : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTime",[view.vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ac_timeTF.textAlign = egret.HorizontalAlign.LEFT;
        ac_timeTF.width = 340;
        view.setLayoutPosition(LayoutConst.righttop, ac_timeTF, top, [50,10]);
        view.addChild(ac_timeTF);
        
        //活动规则文本
        let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhRule",[LanguageManager.getlocal('acDoubleSeventhRuleDesc')]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        acruleTxt.textAlign = egret.HorizontalAlign.LEFT;
        acruleTxt.lineSpacing = 5;
        acruleTxt.width = 340;
        view.setLayoutPosition(LayoutConst.righttop, acruleTxt, ac_timeTF, [0,ac_timeTF.textHeight + 10]);
        view.addChild(acruleTxt);
        

        let actipTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, actipTxt, acruleTxt, [0,acruleTxt.textHeight + 10]);
        view.addChild(actipTxt);
        //建筑
        let isTh = PlatformManager.checkIsThSp();
        let pos_arr = {
            1 : {buildId : 1, buildPos : [0,505], namePos : isTh ? [22,456] : [25,434]},
            2 : {buildId : 2, buildPos : [0,683], namePos : isTh ? [0,670]: [22,657]},
            3 : {buildId : 3, buildPos : [166,763], namePos : isTh ? [138,746] :[298,717]},
            4 : {buildId : 4, buildPos : [331,783], namePos : isTh ? [422,778] : [460,771]},
            5 : {buildId : 5, buildPos : [468, 559], namePos : isTh ? [480,554] : [596,532]},
            6 : {buildId : 6, buildPos : [332,586], namePos : isTh ? [296,570] : [358,532]},
            7 : {buildId : 7, buildPos : [164,572], namePos : isTh ? [150,534] : [198,532]},
            8 : {buildId : 8, buildPos : [392,458], namePos : isTh ? [422,448] : [490,460]},
        }

        for(let i in pos_arr){
            let unit = pos_arr[i];
            let buildPic = BaseBitmap.create(`acsevenbuilding${unit.buildId}`);
            buildPic.x = unit.buildPos[0];
            buildPic.y = unit.buildPos[1] + Math.floor(view.viewBg.y);
            view.addChild(buildPic);
            buildPic.alpha = 1;
            view[`_build${unit.buildId}`] = buildPic; 
        }

        for(let i in pos_arr){
            let unit = pos_arr[i];
            let namePic = BaseBitmap.create(`acsevenbuild${unit.buildId}`);
            namePic.x = unit.namePos[0];
            namePic.y = unit.namePos[1] + Math.floor(view.viewBg.y);
            App.DisplayUtil.changeToGray(namePic);  
            view.addChild(namePic);
            view[`_build${unit.buildId}name`] = namePic; 
        }

        //当前进度与显示
        let lqBtn = ComponentManager.getButton('acsevenlampgray', '', view.lqBtnClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0,10]);
        view.addChild(lqBtn);
        view._lqbtn = lqBtn;

        let font = BaseBitmap.create('acsevendliang');
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, font, view, [5,0]);
        view.addChild(font);
        font.visible = false;
        view._dliangfont = font;

        let acchargetipTxt : BaseTextField = ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._acchargetipTxt = acchargetipTxt;
        view.addChild(acchargetipTxt);
        view.fresh_jindu();
        view.swapChildren(view.closeBtn, top);//view.closeBtn
                
        //查看奖励
        let ckjliBtn = ComponentManager.getButton('acsevenckjl', '', view.ckjlCall, view);
        view.setLayoutPosition(LayoutConst.leftbottom, ckjliBtn, view, [20,30]);
        view.addChild(ckjliBtn);

        //充值
        let czhiBtn = ComponentManager.getButton('acsevenczhi', '', view.czhiCall, view);
        view.setLayoutPosition(LayoutConst.rightbottom, czhiBtn, view, [20,30]);
        view.addChild(czhiBtn);

        //红点1
        // let public_dot1 =BaseBitmap.create("public_dot2");
        // this.addChild(public_dot1); ;
        // public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        // public_dot1.y = this.tabbarGroup.y; 
		// this.public_dot1 = public_dot1;
    }

    private showDialog(buildId):void{
        let view = this;
        // console.log(buildId);
        if(view.vo.getAvgConfig(buildId)){
            ViewController.getInstance().openView(ViewConst.BASE.ACDOUBLESEVENTHAVGVIEW,{
                f : view.avgendCallback,
                o : view,
                idx : 1,
                buidId : buildId
            });
        }
    }

    private avgendCallback():void{
        let view = this;
        let rewardList =  GameData.formatRewardItem(view._rewards);
        let pos = new egret.Point(view._lqbtn.x + (view._lqbtn.width / 2), view._lqbtn.y + (view._lqbtn.height / 2));
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

    private fresh_jindu():void{
        let view = this;
        let curJindu = view.vo.getCurJindu();
        let chargeNum= view.vo.getChargeNum();

        for(let i = 1; i <= curJindu; ++ i){
            view._lqjindu = i;
            egret.Tween.removeTweens(view[`_build${i}`]);
            if(chargeNum >= view.cfg.recharge[i].needGem && view.vo.isGetRecharge(i)){
                view[`_build${i}`].setRes(`acsevenbuilding${i}_open`); 
                view[`_build${i}`].alpha = 1;
                App.DisplayUtil.changeToNormal(view[`_build${i}name`]);  
            }
            if(chargeNum >= view.cfg.recharge[i].needGem && !view.vo.isGetRecharge(i)){
                break;
            } 
        }
        view.showBuilding(view._lqjindu);

        let descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        view._lqbtn.setBtnBitMap(chargeNum >= view.cfg.recharge[view._lqjindu].needGem ? 'acsevenlamp' : 'acsevenlampgray');
        view._dliangfont.visible = ((chargeNum >= view.cfg.recharge[view._lqjindu].needGem) && !view.vo.isGetRecharge(view._lqjindu));
        if(1){
            egret.Tween.get(view._dliangfont,{onChange : ()=>{
                view._dliangfont.x = (GameConfig.stageWidth - view._dliangfont.width * view._dliangfont.scaleX) / 2 + 5 * view._dliangfont.scaleX;
                view._dliangfont.y = GameConfig.stageHeigth - view._dliangfont.height - 10 * view._dliangfont.scaleY;
            }, onChangeObj : view, loop : true}).to({scaleX : 0.9, scaleY : 0.9},500).to({scaleX : 1, scaleY : 1},500);
        }
        view._acchargetipTxt.text = LanguageManager.getlocal("acDoubleSeventhChargeTip", [descNum.toString(), LanguageManager.getlocal(`acDoubleSeventhViewBuild${view._lqjindu}`)]);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._acchargetipTxt, view, [0,10]);
        view._acchargetipTxt.visible = descNum > 0;
    }

    private showBuilding(buildId){
        let view = this;
        if(view.vo.isGetRecharge(buildId)){
            return;
        }
        egret.Tween.get(view[`_build${buildId}`], {loop : true}).to({alpha : 0}, 1300).to({alpha : 1}, 1300);
    }

    private _rewards = '';
    private getrewardCallback(event):void{
        let view = this;
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(event.data.data.ret < 0){
            return;
        }
        view._rewards = rData.rewards
        if(view.vo.isGetRecharge(view._lqjindu)){
            view.showDialog(view._lqjindu);
        }
        else{
            view.showDialog(view._lqjindu - 1);
        }
        
    }

    private ckjlCall():void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACDOUBLESEVENTHAWARDVIEW);
    }

    private czhiCall():void{
        let view = this;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    private lqBtnClick():void{
        let view = this;
        let chargeNum = view.vo.getChargeNum();
        let descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(view.vo.isGetRecharge(view._lqjindu)){
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip3'));
            return;
        }
        if(descNum <= 0){
            NetManager.request(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD,{activeId:this.acTivityId,rechargeId:this._lqjindu});
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip2', [descNum.toString()]));
        }
    }

    protected getRuleInfo() : string{
        return `acDoubleSeventhRules`
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acsevenbg","acsevenbuilding2_open","acsevenbuilding2","acsevenbuilding4_open","acsevenbuilding4","wife_skinhalf_1091"
        ]);
	}

    
    public dispose():void
	{   
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        egret.Tween.removeTweens(view._dliangfont);
        view._lqbtn = null;
        view._lqjindu = 1;
        view._acchargetipTxt = null;
        for(let i = 1; i <= 8; ++ i){
            egret.Tween.removeTweens(view[`_build${i}`]);
            view[`_build${i}`] = null;
            view[`_build${i}name`] = null;
        }
        view._dliangfont = null;
        view._rewards = '';
        super.dispose();
    }
}
/**
 * 排行榜 膜拜弹出UI
 * author yanyuling
 * date 2017/10/26
 * @class RankWorshipView
 */

class RankWorshipView  extends BaseView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    protected _clickNum = 0;
    protected _hideSt=null;
    protected _rewardStr = "";
    public constructor() {
        super();
	}

	public initView():void
	{
        let UIData = this.param.data.data.data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.alpha = 0;
        this.addChild(this._nodeContainer);
        this.touchEnabled = false;
        this.addTouchTap(this.clickHandler,this)

        let topTxtBg = BaseBitmap.create("public_9_bg25");
        topTxtBg.width = 490;
        topTxtBg.height = 130;
        topTxtBg.x = GameConfig.stageWidth/2-490/2;
        topTxtBg.y = 80;
        this._nodeContainer.addChild(topTxtBg);

        let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 40;
        txt.x = topTxtBg.x + 20;
        txt.y = topTxtBg.y + 20;
        this._nodeContainer.addChild(txt);

        let resBg = BaseBitmap.create("public_numbg");
        resBg.x = topTxtBg.x + 330;
        resBg.y = topTxtBg.y + 80;
        this._nodeContainer.addChild(resBg);

        let goldIcon = BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.5);
        goldIcon.x = resBg.x + 10;
        goldIcon.y = resBg.y + resBg.height/2 - goldIcon.height/2-25;
        this._nodeContainer.addChild(goldIcon);
        this._rewardStr = "1_0_"+ UIData.gem;

        let goldTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        goldTxt.text = String(UIData.gem);
        goldTxt.x = goldIcon.x + 50;
        goldTxt.y = resBg.y + resBg.height/2 - goldTxt.height/2;
        this._nodeContainer.addChild(goldTxt);

        let scaleV = 1.0;
        let fullImg = Api.playerVoApi.getPlayerPortrait(UIData.level,UIData.pic);
        fullImg.setScale(scaleV);
        fullImg.x = GameConfig.stageWidth/2 - fullImg.width/2*scaleV;
        fullImg.y = GameConfig.stageHeigth - fullImg.height*scaleV;
        let tmpH = GameConfig.stageHeigth - resBg.y - resBg.height;
         fullImg.y = resBg.y + resBg.height + (tmpH-fullImg.height*scaleV)/2
        this._nodeContainer.addChild(fullImg);

        if (UIData.title != "")
        {
            let officerImg = BaseLoadBitmap.create("user_title_" + UIData.title +"_2");
            officerImg.x = GameConfig.stageWidth - 120;
            officerImg.y = fullImg.y + 30;
            this._nodeContainer.addChild(officerImg);
        }

        if (Number(UIData.vip) > 0)
        {
            let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
            vipImg.x = GameConfig.stageWidth/2 - 40;
            vipImg.y = GameConfig.stageHeigth - 150;
            this._nodeContainer.addChild(vipImg);
        }
        
        let namebg = BaseBitmap.create("rank_display_namebg");
        namebg.x = GameConfig.stageWidth/2 - namebg.width/2;
        namebg.y = GameConfig.stageHeigth - 110;
        this._nodeContainer.addChild(namebg);

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WHITE);
        nameTxt.text = UIData.name;
        nameTxt.x = GameConfig.stageWidth/2 - nameTxt.width/2;
        nameTxt.y = namebg.y + namebg.height/2 - nameTxt.height/2;
        this._nodeContainer.addChild(nameTxt);

        let tmpThis = this;
         egret.Tween.get(this._nodeContainer,{loop:false}).to({alpha:1},700).call(function(){
            let rnd = App.MathUtil.getRandom(1,11);
            let text =  LanguageManager.getlocal("rankDialogue"+rnd);
            tmpThis.typerEffect(txt,text);
             tmpThis.touchEnabled = false;
         });
    }
      /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */    
    protected typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null):void{
        var strArr:Array<any> = content.split("");
        var len:number = strArr.length;
        for (var i = 0; i < len; i++){
            egret.setTimeout(function () {              
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval*i);              
        }
    }

    protected clickHandler()
    {
        //飘奖励
        if( this._clickNum == 0)
        {
            let rList = GameData.formatRewardItem(this._rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else if( this._clickNum == 1)
        {
            this._hideSt = egret.setTimeout(this.hideSelf,this,500);
        }
        this._clickNum ++;
    }
    protected hideSelf()
    {
        egret.clearTimeout(this._hideSt);
        super.hide();
    }

	public dispose():void
	{
        this._nodeContainer = null;
        this._clickNum = 0;
        this._hideSt = null;
        this._rewardStr = "";
        super.dispose();
    }
}
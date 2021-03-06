var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var WifestatusShowView = (function (_super) {
    __extends(WifestatusShowView, _super);
    function WifestatusShowView() {
        return _super.call(this) || this;
    }
    WifestatusShowView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeget_bg",
            // "wifeget","wifeget_json"
            "wifeview_namebg"
        ]);
    };
    WifestatusShowView.prototype.getWifeid = function () {
        // if(typeof(this.param.data.wifeIdList) == "string"){
        // 	this.param.data.wifeIdList = [this.param.data.wifeIdList];
        // }
        // let wifeId =  this.param.data.wifeIdList.shift();
        var wifeId = this.param.data.wifeId;
        // //触发分阶段引导
        // if(wifeId == "101"){
        // 	Api.rookieVoApi.curGuideKey = "wife";
        // 	Api.rookieVoApi.insertWaitingGuide({"idx":"wife_1"},true);
        // }
        return wifeId;
    };
    WifestatusShowView.prototype.getWaitServantId = function () {
        if (typeof (this.param.data) == "object") {
            return this.param.data.servantId;
        }
        return null;
    };
    WifestatusShowView.prototype.initView = function () {
        SoundManager.pauseBg();
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
        this.reFreshView();
    };
    WifestatusShowView.prototype.reFreshView = function () {
        App.DisplayUtil.destory(this.container);
        var itemCfg = Config.WifeCfg.getWifeCfgById(this.getWifeid());
        // let id = itemCfg.id;
        // if (id == "211" && Api.switchVoApi.checkOpenWifeVideo()) {
        // 	App.VideoUtil.play("resource/other/wifeVideo/"+id+"/001001.mp4", ()=>{this.reFreshView2(itemCfg);});
        // } else {
        // 	this.reFreshView2(itemCfg);
        // }
        this.reFreshView2(itemCfg);
    };
    WifestatusShowView.prototype.reFreshView2 = function (itemCfg) {
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id));
        SoundManager.playEffect(wifeInfoVo.sound);
        // let bg:BaseBitmap=BaseBitmap.create("wifeget_bg");
        var bg = App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
        bg.setScale(GameConfig.stageWidth / bg.width);
        this.addChildToContainer(bg);
        // let lizi=App.ParticleUtil.getParticle("wifeget");
        // this.addChildToContainer(lizi);
        // lizi.start();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 840);
        var wifeIcon = BaseLoadBitmap.create(itemCfg.body, rect);
        wifeIcon.setScale(0.7);
        var pos = App.CommonUtil.getCenterPos(this.viewBg, wifeIcon, false);
        wifeIcon.setPosition(pos.x, pos.y);
        this.addChildToContainer(wifeIcon);
        // if(Api.wifeVoApi.isHaveBone(itemCfg.bone + "_ske"))
        // {
        // 	let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(itemCfg.bone);
        // 	// droWifeIcon.setScale(0.7)
        // 	droWifeIcon.x = wifeIcon.x + 210;
        // 	droWifeIcon.y = wifeIcon.y + 760*0.7 + 70;
        // 	this.addChildToContainer(droWifeIcon);
        // 	wifeIcon.visible = false;
        // }
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                // if(RES.hasRes(skinCfg.bone + "_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
                if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                    var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    droWifeIcon.setScale(1.0);
                    droWifeIcon.x = wifeIcon.x + 240;
                    droWifeIcon.y = wifeIcon.y + 848 * 0.7 + 20;
                    this.addChildToContainer(droWifeIcon);
                    wifeIcon.visible = false;
                }
            }
            else {
                if (Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske")) {
                    var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
                    droWifeIcon.setScale(1.0);
                    droWifeIcon.x = wifeIcon.x + 240;
                    droWifeIcon.y = wifeIcon.y + 848 * 0.7 + 20;
                    // this.addChildToContainer(droWifeIcon);
                    this.addChildToContainer(droWifeIcon);
                    // this._wifeContainer.visible = true
                    wifeIcon.visible = false;
                }
            }
        }
        else {
            if (Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske")) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
                droWifeIcon.setScale(1.0);
                droWifeIcon.x = wifeIcon.x + 240;
                droWifeIcon.y = wifeIcon.y + 848 * 0.7 + 20;
                // this.addChildToContainer(droWifeIcon);
                this.addChildToContainer(droWifeIcon);
                wifeIcon.visible = false;
            }
        }
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, false), wifeIcon.y + wifeIcon.height * wifeIcon.scaleY - bg.height * bg.scaleY);
        // lizi.y=wifeIcon.y - 100;
        // lizi.x = -350;
        var wifeInfoBg = BaseBitmap.create("public_9_wordbg");
        wifeInfoBg.height = 200;
        wifeInfoBg.setPosition(0, wifeIcon.y + wifeIcon.height * wifeIcon.scaleY);
        this.addChildToContainer(wifeInfoBg);
        // let txt1:BaseTextField=ComponentManager.getTextField();
        //红颜名字背景
        var nameBg = BaseBitmap.create("wifeview_namebg");
        nameBg.x = wifeIcon.x - nameBg.width + 10;
        nameBg.y = wifeIcon.y;
        this.addChildToContainer(nameBg);
        //红颜名字
        var nameTF = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.width = 27;
        nameTF.x = nameBg.x + (nameBg.width - nameTF.width) * 0.5;
        nameTF.y = nameBg.y + (nameBg.height - nameTF.height) / 2 - 40;
        this.addChildToContainer(nameTF);
        // //红颜说的话背景
        // let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
        // wordsBg.height=200;
        // wordsBg.x = 140;
        // wordsBg.y = wifeIcon.y-wordsBg.height-10;
        // this.addChildToContainer(wordsBg);
        // wordsBg.width = 330;
        // wordsBg.height = 90;
        // wordsBg.x = 280;
        // wordsBg.y = wifeIcon.y - 120;
        // this.addChildToContainer(wordsBg);
        // let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
        // wordsCornerBg.x = wordsBg.x+wordsBg.width/2;
        // wordsCornerBg.y = wifeIcon.y - 120 + 87;
        // this.addChildToContainer(wordsCornerBg);
        // //红颜说的话
        // let wifeWordsText:BaseTextField = ComponentManager.getTextField(itemCfg.words ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        // wifeWordsText.width=wordsBg.width-40;
        // wifeWordsText.x = wordsBg.x+20;
        // wifeWordsText.y = wordsBg.y+(wordsBg.height-wifeWordsText.height)/2;
        // this.addChildToContainer(wifeWordsText);
        var rnd = App.MathUtil.getRandom(1, 6);
        var str = LanguageManager.getlocal("wifeStatusUp" + rnd);
        if (this.param.data.type == 1) {
            str = LanguageManager.getlocal("wifeStatusDown" + rnd);
        }
        var memoirDescTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        memoirDescTxt.lineSpacing = 5;
        memoirDescTxt.width = wifeInfoBg.width - memoirDescTxt.x - 30;
        memoirDescTxt.x = this.width / 2 - memoirDescTxt.width / 2;
        memoirDescTxt.y = wifeInfoBg.y + 40;
        this.addChildToContainer(memoirDescTxt);
        this.addTouchTap(this.removeTween, this);
        this.container.alpha = 0;
        var ths = this;
        egret.Tween.get(this.container).to({ alpha: 1 }, 500).call(function () {
            ths.removeTouchTap();
            ths.addTouchTap(ths.checkView, ths);
        });
    };
    WifestatusShowView.prototype.removeTween = function () {
        if (this.container) {
            egret.Tween.removeTweens(this.container);
            this.container.alpha = 1;
        }
        this.removeTouchTap();
        this.addTouchTap(this.checkView, this);
    };
    WifestatusShowView.prototype.checkView = function () {
        // if(this.param.data.wifeIdList.length <= 0){
        // 	this.hide()
        // }
        // else{
        // 	this.reFreshView();
        // }
        this.hide();
    };
    WifestatusShowView.prototype.hide = function () {
        // let servantId:string=this.getWaitServantId();
        _super.prototype.hide.call(this);
        // if(servantId)
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,servantId);
        // }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE);
    };
    WifestatusShowView.prototype.getTitleStr = function () {
        return null;
    };
    WifestatusShowView.prototype.getBgName = function () {
        return "wifeview_lovebg";
    };
    return WifestatusShowView;
}(BaseView));
__reflect(WifestatusShowView.prototype, "WifestatusShowView");

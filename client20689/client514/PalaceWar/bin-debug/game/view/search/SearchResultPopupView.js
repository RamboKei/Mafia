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
var SearchResultPopupView = (function (_super) {
    __extends(SearchResultPopupView, _super);
    function SearchResultPopupView() {
        return _super.call(this) || this;
    }
    SearchResultPopupView.prototype.getResourceList = function () {
        var resArr = ["progress3", "progress3_bg"];
        var buildId = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
        resArr.push("searchnpcbg" + buildId);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    SearchResultPopupView.prototype.initView = function () {
        var spaceBuild = this.checkSpaceBuild();
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
        var buildId = itemCfg.build;
        var bg = BaseBitmap.create("searchnpcbg" + buildId);
        this.addChildToContainer(bg);
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, true), 0);
        if (!spaceBuild) {
            var iconKey = itemCfg.personFullIcon;
            var icon = BaseLoadBitmap.create(iconKey);
            var size = itemCfg.fullIconSize;
            if (itemCfg.wifeId) {
                icon.setScale(340 / size.width);
                icon.setPosition((this.viewBg.width - 330) / 2, bg.y + bg.height - size.height * icon.scaleY);
                this.checkDro(itemCfg.wifeId, icon);
            }
            else {
                icon.setScale(390 / size.width);
                icon.setPosition((this.viewBg.width - 360) / 2, bg.y + bg.height - size.height * icon.scaleY);
            }
            if (itemCfg.type == 2) {
                // icon.setScale(0.6);
                // icon.y = bg.y+bg.height-size.height*icon.scaleY + 50;
            }
            // else
            // {
            // 	icon.setPosition(140,20);
            // }
            this.addChildToContainer(icon);
            var nameBg = BaseBitmap.create("public_infobg2");
            nameBg.setPosition(100, 30);
            this.addChildToContainer(nameBg);
            var fontSize = 30;
            var nameTxt = ComponentManager.getTextField(itemCfg.name, fontSize);
            nameTxt.width = fontSize + 2;
            var pos = App.CommonUtil.getCenterPos(nameBg, nameTxt, false);
            nameTxt.setPosition(pos.x + 4, pos.y - 3);
            this.addChildToContainer(nameTxt);
        }
        var buttomBg = BaseBitmap.create("public_9_bg20");
        buttomBg.width = bg.width;
        buttomBg.height = 78;
        buttomBg.setPosition(bg.x, bg.y + bg.height - buttomBg.height);
        this.addChildToContainer(buttomBg);
        var talkStr;
        if (spaceBuild) {
            talkStr = LanguageManager.getlocal("searchBuildTalk" + spaceBuild);
        }
        else {
            talkStr = LanguageManager.getlocal("searchPersonTalk" + this.getPersonId());
        }
        var descTxt = ComponentManager.getTextField(talkStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTxt.width = buttomBg.width - 20;
        descTxt.setPosition(App.CommonUtil.getCenterX(buttomBg, descTxt, false), App.CommonUtil.getCenterY(buttomBg, descTxt, false));
        this.addChildToContainer(descTxt);
        if (itemCfg.wifeId && itemCfg.value) {
            var buttomBg1 = void 0;
            for (var i = 0; i < 2; i++) {
                buttomBg1 = BaseBitmap.create("public_9_bg20");
                buttomBg1.width = bg.width;
                buttomBg1.height = 30;
                buttomBg1.setPosition(buttomBg.x, buttomBg.y + buttomBg.height);
                this.addChildToContainer(buttomBg1);
            }
            // let prograssBar=ComponentManager.getProgressBar("progress3","progress3_bg",this.viewBg.width-40);
            if (!this.checkGetWife()) {
                var lastValue = Math.max(0, Api.searchVoApi.getWifeValueById(this.getPersonId()) - 1);
                var tmpValue = lastValue / itemCfg.value;
                // prograssBar.setPercentage(tmpValue,lastValue+"/"+itemCfg.value);
                // egret.Tween.get(prograssBar).to({percent:value},800).call(function(prograssBar:ProgressBar){
                // 	egret.Tween.removeTweens(prograssBar);
                // 	prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
                // }.bind(this,prograssBar))
            }
            else {
                // prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
            }
        }
        this.showRewards();
        this.addTouchTap(this.removeTween, this);
        this.container.alpha = 0;
        var ths = this;
        egret.Tween.get(this.container).to({ alpha: 1 }, 500).call(function () {
            ths.removeTouchTap();
            ths.addTouchTap(ths.hide, ths);
        });
    };
    SearchResultPopupView.prototype.checkDro = function (wifeId, wifeIcon) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var droWifeIcon;
        var bg2Index = this.container.getChildIndex(wifeIcon);
        if (Api.wifeSkinVoApi.isHaveSkin(wifeIcon)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeIcon);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                    droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    this.container.addChildAt(droWifeIcon, bg2Index);
                    wifeIcon.visible = false;
                }
            }
            else {
                if (Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske")) {
                    droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                    this.container.addChildAt(droWifeIcon, bg2Index);
                }
            }
        }
        else {
            if (Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske")) {
                droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                this.container.addChildAt(droWifeIcon, bg2Index);
                wifeIcon.visible = false;
            }
        }
        if (droWifeIcon) {
            droWifeIcon.setScale(0.7);
            droWifeIcon.x = wifeIcon.x + 180;
            droWifeIcon.y = wifeIcon.y + 760 * 0.7 - 120;
        }
        else {
            wifeIcon.visible = true;
        }
    };
    SearchResultPopupView.prototype.removeTween = function () {
        if (this.container) {
            egret.Tween.removeTweens(this.container);
            this.container.alpha = 1;
        }
        this.removeTouchTap();
        this.addTouchTap(this.hide, this);
    };
    SearchResultPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var personValueLocalStr = Api.searchVoApi.getPersonValueLocalStr(this.getPersonId());
        var rewards = this.getRewards();
        if (rewards) {
            var l = rewards.length;
            for (var i = l - 1; i >= 0; i--) {
                if (!rewards[i].num) {
                    var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                    personValueLocalStr = null;
                    break;
                }
            }
        }
        if (personValueLocalStr && !this.checkGetWife()) {
            if (Api.wifeVoApi.getWifeInfoVoById(this.getPersonId())) {
                return;
            }
            var descContainer = new BaseDisplayObjectContainer();
            this.addChild(descContainer);
            var descBg = BaseBitmap.create("public_searchdescbg");
            // descBg.x = GameConfig.stageWidth/2 - descBg.width/2;
            // descBg.y = this.viewBg.y + this.viewBg.height + 30;
            descContainer.addChild(descBg);
            var descTxt = ComponentManager.getTextField(personValueLocalStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            descTxt.x = descBg.width / 2 - descTxt.width / 2;
            descTxt.y = descBg.y + descBg.height / 2 - descTxt.height / 2;
            descContainer.addChild(descTxt);
            descContainer.x = GameConfig.stageWidth / 2 - descContainer.width / 2;
            descContainer.y = this.viewBg.y + this.viewBg.height + 30;
            descContainer.alpha = 0;
            egret.Tween.get(descContainer, { loop: false }).wait(1000).to({ alpha: 1 }, 500);
        }
    };
    SearchResultPopupView.prototype.checkSpaceBuild = function () {
        var buildId = null;
        var rewards = this.getRewards();
        if (rewards) {
            var l = rewards.length;
            for (var i = l - 1; i >= 0; i--) {
                if (!rewards[i].num) {
                    var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                    buildId = itemCfg.build;
                    break;
                }
            }
        }
        return buildId;
    };
    SearchResultPopupView.prototype.checkGetWife = function () {
        var rewards = this.getRewards();
        if (!rewards) {
            var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
            if (itemCfg.type == 2) {
                if (Api.searchVoApi.getWifeValueById(this.getPersonId()) >= itemCfg.value) {
                    //得到红颜
                    if (itemCfg.wifeId) {
                        return itemCfg.wifeId;
                    }
                }
            }
        }
        return null;
    };
    SearchResultPopupView.prototype.hide = function () {
        // let wifeId=this.checkGetWife();
        // if(wifeId)
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,wifeId);
        // }
        var rData = Api.wifeVoApi.getWaitShowWife();
        if (rData) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW, { wifeIdList: rData.unlockWife, servantId: rData.unlockServant });
        }
        _super.prototype.hide.call(this);
    };
    SearchResultPopupView.prototype.showRewards = function () {
        var ths = this;
        var rewards = ths.getRewards();
        if (!rewards) {
            return;
        }
        var l = rewards.length;
        for (var i = l - 1; i >= 0; i--) {
            if (!rewards[i].num) {
                rewards.splice(i, 1);
            }
        }
        var timeNum = egret.setTimeout(function () {
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
            if (timeNum) {
                egret.clearTimeout(timeNum);
                timeNum = NaN;
            }
        }, this, 300);
    };
    SearchResultPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    SearchResultPopupView.prototype.getPersonId = function () {
        return this.param.data.personId;
    };
    SearchResultPopupView.prototype.getRewards = function () {
        if (this.param.data.rewards) {
            return GameData.formatRewardItem(this.param.data.rewards);
        }
        return null;
    };
    SearchResultPopupView.prototype.getTitleStr = function () {
        var buildId = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
        return "searchBuild" + buildId;
    };
    SearchResultPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    SearchResultPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SearchResultPopupView;
}(PopupView));
__reflect(SearchResultPopupView.prototype, "SearchResultPopupView");

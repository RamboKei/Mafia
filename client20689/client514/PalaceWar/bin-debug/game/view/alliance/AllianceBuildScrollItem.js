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
/**
 * 每日建设
 * author dky
 * date 2017/12/6
 * @class AllianceBuildScrollItem
 */
var AllianceBuildScrollItem = (function (_super) {
    __extends(AllianceBuildScrollItem, _super);
    function AllianceBuildScrollItem() {
        return _super.call(this) || this;
    }
    AllianceBuildScrollItem.prototype.initItem = function (index, data) {
        // let cfg = Config.WifebaseCfg.wifeGift
        this._itemIndex = index;
        this._itemData = data;
        this.width = 525;
        this.height = 126 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 148;
        bgBg.scaleY = 126 / 148;
        this.addChild(bgBg);
        this._key = key;
        var textColor = TextFieldConst.COLOR_WARN_GREEN2;
        if (key == "1") {
            textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        else if (key == "2") {
            textColor = TextFieldConst.COLOR_QUALITY_BLUE;
        }
        else if (key == "3") {
            textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
        }
        else if (key == "4") {
            textColor = TextFieldConst.COLOR_WARN_RED2;
        }
        else if (key == "5") {
            textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        var itemName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        itemName.text = LanguageManager.getlocal("allianceBuildName" + key);
        // itemName.textColor = textColor;
        itemName.setPosition(120 + 10, 10);
        this.addChild(itemName);
        var score = LanguageManager.getlocal("allianceBuildCost");
        var itemScore = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemScore.setPosition(itemName.x, itemName.y + itemName.height + 7);
        this.addChild(itemScore);
        if (index < 3) {
            var iconBg = BaseBitmap.create("itembg_5");
            iconBg.setPosition(15, bgBg.height / 2 * bgBg.scaleY - iconBg.width / 2);
            this.addChild(iconBg);
            var itemBB = BaseBitmap.create("dinner_gems_" + key);
            itemBB.setPosition(18, bgBg.height / 2 * bgBg.scaleY - itemBB.width / 2);
            this.addChild(itemBB);
            var costIcon = BaseLoadBitmap.create("itemicon1");
            costIcon.x = 190;
            costIcon.y = 28;
            costIcon.setScale(0.4);
            this.addChild(costIcon);
            var costNum = ComponentManager.getTextField(data.needGem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            costNum.setPosition(235, itemScore.y);
            costNum.width = 260;
            this.addChild(costNum);
        }
        else {
            var itemCfg = Config.ItemCfg.getItemCfgById(data.needItem);
            var itemIcon = itemCfg.getIconContainer(true);
            itemIcon.setPosition(15, bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2 + 1);
            itemIcon.name = "icon";
            this.addChild(itemIcon);
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.needItem));
            this._numTF = ComponentManager.getTextField(hasNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height);
            this.addChild(this._numTF);
            // itemName.text = itemCfg.name;
            // let score =  ;
            var it = ComponentManager.getTextField(itemCfg.name + "x1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
            it.setPosition(itemScore.x + itemScore.width + 0, itemName.y + itemName.height + 7);
            this.addChild(it);
        }
        var itemDescStr = LanguageManager.getlocal("allianceBuildGet", [data.exp, data.asset, data.contribution]);
        //acPunishBuyItemGet
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemDesc.setPosition(itemName.x, itemScore.y + itemScore.height + 7);
        itemDesc.width = 375;
        this.addChild(itemDesc);
        if (Api.allianceVoApi.getIsDonatet()) {
            var mVo = Api.allianceVoApi.getMyAllianceVo();
            if (this._key == mVo.donate.id) {
                var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceBuildToday"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
                donatetDesc.x = 400;
                donatetDesc.y = 25;
                this.addChild(donatetDesc);
            }
        }
        else {
            var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBuild", this.chooseBtnClick, this);
            chooseBtn.x = 390;
            chooseBtn.y = 10;
            this.addChild(chooseBtn);
            chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
    };
    AllianceBuildScrollItem.prototype.chooseBtnClick = function () {
        if (this._itemIndex > 2) {
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(this._itemData.needItem));
            if (hasNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
        }
        else {
            var cost = this._itemData.needGem.toString();
            if (cost > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
        }
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var bNum = allianceVo.info.donateNum ? allianceVo.info.donateNum : 0;
        if (bNum >= allianceVo.maxmn) {
            var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
            var msg = LanguageManager.getlocal("allianceBuildTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "dailyTaskName19",
                msg: msg,
                callback: this.doBuild,
                handler: this,
                needCancel: true
            });
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, { "key": this._key, "index": this._itemIndex });
    };
    AllianceBuildScrollItem.prototype.doBuild = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD, { "key": this._key, "index": this._itemIndex });
    };
    AllianceBuildScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    AllianceBuildScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceBuildScrollItem.prototype.dispose = function () {
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        this._numTF = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBuildScrollItem;
}(ScrollListItem));
__reflect(AllianceBuildScrollItem.prototype, "AllianceBuildScrollItem");

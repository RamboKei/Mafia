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
var ComposePopupView = (function (_super) {
    __extends(ComposePopupView, _super);
    function ComposePopupView() {
        var _this = _super.call(this) || this;
        _this._numTxtArr = [];
        return _this;
    }
    ComposePopupView.prototype.initView = function () {
        this._itemCfg = Config.ComposeCfg.getItemCfgById(this.getId(), Api.itemVoApi.getComposeVersion());
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 292;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var txtBg = BaseBitmap.create("public_9_probiginnerbg");
        txtBg.width = 502;
        txtBg.height = 142;
        txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 10);
        this.addChildToContainer(txtBg);
        var icon = this._itemCfg.getIconContainer();
        icon.setPosition(txtBg.x + 10, txtBg.y + (txtBg.height - icon.height) / 2);
        this.addChildToContainer(icon);
        var nameTxt = this._itemCfg.nameTxt;
        nameTxt.setPosition(icon.x + icon.width + 10, icon.y);
        this.addChildToContainer(nameTxt);
        if (this._itemCfg.timeLimit) {
            var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
            this._leftTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(leftTime, 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            this._leftTimeTxt.setPosition(txtBg.x + txtBg.width - 200, nameTxt.y + (nameTxt.height - this._leftTimeTxt.height) / 2);
            this.addChildToContainer(this._leftTimeTxt);
            if (leftTime <= 0) {
                this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");
            }
        }
        var offY = nameTxt.y + nameTxt.height;
        if (this._itemCfg.composeLimit) {
            this._composeLimitTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeItemMaxNumDesc", [Api.itemVoApi.getComposeNumById(this._itemCfg.id) + "/" + this._itemCfg.composeLimit]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            this._composeLimitTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 10);
            this.addChildToContainer(this._composeLimitTxt);
            offY = this._composeLimitTxt.y + this._composeLimitTxt.height;
        }
        var descTxt = this._itemCfg.getDescTxt(true);
        descTxt.width = txtBg.width - icon.x + txtBg.x - icon.width - 10 - 10;
        descTxt.setPosition(nameTxt.x, offY + 10);
        this.addChildToContainer(descTxt);
        var composeUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        composeUseTxt.setPosition(icon.x + 20, txtBg.y + txtBg.height + 10);
        this.addChildToContainer(composeUseTxt);
        var needItemCfgList = this._itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        for (var i = 0; i < l; i++) {
            var icon_1 = needItemCfgList[i].getIconContainer(true);
            icon_1.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon_1.width + 5) * i, txtBg.y + txtBg.height + 5);
            this.addChildToContainer(icon_1);
            // let iconBg:BaseBitmap=<BaseBitmap>icon.getChildByName("iconBg");
            // if(iconBg)
            // {
            // 	iconBg.addTouchTap((event:egret.TouchEvent,itemId:number|string)=>{
            // 		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,itemId);
            // 	},GameData,[needItemCfgList[i].id]);
            // }
            var num = Api.itemVoApi.getItemNumInfoVoById(needItemCfgList[i].id);
            var numTxt = ComponentManager.getTextField(this.getComposeItemNumLocalStr(needItemCfgList[i].id), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // numTxt.width=icon.width+10;
            if (numTxt.width > icon_1.width + 10) {
                numTxt.scaleX = (icon_1.width + 10) / numTxt.width;
            }
            numTxt.textAlign = egret.HorizontalAlign.CENTER;
            numTxt.setPosition(icon_1.x + (icon_1.width - numTxt.width * numTxt.scaleX) / 2, icon_1.y + icon_1.height + 2);
            numTxt.bindData = needItemCfgList[i].id;
            this.addChildToContainer(numTxt);
            this._numTxtArr.push(numTxt);
        }
        if (this._itemCfg.needGem) {
            var icon_2 = GameData.getRewardItemIconByIdAndType(ItemEnums.gem, null, true);
            icon_2.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon_2.width + 5) * (needItemCfgList.length), txtBg.y + txtBg.height + 5);
            this.addChildToContainer(icon_2);
            var num = Api.playerVoApi.getPlayerGem();
            var str = "";
            var ownNum = num;
            var needNum = this._itemCfg.needGem;
            str = "(" + ownNum + "/" + needNum + ")";
            if (ownNum >= needNum) {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
            }
            else {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
            }
            var numTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // numTxt.width=icon.width+10;
            if (numTxt.width > icon_2.width + 10) {
                numTxt.scaleX = (icon_2.width + 10) / numTxt.width;
            }
            numTxt.textAlign = egret.HorizontalAlign.CENTER;
            numTxt.setPosition(icon_2.x + (icon_2.width - numTxt.width * numTxt.scaleX) / 2, icon_2.y + icon_2.height + 2);
            numTxt.bindData = ItemEnums.gem;
            this.addChildToContainer(numTxt);
            this._numTxtArr.push(numTxt);
        }
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "composeBtn", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width) / 2, bg.y + bg.height + 10);
        this.addChildToContainer(composeBtn);
    };
    ComposePopupView.prototype.tick = function () {
        var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
        if (leftTime > 0) {
            if (this._leftTimeTxt) {
                this._leftTimeTxt.text = LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(leftTime, 1)]);
            }
        }
        else {
            if (this._leftTimeTxt) {
                this._leftTimeTxt.dispose();
                this._leftTimeTxt.text = LanguageManager.getlocal("composeLimitTimeEndDesc");
            }
        }
    };
    ComposePopupView.prototype.composeHandler = function () {
        var needItemNameStr = this.checkNeedItemName();
        if (needItemNameStr) {
            App.CommonUtil.showTip(LanguageManager.getlocal("resNotEnoughDesc", [needItemNameStr]));
            return;
        }
        else {
            if (this._itemCfg.composeLimit) {
                if (Api.itemVoApi.getComposeNumById(this._itemCfg.id) >= this._itemCfg.composeLimit) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxNumDesc"));
                    return;
                }
            }
            if (this._itemCfg.timeLimit) {
                var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
                if (leftTime <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
                    return;
                }
            }
            var version = Api.itemVoApi.getComposeVersion();
            this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, { version: version, composeid: this._itemCfg.id });
        }
    };
    ComposePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
            }
            App.MessageHelper.dispatchNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE + this._itemCfg.id);
            this.refresh();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND, {});
        }
    };
    ComposePopupView.prototype.refresh = function () {
        if (this._numTxtArr) {
            var l = this._numTxtArr.length;
            for (var i = 0; i < l; i++) {
                if (Number(this._numTxtArr[i].bindData) == 1) {
                    var num = Api.playerVoApi.getPlayerGem();
                    var str = "";
                    var ownNum = num;
                    var needNum = this._itemCfg.needGem;
                    str = "(" + ownNum + "/" + needNum + ")";
                    if (ownNum >= needNum) {
                        str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
                    }
                    else {
                        str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
                    }
                    this._numTxtArr[i].text = str;
                }
                else {
                    this._numTxtArr[i].text = this.getComposeItemNumLocalStr(this._numTxtArr[i].bindData);
                }
            }
        }
        if (this._composeLimitTxt) {
            this._composeLimitTxt.text = LanguageManager.getlocal("composeItemMaxNumDesc", [Api.itemVoApi.getComposeNumById(this._itemCfg.id) + "/" + this._itemCfg.composeLimit]);
        }
    };
    ComposePopupView.prototype.checkNeedItemName = function () {
        var needItemCfgList = this._itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        var isEnough = true;
        var needItemNameStr = "";
        for (var i = 0; i < l; i++) {
            var itemId = needItemCfgList[i].id;
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
            var needNum = this._itemCfg.getNeedItemNumById(itemId);
            if (ownNum < needNum) {
                if (needItemNameStr == "") {
                    needItemNameStr += needItemCfgList[i].name;
                }
                else {
                    needItemNameStr += "," + needItemCfgList[i].name;
                }
            }
        }
        if (this._itemCfg.needGem) {
            var ownNum = Api.playerVoApi.getPlayerGem();
            var needNum = this._itemCfg.needGem;
            if (ownNum < needNum) {
                if (needItemNameStr == "") {
                    needItemNameStr += Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
                }
                else {
                    needItemNameStr += "," + Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
                }
            }
        }
        return needItemNameStr;
    };
    ComposePopupView.prototype.getComposeItemNumLocalStr = function (itemId) {
        var str = "";
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        var needNum = this._itemCfg.getNeedItemNumById(itemId);
        str = "(" + ownNum + "/" + needNum + ")";
        if (ownNum >= needNum) {
            str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
        }
        else {
            str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
        }
        return str;
    };
    ComposePopupView.prototype.getId = function () {
        return this.param.data;
    };
    ComposePopupView.prototype.dispose = function () {
        if (this._itemCfg.timeLimit) {
            var leftTime = Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
            if (leftTime <= 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
            }
        }
        this._itemCfg = null;
        this._numTxtArr.length = 0;
        this._leftTimeTxt = null;
        this._composeLimitTxt = null;
        _super.prototype.dispose.call(this);
    };
    return ComposePopupView;
}(PopupView));
__reflect(ComposePopupView.prototype, "ComposePopupView");

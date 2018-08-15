/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItemScrollItem
 */
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
var ServantInfoFourItemScrollItem = (function (_super) {
    __extends(ServantInfoFourItemScrollItem, _super);
    function ServantInfoFourItemScrollItem() {
        var _this = _super.call(this) || this;
        _this._auarKey = "";
        _this._levelupTipStr = "";
        _this._itemList = [];
        return _this;
    }
    ServantInfoFourItemScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        var auarKey = data;
        this._auarKey = auarKey;
        var bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = 592;
        bottomBg.height = 126;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var auraList = Config.ServantCfg.getServantItemById(ServantInfoFourItemScrollItem.servantId).aura;
        var icon = BaseLoadBitmap.create("servant_aura_Icon" + auraList[this._auarKey].auraIcon);
        icon.x = icon.y = 10;
        icon.width = icon.height = 108;
        this.addChild(icon);
        var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
        skillName.x = icon.x + icon.width + 10;
        skillName.y = icon.y + 3;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 25;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
        upNeedTxt.name = "upNeedTxt";
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantFour_goBtn", this.goBtnHandler, this);
        goBtn.x = bottomBg.x + bottomBg.width - 140;
        goBtn.y = bottomBg.y + bottomBg.height / 2 - goBtn.height / 2;
        goBtn.visible = false;
        this.addChild(goBtn);
        goBtn.name = "goBtn";
        var topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
        topLvTxt.x = goBtn.x + goBtn.width / 2 - topLvTxt.width / 2;
        topLvTxt.y = goBtn.y + goBtn.height / 2 - topLvTxt.height / 2;
        topLvTxt.visible = false;
        topLvTxt.name = "topLvTxt";
        this.addChild(topLvTxt);
        this.refreshAfterLv();
    };
    ServantInfoFourItemScrollItem.prototype.refreshAfterLv = function (event) {
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            var servObj = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
            if (servObj && servObj.isShowRedForaura()) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            }
        }
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var auraList = servantcfg.aura;
        var keysList = Object.keys(auraList);
        var curData = auraList[this._auarKey];
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        var skillName = this.getChildByName("skillName");
        var curValueTxt = this.getChildByName("curValueTxt");
        var nextValueTxt = this.getChildByName("nextValueTxt");
        var upNeedTxt = this.getChildByName("upNeedTxt");
        var goBtn = this.getChildByName("goBtn");
        var topLvTxt = this.getChildByName("topLvTxt");
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (curData.att.length == 4) {
            attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < curData.att.length; index1++) {
                var element = curData.att[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        var add1 = "";
        var addNum1 = "";
        var addNum2 = "";
        var nextLvAdd = 1;
        if (curData.growAtt < 1) {
            addNum1 = (curData.growAtt * 100 * servantObj.aura[this._auarKey]) + "%";
            addNum2 = (curData.growAtt * 100 * (servantObj.aura[this._auarKey] + nextLvAdd)) + "%";
        }
        else {
            addNum1 = (curData.growAtt * servantObj.aura[this._auarKey]).toString();
            addNum2 = (curData.growAtt * (servantObj.aura[this._auarKey] + nextLvAdd)).toString();
        }
        add1 = addNum1;
        str1 = LanguageManager.getlocal("servant_fourlevelupTxt1", [attStr + addNum1]);
        str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [attStr + addNum2]);
        var goBtnAvaiable = false;
        var isAtTopLv = false;
        if (curData.growNeed1 && curData.growNeed1.length > 0) {
            goBtnAvaiable = false;
            //是否满级,满级则隐藏该行
            if (servantObj.aura[this._auarKey] >= curData.maxLv) {
                isAtTopLv = true;
                nextLvAdd = 0;
                str3 = "";
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            }
            else {
                var sid = curData.growNeed1[servantObj.aura[this._auarKey]];
                var auraV = servantObj.aura[this._auarKey];
                var str4 = LanguageManager.getlocal("servant_fourPeopleaura" + (curData.auraIcon));
                var tmpStr = LanguageManager.getlocal("servantWife_fourUpCost2", [auraV + 1, auraV, auraV + 1, str4]);
                str3 = LanguageManager.getlocal("servant_fourlevelupTxt7", [tmpStr]);
                // str3 = LanguageManager.getlocal("servant_fourlevelupTxt2",[LanguageManager.getlocal("servant_name"+sid)]);
            }
        }
        else {
            this._levelupTipStr = "";
            goBtnAvaiable = true;
            if (servantObj.aura[this._auarKey] >= curData.maxLv) {
                isAtTopLv = true;
                str3 = "";
                this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            }
            else {
                var itemList = GameData.formatRewardItem(curData.growNeed2);
                this._itemList = itemList;
                var item = this._itemList[0];
                // for (var index = 0; index < itemList.length; index++) {
                // let item:RewardItemVo = itemList[index];
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
                str3 += item.name + "(" + ownNum + "/" + item.num + ")  ";
                if (ownNum < item.num && this._levelupTipStr == "") {
                    this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
                }
                else {
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
                }
                // }
            }
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : " + servantObj.aura[this._auarKey];
        skillName.text = nameStr;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
        if (isAtTopLv) {
            topLvTxt.visible = true;
            goBtn.visible = false;
        }
        else {
            topLvTxt.visible = false;
            if (goBtnAvaiable) {
                goBtn.visible = true;
            }
            else {
                goBtn.visible = false;
            }
        }
    };
    ServantInfoFourItemScrollItem.prototype.doRequest = function () {
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var auarKey = this._auarKey;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAURA, { auraId: auarKey, servantId: servantId });
    };
    ServantInfoFourItemScrollItem.prototype.goBtnHandler = function () {
        if (this._levelupTipStr != "") {
            App.CommonUtil.showTip(this._levelupTipStr);
            return;
        }
        var itemInfo = this._itemList[0];
        var itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id);
        var tmpStr = itemInfo.name + "*" + itemInfo.num + " ";
        var message = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
        var mesObj = {
            confirmCallback: this.doRequest,
            handler: this,
            icon: itemcfg.icon,
            iconBg: itemcfg.iconBg,
            num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id),
            msg: message,
            id: itemInfo.id,
            useNum: itemInfo.num
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    ServantInfoFourItemScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        this._auarKey = null;
        _super.prototype.dispose.call(this);
    };
    ServantInfoFourItemScrollItem.servantId = "";
    return ServantInfoFourItemScrollItem;
}(ScrollListItem));
__reflect(ServantInfoFourItemScrollItem.prototype, "ServantInfoFourItemScrollItem");

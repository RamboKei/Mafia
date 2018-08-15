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
 *向我提亲的子嗣列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
var AdultMarryRequestScrollItem = (function (_super) {
    __extends(AdultMarryRequestScrollItem, _super);
    function AdultMarryRequestScrollItem() {
        return _super.call(this) || this;
    }
    AdultMarryRequestScrollItem.prototype.initItem = function (index, childInfo) {
        this.width = 500;
        this.height = 208;
        // childInfo.total
        this._childInfo = childInfo;
        var bg = BaseBitmap.create("public_9_bg31");
        bg.width = this.width;
        bg.height = this.height;
        bg.x = 5;
        // nameBg.x = 25;
        // nameBg.y = 40;
        this.addChild(bg);
        var childbg = BaseBitmap.create("adult_smallbg");
        this.addChild(childbg);
        childbg.x = bg.x + 10;
        childbg.y = bg.y + bg.height / 2 - childbg.height / 2;
        // let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
        // bg2.width = 370;
        // bg2.height = 100;
        // bg2.x = childbg.x + childbg.width + 10;
        // bg2.y = childbg.y + 10;
        // this.addChild(bg2);
        var iconStr = "adult_boy";
        if (childInfo.sex == 2) {
            iconStr = "adult_girl";
        }
        var qualityBg = BaseBitmap.create("adult_namebg");
        qualityBg.x = childbg.x + 10;
        qualityBg.y = childbg.y + 10;
        this.addChild(qualityBg);
        var qualityBB = BaseBitmap.create("adult_q" + childInfo.aquality);
        qualityBB.x = childbg.x + 10;
        qualityBB.y = childbg.y + 15;
        qualityBB.setScale(0.7);
        this.addChild(qualityBB);
        var icon = BaseBitmap.create(iconStr);
        icon.x = bg.x + 40;
        icon.y = 20;
        icon.setScale(0.45);
        this.addChild(icon);
        var nameTF = ComponentManager.getTextField(childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = childbg.x + childbg.width + 10;
        nameTF.y = childbg.y + 7;
        this.addChild(nameTF);
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + nameTF.height + 10;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + nameTF.height + 10;
        this.addChild(attrTF);
        var costStr = LanguageManager.getlocal("adultMarryRequestCost");
        var costTF = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        costTF.x = nameTF.x;
        costTF.y = attrTF.y + nameTF.height + 10;
        this.addChild(costTF);
        var gemBg = BaseLoadBitmap.create("itemicon1");
        gemBg.setScale(0.45);
        gemBg.x = costTF.x + costTF.width - 7;
        gemBg.y = 100;
        this.addChild(gemBg);
        var costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var costGem = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;
        var costNum = costGem + "/" + itemCfg.name;
        var costNumTF = ComponentManager.getTextField(costNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        costNumTF.x = nameTF.x + 105;
        costNumTF.y = attrTF.y + nameTF.height + 10;
        this.addChild(costNumTF);
        //拒绝
        var refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "adultMarryRequestRefuse", this.refuseBtnClick, this);
        refuseBtn.x = nameTF.x;
        refuseBtn.y = costTF.y + costTF.height + 7;
        this.addChild(refuseBtn);
        refuseBtn.setColor(TextFieldConst.COLOR_BLACK);
        //choose
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultMarryRequestChooseChild", this.chooseBtnClick, this);
        chooseBtn.x = refuseBtn.x + refuseBtn.width + 5;
        chooseBtn.y = costTF.y + costTF.height + 7;
        this.addChild(chooseBtn);
        chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AdultMarryRequestScrollItem.prototype.refuseBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY, { "id": this._childInfo.id, "childId": this._childInfo.id });
    };
    AdultMarryRequestScrollItem.prototype.chooseBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD, { "childInfo": this._childInfo });
    };
    AdultMarryRequestScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultMarryRequestScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._childInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryRequestScrollItem;
}(ScrollListItem));
__reflect(AdultMarryRequestScrollItem.prototype, "AdultMarryRequestScrollItem");

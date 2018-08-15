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
 *招亲的子嗣列表
 * author dky
 * date 2017/10/30
 * @class AdultMarryScrollItem
 */
var AdultMarryScrollItem = (function (_super) {
    __extends(AdultMarryScrollItem, _super);
    function AdultMarryScrollItem() {
        return _super.call(this) || this;
    }
    AdultMarryScrollItem.prototype.initItem = function (index, childInfo) {
        this.width = 618;
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
        var bg2 = BaseBitmap.create("public_9_managebg");
        bg2.width = 370;
        bg2.height = 100;
        bg2.x = childbg.x + childbg.width + 10;
        bg2.y = childbg.y + 10;
        this.addChild(bg2);
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
        nameTF.x = bg2.x + 5;
        nameTF.y = bg2.y + 7;
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
        //联姻
        var marrmyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarry", this.marryBtnClick, this);
        marrmyBtn.x = 450;
        marrmyBtn.y = bg2.y + bg2.height + 12;
        // marrmyBtn.
        this.addChild(marrmyBtn);
        marrmyBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AdultMarryScrollItem.prototype.marryBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY, { "id": this._childInfo.id, "childId": this._childInfo.id });
    };
    AdultMarryScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultMarryScrollItem.prototype.dispose = function () {
        this._childInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryScrollItem;
}(ScrollListItem));
__reflect(AdultMarryScrollItem.prototype, "AdultMarryScrollItem");

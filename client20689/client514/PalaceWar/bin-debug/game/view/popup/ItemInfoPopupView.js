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
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
var ItemInfoPopupView = (function (_super) {
    __extends(ItemInfoPopupView, _super);
    function ItemInfoPopupView() {
        return _super.call(this) || this;
    }
    ItemInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 390;
        bg.height = 170;
        bg.x = 158;
        bg.y = 70 - this.getContainerY();
        this.addChildToContainer(bg);
        var itemCfg = null;
        if (typeof (this.param.data) == "string" || typeof (this.param.data) == "number") {
            itemCfg = Config.ItemCfg.getItemCfgById(Number(this.param.data));
            if (!itemCfg) {
                App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
                return;
            }
        }
        else if (this.param.data instanceof RewardItemVo) {
            itemCfg = this.param.data;
        }
        else if (this.param.data.dType && this.param.data.dType == "json") {
            itemCfg = this.param.data;
        }
        else {
            App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
            return;
        }
        var itemName = itemCfg.name;
        var iconPic = itemCfg.icon;
        var effectDesc = itemCfg.desc;
        var dropDesc = itemCfg.dropDesc;
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var dropTitle = LanguageManager.getlocal("dropTitle");
        this.titleTF.text = itemName;
        var icon = GameData.getItemIcon(itemCfg, false);
        var numLb = icon.getChildByName("numLb");
        if (numLb) {
            numLb.visible = false;
        }
        icon.x = 40;
        icon.y = 95 - this.getContainerY();
        this.addChildToContainer(icon);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
        // bg1.width = 370;
        // bg1.height = icon.height + 30;
        // bg1.x = icon.x + icon.width + 5;
        // bg1.y = icon.y - 15;
        // this.addChildToContainer(bg1);
        // let nameTF:BaseTextField = new BaseTextField();
        // nameTF.text = itemName;
        // nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
        // nameTF.x = bg1.x + bg1.width/2 - nameTF.width/2;
        // nameTF.y = bg1.y + bg1.height/2 - nameTF.height/2;
        // this.addChildToContainer(nameTF);
        var effectTitleTF = ComponentManager.getTextField(effectTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        effectTitleTF.x = 163 + 8;
        effectTitleTF.y = 29 + 8;
        this.addChildToContainer(effectTitleTF);
        var effectDescTF = ComponentManager.getTextField(effectDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
        effectDescTF.y = effectTitleTF.y;
        effectDescTF.width = 300;
        this.addChildToContainer(effectDescTF);
        var dropTitleTF = ComponentManager.getTextField(dropTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        dropTitleTF.x = 163 + 8;
        dropTitleTF.y = 29 + 80;
        this.addChildToContainer(dropTitleTF);
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropDescTF.y = dropTitleTF.y;
        dropDescTF.width = 300;
        this.addChildToContainer(dropDescTF);
    };
    ItemInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ItemInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ItemInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ItemInfoPopupView;
}(PopupView));
__reflect(ItemInfoPopupView.prototype, "ItemInfoPopupView");

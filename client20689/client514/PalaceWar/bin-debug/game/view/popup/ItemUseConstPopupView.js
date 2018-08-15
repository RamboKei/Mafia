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
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
var ItemUseConstPopupView = (function (_super) {
    __extends(ItemUseConstPopupView, _super);
    function ItemUseConstPopupView() {
        return _super.call(this) || this;
    }
    ItemUseConstPopupView.prototype.initView = function () {
        var data = this.param.data;
        var itemid = data.id;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        var iconPic = data.icon;
        var iconBg = data.iconBg;
        var msg = data.msg;
        var num = data.num;
        var useNum = data.useNum || 0;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = this.viewBg.x + this.viewBg.width / 2 - 50;
        var temY = 29;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemid));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        //中间改为消耗数量
        var numTF = ComponentManager.getTextField(useNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        numTF.x = temX + 98 - numTF.width;
        numTF.y = temY + 98 - numTF.height;
        this.addChildToContainer(numTF);
        //换行添加当前拥有数目
        var cur_have = LanguageManager.getlocal(num >= useNum ? "itemUseNewTip" : "itemUseNewTip2", [itemCfg.name, App.StringUtil.toString(num)]);
        msg += "\n" + cur_have;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = temY + temH + 25;
        msgTF.lineSpacing = 20;
        this.addChildToContainer(msgTF);
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = bg.y + bg.height + 15;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    ItemUseConstPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    ItemUseConstPopupView.prototype.clickConfirmHandler = function (data) {
        if (this.param.data.useNum && this.param.data.useNum > this.param.data.num) {
            if (this.param.data.icon == "itemicon1") {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            }
            this.hide();
            return;
        }
        App.LogUtil.log("clickConfirmHandler");
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ItemUseConstPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ItemUseConstPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ItemUseConstPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ItemUseConstPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    ItemUseConstPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUseConstPopupView;
}(PopupView));
__reflect(ItemUseConstPopupView.prototype, "ItemUseConstPopupView");

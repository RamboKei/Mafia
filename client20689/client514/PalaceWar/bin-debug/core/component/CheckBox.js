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
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super.call(this) || this;
        _this._isSelected = false;
        return _this;
    }
    CheckBox.prototype.init = function (desc) {
        this._selectBox = BaseBitmap.create("public_select");
        this._selectBox.addTouchTap(this.selectHandler, this);
        this.addChild(this._selectBox);
        if (desc) {
            this._txt = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            this._txt.setPosition(this._selectBox.x + this._selectBox.width + 5, this._selectBox.y + (this._selectBox.height - this._txt.height) / 2);
            this.addChild(this._txt);
        }
    };
    CheckBox.prototype.selectHandler = function () {
        this.isSelected = !this.isSelected;
        SoundManager.playEffect(SoundConst.EFFECT_CLICK);
    };
    Object.defineProperty(CheckBox.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (_isSelected) {
            this._isSelected = _isSelected;
            this._selectBox.texture = ResourceManager.getRes(this._isSelected ? "public_select_down" : "public_select");
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.checkSelected = function () {
        return this.isSelected;
    };
    CheckBox.prototype.setSelected = function (_isSelected) {
        this.isSelected = Boolean(_isSelected);
    };
    CheckBox.prototype.dispose = function () {
        this._isSelected = false;
        this._selectBox = null;
        this._txt = null;
        _super.prototype.dispose.call(this);
    };
    return CheckBox;
}(BaseDisplayObjectContainer));
__reflect(CheckBox.prototype, "CheckBox");

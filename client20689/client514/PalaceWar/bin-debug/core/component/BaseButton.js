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
 * 按钮
 * author dmj
 * date 2017/9/11
 * @class BaseButton
 */
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton() {
        var _this = _super.call(this) || this;
        /**文本内容 */
        _this._textStr = "";
        /**字体 */
        _this._font = null;
        /**字体大小 */
        _this._fontSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        /**缩放比例 */
        _this._type1Scale = 0.9;
        /**没有按下资源时候显示状态类型0,没有状态,1缩放状态 2半透状态 */
        _this._noDownImgType = 0;
        /**文本前加icon */
        _this._textIconSp = null;
        /**
         * 状态icon，如：红点
         */
        _this._statusIconSp = null;
        return _this;
    }
    /**
     * 初始化按钮
     * @param buttonName   按钮图片名称
     * @param textStr      按钮文字对应的key
     * @param callback     点击回调函数
     * @param handler
     * @param param        参数
     * @param fontSize     字体大小
     * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
     */
    BaseButton.prototype.init = function (buttonName, textStr, callback, handler, param, fontSize, noDownImgType) {
        this._buttonName = buttonName;
        this._textStr = textStr;
        this._callback = callback;
        this._handler = handler;
        this._fontSize = fontSize;
        this._param = param;
        if (isNaN(noDownImgType)) {
            this._noDownImgType = 0;
        }
        else {
            this._noDownImgType = noDownImgType;
        }
        this.touchEnabled = true;
        this.addTouch(this.eventHandler, this);
        this._buttonImage = BaseBitmap.create(buttonName);
        this._buttonImage.x = 0;
        this._buttonImage.y = 0;
        this.addChild(this._buttonImage);
        this._textLb = new BaseTextField();
        if (this._font) {
            this._textLb.fontFamily = this._font;
        }
        if (this._fontSize) {
            this._textLb.size = this._fontSize;
        }
        this.addChild(this._textLb);
        this.updateButtonImage();
        this.setText(this._textStr);
    };
    BaseButton.prototype.isEnable = function () {
        return this._enable;
    };
    BaseButton.prototype.callbackHanler = function (param) {
        if (param) {
            this._param = param;
        }
        if (this._callback) {
            this._callback.apply(this._handler, this._param);
        }
    };
    BaseButton.prototype.getCallbackFunc = function () {
        return this._callback;
    };
    /**
     * 设置文本文字
     * @param textStr 文本文字key
     * @param onlykey 是否是key,false：不是key，可以直接赋值
     */
    BaseButton.prototype.setText = function (textStr, onlykey) {
        if (onlykey === void 0) { onlykey = true; }
        if (this._textLb) {
            this._textStr = textStr;
            if (textStr) {
                if (onlykey) {
                    this._textLb.setString(LanguageManager.getlocal(textStr));
                }
                else {
                    this._textLb.setString(textStr);
                }
            }
            if (this._buttonImage) {
                if (this._textLb.width > this._buttonImage.width) {
                    this._textLb.width = this._buttonImage.width;
                }
                var lbX = this._buttonImage.x + this._buttonImage.width / 2 - this._textLb.width / 2;
                var lbY = this._buttonImage.y + this._buttonImage.height / 2 - this._textLb.height / 2 + this.getTextOffY();
                this._textLb.setPosition(lbX, lbY);
            }
            // App.LogUtil.log("textStr:" + this._textLb.text + " x:" + lbX + " y:" + lbY);
        }
    };
    /**
     * 设置点击按钮回调参数
     * @param param 参数
     */
    BaseButton.prototype.setParams = function (param) {
        this._param = param;
    };
    /**
     * 设置文字颜色
     * @param color 色标志，通过TextFieldConst.ts获取
     */
    BaseButton.prototype.setColor = function (color) {
        this._textLb.textColor = color;
    };
    /**
     * 设置按钮操作状态
     * @param isEnable true：可操作，false：不可操作
     */
    BaseButton.prototype.setEnable = function (isEnable) {
        this._enable = isEnable;
        this.touchEnabled = isEnable;
        if (isEnable) {
            App.DisplayUtil.changeToNormal(this._buttonImage);
        }
        else {
            App.DisplayUtil.changeToGray(this._buttonImage);
        }
    };
    /**
     * 根据状态更新按钮资源
     * @param state 1：正常状态，2：按下状态，3：不可用状态
     */
    BaseButton.prototype.updateButtonImage = function (state) {
        if (state === void 0) { state = BaseButton.BTN_STATE1; }
        // App.LogUtil.log("state:" + state);
        if (this._buttonImage) {
            var curButtonName = "";
            switch (state) {
                case BaseButton.BTN_STATE1:
                    curButtonName = this._buttonName;
                    break;
                case BaseButton.BTN_STATE2:
                    curButtonName = this._buttonName + "_down";
                    break;
                case BaseButton.BTN_STATE3:
                    curButtonName = this._buttonName + "disabled";
                    break;
            }
            var tmpTexture = ResourceManager.getRes(curButtonName);
            var isNoDownBmp = false;
            if (tmpTexture == null) {
                // 如果没有按下状态，就用正常状态，但是需要按下时，需要进行缩放
                tmpTexture = ResourceManager.getRes(this._buttonName);
            }
            if (!this.checkHasDownImg()) {
                isNoDownBmp = true;
            }
            if (this._buttonImage.texture != tmpTexture) {
                this._buttonImage.texture = tmpTexture;
                this.width = this._buttonImage.width;
                this.height = this._buttonImage.height;
            }
            if (this._textLb) {
                if (this._textIconSp) {
                }
                else {
                    this._textLb.x = 0.5 + this._buttonImage.width / 2 - this._textLb.width / 2;
                    this._textLb.y = 0.5 + this._buttonImage.height / 2 - this._textLb.height / 2 + this.getTextOffY();
                }
            }
            if (isNoDownBmp) {
                this.checkNoDownImageState();
            }
        }
    };
    BaseButton.prototype.checkHasDownImg = function () {
        if (ResourceManager.hasRes(this._buttonName + "_down")) {
            return true;
        }
        return false;
    };
    /**
     * 文本前添加icon
     * @param icon icon资源名称
     */
    BaseButton.prototype.addTextIcon = function (icon, type) {
        if (type === void 0) { type = 0; }
        this._textIconSp = BaseBitmap.create(icon);
        if (this._textIconSp) {
            var iconW = 33;
            this._textIconSp.scaleX = iconW / this._textIconSp.width;
            this._textIconSp.scaleY = iconW / this._textIconSp.height;
            var newW = iconW + this._textLb.width;
            this._textIconSp.x = (this.width - newW) / 2;
            this._textIconSp.y = (this.height - iconW) / 2;
            if (type == 1) {
                this._textLb.x = this._textIconSp.x + iconW + 10;
            }
            else {
                this._textLb.x = this._textIconSp.x + iconW;
            }
            this.addChild(this._textIconSp);
        }
    };
    BaseButton.prototype.removeTextIcon = function () {
        this.removeChild(this._textIconSp);
        this._textIconSp = null;
    };
    /**
     * 添加状态图标，如：红点
     * @param icon
     */
    BaseButton.prototype.showStatusIcon = function (icon) {
        if (icon === void 0) { icon = ""; }
        if (this._statusIconSp == null) {
            if (icon == "") {
                return;
            }
            this._statusIconSp = BaseBitmap.create(icon);
            this._statusIconSp.x = this.width - this._statusIconSp.width;
            this._statusIconSp.y = 0;
            this.addChild(this._statusIconSp);
        }
        else {
            this._statusIconSp.visible = true;
        }
    };
    /**
     * 移除状态图标
     */
    BaseButton.prototype.removeStatusIcon = function () {
        if (this._statusIconSp) {
            this._statusIconSp.visible = false;
        }
    };
    BaseButton.prototype.eventHandler = function (event) {
        if (this._enable == false) {
            return;
        }
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._isBegin = true;
                this.updateButtonImage(BaseButton.BTN_STATE2);
                SoundManager.playEffect(SoundConst.EFFECT_CLICK);
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._isBegin) {
                    this._isBegin = false;
                    this.updateButtonImage(BaseButton.BTN_STATE1);
                    this.callbackHanler();
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._isBegin = false;
                this.updateButtonImage(BaseButton.BTN_STATE1);
                break;
        }
    };
    BaseButton.prototype.checkNoDownImageState = function () {
        if (this._noDownImgType == 0) {
            this.scaleState();
        }
        else if (this._noDownImgType == 1) {
            this.alphaState();
        }
    };
    BaseButton.prototype.alphaState = function () {
        if (this._noDownImgType == 1) {
            if (this._isBegin == true) {
                this.alpha = 0.8;
            }
            else {
                this.alpha = 1;
            }
        }
    };
    BaseButton.prototype.scaleState = function () {
        if (this._noDownImgType == 0) {
            var lastScaleX = this.scaleX;
            var lastScaleY = this.scaleY;
            if (this._isBegin == true) {
                this.scaleX *= this._type1Scale;
                this.scaleY *= this._type1Scale;
            }
            else {
                this.scaleX /= this._type1Scale;
                this.scaleY /= this._type1Scale;
            }
            this.x += (this.width * lastScaleX - this.width * this.scaleX) / 2;
            this.y += (this.height * lastScaleY - this.height * this.scaleY) / 2;
        }
    };
    BaseButton.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseButton.prototype.leaveStageHandler = function (event) {
        if (this._isBegin) {
            this._isBegin = false;
            this.updateButtonImage(BaseButton.BTN_STATE1);
        }
    };
    BaseButton.prototype.isBegin = function () {
        return this._isBegin;
    };
    BaseButton.prototype.setBigin = function (isBegin) {
        this._isBegin = isBegin;
    };
    /**文本相对按钮的Y坐标偏移量 */
    BaseButton.prototype.getTextOffY = function () {
        var value = 0;
        return value;
    };
    Object.defineProperty(BaseButton.prototype, "resourceName", {
        /*返回当前按钮资源名*/
        get: function () {
            return this._buttonName;
        },
        enumerable: true,
        configurable: true
    });
    /*置灰按钮 可以点击*/
    BaseButton.prototype.setGray = function (isGray) {
        this._isGray = isGray;
        if (isGray) {
            App.DisplayUtil.changeToGray(this._buttonImage);
        }
        else {
            App.DisplayUtil.changeToNormal(this._buttonImage);
        }
    };
    BaseButton.prototype.dispose = function () {
        if (this._buttonImage) {
            App.DisplayUtil.changeToNormal(this._buttonImage);
            this._isGray = false;
        }
        if (this._buttonImage) {
            this._buttonImage = null;
        }
        if (this._textLb) {
            this._textLb = null;
        }
        if (this._textIconSp) {
            this._textIconSp = null;
        }
        this._buttonName = null;
        this._enable = null;
        this._callback = null;
        this._handler = null;
        this._textStr = null;
        this._font = null;
        this._fontSize = null;
        this._isChangeRes = null;
        this._noDownImgType = 0;
        this._statusIconSp = null;
        _super.prototype.dispose.call(this);
    };
    /**state 1：正常状态，2：按下状态，3：不可用状态  */
    BaseButton.BTN_STATE1 = 1;
    BaseButton.BTN_STATE2 = 2;
    BaseButton.BTN_STATE3 = 3;
    return BaseButton;
}(BaseDisplayObjectContainer));
__reflect(BaseButton.prototype, "BaseButton");

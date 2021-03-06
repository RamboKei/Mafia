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
 * author 陈可
 * date 2017/9/4
 * @class BaseDisplayObjectContainer
 */
var BaseDisplayObjectContainer = (function (_super) {
    __extends(BaseDisplayObjectContainer, _super);
    function BaseDisplayObjectContainer() {
        var _this = _super.call(this) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseDisplayObjectContainer.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseDisplayObjectContainer.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    BaseDisplayObjectContainer.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        }
    };
    BaseDisplayObjectContainer.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    /**
     * 设置坐标
     */
    BaseDisplayObjectContainer.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseDisplayObjectContainer.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseDisplayObjectContainer.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    BaseDisplayObjectContainer.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseDisplayObjectContainer.prototype.getClassName = function () {
        return egret.getQualifiedClassName(this);
    };
    /**
     * 相对布局
     * @param style   对齐方式 |分割 left right horizontal ｜ top bottom vertical
     * @param self    本身对象
     * @param base      相对参考对象
     * @param distance 位置距离
     */
    BaseDisplayObjectContainer.prototype.setLayoutPosition = function (style, self, base, distance) {
        if (distance === void 0) { distance = [0, 0]; }
        var view = this;
        var _x = 0;
        var _y = 0;
        var style_arr = style.split('|');
        for (var _i = 0, style_arr_1 = style_arr; _i < style_arr_1.length; _i++) {
            var layout = style_arr_1[_i];
            switch (layout) {
                case LayoutConst.left:
                    _x = base.x + distance[0];
                    break;
                case LayoutConst.right:
                    _x = base.x + base.width - distance[0] - self.width;
                    break;
                case LayoutConst.top:
                    _y = base.y + distance[1];
                    break;
                case LayoutConst.bottom:
                    _y = base.y + base.height - distance[1] - self.height;
                    break;
                case LayoutConst.horizontalCenter:
                    _x = base.x + (base.width - self.width) / 2 + distance[0];
                    break;
                case LayoutConst.verticalCenter:
                    _y = base.y + (base.height - self.height) / 2 + distance[1];
                    break;
            }
        }
        self.setPosition(_x, _y);
        return new egret.Point(_x, _y);
    };
    /**
     * 销毁对象
     */
    BaseDisplayObjectContainer.prototype.dispose = function () {
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        App.DisplayUtil.destory(this);
        this.bindData = null;
        if (this.parent) {
            if (this.parent instanceof ScrollView) {
                this.parent.dispose();
            }
            else {
                this.parent.removeChild(this);
            }
        }
    };
    return BaseDisplayObjectContainer;
}(egret.DisplayObjectContainer));
__reflect(BaseDisplayObjectContainer.prototype, "BaseDisplayObjectContainer", ["base.Iinteractive", "base.Ibase"]);

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
 * date 2017/9/20
 * @class ScrollView
 */
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView(content) {
        var _this = _super.call(this, content) || this;
        _this.content = undefined;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStageHandler, _this);
        return _this;
    }
    ScrollView.prototype.removeFromStageHandler = function (e) {
        egret.ScrollTween.removeTweens(this);
    };
    ScrollView.prototype.setContent = function (content) {
        _super.prototype.setContent.call(this, content);
        this.content = content;
    };
    ScrollView.prototype.removeContent = function () {
        egret.ScrollTween.removeTweens(this);
        _super.prototype.removeContent.call(this);
        var content = this.content;
        this.content = null;
        return content;
    };
    ScrollView.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * 添加触摸回调
     */
    ScrollView.prototype.addTouchTap = function (touchTapHandler, touchTapHandlerThisObj, touchTapHandlerParams) {
        var ths = this;
        if (this._touchTapHelper == null) {
            //局部调用，勿改
            var tapHandler = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (event.type == egret.TouchEvent.TOUCH_END) {
                    if (touchTapHandler) {
                        var params = [event];
                        if (args && args.length > 0) {
                            params.concat(args);
                        }
                        touchTapHandler.apply(touchTapHandlerThisObj, params);
                    }
                }
            };
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler, this, touchTapHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    ScrollView.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouch();
            this._touchTapHelper = null;
        }
    };
    ScrollView.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this.content, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    ScrollView.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    ScrollView.prototype.dispose = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this);
        try {
            this._removeEvents();
            this._onTouchEnd(null);
        }
        catch (e) {
        }
        egret.ScrollTween.removeTweens(this);
        if (this.numChildren > 0) {
            var content = this.removeContent();
            if (content instanceof egret.DisplayObjectContainer) {
                App.DisplayUtil.destory(content);
            }
        }
        this._content = null;
    };
    return ScrollView;
}(egret.ScrollView));
__reflect(ScrollView.prototype, "ScrollView", ["base.Ibase"]);

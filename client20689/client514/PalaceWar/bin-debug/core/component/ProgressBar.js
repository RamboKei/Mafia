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
 * author shaoliang
 * date 2017/9/12
 * @class ProgressBar
 */
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        return _super.call(this) || this;
    }
    /**
     * 获取ProgressBar组件
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     * @param barHeight     进度条高度
     */
    ProgressBar.prototype.init = function (progressBar, progressBarBg, barWidth, barHeight) {
        this._barWidth = barWidth;
        this._barHeight = barHeight;
        this._progressBarBgResName = progressBarBg;
        this.progressBarResName = progressBar;
        this.initUI();
    };
    ProgressBar.prototype.initUI = function () {
        this._progressBarBg = BaseBitmap.create(this._progressBarBgResName);
        this.addChild(this._progressBarBg);
        this.progressBar = BaseBitmap.create(this.progressBarResName);
        this.checkScale9Rect();
        this.progressBar.x = this._progressBarBg.x + (this._progressBarBg.width - this.progressBar.width) * 0.5;
        this.progressBar.y = this._progressBarBg.y + (this._progressBarBg.height - this.progressBar.height) * 0.5;
        this.addChild(this.progressBar);
        this._textLb = ComponentManager.getTextField("0/0", TextFieldConst.FONTSIZE_CONTENT_SMALL); //new BaseTextField();
        this._textLb.width = this._barWidth - 20;
        this._textLb.textAlign = egret.HorizontalAlign.CENTER;
        this._textLb.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._textLb.setPosition((this._progressBarBg.width - this._textLb.width) * 0.5, (this._progressBarBg.height - this._textLb.height) * 0.5);
        this.addChild(this._textLb);
        this._textLb.text = "";
        if (RES.hasRes(this.progressBarResName + "_light")) {
            this.progressBarLight = BaseBitmap.create(this.progressBarResName + "_light");
            this.progressBarLight.setPosition(this.progressBar.x - this.progressBarLight.width / 2, this.progressBar.y + (this.progressBar.height - this.progressBarLight.height) / 2);
            this.addChild(this.progressBarLight);
        }
    };
    ProgressBar.prototype.checkScale9Rect = function () {
        var offX = this._progressBarBg.width - this.progressBar.width;
        var offY = this._progressBarBg.height - this.progressBar.height;
        if (offX < 0) {
            offX = 4;
        }
        if (offY < 0) {
            offY = 4;
        }
        if (this._barWidth < this._progressBarBg.width) {
            this._barWidth = this._progressBarBg.width;
        }
        if (this._barHeight < this._progressBarBg.height) {
            this._barHeight = this._progressBarBg.height;
        }
        if (!this._barWidth) {
            this._barWidth = this._progressBarBg.width;
        }
        if (!this._barHeight) {
            this._barHeight = this._progressBarBg.height;
        }
        this._progressBarBg.width = this._barWidth;
        this._progressBarBg.height = this._progressBarBg.height;
        this.progressBar.width = this._barWidth - offX;
        this.progressBar.height = this._barHeight - offY;
    };
    /**
     * 设置进度
     * @param percent 	进度 0～1
     * @param textStr 	文字
     * @param textColor 文字颜色
     */
    ProgressBar.prototype.setPercentage = function (percent, textStr, textColor) {
        this.percents = percent;
        if (this._mask == null) {
            this._mask = new egret.Rectangle(0, 0, this.progressBar.width * percent, this.progressBar.height);
        }
        else {
            this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
        }
        this.progressBar.mask = this._mask;
        if (this.progressBarLight) {
            this.progressBarLight.x = this.progressBar.x + this._mask.width - this.progressBarLight.width / 2;
        }
        if (this._textLb) {
            if (textStr != null) {
                this.setText(textStr);
            }
            if (textColor) {
                this.setTextColor(textColor);
            }
        }
    };
    ProgressBar.prototype.getBgWidth = function () {
        return this._progressBarBg ? this._progressBarBg.width : 0;
    };
    ProgressBar.prototype.getBgHeight = function () {
        return this._progressBarBg ? this._progressBarBg.height : 0;
    };
    Object.defineProperty(ProgressBar.prototype, "percent", {
        get: function () {
            return this.percents;
        },
        set: function (percent) {
            this.setPercentage(percent);
        },
        enumerable: true,
        configurable: true
    });
    ProgressBar.prototype.getPercent = function () {
        return this.percents;
    };
    /**
     * 设置文字大小
     * @param s 文字大小
     */
    ProgressBar.prototype.setTextSize = function (s) {
        if (s != null && this._textLb) {
            this._textLb.size = s;
            if (this._textLb.text == "") {
                this._textLb.text = "0/0";
                this._textLb.setPosition((this._progressBarBg.width - this._textLb.width) * 0.5, (this._progressBarBg.height - this._textLb.height) * 0.5);
                this._textLb.text = "";
            }
            else {
                this._textLb.setPosition((this._progressBarBg.width - this._textLb.width) * 0.5, (this._progressBarBg.height - this._textLb.height) * 0.5);
            }
        }
    };
    /**
     * 设置文字
     * @param textStr 	文字
     */
    ProgressBar.prototype.setText = function (textStr) {
        if (textStr != null && this._textLb) {
            try {
                this._textLb.text = textStr;
                this._textLb.x = (this._progressBarBg.width - this._textLb.width) * 0.5;
            }
            catch (e) {
                App.LogUtil.log(e);
            }
        }
    };
    /**
     * 设置文字颜色
     * @param textColor 文字颜色
     */
    ProgressBar.prototype.setTextColor = function (textColor) {
        if (textColor && this._textLb) {
            this._textLb.textColor = textColor;
        }
    };
    /**
     * 进度条添加动画
     * @param endPercent 结束进度
     * @param time 一整次从0到1播放的时间毫秒
     * @param stepNum 播放几个整次，适用于升级时候传差值，不传只播放一次动画
     * @param callback完成回调
     * @param callbackThisObj 回调拥有对象
     */
    ProgressBar.prototype.tweenTo = function (endPercent, time, stepNum, callback, callbackThisObj) {
        if (stepNum) {
            var ths_1 = this;
            egret.Tween.get(this).to({ percent: 1 }, (1 - this.percent) * time).call(function (stepNum) {
                egret.Tween.removeTweens(ths_1);
                ths_1.tweenNext(time, endPercent, stepNum, callback, callbackThisObj);
            }, this, [stepNum - 1]);
        }
        else {
            var nextTime = endPercent - this.percent;
            if (nextTime < 0) {
                nextTime = 0;
            }
            egret.Tween.get(this).to({ percent: endPercent }, nextTime * time).call(function () {
                if (callback) {
                    callback.apply(callbackThisObj);
                }
            }, this);
        }
    };
    ProgressBar.prototype.tweenNext = function (time, endPercent, stepNum, callback, callbackThisObj) {
        var ths = this;
        egret.Tween.removeTweens(this);
        this._tweenTo = null;
        if (!this._tweenTo) {
            this._tweenTo = egret.Tween.get(this);
        }
        this.percent = 0;
        if (stepNum > 0) {
            this._tweenTo.to({ percent: 1 }, time).call(this.tweenNext, this, [time, endPercent, stepNum - 1, callback, callbackThisObj]);
        }
        else {
            this._tweenTo.to({ percent: endPercent }, time * endPercent).call(function () {
                egret.Tween.removeTweens(ths);
                ths._tweenTo = null;
                if (callback) {
                    callback.apply(callbackThisObj);
                }
            }, this);
        }
    };
    ProgressBar.prototype.dispose = function () {
        BaseBitmap.release(this._progressBarBg);
        this._progressBarBg = null;
        BaseBitmap.release(this.progressBar);
        this.progressBar = null;
        this.progressBarResName = null;
        this._progressBarBgResName = null;
        this._barWidth = null;
        this._barHeight = null;
        this._textLb.dispose();
        this._textLb = null;
        this.percents = null;
        this._mask = null;
        this._tweenTo = null;
        this.progressBarLight = null;
        _super.prototype.dispose.call(this);
    };
    return ProgressBar;
}(BaseDisplayObjectContainer));
__reflect(ProgressBar.prototype, "ProgressBar");

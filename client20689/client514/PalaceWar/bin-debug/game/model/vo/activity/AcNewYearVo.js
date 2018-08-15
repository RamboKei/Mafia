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
var AcNewYearVo = (function (_super) {
    __extends(AcNewYearVo, _super);
    function AcNewYearVo() {
        var _this = _super.call(this) || this;
        _this.taskinfo = null;
        _this.scoreinfo = null;
        _this.diffday = 0;
        _this.score = 0;
        return _this;
    }
    AcNewYearVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.taskinfo) {
            this.taskinfo = data.taskinfo;
        }
        if (data.scoreinfo) {
            this.scoreinfo = data.scoreinfo;
        }
        if (data.diffday) {
            this.diffday = data.diffday;
        }
        if (data.taskinfo.dayFlag && data.taskinfo.dayFlag == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
    };
    Object.defineProperty(AcNewYearVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.taskinfo && this.taskinfo.dayFlag && this.taskinfo.dayFlag == 1) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //获取当前分数
    AcNewYearVo.prototype.getScore = function () {
        return this.scoreinfo.score;
    };
    // 第一页面礼包是否领取
    AcNewYearVo.prototype.getBtnType = function (num) {
        if (num === void 0) { num = 0; }
        if (this.scoreinfo.info) {
            if (this.scoreinfo.info[num] && this.scoreinfo.info[num] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    //  0不可领 1未领取 2已领取
    AcNewYearVo.prototype.getIdflag = function (questType) {
        if (questType === void 0) { questType = 0; }
        if (this.taskinfo.info[questType]) {
            return this.taskinfo.info[questType].flag;
        }
    };
    //当前任务进度
    AcNewYearVo.prototype.getTaskLength = function () {
        var arr = [];
        for (var key in this.taskinfo.info) {
            if (this.taskinfo.info[key].flag == 2) {
                arr.push(this.taskinfo.info[key]);
            }
        }
        return arr.length;
    };
    AcNewYearVo.prototype.dispose = function () {
        this.taskinfo = null;
        this.scoreinfo = null;
        this.diffday = 0;
        this.score = 0;
    };
    return AcNewYearVo;
}(AcBaseVo));
__reflect(AcNewYearVo.prototype, "AcNewYearVo");

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
 * 充值活动
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeItem
 */
var AcRechargeItem = (function (_super) {
    __extends(AcRechargeItem, _super);
    function AcRechargeItem() {
        var _this = _super.call(this) || this;
        _this._seprateNum = 0;
        _this._isSpecial = false;
        return _this;
    }
    AcRechargeItem.prototype.init = function (aid, code, rect) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshAfterRecharge, this);
        this._aid = aid;
        this._code = String(code);
        this.refreshList(rect);
    };
    AcRechargeItem.prototype.refreshAfterRecharge = function () {
        /**有特殊档 */
        if (this._isSpecial) {
            var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
            if (tmpVo.v >= this._seprateNum && Api.switchVoApi.checkSpecialChargeReward()) {
                // this.refreshList();
                egret.callLater(this.refreshList, this);
                // egret.Tween.get(this).wait(800).call(this.refreshList,this);
            }
        }
    };
    AcRechargeItem.prototype.refreshList = function (rect) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var objList = cfgObj.getList();
        var terList = {};
        for (var key in objList) {
            var tmpCfg = objList[key];
            if (tmpCfg.isSpecial && tmpCfg.isSpecial == 1) {
                if (Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum) {
                    this._isSpecial = true;
                    terList[key] = tmpCfg;
                }
            }
            else {
                this._seprateNum = tmpCfg.needGem;
                terList[key] = tmpCfg;
            }
        }
        var keys = Object.keys(terList);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var scrolItem = undefined;
        if (this._aid == "dailyCharge") {
            scrolItem = AcDailyChargeScrollItem;
        }
        else if (this._aid == "totalRecharge") {
            scrolItem = AcTotalRechargeScrollItem;
        }
        else if (this._aid == "totalDayRecharge") {
            scrolItem = AcTotalDayRechargeScrollItem;
            var num = tmpVo.getShowNum(1);
            if (keys.length > 0) {
                keys.splice(num, keys.length - num);
            }
        }
        if (rect) {
            var scrollList = ComponentManager.getScrollList(scrolItem, keys, rect);
            this.addChild(scrollList);
            this._scrollList = scrollList;
        }
        else {
            this._scrollList.refreshData(keys);
        }
    };
    AcRechargeItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshAfterRecharge, this);
        this._aid = null;
        this._code = null;
        this._scrollList = null;
        this._seprateNum = 0;
        this._isSpecial = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeItem;
}(BaseDisplayObjectContainer));
__reflect(AcRechargeItem.prototype, "AcRechargeItem");

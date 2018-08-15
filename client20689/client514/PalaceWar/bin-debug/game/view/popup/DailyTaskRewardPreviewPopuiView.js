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
 * 每日奖励宝箱奖励预览弹板
 * author yanyuling qianjun 通用于转盘宝箱
 * date 2017/10/30
 * @class DailyTaskRewardPreviewPopuiView
 */
var DailyTaskRewardPreviewPopuiView = (function (_super) {
    __extends(DailyTaskRewardPreviewPopuiView, _super);
    function DailyTaskRewardPreviewPopuiView() {
        return _super.call(this) || this;
    }
    DailyTaskRewardPreviewPopuiView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var data = this.param.data;
        var rewardId = data.id;
        var rewardCfg = null;
        var need = 0;
        var mustStr = '';
        var canReward = null;
        if (data.type == AcMayDayView.AID) {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
            rewardCfg = cfg.getBoxRewardById(rewardId);
            need = rewardCfg.needNum;
            mustStr = rewardCfg.getReward;
        }
        else {
            rewardCfg = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(rewardId);
            need = rewardCfg.needLiveness;
            var mustReward = rewardCfg.mustReward;
            mustStr = mustReward[0] + "_" + mustReward[1] + "_0";
            canReward = rewardCfg.canReward;
        }
        var ofy = 51;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 205;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy;
        this._nodeContainer.addChild(bg);
        var topBg = BaseBitmap.create("public_9_bg3");
        topBg.width = 272;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 65 - ofy;
        this._nodeContainer.addChild(topBg);
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(data.type == 'Daily' ? "dailyTask_rewardCase" : 'acMayDayBoxDesc', [String(need)]);
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
        this._nodeContainer.addChild(tipTxt1);
        var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipTxt2.text = LanguageManager.getlocal(data.type == 'Daily' ? "dailyTask_rewardTip" : 'acMayDayBoxDesc1');
        tipTxt2.x = bg.x + 10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        if (!canReward) {
            canReward = [];
        }
        var resultStr = mustStr;
        for (var index = 0; index < canReward.length; index++) {
            resultStr = resultStr + "|" + canReward[index];
        }
        var rewardArr = GameData.formatRewardItem(resultStr);
        var lineNum = Math.ceil(rewardArr.length / 4);
        var rbg = BaseBitmap.create("public_9_bg1");
        rbg.width = bg.width - 20;
        rbg.height = 120 * lineNum;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
        this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        var rewardX = rbg.x + (data.type == AcMayDayView.AID ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2) : 10); //rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        var rewardY = rbg.y + 10;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            var numLb = iconItem.getChildByName("numLb");
            if (numLb) {
                numLb.visible = false;
            }
            if (index > 0) {
                rewardX += (iconItem.width + 10);
                if (index % 4 == 0) {
                    rewardX = rewardX = rbg.x + (data.type == AcMayDayView.AID ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2) : 10);
                    rewardY += iconItem.height + 5;
                }
            }
            iconItem.x = rewardX;
            iconItem.y = rewardY;
            this._nodeContainer.addChild(iconItem);
        }
    };
    DailyTaskRewardPreviewPopuiView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    DailyTaskRewardPreviewPopuiView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DailyTaskRewardPreviewPopuiView;
}(PopupView));
__reflect(DailyTaskRewardPreviewPopuiView.prototype, "DailyTaskRewardPreviewPopuiView");

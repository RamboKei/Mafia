/**
 * 任务
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskView
 */
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
var DailyTaskView = (function (_super) {
    __extends(DailyTaskView, _super);
    function DailyTaskView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._maxLivenessValue = 0;
        return _this;
    }
    DailyTaskView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshProfress, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS), this.rewardBoxClickhandlerCallBack, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = -15;
        this._nodeContainer.addChild(topBg);
        var scroY = topBg.y + topBg.height;
        //活跃度信息
        var livenessIcon = BaseBitmap.create("dailytask_liveness");
        livenessIcon.x = 40;
        livenessIcon.y = topBg.y + topBg.height / 2 - livenessIcon.height / 2 + 10;
        this._nodeContainer.addChild(livenessIcon);
        var livenessTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        livenessTxt.text = LanguageManager.getlocal("dailyTask_todayliveness");
        livenessTxt.x = livenessIcon.x + livenessIcon.width / 2 - livenessTxt.width / 2;
        livenessTxt.y = livenessIcon.y - 25;
        this._nodeContainer.addChild(livenessTxt);
        this._curLivenessTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curLivenessTxt.x = 80 - this._curLivenessTxt.width / 2;
        this._curLivenessTxt.y = livenessIcon.y + livenessIcon.height + 5;
        this._nodeContainer.addChild(this._curLivenessTxt);
        this._progress = ComponentManager.getProgressBar("progress4", "progress4_bg", 488);
        this._progress.x = livenessIcon.x + livenessIcon.width + 5;
        this._progress.y = livenessIcon.y + livenessIcon.height / 2 - this._progress.height / 2;
        this._progress.setPercentage(this.getProgressPercent());
        this._nodeContainer.addChild(this._progress);
        //初始化宝箱
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        var perWidth = 470 / rkeys.length;
        var startX = this._progress.x;
        this._maxLivenessValue = rewardList[String(rkeys.length)].needLiveness;
        for (var index = 0; index < rkeys.length; index++) {
            var tmprcfg = rewardList[String(index + 1)];
            var perX = startX + (index + 1) * perWidth;
            // let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
            var arrowImg = BaseBitmap.create("dailytask_arrow");
            arrowImg.x = perX - arrowImg.width / 2 + 2;
            arrowImg.y = this._progress.y - arrowImg.height + 4;
            this._nodeContainer.addChild(arrowImg);
            var rStatus = this.getBoxStatusById(rkeys[index]);
            var imgres = "dailytask_box1_";
            if (index > 2) {
                imgres = "dailytask_box2_";
            }
            var boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
            boxImg.anchorOffsetX = 53 / 2;
            boxImg.anchorOffsetY = 51 / 2;
            boxImg.name = "boxImg" + rkeys[index];
            boxImg.x = perX;
            boxImg.y = this._progress.y - 51 / 2 - 5;
            var lightImg = BaseLoadBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 67 / 2;
            lightImg.anchorOffsetY = 65 / 2;
            lightImg.x = perX;
            lightImg.name = "lightImg" + rkeys[index];
            lightImg.y = this._progress.y - 30;
            lightImg.visible = false;
            this._nodeContainer.addChild(lightImg);
            this._nodeContainer.addChild(boxImg);
            boxImg.addTouchTap(this.rewardBoxClickhandler, this, [rkeys[index]]);
            var livenuseeBg = BaseBitmap.create("dailytask_liveness_numbg");
            livenuseeBg.width = 85;
            livenuseeBg.x = perX - 40;
            livenuseeBg.y = this._progress.y + 35;
            this._nodeContainer.addChild(livenuseeBg);
            var numTxt = ComponentManager.getTextField(tmprcfg.needLiveness + LanguageManager.getlocal("dailyTask_liveness"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            numTxt.x = perX - numTxt.width / 2;
            numTxt.y = this._progress.y + 42;
            this._nodeContainer.addChild(numTxt);
        }
        this.refreshProfress();
        //底部列表
        var innerbg1 = BaseBitmap.create("public_9_bg24");
        innerbg1.width = GameConfig.stageWidth;
        innerbg1.height = GameConfig.stageHeigth - scroY - this.container.y;
        innerbg1.x = 0;
        innerbg1.y = scroY;
        this._nodeContainer.addChild(innerbg1);
        var innerbg2 = BaseBitmap.create("public_9_bg23");
        innerbg2.width = GameConfig.stageWidth - 4;
        innerbg2.height = innerbg1.height - 4;
        innerbg2.x = 2;
        innerbg2.y = innerbg1.y + 2;
        this._nodeContainer.addChild(innerbg2);
        //门客滚顶区域
        var scrollH = GameConfig.stageHeigth - innerbg2.y - this.container.y - 20;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var list = Api.dailytaskVoApi.getTaskIdListAfterSort();
        this._scrollList = ComponentManager.getScrollList(DailyTaskScrollItem, list, rect);
        this._scrollList.y = innerbg2.y + 10;
        this._nodeContainer.addChild(this._scrollList);
    };
    //每次领取奖励后，刷新进度条以及宝箱状态
    DailyTaskView.prototype.refreshProfress = function () {
        var newPro = this.getProgressPercent();
        var oldPro = this._progress.getPercent();
        egret.Tween.get(this._progress, { loop: false }).to({ percent: newPro }, (newPro - oldPro) * 5000);
        this._curLivenessTxt.text = String(Api.dailytaskVoApi.getCurLivenessValue());
        this._curLivenessTxt.x = 80 - this._curLivenessTxt.width / 2;
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        var startX = this._progress.x;
        for (var index = 0; index < rkeys.length; index++) {
            var tmpK = String(rkeys[index]);
            var tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
            var boxImg = this._nodeContainer.getChildByName("boxImg" + tmpK);
            var lightImg = this._nodeContainer.getChildByName("lightImg" + tmpK);
            var rStatus = this.getBoxStatusById(tmpK);
            var imgres = "dailytask_box1_";
            if (index > 2) {
                imgres = "dailytask_box2_";
            }
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.texture = ResourceManager.getRes(imgres + rStatus);
            }
            if (rStatus == 2) {
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
            else {
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
    };
    /**
     * 处理进度条进度值
     */
    DailyTaskView.prototype.getProgressPercent = function () {
        var curLiveness = Api.dailytaskVoApi.getCurLivenessValue();
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        if (curLiveness == 0)
            return 0;
        if (curLiveness >= rewardList[String(rkeys.length)].needLiveness)
            return 100;
        var perV = 1 / rkeys.length;
        for (var index = 1; index <= rkeys.length; index++) {
            if (curLiveness <= rewardList[String(index)].needLiveness) {
                var result = perV * (index - 1);
                var tmpV1 = 0;
                if (index > 1) {
                    tmpV1 = rewardList[String(index - 1)].needLiveness;
                }
                var tmpV2 = rewardList[String(index)].needLiveness;
                result += (curLiveness - tmpV1) / (tmpV2 - tmpV1) * perV;
                return result;
            }
        }
    };
    DailyTaskView.prototype.getBoxStatusById = function (boxId) {
        var tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
        var rStatus = 1;
        if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId(boxId)) {
            rStatus = 3;
        }
        else {
            if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
                rStatus = 2;
        }
        return rStatus;
    };
    //宝箱奖励领取回调
    DailyTaskView.prototype.rewardBoxClickhandlerCallBack = function (event) {
        var data = event.data.data.data;
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        var boxImg = this._nodeContainer.getChildByName("boxImg" + this._curRewardBoxId);
        var pos = boxImg.localToGlobal(boxImg.width / 2, 50);
        App.CommonUtil.playRewardFlyAction(rList, pos);
        this.refreshProfress();
    };
    DailyTaskView.prototype.rewardBoxClickhandler = function (obj, param) {
        var boxRewardId = param;
        var status = this.getBoxStatusById(boxRewardId);
        /**
         *  1未完成 2可领取 3已领取
         */
        if (status == 2) {
            this._curRewardBoxId = boxRewardId;
            NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS, { liveKey: boxRewardId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { type: 'Daily', id: boxRewardId });
        }
    };
    DailyTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailytask_topbg", "dailytask_icon1", "dailytask_topbg", "progress4", "progress4_bg",
            "dailytask_liveness", "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3", "dailytask_liveness_numbg",
            "dailytask_arrow", "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "progress6_bg",
        ]);
    };
    DailyTaskView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshProfress, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS), this.rewardBoxClickhandlerCallBack, this);
        this._nodeContainer = null;
        this._scrollList = null;
        this._progress = null;
        this._curLivenessTxt = null;
        this._curRewardBoxId = null;
        _super.prototype.dispose.call(this);
    };
    return DailyTaskView;
}(CommonView));
__reflect(DailyTaskView.prototype, "DailyTaskView");

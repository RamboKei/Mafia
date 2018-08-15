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
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
var MainTaskPopupView = (function (_super) {
    __extends(MainTaskPopupView, _super);
    function MainTaskPopupView() {
        return _super.call(this) || this;
    }
    MainTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        Api.rookieVoApi.checkNextStep();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 290;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        var rbg = BaseBitmap.create("public_9_bg1");
        rbg.width = bg.width - 20;
        rbg.height = 120;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        this._nodeContainer.addChild(rbg);
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._rewardContainer);
        var deltaY = 35;
        var taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        taskNameTxt.x = 60;
        taskNameTxt.y = 25;
        this._nodeContainer.addChild(taskNameTxt);
        this._taskNameTxt = taskNameTxt;
        var taskDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        taskDescTxt.x = taskNameTxt.x;
        taskDescTxt.y = taskNameTxt.y + deltaY;
        this._nodeContainer.addChild(taskDescTxt);
        this._taskDescTxt = taskDescTxt;
        var taskAimTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        taskAimTxt.x = taskNameTxt.x;
        taskAimTxt.y = taskDescTxt.y + deltaY;
        this._nodeContainer.addChild(taskAimTxt);
        this._taskAimTxt = taskAimTxt;
        var taskRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskReward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        taskRewardTxt.x = taskNameTxt.x;
        taskRewardTxt.y = taskAimTxt.y + deltaY;
        this._nodeContainer.addChild(taskRewardTxt);
        //奖励物资,还有特效
        this._rewardContainer.y = taskRewardTxt.y + deltaY + 5;
        this._rewardContainer.x = taskNameTxt.x;
        rbg.y = this._rewardContainer.y - 10;
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "taskGoBtn", this.goHandler, this);
        goBtn.x = bg.x + bg.width / 2 - goBtn.width / 2;
        goBtn.y = bg.y + bg.height + 15;
        goBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(goBtn);
        this._goBtn = goBtn;
        this.refreshUIInfo();
    };
    MainTaskPopupView.prototype.refreshUIInfo = function () {
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        /**
         * 完成所有的任务，不需要继续刷新
         */
        if (!this._taskId || !taskCfg) {
            return;
        }
        if (this._collectFlag) {
            this._collectFlag.visible = false;
        }
        this._goBtn.visible = true;
        var nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt();
        this._taskDescTxt.text = nameAndDesc[1];
        this._taskNameTxt.text = nameAndDesc[0];
        var tarColor = TextFieldConst.COLOR_WARN_RED;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        this._taskAimTxt.text = LanguageManager.getlocal("taskAim", [String(tarColor), String(Api.mainTaskVoApi.getCurMainTaskValue()) + "/" + String(taskCfg.value)]);
        var rewardArr = GameData.formatRewardItem(taskCfg.reward);
        this._rewardContainer.removeChildren();
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.x = index * (iconItem.width + 10);
            this._rewardContainer.addChild(iconItem);
        }
        //可领取
        if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
            this._goBtn.setText("taskCollect");
            this._collectEnable = true;
        }
        else {
            this._goBtn.setText("taskGoBtn");
            this._collectEnable = false;
        }
    };
    MainTaskPopupView.prototype.doCollectCallback = function () {
        //飘奖励，盖章，然后刷新
        this._goBtn.visible = false;
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var rewardList = GameData.formatRewardItem(taskCfg.reward);
        // let list = [];
        // for(let i = 0;i < rewardList.length;i++)
        // {
        // 	let rewardItemVo:RewardItemVo = rewardList[i];
        // 	list.push({"icon":rewardItemVo.icon,"message":rewardItemVo.name + "+" + rewardItemVo.num});
        // }
        App.CommonUtil.playRewardFlyAction(rewardList);
        if (this._collectFlag == null) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._goBtn.x + this._collectFlag.anchorOffsetX;
            this._collectFlag.y = this._goBtn.y + this._collectFlag.anchorOffsetY - 30;
            this._nodeContainer.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        var tmpThis = this;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.8, scaleY: 0.8 }, 400).wait(600).call(function () {
            tmpThis.refreshUIInfo(); //领取成功之后刷新
        });
    };
    //需要针对每个任务处理跳转关系
    MainTaskPopupView.prototype.goHandler = function () {
        if (String(this._taskId) == "1") {
            var reportValue = "mtask_" + this._taskId + "_1";
            StatisticsHelper.reportLoadData(reportValue);
        }
        if (this._collectEnable) {
            //请求网络,领取奖励
            NetManager.request(NetRequestConst.REQUEST_TASK_GETMAINTASK, { taskId: this._taskId });
            return;
        }
        var cfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var questType = cfg.questType;
        var cfgValue = cfg.value;
        switch (questType) {
            case 105://官品等级----官品等级达到X
                ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
                break;
            case 201://{门客ID}将领达到X级----华安等级达到10级
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, cfg.need);
                break;
            // case 301://随机传唤次数----随机传唤X次
            // 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
            // 	break;
            case 302: //宠幸红颜次数----宠幸红颜次数达到X次 
            case 305: //赏赐红颜
            case 306://赏赐红颜
                ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: "101", handler: null });
                break;
            default:
                var openType = cfg.openType;
                if (openType == "alliance") {
                    Api.allianceVoApi.openMainView();
                }
                else if (openType == "studyatk") {
                    Api.studyatkVoApi.openMainView();
                }
                else if (openType == "welfare") {
                    ViewController.getInstance().openView("WelfareView|" + cfg.openNeed);
                }
                else if (openType == "level" || openType == "arrival" || openType == "") {
                    ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
                }
                else {
                    var viewName = App.StringUtil.firstCharToUper(openType);
                    if (egret.getDefinitionByName(viewName + "View")) {
                        // if (cfg.questType == 801)
                        // {
                        // 	ViewController.getInstance().openView(viewName+ "View|1");
                        // }else if (cfg.questType == 802){
                        // 	ViewController.getInstance().openView(viewName+ "View|2");
                        // }
                        // else{
                        ViewController.getInstance().openView(viewName + "View");
                        // }
                    }
                    else if (egret.getDefinitionByName(viewName + "PopupView")) {
                        ViewController.getInstance().openView(viewName + "PopupView");
                    }
                }
                break;
        }
        this.hide();
    };
    MainTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "itemeffect"
        ]);
    };
    MainTaskPopupView.prototype.closeHandler = function () {
        if (String(this._taskId) == "1") {
            var reportValue = "mtask_" + this._taskId + "_0";
            StatisticsHelper.reportLoadData(reportValue);
        }
        this.hide();
    };
    MainTaskPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        this._nodeContainer = null;
        this._rewardContainer = null;
        this._taskId = null;
        this._taskDescTxt = null;
        this._taskAimTxt = null;
        this._taskNameTxt = null;
        this._goBtn = null;
        this._collectEnable = false;
        this._collectFlag = null;
        _super.prototype.dispose.call(this);
    };
    return MainTaskPopupView;
}(PopupView));
__reflect(MainTaskPopupView.prototype, "MainTaskPopupView");

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
 * 主线任务api
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVoApi
 */
var MainTaskVoApi = (function (_super) {
    __extends(MainTaskVoApi, _super);
    function MainTaskVoApi() {
        return _super.call(this) || this;
    }
    MainTaskVoApi.prototype.getCurMainTaskId = function () {
        return this.mainTaskVo.taskId;
    };
    MainTaskVoApi.prototype.getCurMainTaskValue = function () {
        return this.mainTaskVo.value;
    };
    MainTaskVoApi.prototype.getCurTaskNameAndDescTxt = function () {
        // taskId ="105001";
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = taskCfg.questType;
        var resultStr = [];
        var tmpNameTxt = undefined;
        var tmpDescTxt = undefined;
        if (questType == 201) {
            var servantName = LanguageManager.getlocal("servant_name" + taskCfg.need);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [servantName]);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [servantName, String(taskCfg.value)]);
        }
        else if (questType == 105) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [LanguageManager.getlocal("officialTitle" + taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 202) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.need), String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 206) {
            var clvStr = LanguageManager.getlocal("servant_clvStr" + taskCfg.value);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.need), clvStr]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 106) {
            var bcid = Math.floor(taskCfg.value / 41) + 1;
            var chaellageName = LanguageManager.getlocal("challengeTitle" + bcid);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [chaellageName]);
        }
        else {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        resultStr.push(tmpNameTxt);
        resultStr.push(tmpDescTxt);
        return resultStr;
    };
    MainTaskVoApi.prototype.isCurTaskReach = function () {
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (this.getCurMainTaskValue() >= taskCfg.value) {
            return true;
        }
        return false;
    };
    return MainTaskVoApi;
}(BaseVoApi));
__reflect(MainTaskVoApi.prototype, "MainTaskVoApi");

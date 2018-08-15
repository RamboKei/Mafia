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
var SwitchVoApi = (function (_super) {
    __extends(SwitchVoApi, _super);
    function SwitchVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测功能开关
     * @param functionName
     */
    SwitchVoApi.prototype.checkSwitchByName = function (functionName) {
        return Boolean(this.switchVo && this.switchVo.switchList[functionName]);
    };
    /**
     * 检测是否打开了媒婆功能
     */
    SwitchVoApi.prototype.checkAudlt = function () {
        return this.checkSwitchByName("funAdult");
    };
    /**
     * 检测是否打开了惩戒女囚
     */
    SwitchVoApi.prototype.checkPunishAllianceRank = function () {
        return this.checkSwitchByName("closePunish");
    };
    /**
     * 惩戒女囚的元宝购买次数随VIP等级增多的开关
     */
    SwitchVoApi.prototype.checkPunishVip = function () {
        return this.checkSwitchByName("openPunishVip");
    };
    /**
     * 检测是否关闭了宠幸拖衣服
     */
    SwitchVoApi.prototype.checkWifeAni = function () {
        return this.checkSwitchByName("closeWifeAni");
    };
    /**
     * 检测是否关闭被和谐文字
     */
    SwitchVoApi.prototype.checkCloseText = function () {
        return this.checkSwitchByName("closeText");
    };
    /**
     * 检测是否挂机收取资源
     */
    SwitchVoApi.prototype.checkAutoResManage = function () {
        return this.checkSwitchByName("funAutoResManage");
    };
    /**
     * 检测 是否开启审核 true:开启审核、屏蔽排行榜  false:打开排行榜关闭审核
     */
    SwitchVoApi.prototype.checkOpenShenhe = function () {
        return this.checkSwitchByName("openShenhe");
    };
    /**
     * 检测是否挂机收取资源
     */
    SwitchVoApi.prototype.checkTWShenhe = function () {
        return this.checkSwitchByName("twShenhe");
    };
    SwitchVoApi.prototype.checkOpenTalkDialog = function () {
        return this.checkSwitchByName("openTalkDialog");
    };
    /**
     * 关卡跳过开关
     */
    SwitchVoApi.prototype.checkJumpBattle = function () {
        return this.checkSwitchByName("openJumpBattle");
    };
    /**
     * 一键扫荡关卡
     */
    SwitchVoApi.prototype.checkAutoMopup = function () {
        return this.checkSwitchByName("openAutoMopup");
    };
    /**
     * 疯狂游乐场 检测VIP 根据渠道做限制
     */
    SwitchVoApi.prototype.checkVip1Privilege = function () {
        // return this.checkSwitchByName("openVip1Privilege");
        // 这个开关不用了，以后永远开
        return true;
    };
    /**
     * 首冲后礼包开关
     */
    SwitchVoApi.prototype.checkOpenNewCharge = function () {
        return this.checkSwitchByName("openNewCharge");
    };
    /**
     * 充值奖励特殊档 是否开启
     */
    SwitchVoApi.prototype.checkSpecialChargeReward = function () {
        return this.checkSwitchByName("openSpecialChargeReward");
    };
    /**
     * 玩吧脱衣AB测试
     */
    SwitchVoApi.prototype.checkOpenWifeAbTest = function () {
        return this.checkSwitchByName("openWifeAbTest");
    };
    /**
     * 新版牢房开关
     */
    SwitchVoApi.prototype.checkOpenNewPrison = function () {
        return this.checkSwitchByName("openNewPrison");
    };
    /**
     * 邀请有礼开关
     */
    SwitchVoApi.prototype.checkOpenInvite = function () {
        return this.checkSwitchByName("openInvite");
    };
    /**
     * 新首次充值开关 true=新版本
     */
    SwitchVoApi.prototype.checknewRecharge = function () {
        return this.checkSwitchByName("newRecharge");
    };
    /**
     * q群福利 开关  true新版本
     */
    SwitchVoApi.prototype.checkopenQQqun = function () {
        return this.checkSwitchByName("openQQqun");
    };
    /**
     * 是否关闭骨骼
     */
    SwitchVoApi.prototype.checkCloseBone = function () {
        return this.checkSwitchByName("closeBone");
        // return false;
    };
    /**
     * 是否关闭宴会新功能
     */
    SwitchVoApi.prototype.checkCloseDinnerNewFunc = function () {
        return this.checkSwitchByName("closeDinnerNewFunc");
    };
    /**
     * 3k迁移面板的开关
     */
    SwitchVoApi.prototype.checkOpen3kQianYi = function () {
        return this.checkSwitchByName("open3kqianyi");
    };
    /**
     * 红颜视频开关
     */
    SwitchVoApi.prototype.checkOpenWifeVideo = function () {
        return this.checkSwitchByName("openWifeVideo");
    };
    SwitchVoApi.prototype.isCrossOpen = function () {
        return this.checkSwitchByName("openCrossPalace");
    };
    /**
     * 名望开关 本服称帝
     */
    SwitchVoApi.prototype.checkOpenPrestige = function () {
        return this.checkSwitchByName("openPrestige");
    };
    SwitchVoApi.prototype.checkClosePay = function () {
        if (PlatformManager.checkIsIOSShenheSp() && Number(PlatformManager.getAppid()) == 17001213) {
            return true;
        }
        return false;
    };
    SwitchVoApi.prototype.checkAutoLoadDefaultRes = function () {
        return this.checkSwitchByName("autoloadres");
    };
    /**
     * cover
     */
    SwitchVoApi.prototype.checkOpenCover = function () {
        return this.checkSwitchByName("openCover");
    };
    // 至劲测试充值返利 
    SwitchVoApi.prototype.checkOpenRechargeRebate = function () {
        return this.checkSwitchByName("openRechargeRebate");
    };
    // 实名认证开关
    SwitchVoApi.prototype.checkOpenCertification = function () {
        return this.checkSwitchByName("openCertification");
    };
    // 绑定有礼开关
    SwitchVoApi.prototype.checkOpenFbBind = function () {
        return this.checkSwitchByName("openFbBind");
    };
    //修身是否开启
    SwitchVoApi.prototype.isPracticeOPen = function () {
        return this.checkSwitchByName("openPractice");
    };
    /**
     * 册封是否开启
     */
    SwitchVoApi.prototype.checkOpenWifeStatus = function () {
        return this.checkSwitchByName("openWifestatus");
    };
    /**
     * 自动登录AB测试开关
     */
    SwitchVoApi.prototype.checkApenAutoLoginABtest = function () {
        return this.checkSwitchByName("openAutoLoginABtest");
    };
    return SwitchVoApi;
}(BaseVoApi));
__reflect(SwitchVoApi.prototype, "SwitchVoApi");

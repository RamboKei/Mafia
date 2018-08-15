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
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
var OtherInfoVoApi = (function (_super) {
    __extends(OtherInfoVoApi, _super);
    function OtherInfoVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测是否已膜拜
     */
    OtherInfoVoApi.prototype.isRankVisited = function (idx) {
        if (idx == 0) {
            return this.otherInfoVo.power;
        }
        if (idx == 1) {
            return this.otherInfoVo.challenge;
        }
        if (idx == 2) {
            return this.otherInfoVo.imacy;
        }
    };
    OtherInfoVoApi.prototype.getOtherInfo = function () {
        return this.otherInfoVo;
    };
    /**
    * 检测是否领取绑定奖励
    */
    OtherInfoVoApi.prototype.isGetBindingReward = function () {
        if (this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getPalaceFlag = function () {
        return this.otherInfoVo.palace_flag;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getBanet = function () {
        return this.otherInfoVo.banet;
    };
    //获取糖果屋领取情况
    OtherInfoVoApi.prototype.getCandyGetInfo = function () {
        return this.otherInfoVo.info.candy;
    };
    //疯狂游乐场关分享信息
    OtherInfoVoApi.prototype.getFkShareInfo = function () {
        return this.otherInfoVo.info.fkShare;
    };
    //疯狂游乐场关关注信息
    OtherInfoVoApi.prototype.getFkFocusInfo = function () {
        return this.otherInfoVo.info.fkFocus;
    };
    //疯狂游乐场分享红点
    OtherInfoVoApi.prototype.getFkIsshowRed = function () {
        if (!this.otherInfoVo.info.fkShare) {
            return false;
        }
        var rewards = Config.GameprojectCfg.rewardFKYLC2;
        var keys = Object.keys(rewards);
        var l = keys.length;
        var fkVo = Api.otherInfoVoApi.getFkShareInfo();
        for (var i = 0; i < l; i++) {
            var rewardStr = rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            var state = 1;
            if (!fkVo) {
                state = 3;
            }
            else {
                if (fkVo.n >= Number(keys[i])) {
                    if (fkVo.get[keys[i]] == 1) {
                        state = 2;
                    }
                    else {
                        state = 1;
                    }
                }
                else {
                    state = 3;
                }
            }
            if (state == 1) {
                return true;
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.checkShowWanbaDesktopIcon = function () {
        return PlatformManager.isSupportDesktopIcon() && !this.checkWanbaHasSendDesktop();
    };
    OtherInfoVoApi.prototype.checkShowWanbaShareIcon = function () {
        return PlatformManager.isSupportShare() && !this.checkWanbaDailyHasShared();
    };
    OtherInfoVoApi.prototype.checkWanbaHasSendDesktop = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbsendFlag;
    };
    OtherInfoVoApi.prototype.checkWanbaDailyHasShared = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbdailyshareFlag;
    };
    // 3k实名认证已领取 true 未领取
    OtherInfoVoApi.prototype.checkrealnamerewards = function () {
        if (this.otherInfoVo.info.author3k) {
            return false;
        }
        return true;
    };
    OtherInfoVoApi.prototype.getServantSortId = function () {
        var sortId = this.otherInfoVo.info.sortId;
        return sortId ? sortId : 1;
    };
    OtherInfoVoApi.prototype.getUnlockList = function () {
        if (this.otherInfoVo.info) {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    };
    //功能解锁名字
    OtherInfoVoApi.prototype.getFunctionName = function () {
        // this.arr2 =[];
        var arr = Api.otherInfoVoApi.getUnlockList(); //领取数据 
        var arr2 = [];
        arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        var arr3 = []; //已经领取过的
        var arr4 = []; //可以领取的
        var arr5 = []; //不可以领取的
        for (var i = 0; i < arr2.length; i++) {
            if (arr && arr[arr2[i].key] == 1) {
                arr3.push(arr2[i]);
                if (arr3.length == arr2.length) {
                    return null;
                }
            }
            else {
                if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc) {
                        arr4.push(arr2[i]);
                    }
                    else {
                        arr5.push(arr2[i]);
                    }
                }
            }
        }
        arr3.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr4.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr5.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr2 = arr4.concat(arr5).concat(arr3);
        var str = LanguageManager.getlocal("functionModuleDes" + arr2[0].sortId);
        return str;
    };
    //功能解锁红点
    OtherInfoVoApi.prototype.getFunctionRedhot = function () {
        var arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.unlockList) {
            var arr = this.otherInfoVo.info.unlockList;
            var boo = false;
            for (var i = 0; i < arr2.length; i++) {
                if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc && arr[arr2[i].key] != 1) {
                        boo = true;
                        return boo;
                    }
                }
            }
            return boo;
        }
        else {
            return false;
        }
    };
    OtherInfoVoApi.prototype.getCoverState = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        }
        else {
            return 0;
        }
    };
    /** 获取港台绑定账号奖励领取状态 */
    OtherInfoVoApi.prototype.getFBBindFlag = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        }
        else {
            return 0;
        }
    };
    OtherInfoVoApi.prototype.certification = function () {
        if (this.otherInfoVo.certification) {
            return true;
        }
        return false;
    };
    /**
     * 是否是新用户的
     */
    OtherInfoVoApi.prototype.isnewuser = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.isnewuser) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.dispose = function () {
        this.otherInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return OtherInfoVoApi;
}(BaseVoApi));
__reflect(OtherInfoVoApi.prototype, "OtherInfoVoApi");

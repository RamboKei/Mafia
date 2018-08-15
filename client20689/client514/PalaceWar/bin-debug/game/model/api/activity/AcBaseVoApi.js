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
var AcBaseVoApi = (function (_super) {
    __extends(AcBaseVoApi, _super);
    function AcBaseVoApi() {
        var _this = _super.call(this) || this;
        _this._acVoList = {};
        _this._newAcVoList = {};
        //活动是否激活了某些激活条件 可用于活动解锁红颜
        _this._activeUnlockMap = {}; //{[key: string]:number;};
        return _this;
    }
    AcBaseVoApi.prototype.formatData = function (data, checkCfg) {
        var needGetCfgAidArr = [];
        if (data.info) {
            var info = data.info;
            for (var key in info) {
                var aidAndVersionArr = key.split("-");
                var aid = aidAndVersionArr[0];
                var v = aidAndVersionArr[1];
                var acList = this._acVoList[aid];
                var newAcList = this._newAcVoList[aid];
                if (this._acVoList[aid] == null) {
                    acList = {};
                    this._acVoList[aid] = acList;
                }
                if (acList[v] == null) {
                    var voClassName = App.StringUtil.firstCharToUper(aid);
                    var voClass = egret.getDefinitionByName("Ac" + voClassName + "Vo");
                    if (voClass) {
                        var acVo = new voClass();
                        acVo.initData(info[key]);
                        acList[v] = acVo;
                        if (this._newAcVoList[aid] == null) {
                            newAcList = {};
                            this._newAcVoList[aid] = newAcList;
                        }
                        newAcList[v] = acVo;
                    }
                }
                else {
                    acList[v].initData(info[key]);
                }
                if (acList[v] && !acList[v].config) {
                    needGetCfgAidArr.push(key);
                }
            }
        }
        if (needGetCfgAidArr && needGetCfgAidArr.length > 0) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, { activeArr: needGetCfgAidArr });
            return false;
        }
        return true;
    };
    //设置活动激活条件
    AcBaseVoApi.prototype.setActiveUnlock = function (key) {
        this._activeUnlockMap["needActive_" + key] = key;
    };
    //判断某个活动是否激活某些需要活动激活的条件
    AcBaseVoApi.prototype.checkActiveIsUnlock = function (key) {
        if (this._activeUnlockMap["needActive_" + key]) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 根据活动aid判断该类活动是否需要显示红点
     * @param aid
     */
    AcBaseVoApi.prototype.checkShowRedDotByAid = function (aid, code) {
        if (code) {
            var vo = this.getActivityVoByAidAndCode(aid, code);
            if (vo && vo.isStart && vo.isShowRedDot == true) {
                return true;
            }
        }
        else {
            var voDic = this._acVoList[aid];
            var voList = [];
            if (voDic) {
                for (var code_1 in voDic) {
                    var vo = voDic[code_1];
                    if (vo && vo.isStart && vo.isShowRedDot == true) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AcBaseVoApi.prototype.checkActivityStartByAid = function (aid, code) {
        var result = false;
        if (code) {
            var vo = this.getActivityVoByAidAndCode(aid, code);
            result = vo ? vo.isStart : false;
        }
        else {
            var voList = this.getActivityVoListByAid(aid);
            if (voList) {
                var l = voList.length;
                for (var i = 0; i < l; i++) {
                    if (voList[i] && voList[i].isStart) {
                        result = true;
                        break;
                    }
                }
            }
        }
        return result;
    };
    AcBaseVoApi.prototype.getRanActives = function () {
        var actives = [];
        for (var aid in this._acVoList) {
            var voDic = this._acVoList[aid];
            if (voDic) {
                for (var code in voDic) {
                    var vo = voDic[code];
                    if (vo && vo.isStart) {
                        if (aid == "rankActive" && vo.atype != "11") {
                            actives.push(vo);
                        }
                    }
                }
            }
        }
        return actives;
    };
    AcBaseVoApi.prototype.getAllActivityIcons = function () {
        var icons = [];
        var rechargerewardicon = null;
        //疯狂系列活动的图标
        var carnivalRewardIcon = null;
        var iconKeyDic = {};
        for (var aid in this._newAcVoList) {
            var iconUrl = void 0;
            var iconNameStr = void 0;
            var iconCfgName = Config.IconorderCfg.getIconNameByName(aid);
            var isHasChildCfg = Config.IconorderCfg.checkHasChildCfgNameByName(aid);
            if (iconCfgName || isHasChildCfg) {
                if (this.checkActivityStartByAid(aid)) {
                    if (isHasChildCfg) {
                        var voDic = this._acVoList[aid];
                        if (voDic) {
                            for (var code in voDic) {
                                var vo = voDic[code];
                                if (vo && vo.isStart && vo.atype) {
                                    var iconCfg = Config.IconorderCfg.getIconCfgByAidAndType(aid, vo.atype);
                                    if (iconCfg) {
                                        if (iconCfg.icon) {
                                            if (!iconKeyDic[iconCfg.icon]) {
                                                icons.push(this.createActivityicon(iconCfg.icon, null, vo.atype));
                                                iconKeyDic[iconCfg.icon] = iconCfg.icon;
                                            }
                                        }
                                        else {
                                            if (vo.atype) {
                                                icons.push(this.createActivityicon(aid, Number(code), Number(vo.atype)));
                                            }
                                            else {
                                                icons.push(this.createActivityicon(aid, Number(code)));
                                            }
                                        }
                                    }
                                    else {
                                        if (iconCfgName) {
                                            if (!iconKeyDic[iconCfgName]) {
                                                icons.push(this.createActivityicon(iconCfgName, null));
                                                iconKeyDic[iconCfgName] = iconCfgName;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (iconCfgName) {
                                        if (!iconKeyDic[iconCfgName]) {
                                            icons.push(this.createActivityicon(iconCfgName, null));
                                            iconKeyDic[iconCfgName] = iconCfgName;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (iconCfgName) {
                        if (!iconKeyDic[iconCfgName]) {
                            icons.push(this.createActivityicon(iconCfgName, null));
                            iconKeyDic[iconCfgName] = iconCfgName;
                        }
                    }
                }
            }
            else {
                var voDic = this._acVoList[aid];
                if (voDic) {
                    for (var code in voDic) {
                        var vo = voDic[code];
                        if (vo && vo.isStart) {
                            var lowerAid = aid.toLowerCase();
                            // if(aid=="rankActive"&&vo.atype != "11")
                            // {
                            // 	continue;
                            // }
                            if (vo.atype) {
                                icons.push(this.createActivityicon(aid, Number(code), Number(vo.atype)));
                            }
                            else {
                                icons.push(this.createActivityicon(aid, Number(code)));
                            }
                        }
                    }
                }
            }
        }
        this._newAcVoList = {};
        icons.sort(function (a, b) {
            // let names:string[]=[a.name,b.name];
            // names.sort();
            // if(a.name==names[0])
            // {
            // 	return -1;
            // }
            // else
            // {
            // 	return 1;
            // }
            var sortIdA = Config.IconorderCfg.getIconSortIdByCfgName(a.name);
            var sortIdB = Config.IconorderCfg.getIconSortIdByCfgName(b.name);
            return sortIdA - sortIdB;
        });
        return icons;
    };
    AcBaseVoApi.prototype.createActivityicon = function (aid, code, type) {
        var atype = type;
        var nameCode = code;
        if (!type) {
            type = code;
        }
        var isShow = false;
        if (aid == "recharge"
            || aid == "firstrecharge"
            || aid == "discount") {
            isShow = true;
        }
        else {
            isShow = Config.IconorderCfg.getisFlickByName(aid, atype);
        }
        var iconCfgBgValue = Config.IconorderCfg.getIconBgByAidAndType(aid, atype);
        var lowerAid = aid.toLowerCase();
        var iconUrl = code ? "ac_" + lowerAid + "-" + type + "_icon" : "ac_" + lowerAid + "_icon";
        var iconNameStr = code ? "ac_" + lowerAid + "-" + type + "_name" : "ac_" + lowerAid + "_name";
        var iconContainer = App.CommonUtil.createMainUIIcon(iconUrl, iconNameStr, isShow, iconCfgBgValue);
        iconContainer.name = nameCode ? aid + "-" + nameCode : aid;
        iconContainer.bindData = { aid: aid, code: code };
        iconContainer.addTouchTap(function (event, aid, code, atype) {
            //引导过程种不响应
            if (Api.rookieVoApi.isGuiding) {
                return;
            }
            var viewClassName = "Ac" + App.StringUtil.firstCharToUper(aid) + "View";
            if (aid == "crossServerAtkRace") {
                viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
            }
            if (aid == "rankActive" && Number(atype) != 11) {
                if (egret.getDefinitionByName(viewClassName.replace("Ac", ""))) {
                    viewClassName = App.StringUtil.firstCharToUper(viewClassName.replace("Ac", ""));
                }
            }
            ViewController.getInstance().openView(viewClassName, code);
        }, this, [aid, code, atype]);
        return iconContainer;
    };
    AcBaseVoApi.prototype.getActivityVoListByAid = function (aid) {
        var voDic = this._acVoList[aid];
        var voList = [];
        if (voDic) {
            for (var code in voDic) {
                voList.push(voDic[code]);
            }
        }
        return voList;
    };
    AcBaseVoApi.prototype.getActivityVoByAidAndCode = function (aid, code) {
        var voDic = this._acVoList[aid];
        if (!voDic) {
            return null;
        }
        if (aid.indexOf("-") > -1) {
            if (!code) {
                code = aid.split("-")[1];
            }
            aid = aid.split("-")[0];
        }
        var vo;
        if (code) {
            vo = voDic[code];
        }
        else {
            for (var code_2 in voDic) {
                vo = voDic[code_2];
            }
        }
        return vo;
    };
    AcBaseVoApi.prototype.checkIsHasNewAc = function () {
        return Object.keys(this._newAcVoList).length > 0;
    };
    AcBaseVoApi.prototype.dispose = function () {
        this._acVoList = {};
        this._newAcVoList = {};
        _super.prototype.dispose.call(this);
    };
    return AcBaseVoApi;
}(BaseVoApi));
__reflect(AcBaseVoApi.prototype, "AcBaseVoApi");

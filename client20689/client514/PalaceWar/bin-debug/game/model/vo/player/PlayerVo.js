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
 * 用户信息
 * author dmj
 * date 2017/9/16
 * @class PlayerVo
 */
var PlayerVo = (function (_super) {
    __extends(PlayerVo, _super);
    function PlayerVo() {
        var _this = _super.call(this) || this;
        // 用户游戏ID
        _this.uid = 0;
        // 用户头像
        _this.pic = 0;
        // 用户名称
        _this.name = "";
        // 等级/官职
        _this.level = 0;
        // 经验/政绩
        _this.exp = 0;
        // VIP等级
        _this.vip = 0;
        // VIP经验
        _this.vipexp = 0;
        // 钻石/元宝
        _this.gem = 0;
        // 银两
        _this.gold = 0;
        // 军团ID
        _this.mygid = 0;
        // 军团名称
        _this.mygname = "";
        // 势力值
        _this.power = 0;
        // 购买元宝数量
        _this.buyg = 0;
        // 最户购买元宝时间
        _this.buyt = 0;
        // 免费获得元宝
        _this.freeg = 0;
        // 总共消耗元宝
        _this.tcost = 0;
        // 最后在线时间
        _this.olt = 0;
        // 数据上次更新时间
        _this.updated_at = 0;
        //魅力
        _this.charm = 0;
        //智力
        _this.inte = 0;
        //武力
        _this.atk = 0;
        // 政治
        _this.politics = 0;
        // 粮食
        _this.food = 0;
        _this.soldier = 0;
        // 称号
        _this.titleid = 0;
        return _this;
    }
    PlayerVo.prototype.initData = function (data) {
        if (data) {
            if (data.buyg != this.buyg || data.level != this.level) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_STORAGE);
            }
            var refreshArr = this.checkRefreshUI(data);
            if (data.uid != null) {
                this.uid = Number(data.uid);
            }
            if (data.pic != null) {
                this.pic = Number(data.pic);
            }
            if (data.name != null) {
                this.name = String(data.name);
            }
            if (data.level != null) {
                var curLevel = this.level;
                this.level = Number(data.level);
                // this.level = 3; // test code
                //酒楼分阶段引导
                var ucLockLevel = Config.DinnerCfg.getNeedLv();
                if (curLevel != this.level && this.level == ucLockLevel && curLevel == ucLockLevel - 1) {
                    Api.rookieVoApi.curGuideKey = "dinner";
                    Api.rookieVoApi.insertWaitingGuide({ "idx": "dinner_1" }, true);
                }
                //寻访分阶段引导
                var searchUcLockLevel = Config.SearchbaseCfg.needLv;
                if (curLevel != this.level && this.level == searchUcLockLevel && curLevel == searchUcLockLevel - 1) {
                    Api.rookieVoApi.curGuideKey = "search";
                    Api.rookieVoApi.insertWaitingGuide({ "idx": "search_1" }, true);
                }
                //升级统计
                if (curLevel != this.level && curLevel != 0) {
                    PlatformManager.analyticsLevelup();
                }
            }
            if (data.exp != null) {
                this.exp = Number(data.exp);
            }
            if (data.vip != null) {
                this.vip = Number(data.vip);
            }
            if (data.vipexp != null) {
                this.vipexp = Number(data.vipexp);
            }
            if (data.gem != null) {
                this.gem = Number(data.gem);
            }
            if (data.gold != null) {
                this.gold = Number(data.gold);
            }
            if (data.mygid != null) {
                this.mygid = Number(data.mygid);
            }
            if (data.mygname != null) {
                this.mygname = String(data.mygname);
            }
            if (data.power != null) {
                var curPower = this.power;
                this.power = Number(data.power);
                var curCmd = NetManager.curReceiveCmd;
                if (curPower != 0 && this.power - curPower > 0 && curCmd != NetRequestConst.REQUEST_WIFE_LOVE && curCmd != NetRequestConst.REQUEST_WIFE_CALL && curCmd.indexOf("push.") !== 1) {
                    var dis = this.power - curPower;
                    var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
                    // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);	
                    var powerFly = new PowerFly();
                    powerFly.init(dis);
                    LayerManager.msgLayer.addChild(powerFly);
                }
            }
            if (data.buyg != null) {
                this.buyg = Number(data.buyg);
            }
            if (data.buyt != null) {
                this.buyt = Number(data.buyt);
            }
            if (data.freeg != null) {
                this.freeg = Number(data.freeg);
            }
            if (data.tcost != null) {
                this.tcost = Number(data.tcost);
            }
            if (data.olt != null) {
                this.olt = Number(data.olt);
            }
            if (data.updated_at != null) {
                this.updated_at = Number(data.updated_at);
            }
            if (data.charm != null) {
                this.charm = Number(data.charm);
            }
            if (data.inte != null) {
                this.inte = Number(data.inte);
            }
            if (data.atk != null) {
                this.atk = Number(data.atk);
            }
            if (data.politics != null) {
                this.politics = Number(data.politics);
            }
            if (data.food != null) {
                this.food = Number(data.food);
            }
            if (data.soldier != null) {
                this.soldier = Number(data.soldier);
            }
            if (refreshArr.length > 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, refreshArr);
            }
            if (data.title != null) {
                this.titleid = Number(data.title);
            }
        }
    };
    PlayerVo.prototype.checkRefreshUI = function (data) {
        var resultArr = [];
        if (data) {
            var checkResArr = GameConfig.refreshUIResArr;
            var l = checkResArr.length;
            for (var i = l - 1; i >= 0; i--) {
                var key = checkResArr[i];
                var isDiff = false;
                if (data[key] != null) {
                    isDiff = !App.MathUtil.checkEqual(this[key], data[key]);
                }
                if (isDiff) {
                    resultArr.push(key);
                }
            }
        }
        return resultArr;
    };
    PlayerVo.prototype.dispose = function () {
        this.uid = 0;
        this.pic = 0;
        this.name = "";
        this.level = 0;
        this.exp = 0;
        this.vip = 0;
        this.vipexp = 0;
        this.gem = 0;
        this.gold = 0;
        this.mygid = 0;
        this.mygname = "";
        this.power = 0;
        this.buyg = 0;
        this.buyt = 0;
        this.freeg = 0;
        this.tcost = 0;
        this.olt = 0;
        this.updated_at = 0;
        this.charm = 0;
        this.inte = 0;
        this.atk = 0;
        this.politics = 0;
        this.food = 0;
        this.soldier = 0;
        this.titleid = 0;
    };
    return PlayerVo;
}(BaseVo));
__reflect(PlayerVo.prototype, "PlayerVo");

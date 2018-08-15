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
 * author:qianjun
 * desc:跨服亲密活动首页
*/
var AcCrossServerIntimacyView = (function (_super) {
    __extends(AcCrossServerIntimacyView, _super);
    function AcCrossServerIntimacyView() {
        var _this = _super.call(this) || this;
        _this._canJoinImg = null;
        _this._cdTimeDesc = null;
        _this._cdType = 0; //倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
        _this._countDownText = null;
        _this._countDownTime = 0;
        _this._enterBtn = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "crossserverinti_canjoin-1", "crossserverinti_detailbg-1", "crossserverinti_enterin-1", "crossserverinti_enterin-1_down", "crossserverintibg-1",
            "public_9_wordbg2",
        ]);
    };
    AcCrossServerIntimacyView.prototype.initTitle = function () {
    };
    AcCrossServerIntimacyView.prototype.getBgName = function () {
        return "crossserverintibg-" + this.code;
    };
    AcCrossServerIntimacyView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    AcCrossServerIntimacyView.prototype.getTitleStr = function () {
        return "atkracecross";
    };
    AcCrossServerIntimacyView.prototype.initView = function () {
        var view = this;
        AcCrossServerIntimacyView.AID = view.aid;
        AcCrossServerIntimacyView.CODE = view.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY, {});
        //参赛资格
        var canJoin = this.vo.getIsCanJoin();
        view._canJoinImg = BaseLoadBitmap.create("crossserverinti_canjoin-" + this.code);
        view._canJoinImg.visible = canJoin;
        view.addChildToContainer(view._canJoinImg);
        //底部
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 146;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        view.addChildToContainer(bottomBg);
        //当前时间段
        view._cdType = vo.judgeTimeProcess();
        if (view._cdType > 0 && view._cdType < 4) {
            if (view._cdType == 1) {
                view._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
            }
            else if (view._cdType == 2) {
                view._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
            }
            else {
                view._countDownTime = vo.et - GameData.serverTime;
            }
            view.api.setCountDownTime(view._countDownTime);
        }
        view._enterBtn = ComponentManager.getButton("crossserverinti_enterin-" + view.code, '', view.enterInHandler, this);
        if (view._cdType > 1 && view._cdType < 4) {
            view._enterBtn.setEnable(true);
        }
        else {
            //灰化
            view._enterBtn.setEnable(false);
        }
        //进入按钮
        view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 5);
        view.addChildToContainer(this._enterBtn);
        //活动时间
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 10;
        timeDesc.y = bottomBg.y + 20;
        view.addChildToContainer(timeDesc);
        //活动倒计时时间
        view._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._cdTimeDesc.x = timeDesc.x;
        view._cdTimeDesc.y = timeDesc.y + timeDesc.textHeight + 5;
        view.addChildToContainer(this._cdTimeDesc);
        if (view._countDownTime > 0) {
            view._countDownText = ComponentManager.getTextField(view.vo.getCountTimeStr(view._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
            view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth, this._cdTimeDesc.y);
            view.addChildToContainer(view._countDownText);
        }
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossIntimacyRule-" + view.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc.width = GameConfig.stageWidth - 100;
        ruleDesc.lineSpacing = 6;
        ruleDesc.x = timeDesc.x;
        ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
        view.addChildToContainer(ruleDesc);
    };
    AcCrossServerIntimacyView.prototype.tick = function () {
        var view = this;
        if (view._countDownText) {
            --view._countDownTime;
            view.api.setCountDownTime(view._countDownTime);
            view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
            if (view._countDownTime <= 0) {
                view._cdType = view.vo.judgeTimeProcess();
                if (view._cdType == 2) {
                    view._enterBtn.setEnable(true);
                    view._countDownTime = view.vo.et - 86400 - GameData.serverTime;
                }
                else if (view._cdType == 3) {
                    view._countDownTime = view.vo.et - GameData.serverTime;
                }
                else if (view._cdType == 4) {
                    view._enterBtn.setEnable(false);
                    view.hide();
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
                view.api.setCountDownTime(view._countDownTime);
                view._cdTimeDesc.text = LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType);
                view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
            }
        }
    };
    AcCrossServerIntimacyView.prototype.enterInHandler = function () {
        var view = this;
        if (view._cdType > 1 && view._cdType < 4) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINTIMACYENTERVIEW);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime0"));
        }
    };
    AcCrossServerIntimacyView.prototype.dispose = function () {
        var view = this;
        view._canJoinImg = null;
        view._cdTimeDesc = null;
        view._enterBtn.removeTouchTap();
        view._enterBtn = null;
        _super.prototype.dispose.call(this);
    };
    AcCrossServerIntimacyView.AID = null;
    AcCrossServerIntimacyView.CODE = null;
    return AcCrossServerIntimacyView;
}(AcCommonView));
__reflect(AcCrossServerIntimacyView.prototype, "AcCrossServerIntimacyView");

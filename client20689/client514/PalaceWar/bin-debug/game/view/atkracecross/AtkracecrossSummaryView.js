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
var AtkracecrossSummaryView = (function (_super) {
    __extends(AtkracecrossSummaryView, _super);
    function AtkracecrossSummaryView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = 0;
        _this._countDownText = null;
        _this._enterBtn = null;
        _this._cdTimeDesc = null;
        _this._cdType = 1; //倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时
        _this._openDesc = null;
        _this._isCanJoin = null; // 0 没资格  1 有资格
        return _this;
    }
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	//刷新跨服擂台活动数据
    // 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,requestData:{}};
    // }
    AtkracecrossSummaryView.prototype.refreshInfo = function () {
        this.request(NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK, {});
    };
    AtkracecrossSummaryView.prototype.receiveData = function (data) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        if (crossVo.info && crossVo.info.iscanjoin == 1) {
            this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
        }
        else {
            this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
        }
    };
    AtkracecrossSummaryView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_bg", "atkracecross_title", "btn_enter_race", "atkracecross_timebg"
        ]);
    };
    AtkracecrossSummaryView.prototype.getBgName = function () {
        return "atkracecross_bg";
    };
    AtkracecrossSummaryView.prototype.getTitleBgName = function () {
        return null;
    };
    AtkracecrossSummaryView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    AtkracecrossSummaryView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    // 初始化背景
    AtkracecrossSummaryView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AtkracecrossSummaryView.prototype.initView = function () {
        var titlePic = BaseBitmap.create("atkracecross_title");
        titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width / 2, 10);
        this.addChildToContainer(titlePic);
        //进入擂台按钮
        this._enterBtn = ComponentManager.getButton("btn_enter_race", null, this.enterRackHandler, this, null, 0);
        this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, 420);
        this.addChildToContainer(this._enterBtn);
        //底部
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 168;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 24;
        timeDesc.y = bottomBg.y + 30;
        this.addChildToContainer(timeDesc);
        var qualification = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossQualification"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qualification.x = timeDesc.x;
        qualification.y = timeDesc.y + 35;
        qualification.width = GameConfig.stageWidth - qualification.x * 2;
        qualification.lineSpacing = 6;
        this.addChildToContainer(qualification);
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (crossVo.st > GameData.serverTime - timeNumber) {
            this._enterBtn.visible = false;
            this._cdType = 1;
            this._countDownTime = timeNumber - GameData.serverTime + crossVo.st;
        }
        else if (crossVo.et > GameData.serverTime + timeNumber2) {
            this._cdType = 2;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else {
            this._cdType = 3;
            this._countDownTime = crossVo.et - GameData.serverTime;
        }
        //test code 
        // this._cdType = 2;
        // this._countDownTime = 10;
        //顶部
        var topBg = BaseBitmap.create("atkracecross_timebg");
        topBg.height = 128;
        topBg.setPosition(GameConfig.stageWidth / 2 - topBg.width / 2, 152);
        this.addChildToContainer(topBg);
        this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime" + this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTimeDesc.y = topBg.y + 10;
        this.addChildToContainer(this._cdTimeDesc);
        //倒计时
        this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe50404);
        this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2 - this._countDownText.width / 2;
        this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width, this._cdTimeDesc.y);
        this.addChildToContainer(this._countDownText);
        if (this._cdType == 3) {
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        }
        this._openDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        this._openDesc.width = 360;
        this._openDesc.setPosition(GameConfig.stageWidth / 2 - this._openDesc.width / 2, this._countDownText.y + 50);
        this._openDesc.lineSpacing = 6;
        this._openDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._openDesc);
        if (crossVo.st > GameData.serverTime - 300) {
            this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");
            TimerManager.doTimer(crossVo.st - GameData.serverTime + 300, 1, this.refreshInfo, this);
        }
        else {
            this.refreshInfo();
        }
    };
    AtkracecrossSummaryView.prototype.enterRackHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVIEW);
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSDETAILPOPUPVIEW);
    };
    AtkracecrossSummaryView.prototype.tick = function () {
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this.refreshEnterBtn();
            }
        }
    };
    AtkracecrossSummaryView.prototype.refreshEnterBtn = function () {
        this._cdType += 1;
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (this._cdType == 2) {
            this._enterBtn.visible = true;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else if (this._cdType == 3) {
            this._countDownTime = crossVo.et - GameData.serverTime;
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
        }
        else if (this._cdType == 4) {
            ViewController.getInstance().hideAllView();
            App.CommonUtil.showTip(LanguageManager.getlocal("atkracecrossEndTip"));
            return;
        }
        this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime" + this._cdType);
        this._countDownText.text = this.getCountTimeStr();
        if (this._cdType == 3) {
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        }
    };
    AtkracecrossSummaryView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AtkracecrossSummaryView.prototype.dispose = function () {
        TimerManager.remove(this.refreshInfo, this);
        this._countDownTime = 0;
        this._countDownText = null;
        this._enterBtn = null;
        this._cdTimeDesc = null;
        this._openDesc = null;
        this._isCanJoin = null;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossSummaryView;
}(CommonView));
__reflect(AtkracecrossSummaryView.prototype, "AtkracecrossSummaryView");

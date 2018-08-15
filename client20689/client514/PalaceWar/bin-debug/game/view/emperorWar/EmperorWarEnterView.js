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
 * 称帝入口界面
 * author qianjun
 */
var EmperorWarEnterView = (function (_super) {
    __extends(EmperorWarEnterView, _super);
    function EmperorWarEnterView() {
        var _this = _super.call(this) || this;
        _this._timeDesc = null;
        _this._midBtn = null;
        _this._time = 0;
        return _this;
    }
    EmperorWarEnterView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emparena_bottom", "empdetail_down", "empdetail", "empgodbless_tip_bg", "empjzdhua", "emprankinglist_line",
            "boss_start_war", "boss_start_war_down", "empenter", "empenter_down", "empbming", "empbming_down",
            "empgquan", "empzli", "empzzhi", "empwli", "emptquan", "empupbg", "empmanbg", "empmli", "emphfangbg", "uncompress"
        ]);
    };
    EmperorWarEnterView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_EMPEROR_GETACTIVE, requestData: {} };
    };
    //请求回调
    EmperorWarEnterView.prototype.receiveData = function (data) {
        var view = this;
        var cmd = data.data.cmd;
        if (cmd == NetRequestConst.REQUEST_EMPEROR_GETACTIVE) {
            if (data.data.data.activeinfo) {
                Api.emperorwarVoApi.setActiveInfo(data.data.data.activeinfo);
            }
        }
    };
    EmperorWarEnterView.prototype.initView = function () {
        var view = this;
        //活动详情
        var detailBtn = ComponentManager.getButton("empdetail", "", view.clickDetail, this);
        view.setLayoutPosition(LayoutConst.lefttop, detailBtn, view.titleBg, [10, view.titleBg.height + 10]);
        view.addChild(detailBtn);
        //倒计时提示
        var timeBg = BaseBitmap.create("empgodbless_tip_bg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, view.titleBg, [0, view.titleBg.height + 12]);
        view.addChild(timeBg);
        view._time = 86400;
        view._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("emperorTimeDesc", [App.DateUtil.getFormatBySecond(view._time)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, timeBg);
        view.addChild(view._timeDesc);
        //报名按钮 按时间段显示
        var tiemParam = Math.floor(Math.random() * 2);
        view._midBtn = ComponentManager.getButton(tiemParam == 1 ? "empbming" : "empenter", "", this.enterHandle, this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._midBtn, view);
        view.addChild(view._midBtn);
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorReward", view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, rewardBtn, emparena_bottom, [50, 0]);
        view.addChild(rewardBtn);
        var bmcBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorBmc", view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, bmcBtn, emparena_bottom, [50, 0]);
        view.addChild(bmcBtn);
    };
    //活动详情弹窗
    EmperorWarEnterView.prototype.clickDetail = function () {
        var view = this;
    };
    EmperorWarEnterView.prototype.tick = function () {
        var view = this;
        --view._time;
        view._timeDesc.text = LanguageManager.getlocal("emperorTimeDesc", [App.DateUtil.getFormatBySecond(view._time)]);
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
    };
    //中部按钮
    EmperorWarEnterView.prototype.enterHandle = function () {
        var view = this;
        if (view._midBtn.resourceName == "empenter") {
        }
        else if (view._midBtn.resourceName == "empbming") {
            //报名弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSIGNPOPVIEW);
        }
    };
    //奖励弹窗
    EmperorWarEnterView.prototype.rewardClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW);
    };
    //报名册弹窗
    EmperorWarEnterView.prototype.bmcClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    };
    EmperorWarEnterView.prototype.dispose = function () {
        var view = this;
        view._timeDesc = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorWarEnterView;
}(CommonView));
__reflect(EmperorWarEnterView.prototype, "EmperorWarEnterView");

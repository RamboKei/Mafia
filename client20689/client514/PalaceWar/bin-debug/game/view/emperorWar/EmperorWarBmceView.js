/**
 * 报名册
 * author qianjun
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
var EmperorWarBmceView = (function (_super) {
    __extends(EmperorWarBmceView, _super);
    function EmperorWarBmceView() {
        var _this = _super.call(this) || this;
        _this._midBg = null;
        _this._posArr = [];
        return _this;
    }
    EmperorWarBmceView.prototype.initView = function () {
        var view = this;
        //底部
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var isGetAuthor = Math.floor(Math.random() * 2) == 1;
        var curRWB = Math.floor(Math.random() * 2000);
        var ztaitxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBmceZtai", [LanguageManager.getlocal(isGetAuthor ? "emperorWarBmceZige" : "emperorWarBmceNotZige")]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ztaitxt, emparena_bottom, [15, 0]);
        view.addChild(ztaitxt);
        var rwbtxt = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBmceRWB", [curRWB.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, rwbtxt, emparena_bottom, [15, 0]);
        view.addChild(rwbtxt);
        //中部
        var inTime = Math.floor(Math.random() * 2) == 1;
        view._midBg = BaseBitmap.create("public_9_bg22");
        view._midBg.height = GameConfig.stageHeigth - view.titleBg.height - emparena_bottom.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._midBg, view, [0, view.titleBg.y + view.titleBg.height]);
        view.addChild(view._midBg);
        //没结束前排版
        if (inTime) {
            view.createMid(false, view._midBg.height - 60, 30);
        }
        else {
            var downTitleLine = BaseBitmap.create("public_line3");
            var getText = ComponentManager.getTextField(LanguageManager.getlocal("emperorWargetZige"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
            downTitleLine.width = downTitleLine.width + getText.textWidth;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine, view._midBg, [0, 30]);
            view.addChild(downTitleLine);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getText, downTitleLine);
            view.addChild(getText);
            view.createMid(true, 52 * 8 + 45, getText.y + getText.textHeight + 10 - view._midBg.y);
            var downTitleLine2 = BaseBitmap.create("public_line3");
            var getText2 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarNoZige"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
            downTitleLine2.width = downTitleLine2.width + getText2.textWidth;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine2, view._midBg, [0, (getText.y + getText.textHeight + 10 + 30 + 10 + 52 * 8 + 5 * 7 - view._midBg.y)]);
            view.addChild(downTitleLine2);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getText2, downTitleLine2);
            view.addChild(getText2);
            view.createMid(true, view._midBg.y + view._midBg.height - 35 - getText2.y - getText2.textHeight, getText2.y + getText2.textHeight + 5 - view._midBg.y);
        }
    };
    EmperorWarBmceView.prototype.createMid = function (end, height, posY) {
        var view = this;
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = view._midBg.width - 60;
        listBg.height = height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view._midBg, [0, posY]);
        view.addChild(listBg);
        var maskBg = BaseBitmap.create("public_9_bg33");
        maskBg.width = listBg.width;
        maskBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg, [0, 0]);
        view.addChild(maskBg);
        view.refreshTopTitle(end, maskBg);
        //列表
        var lenth = 8; //Math.floor(Math.random() * 10) + 1;
        var arr = [];
        for (var i = 0; i < lenth; ++i) {
            arr.push({
                "pos_arr": view._posArr,
                "width": maskBg.width,
                "name": "\u963F" + Math.floor(Math.random() * 100000),
                "power": Math.floor(Math.random() * 1000000000000),
                "level": Math.floor(Math.random() * 8) + 1,
                "uid": Math.floor(Math.random() * 100000),
                "title": Math.floor(Math.random() * 2) == 1 ? '3105' : "",
                "end": end,
                "rwb": Math.floor(Math.random() * 1000000000),
            });
        }
        var scrollList = ComponentManager.getScrollList(EmperorWarBmceScrollItem, arr, new egret.Rectangle(maskBg.x, maskBg.y + maskBg.height, listBg.width, listBg.height - 50));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listBg, [0, maskBg.height + 10]);
        view.addChild(scrollList);
    };
    EmperorWarBmceView.prototype.refreshTopTitle = function (end, maskBg) {
        var view = this;
        view._title_nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._title_nameTxt.text = LanguageManager.getlocal("emperorWarmchen");
        view.addChild(view._title_nameTxt);
        view._title_officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._title_officerTxt.text = LanguageManager.getlocal("rankofficer");
        view.addChild(view._title_officerTxt);
        view._title_powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._title_powerTxt.text = LanguageManager.getlocal("rankpower");
        view.addChild(view._title_powerTxt);
        //结束前不显示人望
        view._posArr = [];
        var desc = !end ? ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 2 + 2)) / 4) : ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 2 + 2 + 3)) / 5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._title_nameTxt, maskBg, [desc, 0]);
        view._posArr.push(view._title_nameTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, view._title_officerTxt, view._title_nameTxt, [view._title_nameTxt.textWidth + desc, 0]);
        view._posArr.push(view._title_officerTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, view._title_powerTxt, view._title_officerTxt, [view._title_officerTxt.textWidth + desc, 0]);
        view._posArr.push(view._title_powerTxt.x - maskBg.x);
        if (end) {
            view._title_rwbTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            view._title_rwbTxt.text = LanguageManager.getlocal("emperorWarRWB");
            view.setLayoutPosition(LayoutConst.lefttop, view._title_rwbTxt, view._title_powerTxt, [view._title_powerTxt.textWidth + desc, 0]);
            view._posArr.push(view._title_rwbTxt.x - maskBg.x);
            view.addChild(view._title_rwbTxt);
        }
    };
    EmperorWarBmceView.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);
        var view = this;
        view._title_nameTxt = null;
        view._title_officerTxt = null;
        view._title_powerTxt = null;
        view._title_rwbTxt = null;
        view._midBg = null;
        view._posArr = [];
        _super.prototype.dispose.call(this);
    };
    return EmperorWarBmceView;
}(CommonView));
__reflect(EmperorWarBmceView.prototype, "EmperorWarBmceView");

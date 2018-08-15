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
 * desc:奖励弹窗
*/
var EmperorWarRewardView = (function (_super) {
    __extends(EmperorWarRewardView, _super);
    function EmperorWarRewardView() {
        return _super.call(this) || this;
    }
    EmperorWarRewardView.prototype.getTabbarTextArr = function () {
        return [
            "EmperorWarRewardViewTab1",
            "EmperorWarRewardViewTab2",
        ];
    };
    EmperorWarRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "itemeffect",
        ]);
    };
    EmperorWarRewardView.prototype.initView = function () {
        var view = this;
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var topBg = BaseBitmap.create("public_9_bg22");
        topBg.width = GameConfig.stageWidth + 18;
        topBg.height = emparena_bottom.y - view.tabbarGroup.y - view.tabbarGroup.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, [0, view.tabbarGroup.y + view.tabbarGroup.height]);
        view.addChild(topBg);
        var taotai = Math.floor(Math.random() * 2) == 1;
        var ttaitext = taotai ? LanguageManager.getlocal("emperorWarTtai") : "";
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarCheerFor", ["\u963F\u8428\u5FB7\u7A46\u8428", ttaitext]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, desc1, emparena_bottom, [10, 0]);
        view.addChild(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt5"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, desc2, emparena_bottom, [10, 0]);
        view.addChild(desc2);
    };
    EmperorWarRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardView;
}(CommonView));
__reflect(EmperorWarRewardView.prototype, "EmperorWarRewardView");

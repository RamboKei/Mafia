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
var EmperorwarReplayPopupView = (function (_super) {
    __extends(EmperorwarReplayPopupView, _super);
    function EmperorwarReplayPopupView() {
        return _super.call(this) || this;
    }
    EmperorwarReplayPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emphfangbg",
            "atkrace_vs",
            "atkracecross_win",
            "atkracecross_loss",
        ]);
    };
    EmperorwarReplayPopupView.prototype.initView = function () {
        var replayBg = BaseBitmap.create("emphfangbg");
        replayBg.setPosition(this.viewBg.width / 2 - replayBg.width / 2, 0);
        this.addChildToContainer(replayBg);
        var vsIcon = BaseBitmap.create("atkrace_vs");
        vsIcon.setScale(130 / vsIcon.width);
        vsIcon.setPosition(this.viewBg.width / 2 - vsIcon.width / 2 * vsIcon.scaleX, replayBg.y + 30);
        this.addChildToContainer(vsIcon);
        var someFight = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarSomeFight", [String(12)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        someFight.setPosition(this.viewBg.width / 2 - someFight.width / 2, replayBg.y + 15);
        this.addChildToContainer(someFight);
        var resultIcon1;
        var resultIcon2;
        if (1 == 1) {
            resultIcon1 = "atkracecross_win";
            resultIcon2 = "atkracecross_loss";
        }
        else {
            resultIcon2 = "atkracecross_win";
            resultIcon1 = "atkracecross_loss";
        }
        var result1 = BaseBitmap.create(resultIcon1);
        result1.setPosition(185, replayBg.y + 120);
        this.addChildToContainer(result1);
        var result2 = BaseBitmap.create(resultIcon2);
        result2.setPosition(350, result1.y);
        this.addChildToContainer(result2);
        var playerHead1 = Api.playerVoApi.getPlayerCircleHead(1, "-1");
        playerHead1.setPosition(25, replayBg.y + 35);
        this.addChildToContainer(playerHead1);
        var playerHead2 = Api.playerVoApi.getPlayerCircleHead(1, "-1");
        playerHead2.setPosition(this.viewBg.width - playerHead2.width - 25, playerHead1.y);
        this.addChildToContainer(playerHead2);
        var playerName1 = ComponentManager.getTextField("12334", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        playerName1.setPosition(25, replayBg.y + 140);
        this.addChildToContainer(playerName1);
        var playerName2 = ComponentManager.getTextField("12334", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        playerName2.setPosition(this.viewBg.width - playerName2.width - 25, playerName1.y);
        this.addChildToContainer(playerName2);
        var rankpower1 = ComponentManager.getTextField(LanguageManager.getlocal("rankpower") + ":" + "123", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankpower1.setPosition(replayBg.x + 142 - rankpower1.width / 2, replayBg.y + 184);
        this.addChildToContainer(rankpower1);
        var rankpower2 = ComponentManager.getTextField(LanguageManager.getlocal("rankpower") + ":" + "123", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankpower2.setPosition(replayBg.x + replayBg.width - 142 - rankpower2.width / 2, rankpower1.y);
        this.addChildToContainer(rankpower2);
        var popular1 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular") + ":" + "123", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        popular1.setPosition(replayBg.x + 142 - popular1.width / 2, replayBg.y + 208);
        this.addChildToContainer(popular1);
        var popular2 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular") + ":" + "123", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        popular2.setPosition(replayBg.x + replayBg.width - 142 - popular2.width / 2, popular1.y);
        this.addChildToContainer(popular2);
        var beat = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarBeat", ["123", "qwe"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        beat.width = 520;
        beat.textAlign = egret.HorizontalAlign.CENTER;
        beat.setPosition(this.viewBg.width / 2 - beat.width / 2, replayBg.y + 265);
        this.addChildToContainer(beat);
        var replayBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorWarReplay", this.doReplay, this);
        replayBtn.setPosition(this.viewBg.width / 2 - replayBtn.width / 2, beat.y + beat.height + 21);
        this.addChildToContainer(replayBtn);
    };
    EmperorwarReplayPopupView.prototype.doReplay = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.EMPERORWARBATTLEVIEW, {});
    };
    EmperorwarReplayPopupView.prototype.getTitleStr = function () {
        return "emperorWarReplay";
    };
    EmperorwarReplayPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    return EmperorwarReplayPopupView;
}(PopupView));
__reflect(EmperorwarReplayPopupView.prototype, "EmperorwarReplayPopupView");

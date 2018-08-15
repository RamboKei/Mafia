/**
 * 排行榜 膜拜弹出UI
 * author yanyuling
 * date 2017/10/26
 * @class RankWorshipView
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
var RankWorshipView = (function (_super) {
    __extends(RankWorshipView, _super);
    function RankWorshipView() {
        var _this = _super.call(this) || this;
        _this._clickNum = 0;
        _this._hideSt = null;
        _this._rewardStr = "";
        return _this;
    }
    RankWorshipView.prototype.initView = function () {
        var UIData = this.param.data.data.data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.alpha = 0;
        this.addChild(this._nodeContainer);
        this.touchEnabled = false;
        this.addTouchTap(this.clickHandler, this);
        var topTxtBg = BaseBitmap.create("public_9_bg25");
        topTxtBg.width = 490;
        topTxtBg.height = 130;
        topTxtBg.x = GameConfig.stageWidth / 2 - 490 / 2;
        topTxtBg.y = 80;
        this._nodeContainer.addChild(topTxtBg);
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 40;
        txt.x = topTxtBg.x + 20;
        txt.y = topTxtBg.y + 20;
        this._nodeContainer.addChild(txt);
        var resBg = BaseBitmap.create("public_numbg");
        resBg.x = topTxtBg.x + 330;
        resBg.y = topTxtBg.y + 80;
        this._nodeContainer.addChild(resBg);
        var goldIcon = BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.5);
        goldIcon.x = resBg.x + 10;
        goldIcon.y = resBg.y + resBg.height / 2 - goldIcon.height / 2 - 25;
        this._nodeContainer.addChild(goldIcon);
        this._rewardStr = "1_0_" + UIData.gem;
        var goldTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        goldTxt.text = String(UIData.gem);
        goldTxt.x = goldIcon.x + 50;
        goldTxt.y = resBg.y + resBg.height / 2 - goldTxt.height / 2;
        this._nodeContainer.addChild(goldTxt);
        var scaleV = 1.0;
        var fullImg = Api.playerVoApi.getPlayerPortrait(UIData.level, UIData.pic);
        fullImg.setScale(scaleV);
        fullImg.x = GameConfig.stageWidth / 2 - fullImg.width / 2 * scaleV;
        fullImg.y = GameConfig.stageHeigth - fullImg.height * scaleV;
        var tmpH = GameConfig.stageHeigth - resBg.y - resBg.height;
        fullImg.y = resBg.y + resBg.height + (tmpH - fullImg.height * scaleV) / 2;
        this._nodeContainer.addChild(fullImg);
        if (UIData.title != "") {
            var officerImg = BaseLoadBitmap.create("user_title_" + UIData.title + "_2");
            officerImg.x = GameConfig.stageWidth - 120;
            officerImg.y = fullImg.y + 30;
            this._nodeContainer.addChild(officerImg);
        }
        if (Number(UIData.vip) > 0) {
            var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
            vipImg.x = GameConfig.stageWidth / 2 - 40;
            vipImg.y = GameConfig.stageHeigth - 150;
            this._nodeContainer.addChild(vipImg);
        }
        var namebg = BaseBitmap.create("rank_display_namebg");
        namebg.x = GameConfig.stageWidth / 2 - namebg.width / 2;
        namebg.y = GameConfig.stageHeigth - 110;
        this._nodeContainer.addChild(namebg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        nameTxt.text = UIData.name;
        nameTxt.x = GameConfig.stageWidth / 2 - nameTxt.width / 2;
        nameTxt.y = namebg.y + namebg.height / 2 - nameTxt.height / 2;
        this._nodeContainer.addChild(nameTxt);
        var tmpThis = this;
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ alpha: 1 }, 700).call(function () {
            var rnd = App.MathUtil.getRandom(1, 11);
            var text = LanguageManager.getlocal("rankDialogue" + rnd);
            tmpThis.typerEffect(txt, text);
            tmpThis.touchEnabled = false;
        });
    };
    /**
  * 文字打字机效果
  * obj           文本对象
  * content       文字
  * interval      打字间隔 毫秒
  */
    RankWorshipView.prototype.typerEffect = function (obj, content, interval, backFun) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval * i);
        }
    };
    RankWorshipView.prototype.clickHandler = function () {
        //飘奖励
        if (this._clickNum == 0) {
            var rList = GameData.formatRewardItem(this._rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else if (this._clickNum == 1) {
            this._hideSt = egret.setTimeout(this.hideSelf, this, 500);
        }
        this._clickNum++;
    };
    RankWorshipView.prototype.hideSelf = function () {
        egret.clearTimeout(this._hideSt);
        _super.prototype.hide.call(this);
    };
    RankWorshipView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._clickNum = 0;
        this._hideSt = null;
        this._rewardStr = "";
        _super.prototype.dispose.call(this);
    };
    return RankWorshipView;
}(BaseView));
__reflect(RankWorshipView.prototype, "RankWorshipView");

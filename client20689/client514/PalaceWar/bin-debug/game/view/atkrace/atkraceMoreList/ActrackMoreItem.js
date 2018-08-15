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
var ActrackMoreItem = (function (_super) {
    __extends(ActrackMoreItem, _super);
    function ActrackMoreItem() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        return _this;
    }
    ActrackMoreItem.prototype.initItem = function (index, data) {
        this.uid = data.info.uid;
        var wordsBg = BaseBitmap.create("public_9_bg25");
        wordsBg.width = 640;
        wordsBg.height = 124;
        wordsBg.x = 0;
        wordsBg.y = 0;
        wordsBg.visible = false;
        this.addChild(wordsBg);
        var rankinglist_line = BaseBitmap.create("rankinglist_line");
        rankinglist_line.y = 128;
        rankinglist_line.x = 15;
        this.addChild(rankinglist_line);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = 50 - rankImg.width / 2 - 20;
        rankImg.y = 26; //15;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        rankTxt.text = String(index + 1);
        rankTxt.x = 50 - rankTxt.width / 2 - 20;
        rankTxt.y = this.height / 2 - rankTxt.height / 2 - 20;
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.text = data.info.name;
        nameTxt.x = rankImg.x + 50;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        //击败｜｜全歼
        var str = "";
        if (data.info.type == 1) {
            str = LanguageManager.getlocal("atkracebeat");
        }
        else {
            str = LanguageManager.getlocal("atkraceAnnihilation");
        }
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var servantName = Config.ServantCfg.getServantItemById(data.info.sid).name;
        describeTxt.text = "";
        if (data.info.streak && data.info.streak >= 3) {
            describeTxt.text = LanguageManager.getlocal("actrackStraight", [servantName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
        }
        else {
            describeTxt.text = LanguageManager.getlocal("actrackDescription", [servantName, str, data.info.uname2, data.info.fightnum]);
        }
        describeTxt.width = 450;
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + 30;
        this.addChild(describeTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.info.st, 2);
        timerTxt.x = describeTxt.x;
        timerTxt.y = describeTxt.y + 40;
        this.addChild(timerTxt);
        //挑战按钮
        var challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this);
        challengeBtn.setScale(0.85);
        challengeBtn.x = 530;
        challengeBtn.y = 70;
        this.addChild(challengeBtn);
        if (Api.playerVoApi.getPlayerID() == data.info.uid) {
            challengeBtn.visible = false;
        }
    };
    //挑战
    ActrackMoreItem.prototype.challengBtnHandler = function (evt) {
        var data = [];
        data.type = 1; //挑战
        data.uid = this.uid;
        AtkraceChallengeItem.data = data;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
    };
    ActrackMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    ActrackMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    ActrackMoreItem.prototype.dispose = function () {
        this.uid = 0;
        _super.prototype.dispose.call(this);
    };
    return ActrackMoreItem;
}(ScrollListItem));
__reflect(ActrackMoreItem.prototype, "ActrackMoreItem");

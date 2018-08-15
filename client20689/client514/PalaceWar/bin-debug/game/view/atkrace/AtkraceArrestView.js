/**
 * 擂台 缉捕
 * author shaoliang
 * date 2017/11/26
 * @class AtkraceArrestView
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
var AtkraceArrestView = (function (_super) {
    __extends(AtkraceArrestView, _super);
    function AtkraceArrestView() {
        var _this = _super.call(this) || this;
        _this._servantInfoArray = [];
        _this._isShowBuy = false;
        return _this;
    }
    AtkraceArrestView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_arrest_bg", "atkrace_enemy_bg", "atkrace_my_bg", "atkrace_name_bg",
            "atkrace_one_key", "atkrace_temp_property", "atkrace_text_bg", "atkrace_vs", "progress7_bg", "progress8",
            "signin_had_get"
        ]);
    };
    AtkraceArrestView.prototype.initView = function () {
        this.container.y = this.getTitleButtomY();
        var containerHeight = GameConfig.stageHeigth - this.container.y;
        //中间的对战
        var middleBg = BaseBitmap.create("atkrace_arrest_bg");
        middleBg.y = containerHeight / 2 - middleBg.height / 2;
        this.addChildToContainer(middleBg);
        var middleVs = BaseBitmap.create("atkrace_vs");
        middleVs.setPosition(GameConfig.stageWidth / 2 - middleVs.height / 2 + 41, containerHeight / 2 - middleVs.height / 2);
        this.addChildToContainer(middleVs);
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        //顶部敌人信息
        var topBg = BaseBitmap.create("atkrace_enemy_bg");
        this.addChildToContainer(topBg);
        this._scoreText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreText.setPosition(22, 22);
        this.addChildToContainer(this._scoreText);
        var curcount = Object.keys(myAtkInfo.sids).length;
        var total = myAtkInfo.total;
        this._servantCount = ComponentManager.getTextField(LanguageManager.getlocal("servant_count") + "(" + curcount + "/" + total + ")", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._servantCount.setPosition(GameConfig.stageWidth - this._servantCount.width - 22, this._scoreText.y);
        this.addChildToContainer(this._servantCount);
        //门客形象
        this.resetServantInfo();
        var tempProperty = ComponentManager.getButton("atkrace_text_bg", null, this.tempPropertyClick, this);
        tempProperty.setPosition(19, 295);
        this.addChildToContainer(tempProperty);
        var tempPropertyText = BaseBitmap.create("atkrace_temp_property");
        tempPropertyText.setPosition(tempProperty.width / 2 - tempPropertyText.width / 2, tempProperty.height / 2 - tempPropertyText.height / 2);
        tempProperty.addChild(tempPropertyText);
        // let oneKey:BaseButton = ComponentManager.getButton("atkrace_text_bg",null,this.oneKeyClick,this);
        // oneKey.setPosition(GameConfig.stageWidth - tempProperty.x - oneKey.width,tempProperty.y);
        // this.addChildToContainer(oneKey);
        // let oneKeyText = BaseBitmap.create("atkrace_one_key");
        // oneKeyText.setPosition(oneKey.width/2 - oneKeyText.width/2, oneKey.height/2 - oneKeyText.height/2)
        // oneKey.addChild(oneKeyText);
        //底部我方信息
        var bottomBg = BaseBitmap.create("atkrace_my_bg");
        bottomBg.y = containerHeight - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var nameBg = BaseBitmap.create("atkrace_name_bg");
        nameBg.width = 270;
        nameBg.height = 35;
        nameBg.setPosition(320, bottomBg.y + 23);
        this.addChildToContainer(nameBg);
        var myInfo = myAtkInfo.mesid;
        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkraceVoApi.getPoint().toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._playerScore.setPosition(345, nameBg.y + nameBg.height / 2 - this._playerScore.height / 2);
        this.addChildToContainer(this._playerScore);
        var servantName = LanguageManager.getlocal("servant_name" + myInfo.sid);
        var servantLv = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_level", [servantName, myInfo.lv.toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantLv.setPosition(this._playerScore.x, this._playerScore.y + 50);
        this.addChildToContainer(servantLv);
        var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc1.setPosition(this._playerScore.x, servantLv.y + 40);
        this.addChildToContainer(infoDesc1);
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc2.setPosition(this._playerScore.x, infoDesc1.y + 35);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        infoDesc3.setPosition(this._playerScore.x, infoDesc2.y + 35);
        this.addChildToContainer(infoDesc3);
        this._infoText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
        this.addChildToContainer(this._infoText1);
        this._infoText2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, this._infoText1.textColor);
        this._infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(this._infoText2);
        this._infoText3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, this._infoText1.textColor);
        this._infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(this._infoText3);
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(myInfo.sid));
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        servantFullImg.y = containerHeight - servantFullImg.height - 25;
        this.addChildToContainer(servantFullImg);
        this._progressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", GameConfig.stageWidth);
        this._progressBar.y = containerHeight - this._progressBar.height;
        this.addChildToContainer(this._progressBar);
        this.resetInfoText();
    };
    AtkraceArrestView.prototype.resetServantInfo = function () {
        if (this._servantInfoArray.length > 0) {
            for (var k in this._servantInfoArray) {
                this._servantInfoArray[k].dispose();
            }
            this._servantInfoArray.length = 0;
        }
        var index = 0;
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        for (var key in myAtkInfo.fids) {
            var container = new BaseDisplayObjectContainer();
            this.addChildToContainer(container);
            this._servantInfoArray.push(container);
            var sinfo = myAtkInfo.fids[key];
            var tmpCfg = Config.ServantCfg.getServantItemById(key);
            var cardbg = BaseLoadBitmap.create("servant_cardbg_" + sinfo.clv);
            cardbg.width = 194;
            cardbg.height = 192;
            cardbg.setPosition(15 + (cardbg.width + 14) * index, 62);
            container.addChild(cardbg);
            index++;
            cardbg.addTouchTap(this.vsClick, this, [key]);
            var servantImg = BaseLoadBitmap.create(tmpCfg.halfIcon);
            servantImg.width = 180;
            servantImg.height = 177;
            servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2;
            servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
            container.addChild(servantImg);
        }
    };
    AtkraceArrestView.prototype.resetInfoText = function () {
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        this._infoText1.text = myInfo.ability.toString();
        var tmpatt = myAtkInfo.tmpattr;
        var atkAdd = 0;
        var skillAdd = 0;
        if (tmpatt) {
            if (tmpatt.atk) {
                atkAdd = Math.floor(tmpatt.atk * 100);
            }
            if (tmpatt.skill) {
                skillAdd = Math.floor(tmpatt.skill * 100);
            }
        }
        this._infoText2.text = atkAdd.toString() + "%";
        this._infoText3.text = skillAdd.toString() + "%";
        var total = myAtkInfo.total;
        var curcount = total - myAtkInfo.fightnum;
        this._servantCount.text = LanguageManager.getlocal("servant_count") + "(" + curcount + "/" + total + ")";
        var nameStr = myAtkInfo.fname;
        if (myAtkInfo.uid == "robot") {
            nameStr = LanguageManager.getlocal("atkRaceRobotName" + myAtkInfo.fname);
        }
        this._scoreText.text = LanguageManager.getlocal("atkrace_score", [nameStr, myAtkInfo.fpoint.toString()]);
        this._progressBar.setText(myInfo.attr + "/" + myInfo.fullattr);
        this._progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
        this._playerScore.text = LanguageManager.getlocal("atkrace_score", [Api.playerVoApi.getPlayerName(), Api.atkraceVoApi.getPoint().toString()]);
    };
    //临时属性
    AtkraceArrestView.prototype.tempPropertyClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEBUYPOPUPVIEW, { f: this.resetInfoText, o: this });
    };
    //一键缉捕
    AtkraceArrestView.prototype.oneKeyClick = function () {
        //test code
        // ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW,{f:this.resetInfoText,o:this});
        // ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{f:this.oneKeyClick,o:this,type:2});
        // ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:4,f:this.oneKeyClick,o:this});
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW, {});
    };
    //开始对战
    AtkraceArrestView.prototype.vsClick = function (event, key) {
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        this._key = key;
        if (myAtkInfo.fightnum == 0 && this._isShowBuy == false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk == 0 && myAtkInfo.tmpattr.blood == 0))) {
            this._isShowBuy = true;
            var itemId = Config.AtkraceCfg.getFightAdd();
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("atkrace_no_property"),
                callback: this.realFight,
                handler: this,
                needCancel: true
            });
        }
        else {
            this.realFight();
        }
    };
    AtkraceArrestView.prototype.realFight = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW, { f: this.resetBattleInfo, o: this, servantid: this._key, f2: this.battleEnd });
    };
    //战斗胜利回调 刷新 打开购买属性
    AtkraceArrestView.prototype.resetBattleInfo = function () {
        this.resetInfoText();
        this.resetServantInfo();
        this.tempPropertyClick();
    };
    //战斗结束回掉 关掉板子
    AtkraceArrestView.prototype.battleEnd = function () {
        this.hide();
    };
    //请求回调
    AtkraceArrestView.prototype.receiveData = function (data) {
    };
    AtkraceArrestView.prototype.dispose = function () {
        this._infoText1 = null;
        this._infoText2 = null;
        this._infoText3 = null;
        this._servantCount = null;
        this._servantInfoArray.length = 0;
        this._scoreText = null;
        this._progressBar = null;
        this._isShowBuy = false;
        this._key = null;
        this._playerScore = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceArrestView;
}(CommonView));
__reflect(AtkraceArrestView.prototype, "AtkraceArrestView");

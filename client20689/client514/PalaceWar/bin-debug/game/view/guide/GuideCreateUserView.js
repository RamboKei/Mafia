/**
 * 创建用户界面
 * author dukunayng
 * date 2017/10/16
 * @class GuideCreateUserView
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
var GuideCreateUserView = (function (_super) {
    __extends(GuideCreateUserView, _super);
    function GuideCreateUserView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._userNameCount = 0;
        _this._curSex = 1; //1男2女
        _this._picNum = 0;
        _this._sextype = 0;
        return _this;
    }
    GuideCreateUserView.prototype.getResourceList = function () {
        var rewardPic = ["guide_createuserbg", "user_body_full_3001", "user_head1", "guide_namebg", "guide_uesrheadbg",
            "user_head2", "user_head3", "user_head4", "user_head5", "shield_cn",
            "user_head6", "user_head7", "user_head8", "user_head9", "user_head10",
            "user_hair6", "user_hair7", "user_hair8", "user_hair9", "user_hair10",
            "guide_manicon_2", "guide_womanicon_2", "guide_bottom",
        ];
        return _super.prototype.getResourceList.call(this).concat(rewardPic);
    };
    GuideCreateUserView.prototype.getCloseBtnName = function () {
        if (!this.param) {
            return null;
        }
        else {
            return _super.prototype.getCloseBtnName.call(this);
        }
    };
    // 背景图名称
    GuideCreateUserView.prototype.getBgName = function () {
        return "guide_createuserbg";
    };
    GuideCreateUserView.prototype.initView = function () {
        // let tipBB:BaseBitmap = BaseBitmap.create("guide_createuserbg");
        // tipBB.setPosition(0,-20);
        // this.addChildToContainer(tipBB);
        PlatformManager.analyticsNewGuide(2);
        var tmpHeadId = 1;
        if (this.param && this.param.data.changeImg) {
            tmpHeadId = Api.playerVoApi.getPlayePicId();
        }
        this._container = Api.playerVoApi.getPlayerPortrait(3001, tmpHeadId);
        this.addChild(this._container);
        this._myBody = this._container.getChildByName("myBody");
        this._myHead = this._container.getChildByName("myHead");
        this._myHair = this._container.getChildByName("myHair");
        this._container.x = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5;
        this._container.y = 160;
        if (!this.param) {
            //输入框
            var inputBg = BaseBitmap.create("guide_namebg");
            inputBg.x = this.viewBg.x + this.viewBg.width / 2 - inputBg.width / 2;
            inputBg.y = GameConfig.stageHeigth - 200;
            this.addChild(inputBg);
            var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WARN_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 200, 45, "public_9_bg5");
            inputTF.x = this.viewBg.x + this.viewBg.width / 2 - inputTF.width / 2;
            inputTF.y = inputBg.y + inputBg.height / 2 - inputTF.height / 2;
            this.addChild(inputTF);
            this._inputTextField = inputTF.getChildByName("textField");
            this._inputTextField.maxChars = this.getNameLength(1);
            var randomBtn = ComponentManager.getButton("btn_random", "", this.clickRanomHandler, this);
            randomBtn.x = 420;
            randomBtn.y = inputBg.y + inputBg.height / 2 - randomBtn.height / 2;
            randomBtn.setColor(TextFieldConst.COLOR_BLACK);
            this.addChild(randomBtn);
        }
        else {
        }
        this._manIcon = BaseBitmap.create("guide_manicon_2");
        this._manIcon.x = 30;
        this._manIcon.y = 200;
        this.addChild(this._manIcon);
        // this._manIcon.addTouchTap(this.manIconClick,this);
        this._womanIcon = BaseBitmap.create("guide_womanicon_2");
        this._womanIcon.x = 541;
        this._womanIcon.y = 200;
        this.addChild(this._womanIcon);
        // this._womanIcon.addTouchTap(this.womanIconClick,this);
        if (PlatformManager.checkIsKRSp()) {
            this._manIcon.visible = false;
            this._womanIcon.visible = false;
        }
        //创建角色按钮
        var btnStr = "guideCreateUserViewTitle";
        if (this.param && this.param.data.changeImg) {
            btnStr = "sysConfirm";
        }
        var createBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, btnStr, this.clickCreateHandler, this);
        createBtn.x = this.viewBg.x + this.viewBg.width / 2 - createBtn.width / 2;
        createBtn.y = GameConfig.stageHeigth - 100; //860;
        createBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(createBtn);
        this._posContainer = new BaseDisplayObjectContainer();
        this.addChild(this._posContainer);
        //人物头像 选中状态
        this._selectBg = BaseBitmap.create("itembg_selected");
        this._selectBg.width = 108;
        this._selectBg.height = 106;
        this._selectBg.scaleX = 0.76;
        this._selectBg.scaleY = 0.76;
        this._selectBg.x = 28;
        this._selectBg.y = 270;
        this.addChild(this._selectBg);
        this.reFreshUserContainer();
        if (!this.param) {
            this.clickRanomHandler();
        }
        else {
            if (Api.playerVoApi.getPlayePicId() > 5) {
                this.womanIconClick();
            }
        }
        var leftBg = BaseBitmap.create("guide_bottom");
        leftBg.setPosition(15, 100);
        this.addChildToContainer(leftBg);
        leftBg.height = 510;
        var rightBg = BaseBitmap.create("guide_bottom");
        rightBg.setPosition(525, 100);
        this.addChildToContainer(rightBg);
        rightBg.height = 510;
        if (this._curSex == 2) {
            this._sextype = 2;
        }
        else {
            this._sextype = 1;
        }
    };
    GuideCreateUserView.prototype.manIconClick = function () {
        if (this._curSex == 1) {
            return;
        }
        this._curSex = 1;
        // this._manIcon.texture = ResourceManager.getRes("guide_manicon_1");
        // this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_2");
        this.reFreshUserContainer();
    };
    GuideCreateUserView.prototype.womanIconClick = function () {
        if (this._curSex == 2) {
            return;
        }
        this._curSex = 2;
        // this._manIcon.texture = ResourceManager.getRes("guide_manicon_2");
        // this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_1");
        this.reFreshUserContainer();
    };
    GuideCreateUserView.prototype.reFreshUserContainer = function () {
        if (this._headContainer) {
            this._posContainer.removeChild(this._headContainer);
            this._headContainer = null;
        }
        this.changeHead();
        this._headContainer = new BaseDisplayObjectContainer();
        this._posContainer.addChild(this._headContainer);
        var dis = 0;
        if (this._curSex == 1) {
            // this._manIcon.texture = ResourceManager.getRes("guide_manicon_1");
            // this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_2");
        }
        else if (this._curSex == 2) {
            dis = 0;
            // this._manIcon.texture = ResourceManager.getRes("guide_manicon_2");
            // this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_1");
        }
        for (var index = 0; index < 10; index++) {
            var userHeadBg = BaseBitmap.create("guide_uesrheadbg");
            userHeadBg.x = 28;
            if (index >= 5) {
                userHeadBg.x = 536;
                var num = index - 5;
                userHeadBg.y = 270 + (userHeadBg.height * 0.67 + 18) * num;
                userHeadBg.name = "2";
            }
            else {
                userHeadBg.name = "1";
                userHeadBg.y = 270 + (userHeadBg.height * 0.67 + 18) * index;
            }
            var headPic = "user_head" + (index + 1 + dis);
            var userHead = BaseBitmap.create(headPic);
            userHead.scaleX = 0.67;
            userHead.scaleY = 0.67;
            userHead.x = userHeadBg.x + userHeadBg.width / 2 - userHead.width / 2 * 0.67 - 12;
            userHead.y = userHeadBg.y + userHeadBg.height / 2 - userHead.height / 2 * 0.67 - 15;
            // console.log(index+">>???????????");
            userHeadBg.addTouchTap(this.changeHeadHandler, this, [index]);
            userHeadBg.scaleX = 0.76;
            userHeadBg.scaleY = 0.76;
            this._headContainer.addChild(userHeadBg);
            this._headContainer.addChild(userHead);
            if (this.param && this.param.data.changeImg) {
                var pic = Api.playerVoApi.getPlayePicId();
                this._picNum = pic;
                if (pic > 5) {
                    pic = pic - 5;
                }
                if (pic == index + 1) {
                    if (this._curSex == 2) {
                        this._selectBg.x = 536;
                    }
                    else {
                        this._selectBg.x = userHeadBg.x;
                    }
                    this._index = index;
                    this._selectBg.y = userHeadBg.y;
                }
            }
        }
    };
    GuideCreateUserView.prototype.changeHeadHandler = function (evt, index) {
        if (evt.currentTarget.name == "2") {
            this._sextype = 2;
        }
        else {
            this._sextype = 1;
        }
        if (index == this._index && this._picNum != 6 && index != 4) {
            return;
        }
        this._selectBg.x = evt.target.x;
        this._selectBg.y = evt.target.y;
        var cur = -1;
        if (index - this._index > 0) {
            cur = 1;
        }
        this._index = index;
        var centerX = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5;
        var centerY = 140;
        egret.Tween.get(this._container)
            .to({ x: -500 * cur + centerY }, 200)
            .to({ x: 500 * cur + centerY }, 0)
            .call(this.changeHead, this)
            .to({ x: centerX }, 200);
    };
    GuideCreateUserView.prototype.changeHead = function () {
        var dis = 0;
        // if(this._curSex == 2){
        // 	dis = 5;
        // }
        var headPic = "user_head" + (this._index + 1 + dis);
        var hairPic = "user_hair" + (this._index + 1 + dis);
        this._myHead.texture = ResourceManager.getRes(headPic);
        this._myHair.texture = ResourceManager.getRes(hairPic);
    };
    GuideCreateUserView.prototype.clickCreateHandler = function () {
        var picId = this._index + 1;
        if (picId == 1 && this._picNum == 6 && this._sextype == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
            this.hide();
            return;
        }
        if (this._sextype == 2 && this._index < 5) {
            picId = picId + 5;
        }
        if (this.param && this.param.data.changeImg) {
            if (picId == Api.playerVoApi.getPlayePicId()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
                this.hide();
            }
            else {
                this.request(NetRequestConst.REQUEST_USER_CHANGEPIC, { pic: picId });
            }
            return;
        }
        //正则表达式
        var txtStr = this._inputTextField.text;
        if (!App.StringUtil.userNameCheck(txtStr)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
            return;
        }
        if (txtStr.length < 2 || txtStr.length > this.getNameLength()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
            return;
        }
        if (Config.ShieldCfg.checkShield(txtStr) == false) {
            return;
        }
        this.request(NetRequestConst.REQUEST_USER_CREATEUSER, { name: this._inputTextField.text, pic: picId });
    };
    GuideCreateUserView.prototype.getNameLength = function (type) {
        if (type === void 0) { type = 0; }
        if (PlatformManager.checkIsEnSp()) {
            return GameData.nameLength;
        }
        else {
            //输入限制
            if (type == 1) {
                return 8;
            }
            return 6;
        }
    };
    GuideCreateUserView.prototype.clickRanomHandler = function () {
        this._userNameCount = 0;
        this.randomName();
    };
    GuideCreateUserView.prototype.randomName = function () {
        var firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1, 604));
        ;
        var sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1, 3763));
        this._userName = firstName + sercondName;
        this._userNameCount++;
        if (this._userNameCount >= 5) {
            this._inputTextField.text = this._userName;
        }
        else {
            this.request(NetRequestConst.REQUEST_USER_CHECKNAME, { name: this._userName });
        }
    };
    GuideCreateUserView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_USER_CHECKNAME) {
            if (data.data.data.nameflag == 0) {
                this._inputTextField.text = this._userName;
            }
            else {
                this.randomName();
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_USER_CREATEUSER) {
            if (data.data.data.nameflag == 0) {
                if (GameData.wbrewards != null) {
                    ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW, { rewards: GameData.wbrewards, f: this.startRookieGuide, o: this });
                }
                else {
                    //玩吧积分礼包
                    if (PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502") {
                        if (GameData.wbrewardsFlag) {
                            PlatformManager.giftExchange(this.exchangeCallback, this);
                            // this.exchangeCallback("0",{ret:"0"});
                        }
                        else {
                            ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: "2003" });
                        }
                    }
                    else {
                        this.startRookieGuide();
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError" + data.data.data.nameflag));
                return;
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_USER_CHANGEPIC) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip1"));
            this.hide();
        }
        if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD) {
            if (data.data.data && data.data.data.rewards) {
                // ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"0"});
                ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: data.data.data.rewards, f: this.startRookieGuide, o: this, code: "0" });
            }
        }
    };
    GuideCreateUserView.prototype.exchangeCallback = function (code, data) {
        // alert("data"+data.ret);
        if (String(code) == "0") {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD, { giftId: PlatformManager.getGiftId() });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: String(data.ret) });
        }
    };
    GuideCreateUserView.prototype.startRookieGuide = function () {
        PlatformManager.analyticsNewGuide(3);
        this.hide();
        Api.rookieVoApi.isInGuiding = true;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "1", f: this.completeGuideLoginGame, o: this });
    };
    GuideCreateUserView.prototype.completeGuideLoginGame = function () {
        LoginManager.completeGuideForLogin();
    };
    GuideCreateUserView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    GuideCreateUserView.prototype.dispose = function () {
        this._inputTextField = null;
        this._container = null;
        this._myBody = null;
        this._myHead = null;
        this._selectBg = null;
        this._index = 0;
        this._headContainer = null;
        this._manIcon = null;
        this._womanIcon = null;
        this._curSex = 1; //1男2女
        this._picNum = 0;
        _super.prototype.dispose.call(this);
    };
    return GuideCreateUserView;
}(CommonView));
__reflect(GuideCreateUserView.prototype, "GuideCreateUserView");

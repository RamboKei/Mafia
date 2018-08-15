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
 * 门客信息
 * author yanyuling
 * date 2017/9/25
 * @class ServantInfoView
 */
var ServantInfoView = (function (_super) {
    __extends(ServantInfoView, _super);
    function ServantInfoView() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfoObj = null;
        _this._proTxtList = null;
        _this._servantProCfg = null;
        _this._curLvNeedGold = 0;
        _this._lastUseTime = 0;
        _this._bottomNodeList = [];
        return _this;
    }
    ServantInfoView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.checkRedPoints, this);
        this._proTxtList = [];
        this._servantId = this.param.data;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
        this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level - 1];
        this.playEffect(servantInfoObj.sound, true);
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        var goldBg = BaseBitmap.create("servant_topresbg");
        goldBg.width = 120;
        goldBg.x = PlatformManager.hasSpcialCloseBtn() ? 480 : 20;
        goldBg.y = PlatformManager.hasSpcialCloseBtn() ? 500 : (this.container.y - goldBg.height - 20);
        this.addChild(goldBg);
        var goldIcon = BaseBitmap.create("public_icon2");
        goldIcon.x = goldBg.x - goldIcon.width / 2 + 15;
        goldIcon.y = goldBg.y + goldBg.height / 2 - goldIcon.height / 2 - 5;
        this.addChild(goldIcon);
        this._goldNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
        this._goldNumTxt.x = goldIcon.x + goldIcon.width;
        this._goldNumTxt.y = goldBg.y + goldBg.height / 2 - this._goldNumTxt.height / 2 - 3;
        this.addChild(this._goldNumTxt);
        var servant_infobg = BaseBitmap.create("servant_infobg");
        servant_infobg.y = -20;
        this._nodeContainer.addChild(servant_infobg);
        var servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
        servantFullImg.width = 405;
        servantFullImg.height = 467;
        servantFullImg.anchorOffsetY = servantFullImg.height;
        servantFullImg.x = 120;
        servantFullImg.y = servant_infobg.y + servant_infobg.height - 50;
        this._nodeContainer.addChild(servantFullImg);
        var nameBg = BaseBitmap.create("servant_alv_namebg");
        nameBg.x = 20;
        nameBg.y = 20;
        this._nodeContainer.addChild(nameBg);
        this._alvImg = BaseLoadBitmap.create("servant_alv_1");
        this._alvImg.width = 91;
        this._alvImg.height = 81;
        this._alvImg.visible = false;
        if (servantInfoObj.clv > 0) {
            this._alvImg.setload("servant_alv_" + servantInfoObj.clv);
            this._alvImg.visible = true;
        }
        this._nodeContainer.addChild(this._alvImg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON);
        this._nameTxt = nameTxt;
        nameTxt.multiline = true;
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.text = LanguageManager.getlocal("servant_name" + this._servantId);
            nameTxt.x = this._nodeContainer.width / 2 - nameTxt.width / 2;
            nameTxt.y = this._nodeContainer.height - 225 - nameTxt.height / 2;
            nameBg.width = nameTxt.width + 50;
            nameBg.x = this._nodeContainer.width / 2 - nameBg.width / 2;
            nameBg.y = this._nodeContainer.height - 225 - nameBg.height / 2;
            this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
            this._alvImg.x = nameBg.x - this._alvImg.width / 2 - 5;
            this._alvImg.y = nameBg.y + nameBg.height / 2 - this._alvImg.height / 2 - 5;
        }
        else {
            this._alvImg.x = nameBg.x + nameBg.width / 2 - this._alvImg.width / 2 + 5;
            this._alvImg.y = nameBg.y - 20;
            nameTxt.width = 26;
            nameTxt.text = LanguageManager.getlocal("servant_name" + this._servantId);
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
            if (this._alvImg.visible) {
                nameTxt.y = this._alvImg.y + 90;
            }
            else {
                nameTxt.y = this._alvImg.y + 60;
            }
        }
        nameTxt.name = "nameTxt";
        this._nodeContainer.addChild(nameTxt);
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = servant_infobg.width;
        servant_mask.x = GameConfig.stageWidth / 2 - servant_mask.width / 2;
        servant_mask.y = servant_infobg.y + servant_infobg.height - servant_mask.height;
        this._nodeContainer.addChild(servant_mask);
        //红色属性背景条
        var servant_attributemap = BaseBitmap.create("servant_attributemap");
        servant_attributemap.x = 180;
        servant_attributemap.y = 380;
        this._nodeContainer.addChild(servant_attributemap);
        //蓝色背景图
        var servantBlueBg = BaseBitmap.create("servant_downbg");
        servantBlueBg.x = 0;
        servantBlueBg.y = 445;
        this._nodeContainer.addChild(servantBlueBg);
        //等级蓝色背景图
        var servant_levebg = BaseBitmap.create("servant_levebg");
        servant_levebg.x = 5;
        servant_levebg.y = 445;
        this._nodeContainer.addChild(servant_levebg);
        //等级 文字不变
        var lvText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        lvText.text = LanguageManager.getlocal("servant_infoLv");
        lvText.x = 22;
        lvText.y = 455;
        this._nodeContainer.addChild(lvText);
        for (var i = 0; i < 4; i++) {
            var attribute = BaseBitmap.create("servant_attribute" + (i + 1));
            var num = i % 2;
            attribute.x = 90 + num * 180;
            attribute.y = 460 + 32 * Math.floor(i / 2);
            this._nodeContainer.addChild(attribute);
        }
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
        this._progressBar.x = 10;
        this._progressBar.y = 530;
        this._progressBar.setTextSize(18);
        this._progressBar.setPercentage(this._servantInfoObj.hasexp / this._curLvNeedGold);
        this._nodeContainer.addChild(this._progressBar);
        //勾选底
        var probg = BaseBitmap.create("hold_dinner_box");
        probg.x = 480;
        probg.y = 465;
        this._nodeContainer.addChild(probg);
        //连升十级
        var tenTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
        tenTxt.x = 525; // probg.x + 45;
        tenTxt.y = 470; //probg.y+ 260;
        tenTxt.size = 24;
        this._nodeContainer.addChild(tenTxt);
        this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
        this._checkFlag.width = this._checkFlag.height = 38;
        this._checkFlag.x = 480; //tenTxt.x + 95;
        this._checkFlag.y = tenTxt.y - 10;
        this._checkFlag.alpha = ServantInfoView.CALPHA;
        this._nodeContainer.addChild(this._checkFlag);
        this._checkFlag.addTouchTap(this.changeCheckFlagStatus, this);
        this.changeProgressText();
        var specialAbility = servantCfg.speciality;
        var sStr = "";
        for (var index = 0; index < specialAbility.length; index++) {
            var element = specialAbility[index];
            sStr += LanguageManager.getlocal("servantInfo_speciality" + element);
            if (index < specialAbility.length - 1) {
                sStr += " , ";
            }
            //图 
            var specialityIcon = BaseBitmap.create("servant_speciality" + element);
            specialityIcon.x = 520 + 50 * index;
            specialityIcon.y = 40;
            this._nodeContainer.addChild(specialityIcon);
        }
        this._servantProCfg = [
            {
                txt: this.getProStringWithProId(1),
                txtcolor: TextFieldConst.COLOR_QUALITY_ORANGE,
                txtId: 1,
            },
            {
                txt: LanguageManager.getlocal("servant_infoSpecialty") + sStr,
                txtcolor: TextFieldConst.COLOR_QUALITY_ORANGE,
                txtId: 2,
            },
            {
                txt: this.getProStringWithProId(3),
                txtcolor: TextFieldConst.COLOR_QUALITY_ORANGE,
                txtId: 3,
            },
            {
                txt: this.getProStringWithProId(4),
                txtcolor: 0xddd5c7,
                txtId: 4,
            },
            {
                txt: this.getProStringWithProId(5),
                txtcolor: 0xddd5c7,
                txtId: 5,
            },
            {
                txt: this.getProStringWithProId(6),
                txtcolor: 0xddd5c7,
                txtId: 6,
            },
            {
                txt: this.getProStringWithProId(7),
                txtcolor: 0xddd5c7,
                txtId: 7,
            },
        ];
        var proX = probg.x + 30;
        var proY = probg.y + 35;
        var detailImg = ComponentManager.getButton("servant_detailBtn", "", this.detailClickHandler, this);
        detailImg.x = 400; //probg.x + probg.width - detailImg.width/2-10;
        detailImg.y = 380; //probg.y - detailImg.height/2+15;
        this._nodeContainer.addChild(detailImg);
        for (var index = 0; index < this._servantProCfg.length; index++) {
            var element = this._servantProCfg[index];
            var proTxt = ComponentManager.getTextField("", 22, element.txtcolor);
            if (index == 1) {
                proTxt.text = element.txt;
            }
            else {
                proTxt.text = this.getProStringWithProId(element.txtId);
            }
            proTxt.x = proX;
            proTxt.y = proY;
            //等级
            if (element.txtId == 1) {
                proTxt.x = 5;
                proTxt.y = 475;
                proTxt.width = 80;
                proTxt.textAlign = "center";
                proTxt.size = 42;
                proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            if (element.txtId == 2) {
                proTxt.visible = false;
            }
            //属性
            if (element.txtId == 3) {
                proTxt.x = 210;
                proTxt.y = 392;
                proTxt.width = 190;
                proTxt.size = 26;
                proTxt.textAlign = "center";
                proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            //属性武力
            if (element.txtId == 4) {
                proTxt.x = 160;
                proTxt.y = 465;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性智力
            if (element.txtId == 5) {
                proTxt.x = 340;
                proTxt.y = 465;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性政治
            if (element.txtId == 6) {
                proTxt.x = 160;
                proTxt.y = 495;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性魅力
            if (element.txtId == 7) {
                proTxt.x = 340;
                proTxt.y = 495;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            this._nodeContainer.addChild(proTxt);
            proY += 28;
            this._proTxtList.push(proTxt);
        }
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.levelupBtnClickHandler, this);
        if (this._servantInfoObj.isLvEnableForAdvance()) {
            levelupBtn.setText("servant_clvUpBtn");
        }
        else {
            levelupBtn.setText("servantInfoLevelup");
        }
        levelupBtn.x = 480; //probg.x + probg.width/2 - levelupBtn.width/2;
        levelupBtn.y = 505; //proY + 12 + 55;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        this.changeLvBtnStatus();
        var btY = servant_infobg.y + servant_infobg.height;
        if (btY + this.container.y + 406 > GameConfig.stageHeigth) {
            var bgy = 554 - servant_infobg.height - this.container.y;
            bgy = bgy >= 0 ? 0 : bgy;
            servant_infobg.y = bgy + 50;
            servant_infobg.mask = new egret.Rectangle(0, this.container.y - 50, GameConfig.stageWidth, servant_infobg.height);
            this._bottomnodeContainer.y = 565; //GameConfig.stageHeigth - 406 - this.container.y;
            servantFullImg.y = servant_infobg.y + servant_infobg.height - 50;
        }
        else {
            this._bottomnodeContainer.y = 565; // GameConfig.stageHeigth - 554-this.container.y;
        }
        this._progressBar.y = 530; //this._bottomnodeContainer.y - 40;
        var bottomInfoY = 0; // 457;
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.x = 0;
        bottomBg.y = bottomInfoY;
        var attrLineNum = Math.ceil(servantCfg.ability.length / 2);
        var targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y;
        bottomBg.height = targetHeight;
        this._bottomnodeContainer.addChild(bottomBg);
        this._bottomBg = bottomBg;
        var tabName = ["servant_info_tab1", "servant_info_tab2", "servant_info_tab3"];
        if (servantCfg.wifeId) {
            tabName.push("servant_info_tab5");
        }
        if (servantCfg.aura) {
            tabName.push("servant_info_tab4");
        }
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(2);
        tabbarGroup.x = 30;
        tabbarGroup.y = 24;
        this._bottomnodeContainer.addChild(tabbarGroup);
        for (var index = 0; index < tabName.length; index++) {
            var tmpNode = new BaseDisplayObjectContainer();
            this._bottomNodeList.push(tmpNode);
            this._bottomnodeContainer.addChild(tmpNode);
        }
        var bottomH = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y;
        this.initBookInfo(this._bottomNodeList[0], bottomH);
        this.iniSkillInfo(this._bottomNodeList[1], bottomH);
        this.initItemsInfo(this._bottomNodeList[2], bottomH);
        if (servantCfg.wifeId) {
            this.initWifeInfo(this._bottomNodeList[3], bottomH);
        }
        if (servantCfg.aura) {
            this.initFourInfo(this._bottomNodeList[3], bottomH);
        }
        this.tabBtnClickHandler({ index: 0 });
        this.checkRedPoints();
    };
    ServantInfoView.prototype.initBookInfo = function (tmpNode, bottomH) {
        var servantInfoBookItems = new ServantInfoBookItems();
        servantInfoBookItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoBookItems);
        if (Api.rookieVoApi.isInGuiding) {
            var pos = servantInfoBookItems.localToGlobal(servantInfoBookItems.y, 20);
            Api.rookieVoApi.waitingPosY = pos.y + 90;
        }
    };
    ServantInfoView.prototype.initWifeInfo = function (tmpNode, bottomH) {
        var servantInfoWifeItem = new ServantInfoWifeItem();
        servantInfoWifeItem.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoWifeItem);
    };
    ServantInfoView.prototype.iniSkillInfo = function (tmpNode, bottomH) {
        var servantInfoSkillsItem = new ServantInfoSkillsItem();
        servantInfoSkillsItem.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoSkillsItem);
    };
    ServantInfoView.prototype.initFourInfo = function (tmpNode, bottomH) {
        var servantInfoFourItems = new ServantInfoFourItems();
        servantInfoFourItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoFourItems);
    };
    ServantInfoView.prototype.initItemsInfo = function (tmpNode, bottomH) {
        var servantInfoItems = new ServantInfoItems();
        servantInfoItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoItems);
    };
    /**
     * 检测红点
     */
    ServantInfoView.prototype.checkRedPoints = function () {
        this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var skillRedP = this._bottomnodeContainer.getChildByName("skillRedP");
        if (!skillRedP) {
            skillRedP = BaseBitmap.create("public_dot2");
            skillRedP.x = 298;
            skillRedP.y = 24;
            skillRedP.name = "skillRedP";
            this._bottomnodeContainer.addChild(skillRedP);
        }
        skillRedP.visible = this._servantInfoObj.isSkillLvUpEnable();
        var bookRedP = this._bottomnodeContainer.getChildByName("bookRedP");
        if (!bookRedP) {
            bookRedP = BaseBitmap.create("public_dot2");
            bookRedP.x = 150;
            bookRedP.y = 24;
            bookRedP.name = "bookRedP";
            this._bottomnodeContainer.addChild(bookRedP);
        }
        bookRedP.visible = this._servantInfoObj.isBookLvUpEnable();
        var advRedP = this._nodeContainer.getChildByName("advRedP");
        if (!advRedP) {
            advRedP = BaseBitmap.create("public_dot2");
            advRedP.x = this._levelupBtn.x + this._levelupBtn.width - 15;
            advRedP.y = this._levelupBtn.y - 5;
            advRedP.name = "advRedP";
            this._nodeContainer.addChild(advRedP);
        }
        advRedP.visible = this._servantInfoObj.isAdvanceEnable();
        var itemRedP = this._bottomnodeContainer.getChildByName("itemRedP");
        if (!itemRedP) {
            itemRedP = BaseBitmap.create("public_dot2");
            itemRedP.x = 450;
            itemRedP.y = 24;
            itemRedP.name = "itemRedP";
            this._bottomnodeContainer.addChild(itemRedP);
        }
        itemRedP.visible = Api.servantVoApi.isShowRedForItem();
        // aura
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        if (servantCfg.aura) {
            var auraRedP = this._bottomnodeContainer.getChildByName("auraRedP");
            if (!auraRedP) {
                auraRedP = BaseBitmap.create("public_dot2");
                auraRedP.x = 600;
                auraRedP.y = 24;
                auraRedP.name = "auraRedP";
                this._bottomnodeContainer.addChild(auraRedP);
            }
            auraRedP.visible = this._servantInfoObj.isShowRedForaura();
        }
    };
    ServantInfoView.prototype.changeCheckFlagStatus = function () {
        this._checkFlag.alpha = (this._checkFlag.alpha + 1) % 2;
        ServantInfoView.CALPHA = this._checkFlag.alpha;
        if (this._checkFlag.alpha == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
        }
        this.changeProgressText();
    };
    ServantInfoView.prototype.changeProgressText = function () {
        // this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
        var needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp);
        var cnKey = "servantInfo_levelupNeed";
        if (this._checkFlag.alpha == 1) {
            cnKey = "servantInfo_levelupNeed2";
            var curLv = this._servantInfoObj.level;
            for (var index = curLv; index < curLv + 9; index++) {
                var needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
                if (needNextLv) {
                    needGold += needNextLv;
                }
                else {
                    break;
                }
            }
        }
        // this._curLvNeedGold = needGold
        this._progressBar.setText(LanguageManager.getlocal(cnKey) + needGold + LanguageManager.getlocal("servantInfo_levelupNeedGold"));
    };
    ServantInfoView.prototype.tabBtnClickHandler = function (params) {
        for (var index = 0; index < this._bottomNodeList.length; index++) {
            this._bottomNodeList[index].visible = false;
        }
        this._bottomNodeList[params.index].visible = true;
    };
    ServantInfoView.prototype.getProStringWithProId = function (id) {
        if (!this._servantInfoObj) {
            return;
        }
        if (id == 1) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.level);
            // this._servantInfoObj.level +""; //LanguageManager.getlocal("servant_infoLv") +this._servantInfoObj.level ;
        }
        if (id == 3) {
            return LanguageManager.getlocal("servant_infoAttr") + App.StringUtil.changeIntToText(this._servantInfoObj.total);
        }
        if (id == 4) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.forceTotal); //LanguageManager.getlocal("servant_force",[String(this._servantInfoObj.attrVo.forceTotal)]) ;
        }
        if (id == 5) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.brainsTotal); //LanguageManager.getlocal("servant_inte",[String(this._servantInfoObj.attrVo.brainsTotal)]);
        }
        if (id == 6) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.politicsTotal);
            //LanguageManager.getlocal("servant_policy",[String(this._servantInfoObj.attrVo.politicsTotal)]);
        }
        if (id == 7) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.charmTotal); //LanguageManager.getlocal("servant_charm",[String(this._servantInfoObj.attrVo.charmTotal)]);
        }
        return "";
    };
    //升级之后刷新数据
    ServantInfoView.prototype.refreshInfoAfterUpdate = function (p) {
        Api.rookieVoApi.checkNextStep();
        if (this._servantInfoObj.isLvEnableForAdvance()) {
            this._levelupBtn.setText("servant_clvUpBtn");
        }
        else {
            this._levelupBtn.setText("servantInfoLevelup");
        }
        var nameTxt = this._nodeContainer.getChildByName("nameTxt");
        this._nodeContainer.addChild(nameTxt);
        if (this._servantInfoObj.clv > 0) {
            this._alvImg.setload("servant_alv_" + this._servantInfoObj.clv);
            this._alvImg.visible = true;
            if (!PlatformManager.checkIsTextHorizontal()) {
                nameTxt.y = this._alvImg.y + 90;
            }
        }
        else {
            if (!PlatformManager.checkIsTextHorizontal()) {
                nameTxt.y = this._alvImg.y + 60;
            }
            this._alvImg.visible = false;
        }
        this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
        this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level - 1];
        this.changeProgressText();
        var newPer = this._servantInfoObj.hasexp / this._curLvNeedGold;
        var oldPer = this._progressBar.getPercent();
        var deltaT = 500;
        if (this._oldLv < this._servantInfoObj.level) {
            var addLv = this._servantInfoObj.level - this._oldLv;
            egret.Tween.get(this._progressBar, { loop: false }).to({ percent: 1 }, (1 - oldPer) * deltaT).set({ percent: 0 }, 0).to({ percent: newPer }, deltaT * newPer);
            if (p.data.ret == true && p.data.data.data.lucky) {
                App.CommonUtil.showGodbless("servantLv");
            }
            this.showUpgradeEffect(addLv);
        }
        else {
            egret.Tween.get(this._progressBar, { loop: false }).to({ percent: newPer }, (newPer - oldPer) * deltaT);
        }
        this.changeLvBtnStatus();
        this.checkRedPoints();
        //功能解锁
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
    };
    ServantInfoView.prototype.changeLvBtnStatus = function () {
        if (this._servantInfoObj.isAdvanceEnable()) {
            App.DisplayUtil.changeToNormal(this._levelupBtn);
        }
        else {
            if (this._curLvNeedGold - this._servantInfoObj.hasexp > Api.playerVoApi.getPlayerGold() || this._servantInfoObj.isAtTopLv()) {
                App.DisplayUtil.changeToGray(this._levelupBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(this._levelupBtn);
            }
        }
    };
    ServantInfoView.prototype.refreshServantProTxt = function () {
        for (var index = 0; index < this._servantProCfg.length; index++) {
            var element = this._servantProCfg[index];
            var proTxt = this._proTxtList[index];
            if (index == 1) {
                proTxt.text = element.txt;
            }
            else {
                proTxt.text = this.getProStringWithProId(element.txtId);
            }
        }
        this.checkRedPoints();
    };
    //播放升级成功动画
    ServantInfoView.prototype.showUpgradeEffect = function (addLv) {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv", [String(addLv)]), TextFieldConst.FONTNAME_BOSS_SCORE);
        servant_upgrade_word.x = 240;
        servant_upgrade_word.y = 200;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 110;
        upgradeClip.y = 20;
        this._nodeContainer.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        this._nodeContainer.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 150 }, 800).to({ alpha: 0 }, 100);
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            tmpthis._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
            //字体刷新加个延时
            tmpthis.refreshServantProTxt();
            tmpthis._nodeContainer.removeChild(upgradeClip);
            upgradeClip = null;
            tmpthis._nodeContainer.removeChild(servant_upgrade_word);
            servant_upgrade_word = null;
            //右侧  levelup_lizi
            // let servant_upgrade_box = BaseLoadBitmap.create("servant_upgrade_box2")
            // servant_upgrade_box.setScale(2);
            // servant_upgrade_box.x = 405;
            // servant_upgrade_box.y = 35;
            // tmpthis._nodeContainer.addChildAt(servant_upgrade_box,8);
            // egret.Tween.get(servant_upgrade_box,{loop:false}).to({alpha:0},800);
            // let servant_upgrade_light = BaseLoadBitmap.create("servant_upgrade_light")
            // servant_upgrade_light.x = servant_upgrade_box.x;
            // servant_upgrade_light.y = 320
            // tmpthis._nodeContainer.addChild(servant_upgrade_light);
            // egret.Tween.get(servant_upgrade_light,{loop:false}).to({alpha:0,y:80},600);
            // let levelup_lizi = App.ParticleUtil.getParticle("levelup_lizi");
            // levelup_lizi.x = 500;
            // levelup_lizi.y = 250;
            // tmpthis._nodeContainer.addChild(levelup_lizi);
            // levelup_lizi.start();
            // egret.Tween.get(levelup_lizi,{loop:false}).to({alpha:1},900).to({alpha:0},300).wait(1200).call(function(){
            // if (tmpthis._nodeContainer){
            // tmpthis._nodeContainer.removeChild(servant_upgrade_box);
            // tmpthis._nodeContainer.removeChild(servant_upgrade_light);
            // tmpthis._nodeContainer.removeChild(levelup_lizi);
            // servant_upgrade_box = null;
            // servant_upgrade_light = null;
            // levelup_lizi = null;
            // }
            // });
        });
    };
    ServantInfoView.prototype.detailClickHandler = function () {
        if (Api.rookieVoApi.getIsGuiding()) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW, this._servantId);
    };
    ServantInfoView.prototype.levelupBtnClickHandler = function () {
        if (this._servantInfoObj.isLvEnableForAdvance()) {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTADVANCEPOPUPVIEW, this._servantId);
            /**
             * 打开提拔界面
             */
            return;
        }
        var newT = egret.getTimer();
        if (newT - this._lastUseTime < 800) {
            return;
        }
        this._lastUseTime = newT;
        if (this._servantInfoObj.isAtTopLv()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip1"));
            return;
        }
        if (Api.playerVoApi.getPlayerGold() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
            //需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
            return;
        }
        this._oldLv = this._servantInfoObj.level;
        if (this._checkFlag.alpha == 0) {
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT, { servantId: this._servantId });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN, { servantId: this._servantId });
        }
    };
    ServantInfoView.prototype.hide = function () {
        if (Api.rookieVoApi.isInGuiding) {
            Api.rookieVoApi.checkWaitingGuide();
            ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
        }
        _super.prototype.hide.call(this);
    };
    ServantInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_topresbg", "servant_probigbg", "servant_detailBtn",
            "servant_bottombg", "progress3", "progress3_bg",
            "servant_namebg", "servant_infobg",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "servant_mask",
            "servant_alv_namebg", "guide_hand",
            "servant_downbg",
            "servant_attribute1",
            "servant_attribute2",
            "servant_attribute3",
            "servant_attribute4",
            "servant_attributemap",
            "servant_levebg",
            "servant_speciality1",
            "servant_speciality2",
            "servant_speciality3",
            "servant_speciality4",
            "servant_speciality5",
            "servant_speciality6",
            "hold_dinner_box",
        ]);
    };
    ServantInfoView.prototype.showHand = function () {
        this._clickHand = BaseBitmap.create("guide_hand");
        if (!PlatformManager.hasSpcialCloseBtn()) {
            this._clickHand.skewY = 180;
        }
        this._clickHand.x = PlatformManager.hasSpcialCloseBtn() ? 57 : 620;
        this._clickHand.y = 50;
        this.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
    };
    ServantInfoView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.checkRedPoints, this);
        this._nodeContainer = null;
        this._goldNumTxt = null;
        this._servantId = "";
        this.param = null;
        this._leveupNeedTxt = null;
        this._servantInfoObj = null;
        this._proTxtList = null;
        this._servantProCfg = null;
        this._progressBar = null;
        this._checkFlag = null;
        this._bottomNodeList = [];
        this._bottomBg = null;
        this._levelupBtn = null;
        this._nameTxt = null;
        this._alvImg = null;
        this._oldLv = null;
        this._bottomnodeContainer = null;
        this._curLvNeedGold = null;
        this._lastUseTime = null;
        this._clickHand = null;
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        _super.prototype.dispose.call(this);
    };
    ServantInfoView.CALPHA = 0;
    return ServantInfoView;
}(CommonView));
__reflect(ServantInfoView.prototype, "ServantInfoView");

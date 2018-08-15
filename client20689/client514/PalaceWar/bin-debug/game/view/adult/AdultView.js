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
 * 媒婆
 * author dky
 * date 2017/10/28
 * @class AdultView
 */
var AdultView = (function (_super) {
    __extends(AdultView, _super);
    function AdultView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._childId = null;
        _this._childInfoObj = null;
        _this._proTxtList = null;
        _this._childProCfg = null;
        _this._curLevel = 0;
        _this._marryIndex = 0;
        _this._achRedDotSp = null;
        return _this;
    }
    AdultView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        Api.adultVoApi.getAdultMarryNum();
        if (Api.adultVoApi._marryList.length > 0) {
            this._marryData = Api.adultVoApi._marryList;
            this.playMarry();
        }
        if (Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "") {
            var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
            var msg = LanguageManager.getlocal("adultMarryMsg", [rewardStr]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "adultMarryRefuse",
                msg: msg,
                callback: null,
                handler: this
            });
        }
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, {});
        var topBg = BaseBitmap.create("public_bg6");
        topBg.y = -21;
        this.addChildToContainer(topBg);
        //孩子背景
        var childBg = BaseBitmap.create("adult_bg");
        childBg.x = 0;
        childBg.y = topBg.y + topBg.height + 0;
        this.addChildToContainer(childBg);
        this._childContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._childContainer);
        //已婚子嗣
        this._childContainer2 = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._childContainer2);
        if (Api.adultVoApi.getAdultNum() > 0) {
            //孩子属性容器
            this._child_wordbg = BaseBitmap.create("public_9_bg25");
            this._child_wordbg.visible = false;
            this._child_wordbg.x = 60;
            this._child_wordbg.y = 60;
            this._child_wordbg.width = 300;
            this._child_wordbg.height = 78;
            this._childContainer.addChild(this._child_wordbg);
            this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
            this._child_wordbgCor.x = 260;
            this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
            this._childContainer.addChild(this._child_wordbgCor);
            this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this._childWordsText.text = LanguageManager.getlocal("childIntimacyDesc");
            this._childWordsText.x = this._child_wordbg.x + 20;
            this._childWordsText.y = this._child_wordbg.y + 20;
            this._childWordsText.width = 280;
            this._childWordsText.height = 80;
            this._childContainer.addChild(this._childWordsText);
            this._child_Icon = BaseBitmap.create("");
            this._child_Icon.x = 40;
            this._child_Icon.y = this._child_wordbgCor.y - 10;
            this._childContainer.addChild(this._child_Icon);
            //子嗣
            this._proTxtList = [];
            this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
            this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
            // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
            this._motherText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
            this._motherText.x = 30;
            this._motherText.y = 5;
            this._childContainer.addChild(this._motherText);
            this._intimacyText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
            this._intimacyText.x = 200;
            this._intimacyText.y = 5;
            this._childContainer.addChild(this._intimacyText);
            this._intimacyDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this._intimacyDescText.text = LanguageManager.getlocal("childIntimacyDesc");
            this._intimacyDescText.x = GameConfig.stageWidth - this._intimacyDescText.width - 30;
            this._intimacyDescText.y = 5;
            this._childContainer.addChild(this._intimacyDescText);
            this._child_infobg = BaseBitmap.create("servant_probigbg");
            // this._child_infobg.width = 240;
            // this._child_infobg.height = 345;
            this._child_infobg.x = 375;
            this._child_infobg.y = this._child_wordbg.y + 70;
            this._childContainer.addChild(this._child_infobg);
            //子嗣属性
            this._attBg = BaseBitmap.create("public_9_probiginnerbg");
            this._attBg.width = 182;
            this._attBg.height = 190;
            this._attBg.x = this._child_infobg.x + this._child_infobg.width / 2 - this._attBg.width / 2;
            this._attBg.y = this._child_infobg.y + 50;
            this._childContainer.addChild(this._attBg);
            //子嗣名字
            this._childNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            this._childNameText.text = "";
            this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
            this._childNameText.y = this._child_infobg.y + 20;
            this._childContainer.addChild(this._childNameText);
            this._childNameText.addTouchTap(this.changeNameHandler, this, null);
            // this.addTouchTap(this.changeNameHandler,this);
            var proX = 410;
            var proY = this._attBg.y + 10;
            for (var index = 0; index < 6; index++) {
                var proTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xddd5c7);
                proTxt.x = proX;
                proTxt.y = proY;
                this._childContainer.addChild(proTxt);
                proY += 25;
                this._proTxtList.push(proTxt);
            }
            this._vigouTimeText = ComponentManager.getTextField("00:00:00", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            this._vigouTimeText.x = 410;
            this._vigouTimeText.y = this._child_infobg.y + this._child_infobg.height - 100;
            this._childContainer.addChild(this._vigouTimeText);
            this.tick();
        }
        //孩子栏位背景
        var childItemBg = BaseBitmap.create("servant_bottombg");
        // childItemBg.width = 626;
        childItemBg.height = GameConfig.stageHeigth - this.container.y - childBg.height - topBg.height - topBg.y;
        // childItemBg.height = 300 ;
        childItemBg.x = 0;
        childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height;
        // childItemBg.y = -15;
        this.addChildToContainer(childItemBg);
        var tabName = ["adultTab1", "adultTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 20;
        tabbarGroup.y = childItemBg.y + 24;
        this.addChildToContainer(tabbarGroup);
        //初始化孩子席位
        var adultList = Api.adultVoApi.getAdultVoList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 36, childItemBg.height - 120);
        this._scrollList = ComponentManager.getScrollList(AdultScrollItem, adultList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = childItemBg.x + childItemBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = childItemBg.y + 90;
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg"), TextFieldConst.COLOR_BLACK);
        this._goChildBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultEmptyBtnMsg", this.goChildBtnClick, this);
        this._goChildBtn.x = childItemBg.x + childItemBg.width / 2 - this._goChildBtn.width / 2;
        this._goChildBtn.y = childItemBg.y + childItemBg.height / 2 + 70;
        // this._goChildBtn .setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._goChildBtn);
        if (adultList.length <= 0) {
            this._goChildBtn.visible = true;
        }
        else {
            this._goChildBtn.visible = false;
        }
        //从其他界面点过来
        if (this.param && this.param.data.childId) {
            if (this.param.data.childId) {
                var chidlIndex = Api.adultVoApi.getAdultIndexVoById(this.param.data.childId);
                this._scrollList.setScrollTopByIndex(chidlIndex, 0);
                var childInfoVo = this._adultInfoVoList[chidlIndex];
                var id = childInfoVo.id;
                this._adultInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                // this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
            }
        }
        else {
            if (Api.adultVoApi.getAdultNum() > 0) {
                var childInfoVo = this._adultInfoVoList[0];
                var id = childInfoVo.id;
                this._adultInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                var chidlIndex = Api.adultVoApi.getAdultIndexVoById(id);
                // this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
            }
        }
        this._marryChild_wordbg = BaseBitmap.create("public_9_bg25");
        // this._marryChild_wordbg.visible = false;
        this._marryChild_wordbg.x = 160;
        this._marryChild_wordbg.y = 60;
        this._marryChild_wordbg.width = 300;
        this._marryChild_wordbg.height = 78;
        this._childContainer2.addChild(this._marryChild_wordbg);
        this._marryChild_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
        this._marryChild_wordbgCor.x = 300;
        this._marryChild_wordbgCor.y = this._marryChild_wordbg.y + this._marryChild_wordbg.height - 3;
        this._childContainer2.addChild(this._marryChild_wordbgCor);
        this._marryWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._marryWordsText.text = LanguageManager.getlocal("adultMarryWord1");
        this._marryWordsText.x = this._marryChild_wordbg.x + 20;
        this._marryWordsText.y = this._marryChild_wordbg.y + 20;
        this._marryWordsText.width = 280;
        this._marryWordsText.height = 80;
        this._childContainer2.addChild(this._marryWordsText);
        this._marryChild_Icon = BaseBitmap.create("");
        this._marryChild_Icon.x = 40;
        this._marryChild_Icon.y = this._marryChild_wordbgCor.y - 10;
        this._childContainer2.addChild(this._marryChild_Icon);
        this._marryChild_Icon2 = BaseBitmap.create("");
        this._marryChild_Icon2.x = 260;
        this._marryChild_Icon2.y = this._marryChild_wordbgCor.y - 10;
        this._childContainer2.addChild(this._marryChild_Icon2);
        // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
        this._otherNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        this._otherNameText.x = 30;
        this._otherNameText.y = 5;
        this._childContainer2.addChild(this._otherNameText);
        this._marryBuffText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
        this._marryBuffText.x = 230;
        this._marryBuffText.y = 5;
        this._childContainer2.addChild(this._marryBuffText);
        this._marryTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._marryTimeText.x = 430;
        this._marryTimeText.y = 5;
        this._childContainer2.addChild(this._marryTimeText);
        //初始化孩子席位
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, GameConfig.stageWidth - 36, childItemBg.height - 120);
        this._scrollList2 = ComponentManager.getScrollList(Adult2ScrollItem, adultMarryList, rect1);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.x = childItemBg.x + childItemBg.width / 2 - this._scrollList2.width / 2;
        this._scrollList2.y = childItemBg.y + 90;
        this._scrollList2.addTouchTap(this.clickItemHandler2, this);
        this._scrollList2.visible = false;
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg2"), TextFieldConst.COLOR_BLACK);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this.setSelect2(this._adultMarryInfoVo.id);
        }
        this._childContainer2.visible = false;
        this._scrollList2.visible = false;
        this._marryChild_Icon.anchorOffsetX = this._marryChild_Icon.width / 2;
        this._marryChild_Icon2.anchorOffsetX = this._marryChild_Icon2.width / 2;
        this._marryChild_Icon.x = this._marryChild_Icon.x + this._marryChild_Icon.width / 2;
        this._marryChild_Icon2.x = this._marryChild_Icon2.x + this._marryChild_Icon2.width / 2;
        //提亲请求
        var requestBtn = ComponentManager.getButton("btn_marry", "", this.requestBtnClick, this);
        requestBtn.x = 0;
        requestBtn.y = GameConfig.stageHeigth - requestBtn.height;
        // requestBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(requestBtn);
        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = requestBtn.x + requestBtn.width - this._achRedDotSp.width - 1;
        this._achRedDotSp.y = requestBtn.y - 2;
        this._achRedDotSp.visible = false;
        this.addChild(this._achRedDotSp);
        this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE, null);
    };
    AdultView.prototype.goChildBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, {});
        this.hide();
    };
    AdultView.prototype.requestBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTMARRYREQUESTVIEW, { confirmCallback: this.requestMarryCallback, confirmCallback2: this.checkRedPoint, handler: this });
    };
    AdultView.prototype.checkRedPoint = function (type) {
        if (type == 1) {
            this._achRedDotSp.visible = true;
        }
        else {
            this._achRedDotSp.visible = false;
        }
    };
    AdultView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            this._scrollList.visible = true;
            this._childContainer.visible = true;
            this._childContainer2.visible = false;
            this._scrollList2.visible = false;
            if (Api.adultVoApi.getAdultNum() > 0) {
                // this._scrollList2.visible = true;
                this._childContainer.visible = true;
            }
            else {
                this._childContainer.visible = false;
            }
            var adultInfoVoList = Api.adultVoApi.getAdultVoList();
            if (adultInfoVoList.length <= 0) {
                this._goChildBtn.visible = true;
            }
            else {
                this._goChildBtn.visible = false;
            }
        }
        else {
            this._childContainer.visible = false;
            this._scrollList.visible = false;
            this._goChildBtn.visible = false;
            if (Api.adultVoApi.getAdultMarryNum() > 0) {
                this._scrollList2.visible = true;
                this._childContainer2.visible = true;
            }
            this._scrollList2.visible = true;
        }
    };
    AdultView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
        if (this._adultInfoVoList) {
            var adultInfoVo = this._adultInfoVoList[index];
            if (adultInfoVo) {
                var id = adultInfoVo.id;
                this._adultInfoVo = adultInfoVo;
                this.updChildAttData(adultInfoVo);
                this.setSelect(id);
            }
        }
        this.tick();
    };
    AdultView.prototype.clickItemHandler2 = function (event) {
        var index = Number(event.data);
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._adultMarryInfoVo = adultMarryList[index];
        if (this._adultMarryInfoVo) {
            var id = this._adultMarryInfoVo.id;
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this.setSelect2(id);
            // ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: id,confirmCallback: null, handler: this });
        }
    };
    AdultView.prototype.tick = function () {
        if (Api.adultVoApi.getAdultNum() <= 0) {
            return;
        }
        if (this._vigouTimeText == null) {
            return;
        }
        var lastTime = 0;
        if (this._adultInfoVo.pro) {
            lastTime = this._adultInfoVo.pro[0] - GameData.serverTime;
        }
        if (lastTime > 0) {
            this._vigouTimeText.text = LanguageManager.getlocal("adultMarryTime") + App.DateUtil.getFormatBySecond(lastTime, 1);
            this._vigouTimeText.visible = true;
        }
        else {
            this._vigouTimeText.visible = false;
        }
    };
    //扩展子嗣栏位回调
    AdultView.prototype.addChildPos = function () {
        this.request(NetRequestConst.REQUEST_CHILD_ADDPOSNUM, null);
    };
    //刷新选中状态
    AdultView.prototype.setSelect = function (childId) {
        var childIndex = Api.adultVoApi.getAdultIndexVoById(childId);
        if (this._adultScrollItem) {
            if (this._adultScrollItem.getChildByName("select")) {
                this._adultScrollItem.removeChild(this._adultScrollItem.getChildByName("select"));
                var baseBitmap = this._adultScrollItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._adultScrollItem = this._scrollList.getItemByIndex(childIndex);
        var bg2Index = this._adultScrollItem.getChildIndex(this._adultScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("public_9_bg29");
        itemBg2.width = this._adultScrollItem.width - 75;
        itemBg2.height = 48;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = this._adultScrollItem.width / 2 - itemBg2.width / 2 + 20;
        itemBg2.y = this._adultScrollItem.height / 2 - itemBg2.height / 2;
        itemBg2.name = "select";
        this._adultScrollItem.addChildAt(itemBg2, bg2Index + 1);
    };
    //刷新选中状态
    AdultView.prototype.setSelect2 = function (childId) {
        var childIndex = Api.adultVoApi.getAdultMarryIndexVoById(childId);
        if (this._adult2ScrollItem) {
            if (this._adult2ScrollItem.getChildByName("select2")) {
                this._adult2ScrollItem.removeChild(this._adult2ScrollItem.getChildByName("select2"));
                var baseBitmap = this._adult2ScrollItem.getChildByName("select2");
                baseBitmap = null;
            }
        }
        this._adult2ScrollItem = this._scrollList2.getItemByIndex(childIndex);
        var bg2Index = this._adult2ScrollItem.getChildIndex(this._adult2ScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("public_9_bg29");
        itemBg2.width = this._adult2ScrollItem.width - 36;
        itemBg2.height = 97;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = 18;
        itemBg2.y = 8;
        itemBg2.name = "select2";
        this._adult2ScrollItem.addChildAt(itemBg2, bg2Index + 1);
    };
    //刷新子嗣数据
    AdultView.prototype.updChildAttData = function (childInfoVo) {
        if (childInfoVo == null) {
            return;
        }
        this._childProCfg = [
            {
                txt: this.getProStringWithProId(1)
            },
            {
                txt: this.getProStringWithProId(2)
            },
            {
                txt: this.getProStringWithProId(3)
            },
            {
                txt: this.getProStringWithProId(4)
            },
            {
                txt: this.getProStringWithProId(5)
            },
            {
                txt: this.getProStringWithProId(6)
            },
        ];
        this._child_Icon.texture = ResourceManager.getRes(Api.adultVoApi.getAdultPic(childInfoVo.id));
        var childCfg1 = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        if (childInfoVo.level == childCfg1.lv) {
            this._child_wordbg.visible = false;
            this._child_wordbgCor.visible = false;
            this._childWordsText.visible = false;
        }
        else {
            this._childWordsText.text = Api.adultVoApi.getAdultWord(childInfoVo.id);
            this._child_wordbg.visible = true;
            this._child_wordbgCor.visible = true;
            this._childWordsText.visible = true;
        }
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childInfoVo.motherId);
        this._motherText.text = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        this._intimacyText.text = LanguageManager.getlocal("childIntimacy", [wifeInfoVo.intimacy.toString()]);
        var childName = childInfoVo.name;
        if (childName == "") {
            childName = LanguageManager.getlocal("childNeedName");
        }
        else {
            childName = "<font u ='true'>" + childInfoVo.name + "</font>";
        }
        this._childNameText.text = childName;
        this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
        this._childNameText.y = this._child_infobg.y + 20;
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var levelStr = LanguageManager.getlocal("servant_infoLv") + childInfoVo.level + "/" + childCfg.lv;
        if (childInfoVo.level >= childCfg.lv) {
            levelStr = LanguageManager.getlocal("child_levelMax");
        }
        for (var index = 0; index < this._childProCfg.length; index++) {
            var element = this._childProCfg[index];
            var proTxt = this._proTxtList[index];
            proTxt.text = element.txt;
        }
        //刷新按钮
        if (Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)) {
            //取消提亲
            if (this._childUpdBtn) {
                this._childUpdBtn.visible = false;
            }
            if (this._childNameBtn) {
                this._childNameBtn.visible = true;
            }
            else {
                this._childNameBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "adultCancelMarry", this.nameBtnClickHandler, this);
                this._childNameBtn.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameBtn.width / 2;
                this._childNameBtn.y = this._child_infobg.y + this._child_infobg.height - 65;
                this._childNameBtn.setColor(TextFieldConst.COLOR_BLACK);
                this._childContainer.addChild(this._childNameBtn);
            }
        }
        else {
            var btnStr = "adultMarry";
            if (this._childNameBtn) {
                this._childNameBtn.visible = false;
            }
            if (this._childUpdBtn) {
                this._childUpdBtn.visible = true;
            }
            else {
                //培养按钮
                this._childUpdBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, btnStr, this.updBtnClickHandler, this);
                this._childUpdBtn.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childUpdBtn.width / 2;
                this._childUpdBtn.y = this._child_infobg.y + this._child_infobg.height - 65;
                this._childUpdBtn.setColor(TextFieldConst.COLOR_BLACK);
                this._childContainer.addChild(this._childUpdBtn);
            }
            this._childUpdBtn.setText(btnStr);
        }
    };
    //刷新已婚子嗣数据
    AdultView.prototype.updMarryChildAttData = function (adultMarryInfo) {
        if (Api.adultVoApi.getAdultMarryNum() <= 0) {
            this._childContainer2.visible = false;
            return;
        }
        this._childContainer2.visible = true;
        this._otherNameText.text = LanguageManager.getlocal("adultOtherName") + adultMarryInfo.funame;
        this._marryBuffText.text = LanguageManager.getlocal("adultMarryBuff") + adultMarryInfo.ftotal;
        this._marryTimeText.text = App.DateUtil.getFormatBySecond(adultMarryInfo.mts, 2);
        var myIcon = "adult_boy";
        var otherIcon = "adult_girl";
        if (adultMarryInfo.sex == 2) {
            myIcon = "adult_girl";
            otherIcon = "adult_boy";
            this._marryChild_Icon.skewY = 180;
            this._marryChild_Icon2.skewY = 180;
        }
        else {
            this._marryChild_Icon.skewY = 0;
            this._marryChild_Icon2.skewY = 0;
        }
        this._marryChild_Icon.texture = ResourceManager.getRes(myIcon);
        this._marryChild_Icon2.texture = ResourceManager.getRes(otherIcon);
    };
    AdultView.prototype.changeNameHandler = function () {
        if (this._adultInfoVo.name != "") {
            ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 3, childId: this._adultInfoVo.id, confirmCallback: this.reNameCallBack, handler: this });
        }
    };
    //取消联姻
    AdultView.prototype.nameBtnClickHandler = function () {
        var rewardStr = "";
        if (this._adultInfoVo.pro[1] == 1) {
            rewardStr = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needGem * 0.8 + LanguageManager.getlocal("gemName");
        }
        else if (this._adultInfoVo.pro[1] == 2) {
            var costItemId = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needItem;
            var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            var itemListCfg = Config.ItemCfg.getItemCfgById;
            var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
            rewardStr = itemCfg.name;
        }
        // let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
        var msg = LanguageManager.getlocal("adultMarryCancalMsg", [rewardStr]);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "adultCancelMarry",
            msg: msg,
            callback: this.doCancel,
            handler: this,
            needCancel: true
        });
    };
    AdultView.prototype.doCancel = function () {
        this.request(NetRequestConst.REQUEST_RADULT_CANCELPROPOSE, { childId: this._adultInfoVo.id });
    };
    //起名字回调
    AdultView.prototype.reNameCallBack = function () {
        this.refreshItem();
        this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
        this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
        this.updChildAttData(this._adultInfoVo);
    };
    //恢复活力
    AdultView.prototype.useItemConfirmCallbackHandler = function () {
        this.request(NetRequestConst.REQUEST_CHILD_RECOVER, { childId: this._adultInfoVo.id });
    };
    AdultView.prototype.updBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ADULTMARRYVIEW, { childId: this._adultInfoVo.id, confirmCallback: this.reNameCallBack, confirmCallback2: this.requestMarryCallback, handler: this });
        // this.request(NetRequestConst.REQUEST_CHILD_TRAIN, { childId: this._adultInfoVo.id });
    };
    AdultView.prototype.doGuide = function () {
        this.updBtnClickHandler();
    };
    AdultView.prototype.requestMarryCallback = function () {
        var adultList = Api.adultVoApi.getAdultVoList();
        this._scrollList.refreshData(adultList);
        if (Api.adultVoApi.getAdultNum() > 0) {
            this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
            this.updChildAttData(this._adultInfoVo);
            this._childContainer.visible = true;
            this.setSelect(this._adultInfoVo.id);
        }
        else {
            this._childContainer.visible = false;
        }
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._scrollList2.refreshData(adultMarryList);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this._childContainer2.visible = false;
            this.setSelect2(this._adultMarryInfoVo.id);
            // this._childContainer.visible = true;
        }
        else {
            // this._childContainer2.visible = false;
        }
    };
    //请求回调
    AdultView.prototype.receiveData = function (data) {
        if (!data.data.data) {
            return;
        }
        if (this._adultInfoVo) {
            this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_RADULT_CANCELPROPOSE) {
            this.updChildAttData(this._adultInfoVo);
            this.refreshItem();
            if (data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_RECOVER) {
            this.updChildAttData(this._adultInfoVo);
            this.refreshItem();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETADULTINFO) {
            // this._marryData = ["c1","c16","c13"];
            // this.playMarry();		
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETPROPOSEE) {
            if (data.data.data.minfo) {
                this._achRedDotSp.visible = true;
            }
            else {
                this._achRedDotSp.visible = false;
            }
        }
    };
    AdultView.prototype.playMarry = function () {
        if (this._marryIndex <= this._marryData.length - 1) {
            var childId = this._marryData[this._marryIndex];
            ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId, confirmCallback: this.playMarry, handler: this });
            this._marryIndex++;
        }
    };
    //结婚成功刷新列表
    AdultView.prototype.doRefresh = function () {
        var adultList = Api.adultVoApi.getAdultVoList();
        this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
        this.updChildAttData(this._adultInfoVo);
        this._scrollList.refreshData(adultList);
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._scrollList2.refreshData(adultMarryList);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
        }
        this._childContainer2.visible = false;
        this._scrollList2.visible = false;
    };
    //刷新列表属性
    AdultView.prototype.refreshItem = function () {
        if (this._adultInfoVo == null) {
            return;
        }
        var index = Api.adultVoApi.getAdultIndexVoById(this._adultInfoVo.id);
        var childScrollItem = this._scrollList.getItemByIndex(index);
        childScrollItem.refreshData(index);
    };
    AdultView.prototype.getProStringWithProId = function (id) {
        if (id == 1) {
            // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
            // let levelStr = LanguageManager.getlocal("servant_infoLv") + this._adultInfoVo.level + "/" + childCfg.lv
            var qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._adultInfoVo.aquality);
            return qualityStr;
        }
        if (id == 2) {
            return LanguageManager.getlocal("servant_infoAttr") + this._adultInfoVo.attrVo.attTotal;
        }
        if (id == 3) {
            return LanguageManager.getlocal("servant_force", [this._adultInfoVo.attrVo.forceTotal.toString()]);
        }
        if (id == 4) {
            return LanguageManager.getlocal("servant_inte", [this._adultInfoVo.attrVo.brainsTotal.toString()]);
        }
        if (id == 5) {
            return LanguageManager.getlocal("servant_policy", [this._adultInfoVo.attrVo.politicsTotal.toString()]);
        }
        if (id == 6) {
            return LanguageManager.getlocal("servant_charm", [this._adultInfoVo.attrVo.charmTotal.toString()]);
        }
        return "";
    };
    AdultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "childview_mask", "childview_pic_1", "servant_bottombg",
            "progress3", "progress3_bg", "servant_probigbg",
            "childview_boyicon", "childview_girlicon"
        ]);
    };
    AdultView.prototype.getRuleInfo = function () {
        return "adult_description";
    };
    AdultView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        // 已婚滑动列表
        this._scrollList2 = null;
        // 列表
        this._adultInfoVoList = null;
        //孩子母亲
        this._motherText = null;
        //亲密度
        this._intimacyText = null;
        //亲密度描述
        this._intimacyDescText = null;
        //孩子说的话
        this._childWordsText = null;
        //孩m名字
        this._childNameText = null;
        //孩子图片
        this._child_Icon = null;
        //孩子vo
        this._adultInfoVo = null;
        //联姻按钮
        this._childUpdBtn = null;
        //取消联姻按钮
        this._childNameBtn = null;
        //孩子vo
        this._adultMarryInfoVo = null;
        //亲家名字
        this._otherNameText = null;
        //联姻加成
        this._marryBuffText = null;
        //联姻时间
        this._marryTimeText = null;
        //孩子说的话
        this._marryWordsText = null;
        //孩子图片
        this._marryChild_Icon = null;
        //孩子配偶图片
        this._marryChild_Icon2 = null;
        this._curTabIdx = 0;
        // this._nameBg: BaseBitmap;
        this._attBg = null;
        this._child_infobg = null;
        //活力恢复时间
        this._vigouTimeText = null;
        this._childContainer = null;
        //已婚子嗣
        this._childContainer2 = null;
        this._childId = null;
        this._childInfoObj = null;
        this._proTxtList = null;
        this._childProCfg = null;
        this._curLevel = null;
        this._child_wordbg = null;
        this._child_wordbgCor = null;
        this._marryChild_wordbg = null;
        this._marryChild_wordbgCor = null;
        this._adultScrollItem = null;
        this._adult2ScrollItem = null;
        this._achRedDotSp = null;
        if (this._childNameText) {
            this._childNameText.removeTouchTap();
        }
        this._marryIndex = 0;
        this._marryData = null;
        this._goChildBtn = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        _super.prototype.dispose.call(this);
    };
    return AdultView;
}(CommonView));
__reflect(AdultView.prototype, "AdultView");

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
var ItemViewTab3 = (function (_super) {
    __extends(ItemViewTab3, _super);
    function ItemViewTab3() {
        var _this = _super.call(this) || this;
        // 当前选中的索引
        _this._selectedIndex = null;
        // 当前选中的itemvo
        _this._selectedItemInfoVo = null;
        // 道具选中框
        _this._selectedBg = null;
        // 当前选中道具名称文本
        _this._selectedNameTextF = null;
        // 道具icon
        _this._selectedIcon = null;
        // 道具iconbg
        _this._selectedIconBg = null;
        // 描述文本
        _this._selectedDescTextF = null;
        // 掉落文本
        _this._selectedDropTextF = null;
        // 使用按钮
        _this._useBtn = null;
        _this._itemInfoVoList = null;
        _this._errorTF = null;
        _this.initView();
        return _this;
    }
    ItemViewTab3.prototype.getListType = function () {
        return 3;
    };
    ItemViewTab3.prototype.getNetRequestConst = function () {
        return NetRequestConst.REQUEST_ITEM_TITLE;
    };
    ItemViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        this._itemInfoVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
        this._selectedIndex = 0;
        this._selectedItemInfoVo = this._itemInfoVoList[0];
        var bg1 = BaseBitmap.create("public_9_bg23");
        bg1.width = GameConfig.stageWidth - 20;
        bg1.x = 10;
        bg1.height = GameConfig.stageHeigth - 445;
        bg1.name = "bg1";
        this.addChild(bg1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640 - 30, bg1.height - 30);
        this._scrollList = ComponentManager.getScrollList(ItemScrollItem, this._itemInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(20, bg1.y + 10);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._errorTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._errorTF.x = bg1.x + bg1.width / 2 - this._errorTF.width / 2;
        this._errorTF.y = bg1.y + bg1.height / 2 - this._errorTF.height / 2;
        this.addChild(this._errorTF);
        this.initButtomContainer(bg1);
    };
    ItemViewTab3.prototype.initButtomContainer = function (bg1) {
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.y = bg1.y + bg1.height + 8;
        this.addChild(this._buttomContainer);
        this._bottomBg = BaseBitmap.create("public_9_bg22");
        this._bottomBg.height = GameConfig.stageHeigth - bg1.height - 160;
        this._bottomBg.y = 0;
        this._buttomContainer.addChild(this._bottomBg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = this._bottomBg.y + 35;
        this._buttomContainer.addChild(line1);
        this._selectedNameTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        this._buttomContainer.addChild(this._selectedNameTextF);
        this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
        this._selectedIconBg.x = 45;
        this._selectedIconBg.y = this._bottomBg.y + 75;
        this._buttomContainer.addChild(this._selectedIconBg);
        this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
        this._selectedIcon.x = 50;
        this._selectedIcon.y = this._bottomBg.y + 78;
        this._buttomContainer.addChild(this._selectedIcon);
        this._selectedIcon.visible = false;
        var bg5 = BaseBitmap.create("public_9_bg21");
        bg5.y = this._bottomBg.y + 70;
        bg5.x = 180;
        bg5.width = 430;
        bg5.height = 123;
        this._buttomContainer.addChild(bg5);
        this._selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._selectedDescTextF.x = bg5.x + 10;
        // this._selectedDescTextF.stroke = 2;
        this._selectedDescTextF.width = bg5.width - 40;
        this._selectedDescTextF.y = bg5.y + 10;
        this._buttomContainer.addChild(this._selectedDescTextF);
        this._selectedDropTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._selectedDropTextF.x = bg5.x + 10;
        // this._selectedDropTextF.stroke = 2;
        this._selectedDropTextF.width = bg5.width - 40;
        this._selectedDropTextF.y = bg5.y + 70;
        this._buttomContainer.addChild(this._selectedDropTextF);
        this._useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.clickUseBtnHandler, this);
        this._useBtn.x = GameConfig.stageWidth / 2 - this._useBtn.width / 2;
        this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 175;
        this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(this._useBtn);
        this._useBtn.visible = false;
        if (Api.playerVoApi.getTitleid() != 0) {
            var titleIndex = Api.itemVoApi.getCurTitleIndex();
            this._curChooseScrollItem = this._scrollList.getItemByIndex(titleIndex);
        }
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.updateItem(index);
    };
    ItemViewTab3.prototype.refreshWhenSwitchBack = function () {
        this._itemInfoVoList = Api.itemVoApi.getTitleVoListByType(this.getListType());
        this._scrollList.refreshData(this._itemInfoVoList);
        this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        this._selectedBg = null;
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.refresh = function () {
        this.refreshWhenSwitchBack();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
    };
    // 刷新数据
    ItemViewTab3.prototype.updateItem = function (index) {
        this._buttomContainer.visible = true;
        if (this._selectedBg == null) {
            this._selectedBg = BaseBitmap.create("itembg_selected");
            this._selectedBg.x = 4;
            this._selectedBg.y = 4;
        }
        if (this._selectedIndex && this._selectedIndex == index && this._selectedItemInfoVo) {
            if (this._selectedBg) {
                if (this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)) {
                    this._curItemScrollItem.addChild(this._selectedBg);
                }
            }
        }
        this._selectedIndex = index;
        this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        this._curItemScrollItem = this._scrollList.getItemByIndex(this._selectedIndex);
        if (this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)) {
            this._curItemScrollItem.addChild(this._selectedBg);
        }
        this._selectedNameTextF.text = this._selectedItemInfoVo.name;
        this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
        this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
        // this._useBtn.visible = (this._selectedItemInfoVo.isShowUseBtn && this._selectedItemInfoVo.num > 0 && this._selectedItemInfoVo.id != Api.playerVoApi.getTitleid());
        this._useBtn.visible = (this._selectedItemInfoVo.num == 0 || this._selectedItemInfoVo.num == 1);
        //  if(this._selectedItemInfoVo.id == 4001){
        // 	this._useBtn.visible = false;
        //  }
        if (this._selectedItemInfoVo.num == 0) {
            this._useBtn.setText("useBtn");
        }
        else if (this._selectedItemInfoVo.num == 1) {
            this._useBtn.setText("titleEquip");
        }
        this._selectedIconBg.visible = true;
        this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
        this._selectedIcon.visible = true;
        this._selectedIcon.setload(this._selectedItemInfoVo.icon);
        this._selectedNameTextF.x = this._bottomBg.width / 2 - this._selectedNameTextF.width / 2;
        this._selectedNameTextF.y = this._bottomBg.y + 30;
    };
    // 点击使用按钮
    ItemViewTab3.prototype.clickUseBtnHandler = function (param) {
        if (this._selectedItemInfoVo) {
            this.sendRequest(this._selectedItemInfoVo);
        }
    };
    // 数据请求
    ItemViewTab3.prototype.sendRequest = function (itemVo) {
        var data = { "titleid": itemVo.id, "status": itemVo.num + 1 };
        NetManager.request(this.getNetRequestConst(), data);
    };
    // 刷新道具数量
    ItemViewTab3.prototype.useCallback = function (event) {
        var rdata = event.data.data.data;
        if (rdata && rdata.rewards) {
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        if (Api.playerVoApi.getTitleid() != 0) {
            if (this._curChooseScrollItem) {
                this._curChooseScrollItem.update();
            }
            var titleIndex = Api.itemVoApi.getCurTitleIndex();
            this._curChooseScrollItem = this._scrollList.getItemByIndex(titleIndex);
        }
        if (this._selectedItemInfoVo.num >= 0) {
            if (this._selectedItemInfoVo.num == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            }
            else if (this._selectedItemInfoVo.num == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("equipSuccess"));
            }
            if (this._curItemScrollItem) {
                this._curItemScrollItem.update();
            }
        }
        else {
            this._itemInfoVoList = Api.itemVoApi.getTitleVoListByType(1);
            if (this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg)) {
                this._curItemScrollItem.removeChild(this._selectedBg);
            }
            this._scrollList.refreshData(this._itemInfoVoList);
            this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
        }
        this.updateItem(this._selectedIndex);
    };
    ItemViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refresh, this);
        this._selectedIndex = null;
        if (this._selectedItemInfoVo) {
            this._selectedItemInfoVo = null;
        }
        if (this._selectedBg) {
            if (this._selectedBg.parent && this._selectedBg.parent.contains(this._selectedBg)) {
                this._selectedBg.parent.removeChild(this._selectedBg);
            }
            BaseBitmap.release(this._selectedBg);
            this._selectedBg = null;
        }
        if (this._selectedNameTextF) {
            this._buttomContainer.removeChild(this._selectedNameTextF);
            this._selectedNameTextF.dispose();
            this._selectedNameTextF = null;
        }
        if (this._selectedIcon) {
            this._buttomContainer.removeChild(this._selectedIcon);
            BaseBitmap.release(this._selectedIcon);
            this._selectedIcon = null;
        }
        if (this._selectedIconBg) {
            this._buttomContainer.removeChild(this._selectedIconBg);
            BaseBitmap.release(this._selectedIconBg);
            this._selectedIconBg = null;
        }
        if (this._selectedDescTextF) {
            this._buttomContainer.removeChild(this._selectedDescTextF);
            this._selectedDescTextF.dispose();
            this._selectedDescTextF = null;
        }
        if (this._selectedDropTextF) {
            this._buttomContainer.removeChild(this._selectedDropTextF);
            this._selectedDropTextF.dispose();
            this._selectedDropTextF = null;
        }
        if (this._useBtn) {
            this.removeChild(this._useBtn);
            this._useBtn.dispose();
            this._useBtn = null;
        }
        if (this._curItemScrollItem) {
            this._curItemScrollItem = null;
        }
        if (this._scrollList) {
            this.removeChild(this._scrollList);
            this._scrollList.dispose();
            this._scrollList = null;
        }
        if (this._errorTF) {
            this.removeChild(this._errorTF);
            this._errorTF.dispose();
            this._errorTF = null;
        }
        if (this._buttomContainer) {
            this.removeChild(this._buttomContainer);
            this._buttomContainer.dispose();
            this._buttomContainer = null;
        }
        this._itemInfoVoList = null;
        this._curChooseScrollItem = null;
        _super.prototype.dispose.call(this);
    };
    return ItemViewTab3;
}(CommonViewTab));
__reflect(ItemViewTab3.prototype, "ItemViewTab3");

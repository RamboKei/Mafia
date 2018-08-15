/**
 * 门客
 * author yanyuling
 * date 2017/9/25
 * @class ItemView
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
var ServantView = (function (_super) {
    __extends(ServantView, _super);
    function ServantView() {
        var _this = _super.call(this) || this;
        _this._lastDropIdx = 1;
        _this._scrollList = null;
        return _this;
    }
    ServantView.prototype.initView = function () {
        this._dropBtnList = [];
        this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.y = -20;
        this.addChildToContainer(this._nodeContainer);
        this._lastDropIdx = Api.otherInfoVoApi.getServantSortId();
        var topBg = BaseBitmap.create("public_bg6");
        topBg.y = -20;
        this._nodeContainer.addChild(topBg);
        //门客滚顶区域
        var scroY = topBg.height - topBg.y;
        var innerbg = BaseBitmap.create("public_9_bg24");
        innerbg.width = GameConfig.stageWidth - 10;
        innerbg.height = GameConfig.stageHeigth - scroY - 80;
        innerbg.x = 5;
        innerbg.y = scroY - 35;
        this._nodeContainer.addChild(innerbg);
        var servantNumBg = BaseBitmap.create("servant_topnumbg");
        servantNumBg.x = 20;
        servantNumBg.y = topBg.y + topBg.height / 2 - servantNumBg.height / 2;
        this._nodeContainer.addChild(servantNumBg);
        var servantNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        servantNumTxt.textColor = TextFieldConst.COLOR_WHITE;
        servantNumTxt.size = 24;
        servantNumTxt.text = LanguageManager.getlocal("servant_count") + Api.servantVoApi.getServantCount();
        servantNumTxt.x = servantNumBg.x + servantNumBg.width / 2 - servantNumTxt.width / 2;
        servantNumTxt.y = topBg.y + topBg.height / 2 - servantNumTxt.height / 2;
        this._nodeContainer.addChild(servantNumTxt);
        this._dropDownBtn = ComponentManager.getButton("servant_dropBtn", "", this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 20;
        this._dropDownBtn.y = servantNumTxt.y + servantNumTxt.height / 2 - this._dropDownBtn.height / 2;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this._nodeContainer.addChild(this._dropDownBtn);
        this._dropDownBtn.setText("servant_dropTxt" + this._lastDropIdx);
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("servant_dropIcon");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 10;
        this._nodeContainer.addChild(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        var dropCfg = [
            // "servant_dropTxt1","servant_dropTxt2","servant_dropTxt3"
            "servant_dropTxt1", "servant_dropTxt2", "servant_dropTxt3", "servant_dropTxt4"
        ];
        for (var index = 1; index <= dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("servant_dropBtn", "", this.dropDownBtnClickHandler, this, [index]);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = tmpBtn.height * (index - 1);
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(dropCfg[index - 1]);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - scroY - 100);
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(this._lastDropIdx);
        this._scrollList = ComponentManager.getScrollList(ServantScrollItem, keys, rect);
        this._scrollList.y = scroY - 25;
        this._nodeContainer.addChild(this._scrollList);
        this._nodeContainer.addChild(this._dropDownContainer);
        Api.rookieVoApi.checkNextStep();
    };
    ServantView.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText("servant_dropTxt" + btnIdx);
            this._lastDropIdx = btnIdx;
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        //排序数据，刷新列表
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
        this._scrollList.refreshData(keys);
    };
    ServantView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_namebg", "servant_dropBtn", "servant_dropBtn_down", "servant_dropIcon", "servant_namebg",
            "servant_star",
            "servant_cardbg_selected", "servant_topnumbg",
            "servant_lvbg", "servant_starbg"
        ]);
    };
    ServantView.prototype.hide = function () {
        if (this._lastDropIdx != Api.otherInfoVoApi.getServantSortId()) {
            NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT, { sortId: this._lastDropIdx });
        }
        _super.prototype.hide.call(this);
    };
    ServantView.prototype.getRuleInfo = function () {
        return "servant_description";
    };
    ServantView.prototype.dispose = function () {
        // this._nodeContainer.removeChildren();
        // this._nodeContainer.dispose()
        // this._dropDownContainer.removeChildren();
        // this._dropDownContainer.dispose()
        this._nodeContainer = null;
        this._dropDownContainer = null;
        this._scrollList = null;
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropBtnList = null;
        this._lastDropIdx = 1;
        _super.prototype.dispose.call(this);
    };
    ServantView.DROPBTN_COLOR1 = 0xfffcd8;
    ServantView.DROPBTN_COLOR2 = 0x99a3b4;
    return ServantView;
}(CommonView));
__reflect(ServantView.prototype, "ServantView");

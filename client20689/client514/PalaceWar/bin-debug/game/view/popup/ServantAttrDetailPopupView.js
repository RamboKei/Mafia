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
 * 门客属性详情
 * author yanyuling
 * date 2017/9/27
 * @class ServantAttrDetailPopupView
 */
var ServantAttrDetailPopupView = (function (_super) {
    __extends(ServantAttrDetailPopupView, _super);
    function ServantAttrDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfoObj = null;
        return _this;
    }
    ServantAttrDetailPopupView.prototype.initView = function () {
        this._servantId = this.param.data;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._servantInfoObj = servantInfoObj;
        var ofy = 51;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 625;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy;
        this._nodeContainer.addChild(bg);
        var topBg = BaseBitmap.create("public_9_bg3");
        topBg.width = 272;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 65 - ofy;
        this._nodeContainer.addChild(topBg);
        var totalProTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        totalProTxt.text = LanguageManager.getlocal("servant_attrComplex") + servantInfoObj.total;
        totalProTxt.x = topBg.x + topBg.width / 2 - totalProTxt.width / 2;
        totalProTxt.y = topBg.y + topBg.height / 2 - totalProTxt.height / 2;
        this._nodeContainer.addChild(totalProTxt);
        var attrCfg = [
            {
                txt1: LanguageManager.getlocal("playerview_force") + servantInfoObj.attrVo.forceTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.forceAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.forceAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.forceAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.forceAdd_4,
            },
            {
                txt1: LanguageManager.getlocal("playerview_inte") + servantInfoObj.attrVo.brainsTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.brainsAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.brainsAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.brainsAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.brainsAdd_4,
            },
            {
                txt1: LanguageManager.getlocal("playerview_policy") + servantInfoObj.attrVo.politicsTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.politicsAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.politicsAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.politicsAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.politicsAdd_4,
            },
            {
                txt1: LanguageManager.getlocal("playerview_charm") + servantInfoObj.attrVo.charmTotal,
                txt1Color: TextFieldConst.COLOR_WARN_YELLOW,
                txt2: LanguageManager.getlocal("servantAttr_add1") + servantInfoObj.attrVo.charmAdd_1,
                txt2Color: TextFieldConst.COLOR_BLACK,
                txt3: LanguageManager.getlocal("servantAttr_add2") + servantInfoObj.attrVo.charmAdd_2,
                txt4: LanguageManager.getlocal("servantAttr_add3") + servantInfoObj.attrVo.charmAdd_3,
                txt5: LanguageManager.getlocal("servantAttr_add4") + servantInfoObj.attrVo.charmAdd_4,
            },
        ];
        var attrPoxY = 135 - ofy;
        for (var index = 0; index < attrCfg.length; index++) {
            var element = attrCfg[index];
            var attrTxt1 = ComponentManager.getTextField("", 18);
            attrTxt1.text = element.txt1;
            attrTxt1.textColor = element.txt1Color;
            attrTxt1.x = 60;
            attrTxt1.y = attrPoxY;
            this._nodeContainer.addChild(attrTxt1);
            var attrTxt2 = ComponentManager.getTextField("", 18);
            attrTxt2.text = element.txt2;
            attrTxt2.textColor = element.txt2Color;
            attrTxt2.x = attrTxt1.x;
            attrTxt2.y = attrPoxY + 27;
            this._nodeContainer.addChild(attrTxt2);
            var attrTxt3 = ComponentManager.getTextField("", 18);
            attrTxt3.text = element.txt3;
            attrTxt3.textColor = element.txt2Color;
            attrTxt3.x = attrTxt2.x + 250;
            attrTxt3.y = attrTxt2.y;
            this._nodeContainer.addChild(attrTxt3);
            var attrTxt4 = ComponentManager.getTextField("", 18);
            attrTxt4.text = element.txt4;
            attrTxt4.textColor = element.txt2Color;
            attrTxt4.x = attrTxt1.x;
            attrTxt4.y = attrTxt2.y + 27;
            this._nodeContainer.addChild(attrTxt4);
            var attrTxt5 = ComponentManager.getTextField("", 18);
            attrTxt5.text = element.txt5;
            attrTxt5.textColor = element.txt2Color;
            attrTxt5.x = attrTxt3.x;
            attrTxt5.y = attrTxt4.y;
            this._nodeContainer.addChild(attrTxt5);
            var lineImg = BaseBitmap.create("public_line1");
            lineImg.x = 30;
            lineImg.y = attrTxt5.y + 27;
            this._nodeContainer.addChild(lineImg);
            attrPoxY += 100;
        }
        var descTxt = ComponentManager.getTextField("", 20);
        descTxt.text = LanguageManager.getlocal("servant_storyTxt");
        descTxt.textColor = TextFieldConst.COLOR_BLACK; // totalProTxt.textColor;
        descTxt.x = 60; // this.viewBg.width/2 - descTxt.width/2;
        descTxt.y = attrPoxY;
        this._nodeContainer.addChild(descTxt);
        var bottomBg = BaseBitmap.create("public_9_bg40");
        bottomBg.width = 494;
        bottomBg.height = 166;
        bottomBg.x = bg.x + bg.width / 2 - bottomBg.width / 2;
        bottomBg.y = descTxt.y + descTxt.height + 5;
        this._nodeContainer.addChild(bottomBg);
        var descTxt2 = ComponentManager.getTextField("", 18);
        // descTxt2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        descTxt2.text = LanguageManager.getlocal("servant_story" + this._servantId);
        descTxt2.multiline = true;
        descTxt2.lineSpacing = 5;
        descTxt2.width = bottomBg.width - 20;
        var txtNode = new BaseDisplayObjectContainer();
        descTxt2.y = 7;
        txtNode.height = descTxt2.height + 15;
        txtNode.addChild(descTxt2);
        var sRect = new egret.Rectangle(0, 0, bottomBg.width, bottomBg.height - 15);
        var scrollV = ComponentManager.getScrollView(txtNode, sRect);
        scrollV.x = bottomBg.x + 10;
        scrollV.y = bottomBg.y + 8;
        this._nodeContainer.addChild(scrollV);
        var descTipTxt = ComponentManager.getTextField("", 18);
        descTipTxt.text = LanguageManager.getlocal("servant_storyTip");
        descTipTxt.x = this.viewBg.x + this.viewBg.width - descTipTxt.width - 10;
        descTipTxt.y = bottomBg.y + bottomBg.height + 45;
        // descTipTxt.y =  this.getShowHeight() + 10;
        this._nodeContainer.addChild(descTipTxt);
    };
    ServantAttrDetailPopupView.prototype.getShowHeight = function () {
        return 770;
    };
    ServantAttrDetailPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantAttrDetailPopupView;
}(PopupView));
__reflect(ServantAttrDetailPopupView.prototype, "ServantAttrDetailPopupView");

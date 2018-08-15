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
 * 已迎娶wifeitem
 * author dmj
 * date 2017/10/9
 * @class WifeScrollItem1
 */
var WifeScrollItem1 = (function (_super) {
    __extends(WifeScrollItem1, _super);
    // this.
    function WifeScrollItem1() {
        return _super.call(this) || this;
    }
    WifeScrollItem1.prototype.initItem = function (index, wifeInfoVo) {
        if (!wifeInfoVo) {
            this.width = 622;
            if (index == 0) {
                this.height = 100 + this.getSpaceY();
            }
            else {
                this.height = 30 + this.getSpaceY();
            }
            return;
        }
        this.width = 622;
        this.height = 500 + this.getSpaceY();
        this._wifeInfoVo = wifeInfoVo;
        var nameBg = BaseBitmap.create("wifehalfbg");
        // nameBg.width = this.width;
        nameBg.x = this.width / 2 - nameBg.width / 2;
        // nameBg.y = 40;
        this.addChild(nameBg);
        // let wifeBg = "wifeview_bg" + (index%5 + 1);
        // let bg:BaseBitmap = BaseLoadBitmap.create(wifeBg);
        // this.addChild(bg);
        // bg.x = 66;
        // bg.y = nameBg.height/2 - 211/2
        var wifePic = wifeInfoVo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePic = skinCfg.body;
            }
        }
        this._wifeIcon = BaseLoadBitmap.create(wifePic);
        this._wifeIcon.x = nameBg.x + 60;
        //todo this._wifeIcon的宽高尺寸需要固定
        this._wifeIcon.y = 20;
        this._wifeIcon.setScale(0.6);
        this.addChild(this._wifeIcon);
        nameBg.addTouchTap(this.clickItemHandler, this);
        var mask = new egret.Rectangle(0, 0, 640, 692);
        this._wifeIcon.mask = mask;
        var nameTF = ComponentManager.getTextField(wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            var nameBackground = BaseBitmap.create("wifeview_namebg");
            nameBackground.width = nameTF.width + 40;
            nameBackground.height = 51;
            nameBackground.x = nameBg.x + nameBg.width / 2;
            nameBackground.y = nameBg.y + nameBg.height - 87;
            nameBackground.anchorOffsetX = nameBackground.width / 2;
            nameBackground.anchorOffsetY = nameBackground.height / 2;
            nameTF.x = nameBackground.x - nameTF.width / 2;
            nameTF.y = nameBackground.y - nameTF.height / 2;
            this.addChild(nameBackground);
        }
        else {
            nameTF.width = 27;
            nameTF.x = nameBg.x + 38;
            nameTF.y = nameBg.y + 446 / 2 - nameTF.height / 2;
        }
        this.addChild(nameTF);
        var intimacyBg = BaseBitmap.create("public_itemtipbg2");
        intimacyBg.width = 100;
        intimacyBg.x = 220;
        intimacyBg.y = this.height - intimacyBg.height - 80;
        this.addChild(intimacyBg);
        var intimacyIcon = BaseBitmap.create("wifeview_vigoricon");
        intimacyIcon.x = intimacyBg.x - intimacyIcon.width / 2;
        intimacyIcon.y = intimacyBg.y + intimacyBg.height / 2 - intimacyIcon.height / 2;
        this.addChild(intimacyIcon);
        this._intimacyTF = ComponentManager.getTextField(wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._intimacyTF.x = intimacyBg.x + intimacyBg.width / 2 - intimacyIcon.width / 2 + 10;
        this._intimacyTF.y = intimacyBg.y + intimacyBg.height / 2 - this._intimacyTF.height / 2;
        this.addChild(this._intimacyTF);
        var meiliBg = BaseBitmap.create("public_itemtipbg2");
        meiliBg.width = intimacyBg.width;
        meiliBg.x = intimacyBg.x + 130;
        meiliBg.y = intimacyBg.y;
        this.addChild(meiliBg);
        var meiliIcon = BaseBitmap.create("wifeview_charmicon");
        meiliIcon.x = meiliBg.x - meiliIcon.width / 2;
        meiliIcon.y = meiliBg.y + meiliBg.height / 2 - meiliIcon.height / 2;
        this.addChild(meiliIcon);
        this._glamourTF = ComponentManager.getTextField(wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._glamourTF.x = meiliBg.x + meiliBg.width / 2 - intimacyIcon.width / 2 + 10;
        this._glamourTF.y = meiliBg.y + meiliBg.height / 2 - this._glamourTF.height / 2;
        this.addChild(this._glamourTF);
    };
    WifeScrollItem1.prototype.clickItemHandler = function (event) {
        if (WifeView.isMoveing) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: this._wifeInfoVo.id, handler: this });
        SoundManager.stopEffect(SoundConst.EFFECT_WIFE);
        WifeView.wifeId = this._wifeInfoVo.id;
    };
    WifeScrollItem1.prototype.refreshData = function (id) {
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        this._intimacyTF.text = wifeInfo.intimacy.toString();
        this._glamourTF.text = wifeInfo.glamour.toString();
        var wifePic = wifeInfo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePic = skinCfg.body;
            }
        }
        this._wifeIcon.setload(wifePic);
    };
    WifeScrollItem1.prototype.getSpaceY = function () {
        return 60;
    };
    WifeScrollItem1.prototype.dispose = function () {
        this._intimacyTF = null;
        this._glamourTF = null;
        this._wifeInfoVo = null;
        this._wifeIcon = null;
        _super.prototype.dispose.call(this);
    };
    return WifeScrollItem1;
}(ScrollListItem));
__reflect(WifeScrollItem1.prototype, "WifeScrollItem1");

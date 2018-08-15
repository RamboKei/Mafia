/**
 * 本服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceView
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
var PalaceView = (function (_super) {
    __extends(PalaceView, _super);
    function PalaceView() {
        var _this = _super.call(this) || this;
        /**
         * 配置点击位置及跳转关系
         * 650 765
         */
        _this._posList = [];
        _this._touchCancel = false;
        _this._hitKey = "";
        _this._shadowList = [];
        return _this;
    }
    PalaceView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this.initPosCfg();
        var bg = BaseBitmap.create(this.getBgRes());
        this._nodeContainer.addChild(bg);
        this._bg = bg;
        this._bg.y = GameConfig.stageHeigth - this._bg.height - this.container.y + 20;
        this._bg.addTouch(this.onBgTouchHandler, this, null, true);
        var buiCfg = GameConfig.config.buildingCfg;
        var buiIdlist = Object.keys(buiCfg);
        buiIdlist.sort(function (dataA, dataB) {
            return Number(dataA) - Number(dataB);
        });
        // for (var key in this._posList) {
        var starIdx = this.getStartIdx();
        for (var index = 0; index < this._posList.length; index++) {
            var poscfg = this._posList[index];
            var buildId = buiIdlist[index + starIdx];
            var cfg = buiCfg[buildId];
            if (Api.palaceVoApi.isShowBuildingFlag(buildId)) {
                var flagImg = BaseBitmap.create("palace_building_flag" + poscfg.flagId);
                flagImg.x = this._bg.x + poscfg.x;
                flagImg.y = this._bg.y + poscfg.y;
                this._nodeContainer.addChild(flagImg);
            }
            var shadowImg = BaseBitmap.create("palace_shadow" + poscfg.shadowId);
            shadowImg.x = this._bg.x + poscfg.x;
            shadowImg.y = this._bg.y + poscfg.y;
            shadowImg.setScale(4);
            shadowImg.alpha = 0.5;
            shadowImg.visible = false;
            this._nodeContainer.addChild(shadowImg);
            shadowImg.name = buildId;
            this._shadowList.push(shadowImg);
            var buildingFlag = BaseLoadBitmap.create("palace_build_" + buildId);
            if (cfg.unlock == 0) {
                App.DisplayUtil.changeToGray(buildingFlag);
            }
            //英文版本位置
            if (PlatformManager.checkIsTextHorizontal()) {
                buildingFlag.width = 148;
                buildingFlag.height = 30;
                buildingFlag.x = this._bg.x + poscfg.ennameX;
                buildingFlag.y = this._bg.y + poscfg.ennameY;
            }
            else {
                buildingFlag.width = 35;
                buildingFlag.height = 96;
                buildingFlag.setScale(1.2);
                buildingFlag.x = this._bg.x + poscfg.x + poscfg.width;
                buildingFlag.y = this._bg.y + poscfg.y - 20;
            }
            this._nodeContainer.addChild(buildingFlag);
        }
        this.initBottomView();
    };
    PalaceView.prototype.initBottomView = function () {
        var crossBtn = ComponentManager.getButton(this.getCorssBtnPath(), "", this.crossBtnHandler, this);
        crossBtn.x = 10;
        crossBtn.y = 10;
        this._nodeContainer.addChild(crossBtn);
    };
    PalaceView.prototype.getStartIdx = function () {
        return 7;
    };
    PalaceView.prototype.getCorssBtnPath = function () {
        return "palacve_goBtn";
    };
    PalaceView.prototype.initPosCfg = function () {
        this._posList = [
            { x: 208, y: 297, width: 237, heigh: 127, shadowId: 1, flagId: 1, ennameX: 244, ennameY: 272 },
            { x: 46, y: 529, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 38, ennameY: 506 },
            { x: 256, y: 543, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 244, ennameY: 520 },
            { x: 459, y: 532, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 448, ennameY: 508 },
            { x: 46, y: 690, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 26, ennameY: 664 },
            { x: 256, y: 667, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 244, ennameY: 644 },
            { x: 470, y: 690, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 460, ennameY: 664 },
            { x: 43, y: 821, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 22, ennameY: 794 },
            { x: 256, y: 787, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 244, ennameY: 760 },
            { x: 475, y: 821, width: 128, heigh: 77, shadowId: 2, flagId: 1, ennameX: 464, ennameY: 794 },
            { x: 19, y: 955, width: 128, heigh: 77, shadowId: 4, flagId: 3, ennameX: 18, ennameY: 930 },
            { x: 233, y: 975, width: 193, heigh: 145, shadowId: 3, flagId: 2, ennameX: 244, ennameY: 952 },
            { x: 469, y: 960, width: 128, heigh: 77, shadowId: 5, flagId: 4, ennameX: 466, ennameY: 936 },
        ];
    };
    PalaceView.prototype.getBgRes = function () {
        return "palace_bg2";
    };
    PalaceView.prototype.crossBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
        this.hide();
    };
    PalaceView.prototype.onBgTouchHandler = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            var hitPos = new egret.Point(Math.floor(e.localX), Math.floor(e.localY));
            this._hitKey = "";
            for (var key = 0; key < this._posList.length; key++) {
                var cfgPos = this._posList[key];
                if (cfgPos.x <= hitPos.x && hitPos.x <= cfgPos.x + cfgPos.width) {
                    if (cfgPos.y <= hitPos.y && hitPos.y <= cfgPos.y + cfgPos.heigh) {
                        this._curTouchShadow = this._shadowList[key];
                        var buiId = this._curTouchShadow.name;
                        this._curTouchShadow.visible = true;
                        var bcfg = GameConfig.config.buildingCfg[buiId];
                        if (bcfg && bcfg.unlock == 0) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
                        }
                        else {
                            this._hitKey = this._curTouchShadow.name;
                        }
                        break;
                    }
                }
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            this._touchCancel = true;
            this._hitKey = "";
            if (this._curTouchShadow) {
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (!this._touchCancel && this._hitKey != "") {
                // this._hitKey 处理点击
                this.doHitProcess(this._hitKey);
            }
            this._touchCancel = false;
            this._hitKey = "";
            if (this._curTouchShadow) {
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
        }
    };
    PalaceView.prototype.doHitProcess = function (key) {
        var buildcfg = GameConfig.config.buildingCfg[key];
        var titleId = buildcfg.title;
        var buildingId = key;
        if (Object.keys(titleId).length == 1) {
            var tid = titleId[0];
            var titlecfg = Config.TitleCfg.getTitleCfgById(tid);
            if (titlecfg.unlock == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW, { titleId: tid, buildingId: buildingId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEGROUPVIEW, { buildingId: buildingId });
        }
    };
    PalaceView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_PALACE;
    };
    PalaceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_bg2", "palace_bg3",
            "palace_hisBtn1", "palace_hisBtn1_down",
            "palace_hisBtn2", "palace_hisBtn2_down",
            "palace_hisBtn3", "palace_hisBtn3_down",
            "palacve_goBtn", "palacve_goBtn_down",
            "palacve_backBtn", "palacve_backBtn_down",
            "palace_shadow1", "palace_shadow2", "palace_shadow3", "palace_shadow4", "palace_shadow5",
            "palace_building_flag1", "palace_building_flag2", "palace_building_flag3", "palace_building_flag4",
        ]);
    };
    ;
    PalaceView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_PALACE_GETPALACEINFO, requestData: {} };
    };
    PalaceView.prototype.dispose = function () {
        this._bg.removeTouch();
        this._posList = [];
        this._bg = null;
        this._touchCancel = null;
        this._hitKey = "";
        this._shadowList = [];
        this._curTouchShadow = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceView;
}(CommonView));
__reflect(PalaceView.prototype, "PalaceView");

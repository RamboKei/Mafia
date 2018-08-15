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
 * 练武场 玩家形象
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkDetailRoleInfoItem
 */
var StudyatkDetailRoleInfoItem = (function (_super) {
    __extends(StudyatkDetailRoleInfoItem, _super);
    function StudyatkDetailRoleInfoItem() {
        var _this = _super.call(this) || this;
        _this._pro_et = 0;
        _this._oldInfo = [];
        return _this;
    }
    StudyatkDetailRoleInfoItem.prototype.init = function (data, posIdx, detailData) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.joinBtnHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.pkBtnHandlerCallBack, this);
        this._posIdx = posIdx;
        this._fuid = detailData.uid;
        this._detailData = detailData;
        var lighMask = BaseBitmap.create("studyatk_frame_light");
        var tmpS = 2.0;
        lighMask.name = "lighMask";
        lighMask.setScale(tmpS);
        lighMask.x = -lighMask.width / 2 * tmpS;
        lighMask.y = -lighMask.height * tmpS;
        this.addChild(lighMask);
        lighMask.addTouchTap(this.joinBtnHandler, this);
        if (!data) {
            this.initIdle();
        }
        else {
            this.initRoleImgStatus(data, detailData);
        }
    };
    StudyatkDetailRoleInfoItem.prototype.initRoleImgStatus = function (data, detailData) {
        if (this._joinBtn) {
            this._joinBtn.visible = false;
        }
        this._detailData = detailData;
        this._uiData = data;
        if (!this._uiData) {
            return;
        }
        var roleImg = this.getChildByName("roleImg");
        if (roleImg) {
            this.removeChild(roleImg);
            roleImg = null;
        }
        var curLv = data.level;
        if (data.title != "") {
            curLv = data.title;
        }
        roleImg = Api.playerVoApi.getPlayerPortrait(curLv, data.pic);
        BaseLoadBitmap.create("palace_role_empty");
        roleImg.name = "roleImg";
        var deltaV = 0.40;
        if (this._posIdx != "2")
            deltaV = 0.35;
        roleImg.setScale(deltaV);
        roleImg.x = -roleImg.width / 2 * deltaV;
        roleImg.y = -roleImg.height * deltaV - 10;
        this.addChildAt(roleImg, 0);
        if (!this._joinMv) {
            this._joinMv = ComponentManager.getCustomMovieClip("studyatk_frame", 8, 100);
            this._joinMv.setScale(2);
            this._joinMv.x = -98;
            this._joinMv.y = -388;
            if (this._posIdx == "2") {
                this._joinMv.y -= 20;
            }
            this.addChild(this._joinMv);
            this._joinMv.playWithTime(0);
            this._joinMv.addTouchTap(this.joinBtnHandler, this);
        }
        var txtBg = this.getChildByName("txtBg");
        if (!txtBg) {
            txtBg = BaseBitmap.create("atkrace_name_bg");
            txtBg.width = 190;
            txtBg.height = 90;
            txtBg.name = "txtBg";
            txtBg.x = -txtBg.width / 2;
            txtBg.y = 20 - txtBg.height;
            this.addChild(txtBg);
        }
        var nameTxt = this.getChildByName("nameTxt");
        if (!nameTxt) {
            nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            nameTxt.x = txtBg.x + 30;
            nameTxt.y = txtBg.y + 10;
            nameTxt.name = "nameTxt";
            this.addChild(nameTxt);
        }
        nameTxt.text = data.name;
        var officerTxt = this.getChildByName("officerTxt");
        if (!officerTxt) {
            officerTxt = ComponentManager.getTextField("", 20);
            officerTxt.name = "officerTxt";
            officerTxt.x = txtBg.x + 30;
            officerTxt.y = nameTxt.y + 25;
            this.addChild(officerTxt);
        }
        var str1 = LanguageManager.getlocal("officialTitle" + data.level);
        officerTxt.text = str1;
        if (!this._getTxt) {
            this._getTxt = ComponentManager.getTextField("", 20);
            this._getTxt.x = officerTxt.x;
            this._getTxt.y = officerTxt.y + 25;
            this.addChild(this._getTxt);
        }
        var getV = this._detailData.skillrate * Math.floor((GameData.serverTime - this._uiData.join_st) / 60);
        this._getTxt.text = LanguageManager.getlocal("study_table_get", [String(getV)]);
        if (!this.isInHome()) {
            var myuid = Api.playerVoApi.getPlayerID();
            /**
             * 可以驱离
             */
            if (Api.playerVoApi.getPlayerLevel() >= data.level) {
                this._pro_et = this._uiData.pro_et;
                if (!this._pkBtn) {
                    this._pkBtn = ComponentManager.getButton("studyatk_pkBtn", "", this.pkBtnHandler, this);
                    this._pkBtn.x = -this._pkBtn.width / 2;
                    this._pkBtn.y = roleImg.y - 70;
                    this._pkBtn.name = "pkBtn";
                    this._pkBtn.visible = false;
                    this.addChild(this._pkBtn);
                }
                if (!this._pkTxtNode) {
                    this._pkTxtNode = new BaseDisplayObjectContainer();
                    this.addChild(this._pkTxtNode);
                    var tiptxtBg = BaseBitmap.create("atkrace_name_bg");
                    tiptxtBg.width = 170;
                    tiptxtBg.height = 40;
                    tiptxtBg.x = txtBg.x;
                    tiptxtBg.y = this._pkBtn.y - tiptxtBg.height / 2 + 50;
                    this._pkTxtNode.addChild(tiptxtBg);
                    this._idleTxt = ComponentManager.getTextField("", 20, 0xff0000);
                    this._idleTxt.y = tiptxtBg.y + tiptxtBg.height / 2;
                    this._pkTxtNode.addChild(this._idleTxt);
                }
                //保护期间
                if (this._uiData.pro_et > GameData.serverTime) {
                    if (!this._inproTxt) {
                        this._inproTxt = ComponentManager.getTextField("", 20);
                        this._inproTxt.textColor = 0x66A0F9;
                        this._inproTxt.x = officerTxt.x + officerTxt.width + 10;
                        this._inproTxt.y = officerTxt.y;
                        this.addChild(this._inproTxt);
                    }
                    this._inproTxt.text = LanguageManager.getlocal("studyatk_inprotection");
                    this._pkTxtNode.visible = true;
                    var cdStr = App.DateUtil.getFormatBySecond(this._uiData.pro_et - GameData.serverTime, 3);
                    this._idleTxt.text = LanguageManager.getlocal("studyatk_pkBtncdTxt", [cdStr]);
                    this._idleTxt.anchorOffsetX = this._idleTxt.width / 2;
                    this._idleTxt.anchorOffsetY = this._idleTxt.height / 2;
                    TickManager.removeTick(this.tick, this);
                    TickManager.addTick(this.tick, this);
                    this._pkTxtNode.visible = true;
                }
                else if (this.getNextPkTime(this._uiData.name) > 0) {
                    this._pro_et = this.getNextPkTime(this._uiData.name);
                    var cdStr = App.DateUtil.getFormatBySecond(this._pro_et - GameData.serverTime, 3);
                    this._idleTxt.text = LanguageManager.getlocal("studyatk_pkBtncdTxt", [cdStr]);
                    this._idleTxt.anchorOffsetX = this._idleTxt.width / 2;
                    this._idleTxt.anchorOffsetY = this._idleTxt.height / 2;
                    TickManager.removeTick(this.tick, this);
                    TickManager.addTick(this.tick, this);
                    this._pkTxtNode.visible = true;
                }
                else {
                    this._pkTxtNode.visible = false;
                    this._pkBtn.visible = true;
                }
            }
            else {
                this._pro_et = this._uiData.pro_et;
                TickManager.removeTick(this.tick, this);
                TickManager.addTick(this.tick, this);
            }
        }
    };
    StudyatkDetailRoleInfoItem.prototype.initIdle = function () {
        if (this._joinBtn) {
            this._joinBtn.visible = true;
            return;
        }
        var joinBtn = BaseBitmap.create("studyatk_arrow");
        joinBtn.addTouchTap(this.joinBtnHandler, this);
        joinBtn.x = -joinBtn.width / 2;
        var tarY = -270;
        if (this._posIdx == "2") {
            tarY = -234;
        }
        joinBtn.y = tarY;
        egret.Tween.get(joinBtn, { loop: true }).to({ y: tarY - 50 }, 1000).wait(200).to({ y: tarY }, 1000);
        this.addChild(joinBtn);
        this._joinBtn = joinBtn;
    };
    StudyatkDetailRoleInfoItem.prototype.joinBtnHandlerCallback = function (event) {
        var rData = event.data.data;
        if (rData.ret == 0) {
            var joincode = rData.data.joincode;
            if (joincode != 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_joincode" + joincode));
                // return;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_success_tip"));
            }
            var getatkdetail = rData.data.getatkdetail;
            var minfo = getatkdetail.minfo;
            if (minfo[this._posIdx] && !this._uiData) {
                this.initRoleImgStatus(minfo[this._posIdx], getatkdetail);
            }
            else {
                this._detailData = getatkdetail;
            }
            // }
        }
    };
    StudyatkDetailRoleInfoItem.prototype.getNextPkTime = function (uname) {
        var atkinfo = this._detailData.atkinfo;
        for (var key in atkinfo) {
            if (atkinfo[key].dtype == 3) {
                var time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if (atkinfo[key].name1 == Api.playerVoApi.getPlayerName() && atkinfo[key].name2 && atkinfo[key].name2 == uname && time >= GameData.serverTime) {
                    return time;
                }
            }
        }
        return 0;
    };
    StudyatkDetailRoleInfoItem.prototype.joinBtnHandler = function () {
        if (this.getChildByName("roleImg")) {
            return;
        }
        if (this._fuid == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_failed4"));
            return; //自己是房主
        }
        if (this.isInHome()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_Tip1"));
            return;
        }
        // if(Api.studyatkVoApi.getNextJoinTime() > 0)
        // {
        //     App.CommonUtil.showTip("暂时不可加入");
        //     return;
        // }
        //被驱离10分钟内不可再次加入
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_JOIN, { fuid: this._fuid, pos: this._posIdx });
    };
    StudyatkDetailRoleInfoItem.prototype.isInHome = function () {
        for (var key in this._detailData.minfo) {
            var element = this._detailData.minfo[key];
            if (element.uid == Api.playerVoApi.getPlayerID()) {
                return true;
            }
        }
        return false;
    };
    StudyatkDetailRoleInfoItem.prototype.pkBtnHandlerCallBack = function (event) {
        var rData = event.data.data;
        if (rData.ret == 0) {
            var goawaycode = rData.data.goawaycode;
            var pos = rData.data.pos;
            var getatkdetail = rData.data.getatkdetail;
            var minfo = getatkdetail.minfo;
            this._detailData = getatkdetail;
            if (goawaycode == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_win"));
                this.initRoleImgStatus(minfo[this._posIdx], getatkdetail);
            }
            else if (goawaycode == -1) {
                if (pos == this._posIdx && minfo[pos]) {
                    this.initRoleImgStatus(minfo[pos], getatkdetail);
                }
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_goawaycode-1"));
            }
            else {
                /**
                 * 演武数据发生变化是刷新 20180316
                 */
                if (pos == this._posIdx && minfo[pos]) {
                    this.initRoleImgStatus(minfo[pos], getatkdetail);
                }
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_goawaycode" + goawaycode));
                return;
            }
            //战斗
            if (pos == this._posIdx && this._oldInfo.length > 0) {
                this.showBattle(goawaycode);
            }
        }
        // else if (rData.ret == -3 ){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_NotEnable"));
        // }
    };
    StudyatkDetailRoleInfoItem.prototype.showBattle = function (code) {
        //等级 名称 经验 头像
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYBATTLEVIEW, { f: this.showBattle, o: this, info: this._oldInfo, wcode: code });
    };
    StudyatkDetailRoleInfoItem.prototype.pkBtnHandler = function (event) {
        if (this.isInHome()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_NotEnable2"));
            return;
        }
        //保护期间
        if (this._uiData.pro_et > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_inprotection"));
            return;
        }
        //挑战失败，10分钟内不可再次挑战
        var minfo = this._detailData.minfo;
        this._oldInfo.length = 0;
        if (minfo && minfo[this._posIdx]) {
            var enemyInfo = minfo[this._posIdx];
            this._oldInfo[0] = { level: Api.playerVoApi.getPlayerLevel(), name: Api.playerVoApi.getPlayerName(), pic: Api.playerVoApi.getPlayePicId(), exp: Api.playerVoApi.getPlayerExp(), title: Api.playerVoApi.getTitleid() };
            this._oldInfo[1] = { level: enemyInfo.level, name: enemyInfo.name, pic: enemyInfo.pic, exp: enemyInfo.exp, title: enemyInfo.title };
        }
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_GOAWAY, { pos: this._posIdx, fuid: this._fuid, puid: this._uiData.uid });
    };
    StudyatkDetailRoleInfoItem.prototype.idleBtnHandler = function (event) {
        App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_inprotection"));
    };
    StudyatkDetailRoleInfoItem.prototype.tick = function () {
        var getV = this._detailData.skillrate * Math.floor((GameData.serverTime - this._uiData.join_st) / 60);
        this._getTxt.text = LanguageManager.getlocal("study_table_get", [String(getV)]);
        if (this._pro_et >= GameData.serverTime && !this.isInHome()) {
            if (this._inproTxt)
                this._inproTxt.visible = true;
            // if(this._pkBtn)
            // {
            //     this._pkBtn.visible = false;
            // }
            if (this._pkTxtNode) {
                this._pkTxtNode.visible = true;
                var cdStr = App.DateUtil.getFormatBySecond(this._pro_et - GameData.serverTime, 3);
                this._idleTxt.text = LanguageManager.getlocal("studyatk_pkBtncdTxt", [cdStr]);
                this._idleTxt.anchorOffsetX = this._idleTxt.width / 2;
                this._idleTxt.anchorOffsetY = this._idleTxt.height / 2;
            }
            return true;
        }
        else {
            if (this._pkBtn && !this.isInHome()) 
            // if(this._pkBtn )
            {
                this._pkBtn.visible = true;
            }
            if (this._pkTxtNode) {
                this._pkTxtNode.visible = false;
            }
            if (this._inproTxt) {
                this._inproTxt.visible = false;
            }
        }
        return false;
    };
    StudyatkDetailRoleInfoItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.joinBtnHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.pkBtnHandlerCallBack, this);
        TickManager.removeTick(this.tick, this);
        this._posIdx = null;
        this._fuid = null;
        this._detailData = null;
        this._uiData = null;
        this._pro_et = null;
        this._pkTxtNode = null;
        this._pkBtn = null;
        this._joinBtn = null;
        this._inproTxt = null;
        this._joinMv = null;
        this._oldInfo.length = 0;
        this._getTxt = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkDetailRoleInfoItem;
}(BaseDisplayObjectContainer));
__reflect(StudyatkDetailRoleInfoItem.prototype, "StudyatkDetailRoleInfoItem");

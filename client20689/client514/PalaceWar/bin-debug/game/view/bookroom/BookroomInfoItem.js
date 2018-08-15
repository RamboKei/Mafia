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
 * 书院 各作为部分部分
 * author yanyuling
 * date 2017/11/23
 * @class BookroomInfoItem
 */
var BookroomInfoItem = (function (_super) {
    __extends(BookroomInfoItem, _super);
    function BookroomInfoItem() {
        var _this = _super.call(this) || this;
        _this._posId = 0;
        return _this;
    }
    BookroomInfoItem.prototype.init = function (posId) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        this._posId = posId;
        var desk = BaseBitmap.create("bookroom_desk");
        this._desk = desk;
        this.addChild(desk);
        var bookroom_tipbg = BaseBitmap.create("bookroom_tipbg");
        bookroom_tipbg.x = desk.x + desk.width / 2 - bookroom_tipbg.width / 2;
        bookroom_tipbg.y = desk.y - 40;
        this._tipNode.addChild(bookroom_tipbg);
        bookroom_tipbg.name = "bookroom_tipbg";
        var tipTxt = ComponentManager.getTextField("", 20);
        tipTxt.text = LanguageManager.getlocal("bookRoomClickTip");
        tipTxt.x = bookroom_tipbg.x + bookroom_tipbg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bookroom_tipbg.y + bookroom_tipbg.height / 2 - tipTxt.height / 2 - 5;
        this._tipNode.addChild(tipTxt);
        this._tipTxt = tipTxt;
        this.addTouchTap(this.bookRoomHandler, this);
        this.refreshUI();
    };
    BookroomInfoItem.prototype.refreshUI = function (event) {
        if (event && this._bRoomInfoVo) {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            var rData = event.data.data.data;
            var cmd = event.data.data.cmd;
            var pos = rData.bookroompos;
            var poss = rData.bookroom_poss;
            //批量完成，
            if (pos == 0 && this._bRoomInfoVo) {
                return;
            }
            if (pos > 0 && pos != this._posId) {
                return;
            }
            var bookCfg = GameConfig.config.bookroomCfg;
            /**
             * 完成学习飘文字
             */
            if (cmd == "bookroom.finish" && !this._bRoomInfoVo) {
                var rate = 1;
                var addStr = "";
                if (pos == 0 && poss[this._posId] && poss[this._posId].pos) {
                    rate = poss[this._posId].pos;
                }
                else {
                    if (poss && poss.pos) {
                        rate = poss.pos;
                    }
                }
                var strList = [];
                // for (var index = 0; index < rate; index++) {
                var flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1", [String(bookCfg.getBookExp * rate)]);
                var flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2", [String(bookCfg.getSkillExp * rate)]);
                strList.push({ tipMessage: flyStr1 });
                strList.push({ tipMessage: flyStr2 });
                // }
                //  strList = [{tipMessage:flyStr1},{tipMessage:flyStr2}];
                var pos2 = this.localToGlobal(this._desk.x + this._desk.width / 2, this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList, pos2);
                // App.CommonUtil.showTip( LanguageManager.getlocal("bookRoomServant_completeFly",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]) );
                // let eData:any=event.data?event.data.data:null;
                // if(eData&&eData.lucky)
                // {
                //     App.CommonUtil.showGodbless("bookRoom");
                // }
            }
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo) {
            this._tipTxt.visible = false;
            var servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);
            var servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            var deltaScale = 0.5;
            servantFullImg.setScale(deltaScale);
            servantFullImg.width = 405;
            servantFullImg.height = 467;
            var maskH = 400;
            servantFullImg.mask = new egret.Rectangle(0, 0, servantFullImg.width, maskH);
            servantFullImg.x = this._desk.x + this._desk.width / 2 - servantFullImg.width / 2 * deltaScale;
            servantFullImg.y = -maskH * deltaScale + 30;
            this.addChildAt(servantFullImg, 0);
            servantFullImg.name = "servantFullImg";
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;
            var cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.x = this._desk.x + this._desk.width / 2 - cdBg.width / 2;
            cdBg.y = -40;
            cdBg.name = "cdBg";
            this.addChild(cdBg);
            this._cdTxt = ComponentManager.getTextField("", 20);
            this._cdTxt.y = cdBg.y + 10;
            this.addChild(this._cdTxt);
            if (this._bRoomInfoVo.et < GameData.serverTime) {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
            }
            else {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                // this.tick()
                TickManager.removeTick(this.tick, this);
                TickManager.addTick(this.tick, this);
            }
            this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
        }
        else {
            var servantFullImg = this.getChildByName("servantFullImg");
            var cdBg = this.getChildByName("cdBg");
            if (cdBg) {
                this.removeChild(cdBg);
            }
            if (servantFullImg) {
                this.removeChild(servantFullImg);
            }
            this._tipNode.visible = true;
            egret.Tween.get(this._tipNode, { loop: true }).to({ y: -10 }, 1000).to({ y: 0 }, 1000);
            if (this._cdTxt) {
                this.removeChild(this._cdTxt);
                this._cdTxt = null;
            }
            this._tipTxt.visible = true;
        }
    };
    BookroomInfoItem.prototype.tick = function () {
        if (this._bRoomInfoVo) {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            if (this._bRoomInfoVo.et > GameData.serverTime) {
                var leftTimt = this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                this._cdTxt.text = App.DateUtil.getFormatBySecond(leftTimt).toString();
                //  LanguageManager.getlocal("affair_cdTip",[]) ;
                var cdBg = this.getChildByName("cdBg");
                this._cdTxt.x = cdBg.x + cdBg.width / 2 - this._cdTxt.width / 2;
                cdBg = null;
                return true;
            }
            else {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                return false;
            }
        }
        return false;
    };
    BookroomInfoItem.prototype.bookRoomHandler = function () {
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime) {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { pos: this._posId, isbatch: 0 });
        }
        if (!this._bRoomInfoVo) {
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW, this._posId);
        }
    };
    BookroomInfoItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshUI, this);
        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomInfoItem;
}(BaseDisplayObjectContainer));
__reflect(BookroomInfoItem.prototype, "BookroomInfoItem");

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
 * 政务
 * author yanyuling
 * date 2017/11/24
 * @class BookroomView
 */
var BookroomView = (function (_super) {
    __extends(BookroomView, _super);
    function BookroomView() {
        return _super.call(this) || this;
    }
    BookroomView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY), this.buySeatHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshSeatNum, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshSeatNum, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._nodeContainer2 = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("bookroom_bg");
        this._nodeContainer.addChild(bg);
        var posNum = Api.bookroomVoApi.getSeatNum();
        var curPosNumTxt = ComponentManager.getTextField("", 20);
        curPosNumTxt.x = 30;
        curPosNumTxt.y = 10;
        curPosNumTxt.name = "curPosNumTxt";
        this._nodeContainer2.addChild(curPosNumTxt);
        var addBtn = ComponentManager.getButton("mainui_btn1", "", this.addBtnClickHandler, this);
        addBtn.x = 180;
        addBtn.y = curPosNumTxt.y - 7;
        addBtn.visible = false;
        addBtn.name = "addBtn";
        this._nodeContainer2.addChild(addBtn);
        if (posNum < 5) {
            var batchTipTxt = ComponentManager.getTextField(LanguageManager.getlocal('bookRoomServant_batchTip'), 20);
            batchTipTxt.x = GameConfig.stageWidth - batchTipTxt.width - 30;
            batchTipTxt.y = curPosNumTxt.y;
            batchTipTxt.name = "batchTipTxt";
            this._nodeContainer2.addChild(batchTipTxt);
        }
        this.makeBatchBtn(posNum);
        for (var index = 0; index < posNum; index++) {
            this.makeSeatItem(index);
        }
        var scrollH = GameConfig.stageHeigth - this.container.y + 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -15;
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        var mask = BaseLoadBitmap.create("servant_mask");
        mask.width = GameConfig.stageWidth;
        mask.scaleY = -1;
        mask.y = 120;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);
    };
    BookroomView.prototype.makeSeatItem = function (index) {
        var bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index + 1);
        var posX = 20;
        if ((index % 2) == 1) {
            //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
            //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        var posY = 500 + Math.floor(index / 2) * 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
    };
    BookroomView.prototype.makeBatchBtn = function (posNum) {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        if (posNum >= 5 && !this._nodeContainer2.getChildByName("bookroom_batch")) {
            var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
            forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
            forpeople_bottom.y = 5;
            // forpeople_bottom.x = 15;
            // forpeople_bottom.y = 45;
            this._nodeContainer2.addChild(forpeople_bottom);
            // forpeople_bottom.addTouchTap(this.batchHandler,this);
            var bookroom_batch = ComponentManager.getButton("bookroom_visitIcon", "", this.batchHandler, this);
            // bookroom_batch.anchorOffsetX = bookroom_batch.width/2;
            // bookroom_batch.anchorOffsetY = bookroom_batch.height/2;
            var batchFlag = BaseBitmap.create("bookroom_batch");
            batchFlag.x = forpeople_bottom.x + forpeople_bottom.width / 2 - batchFlag.width / 2;
            batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
            bookroom_batch.x = forpeople_bottom.x + forpeople_bottom.width / 2 - bookroom_batch.width / 2;
            bookroom_batch.y = forpeople_bottom.y + forpeople_bottom.height / 2 - bookroom_batch.height / 2;
            bookroom_batch.name = "bookroom_batch";
            this._nodeContainer2.addChild(bookroom_batch);
            this._nodeContainer2.addChild(batchFlag);
        }
        var batchTipTxt = this._nodeContainer2.getChildByName("batchTipTxt");
        if (posNum >= 5 && batchTipTxt) {
            batchTipTxt.visible = false;
        }
        this.refreshSeatNum();
        if (posNum == bookroomCfg.maxPos) {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }
        else {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
    };
    BookroomView.prototype.batchHandler = function () {
        var keys = Api.bookroomVoApi.getPosListInStudy();
        if (keys.length > 0) {
            if (Api.bookroomVoApi.isBatchenable() == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { isbatch: 1, pos: 0 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchEmptyTip"));
        }
    };
    BookroomView.prototype.refreshSeatNum = function (event) {
        var _this = this;
        if (event) {
            var rdata = event.data.data.data;
            var luckys = rdata.luckys;
            // luckys = [1,2,3];
            if (luckys) {
                var luckLen_1 = luckys.length;
                if (luckLen_1 > 0) {
                    var num_1 = 0;
                    var ths = this;
                    var timerNum_1 = egret.setInterval(function () {
                        num_1 += 1;
                        _this.playLucky();
                        if (num_1 >= luckLen_1) {
                            egret.clearInterval(timerNum_1);
                        }
                    }, ths, 1500, 1);
                }
            }
        }
        var posNum = Api.bookroomVoApi.getSeatNum();
        var curPosNumTxt = this._nodeContainer2.getChildByName("curPosNumTxt");
        var posStr = Api.bookroomVoApi.getPosListInStudy().length + "/" + posNum;
        curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm", [posStr]);
    };
    BookroomView.prototype.buySeatHandlerCallback = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            var posNum = Api.bookroomVoApi.getSeatNum();
            this.makeSeatItem(posNum - 1);
            this.makeBatchBtn(posNum);
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip1"));
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip2"));
        }
        /**
         * 扩充席位后，需要调整展示
         */
    };
    BookroomView.prototype.buySeatHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_BUY, {});
    };
    BookroomView.prototype.addBtnClickHandler = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var needNum = bookroomCfg.needGem[Api.bookroomVoApi.getSeatNum() - 1];
        // if (Api.playerVoApi.getPlayerGem() < needNum)
        // {
        //     App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_gemNotEncouch"));
        //     return;
        // }
        var message = LanguageManager.getlocal("bookRoomServant_buySeat", [String(needNum)]);
        var mesObj = {
            confirmCallback: this.buySeatHandler,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    BookroomView.prototype.playLucky = function () {
        var boomPic = BaseBitmap.create("manage_boomtext");
        boomPic.anchorOffsetX = boomPic.width / 2;
        boomPic.anchorOffsetY = boomPic.height / 2;
        var picX = 500;
        var picY = 250;
        boomPic.setPosition(picX, picY);
        LayerManager.msgLayer.addChild(boomPic);
        egret.Tween.get(boomPic).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 70).to({ y: picY - 50, alpha: 0.7 }, 600).call(function (boomPic) {
            boomPic.dispose();
        }.bind(this, boomPic), this);
        App.CommonUtil.showGodbless("bookRoom");
    };
    BookroomView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "bookroom_batch", "bookroom_bg", "bookroom_cdbg", "bookroom_desk",
            "bookroom_tipbg", "bookroom_visitIcon", "forpeople_bottom", "bookroom_visitIcon_down"
        ]);
    };
    BookroomView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY), this.buySeatHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH), this.refreshSeatNum, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY), this.refreshSeatNum, this);
        this._nodeContainer = null;
        this._nodeContainer2 = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomView;
}(CommonView));
__reflect(BookroomView.prototype, "BookroomView");

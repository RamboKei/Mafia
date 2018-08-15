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
 * 用户信息api
 * author dmj
 * date 2017/9/15
 * @class PlayerVoApi
 */
var PlayerVoApi = (function (_super) {
    __extends(PlayerVoApi, _super);
    function PlayerVoApi() {
        return _super.call(this) || this;
    }
    PlayerVoApi.prototype.getPlayerMaxVip = function () {
        return Config.VipCfg.getMaxLevel();
        // return 11;
    };
    // 用户id
    PlayerVoApi.prototype.getPlayerID = function () {
        if (this.playerVo) {
            return this.playerVo.uid;
        }
        return 0;
    };
    // 获取头像ID
    PlayerVoApi.prototype.getPlayePicId = function () {
        return this.playerVo.pic;
    };
    // 获取头像
    PlayerVoApi.prototype.getPlayerSmallPic = function () {
        return "smallpic" + this.playerVo.pic;
    };
    // 获取全身像
    PlayerVoApi.prototype.getPlayerBigPic = function () {
        return "bigpic" + this.playerVo.pic;
    };
    // 获取用户名称
    PlayerVoApi.prototype.getPlayerName = function () {
        return this.playerVo.name;
    };
    // 获取用户等级
    PlayerVoApi.prototype.getPlayerLevel = function () {
        return this.playerVo.level;
    };
    // 获取用户经验值
    PlayerVoApi.prototype.getPlayerExp = function () {
        // todo
        return this.playerVo.exp;
    };
    // 获取用户vip等级
    PlayerVoApi.prototype.getPlayerVipLevel = function () {
        return this.playerVo.vip;
    };
    /**
     * 获取用户下一个VIP等级
     */
    PlayerVoApi.prototype.getPlayerNextVipLevel = function () {
        var level = this.playerVo.vip + 1;
        level = Math.min(Config.VipCfg.getMaxLevel(), level);
        return level;
    };
    // 获取用户vip经验
    PlayerVoApi.prototype.getPlayerVipExp = function () {
        return this.playerVo.vipexp;
    };
    /**
     * 获取用户元宝
     */
    PlayerVoApi.prototype.getPlayerGem = function () {
        return this.playerVo.gem;
    };
    /**
     * 获取用户元宝 用亿万显示
     */
    PlayerVoApi.prototype.getPlayerGemStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.gem);
    };
    /**
     * 获取用户银两
     */
    PlayerVoApi.prototype.getPlayerGold = function () {
        return this.playerVo.gold;
    };
    /**
     * 获取用户银两(亿万显示)
     */
    PlayerVoApi.prototype.getPlayerGoldStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.gold);
    };
    // 获取用户军团id
    PlayerVoApi.prototype.getPlayerAllianceId = function () {
        return this.playerVo.mygid;
    };
    // 获取用户军团名称
    PlayerVoApi.prototype.getPlayerAllianceName = function () {
        return this.playerVo.mygname;
    };
    /**
     * 获取用户势力值
     */
    PlayerVoApi.prototype.getPlayerPower = function () {
        return this.playerVo.power;
    };
    /**
     * 获取用户势力值(亿万显示)
     */
    PlayerVoApi.prototype.getPlayerPowerStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.power);
    };
    /**
     * 获取购买元宝的数量
     */
    PlayerVoApi.prototype.getPlayerBuyGem = function () {
        return this.playerVo.buyg;
    };
    /**
     * 获取粮食
     */
    PlayerVoApi.prototype.getFood = function () {
        return this.playerVo.food;
    };
    /**
     * 获取粮食 亿万显示
     */
    PlayerVoApi.prototype.getFoodStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.food);
    };
    /**
     * 官职
     */
    PlayerVoApi.prototype.getPlayerOffice = function () {
        return this.getPlayerOfficeByLevel(this.playerVo.level);
    };
    PlayerVoApi.prototype.getPlayerOfficeByLevel = function (level) {
        return LanguageManager.getlocal("officialTitle" + level);
    };
    /**
     * 上个官职
     */
    PlayerVoApi.prototype.getPlayerPrevOffice = function () {
        if (this.playerVo.level > 1) {
            return LanguageManager.getlocal("officialTitle" + (this.playerVo.level - 1));
        }
        return LanguageManager.getlocal("officialTitle" + this.playerVo.level);
    };
    /**
     * 获取士兵
     */
    PlayerVoApi.prototype.getSoldier = function () {
        return this.playerVo.soldier;
    };
    /**
     * 获取士兵 亿万显示
     */
    PlayerVoApi.prototype.getSoldierStr = function () {
        return App.StringUtil.changeIntToText(this.playerVo.soldier);
    };
    /**
     * 获取魅力
     */
    PlayerVoApi.prototype.getCharm = function () {
        return this.playerVo.charm;
    };
    /**
     * 获取智力
     */
    PlayerVoApi.prototype.getInte = function () {
        return this.playerVo.inte;
    };
    /**
     * 获取武力
     */
    PlayerVoApi.prototype.getAtk = function () {
        return this.playerVo.atk;
    };
    /**
     * 获取政治
     */
    PlayerVoApi.prototype.getPolitics = function () {
        return this.playerVo.politics;
    };
    /**
     * 获取称号
     */
    PlayerVoApi.prototype.getTitleid = function () {
        return this.playerVo.titleid;
    };
    // 获取升级所需经验
    PlayerVoApi.prototype.getNextLevelExp = function () {
        var curLevel = Api.playerVoApi.getPlayerLevel();
        if (curLevel < Config.LevelCfg.getMaxLevel()) {
            curLevel++;
        }
        return Config.LevelCfg.getCfgByLevel(curLevel.toString()).exp;
    };
    /**
     * 根据类型获取资源数量
     * @param type 类型 ItemEnums的枚举,支持key或者value
     */
    PlayerVoApi.prototype.getValueByResType = function (type) {
        if (typeof (type) != "number") {
            type = ItemEnums[type];
        }
        var num = 0;
        if (type == 1) {
            num = Api.playerVoApi.getPlayerGem();
        }
        else if (type == 2) {
            num = Api.playerVoApi.getPlayerGold();
        }
        else if (type == 3) {
            num = Api.playerVoApi.getFood();
        }
        else if (type == 4) {
            num = Api.playerVoApi.getSoldier();
        }
        else if (type == 5) {
            num = Api.playerVoApi.getPlayerExp();
        }
        return num;
    };
    PlayerVoApi.prototype.getCurLevelPrivilegeTxtStr = function (level) {
        level = level ? level : Api.playerVoApi.getPlayerLevel();
        var curLvCfg = Config.LevelCfg.getCfgByLevel(level.toString());
        if (!curLvCfg) {
            return LanguageManager.getlocal("promotionView_topLV");
        }
        var resultStr = "";
        var idx = 1;
        if (curLvCfg.servant) {
            resultStr += idx.toString() + "." + LanguageManager.getlocal("promotion_privilege6") + LanguageManager.getlocal("servant_name" + curLvCfg.servant) + "\n";
            idx += 1;
        }
        resultStr += (idx++) + "." + LanguageManager.getlocal("promotion_privilege1") + curLvCfg.gold + "\n"
            + (idx++) + "." + LanguageManager.getlocal("promotion_privilege2") + curLvCfg.food + "\n"
            + (idx++) + "." + LanguageManager.getlocal("promotion_privilege3") + curLvCfg.soldier + "\n"
            + (idx++) + "." + LanguageManager.getlocal("promotion_privilege4") + curLvCfg.affair + "\n"
            + (idx++) + "." + LanguageManager.getlocal("promotion_privilege7", [String(curLvCfg.gem)]);
        if (Api.practiceVoApi.isPracticeOPen()) {
            var plv = this.getPlayerLevel();
            var plvcfg = GameConfig.config.practicebaseCfg.level;
            var storeLimit = GameConfig.config.practicebaseCfg.storeLimit;
            var addV = plvcfg[plv - 1];
            var addV2 = storeLimit[plv - 1];
            if (!addV) {
                addV = plvcfg[plvcfg.length - 1];
            }
            if (!addV2) {
                addV2 = storeLimit[storeLimit.length - 1];
            }
            resultStr += "\n";
            resultStr = resultStr + (idx++) + "." + LanguageManager.getlocal("promotion_privilege8") + addV
                + "\n"
                + (idx++) + "." + LanguageManager.getlocal("promotion_privilege9") + addV2;
        }
        return resultStr;
    };
    /**
     * 获取用户形象（有官职的显示官职 ，通过ID判断）
     *
     * @param picId 官衔 pic 用户头像
     */
    PlayerVoApi.prototype.getPlayerPortrait = function (picId, pic, type) {
        var container = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        var num = 0;
        var loadComplete = function (container) {
            if (container) {
                if (container["loadusernum"] == null) {
                    container["loadusernum"] = 0;
                }
                container["loadusernum"]++;
                if (container["loadusernum"] == container["maxNum"]) {
                    if (container.getChildByName("myBody")) {
                        container.getChildByName("myBody").visible = true;
                    }
                    if (container.getChildByName("myHead")) {
                        container.getChildByName("myHead").visible = true;
                    }
                    if (container.getChildByName("myHair")) {
                        container.getChildByName("myHair").visible = true;
                    }
                }
            }
        };
        var picStr = "user_body";
        rect.setTo(0, 0, 300, 618);
        if (picId >= 1000) {
            picStr = "user_body_full_";
            rect.setTo(0, 0, 382, 618);
        }
        container["maxNum"] = 2;
        var hairPic = "user_hair" + pic;
        if (pic <= 5) {
            hairPic = "user_hair" + 7;
        }
        // if(pic > 5){
        var rect12 = egret.Rectangle.create();
        rect12.setTo(0, 0, 85, 140);
        var myHair = BaseLoadBitmap.create(hairPic, rect12, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myHair.visible = false;
        myHair.x = 111;
        myHair.y = -3;
        myHair.name = "myHair";
        container.addChild(myHair);
        container["maxNum"] = 3;
        // }
        var myBody = BaseLoadBitmap.create(picStr + picId, rect, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myBody.visible = false;
        myBody.name = "myBody";
        container.addChild(myBody);
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var myHead = BaseLoadBitmap.create("user_head" + pic, rect1, { callback: loadComplete, callbackThisObj: this, callbackParams: [container] });
        myHead.visible = false;
        myHead.x = 87;
        // myHead.x = myBody.x + myBody.width/2 - myHead.width/2
        myHead.name = "myHead";
        container.addChild(myHead);
        if (picId >= 1000) {
            myHead.x = 117;
            myHair.x = 141;
        }
        myBody.y = 91;
        return container;
    };
    PlayerVoApi.prototype.getMyPortrait = function () {
        var lv = this.getPlayerLevel();
        if (this.playerVo.titleid > 0) {
            lv = this.playerVo.titleid;
        }
        return this.getPlayerPortrait(lv, this.getPlayePicId());
    };
    PlayerVoApi.prototype.getUserHeadImgPath = function () {
        return "user_head" + this.getPlayePicId();
    };
    // 根据ID获取头像
    PlayerVoApi.prototype.getUserHeadImgPathById = function (pic) {
        return "user_head" + pic;
    };
    PlayerVoApi.prototype.getNo = function () {
        // this.playerVo.n
        // Api.playerVoApi.getTitleid()
    };
    PlayerVoApi.prototype.getVipHeadBg = function () {
        var titleCfg = Config.TitleCfg.getTitleCfg();
        for (var k in titleCfg) {
            var v = titleCfg[k];
            var titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
            if (v.isTitle == 2 && titleVo.num == 2) {
                return "head_circle_bg_" + k;
            }
        }
        return null;
    };
    PlayerVoApi.prototype.getVipHeadBgByTitle = function (title) {
        if (title && title != "0") {
            return "head_circle_bg_" + title;
        }
        return null;
    };
    /**
     * 获取用户圆头象
     * @param pic 用户头像id
     */
    PlayerVoApi.prototype.getPlayerCircleHead = function (pic, title) {
        if (title === void 0) { title = "-1"; }
        var container = new BaseDisplayObjectContainer();
        var headBg = "head_circle_bg";
        if (title == "-1") {
            if (this.getVipHeadBg()) {
                headBg = this.getVipHeadBg();
            }
        }
        else if (title && this.getVipHeadBgByTitle(title)) {
            headBg = this.getVipHeadBgByTitle(title);
        }
        var myBody = BaseBitmap.create(headBg);
        myBody.name = "myBody";
        container.addChild(myBody);
        // myBody.setPosition(-17,-17)
        if (this.getVipHeadBg()) {
            myBody.y = -3;
        }
        var myBody2 = BaseBitmap.create("head_circle_bg2");
        myBody2.name = "myBody2";
        container.addChild(myBody2);
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, 136, 143);
        var myHead = BaseLoadBitmap.create("user_head" + pic, rect1);
        myHead.x = 0;
        myHead.y = -10;
        myHead.setScale(2 / 3);
        myHead.name = "myHead";
        container.addChild(myHead);
        return container;
    };
    return PlayerVoApi;
}(BaseVoApi));
__reflect(PlayerVoApi.prototype, "PlayerVoApi");

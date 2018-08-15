/**
 * 游戏全局的数据或者方法，能归类的按类放入不同的文件，不能归类的放这里，如:
 * DeviceUtil.ts     设备相关的数据
 * DisplayUtil.ts    显示相关的方法等
 * GameConfig.ts     全局的游戏配置
 * author dmj
 * date 2017/9/15
 * @namespace GameData
 */
var GameData;
(function (GameData) {
    // 服务器id
    GameData.curZoneID = 1;
    // 合服前服务器id
    GameData.curOldZoneID = null;
    // 登录时临时存放的用户填写的绑定过的用户名
    // export let tmpUserName:string = "";
    // 登录时临时存放的用户填写的绑定过的用户密码
    GameData.tmpUserPassword = "";
    // 统计id
    GameData.statisticsId = 0;
    // 当前服务器名称
    GameData.curArea = "CN-15001";
    // 用户客户端ip
    GameData.client_ip = "127.0.0.1";
    // 用户平台id
    GameData.platId = "";
    // 用户uid
    GameData.userId = null;
    GameData.access_token = "0";
    GameData.logints = 0;
    GameData.localCfg = ["192.168", "localhost", "127.0.0.1", "local-test-82.raygame3.com"];
    GameData.testCfg = ["gt_test"];
    /**暂停心跳同步 默认false */
    GameData.pauseSync = false;
    /**心跳同步数据时间戳 */
    GameData.lastAutoSyncTime = 0;
    /**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
    GameData.serverClientTimeDt = 0;
    /**公告数据 */
    GameData.announcementData = {};
    /**玩吧礼包 */
    GameData.wbrewards = null;
    /**
     * 玩吧数据上报每多少个人上报一次
     */
    GameData.wanbaEvenyNumReport = 3;
    /**
     * 3kios 是否绑定手机
     */
    GameData.kkkIsBindIos = "0";
    /**
     * 聊天等级限制
     */
    GameData.chatlevel = 4;
    /**
     * 英文限制名字长度
     */
    GameData.nameLength = 10;
    /**
     * 客服信息
     */
    GameData.customerServiceData = null;
    /**
     * 是否使用新的UI
     */
    // export let isUseNewUI:boolean=false;
    ///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 
    // 解析model.gameinfo
    function formatGameInfo(data) {
        if (data.statisticsId) {
            GameData.statisticsId = Number(data.statisticsId);
        }
        if (data.pid) {
            GameData.platId = data.pid;
        }
    }
    GameData.formatGameInfo = formatGameInfo;
    // 获取国家，
    function getCountry() {
        if (PlatformManager.checkIsTWBSp() == true) {
            return "tw";
        }
        else if (PlatformManager.checkIsKRSp() == true) {
            return "kr";
        }
        else {
            return "cn";
        }
    }
    GameData.getCountry = getCountry;
    // 当前的渠道id
    function getCurPlatName() {
        return "0";
    }
    GameData.getCurPlatName = getCurPlatName;
    /**判断是否为本地地址 */
    function isLocal() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var url = window.location.href;
            for (var i = 0; i < GameData.localCfg.length; i++) {
                var str = GameData.localCfg[i];
                if (url.indexOf(str) > -1) {
                    result = true;
                    break;
                }
            }
        }
        else if (App.DeviceUtil.isWXgame()) {
            result = true;
        }
        else if (App.DeviceUtil.isWyw()) {
            result = true;
        }
        return result;
    }
    GameData.isLocal = isLocal;
    function isTest() {
        var result = false;
        if (App.DeviceUtil.IsHtml5()) {
            var url = window.location.href;
            for (var i = 0; i < GameData.testCfg.length; i++) {
                var str = GameData.testCfg[i];
                if (url.indexOf(str) > -1) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    GameData.isTest = isTest;
    /**
     * 解析奖励物品格式
     * @param rewards 奖励原始数据
     */
    function formatRewardItem(rewards) {
        var arr = new Array();
        // 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                //如果不开称帝，前端屏蔽人望奖励
                if (!Api.switchVoApi.checkOpenPrestige()) {
                    if (rewardItemVo.type == 17) {
                        continue;
                    }
                }
                arr.push(rewardItemVo);
            }
        }
        return arr;
    }
    GameData.formatRewardItem = formatRewardItem;
    /**
     * 解析奖励物品格式 返回奖励文本 金币+100 粮食+100 士兵 +100
     * @param rewards 奖励原始数据
     */
    function getRewardsStr(rewards) {
        var rewardsStr = "";
        // 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                if (rewardsStr == "") {
                    rewardsStr = rewardItemVo.message;
                }
                else {
                    rewardsStr = rewardsStr + " " + rewardItemVo.message;
                }
            }
        }
        return rewardsStr;
    }
    GameData.getRewardsStr = getRewardsStr;
    /**
     * 获取物品Icon
     * @param itemVo 物品模型
     * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
     * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
     */
    function getItemIcon(itemVo, isTouchShowInfo, isShowEffect) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        var container = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create(itemVo.iconBg);
        container.addChild(iconBg);
        container.width = iconBg.width;
        container.height = iconBg.height;
        var icon = BaseLoadBitmap.create(itemVo.icon);
        var firstChar = itemVo.icon.substr(0, 13);
        if (firstChar == "servant_half_") {
            icon.setScale(100 / 180);
        }
        if (itemVo.type == 10) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        if (itemVo.type == 12) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        if (itemVo.type == 16) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        container.addChild(icon);
        container.bindData = itemVo;
        icon.setPosition(4, 3);
        if (itemVo.type == 12) {
            icon.x = 0;
        }
        if ((itemVo instanceof RewardItemVo) && itemVo.num) {
            if (itemVo.type == 15 || itemVo.type == 14 || itemVo.type == 16) {
                var numbg = BaseBitmap.create("public_itemtipbg2");
                numbg.width = 100;
                numbg.scaleY = 22 / numbg.height;
                numbg.setPosition(container.width / 2 - numbg.width / 2, container.height - 22);
                container.addChild(numbg);
                var numberstr = LanguageManager.getlocal("itemName_" + itemVo.type) + itemVo.num;
                if (itemVo.id > 10) {
                    numberstr = itemVo.num.toString();
                    numbg.visible = false;
                }
                var numLb = ComponentManager.getTextField(numberstr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                numLb.name = "numLb";
                numLb.setPosition(iconBg.width / 2 - numLb.width / 2, iconBg.height - 3 - numLb.height);
                container.addChild(numLb);
                if (itemVo.id > 10) {
                    numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                }
            }
            else {
                var numLb = ComponentManager.getTextField(itemVo.num.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                numLb.name = "numLb";
                numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                container.addChild(numLb);
            }
        }
        if (isTouchShowInfo) {
            iconBg.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, GameData, [(itemVo instanceof RewardItemVo) ? itemVo : itemVo.id]);
        }
        if (isShowEffect) {
            var temScale = 1 / 0.74;
            var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            effectClip.x = icon.x + 50 - 198 * temScale / 2;
            effectClip.y = icon.y + 52 - 197 * temScale / 2;
            container.addChild(effectClip);
            effectClip.scaleX = effectClip.scaleY = temScale;
            effectClip.playWithTime(-1);
        }
        return container;
    }
    GameData.getItemIcon = getItemIcon;
    /**
     * 获取奖励物品Icon
     * @param rewards 奖励原始数据
     * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
     * @param isShowEffect 是否显示特效
     */
    function getRewardItemIcons(rewards, isTouchShowInfo, isShowEffect) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        var arr = new Array();
        var rewardsArr = GameData.formatRewardItem(rewards);
        for (var i = 0; i < rewardsArr.length; i++) {
            var rewardItemIcon = GameData.getItemIcon(rewardsArr[i], isTouchShowInfo, isShowEffect);
            arr.push(rewardItemIcon);
        }
        return arr;
    }
    GameData.getRewardItemIcons = getRewardItemIcons;
    function getRewardItemVoByIdAndType(type, id) {
        if (type) {
            return formatRewardItem(type + "_" + id + "_0")[0];
        }
        return null;
    }
    GameData.getRewardItemVoByIdAndType = getRewardItemVoByIdAndType;
    function getRewardItemIconByIdAndType(type, id, isTouchShowInfo, num) {
        if (type) {
            return getRewardItemIcons(type + "_" + id + "_" + String(num ? num : 0), isTouchShowInfo)[0];
        }
        return null;
    }
    GameData.getRewardItemIconByIdAndType = getRewardItemIconByIdAndType;
    /**
     * 根据icon名字和背景名字获取icon图标
     * @param iconName
     * @param iconBgName
     */
    function getIconContainer(iconName, iconBgName) {
        var container = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create(iconBgName);
        container.addChild(bg);
        bg.name = "iconBg";
        var icon = BaseLoadBitmap.create(iconName, null, { callback: function (container) {
                if (container) {
                    var bg_1 = container.getChildByName("iconBg");
                    var icon_1 = container.getChildByName("icon");
                    if (bg_1 && icon_1) {
                        icon_1.setPosition((bg_1.width - icon_1.width) / 2, (bg_1.height - icon_1.height) / 2);
                    }
                }
            }, callbackThisObj: GameData, callbackParams: [container] });
        container.addChild(icon);
        icon.name = "icon";
        return container;
    }
    GameData.getIconContainer = getIconContainer;
    function dispose() {
        GameData.limitVipLv = null;
        GameData.closeSource = NaN;
        GameData.customerServiceData = null;
    }
    GameData.dispose = dispose;
})(GameData || (GameData = {}));

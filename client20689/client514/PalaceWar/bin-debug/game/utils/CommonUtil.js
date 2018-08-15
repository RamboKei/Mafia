var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 公共方法类
 * author dmj
 * date 2017/9/27
 * @class CommonUtil
 */
var App;
(function (App) {
    var CommonUtil = (function () {
        function CommonUtil() {
        }
        /**
         * 背包使用道具后飘字动画
         * 对icon、文字数组进行缓动，目前是向上移动（可扩展）
         * @param list icon：图标，message：文字
         * @param startPoint 开始位置相对全局坐标，可选，不传的话为屏幕中心
         */
        CommonUtil.playRewardFlyAction = function (list, startPoint, waitTime) {
            if (waitTime === void 0) { waitTime = 800; }
            var _loop_1 = function (i) {
                var play = function () {
                    var item = list[i];
                    var rewardFly = new RewardFly();
                    rewardFly.init(item.icon, item.tipMessage, item.type);
                    if (startPoint) {
                        rewardFly.setPosition(startPoint.x, startPoint.y);
                    }
                    else {
                        rewardFly.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 100);
                    }
                    LayerManager.msgLayer.addChild(rewardFly);
                };
                egret.setTimeout(play, this_1, waitTime * i);
            };
            var this_1 = this;
            for (var i = 0; i < list.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * 游戏内提示
         * @param message 需要提示的文字
         */
        CommonUtil.showTip = function (message) {
            var tipContainer = CommonUtil._tipContainer;
            var txtLine = 1;
            if (!tipContainer) {
                var tipContainer_1 = new BaseDisplayObjectContainer();
                var tipBg = BaseBitmap.create("public_tipbg");
                tipBg.setPosition(-tipBg.width / 2, -tipBg.height / 2);
                tipBg.name = "tipBg";
                tipContainer_1.addChild(tipBg);
                var msgText = ComponentManager.getTextField(message, TextFieldConst.FONTSIZE_TITLE_SMALL);
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                msgText.textAlign = egret.HorizontalAlign.CENTER;
                msgText.name = "msgText";
                msgText.lineSpacing = 2;
                txtLine = msgText.numLines;
                tipContainer_1.addChild(msgText);
                tipContainer_1.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                LayerManager.msgLayer.addChild(tipContainer_1);
                CommonUtil._tipContainer = tipContainer_1;
            }
            else {
                var tipBg = tipContainer.getChildByName("tipBg");
                if (!tipBg.texture) {
                    tipBg.texture = ResourceManager.getRes("public_tipbg");
                }
                var msgText = CommonUtil._tipContainer.getChildByName("msgText");
                msgText.text = message;
                msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
                tipContainer.setScale(1);
                tipContainer.alpha = 1;
                egret.Tween.removeTweens(tipContainer);
                tipContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                txtLine = msgText.numLines;
                if (!LayerManager.msgLayer.contains(tipContainer)) {
                    LayerManager.msgLayer.addChild(tipContainer);
                }
            }
            egret.Tween.get(CommonUtil._tipContainer).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 70).wait(1300 * txtLine).to({ alpha: 0 }, 200).call(function (tipContainer) {
                if (tipContainer) {
                    egret.Tween.removeTweens(tipContainer);
                    if (LayerManager.msgLayer.contains(tipContainer)) {
                        LayerManager.msgLayer.removeChild(tipContainer);
                    }
                    tipContainer.setScale(1);
                    tipContainer.alpha = 1;
                }
            }.bind(this, CommonUtil._tipContainer), this);
        };
        CommonUtil.showCollectEffect = function (resKey, startPoint, endPoint, callback, callbackThisObj, callbackParams) {
            var collectEffect = new CollectEffect();
            collectEffect.start(resKey, startPoint, endPoint, callback, callbackThisObj, callbackParams);
        };
        /**
         * 获取居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterPos = function (referenceContainer, childDisplayObject, isParent) {
            return { x: CommonUtil.getCenterX(referenceContainer, childDisplayObject, isParent), y: CommonUtil.getCenterY(referenceContainer, childDisplayObject, isParent) };
        };
        /**
         * 获取X居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterX = function (referenceContainer, childDisplayObject, isParent) {
            var x = 0;
            var scaleX = 1;
            if (!isParent) {
                x = referenceContainer.x;
                scaleX = referenceContainer.scaleX;
            }
            x += (referenceContainer.width * scaleX - referenceContainer.anchorOffsetX - childDisplayObject.width * childDisplayObject.scaleX + childDisplayObject.anchorOffsetX) * 0.5;
            return x;
        };
        /**
         * 获取Y居中对齐位置
         * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
         * @param childDisplayObject 需要布局的对象
         * @param isParent 是否是父容器，如果不是则为同级参考对象
         */
        CommonUtil.getCenterY = function (referenceContainer, childDisplayObject, isParent) {
            var y = 0;
            var scaleY = 1;
            if (!isParent) {
                y = referenceContainer.y;
                scaleY = referenceContainer.scaleY;
            }
            y += (referenceContainer.height * scaleY - referenceContainer.anchorOffsetY - childDisplayObject.height * childDisplayObject.scaleY + childDisplayObject.anchorOffsetY) * 0.5;
            return y;
        };
        CommonUtil.getContainerByLeftHalfRes = function (leftRes) {
            var container = new BaseDisplayObjectContainer();
            var leftBmp = BaseBitmap.create(leftRes);
            container.addChild(leftBmp);
            var rightBmp = BaseBitmap.create(leftRes);
            rightBmp.scaleX = -1;
            rightBmp.x = leftBmp.x + leftBmp.width + rightBmp.width;
            container.addChild(rightBmp);
            return container;
        };
        CommonUtil.getContainerByLeftTopRes = function (resUrl) {
            var container = new BaseDisplayObjectContainer();
            for (var i = 0; i < 4; i++) {
                var bmp = BaseBitmap.create(resUrl);
                var xx = 0;
                var yy = 0;
                if (i % 2 == 1) {
                    bmp.scaleX = -1;
                    xx = bmp.width * 2;
                }
                if (Math.floor(i / 2) > 0) {
                    bmp.scaleY = -1;
                    yy = bmp.height * 2;
                }
                bmp.setPosition(xx, yy);
                container.addChild(bmp);
            }
            return container;
        };
        CommonUtil.createMainUIIcon = function (iconUrl, iconNameStr, isShow, extType) {
            if (iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp() == true) {
                iconNameStr = "share_icon_name_aiweiyou";
            }
            var iconContainer = new BaseDisplayObjectContainer();
            var iconBg = BaseBitmap.create("mainui_bottombtnbg");
            iconContainer.addChild(iconBg);
            iconContainer.width = iconBg.width;
            iconContainer.height = iconBg.height;
            iconContainer.anchorOffsetX = iconBg.width / 2;
            iconContainer.anchorOffsetY = iconBg.height / 2;
            iconContainer.name = iconNameStr;
            if (extType) {
                var iconExtBg_1 = BaseLoadBitmap.create("ac_icon_bg" + extType, null, { callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        iconExtBg_1.setPosition(iconBg.x + (iconBg.width - iconExtBg_1.width) / 2, iconBg.y + (iconBg.height - iconExtBg_1.height) / 2);
                        iconContainer.addChildAt(iconExtBg_1, 1);
                    }, callbackThisObj: CommonUtil });
            }
            if (isShow) {
                var iconAni = BaseBitmap.create("mainui_iconani");
                iconAni.anchorOffsetX = iconAni.width / 2;
                iconAni.anchorOffsetY = iconAni.height / 2;
                iconAni.setPosition(iconContainer.width / 2, iconContainer.height / 2);
                iconContainer.addChild(iconAni);
                egret.Tween.get(iconAni, { loop: true })
                    .to({ rotation: 360 }, 1000);
            }
            var icon = BaseLoadBitmap.create(iconUrl);
            iconContainer.addChild(icon);
            //加载完图片重新设置尺寸
            var iconName = BaseLoadBitmap.create(iconNameStr, null, { callback: function (container) {
                    if (container) {
                        iconName.setPosition(container.width / 2 - (iconName.width ? iconName.width : 88) / 2, 50);
                    }
                }, callbackThisObj: this, callbackParams: [iconContainer] });
            iconContainer.addChild(iconName);
            // iocnName.setPosition(-8.5,50);
            iconContainer.addTouch(function (event, iconContainer) {
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        iconContainer.setScale(0.95);
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        iconContainer.setScale(1);
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        iconContainer.setScale(1);
                        break;
                }
            }, this, [iconContainer]);
            return iconContainer;
        };
        /**
         * 添加红点提示
         * @param bdoc 父容器
         */
        CommonUtil.addRedDotToBDOC = function (bdoc) {
            if (bdoc && bdoc.getChildByName("reddot")) {
                var reddot = bdoc.getChildByName("reddot");
                if (reddot) {
                    reddot.visible = true;
                }
            }
            else {
                var reddot = BaseBitmap.create("public_dot2");
                reddot.x = bdoc.width - reddot.width;
                // reddot.y = 3;
                bdoc.addChild(reddot);
                reddot.name = "reddot";
            }
        };
        /**
         * 移除红点提示
         * @param bdoc 父容器
         */
        CommonUtil.removeRedDotFromBDOC = function (bdoc) {
            if (bdoc && bdoc.getChildByName("reddot")) {
                var reddot = bdoc.getChildByName("reddot");
                if (reddot) {
                    reddot.visible = false;
                }
            }
        };
        CommonUtil.createTalkContainer = function (talkStr, isNpcAtLeft, offX) {
            if (isNpcAtLeft === void 0) { isNpcAtLeft = true; }
            var talkContainer = new BaseDisplayObjectContainer();
            //说的话背景
            var talkBg = BaseBitmap.create("public_npc_talkbg");
            talkContainer.addChild(talkBg);
            //箭头
            var talkArrow = BaseBitmap.create("public_npc_talkarrow");
            if (isNpcAtLeft == false) {
                talkArrow.skewY = 1;
            }
            //说的话
            var wordsText = ComponentManager.getTextField(talkStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            talkBg.width = wordsText.width + 26;
            // talkBg.height = 50;
            if (isNpcAtLeft) {
                if (offX) {
                    if (!isNaN(offX.lx)) {
                        talkBg.setPosition(talkArrow.x - 33, talkArrow.y - talkBg.height + 2);
                    }
                    else if (!isNaN(offX.rx)) {
                        talkBg.setPosition(talkArrow.x + talkArrow.width - talkBg.width + 33, talkArrow.y - talkBg.height + 2);
                    }
                    else {
                        talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                    }
                }
                else {
                    talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                }
            }
            else {
                if (offX) {
                    if (!isNaN(offX.lx)) {
                        talkBg.setPosition(talkArrow.x - talkArrow.width - 33, talkArrow.y - talkBg.height + 2);
                    }
                    else if (!isNaN(offX.rx)) {
                        talkBg.setPosition(talkArrow.x - talkBg.width + 33, talkArrow.y - talkBg.height + 2);
                    }
                    else {
                        talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                    }
                }
                else {
                    talkBg.setPosition(talkArrow.x - talkBg.width / 2, talkArrow.y - talkBg.height + 2);
                }
            }
            talkContainer.addChild(talkArrow);
            wordsText.width = talkBg.width - 26;
            wordsText.x = talkBg.x + 13;
            wordsText.y = talkBg.y + (talkBg.height - wordsText.height) / 2;
            talkContainer.addChild(wordsText);
            return talkContainer;
        };
        /**
         * 播放天恩赐福动画
         * @param key 名字
         */
        CommonUtil.showGodbless = function (key) {
            var godBless = new GodBless();
            LayerManager.msgLayer.addChild(godBless);
            godBless.show(key);
        };
        /**
         * 添加点击缩小效果
         * @param obj 对象
         * @param callback 回调
         */
        CommonUtil.addTouchScaleEffect = function (obj, callback, handler) {
            obj.addTouch(function (event, obj, callback, handler) {
                var scale = 0.9;
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        obj.setScale(0.9);
                        obj.x += (obj.width * (1 - scale)) / 2;
                        obj.y += (obj.height * (1 - scale)) / 2;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        obj.setScale(1);
                        obj.x -= (obj.width * (1 - scale)) / 2;
                        obj.y -= (obj.height * (1 - scale)) / 2;
                        callback.apply(handler);
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        obj.setScale(1);
                        obj.x -= (obj.width * (1 - scale)) / 2;
                        obj.y -= (obj.height * (1 - scale)) / 2;
                        // callback.apply(handler);
                        break;
                }
            }, CommonUtil, [obj, callback, handler]);
        };
        /**
         * 获取带单位的货币字符串
         * @param money 钱数，不带单位
         */
        CommonUtil.getMoneyString = function (money) {
            var moneyKey = "anyMoney";
            if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS()) {
                moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
            }
            return LanguageManager.getlocal(moneyKey, [money.toString()]);
        };
        /**
         * 比较两个版本号的大小，1前者大，0相等，-1后者大
         * 注意，1.0小于1.0.0
         */
        CommonUtil.compareVersion = function (v1, v2) {
            var v1Arr = v1.split(".");
            var v2Arr = v2.split(".");
            var maxLen = Math.max(v1Arr.length, v2Arr.length);
            for (var i = 0; i < maxLen; i++) {
                var v1value = v1Arr[i];
                var v2value = v2Arr[i];
                if (v1value === undefined) {
                    return -1;
                }
                if (v2value === undefined) {
                    return 1;
                }
                if (parseInt(v1value) > parseInt(v2value)) {
                    return 1;
                }
                else if (parseInt(v1value) < parseInt(v2value)) {
                    return -1;
                }
            }
            return 0;
        };
        // 获取url参数，对egret.getOption的封装，对于不支持的平台返回空字符串
        CommonUtil.getOption = function (keyName) {
            if (App.DeviceUtil.IsHtml5()) {
                return egret.getOption(keyName);
            }
            else {
                return "";
            }
        };
        CommonUtil.formatSeaScreen = function (target) {
            if (App.DeviceUtil.checkIsSeascreen()) {
                target.scaleY = (document.documentElement.clientHeight - 50) / document.documentElement.clientHeight;
                target.y = GameConfig.seaScreenTopH;
            }
        };
        return CommonUtil;
    }());
    App.CommonUtil = CommonUtil;
    __reflect(CommonUtil.prototype, "App.CommonUtil");
})(App || (App = {}));

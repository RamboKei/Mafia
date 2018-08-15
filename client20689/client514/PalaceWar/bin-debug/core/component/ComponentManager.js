/**
 * 组件管理类
 * author dmj
 * date 2017/9/11
 * @class ComponentManager
 */
var ComponentManager;
(function (ComponentManager) {
    /**
     * 获取按钮
     * @param buttonName   按钮图片名称
     * @param textStr      按钮文字对应的key
     * @param callback     点击回调函数
     * @param handler
     * @param param        参数
     * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
     */
    function getButton(buttonName, textStr, callback, handler, param, noDownImgType) {
        var fontSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        var textColor = TextFieldConst.COLOR_WHITE;
        switch (buttonName) {
            case ButtonConst.BTN_SMALL_BLUE:
            case ButtonConst.BTN_SMALL_YELLOW:
            case ButtonConst.BTN_SMALL_RED:
                fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
                break;
            default:
                fontSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
                break;
        }
        textColor = 0;
        var btn = new BaseButton();
        btn.init(buttonName, textStr, callback, handler, param, fontSize, noDownImgType);
        btn.setColor(textColor);
        return btn;
    }
    ComponentManager.getButton = getButton;
    /**
     * 获取tabbar组件
     * @param buttonName     按钮图片名称
     * @param textArr        所有按钮显示文字
     * @param callback       按钮回调函数
     * @param handler        按钮所属对象
     * @param param          参数
     */
    function getTabBarGroup(buttonName, textArr, callback, handler, param) {
        var color = TextFieldConst.COLOR_BLACK;
        var selectedColor = TextFieldConst.COLOR_BLACK;
        var tbg = new TabBarGroup();
        tbg.init(buttonName, textArr, callback, handler, param);
        tbg.setColor(color, selectedColor);
        return tbg;
    }
    ComponentManager.getTabBarGroup = getTabBarGroup;
    /**
     * 获取ProgressBar组件
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     * @param barHeight     进度条高度
     */
    function getProgressBar(barName, barBgName, barWidth) {
        var bar = new ProgressBar();
        bar.init(barName, barBgName, barWidth);
        return bar;
    }
    ComponentManager.getProgressBar = getProgressBar;
    /**
     * 获取CustomMovieClip组件
     * @param imageNamePre   图片名称前缀
     * @param frameCount     帧数
     * @param frameRate      帧频 (毫秒)
     */
    function getCustomMovieClip(imageNamePre, frameCount, frameRate) {
        var clip = new CustomMovieClip();
        var resArr = [];
        if (imageNamePre && frameCount) {
            for (var i = 1; i <= frameCount; i++) {
                resArr.push(imageNamePre + i);
            }
            clip.frameImages = resArr;
        }
        clip.playFrameRate = frameRate;
        return clip;
    }
    ComponentManager.getCustomMovieClip = getCustomMovieClip;
    /**
     * 给显示对象添加滑动，注意这个不是滑动列表，如果要使用滑动列表请调用ComponentManager.getScrollList
     * @param content 需要添加滑动的对象
     * @param scrollRect 设置content坐标，设置可显示区域大小 使用egret.Rectangle.create()生成，然后用setto修改
     */
    function getScrollView(content, scrollRect) {
        var scrollView = new ScrollView();
        scrollView.setContent(content);
        scrollView.width = scrollRect.width;
        scrollView.height = scrollRect.height;
        scrollView.x = scrollRect.x;
        scrollView.y = scrollRect.y;
        return scrollView;
    }
    ComponentManager.getScrollView = getScrollView;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontSize      字体大小必填，通过TextFieldConst.ts获取
     * @param color         字体颜色
     */
    function getTextField(textStr, fontSize, color) {
        var tf = new BaseTextField();
        tf.text = textStr;
        tf.size = fontSize;
        if (color) {
            tf.setColor(color);
        }
        return tf;
    }
    ComponentManager.getTextField = getTextField;
    /**
     * 获取滑动列表
     * @param scrollListClass 滑动列表元素类，继承ScrollListItem类，重写initItem方法实现
     * @param dataList 滑动列表数据
     * @param scrollRect 滑动列表相对父容器的位置和显示区域
     */
    function getScrollList(scrollListClass, dataList, scrollRect) {
        var scrollList = new ScrollList();
        scrollList.init(scrollListClass, dataList, scrollRect);
        return scrollList;
    }
    ComponentManager.getScrollList = getScrollList;
    /**
     * 获取拖动进度条
     * @param barName 进度条资源名
     * @param barBgName 进度条背景资源名
     * @param maxNum 最大值
     * @param callback 值变化回调
     * @param callbackThisObject 回调用户对象
     * @param callbackParams 回调自定义参数，回调第二个参数开始
     * @param minNum 最小值 默认为1
     */
    function getDragProgressBar(barName, barBgName, maxNum, callback, callbackThisObject, callbackParams, minNum, barWidth) {
        if (minNum === void 0) { minNum = 1; }
        var dragProgressBar = new DragProgressBar();
        dragProgressBar.init(barName, barBgName, barWidth);
        dragProgressBar.setDragPercent(minNum, maxNum, minNum);
        dragProgressBar.setCallBack(callback, callbackThisObject, callbackParams);
        return dragProgressBar;
    }
    ComponentManager.getDragProgressBar = getDragProgressBar;
    /**
     * 获取自定义文本
     * @param textStr       文本
     * @param fontName      fnt
     */
    function getBitmapText(textStr, fontName) {
        var bt = new BaseBitmapText();
        bt.font = ResourceManager.getRes(fontName);
        bt.text = textStr;
        return bt;
    }
    ComponentManager.getBitmapText = getBitmapText;
    /**
     * 获取CircleProgressBar组件
     * @param barName     	进度条图片名称

     */
    function getCircleProgressBar(barName) {
        var bar = new CircleProgressBar();
        bar.init(barName);
        return bar;
    }
    ComponentManager.getCircleProgressBar = getCircleProgressBar;
    /**
     * 获得复选框
     * @param desc 文字
     */
    function getCheckBox(desc) {
        var checkBox = new CheckBox();
        checkBox.init(desc);
        return checkBox;
    }
    ComponentManager.getCheckBox = getCheckBox;
    /**
     * 获取资源条
     * @param type 资源类型
     * @param isAutoRefresh 是否自己刷新
     * @param width 宽度
     */
    function getResBar(type, isAutoRefresh, width) {
        var resBar = new ResBar();
        resBar.init(type, isAutoRefresh, width);
        return resBar;
    }
    ComponentManager.getResBar = getResBar;
    /**
     * 获取输入框
     * @param fontSize      字体大小必填，通过TextFieldConst.ts获取
     * @param textColor     文本颜色
     * @param bgName        输入框背景
     * @param witdh         背景宽
     * @param height        背景高
     * @param placeholder   占位文本
     * @param placeholderColor        占位文本颜色
     * @param initStr        初始化文本
     */
    function getInputTextField(textColor, fontSize, width, height, bgName, placeholder, placeholderColor, initStr) {
        var container = new BaseDisplayObjectContainer();
        var tf = new BaseTextField();
        container.addChild(tf);
        tf.name = "textField";
        tf.textColor = textColor;
        tf.size = fontSize;
        var tfBg = BaseBitmap.create(bgName);
        tfBg.width = width;
        tfBg.height = height;
        container.addChild(tfBg);
        tf.type = egret.TextFieldType.INPUT;
        tf.size = fontSize;
        tf.width = width - 10;
        tf.x = tfBg.x + tfBg.width / 2 - tf.width / 2;
        tf.y = tfBg.y + tfBg.height / 2 - fontSize / 2;
        container.addChild(tf);
        if (initStr && initStr != "") {
            tf.bindData = true;
        }
        else {
            tf.bindData = false;
        }
        if (placeholder) {
            if (!initStr || initStr == "") {
                tf.text = placeholder;
                tf.textColor = placeholderColor;
            }
            else {
                tf.text = initStr;
            }
            tf.addEventListener(egret.FocusEvent.FOCUS_IN, function (e) {
                // if(tf.text == placeholder && tf.textColor == placeholderColor){
                // 	//删除占位
                // 	tf.text = "";
                // 	tf.textColor = textColor;
                // }
                if (tf.bindData == false) {
                    //删除占位
                    tf.text = "";
                    tf.textColor = textColor;
                }
            }, null);
            tf.addEventListener(egret.FocusEvent.FOCUS_OUT, function (e) {
                if (tf.text == "") {
                    //出现占位
                    tf.bindData = false;
                    tf.text = placeholder;
                    tf.textColor = placeholderColor;
                }
                else {
                    tf.bindData = true;
                }
            }, null);
        }
        return container;
    }
    ComponentManager.getInputTextField = getInputTextField;
})(ComponentManager || (ComponentManager = {}));

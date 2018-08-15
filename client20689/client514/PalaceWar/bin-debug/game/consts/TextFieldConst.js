/**
 * 文本自定义配置
 * author dmj
 * date 2017/9/11
 * @class TextFieldConst
 */
var TextFieldConst;
(function (TextFieldConst) {
    ///////字体大小配置start//////
    /**标题副标题字号大小 */
    /**
     * 大标题
     * 32
     */
    TextFieldConst.FONTSIZE_TITLE_BIG = 32;
    /**
     * 弹板标题
     * 26
     */
    TextFieldConst.FONTSIZE_TITLE_COMMON = 26;
    /**
     * 小标题
     * 24
     */
    TextFieldConst.FONTSIZE_TITLE_SMALL = 24;
    /**除标题、按钮外，都用context字号大小 */
    /**
     * 名称，字段等用common
     * 22
     */
    TextFieldConst.FONTSIZE_CONTENT_COMMON = 22;
    /**
     * 道具描述等用small
     * 20
     */
    TextFieldConst.FONTSIZE_CONTENT_SMALL = 20;
    /**
     * 按钮字号大小 24
     * 按钮暂时就common
     */
    TextFieldConst.FONTSIZE_BUTTON_COMMON = 24;
    ///////字体大小配置end///////
    ///////字体颜色配置start//////
    /**
     * 深黑
     */
    TextFieldConst.COLOR_BLACK = 0x272727;
    /**
     * 淡黄
     */
    TextFieldConst.COLOR_LIGHT_YELLOW = 0xfcf3b4;
    /**
     * 白色
     */
    TextFieldConst.COLOR_WHITE = 0xfff7e8;
    /**
     * 褐色
     */
    TextFieldConst.COLOR_BROWN = 0x3e1f0f;
    /**
     * 土红
     */
    TextFieldConst.COLOR_LIGHT_RED = 0xd1946e;
    /**
     * 提示黄
     */
    TextFieldConst.COLOR_WARN_YELLOW = 0xfedb38;
    /**
     * 提示黄2，颜色更深，适合放到亮色底板
     */
    TextFieldConst.COLOR_WARN_YELLOW2 = 0xa87e00;
    /**
     * 提示红
     */
    TextFieldConst.COLOR_WARN_RED = 0xce1515;
    /**
     * 提示红2，颜色更深，适合放到亮色底板
     */
    TextFieldConst.COLOR_WARN_RED2 = 0xbb2800;
    /**
     * 提示红3
     */
    TextFieldConst.COLOR_WARN_RED3 = 0xff3c3c;
    /**
     * 提示绿
     */
    TextFieldConst.COLOR_WARN_GREEN = 0x21eb39;
    /**
     * 提示绿，颜色更深，适合放到亮色底板
     */
    TextFieldConst.COLOR_WARN_GREEN2 = 0x3e9b00;
    /**
     * 品质灰
     */
    TextFieldConst.COLOR_QUALITY_GRAY = 0xdfdfdf;
    /**
     * 品质白
     */
    TextFieldConst.COLOR_QUALITY_WHITE = 0xdfdfdf;
    /**
     * 品质绿
     */
    TextFieldConst.COLOR_QUALITY_GREEN = 0x65eb5d;
    /**
     * 品质蓝
     */
    TextFieldConst.COLOR_QUALITY_BLUE = 0x649efa;
    /**
     * 品质紫
     */
    TextFieldConst.COLOR_QUALITY_PURPLE = 0xca6cfa;
    /**
     * 品质橙
     */
    TextFieldConst.COLOR_QUALITY_ORANGE = 0xffaf5a;
    /**
     * 品质红
     */
    TextFieldConst.COLOR_QUALITY_RED = 0xce1515;
    /**
     * 品质黄
     */
    TextFieldConst.COLOR_QUALITY_YELLOW = 0xfedb38;
    ///////字体颜色配置end///////
    // 对齐方式
    TextFieldConst.ALIGH_LEFT = egret.HorizontalAlign.LEFT;
    TextFieldConst.ALIGH_RIGHT = egret.HorizontalAlign.RIGHT;
    /**左右居中 */
    TextFieldConst.ALIGH_CENTER = egret.HorizontalAlign.CENTER;
    TextFieldConst.ALIGH_BOTTOM = egret.VerticalAlign.BOTTOM;
    TextFieldConst.ALIGH_TOP = egret.VerticalAlign.TOP;
    /**上下居中 */
    TextFieldConst.ALIGH_MIDDLE = egret.VerticalAlign.MIDDLE;
    //font name
    TextFieldConst.FONTNAME_BOSS_SCORE = "socre_fnt";
    TextFieldConst.FONTNAME_ITEMTIP = "tip_fnt";
})(TextFieldConst || (TextFieldConst = {}));

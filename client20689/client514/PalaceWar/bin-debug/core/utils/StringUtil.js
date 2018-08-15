/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App;
(function (App) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
        * 二进制解析为字符串
        * @param array
        */
        StringUtil.dump = function (array) {
            var s = "";
            var a = "";
            for (var i = 0; i < array.length; i++) {
                if (i % 16 == 0) {
                    s += ("0000" + i.toString(16)).substring(-4, 4) + " ";
                }
                if (i % 8 == 0) {
                    s += " ";
                }
                var v = array[i];
                s += ("0" + v.toString(16)).substring(-2, 2) + " ";
                if (((i + 1) % 16) == 0 || i == (array.length - 1)) {
                    s += " |" + a + "|\n";
                    a = "";
                }
            }
            return s;
        };
        /**
         * 强制转化为字符串
         * @param data 需要转换的数据，例如json，数字等
         */
        StringUtil.toString = function (data) {
            var dataStr = undefined;
            if (typeof (data) == "object") {
                try {
                    dataStr = JSON.stringify(data);
                }
                catch (e) {
                    if (true) {
                        dataStr = "StringUtil.toString():Error=" + String(data);
                    }
                }
            }
            else {
                dataStr = String(data);
            }
            return dataStr;
        };
        /**
        * 当数字超过100000000时，转化为“亿”的描述
        * @param value 数据
        * @return 目标字符串
        *
        */
        StringUtil.changeIntToText = function (value) {
            if (value === void 0) { value = 0; }
            //如果是英文 则转化为 million billion trillion等
            if (PlatformManager.checkIsEnSp()) {
                var enStr = "";
                if (value >= 1000000000000) {
                    enStr += (value / 1000000000000).toFixed(3) + LanguageManager.getlocal("coinformat_4");
                }
                else if (value >= 1000000000) {
                    enStr += (value / 1000000000).toFixed(2) + LanguageManager.getlocal("coinformat_2");
                }
                else if (value >= 1000000) {
                    enStr += (value / 1000000).toFixed(2) + LanguageManager.getlocal("coinformat_1");
                }
                else if (value < 0) {
                    enStr += "0";
                }
                else {
                    enStr += value.toFixed(0);
                }
                return enStr;
            }
            var str = "";
            var baseNum = 100000000;
            if (value >= 100000 * baseNum) {
                str += (value / 10000 / baseNum).toFixed(3) + LanguageManager.getlocal("coinformat_4");
            }
            else if (value >= 1000 * baseNum) {
                str += (value / baseNum).toFixed(0) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 100 * baseNum) {
                str += (value / baseNum).toFixed(1) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 10 * baseNum) {
                str += (value / baseNum).toFixed(2) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= baseNum) {
                str += (value / baseNum).toFixed(3) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value < 0) {
                str += "0";
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        StringUtil.changeIntToText2 = function (value) {
            if (value === void 0) { value = 0; }
            var str = "";
            if (value >= 10000000) {
                str += (value / 10000).toFixed(0) + LanguageManager.getlocal("num_10K");
            }
            else if (value >= 1000000) {
                str += (value / 10000).toFixed(1) + LanguageManager.getlocal("num_10K");
            }
            else if (value >= 100000) {
                str += (value / 10000).toFixed(2) + LanguageManager.getlocal("num_10K");
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        /**
         * 把字符串分割成数组
         * @param fullString 原始字符串
         * @param separator 分割符号
         * @return 分割后的字符串数组
         *
         */
        StringUtil.splitString = function (fullString, separator) {
            var valueTb = null;
            if (fullString != null && separator != null) {
                valueTb = fullString.split(separator);
            }
            return valueTb;
        };
        /**
         * 把数字转带单位的字符串 (K:1000,M:1000000,G:1000000000)
         * @param value 数据
         * @return 目标字符串
         *
         */
        StringUtil.formatIntToString = function (num) {
            if (num === void 0) { num = 0; }
            var numLength = num.toString().length;
            var strNum = num.toString();
            if (numLength > 3 && numLength <= 6) {
                num = parseFloat((num / 1000).toFixed(3 - numLength % 3));
                if (numLength == 6) {
                    strNum = num.toString().substring(0, 3);
                }
                else {
                    strNum = num.toString().substring(0, 4);
                }
                strNum = strNum + "K";
            }
            else if (numLength > 6 && numLength <= 9) {
                num = parseFloat((num / 1000000).toFixed(3 - numLength % 3));
                if (numLength == 9) {
                    strNum = num.toString().substring(0, 3);
                }
                else {
                    strNum = num.toString().substring(0, 4);
                }
                strNum = strNum + "M";
            }
            else if (numLength > 9) {
                num = parseFloat((num / 1000000000).toFixed(3 - numLength % 3));
                strNum = num.toString().substring(0, 4);
                strNum = strNum + "G";
            }
            return strNum;
        };
        /**
         * 检查字符串是否含有非法字符符号
         * @param value 字符串
         * @return 是否含有 bool值
         *
         */
        StringUtil.checkCharacter = function (value) {
            var reCat = new RegExp("/[|%|'|%|.|,|:|;|*|?|~|`|!|@|#|$|%%|%|^|&|+|=|)|(|<|{|}| |%|]|%|[|/|\"|]/");
            return reCat.test(value);
        };
        StringUtil.checkChar = function (value) {
            if (value.trim() == "") {
                return true;
            }
            if (value.indexOf("     ") != -1) {
                return true;
            }
            var reCat = new RegExp("/\s+/g|<", "g");
            return reCat.test(value);
        };
        /**
         * 字符串替换方法
         * @param value 原始字符串
         * @param targgetV 需要替换的内容
         * @param replaceV 替换成为的内容
         * @return 替换后的字符串
         *
         */
        StringUtil.replaceString = function (value, targgetV, replaceV) {
            var reg = new RegExp(targgetV, "g");
            var str = value.replace(reg, replaceV);
            return str;
        };
        /**
         * 字符串删除第一个字符
         * @param value 原始字符串
         * @return 删除第一个字符后的字符串
         *
         */
        StringUtil.removeFirstChar = function (value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            return value.substring(1);
        };
        StringUtil.formatLocalLanuageValue = function (localValue, params) {
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    var paramStr = params[i];
                    var needReplaceStr = "{" + (i + 1) + "}";
                    while (localValue.indexOf(needReplaceStr) > -1) {
                        localValue = localValue.replace(needReplaceStr, paramStr);
                    }
                }
            }
            return localValue;
        };
        /**
         * 将首字母转换为小写
         * @param value
         */
        StringUtil.firstCharToLower = function (value) {
            var firstChar = value.substr(0, 1);
            var otherChar = value.substr(1, value.length - 1);
            return firstChar.toLowerCase() + otherChar;
        };
        /**
         * 将首字母转换为大写
         * @param value
         */
        StringUtil.firstCharToUper = function (value) {
            var firstChar = value.substr(0, 1);
            var otherChar = value.substr(1, value.length - 1);
            return firstChar.toUpperCase() + otherChar;
        };
        /**
         * 名字检测(只能输入中文、数字和英文)
         * @param value
         */
        StringUtil.userNameCheck = function (value) {
            var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3]+$");
            if (!reg.test(value)) {
                return false;
            }
            return true;
        };
        /**
         * 数字检测(只能输入中文、数字和英文)
         * @param value
         */
        StringUtil.numberCheck = function (value) {
            var reg = new RegExp("^[0-9]+$");
            if (!reg.test(value)) {
                return false;
            }
            return true;
        };
        StringUtil.formatStringColor = function (str, color) {
            return "<font color=" + String(color) + ">" + str + "</font>";
        };
        return StringUtil;
    }());
    App.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "App.StringUtil");
})(App || (App = {}));

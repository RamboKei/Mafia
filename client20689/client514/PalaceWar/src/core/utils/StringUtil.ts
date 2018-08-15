/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */

namespace App {
	export class StringUtil {
		public constructor() {
		}

		 /**
         * 二进制解析为字符串
         * @param array 
         */
        public static dump(array:egret.ByteArray):string
        {
            var s:string = "";
            var a:string = "";
            for(var i:number = 0; i < array.length; i ++) 
            {
                if(i%16 == 0) 
                {
                    s += ("0000" + i.toString(16)).substring(-4, 4) +  " ";
                }
                if (i%8 == 0) 
                {
                    s += " ";
                }
                var v:number = array[i];
                s += ("0" + v.toString(16)).substring(-2, 2) + " ";
                if (((i +1)%16) == 0 || i == (array.length -1))
                {
                    s += " |" + a + "|\n";
                    a = "";
                }
            }
            return s;
        }

        /**
         * 强制转化为字符串
         * @param data 需要转换的数据，例如json，数字等
         */
        public static toString(data:any):string
        {
            let dataStr:string=undefined;
            if(typeof(data)=="object")
            {
                try
                {
                    dataStr = JSON.stringify(data);
                }
                catch(e)
                {
                    if(DEBUG)
                    {
                        dataStr="StringUtil.toString():Error="+String(data);
                    }
                }
            }
            else
            {
                dataStr=String(data);
            }
            return dataStr;
        }
		 /**
		 * 当数字超过100000000时，转化为“亿”的描述
		 * @param value 数据
		 * @return 目标字符串
		 *
		 */
		public static changeIntToText(value:number = 0):string
		{
			//如果是英文 则转化为 million billion trillion等
			if (PlatformManager.checkIsEnSp()) {
				var enStr: string = "";
				if(value >= 1000000000000){
					enStr += (value / 1000000000000).toFixed(3) + LanguageManager.getlocal("coinformat_4");
				} else if(value >= 1000000000){
					enStr += (value / 1000000000).toFixed(2) + LanguageManager.getlocal("coinformat_2");
				} else if(value >= 1000000){
					enStr += (value / 1000000).toFixed(2) + LanguageManager.getlocal("coinformat_1");
				} else if (value < 0){
					enStr += "0";
				} else {
					enStr += value.toFixed(0);
				}
				return enStr;
			} 
			

			var str:string="";
			let baseNum = 100000000;
			if(value>=100000 *baseNum) 
			{
				str+=(value/10000 /baseNum).toFixed(3)+ LanguageManager.getlocal("coinformat_4");
			}
			else if(value>=1000 *baseNum ) 
			{
				str+=(value/baseNum).toFixed(0)+LanguageManager.getlocal("coinformat_1");
			}
			else if(value>=100 * baseNum) 
			{
				str+=(value/baseNum).toFixed(1)+LanguageManager.getlocal("coinformat_1");
			}
			else if(value>=10 * baseNum) 
			{
				str+=(value/baseNum).toFixed(2)+LanguageManager.getlocal("coinformat_1");
			}
			else if(value>=baseNum) 
			{
				str+=(value/baseNum).toFixed(3)+LanguageManager.getlocal("coinformat_1");
			}
			else if(value<0)
			{
				str+="0";
			}
			else
			{
				str+=value.toFixed(0);
			}
			return str;
		}

		public static changeIntToText2(value:number = 0):string
		{
			var str:string="";
			if(value>=10000000) 
			{
				str+=(value/10000).toFixed(0)+ LanguageManager.getlocal("num_10K");
			}
			else if(value>=1000000) 
			{
				str+=(value/10000).toFixed(1)+LanguageManager.getlocal("num_10K");
			}
			else if(value>=100000) 
			{
				str+=(value/10000).toFixed(2)+LanguageManager.getlocal("num_10K");
			}
			else
			{
				str+=value.toFixed(0);
			}
			return str;
		}

		/**
		 * 把字符串分割成数组
		 * @param fullString 原始字符串
		 * @param separator 分割符号
		 * @return 分割后的字符串数组
		 *
		 */
		public static splitString(fullString:string, separator:string):string[]
		{
			var valueTb: string[] = null;
			if (fullString != null && separator != null) {
				valueTb =  fullString.split(separator);
			}
			return valueTb;
		}

		/**
		 * 把数字转带单位的字符串 (K:1000,M:1000000,G:1000000000)
		 * @param value 数据
		 * @return 目标字符串
		 *
		 */
		public static formatIntToString(num: number = 0):string
		{
			var numLength: number = num.toString().length;
			var strNum: string = num.toString();
			if (numLength > 3 && numLength <= 6)
			{
				num = parseFloat((num / 1000).toFixed(3 - numLength % 3));
				if (numLength == 6)
				{
					strNum = num.toString().substring(0, 3);
				}
				else
				{
					strNum = num.toString().substring(0, 4);
				}
				strNum = strNum + "K";
			}
			else if (numLength > 6 && numLength <= 9)
			{
				num = parseFloat((num / 1000000).toFixed(3 - numLength % 3));
				if (numLength == 9)
				{
					strNum = num.toString().substring(0, 3);
				}
				else
				{
					strNum = num.toString().substring(0, 4);
				}
				strNum = strNum + "M";
			}
			else if (numLength > 9)
			{
				num = parseFloat((num / 1000000000).toFixed(3 - numLength % 3));
				strNum = num.toString().substring(0, 4);
				strNum = strNum + "G";
			}
			return strNum;
		}

		/**
		 * 检查字符串是否含有非法字符符号
		 * @param value 字符串
		 * @return 是否含有 bool值
		 *
		 */
		public static checkCharacter(value: string): boolean
		{
			var reCat:RegExp = new RegExp("/[|%|'|%|.|,|:|;|*|?|~|`|!|@|#|$|%%|%|^|&|+|=|)|(|<|{|}| |%|]|%|[|/|\"|]/");
			return reCat.test(value);
		}

		public static checkChar(value: string): boolean
		{
			if(value.trim() == ""){
				return true;
			}
			if(value.indexOf("     ") != -1){
				return true;
			}
			var reCat:RegExp = new RegExp("/\s+/g|<","g");
			return reCat.test(value);
		}

		/**
		 * 字符串替换方法
		 * @param value 原始字符串
		 * @param targgetV 需要替换的内容
		 * @param replaceV 替换成为的内容
		 * @return 替换后的字符串
		 *
		 */
		public static replaceString (value: string , targgetV:string, replaceV:string):string
		{
			var reg:RegExp = new RegExp(targgetV, "g");
			var str:string = value.replace(reg, replaceV);
			return str;
		}

		/**
		 * 字符串删除第一个字符
		 * @param value 原始字符串
		 * @return 删除第一个字符后的字符串
		 *
		 */
		public static removeFirstChar (value: any):string
		{
			if (typeof value != "string")
			{
				value = value.toString();
			}
			return value.substring(1)
		}

		public static formatLocalLanuageValue(localValue:string,params?:string[]):string
		{
			if(params)
			{
				for(var i:number=0;i<params.length;i++)
				{
					let paramStr:string = params[i];
					let needReplaceStr:string="{"+(i+1)+"}";
					while(localValue.indexOf(needReplaceStr)>-1)
					{
						localValue = localValue.replace(needReplaceStr,paramStr);
					}
				}
			}
			return localValue;
		}
		/**
		 * 将首字母转换为小写
		 * @param value 
		 */
		public static firstCharToLower(value:string):string
		{
			var firstChar:string = value.substr(0,1);
			var otherChar:string = value.substr(1,value.length - 1);
			return firstChar.toLowerCase() + otherChar;
		}

		/**
		 * 将首字母转换为大写
		 * @param value 
		 */
		public static firstCharToUper(value:string):string
		{
			var firstChar:string = value.substr(0,1);
			var otherChar:string = value.substr(1,value.length - 1);
			return firstChar.toUpperCase() + otherChar;
		}

		/**
		 * 名字检测(只能输入中文、数字和英文)
		 * @param value 
		 */
		public static userNameCheck(value:string):boolean
		{
			var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3]+$");
			if(!reg.test(value))
			{
				return false;
			}
			return true;
		}
		/**
		 * 数字检测(只能输入中文、数字和英文)
		 * @param value 
		 */
		public static numberCheck(value:string):boolean
		{
			var reg = new RegExp("^[0-9]+$");
			if(!reg.test(value))
			{
				return false;
			}
			return true;
		}

		public static formatStringColor(str:string|number,color:number):string
		{
			return "<font color="+String(color)+">"+str+"</font>";
		}
		
	}
}
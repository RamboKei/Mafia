/**
 * math常用方法工具类
 * author dmj
 * date 2017/9/5
 * @class MathUtil
 */
namespace App
{
	export class MathUtil 
	{
		public constructor() 
		{
		}

		/**
		 * 对数值进行格式化，以“,”隔开
		 * @param num 需要格式化的数值
		 */
		public static formatNumberByComma(num:number):string
		{
			var numStr:string = "";
			num = Math.floor(num);
			var numLength:number = num.toString().length;
			var originalNumStr:string = num.toString();
			var commaNum:number = Math.ceil(numLength / 3) - 1;
			App.LogUtil.log("commaNum = " + commaNum );
			if(commaNum < 0)
			{
				commaNum = 0;
			}
			if(commaNum > 0)
			{
				var str:string = "";
				for(var i = 1;i <= commaNum + 1;i++)
				{
					var startIndex:number = numLength - i * 3;
					var endIndex:number = numLength - (i - 1) * 3;
					if(i == (commaNum + 1))
					{
						startIndex = 0;
						str = originalNumStr.substring(startIndex,endIndex);
					}
					else
					{
						str = "," + originalNumStr.substring(startIndex,endIndex);
					}
					numStr = str + numStr;
				}
			}
			else
			{
				numStr = originalNumStr;
			}
			return numStr;
		}

		/**
		 * 格式化数字为K、M、G
		 * @param num 被格式化的数字
		 */
		public static formatNumber(num:number):string
		{
			var numStr:string = "";
			num = Math.floor(num);
			var numLength:number = num.toString().length;
			var originalNumStr:string = num.toString();
			var temNum:number = 0;
			if(numLength > 3 && numLength <= 6)
			{
				temNum = num / 1000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "K";
			}
			else if(numLength > 6 && numLength <= 9)
			{
				temNum = num / 1000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "M";
			}
			else if(numLength > 9 && numLength <= 12)
			{
				temNum = num / 1000000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
			}
			else if(numLength > 12 )
			{
				temNum = num / 1000000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
			}
			else
			{
				numStr = originalNumStr;
			}
			return numStr;
		}

		/**
		 * 计算两点之间的直线距离
		 * @param p1 点1
		 * @param p2 点2
		 */
		public static getDistance(p1:egret.Point,p2:egret.Point):number
		{
			return egret.Point.distance(p1,p2);
		}
		/**
		 * 获取随机数，默认范围是（>=0 && <100）
		 * @param min 最小范围（大于等于min）
		 * @param max 最大范围(小于max)
		 */
		public static getRandom(min:number = 0,max:number = 100):number
		{
			return min + Math.floor(Math.random() * (max - min));
		}

		/**
		 * 弧度转换角度
		 * @param radian 弧度
		 */
		public static getAngleByRadian(radian:number):number
		{
			return  radian * 180 / Math.PI;
		}

		/**
		 * 角度转换弧度
		 * @param angle 角度
		 */
		public static getRadianByAngle(angle:number):number
		{
			return angle * Math.PI / 180;
		}

		/**
		 * 检查两个值是否相等
		 * @param value1 
		 * @param value2 
		 */
		public static checkEqual(value1:number,value2:number):boolean
		{
			if(isNaN(value1)==false&&isNaN(value1)==false)
			{
				return value1==value2;
			}
			return true;
		}
	}
}
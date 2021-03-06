/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */

namespace App 
{
	export namespace DateUtil 
	{
		/**
		 * 一小时的秒数
		 */
		export let hourSeconds:number=3600;
		export let dayHours:number=24;
		let _year:string = "date_year";
		let _month:string = "date_month";
		let _day:string = "date_day";
		let _hour:string = "date_hour";
		let _minute:string = "date_minute";
		let _second:string = "date_second";
		/**
		 * 根据秒数格式化字符串
		 * @param second 秒数
		 * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前,6:xx年x月x日,7:x月x日
		 * @return
		 *
		 */
		export function getFormatBySecond(second:number, type:number = 1):string {
			var str:string = "";
			switch (type) {
				case 1:
					str = getFormatBySecond1(second);
					break;
				case 2:
					str = getFormatBySecond2(second);
					break;
				case 3:
					str = getFormatBySecond3(second);
					break;
				case 4:
					str = getFormatBySecond4(second);
					break;
				case 5:
					str = getFormatBySecond5(second);
					break;
				case 6:
					str = getFormatBySecond6(second);
					break;	
				case 7:
					str = getFormatBySecond7(second);
					break;	
				case 8:
					str = getFormatBySecond8(second);
					break;
				case 9:
					str = getFormatBySecond9(second);
				case 10:
					str = getFormatBySecond10(second);
					break;
			}
			return str;
		}

		//1: 00:00:00
		function getFormatBySecond1(t:number = 0):string {
			var hourst:number = Math.floor(t / 3600);
			var hours:string;
			if (hourst == 0) {
				hours = "00";
			} else {
				if (hourst < 10)
					hours = "0" + hourst;
				else
					hours = "" + hourst;
			}
			var minst:number = Math.floor((t - hourst * 3600) / 60);
			var secondt:number = Math.floor((t - hourst * 3600) % 60);
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return hours + ":" + mins + ":" + sens;
		}

		//3: 00:00
		function getFormatBySecond3(t:number = 0):string {
			var hourst:number = Math.floor(t / 3600);
			var minst:number = Math.floor((t - hourst * 3600) / 60);
			var secondt:number = Math.floor((t - hourst * 3600) % 60);
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return hourst  + ":" +  mins + ":" + sens;
		}

		//2:yyyy-mm-dd h:m:s
		function getFormatBySecond2(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return year + "-" + month +  "-" + day +" " + hours + ":" + mins +  ":" + sens;
			// return new Date(time * 1000).toLocaleString();
		}

		//4:xx天前，xx小时前，xx分钟前 刚刚
		function getFormatBySecond4(time:number):string {
			var t = Math.floor(time / 3600);
			if (t > 0) {
				if (t > 24) {
					return LanguageManager.getlocal("chat_time1",[String(Math.floor(t / 24))]);
				}
				else {
					return  LanguageManager.getlocal("chat_time2",[String(t)]);
				}
			}
			else {
				if(Math.floor(time / 60) >0)
				{
					return LanguageManager.getlocal("chat_time3",[String(Math.floor(time / 60))]);
				}else{
					return  LanguageManager.getlocal("chat_time4");
				}
				
			}
		}

		function getFormatBySecond5(time:number):string {
			//每个时间单位所对应的秒数
			var oneDay:number = 3600 * 24;
			var oneHourst:number = 3600;
			var oneMinst:number = 60;

			var days = Math.floor(time / oneDay);
			var hourst:number = Math.floor(time % oneDay / oneHourst)
			var minst:number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
			var secondt:number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

			var dayss:string = "";
			var hourss:string = ""
			var minss:string = "";
			var secss:string = ""
			if (time > 0) {
				//天
				if (days == 0) {
					dayss = "";
					//小时
					if (hourst == 0) {
						hourss = "";
						//分
						if (minst == 0) {
							minss = "";
							if (secondt == 0) {
								secss = "";
							} else if (secondt < 10) {
								secss = "0" + secondt + "秒";
							} else {
								secss = "" + secondt + "秒";
							}

							return secss;
						}
						else {
							minss = "" + minst + "分";
							if (secondt == 0) {
								secss = "";
							} else if (secondt < 10) {
								secss = "0" + secondt + "秒";
							} else {
								secss = "" + secondt + "秒";
							}

						}

						return minss + secss;
					}
					else {
						hourss = hourst + "小时";
						if (minst == 0) {
							minss = "";
							if (secondt == 0) {
								secss = "";
							} else if (secondt < 10) {
								secss = "0" + secondt + "秒";
							} else {
								secss = "" + secondt + "秒";
							}

							return secss

						} else if (minst < 10) {
							minss = "0" + minst + "分";
						} else {
							minss = "" + minst + "分";
						}

						return hourss + minss;

					}
				}
				else {
					dayss = days + "天";
					if (hourst == 0) {
						hourss = "";
					} else {
						if (hourst < 10)
							hourss = "0" + hourst + "小时";
						else
							hourss = "" + hourst + "小时";
						;
					}
					return dayss + hourss;
				}
			}
			return "";
		}

		//6:xx年x月x日
		function getFormatBySecond6(time:number):string {
			var date:Date = new Date(time *1000);
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			return year + LanguageManager.getlocal("yearTitle") + month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
		}

		//7:xx年x月x日
		function getFormatBySecond7(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
		}

		//8:把时间转化为 xx小时x分x秒
		function getFormatBySecond8(secondNums:number):string {
			
			let resStr = "";
			if (secondNums >= 60*60*24) {
				let dSce = 60*60*24
				let t = Math.floor(secondNums / dSce);
				resStr = resStr +  t + LanguageManager.getlocal("date_day");
				secondNums = secondNums % dSce;
			}
			if( secondNums >= 60*60)
			 {
				 let hSce = 60*60
				 let h =  Math.floor(secondNums / hSce);
				 resStr = resStr + h +  LanguageManager.getlocal("date_hour2");
				 secondNums = secondNums%hSce
			}
			if( secondNums >= 60)
			 {
				 let min =  Math.floor(secondNums / 60);
				 resStr = resStr + min +  LanguageManager.getlocal("date_minute");
				 secondNums = secondNums%60
			}
			// if (secondNums >= 0)
			// {
				if(secondNums < 10)
				{
					resStr = resStr +"0"+ secondNums +  LanguageManager.getlocal("date_second");
				}else{
					resStr = resStr + secondNums +  LanguageManager.getlocal("date_second");
				}
			// }
			return resStr;
		}
		//9:mm-dd h:m
		function getFormatBySecond9(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return month +  "." + day +" " + hours + ":" + mins;
			// return new Date(time * 1000).toLocaleString();
		}

		//7:xx年x月x日
		function getFormatBySecond10(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle")+hours+LanguageManager.getlocal("date_hour");
		}
		/**
		 * 当天零点的时间戳
		 * @param ts 时间戳
		 */
		export function getWeeTs(ts:number):number 
		{
			return ts-((ts+GameData.timeZone*3600)%86400)
		}

		/**
		 * 判断时间戳是否是跟服务器时间为同一天，true：是
		 * @param ts 时间戳
		 */
		export function checkIsToday(ts:number):boolean
		{
			return (GameData.serverTime-(getWeeTs(ts)+24*60*60))<0
		}

		export function getLeftDaySecondByTime(time:number):number
		{
			let daySecond:number=hourSeconds*dayHours;
			let zoneSecond:number = GameData.timeZone*hourSeconds;
			let leftSecond:number=(time+zoneSecond)%daySecond;
			return leftSecond;
		}

		/**
		 * 获取功能开始结束时间
		 * @param st 
		 * @param et 
		 * @param showHour 是否精确到小时
		 */
		export function getOpenLocalTime(st:number,et:number,showHour:boolean):string
		{
			let type:number=showHour?10:7;
			return App.DateUtil.getFormatBySecond(st,type) + "-" + App.DateUtil.getFormatBySecond(et,type);
		}
	}
}
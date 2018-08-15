/**
 * 设备信息工具
 * author 陈可
 * date 2017/9/8
 * @class DeviceUtil
 */
namespace App
{
	export class DeviceUtil
	{
		// 玩吧是否已下载微端
		public static wanbaIsDownloadApp = false;
		public constructor()
		{
		}

		/**
		 * 当前是否Html5版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsHtml5():boolean 
		{
			return !this.isWXgame() && !this.isWyw() && egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
		}

		/**
		 * 当前是否是Native版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsNative():boolean 
		{
			return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
		}

		/**
		 * 当前是否是微信小游戏版本
		 */
		public static isWXgame():boolean
		{
			return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
		}
		/**
		 * 当前是否是qq玩一玩
		 */
		public static isWyw():boolean
		{
			return false;
		}

		/**
		 * 是否是runtime2微端环境
		 */
		public static isRuntime2():boolean
		{
			return egret.Capabilities.runtimeType==egret.RuntimeType.RUNTIME2;
		}

		/**
		 * 是否是在手机上
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsMobile():boolean 
		{
			return egret.Capabilities.isMobile;
		}
		
		public static isAndroid():boolean
		{
			return egret.Capabilities.os=="Android";
		}

		public static isIOS():boolean
		{
			return egret.Capabilities.os=="iOS"
		}

		public static CheckWebglRenderMode():boolean
		{
			return egret.Capabilities.renderMode=="webgl";
		}

		/**获取设备当前语言 */
		public static getOSCurrentLanguage():string
		{
			return "cn";
		}

		public static checkIsSeascreen():boolean
		{
			if(App.DeviceUtil.IsHtml5())
			{
				let window_width = document.documentElement.clientWidth;
				let window_height = document.documentElement.clientHeight;
				if(window_height/window_width>2)
				{
					return true;
				}
				return false;
			}
		}

	}
}
namespace PlatformManager
{
	export let userId:string;
	export let prefix:string;
	export let token:string;
	export let userType:string;
	export let isLogin:boolean=false;
	export let kkk_age:number=0;
	export let nickname:string;
	export let avatar:string;
	export let inviter_pid:string;
	export let inviter_uid:string;


	export function getAppVersion():string
	{
		try
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.getVersion();
			}
		}
		catch(e)
		{
			return "0";
		}
		return "0";
	}
	export function getAppid():string
	{
		try{
			if(RSDK&&RSDK.getAppid)
			{
				return RSDK.getAppid();
			}
		}
		catch(e)
		{
			try
			{
				if(SDK&&SDK.CommonUtil&&SDK.CommonUtil.appId)
				{
					return SDK.CommonUtil.appId;
				}
			}
			catch(e)
			{
				return "";
			}
		}
	}

	export function getBigAppid():string
	{
		if (App.DeviceUtil.isWyw()) {
			return "0";
		}
		let bigAppid:string=App.CommonUtil.getOption("r_bid");
		if(!bigAppid)
		{
			let appid:number=Number(getAppid());
			bigAppid=String(Math.floor(appid/1000)*1000);
		}
		return String(bigAppid);
	}
	export function getContact():string[]
	{
		if(PlatformCfg.contactCfg[PlatformManager.getAppid()]){
			return PlatformCfg.contactCfg[PlatformManager.getAppid()];
		}
		else if(PlatformCfg.contactCfg[PlatformManager.getBigAppid()])
		{
			return PlatformCfg.contactCfg[PlatformManager.getBigAppid()];
		}
		else
		{
			for(let key in PlatformCfg.contactCfg)
			{
				if(key.indexOf("-")>-1)
				{
					let keys=key.split("-");
					let appid:number=Number(PlatformManager.getAppid());
					let bigAppid:number=Number(PlatformManager.getBigAppid());
					if(appid>=Number(keys[0])&&appid<=Number(keys[1]))
					{
						return PlatformCfg.contactCfg[key];
					}
				}
			}
		}
		return [];
	}

	export function getSpid():string
	{
		let spid:string;
		if (App.DeviceUtil.isWXgame())
		{
			spid="wxgame";
		}
		if (App.DeviceUtil.isWyw())
		{
			spid="wyw";
		}
		else if(checkIsLocal())
		{
			if(checkIsWeiduan())
			{
				spid="3k";
			}
			else
			{
				if(NetManager.checkHttps())
				{
					spid="locals";
				}
				else
				{
					spid="local";
				}
			}
		}
		else if(checkIsIOSShenheSp())
		{
			spid="iosshenhe";
		}
		else if(checkIsWanbaSp())
		{
			spid="wanba";
		}
		else if(checkIs3KSp())
		{
			spid="3k";
		}
		else if(checkIsYYBSp())
		{
			spid="yyb";
		}
		else if(checkIsTWBSp())
		{
			spid="tw";
		}
		else if(checkIsFkylcSp())
		{
			spid="fkylc";
		}
		else if(checkIsXlySp())
		{
			spid="xly";
		}
		else if(checkIsXzySp())
		{
			spid="xzy";
		}
		else if(checkIsZjlxSp())
		{
			spid="zjlx";
		}
		else if(checkIsEwanSp())
		{
			spid="ewan";
		}
		else if(checkIs49ySp())
		{
			spid="49y";
		}
		else if(checkIsSfSp())
		{
			spid="sf";
		}
		else if(checkIsKRSp())
		{
			spid="kr";
		}
		else if(checkIsFkcwSp())
		{
			spid="fkcw";
		}
		else if(checkIsEnSp())
		{
			spid="en";
		}
		else if(checkIs9130Sp())
		{
			spid="9130";
		}
		else if(checkIsCpsSp())
		{
			spid="cps";
		}
		else if(checkIsTestSp())
		{
			spid="test";
		}
		else
		{
			spid="3k";
		}
		let tmpName:string=getPlatName();
		if(tmpName&&!checkIsIOSShenheSp())
		{
			spid=tmpName;
		}
		return spid;
	}

	export function checkIsUseSDK():boolean
	{
		try
		{
			App.LogUtil.log("getSpid"+getSpid());
			App.LogUtil.log("checkIsWeiduan"+checkIsWeiduan());
			console.log("getAppid"+getAppid());
			console.log("getBigAppid"+getBigAppid());
		}
		catch(e)
		{
			console.log("checkIsUseSDK log error");
		}
		if (App.DeviceUtil.isWXgame()) {
			return false;
		}
		if (App.DeviceUtil.isWyw()) {
			return false;
		}
		if(App.CommonUtil.getOption("r_plat"))
		{
			return true;
		}
		if(PlatformCfg.useSDK[getBigAppid()]||PlatformCfg.useSDK[getAppid()])
		{
			return true;
		}
		if(getSpid().indexOf("local")>-1)
		{
			if(checkIsWeiduan())
			{
				return true;
			}
			return false;
		}
		else if(getSpid()=="3k")
		{
			if(checkIsTest()==true)
			{	
				if(checkIsWeiduan())
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else if(getSpid()=="wanba")
		{
			if(checkIsTest()==true)
			{	
				if(ServerCfg.checkTestByBaseDiv())
				{
					if(document.location.search)
					{
						return true;
					}
				}
				return false;
				//test code
				// return true;
			}
		}
		else if(getSpid()=="test")
		{
			// if(checkIsWeiduan())
			// {
			// 	return true;
			// }
			return false;
		}
		else
		{
			if(checkIsTest()==true)
			{
				return false;
			}
		}
		return true;
	}

	export function getPlatName():string
	{
		let platName:string=PlatformCfg.platNameCfg[getBigAppid()];
		if(!platName)
		{
			platName=PlatformCfg.platNameCfg[getAppid()];
		}
		return platName;
	}

	export function checkIsIOSShenheSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("iosshenhe")>-1;
		}
		return false;
	}

	export function checkIsFkylcSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("fkylc")>-1;
		}
		return false;
	}

	export function checkIsAiweiyouSp():boolean
	{
		if(PlatformManager.getAppid() == "17007002"){
			return true;
		}
		return false;
	}

	export function checkIsTWShenheSp():boolean
	{
		if(PlatformManager.getAppid() == "17004001"){
			return true;
		}
		return false;
	}

	export function checkIsKRShenhe():boolean
	{
		if(PlatformManager.checkIsKRSp()&&App.DeviceUtil.isIOS()&& Api.switchVoApi.checkOpenShenhe())
		{
			return true;
		}
		return false;
	}

	export function checkIsXlySp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("xly")>-1;
		}
		return false;
	} 

	export function checkIsXzySp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("xzy")>-1;
		}
		return false;
	} 

	export function checkIsZjlxSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("zjly")>-1;
		}
		return false;
	}

	export function checkIsEwanSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("ewan")>-1;
		}
		return false;
	}

	export function checkIs49ySp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("49y")>-1;
		}
		return false;
	}
	export function checkIsSfSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_sf")>-1||pathname.indexOf("_testsf")>-1;
		}
		return false;
	}


	export function checkIsFkcwSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_fkcw")>-1||pathname.indexOf("_testfkcw")>-1;
		}
		return false;
	}

	//检测文字显示是水平显示
	export function checkIsTextHorizontal():boolean
	{
		
		if(App.DeviceUtil.IsHtml5())
		{
			//检测是否是英文  App.CommonUtil.getOption("language")=="en" url参数有language = en
			return App.CommonUtil.getOption("language")=="en" || checkIsEnSp();
		}
		return false;
	}

	export function checkIsEnSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;

			return App.CommonUtil.getOption("language")=="en" || pathname.indexOf("_en")>-1||pathname.indexOf("_testen")>-1;
		}
		return false;
	}

	export function checkIs9130Sp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_9130")>-1||pathname.indexOf("_test9130")>-1;
		}
		return false;
	}

	export function checkIsCpsSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_cps")>-1||pathname.indexOf("_testcps")>-1;
		}
		return false;
	}

	export function getSpFile():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let fileName:string;
			let pathname:string=window.location.pathname;
			if(pathname.substr(pathname.length)!="/")
			{
				fileName=pathname.substr(pathname.lastIndexOf("/")+1);
				if(fileName&&fileName.indexOf(".")>-1)
				{
					fileName=pathname.substring(0,pathname.lastIndexOf("/"));
					fileName=fileName.substr(pathname.lastIndexOf("/")+1);
				}
			}
			else
			{
				fileName=pathname.substring(0,pathname.length);
				fileName=fileName.substr(pathname.lastIndexOf("/")+1);
			}

			return fileName.replace("gt_test","").replace("gt_","");
		}
		return "local";
	}

	export function checkIsTest():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_test")>-1;
		}
		return false;
	}

	export function checkUseRSDKSocket():boolean
	{
		let useRSDKSocket:boolean=false;
		if(App.DeviceUtil.IsHtml5())
		{
			if(window["RSDKPlatform"])
			{
				useRSDKSocket=true;
			}
			if(window["RSDKWebSocket"])
			{
				useRSDKSocket=true;
			}
			else
			{
				useRSDKSocket=false;
			}
		}
		if(useRSDKSocket&&PlatformManager.client.getAndroidAPILevel()>0&&PlatformManager.client.getAndroidAPILevel()<21)
		{
			useRSDKSocket=true;
		}
		else
		{
			useRSDKSocket=false;
		}
		return useRSDKSocket;
	}

	export function checkIsWeiduan():boolean
	{
		let weiduan:boolean=false;
		if(App.DeviceUtil.IsHtml5())
		{
			if(window)
			{
				if(window["RSDKPlatform"])
				{
					weiduan=true;
				}
				else if(window["webkit"]&&window["webkit"].messageHandlers&&window["webkit"].messageHandlers.RSDKLogin)
				{
					weiduan=true;
				}
			}
		}
		return weiduan;
	}

	export function checkIsTWBSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_tw")>-1||pathname.indexOf("_testtw")>-1;
		}
		return false;
	}

	export function checkIsKRSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
		}
		return false;
	}

	// export function checkIsKrSp():boolean
	// {
	// 	if(App.DeviceUtil.IsHtml5())
	// 	{
	// 		let pathname:string=window.location.pathname;
	// 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
	// 	}
	// 	return false;
	// }
	//港台官网包
	export function checkIsTWMCSp():boolean
	{
		if(PlatformManager.getAppid() == "17004004"){
			return true;
		}
		return false;
	}

	//4399
	export function checkIs4399Sp():boolean
	{
		if(PlatformManager.getAppid() == "17007003"){
			return true;
		}
		return false;
	}

	export function checkIsYYBSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let host:string=window.location.host;
			return host.indexOf("yyb")>-1;
		}
		return false;
	}

	export function checkIsTestSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let host:string=window.location.host;
			return host.indexOf("gt-test")>-1;
		}
		return false;
	}

	export function checkIsWanbaSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			let host:string=window.location.host;
			return pathname.indexOf("wanba")>-1||host.indexOf("urlshare")>-1||host.indexOf("qzone")>-1;
		}
		return false;
	}

	export function checkIs11WanSp():boolean
	{
		if(PlatformManager.getAppid() == "17001002"){
			return true;
		}
		return false;
	}

	export function checkIs3kShenHaiSp():boolean
	{
		if(PlatformManager.getAppid() == "17001195" || PlatformManager.getAppid() == "17001196" || PlatformManager.getAppid() == "17001197" || PlatformManager.getAppid() == "17001198"){
			return true;
		}
		return false;
	}

	export function checkIs3KSp():boolean
	{
		if(checkIsLocal()&&checkIsWeiduan())
		{
			return true;
		}
		if(App.DeviceUtil.IsHtml5())
		{
			return window.location.pathname.indexOf("3k")>-1;
		}
		return false;
	}

	export function checkIs3KSubSp():boolean
	{
		return getAppid()=="17001001"||getAppid()=="17001186"||getAppid()=="17001187"||getAppid()=="17001185"||getSpName()=="h5ios3kwan"||getSpName()=="h5iosshiyiwan"||getSpName()=="h5iosyinhu";
	}

	export function checkIsLocal():boolean
	{
		return GameData.isLocal();
	}

	export function isSupportDesktopIcon():boolean
	{	
		// if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
		// 	return true;
		// }
		// else {
		// 	return false;
		// }
		console.log("QAZ fkcw checkDesktop"+PlatformManager.checkDesktop());
		return PlatformManager.checkDesktop();
	}

	/**
	 * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版
	 */
	function getWanbaQua():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsWanbaSp()&&checkIsUseSDK())
			{
				let data=window["OPEN_DATA"];
				let platform:string=data.platform;
				let app:string=data.qua.app;
				return app;
			}
		}
		return "";
	}

	export function getIsWanbaSQ():boolean
	{
		return getWanbaQua()=="SQ";
		// return checkIsUseSDK();
	}
	
	/**
	 * 是不是来自 h5qzonepet
	 */
	export function getFromQZonePet():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsWanbaSp()&&checkIsUseSDK())
			{
				let data=window["OPEN_DATA"];
				let via:string=data.via;
				egret.log("ssSource"+data.via)
				// alert(data.via)
				return via;
			}
		}
		return "";
	}
	export function isSupportShare():boolean
	{	
		console.log("QAZ fkcw checkShare"+PlatformManager.checkShare());
		return PlatformManager.checkShare()==1 || PlatformManager.checkShare()==2 || PlatformManager.checkShare()==3;
		// return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
	}

	export function isSupportAttention():boolean
	{
		return (checkIsFkylcSp()&&!checkIs4399Sp()) || PlatformManager.hasFollow();
	}

	export function isSupportBindPhone():boolean
	{
		return PlatformCfg.bindPhone[getAppid()];
	}

	export function sendToDesktop(callback:Function,callbackThisObj:any):void
	{
		if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
			window.open("resource/other/一個官人七個妻.url");
		} else {
			// qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
			PlatformManager.requestDesktop({title:"极品大官人",desc:""},callback,callbackThisObj);
		}
		// callback.apply(callbackThisObj);

	}

	export function sendCandy(num:string,callback:Function,callbackThisObj:any):void
	{
		//signin
		qqwanbaplugin.sendCandy("signin",num,callback.bind(callbackThisObj));
	}
	
	export function share(callback:Function,callbackThisObj:any)
	{
		if(RSDKHelper.isInit)
		{	
			if (checkIsTWBSp() == true) {
				RSDKHelper.fbShare((code:string,data:any)=>{
					if(Number(code)==16)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
					else {
						console.log("分享失败 "+code);
					}
				});
			}
			else if (checkIsKRSp() == true) {
				RSDKHelper.krShare((code:string,data:any)=>{
					if(Number(code)==16)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
					else {
						console.log("分享失败 "+code);
					}
				});
			}
			else {
				RSDKHelper.share((code:string,data:any)=>{
					if(Number(code)==0)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
				});
			}
		}
		// else
		// {
		// 	if(callback)
		// 	{
		// 		callback.apply(callbackThisObj);
		// 	}
		// }
	}
	
	export function checkIsLoginPlat():boolean
	{
		let loginResult:boolean=false;
		if(checkIsUseSDK())
		{
			loginResult=isLogin;
		}
		else
		{
			loginResult=true;
		}
		return loginResult;
	}

	export function init():void
	{
		if(checkIsUseSDK())
		{
			RSDKHelper.init();
		}
	}

	export function login():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.login();
		}
	}
	export function logout():boolean
	{
		PlatformManager.isLogin=false;
		if(RSDKHelper.isInit)
		{
			RSDKHelper.logout();
			if(PlatformManager.checkIsKRSp())
			{
				return true;
			}
			return false;
		}
		else
		{
			LoginManager.changeAccount();
			return true;
		}
	}
	export function pay(productId:string):void
	{
		if(PlatformManager.checkIsUseSDK())
		{
			if(RSDKHelper.isInit)
			{
				RSDKHelper.pay(productId);
			}
		}
		else
		{
			if(GameData.isLocal())
			{
				testPay(productId);
			}
		}
	}

	function testPay(productId:string):void
	{
		let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(productId);
		if(GameData.isLocal()||GameData.isTest())
		{
			let order_id:string=String(new Date().getTime()+Math.random()*99999999);
			NetManager.request(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT,{order_id:order_id,gold_num:itemCfg.gemCost,platform:"h5",name:itemCfg.id})
		}
		else
		{
			App.CommonUtil.showTip("购买元宝:"+itemCfg.gemCost);
		}
	}

	export function analyticsLogin():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLogin();
		}
	}

	export function analyticsNewGuide(step:number|string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsNewGuide(step);
		}
	}

	export function analyticsPay(id:string,orderId:string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsPay(id,orderId);
		}
	}

	export function analyticsLevelup():void
	{	
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLevelup();
		}
	}

	export function analyticsRegister():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsRegister();
		}
	}

	export function analyticsLoadEnd():void
	{	
		console.log("QAZ analyticsLoadEnd "+RSDKHelper.isInit);
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLoadEnd();
		}
	}

	export function analyticsCompleteNewGuide():void
	{
		console.log("analyticsCompleteNewGuide");
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsCompleteNewGuide();
		}
	}

	export function pushMsg(data:any):void
	{	
		if (getIsWanbaSQ() == true) 
		{	
			let msg:string = LanguageManager.getlocal("wanbaPushMsg"+data.type);
			qqwanbaplugin.sendMessage(data.frd,"1",msg,null);
		}
	}

	export function getGiftId():string
	{	
		let gid:string = null;
		if (checkIsWanbaSp() == true && checkIsUseSDK()) 
		{
			gid = qqwanbaplugin.getGiftId();
		}
		// return "502";
		return gid;
	}

	export function giftExchange(callback:Function,callbackThisObj:any)
	{	
		let gid:string = null;
		if (checkIsWanbaSp() == true && checkIsUseSDK()) 
		{
			qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
		}
		// return gid;

		
	}

	/**
	 * 获取是不是从糖果屋登录
	 */
	export function getCandyFlag():boolean
	{	
		// if (PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
		// {
		// 	return qqwanbaplugin.sendCandyStatus();
		// }
		return false;
	}

	export function checkCrossDomon():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			try
			{
				let host=window.location.host;
				let baseURI=document.baseURI;
				if(baseURI&&baseURI.indexOf(host)>-1)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
			catch(e)
			{
				return false;
			}
		}
		return false;
	}

	export function getSpName():string
	{
		let spName:string="";
		if(App.DeviceUtil.IsHtml5())
		{
			spName=App.CommonUtil.getOption("r_plat");
		}
		return spName;
	}

	export function attention(callback:Function,callbackThisObj:any):void
	{
		console.log("attention:"+RSDKHelper.isInit);
		if(RSDKHelper.isInit)
		{
			// RSDKHelper.attention();
			RSDKHelper.attention((data:any)=>{
					if(Number(data)==1)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
				});
		}
	}

	export function checkAttention():boolean
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkAttention();
		}
		else
		{
			return false;
		}
	}

	export function getChannelId():string
	{
		try{
			return RSDK.getChannelId();
		}
		catch(e)
		{
			return "";
		}
	}

	export function openUserCenter():void
	{
		if(rsdkclientplugin)
		{
			rsdkclientplugin.openUserCenter();
		}
	}

	export function getMoneySign():string
	{
		if(checkIsTWBSp())
		{
			return "$";
		}
		else if (checkIsKRSp())
		{
			if(App.DeviceUtil.isAndroid())
			{
				return "원";
			}
			else{
				return "$";
			}
		}
		else {
			return "￥";
		}
	}


	export function checkIsUseBigCfg():boolean
	{
		// return getBigAppid()=="17001000";
		return checkIsTWBSp();
	}

	export function checkIs3kQianYiSp():boolean
	{
		if(PlatformManager.getAppid() == "17001001" || PlatformManager.getAppid() == "17001051" || PlatformManager.getAppid() == "17001188"){
			return true;
		}
		return false;
	}

	export function checkIsShowWarning():boolean
	{
		if (checkIsTWBSp()||checkIsKRSp()) {
			return false;
		}
		else {
			return true;
		}
	}

	export function getStatement():string
	{
		let appid=PlatformManager.getAppid();
		let bigAppid=PlatformManager.getBigAppid();
		let spName=PlatformManager.getSpName();
		if(PlatformCfg.statementCfg[appid])
		{
			return PlatformCfg.statementCfg[appid];
		}
		else if(PlatformCfg.statementCfg[bigAppid])
		{
			return PlatformCfg.statementCfg[bigAppid];
		}
		else if(PlatformCfg.statementCfg[spName])
		{
			return PlatformCfg.statementCfg[spName];
		}
		return "";
	}

	export function checkShare():number
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkShare();
		}
		else
		{
			return 0;
		}
	}

	export function checkDesktop():boolean
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkDesktop();
		}
		else
		{
			return false;
		}
	}

	export function hasFollow():boolean
	{
		if(RSDKHelper.isInit)
		{	
			console.log("QAZ hasFollow "+RSDKHelper.hasFollow());
			return RSDKHelper.hasFollow();
		}
		else
		{
			return false;
		}
	}

	export function getCustomerServiceType():number
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.getCustomerServiceType();
		}
		else
		{
			return 0;
		}
	}
	
	export function getCustomerServiceData(callback:Function,callbackThisObj:any):void
	{
		if(RSDKHelper.isInit)
		{	
			RSDKHelper.getCustomerService((data:any)=>{
				if(callback)
				{
					GameData.customerServiceData = data;
					callback.apply(callbackThisObj);
				}
			});
		}
	}

	export function requestDesktop(data:{title:string,desc:string},callback:Function,callbackThisObj:any):boolean
	{
		if(RSDKHelper.isInit)
		{	
			return RSDKHelper.requestDesktop(data,callback,callbackThisObj);
				
		}
		else {
			return false;
		}
	}


	export namespace client
	{
		export function checkServerState(serverId:string):void
		{	
			if (checkIsWeiduan()) {
				rsdkclientplugin.checkServerState(serverId);
			}
			else {
				 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
			}
		}

		export function checkPurchase(serverId:string):void
		{	
			if (App.DeviceUtil.isAndroid()) {
				rsdkclientplugin.checkPurchase(serverId);
			}
		}

		export function checkPerson():boolean
		{
			return PlatformManager.kkk_age>0;
		}
		export function showPersonView(callback:Function):void
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.showPersonView(callback);
			}
		}
		export function getAndroidAPILevel():number
		{
			try
			{
				if(App.DeviceUtil.isAndroid())
				{
					App.LogUtil.log("getAndroidAPILevel"+rsdkclientplugin.getAndroidAPILevel());
					return Number(rsdkclientplugin.getAndroidAPILevel());
				}
			}
			catch(e)
			{
				return 0;
			}
			return 0;
		}
		export function getGUID():string
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.getGUID();
			}
			return null;
		}

		export function openServiceCenter():void
		{
			// if(rsdkclientplugin)
			// {
			// 	rsdkclientplugin.openServiceCenter();
			// }
			RSDK.customerService("");
		}
		export function showBindPhoneView(callback:Function,callbackThisObj:any):void
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.showBindPhoneView(callback.bind(callbackThisObj));
			}
			// if(callback)
			// {
			// 	callback.apply(callbackThisObj);
			// }
		}

		export function checkBindPhone():boolean
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.checkBindPhone();
			}
			return false;
		}

		export function setAppForegroundStatusChange():void
		{
			if(checkIsWeiduan() && rsdkclientplugin)
			{	
				try
				{
					console.log("QAZ setAppForeground ");
					rsdkclientplugin.setAppForegroundStatusChangeCallback((msg:string)=>{
						console.log("QAZ setAppForeground Callback "+msg);
						if(Number(msg)==1)
						{
							SoundManager.resumeBg();
						}
						else 
						{
							SoundManager.pauseBg();
						}
					});
				}
				catch (e) 
				{
					App.LogUtil.log("setAppForegroundStatusChange error");
				}
			}
		}

		// export function getAppVersion():number
		// {
		// 	try
		// 	{
		// 		if(rsdkclientplugin)
		// 		{
		// 			return rsdkclientplugin.getVersion();
		// 		}
		// 	}
		// 	catch(e)
		// 	{
		// 		return 0;
		// 	}
		// 	return 0;
		// }

		export function checkWeiduanUpgrade():void
		{
			if(PlatformManager.checkIs3KSp()&&App.DeviceUtil.IsHtml5())
			{
				try
				{
					let version:number=Number(rsdkclientplugin.getVersion());
					let channelId:string=PlatformManager.getChannelId();
					let appid:string=rsdkclientplugin.getSubAppId();
					var phpurl=ServerCfg.baseUrl+"getversion.php";
					let host = window.location.host;
					if(host.indexOf("127.0.0.1")!=-1||host.indexOf("192.168.")!=-1)
					{
						phpurl="http://192.168.8.82/gt_h5/getversion.php";
					}
					NetLoading.show();
					NetManager.http.get(phpurl,{version:version,appid:channelId+"_"+appid},(data:any)=>{
						NetLoading.hide();
						if(data&&data.gameurl)
						{
							ViewController.getInstance().openView(ViewConst.POPUP.WEIDUANUPGRADEPOPUPVIEW,data.gameurl);
						}
					},()=>{
						NetLoading.hide();
					},PlatformManager);
				}
				catch(e)
				{
					NetLoading.hide();
				}
			}
		}
	}
	// 是否是港台web
	export function checkIsTwWeb():boolean
	{
		return PlatformManager.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatformManager.getAppid() == "17004003");
	}

	export function checkDownloadApp():void
	{
		try
		{
			if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")
			{
				qqwanbaplugin.checkDownloadApp((isDownloadApp)=>{
						App.DeviceUtil.wanbaIsDownloadApp = isDownloadApp;
						if (isDownloadApp) {
							// 玩吧，如果还没有用微端登录过，并且已经安装了微端
							ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADVIEW,{});
						}
				});
			}
		}
		catch(e)
		{
			console.log("checkDownloadApp error");
		}
	}

	export function checkIsShenHeYiWan():boolean{
		let bigappid_arr = [17013000]; 
		let appid_arr= [17001263,17014002,17001274];
		let bigAppid = Number(PlatformManager.getBigAppid());
		let isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
		let appId = Number(PlatformManager.getAppid());
		let isApp = appid_arr.indexOf(appId) > -1;
		// return true;
		return (PlatformManager.checkIsIOSShenheSp() && (isApp||isBigApp));
	}

	export function checkHideSwitchAccountBtn():boolean
	{
		return (PlatformManager.checkIs11WanSp()|| 
		PlatformManager.checkIs3kShenHaiSp() ||
		(PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()]&&!PlatformManager.checkIsTest())||
		String(PlatformManager.getAppid())=="17001213")||
		String(PlatformManager.getBigAppid())=="17017000"||
		(String(PlatformManager.getBigAppid())=="17015000"&&String(PlatformManager.getAppid())!="17015009")||
		PlatformManager.checkIsCpsSp()||String(PlatformManager.getBigAppid())=="17018000";
	}

	/** 是否有特殊关闭按钮（其实就是指的微信小游戏和qq玩一玩 */
	export function hasSpcialCloseBtn():boolean
	{
		return App.DeviceUtil.isWXgame() || App.DeviceUtil.isWyw();
	}
}
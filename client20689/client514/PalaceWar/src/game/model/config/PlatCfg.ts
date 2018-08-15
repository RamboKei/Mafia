/**
 * 平台配置
 * @author 赵占涛
 */
class PlatCfg {
	/** 登录界面logo */
	public static loginLogo:string;
	/** 登录界面背景 */
	public static loginBg:string;

	public constructor() {
	}
	// 初始化平台配置
	public static initCfg(initCb:Function, initCbObject:any) {
		var sub = PlatformManager.getAppid();
		var middle = PlatformManager.getSpName();
		var big = PlatformManager.getBigAppid();
		console.log("sub middle big", sub,middle,big);

		var cb = (data:any)=>{
			PlatCfg.loginLogo = data.loginLogo;
			PlatCfg.loginBg = data.loginBg;
			let loginBgName:string="loginbg_"+sub;
			if(RES.hasRes(loginBgName))
			{
				PlatCfg.loginBg=loginBgName;
			}
			else
			{
				loginBgName="loginbg_"+big;
				if(RES.hasRes(loginBgName))
				{
					PlatCfg.loginBg=loginBgName;
				}
			}
			initCb.call(initCbObject);
		}
		if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
			ResourceManager.loadItem("sub" + sub + "_json", cb, this);
		} else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
			ResourceManager.loadItem("middle" + middle + "_json", cb, this);
		} else if (big !== "" && RES.hasRes("big" + big + "_json")) {
			ResourceManager.loadItem("big" + big + "_json", cb, this);
		} else {
			ResourceManager.loadItem("big0_json", cb, this);
		}
	}
}
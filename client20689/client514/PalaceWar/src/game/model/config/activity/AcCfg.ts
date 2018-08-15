namespace Config
{
	export namespace AcCfg 
	{
		export let isGetAll:boolean=false;
		export let cfgList:Object={};
		// export function getCfgByActivityId(aid:string)
		// {
		// 	return cfgList[aid];
		// }

		export function getCfgByActivityIdAndCode(aid:string,code:number|string)
		{
			return cfgList[aid]?cfgList[aid][code]:null;
		}

		export function formatAllCfg(data:any):void
		{
			
			isGetAll=true;
			for(let aidAndCode in data)
			{
				let aidArr:string[]=aidAndCode.split("-");
				let aid=aidArr[0];
				let code=aidArr[1];
				let cfgClassName:string="Config.AcCfg."+App.StringUtil.firstCharToUper(aid)+"Cfg";
				let cfgClass=egret.getDefinitionByName(cfgClassName);
				if(cfgList.hasOwnProperty(aid)==false)
				{
					cfgList[aid]={};
				}
				if(cfgClass)
				{
					let cfg=new cfgClass();
					cfg.formatData(data[aidAndCode]);
					cfgList[aid][code]=cfg;
				}
				else
				{
					App.LogUtil.log("缺少活动配置解析"+cfgClassName+"，请参考DailyChargeCfg写法");
				}
			}
		}

		export function formatCfgById(acData:any,aid:string):void
		{

		}
	}
}
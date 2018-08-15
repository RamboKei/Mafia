/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */

namespace ChallengeCfg {

    export function getChallengeCfgById(id:number):any
	{
		if(GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()])
		{
			return GameConfig.config.challengeCfg[id.toString()];
		}
		return null;
	}

	/**
	 * 关卡总数
	 */
	export function getChallengeTotalPass():number
	{
		return Object.keys(GameConfig.config.challengeCfg).length;
	}

}
/**
 * 配置
 */
namespace Config
{
	/**
	 * 寻访配置
	 */
	export namespace SearchCfg
	{
		let personList:any={};
		let buildList:any={}
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				if(typeof(data[key])=="object")
				{
					if(key=="personList")
					{
						formatpersonList(data[key]);
					}
					else if(key=="buildList")
					{
						formatbuildList(data[key]);
					}
				}
				else
				{
					SearchCfg[key]=data[key];
				}
			}
		}

		function formatpersonList(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:SearchPersonItemCfg=new SearchPersonItemCfg();
				itemCfg.initData(data[key]);
				itemCfg.personId=String(key);
				personList[key]=itemCfg;
			}
		}

		function formatbuildList(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:SearchBuildItemCfg=new SearchBuildItemCfg();
				itemCfg.initData(data[key]);
				buildList[key]=itemCfg;
			}
		}

		export function getRandromPersonId():string
		{
			let keys:any[] = Object.keys(personList);
			let l:number=keys.length;
			let selectIndex:number=Math.floor(Math.random()*l);
			return String(keys[selectIndex]);
		}

		export function getPersonItemCfgByPersonId(personId:string):SearchPersonItemCfg
		{
			return personList[personId];
		}

		export function getPersonItemCfgByWifeId(wifeId:string):SearchPersonItemCfg
		{
			let resultList:SearchPersonItemCfg[]=[];
			let itemCfg:SearchPersonItemCfg=null;
			for(var key in personList)
			{
				itemCfg=personList[key];
				if(String(wifeId)==String(itemCfg.wifeId))
				{
					return itemCfg;
				}
			}
			return null;
		}

		export function getPersonItemCfgListByBuildId(buildId:number):SearchPersonItemCfg[]
		{
			let resultList:SearchPersonItemCfg[]=[];
			let itemCfg:SearchPersonItemCfg=null;
			for(var key in personList)
			{
				itemCfg=personList[key];
				if(Number(buildId)==Number(itemCfg.build))
				{
					resultList.push(itemCfg);
				}
			}
			return resultList;
		}
	}

	class SearchPersonItemCfg extends BaseItemCfg
	{
		/**
		 * 所属建筑ID
		 */
		public build:number;

		/**
		 * 类型 1：普通  2：红颜
		 */
		public type:number;

		/**
		 * 红颜ID
		 */
		public wifeId:string;

		/**
		 * 解锁条件  条件会有VIP等级，势力值，关注官微等特殊条件  解锁寻访
		 */
		public unlock:{needVip?:number,needPower?:number,needQQ?:number,needActive?:number};

		/**
		 * 红颜获得的进度
		 */
		public value:number;

		/**
		 * 人物Id
		 */
		public personId:string;

		/**
		 * 门客ID
		 */
		public servantId:string;

		/**
		 * 寻访奖励  奖励的类型，系数通过运势取ratioList里的值  1：银两 2：粮草 3：士兵
		 */
		public reward:number;

		/**
		 *  寻访时间要求  单位：秒
		 */
		public needTime:number;

		public get personFullIcon():string
		{
			let icon:string;
			if(this.type==2)
			{
				icon=WifeCfg.getWifeCfgById(this.wifeId).body;
			}
			else if(this.servantId)
			{
				icon=Api.servantVoApi.getFullImgPathWithId(this.servantId);
			}
			else
			{
				icon="searchnpc_full"+this.personId;
			}
			return icon;
		}

		public get fullIconSize():{width:number,height:number}
		{
			let size:{width:number,height:number};
			if(this.type==2)
			{
				size={width:640,height:840};
			}
			else if(this.servantId)
			{
				size={width:405,height:467};
			}
			else
			{
				size={width:405,height:467};
			}
			return size;
		}

		public get name():string
		{
			let localKey:string;
			if(this.type==2)
			{
				localKey="wifeName_"+this.wifeId;
			}
			else
			{
				localKey="searchPersonName"+this.personId;
			}
			return LanguageManager.getlocal(localKey);
		}

		public get shortDesc():string
		{
			return LanguageManager.getlocal("searchPersonshortDesc"+this.personId);
		}

		public get desc():string
		{
			return LanguageManager.getlocal("searchPersonDesc"+this.personId);
		}


		public constructor() 
		{
			super()
		}
	}

	class SearchBuildItemCfg extends BaseItemCfg
	{
		public icon:string;
		public name:string;
		public constructor() 
		{
			super()
		}
	}
}
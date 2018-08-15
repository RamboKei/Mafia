namespace Config
{
	export namespace ServantCfg 
	{
		let servantListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ServantItemCfg;
				if(!servantListCfg.hasOwnProperty(String(key)))
				{
					servantListCfg[String(key)]=new ServantItemCfg();
				}
				itemCfg=servantListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
			}
		}

		export function getServantItemById(id:string|number):ServantItemCfg
		{
			return servantListCfg[String(id)];
		}

		export function checkIsLockedByGM(servantId:string):boolean{
			let sercfg = servantListCfg[servantId];
			if( sercfg.state == 0 )
			{
				if( Api.switchVoApi.checkIsServantLocked(servantId)){
					return false;
				}else{
					return true;
				}
			}
			return false;
		}

	}

	class ServantItemCfg extends BaseItemCfg
	{

		/**
		 * 门客id
		 */
		public id:string;
		/**
		 * 品质
		 */
		public quality:number;
		/**
		 * 
		 * 代入感对话
		 * 
		 */
		public dialogue:string;

		public _wifeId:string;
		public  get wifeId():string
		{
			if(!this._wifeId || Config.WifeCfg.checkIsLockedByGM(this._wifeId) ){
				return null;
			}
			return this._wifeId;
		}
		public set wifeId(tmpid:string)
		{
			this._wifeId = tmpid;
		}
		/**
		 * 特长  1：武力 2：智力 3：政治 4：魅力 5：均衡
		 */
		public speciality:number[];

		/**
		 * 门客的奖励
		 */
		public exchange:string;

		/**
		 * 资质
		 */
		public ability:string[];
		/**
		 * 光环
		 */
		public aura:{att:number[],growAtt:number,growNeed1:string[],maxLv:number,growNeed2:string,auraIcon:number}[]

		public constructor()
		{
			super();
		}

		public get name():string
		{
			return LanguageManager.getlocal("servant_name"+this.id);
		}

		public get desc():string
		{
			return LanguageManager.getlocal("servant_Desc"+this.id);
		}

		public get story():string
		{
			return LanguageManager.getlocal("servant_story"+this.id);
		}
		/**
		 * 
		 * 对话ids
		 */
		public get dialogIds():string[]
		{
			if (this.dialogue){
				let dialogids = this.dialogue.split("_");
				return dialogids;
			} else {
				return null;
			}
		
		}
		public get fullIcon():string
		{
			return  "servant_full_"+this.id;
		}
		
		public get halfIcon():string
		{
			return  "servant_half_"+this.id;
		}
		public get sound():string
		{
			return  "effect_servant_"+this.id;
		}

		// 道具描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("servantDropDesc_" + this.id);
		}

		//获取品质框资源
		public get qualityBoxImgPath():string{
			let tmpCfg = GameConfig.config.servantCfg[this.id];
			return "servant_cardbg_" + tmpCfg.quality;
		}

	}
}
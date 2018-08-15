namespace Config
{
	/**
	 * 红颜配置
	 */
	export namespace WifeCfg 
	{
		let wifeListCfg:WifeItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:WifeItemCfg;
				if(!wifeListCfg.hasOwnProperty(String(key)))
				{
					wifeListCfg[String(key)]=new WifeItemCfg();
				}
				itemCfg=wifeListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getWifeCfgById(id:string|number):WifeItemCfg
		{
			return wifeListCfg[String(id)];
		}
        export function getWifeCfgList():Array<WifeItemCfg>
		{
			return wifeListCfg;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(wifeListCfg).length;
		}
	}

	export class WifeItemCfg extends BaseItemCfg
	{
        /**
		 * 红颜id
		 */
		public id: string;
		/**
		 * sortId
		 */
		public sortId: number;
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
		/**
		 * 寻访进度
		 */
		public value:string;

		/**
		 * 解锁条件
		 */
		public unlock:Object;

		/**
		 * 红颜对话数量
		 */
		public wifeWords:number;

		/**
		 * 红颜技能
		 * att  加成属性  1：武力 2：智力 3：政治 4：魅力
		 *    --growAtt  每级增加的属性
      -	-condition  技能解锁，需要红颜亲密度达到 X
		 */
		public wifeSkill:{att:number[],growAtt:number,condition:number,skillId:number}[];

		/**
		 * 对应门客
		 */
		public servantId:string;


        /**红颜名称 */

        public get name():string
        {
            return LanguageManager.getlocal("wifeName_" + this.id);
        }
        /**红颜描述 */
        public get desc():string
        {			
            return LanguageManager.getlocal("wifeDesc_" + this.id);
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
        /**红颜说的话 */
        public get words():string
        {
            //todo 后面取配置
            let wordIndex = App.MathUtil.getRandom(1,4)
            return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
        }
        /**红颜解锁条件 */
        public get wifeunlock():string
        {
            if(this.unlock)
            {
                if(this.unlock["needPower"])
                {
                    return LanguageManager.getlocal("wifeUnlock_2",[this.unlock["needPower"]]);
                }
                if(this.unlock["needVip"])
                {
                    return LanguageManager.getlocal("wifeUnlock_3",[this.unlock["needVip"]]);
                }
				if(this.unlock["needQQ"])
				{
					return LanguageManager.getlocal("wifeUnlock_4");
				}
				if(this.unlock["needActive"])
				{
					return LanguageManager.getlocal("wifeUnlock_5");
				}
            }
            
            return LanguageManager.getlocal("wifeUnlock_1");
        }
        /**红颜背景 */
        public get bg():string
        {
            return "wifeview_bg1";
            // return "wifeview_bg" + this.id;
        }

        /**红颜icon */
        public get icon():string
        {
            return "wife_half_" + this.id;
        }

        /**红颜半身像 */
        public get body():string
        {
			// 安希的寻访id为73
			if ((this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
				|| 
				(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
				return "wife_full3_" + this.id;
			} else {
				return "wife_full_" + this.id;
			}
        }

            /**红颜脱衣半身像 */
        public get body2():string
        {
            return "wife_full2_" + this.id;
        }

        /**红颜声音 */
        public get sound():string
        {
            return "effect_wife_" + this.id;
        }

		 /**红颜骨骼 */
        public get bone():string
        {
            return "wife_full_" + this.id;
			// return "wife_full3_3051";
        }
		 /**红颜脱衣服骨骼 */
        public get bone2():string
        {
            return "wife_full2_" + this.id;
        }
		public constructor()
		{
			super();	
		}
	}
}
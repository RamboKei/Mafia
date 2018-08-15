namespace Config
{
	/**
	 * 皮肤配置
	 */
	export namespace WifeskinCfg 
	{
		let wifeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:WifeSkinItemCfg;
				if(!wifeListCfg.hasOwnProperty(String(key)))
				{
					wifeListCfg[String(key)]=new WifeSkinItemCfg();
				}
				itemCfg=wifeListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getWifeCfgById(id:string|number):WifeSkinItemCfg
		{
			return wifeListCfg[String(id)];
		}
        export function getWifeCfgList():Array<WifeSkinItemCfg>
		{
			let arr:Array<Config.WifeSkinItemCfg> = new Array();
			for(let key in wifeListCfg)
			{
				var curr_wifeItemCfg=wifeListCfg[key];
				arr.push(curr_wifeItemCfg);
			}
			return arr;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(wifeListCfg).length;
		}
	}

	export class WifeSkinItemCfg extends BaseItemCfg
	{
        /**
		 * 皮肤id
		 */
		public id: string;
		/**
		 * 皮肤id
		 */
		public wifeId: string;
		/**
		 * atkAdd
		 */
		public atkAdd: any;
		/**
		 * inteAdd
		 */
		public inteAdd: any;
		/**
		 * politicsAdd
		 */
		public politicsAdd: any;
		/**
		 * charmAdd
		 */
		public charmAdd: any;
		/**
		 * 红颜亲密度增加  只增加对应红颜的亲密度
		 */
		public wifeIntimacy:number;

		/**
		 * 红颜魅力值增加  只增加对应红颜的魅力值
		 */
		public wifeGlamour:number;

		/**
		 * 子嗣恢复时间减少X  单位：秒
		 */
		public childReduce:number;
		/**
		 *  寻访恢复时间减少  单位：秒
		 */
		public searchReduce:number;
		/**
		 * 红颜传唤恢复时间减少  单位：秒
		 */
		public wifeReduce:number;


        /**皮肤名称 */

        public get name():string
        {
            return LanguageManager.getlocal("skinName" + this.id);
        }
        /**皮肤描述 */
        public get desc():string
        {			
            return LanguageManager.getlocal("skinDesc" + this.id);
        }
		 /**皮肤描述 */
        public get desc2():string
        {			
            return LanguageManager.getlocal("skinDesc_" + this.id);
        }

		 public get dropDesc():string
        {			
            return LanguageManager.getlocal("skinDropDesc_" + this.id);
        }
        /**皮肤说的话 */
        public get words():string
        {
            //todo 后面取配置
            let wordIndex = App.MathUtil.getRandom(1,4)
            return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
        }
       
      
        /**皮肤icon */
        public get icon():string
        {
            return "wife_skinhalf_" + this.id;
        }

        /**皮肤半身像 */
        public get body():string
        {
            return "wife_skin_" + this.id;
        }

            /**皮肤脱衣半身像 */
        public get body2():string
        {
            return "wife_skinfull2_" + this.id;
        }
		/**皮肤骨骼 */
        public get bone():string
        {
            return "wife_full3_" + this.id;
        }
		/**皮肤骨骼脱一夫 */
        public get bone2():string
        {
            return "wife_full4_" + this.id;
        }
        /**皮肤声音 */
        public get sound():string
        {
            return "effect_wifeskin_" + this.id;
        }
		public constructor()
		{
			super();	
		}
	}
}
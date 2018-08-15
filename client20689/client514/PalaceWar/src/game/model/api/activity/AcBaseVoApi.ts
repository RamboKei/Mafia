class AcBaseVoApi extends BaseVoApi
{
	private _acVoList:Object={};
	private _newAcVoList:Object={};

	//活动是否激活了某些激活条件 可用于活动解锁红颜
	private _activeUnlockMap: Object={}; //{[key: string]:number;};
	public constructor() 
	{
		super();
	}

	public formatData(data:any,checkCfg?:boolean):boolean
	{
		
		let needGetCfgAidArr:string[]=[];
		if(data.info)
		{
			let info=data.info;
			for(let key in info)
			{
				let aidAndVersionArr:string[]=key.split("-");
				let aid:string=aidAndVersionArr[0];
				let v:string=aidAndVersionArr[1];
				let acList:Object=this._acVoList[aid];
				let newAcList:Object=this._newAcVoList[aid];
				if(this._acVoList[aid]==null)
				{
					acList={};
					this._acVoList[aid]=acList;
				}
				if(acList[v]==null)
				{
					let voClassName=App.StringUtil.firstCharToUper(aid);
					let voClass:any=egret.getDefinitionByName("Ac"+voClassName+"Vo");
					if(voClass)
					{
						let acVo:AcBaseVo=new voClass();
						acVo.initData(info[key]);
						acList[v]=acVo;
						
						if(this._newAcVoList[aid]==null)
						{
							newAcList={};
							this._newAcVoList[aid]=newAcList;
						}
						newAcList[v]=acVo;
					}
				}
				else
				{
					acList[v].initData(info[key]);
				}
				if(acList[v]&&!acList[v].config)
				{
					needGetCfgAidArr.push(key);
				}
			}
		}
		if(needGetCfgAidArr&&needGetCfgAidArr.length>0)
		{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,{activeArr:needGetCfgAidArr});
			return false;
		}
		return true;
	}

	//设置活动激活条件
	public setActiveUnlock(key: number){
		this._activeUnlockMap["needActive_"+key] = key;

	}
	//判断某个活动是否激活某些需要活动激活的条件
	public checkActiveIsUnlock(key: number): boolean
	{
		if(this._activeUnlockMap["needActive_"+ key]){
			return true;
		} else {
			return false;
		}
		
	}

	/**
	 * 根据活动aid判断该类活动是否需要显示红点
	 * @param aid 
	 */
	public checkShowRedDotByAid(aid:string,code:string):boolean
	{
		if(code)
		{
			let vo = this.getActivityVoByAidAndCode(aid,code);
			if(vo && vo.isStart && vo.isShowRedDot == true)
			{
				return true;
			}
		}
		else
		{
			let voDic = this._acVoList[aid];
			let voList:AcBaseVo[]=[];
			if(voDic)
			{
				for(let code in voDic)
				{
					let vo:AcBaseVo=voDic[code];
					if(vo&&vo.isStart&&vo.isShowRedDot == true)
					{
						return true;
					}
				}
			}
		}
		return false;
	}

	public checkActivityStartByAid(aid:string,code?:string):boolean
	{
		let result:boolean=false;
		if(code)
		{
			let vo:AcBaseVo = this.getActivityVoByAidAndCode(aid,code);
			result=vo?vo.isStart:false;
		}
		else
		{
			let voList:AcBaseVo[]=this.getActivityVoListByAid(aid);
			if(voList)
			{
				let l:number=voList.length;
				for(let i:number=0;i<l;i++)
				{
					if(voList[i]&&voList[i].isStart)
					{
						result=true;
						break;
					}
				}
			}
		}
		return result;
	}

	public getRanActives():AcBaseVo[]

	{
		let actives:AcBaseVo[]=[];
		for(let aid in this._acVoList)
		{
			let voDic:any=this._acVoList[aid];
			if(voDic)
			{
				for(let code in voDic)
				{
					let vo:AcBaseVo=voDic[code];
					if(vo&&vo.isStart)
					{
						if(aid=="rankActive"&&vo.atype != "11")
						{
							actives.push(vo);
						}	
					}
				}
			}
		}
		
		return actives;
	}

	public getAllActivityIcons():BaseDisplayObjectContainer[]
	{	
		let icons:BaseDisplayObjectContainer[]=[];
		let rechargerewardicon:string=null;
		//疯狂系列活动的图标
		let carnivalRewardIcon:string = null; 
		let iconKeyDic:Object={};
	
		for(let aid in this._newAcVoList)
		{
			let iconUrl:string;
			let iconNameStr:string;
			let iconCfgName:string=Config.IconorderCfg.getIconNameByName(aid);
			let isHasChildCfg:boolean=Config.IconorderCfg.checkHasChildCfgNameByName(aid);
			if(iconCfgName||isHasChildCfg)
			{
				if(this.checkActivityStartByAid(aid))
				{
					if(isHasChildCfg)
					{
						let voDic:Object=this._acVoList[aid];
						if(voDic)
						{
							for(let code in voDic)
							{
								let vo:AcBaseVo=voDic[code];
								if(vo&&vo.isStart&&vo.atype)
								{
									let iconCfg:Config.IconOrderItemCfg=Config.IconorderCfg.getIconCfgByAidAndType(aid,vo.atype);
									if(iconCfg)
									{
										if(iconCfg.icon)
										{
											if(!iconKeyDic[iconCfg.icon])
											{
												icons.push(this.createActivityicon(iconCfg.icon,null,vo.atype));
												iconKeyDic[iconCfg.icon]=iconCfg.icon;
											}
										}
										else
										{
											if(vo.atype){
												icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
											}
											else{
												icons.push(this.createActivityicon(aid,Number(code)));
											}
										}
									}
									else
									{
										if(iconCfgName)
										{
											if(!iconKeyDic[iconCfgName])
											{
												icons.push(this.createActivityicon(iconCfgName,null));
												iconKeyDic[iconCfgName]=iconCfgName;
											}
										}
									}
									
								}
								else
								{
									if(iconCfgName)
									{
										if(!iconKeyDic[iconCfgName])
										{
											icons.push(this.createActivityicon(iconCfgName,null));
											iconKeyDic[iconCfgName]=iconCfgName;
										}
									}
								}
							}
						}
					}
					else if(iconCfgName)
					{
						if(!iconKeyDic[iconCfgName])
						{
							icons.push(this.createActivityicon(iconCfgName,null));
							iconKeyDic[iconCfgName]=iconCfgName;
						}
					}
				}
			}
			// if(aid=="limitedReward"&&this.checkActivityStartByAid(aid))
			// {
			// 	icons.push(this.createActivityicon(aid,null));
			// }
			// else if(aid=="dailyCharge"||aid=="totalDayRecharge"||aid=="totalRecharge")
			// {
			// 	if(rechargerewardicon==null&&this.checkActivityStartByAid(aid))
			// 	{
			// 		rechargerewardicon="recharge";
			// 		icons.push(this.createActivityicon(rechargerewardicon,null));
			// 	}

			// }
			// else if (aid == "carnivalCharge" || aid == "carnivalCost")
			// {
			// 	if (carnivalRewardIcon == null && this.checkActivityStartByAid(aid))
			// 	{
			// 		carnivalRewardIcon = "carnival";
			// 		icons.push(this.createActivityicon(carnivalRewardIcon,null));
			// 	}


			// }
			// else if(aid=="discount"&&this.checkActivityStartByAid(aid))
			// {
			// 	icons.push(this.createActivityicon(aid,null));
			// }
			else
			{
				let voDic:Object=this._acVoList[aid];
				if(voDic)
				{
					for(let code in voDic)
					{
						let vo:AcBaseVo=voDic[code];
						if(vo&&vo.isStart)
						{
							let lowerAid:string=aid.toLowerCase();

							// if(aid=="rankActive"&&vo.atype != "11")
							// {
							// 	continue;
							// }
							if(vo.atype){
								icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
							}
							else{
								icons.push(this.createActivityicon(aid,Number(code)));
							}
							
						}
					}
				}
			}
		}
		this._newAcVoList = {};
		icons.sort((a:BaseDisplayObjectContainer,b:BaseDisplayObjectContainer)=>{
			// let names:string[]=[a.name,b.name];
			// names.sort();
			// if(a.name==names[0])
			// {
			// 	return -1;
			// }
			// else
			// {
			// 	return 1;
			// }
			let sortIdA=Config.IconorderCfg.getIconSortIdByCfgName(a.name);
			let sortIdB=Config.IconorderCfg.getIconSortIdByCfgName(b.name);
			return sortIdA-sortIdB;
		});
		return icons;
	}

	private createActivityicon(aid:string,code:number,type?:number|string):BaseDisplayObjectContainer
	{	
		let atype:number|string=type;
		let nameCode = code;
		if(!type){
			type = code;
		}
		let isShow = false;
		if(aid=="recharge"
				|| aid == "firstrecharge"
				|| aid == "discount"
				
			){
				isShow = true;
		} 
		else
		{
			isShow=Config.IconorderCfg.getisFlickByName(aid,atype);
		}
		let iconCfgBgValue:number = Config.IconorderCfg.getIconBgByAidAndType(aid,atype);
		let lowerAid:string=aid.toLowerCase();
		let iconUrl=code?"ac_"+lowerAid+"-"+type+"_icon":"ac_"+lowerAid+"_icon";
		let iconNameStr=code?"ac_"+lowerAid+"-"+type+"_name":"ac_"+lowerAid+"_name";
		let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(iconUrl,iconNameStr,isShow,iconCfgBgValue);
		iconContainer.name=nameCode?aid+"-"+nameCode:aid;
		iconContainer.bindData={aid:aid,code:code};
		iconContainer.addTouchTap((event:egret.TouchEvent,aid:string,code:number,atype:number|string)=>{
			//引导过程种不响应
			if(Api.rookieVoApi.isGuiding){
				return;
			}
			let viewClassName:string = "Ac"+App.StringUtil.firstCharToUper(aid)+"View";
			if (aid == "crossServerAtkRace")
			{
				viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
			}
			if(aid=="rankActive"&&Number(atype)!=11)
			{
				if(egret.getDefinitionByName(viewClassName.replace("Ac","")))
				{
					viewClassName=App.StringUtil.firstCharToUper(viewClassName.replace("Ac",""));
				}
			}
			ViewController.getInstance().openView(viewClassName,code);
		},this,[aid,code,atype]);
		return iconContainer;
	}

	public getActivityVoListByAid(aid:string):AcBaseVo[]
	{
		let voDic = this._acVoList[aid];
		let voList:AcBaseVo[]=[];
		if(voDic)
		{
			for(let code in voDic)
			{
				voList.push(voDic[code]);
			}
		}
		return voList;
	}

	public getActivityVoByAidAndCode(aid:string,code?:string):AcBaseVo
	{
		let voDic=this._acVoList[aid];
		if(!voDic)
		{
			return null;
		}
		if(aid.indexOf("-")>-1)
		{
			if(!code)
			{
				code=aid.split("-")[1];
			}
			aid=aid.split("-")[0];
		}
		let vo:AcBaseVo;
		if(code)
		{
			vo=voDic[code];
		}
		else
		{
			for(let code in voDic)
			{
				vo=voDic[code]
			}
		}
		return vo;
	}

	public checkIsHasNewAc():boolean
	{
		return Object.keys(this._newAcVoList).length>0;
	}

	public dispose():void
	{
		this._acVoList={};
		this._newAcVoList={};
		super.dispose();
	}
}
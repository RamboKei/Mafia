/**
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
class OtherInfoVoApi extends BaseVoApi
{
	private otherInfoVo:OtherInfoVo;
    // private jd618CollectFlag:boolean = true;
	public constructor() 
	{
		super();
	}

    /**
     * 检测是否已膜拜
     */
    public isRankVisited(idx:number)
    {
        if(idx == 0)
        {
            return this.otherInfoVo.power
        }
        if(idx == 1)
        {
            return this.otherInfoVo.challenge 
        }
        if(idx == 2)
        {
            return this.otherInfoVo.imacy
        }
        if(idx == 3)
        {
            return this.otherInfoVo.gpower
        }
         if(idx == 4)
        {
            return this.otherInfoVo.galliance
        }
    }

     public getOtherInfo()
    {
        return this.otherInfoVo;
    }

     /**
     * 检测是否领取绑定奖励
     */
    public isGetBindingReward()
    {
        if(this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1){
            return true;
        }   
        return false;
    }
    public getPalaceFlag()
    {
        return this.otherInfoVo.palace_flag;
    }
    //获取禁言剩余时间
    public getBanet()
    {
        return this.otherInfoVo.banet;
    }

    //获取禁言剩余时间
    public getCrossBanet()
    {
        return this.otherInfoVo.info.crossBanet;
    }

     //获取糖果屋领取情况
    public getCandyGetInfo()
    {
        return this.otherInfoVo.info.candy;
    }
      //疯狂游乐场关分享信息
    public getFkShareInfo()
    {
        return this.otherInfoVo.info.fkShare;
    }

      //疯狂游乐场关关注信息
    public getFkFocusInfo()
    {
        return this.otherInfoVo.info.fkFocus;
    }

     //疯狂游乐场分享红点
    public getFkIsshowRed()
    {
        if(!this.otherInfoVo.info.fkShare){
            return false;
        }
        let rewards = Config.GameprojectCfg.rewardFKYLC2;
        let keys=Object.keys(rewards);

		let l:number=keys.length;
        let fkVo = Api.otherInfoVoApi.getFkShareInfo();
		for(let i:number=0;i<l;i++)
		{
			let rewardStr=rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            let state = 1;
            if(!fkVo){
                state = 3;
            }
            else{
                if(fkVo.n >= Number(keys[i]))
                {
                    if(fkVo.get[keys[i]] == 1)
                    {
                        state = 2;
                    }
                    else{
                        state = 1;
                    }
                }
                else{
                    state = 3;
                }
            }
            if(state == 1){
                return true;
            }
		}

        return false;
    }

    public checkShowWanbaDesktopIcon():boolean
    {
        return PlatformManager.isSupportDesktopIcon()&&!this.checkWanbaHasSendDesktop();
    }

    public checkShowWanbaShareIcon():boolean
    {
        return PlatformManager.isSupportShare()&&!this.checkWanbaDailyHasShared();
    }

    public checkWanbaHasSendDesktop():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbsendFlag;
    }

    public checkWanbaDailyHasShared():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbdailyshareFlag;
    }



    // 3k实名认证已领取 true 未领取
     public checkrealnamerewards():boolean
    {
        if(this.otherInfoVo.info.author3k)
        {
            return false
        }
        return true
    }

    public getServantSortId()
    {
        let sortId = this.otherInfoVo.info.sortId;
        return sortId? sortId : 1 ;
    }
    public getUnlockList()
    {   
        if(this.otherInfoVo.info)
        {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    }
    
    //功能解锁名字
    public getFunctionName():string
    {   
        // this.arr2 =[];
		let arr = Api.otherInfoVoApi.getUnlockList();//领取数据 

		var arr2 = [];
		arr2 =Config.UnlocklistCfg.getUnlockItemCfgList();
		var arr3 =[]; //已经领取过的
		var arr4 =[]; //可以领取的
		var arr5 =[]; //不可以领取的
		for(var i:number=0;i<arr2.length ;i++)
		{
			if(arr&&arr[arr2[i].key]==1)
			{
				arr3.push(arr2[i]);
                if(arr3.length==arr2.length)
                {
                    return null;
                }
			}
			else
			{
				if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
             	{
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
				  	if(isShowNpc)
					{
						arr4.push(arr2[i]);
					}
					else
					{
						arr5.push(arr2[i]);
					}
				}
				
			}
		}
	 
		arr3.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		arr4.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });

		arr5.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		
		arr2 = arr4.concat(arr5).concat(arr3); 
        let str = LanguageManager.getlocal("functionModuleDes"+arr2[0].sortId);
        return  str
     
    }

    
    //功能解锁红点
    public getFunctionRedhot():boolean
    {
         let arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
         if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.unlockList)
         { 
            var arr = this.otherInfoVo.info.unlockList;
            var boo:boolean =false;
            for(var i:number=0;i<arr2.length ;i++)
            {
                if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
                {
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
                    if(isShowNpc&&arr[arr2[i].key]!=1)
                    {
                        boo=true; 
                        return boo;
                    } 
                } 
            }
         return boo; 
      }
      else
      {
          return false;
      }
    }
    public getCoverState():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        } else {
            return 0;
        }
    }
    /** 获取港台绑定账号奖励领取状态 */
    public getFBBindFlag():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        } else {
            return 0;
        }
    }
 
    public certification():boolean
    {   
        if(this.otherInfoVo.certification)
        {
            return true;
        }
        return false;
    }

    /**
     * 是否是新用户的
     */
    public isnewuser():boolean
    {
        if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.isnewuser)
        {
            return true;
        }
        return false;
    }

    public isJD618RewardEnable()
    {
        if(this.isJDActiveIconVisible())
        {
            let jd618 = this.otherInfoVo.jd618;
            if(jd618 && jd618.flag == 0  )
            {
                return true;
            }
        }
        return false;
    }
 
    public isJDActiveIconVisible()
    {
        let jd618 = this.otherInfoVo.jd618;
        if(jd618 && jd618.st <= GameData.serverTime && jd618.et >= GameData.serverTime)
        {
            return true;
        }
        return false;
    }
    public getJD618ActivetyTimeStr():string
    {
        if(this.isJDActiveIconVisible()){
            let lt = this.otherInfoVo.jd618.et ;
            if(lt - GameData.serverTime <= 86400*2){
                return App.DateUtil.getFormatBySecond(lt - GameData.serverTime,5);
            }
        }
		return "";
    }
    /**
     * 获取分享奖励的领取次数
     */
    public getShareGuideCount():number
    {
        let count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.shareguide) 
        {
            return this.otherInfoVo.info.shareguide;
        }
        return count;
    }
    /**
     * 新分享面板的信息
     */
    public getGeneralShareInfo():any
    {
        return this.otherInfoVo.info.generalshare;
    }

     /**
     * 玩吧回归礼包
     */
    public getReturnrewardWB6():any
    {
        return this.otherInfoVo.info.returnrewardWB6;
        // return 1;
    }
    public dispose():void
	{
		this.otherInfoVo = null;
		super.dispose();
	}
    
    
}
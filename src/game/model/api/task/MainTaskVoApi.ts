/**
 * 主线任务api
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVoApi
 */
class MainTaskVoApi extends BaseVoApi
{
	private mainTaskVo:MainTaskVo;
	public constructor() 
	{
		super();
	}

    public getCurMainTaskId()
    {
        return this.mainTaskVo.taskId;
    }

     public getCurMainTaskValue()
    {
        return this.mainTaskVo.value;
    }

    public getCurTaskNameAndDescTxt()
	{
		// taskId ="105001";
		let taskId = this.getCurMainTaskId()
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		let questType = taskCfg.questType;
		let resultStr = [];
		let tmpNameTxt = undefined;
		let tmpDescTxt = undefined;
		if (questType == 201){
			let servantName =  LanguageManager.getlocal("servant_name"+taskCfg.need);
			tmpNameTxt = LanguageManager.getlocal("taskName"+questType,[servantName]) ;
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[servantName,String(taskCfg.value)]) ;
		}
		else if(questType ==  105) 
		{
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[LanguageManager.getlocal("officialTitle"+taskCfg.value) ]);
			tmpNameTxt =  LanguageManager.getlocal("taskName"+questType) ;
		}
		else if(questType ==  202) 
		{
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[String(taskCfg.need),String(taskCfg.value)]);
			tmpNameTxt = LanguageManager.getlocal("taskName"+questType) ;
		}
		else if(questType ==  206) 
		{
			let clvStr = LanguageManager.getlocal("servant_clvStr"+taskCfg.value);
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[String(taskCfg.need),clvStr]);
			tmpNameTxt = LanguageManager.getlocal("taskName"+questType) ;
		}
		else if(questType ==  106) // 关卡战斗胜利X
		{
			let bcid:number = Math.floor(taskCfg.value / 41) + 1;
			let chaellageName = LanguageManager.getlocal("challengeTitle" + bcid)
			
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[String(taskCfg.value)]);
			tmpNameTxt = LanguageManager.getlocal("taskName"+questType,[chaellageName]) ;
		}
		else{
			tmpDescTxt = LanguageManager.getlocal("taskTxt")+LanguageManager.getlocal("taskDesc"+questType,[String(taskCfg.value)]);
			tmpNameTxt = LanguageManager.getlocal("taskName"+questType);
		}
		resultStr.push(tmpNameTxt);
		resultStr.push(tmpDescTxt);
		return resultStr
	}

    public isCurTaskReach()
    {
        let taskId = this.getCurMainTaskId()
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (this.getCurMainTaskValue() >= taskCfg.value)
        {
            return true;
        }
        return false;
    }
}
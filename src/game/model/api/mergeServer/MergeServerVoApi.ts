class MergeServerVoApi extends BaseVoApi
{
	public constructor()
	{
		super();
    }
    
    private mergeZidCfg : any = null;

	public formatData(data:any):void
	{
		// super.formatData(data);
		this.mergeZidCfg = data;
    }
    
    /**
     * 是否属于合服区
    */
    private isMergeSever(sid):boolean
    {
        //let sid = Number(ServerCfg.selectServer.zid);
        for(let i in this.mergeZidCfg){
            if(this.mergeZidCfg[i] && Number(i) == sid){
                return true;
            }
        }
        return false;
    }

    /**
     * 获取合服后的区服名
    */
    public getAfterMergeSeverName(trueZid?):string
    {
        let uid = Api.playerVoApi.getPlayerID();
        if(!trueZid){
            trueZid = this.getTrueZid();
        }
        let str = '';
        if(this.isMergeSever(trueZid)){
            let newzoneid = this.mergeZidCfg[trueZid];
            str = '合' + newzoneid;// + LanguageManager.getlocal("serverListServer");
        }
        else{
            str = trueZid + '';// + LanguageManager.getlocal("serverListServer");
        }
        return str;
    }
    
    /**
     * 获取真正区服
    */
    public getTrueZid():number
    {
       let uid = Api.playerVoApi.getPlayerID();
       return Math.floor(uid / 1000000);;
    }

    /**
     * 判断是否同服
    */
    public judgeIsSameServer(zid1,zid2):boolean
    {
        let ismerge1 = this.isMergeSever(zid1);
        let ismerge2 = this.isMergeSever(zid2);
        if(ismerge1 && ismerge2){
            return this.mergeZidCfg[zid1] == this.mergeZidCfg[zid2];
        }
        else if(!ismerge1 && !ismerge2){
            return Number(zid1) == Number(zid2);
        }
        else{
            return false;
        }
    }

	public dispose():void
	{
        this.mergeZidCfg = null;
        super.dispose();
	}
}
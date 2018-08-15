/**
 * 聊天系统api
 * author dky
 * date 2017/9/26
 * @class ChallengeVoApi
 */

class ChatVoApi extends BaseVoApi
{
	private chatVo:ChatVo;
	private chatblockVo:ChatblockVo
	private _lastMessage:string = "";
	public _lastTime:number=0;
	private _chatID = 0;
	public _lastAllianceId:number=0;
	public constructor() {
		super();
	}

	public formatData2(data:any):void
	{
		if(this.chatblockVo == null)
		{
			let className:string = this.getClassName();
			let voClassName:string = "ChatblockVo";
			let voClass:any = egret.getDefinitionByName(voClassName);
			
			this.chatblockVo = new voClass();
			// this.chatblockVo.initData(data);
			this[App.StringUtil.firstCharToLower(voClassName)] = this.chatblockVo;
		}
		this.chatblockVo.initData(data);
	}

	public getChatBlockVo() :ChatblockVo
    {
        return this.chatblockVo;
    }
	public getIsBlock(uid) :boolean
    {
        for (var index = 0; index < this.chatblockVo.info.length; index++) {
			var element = this.chatblockVo.info[index];
			if(element == uid)
			{
				return true;
			}
		}
		return false;
    }

    public getChatList() :any[]
    {
        return this.chatVo?this.chatVo.chatVoObj:[];
    }
	 public getWorldList() :any[]
    {
        return this.chatVo?this.chatVo.worldVoObj:[];
    }
	 public getAllianceList() :any[]
    {
        return this.chatVo?this.chatVo.allianceVoObj:[];
    }
	public setLastMessage(message:string)
    {
        this._lastMessage = message;
    }

	public refreshLastMessage()
    {
		if(Api.playerVoApi.getPlayerAllianceId() == 0 && this.chatVo && this.chatVo.worldVoObj.length > 0){
			let data = this.chatVo.worldVoObj[this.chatVo.worldVoObj.length - 1];
			let titleStr = LanguageManager.getlocal("chatWorldTitle");
			let chatMesaage =titleStr + "<font color="+ TextFieldConst.COLOR_LIGHT_YELLOW +  ">" + data.sendername + "</font>"+ ":" + data.content.message;
			this._lastMessage = chatMesaage;
		}

    }
	public getLastMessage() :string
    {
        return this._lastMessage;
    }
	public getChatSign() :string
    {	
		this._chatID ++;
        return this._chatID.toString() + GameData.serverTime + Api.playerVoApi.getPlayerID().toString();
    }

	public clearChat()
    {
		if(this.chatVo){
			this.chatVo.worldVoObj = [];
			this.chatVo.chatVoObj = [];
			this.chatVo.allianceVoObj = [];
		}
	
    }
	

	public dispose():void
	{
		this.chatVo = null;
		this._lastMessage = "";
		this._lastTime = null;
		this.chatblockVo = null;
		super.dispose();
	}
}
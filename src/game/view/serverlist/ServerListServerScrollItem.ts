/**
 * 服务器列表
 * author dky
 * date 2017/11/3
 * @class ServerListServerScrollItem
 */
class ServerListServerScrollItem extends ScrollListItem
{

	private _serverInfo:{sname:string,zid:string,flag:number,inserver:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,serverInfo:{sname:string,zid:string,flag:number,inserver:number}):void
	{	

		this.width = 320;
		this.height = 46 +this.getSpaceY();

		let textColor = TextFieldConst.COLOR_WARN_RED3;

		
        let stateStr = LanguageManager.getlocal("serverListOld");
        if(serverInfo.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN;
        }

		let itemBg = BaseBitmap.create("public_9_probiginnerbg");
		itemBg.width = this.width;
		itemBg.height = 46;
		itemBg.x =  this.width/2 - itemBg.width/2;
		itemBg.y = this.height/2 - itemBg.height/2;
		this.addChild(itemBg);

		let zidStr = "【" + serverInfo.zid + LanguageManager.getlocal("serverListServer") +  "】";


        let serverIdTF = ComponentManager.getTextField( zidStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverIdTF.textColor = textColor;
		serverIdTF.x = 20;
		serverIdTF.y = this.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	

		let serverNameTF = ComponentManager.getTextField( serverInfo.sname,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverNameTF.textColor = textColor;
		serverNameTF.x = this.width/2 - serverNameTF.width/2;;
		serverNameTF.y = this.height/2 - serverNameTF.height/2;
		this.addChild(serverNameTF);


        let serverStateTF = ComponentManager.getTextField( stateStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 220;
		serverStateTF.y = this.height/2 - serverStateTF.height/2;
		this.addChild(serverStateTF);
		

		 if(serverInfo.inserver == 1)
        {
            let userIcon = BaseBitmap.create("serverlist_usericon");
			userIcon.x = 280;
			userIcon.y = this.height/2 - userIcon.height/2;
			this.addChild(userIcon);
        }
	

	}

	
	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._serverInfo = null;
		super.dispose();
	}
}
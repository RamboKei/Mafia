/**
 * 服务器列表
 * author dky
 * date 2017/11/3
 * @class ServerListMyScrollItem
 */
class ServerListMyScrollItem extends ScrollListItem
{

	private _serverInfo:{sname:string,zid:string,flag:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,serverInfo:{sname:string,zid:string,flag:number}):void
	{	

		this.width = 410;
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


        let serverIdTF = ComponentManager.getTextField( zidStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		serverIdTF.textColor = textColor;
		serverIdTF.x = 30;
		serverIdTF.y = this.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	

		let serverNameTF = ComponentManager.getTextField( serverInfo.sname,TextFieldConst.FONTSIZE_TITLE_SMALL);
		serverNameTF.textColor = textColor;
		serverNameTF.x = this.width/2 - serverNameTF.width/2;;
		serverNameTF.y = this.height/2 - serverNameTF.height/2;
		this.addChild(serverNameTF);


        let serverStateTF = ComponentManager.getTextField( stateStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 310;
		serverStateTF.y = this.height/2 - serverStateTF.height/2;
		this.addChild(serverStateTF);
		
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
/**
 * 查看帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceShowInfoPopupView
 */
class AllianceShowInfoPopupView  extends PopupView
{   

	private _allianceInfo:any;
	private _allianceMemberInfo:any;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 565;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);

		let bg1:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg1.width = 500;
		bg1.height = 226;
		bg1.setPosition(this.viewBg.width/2  - bg1.width/2, 70);
		this.addChildToContainer(bg1);
		

		let nameStr = LanguageManager.getlocal("allianceFindInfo1",[this._allianceInfo.name,this._allianceInfo.level])
		let info1TF:BaseTextField = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info1TF.x = 45;
		info1TF.y = 40;
		this.addChildToContainer(info1TF);

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(this._allianceInfo.level);
		let info3Str = LanguageManager.getlocal("allianceFindInfo3",[this._allianceInfo.exp + "/" + allianceCfg.exp])
		let info3TF:BaseTextField = ComponentManager.getTextField(info3Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info3TF.y = info1TF.y + info1TF.height + 20;
		info3TF.x = info1TF.x;
		this.addChildToContainer(info3TF);

		let info4Str = LanguageManager.getlocal("allianceFindInfo4",[this._allianceInfo.wealth])
		let info4TF:BaseTextField = ComponentManager.getTextField(info4Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info4TF.y = info3TF.y + info3TF.height + 10;
		info4TF.x = info1TF.x;
		this.addChildToContainer(info4TF);

		let info5Str = LanguageManager.getlocal("allianceFindInfo5",[this._allianceInfo.affect])
		let info5TF:BaseTextField = ComponentManager.getTextField(info5Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info5TF.y = info4TF.y + info4TF.height + 10;
		info5TF.x = info1TF.x;
		this.addChildToContainer(info5TF);



		let info7Str = LanguageManager.getlocal("allianceFindInfo7",[this._allianceInfo.cqq])
		let info7TF:BaseTextField = ComponentManager.getTextField(info7Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info7TF.y = info5TF.y + info5TF.height + 10;
		info7TF.x = info1TF.x;
		this.addChildToContainer(info7TF);

		let info8Str = LanguageManager.getlocal("allianceFindInfo8",[this._allianceInfo.intro])
		let info8TF:BaseTextField = ComponentManager.getTextField(info8Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info8TF.y = info7TF.y + info7TF.height + 10;
		info8TF.x = info1TF.x;
		info8TF.width = 490;
		info8TF.lineSpacing = 5;
		this.addChildToContainer(info8TF);


		let info6Str = LanguageManager.getlocal("allianceFindInfo6",[this._allianceInfo.mn + "/" + this._allianceInfo.maxmn])
		let info6TF:BaseTextField = ComponentManager.getTextField(info6Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info6TF.y = bg1.y + bg1.height + 10;
		info6TF.x = info1TF.x;
		this.addChildToContainer(info6TF);

		let bg2:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg2.width = 500;
		bg2.height = 250;
		bg2.setPosition(this.viewBg.width/2  - bg2.width/2, bg1.y + bg1.height + 40);
		this.addChildToContainer(bg2);

		let titleBg:BaseBitmap = BaseBitmap.create("dinner_rank_titlebg");
		titleBg.width = bg2.width;
		titleBg.height = 36;
		titleBg.setPosition(bg2.x , bg2.y);
		this.addChildToContainer(titleBg);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(120 , titleBg.y+titleBg.height/2 - nameText.height/2);
		this.addChildToContainer(nameText);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(387 , titleBg.y+titleBg.height/2 - scoreText.height/2);
		this.addChildToContainer(scoreText);

		let dataList = this._allianceMemberInfo;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 10,bg2.height - 50);
		let scrollList = ComponentManager.getScrollList(AllianceShowInfoScrollItem,dataList,rect);
		this.addChildToContainer(scrollList);
		scrollList.x = bg1.x + 5;
		scrollList.y = titleBg.y + titleBg.height + 3;
		
	}

	/**
	 * 获取
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_GETDETAILS,requestData:{allianceId:this.param.data.aid}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.data.ret < 0){
			return;
		}
		
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETDETAILS)
		{
			this._allianceInfo  = data.data.data.falliance;
			this._allianceMemberInfo  = data.data.data.falliancemember;
			this._allianceMemberInfo.sort((a:any,b:any)=>{
			
				return Number(a.po) -  Number(b.po) ;
				// return 0;
			});
		}


		
	}
	
    protected getTitleStr(){
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    }


	public dispose():void
	{

		// this.removeTouchTap();
		this._allianceInfo = null;
		this._allianceMemberInfo = null;
		super.dispose();
	}
}

class AllianceShowInfoScrollItem extends ScrollListItem
{
	
	public constructor()
	{
		super();
	}

	public initItem(index:number,rankData:any):void
	{
		this.width = 510;
		this.height = 50  + this.getSpaceY();

		let nameTF = ComponentManager.getTextField(rankData.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		nameTF.x = 118 - nameTF.width/2;
		nameTF.y = 5;
		this.addChild(nameTF);

		let poStr = LanguageManager.getlocal("allianceMemberPo" + rankData.po)
		let poTF = ComponentManager.getTextField(poStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		poTF.x = 368 - poTF.width/2;
		poTF.y = 5;
		this.addChild(poTF);

		let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = 40;
        this.addChild(lineImg);

		
	}
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{

		super.dispose();
	}
}
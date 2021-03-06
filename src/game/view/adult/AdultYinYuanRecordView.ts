/**
 * 姻缘记录
 * author 钱竣
 */
class AdultYinYuanRecordView extends PopupView
{
	
	public constructor() 
	{
		super();
	}

	private get cfg() : any{
        return Config.SadunCfg;
    }

    private get api() : AdultVoApi{
        return <AdultVoApi>Api.adultVoApi;
    }
	
	protected getTitleStr() : string{
		let type = this.param.data.type;
		return type == 'marry' ? 'adultMarryOnsundan' : 'adultyinyuanrecord';
	}

	
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"friends_seprate_bg","friends_arrow2"
		]);
	}

	protected resetBgSize() : void{
		if(this.getBgName() != "public_rule_bg")
		{
			this.closeBtn.y = this.viewBg.y - 40;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 40);
		}
		else
		{
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		let type = view.param.data.type;
		view.viewBg.height = 850;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,this.chooseSadunMarry,this);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let bg : BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 770;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0,60]);
		view.addChild(bg);
		let arr = [];
		let info = Api.adultVoApi.getALlMarryPlayerInfo();
		// let len = info.sadun.length + info.notsadun.length;
		// //let info = Api.adultVoApi.getALlMarryPlayerInfo();
		// arr.push({
		// 	index : 0,
		// 	param : 'sadun',
		// 	type : type,
		// 	show : true,
		// 	start : true,
		// 	empty1 : info.sadun.length == 0 
		// });
		// let temp1 = [];
		// for(let i in info.sadun){
		// 	let unit = info.sadun[i];
		// 	temp1.push({
		// 		index : Number(i) + 1,
		// 		param : 'sadun',
		// 		type : type,
		// 		show : true,
		// 		childid : this.param.data.childid,
		// 		uid : unit.uid,
		// 		name : unit.name,
		// 		pic : unit.pic,
		// 		level : unit.level,
		// 		power : unit.power,
		// 		mygname : unit.mygname,
		// 		offtime : unit.olt,//olt
		// 		friend : unit.friend,
		// 		title : unit.ptitle,
		// 		start : false
		// 	});
		// }
		// temp1.sort((a,b)=>{
		// 	return b.friend - a.friend;
		// });
		// arr = arr.concat(temp1);

		// arr.push({
		// 	index : 0,
		// 	param : 'notsadun',
		// 	type : type,
		// 	show : true,
		// 	start : true,
		// 	empty2 : info.notsadun.length == 0
		// });
		// let temp = [];
		// for(let i in info.notsadun){
		// 	let unit = info.notsadun[i];
		// 	temp.push({
		// 		index : Number(i),
		// 		param : 'notsadun',
		// 		type : type,
		// 		show : true,
		// 		childid : this.param.data.childid,
		// 		uid : unit.uid,
		// 		name : unit.name,
		// 		pic : unit.pic,
		// 		level : unit.level,
		// 		power : unit.power,
		// 		mygname : unit.mygname,
		// 		offtime : unit.olt,//olt
		// 		friend : unit.friend,
		// 		title : unit.ptitle,
		// 		start : Number(i) == 0
		// 	});
		// }
		// temp.sort((a,b)=>{
		// 	return Api.adultVoApi.getLyinnum(b.uid) - Api.adultVoApi.getLyinnum(a.uid);
		// });
		// arr = arr.concat(temp);
        for(let i = 0; i < 2; ++ i){
			// let unit = view.cfg.odds[i];
			arr.push({
				index : Number(i),
				param : i == 0 ? 'sadun' : 'notsadun',
				type : type,
				show : true,
				childid : this.param.data.childid
			});
		}
        let tmpRect =  new egret.Rectangle(0,0,520,bg.height - 20);
		let scrollList = ComponentManager.getScrollList(AdultYinYuanRecordScrollItem, arr, tmpRect);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 5]);
		view.addChild(scrollList);
		// view._list1 = scrollList; 

		// let separate2 = BaseBitmap.create('friends_seprate_bg');
		// separate2.width = 520;
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, separate2, scrollList, [0,scrollList.height + 8]);
		// view.addChild(separate2);
		// let arrow2 = BaseBitmap.create('friends_arrow2');
		// arrow2.anchorOffsetX = arrow1.width / 2;
		// arrow2.anchorOffsetY = arrow1.height / 2;
		// arrow2.addTouchTap(view.arrow2click, view);
		// let qinjiaTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('adultyinyuanrecordTitle2'), 22, TextFieldConst.COLOR_WHITE);
		// let param2 = (separate1.width - arrow2.width - qinjiaTxt2.textWidth - 5) / 2;
		// view._arrow2 = arrow2;

		// view.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt2, separate2, [param2, 0]);
		// view.addChild(qinjiaTxt2);

		// view.setLayoutPosition(LayoutConst.lefttop, arrow2, qinjiaTxt2, [qinjiaTxt2.textWidth + 5, 0]);
		// view.addChild(arrow2);

		// let arr2 = [];
        // for(let i = 0; i < info.notsadun.length; ++ i){
        //     // let unit = view.cfg.odds[i];
        //     arr2.push({
        //         uid : 1,
        //         name : "拉拉手老地方",
        //         pic : 1,
        //         level : 2,
        //         power : 109019,
        //         mygname : '',
        //         offtime : 0,//olt
        //         type : type,
        //         friend : 1092,
        //         title : Math.random() > 0.5 ? '4001' : ''
        //     });
        // }
        // let tmpRect2 =  new egret.Rectangle(0,0,520, bg.y + bg.height - separate2.y - separate2.height - 10);
		// let scrollList2 = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, arr2, tmpRect2);
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, separate2, [0, separate2.height + 3]);
		// view.addChild(scrollList2); 
		// view._list2 = scrollList2; 
	}

	private chooseSadunMarry(evt):void{
		let data = evt.data;
		this.param.data.confirmCallback.apply(this.param.data.handler,[data.fuid]);
		this.hide();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,this.chooseSadunMarry,this);
		super.dispose();
	}
}
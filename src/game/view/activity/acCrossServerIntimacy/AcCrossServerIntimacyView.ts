/**
 * author:qianjun
 * desc:跨服亲密活动首页
*/
class AcCrossServerIntimacyView extends AcCommonView
{
	private _canJoinImg : BaseLoadBitmap = null;
	private _cdTimeDesc : BaseTextField = null;
	private _cdType :number = 0;//倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
	private _countDownText : BaseTextField = null;
	private _countDownTime : number = 0;
	private _enterBtn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	public static AID:string = null;
	public static CODE:string = null;

	private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"crossserverinti_canjoin-1","crossserverinti_detailbg-1","crossserverinti_enterin-1","crossserverinti_enterin-1_down","crossserverintibg-1",
			"public_9_wordbg2",
		]);
	}

	protected initTitle() : void{

	}

	protected getBgName():string
	{
		return `crossserverintibg-${this.code}`;
	}

	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	protected getTitleStr():string
	{
		return "atkracecross";
	}

	public initView():void
	{	
		let view = this;
		AcCrossServerIntimacyView.AID = view.aid;
		AcCrossServerIntimacyView.CODE = view.code; 
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY, {});
		//参赛资格
		let canJoin = this.vo.getIsCanJoin();
		view._canJoinImg = BaseLoadBitmap.create(`crossserverinti_canjoin-${this.code}`);
		view._canJoinImg.visible = canJoin;
		view.addChildToContainer(view._canJoinImg);
		//底部
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 146;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		view.addChildToContainer(bottomBg);
		//当前时间段
		view._cdType = vo.judgeTimeProcess();
		if(view._cdType > 0 && view._cdType < 4){
			if(view._cdType == 1){
				view._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
			}
			else if(view._cdType == 2){
				view._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
			}
			else{
				view._countDownTime = vo.et - GameData.serverTime;
			}
			view.api.setCountDownTime(view._countDownTime);
		}

		view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-${view.code}`, '', view.enterInHandler,this);
		if(view._cdType > 1 && view._cdType < 4){
			view._enterBtn.setEnable(true);
		}
		else{
			//灰化
			view._enterBtn.setEnable(false);
		}
		//进入按钮
		view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 5);
		view.addChildToContainer(this._enterBtn);
		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x = 10;
		timeDesc.y = bottomBg.y + 20;
		view.addChildToContainer(timeDesc);
		//活动倒计时时间
		view._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view._cdTimeDesc.x = timeDesc.x;
		view._cdTimeDesc.y = timeDesc.y + timeDesc.textHeight + 5;
		view.addChildToContainer(this._cdTimeDesc);
		if(view._countDownTime > 0){
			view._countDownText = ComponentManager.getTextField(view.vo.getCountTimeStr(view._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
			view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth , this._cdTimeDesc.y);
			view.addChildToContainer(view._countDownText);
		}
		//规则描述
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossIntimacyRule-${view.code}`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = GameConfig.stageWidth - 100;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = timeDesc.x;
		ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
		view.addChildToContainer(ruleDesc);
	}

	public tick():void
	{	
		let view = this;
		if (view._countDownText) {
			-- view._countDownTime;
			view.api.setCountDownTime(view._countDownTime);
			view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
			if (view._countDownTime <= 0) {
				view._cdType = view.vo.judgeTimeProcess();
				if(view._cdType == 2){
					view._enterBtn.setEnable(true);
					view._countDownTime = view.vo.et - 86400 - GameData.serverTime;
				}
				else if(view._cdType == 3){
					view._countDownTime = view.vo.et - GameData.serverTime;
				}
				else if(view._cdType == 4){
					view._enterBtn.setEnable(false);
					view.hide();
					App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
					return;
				}
				view.api.setCountDownTime(view._countDownTime);
				view._cdTimeDesc.text = LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`);
				view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
			}
		}
	}

	private enterInHandler() : void{
		let view = this;
		if(view._cdType > 1 && view._cdType < 4){
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINTIMACYENTERVIEW);
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
		}
	}

	public dispose():void
	{
		let view = this;
		view._canJoinImg = null;
		view._cdTimeDesc = null;
		view._enterBtn.removeTouchTap();
		view._enterBtn = null;
		super.dispose();
	}
}
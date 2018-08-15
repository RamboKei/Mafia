/**
 * 公共方法类
 * author dmj
 * date 2017/9/27
 * @class CommonUtil
 */
namespace App
{
 	export class CommonUtil 
	{
		private static _tipContainer:BaseDisplayObjectContainer;
		/**
		 * 背包使用道具后飘字动画
		 * 对icon、文字数组进行缓动，目前是向上移动（可扩展）
		 * @param list icon：图标，message：文字 
		 * @param startPoint 开始位置相对全局坐标，可选，不传的话为屏幕中心
		 */
		public static playRewardFlyAction(list:{icon?:string,tipMessage:string,type?:number}[]|RewardItemVo[],startPoint?:egret.Point,waitTime:number=800):void
		{
			for(let i=0;i<list.length;i++)
			{
				let play = function()
				{
					let item = list[i];
					let rewardFly = new RewardFly();
	
					rewardFly.init(item.icon,item.tipMessage,item.type);
					if(startPoint)
					{
						rewardFly.setPosition(startPoint.x,startPoint.y);
					}
					else
					{
						rewardFly.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 - 100);
					}
					
					LayerManager.msgLayer.addChild(rewardFly);
				}
				egret.setTimeout(play,this,waitTime*i);
			}
		}

		/**
		 * 游戏内提示
		 * @param message 需要提示的文字
		 */
		public static showTip(message:string):void
		{
			let tipContainer:BaseDisplayObjectContainer=CommonUtil._tipContainer;
			let txtLine:number=1;
			if(!tipContainer)
			{
				let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
				tipBg.setPosition(-tipBg.width/2,-tipBg.height/2);
				tipBg.name="tipBg";
				tipContainer.addChild(tipBg);
				let msgText:BaseTextField=ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_TITLE_SMALL);
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				msgText.textAlign=egret.HorizontalAlign.CENTER;
				msgText.name="msgText";
				msgText.lineSpacing=2;
				txtLine=msgText.numLines;
				tipContainer.addChild(msgText);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				LayerManager.msgLayer.addChild(tipContainer);
				CommonUtil._tipContainer=tipContainer;
			}
			else
			{
				let tipBg:BaseBitmap=<BaseBitmap>tipContainer.getChildByName("tipBg");
				if(!tipBg.texture)
				{
					tipBg.texture=ResourceManager.getRes("public_tipbg");
				}
				let msgText:BaseTextField = <BaseTextField>CommonUtil._tipContainer.getChildByName("msgText");
				msgText.text=message;
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				tipContainer.setScale(1);
				tipContainer.alpha=1;
				egret.Tween.removeTweens(tipContainer);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				txtLine=msgText.numLines;
				if(!LayerManager.msgLayer.contains(tipContainer))
				{
					LayerManager.msgLayer.addChild(tipContainer);
				}
			}
			egret.Tween.get(CommonUtil._tipContainer).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},70).wait(1300*txtLine).to({alpha:0},200).call(function(tipContainer:BaseDisplayObjectContainer){
				if(tipContainer)
				{
					egret.Tween.removeTweens(tipContainer);
					if(LayerManager.msgLayer.contains(tipContainer))
					{
						LayerManager.msgLayer.removeChild(tipContainer);
					}
					tipContainer.setScale(1);
					tipContainer.alpha=1;
				}
			}.bind(this,CommonUtil._tipContainer),this);
		}

		public static showCollectEffect(resKey:string,startPoint:egret.Point,endPoint:egret.Point,callback?:Function,callbackThisObj?:any,callbackParams?:any[]):void
		{
			let collectEffect:CollectEffect=new CollectEffect();
			collectEffect.start(resKey,startPoint,endPoint,callback,callbackThisObj,callbackParams);
		}

		/**
		 * 获取居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterPos(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):{x:number,y:number}
		{
			return {x:CommonUtil.getCenterX(referenceContainer,childDisplayObject,isParent),y:CommonUtil.getCenterY(referenceContainer,childDisplayObject,isParent)};
		}

		/**
		 * 获取X居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterX(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):number
		{
			let x:number=0;
			let scaleX=1;
			if(!isParent)
			{
				x=referenceContainer.x;
				scaleX=referenceContainer.scaleX;
			}
			x+=(referenceContainer.width*scaleX-referenceContainer.anchorOffsetX-childDisplayObject.width*childDisplayObject.scaleX+childDisplayObject.anchorOffsetX)*0.5;
			return x;
		}

		/**
		 * 获取Y居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterY(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):number
		{
			let y:number=0;
			let scaleY=1;
			if(!isParent)
			{
				y=referenceContainer.y;
				scaleY=referenceContainer.scaleY;
			}
			y+=(referenceContainer.height*scaleY-referenceContainer.anchorOffsetY-childDisplayObject.height*childDisplayObject.scaleY+childDisplayObject.anchorOffsetY)*0.5;
			return y;
		}

		public static getContainerByLeftHalfRes(leftRes:string):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			let leftBmp:BaseBitmap=BaseBitmap.create(leftRes);
			container.addChild(leftBmp);
			let rightBmp:BaseBitmap=BaseBitmap.create(leftRes);
			rightBmp.scaleX=-1;
			rightBmp.x=leftBmp.x+leftBmp.width+rightBmp.width;
			container.addChild(rightBmp);
			return container;
		}

		public static  getContainerByLeftTopRes(resUrl:string):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			for(var i:number=0;i<4;i++)
			{
				let bmp:BaseBitmap=BaseBitmap.create(resUrl);
				let xx:number=0;
				let yy:number=0;
				if(i%2==1)
				{
					bmp.scaleX=-1;
					xx=bmp.width*2;
				}
				if(Math.floor(i/2)>0)
				{
					bmp.scaleY=-1;
					yy=bmp.height*2;
				}
				bmp.setPosition(xx,yy);
				container.addChild(bmp);
			}
			return container;
		}

		public static createMainUIIcon(iconUrl:string,iconNameStr:string,isShow?:boolean,extType?:number|string):BaseDisplayObjectContainer
		{	
			if (iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp()== true)
			{
				iconNameStr = "share_icon_name_aiweiyou";
			}

			let iconContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
			iconContainer.addChild(iconBg);
			iconContainer.width=iconBg.width;
			iconContainer.height=iconBg.height;
			iconContainer.anchorOffsetX=iconBg.width/2;
			iconContainer.anchorOffsetY=iconBg.height/2;
			iconContainer.name = iconNameStr;

			if(extType)
			{
				let iconExtBg:BaseLoadBitmap=BaseLoadBitmap.create("ac_icon_bg"+extType,null,{callback:(...args)=>{
					iconExtBg.setPosition(iconBg.x+(iconBg.width-iconExtBg.width)/2,iconBg.y+(iconBg.height-iconExtBg.height)/2);
					iconContainer.addChildAt(iconExtBg,1);
				},callbackThisObj:CommonUtil});

			}

			if(isShow){
				let iconAni:BaseBitmap = BaseBitmap.create("mainui_iconani");
				iconAni.anchorOffsetX = iconAni.width/2;
				iconAni.anchorOffsetY = iconAni.height/2;
				iconAni.setPosition(iconContainer.width/2 , iconContainer.height/2);
				iconContainer.addChild(iconAni);
			
				egret.Tween.get(iconAni,{loop:true})
					.to({rotation: 360}, 1000)
					
			}

			let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconUrl);
			iconContainer.addChild(icon);

			//加载完图片重新设置尺寸
			let iconName:BaseLoadBitmap=BaseLoadBitmap.create(iconNameStr,null,{callback:(container:BaseDisplayObjectContainer)=>{
				if(container)
				{
					iconName.setPosition(container.width/2 - (iconName.width?iconName.width:88)/2,50);
				}
				},callbackThisObj:this,callbackParams:[iconContainer]});

			iconContainer.addChild(iconName);
			// iocnName.setPosition(-8.5,50);

			iconContainer.addTouch((event:egret.TouchEvent,iconContainer:BaseDisplayObjectContainer)=>{
				switch(event.type)
				{
					case egret.TouchEvent.TOUCH_BEGIN:
						iconContainer.setScale(0.95);
					break;
					case egret.TouchEvent.TOUCH_CANCEL:
						iconContainer.setScale(1);
					break;
					case egret.TouchEvent.TOUCH_END:
						iconContainer.setScale(1);
					break;
				}
			},this,[iconContainer]);
			return iconContainer;
		}

		/**
		 * 添加红点提示
		 * @param bdoc 父容器
		 */
		public static addRedDotToBDOC(bdoc:egret.DisplayObjectContainer):void
		{
			if(bdoc && bdoc.getChildByName("reddot"))
			{
				let reddot:BaseBitmap = <BaseBitmap>bdoc.getChildByName("reddot");
				if(reddot)
				{
					reddot.visible = true;
				}
			}
			else
			{
				let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
				reddot.x = bdoc.width - reddot.width;
				// reddot.y = 3;
				bdoc.addChild(reddot);
				reddot.name = "reddot";
			}
		}

		/**
		 * 移除红点提示
		 * @param bdoc 父容器
		 */
		public static removeRedDotFromBDOC(bdoc:BaseDisplayObjectContainer):void
		{
			if(bdoc && bdoc.getChildByName("reddot"))
			{
				let reddot:BaseBitmap = <BaseBitmap>bdoc.getChildByName("reddot");
				if(reddot)
				{
					reddot.visible = false;
				}
			}
		}

		public static createTalkContainer(talkStr:string,isNpcAtLeft:boolean=true,offX?:{lx?:number,rx?:number}):BaseDisplayObjectContainer
		{
			let talkContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			
			//说的话背景
			let talkBg:BaseBitmap = BaseBitmap.create("public_npc_talkbg");
			talkContainer.addChild(talkBg);

			//箭头
			let talkArrow:BaseBitmap = BaseBitmap.create("public_npc_talkarrow");
			if(isNpcAtLeft==false)
			{
				talkArrow.skewY=1;
			}

			//说的话
			let wordsText:BaseTextField = ComponentManager.getTextField(talkStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);

			talkBg.width = wordsText.width+26;
			// talkBg.height = 50;

			if(isNpcAtLeft)
			{
				if(offX)
				{
					if(!isNaN(offX.lx))
					{
						talkBg.setPosition(talkArrow.x-33,talkArrow.y-talkBg.height+2);
					}
					else if(!isNaN(offX.rx))
					{
						talkBg.setPosition(talkArrow.x+talkArrow.width-talkBg.width+33,talkArrow.y-talkBg.height+2);
					}
					else
					{
						talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
					}
				}
				else
				{
					talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
				}
			}
			else
			{
				if(offX)
				{
					if(!isNaN(offX.lx))
					{
						talkBg.setPosition(talkArrow.x-talkArrow.width-33,talkArrow.y-talkBg.height+2);
					}
					else if(!isNaN(offX.rx))
					{
						talkBg.setPosition(talkArrow.x-talkBg.width+33,talkArrow.y-talkBg.height+2);
					}
					else
					{
						talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
					}
				}
				else
				{
					talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
				}
			}
			talkContainer.addChild(talkArrow);

			wordsText.width=talkBg.width-26;
			wordsText.x = talkBg.x+13;
			wordsText.y = talkBg.y+(talkBg.height-wordsText.height)/2;
			talkContainer.addChild(wordsText);

			return talkContainer;
		}
		/**
		 * 播放天恩赐福动画
		 * @param key 名字 
		 */
		public static showGodbless(key:string):void
		{
			let godBless = new GodBless();	
			LayerManager.msgLayer.addChild(godBless);
			godBless.show(key);
		}

		/**
		 * 添加点击缩小效果
		 * @param obj 对象
		 * @param callback 回调
		 */
		public static addTouchScaleEffect(obj:BaseDisplayObject|BaseBitmap|BaseLoadBitmap|BaseDisplayObjectContainer|BaseLoadDisplayObjectContiner,callback:Function,handler:any):void
		{	
			obj.addTouch(
				(event:egret.TouchEvent,obj:any,callback:Function,handler:any)=>
				{	
					let scale = 0.9;
					 switch(event.type)
					{
						case egret.TouchEvent.TOUCH_BEGIN:
							obj.setScale(0.9);
							obj.x+=(obj.width*(1 - scale))/2;
							obj.y+=(obj.height*(1 - scale))/2;
							break;
						case egret.TouchEvent.TOUCH_END:
							obj.setScale(1);
							obj.x-=(obj.width*(1 - scale))/2;
							obj.y-=(obj.height*(1 - scale))/2;
							callback.apply(handler);
							break;
						case egret.TouchEvent.TOUCH_CANCEL:
							obj.setScale(1);
							obj.x-=(obj.width*(1 - scale))/2;
							obj.y-=(obj.height*(1 - scale))/2;
							// callback.apply(handler);
							break;
					}
				},
				CommonUtil,
				[obj,callback,handler]
			)
		}
		/**
		 * 获取带单位的货币字符串
		 * @param money 钱数，不带单位
		 */
		public static getMoneyString(money:number|string):string
		{
			let moneyKey = "anyMoney";
			if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS()) {
				moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
			}
			return LanguageManager.getlocal(moneyKey,[money.toString()]);
		}
		/**
		 * 比较两个版本号的大小，1前者大，0相等，-1后者大
		 * 注意，1.0小于1.0.0
		 */
		public static compareVersion(v1:string, v2:string):number {
			let v1Arr = v1.split(".");
			let v2Arr = v2.split(".");
			let maxLen = Math.max(v1Arr.length, v2Arr.length);
			for(let i = 0; i < maxLen; i++) {
				let v1value = v1Arr[i];
				let v2value = v2Arr[i];
				if (v1value === undefined) {
					return -1;
				}
				if (v2value === undefined) {
					return 1;
				}
				if (parseInt(v1value) > parseInt(v2value)) {
					return 1;
				} else if (parseInt(v1value) < parseInt(v2value)) {
					return -1;
				}
			}
			return 0;
		}
		// 获取url参数，对egret.getOption的封装，对于不支持的平台返回空字符串
		public static getOption(keyName){
			if (App.DeviceUtil.IsHtml5()) {
				return egret.getOption(keyName);
			} else {
				return "";
			}
		}

		public static formatSeaScreen(target:egret.DisplayObject):void
		{
			if(App.DeviceUtil.checkIsSeascreen())
			{
				target.scaleY=(document.documentElement.clientHeight-50)/document.documentElement.clientHeight;
				target.y=GameConfig.seaScreenTopH;
			}
		}
 	}
}
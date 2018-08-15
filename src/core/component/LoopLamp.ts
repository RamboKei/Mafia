/**
 * 循环跑马灯
 * author dky
 * date 2017/11/23
 * @class LoopLamp
 */
class LoopLamp extends BaseDisplayObjectContainer
{
	private _tfPool:Array<BaseTextField>;
	private _stringList:Array<string>;
	private _speed:number;

	public constructor(stringList:string[]) {
		super();
		this._stringList = stringList;
		this.init();
	}

	private init():void
	{	
		this._speed = GameConfig.stageWidth /6000;
		this._tfPool = new Array<BaseTextField>();
		
		this.loadString();
		
	}

	private loadString()
	{
		if(this._stringList.length <= 0){
			return;
		}
		let tf:BaseTextField;

		if(this._tfPool[0]){
			tf = this._tfPool.shift();
		}else{
			tf = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		}

		tf.text = this._stringList[0];
		let str1 = this._stringList.shift()
		this._stringList.push(str1)
		this.addChild(tf);
		tf.x = GameConfig.stageWidth;


		let self = this;
		//第一段时间
		let time1 = (tf.width + 50)/this._speed;
		//第二段时间
		let time2 = (GameConfig.stageWidth - 50)/this._speed;
		egret.Tween.get(tf)
		.to({x:GameConfig.stageWidth - tf.width - 50},time1)
		.call(function(){
			self.loadString();
		},this)
		.to({x:-(tf.width)},time2)
		.call(function(tf:BaseTextField){
			egret.Tween.removeTweens(tf);
			self._tfPool.push(tf);
			if(tf.parent){
				tf.parent.removeChild(tf);
			}
		},this,[tf])
	}
	
	public dispose():void
	{


		super.dispose();
	}
}
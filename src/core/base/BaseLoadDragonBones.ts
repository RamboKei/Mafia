class BaseLoadDragonBones extends BaseDisplayObjectContainer
{
	private _dragonBonesName:string;
	private _dragonBones:dragonBones.EgretArmatureDisplay;
	private _groupName:string;
	private _isLoaded:boolean=false;
	private _isInit:boolean=false;
	private _isStop:boolean=false;
	private static cacheDic:Object={};
	private _playTimes:number = 0;
	private _completeEvt:any = null;
	private _completeFunc:Function = null;
	private _completeFObj:any = null;
	public constructor(dragonBonesName:string,playTimes?:number,idle:string="idle",func?:any,obj?:any)
	{
		super();
		this._dragonBonesName=dragonBonesName;
		if(playTimes)
		{
			this._playTimes = playTimes;
		}else{
			this._playTimes = 0;
		}
		this.idle = idle;
		this.init();
	}

	private init():void
	{
		this._isInit=true;
		this.loadRes();
	}

	private getBonesResArr():string[]
	{
		return [this._dragonBonesName+"_ske",this._dragonBonesName+"_tex_json",this._dragonBonesName+"_tex_png"];
	}

	private loadRes():void
	{
		this._groupName=ResourceManager.loadResources(this.getBonesResArr(),null,this.loadComplete,null,this);
	}

	private idle = 'idle';
	public setIdle(str){
		this.idle = str;
	}

	private loadComplete():void
	{
		if(this._isInit)
		{
			this._isLoaded=true;
			this._dragonBones=App.DragonBonesUtil.getDragonBones(this._dragonBonesName);
			if(!BaseLoadDragonBones.cacheDic[this._dragonBonesName])
			{
				BaseLoadDragonBones.cacheDic[this._dragonBonesName]=1;
			}
			else
			{
				BaseLoadDragonBones.cacheDic[this._dragonBonesName]++;
			}
			this.addChild(this._dragonBones);
			if(this._isStop==false)
			{
				this._dragonBones.animation.play(this.idle,this._playTimes);
			}
		}
		else
		{
			if(this._groupName)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=null;
			}
		}
	}

	/**
	 * 停止播放骨骼动画
	 */
	public stop():void
	{
		if(this._isInit)
		{
			this._isStop=true;
			if(this._dragonBones&&this._dragonBones.animation.isPlaying)
			{
				this._dragonBones.animation.stop(this.idle);
			}
		}
	}

	/**
	 * 恢复播放骨骼动画
	 */
	public resume():void
	{
		if(this._isInit)
		{
			this._isStop=false;
			if(this._dragonBones&&!this._dragonBones.animation.isPlaying)
			{
				this._dragonBones.animation.play(this.idle,0);
			}
		}
	}
	
	public isLoaded():boolean
	{
		return this._isLoaded;
	}

	public playDragonMovie(frame:string, times:number):void{
		if(this._dragonBones){
			this._dragonBones.armature.animation.play(frame,times);
		}
	}

	public getLastFrameName():any{
		if(this._dragonBones){
			return this._dragonBones.animation.lastAnimationName;
		}else{
			return null;
		}
		
	}

	public setFrameAndNum(idle : string, times : number){
		this.idle = idle;
		this._playTimes = times;
	}

	public setAnchorOffset(x:number, y :number):void{
		if(this._dragonBones){
			this._dragonBones.anchorOffsetX = x;
        	this._dragonBones.anchorOffsetY = y;
		}
	}

	public setMovieCompleteFunc(evt,func,obj):void{
		// func.apply(obj,[this]);
		this._completeEvt = evt;
		this._completeFunc = func;
		this._completeFObj = obj;
		this._dragonBones.addEventListener(evt, func, obj);
	}

	public dispose():void
	{
		this._isInit=false;
		this._isStop=false;
		if(BaseLoadDragonBones.cacheDic[this._dragonBonesName])
		{
			BaseLoadDragonBones.cacheDic[this._dragonBonesName]--;
		}
		if(this._dragonBonesName)
		{
			if(this._isLoaded&&!BaseLoadDragonBones.cacheDic[this._dragonBonesName])
			{
				App.DragonBonesUtil.removeDragonBones(this._dragonBonesName);
			}
		}
		this._dragonBonesName=null;
		if(this._groupName)
		{
			if(this._isLoaded)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=null;
			}
		}
		if(this._completeEvt){
			this._dragonBones.removeEventListener(this._completeEvt, this._completeFunc, this._completeFObj);
		}
		this._dragonBones=null;
		this._isLoaded=false;
		this._playTimes = 0;
		this._completeFunc = null;
		this._completeFObj = null;
		super.dispose();
	}
}
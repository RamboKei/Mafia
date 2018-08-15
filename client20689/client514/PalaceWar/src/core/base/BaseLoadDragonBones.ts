class BaseLoadDragonBones extends BaseDisplayObjectContainer
{
	private _dragonBonesName:string;
	private _dragonBones:dragonBones.EgretArmatureDisplay;
	private _groupName:string;
	private _isLoaded:boolean=false;
	private _isInit:boolean=false;
	private _isStop:boolean=false;
	private static cacheDic:Object={};
	public constructor(dragonBonesName:string)
	{
		super();
		this._dragonBonesName=dragonBonesName;
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
				this._dragonBones.animation.play("idle",0);
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
				this._dragonBones.animation.stop("idle");
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
				this._dragonBones.animation.play("idle",0);
			}
		}
	}
	
	public isLoaded():boolean
	{
		return this._isLoaded;
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
		this._dragonBones=null;
		this._isLoaded=false;
		super.dispose();
	}
}
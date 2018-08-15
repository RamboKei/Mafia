var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseLoadDragonBones = (function (_super) {
    __extends(BaseLoadDragonBones, _super);
    function BaseLoadDragonBones(dragonBonesName) {
        var _this = _super.call(this) || this;
        _this._isLoaded = false;
        _this._isInit = false;
        _this._isStop = false;
        _this._dragonBonesName = dragonBonesName;
        _this.init();
        return _this;
    }
    BaseLoadDragonBones.prototype.init = function () {
        this._isInit = true;
        this.loadRes();
    };
    BaseLoadDragonBones.prototype.getBonesResArr = function () {
        return [this._dragonBonesName + "_ske", this._dragonBonesName + "_tex_json", this._dragonBonesName + "_tex_png"];
    };
    BaseLoadDragonBones.prototype.loadRes = function () {
        this._groupName = ResourceManager.loadResources(this.getBonesResArr(), null, this.loadComplete, null, this);
    };
    BaseLoadDragonBones.prototype.loadComplete = function () {
        if (this._isInit) {
            this._isLoaded = true;
            this._dragonBones = App.DragonBonesUtil.getDragonBones(this._dragonBonesName);
            if (!BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
                BaseLoadDragonBones.cacheDic[this._dragonBonesName] = 1;
            }
            else {
                BaseLoadDragonBones.cacheDic[this._dragonBonesName]++;
            }
            this.addChild(this._dragonBones);
            if (this._isStop == false) {
                this._dragonBones.animation.play("idle", 0);
            }
        }
        else {
            if (this._groupName) {
                ResourceManager.destroyRes(this._groupName);
                this._groupName = null;
            }
        }
    };
    /**
     * 停止播放骨骼动画
     */
    BaseLoadDragonBones.prototype.stop = function () {
        if (this._isInit) {
            this._isStop = true;
            if (this._dragonBones && this._dragonBones.animation.isPlaying) {
                this._dragonBones.animation.stop("idle");
            }
        }
    };
    /**
     * 恢复播放骨骼动画
     */
    BaseLoadDragonBones.prototype.resume = function () {
        if (this._isInit) {
            this._isStop = false;
            if (this._dragonBones && !this._dragonBones.animation.isPlaying) {
                this._dragonBones.animation.play("idle", 0);
            }
        }
    };
    BaseLoadDragonBones.prototype.isLoaded = function () {
        return this._isLoaded;
    };
    BaseLoadDragonBones.prototype.dispose = function () {
        this._isInit = false;
        this._isStop = false;
        if (BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
            BaseLoadDragonBones.cacheDic[this._dragonBonesName]--;
        }
        if (this._dragonBonesName) {
            if (this._isLoaded && !BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
                App.DragonBonesUtil.removeDragonBones(this._dragonBonesName);
            }
        }
        this._dragonBonesName = null;
        if (this._groupName) {
            if (this._isLoaded) {
                ResourceManager.destroyRes(this._groupName);
                this._groupName = null;
            }
        }
        this._dragonBones = null;
        this._isLoaded = false;
        _super.prototype.dispose.call(this);
    };
    BaseLoadDragonBones.cacheDic = {};
    return BaseLoadDragonBones;
}(BaseDisplayObjectContainer));
__reflect(BaseLoadDragonBones.prototype, "BaseLoadDragonBones");

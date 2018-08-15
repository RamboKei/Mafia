/**
 * 显示工具类
 * author dmj
 * date 2017/9/11
 * @class BaseButton
 */
namespace App
{
	export class DisplayUtil
	{
		private static grayFilter: egret.ColorMatrixFilter = null;
		public constructor() 
		{
		}

		public static changeToGray(target: egret.DisplayObject)
		{
			if(this.grayFilter==null)
			{
				var matrix: number[] = [
				0.3086, 0.6094, 0.0820, 0, 0,
				0.3086, 0.6094, 0.0820, 0, 0,
				0.3086, 0.6094, 0.0820, 0, 0,
				0, 0, 0, 1, 0
				];
				this.grayFilter = new egret.ColorMatrixFilter(matrix);
			}
			target.filters = [this.grayFilter];
		}
		public static changeToNormal(target: egret.DisplayObject)
		{
			target.filters = null;
		}

		public static addFactorFunc(target:any):void
		{
			// let targetClass:any = egret.getDefinitionByName(egret.getQualifiedClassName(target))
			Object.defineProperty(target.prototype, "factor", {
				get: function () {
					return 0;  
				},
				set: function (value) {
					this.x = (1 - value) * (1 - value) * this.tweenMoveList[0].x + 2 * value * (1 - value) * this.tweenMoveList[1].x + value * value * this.tweenMoveList[2].x;
					this.y = (1 - value) * (1 - value) * this.tweenMoveList[0].y + 2 * value * (1 - value) * this.tweenMoveList[1].y + value * value * this.tweenMoveList[2].y;
				},
				enumerable: true,
				configurable: true
			});
		}

		/**
		 * 遍历释放显示对象，传入容器
		 * @param target 需要释放的对象 
		 */
		public static destory(target:egret.DisplayObjectContainer):void
		{
			if(target.cacheAsBitmap)
			{
				target.cacheAsBitmap=false;
			}
			egret.Tween.removeTweens(target);
			if(target instanceof ScrollView)
			{
				target.dispose();
			}
			else
			{
				while(target.numChildren>0)
				{
					let firstChild:egret.DisplayObject=target.removeChildAt(0);
					if(firstChild.cacheAsBitmap)
					{
						firstChild.cacheAsBitmap=false;
					}
					egret.Tween.removeTweens(firstChild);
					if(firstChild["texture"])
					{
						firstChild["texture"]=null;
					}
					if(firstChild["bitmapData"])
					{
						firstChild["bitmapData"]=null;
					}
					if(firstChild instanceof BaseLoadBitmap)
					{
						BaseLoadBitmap.release(firstChild);
					}
					else if(firstChild instanceof BaseBitmap)
					{
						BaseBitmap.release(firstChild);
					}
					else if(firstChild instanceof particle.GravityParticleSystem)
					{
						firstChild.stop(true);
					}
					if(firstChild["dispose"])
					{
						firstChild["dispose"]();
					}
					else
					{
						if(firstChild instanceof egret.DisplayObjectContainer)
						{
							DisplayUtil.destory(<egret.DisplayObjectContainer>firstChild);
						}
					}
				}
			}
		}
	}
}
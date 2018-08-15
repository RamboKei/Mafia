//新手引导背景，实现遮罩

class GuideBackground extends BaseDisplayObjectContainer {

    private _bgs:Array<BaseBitmap|BaseShape> = null;
    private _stageWidth:number = 0;
    private _stageHeight:number = 0;
    private _bgalpha:number=0.3;
    private _handle:any;
    private _Function:Function;

    public constructor(){
        super();
       
    }


    public init(f:Function,h:any,bgalpha?:number):void{



        this._bgs = new Array<BaseBitmap|BaseShape>();

        this._handle = h;
        this._Function = f;
        this._bgalpha = bgalpha || 0.3;
        this.touchEnabled = true;
        this._stageWidth = GameConfig.stageWidth;
        this._stageHeight = GameConfig.stageHeigth;
    }

    /**
     * Draw
     * @param deductRec 抠出矩形区域
     */
    public draw(deductRec:any,bgalpha:number = 0):void{
       
        this.removeAllChild();
        for (let k in this._bgs) {
            if (this._bgs[k]) {
                this._bgs[k].dispose();
            }
        }
        this._bgs.length = 0;

        var alphaV = bgalpha;

        if(deductRec.fromBottom){
            deductRec.y = GameConfig.stageHeigth - deductRec.fromBottom;
        }

        var minX:number = Math.max(deductRec.x, 0);
        var minY:number = Math.max(deductRec.y, 0);
        var maxX:number = Math.min(deductRec.x + deductRec.w, this._stageWidth);
        var maxY:number = Math.min(deductRec.y + deductRec.h, this._stageHeight);
        var bondingLine:number = 0.3;
        this.addBg(alphaV,0, 0, this._stageWidth , minY+bondingLine);
        this.addBg(alphaV,0, minY, minX, deductRec.h+bondingLine);
        this.addBg(alphaV,maxX, minY, this._stageWidth-maxX, deductRec.h+bondingLine);
        this.addBg(alphaV,0, maxY, this._stageWidth, this._stageHeight-maxY);

        this.width = this._stageWidth;
        this.height = this._stageHeight;
    }

    public drawScreen(bgalpha:number = 0):void{

        this.removeAllChild();
         for (let k in this._bgs) {
            if (this._bgs[k]) {
                this._bgs[k].dispose();
            }
        }
        this._bgs.length = 0;

        this.addBg(bgalpha,0, 0, this._stageWidth, this._stageHeight);

        this.width = this._stageWidth;
        this.height = this._stageHeight;

    }


    /**
     * 添加一个bg
     * @param $x 初始X
     * @param $y 初始Y
     * @param $w 宽
     * @param $h 高
     */
    private addBg($a:number,$x:number, $y:number, $w:number, $h:number):void{

        var bg:BaseBitmap;
        if(this._bgs.length){
            bg = <BaseBitmap>this._bgs.pop();
        }else{
            bg = BaseBitmap.create("public_9_viewmask");
            bg.addTouchTap(this.clickFunc,this);
        }
         bg.touchEnabled =true;
        bg.alpha = $a;
        bg.x = $x;
        bg.y = $y;
        bg.width = $w;
        bg.height = $h;

        // var bg:BaseShape;
        // if(this._bgs.length){
        //     bg = <BaseShape>this._bgs.pop();
        //     bg.graphics.clear();
        // }else{
        //     bg = new BaseShape();
        //     bg.addTouchTap(this.clickFunc,this,null);
        // }
        // bg.graphics.beginFill(0x000000);
        // bg.graphics.drawRect($x, $y, $w, $h);
        // bg.graphics.endFill();
        // bg.alpha = $a;
       

        this.addChild(bg);
    }


    private clickFunc():void
    {

        this._Function.apply(this._handle);
        //this._Function();
    }

    /**
     * 移除所有对象
     */
    public removeAllChild():void{
        while(this.numChildren){
            var bg:BaseBitmap = <BaseBitmap>this.removeChildAt(0);
            bg.touchEnabled =false;
            this._bgs.push(bg);
        }
    }

    /**
     * 销毁
     */
    public dispose():void{
        this.removeChildren();

        for (var k1 in this._bgs) {
			this._bgs[k1].dispose();
        }
        this._bgs.length = 0;;
        this._Function = null;
        this._handle = null;

        super.dispose();
    }
}

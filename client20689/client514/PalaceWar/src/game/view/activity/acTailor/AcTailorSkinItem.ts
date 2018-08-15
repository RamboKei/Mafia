/**
 * 裁缝 皮肤
 * author yanyuling
 * date 2018/03/01
 * @class AcTailorSkinItem
 */
class AcTailorSkinItem extends BaseDisplayObjectContainer
{
    private _skinId:string
    public constructor()
	{
		super();
	}
	public init(skininfo:any,aid:string,code:string):void
	{
        let diffX={
            ["101"]:20,
            ["102"]:0,
            ["103"]:20,
            ["104"]:0,
            ["105"]:0,
            ["106"]:-40,
            ["107"]:0,
            ["108"]:-30,
            ["109"]:0,
            ["201"]:-10,
            ["202"]:0,
            ["203"]:0,
            ["204"]:0,
            ["205"]:0,
            ["206"]:0,
            ["207"]:0,
            ["208"]:-60,
            ["209"]:-20,
            ["210"]:0,
            ["303"]:-10,
            ["302"]:0,
            ["304"]:0,
            ["305"]:0,
            ["306"]:0,
            ["307"]:-20,
            ["310"]:0,
        }
        this._skinId = "" +skininfo[0];
        let tailorCfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid,code);
        let skin_box = BaseBitmap.create("tailor_box");
        this.addChild(skin_box);

        this.width = skin_box.width+5;
        this.height = skin_box.height;
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);

        let wifeId = skinCfg.wifeId;
        let wifeImg = BaseLoadBitmap.create("wife_skin_"+this._skinId);
        wifeImg.width = 540;
        wifeImg.height = 760;
        wifeImg.anchorOffsetX = wifeImg.width/2+ diffX[wifeId];
        wifeImg.setScale(0.5);

        let mask = BaseBitmap.create("tailor_skinMask");
        let container = new BaseDisplayObjectContainer();
        container.addChild(mask);
        this.addChild(container);

        wifeImg.mask = mask;
        wifeImg.x = skin_box.width/2;
        wifeImg.y = 80;
        container.x = 8;
        container.y = 70;
        this.addChild(wifeImg);

        let wifeNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_"+wifeId),22,TextFieldConst.COLOR_BROWN);
        wifeNameTxt.x = skin_box.x + skin_box.width/2 - wifeNameTxt.width/2;
        wifeNameTxt.y = skin_box.y+15 ;
        this.addChild(wifeNameTxt);

        let skinNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinName"+this._skinId),22,TextFieldConst.COLOR_WARN_GREEN2);
        skinNameTxt.x = skin_box.x + skin_box.width/2 - skinNameTxt.width/2;
        skinNameTxt.y = wifeNameTxt.y+22 ;
        this.addChild(skinNameTxt);

        let resIcon1 = BaseLoadBitmap.create("tailor_icon2");
        // resIcon1.setScale(0.4)
        resIcon1.x = skin_box.x + 40;
        resIcon1.y =  skin_box.y + skin_box.height - 45;
        this.addChild(resIcon1);

        let goldNumTxt = ComponentManager.getTextField(skininfo[1],20);
        goldNumTxt.x = resIcon1.x + 55;
        goldNumTxt.y = resIcon1.y + 8;
        this.addChild(goldNumTxt);
        this.cacheAsBitmap = true;
    }

    public dispose()
    {
        this._skinId = "";
        this.cacheAsBitmap = false;
        super.dispose();
    }

}
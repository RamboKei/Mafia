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
/**
 * 邮件详情
 * author dmj
 * date 2017/10/31
 * @class MailInfoVo
 */
var MailInfoVo = (function (_super) {
    __extends(MailInfoVo, _super);
    function MailInfoVo() {
        var _this = _super.call(this) || this;
        /**收件时间 */
        _this.st = 0;
        /**是否有附件 */
        _this.istouch = 0;
        /**是否读过 */
        _this.isread = 0;
        /**邮件库id */
        _this.mid = 0;
        /**邮件标题 */
        _this.title = "";
        /**邮件奖励 */
        _this.touch = "";
        /**是否领过奖励 */
        _this.hadget = 0;
        /**邮件内容 */
        _this.content = null;
        return _this;
    }
    MailInfoVo.prototype.initData = function (data) {
        if (data.st != null) {
            this.st = Number(data.st);
        }
        if (data.istouch != null) {
            this.istouch = Number(data.istouch);
        }
        if (data.isread != null) {
            this.isread = Number(data.isread);
        }
        if (data.mid != null) {
            this.mid = Number(data.mid);
        }
        if (data.title != null) {
            this.title = String(data.title);
        }
        if (data.touch != null) {
            this.touch = String(data.touch);
        }
        if (data.hadget != null) {
            this.hadget = Number(data.hadget);
        }
        if (data.content != null) {
            this.content = String(data.content);
            if (this.content == "xinshoufuli1") {
                this.content = LanguageManager.getlocal("xinshoufuli1");
            }
            else if (this.content == "xinshoufuli2") {
                this.content = LanguageManager.getlocal("xinshoufuli2");
            }
        }
        if (data.extra != null) {
            if (data.extra.mt != null) {
                this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt);
                this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, data.extra.pa);
            }
        }
    };
    Object.defineProperty(MailInfoVo.prototype, "timeStr", {
        /**接收邮件的时间 */
        get: function () {
            return App.DateUtil.getFormatBySecond(this.st, 6);
        },
        enumerable: true,
        configurable: true
    });
    MailInfoVo.prototype.dispose = function () {
        this.st = 0;
        this.istouch = 0;
        this.isread = 0;
        this.mid = 0;
        this.title = "";
        this.touch = "";
        this.hadget = 0;
        this.content = null;
    };
    return MailInfoVo;
}(BaseVo));
__reflect(MailInfoVo.prototype, "MailInfoVo");

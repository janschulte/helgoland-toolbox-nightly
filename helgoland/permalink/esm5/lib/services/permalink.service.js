/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
PermalinkService = /** @class */ (function () {
    function PermalinkService() {
        var _this = this;
        this.createPermalink = function () {
            return _this.generatePermalink();
        };
    }
    /**
     * @return {?}
     */
    PermalinkService.prototype.createBaseUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = window.location.href;
        if (url.indexOf('?') !== -1) {
            return url.substring(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    };
    return PermalinkService;
}());
/**
 * @abstract
 * @template T
 */
export { PermalinkService };
if (false) {
    /** @type {?} */
    PermalinkService.prototype.createPermalink;
    /**
     * @abstract
     * @return {?}
     */
    PermalinkService.prototype.validatePeramlink = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PermalinkService.prototype.generatePermalink = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wZXJtYWxpbmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQUE7OzsrQkFFMkI7WUFDdkIsTUFBTSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ2pDOzs7OztJQU1TLHdDQUFhOzs7SUFBdkI7O1FBQ0UsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNaO0tBQ0Y7MkJBakJIO0lBa0JDLENBQUE7Ozs7O0FBbEJELDRCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQZXJtYWxpbmtTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgY3JlYXRlUGVybWFsaW5rID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlUGVybWFsaW5rKCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgdmFsaWRhdGVQZXJhbWxpbmsoKTogVDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2VuZXJhdGVQZXJtYWxpbmsoKTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjcmVhdGVCYXNlVXJsKCkge1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIGlmICh1cmwuaW5kZXhPZignPycpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHVybC5zdWJzdHJpbmcoMCwgdXJsLmluZGV4T2YoJz8nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICB9XG59XG4iXX0=
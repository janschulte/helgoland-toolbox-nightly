/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
export class PermalinkService {
    constructor() {
        this.createPermalink = () => {
            return this.generatePermalink();
        };
    }
    /**
     * @return {?}
     */
    createBaseUrl() {
        /** @type {?} */
        const url = window.location.href;
        if (url.indexOf('?') !== -1) {
            return url.substring(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wZXJtYWxpbmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU07OytCQUVxQixHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ2pDOzs7OztJQU1TLGFBQWE7O1FBQ3JCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDWjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgUGVybWFsaW5rU2VydmljZTxUPiB7XG5cbiAgcHVibGljIGNyZWF0ZVBlcm1hbGluayA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVBlcm1hbGluaygpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHZhbGlkYXRlUGVyYW1saW5rKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdlbmVyYXRlUGVybWFsaW5rKCk6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY3JlYXRlQmFzZVVybCgpIHtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBpZiAodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKDAsIHVybC5pbmRleE9mKCc/JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxufVxuIl19
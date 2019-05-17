/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
HttpCache = /** @class */ (function () {
    function HttpCache() {
    }
    return HttpCache;
}());
/**
 * @abstract
 */
export { HttpCache };
if (false) {
    /**
     * Returns a cached response, if any, or null if not present.
     * @abstract
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    HttpCache.prototype.get = function (req, expirationAtMs) { };
    /**
     * Adds or updates the response in the cache.
     * @abstract
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    HttpCache.prototype.put = function (req, resp, expirationAtMs) { };
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
OnGoingHttpCache = /** @class */ (function () {
    function OnGoingHttpCache() {
    }
    return OnGoingHttpCache;
}());
/**
 * @abstract
 */
export { OnGoingHttpCache };
if (false) {
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    OnGoingHttpCache.prototype.has = function (req) { };
    /**
     * @abstract
     * @param {?} req
     * @param {?} request
     * @return {?}
     */
    OnGoingHttpCache.prototype.set = function (req, request) { };
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    OnGoingHttpCache.prototype.observe = function (req) { };
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    OnGoingHttpCache.prototype.clear = function (req) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvIiwic291cmNlcyI6WyJsaWIvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7QUFBQTs7O29CQUhBO0lBYUMsQ0FBQTs7OztBQVZELHFCQVVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVEOzs7QUFBQTs7OzJCQWZBO0lBc0JDLENBQUE7Ozs7QUFQRCw0QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cENhY2hlIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2FjaGVkIHJlc3BvbnNlLCBpZiBhbnksIG9yIG51bGwgaWYgbm90IHByZXNlbnQuXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIGV4cGlyYXRpb25BdE1zPzogbnVtYmVyKTogSHR0cFJlc3BvbnNlPGFueT4gfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBvciB1cGRhdGVzIHRoZSByZXNwb25zZSBpbiB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IHB1dChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3A6IEh0dHBSZXNwb25zZTxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPbkdvaW5nSHR0cENhY2hlIHtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBoYXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcmVxdWVzdDogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4pOiB2b2lkO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBvYnNlcnZlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGVhcihyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiB2b2lkO1xuXG59XG4iXX0=
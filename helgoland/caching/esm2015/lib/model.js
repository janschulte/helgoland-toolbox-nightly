/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class HttpCache {
}
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
export class OnGoingHttpCache {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvIiwic291cmNlcyI6WyJsaWIvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE1BQU07Q0FVTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxNQUFNO0NBT0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBDYWNoZSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNhY2hlZCByZXNwb25zZSwgaWYgYW55LCBvciBudWxsIGlmIG5vdCBwcmVzZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcik6IEh0dHBSZXNwb25zZTxhbnk+IHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgb3IgdXBkYXRlcyB0aGUgcmVzcG9uc2UgaW4gdGhlIGNhY2hlLlxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBwdXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXNwOiBIdHRwUmVzcG9uc2U8YW55PiwgZXhwaXJhdGlvbkF0TXM/OiBudW1iZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT25Hb2luZ0h0dHBDYWNoZSB7XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgaGFzKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW47XG4gICAgcHVibGljIGFic3RyYWN0IHNldChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlcXVlc3Q6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KTogdm9pZDtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb2JzZXJ2ZShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xlYXIocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogdm9pZDtcblxufVxuIl19
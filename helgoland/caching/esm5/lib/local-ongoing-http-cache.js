/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var LocalOngoingHttpCache = /** @class */ (function () {
    function LocalOngoingHttpCache() {
        this.cache = {};
    }
    /**
     * @param {?} req
     * @return {?}
     */
    LocalOngoingHttpCache.prototype.has = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return this.cache[req.urlWithParams] !== undefined;
    };
    /**
     * @param {?} req
     * @param {?} request
     * @return {?}
     */
    LocalOngoingHttpCache.prototype.set = /**
     * @param {?} req
     * @param {?} request
     * @return {?}
     */
    function (req, request) {
        this.cache[req.urlWithParams] = {
            request: request
        };
    };
    /**
     * @param {?} req
     * @return {?}
     */
    LocalOngoingHttpCache.prototype.observe = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return this.cache[req.urlWithParams].request;
    };
    /**
     * @param {?} req
     * @return {?}
     */
    LocalOngoingHttpCache.prototype.clear = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        delete this.cache[req.urlWithParams];
    };
    LocalOngoingHttpCache.decorators = [
        { type: Injectable },
    ];
    return LocalOngoingHttpCache;
}());
export { LocalOngoingHttpCache };
if (false) {
    /** @type {?} */
    LocalOngoingHttpCache.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtb25nb2luZy1odHRwLWNhY2hlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jYWNoaW5nLyIsInNvdXJjZXMiOlsibGliL2xvY2FsLW9uZ29pbmctaHR0cC1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O3FCQU1xQyxFQUFFOzs7Ozs7SUFFdkUsbUNBQUc7Ozs7Y0FBQyxHQUFxQjtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxDQUFDOzs7Ozs7O0lBR2hELG1DQUFHOzs7OztjQUFDLEdBQXFCLEVBQUUsT0FBbUM7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUc7WUFDNUIsT0FBTyxTQUFBO1NBQ1YsQ0FBQzs7Ozs7O0lBR0MsdUNBQU87Ozs7Y0FBQyxHQUFxQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHMUMscUNBQUs7Ozs7Y0FBQyxHQUFxQjtRQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Z0JBcEI1QyxVQUFVOztnQ0FKWDs7U0FLYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbE9uZ29pbmdIdHRwQ2FjaGUge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogeyBba2V5OiBzdHJpbmddOiB7IHJlcXVlc3Q6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IH0gfSA9IHt9O1xuXG4gICAgcHVibGljIGhhcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlcXVlc3Q6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdID0ge1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBvYnNlcnZlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdLnJlcXVlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKHJlcTogSHR0cFJlcXVlc3Q8YW55Pikge1xuICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVtyZXEudXJsV2l0aFBhcmFtc107XG4gICAgfVxufVxuIl19
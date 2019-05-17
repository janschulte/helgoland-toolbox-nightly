/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class LocalOngoingHttpCache {
    constructor() {
        this.cache = {};
    }
    /**
     * @param {?} req
     * @return {?}
     */
    has(req) {
        return this.cache[req.urlWithParams] !== undefined;
    }
    /**
     * @param {?} req
     * @param {?} request
     * @return {?}
     */
    set(req, request) {
        this.cache[req.urlWithParams] = {
            request
        };
    }
    /**
     * @param {?} req
     * @return {?}
     */
    observe(req) {
        return this.cache[req.urlWithParams].request;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    clear(req) {
        delete this.cache[req.urlWithParams];
    }
}
LocalOngoingHttpCache.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    LocalOngoingHttpCache.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtb25nb2luZy1odHRwLWNhY2hlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jYWNoaW5nLyIsInNvdXJjZXMiOlsibGliL2xvY2FsLW9uZ29pbmctaHR0cC1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxNQUFNOztxQkFFMEUsRUFBRTs7Ozs7O0lBRXZFLEdBQUcsQ0FBQyxHQUFxQjtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxDQUFDOzs7Ozs7O0lBR2hELEdBQUcsQ0FBQyxHQUFxQixFQUFFLE9BQW1DO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1lBQzVCLE9BQU87U0FDVixDQUFDOzs7Ozs7SUFHQyxPQUFPLENBQUMsR0FBcUI7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7O0lBRzFDLEtBQUssQ0FBQyxHQUFxQjtRQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7O1lBcEI1QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxPbmdvaW5nSHR0cENhY2hlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IHsgW2tleTogc3RyaW5nXTogeyByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB9IH0gPSB7fTtcblxuICAgIHB1YmxpYyBoYXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSA9IHtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb2JzZXJ2ZShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXS5yZXF1ZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcihyZXE6IEh0dHBSZXF1ZXN0PGFueT4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdO1xuICAgIH1cbn1cbiJdfQ==
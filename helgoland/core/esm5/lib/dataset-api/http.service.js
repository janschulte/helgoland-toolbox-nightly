/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/** @type {?} */
export var HTTP_SERVICE_INTERCEPTORS = new InjectionToken('HTTP_SERVICE_INTERCEPTORS');
/**
 * @record
 */
export function HttpServiceHandler() { }
/** @type {?} */
HttpServiceHandler.prototype.handle;
/**
 * @record
 */
export function HttpServiceInterceptor() { }
/** @type {?} */
HttpServiceInterceptor.prototype.intercept;
var HttpService = /** @class */ (function () {
    function HttpService(httpHandler, interceptors) {
        this.httpHandler = httpHandler;
        /** @type {?} */
        var handler = {
            handle: function (req, options) { return httpHandler.handle(req); }
        };
        if (interceptors) {
            handler = interceptors.reduceRight(function (next, interceptor) { return ({
                handle: function (req, options) { return interceptor.intercept(req, options, next); }
            }); }, handler);
        }
        this.handler = handler;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    HttpService.prototype.client = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HttpClient({
            handle: function (req) { return _this.handler.handle(req, options); }
        });
    };
    HttpService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    HttpService.ctorParameters = function () { return [
        { type: HttpHandler },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HTTP_SERVICE_INTERCEPTORS,] }] }
    ]; };
    /** @nocollapse */ HttpService.ngInjectableDef = i0.defineInjectable({ factory: function HttpService_Factory() { return new HttpService(i0.inject(i1.HttpHandler), i0.inject(HTTP_SERVICE_INTERCEPTORS, 8)); }, token: HttpService, providedIn: "root" });
    return HttpService;
}());
export { HttpService };
if (false) {
    /** @type {?} */
    HttpService.prototype.handler;
    /** @type {?} */
    HttpService.prototype.httpHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGFzZXQtYXBpL2h0dHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxXQUFXLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzdFLFdBQWEseUJBQXlCLEdBQUcsSUFBSSxjQUFjLENBQXlCLDJCQUEyQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBaUI3RyxxQkFDYyxXQUF3QixFQUNhLFlBQTZDO1FBRGxGLGdCQUFXLEdBQVgsV0FBVyxDQUFhOztRQUdsQyxJQUFJLE9BQU8sR0FBdUI7WUFDOUIsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQXZCLENBQXVCO1NBQ3BELENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBQyxJQUFJLEVBQUUsV0FBVyxJQUFLLE9BQUEsQ0FBQztnQkFDdkQsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBekMsQ0FBeUM7YUFDdEUsQ0FBQyxFQUZ3RCxDQUV4RCxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7Ozs7O0lBRU0sNEJBQU07Ozs7Y0FBQyxPQUFnQzs7UUFBaEMsd0JBQUEsRUFBQSxZQUFnQztRQUMxQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUM7WUFDbEIsTUFBTSxFQUFFLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQztTQUNyRCxDQUFDLENBQUM7OztnQkF6QlYsVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFsQitCLFdBQVc7Z0RBeUJsQyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs7O3NCQXpCckQ7O1NBbUJhLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuXG5leHBvcnQgY29uc3QgSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIdHRwU2VydmljZUludGVyY2VwdG9yPignSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUycpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBTZXJ2aWNlSGFuZGxlciB7XG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogUGFydGlhbDxIdHRwUmVxdWVzdE9wdGlvbnM+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogUGFydGlhbDxIdHRwUmVxdWVzdE9wdGlvbnM+LCBuZXh0OiBIdHRwU2VydmljZUhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pjtcbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBIdHRwU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGhhbmRsZXI6IEh0dHBTZXJ2aWNlSGFuZGxlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cEhhbmRsZXI6IEh0dHBIYW5kbGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMpIGludGVyY2VwdG9yczogSHR0cFNlcnZpY2VJbnRlcmNlcHRvcltdIHwgbnVsbFxuICAgICkge1xuICAgICAgICBsZXQgaGFuZGxlcjogSHR0cFNlcnZpY2VIYW5kbGVyID0ge1xuICAgICAgICAgICAgaGFuZGxlOiAocmVxLCBvcHRpb25zKSA9PiBodHRwSGFuZGxlci5oYW5kbGUocmVxKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaW50ZXJjZXB0b3JzKSB7XG4gICAgICAgICAgICBoYW5kbGVyID0gaW50ZXJjZXB0b3JzLnJlZHVjZVJpZ2h0KChuZXh0LCBpbnRlcmNlcHRvcikgPT4gKHtcbiAgICAgICAgICAgICAgICBoYW5kbGU6IChyZXEsIG9wdGlvbnMpID0+IGludGVyY2VwdG9yLmludGVyY2VwdChyZXEsIG9wdGlvbnMsIG5leHQpXG4gICAgICAgICAgICB9KSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpZW50KG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogSHR0cENsaWVudCB7XG4gICAgICAgIHJldHVybiBuZXcgSHR0cENsaWVudCh7XG4gICAgICAgICAgICBoYW5kbGU6IChyZXEpID0+IHRoaXMuaGFuZGxlci5oYW5kbGUocmVxLCBvcHRpb25zKVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
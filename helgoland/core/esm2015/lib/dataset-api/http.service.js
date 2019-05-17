/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/** @type {?} */
export const HTTP_SERVICE_INTERCEPTORS = new InjectionToken('HTTP_SERVICE_INTERCEPTORS');
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
export class HttpService {
    /**
     * @param {?} httpHandler
     * @param {?} interceptors
     */
    constructor(httpHandler, interceptors) {
        this.httpHandler = httpHandler;
        /** @type {?} */
        let handler = {
            handle: (req, options) => httpHandler.handle(req)
        };
        if (interceptors) {
            handler = interceptors.reduceRight((next, interceptor) => ({
                handle: (req, options) => interceptor.intercept(req, options, next)
            }), handler);
        }
        this.handler = handler;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    client(options = {}) {
        return new HttpClient({
            handle: (req) => this.handler.handle(req, options)
        });
    }
}
HttpService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
HttpService.ctorParameters = () => [
    { type: HttpHandler },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HTTP_SERVICE_INTERCEPTORS,] }] }
];
/** @nocollapse */ HttpService.ngInjectableDef = i0.defineInjectable({ factory: function HttpService_Factory() { return new HttpService(i0.inject(i1.HttpHandler), i0.inject(HTTP_SERVICE_INTERCEPTORS, 8)); }, token: HttpService, providedIn: "root" });
if (false) {
    /** @type {?} */
    HttpService.prototype.handler;
    /** @type {?} */
    HttpService.prototype.httpHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGFzZXQtYXBpL2h0dHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxXQUFXLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzdFLGFBQWEseUJBQXlCLEdBQUcsSUFBSSxjQUFjLENBQXlCLDJCQUEyQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhakgsTUFBTTs7Ozs7SUFJRixZQUNjLFdBQXdCLEVBQ2EsWUFBNkM7UUFEbEYsZ0JBQVcsR0FBWCxXQUFXLENBQWE7O1FBR2xDLElBQUksT0FBTyxHQUF1QjtZQUM5QixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNwRCxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQzthQUN0RSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7Ozs7SUFFTSxNQUFNLENBQUMsVUFBOEIsRUFBRTtRQUMxQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUM7WUFDbEIsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO1NBQ3JELENBQUMsQ0FBQzs7OztZQXpCVixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7WUFsQitCLFdBQVc7NENBeUJsQyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5cbmV4cG9ydCBjb25zdCBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTID0gbmV3IEluamVjdGlvblRva2VuPEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3I+KCdIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFNlcnZpY2VIYW5kbGVyIHtcbiAgICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBvcHRpb25zOiBQYXJ0aWFsPEh0dHBSZXF1ZXN0T3B0aW9ucz4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdHRwU2VydmljZUludGVyY2VwdG9yIHtcbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBvcHRpb25zOiBQYXJ0aWFsPEh0dHBSZXF1ZXN0T3B0aW9ucz4sIG5leHQ6IEh0dHBTZXJ2aWNlSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEh0dHBTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgaGFuZGxlcjogSHR0cFNlcnZpY2VIYW5kbGVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBodHRwSGFuZGxlcjogSHR0cEhhbmRsZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUykgaW50ZXJjZXB0b3JzOiBIdHRwU2VydmljZUludGVyY2VwdG9yW10gfCBudWxsXG4gICAgKSB7XG4gICAgICAgIGxldCBoYW5kbGVyOiBIdHRwU2VydmljZUhhbmRsZXIgPSB7XG4gICAgICAgICAgICBoYW5kbGU6IChyZXEsIG9wdGlvbnMpID0+IGh0dHBIYW5kbGVyLmhhbmRsZShyZXEpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbnRlcmNlcHRvcnMpIHtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBpbnRlcmNlcHRvcnMucmVkdWNlUmlnaHQoKG5leHQsIGludGVyY2VwdG9yKSA9PiAoe1xuICAgICAgICAgICAgICAgIGhhbmRsZTogKHJlcSwgb3B0aW9ucykgPT4gaW50ZXJjZXB0b3IuaW50ZXJjZXB0KHJlcSwgb3B0aW9ucywgbmV4dClcbiAgICAgICAgICAgIH0pLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGllbnQob3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBIdHRwQ2xpZW50IHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwQ2xpZW50KHtcbiAgICAgICAgICAgIGhhbmRsZTogKHJlcSkgPT4gdGhpcy5oYW5kbGVyLmhhbmRsZShyZXEsIG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
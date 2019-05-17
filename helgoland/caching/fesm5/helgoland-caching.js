import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { __extends } from 'tslib';
import { HTTP_SERVICE_INTERCEPTORS } from '@helgoland/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
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
var  /**
 * @abstract
 */
OnGoingHttpCache = /** @class */ (function () {
    function OnGoingHttpCache() {
    }
    return OnGoingHttpCache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CachingInterceptor = /** @class */ (function () {
    function CachingInterceptor(cache, ongoingCache) {
        this.cache = cache;
        this.ongoingCache = ongoingCache;
    }
    /**
     * @param {?} req
     * @param {?} metadata
     * @param {?} next
     * @return {?}
     */
    CachingInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} metadata
     * @param {?} next
     * @return {?}
     */
    function (req, metadata, next) {
        var _this = this;
        // Before doing anything, it's important to only cache GET requests.
        // Skip this interceptor if the request method isn't GET.
        if (req.method !== 'GET') {
            return next.handle(req, metadata);
        }
        if (metadata.forceUpdate) {
            return next.handle(req, metadata);
        }
        /** @type {?} */
        var cachedResponse = this.cache.get(req, metadata.expirationAtMs);
        if (cachedResponse) {
            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            return of(cachedResponse);
        }
        // check if the same request is still in the pipe
        if (this.ongoingCache.has(req)) {
            return this.ongoingCache.observe(req);
        }
        else {
            // No cached response exists. Go to the network, and cache
            // the response when it arrives.
            return new Observable(function (observer) {
                /** @type {?} */
                var shared = next.handle(req, metadata).pipe(share());
                shared.subscribe(function (res) {
                    if (res instanceof HttpResponse) {
                        _this.cache.put(req, res, metadata.expirationAtMs);
                        _this.ongoingCache.clear(req);
                        observer.next(res);
                        observer.complete();
                    }
                }, function (error) {
                    observer.error(error);
                    observer.complete();
                });
                _this.ongoingCache.set(req, shared);
            });
        }
    };
    CachingInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CachingInterceptor.ctorParameters = function () { return [
        { type: HttpCache },
        { type: OnGoingHttpCache }
    ]; };
    return CachingInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LocalHttpCache = /** @class */ (function (_super) {
    __extends(LocalHttpCache, _super);
    function LocalHttpCache() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = {};
        return _this;
    }
    /**
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    LocalHttpCache.prototype.get = /**
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    function (req, expirationAtMs) {
        /** @type {?} */
        var key = req.urlWithParams;
        if (this.cache[key]) {
            /** @type {?} */
            var currentTime = new Date().getTime();
            if (isNaN(this.cache[key].expirationAtMs)) {
                this.cache[key].expirationAtMs = expirationAtMs;
                return this.cache[key].response;
            }
            else {
                if (this.cache[key].expirationAtMs >= currentTime) {
                    if (this.cache[key].expirationAtMs > expirationAtMs) {
                        this.cache[key].expirationAtMs = expirationAtMs;
                    }
                    return this.cache[key].response;
                }
                else {
                    delete this.cache[key];
                }
            }
        }
        return null;
    };
    /**
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    LocalHttpCache.prototype.put = /**
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    function (req, resp, expirationAtMs) {
        this.cache[req.urlWithParams] = {
            expirationAtMs: expirationAtMs || new Date().getTime() + 30000,
            response: resp
        };
    };
    LocalHttpCache.decorators = [
        { type: Injectable },
    ];
    return LocalHttpCache;
}(HttpCache));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandCachingModule = /** @class */ (function () {
    function HelgolandCachingModule() {
    }
    HelgolandCachingModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: [
                        {
                            provide: HttpCache,
                            useClass: LocalHttpCache
                        },
                        {
                            provide: HTTP_SERVICE_INTERCEPTORS,
                            useClass: CachingInterceptor,
                            multi: true
                        },
                        {
                            provide: OnGoingHttpCache,
                            useClass: LocalOngoingHttpCache
                        },
                    ]
                },] },
    ];
    return HelgolandCachingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandCachingModule, CachingInterceptor, LocalHttpCache, LocalOngoingHttpCache, HttpCache, OnGoingHttpCache };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNhY2hpbmcuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvbW9kZWwudHMiLCJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvY2FjaGUtaW50ZXJjZXB0b3IudHMiLCJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvbG9jYWwtaHR0cC1jYWNoZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jYWNoaW5nL2xpYi9sb2NhbC1vbmdvaW5nLWh0dHAtY2FjaGUudHMiLCJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvY2FjaGluZy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdHRwQ2FjaGUge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjYWNoZWQgcmVzcG9uc2UsIGlmIGFueSwgb3IgbnVsbCBpZiBub3QgcHJlc2VudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgZXhwaXJhdGlvbkF0TXM/OiBudW1iZXIpOiBIdHRwUmVzcG9uc2U8YW55PiB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG9yIHVwZGF0ZXMgdGhlIHJlc3BvbnNlIGluIHRoZSBjYWNoZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgcHV0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcDogSHR0cFJlc3BvbnNlPGFueT4sIGV4cGlyYXRpb25BdE1zPzogbnVtYmVyKTogdm9pZDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9uR29pbmdIdHRwQ2FjaGUge1xuXG4gICAgcHVibGljIGFic3RyYWN0IGhhcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pik6IHZvaWQ7XG4gICAgcHVibGljIGFic3RyYWN0IG9ic2VydmUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG4gICAgcHVibGljIGFic3RyYWN0IGNsZWFyKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IEh0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucywgSHR0cFNlcnZpY2VIYW5kbGVyLCBIdHRwU2VydmljZUludGVyY2VwdG9yIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZSwgT25Hb2luZ0h0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGluZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBjYWNoZTogSHR0cENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgb25nb2luZ0NhY2hlOiBPbkdvaW5nSHR0cENhY2hlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBpbnRlcmNlcHQoXG4gICAgICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbWV0YWRhdGE6IEh0dHBSZXF1ZXN0T3B0aW9ucywgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyXG4gICAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgICAgIC8vIEJlZm9yZSBkb2luZyBhbnl0aGluZywgaXQncyBpbXBvcnRhbnQgdG8gb25seSBjYWNoZSBHRVQgcmVxdWVzdHMuXG4gICAgICAgIC8vIFNraXAgdGhpcyBpbnRlcmNlcHRvciBpZiB0aGUgcmVxdWVzdCBtZXRob2QgaXNuJ3QgR0VULlxuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRhZGF0YS5mb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QsIGNoZWNrIHRoZSBjYWNoZSB0byBzZWUgaWYgdGhpcyByZXF1ZXN0IGV4aXN0cy5cbiAgICAgICAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSB0aGlzLmNhY2hlLmdldChyZXEsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBBIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIFNlcnZlIGl0IGluc3RlYWQgb2YgZm9yd2FyZGluZ1xuICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgICAgICAgIHJldHVybiBvZihjYWNoZWRSZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2FtZSByZXF1ZXN0IGlzIHN0aWxsIGluIHRoZSBwaXBlXG4gICAgICAgIGlmICh0aGlzLm9uZ29pbmdDYWNoZS5oYXMocmVxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25nb2luZ0NhY2hlLm9ic2VydmUocmVxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIEdvIHRvIHRoZSBuZXR3b3JrLCBhbmQgY2FjaGVcbiAgICAgICAgICAgIC8vIHRoZSByZXNwb25zZSB3aGVuIGl0IGFycml2ZXMuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KChvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcmVkID0gbmV4dC5oYW5kbGUocmVxLCBtZXRhZGF0YSkucGlwZShzaGFyZSgpKTtcbiAgICAgICAgICAgICAgICBzaGFyZWQuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5wdXQocmVxLCByZXMsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25nb2luZ0NhY2hlLmNsZWFyKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uZ29pbmdDYWNoZS5zZXQocmVxLCBzaGFyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwQ2FjaGUgfSBmcm9tICcuL21vZGVsJztcblxuaW50ZXJmYWNlIENhY2hlZEl0ZW0ge1xuICAgIGV4cGlyYXRpb25BdE1zOiBudW1iZXI7XG4gICAgcmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+O1xufVxuXG5pbnRlcmZhY2UgQ2FjaGUge1xuICAgIFtpZDogc3RyaW5nXTogQ2FjaGVkSXRlbTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsSHR0cENhY2hlIGV4dGVuZHMgSHR0cENhY2hlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IENhY2hlID0ge307XG5cbiAgICBwdWJsaWMgZ2V0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgZXhwaXJhdGlvbkF0TXM/OiBudW1iZXIpOiBIdHRwUmVzcG9uc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHJlcS51cmxXaXRoUGFyYW1zO1xuICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMgPSBleHBpcmF0aW9uQXRNcztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldLnJlc3BvbnNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zID49IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMgPiBleHBpcmF0aW9uQXRNcykgeyB0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMgPSBleHBpcmF0aW9uQXRNczsgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXNwOiBIdHRwUmVzcG9uc2U8YW55PiwgZXhwaXJhdGlvbkF0TXM/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jYWNoZVtyZXEudXJsV2l0aFBhcmFtc10gPSB7XG4gICAgICAgICAgICBleHBpcmF0aW9uQXRNczogZXhwaXJhdGlvbkF0TXMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzMDAwMCxcbiAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxPbmdvaW5nSHR0cENhY2hlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IHsgW2tleTogc3RyaW5nXTogeyByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB9IH0gPSB7fTtcblxuICAgIHB1YmxpYyBoYXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSA9IHtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb2JzZXJ2ZShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXS5yZXF1ZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcihyZXE6IEh0dHBSZXF1ZXN0PGFueT4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgQ2FjaGluZ0ludGVyY2VwdG9yIH0gZnJvbSAnLi9jYWNoZS1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBMb2NhbEh0dHBDYWNoZSB9IGZyb20gJy4vbG9jYWwtaHR0cC1jYWNoZSc7XG5pbXBvcnQgeyBMb2NhbE9uZ29pbmdIdHRwQ2FjaGUgfSBmcm9tICcuL2xvY2FsLW9uZ29pbmctaHR0cC1jYWNoZSc7XG5pbXBvcnQgeyBIdHRwQ2FjaGUsIE9uR29pbmdIdHRwQ2FjaGUgfSBmcm9tICcuL21vZGVsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwQ2FjaGUsXG4gICAgICB1c2VDbGFzczogTG9jYWxIdHRwQ2FjaGVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogQ2FjaGluZ0ludGVyY2VwdG9yLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9uR29pbmdIdHRwQ2FjaGUsXG4gICAgICB1c2VDbGFzczogTG9jYWxPbmdvaW5nSHR0cENhY2hlXG4gICAgfSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRDYWNoaW5nTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7QUFBQTs7O29CQUhBO0lBYUMsQ0FBQTs7OztBQUVEOzs7QUFBQTs7OzJCQWZBO0lBc0JDOzs7Ozs7QUN0QkQ7SUFVSSw0QkFDYyxLQUFnQixFQUNoQixZQUE4QjtRQUQ5QixVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtLQUN2Qzs7Ozs7OztJQUVFLHNDQUFTOzs7Ozs7Y0FDWixHQUFxQixFQUFFLFFBQTRCLEVBQUUsSUFBd0I7Ozs7UUFLN0UsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckM7O1FBR0QsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFD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
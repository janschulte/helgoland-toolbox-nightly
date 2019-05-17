(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@helgoland/core')) :
    typeof define === 'function' && define.amd ? define('@helgoland/caching', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators', '@helgoland/core'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.caching = {}),global.ng.common.http,global.ng.core,global.rxjs,global.rxjs.operators,null));
}(this, (function (exports,http,core,rxjs,operators,core$1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ HttpCache = (function () {
        function HttpCache() {
        }
        return HttpCache;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ OnGoingHttpCache = (function () {
        function OnGoingHttpCache() {
        }
        return OnGoingHttpCache;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CachingInterceptor = (function () {
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
                    return rxjs.of(cachedResponse);
                }
                // check if the same request is still in the pipe
                if (this.ongoingCache.has(req)) {
                    return this.ongoingCache.observe(req);
                }
                else {
                    // No cached response exists. Go to the network, and cache
                    // the response when it arrives.
                    return new rxjs.Observable(function (observer) {
                        /** @type {?} */
                        var shared = next.handle(req, metadata).pipe(operators.share());
                        shared.subscribe(function (res) {
                            if (res instanceof http.HttpResponse) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        CachingInterceptor.ctorParameters = function () {
            return [
                { type: HttpCache },
                { type: OnGoingHttpCache }
            ];
        };
        return CachingInterceptor;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LocalHttpCache = (function (_super) {
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
            { type: core.Injectable },
        ];
        return LocalHttpCache;
    }(HttpCache));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LocalOngoingHttpCache = (function () {
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
            { type: core.Injectable },
        ];
        return LocalOngoingHttpCache;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandCachingModule = (function () {
        function HelgolandCachingModule() {
        }
        HelgolandCachingModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [],
                        exports: [],
                        providers: [
                            {
                                provide: HttpCache,
                                useClass: LocalHttpCache
                            },
                            {
                                provide: core$1.HTTP_SERVICE_INTERCEPTORS,
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

    exports.HelgolandCachingModule = HelgolandCachingModule;
    exports.CachingInterceptor = CachingInterceptor;
    exports.LocalHttpCache = LocalHttpCache;
    exports.LocalOngoingHttpCache = LocalOngoingHttpCache;
    exports.HttpCache = HttpCache;
    exports.OnGoingHttpCache = OnGoingHttpCache;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNhY2hpbmcudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvbGliL21vZGVsLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvbGliL2NhY2hlLWludGVyY2VwdG9yLnRzIixudWxsLCJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvbG9jYWwtaHR0cC1jYWNoZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jYWNoaW5nL2xpYi9sb2NhbC1vbmdvaW5nLWh0dHAtY2FjaGUudHMiLCJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy9saWIvY2FjaGluZy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdHRwQ2FjaGUge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjYWNoZWQgcmVzcG9uc2UsIGlmIGFueSwgb3IgbnVsbCBpZiBub3QgcHJlc2VudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgZXhwaXJhdGlvbkF0TXM/OiBudW1iZXIpOiBIdHRwUmVzcG9uc2U8YW55PiB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG9yIHVwZGF0ZXMgdGhlIHJlc3BvbnNlIGluIHRoZSBjYWNoZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgcHV0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcDogSHR0cFJlc3BvbnNlPGFueT4sIGV4cGlyYXRpb25BdE1zPzogbnVtYmVyKTogdm9pZDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9uR29pbmdIdHRwQ2FjaGUge1xuXG4gICAgcHVibGljIGFic3RyYWN0IGhhcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCByZXF1ZXN0OiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pik6IHZvaWQ7XG4gICAgcHVibGljIGFic3RyYWN0IG9ic2VydmUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG4gICAgcHVibGljIGFic3RyYWN0IGNsZWFyKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IEh0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucywgSHR0cFNlcnZpY2VIYW5kbGVyLCBIdHRwU2VydmljZUludGVyY2VwdG9yIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZSwgT25Hb2luZ0h0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGluZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBjYWNoZTogSHR0cENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgb25nb2luZ0NhY2hlOiBPbkdvaW5nSHR0cENhY2hlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBpbnRlcmNlcHQoXG4gICAgICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbWV0YWRhdGE6IEh0dHBSZXF1ZXN0T3B0aW9ucywgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyXG4gICAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgICAgIC8vIEJlZm9yZSBkb2luZyBhbnl0aGluZywgaXQncyBpbXBvcnRhbnQgdG8gb25seSBjYWNoZSBHRVQgcmVxdWVzdHMuXG4gICAgICAgIC8vIFNraXAgdGhpcyBpbnRlcmNlcHRvciBpZiB0aGUgcmVxdWVzdCBtZXRob2QgaXNuJ3QgR0VULlxuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRhZGF0YS5mb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QsIGNoZWNrIHRoZSBjYWNoZSB0byBzZWUgaWYgdGhpcyByZXF1ZXN0IGV4aXN0cy5cbiAgICAgICAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSB0aGlzLmNhY2hlLmdldChyZXEsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBBIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIFNlcnZlIGl0IGluc3RlYWQgb2YgZm9yd2FyZGluZ1xuICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgICAgICAgIHJldHVybiBvZihjYWNoZWRSZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2FtZSByZXF1ZXN0IGlzIHN0aWxsIGluIHRoZSBwaXBlXG4gICAgICAgIGlmICh0aGlzLm9uZ29pbmdDYWNoZS5oYXMocmVxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25nb2luZ0NhY2hlLm9ic2VydmUocmVxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIEdvIHRvIHRoZSBuZXR3b3JrLCBhbmQgY2FjaGVcbiAgICAgICAgICAgIC8vIHRoZSByZXNwb25zZSB3aGVuIGl0IGFycml2ZXMuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KChvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcmVkID0gbmV4dC5oYW5kbGUocmVxLCBtZXRhZGF0YSkucGlwZShzaGFyZSgpKTtcbiAgICAgICAgICAgICAgICBzaGFyZWQuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5wdXQocmVxLCByZXMsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25nb2luZ0NhY2hlLmNsZWFyKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uZ29pbmdDYWNoZS5zZXQocmVxLCBzaGFyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5pbnRlcmZhY2UgQ2FjaGVkSXRlbSB7XG4gICAgZXhwaXJhdGlvbkF0TXM6IG51bWJlcjtcbiAgICByZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT47XG59XG5cbmludGVyZmFjZSBDYWNoZSB7XG4gICAgW2lkOiBzdHJpbmddOiBDYWNoZWRJdGVtO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxIdHRwQ2FjaGUgZXh0ZW5kcyBIdHRwQ2FjaGUge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogQ2FjaGUgPSB7fTtcblxuICAgIHB1YmxpYyBnZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcik6IEh0dHBSZXNwb25zZTxhbnk+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gcmVxLnVybFdpdGhQYXJhbXM7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA9IGV4cGlyYXRpb25BdE1zO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0ucmVzcG9uc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMgPj0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA+IGV4cGlyYXRpb25BdE1zKSB7IHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA9IGV4cGlyYXRpb25BdE1zOyB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0ucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHB1dChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3A6IEh0dHBSZXNwb25zZTxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcikge1xuICAgICAgICB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSA9IHtcbiAgICAgICAgICAgIGV4cGlyYXRpb25BdE1zOiBleHBpcmF0aW9uQXRNcyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDMwMDAwLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbE9uZ29pbmdIdHRwQ2FjaGUge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogeyBba2V5OiBzdHJpbmddOiB7IHJlcXVlc3Q6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IH0gfSA9IHt9O1xuXG4gICAgcHVibGljIGhhcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlcXVlc3Q6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdID0ge1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBvYnNlcnZlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdLnJlcXVlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKHJlcTogSHR0cFJlcXVlc3Q8YW55Pikge1xuICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVtyZXEudXJsV2l0aFBhcmFtc107XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBDYWNoaW5nSW50ZXJjZXB0b3IgfSBmcm9tICcuL2NhY2hlLWludGVyY2VwdG9yJztcbmltcG9ydCB7IExvY2FsSHR0cENhY2hlIH0gZnJvbSAnLi9sb2NhbC1odHRwLWNhY2hlJztcbmltcG9ydCB7IExvY2FsT25nb2luZ0h0dHBDYWNoZSB9IGZyb20gJy4vbG9jYWwtb25nb2luZy1odHRwLWNhY2hlJztcbmltcG9ydCB7IEh0dHBDYWNoZSwgT25Hb2luZ0h0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEh0dHBDYWNoZSxcbiAgICAgIHVzZUNsYXNzOiBMb2NhbEh0dHBDYWNoZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyxcbiAgICAgIHVzZUNsYXNzOiBDYWNoaW5nSW50ZXJjZXB0b3IsXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogT25Hb2luZ0h0dHBDYWNoZSxcbiAgICAgIHVzZUNsYXNzOiBMb2NhbE9uZ29pbmdIdHRwQ2FjaGVcbiAgICB9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZENhY2hpbmdNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsib2YiLCJPYnNlcnZhYmxlIiwic2hhcmUiLCJIdHRwUmVzcG9uc2UiLCJJbmplY3RhYmxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJOZ01vZHVsZSIsIkhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTs7UUFBQTs7O3dCQUhBO1FBYUMsQ0FBQTs7OztBQUVEOztRQUFBOzs7K0JBZkE7UUFzQkM7Ozs7OztBQ3RCRDtRQVVJLDRCQUNjLEtBQWdCLEVBQ2hCLFlBQThCO1lBRDlCLFVBQUssR0FBTCxLQUFLLENBQVc7WUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWtCO1NBQ3ZDOzs7Ozs7O1FBRUUsc0NBQVM7Ozs7OztzQkFDWixHQUFxQixFQUFFLFFBQTRCLEVBQUUsSUFBd0I7Ozs7Z0JBSzdFLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7b0JBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2dCQUVELElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtvQkFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDckM7O2dCQUdELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BFLElBQUksY0FBYyxFQUFFOzs7b0JBR2hCLE9BQU9BLE9BQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDN0I7O2dCQUdELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pDO3FCQUFNOzs7b0JBR0gsT0FBTyxJQUFJQyxlQUFVLENBQWlCLFVBQUMsUUFBa0M7O3dCQUNyRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUNDLGVBQUssRUFBRSxDQUFDLENBQUM7d0JBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHOzRCQUNqQixJQUFJLEdBQUcsWUFBWUMsaUJBQVksRUFBRTtnQ0FDN0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ2xELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQ3ZCO3lCQUNKLEVBQUUsVUFBQyxLQUFLOzRCQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDdkIsQ0FBQyxDQUFDO3dCQUNILEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDdEMsQ0FBQyxDQUFDO2lCQUNOOzs7b0JBbERSQyxlQUFVOzs7Ozt3QkFGRixTQUFTO3dCQUFFLGdCQUFnQjs7O2lDQU5wQzs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7OztRQ1ptQ0Msa0NBQVM7OzswQkFFbEIsRUFBRTs7Ozs7Ozs7UUFFbEIsNEJBQUc7Ozs7O3NCQUFDLEdBQXFCLEVBQUUsY0FBdUI7O2dCQUNyRCxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7O29CQUNqQixJQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN6QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO3dCQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7d0JBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7cUJBQ25DO3lCQUFNO3dCQUNILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLElBQUksV0FBVyxFQUFFOzRCQUMvQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsRUFBRTtnQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7NkJBQUU7NEJBQ3pHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7eUJBQ25DOzZCQUFNOzRCQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDMUI7cUJBQ0o7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7Ozs7Ozs7O1FBR1QsNEJBQUc7Ozs7OztzQkFBQyxHQUFxQixFQUFFLElBQXVCLEVBQUUsY0FBdUI7Z0JBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHO29CQUM1QixjQUFjLEVBQUUsY0FBYyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSztvQkFDOUQsUUFBUSxFQUFFLElBQUk7aUJBQ2pCLENBQUM7OztvQkE1QlRELGVBQVU7OzZCQWRYO01BZW9DLFNBQVM7Ozs7OztBQ2Q3Qzs7eUJBTWdGLEVBQUU7Ozs7OztRQUV2RSxtQ0FBRzs7OztzQkFBQyxHQUFxQjtnQkFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLENBQUM7Ozs7Ozs7UUFHaEQsbUNBQUc7Ozs7O3NCQUFDLEdBQXFCLEVBQUUsT0FBbUM7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHO29CQUM1QixPQUFPLFNBQUE7aUJBQ1YsQ0FBQzs7Ozs7O1FBR0MsdUNBQU87Ozs7c0JBQUMsR0FBcUI7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDOzs7Ozs7UUFHMUMscUNBQUs7Ozs7c0JBQUMsR0FBcUI7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7OztvQkFwQjVDQSxlQUFVOztvQ0FKWDs7Ozs7OztBQ0FBOzs7O29CQVFDRSxhQUFRLFNBQUM7d0JBQ1IsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRSxFQUFFO3dCQUNYLE9BQU8sRUFBRSxFQUFFO3dCQUNYLFNBQVMsRUFBRTs0QkFDVDtnQ0FDRSxPQUFPLEVBQUUsU0FBUztnQ0FDbEIsUUFBUSxFQUFFLGNBQWM7NkJBQ3pCOzRCQUNEO2dDQUNFLE9BQU8sRUFBRUMsZ0NBQXlCO2dDQUNsQyxRQUFRLEVBQUUsa0JBQWtCO2dDQUM1QixLQUFLLEVBQUUsSUFBSTs2QkFDWjs0QkFDRDtnQ0FDRSxPQUFPLEVBQUUsZ0JBQWdCO2dDQUN6QixRQUFRLEVBQUUscUJBQXFCOzZCQUNoQzt5QkFDRjtxQkFDRjs7cUNBM0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
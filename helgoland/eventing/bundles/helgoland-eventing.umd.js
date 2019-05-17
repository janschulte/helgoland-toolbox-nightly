(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@helgoland/core'), require('@angular/common/http'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@helgoland/eventing', ['exports', '@helgoland/core', '@angular/common/http', '@angular/core'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.eventing = {}),null,global.ng.common.http,global.ng.core));
}(this, (function (exports,core,http,core$1) { 'use strict';

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
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ EventingApiService = (function (_super) {
        __extends(EventingApiService, _super);
        function EventingApiService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventingApiService;
    }(core.ApiInterface));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var EventingImplApiInterface = (function (_super) {
        __extends(EventingImplApiInterface, _super);
        function EventingImplApiInterface(httpService) {
            var _this = _super.call(this) || this;
            _this.httpService = httpService;
            return _this;
        }
        /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getEvents = /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
            function (apiUrl, filterParameter, options) {
                if (filterParameter === void 0) {
                    filterParameter = {};
                }
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'events');
                /** @type {?} */
                var httpParams = this.prepareFilterParams(filterParameter);
                httpParams = this.addParameterFilter(filterParameter, 'latest', httpParams);
                httpParams = this.addParameterFilter(filterParameter, 'subscriptions', httpParams);
                httpParams = this.addTimespan(filterParameter.timespan, httpParams);
                return this.requestApi(url, httpParams, options);
            };
        /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getEvent = /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
            function (id, apiUrl, options) {
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'events', id);
                return this.requestApi(url, null, options);
            };
        /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getSubscriptions = /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
            function (apiUrl, filterParameter, options) {
                if (filterParameter === void 0) {
                    filterParameter = {};
                }
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'subscriptions');
                /** @type {?} */
                var httpParams = this.prepareFilterParams(filterParameter);
                return this.requestApi(url, httpParams, options);
            };
        /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getSubscription = /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
            function (id, apiUrl, options) {
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'subscriptions', id);
                return this.requestApi(url, null, options);
            };
        /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getPublications = /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
            function (apiUrl, filterParameter, options) {
                if (filterParameter === void 0) {
                    filterParameter = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'publications');
                /** @type {?} */
                var httpParams = this.prepareFilterParams(filterParameter);
                httpParams = this.addParameterFilter(filterParameter, 'feature', httpParams);
                return this.requestApi(url, httpParams, options);
            };
        /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getPublication = /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
            function (id, apiUrl, options) {
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'publications', id);
                return this.requestApi(url, null, options);
            };
        /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getNotifications = /**
         * @param {?} apiUrl
         * @param {?=} filterParameter
         * @param {?=} options
         * @return {?}
         */
            function (apiUrl, filterParameter, options) {
                if (filterParameter === void 0) {
                    filterParameter = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'notifications');
                /** @type {?} */
                var httpParams = this.prepareFilterParams(filterParameter);
                httpParams = this.addParameterFilter(filterParameter, 'publications', httpParams);
                return this.requestApi(url, httpParams, options);
            };
        /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.getNotification = /**
         * @param {?} id
         * @param {?} apiUrl
         * @param {?=} options
         * @return {?}
         */
            function (id, apiUrl, options) {
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'notifications', id);
                return this.requestApi(url, null, options);
            };
        /**
         * @template T
         * @param {?} url
         * @param {?=} params
         * @param {?=} options
         * @return {?}
         */
        EventingImplApiInterface.prototype.requestApi = /**
         * @template T
         * @param {?} url
         * @param {?=} params
         * @param {?=} options
         * @return {?}
         */
            function (url, params, options) {
                if (params === void 0) {
                    params = new http.HttpParams();
                }
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var headers = this.createBasicAuthHeader(options.basicAuthToken);
                return this.httpService.client(options).get(url, { params: params, headers: headers });
            };
        /**
         * @param {?} params
         * @return {?}
         */
        EventingImplApiInterface.prototype.prepareFilterParams = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var httpParams = new http.HttpParams({ encoder: new core.UriParameterCoder() });
                httpParams = this.addParameterFilter(params, 'expanded', httpParams);
                httpParams = this.addParameterFilter(params, 'offset', httpParams);
                httpParams = this.addParameterFilter(params, 'limit', httpParams);
                return httpParams;
            };
        /**
         * @param {?} timespan
         * @param {?} httpParams
         * @return {?}
         */
        EventingImplApiInterface.prototype.addTimespan = /**
         * @param {?} timespan
         * @param {?} httpParams
         * @return {?}
         */
            function (timespan, httpParams) {
                if (timespan !== undefined) {
                    return httpParams.set('timespan', this.createRequestTimespan(timespan));
                }
                return httpParams;
            };
        /**
         * @param {?} params
         * @param {?} key
         * @param {?} httpParams
         * @return {?}
         */
        EventingImplApiInterface.prototype.addParameterFilter = /**
         * @param {?} params
         * @param {?} key
         * @param {?} httpParams
         * @return {?}
         */
            function (params, key, httpParams) {
                if (params && params[key] !== undefined) {
                    if (params[key] instanceof Array) {
                        return httpParams.set(key, params[key].join(','));
                    }
                    return httpParams.set(key, params[key]);
                }
                return httpParams;
            };
        EventingImplApiInterface.decorators = [
            { type: core$1.Injectable },
        ];
        /** @nocollapse */
        EventingImplApiInterface.ctorParameters = function () {
            return [
                { type: core.HttpService }
            ];
        };
        return EventingImplApiInterface;
    }(EventingApiService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Provides standard eventing api service implemention
     */
    var HelgolandEventingModule = (function () {
        function HelgolandEventingModule() {
        }
        HelgolandEventingModule.decorators = [
            { type: core$1.NgModule, args: [{
                        providers: [{
                                provide: EventingApiService,
                                useClass: EventingImplApiInterface
                            }]
                    },] },
        ];
        return HelgolandEventingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.EventingApiService = EventingApiService;
    exports.EventingImplApiInterface = EventingImplApiInterface;
    exports.HelgolandEventingModule = HelgolandEventingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWV2ZW50aW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nL2xpYi9ldmVudGluZy1hcGkuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9ldmVudGluZy9saWIvZXZlbnRpbmctaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZXZlbnRpbmcvbGliL2V2ZW50aW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEFwaUludGVyZmFjZSwgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXZlbnRGaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvZXZlbnRzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9zdWJzY3JpcHRpb25zJztcbmltcG9ydCB7IEV2ZW50LCBFdmVudFJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL2V2ZW50cyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3N1YnNjcmlwdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvcHVibGljYXRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uUmVzdWx0cywgUHVibGljYXRpb24gfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3Qvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25SZXN1bHRzLCBOb3RpZmljYXRpb24gfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL25vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXZlbnRpbmdBcGlTZXJ2aWNlIGV4dGVuZHMgQXBpSW50ZXJmYWNlIHtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0RXZlbnRzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBFdmVudEZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RXZlbnRSZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0RXZlbnQoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEV2ZW50PjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0U3Vic2NyaXB0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogU3Vic2NyaXB0aW9uRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb25SZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0U3Vic2NyaXB0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb24+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRQdWJsaWNhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFB1YmxpY2F0aW9uRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvblJlc3VsdHM+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRQdWJsaWNhdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHVibGljYXRpb24+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXROb3RpZmljYXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBOb3RpZmljYXRpb25GaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvblJlc3VsdHM+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXROb3RpZmljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbj47XG5cbn1cbiIsImltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMsIEh0dHBTZXJ2aWNlLCBUaW1lc3BhbiwgVXJpUGFyYW1ldGVyQ29kZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFdmVudGluZ0FwaVNlcnZpY2UgfSBmcm9tICcuL2V2ZW50aW5nLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50aW5nRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudEZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ldmVudHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvcHVibGljYXRpb25zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9zdWJzY3JpcHRpb25zJztcbmltcG9ydCB7IEV2ZW50LCBFdmVudFJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL2V2ZW50cyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb24sIFB1YmxpY2F0aW9uUmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2UvcHVibGljYXRpb25zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uUmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2Uvc3Vic2NyaXB0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudGluZ0ltcGxBcGlJbnRlcmZhY2UgZXh0ZW5kcyBFdmVudGluZ0FwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlXG4gICAgKSB7IHN1cGVyKCk7IH1cblxuICAgIHB1YmxpYyBnZXRFdmVudHMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogRXZlbnRGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEV2ZW50UmVzdWx0cz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZXZlbnRzJyk7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gdGhpcy5wcmVwYXJlRmlsdGVyUGFyYW1zKGZpbHRlclBhcmFtZXRlcik7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdsYXRlc3QnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKGZpbHRlclBhcmFtZXRlciwgJ3N1YnNjcmlwdGlvbnMnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkVGltZXNwYW4oZmlsdGVyUGFyYW1ldGVyLnRpbWVzcGFuLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxFdmVudFJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV2ZW50KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2V2ZW50cycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxFdmVudD4odXJsLCBudWxsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3Vic2NyaXB0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBTdWJzY3JpcHRpb25GaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvblJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N1YnNjcmlwdGlvbnMnKTtcbiAgICAgICAgY29uc3QgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFN1YnNjcmlwdGlvblJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc3Vic2NyaXB0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdWJzY3JpcHRpb24+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFB1YmxpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBQdWJsaWNhdGlvbkZpbHRlciA9IHt9LCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvblJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3B1YmxpY2F0aW9ucycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAnZmVhdHVyZScsIGh0dHBQYXJhbXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFB1YmxpY2F0aW9uUmVzdWx0cz4odXJsLCBodHRwUGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHVibGljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncHVibGljYXRpb25zJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFB1YmxpY2F0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROb3RpZmljYXRpb25zKGFwaVVybDogc3RyaW5nLCBmaWx0ZXJQYXJhbWV0ZXI6IE5vdGlmaWNhdGlvbkZpbHRlciA9IHt9LCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdub3RpZmljYXRpb25zJyk7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gdGhpcy5wcmVwYXJlRmlsdGVyUGFyYW1zKGZpbHRlclBhcmFtZXRlcik7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdwdWJsaWNhdGlvbnMnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxOb3RpZmljYXRpb25SZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROb3RpZmljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnbm90aWZpY2F0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxOb3RpZmljYXRpb24+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlcXVlc3RBcGk8VD4odXJsOiBzdHJpbmcsIHBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZUJhc2ljQXV0aEhlYWRlcihvcHRpb25zLmJhc2ljQXV0aFRva2VuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuY2xpZW50KG9wdGlvbnMpLmdldDxUPih1cmwsIHsgcGFyYW1zLCBoZWFkZXJzIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVwYXJlRmlsdGVyUGFyYW1zKHBhcmFtczogRXZlbnRpbmdGaWx0ZXIpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7IGVuY29kZXI6IG5ldyBVcmlQYXJhbWV0ZXJDb2RlcigpIH0pO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIocGFyYW1zLCAnZXhwYW5kZWQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ29mZnNldCcsIGh0dHBQYXJhbXMpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIocGFyYW1zLCAnbGltaXQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4sIGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKHRpbWVzcGFuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBodHRwUGFyYW1zLnNldCgndGltZXNwYW4nLCB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtczogRXZlbnRpbmdGaWx0ZXIsIGtleTogc3RyaW5nLCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XS5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEV2ZW50aW5nQXBpU2VydmljZSB9IGZyb20gJy4vZXZlbnRpbmctYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRpbmdJbXBsQXBpSW50ZXJmYWNlIH0gZnJvbSAnLi9ldmVudGluZy1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZSc7XG5cbi8qKlxuICogUHJvdmlkZXMgc3RhbmRhcmQgZXZlbnRpbmcgYXBpIHNlcnZpY2UgaW1wbGVtZW50aW9uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBFdmVudGluZ0FwaVNlcnZpY2UsXG4gICAgdXNlQ2xhc3M6IEV2ZW50aW5nSW1wbEFwaUludGVyZmFjZVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRFdmVudGluZ01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkFwaUludGVyZmFjZSIsIkh0dHBQYXJhbXMiLCJVcmlQYXJhbWV0ZXJDb2RlciIsIkluamVjdGFibGUiLCJIdHRwU2VydmljZSIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsdUJBQTBCLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDOzs7Ozs7Ozs7QUNmRDs7UUFBQTtRQUFpREEsc0NBQVk7Ozs7aUNBWjdEO01BWWlEQyxpQkFBWSxFQWtCNUQ7Ozs7Ozs7UUNiNkNELDRDQUFrQjtRQUU1RCxrQ0FDWTtZQURaLFlBRUksaUJBQU8sU0FBRztZQURGLGlCQUFXLEdBQVgsV0FBVzs7U0FDVDs7Ozs7OztRQUVQLDRDQUFTOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLGVBQWlDLEVBQUUsT0FBZ0M7Z0JBQW5FLGdDQUFBO29CQUFBLG9CQUFpQzs7Z0JBQUUsd0JBQUE7b0JBQUEsWUFBZ0M7OztnQkFDaEcsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0JBQ3BELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDM0QsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM1RSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ25GLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3BFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBZSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztRQUc1RCwyQ0FBUTs7Ozs7O3NCQUFDLEVBQVUsRUFBRSxNQUFjLEVBQUUsT0FBZ0M7Z0JBQWhDLHdCQUFBO29CQUFBLFlBQWdDOzs7Z0JBQ3hFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQVEsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7UUFHL0MsbURBQWdCOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLGVBQXdDLEVBQUUsT0FBZ0M7Z0JBQTFFLGdDQUFBO29CQUFBLG9CQUF3Qzs7Z0JBQUUsd0JBQUE7b0JBQUEsWUFBZ0M7OztnQkFDOUcsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQzs7Z0JBQzNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFzQixHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztRQUduRSxrREFBZTs7Ozs7O3NCQUFDLEVBQVUsRUFBRSxNQUFjLEVBQUUsT0FBZ0M7Z0JBQWhDLHdCQUFBO29CQUFBLFlBQWdDOzs7Z0JBQy9FLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQWUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7UUFHdEQsa0RBQWU7Ozs7OztzQkFBQyxNQUFjLEVBQUUsZUFBdUMsRUFBRSxPQUE0QjtnQkFBckUsZ0NBQUE7b0JBQUEsb0JBQXVDOzs7Z0JBQzFFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7O2dCQUMxRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNELFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDN0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFxQixHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztRQUdsRSxpREFBYzs7Ozs7O3NCQUFDLEVBQVUsRUFBRSxNQUFjLEVBQUUsT0FBZ0M7Z0JBQWhDLHdCQUFBO29CQUFBLFlBQWdDOzs7Z0JBQzlFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQWMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7UUFHckQsbURBQWdCOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLGVBQXdDLEVBQUUsT0FBNEI7Z0JBQXRFLGdDQUFBO29CQUFBLG9CQUF3Qzs7O2dCQUM1RSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDOztnQkFDM0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMzRCxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBc0IsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7UUFHbkUsa0RBQWU7Ozs7OztzQkFBQyxFQUFVLEVBQUUsTUFBYyxFQUFFLE9BQTRCOztnQkFDM0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBZSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Ozs7UUFHbkQsNkNBQVU7Ozs7Ozs7WUFBcEIsVUFBd0IsR0FBVyxFQUFFLE1BQXFDLEVBQUUsT0FBZ0M7Z0JBQXZFLHVCQUFBO29CQUFBLGFBQXlCRSxlQUFVLEVBQUU7O2dCQUFFLHdCQUFBO29CQUFBLFlBQWdDOzs7Z0JBQ3hHLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFJLEdBQUcsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQzthQUM1RTs7Ozs7UUFFUyxzREFBbUI7Ozs7WUFBN0IsVUFBOEIsTUFBc0I7O2dCQUNoRCxJQUFJLFVBQVUsR0FBRyxJQUFJQSxlQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSUMsc0JBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDckUsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xFLE9BQU8sVUFBVSxDQUFDO2FBQ3JCOzs7Ozs7UUFFTyw4Q0FBVzs7Ozs7c0JBQUMsUUFBa0IsRUFBRSxVQUFzQjtnQkFDMUQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUN4QixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUMzRTtnQkFDRCxPQUFPLFVBQVUsQ0FBQzs7Ozs7Ozs7UUFHZCxxREFBa0I7Ozs7OztzQkFBQyxNQUFzQixFQUFFLEdBQVcsRUFBRSxVQUFzQjtnQkFDbEYsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxFQUFFO3dCQUM5QixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDckQ7b0JBQ0QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0M7Z0JBQ0QsT0FBTyxVQUFVLENBQUM7OztvQkFuRnpCQyxpQkFBVTs7Ozs7d0JBZGtCQyxnQkFBVzs7O3VDQUZ4QztNQWlCOEMsa0JBQWtCOzs7Ozs7QUNqQmhFOzs7Ozs7O29CQVFDQyxlQUFRLFNBQUM7d0JBQ1IsU0FBUyxFQUFFLENBQUM7Z0NBQ1YsT0FBTyxFQUFFLGtCQUFrQjtnQ0FDM0IsUUFBUSxFQUFFLHdCQUF3Qjs2QkFDbkMsQ0FBQztxQkFDSDs7c0NBYkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
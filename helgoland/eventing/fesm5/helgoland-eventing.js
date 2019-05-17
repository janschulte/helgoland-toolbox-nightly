import { __extends } from 'tslib';
import { ApiInterface, HttpService, UriParameterCoder } from '@helgoland/core';
import { HttpParams } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

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
EventingApiService = /** @class */ (function (_super) {
    __extends(EventingApiService, _super);
    function EventingApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventingApiService;
}(ApiInterface));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var EventingImplApiInterface = /** @class */ (function (_super) {
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
        if (filterParameter === void 0) { filterParameter = {}; }
        if (options === void 0) { options = {}; }
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
        if (options === void 0) { options = {}; }
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
        if (filterParameter === void 0) { filterParameter = {}; }
        if (options === void 0) { options = {}; }
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
        if (options === void 0) { options = {}; }
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
        if (filterParameter === void 0) { filterParameter = {}; }
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
        if (options === void 0) { options = {}; }
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
        if (filterParameter === void 0) { filterParameter = {}; }
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
        if (params === void 0) { params = new HttpParams(); }
        if (options === void 0) { options = {}; }
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
        var httpParams = new HttpParams({ encoder: new UriParameterCoder() });
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
        { type: Injectable },
    ];
    /** @nocollapse */
    EventingImplApiInterface.ctorParameters = function () { return [
        { type: HttpService }
    ]; };
    return EventingImplApiInterface;
}(EventingApiService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Provides standard eventing api service implemention
 */
var HelgolandEventingModule = /** @class */ (function () {
    function HelgolandEventingModule() {
    }
    HelgolandEventingModule.decorators = [
        { type: NgModule, args: [{
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

export { EventingApiService, EventingImplApiInterface, HelgolandEventingModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWV2ZW50aW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nL2xpYi9ldmVudGluZy1hcGkuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9ldmVudGluZy9saWIvZXZlbnRpbmctaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZXZlbnRpbmcvbGliL2V2ZW50aW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlJbnRlcmZhY2UsIEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV2ZW50RmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L2V2ZW50cyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3Qvc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBFdmVudCwgRXZlbnRSZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ldmVudHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb25SZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9zdWJzY3JpcHRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBQdWJsaWNhdGlvblJlc3VsdHMsIFB1YmxpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9wdWJsaWNhdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uUmVzdWx0cywgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ub3RpZmljYXRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50aW5nQXBpU2VydmljZSBleHRlbmRzIEFwaUludGVyZmFjZSB7XG5cbiAgcHVibGljIGFic3RyYWN0IGdldEV2ZW50cyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogRXZlbnRGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEV2ZW50UmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldEV2ZW50KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFN1YnNjcmlwdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFN1YnNjcmlwdGlvbkZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3Vic2NyaXB0aW9uUmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFN1YnNjcmlwdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3Vic2NyaXB0aW9uPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHVibGljYXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQdWJsaWNhdGlvbkZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHVibGljYXRpb25SZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHVibGljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFB1YmxpY2F0aW9uPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0Tm90aWZpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogTm90aWZpY2F0aW9uRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0Tm90aWZpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb24+O1xuXG59XG4iLCJpbXBvcnQgeyBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zLCBIdHRwU2VydmljZSwgVGltZXNwYW4sIFVyaVBhcmFtZXRlckNvZGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXZlbnRpbmdBcGlTZXJ2aWNlIH0gZnJvbSAnLi9ldmVudGluZy1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudGluZ0ZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRGaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvZXZlbnRzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3Qvc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBFdmVudCwgRXZlbnRSZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ldmVudHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uLCBOb3RpZmljYXRpb25SZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uLCBQdWJsaWNhdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3N1YnNjcmlwdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRpbmdJbXBsQXBpSW50ZXJmYWNlIGV4dGVuZHMgRXZlbnRpbmdBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZVxuICAgICkgeyBzdXBlcigpOyB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRzKGFwaVVybDogc3RyaW5nLCBmaWx0ZXJQYXJhbWV0ZXI6IEV2ZW50RmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxFdmVudFJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2V2ZW50cycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAnbGF0ZXN0JywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdzdWJzY3JpcHRpb25zJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFRpbWVzcGFuKGZpbHRlclBhcmFtZXRlci50aW1lc3BhbiwgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RXZlbnRSZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFdmVudChpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdldmVudHMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RXZlbnQ+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbnMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogU3Vic2NyaXB0aW9uRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdWJzY3JpcHRpb25zJyk7XG4gICAgICAgIGNvbnN0IGh0dHBQYXJhbXMgPSB0aGlzLnByZXBhcmVGaWx0ZXJQYXJhbXMoZmlsdGVyUGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdWJzY3JpcHRpb25SZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdWJzY3JpcHRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N1YnNjcmlwdGlvbnMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U3Vic2NyaXB0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQdWJsaWNhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogUHVibGljYXRpb25GaWx0ZXIgPSB7fSwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHVibGljYXRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwdWJsaWNhdGlvbnMnKTtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSB0aGlzLnByZXBhcmVGaWx0ZXJQYXJhbXMoZmlsdGVyUGFyYW1ldGVyKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKGZpbHRlclBhcmFtZXRlciwgJ2ZlYXR1cmUnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQdWJsaWNhdGlvblJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFB1YmxpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8UHVibGljYXRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3B1YmxpY2F0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQdWJsaWNhdGlvbj4odXJsLCBudWxsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm90aWZpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBOb3RpZmljYXRpb25GaWx0ZXIgPSB7fSwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uUmVzdWx0cz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnbm90aWZpY2F0aW9ucycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAncHVibGljYXRpb25zJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8Tm90aWZpY2F0aW9uUmVzdWx0cz4odXJsLCBodHRwUGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm90aWZpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ25vdGlmaWNhdGlvbnMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8Tm90aWZpY2F0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXF1ZXN0QXBpPFQ+KHVybDogc3RyaW5nLCBwYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVCYXNpY0F1dGhIZWFkZXIob3B0aW9ucy5iYXNpY0F1dGhUb2tlbik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmNsaWVudChvcHRpb25zKS5nZXQ8VD4odXJsLCB7IHBhcmFtcywgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUZpbHRlclBhcmFtcyhwYXJhbXM6IEV2ZW50aW5nRmlsdGVyKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoeyBlbmNvZGVyOiBuZXcgVXJpUGFyYW1ldGVyQ29kZXIoKSB9KTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ2V4cGFuZGVkJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihwYXJhbXMsICdvZmZzZXQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ2xpbWl0JywgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuLCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmICh0aW1lc3BhbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaHR0cFBhcmFtcy5zZXQoJ3RpbWVzcGFuJywgdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFBhcmFtZXRlckZpbHRlcihwYXJhbXM6IEV2ZW50aW5nRmlsdGVyLCBrZXk6IHN0cmluZywgaHR0cFBhcmFtczogSHR0cFBhcmFtcyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleV0uam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBodHRwUGFyYW1zLnNldChrZXksIHBhcmFtc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFdmVudGluZ0FwaVNlcnZpY2UgfSBmcm9tICcuL2V2ZW50aW5nLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50aW5nSW1wbEFwaUludGVyZmFjZSB9IGZyb20gJy4vZXZlbnRpbmctaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFByb3ZpZGVzIHN0YW5kYXJkIGV2ZW50aW5nIGFwaSBzZXJ2aWNlIGltcGxlbWVudGlvblxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogRXZlbnRpbmdBcGlTZXJ2aWNlLFxuICAgIHVzZUNsYXNzOiBFdmVudGluZ0ltcGxBcGlJbnRlcmZhY2VcbiAgfV1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRXZlbnRpbmdNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBOzs7QUFBQTtJQUFpREEsc0NBQVk7Ozs7NkJBWjdEO0VBWWlELFlBQVksRUFrQjVEOzs7Ozs7O0lDYjZDQSw0Q0FBa0I7SUFFNUQsa0NBQ1k7UUFEWixZQUVJLGlCQUFPLFNBQUc7UUFERixpQkFBVyxHQUFYLFdBQVc7O0tBQ1Q7Ozs7Ozs7SUFFUCw0Q0FBUzs7Ozs7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
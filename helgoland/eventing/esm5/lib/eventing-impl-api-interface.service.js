/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, UriParameterCoder } from '@helgoland/core';
import { EventingApiService } from './eventing-api.service';
var EventingImplApiInterface = /** @class */ (function (_super) {
    tslib_1.__extends(EventingImplApiInterface, _super);
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
export { EventingImplApiInterface };
if (false) {
    /** @type {?} */
    EventingImplApiInterface.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRpbmctaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nLyIsInNvdXJjZXMiOlsibGliL2V2ZW50aW5nLWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFzQixXQUFXLEVBQVksaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFZZCxvREFBa0I7SUFFNUQsa0NBQ1k7UUFEWixZQUVJLGlCQUFPLFNBQUc7UUFERixpQkFBVyxHQUFYLFdBQVc7O0tBQ1Q7Ozs7Ozs7SUFFUCw0Q0FBUzs7Ozs7O2NBQUMsTUFBYyxFQUFFLGVBQWlDLEVBQUUsT0FBZ0M7UUFBbkUsZ0NBQUEsRUFBQSxvQkFBaUM7UUFBRSx3QkFBQSxFQUFBLFlBQWdDOztRQUNoRyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUNwRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0s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RUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7SUFHZCxxREFBa0I7Ozs7OztjQUFDLE1BQXNCLEVBQUUsR0FBVyxFQUFFLFVBQXNCO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7OztnQkFuRnpCLFVBQVU7Ozs7Z0JBZGtCLFdBQVc7O21DQUZ4QztFQWlCOEMsa0JBQWtCO1NBQW5ELHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMsIEh0dHBTZXJ2aWNlLCBUaW1lc3BhbiwgVXJpUGFyYW1ldGVyQ29kZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFdmVudGluZ0FwaVNlcnZpY2UgfSBmcm9tICcuL2V2ZW50aW5nLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50aW5nRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudEZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ldmVudHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvcHVibGljYXRpb25zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9zdWJzY3JpcHRpb25zJztcbmltcG9ydCB7IEV2ZW50LCBFdmVudFJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL2V2ZW50cyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb24sIFB1YmxpY2F0aW9uUmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2UvcHVibGljYXRpb25zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uUmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2Uvc3Vic2NyaXB0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudGluZ0ltcGxBcGlJbnRlcmZhY2UgZXh0ZW5kcyBFdmVudGluZ0FwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlXG4gICAgKSB7IHN1cGVyKCk7IH1cblxuICAgIHB1YmxpYyBnZXRFdmVudHMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogRXZlbnRGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEV2ZW50UmVzdWx0cz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZXZlbnRzJyk7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gdGhpcy5wcmVwYXJlRmlsdGVyUGFyYW1zKGZpbHRlclBhcmFtZXRlcik7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdsYXRlc3QnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKGZpbHRlclBhcmFtZXRlciwgJ3N1YnNjcmlwdGlvbnMnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkVGltZXNwYW4oZmlsdGVyUGFyYW1ldGVyLnRpbWVzcGFuLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxFdmVudFJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV2ZW50KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2V2ZW50cycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxFdmVudD4odXJsLCBudWxsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3Vic2NyaXB0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBTdWJzY3JpcHRpb25GaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvblJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N1YnNjcmlwdGlvbnMnKTtcbiAgICAgICAgY29uc3QgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFN1YnNjcmlwdGlvblJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc3Vic2NyaXB0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdWJzY3JpcHRpb24+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFB1YmxpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBQdWJsaWNhdGlvbkZpbHRlciA9IHt9LCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvblJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3B1YmxpY2F0aW9ucycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAnZmVhdHVyZScsIGh0dHBQYXJhbXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFB1YmxpY2F0aW9uUmVzdWx0cz4odXJsLCBodHRwUGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHVibGljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncHVibGljYXRpb25zJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFB1YmxpY2F0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROb3RpZmljYXRpb25zKGFwaVVybDogc3RyaW5nLCBmaWx0ZXJQYXJhbWV0ZXI6IE5vdGlmaWNhdGlvbkZpbHRlciA9IHt9LCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdub3RpZmljYXRpb25zJyk7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gdGhpcy5wcmVwYXJlRmlsdGVyUGFyYW1zKGZpbHRlclBhcmFtZXRlcik7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdwdWJsaWNhdGlvbnMnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxOb3RpZmljYXRpb25SZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROb3RpZmljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnbm90aWZpY2F0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxOb3RpZmljYXRpb24+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlcXVlc3RBcGk8VD4odXJsOiBzdHJpbmcsIHBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZUJhc2ljQXV0aEhlYWRlcihvcHRpb25zLmJhc2ljQXV0aFRva2VuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuY2xpZW50KG9wdGlvbnMpLmdldDxUPih1cmwsIHsgcGFyYW1zLCBoZWFkZXJzIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVwYXJlRmlsdGVyUGFyYW1zKHBhcmFtczogRXZlbnRpbmdGaWx0ZXIpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7IGVuY29kZXI6IG5ldyBVcmlQYXJhbWV0ZXJDb2RlcigpIH0pO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIocGFyYW1zLCAnZXhwYW5kZWQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ29mZnNldCcsIGh0dHBQYXJhbXMpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIocGFyYW1zLCAnbGltaXQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4sIGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKHRpbWVzcGFuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBodHRwUGFyYW1zLnNldCgndGltZXNwYW4nLCB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtczogRXZlbnRpbmdGaWx0ZXIsIGtleTogc3RyaW5nLCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XS5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, UriParameterCoder } from '@helgoland/core';
import { EventingApiService } from './eventing-api.service';
export class EventingImplApiInterface extends EventingApiService {
    /**
     * @param {?} httpService
     */
    constructor(httpService) {
        super();
        this.httpService = httpService;
    }
    /**
     * @param {?} apiUrl
     * @param {?=} filterParameter
     * @param {?=} options
     * @return {?}
     */
    getEvents(apiUrl, filterParameter = {}, options = {}) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'events');
        /** @type {?} */
        let httpParams = this.prepareFilterParams(filterParameter);
        httpParams = this.addParameterFilter(filterParameter, 'latest', httpParams);
        httpParams = this.addParameterFilter(filterParameter, 'subscriptions', httpParams);
        httpParams = this.addTimespan(filterParameter.timespan, httpParams);
        return this.requestApi(url, httpParams, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    getEvent(id, apiUrl, options = {}) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'events', id);
        return this.requestApi(url, null, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} filterParameter
     * @param {?=} options
     * @return {?}
     */
    getSubscriptions(apiUrl, filterParameter = {}, options = {}) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'subscriptions');
        /** @type {?} */
        const httpParams = this.prepareFilterParams(filterParameter);
        return this.requestApi(url, httpParams, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    getSubscription(id, apiUrl, options = {}) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'subscriptions', id);
        return this.requestApi(url, null, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} filterParameter
     * @param {?=} options
     * @return {?}
     */
    getPublications(apiUrl, filterParameter = {}, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'publications');
        /** @type {?} */
        let httpParams = this.prepareFilterParams(filterParameter);
        httpParams = this.addParameterFilter(filterParameter, 'feature', httpParams);
        return this.requestApi(url, httpParams, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    getPublication(id, apiUrl, options = {}) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'publications', id);
        return this.requestApi(url, null, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} filterParameter
     * @param {?=} options
     * @return {?}
     */
    getNotifications(apiUrl, filterParameter = {}, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'notifications');
        /** @type {?} */
        let httpParams = this.prepareFilterParams(filterParameter);
        httpParams = this.addParameterFilter(filterParameter, 'publications', httpParams);
        return this.requestApi(url, httpParams, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    getNotification(id, apiUrl, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'notifications', id);
        return this.requestApi(url, null, options);
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    requestApi(url, params = new HttpParams(), options = {}) {
        /** @type {?} */
        const headers = this.createBasicAuthHeader(options.basicAuthToken);
        return this.httpService.client(options).get(url, { params, headers });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    prepareFilterParams(params) {
        /** @type {?} */
        let httpParams = new HttpParams({ encoder: new UriParameterCoder() });
        httpParams = this.addParameterFilter(params, 'expanded', httpParams);
        httpParams = this.addParameterFilter(params, 'offset', httpParams);
        httpParams = this.addParameterFilter(params, 'limit', httpParams);
        return httpParams;
    }
    /**
     * @param {?} timespan
     * @param {?} httpParams
     * @return {?}
     */
    addTimespan(timespan, httpParams) {
        if (timespan !== undefined) {
            return httpParams.set('timespan', this.createRequestTimespan(timespan));
        }
        return httpParams;
    }
    /**
     * @param {?} params
     * @param {?} key
     * @param {?} httpParams
     * @return {?}
     */
    addParameterFilter(params, key, httpParams) {
        if (params && params[key] !== undefined) {
            if (params[key] instanceof Array) {
                return httpParams.set(key, params[key].join(','));
            }
            return httpParams.set(key, params[key]);
        }
        return httpParams;
    }
}
EventingImplApiInterface.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EventingImplApiInterface.ctorParameters = () => [
    { type: HttpService }
];
if (false) {
    /** @type {?} */
    EventingImplApiInterface.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRpbmctaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nLyIsInNvdXJjZXMiOlsibGliL2V2ZW50aW5nLWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXNCLFdBQVcsRUFBWSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBWTVELE1BQU0sK0JBQWdDLFNBQVEsa0JBQWtCOzs7O0lBRTVELFlBQ1k7UUFDUixLQUFLLEVBQUUsQ0FBQztRQURBLGdCQUFXLEdBQVgsV0FBVztLQUNUOzs7Ozs7O0lBRVAsU0FBUyxDQUFDLE1BQWMsRUFBRSxrQkFBK0IsRUFBRSxFQUFFLFVBQThCLEVBQUU7O1FBQ2hHLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O1FBQ3BELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRCxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUUsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25GLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQWUs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QyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDckQ7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDOzs7O1lBbkZ6QixVQUFVOzs7O1lBZGtCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zLCBIdHRwU2VydmljZSwgVGltZXNwYW4sIFVyaVBhcmFtZXRlckNvZGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXZlbnRpbmdBcGlTZXJ2aWNlIH0gZnJvbSAnLi9ldmVudGluZy1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudGluZ0ZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRGaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3QvZXZlbnRzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3Qvc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBFdmVudCwgRXZlbnRSZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ldmVudHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uLCBOb3RpZmljYXRpb25SZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uLCBQdWJsaWNhdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvblJlc3VsdHMgfSBmcm9tICcuL21vZGVsL3Jlc3BvbnNlL3N1YnNjcmlwdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRpbmdJbXBsQXBpSW50ZXJmYWNlIGV4dGVuZHMgRXZlbnRpbmdBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZVxuICAgICkgeyBzdXBlcigpOyB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRzKGFwaVVybDogc3RyaW5nLCBmaWx0ZXJQYXJhbWV0ZXI6IEV2ZW50RmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxFdmVudFJlc3VsdHM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2V2ZW50cycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAnbGF0ZXN0JywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihmaWx0ZXJQYXJhbWV0ZXIsICdzdWJzY3JpcHRpb25zJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFRpbWVzcGFuKGZpbHRlclBhcmFtZXRlci50aW1lc3BhbiwgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RXZlbnRSZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFdmVudChpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdldmVudHMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RXZlbnQ+KHVybCwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbnMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogU3Vic2NyaXB0aW9uRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdWJzY3JpcHRpb25zJyk7XG4gICAgICAgIGNvbnN0IGh0dHBQYXJhbXMgPSB0aGlzLnByZXBhcmVGaWx0ZXJQYXJhbXMoZmlsdGVyUGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdWJzY3JpcHRpb25SZXN1bHRzPih1cmwsIGh0dHBQYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdWJzY3JpcHRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxTdWJzY3JpcHRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N1YnNjcmlwdGlvbnMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U3Vic2NyaXB0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQdWJsaWNhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIGZpbHRlclBhcmFtZXRlcjogUHVibGljYXRpb25GaWx0ZXIgPSB7fSwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHVibGljYXRpb25SZXN1bHRzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwdWJsaWNhdGlvbnMnKTtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSB0aGlzLnByZXBhcmVGaWx0ZXJQYXJhbXMoZmlsdGVyUGFyYW1ldGVyKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKGZpbHRlclBhcmFtZXRlciwgJ2ZlYXR1cmUnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQdWJsaWNhdGlvblJlc3VsdHM+KHVybCwgaHR0cFBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFB1YmxpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8UHVibGljYXRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3B1YmxpY2F0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQdWJsaWNhdGlvbj4odXJsLCBudWxsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm90aWZpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgZmlsdGVyUGFyYW1ldGVyOiBOb3RpZmljYXRpb25GaWx0ZXIgPSB7fSwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uUmVzdWx0cz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnbm90aWZpY2F0aW9ucycpO1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IHRoaXMucHJlcGFyZUZpbHRlclBhcmFtcyhmaWx0ZXJQYXJhbWV0ZXIpO1xuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRQYXJhbWV0ZXJGaWx0ZXIoZmlsdGVyUGFyYW1ldGVyLCAncHVibGljYXRpb25zJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8Tm90aWZpY2F0aW9uUmVzdWx0cz4odXJsLCBodHRwUGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm90aWZpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ25vdGlmaWNhdGlvbnMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8Tm90aWZpY2F0aW9uPih1cmwsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXF1ZXN0QXBpPFQ+KHVybDogc3RyaW5nLCBwYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5jcmVhdGVCYXNpY0F1dGhIZWFkZXIob3B0aW9ucy5iYXNpY0F1dGhUb2tlbik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmNsaWVudChvcHRpb25zKS5nZXQ8VD4odXJsLCB7IHBhcmFtcywgaGVhZGVycyB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUZpbHRlclBhcmFtcyhwYXJhbXM6IEV2ZW50aW5nRmlsdGVyKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoeyBlbmNvZGVyOiBuZXcgVXJpUGFyYW1ldGVyQ29kZXIoKSB9KTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ2V4cGFuZGVkJywgaHR0cFBhcmFtcyk7XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFBhcmFtZXRlckZpbHRlcihwYXJhbXMsICdvZmZzZXQnLCBodHRwUGFyYW1zKTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMuYWRkUGFyYW1ldGVyRmlsdGVyKHBhcmFtcywgJ2xpbWl0JywgaHR0cFBhcmFtcyk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuLCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmICh0aW1lc3BhbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaHR0cFBhcmFtcy5zZXQoJ3RpbWVzcGFuJywgdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFBhcmFtZXRlckZpbHRlcihwYXJhbXM6IEV2ZW50aW5nRmlsdGVyLCBrZXk6IHN0cmluZywgaHR0cFBhcmFtczogSHR0cFBhcmFtcyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleV0uam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBodHRwUGFyYW1zLnNldChrZXksIHBhcmFtc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG59XG4iXX0=
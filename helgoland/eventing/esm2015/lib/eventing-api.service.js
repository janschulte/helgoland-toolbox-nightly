/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ApiInterface } from '@helgoland/core';
/**
 * @abstract
 */
export class EventingApiService extends ApiInterface {
}
if (false) {
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getEvents = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getEvent = function (id, apiUrl, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getSubscriptions = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getSubscription = function (id, apiUrl, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getPublications = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getPublication = function (id, apiUrl, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getNotifications = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} options
     * @return {?}
     */
    EventingApiService.prototype.getNotification = function (id, apiUrl, options) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRpbmctYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nLyIsInNvdXJjZXMiOlsibGliL2V2ZW50aW5nLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBWW5FLE1BQU0seUJBQW1DLFNBQVEsWUFBWTtDQWtCNUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlJbnRlcmZhY2UsIEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV2ZW50RmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L2V2ZW50cyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25GaWx0ZXIgfSBmcm9tICcuL21vZGVsL3JlcXVlc3Qvc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBFdmVudCwgRXZlbnRSZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ldmVudHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb25SZXN1bHRzIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9zdWJzY3JpcHRpb25zJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L3B1YmxpY2F0aW9ucyc7XG5pbXBvcnQgeyBQdWJsaWNhdGlvblJlc3VsdHMsIFB1YmxpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9wdWJsaWNhdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uUmVzdWx0cywgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbC9yZXNwb25zZS9ub3RpZmljYXRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50aW5nQXBpU2VydmljZSBleHRlbmRzIEFwaUludGVyZmFjZSB7XG5cbiAgcHVibGljIGFic3RyYWN0IGdldEV2ZW50cyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogRXZlbnRGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEV2ZW50UmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldEV2ZW50KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFN1YnNjcmlwdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFN1YnNjcmlwdGlvbkZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3Vic2NyaXB0aW9uUmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFN1YnNjcmlwdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3Vic2NyaXB0aW9uPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHVibGljYXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQdWJsaWNhdGlvbkZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHVibGljYXRpb25SZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHVibGljYXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFB1YmxpY2F0aW9uPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0Tm90aWZpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogTm90aWZpY2F0aW9uRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZXN1bHRzPjtcblxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0Tm90aWZpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb24+O1xuXG59XG4iXX0=
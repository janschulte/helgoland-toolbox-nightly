/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ApiInterface } from '@helgoland/core';
/**
 * @abstract
 */
var /**
 * @abstract
 */
EventingApiService = /** @class */ (function (_super) {
    tslib_1.__extends(EventingApiService, _super);
    function EventingApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventingApiService;
}(ApiInterface));
/**
 * @abstract
 */
export { EventingApiService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRpbmctYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2V2ZW50aW5nLyIsInNvdXJjZXMiOlsibGliL2V2ZW50aW5nLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVluRTs7O0FBQUE7SUFBaUQsOENBQVk7Ozs7NkJBWjdEO0VBWWlELFlBQVksRUFrQjVELENBQUE7Ozs7QUFsQkQsOEJBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpSW50ZXJmYWNlLCBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFdmVudEZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ldmVudHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRmlsdGVyIH0gZnJvbSAnLi9tb2RlbC9yZXF1ZXN0L3N1YnNjcmlwdGlvbnMnO1xuaW1wb3J0IHsgRXZlbnQsIEV2ZW50UmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2UvZXZlbnRzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uUmVzdWx0cyB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2Uvc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBQdWJsaWNhdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9wdWJsaWNhdGlvbnMnO1xuaW1wb3J0IHsgUHVibGljYXRpb25SZXN1bHRzLCBQdWJsaWNhdGlvbiB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2UvcHVibGljYXRpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkZpbHRlciB9IGZyb20gJy4vbW9kZWwvcmVxdWVzdC9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblJlc3VsdHMsIE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vbW9kZWwvcmVzcG9uc2Uvbm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFdmVudGluZ0FwaVNlcnZpY2UgZXh0ZW5kcyBBcGlJbnRlcmZhY2Uge1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRFdmVudHMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IEV2ZW50RmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxFdmVudFJlc3VsdHM+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRFdmVudChpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RXZlbnQ+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRTdWJzY3JpcHRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBTdWJzY3JpcHRpb25GaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvblJlc3VsdHM+O1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRTdWJzY3JpcHRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN1YnNjcmlwdGlvbj47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFB1YmxpY2F0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUHVibGljYXRpb25GaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFB1YmxpY2F0aW9uUmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldFB1YmxpY2F0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQdWJsaWNhdGlvbj47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldE5vdGlmaWNhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IE5vdGlmaWNhdGlvbkZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uUmVzdWx0cz47XG5cbiAgcHVibGljIGFic3RyYWN0IGdldE5vdGlmaWNhdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uPjtcblxufVxuIl19
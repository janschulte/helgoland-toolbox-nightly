/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpParams } from '@angular/common/http';
import { ApiInterface } from '../abstract-services/api-interface';
var UriParameterCoder = /** @class */ (function () {
    function UriParameterCoder() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    UriParameterCoder.prototype.encodeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return encodeURIComponent(key);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriParameterCoder.prototype.encodeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return encodeURIComponent(value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UriParameterCoder.prototype.decodeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriParameterCoder.prototype.decodeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value;
    };
    return UriParameterCoder;
}());
export { UriParameterCoder };
/**
 * @abstract
 */
var /**
 * @abstract
 */
DatasetApiInterface = /** @class */ (function (_super) {
    tslib_1.__extends(DatasetApiInterface, _super);
    function DatasetApiInterface(httpService, translate) {
        var _this = _super.call(this) || this;
        _this.httpService = httpService;
        _this.translate = translate;
        return _this;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.requestApi = /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpService.client(options).get(url, {
            params: this.prepareParams(params),
            headers: this.createBasicAuthHeader(options.basicAuthToken)
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DatasetApiInterface.prototype.prepareParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (this.translate && this.translate.currentLang) {
            params["locale"] = this.translate.currentLang;
        }
        /** @type {?} */
        var httpParams = new HttpParams({
            encoder: new UriParameterCoder()
        });
        Object.getOwnPropertyNames(params)
            .forEach(function (key) { return httpParams = httpParams.set(key, params[key]); });
        return httpParams;
    };
    return DatasetApiInterface;
}(ApiInterface));
/**
 * @abstract
 */
export { DatasetApiInterface };
if (false) {
    /** @type {?} */
    DatasetApiInterface.prototype.httpService;
    /** @type {?} */
    DatasetApiInterface.prototype.translate;
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getPlatforms = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getPlatform = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getDatasets = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getDataset = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getDatasetByInternalId = function (internalId, params, options) { };
    /**
     * @abstract
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getData = function (id, apiUrl, timespan, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getServices = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getService = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getStations = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getStation = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getTimeseries = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getTimeseriesData = function (apiUrl, ids, timespan, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getSingleTimeseries = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getSingleTimeseriesByInternalId = function (internalId, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetApiInterface.prototype.getTimeseriesExtras = function (id, apiUrl) { };
    /**
     * @abstract
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getTsData = function (id, apiUrl, timespan, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getCategories = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getCategory = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getPhenomena = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getPhenomenon = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getOfferings = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getOffering = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getFeatures = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getFeature = function (id, apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getProcedures = function (apiUrl, params, options) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.getProcedure = function (id, apiUrl, params, options) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9hcGktaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFzQixVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUl0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFnQmxFLElBQUE7Ozs7Ozs7SUFFVyxxQ0FBUzs7OztjQUFDLEdBQVc7UUFDeEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHNUIsdUNBQVc7Ozs7Y0FBQyxLQUFhO1FBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBRzlCLHFDQUFTOzs7O2NBQUMsR0FBVztRQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDOzs7Ozs7SUFHUix1Q0FBVzs7OztjQUFDLEtBQWE7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQzs7NEJBbkNyQjtJQXFDQyxDQUFBO0FBakJELDZCQWlCQzs7OztBQUVEOzs7QUFBQTtJQUFrRCwrQ0FBWTtJQUUxRCw2QkFDYyxXQUF3QixFQUN4QixTQUEyQjtRQUZ6QyxZQUdJLGlCQUFPLFNBQUc7UUFGQSxpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFTLEdBQVQsU0FBUyxDQUFrQjs7S0FDM0I7Ozs7Ozs7O0lBNkJKLHdDQUFVOzs7Ozs7O0lBQXBCLFVBQ0ksR0FBVyxFQUFFLE1BQTRCLEVBQUUsT0FBZ0M7UUFBOUQsdUJBQUEsRUFBQSxXQUE0QjtRQUFFLHdCQUFBLEVBQUEsWUFBZ0M7UUFFM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQzlDO1lBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztTQUM5RCxDQUNKLENBQUM7S0FDTDs7Ozs7SUFFUywyQ0FBYTs7OztJQUF2QixVQUF3QixNQUF1QjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLGFBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7U0FDOUM7O1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDNUIsT0FBTyxFQUFFLElBQUksaUJBQWlCLEVBQUU7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUM3QixPQUFPLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTdDLENBQTZDLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ3JCOzhCQTlGTDtFQXVDa0QsWUFBWSxFQXdEN0QsQ0FBQTs7OztBQXhERCwrQkF3REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUGFyYW1ldGVyQ29kZWMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFwaUludGVyZmFjZSB9IGZyb20gJy4uL2Fic3RyYWN0LXNlcnZpY2VzL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9jYXRlZ29yeSc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBUaW1lc2VyaWVzLCBUaW1lc2VyaWVzRGF0YSwgVGltZXNlcmllc0V4dHJhcyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2ZlYXR1cmUnO1xuaW1wb3J0IHsgT2ZmZXJpbmcgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5pbXBvcnQgeyBQaGVub21lbm9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGhlbm9tZW5vbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BsYXRmb3JtJztcbmltcG9ydCB7IFByb2NlZHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3Byb2NlZHVyZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbic7XG5pbXBvcnQgeyBEYXRhUGFyYW1ldGVyRmlsdGVyLCBIdHRwUmVxdWVzdE9wdGlvbnMsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpVjIgfSBmcm9tICcuL2ludGVyZmFjZXMvYXBpLXYyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBVcmlQYXJhbWV0ZXJDb2RlciBpbXBsZW1lbnRzIEh0dHBQYXJhbWV0ZXJDb2RlYyB7XG5cbiAgICBwdWJsaWMgZW5jb2RlS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmNvZGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlY29kZUtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlY29kZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YXNldEFwaUludGVyZmFjZSBleHRlbmRzIEFwaUludGVyZmFjZSBpbXBsZW1lbnRzIERhdGFzZXRBcGlWMiB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkgeyBzdXBlcigpOyB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGxhdGZvcm1zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBsYXRmb3JtW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQbGF0Zm9ybShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQbGF0Zm9ybT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXRzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXRbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXQoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXREYXRhPFQ+KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCB0aW1lc3BhbjogVGltZXNwYW4sIHBhcmFtcz86IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGE8VD4+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTZXJ2aWNlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTZXJ2aWNlKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFNlcnZpY2U+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdGF0aW9uW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN0YXRpb24+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUaW1lc2VyaWVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRpbWVzZXJpZXNEYXRhKGFwaVVybDogc3RyaW5nLCBpZHM6IHN0cmluZ1tdLCB0aW1lc3BhbjogVGltZXNwYW4sIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNEYXRhW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTaW5nbGVUaW1lc2VyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGltZXNlcmllc0V4dHJhcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8VGltZXNlcmllc0V4dHJhcz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRzRGF0YTxUPihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgdGltZXNwYW46IFRpbWVzcGFuLCBwYXJhbXM/OiBEYXRhUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q2F0ZWdvcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q2F0ZWdvcnkoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Q2F0ZWdvcnk+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQaGVub21lbmEoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbltdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGhlbm9tZW5vbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQaGVub21lbm9uPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0T2ZmZXJpbmdzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRPZmZlcmluZyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxPZmZlcmluZz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZlYXR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZlYXR1cmUoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFByb2NlZHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQcm9jZWR1cmUoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlPjtcblxuICAgIHByb3RlY3RlZCByZXF1ZXN0QXBpPFQ+KFxuICAgICAgICB1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge31cbiAgICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuY2xpZW50KG9wdGlvbnMpLmdldDxUPih1cmwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnByZXBhcmVQYXJhbXMocGFyYW1zKSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmNyZWF0ZUJhc2ljQXV0aEhlYWRlcihvcHRpb25zLmJhc2ljQXV0aFRva2VuKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVwYXJlUGFyYW1zKHBhcmFtczogUGFyYW1ldGVyRmlsdGVyKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZSAmJiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZykge1xuICAgICAgICAgICAgcGFyYW1zLmxvY2FsZSA9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe1xuICAgICAgICAgICAgZW5jb2RlcjogbmV3IFVyaVBhcmFtZXRlckNvZGVyKClcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmFtcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIHBhcmFtc1trZXldKSk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbn1cbiJdfQ==
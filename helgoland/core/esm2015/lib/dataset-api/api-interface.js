/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpParams } from '@angular/common/http';
import { ApiInterface } from '../abstract-services/api-interface';
export class UriParameterCoder {
    /**
     * @param {?} key
     * @return {?}
     */
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    decodeKey(key) {
        return key;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    decodeValue(value) {
        return value;
    }
}
/**
 * @abstract
 */
export class DatasetApiInterface extends ApiInterface {
    /**
     * @param {?} httpService
     * @param {?} translate
     */
    constructor(httpService, translate) {
        super();
        this.httpService = httpService;
        this.translate = translate;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    requestApi(url, params = {}, options = {}) {
        return this.httpService.client(options).get(url, {
            params: this.prepareParams(params),
            headers: this.createBasicAuthHeader(options.basicAuthToken)
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    prepareParams(params) {
        if (this.translate && this.translate.currentLang) {
            params["locale"] = this.translate.currentLang;
        }
        /** @type {?} */
        let httpParams = new HttpParams({
            encoder: new UriParameterCoder()
        });
        Object.getOwnPropertyNames(params)
            .forEach((key) => httpParams = httpParams.set(key, params[key]));
        return httpParams;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9hcGktaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSXRFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQWdCbEUsTUFBTTs7Ozs7SUFFSyxTQUFTLENBQUMsR0FBVztRQUN4QixNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztJQUc1QixXQUFXLENBQUMsS0FBYTtRQUM1QixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUc5QixTQUFTLENBQUMsR0FBVztRQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDOzs7Ozs7SUFHUixXQUFXLENBQUMsS0FBYTtRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDOztDQUVwQjs7OztBQUVELE1BQU0sMEJBQW9DLFNBQVEsWUFBWTs7Ozs7SUFFMUQsWUFDYyxXQUF3QixFQUN4QixTQUEyQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQUZFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0tBQzNCOzs7Ozs7OztJQTZCSixVQUFVLENBQ2hCLEdBQVcsRUFBRSxTQUEwQixFQUFFLEVBQUUsVUFBOEIsRUFBRTtRQUUzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFJLEdBQUcsRUFDOUM7WUFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1NBQzlELENBQ0osQ0FBQztLQUNMOzs7OztJQUVTLGFBQWEsQ0FBQyxNQUF1QjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLGFBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7U0FDOUM7O1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDNUIsT0FBTyxFQUFFLElBQUksaUJBQWlCLEVBQUU7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUM3QixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FDckI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpSW50ZXJmYWNlIH0gZnJvbSAnLi4vYWJzdHJhY3Qtc2VydmljZXMvYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2NhdGVnb3J5JztcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhJztcbmltcG9ydCB7IERhdGFzZXQsIFRpbWVzZXJpZXMsIFRpbWVzZXJpZXNEYXRhLCBUaW1lc2VyaWVzRXh0cmFzIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YXNldCc7XG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZmVhdHVyZSc7XG5pbXBvcnQgeyBPZmZlcmluZyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL29mZmVyaW5nJztcbmltcG9ydCB7IFBoZW5vbWVub24gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9waGVub21lbm9uJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGxhdGZvcm0nO1xuaW1wb3J0IHsgUHJvY2VkdXJlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcHJvY2VkdXJlJztcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRpb24gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9zdGF0aW9uJztcbmltcG9ydCB7IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIEh0dHBSZXF1ZXN0T3B0aW9ucywgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFzZXRBcGlWMiB9IGZyb20gJy4vaW50ZXJmYWNlcy9hcGktdjIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIFVyaVBhcmFtZXRlckNvZGVyIGltcGxlbWVudHMgSHR0cFBhcmFtZXRlckNvZGVjIHtcblxuICAgIHB1YmxpYyBlbmNvZGVLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuY29kZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVjb2RlS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVjb2RlVmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhc2V0QXBpSW50ZXJmYWNlIGV4dGVuZHMgQXBpSW50ZXJmYWNlIGltcGxlbWVudHMgRGF0YXNldEFwaVYyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IHN1cGVyKCk7IH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQbGF0Zm9ybXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGxhdGZvcm1bXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFBsYXRmb3JtKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBsYXRmb3JtPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RGF0YXNldHMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldFtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RGF0YXNldChpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RGF0YXNldEJ5SW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGE8VD4oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHRpbWVzcGFuOiBUaW1lc3BhbiwgcGFyYW1zPzogRGF0YVBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YTxUPj47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFNlcnZpY2VzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFNlcnZpY2VbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFNlcnZpY2UoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFN0YXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN0YXRpb25bXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFN0YXRpb24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3RhdGlvbj47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRpbWVzZXJpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc1tdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGltZXNlcmllc0RhdGEoYXBpVXJsOiBzdHJpbmcsIGlkczogc3RyaW5nW10sIHRpbWVzcGFuOiBUaW1lc3Bhbiwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc0RhdGFbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFNpbmdsZVRpbWVzZXJpZXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllcz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUaW1lc2VyaWVzRXh0cmFzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRXh0cmFzPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VHNEYXRhPFQ+KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCB0aW1lc3BhbjogVGltZXNwYW4sIHBhcmFtcz86IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGE8VD4+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRDYXRlZ29yaWVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPENhdGVnb3J5W10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRDYXRlZ29yeShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFBoZW5vbWVuYShhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQaGVub21lbm9uW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQaGVub21lbm9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBoZW5vbWVub24+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRPZmZlcmluZ3MoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8T2ZmZXJpbmdbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldE9mZmVyaW5nKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RmVhdHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RmVhdHVyZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHJvY2VkdXJlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQcm9jZWR1cmVbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFByb2NlZHVyZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQcm9jZWR1cmU+O1xuXG4gICAgcHJvdGVjdGVkIHJlcXVlc3RBcGk8VD4oXG4gICAgICAgIHVybDogc3RyaW5nLCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9LCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fVxuICAgICk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5jbGllbnQob3B0aW9ucykuZ2V0PFQ+KHVybCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucHJlcGFyZVBhcmFtcyhwYXJhbXMpLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuY3JlYXRlQmFzaWNBdXRoSGVhZGVyKG9wdGlvbnMuYmFzaWNBdXRoVG9rZW4pXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHByZXBhcmVQYXJhbXMocGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIpOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlICYmIHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICBwYXJhbXMubG9jYWxlID0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7XG4gICAgICAgICAgICBlbmNvZGVyOiBuZXcgVXJpUGFyYW1ldGVyQ29kZXIoKVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocGFyYW1zKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4gaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleV0pKTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxufVxuIl19
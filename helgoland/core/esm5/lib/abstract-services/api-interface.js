/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import moment from 'moment';
import { HttpHeaders } from '@angular/common/http';
/**
 * @abstract
 */
var /**
 * @abstract
 */
ApiInterface = /** @class */ (function () {
    function ApiInterface() {
    }
    /**
     * @param {?} apiUrl
     * @param {?} endpoint
     * @param {?=} id
     * @return {?}
     */
    ApiInterface.prototype.createRequestUrl = /**
     * @param {?} apiUrl
     * @param {?} endpoint
     * @param {?=} id
     * @return {?}
     */
    function (apiUrl, endpoint, id) {
        /** @type {?} */
        var requestUrl = apiUrl + endpoint;
        if (id) {
            requestUrl += '/' + id;
        }
        return requestUrl;
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    ApiInterface.prototype.createRequestTimespan = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        return encodeURI(moment(timespan.from).format() + '/' + moment(timespan.to).format());
    };
    /**
     * @param {?} token
     * @return {?}
     */
    ApiInterface.prototype.createBasicAuthHeader = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var headers = new HttpHeaders();
        if (token) {
            return headers.set('Authorization', token);
        }
        return headers;
    };
    return ApiInterface;
}());
/**
 * @abstract
 */
export { ApiInterface };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9hcGktaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFHNUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRW5EOzs7QUFBQTs7Ozs7Ozs7O0lBRWMsdUNBQWdCOzs7Ozs7SUFBMUIsVUFBMkIsTUFBYyxFQUFFLFFBQWdCLEVBQUUsRUFBVzs7UUFFcEUsSUFBSSxVQUFVLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsVUFBVSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUNuQyxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ3JCOzs7OztJQUVTLDRDQUFxQjs7OztJQUEvQixVQUFnQyxRQUFrQjtRQUM5QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUN6Rjs7Ozs7SUFFUyw0Q0FBcUI7Ozs7SUFBL0IsVUFBZ0MsS0FBYTs7UUFDekMsSUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQUU7UUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNsQjt1QkF0Qkw7SUF3QkMsQ0FBQTs7OztBQW5CRCx3QkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcbmltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpSW50ZXJmYWNlIHtcblxuICAgIHByb3RlY3RlZCBjcmVhdGVSZXF1ZXN0VXJsKGFwaVVybDogc3RyaW5nLCBlbmRwb2ludDogc3RyaW5nLCBpZD86IHN0cmluZykge1xuICAgICAgICAvLyBUT0RPIENoZWNrIHdoZXRoZXIgYXBpVXJsIGVuZHMgd2l0aCBzbGFzaFxuICAgICAgICBsZXQgcmVxdWVzdFVybCA9IGFwaVVybCArIGVuZHBvaW50O1xuICAgICAgICBpZiAoaWQpIHsgcmVxdWVzdFVybCArPSAnLycgKyBpZDsgfVxuICAgICAgICByZXR1cm4gcmVxdWVzdFVybDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdFRpbWVzcGFuKHRpbWVzcGFuOiBUaW1lc3Bhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkobW9tZW50KHRpbWVzcGFuLmZyb20pLmZvcm1hdCgpICsgJy8nICsgbW9tZW50KHRpbWVzcGFuLnRvKS5mb3JtYXQoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUJhc2ljQXV0aEhlYWRlcih0b2tlbjogc3RyaW5nKTogSHR0cEhlYWRlcnMge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIGlmICh0b2tlbikgeyByZXR1cm4gaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCB0b2tlbik7IH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuXG59XG4iXX0=
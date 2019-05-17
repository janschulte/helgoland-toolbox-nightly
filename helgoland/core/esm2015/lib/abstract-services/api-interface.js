/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import moment from 'moment';
import { HttpHeaders } from '@angular/common/http';
/**
 * @abstract
 */
export class ApiInterface {
    /**
     * @param {?} apiUrl
     * @param {?} endpoint
     * @param {?=} id
     * @return {?}
     */
    createRequestUrl(apiUrl, endpoint, id) {
        /** @type {?} */
        let requestUrl = apiUrl + endpoint;
        if (id) {
            requestUrl += '/' + id;
        }
        return requestUrl;
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    createRequestTimespan(timespan) {
        return encodeURI(moment(timespan.from).format() + '/' + moment(timespan.to).format());
    }
    /**
     * @param {?} token
     * @return {?}
     */
    createBasicAuthHeader(token) {
        /** @type {?} */
        const headers = new HttpHeaders();
        if (token) {
            return headers.set('Authorization', token);
        }
        return headers;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9hcGktaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFHNUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRW5ELE1BQU07Ozs7Ozs7SUFFUSxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxFQUFXOztRQUVwRSxJQUFJLFVBQVUsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFBQyxVQUFVLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBQ25DLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FDckI7Ozs7O0lBRVMscUJBQXFCLENBQUMsUUFBa0I7UUFDOUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDekY7Ozs7O0lBRVMscUJBQXFCLENBQUMsS0FBYTs7UUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQUU7UUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNsQjtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwaUludGVyZmFjZSB7XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdFVybChhcGlVcmw6IHN0cmluZywgZW5kcG9pbnQ6IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayB3aGV0aGVyIGFwaVVybCBlbmRzIHdpdGggc2xhc2hcbiAgICAgICAgbGV0IHJlcXVlc3RVcmwgPSBhcGlVcmwgKyBlbmRwb2ludDtcbiAgICAgICAgaWYgKGlkKSB7IHJlcXVlc3RVcmwgKz0gJy8nICsgaWQ7IH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3RVcmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5mb3JtYXQoKSArICcvJyArIG1vbWVudCh0aW1lc3Bhbi50bykuZm9ybWF0KCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVCYXNpY0F1dGhIZWFkZXIodG9rZW46IHN0cmluZyk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBpZiAodG9rZW4pIHsgcmV0dXJuIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdG9rZW4pOyB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxufVxuIl19
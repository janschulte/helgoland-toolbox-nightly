/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
var BasicAuthService = /** @class */ (function () {
    function BasicAuthService(http) {
        this.http = http;
    }
    /**
     * @param {?} username
     * @param {?} password
     * @param {?} url
     * @return {?}
     */
    BasicAuthService.prototype.auth = /**
     * @param {?} username
     * @param {?} password
     * @param {?} url
     * @return {?}
     */
    function (username, password, url) {
        var _this = this;
        /** @type {?} */
        var token = 'Basic ' + btoa(username + ':' + password);
        /** @type {?} */
        var headers = new HttpHeaders({ 'Authorization': token });
        return this.http.get(url, { headers: headers })
            .pipe(map(function (res) {
            _this.basicAuthToken = token;
            return token;
        }));
    };
    /**
     * @return {?}
     */
    BasicAuthService.prototype.clearToken = /**
     * @return {?}
     */
    function () {
        this.basicAuthToken = null;
    };
    /**
     * @return {?}
     */
    BasicAuthService.prototype.hasToken = /**
     * @return {?}
     */
    function () {
        return this.basicAuthToken != null;
    };
    /**
     * @return {?}
     */
    BasicAuthService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.basicAuthToken;
    };
    BasicAuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BasicAuthService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return BasicAuthService;
}());
export { BasicAuthService };
if (false) {
    /** @type {?} */
    BasicAuthService.prototype.basicAuthToken;
    /** @type {?} */
    BasicAuthService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2Jhc2ljLWF1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFPbkMsMEJBQ1U7UUFBQSxTQUFJLEdBQUosSUFBSTtLQUNUOzs7Ozs7O0lBRUUsK0JBQUk7Ozs7OztjQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxHQUFXOzs7UUFDekQsSUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDOztRQUN6RCxJQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO2FBQ25DLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkLENBQUMsQ0FDSCxDQUFDOzs7OztJQUdDLHFDQUFVOzs7O1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Ozs7O0lBR3RCLG1DQUFROzs7O1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDOzs7OztJQUc5QixtQ0FBUTs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDOzs7Z0JBOUI5QixVQUFVOzs7O2dCQUxGLFVBQVU7OzJCQUFuQjs7U0FNYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljQXV0aFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYmFzaWNBdXRoVG9rZW46IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICBwdWJsaWMgYXV0aCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7IGhlYWRlcnMgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmJhc2ljQXV0aFRva2VuID0gdG9rZW47XG4gICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclRva2VuKCk6IHZvaWQge1xuICAgIHRoaXMuYmFzaWNBdXRoVG9rZW4gPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGhhc1Rva2VuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJhc2ljQXV0aFRva2VuICE9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0VG9rZW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5iYXNpY0F1dGhUb2tlbjtcbiAgfVxuXG59XG4iXX0=
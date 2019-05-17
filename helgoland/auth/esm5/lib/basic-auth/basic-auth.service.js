/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
/**
 * Maintains all basic auth tokens and also do the authentication process.
 */
var BasicAuthService = /** @class */ (function () {
    function BasicAuthService(http) {
        this.http = http;
        this.basicAuthTokens = new Map();
    }
    /**
     * Do the authentication.
     * @param {?} username
     * @param {?} password
     * @param {?} url
     * @return {?}
     */
    BasicAuthService.prototype.auth = /**
     * Do the authentication.
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
            _this.basicAuthTokens.set(url, token);
            return token;
        }));
    };
    /**
     * Removes existing token.
     * @param {?} url
     * @return {?}
     */
    BasicAuthService.prototype.clearToken = /**
     * Removes existing token.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this.basicAuthTokens.has(url)) {
            this.basicAuthTokens.delete(url);
        }
    };
    /**
     * Checks if a token exists.
     * @param {?} url
     * @return {?}
     */
    BasicAuthService.prototype.hasToken = /**
     * Checks if a token exists.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.basicAuthTokens.has(url);
    };
    /**
     * Gets the token for the given service url.
     * @param {?} url
     * @return {?}
     */
    BasicAuthService.prototype.getToken = /**
     * Gets the token for the given service url.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.basicAuthTokens.has(url) ? this.basicAuthTokens.get(url) : null;
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
    BasicAuthService.prototype.basicAuthTokens;
    /** @type {?} */
    BasicAuthService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztJQVVuQywwQkFDVTtRQUFBLFNBQUksR0FBSixJQUFJOytCQUhpQyxJQUFJLEdBQUcsRUFBRTtLQUluRDs7Ozs7Ozs7SUFLRSwrQkFBSTs7Ozs7OztjQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxHQUFXOzs7UUFDekQsSUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDOztRQUN6RCxJQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO2FBQ25DLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZCxDQUFDLENBQ0gsQ0FBQzs7Ozs7OztJQU1DLHFDQUFVOzs7OztjQUFDLEdBQVc7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDOzs7Ozs7O0lBTUksbUNBQVE7Ozs7O2NBQUMsR0FBVztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7SUFNaEMsbUNBQVE7Ozs7O2NBQUMsR0FBVztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7OztnQkE1Qy9FLFVBQVU7Ozs7Z0JBUkYsVUFBVTs7MkJBQW5COztTQVNhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIE1haW50YWlucyBhbGwgYmFzaWMgYXV0aCB0b2tlbnMgYW5kIGFsc28gZG8gdGhlIGF1dGhlbnRpY2F0aW9uIHByb2Nlc3MuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhTZXJ2aWNlIHtcblxuICBwcml2YXRlIGJhc2ljQXV0aFRva2VuczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICAvKipcbiAgICogRG8gdGhlIGF1dGhlbnRpY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGF1dGgodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRva2VuID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6IHRva2VuIH0pO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5iYXNpY0F1dGhUb2tlbnMuc2V0KHVybCwgdG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBleGlzdGluZyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBjbGVhclRva2VuKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpKSB7XG4gICAgICB0aGlzLmJhc2ljQXV0aFRva2Vucy5kZWxldGUodXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgdG9rZW4gZXhpc3RzLlxuICAgKi9cbiAgcHVibGljIGhhc1Rva2VuKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRva2VuIGZvciB0aGUgZ2l2ZW4gc2VydmljZSB1cmwuXG4gICAqL1xuICBwdWJsaWMgZ2V0VG9rZW4odXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmJhc2ljQXV0aFRva2Vucy5oYXModXJsKSA/IHRoaXMuYmFzaWNBdXRoVG9rZW5zLmdldCh1cmwpIDogbnVsbDtcbiAgfVxuXG59XG4iXX0=
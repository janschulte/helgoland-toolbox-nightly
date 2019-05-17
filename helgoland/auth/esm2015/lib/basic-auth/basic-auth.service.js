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
export class BasicAuthService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
    auth(username, password, url) {
        /** @type {?} */
        const token = 'Basic ' + btoa(username + ':' + password);
        /** @type {?} */
        const headers = new HttpHeaders({ 'Authorization': token });
        return this.http.get(url, { headers })
            .pipe(map(res => {
            this.basicAuthTokens.set(url, token);
            return token;
        }));
    }
    /**
     * Removes existing token.
     * @param {?} url
     * @return {?}
     */
    clearToken(url) {
        if (this.basicAuthTokens.has(url)) {
            this.basicAuthTokens.delete(url);
        }
    }
    /**
     * Checks if a token exists.
     * @param {?} url
     * @return {?}
     */
    hasToken(url) {
        return this.basicAuthTokens.has(url);
    }
    /**
     * Gets the token for the given service url.
     * @param {?} url
     * @return {?}
     */
    getToken(url) {
        return this.basicAuthTokens.has(url) ? this.basicAuthTokens.get(url) : null;
    }
}
BasicAuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BasicAuthService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /** @type {?} */
    BasicAuthService.prototype.basicAuthTokens;
    /** @type {?} */
    BasicAuthService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTXJDLE1BQU07Ozs7SUFJSixZQUNVO1FBQUEsU0FBSSxHQUFKLElBQUk7K0JBSGlDLElBQUksR0FBRyxFQUFFO0tBSW5EOzs7Ozs7OztJQUtFLElBQUksQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsR0FBVzs7UUFDekQsTUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDOztRQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNuQyxJQUFJLENBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZCxDQUFDLENBQ0gsQ0FBQzs7Ozs7OztJQU1DLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQzs7Ozs7OztJQU1JLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztJQU1oQyxRQUFRLENBQUMsR0FBVztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7WUE1Qy9FLFVBQVU7Ozs7WUFSRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogTWFpbnRhaW5zIGFsbCBiYXNpYyBhdXRoIHRva2VucyBhbmQgYWxzbyBkbyB0aGUgYXV0aGVudGljYXRpb24gcHJvY2Vzcy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljQXV0aFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYmFzaWNBdXRoVG9rZW5zOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBEbyB0aGUgYXV0aGVudGljYXRpb24uXG4gICAqL1xuICBwdWJsaWMgYXV0aCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7IGhlYWRlcnMgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmJhc2ljQXV0aFRva2Vucy5zZXQodXJsLCB0b2tlbik7XG4gICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV4aXN0aW5nIHRva2VuLlxuICAgKi9cbiAgcHVibGljIGNsZWFyVG9rZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5iYXNpY0F1dGhUb2tlbnMuaGFzKHVybCkpIHtcbiAgICAgIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmRlbGV0ZSh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSB0b2tlbiBleGlzdHMuXG4gICAqL1xuICBwdWJsaWMgaGFzVG9rZW4odXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5iYXNpY0F1dGhUb2tlbnMuaGFzKHVybCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdG9rZW4gZm9yIHRoZSBnaXZlbiBzZXJ2aWNlIHVybC5cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbih1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpID8gdGhpcy5iYXNpY0F1dGhUb2tlbnMuZ2V0KHVybCkgOiBudWxsO1xuICB9XG5cbn1cbiJdfQ==
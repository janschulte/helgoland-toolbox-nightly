import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { map } from 'rxjs/operators';
import { SettingsService, HTTP_SERVICE_INTERCEPTORS } from '@helgoland/core';
import { Observable } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Maintains all basic auth tokens and also do the authentication process.
 */
class BasicAuthService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This service maintaines all service urls which are secured with basic auth. The service is used to check for every servie url if it is necessary to work with basic auth. It is possible to
 * register a url and it also checks every dataset url in the settings.
 */
class BasicAuthServiceMaintainer {
    /**
     * @param {?} settingsService
     */
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.services = [];
    }
    /**
     * Register an additional service url, which is secured with basic auth.
     * @param {?} url
     * @return {?}
     */
    registerService(url) {
        if (this.services.indexOf(url) === -1) {
            this.services.push(url);
        }
    }
    /**
     * Checks if a given url is registered as secured with basic auth.
     * @param {?} url
     * @return {?}
     */
    getCorrespondingService(url) {
        /** @type {?} */
        const matchedUrl = this.services.find(e => url.startsWith(e));
        if (matchedUrl) {
            return matchedUrl;
        }
        /** @type {?} */
        const settings = this.settingsService.getSettings();
        if (settings && settings.datasetApis && Array.isArray(settings.datasetApis)) {
            /** @type {?} */
            const api = settings.datasetApis.find((e) => url.startsWith(e.url) && e.basicAuth);
            if (api) {
                return api.url;
            }
        }
    }
}
BasicAuthServiceMaintainer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BasicAuthServiceMaintainer.ctorParameters = () => [
    { type: SettingsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Interceptor to a basic auth token if needed.
 */
class BasicAuthInterceptorService {
    /**
     * @param {?} settings
     * @param {?} basicAuthServices
     * @param {?} basicAuthSrvc
     * @param {?} receptor
     */
    constructor(settings, basicAuthServices, basicAuthSrvc, receptor) {
        this.settings = settings;
        this.basicAuthServices = basicAuthServices;
        this.basicAuthSrvc = basicAuthSrvc;
        this.receptor = receptor;
    }
    /**
     * @param {?} req
     * @param {?} options
     * @param {?} next
     * @return {?}
     */
    intercept(req, options, next) {
        /** @type {?} */
        const url = this.basicAuthServices.getCorrespondingService(req.url);
        if (url) {
            if (this.basicAuthSrvc.hasToken(url)) {
                req = req.clone({
                    setHeaders: {
                        Authorization: this.basicAuthSrvc.getToken(url)
                    }
                });
                return next.handle(req, options);
            }
            else {
                return new Observable((observer) => {
                    this.receptor.doBasicAuth(url).subscribe(successfully => {
                        if (successfully) {
                            req = req.clone({
                                setHeaders: {
                                    Authorization: this.basicAuthSrvc.getToken(url)
                                }
                            });
                        }
                        next.handle(req, options).subscribe(res => {
                            observer.next(res);
                            if (res instanceof HttpResponse) {
                                observer.complete();
                            }
                        });
                    });
                });
            }
        }
        else {
            return next.handle(req, options);
        }
    }
}
BasicAuthInterceptorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BasicAuthInterceptorService.ctorParameters = () => [
    { type: SettingsService },
    { type: BasicAuthServiceMaintainer },
    { type: BasicAuthService },
    { type: BasicAuthInformer }
];
/**
 * Needs to be implemented to do the authentication for the given url.
 * @abstract
 */
class BasicAuthInformer {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HelgolandBasicAuthModule {
}
HelgolandBasicAuthModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    BasicAuthService,
                    BasicAuthServiceMaintainer,
                    {
                        provide: HTTP_SERVICE_INTERCEPTORS,
                        useClass: BasicAuthInterceptorService,
                        multi: true
                    }
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { BasicAuthService, BasicAuthServiceMaintainer, HelgolandBasicAuthModule, BasicAuthInterceptorService, BasicAuthInformer };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWF1dGguanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvYXV0aC9saWIvYmFzaWMtYXV0aC9iYXNpYy1hdXRoLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvYXV0aC9saWIvYmFzaWMtYXV0aC9iYXNpYy1hdXRoLXNlcnZpY2UtbWFpbnRhaW5lci5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2F1dGgvbGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2F1dGgvbGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogTWFpbnRhaW5zIGFsbCBiYXNpYyBhdXRoIHRva2VucyBhbmQgYWxzbyBkbyB0aGUgYXV0aGVudGljYXRpb24gcHJvY2Vzcy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljQXV0aFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYmFzaWNBdXRoVG9rZW5zOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBEbyB0aGUgYXV0aGVudGljYXRpb24uXG4gICAqL1xuICBwdWJsaWMgYXV0aCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7IGhlYWRlcnMgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmJhc2ljQXV0aFRva2Vucy5zZXQodXJsLCB0b2tlbik7XG4gICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV4aXN0aW5nIHRva2VuLlxuICAgKi9cbiAgcHVibGljIGNsZWFyVG9rZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5iYXNpY0F1dGhUb2tlbnMuaGFzKHVybCkpIHtcbiAgICAgIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmRlbGV0ZSh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSB0b2tlbiBleGlzdHMuXG4gICAqL1xuICBwdWJsaWMgaGFzVG9rZW4odXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5iYXNpY0F1dGhUb2tlbnMuaGFzKHVybCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdG9rZW4gZm9yIHRoZSBnaXZlbiBzZXJ2aWNlIHVybC5cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbih1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpID8gdGhpcy5iYXNpY0F1dGhUb2tlbnMuZ2V0KHVybCkgOiBudWxsO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBtYWludGFpbmVzIGFsbCBzZXJ2aWNlIHVybHMgd2hpY2ggYXJlIHNlY3VyZWQgd2l0aCBiYXNpYyBhdXRoLiBUaGUgc2VydmljZSBpcyB1c2VkIHRvIGNoZWNrIGZvciBldmVyeSBzZXJ2aWUgdXJsIGlmIGl0IGlzIG5lY2Vzc2FyeSB0byB3b3JrIHdpdGggYmFzaWMgYXV0aC4gSXQgaXMgcG9zc2libGUgdG9cbiAqIHJlZ2lzdGVyIGEgdXJsIGFuZCBpdCBhbHNvIGNoZWNrcyBldmVyeSBkYXRhc2V0IHVybCBpbiB0aGUgc2V0dGluZ3MuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lciB7XG5cbiAgcHJpdmF0ZSBzZXJ2aWNlczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGFkZGl0aW9uYWwgc2VydmljZSB1cmwsIHdoaWNoIGlzIHNlY3VyZWQgd2l0aCBiYXNpYyBhdXRoLlxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyU2VydmljZSh1cmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNlcnZpY2VzLmluZGV4T2YodXJsKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuc2VydmljZXMucHVzaCh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBnaXZlbiB1cmwgaXMgcmVnaXN0ZXJlZCBhcyBzZWN1cmVkIHdpdGggYmFzaWMgYXV0aC5cbiAgICovXG4gIHB1YmxpYyBnZXRDb3JyZXNwb25kaW5nU2VydmljZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbWF0Y2hlZFVybCA9IHRoaXMuc2VydmljZXMuZmluZChlID0+IHVybC5zdGFydHNXaXRoKGUpKTtcbiAgICBpZiAobWF0Y2hlZFVybCkge1xuICAgICAgcmV0dXJuIG1hdGNoZWRVcmw7XG4gICAgfVxuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5nc1NlcnZpY2UuZ2V0U2V0dGluZ3MoKTtcbiAgICBpZiAoc2V0dGluZ3MgJiYgc2V0dGluZ3MuZGF0YXNldEFwaXMgJiYgQXJyYXkuaXNBcnJheShzZXR0aW5ncy5kYXRhc2V0QXBpcykpIHtcbiAgICAgIGNvbnN0IGFwaSA9IHNldHRpbmdzLmRhdGFzZXRBcGlzLmZpbmQoKGUpID0+IHVybC5zdGFydHNXaXRoKGUudXJsKSAmJiBlLmJhc2ljQXV0aCk7XG4gICAgICBpZiAoYXBpKSB7XG4gICAgICAgIHJldHVybiBhcGkudXJsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMsIEh0dHBTZXJ2aWNlSGFuZGxlciwgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciwgU2V0dGluZ3MsIFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lciB9IGZyb20gJy4vYmFzaWMtYXV0aC1zZXJ2aWNlLW1haW50YWluZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9iYXNpYy1hdXRoLnNlcnZpY2UnO1xuXG4vKipcbiAqIEludGVyY2VwdG9yIHRvIGEgYmFzaWMgYXV0aCB0b2tlbiBpZiBuZWVkZWQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhJbnRlcmNlcHRvclNlcnZpY2UgaW1wbGVtZW50cyBIdHRwU2VydmljZUludGVyY2VwdG9yIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz4sXG4gICAgcHJvdGVjdGVkIGJhc2ljQXV0aFNlcnZpY2VzOiBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lcixcbiAgICBwcm90ZWN0ZWQgYmFzaWNBdXRoU3J2YzogQmFzaWNBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcmVjZXB0b3I6IEJhc2ljQXV0aEluZm9ybWVyXG4gICkgeyB9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogUGFydGlhbDxIdHRwUmVxdWVzdE9wdGlvbnM+LCBuZXh0OiBIdHRwU2VydmljZUhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNpY0F1dGhTZXJ2aWNlcy5nZXRDb3JyZXNwb25kaW5nU2VydmljZShyZXEudXJsKTtcbiAgICBpZiAodXJsKSB7XG4gICAgICBpZiAodGhpcy5iYXNpY0F1dGhTcnZjLmhhc1Rva2VuKHVybCkpIHtcbiAgICAgICAgcmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB0aGlzLmJhc2ljQXV0aFNydmMuZ2V0VG9rZW4odXJsKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pigob2JzZXJ2ZXI6IE9ic2VydmVyPEh0dHBFdmVudDxhbnk+PikgPT4ge1xuICAgICAgICAgIHRoaXMucmVjZXB0b3IuZG9CYXNpY0F1dGgodXJsKS5zdWJzY3JpYmUoc3VjY2Vzc2Z1bGx5ID0+IHtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzZnVsbHkpIHtcbiAgICAgICAgICAgICAgcmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiB0aGlzLmJhc2ljQXV0aFNydmMuZ2V0VG9rZW4odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0LmhhbmRsZShyZXEsIG9wdGlvbnMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2ljQXV0aENyZWRlbnRpYWxzIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBOZWVkcyB0byBiZSBpbXBsZW1lbnRlZCB0byBkbyB0aGUgYXV0aGVudGljYXRpb24gZm9yIHRoZSBnaXZlbiB1cmwuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNpY0F1dGhJbmZvcm1lciB7XG4gIHB1YmxpYyBhYnN0cmFjdCBkb0Jhc2ljQXV0aCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEJhc2ljQXV0aFNlcnZpY2VNYWludGFpbmVyIH0gZnJvbSAnLi9iYXNpYy1hdXRoLXNlcnZpY2UtbWFpbnRhaW5lci5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2ljQXV0aFNlcnZpY2UgfSBmcm9tICcuL2Jhc2ljLWF1dGguc2VydmljZSc7XG5pbXBvcnQgeyBCYXNpY0F1dGhJbnRlcmNlcHRvclNlcnZpY2UgfSBmcm9tICcuL2Jhc2ljLWF1dGgtaW50ZXJjZXB0b3Iuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEJhc2ljQXV0aFNlcnZpY2UsXG4gICAgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyxcbiAgICAgIHVzZUNsYXNzOiBCYXNpY0F1dGhJbnRlcmNlcHRvclNlcnZpY2UsXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRCYXNpY0F1dGhNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7QUFTQTs7OztJQUlFLFlBQ1U7UUFBQSxTQUFJLEdBQUosSUFBSTsrQkFIaUMsSUFBSSxHQUFHLEVBQUU7S0FJbkQ7Ozs7Ozs7O0lBS0UsSUFBSSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxHQUFXOztRQUN6RCxNQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7O1FBQ3pELE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDNUQsT0FB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
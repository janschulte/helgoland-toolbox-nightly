(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs/operators'), require('@helgoland/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@helgoland/auth', ['exports', '@angular/common/http', '@angular/core', 'rxjs/operators', '@helgoland/core', 'rxjs'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.auth = {}),global.ng.common.http,global.ng.core,global.rxjs.operators,null,global.rxjs));
}(this, (function (exports,http,core,operators,core$1,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Maintains all basic auth tokens and also do the authentication process.
     */
    var BasicAuthService = (function () {
        function BasicAuthService(http$$1) {
            this.http = http$$1;
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
                var headers = new http.HttpHeaders({ 'Authorization': token });
                return this.http.get(url, { headers: headers })
                    .pipe(operators.map(function (res) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BasicAuthService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return BasicAuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This service maintaines all service urls which are secured with basic auth. The service is used to check for every servie url if it is necessary to work with basic auth. It is possible to
     * register a url and it also checks every dataset url in the settings.
     */
    var BasicAuthServiceMaintainer = (function () {
        function BasicAuthServiceMaintainer(settingsService) {
            this.settingsService = settingsService;
            this.services = [];
        }
        /**
         * Register an additional service url, which is secured with basic auth.
         * @param {?} url
         * @return {?}
         */
        BasicAuthServiceMaintainer.prototype.registerService = /**
         * Register an additional service url, which is secured with basic auth.
         * @param {?} url
         * @return {?}
         */
            function (url) {
                if (this.services.indexOf(url) === -1) {
                    this.services.push(url);
                }
            };
        /**
         * Checks if a given url is registered as secured with basic auth.
         * @param {?} url
         * @return {?}
         */
        BasicAuthServiceMaintainer.prototype.getCorrespondingService = /**
         * Checks if a given url is registered as secured with basic auth.
         * @param {?} url
         * @return {?}
         */
            function (url) {
                /** @type {?} */
                var matchedUrl = this.services.find(function (e) { return url.startsWith(e); });
                if (matchedUrl) {
                    return matchedUrl;
                }
                /** @type {?} */
                var settings = this.settingsService.getSettings();
                if (settings && settings.datasetApis && Array.isArray(settings.datasetApis)) {
                    /** @type {?} */
                    var api = settings.datasetApis.find(function (e) { return url.startsWith(e.url) && e.basicAuth; });
                    if (api) {
                        return api.url;
                    }
                }
            };
        BasicAuthServiceMaintainer.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BasicAuthServiceMaintainer.ctorParameters = function () {
            return [
                { type: core$1.SettingsService }
            ];
        };
        return BasicAuthServiceMaintainer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Interceptor to a basic auth token if needed.
     */
    var BasicAuthInterceptorService = (function () {
        function BasicAuthInterceptorService(settings, basicAuthServices, basicAuthSrvc, receptor) {
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
        BasicAuthInterceptorService.prototype.intercept = /**
         * @param {?} req
         * @param {?} options
         * @param {?} next
         * @return {?}
         */
            function (req, options, next) {
                var _this = this;
                /** @type {?} */
                var url = this.basicAuthServices.getCorrespondingService(req.url);
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
                        return new rxjs.Observable(function (observer) {
                            _this.receptor.doBasicAuth(url).subscribe(function (successfully) {
                                if (successfully) {
                                    req = req.clone({
                                        setHeaders: {
                                            Authorization: _this.basicAuthSrvc.getToken(url)
                                        }
                                    });
                                }
                                next.handle(req, options).subscribe(function (res) {
                                    observer.next(res);
                                    if (res instanceof http.HttpResponse) {
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
            };
        BasicAuthInterceptorService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BasicAuthInterceptorService.ctorParameters = function () {
            return [
                { type: core$1.SettingsService },
                { type: BasicAuthServiceMaintainer },
                { type: BasicAuthService },
                { type: BasicAuthInformer }
            ];
        };
        return BasicAuthInterceptorService;
    }());
    /**
     * Needs to be implemented to do the authentication for the given url.
     * @abstract
     */
    var /**
     * Needs to be implemented to do the authentication for the given url.
     * @abstract
     */ BasicAuthInformer = (function () {
        function BasicAuthInformer() {
        }
        return BasicAuthInformer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandBasicAuthModule = (function () {
        function HelgolandBasicAuthModule() {
        }
        HelgolandBasicAuthModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            BasicAuthService,
                            BasicAuthServiceMaintainer,
                            {
                                provide: core$1.HTTP_SERVICE_INTERCEPTORS,
                                useClass: BasicAuthInterceptorService,
                                multi: true
                            }
                        ]
                    },] },
        ];
        return HelgolandBasicAuthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.BasicAuthService = BasicAuthService;
    exports.BasicAuthServiceMaintainer = BasicAuthServiceMaintainer;
    exports.HelgolandBasicAuthModule = HelgolandBasicAuthModule;
    exports.BasicAuthInterceptorService = BasicAuthInterceptorService;
    exports.BasicAuthInformer = BasicAuthInformer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWF1dGgudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2F1dGgvbGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2F1dGgvbGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC1zZXJ2aWNlLW1haW50YWluZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9hdXRoL2xpYi9iYXNpYy1hdXRoL2Jhc2ljLWF1dGgtaW50ZXJjZXB0b3Iuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9hdXRoL2xpYi9iYXNpYy1hdXRoL2Jhc2ljLWF1dGgubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIE1haW50YWlucyBhbGwgYmFzaWMgYXV0aCB0b2tlbnMgYW5kIGFsc28gZG8gdGhlIGF1dGhlbnRpY2F0aW9uIHByb2Nlc3MuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhTZXJ2aWNlIHtcblxuICBwcml2YXRlIGJhc2ljQXV0aFRva2VuczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICAvKipcbiAgICogRG8gdGhlIGF1dGhlbnRpY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGF1dGgodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRva2VuID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6IHRva2VuIH0pO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5iYXNpY0F1dGhUb2tlbnMuc2V0KHVybCwgdG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBleGlzdGluZyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBjbGVhclRva2VuKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpKSB7XG4gICAgICB0aGlzLmJhc2ljQXV0aFRva2Vucy5kZWxldGUodXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgdG9rZW4gZXhpc3RzLlxuICAgKi9cbiAgcHVibGljIGhhc1Rva2VuKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzaWNBdXRoVG9rZW5zLmhhcyh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRva2VuIGZvciB0aGUgZ2l2ZW4gc2VydmljZSB1cmwuXG4gICAqL1xuICBwdWJsaWMgZ2V0VG9rZW4odXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmJhc2ljQXV0aFRva2Vucy5oYXModXJsKSA/IHRoaXMuYmFzaWNBdXRoVG9rZW5zLmdldCh1cmwpIDogbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgbWFpbnRhaW5lcyBhbGwgc2VydmljZSB1cmxzIHdoaWNoIGFyZSBzZWN1cmVkIHdpdGggYmFzaWMgYXV0aC4gVGhlIHNlcnZpY2UgaXMgdXNlZCB0byBjaGVjayBmb3IgZXZlcnkgc2VydmllIHVybCBpZiBpdCBpcyBuZWNlc3NhcnkgdG8gd29yayB3aXRoIGJhc2ljIGF1dGguIEl0IGlzIHBvc3NpYmxlIHRvXG4gKiByZWdpc3RlciBhIHVybCBhbmQgaXQgYWxzbyBjaGVja3MgZXZlcnkgZGF0YXNldCB1cmwgaW4gdGhlIHNldHRpbmdzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIge1xuXG4gIHByaXZhdGUgc2VydmljZXM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzU2VydmljZTogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBhZGRpdGlvbmFsIHNlcnZpY2UgdXJsLCB3aGljaCBpcyBzZWN1cmVkIHdpdGggYmFzaWMgYXV0aC5cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlclNlcnZpY2UodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlcy5pbmRleE9mKHVybCkgPT09IC0xKSB7XG4gICAgICB0aGlzLnNlcnZpY2VzLnB1c2godXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4gdXJsIGlzIHJlZ2lzdGVyZWQgYXMgc2VjdXJlZCB3aXRoIGJhc2ljIGF1dGguXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29ycmVzcG9uZGluZ1NlcnZpY2UodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG1hdGNoZWRVcmwgPSB0aGlzLnNlcnZpY2VzLmZpbmQoZSA9PiB1cmwuc3RhcnRzV2l0aChlKSk7XG4gICAgaWYgKG1hdGNoZWRVcmwpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkVXJsO1xuICAgIH1cbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3NTZXJ2aWNlLmdldFNldHRpbmdzKCk7XG4gICAgaWYgKHNldHRpbmdzICYmIHNldHRpbmdzLmRhdGFzZXRBcGlzICYmIEFycmF5LmlzQXJyYXkoc2V0dGluZ3MuZGF0YXNldEFwaXMpKSB7XG4gICAgICBjb25zdCBhcGkgPSBzZXR0aW5ncy5kYXRhc2V0QXBpcy5maW5kKChlKSA9PiB1cmwuc3RhcnRzV2l0aChlLnVybCkgJiYgZS5iYXNpY0F1dGgpO1xuICAgICAgaWYgKGFwaSkge1xuICAgICAgICByZXR1cm4gYXBpLnVybDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zLCBIdHRwU2VydmljZUhhbmRsZXIsIEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3IsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIgfSBmcm9tICcuL2Jhc2ljLWF1dGgtc2VydmljZS1tYWludGFpbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZSB9IGZyb20gJy4vYmFzaWMtYXV0aC5zZXJ2aWNlJztcblxuLyoqXG4gKiBJbnRlcmNlcHRvciB0byBhIGJhc2ljIGF1dGggdG9rZW4gaWYgbmVlZGVkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+LFxuICAgIHByb3RlY3RlZCBiYXNpY0F1dGhTZXJ2aWNlczogQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIsXG4gICAgcHJvdGVjdGVkIGJhc2ljQXV0aFNydmM6IEJhc2ljQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlY2VwdG9yOiBCYXNpY0F1dGhJbmZvcm1lclxuICApIHsgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG9wdGlvbnM6IFBhcnRpYWw8SHR0cFJlcXVlc3RPcHRpb25zPiwgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzaWNBdXRoU2VydmljZXMuZ2V0Q29ycmVzcG9uZGluZ1NlcnZpY2UocmVxLnVybCk7XG4gICAgaWYgKHVybCkge1xuICAgICAgaWYgKHRoaXMuYmFzaWNBdXRoU3J2Yy5oYXNUb2tlbih1cmwpKSB7XG4gICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4oKG9ic2VydmVyOiBPYnNlcnZlcjxIdHRwRXZlbnQ8YW55Pj4pID0+IHtcbiAgICAgICAgICB0aGlzLnJlY2VwdG9yLmRvQmFzaWNBdXRoKHVybCkuc3Vic2NyaWJlKHN1Y2Nlc3NmdWxseSA9PiB7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bGx5KSB7XG4gICAgICAgICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNpY0F1dGhDcmVkZW50aWFscyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogTmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgdG8gZG8gdGhlIGF1dGhlbnRpY2F0aW9uIGZvciB0aGUgZ2l2ZW4gdXJsLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzaWNBdXRoSW5mb3JtZXIge1xuICBwdWJsaWMgYWJzdHJhY3QgZG9CYXNpY0F1dGgodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lciB9IGZyb20gJy4vYmFzaWMtYXV0aC1zZXJ2aWNlLW1haW50YWluZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9iYXNpYy1hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlIH0gZnJvbSAnLi9iYXNpYy1hdXRoLWludGVyY2VwdG9yLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCYXNpY0F1dGhTZXJ2aWNlLFxuICAgIEJhc2ljQXV0aFNlcnZpY2VNYWludGFpbmVyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kQmFzaWNBdXRoTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImh0dHAiLCJIdHRwSGVhZGVycyIsIm1hcCIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiU2V0dGluZ3NTZXJ2aWNlIiwiT2JzZXJ2YWJsZSIsIkh0dHBSZXNwb25zZSIsIk5nTW9kdWxlIiwiSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O1FBYUUsMEJBQ1VBO1lBQUEsU0FBSSxHQUFKQSxPQUFJO21DQUhpQyxJQUFJLEdBQUcsRUFBRTtTQUluRDs7Ozs7Ozs7UUFLRSwrQkFBSTs7Ozs7OztzQkFBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsR0FBVzs7O2dCQUN6RCxJQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7O2dCQUN6RCxJQUFNLE9BQU8sR0FBRyxJQUFJQyxnQkFBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQztxQkFDbkMsSUFBSSxDQUNIQyxhQUFHLENBQUMsVUFBQSxHQUFHO29CQUNMLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckMsT0FBTyxLQUFLLENBQUM7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Ozs7Ozs7UUFNQyxxQ0FBVTs7Ozs7c0JBQUMsR0FBVztnQkFDM0IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xDOzs7Ozs7O1FBTUksbUNBQVE7Ozs7O3NCQUFDLEdBQVc7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7UUFNaEMsbUNBQVE7Ozs7O3NCQUFDLEdBQVc7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7b0JBNUMvRUMsZUFBVTs7Ozs7d0JBUkZDLGVBQVU7OzsrQkFBbkI7Ozs7Ozs7QUNBQTs7Ozs7UUFZRSxvQ0FDWSxlQUEwQztZQUExQyxvQkFBZSxHQUFmLGVBQWUsQ0FBMkI7NEJBSHpCLEVBQUU7U0FJMUI7Ozs7OztRQUtFLG9EQUFlOzs7OztzQkFBQyxHQUFXO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekI7Ozs7Ozs7UUFNSSw0REFBdUI7Ozs7O3NCQUFDLEdBQVc7O2dCQUN4QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxPQUFPLFVBQVUsQ0FBQztpQkFDbkI7O2dCQUNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7O29CQUMzRSxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUEsQ0FBQyxDQUFDO29CQUNuRixJQUFJLEdBQUcsRUFBRTt3QkFDUCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7cUJBQ2hCO2lCQUNGOzs7b0JBaENKRCxlQUFVOzs7Ozt3QkFOUUUsc0JBQWU7Ozt5Q0FEbEM7Ozs7Ozs7QUNBQTs7OztRQWNFLHFDQUNZLFFBQW1DLEVBQ25DLGlCQUE2QyxFQUM3QyxhQUErQixFQUMvQixRQUEyQjtZQUgzQixhQUFRLEdBQVIsUUFBUSxDQUEyQjtZQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTRCO1lBQzdDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtZQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtTQUNsQzs7Ozs7OztRQUVMLCtDQUFTOzs7Ozs7WUFBVCxVQUFVLEdBQXFCLEVBQUUsT0FBb0MsRUFBRSxJQUF3QjtnQkFBL0YsaUJBZ0NDOztnQkEvQkMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDcEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7NEJBQ2QsVUFBVSxFQUFFO2dDQUNWLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7NkJBQ2hEO3lCQUNGLENBQUMsQ0FBQzt3QkFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUNsQzt5QkFBTTt3QkFDTCxPQUFPLElBQUlDLGVBQVUsQ0FBaUIsVUFBQyxRQUFrQzs0QkFDdkUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsWUFBWTtnQ0FDbkQsSUFBSSxZQUFZLEVBQUU7b0NBQ2hCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO3dDQUNkLFVBQVUsRUFBRTs0Q0FDVixhQUFhLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3lDQUNoRDtxQ0FDRixDQUFDLENBQUM7aUNBQ0o7Z0NBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztvQ0FDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDbkIsSUFBSSxHQUFHLFlBQVlDLGlCQUFZLEVBQUU7d0NBQy9CLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQ0FDckI7aUNBQ0YsQ0FBQyxDQUFDOzZCQUNKLENBQUMsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ0o7aUJBQ0Y7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDbEM7YUFDRjs7b0JBMUNGSixlQUFVOzs7Ozt3QkFUd0VFLHNCQUFlO3dCQUd6RiwwQkFBMEI7d0JBQzFCLGdCQUFnQjt3QkFZRCxpQkFBaUI7OzswQ0FsQnpDOzs7Ozs7QUFnRUE7OztRQUFBOzs7Z0NBaEVBO1FBa0VDOzs7Ozs7QUNsRUQ7Ozs7b0JBT0NHLGFBQVEsU0FBQzt3QkFDUixTQUFTLEVBQUU7NEJBQ1QsZ0JBQWdCOzRCQUNoQiwwQkFBMEI7NEJBQzFCO2dDQUNFLE9BQU8sRUFBRUMsZ0NBQXlCO2dDQUNsQyxRQUFRLEVBQUUsMkJBQTJCO2dDQUNyQyxLQUFLLEVBQUUsSUFBSTs2QkFDWjt5QkFDRjtxQkFDRjs7dUNBakJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
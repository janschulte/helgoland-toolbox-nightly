/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '@helgoland/core';
import { Observable } from 'rxjs';
import { BasicAuthServiceMaintainer } from './basic-auth-service-maintainer.service';
import { BasicAuthService } from './basic-auth.service';
/**
 * Interceptor to a basic auth token if needed.
 */
var BasicAuthInterceptorService = /** @class */ (function () {
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
                return new Observable(function (observer) {
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
    };
    BasicAuthInterceptorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BasicAuthInterceptorService.ctorParameters = function () { return [
        { type: SettingsService },
        { type: BasicAuthServiceMaintainer },
        { type: BasicAuthService },
        { type: BasicAuthInformer }
    ]; };
    return BasicAuthInterceptorService;
}());
export { BasicAuthInterceptorService };
if (false) {
    /** @type {?} */
    BasicAuthInterceptorService.prototype.settings;
    /** @type {?} */
    BasicAuthInterceptorService.prototype.basicAuthServices;
    /** @type {?} */
    BasicAuthInterceptorService.prototype.basicAuthSrvc;
    /** @type {?} */
    BasicAuthInterceptorService.prototype.receptor;
}
/**
 * @record
 */
export function BasicAuthCredentials() { }
/** @type {?} */
BasicAuthCredentials.prototype.username;
/** @type {?} */
BasicAuthCredentials.prototype.password;
/**
 * Needs to be implemented to do the authentication for the given url.
 * @abstract
 */
var /**
 * Needs to be implemented to do the authentication for the given url.
 * @abstract
 */
BasicAuthInformer = /** @class */ (function () {
    function BasicAuthInformer() {
    }
    return BasicAuthInformer;
}());
/**
 * Needs to be implemented to do the authentication for the given url.
 * @abstract
 */
export { BasicAuthInformer };
if (false) {
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    BasicAuthInformer.prototype.doBasicAuth = function (url) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTBCLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE0RSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1SCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztJQVF0RCxxQ0FDWSxRQUFtQyxFQUNuQyxpQkFBNkMsRUFDN0MsYUFBK0IsRUFDL0IsUUFBMkI7UUFIM0IsYUFBUSxHQUFSLFFBQVEsQ0FBMkI7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE0QjtRQUM3QyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7S0FDbEM7Ozs7Ozs7SUFFTCwrQ0FBUzs7Ozs7O0lBQVQsVUFBVSxHQUFxQixFQUFFLE9BQW9DLEVBQUUsSUFBd0I7UUFBL0YsaUJBZ0NDOztRQS9CQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNkLFVBQVUsRUFBRTt3QkFDVixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUNoRDtpQkFDRixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksVUFBVSxDQUFpQixVQUFDLFFBQWtDO29CQUN2RSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxZQUFZO3dCQUNuRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDZCxVQUFVLEVBQUU7b0NBQ1YsYUFBYSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztpQ0FDaEQ7NkJBQ0YsQ0FBQyxDQUFDO3lCQUNKO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7NEJBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dDQUNoQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQ3JCO3lCQUNGLENBQUMsQ0FBQztxQkFDSixDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7O2dCQTFDRixVQUFVOzs7O2dCQVR3RSxlQUFlO2dCQUd6RiwwQkFBMEI7Z0JBQzFCLGdCQUFnQjtnQkFZRCxpQkFBaUI7O3NDQWxCekM7O1NBWWEsMkJBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9EeEM7Ozs7QUFBQTs7OzRCQWhFQTtJQWtFQyxDQUFBOzs7OztBQUZELDZCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zLCBIdHRwU2VydmljZUhhbmRsZXIsIEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3IsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIgfSBmcm9tICcuL2Jhc2ljLWF1dGgtc2VydmljZS1tYWludGFpbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZSB9IGZyb20gJy4vYmFzaWMtYXV0aC5zZXJ2aWNlJztcblxuLyoqXG4gKiBJbnRlcmNlcHRvciB0byBhIGJhc2ljIGF1dGggdG9rZW4gaWYgbmVlZGVkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+LFxuICAgIHByb3RlY3RlZCBiYXNpY0F1dGhTZXJ2aWNlczogQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIsXG4gICAgcHJvdGVjdGVkIGJhc2ljQXV0aFNydmM6IEJhc2ljQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlY2VwdG9yOiBCYXNpY0F1dGhJbmZvcm1lclxuICApIHsgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG9wdGlvbnM6IFBhcnRpYWw8SHR0cFJlcXVlc3RPcHRpb25zPiwgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzaWNBdXRoU2VydmljZXMuZ2V0Q29ycmVzcG9uZGluZ1NlcnZpY2UocmVxLnVybCk7XG4gICAgaWYgKHVybCkge1xuICAgICAgaWYgKHRoaXMuYmFzaWNBdXRoU3J2Yy5oYXNUb2tlbih1cmwpKSB7XG4gICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4oKG9ic2VydmVyOiBPYnNlcnZlcjxIdHRwRXZlbnQ8YW55Pj4pID0+IHtcbiAgICAgICAgICB0aGlzLnJlY2VwdG9yLmRvQmFzaWNBdXRoKHVybCkuc3Vic2NyaWJlKHN1Y2Nlc3NmdWxseSA9PiB7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bGx5KSB7XG4gICAgICAgICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNpY0F1dGhDcmVkZW50aWFscyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogTmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgdG8gZG8gdGhlIGF1dGhlbnRpY2F0aW9uIGZvciB0aGUgZ2l2ZW4gdXJsLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzaWNBdXRoSW5mb3JtZXIge1xuICBwdWJsaWMgYWJzdHJhY3QgZG9CYXNpY0F1dGgodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIl19
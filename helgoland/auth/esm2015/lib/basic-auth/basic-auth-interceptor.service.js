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
export class BasicAuthInterceptorService {
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
export class BasicAuthInformer {
}
if (false) {
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    BasicAuthInformer.prototype.doBasicAuth = function (url) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2Jhc2ljLWF1dGgvYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTBCLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE0RSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1SCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBTXhELE1BQU07Ozs7Ozs7SUFFSixZQUNZLFFBQW1DLEVBQ25DLGlCQUE2QyxFQUM3QyxhQUErQixFQUMvQixRQUEyQjtRQUgzQixhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTRCO1FBQzdDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtLQUNsQzs7Ozs7OztJQUVMLFNBQVMsQ0FBQyxHQUFxQixFQUFFLE9BQW9DLEVBQUUsSUFBd0I7O1FBQzdGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7cUJBQ2hEO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDbEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxVQUFVLENBQWlCLENBQUMsUUFBa0MsRUFBRSxFQUFFO29CQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3RELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dDQUNkLFVBQVUsRUFBRTtvQ0FDVixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2lDQUNoRDs2QkFDRixDQUFDLENBQUM7eUJBQ0o7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzZCQUNyQjt5QkFDRixDQUFDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsQztLQUNGOzs7WUExQ0YsVUFBVTs7OztZQVR3RSxlQUFlO1lBR3pGLDBCQUEwQjtZQUMxQixnQkFBZ0I7WUFZRCxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThDekMsTUFBTTtDQUVMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zLCBIdHRwU2VydmljZUhhbmRsZXIsIEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3IsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIgfSBmcm9tICcuL2Jhc2ljLWF1dGgtc2VydmljZS1tYWludGFpbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZSB9IGZyb20gJy4vYmFzaWMtYXV0aC5zZXJ2aWNlJztcblxuLyoqXG4gKiBJbnRlcmNlcHRvciB0byBhIGJhc2ljIGF1dGggdG9rZW4gaWYgbmVlZGVkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+LFxuICAgIHByb3RlY3RlZCBiYXNpY0F1dGhTZXJ2aWNlczogQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIsXG4gICAgcHJvdGVjdGVkIGJhc2ljQXV0aFNydmM6IEJhc2ljQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlY2VwdG9yOiBCYXNpY0F1dGhJbmZvcm1lclxuICApIHsgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG9wdGlvbnM6IFBhcnRpYWw8SHR0cFJlcXVlc3RPcHRpb25zPiwgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzaWNBdXRoU2VydmljZXMuZ2V0Q29ycmVzcG9uZGluZ1NlcnZpY2UocmVxLnVybCk7XG4gICAgaWYgKHVybCkge1xuICAgICAgaWYgKHRoaXMuYmFzaWNBdXRoU3J2Yy5oYXNUb2tlbih1cmwpKSB7XG4gICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4oKG9ic2VydmVyOiBPYnNlcnZlcjxIdHRwRXZlbnQ8YW55Pj4pID0+IHtcbiAgICAgICAgICB0aGlzLnJlY2VwdG9yLmRvQmFzaWNBdXRoKHVybCkuc3Vic2NyaWJlKHN1Y2Nlc3NmdWxseSA9PiB7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bGx5KSB7XG4gICAgICAgICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdGhpcy5iYXNpY0F1dGhTcnZjLmdldFRva2VuKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNpY0F1dGhDcmVkZW50aWFscyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogTmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgdG8gZG8gdGhlIGF1dGhlbnRpY2F0aW9uIGZvciB0aGUgZ2l2ZW4gdXJsLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzaWNBdXRoSW5mb3JtZXIge1xuICBwdWJsaWMgYWJzdHJhY3QgZG9CYXNpY0F1dGgodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIl19
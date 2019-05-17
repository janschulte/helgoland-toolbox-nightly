/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DatasetApiInterface } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
var ServiceSelectorService = /** @class */ (function () {
    function ServiceSelectorService(apiInterface) {
        this.apiInterface = apiInterface;
    }
    /**
     * @param {?} url
     * @param {?} blacklist
     * @param {?} filter
     * @return {?}
     */
    ServiceSelectorService.prototype.fetchServicesOfAPI = /**
     * @param {?} url
     * @param {?} blacklist
     * @param {?} filter
     * @return {?}
     */
    function (url, blacklist, filter) {
        var _this = this;
        return new Observable(function (observer) {
            _this.apiInterface.getServices(url, filter)
                .subscribe(function (services) {
                if (services && services instanceof Array) {
                    /** @type {?} */
                    var usableServices = services.map(function (service) {
                        if (!_this.isServiceBlacklisted(service.id, url, blacklist)) {
                            return service;
                        }
                    });
                    observer.next(usableServices);
                    observer.complete();
                }
            }, function (error) {
                observer.error(error);
                observer.complete();
            });
        });
    };
    /**
     * @param {?} serviceID
     * @param {?} url
     * @param {?} blacklist
     * @return {?}
     */
    ServiceSelectorService.prototype.isServiceBlacklisted = /**
     * @param {?} serviceID
     * @param {?} url
     * @param {?} blacklist
     * @return {?}
     */
    function (serviceID, url, blacklist) {
        /** @type {?} */
        var isBlacklisted = false;
        blacklist.forEach(function (entry) {
            if (entry.serviceId === serviceID && entry.apiUrl === url) {
                isBlacklisted = true;
            }
        });
        return isBlacklisted;
    };
    ServiceSelectorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServiceSelectorService.ctorParameters = function () { return [
        { type: DatasetApiInterface }
    ]; };
    return ServiceSelectorService;
}());
export { ServiceSelectorService };
if (false) {
    /** @type {?} */
    ServiceSelectorService.prototype.apiInterface;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBTXpDLGdDQUNjLFlBQWlDO1FBQWpDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtLQUMxQzs7Ozs7OztJQUVFLG1EQUFrQjs7Ozs7O2NBQ3JCLEdBQVcsRUFDWCxTQUErQixFQUMvQixNQUF1Qjs7UUFFdkIsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFZLFVBQUMsUUFBNkI7WUFDM0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztpQkFDckMsU0FBUyxDQUNOLFVBQUMsUUFBUTtnQkFDTCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7O29CQUN4QyxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTzt3QkFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RCxNQUFNLENBQUMsT0FBTyxDQUFDO3lCQUNsQjtxQkFDSixDQUFDLENBQUM7b0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDOUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUN2QjthQUNKLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QixDQUFDLENBQUM7U0FDZCxDQUFDLENBQUM7Ozs7Ozs7O0lBR0MscURBQW9COzs7Ozs7Y0FBQyxTQUFpQixFQUFFLEdBQVcsRUFBRSxTQUErQjs7UUFDeEYsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsYUFBYSxHQUFHLElBQUksQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUM7OztnQkF4QzVCLFVBQVU7Ozs7Z0JBUEYsbUJBQW1COztpQ0FENUI7O1NBU2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IEJsYWNrbGlzdGVkU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZVNlbGVjdG9yU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZmV0Y2hTZXJ2aWNlc09mQVBJKFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgYmxhY2tsaXN0OiBCbGFja2xpc3RlZFNlcnZpY2VbXSxcbiAgICAgICAgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXJcbiAgICApOiBPYnNlcnZhYmxlPFNlcnZpY2VbXT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8U2VydmljZVtdPigob2JzZXJ2ZXI6IE9ic2VydmVyPFNlcnZpY2VbXT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFNlcnZpY2VzKHVybCwgZmlsdGVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChzZXJ2aWNlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VzICYmIHNlcnZpY2VzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2FibGVTZXJ2aWNlcyA9IHNlcnZpY2VzLm1hcCgoc2VydmljZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZXJ2aWNlQmxhY2tsaXN0ZWQoc2VydmljZS5pZCwgdXJsLCBibGFja2xpc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodXNhYmxlU2VydmljZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTZXJ2aWNlQmxhY2tsaXN0ZWQoc2VydmljZUlEOiBzdHJpbmcsIHVybDogc3RyaW5nLCBibGFja2xpc3Q6IEJsYWNrbGlzdGVkU2VydmljZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc0JsYWNrbGlzdGVkID0gZmFsc2U7XG4gICAgICAgIGJsYWNrbGlzdC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LnNlcnZpY2VJZCA9PT0gc2VydmljZUlEICYmIGVudHJ5LmFwaVVybCA9PT0gdXJsKSB7XG4gICAgICAgICAgICAgICAgaXNCbGFja2xpc3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNCbGFja2xpc3RlZDtcbiAgICB9XG59XG4iXX0=
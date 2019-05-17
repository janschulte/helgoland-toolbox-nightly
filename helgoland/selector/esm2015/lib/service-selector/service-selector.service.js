/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DatasetApiInterface } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
export class ServiceSelectorService {
    /**
     * @param {?} apiInterface
     */
    constructor(apiInterface) {
        this.apiInterface = apiInterface;
    }
    /**
     * @param {?} url
     * @param {?} blacklist
     * @param {?} filter
     * @return {?}
     */
    fetchServicesOfAPI(url, blacklist, filter) {
        return new Observable((observer) => {
            this.apiInterface.getServices(url, filter)
                .subscribe((services) => {
                if (services && services instanceof Array) {
                    /** @type {?} */
                    const usableServices = services.map((service) => {
                        if (!this.isServiceBlacklisted(service.id, url, blacklist)) {
                            return service;
                        }
                    });
                    observer.next(usableServices);
                    observer.complete();
                }
            }, (error) => {
                observer.error(error);
                observer.complete();
            });
        });
    }
    /**
     * @param {?} serviceID
     * @param {?} url
     * @param {?} blacklist
     * @return {?}
     */
    isServiceBlacklisted(serviceID, url, blacklist) {
        /** @type {?} */
        let isBlacklisted = false;
        blacklist.forEach((entry) => {
            if (entry.serviceId === serviceID && entry.apiUrl === url) {
                isBlacklisted = true;
            }
        });
        return isBlacklisted;
    }
}
ServiceSelectorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServiceSelectorService.ctorParameters = () => [
    { type: DatasetApiInterface }
];
if (false) {
    /** @type {?} */
    ServiceSelectorService.prototype.apiInterface;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJN0MsTUFBTTs7OztJQUVGLFlBQ2MsWUFBaUM7UUFBakMsaUJBQVksR0FBWixZQUFZLENBQXFCO0tBQzFDOzs7Ozs7O0lBRUUsa0JBQWtCLENBQ3JCLEdBQVcsRUFDWCxTQUErQixFQUMvQixNQUF1QjtRQUV2QixNQUFNLENBQUMsSUFBSSxVQUFVLENBQVksQ0FBQyxRQUE2QixFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztpQkFDckMsU0FBUyxDQUNOLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDOztvQkFDeEMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUM7eUJBQ2xCO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM5QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3ZCO2FBQ0osRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNOLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QixDQUFDLENBQUM7U0FDZCxDQUFDLENBQUM7Ozs7Ozs7O0lBR0Msb0JBQW9CLENBQUMsU0FBaUIsRUFBRSxHQUFXLEVBQUUsU0FBK0I7O1FBQ3hGLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQzs7OztZQXhDNUIsVUFBVTs7OztZQVBGLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBCbGFja2xpc3RlZFNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VTZWxlY3RvclNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIGZldGNoU2VydmljZXNPZkFQSShcbiAgICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAgIGJsYWNrbGlzdDogQmxhY2tsaXN0ZWRTZXJ2aWNlW10sXG4gICAgICAgIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyXG4gICAgKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFNlcnZpY2VbXT4oKG9ic2VydmVyOiBPYnNlcnZlcjxTZXJ2aWNlW10+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTZXJ2aWNlcyh1cmwsIGZpbHRlcilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoc2VydmljZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlcyAmJiBzZXJ2aWNlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNhYmxlU2VydmljZXMgPSBzZXJ2aWNlcy5tYXAoKHNlcnZpY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VydmljZUJsYWNrbGlzdGVkKHNlcnZpY2UuaWQsIHVybCwgYmxhY2tsaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHVzYWJsZVNlcnZpY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2VydmljZUJsYWNrbGlzdGVkKHNlcnZpY2VJRDogc3RyaW5nLCB1cmw6IHN0cmluZywgYmxhY2tsaXN0OiBCbGFja2xpc3RlZFNlcnZpY2VbXSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNCbGFja2xpc3RlZCA9IGZhbHNlO1xuICAgICAgICBibGFja2xpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5zZXJ2aWNlSWQgPT09IHNlcnZpY2VJRCAmJiBlbnRyeS5hcGlVcmwgPT09IHVybCkge1xuICAgICAgICAgICAgICAgIGlzQmxhY2tsaXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzQmxhY2tsaXN0ZWQ7XG4gICAgfVxufVxuIl19
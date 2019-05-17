/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SettingsService } from '@helgoland/core';
export class BasicAuthServicesKeeper {
    /**
     * @param {?} settingsService
     */
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.services = [];
    }
    /**
     * @param {?} url
     * @return {?}
     */
    registerService(url) {
        if (this.services.indexOf(url) === -1) {
            this.services.push(url);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getCorrespondingService(url) {
        /** @type {?} */
        const matchedUrl = this.services.find(e => url.startsWith(e));
        if (matchedUrl)
            return matchedUrl;
        /** @type {?} */
        const api = this.settingsService.getSettings().datasetApis.find((e) => url.startsWith(e.url) && e.basicAuth);
        if (api)
            return api.url;
    }
}
BasicAuthServicesKeeper.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BasicAuthServicesKeeper.ctorParameters = () => [
    { type: SettingsService }
];
if (false) {
    /** @type {?} */
    BasicAuthServicesKeeper.prototype.services;
    /** @type {?} */
    BasicAuthServicesKeeper.prototype.settingsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1zZXJ2aWNlcy1rZWVwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9iYXNpYy1hdXRoLXNlcnZpY2VzLWtlZXBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUc1RCxNQUFNOzs7O0lBSUosWUFDWSxlQUEwQztRQUExQyxvQkFBZSxHQUFmLGVBQWUsQ0FBMkI7d0JBSHpCLEVBQUU7S0FJMUI7Ozs7O0lBRUUsZUFBZSxDQUFDLEdBQVc7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCOzs7Ozs7SUFHSSx1QkFBdUIsQ0FBQyxHQUFXOztRQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDOztRQUVsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7OztZQXBCM0IsVUFBVTs7OztZQUZRLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljQXV0aFNlcnZpY2VzS2VlcGVyIHtcblxuICBwcml2YXRlIHNlcnZpY2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgKSB7IH1cblxuICBwdWJsaWMgcmVnaXN0ZXJTZXJ2aWNlKHVybDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc2VydmljZXMuaW5kZXhPZih1cmwpID09PSAtMSkge1xuICAgICAgdGhpcy5zZXJ2aWNlcy5wdXNoKHVybCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvcnJlc3BvbmRpbmdTZXJ2aWNlKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXRjaGVkVXJsID0gdGhpcy5zZXJ2aWNlcy5maW5kKGUgPT4gdXJsLnN0YXJ0c1dpdGgoZSkpO1xuICAgIGlmIChtYXRjaGVkVXJsKSByZXR1cm4gbWF0Y2hlZFVybDtcbiAgICBcbiAgICBjb25zdCBhcGkgPSB0aGlzLnNldHRpbmdzU2VydmljZS5nZXRTZXR0aW5ncygpLmRhdGFzZXRBcGlzLmZpbmQoKGUpID0+IHVybC5zdGFydHNXaXRoKGUudXJsKSAmJiBlLmJhc2ljQXV0aCk7XG4gICAgaWYgKGFwaSkgcmV0dXJuIGFwaS51cmw7XG4gIH1cblxufVxuIl19
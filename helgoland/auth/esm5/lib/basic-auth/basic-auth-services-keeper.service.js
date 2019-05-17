/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SettingsService } from '@helgoland/core';
var BasicAuthServicesKeeper = /** @class */ (function () {
    function BasicAuthServicesKeeper(settingsService) {
        this.settingsService = settingsService;
        this.services = [];
    }
    /**
     * @param {?} url
     * @return {?}
     */
    BasicAuthServicesKeeper.prototype.registerService = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this.services.indexOf(url) === -1) {
            this.services.push(url);
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    BasicAuthServicesKeeper.prototype.getCorrespondingService = /**
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
        var api = this.settingsService.getSettings().datasetApis.find(function (e) { return url.startsWith(e.url) && e.basicAuth; });
        if (api) {
            return api.url;
        }
    };
    BasicAuthServicesKeeper.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BasicAuthServicesKeeper.ctorParameters = function () { return [
        { type: SettingsService }
    ]; };
    return BasicAuthServicesKeeper;
}());
export { BasicAuthServicesKeeper };
if (false) {
    /** @type {?} */
    BasicAuthServicesKeeper.prototype.services;
    /** @type {?} */
    BasicAuthServicesKeeper.prototype.settingsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1zZXJ2aWNlcy1rZWVwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9iYXNpYy1hdXRoL2Jhc2ljLWF1dGgtc2VydmljZXMta2VlcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQU8xRCxpQ0FDWSxlQUEwQztRQUExQyxvQkFBZSxHQUFmLGVBQWUsQ0FBMkI7d0JBSHpCLEVBQUU7S0FJMUI7Ozs7O0lBRUUsaURBQWU7Ozs7Y0FBQyxHQUFXO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6Qjs7Ozs7O0lBR0kseURBQXVCOzs7O2NBQUMsR0FBVzs7UUFDeEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbkI7O1FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1FBQzdHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNoQjs7O2dCQXhCSixVQUFVOzs7O2dCQUZRLGVBQWU7O2tDQURsQzs7U0FJYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljQXV0aFNlcnZpY2VzS2VlcGVyIHtcblxuICBwcml2YXRlIHNlcnZpY2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgKSB7IH1cblxuICBwdWJsaWMgcmVnaXN0ZXJTZXJ2aWNlKHVybDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc2VydmljZXMuaW5kZXhPZih1cmwpID09PSAtMSkge1xuICAgICAgdGhpcy5zZXJ2aWNlcy5wdXNoKHVybCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvcnJlc3BvbmRpbmdTZXJ2aWNlKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXRjaGVkVXJsID0gdGhpcy5zZXJ2aWNlcy5maW5kKGUgPT4gdXJsLnN0YXJ0c1dpdGgoZSkpO1xuICAgIGlmIChtYXRjaGVkVXJsKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZFVybDtcbiAgICB9XG5cbiAgICBjb25zdCBhcGkgPSB0aGlzLnNldHRpbmdzU2VydmljZS5nZXRTZXR0aW5ncygpLmRhdGFzZXRBcGlzLmZpbmQoKGUpID0+IHVybC5zdGFydHNXaXRoKGUudXJsKSAmJiBlLmJhc2ljQXV0aCk7XG4gICAgaWYgKGFwaSkge1xuICAgICAgcmV0dXJuIGFwaS51cmw7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==
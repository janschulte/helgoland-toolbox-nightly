/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SettingsService } from '@helgoland/core';
/**
 * This service maintaines all service urls which are secured with basic auth. The service is used to check for every servie url if it is necessary to work with basic auth. It is possible to
 * register a url and it also checks every dataset url in the settings.
 */
var BasicAuthServiceMaintainer = /** @class */ (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    BasicAuthServiceMaintainer.ctorParameters = function () { return [
        { type: SettingsService }
    ]; };
    return BasicAuthServiceMaintainer;
}());
export { BasicAuthServiceMaintainer };
if (false) {
    /** @type {?} */
    BasicAuthServiceMaintainer.prototype.services;
    /** @type {?} */
    BasicAuthServiceMaintainer.prototype.settingsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1zZXJ2aWNlLW1haW50YWluZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9iYXNpYy1hdXRoL2Jhc2ljLWF1dGgtc2VydmljZS1tYWludGFpbmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7SUFXMUQsb0NBQ1ksZUFBMEM7UUFBMUMsb0JBQWUsR0FBZixlQUFlLENBQTJCO3dCQUh6QixFQUFFO0tBSTFCOzs7Ozs7SUFLRSxvREFBZTs7Ozs7Y0FBQyxHQUFXO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6Qjs7Ozs7OztJQU1JLDREQUF1Qjs7Ozs7Y0FBQyxHQUFXOztRQUN4QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUNuQjs7UUFDRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDNUUsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7WUFDbkYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNoQjtTQUNGOzs7Z0JBaENKLFVBQVU7Ozs7Z0JBTlEsZUFBZTs7cUNBRGxDOztTQVFhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBtYWludGFpbmVzIGFsbCBzZXJ2aWNlIHVybHMgd2hpY2ggYXJlIHNlY3VyZWQgd2l0aCBiYXNpYyBhdXRoLiBUaGUgc2VydmljZSBpcyB1c2VkIHRvIGNoZWNrIGZvciBldmVyeSBzZXJ2aWUgdXJsIGlmIGl0IGlzIG5lY2Vzc2FyeSB0byB3b3JrIHdpdGggYmFzaWMgYXV0aC4gSXQgaXMgcG9zc2libGUgdG9cbiAqIHJlZ2lzdGVyIGEgdXJsIGFuZCBpdCBhbHNvIGNoZWNrcyBldmVyeSBkYXRhc2V0IHVybCBpbiB0aGUgc2V0dGluZ3MuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lciB7XG5cbiAgcHJpdmF0ZSBzZXJ2aWNlczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGFkZGl0aW9uYWwgc2VydmljZSB1cmwsIHdoaWNoIGlzIHNlY3VyZWQgd2l0aCBiYXNpYyBhdXRoLlxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyU2VydmljZSh1cmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNlcnZpY2VzLmluZGV4T2YodXJsKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuc2VydmljZXMucHVzaCh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBnaXZlbiB1cmwgaXMgcmVnaXN0ZXJlZCBhcyBzZWN1cmVkIHdpdGggYmFzaWMgYXV0aC5cbiAgICovXG4gIHB1YmxpYyBnZXRDb3JyZXNwb25kaW5nU2VydmljZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbWF0Y2hlZFVybCA9IHRoaXMuc2VydmljZXMuZmluZChlID0+IHVybC5zdGFydHNXaXRoKGUpKTtcbiAgICBpZiAobWF0Y2hlZFVybCkge1xuICAgICAgcmV0dXJuIG1hdGNoZWRVcmw7XG4gICAgfVxuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5nc1NlcnZpY2UuZ2V0U2V0dGluZ3MoKTtcbiAgICBpZiAoc2V0dGluZ3MgJiYgc2V0dGluZ3MuZGF0YXNldEFwaXMgJiYgQXJyYXkuaXNBcnJheShzZXR0aW5ncy5kYXRhc2V0QXBpcykpIHtcbiAgICAgIGNvbnN0IGFwaSA9IHNldHRpbmdzLmRhdGFzZXRBcGlzLmZpbmQoKGUpID0+IHVybC5zdGFydHNXaXRoKGUudXJsKSAmJiBlLmJhc2ljQXV0aCk7XG4gICAgICBpZiAoYXBpKSB7XG4gICAgICAgIHJldHVybiBhcGkudXJsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=
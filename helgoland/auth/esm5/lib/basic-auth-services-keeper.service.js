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
        if (matchedUrl)
            return matchedUrl;
        /** @type {?} */
        var api = this.settingsService.getSettings().datasetApis.find(function (e) { return url.startsWith(e.url) && e.basicAuth; });
        if (api)
            return api.url;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1zZXJ2aWNlcy1rZWVwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9iYXNpYy1hdXRoLXNlcnZpY2VzLWtlZXBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFPMUQsaUNBQ1ksZUFBMEM7UUFBMUMsb0JBQWUsR0FBZixlQUFlLENBQTJCO3dCQUh6QixFQUFFO0tBSTFCOzs7OztJQUVFLGlEQUFlOzs7O2NBQUMsR0FBVztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7Ozs7OztJQUdJLHlEQUF1Qjs7OztjQUFDLEdBQVc7O1FBQ3hDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzlELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7O1FBRWxDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQXBDLENBQW9DLENBQUMsQ0FBQztRQUM3RyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7O2dCQXBCM0IsVUFBVTs7OztnQkFGUSxlQUFlOztrQ0FEbEM7O1NBSWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0F1dGhTZXJ2aWNlc0tlZXBlciB7XG5cbiAgcHJpdmF0ZSBzZXJ2aWNlczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U8U2V0dGluZ3M+XG4gICkgeyB9XG5cbiAgcHVibGljIHJlZ2lzdGVyU2VydmljZSh1cmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNlcnZpY2VzLmluZGV4T2YodXJsKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuc2VydmljZXMucHVzaCh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3JyZXNwb25kaW5nU2VydmljZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbWF0Y2hlZFVybCA9IHRoaXMuc2VydmljZXMuZmluZChlID0+IHVybC5zdGFydHNXaXRoKGUpKTtcbiAgICBpZiAobWF0Y2hlZFVybCkgcmV0dXJuIG1hdGNoZWRVcmw7XG4gICAgXG4gICAgY29uc3QgYXBpID0gdGhpcy5zZXR0aW5nc1NlcnZpY2UuZ2V0U2V0dGluZ3MoKS5kYXRhc2V0QXBpcy5maW5kKChlKSA9PiB1cmwuc3RhcnRzV2l0aChlLnVybCkgJiYgZS5iYXNpY0F1dGgpO1xuICAgIGlmIChhcGkpIHJldHVybiBhcGkudXJsO1xuICB9XG5cbn1cbiJdfQ==
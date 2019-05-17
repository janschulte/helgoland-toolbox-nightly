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
        if (matchedUrl) {
            return matchedUrl;
        }
        /** @type {?} */
        const api = this.settingsService.getSettings().datasetApis.find((e) => url.startsWith(e.url) && e.basicAuth);
        if (api) {
            return api.url;
        }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC1zZXJ2aWNlcy1rZWVwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9iYXNpYy1hdXRoL2Jhc2ljLWF1dGgtc2VydmljZXMta2VlcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzVELE1BQU07Ozs7SUFJSixZQUNZLGVBQTBDO1FBQTFDLG9CQUFlLEdBQWYsZUFBZSxDQUEyQjt3QkFIekIsRUFBRTtLQUkxQjs7Ozs7SUFFRSxlQUFlLENBQUMsR0FBVztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7Ozs7OztJQUdJLHVCQUF1QixDQUFDLEdBQVc7O1FBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ25COztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNoQjs7OztZQXhCSixVQUFVOzs7O1lBRlEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNBdXRoU2VydmljZXNLZWVwZXIge1xuXG4gIHByaXZhdGUgc2VydmljZXM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzU2VydmljZTogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHsgfVxuXG4gIHB1YmxpYyByZWdpc3RlclNlcnZpY2UodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlcy5pbmRleE9mKHVybCkgPT09IC0xKSB7XG4gICAgICB0aGlzLnNlcnZpY2VzLnB1c2godXJsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ycmVzcG9uZGluZ1NlcnZpY2UodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG1hdGNoZWRVcmwgPSB0aGlzLnNlcnZpY2VzLmZpbmQoZSA9PiB1cmwuc3RhcnRzV2l0aChlKSk7XG4gICAgaWYgKG1hdGNoZWRVcmwpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkVXJsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwaSA9IHRoaXMuc2V0dGluZ3NTZXJ2aWNlLmdldFNldHRpbmdzKCkuZGF0YXNldEFwaXMuZmluZCgoZSkgPT4gdXJsLnN0YXJ0c1dpdGgoZS51cmwpICYmIGUuYmFzaWNBdXRoKTtcbiAgICBpZiAoYXBpKSB7XG4gICAgICByZXR1cm4gYXBpLnVybDtcbiAgICB9XG4gIH1cblxufVxuIl19
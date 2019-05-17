/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var TimezoneService = /** @class */ (function () {
    function TimezoneService() {
        this.timezoneOffsetChanged = new EventEmitter();
        this.timezoneOffset = new Date().getTimezoneOffset();
    }
    /**
     * Sets the offset difference in minutes to Universal Coordinated Time (UTC).
     *
     * @param {?} offset
     * @return {?}
     */
    TimezoneService.prototype.setTimezoneOffset = /**
     * Sets the offset difference in minutes to Universal Coordinated Time (UTC).
     *
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        this.timezoneOffset = offset;
        this.timezoneOffsetChanged.emit(offset);
    };
    /**
     * Gets the current offset in minutes to UTC.
     *
     * @return {?} offset
     */
    TimezoneService.prototype.getTimezoneOffset = /**
     * Gets the current offset in minutes to UTC.
     *
     * @return {?} offset
     */
    function () {
        return this.timezoneOffset;
    };
    TimezoneService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TimezoneService.ctorParameters = function () { return []; };
    /** @nocollapse */ TimezoneService.ngInjectableDef = i0.defineInjectable({ factory: function TimezoneService_Factory() { return new TimezoneService(); }, token: TimezoneService, providedIn: "root" });
    return TimezoneService;
}());
export { TimezoneService };
if (false) {
    /** @type {?} */
    TimezoneService.prototype.timezoneOffset;
    /** @type {?} */
    TimezoneService.prototype.timezoneOffsetChanged;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lL3RpbWV6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7SUFXdkQ7cUNBRnFELElBQUksWUFBWSxFQUFFO1FBR3JFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ3REOzs7Ozs7O0lBT00sMkNBQWlCOzs7Ozs7Y0FBQyxNQUFjO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFRbkMsMkNBQWlCOzs7Ozs7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7OztnQkE3QjlCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzBCQUpEOztTQUthLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGltZXpvbmVTZXJ2aWNlIHtcblxuICBwcml2YXRlIHRpbWV6b25lT2Zmc2V0OiBudW1iZXI7XG5cbiAgcHVibGljIHRpbWV6b25lT2Zmc2V0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50aW1lem9uZU9mZnNldCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBvZmZzZXQgZGlmZmVyZW5jZSBpbiBtaW51dGVzIHRvIFVuaXZlcnNhbCBDb29yZGluYXRlZCBUaW1lIChVVEMpLlxuICAgKlxuICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAqL1xuICBwdWJsaWMgc2V0VGltZXpvbmVPZmZzZXQob2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLnRpbWV6b25lT2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMudGltZXpvbmVPZmZzZXRDaGFuZ2VkLmVtaXQob2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IG9mZnNldCBpbiBtaW51dGVzIHRvIFVUQy5cbiAgICpcbiAgICogQHJldHVybnMgb2Zmc2V0XG4gICAqL1xuICBwdWJsaWMgZ2V0VGltZXpvbmVPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50aW1lem9uZU9mZnNldDtcbiAgfVxuXG59XG4iXX0=
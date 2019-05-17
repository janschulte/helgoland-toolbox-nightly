/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TimezoneService {
    constructor() {
        this.timezoneOffsetChanged = new EventEmitter();
        this.timezoneOffset = new Date().getTimezoneOffset();
    }
    /**
     * Sets the offset difference in minutes to Universal Coordinated Time (UTC).
     *
     * @param {?} offset
     * @return {?}
     */
    setTimezoneOffset(offset) {
        this.timezoneOffset = offset;
        this.timezoneOffsetChanged.emit(offset);
    }
    /**
     * Gets the current offset in minutes to UTC.
     *
     * @return {?} offset
     */
    getTimezoneOffset() {
        return this.timezoneOffset;
    }
}
TimezoneService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TimezoneService.ctorParameters = () => [];
/** @nocollapse */ TimezoneService.ngInjectableDef = i0.defineInjectable({ factory: function TimezoneService_Factory() { return new TimezoneService(); }, token: TimezoneService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TimezoneService.prototype.timezoneOffset;
    /** @type {?} */
    TimezoneService.prototype.timezoneOffsetChanged;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lL3RpbWV6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUt6RCxNQUFNO0lBTUo7cUNBRnFELElBQUksWUFBWSxFQUFFO1FBR3JFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ3REOzs7Ozs7O0lBT00saUJBQWlCLENBQUMsTUFBYztRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0lBUW5DLGlCQUFpQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7OztZQTdCOUIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWV6b25lU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB0aW1lem9uZU9mZnNldDogbnVtYmVyO1xuXG4gIHB1YmxpYyB0aW1lem9uZU9mZnNldENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGltZXpvbmVPZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgb2Zmc2V0IGRpZmZlcmVuY2UgaW4gbWludXRlcyB0byBVbml2ZXJzYWwgQ29vcmRpbmF0ZWQgVGltZSAoVVRDKS5cbiAgICpcbiAgICogQHBhcmFtIG9mZnNldFxuICAgKi9cbiAgcHVibGljIHNldFRpbWV6b25lT2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy50aW1lem9uZU9mZnNldCA9IG9mZnNldDtcbiAgICB0aGlzLnRpbWV6b25lT2Zmc2V0Q2hhbmdlZC5lbWl0KG9mZnNldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBvZmZzZXQgaW4gbWludXRlcyB0byBVVEMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9mZnNldFxuICAgKi9cbiAgcHVibGljIGdldFRpbWV6b25lT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudGltZXpvbmVPZmZzZXQ7XG4gIH1cblxufVxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var DateProxyPipe = /** @class */ (function () {
    function DateProxyPipe(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    DateProxyPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        /** @type {?} */
        var builtinDatePipe = new DatePipe(this.translate.currentLang || 'en');
        try {
            return builtinDatePipe.transform(value, pattern);
        }
        catch (error) {
            console.error(error);
            return new DatePipe('en').transform(value, pattern);
        }
    };
    DateProxyPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'dateI18n',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    DateProxyPipe.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return DateProxyPipe;
}());
export { DateProxyPipe };
if (false) {
    /** @type {?} */
    DateProxyPipe.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXByb3h5LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZGF0ZXByb3h5L2RhdGVwcm94eS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBUW5ELHVCQUNjLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0tBQ3BDOzs7Ozs7SUFFRSxpQ0FBUzs7Ozs7Y0FBQyxLQUFVLEVBQUUsT0FBOEI7UUFBOUIsd0JBQUEsRUFBQSxzQkFBOEI7O1FBRXZELElBQU0sZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwRDtRQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN2RDs7O2dCQWxCUixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxLQUFLO2lCQUNkOzs7O2dCQUxRLGdCQUFnQjs7d0JBRnpCOztTQVFhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZUkxOG4nLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQcm94eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IGFueSwgcGF0dGVybjogc3RyaW5nID0gJ21lZGl1bURhdGUnKTogYW55IHtcbiAgICAgICAgLy8gc2ltcGx5IGZvcndhcmQgdG8gYnVpbHQtaW4gcGlwZSwgYnV0IHRha2UgaW50byBhY2NvdW50IHRoZSBjdXJyZW50IGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IGJ1aWx0aW5EYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyB8fCAnZW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluRGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBwYXR0ZXJuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGlwZSgnZW4nKS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
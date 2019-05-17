/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var ColorService = /** @class */ (function () {
    function ColorService() {
    }
    /**
     * Creates a random color and return it as a hex string.
     * @return {?}
     */
    ColorService.prototype.getColor = /**
     * Creates a random color and return it as a hex string.
     * @return {?}
     */
    function () {
        return this.getRandomColor();
    };
    /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    ColorService.prototype.convertHexToRGBA = /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    function (hex, opacity) {
        hex = hex.replace('#', '');
        /** @type {?} */
        var r = parseInt(hex.substring(0, 2), 16);
        /** @type {?} */
        var g = parseInt(hex.substring(2, 4), 16);
        /** @type {?} */
        var b = parseInt(hex.substring(4, 6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    };
    /**
     * @return {?}
     */
    ColorService.prototype.getRandomColor = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var letters = '0123456789ABCDEF';
        /** @type {?} */
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ColorService.decorators = [
        { type: Injectable },
    ];
    return ColorService;
}());
export { ColorService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb2xvci9jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztJQVFoQywrQkFBUTs7Ozs7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7Ozs7OztJQU0xQix1Q0FBZ0I7Ozs7OztjQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ2hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7UUFDM0IsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztRQUM1QyxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O1FBQzVDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7OztJQUcvRCxxQ0FBYzs7Ozs7UUFDbEIsSUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUM7O1FBQ25DLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7OztnQkEzQnBCLFVBQVU7O3VCQUZYOztTQUdhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xvclNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHJhbmRvbSBjb2xvciBhbmQgcmV0dXJuIGl0IGFzIGEgaGV4IHN0cmluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmFuZG9tQ29sb3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgYW5kIG9wYWNpdHkgaW4gcGVyY2VudCB0byBSR0JBIGNvbG9yIGFzIHN0cmluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29udmVydEhleFRvUkdCQShoZXg6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNik7XG4gICAgICAgIHJldHVybiAncmdiYSgnICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgb3BhY2l0eSAvIDEwMCArICcpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbUNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRic7XG4gICAgICAgIGxldCBjb2xvciA9ICcjJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuXG59XG4iXX0=
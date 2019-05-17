/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var LastValuePresentation = {
    /**
       * colorized circle depending on status intervals
       */
    Colorized: 0,
    /**
       * textual presentation of the last value, done with LastValueLabelGenerator
       */
    Textual: 1,
};
export { LastValuePresentation };
/**
 * @abstract
 */
var /**
 * @abstract
 */
LastValueLabelGenerator = /** @class */ (function () {
    function LastValueLabelGenerator() {
    }
    return LastValueLabelGenerator;
}());
/**
 * @abstract
 */
export { LastValueLabelGenerator };
if (false) {
    /**
     * Creates an icon label based on a given timeseries.
     * @abstract
     * @param {?} ts
     * @return {?}
     */
    LastValueLabelGenerator.prototype.createIconLabel = function (ts) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3Ivc2VydmljZXMvbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQU1FLFlBQVM7Ozs7SUFJVCxVQUFPOzs7Ozs7QUFHVDs7O0FBQUE7OztrQ0FiQTtJQW9CQyxDQUFBOzs7O0FBUEQsbUNBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lc2VyaWVzIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gTGFzdFZhbHVlUHJlc2VudGF0aW9uIHtcbiAgLyoqXG4gICAqIGNvbG9yaXplZCBjaXJjbGUgZGVwZW5kaW5nIG9uIHN0YXR1cyBpbnRlcnZhbHNcbiAgICovXG4gIENvbG9yaXplZCxcbiAgLyoqXG4gICAqIHRleHR1YWwgcHJlc2VudGF0aW9uIG9mIHRoZSBsYXN0IHZhbHVlLCBkb25lIHdpdGggTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JcbiAgICovXG4gIFRleHR1YWxcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpY29uIGxhYmVsIGJhc2VkIG9uIGEgZ2l2ZW4gdGltZXNlcmllcy5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVJY29uTGFiZWwodHM6IFRpbWVzZXJpZXMpO1xuXG59XG4iXX0=
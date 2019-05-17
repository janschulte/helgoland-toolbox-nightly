/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Options for each dataset.
 *
 * @export
 */
var /**
 * Options for each dataset.
 *
 * @export
 */
DatasetOptions = /** @class */ (function () {
    function DatasetOptions(internalId, color) {
        /**
         * show or hide in the graph
         *
         * \@memberof DatasetOptions
         */
        this.visible = true;
        /**
         * separate y axis of datasets with same unit
         *
         * \@memberof DatasetOptions
         */
        this.separateYAxis = false;
        /**
         * align graph that zero y axis is visible
         *
         * \@memberof DatasetOptions
         */
        this.zeroBasedYAxis = false;
        /**
         * auto zoom when range selection
         *
         * \@memberof DatasetOptions
         */
        this.autoRangeSelection = false;
        /**
         * marker to request dataset data generalized
         *
         * \@memberof DatasetOptions
         */
        this.generalize = false;
        /**
         * list of visible reference values
         *
         * \@memberof DatasetOptions
         */
        this.showReferenceValues = [];
        /**
         * radius of graphpoint
         *
         * \@memberof DatasetOptions
         */
        this.pointRadius = 0;
        /**
         * width of graphline
         *
         * \@memberof DatasetOptions
         */
        this.lineWidth = 1;
        this.internalId = internalId;
        this.color = color;
    }
    return DatasetOptions;
}());
/**
 * Options for each dataset.
 *
 * @export
 */
export { DatasetOptions };
if (false) {
    /**
     * internal dataset id
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.internalId;
    /**
     * color of the dataset
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.color;
    /**
     * show or hide in the graph
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.visible;
    /**
     * separate y axis of datasets with same unit
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.separateYAxis;
    /**
     * align graph that zero y axis is visible
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.zeroBasedYAxis;
    /**
     * auto zoom when range selection
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.autoRangeSelection;
    /**
     * marker to request dataset data generalized
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.generalize;
    /**
     * list of visible reference values
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.showReferenceValues;
    /**
     * radius of graphpoint
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.pointRadius;
    /**
     * width of graphline
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.lineWidth;
    /**
     * min and max range of y axis
     *
     * \@memberof DatasetOptions
     * @type {?}
     */
    DatasetOptions.prototype.yAxisRange;
}
var ReferenceValueOption = /** @class */ (function () {
    function ReferenceValueOption() {
    }
    return ReferenceValueOption;
}());
export { ReferenceValueOption };
if (false) {
    /** @type {?} */
    ReferenceValueOption.prototype.id;
    /** @type {?} */
    ReferenceValueOption.prototype.color;
}
/**
 * numbered range with a min and a max value
 *
 * @export
 * @record
 */
export function MinMaxRange() { }
/** @type {?} */
MinMaxRange.prototype.min;
/** @type {?} */
MinMaxRange.prototype.max;
var TimedDatasetOptions = /** @class */ (function (_super) {
    tslib_1.__extends(TimedDatasetOptions, _super);
    function TimedDatasetOptions(internalId, color, timestamp) {
        var _this = _super.call(this, internalId, color) || this;
        _this.timestamp = timestamp;
        return _this;
    }
    return TimedDatasetOptions;
}(DatasetOptions));
export { TimedDatasetOptions };
if (false) {
    /** @type {?} */
    TimedDatasetOptions.prototype.timestamp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQTs7Ozs7QUFBQTtJQStFSSx3QkFDSSxVQUFrQixFQUNsQixLQUFhOzs7Ozs7dUJBNURTLElBQUk7Ozs7Ozs2QkFPRyxLQUFLOzs7Ozs7OEJBT0osS0FBSzs7Ozs7O2tDQU9SLEtBQUs7Ozs7OzswQkFPTixLQUFLOzs7Ozs7bUNBT2tCLEVBQUU7Ozs7OzsyQkFPMUIsQ0FBQzs7Ozs7O3lCQU9ILENBQUM7UUFheEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7eUJBMUZMO0lBMkZDLENBQUE7Ozs7OztBQXRGRCwwQkFzRkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsSUFBQTs7OytCQTdGQTtJQWdHQyxDQUFBO0FBSEQsZ0NBR0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlELElBQUE7SUFBeUMsK0NBQWM7SUFHbkQsNkJBQ0ksVUFBa0IsRUFDbEIsS0FBYSxFQUNiLFNBQWlCO1FBSHJCLFlBS0ksa0JBQU0sVUFBVSxFQUFFLEtBQUssQ0FBQyxTQUUzQjtRQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztLQUM5Qjs4QkF0SEw7RUE0R3lDLGNBQWMsRUFXdEQsQ0FBQTtBQVhELCtCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBPcHRpb25zIGZvciBlYWNoIGRhdGFzZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgRGF0YXNldE9wdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgZGF0YXNldCBpZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIGludGVybmFsSWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGNvbG9yIG9mIHRoZSBkYXRhc2V0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSBpbiB0aGUgZ3JhcGhcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIHNlcGFyYXRlIHkgYXhpcyBvZiBkYXRhc2V0cyB3aXRoIHNhbWUgdW5pdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHNlcGFyYXRlWUF4aXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBhbGlnbiBncmFwaCB0aGF0IHplcm8geSBheGlzIGlzIHZpc2libGVcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyB6ZXJvQmFzZWRZQXhpcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGF1dG8gem9vbSB3aGVuIHJhbmdlIHNlbGVjdGlvblxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgYXV0b1JhbmdlU2VsZWN0aW9uPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogbWFya2VyIHRvIHJlcXVlc3QgZGF0YXNldCBkYXRhIGdlbmVyYWxpemVkXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2VuZXJhbGl6ZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgdmlzaWJsZSByZWZlcmVuY2UgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd1JlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVPcHRpb25bXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogcmFkaXVzIG9mIGdyYXBocG9pbnRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBwb2ludFJhZGl1czogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIHdpZHRoIG9mIGdyYXBobGluZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMTtcblxuICAgIC8qKlxuICAgICAqIG1pbiBhbmQgbWF4IHJhbmdlIG9mIHkgYXhpc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHlBeGlzUmFuZ2U/OiBNaW5NYXhSYW5nZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbElkID0gaW50ZXJuYWxJZDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZmVyZW5jZVZhbHVlT3B0aW9uIHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBudW1iZXJlZCByYW5nZSB3aXRoIGEgbWluIGFuZCBhIG1heCB2YWx1ZVxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNaW5NYXhSYW5nZSB7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lZERhdGFzZXRPcHRpb25zIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMge1xuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHRpbWVzdGFtcDogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGludGVybmFsSWQsIGNvbG9yKTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxufVxuIl19
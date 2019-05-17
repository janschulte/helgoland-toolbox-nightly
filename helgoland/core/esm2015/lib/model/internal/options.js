/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Options for each dataset.
 *
 * @export
 */
export class DatasetOptions {
    /**
     * @param {?} internalId
     * @param {?} color
     */
    constructor(internalId, color) {
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
}
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
export class ReferenceValueOption {
}
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
export class TimedDatasetOptions extends DatasetOptions {
    /**
     * @param {?} internalId
     * @param {?} color
     * @param {?} timestamp
     */
    constructor(internalId, color, timestamp) {
        super(internalId, color);
        this.timestamp = timestamp;
    }
}
if (false) {
    /** @type {?} */
    TimedDatasetOptions.prototype.timestamp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE1BQU07Ozs7O0lBK0VGLFlBQ0ksVUFBa0IsRUFDbEIsS0FBYTs7Ozs7O3VCQTVEUyxJQUFJOzs7Ozs7NkJBT0csS0FBSzs7Ozs7OzhCQU9KLEtBQUs7Ozs7OztrQ0FPUixLQUFLOzs7Ozs7MEJBT04sS0FBSzs7Ozs7O21DQU9rQixFQUFFOzs7Ozs7MkJBTzFCLENBQUM7Ozs7Ozt5QkFPSCxDQUFDO1FBYXhCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTtDQUdMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLDBCQUEyQixTQUFRLGNBQWM7Ozs7OztJQUduRCxZQUNJLFVBQWtCLEVBQ2xCLEtBQWEsRUFDYixTQUFpQjtRQUVqQixLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQzlCO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE9wdGlvbnMgZm9yIGVhY2ggZGF0YXNldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhc2V0T3B0aW9ucyB7XG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBkYXRhc2V0IGlkXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgaW50ZXJuYWxJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogY29sb3Igb2YgdGhlIGRhdGFzZXRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIGluIHRoZSBncmFwaFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogc2VwYXJhdGUgeSBheGlzIG9mIGRhdGFzZXRzIHdpdGggc2FtZSB1bml0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VwYXJhdGVZQXhpcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGFsaWduIGdyYXBoIHRoYXQgemVybyB5IGF4aXMgaXMgdmlzaWJsZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHplcm9CYXNlZFlBeGlzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogYXV0byB6b29tIHdoZW4gcmFuZ2Ugc2VsZWN0aW9uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBhdXRvUmFuZ2VTZWxlY3Rpb24/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBtYXJrZXIgdG8gcmVxdWVzdCBkYXRhc2V0IGRhdGEgZ2VuZXJhbGl6ZWRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBnZW5lcmFsaXplPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiB2aXNpYmxlIHJlZmVyZW5jZSB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzaG93UmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZU9wdGlvbltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiByYWRpdXMgb2YgZ3JhcGhwb2ludFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHBvaW50UmFkaXVzOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogd2lkdGggb2YgZ3JhcGhsaW5lXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIgPSAxO1xuXG4gICAgLyoqXG4gICAgICogbWluIGFuZCBtYXggcmFuZ2Ugb2YgeSBheGlzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgeUF4aXNSYW5nZT86IE1pbk1heFJhbmdlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGVybmFsSWQ6IHN0cmluZyxcbiAgICAgICAgY29sb3I6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmludGVybmFsSWQgPSBpbnRlcm5hbElkO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVPcHRpb24ge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIG51bWJlcmVkIHJhbmdlIHdpdGggYSBtaW4gYW5kIGEgbWF4IHZhbHVlXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1pbk1heFJhbmdlIHtcbiAgICBtaW46IG51bWJlcjtcbiAgICBtYXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVkRGF0YXNldE9wdGlvbnMgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB7XG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGVybmFsSWQ6IHN0cmluZyxcbiAgICAgICAgY29sb3I6IHN0cmluZyxcbiAgICAgICAgdGltZXN0YW1wOiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaW50ZXJuYWxJZCwgY29sb3IpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG59XG4iXX0=
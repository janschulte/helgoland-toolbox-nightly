/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @record
 */
export function IDataset() { }
/** @type {?} */
IDataset.prototype.url;
/** @type {?} */
IDataset.prototype.uom;
/** @type {?} */
IDataset.prototype.internalId;
/** @type {?} */
IDataset.prototype.firstValue;
/** @type {?} */
IDataset.prototype.lastValue;
/** @type {?} */
IDataset.prototype.referenceValues;
/** @type {?} */
IDataset.prototype.parameters;
/** @type {?} */
IDataset.prototype.renderingHints;
var ParameterConstellation = /** @class */ (function () {
    function ParameterConstellation() {
    }
    return ParameterConstellation;
}());
export { ParameterConstellation };
if (false) {
    /** @type {?} */
    ParameterConstellation.prototype.service;
    /** @type {?} */
    ParameterConstellation.prototype.offering;
    /** @type {?} */
    ParameterConstellation.prototype.feature;
    /** @type {?} */
    ParameterConstellation.prototype.procedure;
    /** @type {?} */
    ParameterConstellation.prototype.phenomenon;
    /** @type {?} */
    ParameterConstellation.prototype.category;
}
var FirstLastValue = /** @class */ (function () {
    function FirstLastValue() {
    }
    return FirstLastValue;
}());
export { FirstLastValue };
if (false) {
    /** @type {?} */
    FirstLastValue.prototype.timestamp;
    /** @type {?} */
    FirstLastValue.prototype.value;
}
var ReferenceValue = /** @class */ (function () {
    function ReferenceValue() {
    }
    return ReferenceValue;
}());
export { ReferenceValue };
if (false) {
    /** @type {?} */
    ReferenceValue.prototype.referenceValueId;
    /** @type {?} */
    ReferenceValue.prototype.label;
    /** @type {?} */
    ReferenceValue.prototype.lastValue;
    /** @type {?} */
    ReferenceValue.prototype.color;
    /** @type {?} */
    ReferenceValue.prototype.visible;
}
/**
 * @record
 */
export function RenderingHints() { }
/** @type {?} */
RenderingHints.prototype.chartType;
/** @type {?} */
RenderingHints.prototype.properties;
/**
 * @record
 */
export function LineRenderingHints() { }
/** @type {?} */
LineRenderingHints.prototype.chartType;
/** @type {?} */
LineRenderingHints.prototype.properties;
/**
 * @record
 */
export function BarRenderingHints() { }
/** @type {?} */
BarRenderingHints.prototype.chartType;
/** @type {?} */
BarRenderingHints.prototype.properties;
var DatasetParameterConstellation = /** @class */ (function (_super) {
    tslib_1.__extends(DatasetParameterConstellation, _super);
    function DatasetParameterConstellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatasetParameterConstellation;
}(ParameterConstellation));
export { DatasetParameterConstellation };
if (false) {
    /** @type {?} */
    DatasetParameterConstellation.prototype.platform;
}
var Dataset = /** @class */ (function () {
    function Dataset() {
    }
    return Dataset;
}());
export { Dataset };
if (false) {
    /** @type {?} */
    Dataset.prototype.id;
    /** @type {?} */
    Dataset.prototype.label;
    /** @type {?} */
    Dataset.prototype.url;
    /** @type {?} */
    Dataset.prototype.uom;
    /** @type {?} */
    Dataset.prototype.internalId;
    /** @type {?} */
    Dataset.prototype.firstValue;
    /** @type {?} */
    Dataset.prototype.lastValue;
    /** @type {?} */
    Dataset.prototype.referenceValues;
    /** @type {?} */
    Dataset.prototype.datasetType;
    /** @type {?} */
    Dataset.prototype.platformType;
    /** @type {?} */
    Dataset.prototype.parameters;
    /** @type {?} */
    Dataset.prototype.seriesParameters;
    /** @type {?} */
    Dataset.prototype.renderingHints;
}
var Timeseries = /** @class */ (function () {
    function Timeseries() {
        this.hasData = false;
    }
    return Timeseries;
}());
export { Timeseries };
if (false) {
    /** @type {?} */
    Timeseries.prototype.id;
    /** @type {?} */
    Timeseries.prototype.label;
    /** @type {?} */
    Timeseries.prototype.url;
    /** @type {?} */
    Timeseries.prototype.uom;
    /** @type {?} */
    Timeseries.prototype.internalId;
    /** @type {?} */
    Timeseries.prototype.firstValue;
    /** @type {?} */
    Timeseries.prototype.lastValue;
    /** @type {?} */
    Timeseries.prototype.referenceValues;
    /** @type {?} */
    Timeseries.prototype.station;
    /** @type {?} */
    Timeseries.prototype.parameters;
    /** @type {?} */
    Timeseries.prototype.statusIntervals;
    /** @type {?} */
    Timeseries.prototype.hasData;
    /** @type {?} */
    Timeseries.prototype.renderingHints;
}
/**
 * @record
 */
export function TimeseriesExtras() { }
/** @type {?|undefined} */
TimeseriesExtras.prototype.license;
/** @type {?|undefined} */
TimeseriesExtras.prototype.statusIntervals;
/**
 * @record
 */
export function StatusInterval() { }
/** @type {?} */
StatusInterval.prototype.lower;
/** @type {?} */
StatusInterval.prototype.upper;
/** @type {?} */
StatusInterval.prototype.name;
/** @type {?} */
StatusInterval.prototype.color;
/**
 * @record
 */
export function PlatformParameter() { }
/** @type {?} */
PlatformParameter.prototype.platformType;
var TimeseriesData = /** @class */ (function () {
    function TimeseriesData() {
    }
    return TimeseriesData;
}());
export { TimeseriesData };
if (false) {
    /** @type {?} */
    TimeseriesData.prototype.id;
    /** @type {?} */
    TimeseriesData.prototype.url;
    /** @type {?} */
    TimeseriesData.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFBOzs7aUNBZkE7SUFzQkMsQ0FBQTtBQVBELGtDQU9DOzs7Ozs7Ozs7Ozs7Ozs7QUFFRCxJQUFBOzs7eUJBeEJBO0lBMkJDLENBQUE7QUFIRCwwQkFHQzs7Ozs7OztBQUVELElBQUE7Ozt5QkE3QkE7SUFtQ0MsQ0FBQTtBQU5ELDBCQU1DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJELElBQUE7SUFBbUQseURBQXNCOzs7O3dDQTlEekU7RUE4RG1ELHNCQUFzQixFQUV4RSxDQUFBO0FBRkQseUNBRUM7Ozs7O0FBRUQsSUFBQTs7O2tCQWxFQTtJQWdGQyxDQUFBO0FBZEQsbUJBY0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsSUFBQTs7dUJBWXFCLEtBQUs7O3FCQTlGMUI7SUFnR0MsQ0FBQTtBQWRELHNCQWNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JELElBQUE7Ozt5QkFsSEE7SUFzSEMsQ0FBQTtBQUpELDBCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YXNldFR5cGVzLCBQbGF0Zm9ybVR5cGVzIH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgeyBQYXJhbWV0ZXIgfSBmcm9tICcuL3BhcmFtZXRlcic7XG5pbXBvcnQgeyBTdGF0aW9uIH0gZnJvbSAnLi9zdGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YXNldCBleHRlbmRzIFBhcmFtZXRlciB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgdW9tOiBzdHJpbmc7XG4gICAgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZVtdO1xuICAgIHBhcmFtZXRlcnM6IFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcmVuZGVyaW5nSGludHM6IFJlbmRlcmluZ0hpbnRzO1xufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyQ29uc3RlbGxhdGlvbiB7XG4gICAgcHVibGljIHNlcnZpY2U6IFBhcmFtZXRlcjtcbiAgICBwdWJsaWMgb2ZmZXJpbmc6IFBhcmFtZXRlcjtcbiAgICBwdWJsaWMgZmVhdHVyZTogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBwcm9jZWR1cmU6IFBhcmFtZXRlcjtcbiAgICBwdWJsaWMgcGhlbm9tZW5vbjogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBjYXRlZ29yeTogUGFyYW1ldGVyO1xufVxuXG5leHBvcnQgY2xhc3MgRmlyc3RMYXN0VmFsdWUge1xuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBwdWJsaWMgdmFsdWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlZmVyZW5jZVZhbHVlIHtcbiAgICBwdWJsaWMgcmVmZXJlbmNlVmFsdWVJZDogc3RyaW5nO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyBjb2xvcj86IHN0cmluZztcbiAgICBwdWJsaWMgdmlzaWJsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyaW5nSGludHMge1xuICAgIGNoYXJ0VHlwZTogc3RyaW5nO1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmVSZW5kZXJpbmdIaW50cyBleHRlbmRzIFJlbmRlcmluZ0hpbnRzIHtcbiAgICBjaGFydFR5cGU6ICdsaW5lJztcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgICAgIHdpZHRoOiBzdHJpbmc7XG4gICAgICAgIGxpbmVUeXBlOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXJSZW5kZXJpbmdIaW50cyB7XG4gICAgY2hhcnRUeXBlOiAnYmFyJztcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgICAgIHdpZHRoOiBzdHJpbmc7XG4gICAgICAgIGludGVydmFsOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIERhdGFzZXRQYXJhbWV0ZXJDb25zdGVsbGF0aW9uIGV4dGVuZHMgUGFyYW1ldGVyQ29uc3RlbGxhdGlvbiB7XG4gICAgcHVibGljIHBsYXRmb3JtOiBQbGF0Zm9ybVBhcmFtZXRlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERhdGFzZXQgaW1wbGVtZW50cyBJRGF0YXNldCB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyB1b206IHN0cmluZztcbiAgICBwdWJsaWMgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIHB1YmxpYyBmaXJzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBwdWJsaWMgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBwdWJsaWMgcmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZVtdO1xuICAgIHB1YmxpYyBkYXRhc2V0VHlwZTogRGF0YXNldFR5cGVzO1xuICAgIHB1YmxpYyBwbGF0Zm9ybVR5cGU6IFBsYXRmb3JtVHlwZXM7XG4gICAgcHVibGljIHBhcmFtZXRlcnM6IERhdGFzZXRQYXJhbWV0ZXJDb25zdGVsbGF0aW9uO1xuICAgIHB1YmxpYyBzZXJpZXNQYXJhbWV0ZXJzPzogRGF0YXNldFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcHVibGljIHJlbmRlcmluZ0hpbnRzOiBSZW5kZXJpbmdIaW50cztcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXMgaW1wbGVtZW50cyBJRGF0YXNldCB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyB1b206IHN0cmluZztcbiAgICBwdWJsaWMgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIHB1YmxpYyBmaXJzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBwdWJsaWMgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBwdWJsaWMgcmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZVtdO1xuICAgIHB1YmxpYyBzdGF0aW9uOiBTdGF0aW9uO1xuICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uO1xuICAgIHB1YmxpYyBzdGF0dXNJbnRlcnZhbHM/OiBTdGF0dXNJbnRlcnZhbFtdO1xuICAgIHB1YmxpYyBoYXNEYXRhID0gZmFsc2U7XG4gICAgcHVibGljIHJlbmRlcmluZ0hpbnRzOiBSZW5kZXJpbmdIaW50cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaW1lc2VyaWVzRXh0cmFzIHtcbiAgICBsaWNlbnNlPzogc3RyaW5nO1xuICAgIHN0YXR1c0ludGVydmFscz86IFN0YXR1c0ludGVydmFsW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdHVzSW50ZXJ2YWwge1xuICAgIGxvd2VyOiBzdHJpbmc7XG4gICAgdXBwZXI6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybVBhcmFtZXRlciBleHRlbmRzIFBhcmFtZXRlciB7XG4gICAgcGxhdGZvcm1UeXBlOiBQbGF0Zm9ybVR5cGVzO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0RhdGEge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgZGF0YTogRmlyc3RMYXN0VmFsdWVbXTtcbn1cbiJdfQ==
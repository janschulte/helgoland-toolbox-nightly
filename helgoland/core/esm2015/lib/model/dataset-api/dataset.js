/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class ParameterConstellation {
}
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
export class FirstLastValue {
}
if (false) {
    /** @type {?} */
    FirstLastValue.prototype.timestamp;
    /** @type {?} */
    FirstLastValue.prototype.value;
}
export class ReferenceValue {
}
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
export class DatasetParameterConstellation extends ParameterConstellation {
}
if (false) {
    /** @type {?} */
    DatasetParameterConstellation.prototype.platform;
}
export class Dataset {
}
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
export class Timeseries {
    constructor() {
        this.hasData = false;
    }
}
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
export class TimeseriesData {
}
if (false) {
    /** @type {?} */
    TimeseriesData.prototype.id;
    /** @type {?} */
    TimeseriesData.prototype.url;
    /** @type {?} */
    TimeseriesData.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU07Q0FPTDs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTtDQUdMOzs7Ozs7O0FBRUQsTUFBTTtDQU1MOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJELE1BQU0sb0NBQXFDLFNBQVEsc0JBQXNCO0NBRXhFOzs7OztBQUVELE1BQU07Q0FjTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxNQUFNOzt1QkFZZSxLQUFLOztDQUV6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCRCxNQUFNO0NBSUwiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhc2V0VHlwZXMsIFBsYXRmb3JtVHlwZXMgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IFBhcmFtZXRlciB9IGZyb20gJy4vcGFyYW1ldGVyJztcbmltcG9ydCB7IFN0YXRpb24gfSBmcm9tICcuL3N0YXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhc2V0IGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICB1b206IHN0cmluZztcbiAgICBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcGFyYW1ldGVyczogUGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICByZW5kZXJpbmdIaW50czogUmVuZGVyaW5nSGludHM7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uIHtcbiAgICBwdWJsaWMgc2VydmljZTogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBvZmZlcmluZzogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBmZWF0dXJlOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIHByb2NlZHVyZTogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBwaGVub21lbm9uOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIGNhdGVnb3J5OiBQYXJhbWV0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGaXJzdExhc3RWYWx1ZSB7XG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWUge1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZUlkOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGNvbG9yPzogc3RyaW5nO1xuICAgIHB1YmxpYyB2aXNpYmxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJpbmdIaW50cyB7XG4gICAgY2hhcnRUeXBlOiBzdHJpbmc7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluZVJlbmRlcmluZ0hpbnRzIGV4dGVuZHMgUmVuZGVyaW5nSGludHMge1xuICAgIGNoYXJ0VHlwZTogJ2xpbmUnO1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICAgICAgd2lkdGg6IHN0cmluZztcbiAgICAgICAgbGluZVR5cGU6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhclJlbmRlcmluZ0hpbnRzIHtcbiAgICBjaGFydFR5cGU6ICdiYXInO1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICAgICAgd2lkdGg6IHN0cmluZztcbiAgICAgICAgaW50ZXJ2YWw6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YXNldFBhcmFtZXRlckNvbnN0ZWxsYXRpb24gZXh0ZW5kcyBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uIHtcbiAgICBwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtUGFyYW1ldGVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YXNldCBpbXBsZW1lbnRzIElEYXRhc2V0IHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHVvbTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcHVibGljIGRhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZXM7XG4gICAgcHVibGljIHBsYXRmb3JtVHlwZTogUGxhdGZvcm1UeXBlcztcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogRGF0YXNldFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcHVibGljIHNlcmllc1BhcmFtZXRlcnM/OiBEYXRhc2V0UGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICBwdWJsaWMgcmVuZGVyaW5nSGludHM6IFJlbmRlcmluZ0hpbnRzO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZXNlcmllcyBpbXBsZW1lbnRzIElEYXRhc2V0IHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHVvbTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcHVibGljIHN0YXRpb246IFN0YXRpb247XG4gICAgcHVibGljIHBhcmFtZXRlcnM6IFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcHVibGljIHN0YXR1c0ludGVydmFscz86IFN0YXR1c0ludGVydmFsW107XG4gICAgcHVibGljIGhhc0RhdGEgPSBmYWxzZTtcbiAgICBwdWJsaWMgcmVuZGVyaW5nSGludHM6IFJlbmRlcmluZ0hpbnRzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVzZXJpZXNFeHRyYXMge1xuICAgIGxpY2Vuc2U/OiBzdHJpbmc7XG4gICAgc3RhdHVzSW50ZXJ2YWxzPzogU3RhdHVzSW50ZXJ2YWxbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0dXNJbnRlcnZhbCB7XG4gICAgbG93ZXI6IHN0cmluZztcbiAgICB1cHBlcjogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjb2xvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtUGFyYW1ldGVyIGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICBwbGF0Zm9ybVR5cGU6IFBsYXRmb3JtVHlwZXM7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzRGF0YSB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXRhOiBGaXJzdExhc3RWYWx1ZVtdO1xufVxuIl19
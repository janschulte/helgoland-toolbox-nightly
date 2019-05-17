/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Settings() { }
/** @type {?|undefined} */
Settings.prototype.datasetApis;
/** @type {?|undefined} */
Settings.prototype.providerBlackList;
/** @type {?|undefined} */
Settings.prototype.solveLabels;
/** @type {?|undefined} */
Settings.prototype.proxyUrl;
/** @type {?|undefined} */
Settings.prototype.timespanPresets;
/** @type {?|undefined} */
Settings.prototype.colorList;
/** @type {?|undefined} */
Settings.prototype.languages;
/** @type {?|undefined} */
Settings.prototype.refreshDataInterval;
/**
 * @record
 */
export function DatasetApi() { }
/** @type {?} */
DatasetApi.prototype.name;
/** @type {?} */
DatasetApi.prototype.url;
/** @type {?|undefined} */
DatasetApi.prototype.basicAuth;
/**
 * @record
 */
export function BlacklistedService() { }
/** @type {?} */
BlacklistedService.prototype.serviceId;
/** @type {?} */
BlacklistedService.prototype.apiUrl;
/**
 * @record
 */
export function TimespanPreset() { }
/** @type {?} */
TimespanPreset.prototype.name;
/** @type {?} */
TimespanPreset.prototype.label;
/** @type {?} */
TimespanPreset.prototype.timespan;
/** @type {?|undefined} */
TimespanPreset.prototype.seperatorAfterThisItem;
/**
 * @record
 */
export function ParsedTimespanPreset() { }
/** @type {?} */
ParsedTimespanPreset.prototype.name;
/** @type {?} */
ParsedTimespanPreset.prototype.label;
/** @type {?} */
ParsedTimespanPreset.prototype.timespan;
/** @type {?|undefined} */
ParsedTimespanPreset.prototype.seperatorAfterThisItem;
/**
 * @record
 */
export function TimespanMomentTemplate() { }
/** @type {?} */
TimespanMomentTemplate.prototype.to;
/** @type {?} */
TimespanMomentTemplate.prototype.from;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvc2V0dGluZ3Mvc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnLi8uLi9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgICBkYXRhc2V0QXBpcz86IERhdGFzZXRBcGlbXTtcbiAgICBwcm92aWRlckJsYWNrTGlzdD86IEJsYWNrbGlzdGVkU2VydmljZVtdO1xuICAgIHNvbHZlTGFiZWxzPzogYm9vbGVhbjtcbiAgICBwcm94eVVybD86IHN0cmluZztcbiAgICB0aW1lc3BhblByZXNldHM/OiBUaW1lc3BhblByZXNldFtdO1xuICAgIGNvbG9yTGlzdD86IHN0cmluZ1tdO1xuICAgIGxhbmd1YWdlcz86IFt7IGxhYmVsOiBzdHJpbmcsIGNvZGU6IHN0cmluZyB9XTtcbiAgICByZWZyZXNoRGF0YUludGVydmFsPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFzZXRBcGkge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBiYXNpY0F1dGg/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJsYWNrbGlzdGVkU2VydmljZSB7XG4gICAgc2VydmljZUlkOiBzdHJpbmc7XG4gICAgYXBpVXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZXNwYW5QcmVzZXQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHRpbWVzcGFuOiBUaW1lc3Bhbk1vbWVudFRlbXBsYXRlO1xuICAgIHNlcGVyYXRvckFmdGVyVGhpc0l0ZW0/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZFRpbWVzcGFuUHJlc2V0IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICB0aW1lc3BhbjogVGltZXNwYW47XG4gICAgc2VwZXJhdG9yQWZ0ZXJUaGlzSXRlbT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZXNwYW5Nb21lbnRUZW1wbGF0ZSB7XG4gICAgdG86IHN0cmluZztcbiAgICBmcm9tOiBzdHJpbmc7XG59XG4iXX0=
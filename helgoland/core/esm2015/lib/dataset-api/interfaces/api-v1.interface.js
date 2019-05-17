/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function DatasetApiV1() { }
/**
 * Test
 * \@param id
 * \@return temp
 * @type {?}
 */
DatasetApiV1.prototype.getServices;
/** @type {?} */
DatasetApiV1.prototype.getService;
/** @type {?} */
DatasetApiV1.prototype.getStations;
/** @type {?} */
DatasetApiV1.prototype.getStation;
/** @type {?} */
DatasetApiV1.prototype.getTimeseries;
/** @type {?} */
DatasetApiV1.prototype.getTimeseriesData;
/** @type {?} */
DatasetApiV1.prototype.getSingleTimeseries;
/** @type {?} */
DatasetApiV1.prototype.getSingleTimeseriesByInternalId;
/** @type {?} */
DatasetApiV1.prototype.getTimeseriesExtras;
/** @type {?} */
DatasetApiV1.prototype.getTsData;
/** @type {?} */
DatasetApiV1.prototype.getCategories;
/** @type {?} */
DatasetApiV1.prototype.getCategory;
/** @type {?} */
DatasetApiV1.prototype.getPhenomena;
/** @type {?} */
DatasetApiV1.prototype.getPhenomenon;
/** @type {?} */
DatasetApiV1.prototype.getOfferings;
/** @type {?} */
DatasetApiV1.prototype.getOffering;
/** @type {?} */
DatasetApiV1.prototype.getFeatures;
/** @type {?} */
DatasetApiV1.prototype.getFeature;
/** @type {?} */
DatasetApiV1.prototype.getProcedures;
/** @type {?} */
DatasetApiV1.prototype.getProcedure;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXYxLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9pbnRlcmZhY2VzL2FwaS12MS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9tb2RlbC9kYXRhc2V0LWFwaS9jYXRlZ29yeSc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YSc7XG5pbXBvcnQgeyBUaW1lc2VyaWVzLCBUaW1lc2VyaWVzRGF0YSwgVGltZXNlcmllc0V4dHJhcyB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL2ZlYXR1cmUnO1xuaW1wb3J0IHsgT2ZmZXJpbmcgfSBmcm9tICcuLi8uLi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5pbXBvcnQgeyBQaGVub21lbm9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvZGF0YXNldC1hcGkvcGhlbm9tZW5vbic7XG5pbXBvcnQgeyBQcm9jZWR1cmUgfSBmcm9tICcuLi8uLi9tb2RlbC9kYXRhc2V0LWFwaS9wcm9jZWR1cmUnO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL3NlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL3N0YXRpb24nO1xuaW1wb3J0IHsgRGF0YVBhcmFtZXRlckZpbHRlciwgSHR0cFJlcXVlc3RPcHRpb25zLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcm5hbC9odHRwLXJlcXVlc3RzJztcbmltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhc2V0QXBpVjEge1xuXG4gICAgLyoqXG4gICAgICogVGVzdFxuICAgICAqIEBwYXJhbSBpZFxuICAgICAqIEByZXR1cm4gdGVtcFxuICAgICAqL1xuICAgIGdldFNlcnZpY2VzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFNlcnZpY2VbXT47XG4gICAgZ2V0U2VydmljZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlPjtcblxuICAgIGdldFN0YXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN0YXRpb25bXT47XG4gICAgZ2V0U3RhdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdGF0aW9uPjtcblxuICAgIGdldFRpbWVzZXJpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc1tdPjtcbiAgICBnZXRUaW1lc2VyaWVzRGF0YShhcGlVcmw6IHN0cmluZywgaWRzOiBzdHJpbmdbXSwgdGltZXNwYW46IFRpbWVzcGFuLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRGF0YVtdPjtcbiAgICBnZXRTaW5nbGVUaW1lc2VyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+O1xuICAgIGdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+O1xuICAgIGdldFRpbWVzZXJpZXNFeHRyYXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNFeHRyYXM+O1xuXG4gICAgZ2V0VHNEYXRhPFQ+KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCB0aW1lc3BhbjogVGltZXNwYW4sIHBhcmFtcz86IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGE8VD4+O1xuXG4gICAgZ2V0Q2F0ZWdvcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPjtcbiAgICBnZXRDYXRlZ29yeShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeT47XG5cbiAgICBnZXRQaGVub21lbmEoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbltdPjtcbiAgICBnZXRQaGVub21lbm9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBoZW5vbWVub24+O1xuXG4gICAgZ2V0T2ZmZXJpbmdzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nW10+O1xuICAgIGdldE9mZmVyaW5nKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nPjtcblxuICAgIGdldEZlYXR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT47XG4gICAgZ2V0RmVhdHVyZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlPjtcblxuICAgIGdldFByb2NlZHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlW10+O1xuICAgIGdldFByb2NlZHVyZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQcm9jZWR1cmU+O1xuXG59XG4iXX0=
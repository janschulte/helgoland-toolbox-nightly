/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GeoSearchResult() { }
/** @type {?} */
GeoSearchResult.prototype.name;
/** @type {?} */
GeoSearchResult.prototype.geometry;
/** @type {?|undefined} */
GeoSearchResult.prototype.bounds;
/** @type {?|undefined} */
GeoSearchResult.prototype.address;
/**
 * @record
 */
export function GeoSearchOptions() { }
/** @type {?|undefined} */
GeoSearchOptions.prototype.acceptLanguage;
/** @type {?|undefined} */
GeoSearchOptions.prototype.addressdetails;
/** @type {?|undefined} */
GeoSearchOptions.prototype.asPointGeometry;
/** @type {?|undefined} */
GeoSearchOptions.prototype.countrycodes;
/**
 * @record
 */
export function GeoReverseOptions() { }
/** @type {?|undefined} */
GeoReverseOptions.prototype.acceptLanguage;
/** @type {?|undefined} */
GeoReverseOptions.prototype.addressdetails;
/** @type {?|undefined} */
GeoReverseOptions.prototype.zoom;
/**
 * @record
 */
export function GeoReverseResult() { }
/** @type {?} */
GeoReverseResult.prototype.lat;
/** @type {?} */
GeoReverseResult.prototype.lon;
/** @type {?|undefined} */
GeoReverseResult.prototype.displayName;
/** @type {?|undefined} */
GeoReverseResult.prototype.address;
/** @type {?|undefined} */
GeoReverseResult.prototype.boundingbox;
/**
 * @abstract
 */
export class GeoSearch {
}
if (false) {
    /**
     * @abstract
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    GeoSearch.prototype.searchTerm = function (term, options) { };
    /**
     * @abstract
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    GeoSearch.prototype.reverse = function (point, options) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vvc2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvYmFzZS9nZW9zZWFyY2gvZ2Vvc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2REEsTUFBTTtDQU1MIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdnZW9qc29uJztcbmltcG9ydCB7IExhdExuZ0JvdW5kc0xpdGVyYWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlb1NlYXJjaFJlc3VsdCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGdlb21ldHJ5OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG4gICAgYm91bmRzPzogTGF0TG5nQm91bmRzTGl0ZXJhbDtcbiAgICBhZGRyZXNzPzoge1xuICAgICAgICBjaXR5Pzogc3RyaW5nO1xuICAgICAgICBjaXR5X2Rpc3RyaWN0Pzogc3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rpb24/OiBzdHJpbmc7XG4gICAgICAgIGNvbnRpbmVudD86IHN0cmluZztcbiAgICAgICAgY291bnRyeT86IHN0cmluZztcbiAgICAgICAgY291bnRyeV9jb2RlPzogc3RyaW5nO1xuICAgICAgICBob3VzZV9udW1iZXI/OiBzdHJpbmc7XG4gICAgICAgIG5laWdoYm91cmhvb2Q/OiBzdHJpbmc7XG4gICAgICAgIHBvc3Rjb2RlPzogc3RyaW5nO1xuICAgICAgICBwdWJsaWNfYnVpbGRpbmc/OiBzdHJpbmc7XG4gICAgICAgIHJvYWQ/OiBzdHJpbmc7XG4gICAgICAgIHN0YXRlPzogc3RyaW5nO1xuICAgICAgICBzdWJ1cmI/OiBzdHJpbmc7XG4gICAgICAgIHRvd24/OiBzdHJpbmc7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlb1NlYXJjaE9wdGlvbnMge1xuICAgIGFjY2VwdExhbmd1YWdlPzogc3RyaW5nO1xuICAgIGFkZHJlc3NkZXRhaWxzPzogYm9vbGVhbjtcbiAgICBhc1BvaW50R2VvbWV0cnk/OiBib29sZWFuO1xuICAgIGNvdW50cnljb2Rlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlb1JldmVyc2VPcHRpb25zIHtcbiAgICBhY2NlcHRMYW5ndWFnZT86IHN0cmluZztcbiAgICBhZGRyZXNzZGV0YWlscz86IGJvb2xlYW47XG4gICAgem9vbT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW9SZXZlcnNlUmVzdWx0IHtcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBkaXNwbGF5TmFtZT86IHN0cmluZztcbiAgICBhZGRyZXNzPzoge1xuICAgICAgICBjaXR5OiBzdHJpbmc7XG4gICAgICAgIGNpdHlEaXN0cmljdDogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnlDb2RlOiBzdHJpbmc7XG4gICAgICAgIGNvdW50eTogc3RyaW5nO1xuICAgICAgICBob3VzZU51bWJlcjogc3RyaW5nO1xuICAgICAgICBuZWlnaGJvdXJob29kOiBzdHJpbmc7XG4gICAgICAgIHBvc3Rjb2RlOiBzdHJpbmc7XG4gICAgICAgIHJvYWQ6IHN0cmluZztcbiAgICAgICAgc3RhdGU6IHN0cmluZztcbiAgICAgICAgc3RhdGVEaXN0cmljdDogc3RyaW5nO1xuICAgICAgICBzdWJ1cmI6IHN0cmluZztcbiAgICB9O1xuICAgIGJvdW5kaW5nYm94Pzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW9TZWFyY2gge1xuXG4gICAgcHVibGljIGFic3RyYWN0IHNlYXJjaFRlcm0odGVybTogc3RyaW5nLCBvcHRpb25zPzogR2VvU2VhcmNoT3B0aW9ucyk6IE9ic2VydmFibGU8R2VvU2VhcmNoUmVzdWx0PjtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCByZXZlcnNlKHBvaW50OiBQb2ludCwgb3B0aW9ucz86IEdlb1JldmVyc2VPcHRpb25zKTogT2JzZXJ2YWJsZTxHZW9SZXZlcnNlUmVzdWx0PjtcblxufVxuIl19
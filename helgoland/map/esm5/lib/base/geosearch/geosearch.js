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
var /**
 * @abstract
 */
GeoSearch = /** @class */ (function () {
    function GeoSearch() {
    }
    return GeoSearch;
}());
/**
 * @abstract
 */
export { GeoSearch };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vvc2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvYmFzZS9nZW9zZWFyY2gvZ2Vvc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2REE7OztBQUFBOzs7b0JBN0RBO0lBbUVDLENBQUE7Ozs7QUFORCxxQkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgeyBMYXRMbmdCb3VuZHNMaXRlcmFsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZXhwb3J0IGludGVyZmFjZSBHZW9TZWFyY2hSZXN1bHQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBnZW9tZXRyeTogR2VvSlNPTi5HZW9Kc29uT2JqZWN0O1xuICAgIGJvdW5kcz86IExhdExuZ0JvdW5kc0xpdGVyYWw7XG4gICAgYWRkcmVzcz86IHtcbiAgICAgICAgY2l0eT86IHN0cmluZztcbiAgICAgICAgY2l0eV9kaXN0cmljdD86IHN0cmluZztcbiAgICAgICAgY29uc3RydWN0aW9uPzogc3RyaW5nO1xuICAgICAgICBjb250aW5lbnQ/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnlfY29kZT86IHN0cmluZztcbiAgICAgICAgaG91c2VfbnVtYmVyPzogc3RyaW5nO1xuICAgICAgICBuZWlnaGJvdXJob29kPzogc3RyaW5nO1xuICAgICAgICBwb3N0Y29kZT86IHN0cmluZztcbiAgICAgICAgcHVibGljX2J1aWxkaW5nPzogc3RyaW5nO1xuICAgICAgICByb2FkPzogc3RyaW5nO1xuICAgICAgICBzdGF0ZT86IHN0cmluZztcbiAgICAgICAgc3VidXJiPzogc3RyaW5nO1xuICAgICAgICB0b3duPzogc3RyaW5nO1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW9TZWFyY2hPcHRpb25zIHtcbiAgICBhY2NlcHRMYW5ndWFnZT86IHN0cmluZztcbiAgICBhZGRyZXNzZGV0YWlscz86IGJvb2xlYW47XG4gICAgYXNQb2ludEdlb21ldHJ5PzogYm9vbGVhbjtcbiAgICBjb3VudHJ5Y29kZXM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW9SZXZlcnNlT3B0aW9ucyB7XG4gICAgYWNjZXB0TGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgYWRkcmVzc2RldGFpbHM/OiBib29sZWFuO1xuICAgIHpvb20/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvUmV2ZXJzZVJlc3VsdCB7XG4gICAgbGF0OiBzdHJpbmc7XG4gICAgbG9uOiBzdHJpbmc7XG4gICAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHtcbiAgICAgICAgY2l0eTogc3RyaW5nO1xuICAgICAgICBjaXR5RGlzdHJpY3Q6IHN0cmluZztcbiAgICAgICAgY291bnRyeTogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5Q29kZTogc3RyaW5nO1xuICAgICAgICBjb3VudHk6IHN0cmluZztcbiAgICAgICAgaG91c2VOdW1iZXI6IHN0cmluZztcbiAgICAgICAgbmVpZ2hib3VyaG9vZDogc3RyaW5nO1xuICAgICAgICBwb3N0Y29kZTogc3RyaW5nO1xuICAgICAgICByb2FkOiBzdHJpbmc7XG4gICAgICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgICAgIHN0YXRlRGlzdHJpY3Q6IHN0cmluZztcbiAgICAgICAgc3VidXJiOiBzdHJpbmc7XG4gICAgfTtcbiAgICBib3VuZGluZ2JveD86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VvU2VhcmNoIHtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZWFyY2hUZXJtKHRlcm06IHN0cmluZywgb3B0aW9ucz86IEdlb1NlYXJjaE9wdGlvbnMpOiBPYnNlcnZhYmxlPEdlb1NlYXJjaFJlc3VsdD47XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgcmV2ZXJzZShwb2ludDogUG9pbnQsIG9wdGlvbnM/OiBHZW9SZXZlcnNlT3B0aW9ucyk6IE9ic2VydmFibGU8R2VvUmV2ZXJzZVJlc3VsdD47XG5cbn1cbiJdfQ==
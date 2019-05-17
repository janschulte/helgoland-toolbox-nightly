/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
/**
 * @record
 */
function NominatimSearchResult() { }
/** @type {?} */
NominatimSearchResult.prototype.display_name;
/** @type {?|undefined} */
NominatimSearchResult.prototype.geojson;
/** @type {?} */
NominatimSearchResult.prototype.lat;
/** @type {?} */
NominatimSearchResult.prototype.lon;
/** @type {?} */
NominatimSearchResult.prototype.boundingbox;
/** @type {?|undefined} */
NominatimSearchResult.prototype.address;
/**
 * @record
 */
function Address() { }
/** @type {?} */
Address.prototype.address29;
/** @type {?} */
Address.prototype.house_number;
/** @type {?} */
Address.prototype.road;
/** @type {?} */
Address.prototype.neighbourhood;
/** @type {?} */
Address.prototype.suburb;
/** @type {?} */
Address.prototype.city_district;
/** @type {?} */
Address.prototype.city;
/** @type {?} */
Address.prototype.county;
/** @type {?} */
Address.prototype.state_district;
/** @type {?} */
Address.prototype.state;
/** @type {?} */
Address.prototype.postcode;
/** @type {?} */
Address.prototype.country;
/** @type {?} */
Address.prototype.country_code;
/**
 * @record
 */
function NominatimReverseResult() { }
/** @type {?} */
NominatimReverseResult.prototype.place_id;
/** @type {?} */
NominatimReverseResult.prototype.licence;
/** @type {?} */
NominatimReverseResult.prototype.osm_type;
/** @type {?} */
NominatimReverseResult.prototype.osm_id;
/** @type {?} */
NominatimReverseResult.prototype.lat;
/** @type {?} */
NominatimReverseResult.prototype.lon;
/** @type {?} */
NominatimReverseResult.prototype.display_name;
/** @type {?} */
NominatimReverseResult.prototype.address;
/** @type {?} */
NominatimReverseResult.prototype.boundingbox;
var NominatimGeoSearchService = /** @class */ (function () {
    function NominatimGeoSearchService(http) {
        this.http = http;
        this.serviceUrl = 'https://nominatim.openstreetmap.org/';
    }
    /**
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    NominatimGeoSearchService.prototype.searchTerm = /**
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    function (term, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var params = new HttpParams();
        params = params.set('q', term);
        params = params.set('format', 'json');
        params = params.set('limit', '1');
        if (options.countrycodes) {
            params = params.set('countrycodes', options.countrycodes.join(','));
        }
        if (options.addressdetails !== null) {
            params = params.set('addressdetails', options.addressdetails ? '1' : '0');
        }
        if (options.asPointGeometry !== null) {
            params = params.set('polygon_geojson', options.asPointGeometry ? '0' : '1');
        }
        if (options.acceptLanguage) {
            params = params.set('accept-language', options.acceptLanguage);
        }
        return this.http.client().get(this.serviceUrl + 'search', { params: params }).map(function (resArray) {
            if (resArray.length === 1) {
                /** @type {?} */
                var result = resArray[0];
                /** @type {?} */
                var name_1 = result.display_name;
                /** @type {?} */
                var geometry = void 0;
                if (result.geojson) {
                    geometry = result.geojson;
                }
                else {
                    geometry = {
                        type: 'Point',
                        coordinates: [parseFloat(result.lon), parseFloat(result.lat)]
                    };
                }
                /** @type {?} */
                var returnResult = { name: name_1, geometry: geometry };
                if (result.boundingbox) {
                    returnResult.bounds = [
                        [
                            result.boundingbox[0],
                            result.boundingbox[2]
                        ],
                        [
                            result.boundingbox[1],
                            result.boundingbox[3]
                        ]
                    ];
                }
                if (result.address) {
                    returnResult.address = result.address;
                }
                return returnResult;
            }
        });
    };
    /**
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    NominatimGeoSearchService.prototype.reverse = /**
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    function (point, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var params = new HttpParams();
        params = params.set('lat', point.coordinates[0].toString());
        params = params.set('lon', point.coordinates[1].toString());
        params = params.set('format', 'json');
        if (options && options.addressdetails !== undefined) {
            params = params.set('addressdetails', options.addressdetails ? '1' : '0');
        }
        if (options.acceptLanguage !== null) {
            params = params.set('accept-language', options.acceptLanguage);
        }
        if (options && options.zoom !== undefined) {
            params = params.set('zoom', "" + options.zoom);
        }
        return this.http.client().get(this.serviceUrl + 'reverse', { params: params }).map(function (res) {
            /** @type {?} */
            var result = /** @type {?} */ ({
                lat: res.lat,
                lon: res.lon,
                displayName: res.display_name,
                boundingbox: res.boundingbox
            });
            if (res.address) {
                result.address = {
                    city: res.address.city,
                    cityDistrict: res.address.city_district,
                    country: res.address.country,
                    countryCode: res.address.country_code,
                    county: res.address.county,
                    houseNumber: res.address.house_number,
                    neighbourhood: res.address.neighbourhood,
                    postcode: res.address.postcode,
                    road: res.address.road,
                    state: res.address.state,
                    stateDistrict: res.address.state_district,
                    suburb: res.address.suburb
                };
            }
            return result;
        });
    };
    NominatimGeoSearchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NominatimGeoSearchService.ctorParameters = function () { return [
        { type: HttpService }
    ]; };
    return NominatimGeoSearchService;
}());
export { NominatimGeoSearchService };
if (false) {
    /** @type {?} */
    NominatimGeoSearchService.prototype.serviceUrl;
    /** @type {?} */
    NominatimGeoSearchService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL2dlb3NlYXJjaC9ub21pbmF0aW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE2RDFDLG1DQUNjLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7MEJBSFIsc0NBQXNDO0tBSXhEOzs7Ozs7SUFFRSw4Q0FBVTs7Ozs7Y0FBQyxJQUFZLEVBQUUsT0FBOEI7UUFBOUIsd0JBQUEsRUFBQSxZQUE4Qjs7UUFDMUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDbEcsRUFBRSxDQUFDLENB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R0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLE9BQU8sR0FBRztvQkFDYixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN0QixZQUFZLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUN2QyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPO29CQUM1QixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZO29CQUNyQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUMxQixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZO29CQUNyQyxhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUN4QyxRQUFRLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRO29CQUM5QixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN0QixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUN4QixhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjO29CQUN6QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO2lCQUM3QixDQUFDO2FBQ0w7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCLENBQUMsQ0FBQzs7O2dCQXhGVixVQUFVOzs7O2dCQXhERixXQUFXOztvQ0FKcEI7O1NBNkRhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0IHsgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgR2VvUmV2ZXJzZU9wdGlvbnMsIEdlb1JldmVyc2VSZXN1bHQsIEdlb1NlYXJjaCwgR2VvU2VhcmNoT3B0aW9ucywgR2VvU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi9nZW9zZWFyY2gnO1xuXG5pbnRlcmZhY2UgTm9taW5hdGltU2VhcmNoUmVzdWx0IHtcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBnZW9qc29uPzogR2VvSlNPTi5HZW9Kc29uT2JqZWN0O1xuICAgIGxhdDogc3RyaW5nO1xuICAgIGxvbjogc3RyaW5nO1xuICAgIGJvdW5kaW5nYm94OiBudW1iZXJbXTtcbiAgICBhZGRyZXNzPzoge1xuICAgICAgICBjaXR5Pzogc3RyaW5nO1xuICAgICAgICBjaXR5X2Rpc3RyaWN0Pzogc3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rpb24/OiBzdHJpbmc7XG4gICAgICAgIGNvbnRpbmVudD86IHN0cmluZztcbiAgICAgICAgY291bnRyeT86IHN0cmluZztcbiAgICAgICAgY291bnRyeV9jb2RlPzogc3RyaW5nO1xuICAgICAgICBob3VzZV9udW1iZXI/OiBzdHJpbmc7XG4gICAgICAgIG5laWdoYm91cmhvb2Q/OiBzdHJpbmc7XG4gICAgICAgIHBvc3Rjb2RlPzogc3RyaW5nO1xuICAgICAgICBwdWJsaWNfYnVpbGRpbmc/OiBzdHJpbmc7XG4gICAgICAgIHN0YXRlPzogc3RyaW5nO1xuICAgICAgICBzdWJ1cmI/OiBzdHJpbmc7XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIEFkZHJlc3Mge1xuICAgIGFkZHJlc3MyOTogc3RyaW5nO1xuICAgIGhvdXNlX251bWJlcjogc3RyaW5nO1xuICAgIHJvYWQ6IHN0cmluZztcbiAgICBuZWlnaGJvdXJob29kOiBzdHJpbmc7XG4gICAgc3VidXJiOiBzdHJpbmc7XG4gICAgY2l0eV9kaXN0cmljdDogc3RyaW5nO1xuICAgIGNpdHk6IHN0cmluZztcbiAgICBjb3VudHk6IHN0cmluZztcbiAgICBzdGF0ZV9kaXN0cmljdDogc3RyaW5nO1xuICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgcG9zdGNvZGU6IHN0cmluZztcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgY291bnRyeV9jb2RlOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBOb21pbmF0aW1SZXZlcnNlUmVzdWx0IHtcbiAgICBwbGFjZV9pZDogc3RyaW5nO1xuICAgIGxpY2VuY2U6IHN0cmluZztcbiAgICBvc21fdHlwZTogc3RyaW5nO1xuICAgIG9zbV9pZDogc3RyaW5nO1xuICAgIGxhdDogc3RyaW5nO1xuICAgIGxvbjogc3RyaW5nO1xuICAgIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICAgIGFkZHJlc3M6IEFkZHJlc3M7XG4gICAgYm91bmRpbmdib3g6IHN0cmluZ1tdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9taW5hdGltR2VvU2VhcmNoU2VydmljZSBpbXBsZW1lbnRzIEdlb1NlYXJjaCB7XG5cbiAgICBwcm90ZWN0ZWQgc2VydmljZVVybCA9ICdodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy8nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBodHRwOiBIdHRwU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgc2VhcmNoVGVybSh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM6IEdlb1NlYXJjaE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8R2VvU2VhcmNoUmVzdWx0PiB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdxJywgdGVybSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2Zvcm1hdCcsICdqc29uJyk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2xpbWl0JywgJzEnKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuY291bnRyeWNvZGVzKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2NvdW50cnljb2RlcycsIG9wdGlvbnMuY291bnRyeWNvZGVzLmpvaW4oJywnKSk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkcmVzc2RldGFpbHMgIT09IG51bGwpIHsgcGFyYW1zID0gcGFyYW1zLnNldCgnYWRkcmVzc2RldGFpbHMnLCBvcHRpb25zLmFkZHJlc3NkZXRhaWxzID8gJzEnIDogJzAnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hc1BvaW50R2VvbWV0cnkgIT09IG51bGwpIHsgcGFyYW1zID0gcGFyYW1zLnNldCgncG9seWdvbl9nZW9qc29uJywgb3B0aW9ucy5hc1BvaW50R2VvbWV0cnkgPyAnMCcgOiAnMScpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLmFjY2VwdExhbmd1YWdlKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2FjY2VwdC1sYW5ndWFnZScsIG9wdGlvbnMuYWNjZXB0TGFuZ3VhZ2UpOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuY2xpZW50KCkuZ2V0KFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlVXJsICsgJ3NlYXJjaCcsXG4gICAgICAgICAgICB7IHBhcmFtcyB9XG4gICAgICAgICkubWFwKChyZXNBcnJheTogTm9taW5hdGltU2VhcmNoUmVzdWx0W10pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNBcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNBcnJheVswXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcmVzdWx0LmRpc3BsYXlfbmFtZTtcbiAgICAgICAgICAgICAgICBsZXQgZ2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5nZW9qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5ID0gcmVzdWx0Lmdlb2pzb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFtwYXJzZUZsb2F0KHJlc3VsdC5sb24pLCBwYXJzZUZsb2F0KHJlc3VsdC5sYXQpXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5SZXN1bHQ6IEdlb1NlYXJjaFJlc3VsdCA9IHsgbmFtZSwgZ2VvbWV0cnkgfTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJvdW5kaW5nYm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblJlc3VsdC5ib3VuZHMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kaW5nYm94WzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFsyXVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm91bmRpbmdib3hbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kaW5nYm94WzNdXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYWRkcmVzcykgeyByZXR1cm5SZXN1bHQuYWRkcmVzcyA9IHJlc3VsdC5hZGRyZXNzOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJldmVyc2UocG9pbnQ6IFBvaW50LCBvcHRpb25zOiBHZW9SZXZlcnNlT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxHZW9SZXZlcnNlUmVzdWx0PiB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdsYXQnLCBwb2ludC5jb29yZGluYXRlc1swXS50b1N0cmluZygpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnbG9uJywgcG9pbnQuY29vcmRpbmF0ZXNbMV0udG9TdHJpbmcoKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2Zvcm1hdCcsICdqc29uJyk7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWRkcmVzc2RldGFpbHMgIT09IHVuZGVmaW5lZCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhZGRyZXNzZGV0YWlscycsIG9wdGlvbnMuYWRkcmVzc2RldGFpbHMgPyAnMScgOiAnMCcpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLmFjY2VwdExhbmd1YWdlICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2FjY2VwdC1sYW5ndWFnZScsIG9wdGlvbnMuYWNjZXB0TGFuZ3VhZ2UpOyB9XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuem9vbSAhPT0gdW5kZWZpbmVkKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3pvb20nLCBgJHtvcHRpb25zLnpvb219YCk7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5jbGllbnQoKS5nZXQoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VVcmwgKyAncmV2ZXJzZScsXG4gICAgICAgICAgICB7IHBhcmFtcyB9XG4gICAgICAgICkubWFwKChyZXM6IE5vbWluYXRpbVJldmVyc2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBsYXQ6IHJlcy5sYXQsXG4gICAgICAgICAgICAgICAgbG9uOiByZXMubG9uLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiByZXMuZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgIGJvdW5kaW5nYm94OiByZXMuYm91bmRpbmdib3hcbiAgICAgICAgICAgIH0gYXMgR2VvUmV2ZXJzZVJlc3VsdDtcbiAgICAgICAgICAgIGlmIChyZXMuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGRyZXNzID0ge1xuICAgICAgICAgICAgICAgICAgICBjaXR5OiByZXMuYWRkcmVzcy5jaXR5LFxuICAgICAgICAgICAgICAgICAgICBjaXR5RGlzdHJpY3Q6IHJlcy5hZGRyZXNzLmNpdHlfZGlzdHJpY3QsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlcy5hZGRyZXNzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiByZXMuYWRkcmVzcy5jb3VudHJ5X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50eTogcmVzLmFkZHJlc3MuY291bnR5LFxuICAgICAgICAgICAgICAgICAgICBob3VzZU51bWJlcjogcmVzLmFkZHJlc3MuaG91c2VfbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvdXJob29kOiByZXMuYWRkcmVzcy5uZWlnaGJvdXJob29kLFxuICAgICAgICAgICAgICAgICAgICBwb3N0Y29kZTogcmVzLmFkZHJlc3MucG9zdGNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHJvYWQ6IHJlcy5hZGRyZXNzLnJvYWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiByZXMuYWRkcmVzcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVEaXN0cmljdDogcmVzLmFkZHJlc3Muc3RhdGVfZGlzdHJpY3QsXG4gICAgICAgICAgICAgICAgICAgIHN1YnVyYjogcmVzLmFkZHJlc3Muc3VidXJiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
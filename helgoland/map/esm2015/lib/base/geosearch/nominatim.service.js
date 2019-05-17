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
export class NominatimGeoSearchService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.serviceUrl = 'https://nominatim.openstreetmap.org/';
    }
    /**
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    searchTerm(term, options = {}) {
        /** @type {?} */
        let params = new HttpParams();
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
        return this.http.client().get(this.serviceUrl + 'search', { params }).map((resArray) => {
            if (resArray.length === 1) {
                /** @type {?} */
                const result = resArray[0];
                /** @type {?} */
                const name = result.display_name;
                /** @type {?} */
                let geometry;
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
                const returnResult = { name, geometry };
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
    }
    /**
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    reverse(point, options = {}) {
        /** @type {?} */
        let params = new HttpParams();
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
            params = params.set('zoom', `${options.zoom}`);
        }
        return this.http.client().get(this.serviceUrl + 'reverse', { params }).map((res) => {
            /** @type {?} */
            const result = /** @type {?} */ ({
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
    }
}
NominatimGeoSearchService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NominatimGeoSearchService.ctorParameters = () => [
    { type: HttpService }
];
if (false) {
    /** @type {?} */
    NominatimGeoSearchService.prototype.serviceUrl;
    /** @type {?} */
    NominatimGeoSearchService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL2dlb3NlYXJjaC9ub21pbmF0aW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlEOUMsTUFBTTs7OztJQUlGLFlBQ2MsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTswQkFIUixzQ0FBc0M7S0FJeEQ7Ozs7OztJQUVFLFVBQVUsQ0FBQyxJQUFZLEVBQUUsVUFBNEIsRUFBRTs7UUFDMUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDbEcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFD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Z0JBQ2QsTUFBTSxDQUFDLE9BQU8sR0FBRztvQkFDYixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN0QixZQUFZLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUN2QyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPO29CQUM1QixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZO29CQUNyQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUMxQixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZO29CQUNyQyxhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUN4QyxRQUFRLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRO29CQUM5QixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN0QixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUN4QixhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjO29CQUN6QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO2lCQUM3QixDQUFDO2FBQ0w7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCLENBQUMsQ0FBQzs7OztZQXhGVixVQUFVOzs7O1lBeERGLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEdlb1JldmVyc2VPcHRpb25zLCBHZW9SZXZlcnNlUmVzdWx0LCBHZW9TZWFyY2gsIEdlb1NlYXJjaE9wdGlvbnMsIEdlb1NlYXJjaFJlc3VsdCB9IGZyb20gJy4vZ2Vvc2VhcmNoJztcblxuaW50ZXJmYWNlIE5vbWluYXRpbVNlYXJjaFJlc3VsdCB7XG4gICAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gICAgZ2VvanNvbj86IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBib3VuZGluZ2JveDogbnVtYmVyW107XG4gICAgYWRkcmVzcz86IHtcbiAgICAgICAgY2l0eT86IHN0cmluZztcbiAgICAgICAgY2l0eV9kaXN0cmljdD86IHN0cmluZztcbiAgICAgICAgY29uc3RydWN0aW9uPzogc3RyaW5nO1xuICAgICAgICBjb250aW5lbnQ/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnlfY29kZT86IHN0cmluZztcbiAgICAgICAgaG91c2VfbnVtYmVyPzogc3RyaW5nO1xuICAgICAgICBuZWlnaGJvdXJob29kPzogc3RyaW5nO1xuICAgICAgICBwb3N0Y29kZT86IHN0cmluZztcbiAgICAgICAgcHVibGljX2J1aWxkaW5nPzogc3RyaW5nO1xuICAgICAgICBzdGF0ZT86IHN0cmluZztcbiAgICAgICAgc3VidXJiPzogc3RyaW5nO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBBZGRyZXNzIHtcbiAgICBhZGRyZXNzMjk6IHN0cmluZztcbiAgICBob3VzZV9udW1iZXI6IHN0cmluZztcbiAgICByb2FkOiBzdHJpbmc7XG4gICAgbmVpZ2hib3VyaG9vZDogc3RyaW5nO1xuICAgIHN1YnVyYjogc3RyaW5nO1xuICAgIGNpdHlfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBjaXR5OiBzdHJpbmc7XG4gICAgY291bnR5OiBzdHJpbmc7XG4gICAgc3RhdGVfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHBvc3Rjb2RlOiBzdHJpbmc7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIGNvdW50cnlfY29kZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTm9taW5hdGltUmV2ZXJzZVJlc3VsdCB7XG4gICAgcGxhY2VfaWQ6IHN0cmluZztcbiAgICBsaWNlbmNlOiBzdHJpbmc7XG4gICAgb3NtX3R5cGU6IHN0cmluZztcbiAgICBvc21faWQ6IHN0cmluZztcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBhZGRyZXNzOiBBZGRyZXNzO1xuICAgIGJvdW5kaW5nYm94OiBzdHJpbmdbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vbWluYXRpbUdlb1NlYXJjaFNlcnZpY2UgaW1wbGVtZW50cyBHZW9TZWFyY2gge1xuXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VVcmwgPSAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cFNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHNlYXJjaFRlcm0odGVybTogc3RyaW5nLCBvcHRpb25zOiBHZW9TZWFyY2hPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEdlb1NlYXJjaFJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgncScsIHRlcm0pO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdsaW1pdCcsICcxJyk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvdW50cnljb2RlcykgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdjb3VudHJ5Y29kZXMnLCBvcHRpb25zLmNvdW50cnljb2Rlcy5qb2luKCcsJykpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2FkZHJlc3NkZXRhaWxzJywgb3B0aW9ucy5hZGRyZXNzZGV0YWlscyA/ICcxJyA6ICcwJyk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3BvbHlnb25fZ2VvanNvbicsIG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ID8gJzAnIDogJzEnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmNsaWVudCgpLmdldChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVVybCArICdzZWFyY2gnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzQXJyYXk6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzQXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJlc3VsdC5kaXNwbGF5X25hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZ2VvanNvbikge1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IHJlc3VsdC5nZW9qc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbcGFyc2VGbG9hdChyZXN1bHQubG9uKSwgcGFyc2VGbG9hdChyZXN1bHQubGF0KV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuUmVzdWx0OiBHZW9TZWFyY2hSZXN1bHQgPSB7IG5hbWUsIGdlb21ldHJ5IH07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5ib3VuZGluZ2JveCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5SZXN1bHQuYm91bmRzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm91bmRpbmdib3hbMl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kaW5nYm94WzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFszXVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFkZHJlc3MpIHsgcmV0dXJuUmVzdWx0LmFkZHJlc3MgPSByZXN1bHQuYWRkcmVzczsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5SZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXZlcnNlKHBvaW50OiBQb2ludCwgb3B0aW9uczogR2VvUmV2ZXJzZU9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8R2VvUmV2ZXJzZVJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnbGF0JywgcG9pbnQuY29vcmRpbmF0ZXNbMF0udG9TdHJpbmcoKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2xvbicsIHBvaW50LmNvb3JkaW5hdGVzWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSB1bmRlZmluZWQpIHsgcGFyYW1zID0gcGFyYW1zLnNldCgnYWRkcmVzc2RldGFpbHMnLCBvcHRpb25zLmFkZHJlc3NkZXRhaWxzID8gJzEnIDogJzAnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSAhPT0gbnVsbCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCd6b29tJywgYCR7b3B0aW9ucy56b29tfWApOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuY2xpZW50KCkuZ2V0KFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlVXJsICsgJ3JldmVyc2UnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzOiBOb21pbmF0aW1SZXZlcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgbGF0OiByZXMubGF0LFxuICAgICAgICAgICAgICAgIGxvbjogcmVzLmxvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcmVzLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICBib3VuZGluZ2JveDogcmVzLmJvdW5kaW5nYm94XG4gICAgICAgICAgICB9IGFzIEdlb1JldmVyc2VSZXN1bHQ7XG4gICAgICAgICAgICBpZiAocmVzLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkcmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogcmVzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgY2l0eURpc3RyaWN0OiByZXMuYWRkcmVzcy5jaXR5X2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXMuYWRkcmVzcy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogcmVzLmFkZHJlc3MuY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb3VudHk6IHJlcy5hZGRyZXNzLmNvdW50eSxcbiAgICAgICAgICAgICAgICAgICAgaG91c2VOdW1iZXI6IHJlcy5hZGRyZXNzLmhvdXNlX251bWJlcixcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3VyaG9vZDogcmVzLmFkZHJlc3MubmVpZ2hib3VyaG9vZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNvZGU6IHJlcy5hZGRyZXNzLnBvc3Rjb2RlLFxuICAgICAgICAgICAgICAgICAgICByb2FkOiByZXMuYWRkcmVzcy5yb2FkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogcmVzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlRGlzdHJpY3Q6IHJlcy5hZGRyZXNzLnN0YXRlX2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBzdWJ1cmI6IHJlcy5hZGRyZXNzLnN1YnVyYlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
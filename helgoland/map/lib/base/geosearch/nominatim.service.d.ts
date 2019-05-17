import 'rxjs/add/operator/map';
import { HttpService } from '@helgoland/core';
import { Point } from 'geojson';
import { Observable } from 'rxjs/Observable';
import { GeoReverseOptions, GeoReverseResult, GeoSearch, GeoSearchOptions, GeoSearchResult } from './geosearch';
export declare class NominatimGeoSearchService implements GeoSearch {
    protected http: HttpService;
    protected serviceUrl: string;
    constructor(http: HttpService);
    searchTerm(term: string, options?: GeoSearchOptions): Observable<GeoSearchResult>;
    reverse(point: Point, options?: GeoReverseOptions): Observable<GeoReverseResult>;
}

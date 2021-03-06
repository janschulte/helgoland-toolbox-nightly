import { Point } from 'geojson';
import { LatLngBoundsLiteral } from 'leaflet';
import { Observable } from 'rxjs/Observable';
export interface GeoSearchResult {
    name: string;
    geometry: GeoJSON.GeoJsonObject;
    bounds?: LatLngBoundsLiteral;
    address?: {
        city?: string;
        city_district?: string;
        construction?: string;
        continent?: string;
        country?: string;
        country_code?: string;
        house_number?: string;
        neighbourhood?: string;
        postcode?: string;
        public_building?: string;
        road?: string;
        state?: string;
        suburb?: string;
        town?: string;
        [key: string]: string;
    };
}
export interface GeoSearchOptions {
    acceptLanguage?: string;
    addressdetails?: boolean;
    asPointGeometry?: boolean;
    countrycodes?: string[];
}
export interface GeoReverseOptions {
    acceptLanguage?: string;
    addressdetails?: boolean;
    zoom?: number;
}
export interface GeoReverseResult {
    lat: string;
    lon: string;
    displayName?: string;
    address?: {
        city: string;
        cityDistrict: string;
        country: string;
        countryCode: string;
        county: string;
        houseNumber: string;
        neighbourhood: string;
        postcode: string;
        road: string;
        state: string;
        stateDistrict: string;
        suburb: string;
    };
    boundingbox?: string[];
}
export declare abstract class GeoSearch {
    abstract searchTerm(term: string, options?: GeoSearchOptions): Observable<GeoSearchResult>;
    abstract reverse(point: Point, options?: GeoReverseOptions): Observable<GeoReverseResult>;
}

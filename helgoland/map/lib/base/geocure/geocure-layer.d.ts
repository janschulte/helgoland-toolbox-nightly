import { HttpClient } from '@angular/common/http';
import { GeoJSON, GeoJSONOptions, LeafletEvent } from 'leaflet';
export interface GeoCureGeoJSONOptions extends GeoJSONOptions {
    url: string;
    httpClient: HttpClient;
    showOnMinZoom?: number;
    showOnMaxZoom?: number;
}
export declare class GeoCureGeoJSON extends GeoJSON {
    options: GeoCureGeoJSONOptions;
    constructor(options?: GeoCureGeoJSONOptions);
    getEvents(): {
        moveend: (event: LeafletEvent) => void;
    };
    onAdd(map: L.Map): this;
    private fetchData(map);
    private loadData(bounds);
}

import { EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearch, GeoSearchOptions, GeoSearchResult } from '../../base/geosearch/geosearch';
import { MapCache } from '../../base/map-cache.service';
export declare class GeosearchControlComponent {
    protected mapCache: MapCache;
    protected geosearch: GeoSearch;
    /**
     * Connect map id.
     */
    mapId: string;
    /**
     * Additional search options.
     */
    options: GeoSearchOptions;
    /**
     * Returns the search result.
     */
    onResultChanged: EventEmitter<GeoSearchResult>;
    /**
     * Informs, when the search is triggered.
     */
    onSearchTriggered: EventEmitter<void>;
    result: GeoSearchResult;
    resultGeometry: L.GeoJSON;
    searchTerm: string;
    loading: boolean;
    constructor(mapCache: MapCache, geosearch: GeoSearch);
    triggerSearch(): void;
    clearSearch(): void;
    private removeOldGeometry();
}

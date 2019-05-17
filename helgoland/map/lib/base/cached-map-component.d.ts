import { DoCheck, EventEmitter, KeyValueDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapCache } from './map-cache.service';
import { LayerOptions } from './map-options';
export declare abstract class CachedMapComponent implements OnChanges, DoCheck, OnDestroy, OnInit {
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    /**
     * A map with the given ID is created inside this component. This ID can be used the get the map instance over the map cache service.
     */
    mapId: string;
    /**
     * The corresponding leaflet map options (see: https://leafletjs.com/reference-1.3.4.html#map-option)
     */
    mapOptions: L.MapOptions;
    /**
     * Bounds for the map
     */
    fitBounds: L.LatLngBoundsExpression;
    /**
     * Map, which holds all overlay map layer (see: https://leafletjs.com/reference-1.3.4.html#layer)
     */
    overlayMaps: Map<string, LayerOptions>;
    /**
     * Map, which holds all base map layer (see: https://leafletjs.com/reference-1.3.4.html#layer)
     */
    baseMaps: Map<string, LayerOptions>;
    /**
     * Describes the the zoom options (see: https://leafletjs.com/reference-1.3.4.html#control-layers)
     */
    layerControlOptions: L.Control.LayersOptions;
    /**
     * Describes the the zoom control options (see: https://leafletjs.com/reference-1.3.4.html#control-zoom)
     */
    zoomControlOptions: L.Control.ZoomOptions;
    /**
     * Informs when initialization is done with map id.
     */
    mapInitialized: EventEmitter<string>;
    /**
     * The map object.
     */
    protected map: L.Map;
    protected oldOverlayLayer: L.Control.LayersObject;
    protected oldBaseLayer: L.Control.LayersObject;
    protected layerControl: L.Control.Layers;
    protected zoomControl: L.Control.Zoom;
    private _overlayMaps;
    private _differOverlayMaps;
    private _baseMaps;
    private _differBaseMaps;
    constructor(mapCache: MapCache, differs: KeyValueDiffers);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    protected createMap(): void;
    private generateUUID();
    private addOverlayMap(layerOptions);
    private removeOverlayMap(layerOptions);
    private addBaseMap(layerOptions?);
    private removeBaseMap(layerOptions);
    private updateLayerControl();
    private updateZoomControl();
}

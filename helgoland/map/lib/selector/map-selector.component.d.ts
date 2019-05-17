import { AfterViewInit, ChangeDetectorRef, EventEmitter, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { HasLoadableContent, ParameterFilter } from '@helgoland/core';
import * as L from 'leaflet';
import { CachedMapComponent } from '../base/cached-map-component';
import { MapCache } from '../base/map-cache.service';
import { MarkerSelectorGenerator } from './model/marker-selector-generator';
export declare abstract class MapSelectorComponent<T> extends CachedMapComponent implements OnChanges, AfterViewInit, HasLoadableContent {
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    protected cd: ChangeDetectorRef;
    /**
     * @input The serviceUrl, where the selection should be loaded.
     */
    serviceUrl: string;
    /**
     * @input The filter which should be used, while fetching the selection.
     */
    filter: ParameterFilter;
    avoidZoomToSelection: boolean;
    markerSelectorGenerator: MarkerSelectorGenerator;
    onSelected: EventEmitter<T>;
    onContentLoading: EventEmitter<boolean>;
    /**
     * @input Additional configuration for the marker zooming (https://leafletjs.com/reference-1.3.4.html#fitbounds-options)
     */
    fitBoundsMarkerOptions: L.FitBoundsOptions;
    isContentLoading: (loading: boolean) => void;
    onNoResultsFound: EventEmitter<boolean>;
    constructor(mapCache: MapCache, differs: KeyValueDiffers, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Draws the geometries
     *
     * @protected
     * @abstract
     * @memberof MapSelectorComponent
     */
    protected abstract drawGeometries(): void;
    /**
     * Zooms to the given bounds
     *
     * @protected
     * @param bounds where to zoom
     * @memberof MapSelectorComponent
     */
    protected zoomToMarkerBounds(bounds: L.LatLngBoundsExpression): void;
}

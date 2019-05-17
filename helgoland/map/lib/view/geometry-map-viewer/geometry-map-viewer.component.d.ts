import { AfterViewInit, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { CachedMapComponent } from '../../base/cached-map-component';
import { MapCache } from '../../base/map-cache.service';
export declare class GeometryMapViewerComponent extends CachedMapComponent implements AfterViewInit, OnChanges {
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    highlight: GeoJSON.GeoJsonObject;
    geometry: GeoJSON.GeoJsonObject;
    zoomTo: GeoJSON.GeoJsonObject;
    avoidZoomToGeometry: boolean;
    private highlightGeometry;
    private defaultStyle;
    private highlightStyle;
    constructor(mapCache: MapCache, differs: KeyValueDiffers);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private zoomToGeometry();
    private showHighlight();
    private drawGeometry();
}

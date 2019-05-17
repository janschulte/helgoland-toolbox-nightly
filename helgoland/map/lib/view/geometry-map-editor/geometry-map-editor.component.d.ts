import { AfterViewInit, EventEmitter, KeyValueDiffers, OnChanges } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
import { GeometryMapViewerComponent } from '../geometry-map-viewer/geometry-map-viewer.component';
export declare class GeometryMapEditorComponent extends GeometryMapViewerComponent implements AfterViewInit, OnChanges {
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    geometryChanged: EventEmitter<GeoJSON.GeoJsonObject>;
    private move;
    constructor(mapCache: MapCache, differs: KeyValueDiffers);
    ngAfterViewInit(): void;
    private onDragEnd(evt);
    private onDragMove(evt);
    private onDragStart(evt);
}

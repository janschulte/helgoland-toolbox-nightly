import 'leaflet.markercluster';
import { AfterViewInit, ChangeDetectorRef, EventEmitter, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetApiInterface, Timespan } from '@helgoland/core';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
import { TrajectoryResult } from '../model/trajectory-result';
export declare class ProfileTrajectoryMapSelectorComponent extends MapSelectorComponent<TrajectoryResult> implements OnChanges, AfterViewInit {
    protected apiInterface: DatasetApiInterface;
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    protected cd: ChangeDetectorRef;
    selectedTimespan: Timespan;
    onTimeListDetermined: EventEmitter<number[]>;
    private layer;
    private data;
    private dataset;
    private defaultStyle;
    private highlightStyle;
    constructor(apiInterface: DatasetApiInterface, mapCache: MapCache, differs: KeyValueDiffers, cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    protected drawGeometries(): void;
    private initLayer();
    private clearMap();
    private createGeoJson(profileDataEntry, dataset);
}

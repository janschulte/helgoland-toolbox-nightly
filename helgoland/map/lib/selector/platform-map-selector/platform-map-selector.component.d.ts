import 'leaflet.markercluster';
import { AfterViewInit, ChangeDetectorRef, KeyValueDiffers, OnChanges } from '@angular/core';
import { DatasetApiInterface, Platform } from '@helgoland/core';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
export declare class PlatformMapSelectorComponent extends MapSelectorComponent<Platform> implements OnChanges, AfterViewInit {
    protected apiInterface: DatasetApiInterface;
    protected mapCache: MapCache;
    protected cd: ChangeDetectorRef;
    protected differs: KeyValueDiffers;
    cluster: boolean;
    private markerFeatureGroup;
    constructor(apiInterface: DatasetApiInterface, mapCache: MapCache, cd: ChangeDetectorRef, differs: KeyValueDiffers);
    protected drawGeometries(): void;
}

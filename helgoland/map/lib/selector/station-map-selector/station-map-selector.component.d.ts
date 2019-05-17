import 'leaflet.markercluster';
import 'rxjs/add/observable/forkJoin';
import { AfterViewInit, ChangeDetectorRef, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetApiInterface, Station, StatusIntervalResolverService } from '@helgoland/core';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
export declare class StationMapSelectorComponent extends MapSelectorComponent<Station> implements OnChanges, AfterViewInit {
    protected statusIntervalResolver: StatusIntervalResolverService;
    protected apiInterface: DatasetApiInterface;
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    protected cd: ChangeDetectorRef;
    cluster: boolean;
    statusIntervals: boolean;
    /**
     * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
     */
    ignoreStatusIntervalIfBeforeDuration: number;
    private markerFeatureGroup;
    constructor(statusIntervalResolver: StatusIntervalResolverService, apiInterface: DatasetApiInterface, mapCache: MapCache, differs: KeyValueDiffers, cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    protected drawGeometries(): void;
    private createValuedMarkers();
    private createColoredMarker(station, color);
    private createDefaultColoredMarker(station);
    private createFilledMarker(station, color, radius);
    private createStationGeometries();
    private createDefaultGeometry(station);
}

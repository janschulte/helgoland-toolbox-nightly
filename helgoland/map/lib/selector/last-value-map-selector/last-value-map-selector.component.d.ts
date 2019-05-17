import { AfterViewInit, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
import { DatasetApiInterface, StatusIntervalResolverService, Timeseries } from '@helgoland/core';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
import { LastValueLabelGenerator, LastValuePresentation } from '../services/last-value-label-generator.interface';
/**
 * Displays selectable series with their last values on an map.
 */
export declare class LastValueMapSelectorComponent extends MapSelectorComponent<Timeseries> implements AfterViewInit {
    protected mapCache: MapCache;
    protected differs: KeyValueDiffers;
    protected cd: ChangeDetectorRef;
    protected apiInterface: DatasetApiInterface;
    protected lastValueLabelGenerator: LastValueLabelGenerator;
    protected statusIntervalResolver: StatusIntervalResolverService;
    /**
     * The list of internal series IDs, which should be presented with their last values on the map.
     */
    lastValueSeriesIDs: string[];
    /**
     * Presentation type how to display the series.
     */
    lastValuePresentation: LastValuePresentation;
    /**
     * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
     */
    ignoreStatusIntervalIfBeforeDuration: number;
    private markerFeatureGroup;
    constructor(mapCache: MapCache, differs: KeyValueDiffers, cd: ChangeDetectorRef, apiInterface: DatasetApiInterface, lastValueLabelGenerator: LastValueLabelGenerator, statusIntervalResolver: StatusIntervalResolverService);
    protected drawGeometries(): void;
    private createMarkersBySeriesIDs();
    private createMarker(ts);
    private finalizeMarkerObservables(obsList);
    private createColorizedMarker(ts);
    private createColoredMarker(ts, color);
    private createDefaultColoredMarker(ts);
    private createFilledMarker(ts, color, radius);
    private createLabeledMarker(ts);
}

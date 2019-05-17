/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input, KeyValueDiffers } from '@angular/core';
import { DatasetApiInterface, HasLoadableContent, Mixin, StatusIntervalResolverService, } from '@helgoland/core';
import { circleMarker, featureGroup, geoJSON, marker } from 'leaflet';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
import { LastValueLabelGenerator } from '../services/last-value-label-generator.interface';
/**
 * Displays selectable series with their last values on an map.
 */
let LastValueMapSelectorComponent = /**
 * Displays selectable series with their last values on an map.
 */
class LastValueMapSelectorComponent extends MapSelectorComponent {
    /**
     * @param {?} mapCache
     * @param {?} differs
     * @param {?} cd
     * @param {?} apiInterface
     * @param {?} lastValueLabelGenerator
     * @param {?} statusIntervalResolver
     */
    constructor(mapCache, differs, cd, apiInterface, lastValueLabelGenerator, statusIntervalResolver) {
        super(mapCache, differs, cd);
        this.mapCache = mapCache;
        this.differs = differs;
        this.cd = cd;
        this.apiInterface = apiInterface;
        this.lastValueLabelGenerator = lastValueLabelGenerator;
        this.statusIntervalResolver = statusIntervalResolver;
        /**
         * Presentation type how to display the series.
         */
        this.lastValuePresentation = 0 /* Colorized */;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        this.ignoreStatusIntervalIfBeforeDuration = Infinity;
    }
    /**
     * @return {?}
     */
    drawGeometries() {
        this.isContentLoading(true);
        if (this.lastValueSeriesIDs && this.lastValueSeriesIDs.length) {
            this.createMarkersBySeriesIDs();
        }
    }
    /**
     * @return {?}
     */
    createMarkersBySeriesIDs() {
        this.markerFeatureGroup = featureGroup();
        /** @type {?} */
        const obsList = [];
        this.lastValueSeriesIDs.forEach(entry => {
            /** @type {?} */
            const tsObs = this.apiInterface.getSingleTimeseriesByInternalId(entry);
            obsList.push(tsObs.pipe(switchMap(val => this.createMarker(val).pipe(tap(res => {
                this.markerFeatureGroup.addLayer(res);
                res.on('click', () => this.onSelected.emit(val));
            })))));
        });
        this.finalizeMarkerObservables(obsList);
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    createMarker(ts) {
        switch (this.lastValuePresentation) {
            case 0 /* Colorized */:
                return this.createColorizedMarker(ts);
            case 1 /* Textual */:
                return this.createLabeledMarker(ts);
        }
        return this.createColorizedMarker(ts);
    }
    /**
     * @param {?} obsList
     * @return {?}
     */
    finalizeMarkerObservables(obsList) {
        forkJoin(obsList).subscribe(() => {
            console.log('do zoom to bounds');
            if (this.map) {
                /** @type {?} */
                const bounds = this.markerFeatureGroup.getBounds();
                this.zoomToMarkerBounds(bounds);
                this.map.invalidateSize();
            }
            this.isContentLoading(false);
        });
        if (this.map) {
            this.markerFeatureGroup.addTo(this.map);
        }
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    createColorizedMarker(ts) {
        return new Observable((observer) => {
            this.apiInterface.getTimeseriesExtras(ts.id, ts.url).subscribe((extras) => {
                /** @type {?} */
                let coloredMarker;
                if (extras.statusIntervals) {
                    if ((ts.lastValue.timestamp) > new Date().getTime() - this.ignoreStatusIntervalIfBeforeDuration) {
                        /** @type {?} */
                        const interval = this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                        if (interval) {
                            coloredMarker = this.createColoredMarker(ts, interval.color);
                        }
                    }
                }
                if (!coloredMarker) {
                    coloredMarker = this.createDefaultColoredMarker(ts);
                }
                observer.next(coloredMarker);
                observer.complete();
            });
        });
    }
    /**
     * @param {?} ts
     * @param {?} color
     * @return {?}
     */
    createColoredMarker(ts, color) {
        return this.createFilledMarker(ts, color, 10);
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    createDefaultColoredMarker(ts) {
        return this.createFilledMarker(ts, '#000', 10);
    }
    /**
     * @param {?} ts
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    createFilledMarker(ts, color, radius) {
        /** @type {?} */
        let geometry;
        if (ts.station.geometry.type === 'Point') {
            /** @type {?} */
            const point = /** @type {?} */ (ts.station.geometry);
            geometry = circleMarker([point.coordinates[1], point.coordinates[0]], {
                color: '#000',
                fillColor: color,
                fillOpacity: 0.8,
                radius: 10,
                weight: 2
            });
        }
        else {
            geometry = geoJSON(ts.station.geometry, {
                style: (feature) => {
                    return {
                        color: '#000',
                        fillColor: color,
                        fillOpacity: 0.8,
                        weight: 2
                    };
                }
            });
        }
        if (geometry) {
            geometry.on('click', () => this.onSelected.emit(ts));
            return geometry;
        }
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    createLabeledMarker(ts) {
        return new Observable(observer => {
            /** @type {?} */
            const icon = this.lastValueLabelGenerator.createIconLabel(ts);
            if (ts.station.geometry.type === 'Point') {
                /** @type {?} */
                const point = /** @type {?} */ (ts.station.geometry);
                observer.next(marker([point.coordinates[1], point.coordinates[0]], { icon }));
                observer.complete();
            }
        });
    }
};
LastValueMapSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-last-value-map-selector',
                template: `<div class="map-wrapper" style="height: 100%;">
  <div [attr.id]="mapId" class="map-viewer"></div>
</div>
`,
                styles: [`:host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}`]
            },] },
];
/** @nocollapse */
LastValueMapSelectorComponent.ctorParameters = () => [
    { type: MapCache },
    { type: KeyValueDiffers },
    { type: ChangeDetectorRef },
    { type: DatasetApiInterface },
    { type: LastValueLabelGenerator },
    { type: StatusIntervalResolverService }
];
LastValueMapSelectorComponent.propDecorators = {
    lastValueSeriesIDs: [{ type: Input }],
    lastValuePresentation: [{ type: Input }],
    ignoreStatusIntervalIfBeforeDuration: [{ type: Input }]
};
/**
 * Displays selectable series with their last values on an map.
 */
LastValueMapSelectorComponent = tslib_1.__decorate([
    Mixin([HasLoadableContent]),
    tslib_1.__metadata("design:paramtypes", [MapCache,
        KeyValueDiffers,
        ChangeDetectorRef,
        DatasetApiInterface,
        LastValueLabelGenerator,
        StatusIntervalResolverService])
], LastValueMapSelectorComponent);
export { LastValueMapSelectorComponent };
if (false) {
    /**
     * The list of internal series IDs, which should be presented with their last values on the map.
     * @type {?}
     */
    LastValueMapSelectorComponent.prototype.lastValueSeriesIDs;
    /**
     * Presentation type how to display the series.
     * @type {?}
     */
    LastValueMapSelectorComponent.prototype.lastValuePresentation;
    /**
     * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
     * @type {?}
     */
    LastValueMapSelectorComponent.prototype.ignoreStatusIntervalIfBeforeDuration;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.markerFeatureGroup;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.differs;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.cd;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.lastValueLabelGenerator;
    /** @type {?} */
    LastValueMapSelectorComponent.prototype.statusIntervalResolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3IvbGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IvbGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixLQUFLLEVBQ0wsNkJBQTZCLEdBRzlCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFTLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQXlCLE1BQU0sa0RBQWtELENBQUM7Ozs7QUFLbEgsSUFTYSw2QkFBNkI7OztBQVQxQyxtQ0FTMkMsU0FBUSxvQkFBZ0M7Ozs7Ozs7OztJQXNCakYsWUFDWSxRQUFrQixFQUNsQixPQUF3QixFQUN4QixFQUFxQixFQUNyQixZQUFpQyxFQUNqQyx1QkFBZ0QsRUFDaEQsc0JBQXFEO1FBRS9ELEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBUG5CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsWUFBTyxH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QTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIEtleVZhbHVlRGlmZmVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgSGFzTG9hZGFibGVDb250ZW50LFxuICBNaXhpbixcbiAgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gIFRpbWVzZXJpZXMsXG4gIFRpbWVzZXJpZXNFeHRyYXMsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBjaXJjbGVNYXJrZXIsIGZlYXR1cmVHcm91cCwgZ2VvSlNPTiwgTGF5ZXIsIG1hcmtlciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciwgTGFzdFZhbHVlUHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEaXNwbGF5cyBzZWxlY3RhYmxlIHNlcmllcyB3aXRoIHRoZWlyIGxhc3QgdmFsdWVzIG9uIGFuIG1hcC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWxhc3QtdmFsdWUtbWFwLXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBMYXN0VmFsdWVNYXBTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFRpbWVzZXJpZXM+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGludGVybmFsIHNlcmllcyBJRHMsIHdoaWNoIHNob3VsZCBiZSBwcmVzZW50ZWQgd2l0aCB0aGVpciBsYXN0IHZhbHVlcyBvbiB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGxhc3RWYWx1ZVNlcmllc0lEczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFByZXNlbnRhdGlvbiB0eXBlIGhvdyB0byBkaXNwbGF5IHRoZSBzZXJpZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgbGFzdFZhbHVlUHJlc2VudGF0aW9uOiBMYXN0VmFsdWVQcmVzZW50YXRpb24gPSBMYXN0VmFsdWVQcmVzZW50YXRpb24uQ29sb3JpemVkO1xuXG4gIC8qKlxuICAgKiBJZ25vcmVzIGFsbCBTdGF0dXNpbnRlcnZhbHMgd2hlcmUgdGhlIHRpbWVzdGFtcCBpcyBiZWZvcmUgYSBnaXZlbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgYW5kIGRyYXdzIGluc3RlYWQgdGhlIGRlZmF1bHQgbWFya2VyLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbiA9IEluZmluaXR5O1xuXG4gIHByaXZhdGUgbWFya2VyRmVhdHVyZUdyb3VwOiBMLkZlYXR1cmVHcm91cDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBsYXN0VmFsdWVMYWJlbEdlbmVyYXRvcjogTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IsXG4gICAgcHJvdGVjdGVkIHN0YXR1c0ludGVydmFsUmVzb2x2ZXI6IFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpO1xuICAgIGlmICh0aGlzLmxhc3RWYWx1ZVNlcmllc0lEcyAmJiB0aGlzLmxhc3RWYWx1ZVNlcmllc0lEcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFya2Vyc0J5U2VyaWVzSURzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXJzQnlTZXJpZXNJRHMoKSB7XG4gICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBmZWF0dXJlR3JvdXAoKTtcbiAgICBjb25zdCBvYnNMaXN0OiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgdGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBjb25zdCB0c09icyA9IHRoaXMuYXBpSW50ZXJmYWNlLmdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoZW50cnkpO1xuICAgICAgb2JzTGlzdC5wdXNoKHRzT2JzLnBpcGUoc3dpdGNoTWFwKHZhbCA9PiB0aGlzLmNyZWF0ZU1hcmtlcih2YWwpLnBpcGUodGFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKHJlcyk7XG4gICAgICAgIHJlcy5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh2YWwpKTtcbiAgICAgIH0pKSkpKTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbmFsaXplTWFya2VyT2JzZXJ2YWJsZXMob2JzTGlzdCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcmtlcih0czogVGltZXNlcmllcykge1xuICAgIHN3aXRjaCAodGhpcy5sYXN0VmFsdWVQcmVzZW50YXRpb24pIHtcbiAgICAgIGNhc2UgTGFzdFZhbHVlUHJlc2VudGF0aW9uLkNvbG9yaXplZDpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29sb3JpemVkTWFya2VyKHRzKTtcbiAgICAgIGNhc2UgTGFzdFZhbHVlUHJlc2VudGF0aW9uLlRleHR1YWw6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxhYmVsZWRNYXJrZXIodHMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb2xvcml6ZWRNYXJrZXIodHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5hbGl6ZU1hcmtlck9ic2VydmFibGVzKG9ic0xpc3Q6IE9ic2VydmFibGU8YW55PltdKSB7XG4gICAgZm9ya0pvaW4ob2JzTGlzdCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdkbyB6b29tIHRvIGJvdW5kcycpO1xuICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpO1xuICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyhib3VuZHMpO1xuICAgICAgICB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbG9yaXplZE1hcmtlcih0czogVGltZXNlcmllcyk6IE9ic2VydmFibGU8TGF5ZXI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TGF5ZXI+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TGF5ZXI+KSA9PiB7XG4gICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzRXh0cmFzKHRzLmlkLCB0cy51cmwpLnN1YnNjcmliZSgoZXh0cmFzOiBUaW1lc2VyaWVzRXh0cmFzKSA9PiB7XG4gICAgICAgIGxldCBjb2xvcmVkTWFya2VyO1xuICAgICAgICBpZiAoZXh0cmFzLnN0YXR1c0ludGVydmFscykge1xuICAgICAgICAgIGlmICgodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMuc3RhdHVzSW50ZXJ2YWxSZXNvbHZlci5nZXRNYXRjaGluZ0ludGVydmFsKHRzLmxhc3RWYWx1ZS52YWx1ZSwgZXh0cmFzLnN0YXR1c0ludGVydmFscyk7XG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgY29sb3JlZE1hcmtlciA9IHRoaXMuY3JlYXRlQ29sb3JlZE1hcmtlcih0cywgaW50ZXJ2YWwuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbG9yZWRNYXJrZXIpIHtcbiAgICAgICAgICBjb2xvcmVkTWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcih0cyk7XG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZXIubmV4dChjb2xvcmVkTWFya2VyKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb2xvcmVkTWFya2VyKHRzOiBUaW1lc2VyaWVzLCBjb2xvcjogc3RyaW5nKTogTGF5ZXIge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcih0cywgY29sb3IsIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIodHM6IFRpbWVzZXJpZXMpOiBMYXllciB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRmlsbGVkTWFya2VyKHRzLCAnIzAwMCcsIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRmlsbGVkTWFya2VyKHRzOiBUaW1lc2VyaWVzLCBjb2xvcjogc3RyaW5nLCByYWRpdXM6IG51bWJlcik6IExheWVyIHtcbiAgICBsZXQgZ2VvbWV0cnk6IExheWVyO1xuICAgIGlmICh0cy5zdGF0aW9uLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gdHMuc3RhdGlvbi5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50O1xuICAgICAgZ2VvbWV0cnkgPSBjaXJjbGVNYXJrZXIoW3BvaW50LmNvb3JkaW5hdGVzWzFdLCBwb2ludC5jb29yZGluYXRlc1swXV0sIHtcbiAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgcmFkaXVzOiAxMCxcbiAgICAgICAgd2VpZ2h0OiAyXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvbWV0cnkgPSBnZW9KU09OKHRzLnN0YXRpb24uZ2VvbWV0cnksIHtcbiAgICAgICAgc3R5bGU6IChmZWF0dXJlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgICAgIHdlaWdodDogMlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZ2VvbWV0cnkpIHtcbiAgICAgIGdlb21ldHJ5Lm9uKCdjbGljaycsICgpID0+IHRoaXMub25TZWxlY3RlZC5lbWl0KHRzKSk7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYWJlbGVkTWFya2VyKHRzOiBUaW1lc2VyaWVzKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxMYXllcj4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IuY3JlYXRlSWNvbkxhYmVsKHRzKTtcbiAgICAgIGlmICh0cy5zdGF0aW9uLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0cy5zdGF0aW9uLmdlb21ldHJ5IGFzIEdlb0pTT04uUG9pbnQ7XG4gICAgICAgIG9ic2VydmVyLm5leHQobWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7IGljb24gfSkpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==
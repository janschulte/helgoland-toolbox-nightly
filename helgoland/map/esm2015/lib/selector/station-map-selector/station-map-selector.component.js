/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'leaflet.markercluster';
import 'rxjs/add/observable/forkJoin';
import { ChangeDetectorRef, Component, Input, KeyValueDiffers, } from '@angular/core';
import { DatasetApiInterface, HasLoadableContent, Mixin, StatusIntervalResolverService, } from '@helgoland/core';
import * as L from 'leaflet';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
import { forkJoin } from 'rxjs';
let StationMapSelectorComponent = class StationMapSelectorComponent extends MapSelectorComponent {
    /**
     * @param {?} statusIntervalResolver
     * @param {?} apiInterface
     * @param {?} mapCache
     * @param {?} differs
     * @param {?} cd
     */
    constructor(statusIntervalResolver, apiInterface, mapCache, differs, cd) {
        super(mapCache, differs, cd);
        this.statusIntervalResolver = statusIntervalResolver;
        this.apiInterface = apiInterface;
        this.mapCache = mapCache;
        this.differs = differs;
        this.cd = cd;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        this.ignoreStatusIntervalIfBeforeDuration = Infinity;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (this.map && changes["statusIntervals"]) {
            this.drawGeometries();
        }
    }
    /**
     * @return {?}
     */
    drawGeometries() {
        this.isContentLoading(true);
        if (this.map && this.markerFeatureGroup) {
            this.map.removeLayer(this.markerFeatureGroup);
        }
        if (this.statusIntervals && this.filter && this.filter.phenomenon) {
            this.createValuedMarkers();
        }
        else {
            this.createStationGeometries();
        }
    }
    /**
     * @return {?}
     */
    createValuedMarkers() {
        /** @type {?} */
        const tempFilter = {
            phenomenon: this.filter.phenomenon,
            expanded: true
        };
        this.apiInterface.getTimeseries(this.serviceUrl, tempFilter).subscribe((timeseries) => {
            this.markerFeatureGroup = L.featureGroup();
            /** @type {?} */
            const obsList = [];
            timeseries.forEach((ts) => {
                /** @type {?} */
                const obs = this.apiInterface.getTimeseriesExtras(ts.id, this.serviceUrl);
                obsList.push(obs);
                obs.subscribe((extras) => {
                    /** @type {?} */
                    let marker;
                    if (extras.statusIntervals) {
                        if ((ts.lastValue.timestamp) > new Date().getTime() - this.ignoreStatusIntervalIfBeforeDuration) {
                            /** @type {?} */
                            const interval = this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                            if (interval) {
                                marker = this.createColoredMarker(ts.station, interval.color);
                            }
                        }
                    }
                    if (!marker) {
                        marker = this.createDefaultColoredMarker(ts.station);
                    }
                    marker.on('click', () => {
                        this.onSelected.emit(ts.station);
                    });
                    this.markerFeatureGroup.addLayer(marker);
                });
            });
            forkJoin(obsList).subscribe(() => {
                this.zoomToMarkerBounds(this.markerFeatureGroup.getBounds());
                if (this.map) {
                    this.map.invalidateSize();
                }
                this.isContentLoading(false);
            });
            if (this.map) {
                this.markerFeatureGroup.addTo(this.map);
            }
        });
    }
    /**
     * @param {?} station
     * @param {?} color
     * @return {?}
     */
    createColoredMarker(station, color) {
        if (this.markerSelectorGenerator.createFilledMarker) {
            return this.markerSelectorGenerator.createFilledMarker(station, color);
        }
        return this.createFilledMarker(station, color, 10);
    }
    /**
     * @param {?} station
     * @return {?}
     */
    createDefaultColoredMarker(station) {
        if (this.markerSelectorGenerator.createDefaultFilledMarker) {
            return this.markerSelectorGenerator.createDefaultFilledMarker(station);
        }
        return this.createFilledMarker(station, '#000', 10);
    }
    /**
     * @param {?} station
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    createFilledMarker(station, color, radius) {
        /** @type {?} */
        let geometry;
        if (station.geometry.type === 'Point') {
            /** @type {?} */
            const point = /** @type {?} */ (station.geometry);
            geometry = L.circleMarker([point.coordinates[1], point.coordinates[0]], {
                color: '#000',
                fillColor: color,
                fillOpacity: 0.8,
                radius: 10,
                weight: 2
            });
        }
        else {
            geometry = L.geoJSON(station.geometry, {
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
            geometry.on('click', () => {
                this.onSelected.emit(station);
            });
            return geometry;
        }
    }
    /**
     * @return {?}
     */
    createStationGeometries() {
        this.apiInterface.getStations(this.serviceUrl, this.filter)
            .subscribe((res) => {
            if (this.cluster) {
                this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
            }
            else {
                this.markerFeatureGroup = L.featureGroup();
            }
            if (res instanceof Array && res.length > 0) {
                res.forEach((entry) => {
                    /** @type {?} */
                    const marker = this.createDefaultGeometry(entry);
                    if (marker) {
                        this.markerFeatureGroup.addLayer(marker);
                    }
                });
                this.markerFeatureGroup.addTo(this.map);
                this.zoomToMarkerBounds(this.markerFeatureGroup.getBounds());
            }
            else {
                this.onNoResultsFound.emit(true);
            }
            this.map.invalidateSize();
            this.isContentLoading(false);
        });
    }
    /**
     * @param {?} station
     * @return {?}
     */
    createDefaultGeometry(station) {
        if (this.markerSelectorGenerator && this.markerSelectorGenerator.createDefaultGeometry) {
            return this.markerSelectorGenerator.createDefaultGeometry(station);
        }
        if (station.geometry) {
            /** @type {?} */
            const geometry = L.geoJSON(station.geometry);
            geometry.on('click', () => this.onSelected.emit(station));
            return geometry;
        }
        else {
            console.error(station.id + ' has no geometry');
        }
    }
};
StationMapSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-station-map-selector',
                template: `<div class="map-wrapper" style="height: 100%;">
  <div [attr.id]="mapId" class="map-viewer"></div>
</div>
`,
                styles: [`:host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}`]
            },] },
];
/** @nocollapse */
StationMapSelectorComponent.ctorParameters = () => [
    { type: StatusIntervalResolverService },
    { type: DatasetApiInterface },
    { type: MapCache },
    { type: KeyValueDiffers },
    { type: ChangeDetectorRef }
];
StationMapSelectorComponent.propDecorators = {
    cluster: [{ type: Input }],
    statusIntervals: [{ type: Input }],
    ignoreStatusIntervalIfBeforeDuration: [{ type: Input }]
};
StationMapSelectorComponent = tslib_1.__decorate([
    Mixin([HasLoadableContent]),
    tslib_1.__metadata("design:paramtypes", [StatusIntervalResolverService,
        DatasetApiInterface,
        MapCache,
        KeyValueDiffers,
        ChangeDetectorRef])
], StationMapSelectorComponent);
export { StationMapSelectorComponent };
if (false) {
    /** @type {?} */
    StationMapSelectorComponent.prototype.cluster;
    /** @type {?} */
    StationMapSelectorComponent.prototype.statusIntervals;
    /**
     * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
     * @type {?}
     */
    StationMapSelectorComponent.prototype.ignoreStatusIntervalIfBeforeDuration;
    /** @type {?} */
    StationMapSelectorComponent.prototype.markerFeatureGroup;
    /** @type {?} */
    StationMapSelectorComponent.prototype.statusIntervalResolver;
    /** @type {?} */
    StationMapSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    StationMapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    StationMapSelectorComponent.prototype.differs;
    /** @type {?} */
    StationMapSelectorComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlvbi1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3Ivc3RhdGlvbi1tYXAtc2VsZWN0b3Ivc3RhdGlvbi1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLDhCQUE4QixDQUFDO0FBRXRDLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEdBR2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLEtBQUssRUFHTCw2QkFBNkIsR0FHaEMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUc3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVoQyxJQVNhLDJCQUEyQixHQVR4QyxpQ0FTeUMsU0FBUSxvQkFBNkI7Ozs7Ozs7O0lBZ0IxRSxZQUNjLHNCQUFxRCxFQUNyRCxZQUFpQyxFQUNqQyxRQUFrQixFQUNsQixPQUF3QixFQUN4QixFQUFxQjtRQUUvQixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQU5uQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQStCO1FBQ3JELGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLE9BQUUsR0FBRixFQUFFLENBQW1COzs7O29EQVRXLFFBQVE7S0FZckQ7Ozs7O0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLG1CQUFnQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUFFOzs7OztJQUc3RCxjQUFjO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUFFO1FBQzNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDOUI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDO0tBQ0o7Ozs7SUFFTyxtQkFBbUI7O1FBQ3ZCLE1BQU0sVUFBVSxHQUFvQjtZQUNoQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ2xDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQXdCLEVBQUUsRUFBRTtZQUNoRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDOztZQUMzQyxNQUFNLE9BQU8sR0FBd0MsRUFBRSxDQUFDO1lBQ3hELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFjLEVBQUUsRUFBRTs7Z0JBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUU7O29CQUN2QyxJQUFJLE1BQU0sQ0FBQztvQkFDWCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzt3QkFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQzs7NEJBQzlGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7NEJBQzdHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFBRTt5QkFDbkY7cUJBQ0o7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUFFO29CQUN0RSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDcEMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVDLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUM3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQUU7Z0JBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQzdELENBQUMsQ0FBQzs7Ozs7OztJQUdDLG1CQUFtQixDQUFDLE9BQWdCLEVBQUUsS0FBYTtRQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHL0MsMEJBQTBCLENBQUMsT0FBZ0I7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7OztJQUdoRCxrQkFBa0IsQ0FBQyxPQUFnQixFQUFFLEtBQWEsRUFBRSxNQUFjOztRQUN0RSxJQUFJLFFBQVEsQ0FBUTtRQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNwQyxNQUFNLEtBQUsscUJBQUcsT0FBTyxDQUFDLFFBQXlCLEVBQUM7WUFDaEQsUUFBUSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEUsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixNQUFNLEVBQUUsRUFBRTtnQkFDVixNQUFNLEVBQUUsQ0FBQzthQUNaLENBQUMsQ0FBQztTQUNOO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUNuQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDZixNQUFNLENBQUM7d0JBQ0gsS0FBSyxFQUFFLE1BQU07d0JBQ2IsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLFdBQVcsRUFBRSxHQUFHO3dCQUNoQixNQUFNLEVBQUUsQ0FBQztxQkFDWixDQUFDO2lCQUNMO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25COzs7OztJQUdHLHVCQUF1QjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEQsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDckU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzlDO1lBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7b0JBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUFFO2lCQUM1RCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUNoRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7Ozs7OztJQUdILHFCQUFxQixDQUFDLE9BQWdCO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEU7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDbkIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25CO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztTQUNsRDs7Q0FFUixDQUFBOztZQXZLQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFOzs7Q0FHYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyw2TUFBNk0sQ0FBQzthQUMxTjs7OztZQXBCRyw2QkFBNkI7WUFMN0IsbUJBQW1CO1lBYWQsUUFBUTtZQWxCYixlQUFlO1lBSGYsaUJBQWlCOzs7c0JBcUNoQixLQUFLOzhCQUdMLEtBQUs7bURBTUwsS0FBSzs7QUFYRywyQkFBMkI7SUFEdkMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs2Q0FrQmMsNkJBQTZCO1FBQ3ZDLG1CQUFtQjtRQUN2QixRQUFRO1FBQ1QsZUFBZTtRQUNwQixpQkFBaUI7R0FyQjFCLDJCQUEyQixFQThKdkM7U0E5SlksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2ZvcmtKb2luJztcblxuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEhhc0xvYWRhYmxlQ29udGVudCxcbiAgICBNaXhpbixcbiAgICBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgU3RhdGlvbixcbiAgICBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSxcbiAgICBUaW1lc2VyaWVzLFxuICAgIFRpbWVzZXJpZXNFeHRyYXMsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgR2VvSlNPTiBmcm9tICdnZW9qc29uJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItc3RhdGlvbi1tYXAtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBTdGF0aW9uTWFwU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxTdGF0aW9uPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjbHVzdGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc3RhdHVzSW50ZXJ2YWxzOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSWdub3JlcyBhbGwgU3RhdHVzaW50ZXJ2YWxzIHdoZXJlIHRoZSB0aW1lc3RhbXAgaXMgYmVmb3JlIGEgZ2l2ZW4gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIGFuZCBkcmF3cyBpbnN0ZWFkIHRoZSBkZWZhdWx0IG1hcmtlci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpZ25vcmVTdGF0dXNJbnRlcnZhbElmQmVmb3JlRHVyYXRpb24gPSBJbmZpbml0eTtcblxuICAgIHByaXZhdGUgbWFya2VyRmVhdHVyZUdyb3VwOiBMLkZlYXR1cmVHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc3RhdHVzSW50ZXJ2YWxSZXNvbHZlcjogU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMsIGNkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIGNoYW5nZXMuc3RhdHVzSW50ZXJ2YWxzKSB7IHRoaXMuZHJhd0dlb21ldHJpZXMoKTsgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3R2VvbWV0cmllcygpIHtcbiAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpO1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXApIHsgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5tYXJrZXJGZWF0dXJlR3JvdXApOyB9XG4gICAgICAgIGlmICh0aGlzLnN0YXR1c0ludGVydmFscyAmJiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5waGVub21lbm9uKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZhbHVlZE1hcmtlcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3RhdGlvbkdlb21ldHJpZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVmFsdWVkTWFya2VycygpIHtcbiAgICAgICAgY29uc3QgdGVtcEZpbHRlcjogUGFyYW1ldGVyRmlsdGVyID0ge1xuICAgICAgICAgICAgcGhlbm9tZW5vbjogdGhpcy5maWx0ZXIucGhlbm9tZW5vbixcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFRpbWVzZXJpZXModGhpcy5zZXJ2aWNlVXJsLCB0ZW1wRmlsdGVyKS5zdWJzY3JpYmUoKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXNbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLmZlYXR1cmVHcm91cCgpO1xuICAgICAgICAgICAgY29uc3Qgb2JzTGlzdDogQXJyYXk8T2JzZXJ2YWJsZTxUaW1lc2VyaWVzRXh0cmFzPj4gPSBbXTtcbiAgICAgICAgICAgIHRpbWVzZXJpZXMuZm9yRWFjaCgodHM6IFRpbWVzZXJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzRXh0cmFzKHRzLmlkLCB0aGlzLnNlcnZpY2VVcmwpO1xuICAgICAgICAgICAgICAgIG9ic0xpc3QucHVzaChvYnMpO1xuICAgICAgICAgICAgICAgIG9icy5zdWJzY3JpYmUoKGV4dHJhczogVGltZXNlcmllc0V4dHJhcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2VyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0cmFzLnN0YXR1c0ludGVydmFscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0cy5sYXN0VmFsdWUudGltZXN0YW1wKSA+IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5pZ25vcmVTdGF0dXNJbnRlcnZhbElmQmVmb3JlRHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMuc3RhdHVzSW50ZXJ2YWxSZXNvbHZlci5nZXRNYXRjaGluZ0ludGVydmFsKHRzLmxhc3RWYWx1ZS52YWx1ZSwgZXh0cmFzLnN0YXR1c0ludGVydmFscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGludGVydmFsKSB7IG1hcmtlciA9IHRoaXMuY3JlYXRlQ29sb3JlZE1hcmtlcih0cy5zdGF0aW9uLCBpbnRlcnZhbC5jb2xvcik7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1hcmtlcikgeyBtYXJrZXIgPSB0aGlzLmNyZWF0ZURlZmF1bHRDb2xvcmVkTWFya2VyKHRzLnN0YXRpb24pOyB9XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0cy5zdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9ya0pvaW4ob2JzTGlzdCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyh0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwKSB7IHRoaXMubWFwLmludmFsaWRhdGVTaXplKCk7IH1cbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hcCkgeyB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7IH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDb2xvcmVkTWFya2VyKHN0YXRpb246IFN0YXRpb24sIGNvbG9yOiBzdHJpbmcpOiBMYXllciB7XG4gICAgICAgIGlmICh0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZUZpbGxlZE1hcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRmlsbGVkTWFya2VyKHN0YXRpb24sIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWxsZWRNYXJrZXIoc3RhdGlvbiwgY29sb3IsIDEwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURlZmF1bHRDb2xvcmVkTWFya2VyKHN0YXRpb246IFN0YXRpb24pOiBMYXllciB7XG4gICAgICAgIGlmICh0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZURlZmF1bHRGaWxsZWRNYXJrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZURlZmF1bHRGaWxsZWRNYXJrZXIoc3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRmlsbGVkTWFya2VyKHN0YXRpb24sICcjMDAwJywgMTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRmlsbGVkTWFya2VyKHN0YXRpb246IFN0YXRpb24sIGNvbG9yOiBzdHJpbmcsIHJhZGl1czogbnVtYmVyKTogTGF5ZXIge1xuICAgICAgICBsZXQgZ2VvbWV0cnk6IExheWVyO1xuICAgICAgICBpZiAoc3RhdGlvbi5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHN0YXRpb24uZ2VvbWV0cnkgYXMgR2VvSlNPTi5Qb2ludDtcbiAgICAgICAgICAgIGdlb21ldHJ5ID0gTC5jaXJjbGVNYXJrZXIoW3BvaW50LmNvb3JkaW5hdGVzWzFdLCBwb2ludC5jb29yZGluYXRlc1swXV0sIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgICAgICAgICByYWRpdXM6IDEwLFxuICAgICAgICAgICAgICAgIHdlaWdodDogMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZW9tZXRyeSA9IEwuZ2VvSlNPTihzdGF0aW9uLmdlb21ldHJ5LCB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IChmZWF0dXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIGdlb21ldHJ5Lm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdChzdGF0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTdGF0aW9uR2VvbWV0cmllcygpIHtcbiAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0U3RhdGlvbnModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IGFuaW1hdGU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLmZlYXR1cmVHcm91cCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmNyZWF0ZURlZmF1bHRHZW9tZXRyeShlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyKSB7IHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKG1hcmtlcik7IH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHModGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob1Jlc3VsdHNGb3VuZC5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURlZmF1bHRHZW9tZXRyeShzdGF0aW9uOiBTdGF0aW9uKTogTGF5ZXIge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvciAmJiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZURlZmF1bHRHZW9tZXRyeSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRGVmYXVsdEdlb21ldHJ5KHN0YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0aW9uLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IEwuZ2VvSlNPTihzdGF0aW9uLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIGdlb21ldHJ5Lm9uKCdjbGljaycsICgpID0+IHRoaXMub25TZWxlY3RlZC5lbWl0KHN0YXRpb24pKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdGlvbi5pZCArICcgaGFzIG5vIGdlb21ldHJ5Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
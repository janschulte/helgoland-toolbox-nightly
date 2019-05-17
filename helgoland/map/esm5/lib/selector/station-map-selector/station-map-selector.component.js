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
var StationMapSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StationMapSelectorComponent, _super);
    function StationMapSelectorComponent(statusIntervalResolver, apiInterface, mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.statusIntervalResolver = statusIntervalResolver;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        _this.ignoreStatusIntervalIfBeforeDuration = Infinity;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    StationMapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map && changes["statusIntervals"]) {
            this.drawGeometries();
        }
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createValuedMarkers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var tempFilter = {
            phenomenon: this.filter.phenomenon,
            expanded: true
        };
        this.apiInterface.getTimeseries(this.serviceUrl, tempFilter).subscribe(function (timeseries) {
            _this.markerFeatureGroup = L.featureGroup();
            /** @type {?} */
            var obsList = [];
            timeseries.forEach(function (ts) {
                /** @type {?} */
                var obs = _this.apiInterface.getTimeseriesExtras(ts.id, _this.serviceUrl);
                obsList.push(obs);
                obs.subscribe(function (extras) {
                    /** @type {?} */
                    var marker;
                    if (extras.statusIntervals) {
                        if ((ts.lastValue.timestamp) > new Date().getTime() - _this.ignoreStatusIntervalIfBeforeDuration) {
                            /** @type {?} */
                            var interval = _this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                            if (interval) {
                                marker = _this.createColoredMarker(ts.station, interval.color);
                            }
                        }
                    }
                    if (!marker) {
                        marker = _this.createDefaultColoredMarker(ts.station);
                    }
                    marker.on('click', function () {
                        _this.onSelected.emit(ts.station);
                    });
                    _this.markerFeatureGroup.addLayer(marker);
                });
            });
            forkJoin(obsList).subscribe(function () {
                _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
                if (_this.map) {
                    _this.map.invalidateSize();
                }
                _this.isContentLoading(false);
            });
            if (_this.map) {
                _this.markerFeatureGroup.addTo(_this.map);
            }
        });
    };
    /**
     * @param {?} station
     * @param {?} color
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createColoredMarker = /**
     * @param {?} station
     * @param {?} color
     * @return {?}
     */
    function (station, color) {
        if (this.markerSelectorGenerator.createFilledMarker) {
            return this.markerSelectorGenerator.createFilledMarker(station, color);
        }
        return this.createFilledMarker(station, color, 10);
    };
    /**
     * @param {?} station
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createDefaultColoredMarker = /**
     * @param {?} station
     * @return {?}
     */
    function (station) {
        if (this.markerSelectorGenerator.createDefaultFilledMarker) {
            return this.markerSelectorGenerator.createDefaultFilledMarker(station);
        }
        return this.createFilledMarker(station, '#000', 10);
    };
    /**
     * @param {?} station
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createFilledMarker = /**
     * @param {?} station
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    function (station, color, radius) {
        var _this = this;
        /** @type {?} */
        var geometry;
        if (station.geometry.type === 'Point') {
            /** @type {?} */
            var point = /** @type {?} */ (station.geometry);
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
                style: function (feature) {
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
            geometry.on('click', function () {
                _this.onSelected.emit(station);
            });
            return geometry;
        }
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createStationGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.apiInterface.getStations(this.serviceUrl, this.filter)
            .subscribe(function (res) {
            if (_this.cluster) {
                _this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
            }
            else {
                _this.markerFeatureGroup = L.featureGroup();
            }
            if (res instanceof Array && res.length > 0) {
                res.forEach(function (entry) {
                    /** @type {?} */
                    var marker = _this.createDefaultGeometry(entry);
                    if (marker) {
                        _this.markerFeatureGroup.addLayer(marker);
                    }
                });
                _this.markerFeatureGroup.addTo(_this.map);
                _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
            }
            else {
                _this.onNoResultsFound.emit(true);
            }
            _this.map.invalidateSize();
            _this.isContentLoading(false);
        });
    };
    /**
     * @param {?} station
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createDefaultGeometry = /**
     * @param {?} station
     * @return {?}
     */
    function (station) {
        var _this = this;
        if (this.markerSelectorGenerator && this.markerSelectorGenerator.createDefaultGeometry) {
            return this.markerSelectorGenerator.createDefaultGeometry(station);
        }
        if (station.geometry) {
            /** @type {?} */
            var geometry = L.geoJSON(station.geometry);
            geometry.on('click', function () { return _this.onSelected.emit(station); });
            return geometry;
        }
        else {
            console.error(station.id + ' has no geometry');
        }
    };
    StationMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-station-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    StationMapSelectorComponent.ctorParameters = function () { return [
        { type: StatusIntervalResolverService },
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef }
    ]; };
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
    return StationMapSelectorComponent;
}(MapSelectorComponent));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlvbi1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3Ivc3RhdGlvbi1tYXAtc2VsZWN0b3Ivc3RhdGlvbi1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLDhCQUE4QixDQUFDO0FBRXRDLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEdBR2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLEtBQUssRUFHTCw2QkFBNkIsR0FHaEMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUc3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUFXaUIsdURBQTZCO0lBZ0IxRSxxQ0FDYyxzQkFBcUQsRUFDckQsWUFBaUMsRUFDakMsUUFBa0IsRUFDbEIsT0FBd0IsRUFDeEIsRUFBcUI7UUFMbkMsWUFPSSxrQkFBTSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxTQUMvQjtRQVBhLDRCQUFzQixHQUF0QixzQkFBc0IsQ0FBK0I7UUFDckQsa0JBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsUUFBRSxHQUFGLEVBQUUsQ0FBbUI7Ozs7cURBVFcsUUFBUTs7S0FZckQ7Ozs7O0lBRU0saURBQVc7Ozs7Y0FBQyxPQUFzQjtRQUNyQyxp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QkFBMkIsRUE4SnZDO3NDQXRNRDtFQXdDaUQsb0JBQW9CO1NBQXhELDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mb3JrSm9pbic7XG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBIYXNMb2FkYWJsZUNvbnRlbnQsXG4gICAgTWl4aW4sXG4gICAgUGFyYW1ldGVyRmlsdGVyLFxuICAgIFN0YXRpb24sXG4gICAgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gICAgVGltZXNlcmllcyxcbiAgICBUaW1lc2VyaWVzRXh0cmFzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IEdlb0pTT04gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXN0YXRpb24tbWFwLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXAtd3JhcHBlclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDAlO1wiPlxuICA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgU3RhdGlvbk1hcFNlbGVjdG9yQ29tcG9uZW50IGV4dGVuZHMgTWFwU2VsZWN0b3JDb21wb25lbnQ8U3RhdGlvbj4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2x1c3RlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN0YXR1c0ludGVydmFsczogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIElnbm9yZXMgYWxsIFN0YXR1c2ludGVydmFscyB3aGVyZSB0aGUgdGltZXN0YW1wIGlzIGJlZm9yZSBhIGdpdmVuIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyBhbmQgZHJhd3MgaW5zdGVhZCB0aGUgZGVmYXVsdCBtYXJrZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uID0gSW5maW5pdHk7XG5cbiAgICBwcml2YXRlIG1hcmtlckZlYXR1cmVHcm91cDogTC5GZWF0dXJlR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHN0YXR1c0ludGVydmFsUmVzb2x2ZXI6IFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiBjaGFuZ2VzLnN0YXR1c0ludGVydmFscykgeyB0aGlzLmRyYXdHZW9tZXRyaWVzKCk7IH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKSB7IHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKTsgfVxuICAgICAgICBpZiAodGhpcy5zdGF0dXNJbnRlcnZhbHMgJiYgdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIucGhlbm9tZW5vbikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWYWx1ZWRNYXJrZXJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXRpb25HZW9tZXRyaWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZhbHVlZE1hcmtlcnMoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBGaWx0ZXI6IFBhcmFtZXRlckZpbHRlciA9IHtcbiAgICAgICAgICAgIHBoZW5vbWVub246IHRoaXMuZmlsdGVyLnBoZW5vbWVub24sXG4gICAgICAgICAgICBleHBhbmRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzKHRoaXMuc2VydmljZVVybCwgdGVtcEZpbHRlcikuc3Vic2NyaWJlKCh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcbiAgICAgICAgICAgIGNvbnN0IG9ic0xpc3Q6IEFycmF5PE9ic2VydmFibGU8VGltZXNlcmllc0V4dHJhcz4+ID0gW107XG4gICAgICAgICAgICB0aW1lc2VyaWVzLmZvckVhY2goKHRzOiBUaW1lc2VyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0gdGhpcy5hcGlJbnRlcmZhY2UuZ2V0VGltZXNlcmllc0V4dHJhcyh0cy5pZCwgdGhpcy5zZXJ2aWNlVXJsKTtcbiAgICAgICAgICAgICAgICBvYnNMaXN0LnB1c2gob2JzKTtcbiAgICAgICAgICAgICAgICBvYnMuc3Vic2NyaWJlKChleHRyYXM6IFRpbWVzZXJpZXNFeHRyYXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcmtlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnN0YXR1c0ludGVydmFsUmVzb2x2ZXIuZ2V0TWF0Y2hpbmdJbnRlcnZhbCh0cy5sYXN0VmFsdWUudmFsdWUsIGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcnZhbCkgeyBtYXJrZXIgPSB0aGlzLmNyZWF0ZUNvbG9yZWRNYXJrZXIodHMuc3RhdGlvbiwgaW50ZXJ2YWwuY29sb3IpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXJrZXIpIHsgbWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcih0cy5zdGF0aW9uKTsgfVxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQodHMuc3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvcmtKb2luKG9ic0xpc3QpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHModGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcCkgeyB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXApIHsgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ29sb3JlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uLCBjb2xvcjogc3RyaW5nKTogTGF5ZXIge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVGaWxsZWRNYXJrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRmlsbGVkTWFya2VyKHN0YXRpb24sIGNvbG9yLCAxMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uKTogTGF5ZXIge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0RmlsbGVkTWFya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0RmlsbGVkTWFya2VyKHN0YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uLCAnIzAwMCcsIDEwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uLCBjb2xvcjogc3RyaW5nLCByYWRpdXM6IG51bWJlcik6IExheWVyIHtcbiAgICAgICAgbGV0IGdlb21ldHJ5OiBMYXllcjtcbiAgICAgICAgaWYgKHN0YXRpb24uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBzdGF0aW9uLmdlb21ldHJ5IGFzIEdlb0pTT04uUG9pbnQ7XG4gICAgICAgICAgICBnZW9tZXRyeSA9IEwuY2lyY2xlTWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAxMCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvbWV0cnkgPSBMLmdlb0pTT04oc3RhdGlvbi5nZW9tZXRyeSwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiAoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogMC44LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICAgICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoc3RhdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU3RhdGlvbkdlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFN0YXRpb25zKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5tYXJrZXJDbHVzdGVyR3JvdXAoeyBhbmltYXRlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0R2VvbWV0cnkoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlcikgeyB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihtYXJrZXIpOyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9SZXN1bHRzRm91bmQuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEZWZhdWx0R2VvbWV0cnkoc3RhdGlvbjogU3RhdGlvbik6IExheWVyIHtcbiAgICAgICAgaWYgKHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IgJiYgdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0R2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZURlZmF1bHRHZW9tZXRyeShzdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGlvbi5nZW9tZXRyeSkge1xuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBMLmdlb0pTT04oc3RhdGlvbi5nZW9tZXRyeSk7XG4gICAgICAgICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdChzdGF0aW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXRpb24uaWQgKyAnIGhhcyBubyBnZW9tZXRyeScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
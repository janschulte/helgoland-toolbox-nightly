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
var LastValueMapSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LastValueMapSelectorComponent, _super);
    function LastValueMapSelectorComponent(mapCache, differs, cd, apiInterface, lastValueLabelGenerator, statusIntervalResolver) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.apiInterface = apiInterface;
        _this.lastValueLabelGenerator = lastValueLabelGenerator;
        _this.statusIntervalResolver = statusIntervalResolver;
        /**
         * Presentation type how to display the series.
         */
        _this.lastValuePresentation = 0 /* Colorized */;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        _this.ignoreStatusIntervalIfBeforeDuration = Infinity;
        return _this;
    }
    /**
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        this.isContentLoading(true);
        if (this.lastValueSeriesIDs && this.lastValueSeriesIDs.length) {
            this.createMarkersBySeriesIDs();
        }
    };
    /**
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createMarkersBySeriesIDs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.markerFeatureGroup = featureGroup();
        /** @type {?} */
        var obsList = [];
        this.lastValueSeriesIDs.forEach(function (entry) {
            /** @type {?} */
            var tsObs = _this.apiInterface.getSingleTimeseriesByInternalId(entry);
            obsList.push(tsObs.pipe(switchMap(function (val) { return _this.createMarker(val).pipe(tap(function (res) {
                _this.markerFeatureGroup.addLayer(res);
                res.on('click', function () { return _this.onSelected.emit(val); });
            })); })));
        });
        this.finalizeMarkerObservables(obsList);
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        switch (this.lastValuePresentation) {
            case 0 /* Colorized */:
                return this.createColorizedMarker(ts);
            case 1 /* Textual */:
                return this.createLabeledMarker(ts);
        }
        return this.createColorizedMarker(ts);
    };
    /**
     * @param {?} obsList
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.finalizeMarkerObservables = /**
     * @param {?} obsList
     * @return {?}
     */
    function (obsList) {
        var _this = this;
        forkJoin(obsList).subscribe(function () {
            console.log('do zoom to bounds');
            if (_this.map) {
                /** @type {?} */
                var bounds = _this.markerFeatureGroup.getBounds();
                _this.zoomToMarkerBounds(bounds);
                _this.map.invalidateSize();
            }
            _this.isContentLoading(false);
        });
        if (this.map) {
            this.markerFeatureGroup.addTo(this.map);
        }
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createColorizedMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        var _this = this;
        return new Observable(function (observer) {
            _this.apiInterface.getTimeseriesExtras(ts.id, ts.url).subscribe(function (extras) {
                /** @type {?} */
                var coloredMarker;
                if (extras.statusIntervals) {
                    if ((ts.lastValue.timestamp) > new Date().getTime() - _this.ignoreStatusIntervalIfBeforeDuration) {
                        /** @type {?} */
                        var interval = _this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                        if (interval) {
                            coloredMarker = _this.createColoredMarker(ts, interval.color);
                        }
                    }
                }
                if (!coloredMarker) {
                    coloredMarker = _this.createDefaultColoredMarker(ts);
                }
                observer.next(coloredMarker);
                observer.complete();
            });
        });
    };
    /**
     * @param {?} ts
     * @param {?} color
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createColoredMarker = /**
     * @param {?} ts
     * @param {?} color
     * @return {?}
     */
    function (ts, color) {
        return this.createFilledMarker(ts, color, 10);
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createDefaultColoredMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        return this.createFilledMarker(ts, '#000', 10);
    };
    /**
     * @param {?} ts
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createFilledMarker = /**
     * @param {?} ts
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    function (ts, color, radius) {
        var _this = this;
        /** @type {?} */
        var geometry;
        if (ts.station.geometry.type === 'Point') {
            /** @type {?} */
            var point = /** @type {?} */ (ts.station.geometry);
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
            geometry.on('click', function () { return _this.onSelected.emit(ts); });
            return geometry;
        }
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createLabeledMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        var _this = this;
        return new Observable(function (observer) {
            /** @type {?} */
            var icon = _this.lastValueLabelGenerator.createIconLabel(ts);
            if (ts.station.geometry.type === 'Point') {
                /** @type {?} */
                var point = /** @type {?} */ (ts.station.geometry);
                observer.next(marker([point.coordinates[1], point.coordinates[0]], { icon: icon }));
                observer.complete();
            }
        });
    };
    LastValueMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-last-value-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    LastValueMapSelectorComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef },
        { type: DatasetApiInterface },
        { type: LastValueLabelGenerator },
        { type: StatusIntervalResolverService }
    ]; };
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
    return LastValueMapSelectorComponent;
}(MapSelectorComponent));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3IvbGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IvbGFzdC12YWx1ZS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixLQUFLLEVBQ0wsNkJBQTZCLEdBRzlCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFTLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQXlCLE1BQU0sa0RBQWtELENBQUM7Ozs7O0lBYy9ELHlEQUFnQztJQXNCakYsdUNBQ1ksUUFBa0IsRUFDbEIsT0FBd0IsRUFDeEIsRUFBcUIsRUFDckIsWUFBaUMsRUFDakMsdUJBQWdELEVBQ2hELHNCQUFxRDtRQU5qRSxZQVFFLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLFNBQzdCO1FBUlcsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixRQUFFLEdBQUYsRUFBRSxD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QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gIEhhc0xvYWRhYmxlQ29udGVudCxcbiAgTWl4aW4sXG4gIFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICBUaW1lc2VyaWVzLFxuICBUaW1lc2VyaWVzRXh0cmFzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgY2lyY2xlTWFya2VyLCBmZWF0dXJlR3JvdXAsIGdlb0pTT04sIExheWVyLCBtYXJrZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IsIExhc3RWYWx1ZVByZXNlbnRhdGlvbiB9IGZyb20gJy4uL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLmludGVyZmFjZSc7XG5cbi8qKlxuICogRGlzcGxheXMgc2VsZWN0YWJsZSBzZXJpZXMgd2l0aCB0aGVpciBsYXN0IHZhbHVlcyBvbiBhbiBtYXAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1sYXN0LXZhbHVlLW1hcC1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgTGFzdFZhbHVlTWFwU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxUaW1lc2VyaWVzPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBpbnRlcm5hbCBzZXJpZXMgSURzLCB3aGljaCBzaG91bGQgYmUgcHJlc2VudGVkIHdpdGggdGhlaXIgbGFzdCB2YWx1ZXMgb24gdGhlIG1hcC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBsYXN0VmFsdWVTZXJpZXNJRHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBQcmVzZW50YXRpb24gdHlwZSBob3cgdG8gZGlzcGxheSB0aGUgc2VyaWVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGxhc3RWYWx1ZVByZXNlbnRhdGlvbjogTGFzdFZhbHVlUHJlc2VudGF0aW9uID0gTGFzdFZhbHVlUHJlc2VudGF0aW9uLkNvbG9yaXplZDtcblxuICAvKipcbiAgICogSWdub3JlcyBhbGwgU3RhdHVzaW50ZXJ2YWxzIHdoZXJlIHRoZSB0aW1lc3RhbXAgaXMgYmVmb3JlIGEgZ2l2ZW4gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIGFuZCBkcmF3cyBpbnN0ZWFkIHRoZSBkZWZhdWx0IG1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpZ25vcmVTdGF0dXNJbnRlcnZhbElmQmVmb3JlRHVyYXRpb24gPSBJbmZpbml0eTtcblxuICBwcml2YXRlIG1hcmtlckZlYXR1cmVHcm91cDogTC5GZWF0dXJlR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgbGFzdFZhbHVlTGFiZWxHZW5lcmF0b3I6IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLFxuICAgIHByb3RlY3RlZCBzdGF0dXNJbnRlcnZhbFJlc29sdmVyOiBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycywgY2QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICBpZiAodGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMgJiYgdGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNyZWF0ZU1hcmtlcnNCeVNlcmllc0lEcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFya2Vyc0J5U2VyaWVzSURzKCkge1xuICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gZmVhdHVyZUdyb3VwKCk7XG4gICAgY29uc3Qgb2JzTGlzdDogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuICAgIHRoaXMubGFzdFZhbHVlU2VyaWVzSURzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgY29uc3QgdHNPYnMgPSB0aGlzLmFwaUludGVyZmFjZS5nZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGVudHJ5KTtcbiAgICAgIG9ic0xpc3QucHVzaCh0c09icy5waXBlKHN3aXRjaE1hcCh2YWwgPT4gdGhpcy5jcmVhdGVNYXJrZXIodmFsKS5waXBlKHRhcChyZXMgPT4ge1xuICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihyZXMpO1xuICAgICAgICByZXMub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5vblNlbGVjdGVkLmVtaXQodmFsKSk7XG4gICAgICB9KSkpKSk7XG4gICAgfSk7XG4gICAgdGhpcy5maW5hbGl6ZU1hcmtlck9ic2VydmFibGVzKG9ic0xpc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXIodHM6IFRpbWVzZXJpZXMpIHtcbiAgICBzd2l0Y2ggKHRoaXMubGFzdFZhbHVlUHJlc2VudGF0aW9uKSB7XG4gICAgICBjYXNlIExhc3RWYWx1ZVByZXNlbnRhdGlvbi5Db2xvcml6ZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbG9yaXplZE1hcmtlcih0cyk7XG4gICAgICBjYXNlIExhc3RWYWx1ZVByZXNlbnRhdGlvbi5UZXh0dWFsOlxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVMYWJlbGVkTWFya2VyKHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29sb3JpemVkTWFya2VyKHRzKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluYWxpemVNYXJrZXJPYnNlcnZhYmxlcyhvYnNMaXN0OiBPYnNlcnZhYmxlPGFueT5bXSkge1xuICAgIGZvcmtKb2luKG9ic0xpc3QpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZG8gem9vbSB0byBib3VuZHMnKTtcbiAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICBjb25zdCBib3VuZHMgPSB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5nZXRCb3VuZHMoKTtcbiAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb2xvcml6ZWRNYXJrZXIodHM6IFRpbWVzZXJpZXMpOiBPYnNlcnZhYmxlPExheWVyPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPExheWVyPigob2JzZXJ2ZXI6IE9ic2VydmVyPExheWVyPikgPT4ge1xuICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0VGltZXNlcmllc0V4dHJhcyh0cy5pZCwgdHMudXJsKS5zdWJzY3JpYmUoKGV4dHJhczogVGltZXNlcmllc0V4dHJhcykgPT4ge1xuICAgICAgICBsZXQgY29sb3JlZE1hcmtlcjtcbiAgICAgICAgaWYgKGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgICAgICBpZiAoKHRzLmxhc3RWYWx1ZS50aW1lc3RhbXApID4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnN0YXR1c0ludGVydmFsUmVzb2x2ZXIuZ2V0TWF0Y2hpbmdJbnRlcnZhbCh0cy5sYXN0VmFsdWUudmFsdWUsIGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpO1xuICAgICAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgICAgIGNvbG9yZWRNYXJrZXIgPSB0aGlzLmNyZWF0ZUNvbG9yZWRNYXJrZXIodHMsIGludGVydmFsLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb2xvcmVkTWFya2VyKSB7XG4gICAgICAgICAgY29sb3JlZE1hcmtlciA9IHRoaXMuY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIodHMpO1xuICAgICAgICB9XG4gICAgICAgIG9ic2VydmVyLm5leHQoY29sb3JlZE1hcmtlcik7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29sb3JlZE1hcmtlcih0czogVGltZXNlcmllcywgY29sb3I6IHN0cmluZyk6IExheWVyIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWxsZWRNYXJrZXIodHMsIGNvbG9yLCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURlZmF1bHRDb2xvcmVkTWFya2VyKHRzOiBUaW1lc2VyaWVzKTogTGF5ZXIge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcih0cywgJyMwMDAnLCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZpbGxlZE1hcmtlcih0czogVGltZXNlcmllcywgY29sb3I6IHN0cmluZywgcmFkaXVzOiBudW1iZXIpOiBMYXllciB7XG4gICAgbGV0IGdlb21ldHJ5OiBMYXllcjtcbiAgICBpZiAodHMuc3RhdGlvbi5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICBjb25zdCBwb2ludCA9IHRzLnN0YXRpb24uZ2VvbWV0cnkgYXMgR2VvSlNPTi5Qb2ludDtcbiAgICAgIGdlb21ldHJ5ID0gY2lyY2xlTWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7XG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgIHJhZGl1czogMTAsXG4gICAgICAgIHdlaWdodDogMlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlb21ldHJ5ID0gZ2VvSlNPTih0cy5zdGF0aW9uLmdlb21ldHJ5LCB7XG4gICAgICAgIHN0eWxlOiAoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICB3ZWlnaHQ6IDJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0cykpO1xuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGFiZWxlZE1hcmtlcih0czogVGltZXNlcmllcyk6IE9ic2VydmFibGU8TGF5ZXI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TGF5ZXI+KG9ic2VydmVyID0+IHtcbiAgICAgIGNvbnN0IGljb24gPSB0aGlzLmxhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLmNyZWF0ZUljb25MYWJlbCh0cyk7XG4gICAgICBpZiAodHMuc3RhdGlvbi5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gdHMuc3RhdGlvbi5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50O1xuICAgICAgICBvYnNlcnZlci5uZXh0KG1hcmtlcihbcG9pbnQuY29vcmRpbmF0ZXNbMV0sIHBvaW50LmNvb3JkaW5hdGVzWzBdXSwgeyBpY29uIH0pKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=
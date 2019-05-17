/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'leaflet.markercluster';
import { ChangeDetectorRef, Component, EventEmitter, Input, KeyValueDiffers, Output, } from '@angular/core';
import { DatasetApiInterface, HasLoadableContent, Mixin, Timespan, } from '@helgoland/core';
import * as L from 'leaflet';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
var ProfileTrajectoryMapSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileTrajectoryMapSelectorComponent, _super);
    function ProfileTrajectoryMapSelectorComponent(apiInterface, mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.onTimeListDetermined = new EventEmitter();
        _this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        _this.highlightStyle = {
            color: 'blue',
            weight: 7,
            opacity: 1
        };
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes["selectedTimespan"] && this.selectedTimespan && this.map) {
            this.clearMap();
            this.initLayer();
            this.data.forEach(function (entry) {
                if (_this.selectedTimespan.from <= entry.timestamp && entry.timestamp <= _this.selectedTimespan.to) {
                    _this.layer.addLayer(_this.createGeoJson(entry, _this.dataset));
                }
            });
            this.layer.addTo(this.map);
        }
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isContentLoading(true);
        this.apiInterface.getDatasets(this.serviceUrl, this.filter).subscribe(function (datasets) {
            datasets.forEach(function (dataset) {
                _this.dataset = dataset;
                /** @type {?} */
                var timespan = new Timespan(dataset.firstValue.timestamp, dataset.lastValue.timestamp);
                _this.apiInterface.getData(dataset.id, _this.serviceUrl, timespan)
                    .subscribe(function (data) {
                    if (_this.map && data.values instanceof Array) {
                        _this.initLayer();
                        _this.data = [];
                        /** @type {?} */
                        var timelist_1 = [];
                        data.values.forEach(function (entry) {
                            _this.data.push(entry);
                            /** @type {?} */
                            var geojson = _this.createGeoJson(entry, dataset);
                            timelist_1.push(entry.timestamp);
                            _this.layer.addLayer(geojson);
                        });
                        _this.onTimeListDetermined.emit(timelist_1);
                        _this.layer.addTo(_this.map);
                        _this.zoomToMarkerBounds(_this.layer.getBounds());
                    }
                    _this.isContentLoading(false);
                });
            });
        });
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.initLayer = /**
     * @return {?}
     */
    function () {
        this.layer = L.markerClusterGroup({ animate: false });
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.clearMap = /**
     * @return {?}
     */
    function () {
        if (this.map && this.layer) {
            this.map.removeLayer(this.layer);
        }
    };
    /**
     * @param {?} profileDataEntry
     * @param {?} dataset
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.createGeoJson = /**
     * @param {?} profileDataEntry
     * @param {?} dataset
     * @return {?}
     */
    function (profileDataEntry, dataset) {
        var _this = this;
        /** @type {?} */
        var geojson = new L.GeoJSON(profileDataEntry.geometry);
        geojson.setStyle(this.defaultStyle);
        geojson.on('click', function () {
            _this.onSelected.emit({
                dataset: dataset,
                data: profileDataEntry
            });
        });
        geojson.on('mouseover', function () {
            geojson.setStyle(_this.highlightStyle);
            geojson.bringToFront();
        });
        geojson.on('mouseout', function () {
            geojson.setStyle(_this.defaultStyle);
        });
        return geojson;
    };
    ProfileTrajectoryMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-profile-trajectory-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    ProfileTrajectoryMapSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef }
    ]; };
    ProfileTrajectoryMapSelectorComponent.propDecorators = {
        selectedTimespan: [{ type: Input }],
        onTimeListDetermined: [{ type: Output }]
    };
    ProfileTrajectoryMapSelectorComponent = tslib_1.__decorate([
        Mixin([HasLoadableContent]),
        tslib_1.__metadata("design:paramtypes", [DatasetApiInterface,
            MapCache,
            KeyValueDiffers,
            ChangeDetectorRef])
    ], ProfileTrajectoryMapSelectorComponent);
    return ProfileTrajectoryMapSelectorComponent;
}(MapSelectorComponent));
export { ProfileTrajectoryMapSelectorComponent };
if (false) {
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.selectedTimespan;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.onTimeListDetermined;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.layer;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.data;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.dataset;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.defaultStyle;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.highlightStyle;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.differs;
    /** @type {?} */
    ProfileTrajectoryMapSelectorComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILG1CQUFtQixFQUNuQixrQkFBa0IsRUFHbEIsS0FBSyxFQUNMLFFBQVEsR0FDWCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFhckQsaUVBQXNDO0lBeUI5QywrQ0FDYyxZQUFpQyxFQUNqQyxRQUFrQixFQUNsQixPQUF3QixFQUN4QixFQUFxQjtRQUpuQyxZQU1JLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLFNBQy9CO1FBTmEsa0JBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsUUFBRSxHQUFGLEVBQUUsQ0FBbUI7cUNBdEJtQixJQUFJLFlBQVksRUFBRTs2QkFNbEM7WUFDbEMsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJO1NBQ2hCOytCQUV1QztZQUNwQyxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxD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LEVBQUUscUNBQXFDO29CQUMvQyxRQUFRLEVBQUUsdUhBR2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsNk1BQTZNLENBQUM7aUJBQzFOOzs7O2dCQXBCRyxtQkFBbUI7Z0JBU2QsUUFBUTtnQkFmYixlQUFlO2dCQUpmLGlCQUFpQjs7O21DQW9DaEIsS0FBSzt1Q0FHTCxNQUFNOztJQVBFLHFDQUFxQztRQURqRCxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lEQTRCSSxtQkFBbUI7WUFDdkIsUUFBUTtZQUNULGVBQWU7WUFDcEIsaUJBQWlCO09BOUIxQixxQ0FBcUMsRUF5R2pEO2dEQTdJRDtFQXFDWSxvQkFBb0I7U0FEbkIscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xuXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBIYXNMb2FkYWJsZUNvbnRlbnQsXG4gICAgSURhdGFzZXQsXG4gICAgTG9jYXRlZFByb2ZpbGVEYXRhRW50cnksXG4gICAgTWl4aW4sXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYWplY3RvcnlSZXN1bHQgfSBmcm9tICcuLi9tb2RlbC90cmFqZWN0b3J5LXJlc3VsdCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXByb2ZpbGUtdHJhamVjdG9yeS1tYXAtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlVHJhamVjdG9yeU1hcFNlbGVjdG9yQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxUcmFqZWN0b3J5UmVzdWx0PlxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkVGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZUxpc3REZXRlcm1pbmVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBsYXllcjogTC5GZWF0dXJlR3JvdXA7XG4gICAgcHJpdmF0ZSBkYXRhOiBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeVtdO1xuICAgIHByaXZhdGUgZGF0YXNldDogSURhdGFzZXQ7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICB3ZWlnaHQ6IDUsXG4gICAgICAgIG9wYWNpdHk6IDAuNjVcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgd2VpZ2h0OiA3LFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGVkVGltZXNwYW4gJiYgdGhpcy5zZWxlY3RlZFRpbWVzcGFuICYmIHRoaXMubWFwKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRMYXllcigpO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lc3Bhbi5mcm9tIDw9IGVudHJ5LnRpbWVzdGFtcCAmJiBlbnRyeS50aW1lc3RhbXAgPD0gdGhpcy5zZWxlY3RlZFRpbWVzcGFuLnRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkTGF5ZXIodGhpcy5jcmVhdGVHZW9Kc29uKGVudHJ5LCB0aGlzLmRhdGFzZXQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldERhdGFzZXRzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpLnN1YnNjcmliZSgoZGF0YXNldHMpID0+IHtcbiAgICAgICAgICAgIGRhdGFzZXRzLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuID0gbmV3IFRpbWVzcGFuKGRhdGFzZXQuZmlyc3RWYWx1ZS50aW1lc3RhbXAsIGRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RGF0YTxMb2NhdGVkUHJvZmlsZURhdGFFbnRyeT4oZGF0YXNldC5pZCwgdGhpcy5zZXJ2aWNlVXJsLCB0aW1lc3BhbilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwICYmIGRhdGEudmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRMYXllcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVsaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmFsdWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VvanNvbiA9IHRoaXMuY3JlYXRlR2VvSnNvbihlbnRyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaXN0LnB1c2goZW50cnkudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5hZGRMYXllcihnZW9qc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGltZUxpc3REZXRlcm1pbmVkLmVtaXQodGltZWxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubGF5ZXIuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TGF5ZXIoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IGFuaW1hdGU6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJNYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLmxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlR2VvSnNvbihwcm9maWxlRGF0YUVudHJ5OiBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeSwgZGF0YXNldDogSURhdGFzZXQpOiBMLkdlb0pTT04ge1xuICAgICAgICBjb25zdCBnZW9qc29uID0gbmV3IEwuR2VvSlNPTihwcm9maWxlRGF0YUVudHJ5Lmdlb21ldHJ5KTtcbiAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIGdlb2pzb24ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgZGF0YTogcHJvZmlsZURhdGFFbnRyeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZW9qc29uLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgICAgICAgICAgZ2VvanNvbi5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdlb2pzb24ub24oJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2VvanNvbjtcbiAgICB9XG59XG4iXX0=
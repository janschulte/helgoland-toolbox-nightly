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
let ProfileTrajectoryMapSelectorComponent = class ProfileTrajectoryMapSelectorComponent extends MapSelectorComponent {
    /**
     * @param {?} apiInterface
     * @param {?} mapCache
     * @param {?} differs
     * @param {?} cd
     */
    constructor(apiInterface, mapCache, differs, cd) {
        super(mapCache, differs, cd);
        this.apiInterface = apiInterface;
        this.mapCache = mapCache;
        this.differs = differs;
        this.cd = cd;
        this.onTimeListDetermined = new EventEmitter();
        this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        this.highlightStyle = {
            color: 'blue',
            weight: 7,
            opacity: 1
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes["selectedTimespan"] && this.selectedTimespan && this.map) {
            this.clearMap();
            this.initLayer();
            this.data.forEach((entry) => {
                if (this.selectedTimespan.from <= entry.timestamp && entry.timestamp <= this.selectedTimespan.to) {
                    this.layer.addLayer(this.createGeoJson(entry, this.dataset));
                }
            });
            this.layer.addTo(this.map);
        }
    }
    /**
     * @return {?}
     */
    drawGeometries() {
        this.isContentLoading(true);
        this.apiInterface.getDatasets(this.serviceUrl, this.filter).subscribe((datasets) => {
            datasets.forEach((dataset) => {
                this.dataset = dataset;
                /** @type {?} */
                const timespan = new Timespan(dataset.firstValue.timestamp, dataset.lastValue.timestamp);
                this.apiInterface.getData(dataset.id, this.serviceUrl, timespan)
                    .subscribe((data) => {
                    if (this.map && data.values instanceof Array) {
                        this.initLayer();
                        this.data = [];
                        /** @type {?} */
                        const timelist = [];
                        data.values.forEach((entry) => {
                            this.data.push(entry);
                            /** @type {?} */
                            const geojson = this.createGeoJson(entry, dataset);
                            timelist.push(entry.timestamp);
                            this.layer.addLayer(geojson);
                        });
                        this.onTimeListDetermined.emit(timelist);
                        this.layer.addTo(this.map);
                        this.zoomToMarkerBounds(this.layer.getBounds());
                    }
                    this.isContentLoading(false);
                });
            });
        });
    }
    /**
     * @return {?}
     */
    initLayer() {
        this.layer = L.markerClusterGroup({ animate: false });
    }
    /**
     * @return {?}
     */
    clearMap() {
        if (this.map && this.layer) {
            this.map.removeLayer(this.layer);
        }
    }
    /**
     * @param {?} profileDataEntry
     * @param {?} dataset
     * @return {?}
     */
    createGeoJson(profileDataEntry, dataset) {
        /** @type {?} */
        const geojson = new L.GeoJSON(profileDataEntry.geometry);
        geojson.setStyle(this.defaultStyle);
        geojson.on('click', () => {
            this.onSelected.emit({
                dataset,
                data: profileDataEntry
            });
        });
        geojson.on('mouseover', () => {
            geojson.setStyle(this.highlightStyle);
            geojson.bringToFront();
        });
        geojson.on('mouseout', () => {
            geojson.setStyle(this.defaultStyle);
        });
        return geojson;
    }
};
ProfileTrajectoryMapSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-profile-trajectory-map-selector',
                template: `<div class="map-wrapper" style="height: 100%;">
  <div [attr.id]="mapId" class="map-viewer"></div>
</div>
`,
                styles: [`:host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}`]
            },] },
];
/** @nocollapse */
ProfileTrajectoryMapSelectorComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: MapCache },
    { type: KeyValueDiffers },
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILG1CQUFtQixFQUNuQixrQkFBa0IsRUFHbEIsS0FBSyxFQUNMLFFBQVEsR0FDWCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRSxJQVNhLHFDQUFxQyxHQVRsRCwyQ0FVSSxTQUFRLG9CQUFzQzs7Ozs7OztJQXlCOUMsWUFDYyxZQUFpQyxFQUNqQyxRQUFrQixFQUNsQixPQUF3QixFQUN4QixFQUFxQjtRQUUvQixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUxuQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtvQ0F0Qm1CLElBQUksWUFBWSxFQUFFOzRCQU1sQztZQUNsQyxLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUk7U0FDaEI7OEJBRXVDO1lBQ3BD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U0FDdkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Q0FFdEIsQ0FBQTs7WUFsSEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQ0FBcUM7Z0JBQy9DLFFBQVEsRUFBRTs7O0NBR2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsNk1BQTZNLENBQUM7YUFDMU47Ozs7WUFwQkcsbUJBQW1CO1lBU2QsUUFBUTtZQWZiLGVBQWU7WUFKZixpQkFBaUI7OzsrQkFvQ2hCLEtBQUs7bUNBR0wsTUFBTTs7QUFQRSxxQ0FBcUM7SUFEakQsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs2Q0E0QkksbUJBQW1CO1FBQ3ZCLFFBQVE7UUFDVCxlQUFlO1FBQ3BCLGlCQUFpQjtHQTlCMUIscUNBQXFDLEVBeUdqRDtTQXpHWSxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEhhc0xvYWRhYmxlQ29udGVudCxcbiAgICBJRGF0YXNldCxcbiAgICBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeSxcbiAgICBNaXhpbixcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhamVjdG9yeVJlc3VsdCB9IGZyb20gJy4uL21vZGVsL3RyYWplY3RvcnktcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcHJvZmlsZS10cmFqZWN0b3J5LW1hcC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAubWFwLXZpZXdlcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfTpob3N0IC5tYXAtbm90aWZpZXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDoxMHB4O3otaW5kZXg6MTAwMTt3aWR0aDoxMjBweDtoZWlnaHQ6NzBweDtwYWRkaW5nOjVweDtvcGFjaXR5Oi44O3RleHQtYWxpZ246Y2VudGVyfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUcmFqZWN0b3J5TWFwU2VsZWN0b3JDb21wb25lbnRcbiAgICBleHRlbmRzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFRyYWplY3RvcnlSZXN1bHQ+XG4gICAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lc3BhbjogVGltZXNwYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25UaW1lTGlzdERldGVybWluZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIGxheWVyOiBMLkZlYXR1cmVHcm91cDtcbiAgICBwcml2YXRlIGRhdGE6IExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5W107XG4gICAgcHJpdmF0ZSBkYXRhc2V0OiBJRGF0YXNldDtcblxuICAgIHByaXZhdGUgZGVmYXVsdFN0eWxlOiBMLlBhdGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIHdlaWdodDogNSxcbiAgICAgICAgb3BhY2l0eTogMC42NVxuICAgIH07XG5cbiAgICBwcml2YXRlIGhpZ2hsaWdodFN0eWxlOiBMLlBhdGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ2JsdWUnLFxuICAgICAgICB3ZWlnaHQ6IDcsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMsIGNkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgaWYgKGNoYW5nZXMuc2VsZWN0ZWRUaW1lc3BhbiAmJiB0aGlzLnNlbGVjdGVkVGltZXNwYW4gJiYgdGhpcy5tYXApIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdExheWVyKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWVzcGFuLmZyb20gPD0gZW50cnkudGltZXN0YW1wICYmIGVudHJ5LnRpbWVzdGFtcCA8PSB0aGlzLnNlbGVjdGVkVGltZXNwYW4udG8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5hZGRMYXllcih0aGlzLmNyZWF0ZUdlb0pzb24oZW50cnksIHRoaXMuZGF0YXNldCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sYXllci5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RGF0YXNldHModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcikuc3Vic2NyaWJlKChkYXRhc2V0cykgPT4ge1xuICAgICAgICAgICAgZGF0YXNldHMuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldCA9IGRhdGFzZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW4gPSBuZXcgVGltZXNwYW4oZGF0YXNldC5maXJzdFZhbHVlLnRpbWVzdGFtcCwgZGF0YXNldC5sYXN0VmFsdWUudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhPExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5PihkYXRhc2V0LmlkLCB0aGlzLnNlcnZpY2VVcmwsIHRpbWVzcGFuKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXAgJiYgZGF0YS52YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdExheWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZWxpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YWx1ZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnZW9qc29uID0gdGhpcy5jcmVhdGVHZW9Kc29uKGVudHJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpc3QucHVzaChlbnRyeS50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmFkZExheWVyKGdlb2pzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UaW1lTGlzdERldGVybWluZWQuZW1pdCh0aW1lbGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHModGhpcy5sYXllci5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRMYXllcigpIHtcbiAgICAgICAgdGhpcy5sYXllciA9IEwubWFya2VyQ2x1c3Rlckdyb3VwKHsgYW5pbWF0ZTogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhck1hcCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMubGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVHZW9Kc29uKHByb2ZpbGVEYXRhRW50cnk6IExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LCBkYXRhc2V0OiBJRGF0YXNldCk6IEwuR2VvSlNPTiB7XG4gICAgICAgIGNvbnN0IGdlb2pzb24gPSBuZXcgTC5HZW9KU09OKHByb2ZpbGVEYXRhRW50cnkuZ2VvbWV0cnkpO1xuICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgZ2VvanNvbi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZGF0YXNldCxcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm9maWxlRGF0YUVudHJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdlb2pzb24ub24oJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIGdlb2pzb24uc2V0U3R5bGUodGhpcy5oaWdobGlnaHRTdHlsZSk7XG4gICAgICAgICAgICBnZW9qc29uLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2VvanNvbi5vbignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnZW9qc29uO1xuICAgIH1cbn1cbiJdfQ==
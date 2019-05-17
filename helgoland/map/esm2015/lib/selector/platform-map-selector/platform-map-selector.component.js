/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'leaflet.markercluster';
import { ChangeDetectorRef, Component, Input, KeyValueDiffers } from '@angular/core';
import { DatasetApiInterface, HasLoadableContent, Mixin } from '@helgoland/core';
import * as L from 'leaflet';
import { MapCache } from '../../base/map-cache.service';
import { MapSelectorComponent } from '../map-selector.component';
let PlatformMapSelectorComponent = class PlatformMapSelectorComponent extends MapSelectorComponent {
    /**
     * @param {?} apiInterface
     * @param {?} mapCache
     * @param {?} cd
     * @param {?} differs
     */
    constructor(apiInterface, mapCache, cd, differs) {
        super(mapCache, differs, cd);
        this.apiInterface = apiInterface;
        this.mapCache = mapCache;
        this.cd = cd;
        this.differs = differs;
    }
    /**
     * @return {?}
     */
    drawGeometries() {
        this.isContentLoading(true);
        if (this.map && this.markerFeatureGroup) {
            this.map.removeLayer(this.markerFeatureGroup);
        }
        this.apiInterface.getPlatforms(this.serviceUrl, this.filter)
            .subscribe((res) => {
            if (this.map) {
                if (this.cluster) {
                    this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
                }
                else {
                    this.markerFeatureGroup = L.featureGroup();
                }
                if (res instanceof Array && res.length > 0) {
                    res.forEach((entry) => {
                        /** @type {?} */
                        const marker = L.marker([entry.geometry.coordinates[1], entry.geometry.coordinates[0]]);
                        marker.on('click', () => {
                            this.onSelected.emit(entry);
                        });
                        this.markerFeatureGroup.addLayer(marker);
                    });
                    this.markerFeatureGroup.addTo(this.map);
                    this.zoomToMarkerBounds(this.markerFeatureGroup.getBounds());
                }
                else {
                    this.onNoResultsFound.emit(true);
                }
                this.map.invalidateSize();
                this.isContentLoading(false);
            }
        });
    }
};
PlatformMapSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-platform-map-selector',
                template: `<div class="map-wrapper" style="height: 100%;">
  <div [attr.id]="mapId" class="map-viewer"></div>
</div>
`,
                styles: [`:host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}`]
            },] },
];
/** @nocollapse */
PlatformMapSelectorComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: MapCache },
    { type: ChangeDetectorRef },
    { type: KeyValueDiffers }
];
PlatformMapSelectorComponent.propDecorators = {
    cluster: [{ type: Input }]
};
PlatformMapSelectorComponent = tslib_1.__decorate([
    Mixin([HasLoadableContent]),
    tslib_1.__metadata("design:paramtypes", [DatasetApiInterface,
        MapCache,
        ChangeDetectorRef,
        KeyValueDiffers])
], PlatformMapSelectorComponent);
export { PlatformMapSelectorComponent };
if (false) {
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.cluster;
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.markerFeatureGroup;
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.cd;
    /** @type {?} */
    PlatformMapSelectorComponent.prototype.differs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tbWFwLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL3BsYXRmb3JtLW1hcC1zZWxlY3Rvci9wbGF0Zm9ybS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUMzRixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakUsSUFTYSw0QkFBNEIsR0FUekMsa0NBUzBDLFNBQVEsb0JBQThCOzs7Ozs7O0lBTzVFLFlBQ2MsWUFBaUMsRUFDakMsUUFBa0IsRUFDbEIsRUFBcUIsRUFDckIsT0FBd0I7UUFFbEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFMbkIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7S0FHckM7Ozs7SUFFUyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUFFO1FBQzNGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2RCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDckU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDOUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7d0JBQ2xCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hGLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQy9CLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUM1QyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDaEU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1NBQ0osQ0FBQyxDQUFDO0tBQ1Y7Q0FDSixDQUFBOztZQXREQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Q0FHYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyw2TUFBNk0sQ0FBQzthQUMxTjs7OztZQWJRLG1CQUFtQjtZQUduQixRQUFRO1lBSk8saUJBQWlCO1lBQW9CLGVBQWU7OztzQkFrQnZFLEtBQUs7O0FBRkcsNEJBQTRCO0lBRHhDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7NkNBU0ksbUJBQW1CO1FBQ3ZCLFFBQVE7UUFDZCxpQkFBaUI7UUFDWixlQUFlO0dBWDdCLDRCQUE0QixFQTZDeEM7U0E3Q1ksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xuXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgS2V5VmFsdWVEaWZmZXJzLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIEhhc0xvYWRhYmxlQ29udGVudCwgTWl4aW4sIFBsYXRmb3JtIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1wbGF0Zm9ybS1tYXAtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybU1hcFNlbGVjdG9yQ29tcG9uZW50IGV4dGVuZHMgTWFwU2VsZWN0b3JDb21wb25lbnQ8UGxhdGZvcm0+IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNsdXN0ZXI6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIG1hcmtlckZlYXR1cmVHcm91cDogTC5GZWF0dXJlR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycywgY2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3R2VvbWV0cmllcygpIHtcbiAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpO1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXApIHsgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5tYXJrZXJGZWF0dXJlR3JvdXApOyB9XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBsYXRmb3Jtcyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5tYXJrZXJDbHVzdGVyR3JvdXAoeyBhbmltYXRlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLmZlYXR1cmVHcm91cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBBcnJheSAmJiByZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gTC5tYXJrZXIoW2VudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1swXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihtYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyh0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9SZXN1bHRzRm91bmQuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
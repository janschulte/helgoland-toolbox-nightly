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
var PlatformMapSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PlatformMapSelectorComponent, _super);
    function PlatformMapSelectorComponent(apiInterface, mapCache, cd, differs) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.cd = cd;
        _this.differs = differs;
        return _this;
    }
    /**
     * @return {?}
     */
    PlatformMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isContentLoading(true);
        if (this.map && this.markerFeatureGroup) {
            this.map.removeLayer(this.markerFeatureGroup);
        }
        this.apiInterface.getPlatforms(this.serviceUrl, this.filter)
            .subscribe(function (res) {
            if (_this.map) {
                if (_this.cluster) {
                    _this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
                }
                else {
                    _this.markerFeatureGroup = L.featureGroup();
                }
                if (res instanceof Array && res.length > 0) {
                    res.forEach(function (entry) {
                        /** @type {?} */
                        var marker = L.marker([entry.geometry.coordinates[1], entry.geometry.coordinates[0]]);
                        marker.on('click', function () {
                            _this.onSelected.emit(entry);
                        });
                        _this.markerFeatureGroup.addLayer(marker);
                    });
                    _this.markerFeatureGroup.addTo(_this.map);
                    _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
                }
                else {
                    _this.onNoResultsFound.emit(true);
                }
                _this.map.invalidateSize();
                _this.isContentLoading(false);
            }
        });
    };
    PlatformMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-platform-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    PlatformMapSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: ChangeDetectorRef },
        { type: KeyValueDiffers }
    ]; };
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
    return PlatformMapSelectorComponent;
}(MapSelectorComponent));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tbWFwLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL3BsYXRmb3JtLW1hcC1zZWxlY3Rvci9wbGF0Zm9ybS1tYXAtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUMzRixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBV2Ysd0RBQThCO0lBTzVFLHNDQUNjLFlBQWlDLEVBQ2pDLFFBQWtCLEVBQ2xCLEVBQXFCLEVBQ3JCLE9BQXdCO1FBSnRDLFlBTUksa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsU0FDL0I7UUFOYSxrQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixhQUFPLEdBQVAsT0FBTyxDQUFpQjs7S0FHckM7Ozs7SUFFUyxxREFBYzs7O0lBQXhCO1FBQUEsaUJBNEJDO1FBM0JHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUFFO1FBQzNGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2RCxTQUFTLENBQUMsVUFBQyxHQUFHO1lBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2YsS0FBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNyRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUM5QztnQkFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7O3dCQUNkLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hGLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFOzRCQUNmLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUMvQixDQUFDLENBQUM7d0JBQ0gsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDNUMsQ0FBQyxDQUFDO29CQUNILEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ2hFO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELEtBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztTQUNKLENBQUMsQ0FBQztLQUNWOztnQkFyREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSx1SEFHYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyw2TUFBNk0sQ0FBQztpQkFDMU47Ozs7Z0JBYlEsbUJBQW1CO2dCQUduQixRQUFRO2dCQUpPLGlCQUFpQjtnQkFBb0IsZUFBZTs7OzBCQWtCdkUsS0FBSzs7SUFGRyw0QkFBNEI7UUFEeEMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpREFTSSxtQkFBbUI7WUFDdkIsUUFBUTtZQUNkLGlCQUFpQjtZQUNaLGVBQWU7T0FYN0IsNEJBQTRCLEVBNkN4Qzt1Q0EvREQ7RUFrQmtELG9CQUFvQjtTQUF6RCw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgUGxhdGZvcm0gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXBsYXRmb3JtLW1hcC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAubWFwLXZpZXdlcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfTpob3N0IC5tYXAtbm90aWZpZXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDoxMHB4O3otaW5kZXg6MTAwMTt3aWR0aDoxMjBweDtoZWlnaHQ6NzBweDtwYWRkaW5nOjVweDtvcGFjaXR5Oi44O3RleHQtYWxpZ246Y2VudGVyfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFwU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxQbGF0Zm9ybT4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2x1c3RlcjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgbWFya2VyRmVhdHVyZUdyb3VwOiBMLkZlYXR1cmVHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCkgeyB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm1hcmtlckZlYXR1cmVHcm91cCk7IH1cbiAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0UGxhdGZvcm1zKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2x1c3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IGFuaW1hdGU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwuZmVhdHVyZUdyb3VwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBMLm1hcmtlcihbZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob1Jlc3VsdHNGb3VuZC5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
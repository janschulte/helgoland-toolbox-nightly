/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, KeyValueDiffers } from '@angular/core';
import * as L from 'leaflet';
import { CachedMapComponent } from '../../base/cached-map-component';
import { MapCache } from '../../base/map-cache.service';
var GeometryMapViewerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GeometryMapViewerComponent, _super);
    function GeometryMapViewerComponent(mapCache, differs) {
        var _this = _super.call(this, mapCache, differs) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        _this.highlightStyle = {
            color: 'blue',
            weight: 10,
            opacity: 1
        };
        return _this;
    }
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.createMap();
        this.drawGeometry();
        this.showHighlight();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map) {
            if (changes["highlight"] && changes["highlight"].currentValue) {
                this.showHighlight();
            }
            if (changes["geometry"]) {
                this.drawGeometry();
            }
            if (changes["zoomTo"]) {
                this.zoomToGeometry();
            }
        }
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.zoomToGeometry = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var geometry = L.geoJSON(this.zoomTo);
        this.map.fitBounds(geometry.getBounds());
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.showHighlight = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.highlightGeometry) {
            this.map.removeLayer(this.highlightGeometry);
        }
        this.highlightGeometry = L.geoJSON(this.highlight, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, _this.highlightStyle);
            }
        });
        this.highlightGeometry.setStyle(this.highlightStyle);
        this.highlightGeometry.addTo(this.map);
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.drawGeometry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.geometry) {
            /** @type {?} */
            var geojson = L.geoJSON(this.geometry, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, _this.defaultStyle);
                }
            });
            geojson.setStyle(this.defaultStyle);
            geojson.addTo(this.map);
            if (!this.avoidZoomToGeometry) {
                this.map.fitBounds(geojson.getBounds());
            }
        }
    };
    GeometryMapViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-geometry-map-viewer',
                    template: "<div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n",
                    styles: [":host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    GeometryMapViewerComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: KeyValueDiffers }
    ]; };
    GeometryMapViewerComponent.propDecorators = {
        highlight: [{ type: Input }],
        geometry: [{ type: Input }],
        zoomTo: [{ type: Input }],
        avoidZoomToGeometry: [{ type: Input }]
    };
    return GeometryMapViewerComponent;
}(CachedMapComponent));
export { GeometryMapViewerComponent };
if (false) {
    /** @type {?} */
    GeometryMapViewerComponent.prototype.highlight;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.geometry;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.zoomTo;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.avoidZoomToGeometry;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.highlightGeometry;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.defaultStyle;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.highlightStyle;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.mapCache;
    /** @type {?} */
    GeometryMapViewerComponent.prototype.differs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi92aWV3L2dlb21ldHJ5LW1hcC12aWV3ZXIvZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0lBUVIsc0RBQWtCO0lBNEI5RCxvQ0FDYyxRQUFrQixFQUNsQixPQUF3QjtRQUZ0QyxZQUlJLGtCQUFNLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FDM0I7UUFKYSxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQU8sR0FBUCxPQUFPLENBQWlCOzZCQWRBO1lBQ2xDLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSTtTQUNoQjsrQkFFdUM7WUFDcEMsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDO1NBQ2I7O0tBT0E7Ozs7SUFFTSxvREFBZTs7OztRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR2xCLGdEQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsaUJBQU0sV0FBVyxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxpQkFBYyxPQUFPLGNBQVcsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBUyxDQUFDO2dCQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7U0FDSjs7Ozs7SUFHRyxtREFBYzs7Ozs7UUFDbEIsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Ozs7O0lBR3JDLGtEQUFhOzs7OztRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQyxZQUFZLEVBQUUsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDMUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN0RDtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUduQyxpREFBWTs7Ozs7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQ2hCLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckMsWUFBWSxFQUFFLFVBQUMsT0FBTyxFQUFFLE1BQU07b0JBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BEO2FBQ0osQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUMzQztTQUNKOzs7Z0JBOUZSLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsd0RBQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7aUJBQ3JGOzs7O2dCQVBRLFFBQVE7Z0JBSnlCLGVBQWU7Ozs0QkFjcEQsS0FBSzsyQkFHTCxLQUFLO3lCQUdMLEtBQUs7c0NBR0wsS0FBSzs7cUNBdkJWO0VBWWdELGtCQUFrQjtTQUFyRCwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgQ2FjaGVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9jYWNoZWQtbWFwLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1nZW9tZXRyeS1tYXAtdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Omhvc3QgLm1hcC12aWV3ZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudCBleHRlbmRzIENhY2hlZE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoaWdobGlnaHQ6IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlb21ldHJ5OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB6b29tVG86IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF2b2lkWm9vbVRvR2VvbWV0cnk6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGhpZ2hsaWdodEdlb21ldHJ5OiBMLkdlb0pTT047XG5cbiAgICBwcml2YXRlIGRlZmF1bHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICB3ZWlnaHQ6IDUsXG4gICAgICAgIG9wYWNpdHk6IDAuNjVcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgd2VpZ2h0OiAxMCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXAoKTtcbiAgICAgICAgdGhpcy5kcmF3R2VvbWV0cnkoKTtcbiAgICAgICAgdGhpcy5zaG93SGlnaGxpZ2h0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuaGlnaGxpZ2h0ICYmIGNoYW5nZXMuaGlnaGxpZ2h0LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hpZ2hsaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHZW9tZXRyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuem9vbVRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tVG9HZW9tZXRyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB6b29tVG9HZW9tZXRyeSgpIHtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBMLmdlb0pTT04odGhpcy56b29tVG8pO1xuICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoZ2VvbWV0cnkuZ2V0Qm91bmRzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0hpZ2hsaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkgPSBMLmdlb0pTT04odGhpcy5oaWdobGlnaHQsIHtcbiAgICAgICAgICAgIHBvaW50VG9MYXllcjogKGZlYXR1cmUsIGxhdGxuZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRHZW9tZXRyeS5zZXRTdHlsZSh0aGlzLmhpZ2hsaWdodFN0eWxlKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRHZW9tZXRyeS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R2VvbWV0cnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBnZW9qc29uID0gTC5nZW9KU09OKHRoaXMuZ2VvbWV0cnksIHtcbiAgICAgICAgICAgICAgICBwb2ludFRvTGF5ZXI6IChmZWF0dXJlLCBsYXRsbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywgdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICAgIGdlb2pzb24uYWRkVG8odGhpcy5tYXApO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXZvaWRab29tVG9HZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyhnZW9qc29uLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
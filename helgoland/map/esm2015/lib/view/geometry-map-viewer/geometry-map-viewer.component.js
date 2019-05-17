/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, KeyValueDiffers } from '@angular/core';
import * as L from 'leaflet';
import { CachedMapComponent } from '../../base/cached-map-component';
import { MapCache } from '../../base/map-cache.service';
export class GeometryMapViewerComponent extends CachedMapComponent {
    /**
     * @param {?} mapCache
     * @param {?} differs
     */
    constructor(mapCache, differs) {
        super(mapCache, differs);
        this.mapCache = mapCache;
        this.differs = differs;
        this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        this.highlightStyle = {
            color: 'blue',
            weight: 10,
            opacity: 1
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.createMap();
        this.drawGeometry();
        this.showHighlight();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
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
    }
    /**
     * @return {?}
     */
    zoomToGeometry() {
        /** @type {?} */
        const geometry = L.geoJSON(this.zoomTo);
        this.map.fitBounds(geometry.getBounds());
    }
    /**
     * @return {?}
     */
    showHighlight() {
        if (this.highlightGeometry) {
            this.map.removeLayer(this.highlightGeometry);
        }
        this.highlightGeometry = L.geoJSON(this.highlight, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, this.highlightStyle);
            }
        });
        this.highlightGeometry.setStyle(this.highlightStyle);
        this.highlightGeometry.addTo(this.map);
    }
    /**
     * @return {?}
     */
    drawGeometry() {
        if (this.geometry) {
            /** @type {?} */
            const geojson = L.geoJSON(this.geometry, {
                pointToLayer: (feature, latlng) => {
                    return L.circleMarker(latlng, this.defaultStyle);
                }
            });
            geojson.setStyle(this.defaultStyle);
            geojson.addTo(this.map);
            if (!this.avoidZoomToGeometry) {
                this.map.fitBounds(geojson.getBounds());
            }
        }
    }
}
GeometryMapViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-geometry-map-viewer',
                template: `<div [attr.id]="mapId" class="map-viewer"></div>
`,
                styles: [`:host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}`]
            },] },
];
/** @nocollapse */
GeometryMapViewerComponent.ctorParameters = () => [
    { type: MapCache },
    { type: KeyValueDiffers }
];
GeometryMapViewerComponent.propDecorators = {
    highlight: [{ type: Input }],
    geometry: [{ type: Input }],
    zoomTo: [{ type: Input }],
    avoidZoomToGeometry: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi92aWV3L2dlb21ldHJ5LW1hcC12aWV3ZXIvZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVF4RCxNQUFNLGlDQUFrQyxTQUFRLGtCQUFrQjs7Ozs7SUE0QjlELFlBQ2MsUUFBa0IsRUFDbEIsT0FBd0I7UUFFbEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUhmLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7NEJBZEE7WUFDbEMsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJO1NBQ2hCOzhCQUV1QztZQUNwQyxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjtLQU9BOzs7O0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR2xCLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxpQkFBYyxPQUFPLGNBQVcsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBUyxDQUFDO2dCQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7U0FDSjs7Ozs7SUFHRyxjQUFjOztRQUNsQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs7Ozs7SUFHckMsYUFBYTtRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEQ7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFHbkMsWUFBWTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDaEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNyQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BEO2FBQ0osQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUMzQztTQUNKOzs7O1lBOUZSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Q0FDYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyx3RUFBd0UsQ0FBQzthQUNyRjs7OztZQVBRLFFBQVE7WUFKeUIsZUFBZTs7O3dCQWNwRCxLQUFLO3VCQUdMLEtBQUs7cUJBR0wsS0FBSztrQ0FHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgS2V5VmFsdWVEaWZmZXJzLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENhY2hlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2Jhc2UvY2FjaGVkLW1hcC1jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZ2VvbWV0cnktbWFwLXZpZXdlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfTpob3N0IC5tYXAtdmlld2Vye2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlNYXBWaWV3ZXJDb21wb25lbnQgZXh0ZW5kcyBDYWNoZWRNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGlnaGxpZ2h0OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZW9tZXRyeTogR2VvSlNPTi5HZW9Kc29uT2JqZWN0O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgem9vbVRvOiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhdm9pZFpvb21Ub0dlb21ldHJ5OiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRHZW9tZXRyeTogTC5HZW9KU09OO1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgd2VpZ2h0OiA1LFxuICAgICAgICBvcGFjaXR5OiAwLjY1XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGlnaGxpZ2h0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAnYmx1ZScsXG4gICAgICAgIHdlaWdodDogMTAsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgIHRoaXMuZHJhd0dlb21ldHJ5KCk7XG4gICAgICAgIHRoaXMuc2hvd0hpZ2hsaWdodCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmhpZ2hsaWdodCAmJiBjaGFuZ2VzLmhpZ2hsaWdodC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dIaWdobGlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2VvbWV0cnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnpvb21Ubykge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvR2VvbWV0cnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgem9vbVRvR2VvbWV0cnkoKSB7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gTC5nZW9KU09OKHRoaXMuem9vbVRvKTtcbiAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKGdlb21ldHJ5LmdldEJvdW5kcygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dIaWdobGlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodEdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLmhpZ2hsaWdodEdlb21ldHJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZ2hsaWdodEdlb21ldHJ5ID0gTC5nZW9KU09OKHRoaXMuaGlnaGxpZ2h0LCB7XG4gICAgICAgICAgICBwb2ludFRvTGF5ZXI6IChmZWF0dXJlLCBsYXRsbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTC5jaXJjbGVNYXJrZXIobGF0bG5nLCB0aGlzLmhpZ2hsaWdodFN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkuc2V0U3R5bGUodGhpcy5oaWdobGlnaHRTdHlsZSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkuYWRkVG8odGhpcy5tYXApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0dlb21ldHJ5KCkge1xuICAgICAgICBpZiAodGhpcy5nZW9tZXRyeSkge1xuICAgICAgICAgICAgY29uc3QgZ2VvanNvbiA9IEwuZ2VvSlNPTih0aGlzLmdlb21ldHJ5LCB7XG4gICAgICAgICAgICAgICAgcG9pbnRUb0xheWVyOiAoZmVhdHVyZSwgbGF0bG5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgICBnZW9qc29uLmFkZFRvKHRoaXMubWFwKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmF2b2lkWm9vbVRvR2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoZ2VvanNvbi5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, KeyValueDiffers, Output } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
import { GeometryMapViewerComponent } from '../geometry-map-viewer/geometry-map-viewer.component';
export class GeometryMapEditorComponent extends GeometryMapViewerComponent {
    /**
     * @param {?} mapCache
     * @param {?} differs
     */
    constructor(mapCache, differs) {
        super(mapCache, differs);
        this.mapCache = mapCache;
        this.differs = differs;
        this.geometryChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        // TODO precheck is it's a point
        // if (this.geojsonGeometry) {
        // this.geojsonGeometry.on('mousemove', (evt: LeafletMouseEvent) => this.onDragMove(evt));
        // this.geojsonGeometry.on('mousedown', (evt) => this.onDragStart(evt));
        // this.geojsonGeometry.on('mouseup', (evt) => this.onDragEnd(evt));
        // this.geojsonGeometry.on('click', (evt: LeafletMouseEvent) => {
        //     // this.geojsonGeometry.clearLayers();
        //     this.geojsonGeometry.addData({
        //         type: 'Point',
        //         coordinates: [evt.latlng.lat, evt.latlng.lng]
        //     } as Point);
        // });
        // }
        // this.geometryLayer.on({
        //     mousedown: function () {
        //         this.move = true;
        //     },
        // });
        // this.map.on('mousemove', function (e: LeafletMouseEvent) {
        //     console.log('mousemove');
        //     this.geometryLayer.setLatLng(e.latlng);
        // });
        this.geometryLayer.on('mousedown', (downEvt) => {
            this.map.dragging.disable();
            this.map.on('mousemove', (moveEvt) => {
                (/** @type {?} */ (this.geometryLayer)).setLatLng(moveEvt.latlng);
            });
        });
        this.map.on('mouseup', (upEvt) => {
            console.log(upEvt.latlng);
            this.map.off('mousemove');
            this.map.dragging.enable();
        });
        // this.map.on('mouse', (evt: LeafletMouseEvent) => {
        //     (this.geometryLayer as CircleMarker).setLatLng(evt.latlng);
        // });
        // this.map.on('mouseup', function (e) {
        //     this.map.removeEventListener('mousemove');
        // });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragEnd(evt) {
        this.move = false;
        this.map.dragging.enable();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragMove(evt) {
        if (this.move) {
            console.log('mousemove');
            // debugger;
            // this.geojsonGeometry.getLayers()[0].setLatLng(evt.latlng);
        }
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragStart(evt) {
        this.move = true;
        this.map.dragging.disable();
    }
}
GeometryMapEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-geometry-map-editor',
                template: `<div [attr.id]="mapId" class="map-viewer"></div>
`,
                styles: [`:host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}`]
            },] },
];
/** @nocollapse */
GeometryMapEditorComponent.ctorParameters = () => [
    { type: MapCache },
    { type: KeyValueDiffers }
];
GeometryMapEditorComponent.propDecorators = {
    geometryChanged: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    GeometryMapEditorComponent.prototype.geometryChanged;
    /** @type {?} */
    GeometryMapEditorComponent.prototype.move;
    /** @type {?} */
    GeometryMapEditorComponent.prototype.mapCache;
    /** @type {?} */
    GeometryMapEditorComponent.prototype.differs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktbWFwLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi92aWV3L2dlb21ldHJ5LW1hcC1lZGl0b3IvZ2VvbWV0cnktbWFwLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQVFsRyxNQUFNLGlDQUFrQyxTQUFRLDBCQUEwQjs7Ozs7SUFPdEUsWUFDYyxRQUFrQixFQUNsQixPQUF3QjtRQUVsQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSGYsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFpQjsrQkFOd0IsSUFBSSxZQUFZLEVBQUU7S0FTL0U7Ozs7SUFFTSxlQUFlO1FBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUEwQnhCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQTBCLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUEwQixFQUFFLEVBQUU7Z0JBQ3BELG1CQUFDLElBQUksQ0FBQyxhQUE2QixFQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsRSxDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUF3QixFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhQyxTQUFTLENBQUMsR0FBaUI7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7OztJQUd2QixVQUFVLENBQUMsR0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7U0FJNUI7Ozs7OztJQUdHLFdBQVcsQ0FBQyxHQUFpQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7OztZQXRGbkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTtDQUNiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHdFQUF3RSxDQUFDO2FBQ3JGOzs7O1lBUlEsUUFBUTtZQUhnQyxlQUFlOzs7OEJBYzNELE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgS2V5VmFsdWVEaWZmZXJzLCBPbkNoYW5nZXMsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2lyY2xlTWFya2VyLCBMZWFmbGV0RXZlbnQsIExlYWZsZXRNb3VzZUV2ZW50IH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4uL2dlb21ldHJ5LW1hcC12aWV3ZXIvZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1nZW9tZXRyeS1tYXAtZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Omhvc3QgLm1hcC12aWV3ZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeU1hcEVkaXRvckNvbXBvbmVudCBleHRlbmRzIEdlb21ldHJ5TWFwVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBnZW9tZXRyeUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxHZW9KU09OLkdlb0pzb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBtb3ZlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgICAgICAvLyBUT0RPIHByZWNoZWNrIGlzIGl0J3MgYSBwb2ludFxuICAgICAgICAvLyBpZiAodGhpcy5nZW9qc29uR2VvbWV0cnkpIHtcbiAgICAgICAgLy8gdGhpcy5nZW9qc29uR2VvbWV0cnkub24oJ21vdXNlbW92ZScsIChldnQ6IExlYWZsZXRNb3VzZUV2ZW50KSA9PiB0aGlzLm9uRHJhZ01vdmUoZXZ0KSk7XG4gICAgICAgIC8vIHRoaXMuZ2VvanNvbkdlb21ldHJ5Lm9uKCdtb3VzZWRvd24nLCAoZXZ0KSA9PiB0aGlzLm9uRHJhZ1N0YXJ0KGV2dCkpO1xuICAgICAgICAvLyB0aGlzLmdlb2pzb25HZW9tZXRyeS5vbignbW91c2V1cCcsIChldnQpID0+IHRoaXMub25EcmFnRW5kKGV2dCkpO1xuICAgICAgICAvLyB0aGlzLmdlb2pzb25HZW9tZXRyeS5vbignY2xpY2snLCAoZXZ0OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xuICAgICAgICAvLyAgICAgLy8gdGhpcy5nZW9qc29uR2VvbWV0cnkuY2xlYXJMYXllcnMoKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZ2VvanNvbkdlb21ldHJ5LmFkZERhdGEoe1xuICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgIC8vICAgICAgICAgY29vcmRpbmF0ZXM6IFtldnQubGF0bG5nLmxhdCwgZXZ0LmxhdGxuZy5sbmddXG4gICAgICAgIC8vICAgICB9IGFzIFBvaW50KTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB0aGlzLmdlb21ldHJ5TGF5ZXIub24oe1xuICAgICAgICAvLyAgICAgbW91c2Vkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb3ZlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMubWFwLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZTogTGVhZmxldE1vdXNlRXZlbnQpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdtb3VzZW1vdmUnKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZ2VvbWV0cnlMYXllci5zZXRMYXRMbmcoZS5sYXRsbmcpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLmdlb21ldHJ5TGF5ZXIub24oJ21vdXNlZG93bicsIChkb3duRXZ0OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5tYXAub24oJ21vdXNlbW92ZScsIChtb3ZlRXZ0OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICh0aGlzLmdlb21ldHJ5TGF5ZXIgYXMgQ2lyY2xlTWFya2VyKS5zZXRMYXRMbmcobW92ZUV2dC5sYXRsbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcC5vbignbW91c2V1cCcsICh1cEV2dDogTGVhZmxldE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVwRXZ0LmxhdGxuZyk7XG4gICAgICAgICAgICB0aGlzLm1hcC5vZmYoJ21vdXNlbW92ZScpO1xuICAgICAgICAgICAgdGhpcy5tYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMubWFwLm9uKCdtb3VzZScsIChldnQ6IExlYWZsZXRNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgICAodGhpcy5nZW9tZXRyeUxheWVyIGFzIENpcmNsZU1hcmtlcikuc2V0TGF0TG5nKGV2dC5sYXRsbmcpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyB0aGlzLm1hcC5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLm1hcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETyBkZXN0cm95IGV2ZW50Li4uXG5cbiAgICBwcml2YXRlIG9uRHJhZ0VuZChldnQ6IExlYWZsZXRFdmVudCkge1xuICAgICAgICB0aGlzLm1vdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRyYWdNb3ZlKGV2dDogTGVhZmxldE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdXNlbW92ZScpO1xuICAgICAgICAgICAgLy8gZGVidWdnZXI7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuZ2VvanNvbkdlb21ldHJ5LmdldExheWVycygpWzBdLnNldExhdExuZyhldnQubGF0bG5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25EcmFnU3RhcnQoZXZ0OiBMZWFmbGV0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3ZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgIH1cbn1cbiJdfQ==
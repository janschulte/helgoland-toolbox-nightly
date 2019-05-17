/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, KeyValueDiffers, Output } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
import { GeometryMapViewerComponent } from '../geometry-map-viewer/geometry-map-viewer.component';
var GeometryMapEditorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GeometryMapEditorComponent, _super);
    function GeometryMapEditorComponent(mapCache, differs) {
        var _this = _super.call(this, mapCache, differs) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.geometryChanged = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    GeometryMapEditorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
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
        this.geometryLayer.on('mousedown', function (downEvt) {
            _this.map.dragging.disable();
            _this.map.on('mousemove', function (moveEvt) {
                (/** @type {?} */ (_this.geometryLayer)).setLatLng(moveEvt.latlng);
            });
        });
        this.map.on('mouseup', function (upEvt) {
            console.log(upEvt.latlng);
            _this.map.off('mousemove');
            _this.map.dragging.enable();
        });
        // this.map.on('mouse', (evt: LeafletMouseEvent) => {
        //     (this.geometryLayer as CircleMarker).setLatLng(evt.latlng);
        // });
        // this.map.on('mouseup', function (e) {
        //     this.map.removeEventListener('mousemove');
        // });
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    GeometryMapEditorComponent.prototype.onDragEnd = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.move = false;
        this.map.dragging.enable();
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    GeometryMapEditorComponent.prototype.onDragMove = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (this.move) {
            console.log('mousemove');
            // debugger;
            // this.geojsonGeometry.getLayers()[0].setLatLng(evt.latlng);
        }
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    GeometryMapEditorComponent.prototype.onDragStart = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.move = true;
        this.map.dragging.disable();
    };
    GeometryMapEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-geometry-map-editor',
                    template: "<div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n",
                    styles: [":host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    GeometryMapEditorComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: KeyValueDiffers }
    ]; };
    GeometryMapEditorComponent.propDecorators = {
        geometryChanged: [{ type: Output }]
    };
    return GeometryMapEditorComponent;
}(GeometryMapViewerComponent));
export { GeometryMapEditorComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktbWFwLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi92aWV3L2dlb21ldHJ5LW1hcC1lZGl0b3IvZ2VvbWV0cnktbWFwLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7O0lBUWxELHNEQUEwQjtJQU90RSxvQ0FDYyxRQUFrQixFQUNsQixPQUF3QjtRQUZ0QyxZQUlJLGtCQUFNLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FDM0I7UUFKYSxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQU8sR0FBUCxPQUFPLENBQWlCO2dDQU53QixJQUFJLFlBQVksRUFBRTs7S0FTL0U7Ozs7SUFFTSxvREFBZTs7Ozs7UUFDbEIsaUJBQU0sZUFBZSxXQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMEJ4QixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUEwQjtZQUMxRCxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUEwQjtnQkFDaEQsbUJBQUMsS0FBSSxDQUFDLGFBQTZCLEVBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xFLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQXdCO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYUMsOENBQVM7Ozs7Y0FBQyxHQUFpQjtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7O0lBR3ZCLCtDQUFVOzs7O2NBQUMsR0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7U0FJNUI7Ozs7OztJQUdHLGdEQUFXOzs7O2NBQUMsR0FBaUI7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7OztnQkF0Rm5DLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsd0RBQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7aUJBQ3JGOzs7O2dCQVJRLFFBQVE7Z0JBSGdDLGVBQWU7OztrQ0FjM0QsTUFBTTs7cUNBZFg7RUFZZ0QsMEJBQTBCO1NBQTdELDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uQ2hhbmdlcywgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaXJjbGVNYXJrZXIsIExlYWZsZXRFdmVudCwgTGVhZmxldE1vdXNlRXZlbnQgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IEdlb21ldHJ5TWFwVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vZ2VvbWV0cnktbWFwLXZpZXdlci9nZW9tZXRyeS1tYXAtdmlld2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWdlb21ldHJ5LW1hcC1lZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX06aG9zdCAubWFwLXZpZXdlcntoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5TWFwRWRpdG9yQ29tcG9uZW50IGV4dGVuZHMgR2VvbWV0cnlNYXBWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGdlb21ldHJ5Q2hhbmdlZDogRXZlbnRFbWl0dGVyPEdlb0pTT04uR2VvSnNvbk9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIG1vdmU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgICAgIC8vIFRPRE8gcHJlY2hlY2sgaXMgaXQncyBhIHBvaW50XG4gICAgICAgIC8vIGlmICh0aGlzLmdlb2pzb25HZW9tZXRyeSkge1xuICAgICAgICAvLyB0aGlzLmdlb2pzb25HZW9tZXRyeS5vbignbW91c2Vtb3ZlJywgKGV2dDogTGVhZmxldE1vdXNlRXZlbnQpID0+IHRoaXMub25EcmFnTW92ZShldnQpKTtcbiAgICAgICAgLy8gdGhpcy5nZW9qc29uR2VvbWV0cnkub24oJ21vdXNlZG93bicsIChldnQpID0+IHRoaXMub25EcmFnU3RhcnQoZXZ0KSk7XG4gICAgICAgIC8vIHRoaXMuZ2VvanNvbkdlb21ldHJ5Lm9uKCdtb3VzZXVwJywgKGV2dCkgPT4gdGhpcy5vbkRyYWdFbmQoZXZ0KSk7XG4gICAgICAgIC8vIHRoaXMuZ2VvanNvbkdlb21ldHJ5Lm9uKCdjbGljaycsIChldnQ6IExlYWZsZXRNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgICAvLyB0aGlzLmdlb2pzb25HZW9tZXRyeS5jbGVhckxheWVycygpO1xuICAgICAgICAvLyAgICAgdGhpcy5nZW9qc29uR2VvbWV0cnkuYWRkRGF0YSh7XG4gICAgICAgIC8vICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgLy8gICAgICAgICBjb29yZGluYXRlczogW2V2dC5sYXRsbmcubGF0LCBldnQubGF0bG5nLmxuZ11cbiAgICAgICAgLy8gICAgIH0gYXMgUG9pbnQpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoaXMuZ2VvbWV0cnlMYXllci5vbih7XG4gICAgICAgIC8vICAgICBtb3VzZWRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vdmUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gdGhpcy5tYXAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlOiBMZWFmbGV0TW91c2VFdmVudCkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ21vdXNlbW92ZScpO1xuICAgICAgICAvLyAgICAgdGhpcy5nZW9tZXRyeUxheWVyLnNldExhdExuZyhlLmxhdGxuZyk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnlMYXllci5vbignbW91c2Vkb3duJywgKGRvd25FdnQ6IExlYWZsZXRNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLm1hcC5vbignbW91c2Vtb3ZlJywgKG1vdmVFdnQ6IExlYWZsZXRNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgKHRoaXMuZ2VvbWV0cnlMYXllciBhcyBDaXJjbGVNYXJrZXIpLnNldExhdExuZyhtb3ZlRXZ0LmxhdGxuZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWFwLm9uKCdtb3VzZXVwJywgKHVwRXZ0OiBMZWFmbGV0TW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codXBFdnQubGF0bG5nKTtcbiAgICAgICAgICAgIHRoaXMubWFwLm9mZignbW91c2Vtb3ZlJyk7XG4gICAgICAgICAgICB0aGlzLm1hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy5tYXAub24oJ21vdXNlJywgKGV2dDogTGVhZmxldE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgLy8gICAgICh0aGlzLmdlb21ldHJ5TGF5ZXIgYXMgQ2lyY2xlTWFya2VyKS5zZXRMYXRMbmcoZXZ0LmxhdGxuZyk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMubWFwLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gICAgIHRoaXMubWFwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGRlc3Ryb3kgZXZlbnQuLi5cblxuICAgIHByaXZhdGUgb25EcmFnRW5kKGV2dDogTGVhZmxldEV2ZW50KSB7XG4gICAgICAgIHRoaXMubW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRHJhZ01vdmUoZXZ0OiBMZWFmbGV0TW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbW91c2Vtb3ZlJyk7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcblxuICAgICAgICAgICAgLy8gdGhpcy5nZW9qc29uR2VvbWV0cnkuZ2V0TGF5ZXJzKClbMF0uc2V0TGF0TG5nKGV2dC5sYXRsbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRyYWdTdGFydChldnQ6IExlYWZsZXRFdmVudCkge1xuICAgICAgICB0aGlzLm1vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgfVxufVxuIl19
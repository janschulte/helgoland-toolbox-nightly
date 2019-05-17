/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EventEmitter, Input, Output, } from '@angular/core';
import * as L from 'leaflet';
import { CachedMapComponent } from '../base/cached-map-component';
/**
 * @abstract
 * @template T
 */
var MapSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MapSelectorComponent, _super);
    function MapSelectorComponent(mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.onSelected = new EventEmitter();
        _this.onContentLoading = new EventEmitter();
        _this.onNoResultsFound = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    MapSelectorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.createMap();
        setTimeout(function () {
            _this.drawGeometries();
            _this.cd.detectChanges();
        }, 10);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map) {
            if (changes["serviceUrl"] || changes["filter"] || changes["cluster"]) {
                this.drawGeometries();
            }
        }
    };
    /**
     * Zooms to the given bounds
     *
     * @protected
     * @param bounds where to zoom
     * @memberof MapSelectorComponent
     */
    /**
     * Zooms to the given bounds
     *
     * @protected
     * \@memberof MapSelectorComponent
     * @param {?} bounds where to zoom
     * @return {?}
     */
    MapSelectorComponent.prototype.zoomToMarkerBounds = /**
     * Zooms to the given bounds
     *
     * @protected
     * \@memberof MapSelectorComponent
     * @param {?} bounds where to zoom
     * @return {?}
     */
    function (bounds) {
        if (!this.avoidZoomToSelection) {
            this.map.fitBounds(bounds, this.fitBoundsMarkerOptions || {});
        }
    };
    MapSelectorComponent.propDecorators = {
        serviceUrl: [{ type: Input }],
        filter: [{ type: Input }],
        avoidZoomToSelection: [{ type: Input }],
        markerSelectorGenerator: [{ type: Input }],
        onSelected: [{ type: Output }],
        onContentLoading: [{ type: Output }],
        fitBoundsMarkerOptions: [{ type: Input }],
        onNoResultsFound: [{ type: Output }]
    };
    return MapSelectorComponent;
}(CachedMapComponent));
export { MapSelectorComponent };
if (false) {
    /**
     * \@input The serviceUrl, where the selection should be loaded.
     * @type {?}
     */
    MapSelectorComponent.prototype.serviceUrl;
    /**
     * \@input The filter which should be used, while fetching the selection.
     * @type {?}
     */
    MapSelectorComponent.prototype.filter;
    /** @type {?} */
    MapSelectorComponent.prototype.avoidZoomToSelection;
    /** @type {?} */
    MapSelectorComponent.prototype.markerSelectorGenerator;
    /** @type {?} */
    MapSelectorComponent.prototype.onSelected;
    /** @type {?} */
    MapSelectorComponent.prototype.onContentLoading;
    /**
     * \@input Additional configuration for the marker zooming (https://leafletjs.com/reference-1.3.4.html#fitbounds-options)
     * @type {?}
     */
    MapSelectorComponent.prototype.fitBoundsMarkerOptions;
    /** @type {?} */
    MapSelectorComponent.prototype.isContentLoading;
    /** @type {?} */
    MapSelectorComponent.prototype.onNoResultsFound;
    /** @type {?} */
    MapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    MapSelectorComponent.prototype.differs;
    /** @type {?} */
    MapSelectorComponent.prototype.cd;
    /**
     * Draws the geometries
     *
     * @protected
     * @abstract
     * \@memberof MapSelectorComponent
     * @abstract
     * @return {?}
     */
    MapSelectorComponent.prototype.drawGeometries = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL21hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBR0gsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7OztJQUt0RCxnREFBa0I7SUFzQzFCLDhCQUNjLFFBQWtCLEVBQ2xCLE9BQXdCLEVBQ3hCLEVBQXFCO1FBSG5DLFlBS0ksa0JBQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUMzQjtRQUxhLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsUUFBRSxHQUFGLEVBQUUsQ0FBbUI7MkJBbkJFLElBQUksWUFBWSxFQUFLO2lDQUdULElBQUksWUFBWSxFQUFFO2lDQVdsQixJQUFJLFlBQVksRUFBRTs7S0FRbEU7Ozs7SUFFTSw4Q0FBZTs7Ozs7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzNCLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7OztJQUdKLDBDQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsaUJBQU0sV0FBVyxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxrQkFBZSxPQUFPLFVBQU8sSUFBSSxPQUFPLFdBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtTQUNKOztJQVlMOzs7Ozs7T0FNRzs7Ozs7Ozs7O0lBQ08saURBQWtCOzs7Ozs7OztJQUE1QixVQUE2QixNQUFnQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNqRTtLQUNKOzs2QkE3RUEsS0FBSzt5QkFNTCxLQUFLO3VDQUdMLEtBQUs7MENBR0wsS0FBSzs2QkFHTCxNQUFNO21DQUdOLE1BQU07eUNBTU4sS0FBSzttQ0FLTCxNQUFNOzsrQkFyRFg7RUFrQlksa0JBQWtCO1NBRFIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhhc0xvYWRhYmxlQ29udGVudCwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENhY2hlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvY2FjaGVkLW1hcC1jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlclNlbGVjdG9yR2VuZXJhdG9yIH0gZnJvbSAnLi9tb2RlbC9tYXJrZXItc2VsZWN0b3ItZ2VuZXJhdG9yJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFQ+XG4gICAgZXh0ZW5kcyBDYWNoZWRNYXBDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgSGFzTG9hZGFibGVDb250ZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBUaGUgc2VydmljZVVybCwgd2hlcmUgdGhlIHNlbGVjdGlvbiBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlcnZpY2VVcmw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBUaGUgZmlsdGVyIHdoaWNoIHNob3VsZCBiZSB1c2VkLCB3aGlsZSBmZXRjaGluZyB0aGUgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYXZvaWRab29tVG9TZWxlY3Rpb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXJrZXJTZWxlY3RvckdlbmVyYXRvcjogTWFya2VyU2VsZWN0b3JHZW5lcmF0b3I7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBtYXJrZXIgem9vbWluZyAoaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuNC5odG1sI2ZpdGJvdW5kcy1vcHRpb25zKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpdEJvdW5kc01hcmtlck9wdGlvbnM6IEwuRml0Qm91bmRzT3B0aW9ucztcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbk5vUmVzdWx0c0ZvdW5kOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXAoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdHZW9tZXRyaWVzKCk7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnNlcnZpY2VVcmwgfHwgY2hhbmdlcy5maWx0ZXIgfHwgY2hhbmdlcy5jbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2VvbWV0cmllcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIGdlb21ldHJpZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VsZWN0b3JDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZHJhd0dlb21ldHJpZXMoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFpvb21zIHRvIHRoZSBnaXZlbiBib3VuZHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gYm91bmRzIHdoZXJlIHRvIHpvb21cbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VsZWN0b3JDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgem9vbVRvTWFya2VyQm91bmRzKGJvdW5kczogTC5MYXRMbmdCb3VuZHNFeHByZXNzaW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5hdm9pZFpvb21Ub1NlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKGJvdW5kcywgdGhpcy5maXRCb3VuZHNNYXJrZXJPcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
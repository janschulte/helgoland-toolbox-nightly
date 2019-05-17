/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
var ZoomControlComponent = /** @class */ (function () {
    function ZoomControlComponent(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    ZoomControlComponent.prototype.zoomIn = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).zoomIn();
    };
    /**
     * @return {?}
     */
    ZoomControlComponent.prototype.zoomOut = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).zoomOut();
    };
    ZoomControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-zoom-control',
                    template: "<div class=\"btn-group-vertical map-control\">\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomIn()\">\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n  </button>\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomOut()\">\n    <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n  </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ZoomControlComponent.ctorParameters = function () { return [
        { type: MapCache }
    ]; };
    ZoomControlComponent.propDecorators = {
        mapId: [{ type: Input }]
    };
    return ZoomControlComponent;
}());
export { ZoomControlComponent };
if (false) {
    /** @type {?} */
    ZoomControlComponent.prototype.mapId;
    /** @type {?} */
    ZoomControlComponent.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL3pvb20vem9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7SUFtQnRELDhCQUNZLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7S0FDekI7Ozs7SUFFRSxxQ0FBTTs7OztRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7SUFHckMsc0NBQU87Ozs7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7OztnQkExQjlDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsb1dBUVg7aUJBQ0E7Ozs7Z0JBYlEsUUFBUTs7O3dCQWdCZCxLQUFLOzsrQkFsQlI7O1NBZ0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXpvb20tY29udHJvbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cC12ZXJ0aWNhbCBtYXAtY29udHJvbFwiPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgYnRuLXNtXCIgKGNsaWNrKT1cInpvb21JbigpXCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0IGJ0bi1zbVwiIChjbGljayk9XCJ6b29tT3V0KClcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLW1pbnVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBab29tQ29udHJvbENvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZVxuICApIHsgfVxuXG4gIHB1YmxpYyB6b29tSW4oKSB7XG4gICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuem9vbUluKCk7XG4gIH1cblxuICBwdWJsaWMgem9vbU91dCgpIHtcbiAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS56b29tT3V0KCk7XG4gIH1cbn1cbiJdfQ==
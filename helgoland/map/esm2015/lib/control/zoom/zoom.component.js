/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
export class ZoomControlComponent {
    /**
     * @param {?} mapCache
     */
    constructor(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    zoomIn() {
        this.mapCache.getMap(this.mapId).zoomIn();
    }
    /**
     * @return {?}
     */
    zoomOut() {
        this.mapCache.getMap(this.mapId).zoomOut();
    }
}
ZoomControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-zoom-control',
                template: `<div class="btn-group-vertical map-control">
  <button type="button" class="btn btn-light btn-sm" (click)="zoomIn()">
    <i class="fa fa-plus" aria-hidden="true"></i>
  </button>
  <button type="button" class="btn btn-light btn-sm" (click)="zoomOut()">
    <i class="fa fa-minus" aria-hidden="true"></i>
  </button>
</div>
`
            },] },
];
/** @nocollapse */
ZoomControlComponent.ctorParameters = () => [
    { type: MapCache }
];
ZoomControlComponent.propDecorators = {
    mapId: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ZoomControlComponent.prototype.mapId;
    /** @type {?} */
    ZoomControlComponent.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL3pvb20vem9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWN4RCxNQUFNOzs7O0lBS0osWUFDWSxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0tBQ3pCOzs7O0lBRUUsTUFBTTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7SUFHckMsT0FBTztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7OztZQTFCOUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Q0FRWDthQUNBOzs7O1lBYlEsUUFBUTs7O29CQWdCZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItem9vbS1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwLXZlcnRpY2FsIG1hcC1jb250cm9sXCI+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodCBidG4tc21cIiAoY2xpY2spPVwiem9vbUluKClcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgYnRuLXNtXCIgKGNsaWNrKT1cInpvb21PdXQoKVwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtbWludXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFpvb21Db250cm9sQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlXG4gICkgeyB9XG5cbiAgcHVibGljIHpvb21JbigpIHtcbiAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS56b29tSW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB6b29tT3V0KCkge1xuICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLnpvb21PdXQoKTtcbiAgfVxufVxuIl19
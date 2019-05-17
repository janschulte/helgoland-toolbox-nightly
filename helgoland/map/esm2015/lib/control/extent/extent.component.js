/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
export class ExtentControlComponent {
    /**
     * @param {?} mapCache
     */
    constructor(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    zoomToExtent() {
        this.mapCache.getMap(this.mapId).fitBounds(this.extent);
    }
}
ExtentControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-extent-control',
                template: `<div>
  <button type="button" (click)="zoomToExtent()">zoom to extent</button>
</div>
`
            },] },
];
/** @nocollapse */
ExtentControlComponent.ctorParameters = () => [
    { type: MapCache }
];
ExtentControlComponent.propDecorators = {
    mapId: [{ type: Input }],
    extent: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ExtentControlComponent.prototype.mapId;
    /** @type {?} */
    ExtentControlComponent.prototype.extent;
    /** @type {?} */
    ExtentControlComponent.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZXh0ZW50L2V4dGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVN4RCxNQUFNOzs7O0lBUUosWUFDWSxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0tBQ3pCOzs7O0lBRUUsWUFBWTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7OztZQXBCM0QsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7O0NBR1g7YUFDQTs7OztZQVJRLFFBQVE7OztvQkFXZCxLQUFLO3FCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1leHRlbnQtY29udHJvbCcsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInpvb21Ub0V4dGVudCgpXCI+em9vbSB0byBleHRlbnQ8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbnRDb250cm9sQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZXh0ZW50OiBMLkxhdExuZ0JvdW5kc0V4cHJlc3Npb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZVxuICApIHsgfVxuXG4gIHB1YmxpYyB6b29tVG9FeHRlbnQoKSB7XG4gICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuZml0Qm91bmRzKHRoaXMuZXh0ZW50KTtcbiAgfVxuXG59XG4iXX0=
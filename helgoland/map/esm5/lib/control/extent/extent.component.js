/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MapCache } from '../../base/map-cache.service';
var ExtentControlComponent = /** @class */ (function () {
    function ExtentControlComponent(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    ExtentControlComponent.prototype.zoomToExtent = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).fitBounds(this.extent);
    };
    ExtentControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-extent-control',
                    template: "<div>\n  <button type=\"button\" (click)=\"zoomToExtent()\">zoom to extent</button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ExtentControlComponent.ctorParameters = function () { return [
        { type: MapCache }
    ]; };
    ExtentControlComponent.propDecorators = {
        mapId: [{ type: Input }],
        extent: [{ type: Input }]
    };
    return ExtentControlComponent;
}());
export { ExtentControlComponent };
if (false) {
    /** @type {?} */
    ExtentControlComponent.prototype.mapId;
    /** @type {?} */
    ExtentControlComponent.prototype.extent;
    /** @type {?} */
    ExtentControlComponent.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZXh0ZW50L2V4dGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7SUFpQnRELGdDQUNZLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7S0FDekI7Ozs7SUFFRSw2Q0FBWTs7OztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O2dCQXBCM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSwrRkFHWDtpQkFDQTs7OztnQkFSUSxRQUFROzs7d0JBV2QsS0FBSzt5QkFHTCxLQUFLOztpQ0FoQlI7O1NBV2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZXh0ZW50LWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ6b29tVG9FeHRlbnQoKVwiPnpvb20gdG8gZXh0ZW50PC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW50Q29udHJvbENvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGV4dGVudDogTC5MYXRMbmdCb3VuZHNFeHByZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGVcbiAgKSB7IH1cblxuICBwdWJsaWMgem9vbVRvRXh0ZW50KCkge1xuICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLmZpdEJvdW5kcyh0aGlzLmV4dGVudCk7XG4gIH1cblxufVxuIl19
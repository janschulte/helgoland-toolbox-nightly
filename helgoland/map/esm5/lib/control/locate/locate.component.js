/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LocateService } from './locate.service';
var LocateControlComponent = /** @class */ (function () {
    function LocateControlComponent(locateService) {
        this.locateService = locateService;
        this.isToggled = false;
    }
    /**
     * @return {?}
     */
    LocateControlComponent.prototype.locateUser = /**
     * @return {?}
     */
    function () {
        this.isToggled = !this.isToggled;
        if (this.isToggled) {
            this.locateService.startLocate(this.mapId);
        }
        else {
            this.locateService.stopLocate(this.mapId);
        }
    };
    LocateControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-locate-control',
                    template: "<div class=\"btn-group-vertical btn-group-sm map-control\">\n  <button type=\"button\" class=\"btn btn-sm\" (click)=\"locateUser()\" [ngClass]=\"isToggled ? 'btn-primary': 'btn-light'\">\n    locate\n  </button>\n</div>\n",
                    styles: [":host i{width:11px}"]
                },] },
    ];
    /** @nocollapse */
    LocateControlComponent.ctorParameters = function () { return [
        { type: LocateService }
    ]; };
    LocateControlComponent.propDecorators = {
        mapId: [{ type: Input }]
    };
    return LocateControlComponent;
}());
export { LocateControlComponent };
if (false) {
    /** @type {?} */
    LocateControlComponent.prototype.mapId;
    /** @type {?} */
    LocateControlComponent.prototype.isToggled;
    /** @type {?} */
    LocateControlComponent.prototype.locateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7SUFtQjdDLGdDQUNjLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO3lCQUh2QixLQUFLO0tBSW5COzs7O0lBRUUsMkNBQVU7Ozs7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qzs7O2dCQTNCUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLCtOQUtiO29CQUNHLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUNsQzs7OztnQkFYUSxhQUFhOzs7d0JBY2pCLEtBQUs7O2lDQWhCVjs7U0FjYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExvY2F0ZVNlcnZpY2UgfSBmcm9tICcuL2xvY2F0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbG9jYXRlLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cC12ZXJ0aWNhbCBidG4tZ3JvdXAtc20gbWFwLWNvbnRyb2xcIj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNtXCIgKGNsaWNrKT1cImxvY2F0ZVVzZXIoKVwiIFtuZ0NsYXNzXT1cImlzVG9nZ2xlZCA/ICdidG4tcHJpbWFyeSc6ICdidG4tbGlnaHQnXCI+XG4gICAgbG9jYXRlXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCBpe3dpZHRoOjExcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTG9jYXRlQ29udHJvbENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgcHVibGljIGlzVG9nZ2xlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBsb2NhdGVTZXJ2aWNlOiBMb2NhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBsb2NhdGVVc2VyKCkge1xuICAgICAgICB0aGlzLmlzVG9nZ2xlZCA9ICF0aGlzLmlzVG9nZ2xlZDtcbiAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0ZVNlcnZpY2Uuc3RhcnRMb2NhdGUodGhpcy5tYXBJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0ZVNlcnZpY2Uuc3RvcExvY2F0ZSh0aGlzLm1hcElkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
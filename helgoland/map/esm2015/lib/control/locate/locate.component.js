/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LocateService } from './locate.service';
export class LocateControlComponent {
    /**
     * @param {?} locateService
     */
    constructor(locateService) {
        this.locateService = locateService;
        this.isToggled = false;
    }
    /**
     * @return {?}
     */
    locateUser() {
        this.isToggled = !this.isToggled;
        if (this.isToggled) {
            this.locateService.startLocate(this.mapId);
        }
        else {
            this.locateService.stopLocate(this.mapId);
        }
    }
}
LocateControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-locate-control',
                template: `<div class="btn-group-vertical btn-group-sm map-control">
  <button type="button" class="btn btn-sm" (click)="locateUser()" [ngClass]="isToggled ? 'btn-primary': 'btn-light'">
    locate
  </button>
</div>
`,
                styles: [`:host i{width:11px}`]
            },] },
];
/** @nocollapse */
LocateControlComponent.ctorParameters = () => [
    { type: LocateService }
];
LocateControlComponent.propDecorators = {
    mapId: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LocateControlComponent.prototype.mapId;
    /** @type {?} */
    LocateControlComponent.prototype.isToggled;
    /** @type {?} */
    LocateControlComponent.prototype.locateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVlqRCxNQUFNOzs7O0lBT0YsWUFDYyxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTt5QkFIdkIsS0FBSztLQUluQjs7OztJQUVFLFVBQVU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qzs7OztZQTNCUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7OztDQUtiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ2xDOzs7O1lBWFEsYUFBYTs7O29CQWNqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2NhdGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWxvY2F0ZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAtdmVydGljYWwgYnRuLWdyb3VwLXNtIG1hcC1jb250cm9sXCI+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zbVwiIChjbGljayk9XCJsb2NhdGVVc2VyKClcIiBbbmdDbGFzc109XCJpc1RvZ2dsZWQgPyAnYnRuLXByaW1hcnknOiAnYnRuLWxpZ2h0J1wiPlxuICAgIGxvY2F0ZVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgaXt3aWR0aDoxMXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIExvY2F0ZUNvbnRyb2xDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICAgIHB1YmxpYyBpc1RvZ2dsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbG9jYXRlU2VydmljZTogTG9jYXRlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbG9jYXRlVXNlcigpIHtcbiAgICAgICAgdGhpcy5pc1RvZ2dsZWQgPSAhdGhpcy5pc1RvZ2dsZWQ7XG4gICAgICAgIGlmICh0aGlzLmlzVG9nZ2xlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGVTZXJ2aWNlLnN0YXJ0TG9jYXRlKHRoaXMubWFwSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGVTZXJ2aWNlLnN0b3BMb2NhdGUodGhpcy5tYXBJZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefinedTimespanService } from '@helgoland/core';
export class TimespanButtonComponent {
    /**
     * @param {?} predefinedSrvc
     */
    constructor(predefinedSrvc) {
        this.predefinedSrvc = predefinedSrvc;
        this.onTimespanSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    clicked() {
        if (this.predefined) {
            this.onTimespanSelected.emit(this.predefinedSrvc.getInterval(/** @type {?} */ (this.predefined)));
            return;
        }
        if (this.timespanFunc) {
            this.onTimespanSelected.emit(this.timespanFunc());
            return;
        }
        this.onTimespanSelected.emit();
    }
}
TimespanButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-timespan-button',
                template: `<button type="button" class="btn" (click)="clicked()">
  {{label}}
</button>
`
            },] },
];
/** @nocollapse */
TimespanButtonComponent.ctorParameters = () => [
    { type: DefinedTimespanService }
];
TimespanButtonComponent.propDecorators = {
    predefined: [{ type: Input }],
    label: [{ type: Input }],
    timespanFunc: [{ type: Input }],
    onTimespanSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TimespanButtonComponent.prototype.predefined;
    /** @type {?} */
    TimespanButtonComponent.prototype.label;
    /** @type {?} */
    TimespanButtonComponent.prototype.timespanFunc;
    /** @type {?} */
    TimespanButtonComponent.prototype.onTimespanSelected;
    /** @type {?} */
    TimespanButtonComponent.prototype.predefinedSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvdGltZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lc3Bhbi1idXR0b24vdGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQW1CLHNCQUFzQixFQUFZLE1BQU0saUJBQWlCLENBQUM7QUFTcEYsTUFBTTs7OztJQWNKLFlBQ1ksY0FBc0M7UUFBdEMsbUJBQWMsR0FBZCxjQUFjLENBQXdCO2tDQUhFLElBQUksWUFBWSxFQUFFO0tBSWpFOzs7O0lBRUUsT0FBTztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLG1CQUFDLElBQUksQ0FBQyxVQUE2QixFQUFDLENBQUMsQ0FBQztZQUNsRyxNQUFNLENBQUM7U0FDUjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7WUFsQ2xDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7OztDQUdYO2FBQ0E7Ozs7WUFSeUIsc0JBQXNCOzs7eUJBVzdDLEtBQUs7b0JBR0wsS0FBSzsyQkFHTCxLQUFLO2lDQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmaW5lZFRpbWVzcGFuLCBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi10aW1lc3Bhbi1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cImNsaWNrZWQoKVwiPlxuICB7e2xhYmVsfX1cbjwvYnV0dG9uPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lc3BhbkJ1dHRvbkNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHByZWRlZmluZWQ6IHN0cmluZyB8IERlZmluZWRUaW1lc3BhbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZXNwYW5GdW5jOiAoKSA9PiBUaW1lc3BhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVGltZXNwYW5TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcHJlZGVmaW5lZFNydmM6IERlZmluZWRUaW1lc3BhblNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY2xpY2tlZCgpIHtcbiAgICBpZiAodGhpcy5wcmVkZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uVGltZXNwYW5TZWxlY3RlZC5lbWl0KHRoaXMucHJlZGVmaW5lZFNydmMuZ2V0SW50ZXJ2YWwodGhpcy5wcmVkZWZpbmVkIGFzIERlZmluZWRUaW1lc3BhbikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy50aW1lc3BhbkZ1bmMpIHtcbiAgICAgIHRoaXMub25UaW1lc3BhblNlbGVjdGVkLmVtaXQodGhpcy50aW1lc3BhbkZ1bmMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub25UaW1lc3BhblNlbGVjdGVkLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var TimeListSelectorComponent = /** @class */ (function () {
    function TimeListSelectorComponent() {
        this.onTimeSelected = new EventEmitter();
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    TimeListSelectorComponent.prototype.selectTime = /**
     * @param {?} timestamp
     * @return {?}
     */
    function (timestamp) {
        this.onTimeSelected.emit(timestamp);
    };
    TimeListSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-time-list-selector',
                    template: "<div class=\"selector-entry\" *ngFor=\"let time of timeList\" (click)=\"selectTime(time)\">\n  <span>{{time | date: 'medium'}}</span>\n</div>\n"
                },] },
    ];
    TimeListSelectorComponent.propDecorators = {
        timeList: [{ type: Input }],
        onTimeSelected: [{ type: Output }]
    };
    return TimeListSelectorComponent;
}());
export { TimeListSelectorComponent };
if (false) {
    /** @type {?} */
    TimeListSelectorComponent.prototype.timeList;
    /** @type {?} */
    TimeListSelectorComponent.prototype.onTimeSelected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvdGltZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lLWxpc3Qtc2VsZWN0b3IvdGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OzhCQWV2QixJQUFJLFlBQVksRUFBRTs7Ozs7O0lBRXpELDhDQUFVOzs7O2NBQUMsU0FBaUI7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7OztnQkFoQnZDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUsaUpBR1g7aUJBQ0E7OzsyQkFHRSxLQUFLO2lDQUdMLE1BQU07O29DQWRUOztTQVNhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi10aW1lLWxpc3Qtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzZWxlY3Rvci1lbnRyeVwiICpuZ0Zvcj1cImxldCB0aW1lIG9mIHRpbWVMaXN0XCIgKGNsaWNrKT1cInNlbGVjdFRpbWUodGltZSlcIj5cbiAgPHNwYW4+e3t0aW1lIHwgZGF0ZTogJ21lZGl1bSd9fTwvc3Bhbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lTGlzdFNlbGVjdG9yQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZUxpc3Q6IG51bWJlcltdO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBzZWxlY3RUaW1lKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgdGhpcy5vblRpbWVTZWxlY3RlZC5lbWl0KHRpbWVzdGFtcCk7XG4gIH1cblxufVxuIl19
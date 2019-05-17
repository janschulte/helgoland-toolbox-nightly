/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class TimeListSelectorComponent {
    constructor() {
        this.onTimeSelected = new EventEmitter();
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    selectTime(timestamp) {
        this.onTimeSelected.emit(timestamp);
    }
}
TimeListSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-time-list-selector',
                template: `<div class="selector-entry" *ngFor="let time of timeList" (click)="selectTime(time)">
  <span>{{time | date: 'medium'}}</span>
</div>
`
            },] },
];
TimeListSelectorComponent.propDecorators = {
    timeList: [{ type: Input }],
    onTimeSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TimeListSelectorComponent.prototype.timeList;
    /** @type {?} */
    TimeListSelectorComponent.prototype.onTimeSelected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvdGltZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lLWxpc3Qtc2VsZWN0b3IvdGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVN2RSxNQUFNOzs4QkFNMEMsSUFBSSxZQUFZLEVBQUU7Ozs7OztJQUV6RCxVQUFVLENBQUMsU0FBaUI7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7WUFoQnZDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7OztDQUdYO2FBQ0E7Ozt1QkFHRSxLQUFLOzZCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItdGltZS1saXN0LXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VsZWN0b3ItZW50cnlcIiAqbmdGb3I9XCJsZXQgdGltZSBvZiB0aW1lTGlzdFwiIChjbGljayk9XCJzZWxlY3RUaW1lKHRpbWUpXCI+XG4gIDxzcGFuPnt7dGltZSB8IGRhdGU6ICdtZWRpdW0nfX08L3NwYW4+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZUxpc3RTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRpbWVMaXN0OiBudW1iZXJbXTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVGltZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgc2VsZWN0VGltZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgIHRoaXMub25UaW1lU2VsZWN0ZWQuZW1pdCh0aW1lc3RhbXApO1xuICB9XG5cbn1cbiJdfQ==
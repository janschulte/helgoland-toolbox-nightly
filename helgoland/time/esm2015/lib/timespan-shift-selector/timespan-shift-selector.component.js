/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
export class TimespanShiftSelectorComponent {
    /**
     * @param {?} timeSrvc
     */
    constructor(timeSrvc) {
        this.timeSrvc = timeSrvc;
        this.onTimespanChange = new EventEmitter();
        this.onOpenTimeSettings = new EventEmitter();
    }
    /**
     * @return {?}
     */
    back() {
        this.onTimespanChange.emit(this.timeSrvc.stepBack(this.timespan));
    }
    /**
     * @return {?}
     */
    forward() {
        this.onTimespanChange.emit(this.timeSrvc.stepForward(this.timespan));
    }
    /**
     * @return {?}
     */
    open() {
        this.onOpenTimeSettings.emit();
    }
}
TimespanShiftSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-timespan-shift-selector',
                template: `<div>
  <button type="button" (click)="back()"> &lt; </button>
  <button type="button" (click)="open()">
    {{timespan.from | date : 'medium'}} &nbsp;&ndash;&nbsp; {{timespan.to | date : 'medium'}}
  </button>
  <button type="button" (click)="forward()"> &gt; </button>
</div>
`
            },] },
];
/** @nocollapse */
TimespanShiftSelectorComponent.ctorParameters = () => [
    { type: Time }
];
TimespanShiftSelectorComponent.propDecorators = {
    timespan: [{ type: Input }],
    onTimespanChange: [{ type: Output }],
    onOpenTimeSettings: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TimespanShiftSelectorComponent.prototype.timespan;
    /** @type {?} */
    TimespanShiftSelectorComponent.prototype.onTimespanChange;
    /** @type {?} */
    TimespanShiftSelectorComponent.prototype.onOpenTimeSettings;
    /** @type {?} */
    TimespanShiftSelectorComponent.prototype.timeSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNwYW4tc2hpZnQtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC90aW1lLyIsInNvdXJjZXMiOlsibGliL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYWpELE1BQU07Ozs7SUFXSixZQUNZLFFBQWM7UUFBZCxhQUFRLEdBQVIsUUFBUSxDQUFNO2dDQU53QixJQUFJLFlBQVksRUFBWTtrQ0FHOUIsSUFBSSxZQUFZLEVBQUU7S0FJN0Q7Ozs7SUFFRSxJQUFJO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHN0QsT0FBTztRQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBR2hFLElBQUk7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7WUFuQ2xDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Q0FPWDthQUNBOzs7O1lBWlEsSUFBSTs7O3VCQWVWLEtBQUs7K0JBR0wsTUFBTTtpQ0FHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWUsIFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXRpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiYmFjaygpXCI+ICZsdDsgPC9idXR0b24+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvcGVuKClcIj5cbiAgICB7e3RpbWVzcGFuLmZyb20gfCBkYXRlIDogJ21lZGl1bSd9fSAmbmJzcDsmbmRhc2g7Jm5ic3A7IHt7dGltZXNwYW4udG8gfCBkYXRlIDogJ21lZGl1bSd9fVxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImZvcndhcmQoKVwiPiAmZ3Q7IDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVzcGFuU2hpZnRTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRpbWVzcGFuOiBUaW1lc3BhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVzcGFuPigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25PcGVuVGltZVNldHRpbmdzOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lXG4gICkgeyB9XG5cbiAgcHVibGljIGJhY2soKSB7XG4gICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlLmVtaXQodGhpcy50aW1lU3J2Yy5zdGVwQmFjayh0aGlzLnRpbWVzcGFuKSk7XG4gIH1cblxuICBwdWJsaWMgZm9yd2FyZCgpIHtcbiAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2UuZW1pdCh0aGlzLnRpbWVTcnZjLnN0ZXBGb3J3YXJkKHRoaXMudGltZXNwYW4pKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKCkge1xuICAgIHRoaXMub25PcGVuVGltZVNldHRpbmdzLmVtaXQoKTtcbiAgfVxufVxuIl19
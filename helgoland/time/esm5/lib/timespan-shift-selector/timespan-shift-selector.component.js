/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
var TimespanShiftSelectorComponent = /** @class */ (function () {
    function TimespanShiftSelectorComponent(timeSrvc) {
        this.timeSrvc = timeSrvc;
        this.onTimespanChange = new EventEmitter();
        this.onOpenTimeSettings = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TimespanShiftSelectorComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.onTimespanChange.emit(this.timeSrvc.stepBack(this.timespan));
    };
    /**
     * @return {?}
     */
    TimespanShiftSelectorComponent.prototype.forward = /**
     * @return {?}
     */
    function () {
        this.onTimespanChange.emit(this.timeSrvc.stepForward(this.timespan));
    };
    /**
     * @return {?}
     */
    TimespanShiftSelectorComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.onOpenTimeSettings.emit();
    };
    TimespanShiftSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-timespan-shift-selector',
                    template: "<div>\n  <button type=\"button\" (click)=\"back()\"> &lt; </button>\n  <button type=\"button\" (click)=\"open()\">\n    {{timespan.from | date : 'medium'}} &nbsp;&ndash;&nbsp; {{timespan.to | date : 'medium'}}\n  </button>\n  <button type=\"button\" (click)=\"forward()\"> &gt; </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    TimespanShiftSelectorComponent.ctorParameters = function () { return [
        { type: Time }
    ]; };
    TimespanShiftSelectorComponent.propDecorators = {
        timespan: [{ type: Input }],
        onTimespanChange: [{ type: Output }],
        onOpenTimeSettings: [{ type: Output }]
    };
    return TimespanShiftSelectorComponent;
}());
export { TimespanShiftSelectorComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNwYW4tc2hpZnQtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC90aW1lLyIsInNvdXJjZXMiOlsibGliL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQXdCL0Msd0NBQ1ksUUFBYztRQUFkLGFBQVEsR0FBUixRQUFRLENBQU07Z0NBTndCLElBQUksWUFBWSxFQUFZO2tDQUc5QixJQUFJLFlBQVksRUFBRTtLQUk3RDs7OztJQUVFLDZDQUFJOzs7O1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHN0QsZ0RBQU87Ozs7UUFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUdoRSw2Q0FBSTs7OztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQW5DbEMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSwyU0FPWDtpQkFDQTs7OztnQkFaUSxJQUFJOzs7MkJBZVYsS0FBSzttQ0FHTCxNQUFNO3FDQUdOLE1BQU07O3lDQXRCVDs7U0FjYSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZSwgVGltZXNwYW4gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItdGltZXNwYW4tc2hpZnQtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIj4gJmx0OyA8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxuICAgIHt7dGltZXNwYW4uZnJvbSB8IGRhdGUgOiAnbWVkaXVtJ319ICZuYnNwOyZuZGFzaDsmbmJzcDsge3t0aW1lc3Bhbi50byB8IGRhdGUgOiAnbWVkaXVtJ319XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZm9yd2FyZCgpXCI+ICZndDsgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNwYW5TaGlmdFNlbGVjdG9yQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZXNwYW4+KCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbk9wZW5UaW1lU2V0dGluZ3M6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWVcbiAgKSB7IH1cblxuICBwdWJsaWMgYmFjaygpIHtcbiAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2UuZW1pdCh0aGlzLnRpbWVTcnZjLnN0ZXBCYWNrKHRoaXMudGltZXNwYW4pKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3J3YXJkKCkge1xuICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZS5lbWl0KHRoaXMudGltZVNydmMuc3RlcEZvcndhcmQodGhpcy50aW1lc3BhbikpO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKSB7XG4gICAgdGhpcy5vbk9wZW5UaW1lU2V0dGluZ3MuZW1pdCgpO1xuICB9XG59XG4iXX0=
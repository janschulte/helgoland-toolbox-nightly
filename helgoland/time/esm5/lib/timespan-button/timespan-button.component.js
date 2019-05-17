/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefinedTimespanService } from '@helgoland/core';
var TimespanButtonComponent = /** @class */ (function () {
    function TimespanButtonComponent(predefinedSrvc) {
        this.predefinedSrvc = predefinedSrvc;
        this.onTimespanSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TimespanButtonComponent.prototype.clicked = /**
     * @return {?}
     */
    function () {
        if (this.predefined) {
            this.onTimespanSelected.emit(this.predefinedSrvc.getInterval(/** @type {?} */ (this.predefined)));
            return;
        }
        if (this.timespanFunc) {
            this.onTimespanSelected.emit(this.timespanFunc());
            return;
        }
        this.onTimespanSelected.emit();
    };
    TimespanButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-timespan-button',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"clicked()\">\n  {{label}}\n</button>\n"
                },] },
    ];
    /** @nocollapse */
    TimespanButtonComponent.ctorParameters = function () { return [
        { type: DefinedTimespanService }
    ]; };
    TimespanButtonComponent.propDecorators = {
        predefined: [{ type: Input }],
        label: [{ type: Input }],
        timespanFunc: [{ type: Input }],
        onTimespanSelected: [{ type: Output }]
    };
    return TimespanButtonComponent;
}());
export { TimespanButtonComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvdGltZS8iLCJzb3VyY2VzIjpbImxpYi90aW1lc3Bhbi1idXR0b24vdGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQW1CLHNCQUFzQixFQUFZLE1BQU0saUJBQWlCLENBQUM7O0lBdUJsRixpQ0FDWSxjQUFzQztRQUF0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBd0I7a0NBSEUsSUFBSSxZQUFZLEVBQUU7S0FJakU7Ozs7SUFFRSx5Q0FBTzs7OztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLG1CQUFDLElBQUksQ0FBQyxVQUE2QixFQUFDLENBQUMsQ0FBQztZQUNsRyxNQUFNLENBQUM7U0FDUjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7OztnQkFsQ2xDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsd0ZBR1g7aUJBQ0E7Ozs7Z0JBUnlCLHNCQUFzQjs7OzZCQVc3QyxLQUFLO3dCQUdMLEtBQUs7K0JBR0wsS0FBSztxQ0FHTCxNQUFNOztrQ0FyQlQ7O1NBVWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlZmluZWRUaW1lc3BhbiwgRGVmaW5lZFRpbWVzcGFuU2VydmljZSwgVGltZXNwYW4gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItdGltZXNwYW4tYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJjbGlja2VkKClcIj5cbiAge3tsYWJlbH19XG48L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNwYW5CdXR0b25Db21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwcmVkZWZpbmVkOiBzdHJpbmcgfCBEZWZpbmVkVGltZXNwYW47XG5cbiAgQElucHV0KClcbiAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRpbWVzcGFuRnVuYzogKCkgPT4gVGltZXNwYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRpbWVzcGFuU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHByZWRlZmluZWRTcnZjOiBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNsaWNrZWQoKSB7XG4gICAgaWYgKHRoaXMucHJlZGVmaW5lZCkge1xuICAgICAgdGhpcy5vblRpbWVzcGFuU2VsZWN0ZWQuZW1pdCh0aGlzLnByZWRlZmluZWRTcnZjLmdldEludGVydmFsKHRoaXMucHJlZGVmaW5lZCBhcyBEZWZpbmVkVGltZXNwYW4pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudGltZXNwYW5GdW5jKSB7XG4gICAgICB0aGlzLm9uVGltZXNwYW5TZWxlY3RlZC5lbWl0KHRoaXMudGltZXNwYW5GdW5jKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9uVGltZXNwYW5TZWxlY3RlZC5lbWl0KCk7XG4gIH1cblxufVxuIl19
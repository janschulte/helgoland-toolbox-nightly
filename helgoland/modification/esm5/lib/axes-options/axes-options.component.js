/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
var AxesOptionsComponent = /** @class */ (function () {
    function AxesOptionsComponent() {
        this.onChangeYAxesVisibility = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AxesOptionsComponent.prototype.changeYAxesVisibility = /**
     * @return {?}
     */
    function () {
        this.onChangeYAxesVisibility.emit();
    };
    AxesOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-axes-options',
                    template: "<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-light\" (click)=\"changeYAxesVisibility()\">\n    <span class=\"fa fa-bar-chart\"></span>\n  </button>\n</div>\n"
                },] },
    ];
    AxesOptionsComponent.propDecorators = {
        onChangeYAxesVisibility: [{ type: Output }]
    };
    return AxesOptionsComponent;
}());
export { AxesOptionsComponent };
if (false) {
    /** @type {?} */
    AxesOptionsComponent.prototype.onChangeYAxesVisibility;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhlcy1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2F4ZXMtb3B0aW9ucy9heGVzLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBUyxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt1Q0FjZCxJQUFJLFlBQVksRUFBRTs7Ozs7SUFFaEUsb0RBQXFCOzs7O1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQWYzQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLHVMQUtiO2lCQUNBOzs7MENBR0ksTUFBTTs7K0JBYlg7O1NBV2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItYXhlcy1vcHRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCIgKGNsaWNrKT1cImNoYW5nZVlBeGVzVmlzaWJpbGl0eSgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1iYXItY2hhcnRcIj48L3NwYW4+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEF4ZXNPcHRpb25zQ29tcG9uZW50IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNoYW5nZVlBeGVzVmlzaWJpbGl0eTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGNoYW5nZVlBeGVzVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVlBeGVzVmlzaWJpbGl0eS5lbWl0KCk7XG4gICAgfVxufVxuIl19
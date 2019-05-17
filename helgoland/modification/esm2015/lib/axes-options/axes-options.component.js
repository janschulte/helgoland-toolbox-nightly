/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
export class AxesOptionsComponent {
    constructor() {
        this.onChangeYAxesVisibility = new EventEmitter();
    }
    /**
     * @return {?}
     */
    changeYAxesVisibility() {
        this.onChangeYAxesVisibility.emit();
    }
}
AxesOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-axes-options',
                template: `<div class="btn-group">
  <button type="button" class="btn btn-light" (click)="changeYAxesVisibility()">
    <span class="fa fa-bar-chart"></span>
  </button>
</div>
`
            },] },
];
AxesOptionsComponent.propDecorators = {
    onChangeYAxesVisibility: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AxesOptionsComponent.prototype.onChangeYAxesVisibility;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhlcy1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2F4ZXMtb3B0aW9ucy9heGVzLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBUyxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFXdkUsTUFBTTs7dUNBR21ELElBQUksWUFBWSxFQUFFOzs7OztJQUVoRSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDOzs7O1lBZjNDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7O0NBS2I7YUFDQTs7O3NDQUdJLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1heGVzLW9wdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwiY2hhbmdlWUF4ZXNWaXNpYmlsaXR5KClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWJhci1jaGFydFwiPjwvc3Bhbj5cbiAgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQXhlc09wdGlvbnNDb21wb25lbnQge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ2hhbmdlWUF4ZXNWaXNpYmlsaXR5OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgY2hhbmdlWUF4ZXNWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlWUF4ZXNWaXNpYmlsaXR5LmVtaXQoKTtcbiAgICB9XG59XG4iXX0=
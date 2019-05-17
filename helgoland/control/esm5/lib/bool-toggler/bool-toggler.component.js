/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var BoolTogglerComponent = /** @class */ (function () {
    function BoolTogglerComponent() {
        this.onToggled = new EventEmitter();
    }
    /**
     * @return {?}
     */
    BoolTogglerComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.onToggled.emit(!this.value);
    };
    BoolTogglerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-bool-toggler',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"value ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                },] },
    ];
    BoolTogglerComponent.propDecorators = {
        value: [{ type: Input }],
        icon: [{ type: Input }],
        tooltip: [{ type: Input }],
        onToggled: [{ type: Output }]
    };
    return BoolTogglerComponent;
}());
export { BoolTogglerComponent };
if (false) {
    /** @type {?} */
    BoolTogglerComponent.prototype.value;
    /** @type {?} */
    BoolTogglerComponent.prototype.icon;
    /** @type {?} */
    BoolTogglerComponent.prototype.tooltip;
    /** @type {?} */
    BoolTogglerComponent.prototype.onToggled;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbC10b2dnbGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29udHJvbC8iLCJzb3VyY2VzIjpbImxpYi9ib29sLXRvZ2dsZXIvYm9vbC10b2dnbGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O3lCQW9CekIsSUFBSSxZQUFZLEVBQUU7Ozs7O0lBRXJELHFDQUFNOzs7O1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7OztnQkFyQnhDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsMk1BRUo7aUJBQ1Q7Ozt3QkFHSSxLQUFLO3VCQUdMLEtBQUs7MEJBR0wsS0FBSzs0QkFHTCxNQUFNOzsrQkFuQlg7O1NBUWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItYm9vbC10b2dnbGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCIgW25nQ2xhc3NdPVwidmFsdWUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1saWdodCdcIiB0aXRsZT1cInt7dG9vbHRpcH19XCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS17e2ljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgQm9vbFRvZ2dsZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdmFsdWU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ub2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlZC5lbWl0KCF0aGlzLnZhbHVlKTtcbiAgICB9XG59XG4iXX0=
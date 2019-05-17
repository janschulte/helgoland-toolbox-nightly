/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var StringTogglerComponent = /** @class */ (function () {
    function StringTogglerComponent() {
        this.onToggled = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    StringTogglerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["value"]) {
            this.isToggled = this.option === this.value;
        }
    };
    /**
     * @return {?}
     */
    StringTogglerComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.onToggled.emit(this.option);
    };
    StringTogglerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-string-toggler',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"isToggled ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                },] },
    ];
    StringTogglerComponent.propDecorators = {
        value: [{ type: Input }],
        option: [{ type: Input }],
        icon: [{ type: Input }],
        tooltip: [{ type: Input }],
        onToggled: [{ type: Output }]
    };
    return StringTogglerComponent;
}());
export { StringTogglerComponent };
if (false) {
    /** @type {?} */
    StringTogglerComponent.prototype.value;
    /** @type {?} */
    StringTogglerComponent.prototype.option;
    /** @type {?} */
    StringTogglerComponent.prototype.icon;
    /** @type {?} */
    StringTogglerComponent.prototype.tooltip;
    /** @type {?} */
    StringTogglerComponent.prototype.onToggled;
    /** @type {?} */
    StringTogglerComponent.prototype.isToggled;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXRvZ2dsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb250cm9sLyIsInNvdXJjZXMiOlsibGliL3N0cmluZy10b2dnbGVyL3N0cmluZy10b2dnbGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt5QkF1QnBELElBQUksWUFBWSxFQUFFOzs7Ozs7SUFJcEQsNENBQVc7Ozs7Y0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVEsQ0FBQztZQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMvQzs7Ozs7SUFHRSx1Q0FBTTs7OztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O2dCQWhDeEMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSwrTUFFSjtpQkFDVDs7O3dCQUdJLEtBQUs7eUJBR0wsS0FBSzt1QkFHTCxLQUFLOzBCQUdMLEtBQUs7NEJBR0wsTUFBTTs7aUNBdEJYOztTQVFhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItc3RyaW5nLXRvZ2dsZXInLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwidG9nZ2xlKClcIiBbbmdDbGFzc109XCJpc1RvZ2dsZWQgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1saWdodCdcIiB0aXRsZT1cInt7dG9vbHRpcH19XCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS17e2ljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgU3RyaW5nVG9nZ2xlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3B0aW9uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ub2dnbGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc1RvZ2dsZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pc1RvZ2dsZWQgPSB0aGlzLm9wdGlvbiA9PT0gdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMub25Ub2dnbGVkLmVtaXQodGhpcy5vcHRpb24pO1xuICAgIH1cbn1cbiJdfQ==
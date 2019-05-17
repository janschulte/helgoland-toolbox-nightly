import { Component, EventEmitter, Output, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { ColorPickerModule } from 'ngx-color-picker';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ColorSelectorComponent = /** @class */ (function () {
    function ColorSelectorComponent() {
        this.onColorChange = new EventEmitter();
    }
    ColorSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-color-selector',
                    template: "<div class=\"colorpicker\">\n  <span [(colorPicker)]=\"color\" [cpDialogDisplay]=\"'inline'\" [cpCancelButton]=\"true\" [cpCancelButtonText]=\"'Reset'\" [cpPresetColors]=\"colorList\"\n    [cpToggle]=\"true\" [cpPresetLabel]=\"'Presets:'\" (colorPickerChange)=\"onColorChange.emit($event)\">\n  </span>\n</div>"
                },] },
    ];
    ColorSelectorComponent.propDecorators = {
        color: [{ type: Input }],
        colorList: [{ type: Input }],
        onColorChange: [{ type: Output }]
    };
    return ColorSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DragOptionsComponent = /** @class */ (function () {
    function DragOptionsComponent() {
        this.onTogglePanZoom = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DragOptionsComponent.prototype.togglePanZoom = /**
     * @return {?}
     */
    function () {
        this.onTogglePanZoom.emit();
    };
    DragOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-drag-options',
                    template: "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"togglePanZoom()\">\n        <span class=\"fa fa-cog\"></span>\n    </button>\n</div>\n"
                },] },
    ];
    DragOptionsComponent.propDecorators = {
        onTogglePanZoom: [{ type: Output }]
    };
    return DragOptionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MinMaxRangeComponent = /** @class */ (function () {
    function MinMaxRangeComponent() {
        this.onRangeChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MinMaxRangeComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["range"] && this.range) {
            this.rangeMin = this.range.min;
            this.rangeMax = this.range.max;
        }
    };
    /**
     * @return {?}
     */
    MinMaxRangeComponent.prototype.setYaxisRange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var min = (this.rangeMin === null || this.rangeMin === undefined) ? 0 : this.rangeMin;
        /** @type {?} */
        var max = (this.rangeMax === null || this.rangeMax === undefined) ? 0 : this.rangeMax;
        this.onRangeChange.emit({ min: min, max: max });
    };
    /**
     * @return {?}
     */
    MinMaxRangeComponent.prototype.resetYaxisRange = /**
     * @return {?}
     */
    function () {
        this.rangeMin = null;
        this.rangeMax = null;
        this.onRangeChange.emit();
    };
    MinMaxRangeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-min-max-range',
                    template: "<input type=\"number\" [(ngModel)]=\"rangeMin\" (ngModelChange)=\"setYaxisRange()\">\n<input type=\"number\" [(ngModel)]=\"rangeMax\" (ngModelChange)=\"setYaxisRange()\">\n<button (click)=\"resetYaxisRange()\">reset</button>",
                    styles: [""]
                },] },
    ];
    MinMaxRangeComponent.propDecorators = {
        range: [{ type: Input }],
        onRangeChange: [{ type: Output }]
    };
    return MinMaxRangeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandModificationModule = /** @class */ (function () {
    function HelgolandModificationModule() {
    }
    HelgolandModificationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ColorSelectorComponent,
                        AxesOptionsComponent,
                        DragOptionsComponent,
                        MinMaxRangeComponent
                    ],
                    imports: [
                        HelgolandCoreModule,
                        FormsModule,
                        ColorPickerModule
                    ],
                    exports: [
                        ColorSelectorComponent,
                        AxesOptionsComponent,
                        DragOptionsComponent,
                        MinMaxRangeComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandModificationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandModificationModule, ColorSelectorComponent, AxesOptionsComponent, DragOptionsComponent, MinMaxRangeComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLW1vZGlmaWNhdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vbGliL2F4ZXMtb3B0aW9ucy9heGVzLW9wdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi9saWIvY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi9saWIvZHJhZy1vcHRpb25zL2RyYWctb3B0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uL2xpYi9taW4tbWF4LXJhbmdlL21pbi1tYXgtcmFuZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi9saWIvbW9kaWZpY2F0aW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1heGVzLW9wdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwiY2hhbmdlWUF4ZXNWaXNpYmlsaXR5KClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWJhci1jaGFydFwiPjwvc3Bhbj5cbiAgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQXhlc09wdGlvbnNDb21wb25lbnQge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ2hhbmdlWUF4ZXNWaXNpYmlsaXR5OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgY2hhbmdlWUF4ZXNWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlWUF4ZXNWaXNpYmlsaXR5LmVtaXQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1jb2xvci1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXJcIj5cbiAgPHNwYW4gWyhjb2xvclBpY2tlcildPVwiY29sb3JcIiBbY3BEaWFsb2dEaXNwbGF5XT1cIidpbmxpbmUnXCIgW2NwQ2FuY2VsQnV0dG9uXT1cInRydWVcIiBbY3BDYW5jZWxCdXR0b25UZXh0XT1cIidSZXNldCdcIiBbY3BQcmVzZXRDb2xvcnNdPVwiY29sb3JMaXN0XCJcbiAgICBbY3BUb2dnbGVdPVwidHJ1ZVwiIFtjcFByZXNldExhYmVsXT1cIidQcmVzZXRzOidcIiAoY29sb3JQaWNrZXJDaGFuZ2UpPVwib25Db2xvckNoYW5nZS5lbWl0KCRldmVudClcIj5cbiAgPC9zcGFuPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBDb2xvclNlbGVjdG9yQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb2xvckxpc3Q6IHN0cmluZ1tdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29sb3JDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZHJhZy1vcHRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwidG9nZ2xlUGFuWm9vbSgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERyYWdPcHRpb25zQ29tcG9uZW50IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRvZ2dsZVBhblpvb206IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0b2dnbGVQYW5ab29tKCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlUGFuWm9vbS5lbWl0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWluTWF4UmFuZ2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItbWluLW1heC1yYW5nZScsXG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBbKG5nTW9kZWwpXT1cInJhbmdlTWluXCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0WWF4aXNSYW5nZSgpXCI+XG48aW5wdXQgdHlwZT1cIm51bWJlclwiIFsobmdNb2RlbCldPVwicmFuZ2VNYXhcIiAobmdNb2RlbENoYW5nZSk9XCJzZXRZYXhpc1JhbmdlKClcIj5cbjxidXR0b24gKGNsaWNrKT1cInJlc2V0WWF4aXNSYW5nZSgpXCI+cmVzZXQ8L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWluTWF4UmFuZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIHB1YmxpYyByYW5nZU1pbjogbnVtYmVyO1xuICBwdWJsaWMgcmFuZ2VNYXg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcmFuZ2U6IE1pbk1heFJhbmdlO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25SYW5nZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1pbk1heFJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnJhbmdlICYmIHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMucmFuZ2VNaW4gPSB0aGlzLnJhbmdlLm1pbjtcbiAgICAgIHRoaXMucmFuZ2VNYXggPSB0aGlzLnJhbmdlLm1heDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0WWF4aXNSYW5nZSgpIHtcbiAgICBjb25zdCBtaW4gPSAodGhpcy5yYW5nZU1pbiA9PT0gbnVsbCB8fCB0aGlzLnJhbmdlTWluID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucmFuZ2VNaW47XG4gICAgY29uc3QgbWF4ID0gKHRoaXMucmFuZ2VNYXggPT09IG51bGwgfHwgdGhpcy5yYW5nZU1heCA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnJhbmdlTWF4O1xuICAgIHRoaXMub25SYW5nZUNoYW5nZS5lbWl0KHsgbWluLCBtYXggfSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRZYXhpc1JhbmdlKCkge1xuICAgIHRoaXMucmFuZ2VNaW4gPSBudWxsO1xuICAgIHRoaXMucmFuZ2VNYXggPSBudWxsO1xuICAgIHRoaXMub25SYW5nZUNoYW5nZS5lbWl0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xuXG5pbXBvcnQgeyBBeGVzT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vYXhlcy1vcHRpb25zL2F4ZXMtb3B0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sb3JTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IERyYWdPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9kcmFnLW9wdGlvbnMvZHJhZy1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNaW5NYXhSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4vbWluLW1heC1yYW5nZS9taW4tbWF4LXJhbmdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENvbG9yU2VsZWN0b3JDb21wb25lbnQsXG4gICAgQXhlc09wdGlvbnNDb21wb25lbnQsXG4gICAgRHJhZ09wdGlvbnNDb21wb25lbnQsXG4gICAgTWluTWF4UmFuZ2VDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEhlbGdvbGFuZENvcmVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQ29sb3JQaWNrZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbG9yU2VsZWN0b3JDb21wb25lbnQsXG4gICAgQXhlc09wdGlvbnNDb21wb25lbnQsXG4gICAgRHJhZ09wdGlvbnNDb21wb25lbnQsXG4gICAgTWluTWF4UmFuZ2VDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTW9kaWZpY2F0aW9uTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFB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
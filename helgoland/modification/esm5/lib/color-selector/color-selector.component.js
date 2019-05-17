/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export { ColorSelectorComponent };
if (false) {
    /** @type {?} */
    ColorSelectorComponent.prototype.color;
    /** @type {?} */
    ColorSelectorComponent.prototype.colorList;
    /** @type {?} */
    ColorSelectorComponent.prototype.onColorChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vIiwic291cmNlcyI6WyJsaWIvY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7NkJBbUJ0QixJQUFJLFlBQVksRUFBVTs7O2dCQWpCMUUsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSx3VEFJUDtpQkFDTjs7O3dCQUdJLEtBQUs7NEJBR0wsS0FBSztnQ0FHTCxNQUFNOztpQ0FsQlg7O1NBVWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItY29sb3Itc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyXCI+XG4gIDxzcGFuIFsoY29sb3JQaWNrZXIpXT1cImNvbG9yXCIgW2NwRGlhbG9nRGlzcGxheV09XCInaW5saW5lJ1wiIFtjcENhbmNlbEJ1dHRvbl09XCJ0cnVlXCIgW2NwQ2FuY2VsQnV0dG9uVGV4dF09XCInUmVzZXQnXCIgW2NwUHJlc2V0Q29sb3JzXT1cImNvbG9yTGlzdFwiXG4gICAgW2NwVG9nZ2xlXT1cInRydWVcIiBbY3BQcmVzZXRMYWJlbF09XCInUHJlc2V0czonXCIgKGNvbG9yUGlja2VyQ2hhbmdlKT1cIm9uQ29sb3JDaGFuZ2UuZW1pdCgkZXZlbnQpXCI+XG4gIDwvc3Bhbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29sb3JMaXN0OiBzdHJpbmdbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbG9yQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG59XG4iXX0=
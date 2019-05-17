/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class ColorSelectorComponent {
    constructor() {
        this.onColorChange = new EventEmitter();
    }
}
ColorSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-color-selector',
                template: `<div class="colorpicker">
  <span [(colorPicker)]="color" [cpDialogDisplay]="'inline'" [cpCancelButton]="true" [cpCancelButtonText]="'Reset'" [cpPresetColors]="colorList"
    [cpToggle]="true" [cpPresetLabel]="'Presets:'" (colorPickerChange)="onColorChange.emit($event)">
  </span>
</div>`
            },] },
];
ColorSelectorComponent.propDecorators = {
    color: [{ type: Input }],
    colorList: [{ type: Input }],
    onColorChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ColorSelectorComponent.prototype.color;
    /** @type {?} */
    ColorSelectorComponent.prototype.colorList;
    /** @type {?} */
    ColorSelectorComponent.prototype.onColorChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vIiwic291cmNlcyI6WyJsaWIvY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBVXZFLE1BQU07OzZCQVMyQyxJQUFJLFlBQVksRUFBVTs7OztZQWpCMUUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7OztPQUlQO2FBQ047OztvQkFHSSxLQUFLO3dCQUdMLEtBQUs7NEJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWNvbG9yLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlclwiPlxuICA8c3BhbiBbKGNvbG9yUGlja2VyKV09XCJjb2xvclwiIFtjcERpYWxvZ0Rpc3BsYXldPVwiJ2lubGluZSdcIiBbY3BDYW5jZWxCdXR0b25dPVwidHJ1ZVwiIFtjcENhbmNlbEJ1dHRvblRleHRdPVwiJ1Jlc2V0J1wiIFtjcFByZXNldENvbG9yc109XCJjb2xvckxpc3RcIlxuICAgIFtjcFRvZ2dsZV09XCJ0cnVlXCIgW2NwUHJlc2V0TGFiZWxdPVwiJ1ByZXNldHM6J1wiIChjb2xvclBpY2tlckNoYW5nZSk9XCJvbkNvbG9yQ2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxuICA8L3NwYW4+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yU2VsZWN0b3JDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbG9yTGlzdDogc3RyaW5nW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Db2xvckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxufVxuIl19
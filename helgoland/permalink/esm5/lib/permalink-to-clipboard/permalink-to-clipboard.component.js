/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PermalinkToClipboardComponent = /** @class */ (function () {
    function PermalinkToClipboardComponent() {
        this.onTriggered = new EventEmitter();
    }
    PermalinkToClipboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-permalink-to-clipboard',
                    template: "<button type=\"button\" ngxClipboard [cbContent]=\"url\" (click)=\"onTriggered.emit()\">copy to clipboard</button>\n"
                },] },
    ];
    PermalinkToClipboardComponent.propDecorators = {
        url: [{ type: Input }],
        onTriggered: [{ type: Output }]
    };
    return PermalinkToClipboardComponent;
}());
export { PermalinkToClipboardComponent };
if (false) {
    /** @type {?} */
    PermalinkToClipboardComponent.prototype.url;
    /** @type {?} */
    PermalinkToClipboardComponent.prototype.onTriggered;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLXRvLWNsaXBib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay8iLCJzb3VyY2VzIjpbImxpYi9wZXJtYWxpbmstdG8tY2xpcGJvYXJkL3Blcm1hbGluay10by1jbGlwYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7MkJBYTVCLElBQUksWUFBWSxFQUFROzs7Z0JBWGxFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUUsc0hBQ1g7aUJBQ0E7OztzQkFHRSxLQUFLOzhCQUdMLE1BQU07O3dDQVpUOztTQU9hLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstdG8tY2xpcGJvYXJkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuZ3hDbGlwYm9hcmQgW2NiQ29udGVudF09XCJ1cmxcIiAoY2xpY2spPVwib25UcmlnZ2VyZWQuZW1pdCgpXCI+Y29weSB0byBjbGlwYm9hcmQ8L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbn1cbiJdfQ==
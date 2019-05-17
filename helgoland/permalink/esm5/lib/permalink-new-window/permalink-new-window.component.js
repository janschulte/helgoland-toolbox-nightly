/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PermalinkNewWindowComponent = /** @class */ (function () {
    function PermalinkNewWindowComponent() {
        this.onTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PermalinkNewWindowComponent.prototype.openInNewWindow = /**
     * @return {?}
     */
    function () {
        window.open(this.url, '_blank');
        this.onTriggered.emit();
    };
    PermalinkNewWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-permalink-new-window',
                    template: "<button type=\"button\" (click)=\"openInNewWindow()\">open in new window</button>"
                },] },
    ];
    PermalinkNewWindowComponent.propDecorators = {
        url: [{ type: Input }],
        onTriggered: [{ type: Output }]
    };
    return PermalinkNewWindowComponent;
}());
export { PermalinkNewWindowComponent };
if (false) {
    /** @type {?} */
    PermalinkNewWindowComponent.prototype.url;
    /** @type {?} */
    PermalinkNewWindowComponent.prototype.onTriggered;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLW5ldy13aW5kb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvIiwic291cmNlcyI6WyJsaWIvcGVybWFsaW5rLW5ldy13aW5kb3cvcGVybWFsaW5rLW5ldy13aW5kb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7MkJBWTVCLElBQUksWUFBWSxFQUFROzs7OztJQUUxRCxxREFBZTs7OztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQWQzQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLG1GQUErRTtpQkFDMUY7OztzQkFHRSxLQUFLOzhCQUdMLE1BQU07O3NDQVhUOztTQU1hLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstbmV3LXdpbmRvdycsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Jbk5ld1dpbmRvdygpXCI+b3BlbiBpbiBuZXcgd2luZG93PC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtYWxpbmtOZXdXaW5kb3dDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG9wZW5Jbk5ld1dpbmRvdygpIHtcbiAgICB3aW5kb3cub3Blbih0aGlzLnVybCwgJ19ibGFuaycpO1xuICAgIHRoaXMub25UcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HostListener } from '@angular/core';
/**
 * @abstract
 */
export class ResizableComponent {
    /**
     * @param {?} event
     * @return {?}
     */
    onWindowResize(event) {
        this.onResize();
    }
}
ResizableComponent.propDecorators = {
    onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    ResizableComponent.prototype.onResize = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXphYmxlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2ludGVybmFsL1Jlc2l6YWJsZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUU3QyxNQUFNOzs7OztJQUdLLGNBQWMsQ0FBQyxLQUFZO1FBQzlCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7OzZCQUhBLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc2l6YWJsZUNvbXBvbmVudCB7XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgICBwdWJsaWMgb25XaW5kb3dSZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25SZXNpemUoKTogdm9pZDtcblxufVxuIl19
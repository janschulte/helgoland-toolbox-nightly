/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HostListener } from '@angular/core';
/**
 * @abstract
 */
var ResizableComponent = /** @class */ (function () {
    function ResizableComponent() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ResizableComponent.prototype.onWindowResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onResize();
    };
    ResizableComponent.propDecorators = {
        onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ResizableComponent;
}());
export { ResizableComponent };
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    ResizableComponent.prototype.onResize = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXphYmxlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2ludGVybmFsL1Jlc2l6YWJsZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7SUFLbEMsMkNBQWM7Ozs7SUFEckIsVUFDc0IsS0FBWTtRQUM5QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7O2lDQUhBLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7OzZCQUo3Qzs7U0FFc0Isa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNpemFibGVDb21wb25lbnQge1xuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uV2luZG93UmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uUmVzaXplKCk6IHZvaWQ7XG5cbn1cbiJdfQ==
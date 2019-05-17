/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
export class DragOptionsComponent {
    constructor() {
        this.onTogglePanZoom = new EventEmitter();
    }
    /**
     * @return {?}
     */
    togglePanZoom() {
        this.onTogglePanZoom.emit();
    }
}
DragOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-drag-options',
                template: `<div class="btn-group">
    <button type="button" class="btn btn-light" (click)="togglePanZoom()">
        <span class="fa fa-cog"></span>
    </button>
</div>
`
            },] },
];
DragOptionsComponent.propDecorators = {
    onTogglePanZoom: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DragOptionsComponent.prototype.onTogglePanZoom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2RyYWctb3B0aW9ucy9kcmFnLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFXaEUsTUFBTTs7K0JBRzJDLElBQUksWUFBWSxFQUFFOzs7OztJQUV4RCxhQUFhO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7WUFmbkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Q0FLYjthQUNBOzs7OEJBR0ksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZHJhZy1vcHRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwidG9nZ2xlUGFuWm9vbSgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERyYWdPcHRpb25zQ29tcG9uZW50IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRvZ2dsZVBhblpvb206IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0b2dnbGVQYW5ab29tKCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlUGFuWm9vbS5lbWl0KCk7XG4gICAgfVxufVxuIl19
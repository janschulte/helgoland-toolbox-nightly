/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class BoolTogglerComponent {
    constructor() {
        this.onToggled = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggle() {
        this.onToggled.emit(!this.value);
    }
}
BoolTogglerComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-bool-toggler',
                template: `<button type="button" class="btn" (click)="toggle()" [ngClass]="value ? 'btn-primary' : 'btn-light'" title="{{tooltip}}">
    <i class="fa fa-{{icon}}" aria-hidden="true"></i>
</button>`
            },] },
];
BoolTogglerComponent.propDecorators = {
    value: [{ type: Input }],
    icon: [{ type: Input }],
    tooltip: [{ type: Input }],
    onToggled: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbC10b2dnbGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29udHJvbC8iLCJzb3VyY2VzIjpbImxpYi9ib29sLXRvZ2dsZXIvYm9vbC10b2dnbGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF2RSxNQUFNOzt5QkFZd0MsSUFBSSxZQUFZLEVBQUU7Ozs7O0lBRXJELE1BQU07UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztZQXJCeEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7VUFFSjthQUNUOzs7b0JBR0ksS0FBSzttQkFHTCxLQUFLO3NCQUdMLEtBQUs7d0JBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWJvb2wtdG9nZ2xlcicsXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJ0b2dnbGUoKVwiIFtuZ0NsYXNzXT1cInZhbHVlID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tbGlnaHQnXCIgdGl0bGU9XCJ7e3Rvb2x0aXB9fVwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEte3tpY29ufX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG48L2J1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIEJvb2xUb2dnbGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVG9nZ2xlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZWQuZW1pdCghdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuIl19
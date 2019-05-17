/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class MinMaxRangeComponent {
    constructor() {
        this.onRangeChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["range"] && this.range) {
            this.rangeMin = this.range.min;
            this.rangeMax = this.range.max;
        }
    }
    /**
     * @return {?}
     */
    setYaxisRange() {
        /** @type {?} */
        const min = (this.rangeMin === null || this.rangeMin === undefined) ? 0 : this.rangeMin;
        /** @type {?} */
        const max = (this.rangeMax === null || this.rangeMax === undefined) ? 0 : this.rangeMax;
        this.onRangeChange.emit({ min, max });
    }
    /**
     * @return {?}
     */
    resetYaxisRange() {
        this.rangeMin = null;
        this.rangeMax = null;
        this.onRangeChange.emit();
    }
}
MinMaxRangeComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-min-max-range',
                template: `<input type="number" [(ngModel)]="rangeMin" (ngModelChange)="setYaxisRange()">
<input type="number" [(ngModel)]="rangeMax" (ngModelChange)="setYaxisRange()">
<button (click)="resetYaxisRange()">reset</button>`,
                styles: [``]
            },] },
];
MinMaxRangeComponent.propDecorators = {
    range: [{ type: Input }],
    onRangeChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MinMaxRangeComponent.prototype.rangeMin;
    /** @type {?} */
    MinMaxRangeComponent.prototype.rangeMax;
    /** @type {?} */
    MinMaxRangeComponent.prototype.range;
    /** @type {?} */
    MinMaxRangeComponent.prototype.onRangeChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLW1heC1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9taW4tbWF4LXJhbmdlL21pbi1tYXgtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQVVqRyxNQUFNOzs2QkFTOEMsSUFBSSxZQUFZLEVBQUU7Ozs7OztJQUU3RCxXQUFXLENBQUMsT0FBc0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNoQzs7Ozs7SUFHSSxhQUFhOztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7UUFDeEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzs7Ozs7SUFHakMsZUFBZTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1lBbEM3QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzttREFFdUM7Z0JBQ2pELE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7b0JBTUUsS0FBSzs0QkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWluTWF4UmFuZ2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItbWluLW1heC1yYW5nZScsXG4gIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBbKG5nTW9kZWwpXT1cInJhbmdlTWluXCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0WWF4aXNSYW5nZSgpXCI+XG48aW5wdXQgdHlwZT1cIm51bWJlclwiIFsobmdNb2RlbCldPVwicmFuZ2VNYXhcIiAobmdNb2RlbENoYW5nZSk9XCJzZXRZYXhpc1JhbmdlKClcIj5cbjxidXR0b24gKGNsaWNrKT1cInJlc2V0WWF4aXNSYW5nZSgpXCI+cmVzZXQ8L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWluTWF4UmFuZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIHB1YmxpYyByYW5nZU1pbjogbnVtYmVyO1xuICBwdWJsaWMgcmFuZ2VNYXg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcmFuZ2U6IE1pbk1heFJhbmdlO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25SYW5nZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1pbk1heFJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnJhbmdlICYmIHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMucmFuZ2VNaW4gPSB0aGlzLnJhbmdlLm1pbjtcbiAgICAgIHRoaXMucmFuZ2VNYXggPSB0aGlzLnJhbmdlLm1heDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0WWF4aXNSYW5nZSgpIHtcbiAgICBjb25zdCBtaW4gPSAodGhpcy5yYW5nZU1pbiA9PT0gbnVsbCB8fCB0aGlzLnJhbmdlTWluID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucmFuZ2VNaW47XG4gICAgY29uc3QgbWF4ID0gKHRoaXMucmFuZ2VNYXggPT09IG51bGwgfHwgdGhpcy5yYW5nZU1heCA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnJhbmdlTWF4O1xuICAgIHRoaXMub25SYW5nZUNoYW5nZS5lbWl0KHsgbWluLCBtYXggfSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRZYXhpc1JhbmdlKCkge1xuICAgIHRoaXMucmFuZ2VNaW4gPSBudWxsO1xuICAgIHRoaXMucmFuZ2VNYXggPSBudWxsO1xuICAgIHRoaXMub25SYW5nZUNoYW5nZS5lbWl0KCk7XG4gIH1cblxufVxuIl19
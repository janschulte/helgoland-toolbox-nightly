/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export { MinMaxRangeComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLW1heC1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9taW4tbWF4LXJhbmdlL21pbi1tYXgtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7OzZCQW1CN0MsSUFBSSxZQUFZLEVBQUU7Ozs7OztJQUU3RCwwQ0FBVzs7OztjQUFDLE9BQXNCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDaEM7Ozs7O0lBR0ksNENBQWE7Ozs7O1FBQ2xCLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUN4RixJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQzs7Ozs7SUFHakMsOENBQWU7Ozs7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQWxDN0IsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxrT0FFdUM7b0JBQ2pELE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7O3dCQU1FLEtBQUs7Z0NBR0wsTUFBTTs7K0JBbEJUOztTQVVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbk1heFJhbmdlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLW1pbi1tYXgtcmFuZ2UnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgWyhuZ01vZGVsKV09XCJyYW5nZU1pblwiIChuZ01vZGVsQ2hhbmdlKT1cInNldFlheGlzUmFuZ2UoKVwiPlxuPGlucHV0IHR5cGU9XCJudW1iZXJcIiBbKG5nTW9kZWwpXT1cInJhbmdlTWF4XCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0WWF4aXNSYW5nZSgpXCI+XG48YnV0dG9uIChjbGljayk9XCJyZXNldFlheGlzUmFuZ2UoKVwiPnJlc2V0PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1pbk1heFJhbmdlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBwdWJsaWMgcmFuZ2VNaW46IG51bWJlcjtcbiAgcHVibGljIHJhbmdlTWF4OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJhbmdlOiBNaW5NYXhSYW5nZTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uUmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNaW5NYXhSYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5yYW5nZSAmJiB0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnJhbmdlTWluID0gdGhpcy5yYW5nZS5taW47XG4gICAgICB0aGlzLnJhbmdlTWF4ID0gdGhpcy5yYW5nZS5tYXg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFlheGlzUmFuZ2UoKSB7XG4gICAgY29uc3QgbWluID0gKHRoaXMucmFuZ2VNaW4gPT09IG51bGwgfHwgdGhpcy5yYW5nZU1pbiA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnJhbmdlTWluO1xuICAgIGNvbnN0IG1heCA9ICh0aGlzLnJhbmdlTWF4ID09PSBudWxsIHx8IHRoaXMucmFuZ2VNYXggPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5yYW5nZU1heDtcbiAgICB0aGlzLm9uUmFuZ2VDaGFuZ2UuZW1pdCh7IG1pbiwgbWF4IH0pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0WWF4aXNSYW5nZSgpIHtcbiAgICB0aGlzLnJhbmdlTWluID0gbnVsbDtcbiAgICB0aGlzLnJhbmdlTWF4ID0gbnVsbDtcbiAgICB0aGlzLm9uUmFuZ2VDaGFuZ2UuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==
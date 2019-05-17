/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LabelMapperService } from './label-mapper.service';
var LabelMapperComponent = /** @class */ (function () {
    function LabelMapperComponent(labelMapperSrvc) {
        this.labelMapperSrvc = labelMapperSrvc;
        this.loading = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LabelMapperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes["label"]) {
            this.labelMapperSrvc.getMappedLabel(this.label)
                .subscribe(function (label) {
                _this.determinedLabel = label;
                _this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    };
    LabelMapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-label-mapper',
                    template: "<span *ngIf=\"determinedLabel\">{{determinedLabel}}</span>\n<span *ngIf=\"loading\">\n  <span class=\"glyphicon glyphicon-refresh icon-spin\"></span>\n  <span> loading label ...</span>\n</span>\n"
                },] },
    ];
    /** @nocollapse */
    LabelMapperComponent.ctorParameters = function () { return [
        { type: LabelMapperService }
    ]; };
    LabelMapperComponent.propDecorators = {
        label: [{ type: Input }]
    };
    return LabelMapperComponent;
}());
export { LabelMapperComponent };
if (false) {
    /** @type {?} */
    LabelMapperComponent.prototype.label;
    /** @type {?} */
    LabelMapperComponent.prototype.determinedLabel;
    /** @type {?} */
    LabelMapperComponent.prototype.loading;
    /** @type {?} */
    LabelMapperComponent.prototype.labelMapperSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtbWFwcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uLyIsInNvdXJjZXMiOlsibGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBb0J4RCw4QkFDYyxlQUFtQztRQUFuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7dUJBSGhDLElBQUk7S0FJaEI7Ozs7O0lBRUUsMENBQVc7Ozs7Y0FBQyxPQUFzQjs7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFRLENBQUM7WUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDMUMsU0FBUyxDQUFDLFVBQUMsS0FBSztnQkFDYixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ1Y7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCOzs7Z0JBL0JSLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUscU1BS2I7aUJBQ0E7Ozs7Z0JBVlEsa0JBQWtCOzs7d0JBYXRCLEtBQUs7OytCQWZWOztTQWFhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGFiZWwtbWFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiZGV0ZXJtaW5lZExhYmVsXCI+e3tkZXRlcm1pbmVkTGFiZWx9fTwvc3Bhbj5cbjxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBpY29uLXNwaW5cIj48L3NwYW4+XG4gIDxzcGFuPiBsb2FkaW5nIGxhYmVsIC4uLjwvc3Bhbj5cbjwvc3Bhbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBkZXRlcm1pbmVkTGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGFiZWxNYXBwZXJTcnZjOiBMYWJlbE1hcHBlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXBwZXJTcnZjLmdldE1hcHBlZExhYmVsKHRoaXMubGFiZWwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVkTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
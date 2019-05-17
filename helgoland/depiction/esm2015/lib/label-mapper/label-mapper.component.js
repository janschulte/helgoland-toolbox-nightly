/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LabelMapperService } from './label-mapper.service';
export class LabelMapperComponent {
    /**
     * @param {?} labelMapperSrvc
     */
    constructor(labelMapperSrvc) {
        this.labelMapperSrvc = labelMapperSrvc;
        this.loading = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["label"]) {
            this.labelMapperSrvc.getMappedLabel(this.label)
                .subscribe((label) => {
                this.determinedLabel = label;
                this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    }
}
LabelMapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-label-mapper',
                template: `<span *ngIf="determinedLabel">{{determinedLabel}}</span>
<span *ngIf="loading">
  <span class="glyphicon glyphicon-refresh icon-spin"></span>
  <span> loading label ...</span>
</span>
`
            },] },
];
/** @nocollapse */
LabelMapperComponent.ctorParameters = () => [
    { type: LabelMapperService }
];
LabelMapperComponent.propDecorators = {
    label: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtbWFwcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uLyIsInNvdXJjZXMiOlsibGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFXNUQsTUFBTTs7OztJQVNGLFlBQ2MsZUFBbUM7UUFBbkMsb0JBQWUsR0FBZixlQUFlLENBQW9CO3VCQUhoQyxJQUFJO0tBSWhCOzs7OztJQUVFLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVEsQ0FBQztZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUMxQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztTQUNWO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4Qjs7OztZQS9CUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7OztDQUtiO2FBQ0E7Ozs7WUFWUSxrQkFBa0I7OztvQkFhdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGFiZWwtbWFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiZGV0ZXJtaW5lZExhYmVsXCI+e3tkZXRlcm1pbmVkTGFiZWx9fTwvc3Bhbj5cbjxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBpY29uLXNwaW5cIj48L3NwYW4+XG4gIDxzcGFuPiBsb2FkaW5nIGxhYmVsIC4uLjwvc3Bhbj5cbjwvc3Bhbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBkZXRlcm1pbmVkTGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGFiZWxNYXBwZXJTcnZjOiBMYWJlbE1hcHBlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXBwZXJTcnZjLmdldE1hcHBlZExhYmVsKHRoaXMubGFiZWwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVkTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
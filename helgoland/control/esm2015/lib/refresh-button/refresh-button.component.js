/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SettingsService } from '@helgoland/core';
export class RefreshButtonComponent {
    /**
     * @param {?} settings
     */
    constructor(settings) {
        this.settings = settings;
        this.refreshing = new EventEmitter();
        if (!this.refreshInterval) {
            this.refreshInterval = this.settings.getSettings().refreshDataInterval
                ? this.settings.getSettings().refreshDataInterval : 60;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.evaluteRefreshing();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["toggled"]) {
            this.evaluteRefreshing();
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.toggled = !this.toggled;
        if (this.toggled) {
            this.refresh();
        }
        this.evaluteRefreshing();
    }
    /**
     * @return {?}
     */
    evaluteRefreshing() {
        if (this.toggled) {
            this.startRefreshInterval();
        }
        else {
            this.stopRefreshInterval();
        }
    }
    /**
     * @return {?}
     */
    startRefreshInterval() {
        this.interval = setInterval(() => this.refresh(), this.refreshInterval * 1000);
    }
    /**
     * @return {?}
     */
    stopRefreshInterval() {
        clearInterval(this.interval);
    }
    /**
     * @return {?}
     */
    refresh() {
        this.refreshing.emit(true);
    }
}
RefreshButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-refresh-button',
                template: `<button type="button" class="btn" (click)="toggle()" [ngClass]="toggled ? 'btn-primary' : 'btn-light'">
    <i class="fa fa-refresh" aria-hidden="true"></i>
    <span *ngIf="toggled">active</span>
</button>`
            },] },
];
/** @nocollapse */
RefreshButtonComponent.ctorParameters = () => [
    { type: SettingsService }
];
RefreshButtonComponent.propDecorators = {
    refreshInterval: [{ type: Input }],
    toggled: [{ type: Input }],
    refreshing: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    RefreshButtonComponent.prototype.refreshInterval;
    /** @type {?} */
    RefreshButtonComponent.prototype.toggled;
    /** @type {?} */
    RefreshButtonComponent.prototype.refreshing;
    /** @type {?} */
    RefreshButtonComponent.prototype.interval;
    /** @type {?} */
    RefreshButtonComponent.prototype.settings;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb250cm9sLyIsInNvdXJjZXMiOlsibGliL3JlZnJlc2gtYnV0dG9uL3JlZnJlc2gtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBWSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVM1RCxNQUFNOzs7O0lBYUosWUFDWSxRQUFtQztRQUFuQyxhQUFRLEdBQVIsUUFBUSxDQUEyQjswQkFMSixJQUFJLFlBQVksRUFBRTtRQU8zRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUI7Z0JBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDMUQ7S0FDRjs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7O0lBR3BCLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQVUsQ0FBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjs7Ozs7SUFHSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FBRTtRQUNyQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7SUFHbkIsaUJBQWlCO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1Qjs7Ozs7SUFHSyxvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7O0lBR3pFLG1CQUFtQjtRQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OztJQUd2QixPQUFPO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7WUE5RDlCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7OztVQUdGO2FBQ1Q7Ozs7WUFSa0IsZUFBZTs7OzhCQVcvQixLQUFLO3NCQUdMLEtBQUs7eUJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1yZWZyZXNoLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwidG9nZ2xlKClcIiBbbmdDbGFzc109XCJ0b2dnbGVkID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tbGlnaHQnXCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDxzcGFuICpuZ0lmPVwidG9nZ2xlZFwiPmFjdGl2ZTwvc3Bhbj5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVmcmVzaEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcmVmcmVzaEludGVydmFsOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRvZ2dsZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyByZWZyZXNoaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBpbnRlcnZhbDogTm9kZUpTLlRpbWVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaEludGVydmFsKSB7XG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKS5yZWZyZXNoRGF0YUludGVydmFsXG4gICAgICAgID8gdGhpcy5zZXR0aW5ncy5nZXRTZXR0aW5ncygpLnJlZnJlc2hEYXRhSW50ZXJ2YWwgOiA2MDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy50b2dnbGVkKSB7XG4gICAgICB0aGlzLmV2YWx1dGVSZWZyZXNoaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZWQgPSAhdGhpcy50b2dnbGVkO1xuICAgIGlmICh0aGlzLnRvZ2dsZWQpIHsgdGhpcy5yZWZyZXNoKCk7IH1cbiAgICB0aGlzLmV2YWx1dGVSZWZyZXNoaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIGV2YWx1dGVSZWZyZXNoaW5nKCkge1xuICAgIGlmICh0aGlzLnRvZ2dsZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRSZWZyZXNoSW50ZXJ2YWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wUmVmcmVzaEludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlZnJlc2hJbnRlcnZhbCgpIHtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5yZWZyZXNoKCksIHRoaXMucmVmcmVzaEludGVydmFsICogMTAwMCk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BSZWZyZXNoSW50ZXJ2YWwoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlZnJlc2hpbmcuZW1pdCh0cnVlKTtcbiAgfVxuXG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SettingsService } from '@helgoland/core';
var RefreshButtonComponent = /** @class */ (function () {
    function RefreshButtonComponent(settings) {
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
    RefreshButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.evaluteRefreshing();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    RefreshButtonComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["toggled"]) {
            this.evaluteRefreshing();
        }
    };
    /**
     * @return {?}
     */
    RefreshButtonComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.toggled = !this.toggled;
        if (this.toggled) {
            this.refresh();
        }
        this.evaluteRefreshing();
    };
    /**
     * @return {?}
     */
    RefreshButtonComponent.prototype.evaluteRefreshing = /**
     * @return {?}
     */
    function () {
        if (this.toggled) {
            this.startRefreshInterval();
        }
        else {
            this.stopRefreshInterval();
        }
    };
    /**
     * @return {?}
     */
    RefreshButtonComponent.prototype.startRefreshInterval = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.interval = setInterval(function () { return _this.refresh(); }, this.refreshInterval * 1000);
    };
    /**
     * @return {?}
     */
    RefreshButtonComponent.prototype.stopRefreshInterval = /**
     * @return {?}
     */
    function () {
        clearInterval(this.interval);
    };
    /**
     * @return {?}
     */
    RefreshButtonComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.refreshing.emit(true);
    };
    RefreshButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-refresh-button',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"toggled ? 'btn-primary' : 'btn-light'\">\n    <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\n    <span *ngIf=\"toggled\">active</span>\n</button>"
                },] },
    ];
    /** @nocollapse */
    RefreshButtonComponent.ctorParameters = function () { return [
        { type: SettingsService }
    ]; };
    RefreshButtonComponent.propDecorators = {
        refreshInterval: [{ type: Input }],
        toggled: [{ type: Input }],
        refreshing: [{ type: Output }]
    };
    return RefreshButtonComponent;
}());
export { RefreshButtonComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb250cm9sLyIsInNvdXJjZXMiOlsibGliL3JlZnJlc2gtYnV0dG9uL3JlZnJlc2gtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBWSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFzQjFELGdDQUNZLFFBQW1DO1FBQW5DLGFBQVEsR0FBUixRQUFRLENBQTJCOzBCQUxKLElBQUksWUFBWSxFQUFFO1FBTzNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQjtnQkFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMxRDtLQUNGOzs7O0lBRU0seUNBQVE7Ozs7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7O0lBR3BCLDRDQUFXOzs7O2NBQUMsT0FBc0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFVLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7Ozs7O0lBR0ksdUNBQU07Ozs7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUFFO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzs7OztJQUduQixrREFBaUI7Ozs7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCOzs7OztJQUdLLHFEQUFvQjs7Ozs7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLEVBQUUsRUFBZCxDQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHekUsb0RBQW1COzs7O1FBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7O0lBR3ZCLHdDQUFPOzs7O1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OztnQkE5RDlCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsaU9BR0Y7aUJBQ1Q7Ozs7Z0JBUmtCLGVBQWU7OztrQ0FXL0IsS0FBSzswQkFHTCxLQUFLOzZCQUdMLE1BQU07O2lDQWxCVDs7U0FVYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItcmVmcmVzaC1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCIgW25nQ2xhc3NdPVwidG9nZ2xlZCA/ICdidG4tcHJpbWFyeScgOiAnYnRuLWxpZ2h0J1wiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8c3BhbiAqbmdJZj1cInRvZ2dsZWRcIj5hY3RpdmU8L3NwYW4+XG48L2J1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIFJlZnJlc2hCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJlZnJlc2hJbnRlcnZhbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0b2dnbGVkOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgcmVmcmVzaGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgKSB7XG4gICAgaWYgKCF0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSB0aGlzLnNldHRpbmdzLmdldFNldHRpbmdzKCkucmVmcmVzaERhdGFJbnRlcnZhbFxuICAgICAgICA/IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKS5yZWZyZXNoRGF0YUludGVydmFsIDogNjA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZXZhbHV0ZVJlZnJlc2hpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudG9nZ2xlZCkge1xuICAgICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcbiAgICBpZiAodGhpcy50b2dnbGVkKSB7IHRoaXMucmVmcmVzaCgpOyB9XG4gICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmFsdXRlUmVmcmVzaGluZygpIHtcbiAgICBpZiAodGhpcy50b2dnbGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0UmVmcmVzaEludGVydmFsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFJlZnJlc2hJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRSZWZyZXNoSW50ZXJ2YWwoKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMucmVmcmVzaCgpLCB0aGlzLnJlZnJlc2hJbnRlcnZhbCAqIDEwMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wUmVmcmVzaEludGVydmFsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgdGhpcy5yZWZyZXNoaW5nLmVtaXQodHJ1ZSk7XG4gIH1cblxufVxuIl19
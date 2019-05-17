import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { SettingsService } from '@helgoland/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BoolTogglerComponent = /** @class */ (function () {
    function BoolTogglerComponent() {
        this.onToggled = new EventEmitter();
    }
    /**
     * @return {?}
     */
    BoolTogglerComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.onToggled.emit(!this.value);
    };
    BoolTogglerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-bool-toggler',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"value ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                },] },
    ];
    BoolTogglerComponent.propDecorators = {
        value: [{ type: Input }],
        icon: [{ type: Input }],
        tooltip: [{ type: Input }],
        onToggled: [{ type: Output }]
    };
    return BoolTogglerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StringTogglerComponent = /** @class */ (function () {
    function StringTogglerComponent() {
        this.onToggled = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    StringTogglerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["value"]) {
            this.isToggled = this.option === this.value;
        }
    };
    /**
     * @return {?}
     */
    StringTogglerComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.onToggled.emit(this.option);
    };
    StringTogglerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-string-toggler',
                    template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"isToggled ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                },] },
    ];
    StringTogglerComponent.propDecorators = {
        value: [{ type: Input }],
        option: [{ type: Input }],
        icon: [{ type: Input }],
        tooltip: [{ type: Input }],
        onToggled: [{ type: Output }]
    };
    return StringTogglerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [
    BoolTogglerComponent,
    StringTogglerComponent,
    RefreshButtonComponent
];
var HelgolandControlModule = /** @class */ (function () {
    function HelgolandControlModule() {
    }
    HelgolandControlModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        COMPONENTS
                    ],
                    providers: []
                },] },
    ];
    return HelgolandControlModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandControlModule, BoolTogglerComponent, StringTogglerComponent, RefreshButtonComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNvbnRyb2wuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvY29udHJvbC9saWIvYm9vbC10b2dnbGVyL2Jvb2wtdG9nZ2xlci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29udHJvbC9saWIvcmVmcmVzaC1idXR0b24vcmVmcmVzaC1idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvbnRyb2wvbGliL3N0cmluZy10b2dnbGVyL3N0cmluZy10b2dnbGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb250cm9sL2xpYi9jb250cm9sLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1ib29sLXRvZ2dsZXInLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwidG9nZ2xlKClcIiBbbmdDbGFzc109XCJ2YWx1ZSA/ICdidG4tcHJpbWFyeScgOiAnYnRuLWxpZ2h0J1wiIHRpdGxlPVwie3t0b29sdGlwfX1cIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXt7aWNvbn19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuPC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBCb29sVG9nZ2xlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRvb2x0aXA6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMub25Ub2dnbGVkLmVtaXQoIXRoaXMudmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1yZWZyZXNoLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwidG9nZ2xlKClcIiBbbmdDbGFzc109XCJ0b2dnbGVkID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tbGlnaHQnXCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDxzcGFuICpuZ0lmPVwidG9nZ2xlZFwiPmFjdGl2ZTwvc3Bhbj5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVmcmVzaEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcmVmcmVzaEludGVydmFsOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRvZ2dsZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyByZWZyZXNoaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBpbnRlcnZhbDogTm9kZUpTLlRpbWVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaEludGVydmFsKSB7XG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKS5yZWZyZXNoRGF0YUludGVydmFsXG4gICAgICAgID8gdGhpcy5zZXR0aW5ncy5nZXRTZXR0aW5ncygpLnJlZnJlc2hEYXRhSW50ZXJ2YWwgOiA2MDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy50b2dnbGVkKSB7XG4gICAgICB0aGlzLmV2YWx1dGVSZWZyZXNoaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZWQgPSAhdGhpcy50b2dnbGVkO1xuICAgIGlmICh0aGlzLnRvZ2dsZWQpIHsgdGhpcy5yZWZyZXNoKCk7IH1cbiAgICB0aGlzLmV2YWx1dGVSZWZyZXNoaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIGV2YWx1dGVSZWZyZXNoaW5nKCkge1xuICAgIGlmICh0aGlzLnRvZ2dsZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRSZWZyZXNoSW50ZXJ2YWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wUmVmcmVzaEludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlZnJlc2hJbnRlcnZhbCgpIHtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5yZWZyZXNoKCksIHRoaXMucmVmcmVzaEludGVydmFsICogMTAwMCk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BSZWZyZXNoSW50ZXJ2YWwoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlZnJlc2hpbmcuZW1pdCh0cnVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXN0cmluZy10b2dnbGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCIgW25nQ2xhc3NdPVwiaXNUb2dnbGVkID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tbGlnaHQnXCIgdGl0bGU9XCJ7e3Rvb2x0aXB9fVwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEte3tpY29ufX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG48L2J1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1RvZ2dsZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG9wdGlvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVG9nZ2xlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNUb2dnbGVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUb2dnbGVkID0gdGhpcy5vcHRpb24gPT09IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlZC5lbWl0KHRoaXMub3B0aW9uKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbFRvZ2dsZXJDb21wb25lbnQgfSBmcm9tICcuL2Jvb2wtdG9nZ2xlci9ib29sLXRvZ2dsZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlZnJlc2hCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3JlZnJlc2gtYnV0dG9uL3JlZnJlc2gtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHJpbmdUb2dnbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zdHJpbmctdG9nZ2xlci9zdHJpbmctdG9nZ2xlci5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBCb29sVG9nZ2xlckNvbXBvbmVudCxcbiAgU3RyaW5nVG9nZ2xlckNvbXBvbmVudCxcbiAgUmVmcmVzaEJ1dHRvbkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZENvbnRyb2xNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7eUJBb0I4QyxJQUFJLFlBQVksRUFBRTs7Ozs7SUFFckQscUNBQU07Ozs7UUFDVCxJQUFJLENB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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@helgoland/control', ['exports', '@angular/core', '@helgoland/core', '@angular/common'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.control = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,core,core$1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BoolTogglerComponent = (function () {
        function BoolTogglerComponent() {
            this.onToggled = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-bool-toggler',
                        template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"value ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                    },] },
        ];
        BoolTogglerComponent.propDecorators = {
            value: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            onToggled: [{ type: core.Output }]
        };
        return BoolTogglerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var RefreshButtonComponent = (function () {
        function RefreshButtonComponent(settings) {
            this.settings = settings;
            this.refreshing = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-refresh-button',
                        template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"toggled ? 'btn-primary' : 'btn-light'\">\n    <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\n    <span *ngIf=\"toggled\">active</span>\n</button>"
                    },] },
        ];
        /** @nocollapse */
        RefreshButtonComponent.ctorParameters = function () {
            return [
                { type: core$1.SettingsService }
            ];
        };
        RefreshButtonComponent.propDecorators = {
            refreshInterval: [{ type: core.Input }],
            toggled: [{ type: core.Input }],
            refreshing: [{ type: core.Output }]
        };
        return RefreshButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StringTogglerComponent = (function () {
        function StringTogglerComponent() {
            this.onToggled = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-string-toggler',
                        template: "<button type=\"button\" class=\"btn\" (click)=\"toggle()\" [ngClass]=\"isToggled ? 'btn-primary' : 'btn-light'\" title=\"{{tooltip}}\">\n    <i class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></i>\n</button>"
                    },] },
        ];
        StringTogglerComponent.propDecorators = {
            value: [{ type: core.Input }],
            option: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            onToggled: [{ type: core.Output }]
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
    var HelgolandControlModule = (function () {
        function HelgolandControlModule() {
        }
        HelgolandControlModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS
                        ],
                        imports: [
                            common.CommonModule
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

    exports.HelgolandControlModule = HelgolandControlModule;
    exports.BoolTogglerComponent = BoolTogglerComponent;
    exports.StringTogglerComponent = StringTogglerComponent;
    exports.RefreshButtonComponent = RefreshButtonComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNvbnRyb2wudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2NvbnRyb2wvbGliL2Jvb2wtdG9nZ2xlci9ib29sLXRvZ2dsZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvbnRyb2wvbGliL3JlZnJlc2gtYnV0dG9uL3JlZnJlc2gtYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb250cm9sL2xpYi9zdHJpbmctdG9nZ2xlci9zdHJpbmctdG9nZ2xlci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29udHJvbC9saWIvY29udHJvbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItYm9vbC10b2dnbGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCIgW25nQ2xhc3NdPVwidmFsdWUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1saWdodCdcIiB0aXRsZT1cInt7dG9vbHRpcH19XCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS17e2ljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgQm9vbFRvZ2dsZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdmFsdWU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ub2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlZC5lbWl0KCF0aGlzLnZhbHVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItcmVmcmVzaC1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCIgW25nQ2xhc3NdPVwidG9nZ2xlZCA/ICdidG4tcHJpbWFyeScgOiAnYnRuLWxpZ2h0J1wiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8c3BhbiAqbmdJZj1cInRvZ2dsZWRcIj5hY3RpdmU8L3NwYW4+XG48L2J1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIFJlZnJlc2hCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJlZnJlc2hJbnRlcnZhbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0b2dnbGVkOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgcmVmcmVzaGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgKSB7XG4gICAgaWYgKCF0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSB0aGlzLnNldHRpbmdzLmdldFNldHRpbmdzKCkucmVmcmVzaERhdGFJbnRlcnZhbFxuICAgICAgICA/IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKS5yZWZyZXNoRGF0YUludGVydmFsIDogNjA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZXZhbHV0ZVJlZnJlc2hpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudG9nZ2xlZCkge1xuICAgICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcbiAgICBpZiAodGhpcy50b2dnbGVkKSB7IHRoaXMucmVmcmVzaCgpOyB9XG4gICAgdGhpcy5ldmFsdXRlUmVmcmVzaGluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmFsdXRlUmVmcmVzaGluZygpIHtcbiAgICBpZiAodGhpcy50b2dnbGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0UmVmcmVzaEludGVydmFsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFJlZnJlc2hJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRSZWZyZXNoSW50ZXJ2YWwoKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMucmVmcmVzaCgpLCB0aGlzLnJlZnJlc2hJbnRlcnZhbCAqIDEwMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wUmVmcmVzaEludGVydmFsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgdGhpcy5yZWZyZXNoaW5nLmVtaXQodHJ1ZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1zdHJpbmctdG9nZ2xlcicsXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJ0b2dnbGUoKVwiIFtuZ0NsYXNzXT1cImlzVG9nZ2xlZCA/ICdidG4tcHJpbWFyeScgOiAnYnRuLWxpZ2h0J1wiIHRpdGxlPVwie3t0b29sdGlwfX1cIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXt7aWNvbn19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuPC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBTdHJpbmdUb2dnbGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvcHRpb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRvb2x0aXA6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzVG9nZ2xlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlzVG9nZ2xlZCA9IHRoaXMub3B0aW9uID09PSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZWQuZW1pdCh0aGlzLm9wdGlvbik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJvb2xUb2dnbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9ib29sLXRvZ2dsZXIvYm9vbC10b2dnbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWZyZXNoQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9yZWZyZXNoLWJ1dHRvbi9yZWZyZXNoLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RyaW5nVG9nZ2xlckNvbXBvbmVudCB9IGZyb20gJy4vc3RyaW5nLXRvZ2dsZXIvc3RyaW5nLXRvZ2dsZXIuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQm9vbFRvZ2dsZXJDb21wb25lbnQsXG4gIFN0cmluZ1RvZ2dsZXJDb21wb25lbnQsXG4gIFJlZnJlc2hCdXR0b25Db21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRDb250cm9sTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiU2V0dGluZ3NTZXJ2aWNlIiwiTmdNb2R1bGUiLCJDb21t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
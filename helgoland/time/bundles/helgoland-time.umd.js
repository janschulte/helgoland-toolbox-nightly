(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@helgoland/time', ['exports', '@angular/core', '@helgoland/core', '@angular/common', '@angular/forms'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.time = {}),global.ng.core,null,global.ng.common,global.ng.forms));
}(this, (function (exports,core,core$1,common,forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PredefinedTimespanSelectorComponent = (function () {
        function PredefinedTimespanSelectorComponent(settingSrvc) {
            this.settingSrvc = settingSrvc;
            this.onTimespanChange = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        PredefinedTimespanSelectorComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var timespanPresets = this.settingSrvc.getSettings().timespanPresets;
                if (timespanPresets) {
                    this.parsedTimespanPresets = timespanPresets
                        .filter(function (e) { return _this.isSafeTimespanPreset(e); })
                        .map(function (e) {
                        return ({
                            name: e.name,
                            label: e.label,
                            timespan: {
                                from: _this.parseMomentExpression(e.timespan.from).getTime(),
                                to: _this.parseMomentExpression(e.timespan.to).getTime()
                            },
                            seperatorAfterThisItem: e.seperatorAfterThisItem
                        });
                    });
                }
            };
        /**
         * @param {?} expression
         * @return {?}
         */
        PredefinedTimespanSelectorComponent.prototype.isSafeMomentExpression = /**
         * @param {?} expression
         * @return {?}
         */
            function (expression) {
                /** @type {?} */
                var safeMomentExpression = new RegExp(/^moment\(\)(\.(((add|subtract)\(\d+, ?['"](years|y|quarters|Q|months|M|weeks|w|days|d|hours|h|minutes|m|seconds|s|milliseconds|ms)['"]\))|((startOf|endOf)\(['"](year|month|quarter|week|isoWeek|day|date|hour|minute|second)['"]\))|((year|month|date|hours|minutes|seconds|milliseconds)\(\d+\))))*;?$/);
                // brackets level in case you get lost:          * *1  234            4 *          4                                                                                      4     *3 34             4 *    4                                                           4     *3 34                                                  4 *    *321
                // * = this bracket is an escaped bracket and therefore not counted
                // test expression against regex above
                return safeMomentExpression.test(expression);
            };
        /**
         * @param {?} preset
         * @return {?}
         */
        PredefinedTimespanSelectorComponent.prototype.isSafeTimespanPreset = /**
         * @param {?} preset
         * @return {?}
         */
            function (preset) {
                /** @type {?} */
                var isSafe = this.isSafeMomentExpression(preset.timespan.from) && this.isSafeMomentExpression(preset.timespan.to);
                if (isSafe) {
                    return true;
                }
                else {
                    console.log('Timespan preset "' + preset.name + '" has invalid moment() expression!');
                    return false;
                }
            };
        /**
         * @param {?} expression
         * @return {?}
         */
        PredefinedTimespanSelectorComponent.prototype.parseMomentExpression = /**
         * @param {?} expression
         * @return {?}
         */
            function (expression) {
                // just to be sure not to eval() something nasty
                if (this.isSafeMomentExpression(expression)) {
                    // if satisfied, eval the inputs -> the ._d property contains the corresponding Date objects from which the Timespan can be constructed
                    // tslint:disable-next-line:no-eval
                    return eval(expression)._d;
                }
                else {
                    return null;
                }
            };
        /**
         * @param {?} preset
         * @return {?}
         */
        PredefinedTimespanSelectorComponent.prototype.timespanChanged = /**
         * @param {?} preset
         * @return {?}
         */
            function (preset) {
                // construct new Timespan
                this.timespan = new core$1.Timespan(parseInt(preset.timespan.from, 10), parseInt(preset.timespan.to, 10));
                // publicise new timespan
                this.onTimespanChange.emit(this.timespan);
            };
        PredefinedTimespanSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-predefined-timespan-selector',
                        template: "<span *ngFor=\"let item of parsedTimespanPresets\">\n  <button (click)=\"timespanChanged(item)\" [ngClass]=\"{'seperator-after-this-item': item.seperatorAfterThisItem}\" class=\"btn btn-sm btn-default\">\n    {{item.label}}\n  </button>\n  <br>\n</span>\n",
                        styles: [":host :not(.seperator-after-this-item)+br{display:none}:host button{margin:3px}"]
                    },] },
        ];
        /** @nocollapse */
        PredefinedTimespanSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.SettingsService }
            ];
        };
        PredefinedTimespanSelectorComponent.propDecorators = {
            timespan: [{ type: core.Input }],
            onTimespanChange: [{ type: core.Output }]
        };
        return PredefinedTimespanSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimeListSelectorComponent = (function () {
        function TimeListSelectorComponent() {
            this.onTimeSelected = new core.EventEmitter();
        }
        /**
         * @param {?} timestamp
         * @return {?}
         */
        TimeListSelectorComponent.prototype.selectTime = /**
         * @param {?} timestamp
         * @return {?}
         */
            function (timestamp) {
                this.onTimeSelected.emit(timestamp);
            };
        TimeListSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-time-list-selector',
                        template: "<div class=\"selector-entry\" *ngFor=\"let time of timeList\" (click)=\"selectTime(time)\">\n  <span>{{time | date: 'medium'}}</span>\n</div>\n"
                    },] },
        ];
        TimeListSelectorComponent.propDecorators = {
            timeList: [{ type: core.Input }],
            onTimeSelected: [{ type: core.Output }]
        };
        return TimeListSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimespanButtonComponent = (function () {
        function TimespanButtonComponent(predefinedSrvc) {
            this.predefinedSrvc = predefinedSrvc;
            this.onTimespanSelected = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        TimespanButtonComponent.prototype.clicked = /**
         * @return {?}
         */
            function () {
                if (this.predefined) {
                    this.onTimespanSelected.emit(this.predefinedSrvc.getInterval(/** @type {?} */ (this.predefined)));
                    return;
                }
                if (this.timespanFunc) {
                    this.onTimespanSelected.emit(this.timespanFunc());
                    return;
                }
                this.onTimespanSelected.emit();
            };
        TimespanButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-timespan-button',
                        template: "<button type=\"button\" class=\"btn\" (click)=\"clicked()\">\n  {{label}}\n</button>\n"
                    },] },
        ];
        /** @nocollapse */
        TimespanButtonComponent.ctorParameters = function () {
            return [
                { type: core$1.DefinedTimespanService }
            ];
        };
        TimespanButtonComponent.propDecorators = {
            predefined: [{ type: core.Input }],
            label: [{ type: core.Input }],
            timespanFunc: [{ type: core.Input }],
            onTimespanSelected: [{ type: core.Output }]
        };
        return TimespanButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TimespanShiftSelectorComponent = (function () {
        function TimespanShiftSelectorComponent(timeSrvc) {
            this.timeSrvc = timeSrvc;
            this.onTimespanChange = new core.EventEmitter();
            this.onOpenTimeSettings = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        TimespanShiftSelectorComponent.prototype.back = /**
         * @return {?}
         */
            function () {
                this.onTimespanChange.emit(this.timeSrvc.stepBack(this.timespan));
            };
        /**
         * @return {?}
         */
        TimespanShiftSelectorComponent.prototype.forward = /**
         * @return {?}
         */
            function () {
                this.onTimespanChange.emit(this.timeSrvc.stepForward(this.timespan));
            };
        /**
         * @return {?}
         */
        TimespanShiftSelectorComponent.prototype.open = /**
         * @return {?}
         */
            function () {
                this.onOpenTimeSettings.emit();
            };
        TimespanShiftSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-timespan-shift-selector',
                        template: "<div>\n  <button type=\"button\" (click)=\"back()\"> &lt; </button>\n  <button type=\"button\" (click)=\"open()\">\n    {{timespan.from | date : 'medium'}} &nbsp;&ndash;&nbsp; {{timespan.to | date : 'medium'}}\n  </button>\n  <button type=\"button\" (click)=\"forward()\"> &gt; </button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        TimespanShiftSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.Time }
            ];
        };
        TimespanShiftSelectorComponent.propDecorators = {
            timespan: [{ type: core.Input }],
            onTimespanChange: [{ type: core.Output }],
            onOpenTimeSettings: [{ type: core.Output }]
        };
        return TimespanShiftSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENTS = [
        PredefinedTimespanSelectorComponent,
        TimeListSelectorComponent,
        TimespanShiftSelectorComponent,
        TimespanButtonComponent
    ];
    var HelgolandTimeModule = (function () {
        function HelgolandTimeModule() {
        }
        HelgolandTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS
                        ],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            core$1.HelgolandCoreModule
                        ],
                        exports: [
                            COMPONENTS
                        ]
                    },] },
        ];
        return HelgolandTimeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.HelgolandTimeModule = HelgolandTimeModule;
    exports.PredefinedTimespanSelectorComponent = PredefinedTimespanSelectorComponent;
    exports.TimeListSelectorComponent = TimeListSelectorComponent;
    exports.TimespanButtonComponent = TimespanButtonComponent;
    exports.TimespanShiftSelectorComponent = TimespanShiftSelectorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXRpbWUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL3RpbWUvbGliL3ByZWRlZmluZWQtdGltZXNwYW4tc2VsZWN0b3IvcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvdGltZS9saWIvdGltZS1saXN0LXNlbGVjdG9yL3RpbWUtbGlzdC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvdGltZS9saWIvdGltZXNwYW4tYnV0dG9uL3RpbWVzcGFuLWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvdGltZS9saWIvdGltZXNwYW4tc2hpZnQtc2VsZWN0b3IvdGltZXNwYW4tc2hpZnQtc2VsZWN0b3IuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL3RpbWUvbGliL3RpbWUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcnNlZFRpbWVzcGFuUHJlc2V0LCBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlLCBUaW1lc3BhbiwgVGltZXNwYW5QcmVzZXQgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgPHNwYW4gKm5nRm9yPVwibGV0IGl0ZW0gb2YgcGFyc2VkVGltZXNwYW5QcmVzZXRzXCI+XG4gIDxidXR0b24gKGNsaWNrKT1cInRpbWVzcGFuQ2hhbmdlZChpdGVtKVwiIFtuZ0NsYXNzXT1cInsnc2VwZXJhdG9yLWFmdGVyLXRoaXMtaXRlbSc6IGl0ZW0uc2VwZXJhdG9yQWZ0ZXJUaGlzSXRlbX1cIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIj5cbiAgICB7e2l0ZW0ubGFiZWx9fVxuICA8L2J1dHRvbj5cbiAgPGJyPlxuPC9zcGFuPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0IDpub3QoLnNlcGVyYXRvci1hZnRlci10aGlzLWl0ZW0pK2Jye2Rpc3BsYXk6bm9uZX06aG9zdCBidXR0b257bWFyZ2luOjNweH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIFByZWRlZmluZWRUaW1lc3BhblNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZXNwYW4+KCk7XG5cbiAgcHVibGljIHBhcnNlZFRpbWVzcGFuUHJlc2V0czogUGFyc2VkVGltZXNwYW5QcmVzZXRbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ1NydmM6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGltZXNwYW5QcmVzZXRzID0gdGhpcy5zZXR0aW5nU3J2Yy5nZXRTZXR0aW5ncygpLnRpbWVzcGFuUHJlc2V0cztcbiAgICBpZiAodGltZXNwYW5QcmVzZXRzKSB7XG4gICAgICB0aGlzLnBhcnNlZFRpbWVzcGFuUHJlc2V0cyA9IHRpbWVzcGFuUHJlc2V0c1xuICAgICAgICAuZmlsdGVyKChlKSA9PiB0aGlzLmlzU2FmZVRpbWVzcGFuUHJlc2V0KGUpKVxuICAgICAgICAubWFwKChlKSA9PiAoe1xuICAgICAgICAgIG5hbWU6IGUubmFtZSxcbiAgICAgICAgICBsYWJlbDogZS5sYWJlbCxcbiAgICAgICAgICB0aW1lc3Bhbjoge1xuICAgICAgICAgICAgZnJvbTogdGhpcy5wYXJzZU1vbWVudEV4cHJlc3Npb24oZS50aW1lc3Bhbi5mcm9tKS5nZXRUaW1lKCksXG4gICAgICAgICAgICB0bzogdGhpcy5wYXJzZU1vbWVudEV4cHJlc3Npb24oZS50aW1lc3Bhbi50bykuZ2V0VGltZSgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXBlcmF0b3JBZnRlclRoaXNJdGVtOiBlLnNlcGVyYXRvckFmdGVyVGhpc0l0ZW1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc1NhZmVNb21lbnRFeHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuICAgIC8vIHJlZ2V4IGNoZWNrcyB3aGV0aGVyIGNvZGUgdG8gYmUgZXZhbCdlZCBhZGhlcnMgdG8gc3ludGF4IGdpdmVuIGluIGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9tYW5pcHVsYXRpbmcvXG4gICAgLy8gZXhwbGFuYXRpb246ICAgICAgICAgICAgICAgU3RhcnQgd2l0aCBcIm1vbWVudCgpXCIgICBQb3NzaWJsZSBmdW5jdGlvbnM6IGFkZChudW1iZXIsIHN0cmluZykgYW5kIHN1YnRyYWN0KG51bWJlciwgc3RyaW5nKSAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdXJ0aGVyIHBvc3NpYmxlIGZ1bmN0aW9uczogc3RhcnRPZihzdHJpbmcpIGFuZCBlbmRPZihzdHJpbmcpICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVydGhlciBwb3NzaWJsZSBmdW5jdGlvbnM6IHllYXIobnVtYmVyKSwgLi4uLCBtaWxsaXNlY29uZHMobnVtYmVyKS4gICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25zIGNhbiBiZSBjaGFpbmVkIGluZmluaXRlbHksIG9yIG5vdCBhdCBhbGxcbiAgICAvLyBmdXJ0aGVyIGV4cGxhbmF0aW9uOiAgICAgICBUaGlzIGlzIGEgTVVTVC4gICAgICAgICBUaGUgc3RyaW5ncyBoYXZlIHRvIGJlIG91dCBvZiB0aGUgb3B0aW9ucyBkZXNjcmliZWQgaW4gdGhlIGRvY3MgKHNob3J0Y3V0cyBwZXJtaXR0ZWQpICAgICAgICAgICBBZ2FpbiwgdGhlIHN0cmluZ3MgaGF2ZSB0byBiZSBvdXQgb2YgYSBzdHJpY3Qgc2V0LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlc2Ugc2V0IHRoZSBjb3JyZXNwb25kaW5nIHBhcnQgb2YgdGhlIE1vbWVudCBvYmplY3QgdG8gdGhlIG51bWJlciBnaXZlbi4gICAgICAgICAgICAgICAgICAgfCAgKGkuZS4gXCJtb21lbnQoKVwiIGlzIHRoZSBtaW5pbWFsIGNhc2UgbWF0Y2hlZClcbiAgICAvLyBldmVuIGZ1cnRoZXIgZXhwbGFuYXRpb246ICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgbnVtYmVyIGRvZXNuJ3QgSEFWRSB0byBiZSByZWFzb25hYmxlIChlLmcuIG1vbnRoPTIwIGlzIG9rKSwgYnV0IHRoYXQncyBubyBzZWN1cml0eSBpc3N1ZS4gICBUaGUgcXVvdGVzIGNhbiBpbmNvcnJlY3RseSBzdGFydCB3aXRoICcgYW5kIHRoZW4gZW5kIHdpdGggXCIgKG9yIHZpY2UgdmVyc2EpLCBidXQgdGhhdCdzIG5vIHNlY3VyaXR5IHByb2JsZW0gZWl0aGVyLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgdiBvcHRpb25hbCBzZW1pY29sb24gYXQgdGhlIGVuZFxuICAgIGNvbnN0IHNhZmVNb21lbnRFeHByZXNzaW9uID0gbmV3IFJlZ0V4cCgvXm1vbWVudFxcKFxcKShcXC4oKChhZGR8c3VidHJhY3QpXFwoXFxkKywgP1snXCJdKHllYXJzfHl8cXVhcnRlcnN8UXxtb250aHN8TXx3ZWVrc3x3fGRheXN8ZHxob3Vyc3xofG1pbnV0ZXN8bXxzZWNvbmRzfHN8bWlsbGlzZWNvbmRzfG1zKVsnXCJdXFwpKXwoKHN0YXJ0T2Z8ZW5kT2YpXFwoWydcIl0oeWVhcnxtb250aHxxdWFydGVyfHdlZWt8aXNvV2Vla3xkYXl8ZGF0ZXxob3VyfG1pbnV0ZXxzZWNvbmQpWydcIl1cXCkpfCgoeWVhcnxtb250aHxkYXRlfGhvdXJzfG1pbnV0ZXN8c2Vjb25kc3xtaWxsaXNlY29uZHMpXFwoXFxkK1xcKSkpKSo7PyQvKTtcbiAgICAvLyBicmFja2V0cyBsZXZlbCBpbiBjYXNlIHlvdSBnZXQgbG9zdDogICAgICAgICAgKiAqMSAgMjM0ICAgICAgICAgICAgNCAqICAgICAgICAgIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgICAgICozIDM0ICAgICAgICAgICAgIDQgKiAgICA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0ICAgICAqMyAzNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCAqICAgICozMjFcbiAgICAvLyAqID0gdGhpcyBicmFja2V0IGlzIGFuIGVzY2FwZWQgYnJhY2tldCBhbmQgdGhlcmVmb3JlIG5vdCBjb3VudGVkXG5cbiAgICAvLyB0ZXN0IGV4cHJlc3Npb24gYWdhaW5zdCByZWdleCBhYm92ZVxuICAgIHJldHVybiBzYWZlTW9tZW50RXhwcmVzc2lvbi50ZXN0KGV4cHJlc3Npb24pO1xuICB9XG5cbiAgcHVibGljIGlzU2FmZVRpbWVzcGFuUHJlc2V0KHByZXNldDogVGltZXNwYW5QcmVzZXQpOiBib29sZWFuIHtcbiAgICAvLyB0ZXN0IGJvdGggaW5wdXRzIGFnYWluc3QgdGhlIHJlZ2V4XG4gICAgY29uc3QgaXNTYWZlID0gdGhpcy5pc1NhZmVNb21lbnRFeHByZXNzaW9uKHByZXNldC50aW1lc3Bhbi5mcm9tKSAmJiB0aGlzLmlzU2FmZU1vbWVudEV4cHJlc3Npb24ocHJlc2V0LnRpbWVzcGFuLnRvKTtcblxuICAgIGlmIChpc1NhZmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnVGltZXNwYW4gcHJlc2V0IFwiJyArIHByZXNldC5uYW1lICsgJ1wiIGhhcyBpbnZhbGlkIG1vbWVudCgpIGV4cHJlc3Npb24hJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHBhcnNlTW9tZW50RXhwcmVzc2lvbihleHByZXNzaW9uOiBzdHJpbmcpOiBEYXRlIHtcbiAgICAvLyBqdXN0IHRvIGJlIHN1cmUgbm90IHRvIGV2YWwoKSBzb21ldGhpbmcgbmFzdHlcbiAgICBpZiAodGhpcy5pc1NhZmVNb21lbnRFeHByZXNzaW9uKGV4cHJlc3Npb24pKSB7XG4gICAgICAvLyBpZiBzYXRpc2ZpZWQsIGV2YWwgdGhlIGlucHV0cyAtPiB0aGUgLl9kIHByb3BlcnR5IGNvbnRhaW5zIHRoZSBjb3JyZXNwb25kaW5nIERhdGUgb2JqZWN0cyBmcm9tIHdoaWNoIHRoZSBUaW1lc3BhbiBjYW4gYmUgY29uc3RydWN0ZWRcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ldmFsXG4gICAgICByZXR1cm4gZXZhbChleHByZXNzaW9uKS5fZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRpbWVzcGFuQ2hhbmdlZChwcmVzZXQ6IFRpbWVzcGFuUHJlc2V0KSB7XG4gICAgLy8gY29uc3RydWN0IG5ldyBUaW1lc3BhblxuICAgIHRoaXMudGltZXNwYW4gPSBuZXcgVGltZXNwYW4ocGFyc2VJbnQocHJlc2V0LnRpbWVzcGFuLmZyb20sIDEwKSwgcGFyc2VJbnQocHJlc2V0LnRpbWVzcGFuLnRvLCAxMCkpO1xuICAgIC8vIHB1YmxpY2lzZSBuZXcgdGltZXNwYW5cbiAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2UuZW1pdCh0aGlzLnRpbWVzcGFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXRpbWUtbGlzdC1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbGVjdG9yLWVudHJ5XCIgKm5nRm9yPVwibGV0IHRpbWUgb2YgdGltZUxpc3RcIiAoY2xpY2spPVwic2VsZWN0VGltZSh0aW1lKVwiPlxuICA8c3Bhbj57e3RpbWUgfCBkYXRlOiAnbWVkaXVtJ319PC9zcGFuPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVMaXN0U2VsZWN0b3JDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lTGlzdDogbnVtYmVyW107XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRpbWVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNlbGVjdFRpbWUodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICB0aGlzLm9uVGltZVNlbGVjdGVkLmVtaXQodGltZXN0YW1wKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmaW5lZFRpbWVzcGFuLCBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi10aW1lc3Bhbi1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cImNsaWNrZWQoKVwiPlxuICB7e2xhYmVsfX1cbjwvYnV0dG9uPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lc3BhbkJ1dHRvbkNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHByZWRlZmluZWQ6IHN0cmluZyB8IERlZmluZWRUaW1lc3BhbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZXNwYW5GdW5jOiAoKSA9PiBUaW1lc3BhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVGltZXNwYW5TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcHJlZGVmaW5lZFNydmM6IERlZmluZWRUaW1lc3BhblNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY2xpY2tlZCgpIHtcbiAgICBpZiAodGhpcy5wcmVkZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uVGltZXNwYW5TZWxlY3RlZC5lbWl0KHRoaXMucHJlZGVmaW5lZFNydmMuZ2V0SW50ZXJ2YWwodGhpcy5wcmVkZWZpbmVkIGFzIERlZmluZWRUaW1lc3BhbikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy50aW1lc3BhbkZ1bmMpIHtcbiAgICAgIHRoaXMub25UaW1lc3BhblNlbGVjdGVkLmVtaXQodGhpcy50aW1lc3BhbkZ1bmMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub25UaW1lc3BhblNlbGVjdGVkLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZSwgVGltZXNwYW4gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItdGltZXNwYW4tc2hpZnQtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIj4gJmx0OyA8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxuICAgIHt7dGltZXNwYW4uZnJvbSB8IGRhdGUgOiAnbWVkaXVtJ319ICZuYnNwOyZuZGFzaDsmbmJzcDsge3t0aW1lc3Bhbi50byB8IGRhdGUgOiAnbWVkaXVtJ319XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZm9yd2FyZCgpXCI+ICZndDsgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNwYW5TaGlmdFNlbGVjdG9yQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZXNwYW4+KCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbk9wZW5UaW1lU2V0dGluZ3M6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWVcbiAgKSB7IH1cblxuICBwdWJsaWMgYmFjaygpIHtcbiAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2UuZW1pdCh0aGlzLnRpbWVTcnZjLnN0ZXBCYWNrKHRoaXMudGltZXNwYW4pKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3J3YXJkKCkge1xuICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZS5lbWl0KHRoaXMudGltZVNydmMuc3RlcEZvcndhcmQodGhpcy50aW1lc3BhbikpO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKSB7XG4gICAgdGhpcy5vbk9wZW5UaW1lU2V0dGluZ3MuZW1pdCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFByZWRlZmluZWRUaW1lc3BhblNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yL3ByZWRlZmluZWQtdGltZXNwYW4tc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVMaXN0U2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtbGlzdC1zZWxlY3Rvci90aW1lLWxpc3Qtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVzcGFuQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lc3Bhbi1idXR0b24vdGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lc3BhblNoaWZ0U2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIFByZWRlZmluZWRUaW1lc3BhblNlbGVjdG9yQ29tcG9uZW50LFxuICBUaW1lTGlzdFNlbGVjdG9yQ29tcG9uZW50LFxuICBUaW1lc3BhblNoaWZ0U2VsZWN0b3JDb21wb25lbnQsXG4gIFRpbWVzcGFuQnV0dG9uQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZFRpbWVNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiVGltZXNwYW4iLCJDb21wb25lbnQiLCJTZXR0aW5nc1NlcnZpY2UiLCJJbnB1dCIsIk91dHB1dCIsIkRlZmluZWRUaW1lc3BhblNlcnZpY2UiLCJUaW1lIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkhlbGdvbGFuZENvcmVNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQXlCRSw2Q0FDWSxXQUFzQztZQUF0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBMkI7b0NBTEEsSUFBSUEsaUJBQVksRUFBWTtTQU16RTs7OztRQUVFLHNEQUFROzs7Ozs7Z0JBQ2IsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZFLElBQUksZUFBZSxFQUFFO29CQUNuQixJQUFJLENBQUMscUJBQXFCLEdBQUcsZUFBZTt5QkFDekMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFBLENBQUM7eUJBQzNDLEdBQUcsQ0FBQyxVQUFDLENBQUM7d0JBQUssUUFBQzs0QkFDWCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7NEJBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLOzRCQUNkLFFBQVEsRUFBRTtnQ0FDUixJQUFJLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO2dDQUMzRCxFQUFFLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFOzZCQUN4RDs0QkFDRCxzQkFBc0IsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3lC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
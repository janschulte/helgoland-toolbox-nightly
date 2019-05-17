import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { SettingsService, Timespan, DefinedTimespanService, Time, HelgolandCoreModule } from '@helgoland/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PredefinedTimespanSelectorComponent {
    /**
     * @param {?} settingSrvc
     */
    constructor(settingSrvc) {
        this.settingSrvc = settingSrvc;
        this.onTimespanChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const timespanPresets = this.settingSrvc.getSettings().timespanPresets;
        if (timespanPresets) {
            this.parsedTimespanPresets = timespanPresets
                .filter((e) => this.isSafeTimespanPreset(e))
                .map((e) => ({
                name: e.name,
                label: e.label,
                timespan: {
                    from: this.parseMomentExpression(e.timespan.from).getTime(),
                    to: this.parseMomentExpression(e.timespan.to).getTime()
                },
                seperatorAfterThisItem: e.seperatorAfterThisItem
            }));
        }
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    isSafeMomentExpression(expression) {
        /** @type {?} */
        const safeMomentExpression = new RegExp(/^moment\(\)(\.(((add|subtract)\(\d+, ?['"](years|y|quarters|Q|months|M|weeks|w|days|d|hours|h|minutes|m|seconds|s|milliseconds|ms)['"]\))|((startOf|endOf)\(['"](year|month|quarter|week|isoWeek|day|date|hour|minute|second)['"]\))|((year|month|date|hours|minutes|seconds|milliseconds)\(\d+\))))*;?$/);
        // brackets level in case you get lost:          * *1  234            4 *          4                                                                                      4     *3 34             4 *    4                                                           4     *3 34                                                  4 *    *321
        // * = this bracket is an escaped bracket and therefore not counted
        // test expression against regex above
        return safeMomentExpression.test(expression);
    }
    /**
     * @param {?} preset
     * @return {?}
     */
    isSafeTimespanPreset(preset) {
        /** @type {?} */
        const isSafe = this.isSafeMomentExpression(preset.timespan.from) && this.isSafeMomentExpression(preset.timespan.to);
        if (isSafe) {
            return true;
        }
        else {
            console.log('Timespan preset "' + preset.name + '" has invalid moment() expression!');
            return false;
        }
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    parseMomentExpression(expression) {
        // just to be sure not to eval() something nasty
        if (this.isSafeMomentExpression(expression)) {
            // if satisfied, eval the inputs -> the ._d property contains the corresponding Date objects from which the Timespan can be constructed
            // tslint:disable-next-line:no-eval
            return eval(expression)._d;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} preset
     * @return {?}
     */
    timespanChanged(preset) {
        // construct new Timespan
        this.timespan = new Timespan(parseInt(preset.timespan.from, 10), parseInt(preset.timespan.to, 10));
        // publicise new timespan
        this.onTimespanChange.emit(this.timespan);
    }
}
PredefinedTimespanSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-predefined-timespan-selector',
                template: `<span *ngFor="let item of parsedTimespanPresets">
  <button (click)="timespanChanged(item)" [ngClass]="{'seperator-after-this-item': item.seperatorAfterThisItem}" class="btn btn-sm btn-default">
    {{item.label}}
  </button>
  <br>
</span>
`,
                styles: [`:host :not(.seperator-after-this-item)+br{display:none}:host button{margin:3px}`]
            },] },
];
/** @nocollapse */
PredefinedTimespanSelectorComponent.ctorParameters = () => [
    { type: SettingsService }
];
PredefinedTimespanSelectorComponent.propDecorators = {
    timespan: [{ type: Input }],
    onTimespanChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimeListSelectorComponent {
    constructor() {
        this.onTimeSelected = new EventEmitter();
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    selectTime(timestamp) {
        this.onTimeSelected.emit(timestamp);
    }
}
TimeListSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-time-list-selector',
                template: `<div class="selector-entry" *ngFor="let time of timeList" (click)="selectTime(time)">
  <span>{{time | date: 'medium'}}</span>
</div>
`
            },] },
];
TimeListSelectorComponent.propDecorators = {
    timeList: [{ type: Input }],
    onTimeSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimespanButtonComponent {
    /**
     * @param {?} predefinedSrvc
     */
    constructor(predefinedSrvc) {
        this.predefinedSrvc = predefinedSrvc;
        this.onTimespanSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    clicked() {
        if (this.predefined) {
            this.onTimespanSelected.emit(this.predefinedSrvc.getInterval(/** @type {?} */ (this.predefined)));
            return;
        }
        if (this.timespanFunc) {
            this.onTimespanSelected.emit(this.timespanFunc());
            return;
        }
        this.onTimespanSelected.emit();
    }
}
TimespanButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-timespan-button',
                template: `<button type="button" class="btn" (click)="clicked()">
  {{label}}
</button>
`
            },] },
];
/** @nocollapse */
TimespanButtonComponent.ctorParameters = () => [
    { type: DefinedTimespanService }
];
TimespanButtonComponent.propDecorators = {
    predefined: [{ type: Input }],
    label: [{ type: Input }],
    timespanFunc: [{ type: Input }],
    onTimespanSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TimespanShiftSelectorComponent {
    /**
     * @param {?} timeSrvc
     */
    constructor(timeSrvc) {
        this.timeSrvc = timeSrvc;
        this.onTimespanChange = new EventEmitter();
        this.onOpenTimeSettings = new EventEmitter();
    }
    /**
     * @return {?}
     */
    back() {
        this.onTimespanChange.emit(this.timeSrvc.stepBack(this.timespan));
    }
    /**
     * @return {?}
     */
    forward() {
        this.onTimespanChange.emit(this.timeSrvc.stepForward(this.timespan));
    }
    /**
     * @return {?}
     */
    open() {
        this.onOpenTimeSettings.emit();
    }
}
TimespanShiftSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-timespan-shift-selector',
                template: `<div>
  <button type="button" (click)="back()"> &lt; </button>
  <button type="button" (click)="open()">
    {{timespan.from | date : 'medium'}} &nbsp;&ndash;&nbsp; {{timespan.to | date : 'medium'}}
  </button>
  <button type="button" (click)="forward()"> &gt; </button>
</div>
`
            },] },
];
/** @nocollapse */
TimespanShiftSelectorComponent.ctorParameters = () => [
    { type: Time }
];
TimespanShiftSelectorComponent.propDecorators = {
    timespan: [{ type: Input }],
    onTimespanChange: [{ type: Output }],
    onOpenTimeSettings: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [
    PredefinedTimespanSelectorComponent,
    TimeListSelectorComponent,
    TimespanShiftSelectorComponent,
    TimespanButtonComponent
];
class HelgolandTimeModule {
}
HelgolandTimeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    COMPONENTS
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    HelgolandCoreModule
                ],
                exports: [
                    COMPONENTS
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandTimeModule, PredefinedTimespanSelectorComponent, TimeListSelectorComponent, TimespanButtonComponent, TimespanShiftSelectorComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXRpbWUuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvdGltZS9saWIvcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci9wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC90aW1lL2xpYi90aW1lLWxpc3Qtc2VsZWN0b3IvdGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC90aW1lL2xpYi90aW1lc3Bhbi1idXR0b24vdGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC90aW1lL2xpYi90aW1lc3Bhbi1zaGlmdC1zZWxlY3Rvci90aW1lc3Bhbi1zaGlmdC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvdGltZS9saWIvdGltZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyc2VkVGltZXNwYW5QcmVzZXQsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UsIFRpbWVzcGFuLCBUaW1lc3BhblByZXNldCB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBwYXJzZWRUaW1lc3BhblByZXNldHNcIj5cbiAgPGJ1dHRvbiAoY2xpY2spPVwidGltZXNwYW5DaGFuZ2VkKGl0ZW0pXCIgW25nQ2xhc3NdPVwieydzZXBlcmF0b3ItYWZ0ZXItdGhpcy1pdGVtJzogaXRlbS5zZXBlcmF0b3JBZnRlclRoaXNJdGVtfVwiIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiPlxuICAgIHt7aXRlbS5sYWJlbH19XG4gIDwvYnV0dG9uPlxuICA8YnI+XG48L3NwYW4+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgOm5vdCguc2VwZXJhdG9yLWFmdGVyLXRoaXMtaXRlbSkrYnJ7ZGlzcGxheTpub25lfTpob3N0IGJ1dHRvbnttYXJnaW46M3B4fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgUHJlZGVmaW5lZFRpbWVzcGFuU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lc3BhbjogVGltZXNwYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4oKTtcblxuICBwdWJsaWMgcGFyc2VkVGltZXNwYW5QcmVzZXRzOiBQYXJzZWRUaW1lc3BhblByZXNldFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nU3J2YzogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCB0aW1lc3BhblByZXNldHMgPSB0aGlzLnNldHRpbmdTcnZjLmdldFNldHRpbmdzKCkudGltZXNwYW5QcmVzZXRzO1xuICAgIGlmICh0aW1lc3BhblByZXNldHMpIHtcbiAgICAgIHRoaXMucGFyc2VkVGltZXNwYW5QcmVzZXRzID0gdGltZXNwYW5QcmVzZXRzXG4gICAgICAgIC5maWx0ZXIoKGUpID0+IHRoaXMuaXNTYWZlVGltZXNwYW5QcmVzZXQoZSkpXG4gICAgICAgIC5tYXAoKGUpID0+ICh7XG4gICAgICAgICAgbmFtZTogZS5uYW1lLFxuICAgICAgICAgIGxhYmVsOiBlLmxhYmVsLFxuICAgICAgICAgIHRpbWVzcGFuOiB7XG4gICAgICAgICAgICBmcm9tOiB0aGlzLnBhcnNlTW9tZW50RXhwcmVzc2lvbihlLnRpbWVzcGFuLmZyb20pLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHRvOiB0aGlzLnBhcnNlTW9tZW50RXhwcmVzc2lvbihlLnRpbWVzcGFuLnRvKS5nZXRUaW1lKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlcGVyYXRvckFmdGVyVGhpc0l0ZW06IGUuc2VwZXJhdG9yQWZ0ZXJUaGlzSXRlbVxuICAgICAgICB9KSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2FmZU1vbWVudEV4cHJlc3Npb24oZXhwcmVzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgLy8gcmVnZXggY2hlY2tzIHdoZXRoZXIgY29kZSB0byBiZSBldmFsJ2VkIGFkaGVycyB0byBzeW50YXggZ2l2ZW4gaW4gaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL21hbmlwdWxhdGluZy9cbiAgICAvLyBleHBsYW5hdGlvbjogICAgICAgICAgICAgICBTdGFydCB3aXRoIFwibW9tZW50KClcIiAgIFBvc3NpYmxlIGZ1bmN0aW9uczogYWRkKG51bWJlciwgc3RyaW5nKSBhbmQgc3VidHJhY3QobnVtYmVyLCBzdHJpbmcpICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1cnRoZXIgcG9zc2libGUgZnVuY3Rpb25zOiBzdGFydE9mKHN0cmluZykgYW5kIGVuZE9mKHN0cmluZykgICAgICAgICAgICAgICAgICAgICAgICAgICBGdXJ0aGVyIHBvc3NpYmxlIGZ1bmN0aW9uczogeWVhcihudW1iZXIpLCAuLi4sIG1pbGxpc2Vjb25kcyhudW1iZXIpLiAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbnMgY2FuIGJlIGNoYWluZWQgaW5maW5pdGVseSwgb3Igbm90IGF0IGFsbFxuICAgIC8vIGZ1cnRoZXIgZXhwbGFuYXRpb246ICAgICAgIFRoaXMgaXMgYSBNVVNULiAgICAgICAgIFRoZSBzdHJpbmdzIGhhdmUgdG8gYmUgb3V0IG9mIHRoZSBvcHRpb25zIGRlc2NyaWJlZCBpbiB0aGUgZG9jcyAoc2hvcnRjdXRzIHBlcm1pdHRlZCkgICAgICAgICAgIEFnYWluLCB0aGUgc3RyaW5ncyBoYXZlIHRvIGJlIG91dCBvZiBhIHN0cmljdCBzZXQuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVzZSBzZXQgdGhlIGNvcnJlc3BvbmRpbmcgcGFydCBvZiB0aGUgTW9tZW50IG9iamVjdCB0byB0aGUgbnVtYmVyIGdpdmVuLiAgICAgICAgICAgICAgICAgICB8ICAoaS5lLiBcIm1vbWVudCgpXCIgaXMgdGhlIG1pbmltYWwgY2FzZSBtYXRjaGVkKVxuICAgIC8vIGV2ZW4gZnVydGhlciBleHBsYW5hdGlvbjogICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgZG9lc24ndCBIQVZFIHRvIGJlIHJlYXNvbmFibGUgKGUuZy4gbW9udGg9MjAgaXMgb2spLCBidXQgdGhhdCdzIG5vIHNlY3VyaXR5IGlzc3VlLiAgIFRoZSBxdW90ZXMgY2FuIGluY29ycmVjdGx5IHN0YXJ0IHdpdGggJyBhbmQgdGhlbiBlbmQgd2l0aCBcIiAob3IgdmljZSB2ZXJzYSksIGJ1dCB0aGF0J3Mgbm8gc2VjdXJpdHkgcHJvYmxlbSBlaXRoZXIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiB2IG9wdGlvbmFsIHNlbWljb2xvbiBhdCB0aGUgZW5kXG4gICAgY29uc3Qgc2FmZU1vbWVudEV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKC9ebW9tZW50XFwoXFwpKFxcLigoKGFkZHxzdWJ0cmFjdClcXChcXGQrLCA/WydcIl0oeWVhcnN8eXxxdWFydGVyc3xRfG1vbnRoc3xNfHdlZWtzfHd8ZGF5c3xkfGhvdXJzfGh8bWludXRlc3xtfHNlY29uZHN8c3xtaWxsaXNlY29uZHN8bXMpWydcIl1cXCkpfCgoc3RhcnRPZnxlbmRPZilcXChbJ1wiXSh5ZWFyfG1vbnRofHF1YXJ0ZXJ8d2Vla3xpc29XZWVrfGRheXxkYXRlfGhvdXJ8bWludXRlfHNlY29uZClbJ1wiXVxcKSl8KCh5ZWFyfG1vbnRofGRhdGV8aG91cnN8bWludXRlc3xzZWNvbmRzfG1pbGxpc2Vjb25kcylcXChcXGQrXFwpKSkpKjs/JC8pO1xuICAgIC8vIGJyYWNrZXRzIGxldmVsIGluIGNhc2UgeW91IGdldCBsb3N0OiAgICAgICAgICAqICoxICAyMzQgICAgICAgICAgICA0ICogICAgICAgICAgNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCAgICAgKjMgMzQgICAgICAgICAgICAgNCAqICAgIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgICAgICozIDM0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0ICogICAgKjMyMVxuICAgIC8vICogPSB0aGlzIGJyYWNrZXQgaXMgYW4gZXNjYXBlZCBicmFja2V0IGFuZCB0aGVyZWZvcmUgbm90IGNvdW50ZWRcblxuICAgIC8vIHRlc3QgZXhwcmVzc2lvbiBhZ2FpbnN0IHJlZ2V4IGFib3ZlXG4gICAgcmV0dXJuIHNhZmVNb21lbnRFeHByZXNzaW9uLnRlc3QoZXhwcmVzc2lvbik7XG4gIH1cblxuICBwdWJsaWMgaXNTYWZlVGltZXNwYW5QcmVzZXQocHJlc2V0OiBUaW1lc3BhblByZXNldCk6IGJvb2xlYW4ge1xuICAgIC8vIHRlc3QgYm90aCBpbnB1dHMgYWdhaW5zdCB0aGUgcmVnZXhcbiAgICBjb25zdCBpc1NhZmUgPSB0aGlzLmlzU2FmZU1vbWVudEV4cHJlc3Npb24ocHJlc2V0LnRpbWVzcGFuLmZyb20pICYmIHRoaXMuaXNTYWZlTW9tZW50RXhwcmVzc2lvbihwcmVzZXQudGltZXNwYW4udG8pO1xuXG4gICAgaWYgKGlzU2FmZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUaW1lc3BhbiBwcmVzZXQgXCInICsgcHJlc2V0Lm5hbWUgKyAnXCIgaGFzIGludmFsaWQgbW9tZW50KCkgZXhwcmVzc2lvbiEnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNb21lbnRFeHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZyk6IERhdGUge1xuICAgIC8vIGp1c3QgdG8gYmUgc3VyZSBub3QgdG8gZXZhbCgpIHNvbWV0aGluZyBuYXN0eVxuICAgIGlmICh0aGlzLmlzU2FmZU1vbWVudEV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgIC8vIGlmIHNhdGlzZmllZCwgZXZhbCB0aGUgaW5wdXRzIC0+IHRoZSAuX2QgcHJvcGVydHkgY29udGFpbnMgdGhlIGNvcnJlc3BvbmRpbmcgRGF0ZSBvYmplY3RzIGZyb20gd2hpY2ggdGhlIFRpbWVzcGFuIGNhbiBiZSBjb25zdHJ1Y3RlZFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWV2YWxcbiAgICAgIHJldHVybiBldmFsKGV4cHJlc3Npb24pLl9kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdGltZXNwYW5DaGFuZ2VkKHByZXNldDogVGltZXNwYW5QcmVzZXQpIHtcbiAgICAvLyBjb25zdHJ1Y3QgbmV3IFRpbWVzcGFuXG4gICAgdGhpcy50aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihwYXJzZUludChwcmVzZXQudGltZXNwYW4uZnJvbSwgMTApLCBwYXJzZUludChwcmVzZXQudGltZXNwYW4udG8sIDEwKSk7XG4gICAgLy8gcHVibGljaXNlIG5ldyB0aW1lc3BhblxuICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZS5lbWl0KHRoaXMudGltZXNwYW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItdGltZS1saXN0LXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VsZWN0b3ItZW50cnlcIiAqbmdGb3I9XCJsZXQgdGltZSBvZiB0aW1lTGlzdFwiIChjbGljayk9XCJzZWxlY3RUaW1lKHRpbWUpXCI+XG4gIDxzcGFuPnt7dGltZSB8IGRhdGU6ICdtZWRpdW0nfX08L3NwYW4+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVGltZUxpc3RTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRpbWVMaXN0OiBudW1iZXJbXTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVGltZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgc2VsZWN0VGltZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgIHRoaXMub25UaW1lU2VsZWN0ZWQuZW1pdCh0aW1lc3RhbXApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWZpbmVkVGltZXNwYW4sIERlZmluZWRUaW1lc3BhblNlcnZpY2UsIFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXRpbWVzcGFuLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwiY2xpY2tlZCgpXCI+XG4gIHt7bGFiZWx9fVxuPC9idXR0b24+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVzcGFuQnV0dG9uQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcHJlZGVmaW5lZDogc3RyaW5nIHwgRGVmaW5lZFRpbWVzcGFuO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lc3BhbkZ1bmM6ICgpID0+IFRpbWVzcGFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lc3BhblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBwcmVkZWZpbmVkU3J2YzogRGVmaW5lZFRpbWVzcGFuU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjbGlja2VkKCkge1xuICAgIGlmICh0aGlzLnByZWRlZmluZWQpIHtcbiAgICAgIHRoaXMub25UaW1lc3BhblNlbGVjdGVkLmVtaXQodGhpcy5wcmVkZWZpbmVkU3J2Yy5nZXRJbnRlcnZhbCh0aGlzLnByZWRlZmluZWQgYXMgRGVmaW5lZFRpbWVzcGFuKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbWVzcGFuRnVuYykge1xuICAgICAgdGhpcy5vblRpbWVzcGFuU2VsZWN0ZWQuZW1pdCh0aGlzLnRpbWVzcGFuRnVuYygpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vblRpbWVzcGFuU2VsZWN0ZWQuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi10aW1lc3Bhbi1zaGlmdC1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImJhY2soKVwiPiAmbHQ7IDwvYnV0dG9uPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib3BlbigpXCI+XG4gICAge3t0aW1lc3Bhbi5mcm9tIHwgZGF0ZSA6ICdtZWRpdW0nfX0gJm5ic3A7Jm5kYXNoOyZuYnNwOyB7e3RpbWVzcGFuLnRvIHwgZGF0ZSA6ICdtZWRpdW0nfX1cbiAgPC9idXR0b24+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJmb3J3YXJkKClcIj4gJmd0OyA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lc3BhblNoaWZ0U2VsZWN0b3JDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lc3BhbjogVGltZXNwYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4oKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uT3BlblRpbWVTZXR0aW5nczogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZVxuICApIHsgfVxuXG4gIHB1YmxpYyBiYWNrKCkge1xuICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZS5lbWl0KHRoaXMudGltZVNydmMuc3RlcEJhY2sodGhpcy50aW1lc3BhbikpO1xuICB9XG5cbiAgcHVibGljIGZvcndhcmQoKSB7XG4gICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlLmVtaXQodGhpcy50aW1lU3J2Yy5zdGVwRm9yd2FyZCh0aGlzLnRpbWVzcGFuKSk7XG4gIH1cblxuICBwdWJsaWMgb3BlbigpIHtcbiAgICB0aGlzLm9uT3BlblRpbWVTZXR0aW5ncy5lbWl0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgUHJlZGVmaW5lZFRpbWVzcGFuU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3ByZWRlZmluZWQtdGltZXNwYW4tc2VsZWN0b3IvcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZUxpc3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1saXN0LXNlbGVjdG9yL3RpbWUtbGlzdC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZXNwYW5CdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3RpbWVzcGFuLWJ1dHRvbi90aW1lc3Bhbi1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVzcGFuU2hpZnRTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXNwYW4tc2hpZnQtc2VsZWN0b3IvdGltZXNwYW4tc2hpZnQtc2VsZWN0b3IuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgUHJlZGVmaW5lZFRpbWVzcGFuU2VsZWN0b3JDb21wb25lbnQsXG4gIFRpbWVMaXN0U2VsZWN0b3JDb21wb25lbnQsXG4gIFRpbWVzcGFuU2hpZnRTZWxlY3RvckNvbXBvbmVudCxcbiAgVGltZXNwYW5CdXR0b25Db21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDT01QT05FTlRTXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kVGltZU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQXlCRSxZQUNZLFdBQXNDO1FBQXRDLGdCQUFXLEdBQVgsV0FBVyxDQUEyQjtnQ0FMQSxJQUFJLFlBQVksRUFBWTtLQU16RTs7OztJQUVFLFFBQVE7O1FBQ2IsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDdkUsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGVBQWU7aUJBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDWCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO2dCQUNkLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUMzRCxFQUFFLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFO2lCQUN4RDtnQkFDRCxzQkFBc0IsRUFBRSxDQUFDLENBQUMsc0JBQXNCO2FBQ2pELENBQUMsQ0FBQyxDQUFDO1NBQ1A7Ozs7OztJQUdJLHNCQUFzQixDQUFDLFVBQWtCOztRQU05QyxNQUFNLG9CQUFvQixHQUFHLElBQUksTUFBTSxDQUFDLDBTQUEwUyxDQUFDLENBQUM7Ozs7UUFLcFYsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7OztJQUd4QyxvQkFBb0IsQ0FBQyxNQUFzQjs7UUFFaEQs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
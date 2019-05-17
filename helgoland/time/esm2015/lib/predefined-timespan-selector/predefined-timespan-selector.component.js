/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SettingsService, Timespan } from '@helgoland/core';
export class PredefinedTimespanSelectorComponent {
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
if (false) {
    /** @type {?} */
    PredefinedTimespanSelectorComponent.prototype.timespan;
    /** @type {?} */
    PredefinedTimespanSelectorComponent.prototype.onTimespanChange;
    /** @type {?} */
    PredefinedTimespanSelectorComponent.prototype.parsedTimespanPresets;
    /** @type {?} */
    PredefinedTimespanSelectorComponent.prototype.settingSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3RpbWUvIiwic291cmNlcyI6WyJsaWIvcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci9wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQWtDLGVBQWUsRUFBRSxRQUFRLEVBQWtCLE1BQU0saUJBQWlCLENBQUM7QUFjNUcsTUFBTTs7OztJQVVKLFlBQ1ksV0FBc0M7UUFBdEMsZ0JBQVcsR0FBWCxXQUFXLENBQTJCO2dDQUxBLElBQUksWUFBWSxFQUFZO0tBTXpFOzs7O0lBRUUsUUFBUTs7UUFDYixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUN2RSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxlQUFlO2lCQUN6QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNYLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQzNELEVBQUUsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQ3hEO2dCQUNELHNCQUFzQixFQUFFLENBQUMsQ0FBQyxzQkFBc0I7YUFDakQsQ0FBQyxDQUFDLENBQUM7U0FDUDs7Ozs7O0lBR0ksc0JBQXNCLENBQUMsVUFBa0I7O1FBTTlDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsMFNBQTBTLENBQUMsQ0FBQzs7OztRQUtwVixNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7SUFHeEMsb0JBQW9CLENBQUMsTUFBc0I7O1FBRWhELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXBILEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDs7Ozs7O0lBR0kscUJBQXFCLENBQUMsVUFBa0I7O1FBRTdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQUc1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUM1QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiOzs7Ozs7SUFHSSxlQUFlLENBQUMsTUFBc0I7O1FBRTNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUVuRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztZQXBGN0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRTs7Ozs7O0NBTVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsaUZBQWlGLENBQUM7YUFDNUY7Ozs7WUFad0MsZUFBZTs7O3VCQWdCckQsS0FBSzsrQkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyc2VkVGltZXNwYW5QcmVzZXQsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UsIFRpbWVzcGFuLCBUaW1lc3BhblByZXNldCB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBwYXJzZWRUaW1lc3BhblByZXNldHNcIj5cbiAgPGJ1dHRvbiAoY2xpY2spPVwidGltZXNwYW5DaGFuZ2VkKGl0ZW0pXCIgW25nQ2xhc3NdPVwieydzZXBlcmF0b3ItYWZ0ZXItdGhpcy1pdGVtJzogaXRlbS5zZXBlcmF0b3JBZnRlclRoaXNJdGVtfVwiIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiPlxuICAgIHt7aXRlbS5sYWJlbH19XG4gIDwvYnV0dG9uPlxuICA8YnI+XG48L3NwYW4+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgOm5vdCguc2VwZXJhdG9yLWFmdGVyLXRoaXMtaXRlbSkrYnJ7ZGlzcGxheTpub25lfTpob3N0IGJ1dHRvbnttYXJnaW46M3B4fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgUHJlZGVmaW5lZFRpbWVzcGFuU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lc3BhbjogVGltZXNwYW47XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4oKTtcblxuICBwdWJsaWMgcGFyc2VkVGltZXNwYW5QcmVzZXRzOiBQYXJzZWRUaW1lc3BhblByZXNldFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzZXR0aW5nU3J2YzogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICApIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCB0aW1lc3BhblByZXNldHMgPSB0aGlzLnNldHRpbmdTcnZjLmdldFNldHRpbmdzKCkudGltZXNwYW5QcmVzZXRzO1xuICAgIGlmICh0aW1lc3BhblByZXNldHMpIHtcbiAgICAgIHRoaXMucGFyc2VkVGltZXNwYW5QcmVzZXRzID0gdGltZXNwYW5QcmVzZXRzXG4gICAgICAgIC5maWx0ZXIoKGUpID0+IHRoaXMuaXNTYWZlVGltZXNwYW5QcmVzZXQoZSkpXG4gICAgICAgIC5tYXAoKGUpID0+ICh7XG4gICAgICAgICAgbmFtZTogZS5uYW1lLFxuICAgICAgICAgIGxhYmVsOiBlLmxhYmVsLFxuICAgICAgICAgIHRpbWVzcGFuOiB7XG4gICAgICAgICAgICBmcm9tOiB0aGlzLnBhcnNlTW9tZW50RXhwcmVzc2lvbihlLnRpbWVzcGFuLmZyb20pLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHRvOiB0aGlzLnBhcnNlTW9tZW50RXhwcmVzc2lvbihlLnRpbWVzcGFuLnRvKS5nZXRUaW1lKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlcGVyYXRvckFmdGVyVGhpc0l0ZW06IGUuc2VwZXJhdG9yQWZ0ZXJUaGlzSXRlbVxuICAgICAgICB9KSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2FmZU1vbWVudEV4cHJlc3Npb24oZXhwcmVzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgLy8gcmVnZXggY2hlY2tzIHdoZXRoZXIgY29kZSB0byBiZSBldmFsJ2VkIGFkaGVycyB0byBzeW50YXggZ2l2ZW4gaW4gaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL21hbmlwdWxhdGluZy9cbiAgICAvLyBleHBsYW5hdGlvbjogICAgICAgICAgICAgICBTdGFydCB3aXRoIFwibW9tZW50KClcIiAgIFBvc3NpYmxlIGZ1bmN0aW9uczogYWRkKG51bWJlciwgc3RyaW5nKSBhbmQgc3VidHJhY3QobnVtYmVyLCBzdHJpbmcpICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1cnRoZXIgcG9zc2libGUgZnVuY3Rpb25zOiBzdGFydE9mKHN0cmluZykgYW5kIGVuZE9mKHN0cmluZykgICAgICAgICAgICAgICAgICAgICAgICAgICBGdXJ0aGVyIHBvc3NpYmxlIGZ1bmN0aW9uczogeWVhcihudW1iZXIpLCAuLi4sIG1pbGxpc2Vjb25kcyhudW1iZXIpLiAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbnMgY2FuIGJlIGNoYWluZWQgaW5maW5pdGVseSwgb3Igbm90IGF0IGFsbFxuICAgIC8vIGZ1cnRoZXIgZXhwbGFuYXRpb246ICAgICAgIFRoaXMgaXMgYSBNVVNULiAgICAgICAgIFRoZSBzdHJpbmdzIGhhdmUgdG8gYmUgb3V0IG9mIHRoZSBvcHRpb25zIGRlc2NyaWJlZCBpbiB0aGUgZG9jcyAoc2hvcnRjdXRzIHBlcm1pdHRlZCkgICAgICAgICAgIEFnYWluLCB0aGUgc3RyaW5ncyBoYXZlIHRvIGJlIG91dCBvZiBhIHN0cmljdCBzZXQuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVzZSBzZXQgdGhlIGNvcnJlc3BvbmRpbmcgcGFydCBvZiB0aGUgTW9tZW50IG9iamVjdCB0byB0aGUgbnVtYmVyIGdpdmVuLiAgICAgICAgICAgICAgICAgICB8ICAoaS5lLiBcIm1vbWVudCgpXCIgaXMgdGhlIG1pbmltYWwgY2FzZSBtYXRjaGVkKVxuICAgIC8vIGV2ZW4gZnVydGhlciBleHBsYW5hdGlvbjogICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgZG9lc24ndCBIQVZFIHRvIGJlIHJlYXNvbmFibGUgKGUuZy4gbW9udGg9MjAgaXMgb2spLCBidXQgdGhhdCdzIG5vIHNlY3VyaXR5IGlzc3VlLiAgIFRoZSBxdW90ZXMgY2FuIGluY29ycmVjdGx5IHN0YXJ0IHdpdGggJyBhbmQgdGhlbiBlbmQgd2l0aCBcIiAob3IgdmljZSB2ZXJzYSksIGJ1dCB0aGF0J3Mgbm8gc2VjdXJpdHkgcHJvYmxlbSBlaXRoZXIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiB2IG9wdGlvbmFsIHNlbWljb2xvbiBhdCB0aGUgZW5kXG4gICAgY29uc3Qgc2FmZU1vbWVudEV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKC9ebW9tZW50XFwoXFwpKFxcLigoKGFkZHxzdWJ0cmFjdClcXChcXGQrLCA/WydcIl0oeWVhcnN8eXxxdWFydGVyc3xRfG1vbnRoc3xNfHdlZWtzfHd8ZGF5c3xkfGhvdXJzfGh8bWludXRlc3xtfHNlY29uZHN8c3xtaWxsaXNlY29uZHN8bXMpWydcIl1cXCkpfCgoc3RhcnRPZnxlbmRPZilcXChbJ1wiXSh5ZWFyfG1vbnRofHF1YXJ0ZXJ8d2Vla3xpc29XZWVrfGRheXxkYXRlfGhvdXJ8bWludXRlfHNlY29uZClbJ1wiXVxcKSl8KCh5ZWFyfG1vbnRofGRhdGV8aG91cnN8bWludXRlc3xzZWNvbmRzfG1pbGxpc2Vjb25kcylcXChcXGQrXFwpKSkpKjs/JC8pO1xuICAgIC8vIGJyYWNrZXRzIGxldmVsIGluIGNhc2UgeW91IGdldCBsb3N0OiAgICAgICAgICAqICoxICAyMzQgICAgICAgICAgICA0ICogICAgICAgICAgNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCAgICAgKjMgMzQgICAgICAgICAgICAgNCAqICAgIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgICAgICozIDM0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0ICogICAgKjMyMVxuICAgIC8vICogPSB0aGlzIGJyYWNrZXQgaXMgYW4gZXNjYXBlZCBicmFja2V0IGFuZCB0aGVyZWZvcmUgbm90IGNvdW50ZWRcblxuICAgIC8vIHRlc3QgZXhwcmVzc2lvbiBhZ2FpbnN0IHJlZ2V4IGFib3ZlXG4gICAgcmV0dXJuIHNhZmVNb21lbnRFeHByZXNzaW9uLnRlc3QoZXhwcmVzc2lvbik7XG4gIH1cblxuICBwdWJsaWMgaXNTYWZlVGltZXNwYW5QcmVzZXQocHJlc2V0OiBUaW1lc3BhblByZXNldCk6IGJvb2xlYW4ge1xuICAgIC8vIHRlc3QgYm90aCBpbnB1dHMgYWdhaW5zdCB0aGUgcmVnZXhcbiAgICBjb25zdCBpc1NhZmUgPSB0aGlzLmlzU2FmZU1vbWVudEV4cHJlc3Npb24ocHJlc2V0LnRpbWVzcGFuLmZyb20pICYmIHRoaXMuaXNTYWZlTW9tZW50RXhwcmVzc2lvbihwcmVzZXQudGltZXNwYW4udG8pO1xuXG4gICAgaWYgKGlzU2FmZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUaW1lc3BhbiBwcmVzZXQgXCInICsgcHJlc2V0Lm5hbWUgKyAnXCIgaGFzIGludmFsaWQgbW9tZW50KCkgZXhwcmVzc2lvbiEnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNb21lbnRFeHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZyk6IERhdGUge1xuICAgIC8vIGp1c3QgdG8gYmUgc3VyZSBub3QgdG8gZXZhbCgpIHNvbWV0aGluZyBuYXN0eVxuICAgIGlmICh0aGlzLmlzU2FmZU1vbWVudEV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgIC8vIGlmIHNhdGlzZmllZCwgZXZhbCB0aGUgaW5wdXRzIC0+IHRoZSAuX2QgcHJvcGVydHkgY29udGFpbnMgdGhlIGNvcnJlc3BvbmRpbmcgRGF0ZSBvYmplY3RzIGZyb20gd2hpY2ggdGhlIFRpbWVzcGFuIGNhbiBiZSBjb25zdHJ1Y3RlZFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWV2YWxcbiAgICAgIHJldHVybiBldmFsKGV4cHJlc3Npb24pLl9kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdGltZXNwYW5DaGFuZ2VkKHByZXNldDogVGltZXNwYW5QcmVzZXQpIHtcbiAgICAvLyBjb25zdHJ1Y3QgbmV3IFRpbWVzcGFuXG4gICAgdGhpcy50aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihwYXJzZUludChwcmVzZXQudGltZXNwYW4uZnJvbSwgMTApLCBwYXJzZUludChwcmVzZXQudGltZXNwYW4udG8sIDEwKSk7XG4gICAgLy8gcHVibGljaXNlIG5ldyB0aW1lc3BhblxuICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZS5lbWl0KHRoaXMudGltZXNwYW4pO1xuICB9XG59XG4iXX0=
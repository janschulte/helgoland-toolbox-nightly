/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, InternalIdHandler, Time, TimeInterval } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurableTimeseriesEntryComponent, } from '../configurable-timeseries-entry/configurable-timeseries-entry.component';
/**
 * Extends the ConfigurableTimeseriesEntryComponent, with the following functions:
 *  - first and latest validation
 *  - jump to first and latest value events
 */
var FirstLatestTimeseriesEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FirstLatestTimeseriesEntryComponent, _super);
    function FirstLatestTimeseriesEntryComponent(api, internalIdHandler, translateSrvc, timeSrvc) {
        var _this = _super.call(this, api, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        _this.timeSrvc = timeSrvc;
        _this.onSelectDate = new EventEmitter();
        _this.hasData = true;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"]) {
            this.checkDataInTimespan();
        }
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.jumpToFirstTimeStamp = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(new Date(this.dataset.firstValue.timestamp));
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.jumpToLastTimeStamp = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(new Date(this.dataset.lastValue.timestamp));
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.setParameters = /**
     * @return {?}
     */
    function () {
        _super.prototype.setParameters.call(this);
        this.firstValue = this.dataset.firstValue;
        this.lastValue = this.dataset.lastValue;
        this.checkDataInTimespan();
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.checkDataInTimespan = /**
     * @return {?}
     */
    function () {
        if (this.timeInterval && this.dataset) {
            this.hasData = this.timeSrvc.overlaps(this.timeInterval, this.dataset.firstValue.timestamp, this.dataset.lastValue.timestamp);
        }
    };
    FirstLatestTimeseriesEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-first-latest-timeseries-entry',
                    template: "<span>{{procedureLabel}} - {{platformLabel}}</span>\n<span>Has Data: {{hasData}}</span>\n<button *ngIf=\"firstValue\" (click)=\"jumpToFirstTimeStamp()\">{{firstValue.value}} - {{firstValue.timestamp | date}}</button>\n<button *ngIf=\"lastValue\" (click)=\"jumpToLastTimeStamp()\">{{lastValue.value}} - {{lastValue.timestamp | date}}</button>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    FirstLatestTimeseriesEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService },
        { type: Time }
    ]; };
    FirstLatestTimeseriesEntryComponent.propDecorators = {
        timeInterval: [{ type: Input }],
        onSelectDate: [{ type: Output }]
    };
    return FirstLatestTimeseriesEntryComponent;
}(ConfigurableTimeseriesEntryComponent));
export { FirstLatestTimeseriesEntryComponent };
if (false) {
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.timeInterval;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.onSelectDate;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.firstValue;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.lastValue;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.hasData;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.api;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.translateSrvc;
    /** @type {?} */
    FirstLatestTimeseriesEntryComponent.prototype.timeSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLGlCQUFpQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0wsb0NBQW9DLEdBQ3JDLE1BQU0sMEVBQTBFLENBQUM7Ozs7Ozs7SUFlekIsK0RBQW9DO0lBWTNGLDZDQUNZLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxhQUErQixFQUMvQixRQUFjO1FBSjFCLFlBTUUsa0JBQU0sR0FBRyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxTQUM3QztRQU5XLFNBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLGNBQVEsR0FBUixRQUFRLENBQU07NkJBVmdCLElBQUksWUFBWSxFQUFFO3dCQUkzQyxJQUFJOztLQVNwQjs7Ozs7SUFFTSx5REFBVzs7OztjQUFDLE9BQXNCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sa0JBQWUsQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1Qjs7Ozs7SUFHSSxrRUFBb0I7Ozs7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHL0QsaUVBQW1COzs7O1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRzNELDJEQUFhOzs7SUFBdkI7UUFDRSxpQkFBTSxhQUFhLFdBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFTyxpRUFBbUI7Ozs7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNuQyxJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDakMsQ0FBQztTQUNIOzs7Z0JBekRKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxRQUFRLEVBQUUsdVZBRzRHO29CQUN0SCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBbkJRLG1CQUFtQjtnQkFBa0IsaUJBQWlCO2dCQUN0RCxnQkFBZ0I7Z0JBRHdDLElBQUk7OzsrQkFzQmxFLEtBQUs7K0JBR0wsTUFBTTs7OENBMUJUO0VBcUJ5RCxvQ0FBb0M7U0FBaEYsbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgRmlyc3RMYXN0VmFsdWUsIEludGVybmFsSWRIYW5kbGVyLCBUaW1lLCBUaW1lSW50ZXJ2YWwgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4uL2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5L2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LCB3aXRoIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gZmlyc3QgYW5kIGxhdGVzdCB2YWxpZGF0aW9uXG4gKiAgLSBqdW1wIHRvIGZpcnN0IGFuZCBsYXRlc3QgdmFsdWUgZXZlbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3twcm9jZWR1cmVMYWJlbH19IC0ge3twbGF0Zm9ybUxhYmVsfX08L3NwYW4+XG48c3Bhbj5IYXMgRGF0YToge3toYXNEYXRhfX08L3NwYW4+XG48YnV0dG9uICpuZ0lmPVwiZmlyc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9GaXJzdFRpbWVTdGFtcCgpXCI+e3tmaXJzdFZhbHVlLnZhbHVlfX0gLSB7e2ZpcnN0VmFsdWUudGltZXN0YW1wIHwgZGF0ZX19PC9idXR0b24+XG48YnV0dG9uICpuZ0lmPVwibGFzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKVwiPnt7bGFzdFZhbHVlLnZhbHVlfX0gLSB7e2xhc3RWYWx1ZS50aW1lc3RhbXAgfCBkYXRlfX08L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbDtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uU2VsZWN0RGF0ZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBmaXJzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gIHB1YmxpYyBoYXNEYXRhID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lXG4gICkge1xuICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMuY2hlY2tEYXRhSW5UaW1lc3BhbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBqdW1wVG9GaXJzdFRpbWVTdGFtcCgpIHtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KG5ldyBEYXRlKHRoaXMuZGF0YXNldC5maXJzdFZhbHVlLnRpbWVzdGFtcCkpO1xuICB9XG5cbiAgcHVibGljIGp1bXBUb0xhc3RUaW1lU3RhbXAoKSB7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChuZXcgRGF0ZSh0aGlzLmRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFBhcmFtZXRlcnMoKSB7XG4gICAgc3VwZXIuc2V0UGFyYW1ldGVycygpO1xuICAgIHRoaXMuZmlyc3RWYWx1ZSA9IHRoaXMuZGF0YXNldC5maXJzdFZhbHVlO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZTtcbiAgICB0aGlzLmNoZWNrRGF0YUluVGltZXNwYW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tEYXRhSW5UaW1lc3BhbigpIHtcbiAgICBpZiAodGhpcy50aW1lSW50ZXJ2YWwgJiYgdGhpcy5kYXRhc2V0KSB7XG4gICAgICB0aGlzLmhhc0RhdGEgPSB0aGlzLnRpbWVTcnZjLm92ZXJsYXBzKFxuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbCxcbiAgICAgICAgdGhpcy5kYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wLFxuICAgICAgICB0aGlzLmRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxufVxuIl19
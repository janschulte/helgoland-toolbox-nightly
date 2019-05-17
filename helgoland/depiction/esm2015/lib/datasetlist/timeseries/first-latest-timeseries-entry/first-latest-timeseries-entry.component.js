/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, InternalIdHandler, Time, TimeInterval } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurableTimeseriesEntryComponent, } from '../configurable-timeseries-entry/configurable-timeseries-entry.component';
/**
 * Extends the ConfigurableTimeseriesEntryComponent, with the following functions:
 *  - first and latest validation
 *  - jump to first and latest value events
 */
export class FirstLatestTimeseriesEntryComponent extends ConfigurableTimeseriesEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     * @param {?} timeSrvc
     */
    constructor(api, internalIdHandler, translateSrvc, timeSrvc) {
        super(api, internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.timeSrvc = timeSrvc;
        this.onSelectDate = new EventEmitter();
        this.hasData = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"]) {
            this.checkDataInTimespan();
        }
    }
    /**
     * @return {?}
     */
    jumpToFirstTimeStamp() {
        this.onSelectDate.emit(new Date(this.dataset.firstValue.timestamp));
    }
    /**
     * @return {?}
     */
    jumpToLastTimeStamp() {
        this.onSelectDate.emit(new Date(this.dataset.lastValue.timestamp));
    }
    /**
     * @return {?}
     */
    setParameters() {
        super.setParameters();
        this.firstValue = this.dataset.firstValue;
        this.lastValue = this.dataset.lastValue;
        this.checkDataInTimespan();
    }
    /**
     * @return {?}
     */
    checkDataInTimespan() {
        if (this.timeInterval && this.dataset) {
            this.hasData = this.timeSrvc.overlaps(this.timeInterval, this.dataset.firstValue.timestamp, this.dataset.lastValue.timestamp);
        }
    }
}
FirstLatestTimeseriesEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-first-latest-timeseries-entry',
                template: `<span>{{procedureLabel}} - {{platformLabel}}</span>
<span>Has Data: {{hasData}}</span>
<button *ngIf="firstValue" (click)="jumpToFirstTimeStamp()">{{firstValue.value}} - {{firstValue.timestamp | date}}</button>
<button *ngIf="lastValue" (click)="jumpToLastTimeStamp()">{{lastValue.value}} - {{lastValue.timestamp | date}}</button>`,
                styles: [``]
            },] },
];
/** @nocollapse */
FirstLatestTimeseriesEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService },
    { type: Time }
];
FirstLatestTimeseriesEntryComponent.propDecorators = {
    timeInterval: [{ type: Input }],
    onSelectDate: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBa0IsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFDTCxvQ0FBb0MsR0FDckMsTUFBTSwwRUFBMEUsQ0FBQzs7Ozs7O0FBZWxGLE1BQU0sMENBQTJDLFNBQVEsb0NBQW9DOzs7Ozs7O0lBWTNGLFlBQ1ksR0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLGFBQStCLEVBQy9CLFFBQWM7UUFFeEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUxuQyxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFNOzRCQVZnQixJQUFJLFlBQVksRUFBRTt1QkFJM0MsSUFBSTtLQVNwQjs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxrQkFBZSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCOzs7OztJQUdJLG9CQUFvQjtRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQUcvRCxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHM0QsYUFBYTtRQUNyQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRU8sbUJBQW1CO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDbkMsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQ2pDLENBQUM7U0FDSDs7OztZQXpESixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1DQUFtQztnQkFDN0MsUUFBUSxFQUFFOzs7d0hBRzRHO2dCQUN0SCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQW5CUSxtQkFBbUI7WUFBa0IsaUJBQWlCO1lBQ3RELGdCQUFnQjtZQUR3QyxJQUFJOzs7MkJBc0JsRSxLQUFLOzJCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBGaXJzdExhc3RWYWx1ZSwgSW50ZXJuYWxJZEhhbmRsZXIsIFRpbWUsIFRpbWVJbnRlcnZhbCB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7XG4gIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi4vY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcblxuLyoqXG4gKiBFeHRlbmRzIHRoZSBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsIHdpdGggdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBmaXJzdCBhbmQgbGF0ZXN0IHZhbGlkYXRpb25cbiAqICAtIGp1bXAgdG8gZmlyc3QgYW5kIGxhdGVzdCB2YWx1ZSBldmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj57e3Byb2NlZHVyZUxhYmVsfX0gLSB7e3BsYXRmb3JtTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPkhhcyBEYXRhOiB7e2hhc0RhdGF9fTwvc3Bhbj5cbjxidXR0b24gKm5nSWY9XCJmaXJzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0ZpcnN0VGltZVN0YW1wKClcIj57e2ZpcnN0VmFsdWUudmFsdWV9fSAtIHt7Zmlyc3RWYWx1ZS50aW1lc3RhbXAgfCBkYXRlfX08L2J1dHRvbj5cbjxidXR0b24gKm5nSWY9XCJsYXN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvTGFzdFRpbWVTdGFtcCgpXCI+e3tsYXN0VmFsdWUudmFsdWV9fSAtIHt7bGFzdFZhbHVlLnRpbWVzdGFtcCB8IGRhdGV9fTwvYnV0dG9uPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25TZWxlY3REYXRlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICBwdWJsaWMgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgcHVibGljIGhhc0RhdGEgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWVcbiAgKSB7XG4gICAgc3VwZXIoYXBpLCBpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnRpbWVJbnRlcnZhbCkge1xuICAgICAgdGhpcy5jaGVja0RhdGFJblRpbWVzcGFuKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGp1bXBUb0ZpcnN0VGltZVN0YW1wKCkge1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobmV3IERhdGUodGhpcy5kYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wKSk7XG4gIH1cblxuICBwdWJsaWMganVtcFRvTGFzdFRpbWVTdGFtcCgpIHtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KG5ldyBEYXRlKHRoaXMuZGF0YXNldC5sYXN0VmFsdWUudGltZXN0YW1wKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICBzdXBlci5zZXRQYXJhbWV0ZXJzKCk7XG4gICAgdGhpcy5maXJzdFZhbHVlID0gdGhpcy5kYXRhc2V0LmZpcnN0VmFsdWU7XG4gICAgdGhpcy5sYXN0VmFsdWUgPSB0aGlzLmRhdGFzZXQubGFzdFZhbHVlO1xuICAgIHRoaXMuY2hlY2tEYXRhSW5UaW1lc3BhbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0RhdGFJblRpbWVzcGFuKCkge1xuICAgIGlmICh0aGlzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLmRhdGFzZXQpIHtcbiAgICAgIHRoaXMuaGFzRGF0YSA9IHRoaXMudGltZVNydmMub3ZlcmxhcHMoXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxuICAgICAgICB0aGlzLmRhdGFzZXQuZmlyc3RWYWx1ZS50aW1lc3RhbXAsXG4gICAgICAgIHRoaXMuZGF0YXNldC5sYXN0VmFsdWUudGltZXN0YW1wXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=
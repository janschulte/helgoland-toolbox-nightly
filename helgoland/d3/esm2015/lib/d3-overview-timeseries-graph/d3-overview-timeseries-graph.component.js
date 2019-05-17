/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { HasLoadableContent, Mixin, Time, TimeInterval } from '@helgoland/core';
let D3OverviewTimeseriesGraphComponent = class D3OverviewTimeseriesGraphComponent {
    /**
     * @param {?} timeSrvc
     * @param {?} cd
     */
    constructor(timeSrvc, cd) {
        this.timeSrvc = timeSrvc;
        this.cd = cd;
        this.onTimespanChanged = new EventEmitter();
        this.onLoading = new EventEmitter();
        this.onContentLoading = new EventEmitter();
        this.init = false;
        if (this.presenterOptions) {
            this.presenterOptions.overview = true;
        }
        else {
            this.presenterOptions = { overview: true };
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.rangefactor = this.rangefactor || 1;
        this.calculateOverviewRange();
        this.init = true;
        this.cd.detectChanges();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cd.detach();
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    timeSpanChanged(timespan) {
        this.onTimespanChanged.emit(timespan);
    }
    /**
     * @param {?} loading
     * @return {?}
     */
    onGraphLoading(loading) {
        this.isContentLoading(loading);
    }
    /**
     * @return {?}
     */
    calculateOverviewRange() {
        /** @type {?} */
        const timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.timespan = timespan;
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
    }
};
D3OverviewTimeseriesGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-d3-overview-timeseries-graph',
                template: `<n52-d3-timeseries-graph [datasetIds]="datasetIds" [datasetOptions]="datasetOptions" [reloadForDatasets]="reloadForDatasets"
    [timeInterval]="overviewTimespan" [mainTimeInterval]="timespan" [presenterOptions]="presenterOptions" (onTimespanChanged)="timeSpanChanged($event)"
    (onContentLoading)="onGraphLoading($event)"></n52-d3-timeseries-graph>`,
                styles: [`:host .d3{height:100%}`]
            },] },
];
/** @nocollapse */
D3OverviewTimeseriesGraphComponent.ctorParameters = () => [
    { type: Time },
    { type: ChangeDetectorRef }
];
D3OverviewTimeseriesGraphComponent.propDecorators = {
    datasetIds: [{ type: Input }],
    datasetOptions: [{ type: Input }],
    presenterOptions: [{ type: Input }],
    timeInterval: [{ type: Input }],
    rangefactor: [{ type: Input }],
    reloadForDatasets: [{ type: Input }],
    onTimespanChanged: [{ type: Output }],
    onLoading: [{ type: Output }],
    onContentLoading: [{ type: Output }]
};
D3OverviewTimeseriesGraphComponent = tslib_1.__decorate([
    Mixin([HasLoadableContent]),
    tslib_1.__metadata("design:paramtypes", [Time,
        ChangeDetectorRef])
], D3OverviewTimeseriesGraphComponent);
export { D3OverviewTimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.datasetIds;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.datasetOptions;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.presenterOptions;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timeInterval;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.rangefactor;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.reloadForDatasets;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onTimespanChanged;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onContentLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.isContentLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.overviewTimespan;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timespan;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.init;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFZLE1BQU0saUJBQWlCLENBQUM7QUFJMUcsSUFRYSxrQ0FBa0MsR0FSL0M7Ozs7O0lBNENJLFlBQ2MsUUFBYyxFQUNkLEVBQXFCO1FBRHJCLGFBQVEsR0FBUixRQUFRLENBQU07UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtpQ0FqQmdCLElBQUksWUFBWSxFQUFFO3lCQUczQixJQUFJLFlBQVksRUFBRTtnQ0FHWCxJQUFJLFlBQVksRUFBRTtvQkFPcEQsS0FBSztRQU1oQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3pDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDOUM7S0FDSjs7OztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7Ozs7SUFHckIsV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sb0JBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2pDOzs7OztJQUdFLFdBQVc7UUFDZCxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7SUFHZCxlQUFlLENBQUMsUUFBa0I7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBR25DLGNBQWMsQ0FBQyxPQUFnQjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0lBRzNCLHNCQUFzQjs7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Q0FFN0YsQ0FBQTs7WUFyRkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRTs7MkVBRTZEO2dCQUN2RSxNQUFNLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzthQUNyQzs7OztZQVZtRCxJQUFJO1lBVHBELGlCQUFpQjs7O3lCQXVCaEIsS0FBSzs2QkFHTCxLQUFLOytCQUdMLEtBQUs7MkJBR0wsS0FBSzswQkFHTCxLQUFLO2dDQUdMLEtBQUs7Z0NBR0wsTUFBTTt3QkFHTixNQUFNOytCQUdOLE1BQU07O0FBMUJFLGtDQUFrQztJQUQ5QyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzZDQXNDQSxJQUFJO1FBQ1YsaUJBQWlCO0dBdEMxQixrQ0FBa0MsRUE2RTlDO1NBN0VZLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMsIEhhc0xvYWRhYmxlQ29udGVudCwgTWl4aW4sIFRpbWUsIFRpbWVJbnRlcnZhbCwgVGltZXNwYW4gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBEM1Bsb3RPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvZDMtcGxvdC1vcHRpb25zJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8bjUyLWQzLXRpbWVzZXJpZXMtZ3JhcGggW2RhdGFzZXRJZHNdPVwiZGF0YXNldElkc1wiIFtkYXRhc2V0T3B0aW9uc109XCJkYXRhc2V0T3B0aW9uc1wiIFtyZWxvYWRGb3JEYXRhc2V0c109XCJyZWxvYWRGb3JEYXRhc2V0c1wiXG4gICAgW3RpbWVJbnRlcnZhbF09XCJvdmVydmlld1RpbWVzcGFuXCIgW21haW5UaW1lSW50ZXJ2YWxdPVwidGltZXNwYW5cIiBbcHJlc2VudGVyT3B0aW9uc109XCJwcmVzZW50ZXJPcHRpb25zXCIgKG9uVGltZXNwYW5DaGFuZ2VkKT1cInRpbWVTcGFuQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAob25Db250ZW50TG9hZGluZyk9XCJvbkdyYXBoTG9hZGluZygkZXZlbnQpXCI+PC9uNTItZDMtdGltZXNlcmllcy1ncmFwaD5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuZDN7aGVpZ2h0OjEwMCV9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgSGFzTG9hZGFibGVDb250ZW50LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgRGF0YXNldE9wdGlvbnM+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJlc2VudGVyT3B0aW9uczogRDNQbG90T3B0aW9ucztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmFuZ2VmYWN0b3I6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJlbG9hZEZvckRhdGFzZXRzOiBzdHJpbmdbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkxvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbnRlbnRMb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNDb250ZW50TG9hZGluZzogKGxvYWRpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBwdWJsaWMgb3ZlcnZpZXdUaW1lc3BhbjogVGltZXNwYW47XG4gICAgcHVibGljIHRpbWVzcGFuOiBUaW1lc3BhbjtcblxuICAgIHByaXZhdGUgaW5pdCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5wcmVzZW50ZXJPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMub3ZlcnZpZXcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVzZW50ZXJPcHRpb25zID0geyBvdmVydmlldzogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYW5nZWZhY3RvciA9IHRoaXMucmFuZ2VmYWN0b3IgfHwgMTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNkLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lU3BhbkNoYW5nZWQodGltZXNwYW46IFRpbWVzcGFuKSB7XG4gICAgICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZWQuZW1pdCh0aW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uR3JhcGhMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGxvYWRpbmcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpIHtcbiAgICAgICAgY29uc3QgdGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMudGltZXNwYW4gPSB0aW1lc3BhbjtcbiAgICAgICAgdGhpcy5vdmVydmlld1RpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRpbWVzcGFuLCB0aGlzLnJhbmdlZmFjdG9yKTtcbiAgICB9XG59XG4iXX0=